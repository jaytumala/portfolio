# Jay Tumala — portfolio

Plain HTML/CSS/JS. No build step, no dependencies. Upload as-is to GitHub Pages.

```
index.html        page structure and copy (hero, services, process, about, contact)
js/projects.js    ← YOUR PROJECTS. Edit this list to update the whole site
js/stack.js       ← YOUR TOOLS for the logo loop under the hero
js/tool-icons.js  the tool logos (from Simple Icons), bundled so they always load
js/main.js        all the interactions
css/style.css     all styling; colours and fonts are at the top in :root
images/           jay-cutout.webp (hero photo), og-image.jpg (share preview), your project covers
```

## Project images
The 15 Behance covers are saved in `images/projects/` (named by Behance project ID)
and set as `image` in `js/projects.js`. To swap one, replace the file or point
`image` at a new one.

## Add more project images
1. Export each cover as WebP or JPG, ~1600px wide, under ~300 KB.
2. Put it in `images/`, e.g. `images/sky-floors.webp`.
3. In `js/projects.js`, set that project's `image: "images/sky-floors.webp"`.

If `image` is empty, the site uses the Behance cover. If neither loads, it shows
a generated colour artwork, so nothing ever looks broken.

## Other things to personalise
- **Email and LinkedIn**: in the Contact section of `index.html` (email appears 3 times).
- **Experience**: the two `20XX` rows in the About timeline.
- **Project write-ups**: fill in `summary` (and `year`) in `js/projects.js`;
  they appear in the project popup.
- **Selected projects**: set `featured: true` on exactly three projects in
  `js/projects.js`. The rest appear under "View all projects".
- **Colours and fonts**: at the top of `css/style.css` (`--red`, `--bg`, and the
  Anton / Archivo / Mrs Saint Delafield fonts).
- **Quote**: the line in the red panel is in `index.html`; rewrite it in your words.

## How it's designed
Black stage, one red. A giant "PORTFOLIO" sits behind your cut-out photo.

- **Page load**: the PORTFOLIO letters rise one by one, your photo fades up,
  then your name slides in and the stats count up.
- **Pointer in the hero**: a light follows the pointer across the red letters,
  and the letters, glow and photo shift at different depths.
- **Scroll**: the big word and photo move at different speeds (parallax).
- **Tools loop**: two rows of tool logos glide in opposite directions, speed up
  while you scroll, and slow to a stop when you hover; logos turn to their brand
  colour on hover. The logos are bundled in js/tool-icons.js; a tool with no
  logo there (like Midjourney) shows an initials badge.
- **Projects**: cards rise in; hover zooms the image and turns the frame red.
  Click a card for the side panel; "View all projects" opens the full list.
- **Work process**: the red line fills as you scroll and each icon lights up.
- **Quote**: the signature writes itself when it comes into view.
- **Contact**: the laptop shows a mini version of the hero and tilts toward the pointer.
- **Cursor**: a red dot with a trailing ring.

Visitors who turn on "reduce motion" see everything without animation.

To use a different photo, send it to Claude and ask for a new `jay-cutout.webp`
(the background needs removing).

## Preview locally
Double-click `index.html`, or run `python3 -m http.server` here and open http://localhost:8000.

## Publish
1. Create a public repo named `yourusername.github.io`.
2. Upload the contents of this folder (index.html at the root).
3. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
