(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const html = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, "0");
const projects = window.PROJECTS || [];
const arrowSVG = '<svg class="card__arrow" viewBox="0 0 34 12" aria-hidden="true"><path d="M0 6h32M27 1l5 5-5 5"/></svg>';

/* ================= Hero: giant word ================= */
const hero = $("#hero");
const word = $(".hero__word");
const inner = $(".hero__word-inner");
inner.innerHTML = [...inner.textContent].map((c, i) => `<span class="ch" style="--i:${i}">${c}</span>`).join("");

function fitWord() {
  hero.style.setProperty("--word", "100px");
  const w = inner.getBoundingClientRect().width;
  const target = word.clientWidth;
  if (w && target) hero.style.setProperty("--word", `${(100 * target) / w}px`);
  // give every letter the offset of its slice of the shared gradient
  const ir = inner.getBoundingClientRect();
  inner.style.setProperty("--ww", `${ir.width}px`);
  $$(".ch", inner).forEach((ch) => ch.style.setProperty("--ox", `${ch.offsetLeft}px`));
}
const fontsReady = document.fonts
  ? Promise.race([document.fonts.load('100px "Anton"').then(() => document.fonts.ready), new Promise((r) => setTimeout(r, 2500))])
  : Promise.resolve();
const photoReady = new Promise((r) => {
  const img = $(".hero__photo img");
  if (img.complete) r(); else { img.addEventListener("load", r); img.addEventListener("error", r); }
  setTimeout(r, 3000);
});
fontsReady.then(fitWord, fitWord);
Promise.all([fontsReady.catch(() => {}), photoReady]).then(() => {
  fitWord();
  requestAnimationFrame(() => html.classList.add("is-loaded"));
  setTimeout(countUp, reduceMotion ? 0 : 900);
});
let rt;
addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(fitWord, 120); });

/* ================= Hero: pointer depth + light, scroll parallax ================= */
const ptr = { tx: 0, ty: 0, x: 0, y: 0, mx: 50, my: 30, tmx: 50, tmy: 30 };
let heroLoop = false;
function heroTick() {
  ptr.x += (ptr.tx - ptr.x) * 0.08; ptr.y += (ptr.ty - ptr.y) * 0.08;
  ptr.mx += (ptr.tmx - ptr.mx) * 0.12; ptr.my += (ptr.tmy - ptr.my) * 0.12;
  hero.style.setProperty("--px", ptr.x.toFixed(3));
  hero.style.setProperty("--py", ptr.y.toFixed(3));
  hero.style.setProperty("--mx", ptr.mx.toFixed(1) + "%");
  hero.style.setProperty("--my", ptr.my.toFixed(1) + "%");
  const moving = Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) + Math.abs(ptr.tmx - ptr.mx) / 50 > 0.002;
  if (moving) requestAnimationFrame(heroTick); else heroLoop = false;
}
if (!reduceMotion) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect(), wr = inner.getBoundingClientRect();
    ptr.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ptr.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    ptr.tmx = ((e.clientX - wr.left) / wr.width) * 100;
    ptr.tmy = ((e.clientY - wr.top) / wr.height) * 100;
    if (!heroLoop) { heroLoop = true; requestAnimationFrame(heroTick); }
  });
  hero.addEventListener("pointerleave", () => {
    Object.assign(ptr, { tx: 0, ty: 0, tmx: 50, tmy: 30 });
    if (!heroLoop) { heroLoop = true; requestAnimationFrame(heroTick); }
  });
  addEventListener("scroll", () => {
    if (scrollY < innerHeight * 1.3) hero.style.setProperty("--scroll", scrollY.toFixed(0));
  }, { passive: true });
}

