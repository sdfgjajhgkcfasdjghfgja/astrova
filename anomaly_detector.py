#!/usr/bin/env python3
"""
🛰️ ASTROVA // SATELLITE TELEMETRY ANOMALY DETECTOR
-------------------------------------------------------
A real-time, multi-layered detection engine that processes streamed 
telemetry packets (either piped or generated) to flag anomalous behavior.

This file acts as the clean entry point, utilizing a modular design
under the `anomaly_engine` package for core detection and terminal UI rendering.
"""

import sys
import json
from anomaly_engine import (
    AnomalyDetector,
    RunningStats,
    THRESHOLDS,
    unpack_ccsds_packet,
    draw_initial_header,
    draw_dashboard,
    YELLOW,
    RESET
)

def run_detector():
    detector = AnomalyDetector()
    
    # Render initial UI header in terminal
    draw_initial_header()
    
    try:
        for line in sys.stdin:
            line = line.strip()
            if not line:
                continue
                
            packet = None
            try:
                # Check for 70 hex characters representing 35-byte CCSDS packet
                if len(line) == 70 and all(c in "0123456789abcdefABCDEF" for c in line):
                    packet_bytes = bytes.fromhex(line)
                    packet = unpack_ccsds_packet(packet_bytes)
                else:
                    packet = json.loads(line)
            except Exception:
                # Skip invalid or header lines gracefully
                continue
                
            if not packet:
                continue
                
            # Run detection systems
            result = detector.process_packet(packet)
            
            # Draw beautiful terminal dashboard
            draw_dashboard(
                processed_count=detector.processed_count,
                packet=packet,
                result=result,
                anomaly_log=detector.anomaly_log
            )
                    
    except KeyboardInterrupt:
        print(f"\n\n{YELLOW}[!] Detection engine shutdown requested.{RESET}")
        print("Goodbye, Space Control Officer! Tracking services disconnected. 🛰️")

if __name__ == "__main__":
    run_detector()
