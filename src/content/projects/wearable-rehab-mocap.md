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

Rehabilitation exercises are easier to judge when movement becomes visible. Wearable sensor nodes fuse accelerometer, gyroscope and magnetometer readings with a quaternion Kalman filter; STM32 firmware stores the data on an SD card and sends it wirelessly to a PC, where MATLAB and OpenSim reconstruct the movement and joint range.

I did the circuit design, device structure, firmware, sensor fusion and host-side analysis. It is an engineering prototype, not a clinically validated device.