/* ================= Stats count up ================= */
function countUp() {
  $$("[data-count]").forEach((el, k) => {
    const end = +el.dataset.count;
    if (reduceMotion) { el.textContent = end; return; }
    const t0 = performance.now() + k * 120, dur = 1400;
    const step = (t) => {
      const p = clamp((t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ================= Tools loop ================= */
(() => {
  const tools = window.STACK || [];
  const section = $(".stack");
  if (!tools.length) { section.remove(); return; }
  $("#stackList").innerHTML = tools.map((t) => `<li>${t.name}</li>`).join("");
  const initials = (n) => n.replace(/^Adobe\s+/, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const sep = '<svg class="loop__sep" viewBox="0 0 24 24"><path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z"/></svg>';
  function chip(t) {
    const el = document.createElement("div");
    el.className = "tool";
    el.innerHTML = `<span class="tool__logo"></span><span class="tool__name"></span>`;
    $(".tool__name", el).textContent = t.name;
    const logo = $(".tool__logo", el);
    const mono = () => { logo.innerHTML = `<span class="tool__mono">${initials(t.name)}</span>`; };
    const local = (window.TOOL_ICONS || {})[t.icon];
    if (local) {
      // inline logo: white by default, brand colour on hover
      el.style.setProperty("--brand", local.hex);
      logo.innerHTML = `<svg class="tool__svg" viewBox="0 0 24 24" aria-hidden="true"><path d="${local.path}"/></svg>`;
      return el;
    }
    if (!t.icon) { mono(); return el; }
    // not bundled: try the Simple Icons CDN, fall back to initials
    const w = new Image(), c = new Image();
    w.className = "w"; c.className = "c"; w.alt = c.alt = "";
    w.onerror = mono;
    w.src = `https://cdn.simpleicons.org/${t.icon}/f3f1ee`;
    c.src = `https://cdn.simpleicons.org/${t.icon}`;
    logo.append(w, c);
    return el;
  }
  const rows = $$(".loop", section).map((loop) => {
    const track = $(".loop__track", loop);
    const items = tools.filter((t) => String(t.row || 1) === loop.dataset.row);
    const set = document.createDocumentFragment();
    items.forEach((t) => {
      set.appendChild(chip(t));
      const s = document.createElement("span"); s.innerHTML = sep; set.appendChild(s.firstChild);
    });
    track.appendChild(set);
    // repeat until a single copy is wider than the screen, then double it for a seamless loop
    const original = [...track.children];
    let guard = 0;
    while (track.scrollWidth < innerWidth * 1.2 && guard++ < 6) original.forEach((n) => track.appendChild(n.cloneNode(true)));
    [...track.children].forEach((n) => { const cl = n.cloneNode(true); cl.setAttribute("data-copy-of", ""); track.appendChild(cl); });
    // clones lose their image error handlers: give them the same fallback
    $$(".tool", track).forEach((t) => {
      const img = $("img.w", t);
      if (img) img.onerror = () => { $(".tool__logo", t).innerHTML = `<span class="tool__mono">${initials($(".tool__name", t).textContent)}</span>`; };
    });
    return { loop, track, x: 0, dir: loop.classList.contains("loop--rev") ? 1 : -1, hover: false };
  }).filter((r) => r.track.children.length);

  rows.forEach((r) => {
    r.loop.addEventListener("pointerenter", () => (r.hover = true));
    r.loop.addEventListener("pointerleave", () => (r.hover = false));
  });

  let visible = false, last = scrollY, boost = 0, speed = [0, 0];
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) { section.classList.add("is-in"); if (!reduceMotion) requestAnimationFrame(tick); }
  }, { threshold: 0.1 }).observe(section);

  function tick() {
    if (!visible) return;
    const v = scrollY - last; last = scrollY;
    boost += (Math.min(Math.abs(v), 50) - boost) * 0.08;      // scrolling speeds the rows up
    rows.forEach((r, k) => {
      const target = r.hover ? 0 : 0.55 + boost * 0.3;        // hovering a row slows it to a stop
      speed[k] += (target - speed[k]) * 0.08;
      const half = r.track.scrollWidth / 2;
      r.x += speed[k] * r.dir;
      if (r.x <= -half) r.x += half;
      if (r.x > 0) r.x -= half;
      r.track.style.transform = `translate3d(${r.x}px,0,0)`;
    });
    requestAnimationFrame(tick);
  }
  rows.forEach((r) => { if (r.dir > 0) { r.x = -r.track.scrollWidth / 2; r.track.style.transform = `translate3d(${r.x}px,0,0)`; } });
})();

/* ================= Skill cards: tool logos ================= */
(() => {
  const icons = window.TOOL_ICONS || {};
  const names = Object.fromEntries((window.STACK || []).map((t) => [t.icon, t.name]));
  names.adobe = names.adobe || "Adobe Firefly"; names.midjourney = names.midjourney || "Midjourney";
  Object.assign(names, { asana: "Asana", trello: "Trello", notion: "Notion", clickup: "ClickUp", googlesheets: "Google Sheets", googledrive: "Google Drive", slack: "Slack" }, { ...names });
  const svg = (path, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.2 });
  $$(".skill").forEach((card, k) => {
    const keys = (card.dataset.tools || "").split(/\s+/).filter(Boolean);
    const first = icons[keys[0]];
    if (first) { card.insertAdjacentHTML("afterbegin", svg(first.path, "skill__mark")); card.style.setProperty("--brand", first.hex); }
    const row = document.createElement("div");
    row.className = "skill__tools";
    row.setAttribute("role", "list");
    keys.forEach((key) => {
      const ic = icons[key], name = names[key] || key;
      const t = document.createElement("span");
      t.className = "tl"; t.tabIndex = 0; t.dataset.name = name; t.setAttribute("role", "listitem"); t.setAttribute("aria-label", name);
      t.style.setProperty("--c", ic ? (ic.hex === "#FFFFFF" ? "#ffffff" : ic.hex) : "#e3212b");
      t.innerHTML = ic ? svg(ic.path) : `<b>${name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2)}</b>`;
      row.appendChild(t);
    });
    card.appendChild(row);
    card.style.setProperty("--d", `${(k % 3) * 0.1}s`);
    io.observe(card);
  });
})();

/* ================= Project cards ================= */
const resolved = new Map();
function resolveImage(p) {
  if (resolved.has(p)) return resolved.get(p);
  const promise = [p.image, p.cover].filter(Boolean).reduce(
    (chain, src) => chain.then((ok) => ok || new Promise((res) => {
      const img = new Image();
      img.onload = () => res(src);
      img.onerror = () => res(null);
      img.src = src;
    })),
    Promise.resolve(null)
  );
  resolved.set(p, promise);
  return promise;
}
function media(p) {
  const i = projects.indexOf(p);
  const el = document.createElement("div");
  el.className = "card__media";
  el.innerHTML = `<div class="art" style="--gx:${30 + ((i * 37) % 55)}%;--gy:${10 + ((i * 23) % 50)}%"><strong></strong><span>${pad(i + 1)}</span></div>`;
  $("strong", el).textContent = p.title;
  resolveImage(p).then((src) => {
    if (!src) return;
    const img = document.createElement("img");
    img.alt = "";
    img.onload = () => img.classList.add("is-ready");
    img.src = src;
    el.prepend(img);
  });
  return el;
}
function card(p, num) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = p.url || "#";
  a.dataset.index = projects.indexOf(p);
  a.dataset.cat = p.cat;
  a.appendChild(media(p));
  const info = document.createElement("div");
  info.className = "card__info";
  info.innerHTML = `<span class="card__num">${pad(num)}</span><div><h3></h3><p></p></div>${arrowSVG}`;
  $("h3", info).textContent = p.title;
  $("p", info).textContent = p.tags.replace(/\s*·\s*/g, ", ");
  a.appendChild(info);
  return a;
}
const featured = projects.filter((p) => p.featured).slice(0, 3);
featured.forEach((p) => $("#featured").appendChild(card(p, projects.indexOf(p) + 1)));
// The full list holds every project. Under "All" the three featured ones are hidden
// (they're already shown above); a category shows every project in it.
projects.forEach((p, i) => {
  const c = card(p, i + 1);
  if (featured.includes(p)) c.classList.add("card--featured", "is-hidden");
  $("#others").appendChild(c);
});

const inView = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in");
    inView.unobserve(e.target);
  });
}, { threshold: 0.2 });
$$("#featured .card").forEach((c, k) => { c.style.setProperty("--d", `${k * 0.12}s`); inView.observe(c); });
$$(".signature").forEach((el) => inView.observe(el));
// Titles start fully clipped (which observers treat as invisible), so watch their containers
const titleObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    $$(".reveal-title", e.target).forEach((t) => t.classList.add("is-in"));
    titleObs.unobserve(e.target);
  });
}, { threshold: 0.1 });
new Set($$(".reveal-title").map((t) => t.parentElement)).forEach((p) => titleObs.observe(p));

