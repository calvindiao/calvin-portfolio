---
title: AR panoramic calling
summary: Step into someone else's room through a live 360° video call.
year: 2025
order: 0
field: Immersive software
cover: AR/result2.png
coverAlt: Calvin wearing Rokid AR glasses during a panoramic video call
gallery: [AR/arcover.png, AR/workflow.png, AR/UML.jpeg]
highlights:
  - Unity app with head-tracked 360° playback
  - Camera-to-cloud streaming on AR glasses
  - Real-device testing and latency analysis
tools: [Unity, Android, Rokid, HLS]
video: shrMtn-MXbk
article: /ar-panoramic-calling/
shortTitle: "AR calling"
context: "M.Eng. project, McMaster University"
badge: { label: "M.Eng. project", icon: "graduation" }
system:
  nodes:
    - { kind: "Capture", title: "Insta360 X2", detail: "360° camera in the remote room" }
    - { kind: "Cloud", title: "Live streaming platform", detail: "Ingest, transcode and CDN delivery; I set up its push and pull domains" }
    - { kind: "App", title: "Unity calling app", detail: "AVPro decodes the stream onto the inside of a sphere", mine: true }
    - { kind: "Display", title: "Rokid Air glasses", detail: "3DoF head tracking picks the view" }
  links: ["RTMP push", "HLS pull", "stereo render"]
specs:
  - { parameter: "Call setup time", condition: "After tapping Call", value: "3–5", unit: "s" }
  - { parameter: "Stream delay", condition: "HLS; cross-region routes add more", value: "2–5", unit: "s" }
  - { parameter: "Playback frame rate", condition: "Rokid Air driven by a phone", value: "15–30", unit: "fps" }
  - { parameter: "Heat and performance dips", condition: "Long sessions on phone-driven glasses", value: "~20", unit: "min" }
---

A video call usually gives you a small, flat window into another place. For my M.Eng. project, I built a system that puts that place around you instead: a live panorama you can explore simply by moving your head.

An Insta360 X2 captures the remote scene. A cloud streaming platform distributes the video, and a Unity app renders it inside a panoramic sphere on Rokid Air glasses. Head tracking changes the view as the wearer looks around. The camera, cloud service, and playback app form separate parts of the pipeline.

I built the Android application, integrated the Rokid SDK and AVPro Video playback, added contact management, and worked on preloading to reduce the wait at the start of a call. I also configured the stream's publishing and playback domains.

The prototype established calls in roughly 3–5 seconds in the documented tests. HLS introduces a delay, and the phone driving the glasses can heat up during longer sessions. Those constraints are part of the project: this is an exploration of remote presence with real hardware, with its results and limitations documented alongside the demo.
