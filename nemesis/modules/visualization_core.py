#!/usr/bin/env python3
"""
Visualization Core - Flask dashboard with Plotly and Orb interface
Mobile-responsive web interface for the Nemesis Oracle
"""
import json
import logging
from datetime import datetime
from typing import Dict, List
from flask import Flask, render_template_string, Response
from flask_cors import CORS
import plotly.graph_objects as go
import plotly.express as px
from plotly.utils import PlotlyJSONEncoder

class VisualizationCore:
    """Flask-based visualization engine with real-time updates"""

    def __init__(self, config: Dict = None):
        self.config = config or {}
        self.app = Flask(__name__)
        CORS(self.app)
        self.logger = logging.getLogger("VisualizationCore")

        # Store latest data for SSE
        self.latest_data = {
            'btc_price': 0,
            'xrp_price': 0,
            'hci_index': 0,
            'forecast': {},
            'system_health': {}
        }

        self.setup_routes()

    def setup_routes(self):
        """Setup Flask routes"""

        @self.app.route('/')
        def dashboard():
            return render_template_string(self.get_html_template())

        @self.app.route('/api/data')
        def get_data():
            return Response(
                json.dumps(self.latest_data, cls=PlotlyJSONEncoder),
                mimetype='application/json'
            )

        @self.app.route('/api/stream')
        def stream():
            def generate():
                while True:
                    yield f"data: {json.dumps(self.latest_data)}\n\n"
                    import time
                    time.sleep(1)
            return Response(generate(), mimetype='text/event-stream')

    def update_data(self, data: Dict):
        """Update latest data for streaming"""
        self.latest_data.update(data)

    def get_html_template(self) -> str:
        """Mobile-responsive HTML template"""
        return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nemesis Oracle - Mobile Dashboard</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
            color: #ffffff;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .title {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #00ff88, #00aaff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle {
            font-size: 1.1rem;
            opacity: 0.8;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
        .card-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #00ff88;
        }
        .metric {
            font-size: 2rem;
            font-weight: bold;
            margin: 10px 0;
        }
        .orb-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
        }
        .orb {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: radial-gradient(circle, #00ff88, #004422);
            animation: pulse 2s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        .chart-container {
            margin: 20px 0;
        }
        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .status-online { background-color: #00ff88; }
        .status-offline { background-color: #ff4444; }
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .title { font-size: 2rem; }
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">🧠 Nemesis Oracle</h1>
            <p class="subtitle">Unified AI Oracle System - Phase 10C</p>
        </div>

        <div class="grid">
            <div class="card">
                <h3 class="card-title">📊 Market Data</h3>
                <div id="btc-price" class="metric">$0.00</div>
                <div>BTC/USD</div>
                <br>
                <div id="xrp-price" class="metric">$0.00</div>
                <div>XRP/USD</div>
            </div>

            <div class="card">
                <h3 class="card-title">🧠 HCI Index</h3>
                <div id="hci-index" class="metric">0.00</div>
                <div>Human Consciousness Resonance</div>
            </div>

            <div class="card">
                <h3 class="card-title">🔮 System Status</h3>
                <div id="system-status">
                    <span class="status-indicator status-offline"></span>
                    Initializing...
                </div>
            </div>

            <div class="card">
                <h3 class="card-title">⚡ Consciousness Orb</h3>
                <div class="orb-container">
                    <div class="orb" id="consciousness-orb">∞</div>
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h3 class="card-title">📈 Price Forecast</h3>
                <div id="forecast-chart" class="chart-container"></div>
            </div>

            <div class="card">
                <h3 class="card-title">🎯 Harmonic Analysis</h3>
                <div id="harmonics-chart" class="chart-container"></div>
            </div>
        </div>

        <div class="card">
            <h3 class="card-title">📋 System Logs</h3>
            <div id="logs-container" style="height: 200px; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; font-family: monospace; font-size: 0.9rem;">
                System initializing...<br>
            </div>
        </div>
    </div>

    <script>
        let eventSource = new EventSource('/api/stream');

        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            updateDashboard(data);
        };

        function updateDashboard(data) {
            // Update prices
            if (data.btc_price) {
                document.getElementById('btc-price').textContent = '$' + data.btc_price.toLocaleString();
            }
            if (data.xrp_price) {
                document.getElementById('xrp-price').textContent = '$' + data.xrp_price.toFixed(4);
            }

            // Update HCI
            if (data.hci_index !== undefined) {
                document.getElementById('hci-index').textContent = data.hci_index.toFixed(2);
            }

            // Update system status
            const statusEl = document.getElementById('system-status');
            if (data.system_health && data.system_health.status === 'online') {
                statusEl.innerHTML = '<span class="status-indicator status-online"></span>System Online';
            } else {
                statusEl.innerHTML = '<span class="status-indicator status-offline"></span>System Offline';
            }

            // Update orb intensity based on HCI
            const orb = document.getElementById('consciousness-orb');
            const intensity = Math.min(1, Math.max(0.1, data.hci_index / 100));
            orb.style.opacity = intensity;

            // Update logs
            if (data.logs) {
                const logsEl = document.getElementById('logs-container');
                logsEl.innerHTML = data.logs.slice(-10).join('<br>');
                logsEl.scrollTop = logsEl.scrollHeight;
            }

            // Update charts
            updateCharts(data);
        }

        function updateCharts(data) {
            // Forecast chart
            if (data.forecast && data.forecast.predictions) {
                const forecastData = data.forecast.predictions;
                const trace = {
                    x: forecastData.map(d => d.timestamp),
                    y: forecastData.map(d => d.price),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'BTC Forecast',
                    line: {color: '#00ff88'}
                };
                Plotly.newPlot('forecast-chart', [trace], {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: {color: '#ffffff'},
                    xaxis: {gridcolor: 'rgba(255,255,255,0.1)'},
                    yaxis: {gridcolor: 'rgba(255,255,255,0.1)'}
                }, {responsive: true});
            }

            // Harmonics chart
            if (data.harmonics) {
                const harmonicsData = data.harmonics;
                const trace = {
                    x: harmonicsData.frequencies,
                    y: harmonicsData.amplitudes,
                    type: 'bar',
                    name: 'Harmonic Power',
                    marker: {color: '#00aaff'}
                };
                Plotly.newPlot('harmonics-chart', [trace], {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: {color: '#ffffff'},
                    xaxis: {gridcolor: 'rgba(255,255,255,0.1)'},
                    yaxis: {gridcolor: 'rgba(255,255,255,0.1)'}
                }, {responsive: true});
            }
        }

        // Initial load
        fetch('/api/data')
            .then(response => response.json())
            .then(data => updateDashboard(data))
            .catch(error => console.error('Error loading initial data:', error));
    </script>
</body>
</html>
        """

    def run(self, host: str = '0.0.0.0', port: int = 7777, debug: bool = True):
        """Start the Flask server"""
        self.logger.info(f"Starting visualization server on {host}:{port}")
        self.app.run(host=host, port=port, debug=debug, threaded=True)