#!/usr/bin/env python3
"""
🛰️ ASTROVA // SATELLITE TELEMETRY GENERATOR
--------------------------------------------------
A real-time telemetry simulator producing realistic orbital metrics:
- Temperature (°C) with sun/eclipse cycle thermal transition
- Battery (%) with solar charge / eclipse discharge curve
- Signal (dBm) with Doppler shift and antenna range drift
- Velocity (km/s) obeying Kepler's orbital mechanics

This script is highly simplified, utilizing `anomaly_engine` for configuration and terminal UI.
"""

import time
import math
import random
import sys
import struct
import threading
from anomaly_engine.utils.config import THRESHOLDS
from anomaly_engine.cli.ui import (
    draw_generator_initial,
    draw_generator_dashboard,
    RED,
    YELLOW,
    RESET
)

class KeplerianPropagator:
    def __init__(self, tle1=None, tle2=None):
        # Default fallback values (ISS)
        self.inclination = 51.64
        self.raan = 123.45
        self.eccentricity = 0.0005
        self.arg_perigee = 45.67
        self.mean_anomaly_epoch = 289.12
        self.mean_motion = 15.49  # revs per day
        
        if tle1 and tle2:
            try:
                self.inclination = float(tle2[8:16])
                self.raan = float(tle2[17:25])
                self.eccentricity = float("0." + tle2[26:33].strip())
                self.arg_perigee = float(tle2[34:42])
                self.mean_anomaly_epoch = float(tle2[43:51])
                self.mean_motion = float(tle2[52:63])
            except Exception:
                pass
            
    def propagate(self, tick):
        mu = 398600.4418
        r_earth = 6371.0
        
        n_rad = self.mean_motion * 2.0 * math.pi / 86400.0
        a = (mu / (n_rad ** 2)) ** (1.0 / 3.0)
        
        seconds_since_epoch = tick * 25.0
        M = math.radians(self.mean_anomaly_epoch) + n_rad * seconds_since_epoch
        M = M % (2.0 * math.pi)
        
        E = M
        for _ in range(10):
            delta = (E - self.eccentricity * math.sin(E) - M) / (1.0 - self.eccentricity * math.cos(E))
            E -= delta
            if abs(delta) < 1e-6:
                break
                
        sin_nu = (math.sqrt(1.0 - self.eccentricity**2) * math.sin(E)) / (1.0 - self.eccentricity * math.cos(E))
        cos_nu = (math.cos(E) - self.eccentricity) / (1.0 - self.eccentricity * math.cos(E))
        nu = math.atan2(sin_nu, cos_nu)
        
        r = a * (1.0 - self.eccentricity * math.cos(E))
        
        x_orb = r * math.cos(nu)
        y_orb = r * math.sin(nu)
        
        inc_rad = math.radians(self.inclination)
        raan_rad = math.radians(self.raan)
        arg_p_rad = math.radians(self.arg_perigee)
        
        cos_ap = math.cos(arg_p_rad)
        sin_ap = math.sin(arg_p_rad)
        cos_raan = math.cos(raan_rad)
        sin_raan = math.sin(raan_rad)
        cos_inc = math.cos(inc_rad)
        sin_inc = math.sin(inc_rad)
        
        x = x_orb * (cos_ap * cos_raan - sin_ap * sin_raan * cos_inc) - y_orb * (sin_ap * cos_raan + cos_ap * sin_raan * cos_inc)
        y = x_orb * (cos_ap * sin_raan + sin_ap * cos_raan * cos_inc) - y_orb * (sin_ap * sin_raan - cos_ap * cos_raan * cos_inc)
        z = x_orb * (sin_ap * sin_inc) + y_orb * (cos_ap * sin_inc)
        
        velocity = math.sqrt(mu * (2.0 / r - 1.0 / a))
        altitude = r - r_earth
        
        in_sunlight = True
        if x < 0:
            perp = math.sqrt(y**2 + z**2)
            if perp < r_earth:
                in_sunlight = False
                
        lat_gs = math.radians(39.9334)
        lng_gs = math.radians(32.8597)
        x_gs = r_earth * math.cos(lat_gs) * math.cos(lng_gs)
        y_gs = r_earth * math.cos(lat_gs) * math.sin(lng_gs)
        z_gs = r_earth * math.sin(lat_gs)
        
        dx = x - x_gs
        dy = y - y_gs
        dz = z - z_gs
        gs_range = math.sqrt(dx**2 + dy**2 + dz**2)
        
        dot = x_gs * dx + y_gs * dy + z_gs * dz
        above_horizon = dot > 0
        
        return {
            "velocity": velocity,
            "altitude": altitude,
            "in_sunlight": in_sunlight,
            "gs_range": gs_range,
            "above_horizon": above_horizon,
            "angle": M
        }

