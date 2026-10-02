---
title: A robot that follows sound
shortTitle: Smart Car 2020
summary: Find an acoustic beacon and drive toward it using a microphone array.
year: 2020
order: 4
field: Robotics and signal processing
cover: 2020/20200925_143817.jpg
coverAlt: Overhead view of the Mecanum-wheeled acoustic localization robot
gallery: [2020/20200609_223638.jpg, 2020/1598536641490.jpeg]
highlights:
  - Located a sound source with FFT and cross-correlation.
  - Split sensing and vehicle control across two microcontrollers.
  - Earned a National Second Prize in the 15th Smart Car Competition.
tools: [C/C++, Signal processing, OpenMV, PCB]
video: 9fxU5Fqx_os
article: /smart-car-2020/
---

This competition robot listens before it moves. A microphone array detects an acoustic beacon, and a Mecanum-wheeled chassis drives toward the source while correcting its position.

The project brought together signal processing, embedded software, electronics, and mechanical design. I worked on FFT and cross-correlation methods for sound localization, control software in C/C++, and perception with an OpenMV module. PID control and sensor fusion supported the vehicle's movement and attitude estimation.

We split the work between two microcontrollers: one handles signal acquisition and processing, while the other controls the vehicle. A parallel ADC supports the acquisition path. The electronics include custom PCBs, motor drivers, and power management, with attention to signal shielding and protection.

Mechanical work included chassis modeling and optimization of the Mecanum-wheel arrangement. The final system combined sensing, processing, and actuation in a working vehicle that competed on a real course.

Our team received a National Second Prize at the 15th National Smart Car Competition. The finals video shows the robot in action; the original article includes prototype photos and award records.
