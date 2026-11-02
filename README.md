# ArcadeHub

Premium static website for a gaming and esports lounge. Seven pages, HTML, CSS and JavaScript. No framework.

## Pages

- `index.html` — home, 8 sections
- `about.html`
- `services.html`
- `pricing.html`
- `tournaments.html`
- `party-events.html`
- `contact.html`

Each page has a shared navbar and footer plus exactly eight content sections.

## Images

Photographs are in `Assests/images/` (`image-1.png` through `image-103.png`). The folder name is spelled **Assests** as provided. Do not rename it unless you update every image path.

`assets/js/images-map.js` records the primary assignments and alt text used in the layout.

## Editable sample content

Replace these before a real launch:

- Address, phone and email (`hello@arcadehub.example`, `+1 (000) 000-0000`, 1200 Arena Boulevard)
- Opening hours
- Session, membership, group and party prices
- Tournament dates and prize figures
- About-page statistics
- Leaderboard rows
- Testimonials (marked as sample reviews, not verified feedback)

Forms validate in the browser and show a success note. They do not confirm a booking and do not send data to a server.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Libraries (CDN)

jQuery, GSAP, ScrollTrigger, Lenis, Three.js (home only), Swiper (home testimonials).
