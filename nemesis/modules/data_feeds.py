#!/usr/bin/env python3
"""
Data Feeds Module - Handles external data sources (Kraken API, mock data, etc.)
"""

import requests
import logging
import time
import threading
from datetime import datetime
from typing import Dict, List, Callable, Optional
from collections import deque


class DataFeed:
    """Base class for data feeds"""
    
    def __init__(self, name: str):
        self.name = name
        self.logger = logging.getLogger(f"DataFeed.{name}")
        self.is_running = False
        self.subscribers = []
    
    def subscribe(self, callback: Callable):
        """Subscribe to data updates"""
        self.subscribers.append(callback)
    
    def notify_subscribers(self, data: Dict):
        """Notify all subscribers of new data"""
        for callback in self.subscribers:
            try:
                callback(data)
            except Exception as e:
                self.logger.error(f"Error notifying subscriber: {e}")
    
    def start(self):
        """Start the data feed"""
        self.is_running = True
    
    def stop(self):
        """Stop the data feed"""
        self.is_running = False


class KrakenFeed(DataFeed):
    """Kraken cryptocurrency exchange data feed"""
    
    def __init__(self, symbols: List[str] = None, update_interval: int = 30):
        super().__init__("Kraken")
        self.symbols = symbols or ["XBTUSD", "XRPUSD", "ETHUSD"]
        self.update_interval = update_interval
        self.base_url = "https://api.kraken.com/0/public"
        self.last_prices = {}
        self.feed_thread = None
    
    def get_ticker(self, symbol: str) -> Optional[Dict]:
        """Get current ticker data for a symbol"""
        try:
            url = f"{self.base_url}/Ticker"
            params = {"pair": symbol}
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get("error"):
                self.logger.error(f"Kraken API error: {data['error']}")
                return None
            
            result = data.get("result", {})
            if not result:
                return None
            
            # Get the first (and should be only) pair data
            pair_data = list(result.values())[0]
            
            ticker = {
                "symbol": symbol,
                "timestamp": datetime.now().isoformat(),
                "price": float(pair_data["c"][0]),  # Last trade price
                "volume": float(pair_data["v"][1]),  # 24h volume
                "high": float(pair_data["h"][1]),    # 24h high
                "low": float(pair_data["l"][1]),     # 24h low
                "bid": float(pair_data["b"][0]),     # Best bid
                "ask": float(pair_data["a"][0]),     # Best ask
                "source": "kraken"
            }
            
            return ticker
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Network error fetching {symbol}: {e}")
            return None
        except Exception as e:
            self.logger.error(f"Error fetching ticker for {symbol}: {e}")
            return None
    
    def _feed_loop(self):
        """Main feed loop"""
        self.logger.info(f"Kraken feed started for symbols: {self.symbols}")
        
        while self.is_running:
            try:
                for symbol in self.symbols:
                    ticker = self.get_ticker(symbol)
                    if ticker:
                        self.last_prices[symbol] = ticker["price"]
                        self.notify_subscribers(ticker)
                
                time.sleep(self.update_interval)
            except Exception as e:
                self.logger.error(f"Feed loop error: {e}")
                time.sleep(self.update_interval)
        
        self.logger.info("Kraken feed stopped")
    
    def start(self):
        """Start the Kraken feed"""
        if self.is_running:
            self.logger.warning("Feed already running")
            return
        
        super().start()
        self.feed_thread = threading.Thread(target=self._feed_loop, daemon=True)
        self.feed_thread.start()
    
    def stop(self):
        """Stop the Kraken feed"""
        super().stop()
        if self.feed_thread and self.feed_thread.is_alive():
            self.feed_thread.join(timeout=5)