// View all projects
const toggle = $("#toggleAll"), all = $("#allWork");
toggle.addEventListener("click", () => {
  const open = all.hidden;
  all.hidden = !open;
  toggle.setAttribute("aria-expanded", open);
  $(".more__label", toggle).textContent = open ? "Show fewer" : "View all projects";
  if (open) {
    $$("#others .card").forEach((c, k) => { c.classList.remove("is-in"); c.style.setProperty("--d", `${(k % 3) * 0.08}s`); });
    requestAnimationFrame(() => requestAnimationFrame(() => $$("#others .card").forEach((c) => inView.observe(c))));
  }
});
const chips = $$(".chip"), empty = $("#emptyNote");
chips.forEach((chip) => {
  const f = chip.dataset.filter;
  $("sup", chip).textContent = f === "all" ? projects.length : projects.filter((p) => p.cat === f).length;
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.toggle("is-active", c === chip));
    let shown = 0;
    $$("#others .card").forEach((c, k) => {
      const show = f === "all" ? !c.classList.contains("card--featured") : c.dataset.cat === f;
      c.classList.toggle("is-hidden", !show);
      if (show) {
        shown++;
        if (!reduceMotion) { c.classList.remove("is-in"); c.style.setProperty("--d", `${(shown - 1) % 3 * 0.07}s`); void c.offsetWidth; requestAnimationFrame(() => c.classList.add("is-in")); }
      }
    });
    empty.hidden = shown > 0;
    $("span", empty).textContent = chip.firstChild.textContent.trim();
  });
});

