#!/usr/bin/env python3
"""
Nemesis Oracle (L2) - Main entry point and orchestration
Unified AI oracle system integrating all layers
"""

import sys
import json
import logging
import signal
from pathlib import Path
from datetime import datetime
from typing import Dict

# Add modules to path
sys.path.insert(0, str(Path(__file__).parent / "modules"))

from socrates_core import SocratesCore
from quantum_forecaster import QuantumForecaster
from hci_engine import HCIEngine
from data_feeds import DataAggregator, MockDataFeed, KrakenFeed


class NemesisOracle:
    """
    Nemesis Oracle - Unified AI Oracle System
    Phase 10C - Self-healing, autonomous intelligence
    """
    
    def __init__(self, config_path: str = None):
        self.root_dir = Path(__file__).parent
        self.config_path = config_path or self.root_dir / "config" / "app_config.json"
        self.config = self._load_config()
        
        # Setup logging
        self.logger = self._setup_logging()
        self.logger.info("="*60)
        self.logger.info("NEMESIS ORACLE - Phase 10C Initialization")
        self.logger.info("="*60)
        
        # Initialize core systems
        self.socrates_core = None
        self.quantum_forecaster = None
        self.hci_engine = None
        self.data_aggregator = None
        
        # State
        self.is_running = False
        self.start_time = None
        
        self._initialize_systems()
    
    def _load_config(self) -> Dict:
        """Load system configuration"""
        try:
            with open(self.config_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading config: {e}")
            return {}
    
    def _setup_logging(self) -> logging.Logger:
        """Setup system-wide logging"""
        log_dir = self.root_dir / "logs"
        log_dir.mkdir(exist_ok=True)
        
        log_file = log_dir / f"nemesis_oracle_{datetime.now().strftime('%Y%m%d')}.log"
        
        # Configure root logger
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        
        return logging.getLogger("NemesisOracle")
    
    def _initialize_systems(self):
        """Initialize all subsystems"""
        try:
            # L0: Socrates Core - Self-healing kernel
            self.logger.info("Initializing L0: Socrates Core...")
            self.socrates_core = SocratesCore(self.config_path)
            
            # L3: Quantum Forecaster
            self.logger.info("Initializing L3: Quantum Forecast Engine...")
            forecast_config = self.config.get("engines", {}).get("quantum_forecast", {})
            self.quantum_forecaster = QuantumForecaster(forecast_config)
            
            # L4: HCI Engine
            self.logger.info("Initializing L4: HCI Engine...")
            hci_config = self.config.get("engines", {}).get("hci", {})
            self.hci_engine = HCIEngine(hci_config)
            
            # Data Aggregator
            self.logger.info("Initializing Data Aggregator...")
            self.data_aggregator = DataAggregator()
            
            # Setup data feeds
            self._setup_data_feeds()
            
            # Register modules with Socrates Core
            self._register_modules()
            
            self.logger.info("All systems initialized successfully")
        except Exception as e:
            self.logger.error(f"System initialization error: {e}")
            raise
    
    def _setup_data_feeds(self):
        """Setup data feeds based on configuration"""
        data_sources = self.config.get("data_sources", {})
        
        # Kraken feed
        if data_sources.get("kraken", {}).get("enabled", False):
            try:
                symbols = data_sources["kraken"].get("symbols", ["XBTUSD"])
                interval = data_sources["kraken"].get("update_interval", 30)
                kraken_feed = KrakenFeed(symbols, interval)
                self.data_aggregator.add_feed(kraken_feed)
                self.logger.info("Kraken feed configured")
            except Exception as e:
                self.logger.warning(f"Kraken feed setup failed: {e}, using mock data")
                self._setup_mock_feed()
        else:
            self._setup_mock_feed()
        
        # Subscribe to data updates
        for feed in self.data_aggregator.feeds.values():
            feed.subscribe(self._on_market_data)
    
    def _setup_mock_feed(self):
        """Setup mock data feed for testing"""
        mock_feed = MockDataFeed(
            symbols=["BTC/USD", "ETH/USD", "XRP/USD"],
            update_interval=5
        )
        self.data_aggregator.add_feed(mock_feed)
        self.logger.info("Mock feed configured")
    
    def _register_modules(self):
        """Register all modules with Socrates Core for monitoring"""
        self.socrates_core.register_module(
            "QuantumForecaster",
            self.quantum_forecaster,
            self.quantum_forecaster.health_check
        )
        
        self.socrates_core.register_module(
            "HCIEngine",
            self.hci_engine,
            self.hci_engine.health_check
        )
        
        self.logger.info("Modules registered with Socrates Core")
    
    def _on_market_data(self, data: Dict):
        """Handle incoming market data"""
        try:
            symbol = data.get("symbol")
            price = data.get("price")
            timestamp_str = data.get("timestamp")
            
            if not all([symbol, price, timestamp_str]):
                return
            
            timestamp = datetime.fromisoformat(timestamp_str)
            
            # Feed to Quantum Forecaster
            self.quantum_forecaster.add_data_point(timestamp, price, symbol)
            
            # Get price history for HCI
            history = self.data_aggregator.get_history(symbol, limit=20)
            if len(history) >= 2:
                prices = [h["price"] for h in history]
                volumes = [h.get("volume", 0) for h in history]
                self.hci_engine.add_sentiment_data(
                    price_data=prices,
                    volume_data=volumes,
                    timestamp=timestamp
                )
            
        except Exception as e:
            self.logger.error(f"Error processing market data: {e}")
    
    def start(self):
        """Start the Nemesis Oracle system"""
        if self.is_running:
            self.logger.warning("Nemesis Oracle already running")
            return
        
        self.logger.info("="*60)
        self.logger.info("STARTING NEMESIS ORACLE SYSTEM")
        self.logger.info("="*60)
        
        self.is_running = True
        self.start_time = datetime.now()
        
        # Start Socrates Core
        self.socrates_core.start()
        
        # Start data feeds
        self.data_aggregator.start_all()
        
        self.logger.info("Nemesis Oracle is now ONLINE")
        self.logger.info(f"Phase: {self.config.get('system', {}).get('phase', 'Unknown')}")
        self.logger.info(f"Start Time: {self.start_time.isoformat()}")
    
    def stop(self):
        """Stop the Nemesis Oracle system"""
        if not self.is_running:
            return
        
        self.logger.info("="*60)
        self.logger.info("STOPPING NEMESIS ORACLE SYSTEM")
        self.logger.info("="*60)
        
        # Stop data feeds
        self.data_aggregator.stop_all()
        
        # Stop Socrates Core
        self.socrates_core.stop()
        
        self.is_running = False
        
        uptime = datetime.now() - self.start_time if self.start_time else None
        self.logger.info(f"Uptime: {uptime}")
        self.logger.info("Nemesis Oracle is now OFFLINE")
    
    def get_system_status(self) -> Dict:
        """Get comprehensive system status"""
        status = {
            "system": {
                "name": "Nemesis Oracle",
                "phase": self.config.get("system", {}).get("phase", "Unknown"),
                "version": self.config.get("system", {}).get("version", "Unknown"),
                "running": self.is_running,
                "start_time": self.start_time.isoformat() if self.start_time else None,
                "uptime_seconds": (datetime.now() - self.start_time).total_seconds() if self.start_time else 0
            },
            "core": self.socrates_core.get_status() if self.socrates_core else {},
            "data": {
                "feeds": list(self.data_aggregator.feeds.keys()) if self.data_aggregator else [],
                "latest_prices": {
                    symbol: data.get("price")
                    for symbol, data in self.data_aggregator.get_latest().items()
                } if self.data_aggregator else {}
            },
            "hci": self.hci_engine.get_current_hci() if self.hci_engine else {},
            "timestamp": datetime.now().isoformat()
        }
        
        return status
    
    def get_forecasts(self, symbols: List[str] = None, horizon: int = 10) -> Dict:
        """Get forecasts for specified symbols"""
        if not symbols:
            symbols = list(self.data_aggregator.get_latest().keys())
        
        forecasts = {}
        for symbol in symbols:
            try:
                forecast = self.quantum_forecaster.analyze_and_forecast(symbol, horizon)
                forecasts[symbol] = forecast
            except Exception as e:
                self.logger.error(f"Error generating forecast for {symbol}: {e}")
                forecasts[symbol] = {"error": str(e)}
        
        return forecasts
    
    def run_console(self):
        """Run interactive console mode"""
        self.start()
        
        print("\n" + "="*60)
        print("NEMESIS ORACLE - Interactive Console")
        print("="*60)
        print("Commands:")
        print("  status  - Show system status")
        print("  hci     - Show Human Consciousness Index")
        print("  forecast <symbol> - Show forecast for symbol")
        print("  data    - Show latest market data")
        print("  quit    - Stop and exit")
        print("="*60 + "\n")
        
        try:
            while self.is_running:
                try:
                    cmd = input("nemesis> ").strip().lower()
                    
                    if cmd == "quit" or cmd == "exit":
                        break
                    elif cmd == "status":
                        status = self.get_system_status()
                        print(json.dumps(status, indent=2))
                    elif cmd == "hci":
                        hci = self.hci_engine.get_current_hci()
                        print(json.dumps(hci, indent=2))
                    elif cmd.startswith("forecast"):
                        parts = cmd.split()
                        symbol = parts[1] if len(parts) > 1 else None
                        symbols = [symbol] if symbol else None
                        forecasts = self.get_forecasts(symbols)
                        print(json.dumps(forecasts, indent=2))
                    elif cmd == "data":
                        data = self.data_aggregator.get_latest()
                        print(json.dumps(data, indent=2))
                    elif cmd == "help":
                        print("Commands: status, hci, forecast <symbol>, data, quit")
                    else:
                        print(f"Unknown command: {cmd}")
                except EOFError:
                    break
                except KeyboardInterrupt:
                    print("\nUse 'quit' to exit")
        finally:
            self.stop()


def signal_handler(signum, frame):
    """Handle shutdown signals"""
    print("\nReceived shutdown signal...")
    sys.exit(0)


if __name__ == "__main__":
    # Setup signal handlers
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    # Create and run Nemesis Oracle
    oracle = NemesisOracle()
    oracle.run_console()
