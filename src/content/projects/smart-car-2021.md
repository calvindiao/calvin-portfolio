---
title: A motorcycle that balances itself
shortTitle: Smart Car 2021
summary: Keep a two-wheeled robot upright while it follows an electromagnetic track.
year: 2021
order: 3
field: Robotics and control
cover: 2021/20210816_030631.jpg
coverAlt: Self-balancing motorcycle prototype on a competition track
gallery: [2021/20210824_190540.jpg, 2021/IMG_20210814_051006.jpg, 2021/photo.jpg]
highlights:
  - Developed sensor fusion and fuzzy PID control in C/C++.
  - Designed the electronics, PCB, and mechanical structure.
  - Earned a National Second Prize in the 16th Smart Car Competition.
tools: [C/C++, Kalman filtering, PID, PCB]
video: M-G5Jj6L29o
article: /smart-car-2021/
---

For our second year in the National Smart Car Competition, we built a self-balancing electric motorcycle. It follows an electromagnetic track using custom magnetic sensors and stays upright through real-time control, without a stabilizing flywheel.

The challenge connects mechanics and software: steering changes balance, balance changes steering, and the controller must respond while the vehicle is moving. I developed C/C++ control software, fused IMU measurements with Kalman filtering, and used fuzzy PID control to handle the coupling between tilt and steering.

The physical design mattered just as much. I worked on the mechanical structure and 3D modeling, designed the circuit boards and power electronics, and separated analog sensing from digital processing to reduce interference. A compact PCB and careful weight distribution helped keep the vehicle manageable for the controller.

Our project received a National Second Prize at the 16th National Smart Car Competition. The competition video shows the completed vehicle on the track. The gallery and original write-up document the mechanical assembly, electronics, and team results behind that run.