/* ================= Process: line fills, icons light up ================= */
const steps = $(".steps"), stepItems = $$(".steps li");
function processTick() {
  const r = steps.getBoundingClientRect();
  const p = clamp((innerHeight * 0.75 - r.top) / r.height);
  steps.style.setProperty("--p", p.toFixed(3));
  stepItems.forEach((li, k) => li.classList.toggle("is-on", p >= k / (stepItems.length - 1) - 0.02 || reduceMotion));
}
addEventListener("scroll", () => requestAnimationFrame(processTick), { passive: true });
processTick();

/* ================= Laptop tilts toward the pointer ================= */
const laptop = $(".laptop__lid");
if (finePointer && !reduceMotion) {
  addEventListener("pointermove", (e) => {
    const r = laptop.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    laptop.style.setProperty("--tx", clamp(((e.clientX - (r.left + r.width / 2)) / innerWidth) * 24, -10, 10).toFixed(2));
    laptop.style.setProperty("--ty", clamp(((e.clientY - (r.top + r.height / 2)) / innerHeight) * -14, -6, 6).toFixed(2));
  }, { passive: true });
}

/* ================= Project panel ================= */
const sheet = $(".sheet");
let current = 0, lastFocus = null;
function openSheet(i) {
  current = (i + projects.length) % projects.length;
  const p = projects[current];
  $("#sheetNum").textContent = pad(current + 1);
  $("#sheetTitle").textContent = p.title;
  $("#sheetTags").textContent = [p.tags.replace(/\s*·\s*/g, ", "), p.year].filter(Boolean).join(", ");
  $("#sheetSummary").textContent = p.summary || "";
  $("#sheetLink").href = p.url || "#";
  $("#sheetLink").hidden = !p.url;
  $("#sheetMedia").replaceChildren(media(p));
  if (!sheet.classList.contains("is-open")) {
    lastFocus = document.activeElement;
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    html.classList.add("sheet-open");
    $(".sheet__bar .ghost").focus();
  }
}
function closeSheet() {
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
  html.classList.remove("sheet-open");
  if (lastFocus) lastFocus.focus();
}
document.addEventListener("click", (e) => {
  const c = e.target.closest(".cards .card");
  if (c && !(e.metaKey || e.ctrlKey || e.shiftKey)) { e.preventDefault(); openSheet(+c.dataset.index); return; }
  if (e.target.closest("[data-close]")) closeSheet();
  const step = e.target.closest("[data-step]");
  if (step) openSheet(current + +step.dataset.step);
});
document.addEventListener("keydown", (e) => {
  if (!sheet.classList.contains("is-open")) return;
  if (e.key === "Escape") closeSheet();
  if (e.key === "ArrowRight") openSheet(current + 1);
  if (e.key === "ArrowLeft") openSheet(current - 1);
});

