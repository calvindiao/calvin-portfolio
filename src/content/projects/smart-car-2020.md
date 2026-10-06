---
title: A robot that follows sound
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
shortTitle: "Sound-following robot"
context: "Team project, 15th National Smart Car Competition"
badge: { label: "National 2nd Prize", icon: "trophy" }
system:
  nodes:
    - { kind: "Listen", title: "Microphone array", detail: "Hears the acoustic beacon" }
    - { kind: "Sample", title: "8-bit parallel ADC", detail: "High-speed sampling for the array" }
    - { kind: "MCU 1", title: "Signal MCU", detail: "FFT and cross-correlation give the beacon’s direction" }
    - { kind: "MCU 2", title: "Control MCU", detail: "PID and Kalman-filtered attitude drive the chassis" }
  links: ["audio", "samples", "direction"]
specs:
  - { parameter: "Result", condition: "15th National Smart Car Competition", value: "National Second Prize" }
  - { parameter: "Regional result", condition: "East China division", value: "First Prize" }
  - { parameter: "Microcontrollers", condition: "Signal processing / vehicle control", value: "2" }
  - { parameter: "Sampling", condition: "Microphone array", value: "8-bit parallel ADC" }
---

This competition robot listens before it moves: a microphone array finds an acoustic beacon, and a Mecanum-wheeled chassis drives toward it. One microcontroller samples and processes the audio; the other drives the vehicle with PID control and sensor fusion.

I worked on sound localization with FFT and cross-correlation, the C/C++ control software and OpenMV perception. The team also built the custom PCBs and optimized the chassis.
