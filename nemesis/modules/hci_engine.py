#!/usr/bin/env python3
"""
HCI Engine (L4) - Human Consciousness Index analyzer
Analyzes sentiment, linguistic patterns, and emotional resonance
"""

import numpy as np
import logging
from datetime import datetime
from typing import Dict, List, Optional
from collections import deque


class HCIEngine:
    """Human Consciousness Index - Sentiment and emotional resonance analyzer"""
    
    def __init__(self, config: Dict = None):
        self.config = config or {}
        self.logger = logging.getLogger("HCIEngine")
        self.logger.setLevel(logging.INFO)
        
        # Configuration
        self.sentiment_weight = self.config.get("sentiment_weight", 0.6)
        self.linguistic_weight = self.config.get("linguistic_weight", 0.4)
        self.history_size = 1000
        
        # State
        self.sentiment_history = deque(maxlen=self.history_size)
        self.hci_scores = deque(maxlen=self.history_size)
        self.emotional_state = "neutral"
        
        # Sentiment keywords (simplified for demo)
        self.positive_keywords = {
            "bullish", "moon", "pump", "gain", "profit", "buy", "long",
            "optimistic", "confident", "strong", "rally", "surge", "breakout"
        }
        self.negative_keywords = {
            "bearish", "dump", "crash", "loss", "sell", "short", "fear",
            "pessimistic", "weak", "decline", "drop", "panic", "breakdown"
        }
        
        self.logger.info("HCI Engine initialized")
    
    def analyze_text_sentiment(self, text: str) -> Dict:
        """
        Analyze sentiment from text data
        Returns sentiment score and classification
        """
        try:
            text_lower = text.lower()
            words = text_lower.split()
            
            # Count positive and negative keywords
            positive_count = sum(1 for word in words if word in self.positive_keywords)
            negative_count = sum(1 for word in words if word in self.negative_keywords)
            
            # Calculate sentiment score (-1 to 1)
            total_keywords = positive_count + negative_count
            if total_keywords == 0:
                sentiment_score = 0.0
            else:
                sentiment_score = (positive_count - negative_count) / total_keywords
            
            # Classify sentiment
            if sentiment_score > 0.3:
                classification = "positive"
            elif sentiment_score < -0.3:
                classification = "negative"
            else:
                classification = "neutral"
            
            result = {
                "score": sentiment_score,
                "classification": classification,
                "positive_signals": positive_count,
                "negative_signals": negative_count,
                "confidence": min(1.0, total_keywords / 10)  # More keywords = higher confidence
            }
            
            return result
        except Exception as e:
            self.logger.error(f"Text sentiment analysis error: {e}")
            return {"score": 0.0, "classification": "neutral", "confidence": 0.0}
    
    def analyze_market_sentiment(self, price_data: List[float], volume_data: List[float] = None) -> Dict:
        """
        Analyze market sentiment from price and volume data
        """
        try:
            if len(price_data) < 2:
                return {"score": 0.0, "momentum": 0.0, "volatility": 0.0}
            
            prices = np.array(price_data)
            
            # Calculate returns
            returns = np.diff(prices) / prices[:-1]
            
            # Momentum (average return)
            momentum = np.mean(returns)
            
            # Volatility
            volatility = np.std(returns)
            
            # Sentiment score based on momentum and volatility
            # High positive momentum = positive sentiment
            # High volatility = uncertainty (reduces confidence)
            sentiment_score = np.tanh(momentum * 100)  # Scale and bound to [-1, 1]
            
            # Volume analysis if available
            volume_signal = 0.0
            if volume_data and len(volume_data) >= 2:
                volumes = np.array(volume_data)
                volume_trend = (volumes[-1] - np.mean(volumes[:-1])) / np.mean(volumes[:-1])
                volume_signal = np.tanh(volume_trend)
            
            result = {
                "score": float(sentiment_score),
                "momentum": float(momentum),
                "volatility": float(volatility),
                "volume_signal": float(volume_signal),
                "trend": "bullish" if sentiment_score > 0.1 else "bearish" if sentiment_score < -0.1 else "neutral"
            }
            
            return result
        except Exception as e:
            self.logger.error(f"Market sentiment analysis error: {e}")
            return {"score": 0.0, "momentum": 0.0, "volatility": 0.0}
    
    def calculate_hci(self, sentiment_data: Dict, market_data: Dict = None) -> float:
        """
        Calculate Human Consciousness Index
        Combines sentiment and market data into unified consciousness metric
        """
        try:
            # Base sentiment score
            sentiment_score = sentiment_data.get("score", 0.0)
            
            # Market sentiment if available
            market_score = 0.0
            if market_data:
                market_score = market_data.get("score", 0.0)
            
            # Weighted combination
            if market_data:
                hci = (self.sentiment_weight * sentiment_score + 
                       (1 - self.sentiment_weight) * market_score)
            else:
                hci = sentiment_score
            
            # Normalize to 0-100 scale
            hci_normalized = (hci + 1) * 50  # Convert from [-1, 1] to [0, 100]
            
            return float(hci_normalized)
        except Exception as e:
            self.logger.error(f"HCI calculation error: {e}")
            return 50.0  # Neutral
    
    def update_emotional_state(self, hci_score: float):
        """
        Update the collective emotional state based on HCI
        """
        if hci_score > 70:
            self.emotional_state = "euphoric"
        elif hci_score > 60:
            self.emotional_state = "optimistic"
        elif hci_score > 40:
            self.emotional_state = "neutral"
        elif hci_score > 30:
            self.emotional_state = "pessimistic"
        else:
            self.emotional_state = "fearful"
    
    def add_sentiment_data(self, text: str = None, price_data: List[float] = None, 
                          volume_data: List[float] = None, timestamp: datetime = None):
        """
        Add new sentiment data and calculate HCI
        """
        timestamp = timestamp or datetime.now()
        
        # Analyze text sentiment if provided
        text_sentiment = None
        if text:
            text_sentiment = self.analyze_text_sentiment(text)
        
        # Analyze market sentiment if provided
        market_sentiment = None
        if price_data:
            market_sentiment = self.analyze_market_sentiment(price_data, volume_data)
        
        # Calculate HCI
        if text_sentiment or market_sentiment:
            hci_score = self.calculate_hci(
                text_sentiment or {"score": 0.0},
                market_sentiment
            )
            
            # Store in history
            self.hci_scores.append({
                "timestamp": timestamp.isoformat(),
                "hci": hci_score,
                "text_sentiment": text_sentiment,
                "market_sentiment": market_sentiment
            })
            
            # Update emotional state
            self.update_emotional_state(hci_score)
            
            self.logger.info(f"HCI updated: {hci_score:.2f} - State: {self.emotional_state}")
    
    def get_current_hci(self) -> Dict:
        """
        Get current HCI and emotional state
        """
        if not self.hci_scores:
            return {
                "hci": 50.0,
                "emotional_state": "neutral",
                "trend": "stable",
                "confidence": 0.0
            }
        
        recent_scores = [entry["hci"] for entry in list(self.hci_scores)[-10:]]
        current_hci = recent_scores[-1]
        
        # Calculate trend
        if len(recent_scores) >= 2:
            trend_value = recent_scores[-1] - recent_scores[0]
            if trend_value > 5:
                trend = "rising"
            elif trend_value < -5:
                trend = "falling"
            else:
                trend = "stable"
        else:
            trend = "stable"
        
        # Calculate confidence based on data availability
        confidence = min(1.0, len(self.hci_scores) / 100)
        
        return {
            "hci": current_hci,
            "emotional_state": self.emotional_state,
            "trend": trend,
            "confidence": confidence,
            "timestamp": datetime.now().isoformat()
        }
    
    def get_hci_history(self, limit: int = 100) -> List[Dict]:
        """
        Get historical HCI data
        """
        return list(self.hci_scores)[-limit:]
    
    def get_resonance_analysis(self) -> Dict:
        """
        Analyze emotional resonance patterns
        """
        if len(self.hci_scores) < 10:
            return {
                "resonance_strength": 0.0,
                "dominant_emotion": "neutral",
                "volatility": 0.0
            }
        
        recent_hci = [entry["hci"] for entry in list(self.hci_scores)[-50:]]
        
        # Calculate resonance (inverse of volatility - high resonance = aligned emotions)
        volatility = np.std(recent_hci)
        resonance_strength = 1.0 / (1.0 + volatility / 10)  # Normalize
        
        # Dominant emotion
        avg_hci = np.mean(recent_hci)
        if avg_hci > 70:
            dominant_emotion = "euphoric"
        elif avg_hci > 60:
            dominant_emotion = "optimistic"
        elif avg_hci > 40:
            dominant_emotion = "neutral"
        elif avg_hci > 30:
            dominant_emotion = "pessimistic"
        else:
            dominant_emotion = "fearful"
        
        return {
            "resonance_strength": float(resonance_strength),
            "dominant_emotion": dominant_emotion,
            "volatility": float(volatility),
            "average_hci": float(avg_hci)
        }
    
    def health_check(self) -> bool:
        """Health check for module registration"""
        return True