class MockDataFeed(DataFeed):
    """Mock data feed for testing"""
    
    def __init__(self, symbols: List[str] = None, update_interval: int = 5):
        super().__init__("Mock")
        self.symbols = symbols or ["BTC/USD", "ETH/USD", "XRP/USD"]
        self.update_interval = update_interval
        self.base_prices = {
            "BTC/USD": 45000,
            "ETH/USD": 2500,
            "XRP/USD": 0.60
        }
        self.feed_thread = None
    
    def generate_mock_data(self, symbol: str) -> Dict:
        """Generate mock market data"""
        import random
        
        base_price = self.base_prices.get(symbol, 100)
        
        # Random walk
        change_percent = random.gauss(0, 0.02)  # 2% std dev
        price = base_price * (1 + change_percent)
        
        # Update base price for next iteration
        self.base_prices[symbol] = price
        
        ticker = {
            "symbol": symbol,
            "timestamp": datetime.now().isoformat(),
            "price": round(price, 2),
            "volume": round(random.uniform(1000, 10000), 2),
            "high": round(price * 1.02, 2),
            "low": round(price * 0.98, 2),
            "bid": round(price * 0.999, 2),
            "ask": round(price * 1.001, 2),
            "source": "mock"
        }
        
        return ticker
    
    def _feed_loop(self):
        """Main feed loop"""
        self.logger.info(f"Mock feed started for symbols: {self.symbols}")
        
        while self.is_running:
            try:
                for symbol in self.symbols:
                    ticker = self.generate_mock_data(symbol)
                    self.notify_subscribers(ticker)
                
                time.sleep(self.update_interval)
            except Exception as e:
                self.logger.error(f"Feed loop error: {e}")
                time.sleep(self.update_interval)
        
        self.logger.info("Mock feed stopped")
    
    def start(self):
        """Start the mock feed"""
        if self.is_running:
            self.logger.warning("Feed already running")
            return
        
        super().start()
        self.feed_thread = threading.Thread(target=self._feed_loop, daemon=True)
        self.feed_thread.start()
    
    def stop(self):
        """Stop the mock feed"""
        super().stop()
        if self.feed_thread and self.feed_thread.is_alive():
            self.feed_thread.join(timeout=5)


class DataAggregator:
    """Aggregates data from multiple feeds"""
    
    def __init__(self):
        self.logger = logging.getLogger("DataAggregator")
        self.feeds = {}
        self.data_buffer = deque(maxlen=1000)
        self.latest_data = {}
    
    def add_feed(self, feed: DataFeed):
        """Add a data feed"""
        self.feeds[feed.name] = feed
        feed.subscribe(self._on_data_received)
        self.logger.info(f"Feed added: {feed.name}")
    
    def _on_data_received(self, data: Dict):
        """Handle incoming data from feeds"""
        symbol = data.get("symbol")
        self.data_buffer.append(data)
        self.latest_data[symbol] = data
        self.logger.debug(f"Data received: {symbol} = {data.get('price')}")
    
    def get_latest(self, symbol: str = None) -> Dict:
        """Get latest data for a symbol or all symbols"""
        if symbol:
            return self.latest_data.get(symbol)
        return self.latest_data
    
    def get_history(self, symbol: str = None, limit: int = 100) -> List[Dict]:
        """Get historical data"""
        if symbol:
            return [d for d in list(self.data_buffer)[-limit:] if d.get("symbol") == symbol]
        return list(self.data_buffer)[-limit:]
    
    def start_all(self):
        """Start all feeds"""
        for feed in self.feeds.values():
            feed.start()
        self.logger.info("All feeds started")
    
    def stop_all(self):
        """Stop all feeds"""
        for feed in self.feeds.values():
            feed.stop()
        self.logger.info("All feeds stopped")


if __name__ == "__main__":
    # Test the data feeds
    logging.basicConfig(level=logging.INFO)
    
    print("Testing Data Feeds\n" + "="*50)
    
    # Create aggregator
    aggregator = DataAggregator()
    
    # Add mock feed (use mock for testing)
    mock_feed = MockDataFeed(symbols=["BTC/USD", "ETH/USD"], update_interval=2)
    aggregator.add_feed(mock_feed)
    
    # Start feeds
    aggregator.start_all()
    
    print("Feeds running. Collecting data for 10 seconds...")
    
    try:
        time.sleep(10)
        
        # Show latest data
        print("\nLatest Data:")
        for symbol, data in aggregator.get_latest().items():
            print(f"{symbol}: ${data['price']:.2f}")
        
        # Show history
        print(f"\nTotal data points collected: {len(aggregator.data_buffer)}")
        
    except KeyboardInterrupt:
        print("\nStopping...")
    finally:
        aggregator.stop_all()
        print("Feeds stopped")
