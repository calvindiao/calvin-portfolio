---
title: Wearable motion capture
summary: Turn wearable sensor readings into a 3D view of how a person moves.
year: 2022
order: 2
field: Sensors and embedded systems
cover: mocap/pose-pairs.jpg
coverAlt: Two poses, each shown as the wearer’s real movement beside the skeleton reconstructed from the sensors
gallery: [mocap/prototype.png, mocap/prototype2.jpg, mocap/hardware.png, mocap/angle test.jpg, mocap/hardware workflow.png]
highlights:
  - Wearable electronics and STM32 firmware
  - IMU fusion with quaternion-based filtering
  - 3D reconstruction and joint analysis
tools: [STM32, C++, IMU, MATLAB]
video: eKBgN3s-vVk
article: /wearable-rehab-mocap/
shortTitle: "Motion capture"
context: "Undergraduate thesis, Best Thesis award"
badge: { label: "Best Thesis award", icon: "award" }
system:
  nodes:
    - { kind: "Sense", title: "IMU sensor nodes", detail: "Two STM32L071 nodes fuse 9-axis data with a quaternion Kalman filter", mine: true }
    - { kind: "Hub", title: "Central STM32L071", detail: "Collects limb angles; an SD card keeps an offline copy", mine: true }
    - { kind: "Radio", title: "2.4 GHz link", detail: "NRF24L01-based wireless module on a UART interface", mine: true }
    - { kind: "Host", title: "MATLAB + OpenSim", detail: "Inverse kinematics, 3D replay and range of motion", mine: true }
  links: ["limb angles", "UART", "wireless"]
specs:
  - { parameter: "Knee-angle error", condition: "Average over static and dynamic tests", value: "3", unit: "°" }
  - { parameter: "Microcontrollers", condition: "2 sensor nodes + 1 central unit", value: "3 × STM32L071" }
  - { parameter: "Wireless link", condition: "NRF24L01-based module", value: "2.4 GHz band" }
  - { parameter: "Offline storage", condition: "SD card over SDIO", value: "FATFS" }
---

Rehabilitation exercises are easier to understand when movement becomes visible. I built a wearable motion capture prototype aimed at making home-based training easier to observe and assess.

The system combines multiple inertial sensors with embedded processing. Quaternion-based Kalman filtering brings together accelerometer, gyroscope, and magnetometer readings to estimate orientation. Firmware on an STM32L0 manages sensing, buffering, and storage, while a wireless module carries the data to a computer.

On the PC side, a MATLAB and OpenSim workflow reconstructs body movement and supports inverse kinematics and joint range-of-motion analysis. An SD card provides an offline recording path alongside wireless transmission.

My work covered the circuit design, device structure, embedded software, sensor fusion, and host-side analysis. The device includes a magnetic switching mechanism intended to make it easier to use during exercises.

This was an engineering prototype exploring objective movement feedback, rather than a claim of clinical validation. The demo shows the sensing and reconstruction workflow; the original write-up includes hardware diagrams, filtering details, prototype photos, and angle measurement tests.
