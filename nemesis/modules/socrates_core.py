#!/usr/bin/env python3
"""
Socrates Core (L0) - Self-healing kernel and system stability manager
Manages system health, process monitoring, and auto-recovery
"""

import os
import sys
import time
import json
import psutil
import logging
import threading
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Callable


class SocratesCore:
    """Self-healing kernel for Nemesis Oracle system"""
    
    def __init__(self, config_path: str = None):
        self.root_dir = Path(__file__).parent.parent
        self.config_path = config_path or self.root_dir / "config" / "app_config.json"
        self.config = self._load_config()
        self.logger = self._setup_logging()
        
        # System state
        self.is_running = False
        self.registered_modules = {}
        self.module_health = {}
        self.system_metrics = {}
        
        # Watchdog
        self.watchdog_thread = None
        self.health_check_interval = self.config.get("watchdog", {}).get("check_interval", 10)
        
        self.logger.info("Socrates Core initialized - Phase 10C")
    
    def _load_config(self) -> Dict:
        """Load system configuration"""
        try:
            with open(self.config_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading config: {e}")
            return {}
    
    def _setup_logging(self) -> logging.Logger:
        """Setup structured logging"""
        log_dir = self.root_dir / "logs"
        log_dir.mkdir(exist_ok=True)
        
        log_file = log_dir / f"socrates_core_{datetime.now().strftime('%Y%m%d')}.log"
        
        logger = logging.getLogger("SocratesCore")
        logger.setLevel(logging.INFO)
        
        # File handler
        fh = logging.FileHandler(log_file)
        fh.setLevel(logging.INFO)
        
        # Console handler
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)
        
        # Formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)
        
        logger.addHandler(fh)
        logger.addHandler(ch)
        
        return logger
    
    def register_module(self, name: str, module_instance, health_check: Optional[Callable] = None):
        """Register a module with the core for monitoring"""
        self.registered_modules[name] = {
            "instance": module_instance,
            "health_check": health_check,
            "registered_at": datetime.now().isoformat(),
            "restart_count": 0
        }
        self.module_health[name] = {
            "status": "registered",
            "last_check": None,
            "healthy": True
        }
        self.logger.info(f"Module registered: {name}")
    
    def unregister_module(self, name: str):
        """Unregister a module"""
        if name in self.registered_modules:
            del self.registered_modules[name]
            del self.module_health[name]
            self.logger.info(f"Module unregistered: {name}")
    
    def check_module_health(self, name: str) -> bool:
        """Check health of a specific module"""
        if name not in self.registered_modules:
            return False
        
        module_info = self.registered_modules[name]
        health_check = module_info.get("health_check")
        
        try:
            if health_check and callable(health_check):
                is_healthy = health_check()
            else:
                # Default health check - just verify instance exists
                is_healthy = module_info["instance"] is not None
            
            self.module_health[name].update({
                "status": "healthy" if is_healthy else "unhealthy",
                "last_check": datetime.now().isoformat(),
                "healthy": is_healthy
            })
            
            return is_healthy
        except Exception as e:
            self.logger.error(f"Health check failed for {name}: {e}")
            self.module_health[name].update({
                "status": "error",
                "last_check": datetime.now().isoformat(),
                "healthy": False,
                "error": str(e)
            })
            return False
    
    def get_system_metrics(self) -> Dict:
        """Collect system-level metrics"""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            metrics = {
                "timestamp": datetime.now().isoformat(),
                "cpu": {
                    "percent": cpu_percent,
                    "count": psutil.cpu_count()
                },
                "memory": {
                    "total_gb": round(memory.total / (1024**3), 2),
                    "used_gb": round(memory.used / (1024**3), 2),
                    "percent": memory.percent
                },
                "disk": {
                    "total_gb": round(disk.total / (1024**3), 2),
                    "used_gb": round(disk.used / (1024**3), 2),
                    "percent": disk.percent
                },
                "process": {
                    "pid": os.getpid(),
                    "threads": threading.active_count()
                }
            }
            
            self.system_metrics = metrics
            return metrics
        except Exception as e:
            self.logger.error(f"Error collecting system metrics: {e}")
            return {}
    
    def _watchdog_loop(self):
        """Main watchdog loop for monitoring system health"""
        self.logger.info("Watchdog started")
        
        while self.is_running:
            try:
                # Check all registered modules
                for module_name in list(self.registered_modules.keys()):
                    is_healthy = self.check_module_health(module_name)
                    
                    if not is_healthy:
                        self.logger.warning(f"Module {module_name} is unhealthy")
                        # Auto-healing logic could go here
                
                # Collect system metrics
                self.get_system_metrics()
                
                # Sleep until next check
                time.sleep(self.health_check_interval)
                
            except Exception as e:
                self.logger.error(f"Watchdog error: {e}")
                time.sleep(self.health_check_interval)
        
        self.logger.info("Watchdog stopped")
    
    def start(self):
        """Start the Socrates Core system"""
        if self.is_running:
            self.logger.warning("Socrates Core already running")
            return
        
        self.is_running = True
        self.logger.info("Starting Socrates Core...")
        
        # Start watchdog thread
        if self.config.get("watchdog", {}).get("enabled", True):
            self.watchdog_thread = threading.Thread(target=self._watchdog_loop, daemon=True)
            self.watchdog_thread.start()
            self.logger.info("Watchdog thread started")
        
        self.logger.info("Socrates Core started successfully")
    
    def stop(self):
        """Stop the Socrates Core system"""
        if not self.is_running:
            return
        
        self.logger.info("Stopping Socrates Core...")
        self.is_running = False
        
        # Wait for watchdog to stop
        if self.watchdog_thread and self.watchdog_thread.is_alive():
            self.watchdog_thread.join(timeout=5)
        
        self.logger.info("Socrates Core stopped")
    
    def get_status(self) -> Dict:
        """Get current system status"""
        return {
            "core": {
                "running": self.is_running,
                "phase": self.config.get("system", {}).get("phase", "unknown"),
                "uptime": "active" if self.is_running else "stopped"
            },
            "modules": self.module_health,
            "metrics": self.system_metrics
        }
    
    def self_heal(self, module_name: str) -> bool:
        """Attempt to heal a failed module"""
        if module_name not in self.registered_modules:
            self.logger.error(f"Cannot heal unknown module: {module_name}")
            return False
        
        module_info = self.registered_modules[module_name]
        max_attempts = self.config.get("watchdog", {}).get("restart_attempts", 3)
        
        if module_info["restart_count"] >= max_attempts:
            self.logger.error(f"Module {module_name} exceeded max restart attempts")
            return False
        
        try:
            self.logger.info(f"Attempting to heal module: {module_name}")
            module_info["restart_count"] += 1
            
            # Module-specific healing logic would go here
            # For now, just log the attempt
            
            self.logger.info(f"Module {module_name} healing attempted")
            return True
        except Exception as e:
            self.logger.error(f"Failed to heal module {module_name}: {e}")
            return False


if __name__ == "__main__":
    # Test the Socrates Core
    core = SocratesCore()
    core.start()
    
    print("Socrates Core running. Press Ctrl+C to stop...")
    
    try:
        while True:
            status = core.get_status()
            print(f"\nSystem Status: {json.dumps(status, indent=2)}")
            time.sleep(10)
    except KeyboardInterrupt:
        print("\nShutting down...")
        core.stop()
