/* =====================================================================
   Motion & video — the videos shown in the "Motion & video" section.

   To add a video, copy one block below and fill it in:
   title       : video name
   kind        : small label, e.g. "Explainer · Motion"
   year        : optional, e.g. "2026"
   summary     : 1–2 sentences about it
   poster      : still image shown before it plays, e.g. "images/videos/my-video.webp"
   orientation : "landscape" (16:9) or "portrait" (9:16, phone / booth screens)
   duration    : optional, e.g. "0:34"

   Then give ONE of these (first one found is used):
   src   : your own video file in the videos/ folder, e.g. "videos/my-video.mp4"
           (MP4, H.264, ideally under 25 MB so GitHub accepts it)
   embed : a YouTube or Vimeo link, e.g. "https://youtu.be/XXXXXXXXXXX"
   link  : any page where the video can be watched (opens in a new tab)
   ===================================================================== */
window.VIDEOS = [
  { title: "Herringbone, Chevron & Parquetry Booth Loop", kind: "Motion · Trade show", year: "2026", duration: "2:19",
    summary: "A trade show screen loop for Sky Flooring that moves through herringbone, chevron and SkyCraft bespoke parquetry, built to restart seamlessly.",
    poster: "images/videos/parquetry-booth-loop.webp", orientation: "landscape", src: "videos/parquetry-booth-loop.mp4" },

  { title: "OJBA Booth Loop", kind: "Motion · Trade show", year: "2026", duration: "1:00",
    summary: "A one-minute vertical video that loops seamlessly on a trade show booth screen, showing Sky Flooring's herringbone, chevron and parquetry floors.",
    poster: "images/videos/ojba-booth-loop.webp", orientation: "portrait", src: "videos/ojba-booth-loop.mp4" },

  { title: "SkyCraft Bespoke Parquetry Intro", kind: "Product video", year: "2026", duration: "1:45",
    summary: "An introduction to the SkyCraft Bespoke Parquetry collection for the design community, pattern by pattern.",
    poster: "images/videos/skycraft-intro.webp", orientation: "landscape", src: "videos/skycraft-intro.mp4" },

  { title: "Herringbone & Chevron Promo", kind: "Product launch", year: "2026", duration: "0:34",
    summary: "A launch promo for Sky Flooring's new herringbone and chevron floors, with room scenes and plank details.",
    poster: "images/videos/herringbone-chevron-promo.webp", orientation: "landscape", src: "videos/herringbone-chevron-promo.mp4" },

  { title: "GLU-PRO Santorini Project Video", kind: "Project showcase", year: "2026", duration: "0:28",
    summary: "A vertical walkthrough of a finished project floored in GLU-PRO Santorini.",
    poster: "images/videos/glupro-santorini.webp", orientation: "portrait", src: "videos/glupro-santorini.mp4" },

  { title: "WhatsApp Channel Invite", kind: "Social video", year: "2026", duration: "0:23",
    summary: "A vertical video inviting customers to follow Sky Flooring's WhatsApp channel for tips, interviews and behind-the-scenes posts.",
    poster: "images/videos/whatsapp-join.webp", orientation: "portrait", src: "videos/whatsapp-join.mp4" },

  { title: "Everything Flooring", kind: "WhatsApp Status", year: "2026", duration: "0:39",
    summary: "A WhatsApp Status video introducing what the channel covers.",
    poster: "images/videos/status-everything-flooring.webp", orientation: "portrait", src: "videos/status-everything-flooring.mp4" },

  { title: "Job Site Update", kind: "WhatsApp Status", year: "2026", duration: "0:18",
    summary: "A WhatsApp Status video from an installation in progress.",
    poster: "images/videos/status-job-site.webp", orientation: "portrait", src: "videos/status-job-site.mp4" },

  { title: "Logo Animation", kind: "Motion · Brand", year: "2026", duration: "0:07",
    summary: "A light-trace logo reveal for Sky Flooring.",
    poster: "images/videos/logo-animation.webp", orientation: "landscape", src: "videos/logo-animation.mp4" },

  { title: "Local Review Explainer Video", kind: "Explainer · Motion", year: "",
    summary: "An explainer video for Local Review.",
    poster: "images/projects/204268287.webp", orientation: "landscape",
    link: "https://www.behance.net/gallery/204268287/Local-Review-Explainer-Video" },
];