if __name__ == "__main__":
    # Test the HCI Engine
    hci = HCIEngine()
    
    # Simulate sentiment data
    test_texts = [
        "Bitcoin is looking very bullish! Strong rally expected, confident in gains!",
        "Market crash incoming, bearish sentiment everywhere, panic selling",
        "Steady growth, optimistic about the long term outlook",
        "Fear and uncertainty dominate, weak support levels breaking down"
    ]
    
    # Simulate price data
    prices = [100, 102, 105, 103, 108, 112, 110, 115, 118, 120]
    
    print("HCI Engine Test\n" + "="*50)
    
    for i, text in enumerate(test_texts):
        hci.add_sentiment_data(
            text=text,
            price_data=prices[:min(len(prices), (i+1)*3)]
        )
        
        current = hci.get_current_hci()
        print(f"\nIteration {i+1}:")
        print(f"Text: {text[:50]}...")
        print(f"HCI Score: {current['hci']:.2f}")
        print(f"Emotional State: {current['emotional_state']}")
        print(f"Trend: {current['trend']}")
    
    print("\n" + "="*50)
    resonance = hci.get_resonance_analysis()
    print(f"\nResonance Analysis:")
    print(f"Strength: {resonance['resonance_strength']:.2f}")
    print(f"Dominant Emotion: {resonance['dominant_emotion']}")
    print(f"Average HCI: {resonance['average_hci']:.2f}")