def simulate_telemetry():
    is_tty = sys.stdout.isatty()
    
    if is_tty:
        draw_generator_initial()
    
    # Parse command line TLE parameters
    tle1 = sys.argv[1] if len(sys.argv) > 1 else None
    tle2 = sys.argv[2] if len(sys.argv) > 2 else None
    
    propagator = KeplerianPropagator(tle1, tle2)
    
    # Initialize orbital state counters
    orbit_tick = 0
    
    # Base satellite parameters
    battery_level = 85.0  # %
    
    # Anomaly State tracking
    active_anomaly = None  # Can be "THERMAL_FLARE", "SIGNAL_FADE", "BATTERY_SPIKE" or None
    anomaly_duration = 0   # How many ticks the anomaly remains active
    
    # Background Stdin Listener Thread for interactive web control
    def listen_stdin():
        nonlocal active_anomaly, anomaly_duration
        while True:
            try:
                line = sys.stdin.readline()
                if not line:
                    break
                cmd = line.strip()
                if cmd == "INJECT:THERMAL_FLARE":
                    active_anomaly = "THERMAL_FLARE"
                    anomaly_duration = random.randint(5, 8)
                elif cmd == "INJECT:SIGNAL_FADE":
                    active_anomaly = "SIGNAL_FADE"
                    anomaly_duration = random.randint(5, 8)
                elif cmd == "INJECT:BATTERY_SPIKE":
                    active_anomaly = "BATTERY_SPIKE"
                    anomaly_duration = random.randint(5, 8)
            except Exception:
                break

    threading.Thread(target=listen_stdin, daemon=True).start()
    
    try:
        while True:
            # 1. ORBITAL POSITION CALCULATION VIA TLE
            orbit = propagator.propagate(orbit_tick)
            angle = orbit["angle"]
            in_sunlight = orbit["in_sunlight"]
            
            # 2. TRIGGER RANDOM ANOMALIES (10% chance if no anomaly is active)
            if not active_anomaly and random.random() < 0.10 and orbit_tick > 5:
                active_anomaly = random.choice(["THERMAL_FLARE", "SIGNAL_FADE", "BATTERY_SPIKE"])
                anomaly_duration = random.randint(3, 6) # Active for 3 to 6 ticks
                
            # 3. BASELINE VALUE CALCULATIONS (NORMAL FLOW)
            target_temp = 55.0 if in_sunlight else -15.0
            base_temp = target_temp + (15.0 * math.sin(angle))
            temperature = base_temp + random.uniform(-1.2, 1.2)
            
            if in_sunlight:
                battery_charge_delta = random.uniform(0.3, 0.6)
                battery_level += battery_charge_delta
            else:
                battery_drain_delta = random.uniform(0.15, 0.3)
                battery_level -= battery_drain_delta
            
            velocity = orbit["velocity"]
            
            # Real-world signal strength path loss model
            if orbit["above_horizon"]:
                signal = -40.0 - 15.0 * math.log10(orbit["gs_range"])
                signal = max(-110.0, min(-40.0, signal))
            else:
                signal = -115.0 + random.uniform(-3.0, 1.0)
            signal += random.uniform(-1.0, 1.0)
                
            # 4. APPLY ACTIVE ANOMALIES (OVERRIDING STANDARD FLOW)
            anomaly_info_banner = ""
            
            if active_anomaly:
                anomaly_duration -= 1
                
                if active_anomaly == "THERMAL_FLARE":
                    temperature = 115.5 + random.uniform(-2.5, 5.0)
                    anomaly_info_banner = f"\033[1m\033[31m⚠️ [CRITICAL] THERMAL FLARE DETECTED // PAYLOAD HEATSINK FAILURE // EXPONENTIAL THERMAL SPIKE{RESET}"
                
                elif active_anomaly == "SIGNAL_FADE":
                    signal = -118.5 + random.uniform(-1.5, 0.5)
                    anomaly_info_banner = f"\033[1m\033[33m⚠️ [WARNING] CRITICAL SIGNAL FADE // ANTENNA MISALIGNMENT // RECEIVER SENSITIVITY BREAKDOWN{RESET}"
                    
                elif active_anomaly == "BATTERY_SPIKE":
                    battery_level = max(3.0, battery_level * 0.15 + random.uniform(-1.0, 1.0))
                    anomaly_info_banner = f"\033[1m\033[31m⚠️ [CRITICAL] BATTERY RECON VOLTAGE SURGE // CURRENT SHUNT SHORT-CIRCUIT // POWER BUS DECAY{RESET}"
                
                if anomaly_duration <= 0:
                    active_anomaly = None
            
            # Guard physical absolute bounds
            temperature = max(-40.0, min(140.0, temperature))
            battery_level = max(0.0, min(100.0, battery_level))
            signal = max(-125.0, min(-30.0, signal))
            
            # 5. CCSDS SPACE PACKET COMPILATION (35 bytes binary)
            timestamp_val = int(time.time())
            apid = 0x1A5 # 421 decimal
            packet_id = 0x09A5
            
            seq_flags = 3
            seq_count = orbit_tick % 16384
            packet_seq = (seq_flags << 14) | seq_count
            packet_len = 28
            
            anomaly_map = {None: 0, "THERMAL_FLARE": 1, "SIGNAL_FADE": 2, "BATTERY_SPIKE": 3}
            anomaly_enum = anomaly_map.get(active_anomaly, 0)
            
            packet_bytes = struct.pack(
                ">HHHIfffffHBBB",
                packet_id,
                packet_seq,
                packet_len,
                timestamp_val,
                float(temperature),
                float(battery_level),
                float(signal),
                float(velocity),
                float(angle),
                int(orbit_tick // 120),
                1 if in_sunlight else 0,
                1 if active_anomaly is not None else 0,
                anomaly_enum
            )
            
            # 6. OUTPUT ROUTINE (CHECK TTY STATUS)
            try:
                if not is_tty:
                    # Print raw hex bytes of CCSDS packet for pipe parsing
                    print(packet_bytes.hex())
                    sys.stdout.flush()
                else:
                    # Render the beautiful interactive dashboard using cli helper
                    draw_generator_dashboard(
                        orbit_tick=orbit_tick,
                        angle=angle,
                        in_sunlight=in_sunlight,
                        active_anomaly=active_anomaly,
                        anomaly_duration=anomaly_duration,
                        anomaly_info_banner=anomaly_info_banner,
                        temperature=temperature,
                        battery_level=battery_level,
                        signal=signal,
                        velocity=velocity,
                        packet_bytes=packet_bytes,
                        apid=apid,
                        seq_count=seq_count,
                        packet_len=packet_len,
                        timestamp_val=timestamp_val
                    )
            except (BrokenPipeError, ConnectionResetError, IOError):
                try:
                    sys.stdout = None
                except:
                    pass
                sys.exit(0)
            
            orbit_tick += 1
            time.sleep(1.5)
            
    except KeyboardInterrupt:
        if is_tty:
            print(f"\n\n{YELLOW}[!] Telemetry stream halted by user request.{RESET}")
            print("Goodbye, Space Operator! Keep hunting those orbital telemetry anomalies! 🚀")

if __name__ == "__main__":
    simulate_telemetry()
