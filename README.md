# jonaskuiler.com

My personal site. One static page, no framework and no dependencies.

- `site/index.html` holds the story.
- `site/styles.css` holds the design.
- `site/fonts/` holds Archivo (SIL Open Font License), served from the site itself.

## Working on it

Open `site/index.html` in a browser, or run `npm start` for a local server.

## Deploying

Publish the `site/` folder as it is. Hosts that expect a build step can run
`npm run build`, which copies `site/` to `public/`.
