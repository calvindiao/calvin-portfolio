---
title: Self-balancing motorcycle
summary: Keep a two-wheeled robot upright while it follows an electromagnetic track.
year: 2021
order: 3
field: Robotics and control
cover: 2021/20210816_030631.jpg
coverAlt: The self-balancing motorcycle prototype, held up in the lab
gallery: [2021/20210824_190540.jpg, 2021/IMG_20210814_051006.jpg, 2021/photo.jpg]
highlights:
  - Developed sensor fusion and fuzzy PID control in C/C++.
  - Designed the electronics, PCB, and mechanical structure.
  - Earned a National Second Prize in the 16th Smart Car Competition.
tools: [C/C++, Kalman filtering, PID, PCB]
video: M-G5Jj6L29o
article: /smart-car-2021/
shortTitle: "Balancing motorcycle"
context: "Team project, 16th National Smart Car Competition"
badge: "National 2nd Prize"
system:
  nodes:
    - { kind: "Sense", title: "Magnetic sensors + IMU", detail: "Custom sensors read the electromagnetic track" }
    - { kind: "Estimate", title: "Kalman filter", detail: "Turns IMU readings into tilt and attitude" }
    - { kind: "Control", title: "Fuzzy PID", detail: "Handles the coupling between tilt and steering" }
    - { kind: "Actuate", title: "Steering + drive", detail: "MOSFET drivers on a custom PCB, no flywheel" }
  links: ["raw readings", "tilt angle", "commands"]
specs:
  - { parameter: "Result", condition: "16th National Smart Car Competition", value: "National Second Prize" }
  - { parameter: "Regional result", condition: "East China division", value: "First Prize" }
  - { parameter: "Balance aid", condition: "Real-time control only", value: "No flywheel" }
  - { parameter: "Interfaces", condition: "Sensors and peripherals", value: "I²C, UART, SPI, DMA" }
---

Our second Smart Car Competition entry: an electric motorcycle that follows an electromagnetic track and stays upright through real-time control alone, with no flywheel. Steering changes balance and balance changes steering, so I fused IMU data with a Kalman filter and used fuzzy PID to handle the coupling, in C/C++.

I also worked on the mechanical structure and designed the circuit boards and power electronics, keeping analog sensing apart from digital processing to reduce interference.
