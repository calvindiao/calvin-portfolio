---
title: Wearable motion capture
shortTitle: Motion Capture
summary: Turn wearable sensor readings into a 3D view of how a person moves.
year: 2022
order: 2
field: Sensors and embedded systems
cover: mocap/prototype.png
coverAlt: Wearable sensor prototype and a reconstructed body pose
gallery: [mocap/prototype2.jpg, mocap/hardware.png, mocap/angle test.jpg, mocap/hardware workflow.png]
highlights:
  - Wearable electronics and STM32 firmware
  - IMU fusion with quaternion-based filtering
  - 3D reconstruction and joint analysis
tools: [STM32, C++, IMU, MATLAB]
video: eKBgN3s-vVk
article: /wearable-rehab-mocap/
---

Rehabilitation exercises are easier to understand when movement becomes visible. I built a wearable motion capture prototype aimed at making home-based training easier to observe and assess.

The system combines multiple inertial sensors with embedded processing. Quaternion-based Kalman filtering brings together accelerometer, gyroscope, and magnetometer readings to estimate orientation. Firmware on an STM32L0 manages sensing, buffering, and storage, while a wireless module carries the data to a computer.

On the PC side, a MATLAB and OpenSim workflow reconstructs body movement and supports inverse kinematics and joint range-of-motion analysis. An SD card provides an offline recording path alongside wireless transmission.

My work covered the circuit design, device structure, embedded software, sensor fusion, and host-side analysis. The device includes a magnetic switching mechanism intended to make it easier to use during exercises.

This was an engineering prototype exploring objective movement feedback, rather than a claim of clinical validation. The demo shows the sensing and reconstruction workflow; the original write-up includes hardware diagrams, filtering details, prototype photos, and angle measurement tests.
