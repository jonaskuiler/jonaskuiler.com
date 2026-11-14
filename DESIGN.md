# Design

The interface system for jonaskuiler.com, recorded after the first build of the interface in the flight prototype (2026-11-14). It follows `PRODUCT.md` and the UI brief Jonas approved. The prototype source lives in the project files at `prototypes/flight.html`.

## The rule everything follows

There are two visual languages and they never mix.

- **The world** (landscape, sky, people) is flowing colour gradients. It lives in the 3D scene, and in the colour band at the top of the plain version.
- **Technology** (the drone, servers, in-world screens, data lines, and the whole interface) is wireframe: dark navy faces, sharp white edges, one cyan accent.

The interface is technology. It never uses a gradient, a blur, a glow or a rounded corner. It should read as the drone's own display.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--navy` | `#0b1030` | Plate faces, same as the 3D tech faces |
| `--deep` | `#060920` | Page ground behind the scene and in the plain version |
| `--plate` | `rgba(11, 16, 48, 0.94)` | Every surface that carries text over the world |
| `--edge` | `#ffffff` | 1px borders, the crosshair |
| `--edge-soft` | `rgba(255, 255, 255, 0.38)` | Dividers inside a plate |
| `--ink` | `#f3f5ff` | Text |
| `--dim` | `#b4bce0` | Secondary text, tinted from the navy, never grey |
| `--cyan` | `#9fefff` | The one accent: current waypoint, the visitor's own count, focus, selection |

Text never sits directly on the moving gradients. It always sits on a plate. The hook is the one exception and has a dark fade under it.

## Type

- **Archivo** (400, 600, 800) for all prose: the hook, titles, story copy, instructions, the waypoint index.
- **Martian Mono** (400, 500) only for measured data: battery, altitude, speed, flight time, counts, and the labels on in-world screens. Uppercase, tabular numerals.
- Scale: hook `clamp(24px, 3.6vw, 42px)`, scene title 24px, story copy 15px at 1.55, instructions 14px, telemetry 12px.
- No small label above a title. The title carries itself.

## Surfaces

- **Plate**: `--plate` face, 1px `--edge` border, square corners. The only container. Plates are never nested.
- **Opening**: the two hook lines and one instruction, which changes from "build the drone" to "Scroll to take off". Fades as the drone lifts.
- **Telemetry corners**: two plates, top left and top right. Values come from the flight. Hidden from assistive technology because they are atmosphere, not content.
- **Waypoint index**: a plate on the right with the scenes in story order. A small square marks each one, filled cyan for the current scene. On a phone it folds into one control that shows the current scene. It also offers "Read as a plain page".
- **Story panel**: scene title and Jonas's copy, bottom left. On a phone it is a bottom sheet that shows the title and opens with "Read".
- **Scene readout**: the visitor's own count and the one instruction for taking part, bottom right, with a line saying the scene's numbers are simulated. Totals are not repeated here.
- **In-world screens**: wireframe panels in the 3D scene carrying the scene's totals (for Rave to Save: euros raised, total steps with progress to the next euro, level 1 to 5).
- **Plain version**: all approved copy as normal sections on `--deep`, under one static colour band that stands in for the world. Shown with reduced motion, when 3D is unavailable, without JavaScript, or on request. "Start the flight" leads back.

Not built yet: the text screens for Who I am, 2026 and What I do best, and the contact surface.

## Motion

One authored entrance: the story panel wipes in from its edge on arrival (0.7s, `cubic-bezier(0.16, 1, 0.3, 1)`), and the readout follows 0.12s later. Everything else only fades. Reduced motion gets the plain version.

## Browser surfaces

Selection is cyan on navy. Focus is a 2px cyan outline with a 3px offset. The scrollbar is cyan on `--deep`.

## Honest numbers

Counts inside scenes are a simulation and are labelled as such wherever the visitor's own count is shown.