/* ================= Nav: current section ================= */
const navLinks = $$(".top__nav a");
const secObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${e.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["#work", "#process", "#skills", "#contact"].forEach((id) => secObs.observe($(id)));

/* ================= Cursor: red dot + trailing ring ================= */
if (finePointer) {
  const cur = $(".cursor");
  document.body.classList.add("has-cursor");
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
  (function follow() {
    rx += (x - rx) * (reduceMotion ? 1 : 0.18); ry += (y - ry) * (reduceMotion ? 1 : 0.18);
    cur.style.setProperty("--dx", x + "px"); cur.style.setProperty("--dy", y + "px");
    cur.style.setProperty("--rx", rx + "px"); cur.style.setProperty("--ry", ry + "px");
    requestAnimationFrame(follow);
  })();
  document.addEventListener("pointerover", (e) => cur.classList.toggle("is-hot", !!e.target.closest("a, button, .card")));
  document.addEventListener("pointerleave", () => (cur.style.opacity = 0));
  document.addEventListener("pointerenter", () => (cur.style.opacity = ""));
}

/* ================= Clock, year, copy ================= */
const clock = $("#clock");
const tick = () => (clock.textContent = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" }).format(new Date()));
tick(); setInterval(tick, 15000);
$("#year").textContent = new Date().getFullYear();
$$("[data-copy]").forEach((btn) => {
  const label = btn.textContent;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = "Copied"; }
    catch (e) { btn.textContent = "Select it"; }
    setTimeout(() => (btn.textContent = label), 2000);
  });
});
})();

/* ================= Motion & video ================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const list = window.VIDEOS || [];
  const sec = document.getElementById("video");
  if (!sec) return;
  if (!list.length) { sec.hidden = true; return; }
  const stage = $("#reelStage"), ul = $("#reelList");
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l16 9-16 9z"/></svg>';

  // YouTube / Vimeo link -> privacy-friendly embed URL
  const embedUrl = (u) => {
    let m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1`;
    return "";
  };
  const label = (v) => v.src || embedUrl(v.embed || "") ? "Play" : "Watch";

  ul.innerHTML = list.map((v, i) => `
    <li><button type="button" class="reel__item" data-i="${i}" aria-current="false">
      <span class="reel__thumb"><img src="${esc(v.poster)}" alt="" loading="lazy" /></span>
      <span><b>${esc(v.title)}</b><small>${esc(v.kind)}${v.year ? " · " + esc(v.year) : ""}</small></span>
      <i>${v.duration ? esc(v.duration) + " · " : ""}${v.orientation === "portrait" ? "9:16" : "16:9"}</i>
    </button></li>`).join("");

  const show = (i, autoplay) => {
    const v = list[i];
    $$(".reel__item", ul).forEach((b) => b.setAttribute("aria-current", String(+b.dataset.i === i)));
    $("#reelKind").textContent = [v.kind, v.year].filter(Boolean).join(" · ");
    $("#reelName").textContent = v.title;
    $("#reelSummary").textContent = v.summary || "";
    stage.classList.toggle("is-portrait", v.orientation === "portrait");
    const bg = `<img class="reel__bg" src="${esc(v.poster)}" alt="" aria-hidden="true" />`;
    const emb = embedUrl(v.embed || "");

    if (autoplay && v.src) {
      stage.innerHTML = bg + `<video class="reel__frame" src="${esc(v.src)}" poster="${esc(v.poster)}" controls playsinline autoplay ${v.orientation === "portrait" ? "loop" : ""}></video>`;
      const vid = $("video", stage); vid.focus({ preventScroll: true });
      vid.addEventListener("error", () => {
        stage.innerHTML = bg + `<img class="reel__poster" src="${esc(v.poster)}" alt="" /><p class="reel__play" style="cursor:default"><em>Video file not found: ${esc(v.src)}</em></p>`;
      });
      return;
    }
    if (autoplay && emb) {
      stage.innerHTML = `<iframe class="reel__frame" src="${emb}" title="${esc(v.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      return;
    }
    const ext = !v.src && !emb && v.link;
    stage.innerHTML = bg + `<img class="reel__poster" src="${esc(v.poster)}" alt="${esc(v.title)}" />` +
      (ext
        ? `<a class="reel__play" href="${esc(v.link)}" target="_blank" rel="noopener" aria-label="Watch ${esc(v.title)} (opens in a new tab)"><span>${playIcon}</span><em>Watch on ${esc(new URL(v.link).hostname.replace(/^www\./, ""))} ↗</em></a>`
        : `<button type="button" class="reel__play" aria-label="Play ${esc(v.title)}"><span>${playIcon}</span><em>${label(v)} · ${v.orientation === "portrait" ? "Vertical" : "Widescreen"}</em></button>`);
    const btn = $("button.reel__play", stage);
    if (btn) btn.addEventListener("click", () => show(i, true));
  };

  ul.addEventListener("click", (e) => {
    const b = e.target.closest(".reel__item");
    if (b) show(+b.dataset.i, false);
  });
  show(0, false);
})();
