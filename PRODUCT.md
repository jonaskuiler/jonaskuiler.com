# Product

<!-- impeccable:product-schema 1 -->

Source: the story interview (`story-outline.md`, `story/story-v1.md`) and the experience briefing Jonas gave between 2026-11-11 and 2026-11-14. Jonas asked for this record to be initialized from that briefing instead of a new interview. Lines marked *(inferred)* were not stated by him in those words.

## Platform

web

## Stack

Open decision. The repository still holds the old Gatsby 4 site, which this work replaces. The working prototype is a single HTML page using three.js with custom shaders. Jonas has not chosen the stack for the real build.

## Users

Potential clients: founders, agencies and product leads who are considering Jonas for a project. They arrive from a referral, a LinkedIn profile or a search, usually on a laptop, sometimes on a phone, and they are evaluating him. They should leave thinking "this person gets it". Recognition, not a hard sell.

## Product Purpose

jonaskuiler.com is Jonas Kuiler's personal site. It tells his story: who he is, how he sees being a developer in 2026, what he does best, and five pieces of featured work. It does this as an interactive first-person flight, so that the site is itself proof of the claim it makes: give him a vague idea and he makes it come alive.

Success is a visitor who understands what Jonas builds, has felt it by taking part in at least one project scene, and says hi.

## Positioning

Solo freelancer and builder, a "professional outlier". The spine is **digital meets the real**: software that touches music, places, bodies, cars and crowds. The real world is the test of done. His 2026 stance: AI should make one thing better, not more things.

What a neighbouring portfolio could not copy: every featured project is shown as its own live data flow that the visitor becomes part of, because turning real-world activity into live data is what the projects actually did.

## Operating Context

- One continuous journey, driven by scrolling, in the order of the story: hook, who I am, being a developer in 2026, what I do best, the five projects, contact.
- The visitor sees through the eyes of an FPV drone. Jonas builds and flies FPV drones; the drone is his, not a metaphor picked for the category.
- A small waypoint index lets a visitor in a hurry jump to any scene.
- Each project scene gives the visitor one small action that makes them part of the data (for Rave to Save: moving counts as dance steps).
- The ending invites a message: the visitor types a hi and it travels to Jonas as data.

## Capabilities and Constraints

- Copy is written by Jonas, in English, first person, direct, with a bit of dry humour. Story v1 is approved; do not rewrite it. Known copy gaps are listed at the bottom of `story/story-v1.md`.
- Featured work, in order: Rave to Save, Woov, Testdrive that explains the car, Strength training app, Legacy rebuild.
- The car client and the legacy-rebuild client are described generically, not named.
- Two visual languages are a binding product rule, because they carry the story's spine:
  - The world and the people in it are lively, flowing colour gradients (paint, mesh gradients).
  - Everything technical or digital (the drone, servers, screens, data, coins, the interface) shares one wireframe style: dark faces, sharp light edges.
- Fallback: on slow phones or with reduced motion, the site shows plain sections in the same palette.
- Undecided: the stack; the scenes for Woov, the car, the strength app and the legacy rebuild beyond their concept; how the contact message is delivered; contact details (email, links), which Jonas set aside for now; whether a condensed CV appears.

## Brand Commitments

- Name: Jonas Kuiler, jonaskuiler.com.
- Voice: direct, personal, first person, dry humour. No hard sell.
- Hook, verbatim: "As a kid I pictured things I couldn't build. Now I can build almost anything I picture."
- Visual references Jonas made binding on 2026-11-14: six images of flowing gradient surfaces and a neon wireframe grid; from them the two-language rule above. He rejected dotted or particle patterns as the main material, and rejected hard-striped paint.
- People are real silhouettes (head, shoulders, arms), not abstract blobs.
- The opening is not his face.

## Evidence on Hand

- Approved copy: `story/story-v1.md` in the project files.
- Decisions and his own quotes: `story-outline.md`.
- Experience concept: https://claude.ai/artifact/76CurGanTbGGL5L9M8Mk31
- Working prototype (opening and Rave to Save): https://claude.ai/artifact/W36h425HaBLb1y9Kdp5uJC, source in the project files at `prototypes/flight.html`.
- Facts confirmed by Jonas: Woov reached 5,000 users at launch, at Soenda. Rave to Save raised €1 per 1,000 steps, counted by sensor wristbands and phones, aggregated by his server onto the club's big screens.
- Not on hand, do not fabricate: testimonials, client logos, fundraising totals for Rave to Save (published figures are unreliable), photos or video of the projects, contact details.
- Numbers shown inside scenes (step counts, euros, levels) are illustrative simulation, not reported results. *(inferred: they must never be presented as real totals)*

## Product Principles

1. The site is the proof. If a scene would not impress a client as a piece of work on its own, it does not ship.
2. The real world is warm and alive; technology is precise. Never blur the two languages.
3. Take part, don't watch. Every scene gives the visitor one thing to do, and it changes the data.
4. One thing better, not more things. Fewer scenes finished properly beat more scenes half done.
5. The story still lands without the show: the copy must be readable by someone who never moves the mouse, and by someone on the plain fallback.

## Accessibility & Inclusion

- Honour reduced motion with the plain-section fallback.
- All story copy must be reachable as real text, not only inside the 3D scene. *(inferred from the fallback decision)*
- No standard has been named by Jonas yet.
