/* =====================================================================
   YOUR PROJECTS — edit this list to change the whole site.
   ---------------------------------------------------------------------
   title    : project name
   cat      : filter group — "web" (Web Design) | "uiux" (UI/UX) | "prints" (Prints)
              | "social" (Social Media) | "video" (Video) | "apparel" (Apparel Design)
   tags     : small label shown under the title
   year     : optional, e.g. "2025"
   summary  : optional, 1–3 sentences shown in the project popup
   image    : optional, your own file, e.g. "images/sky-floors.webp"
              (used first — recommended, ~1600px wide WebP)
   cover    : Behance cover (used if `image` is empty or missing)
   url      : link to the full project
   featured : true = one of the three "Selected projects" cards (pick exactly 3)
   ===================================================================== */
const CDN = "https://mir-s3-cdn-cf.behance.net/projects/404/";
const BH = "https://www.behance.net/gallery/";

window.PROJECTS = [
  { title: "Sky Floors Brand Guidelines", cat: "prints", tags: "Brand identity · Guidelines", year: "",
    summary: "A brand guidelines system for Sky Floors.",
    image: "images/projects/cover-204254619.webp", cover: CDN + "79c8ed204254619.Y3JvcCw4MDgsNjMyLDAsMA.png",
    url: BH + "204254619/Sky-Floors-Brand-Guidelines", featured: true, size: "big" },

  { title: "Web Design in Figma", cat: "uiux", tags: "UI · Web design", year: "",
    summary: "Website interface design, built in Figma.",
    image: "images/projects/cover-245777675.webp", cover: CDN + "f698a1245777675.Y3JvcCwxOTIwLDE1MDEsMCww.png",
    url: BH + "245777675/Web-Design-Figma", featured: true, size: "tall" },

  { title: "Packaging and Labels", cat: "prints", tags: "Packaging · Labels", year: "",
    summary: "Packaging and label design.",
    image: "images/projects/cover-243458067.webp", cover: CDN + "f91a8d243458067.Y3JvcCwxMzEwLDEwMjQsMCw5NA.png",
    url: BH + "243458067/Packaging-and-Labels", featured: true, size: "" },

  { title: "Sixfive Website", cat: "web", tags: "Web design", year: "",
    summary: "Website design for Sixfive.",
    image: "images/projects/204254975.webp", cover: CDN + "8a4599204254975.Y3JvcCwxMDgwLDg0NCwwLDExNw.png",
    url: BH + "204254975/Sixfive-Website-Design", featured: false, size: "" },

  { title: "ELVT Website", cat: "web", tags: "Web design", year: "",
    summary: "Website design for ELVT.",
    image: "images/projects/204245593.webp", cover: CDN + "ffe6cc204245593.Y3JvcCwxMDgwLDg0NCwwLDExNw.png",
    url: BH + "204245593/ELVT-Website-Design", featured: false, size: "" },

  { title: "Sky Flooring USA Posters", cat: "prints", tags: "Print · Marketing", year: "",
    summary: "Marketing posters for Sky Flooring USA.",
    image: "images/projects/226979505.webp", cover: CDN + "2dd06e226979505.Y3JvcCwxMDgwLDg0NCwwLDUzNw.png",
    url: BH + "226979505/Sky-FLooring-USA-Marketing-Poster", featured: false, size: "wide" },

  { title: "Social Media Posts", cat: "social", tags: "Social campaigns", year: "",
    summary: "A collection of social media designs.",
    image: "images/projects/228226581.webp", cover: CDN + "22aa2f228226581.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png",
    url: BH + "228226581/Social-Media-Posts", featured: false, size: "tall" },

  { title: "Sports Graphics", cat: "social", tags: "Sports · Social", year: "",
    summary: "Sports graphics and match-day visuals.",
    image: "images/projects/226978835.webp", cover: CDN + "e969b8226978835.Y3JvcCw0NzE4LDM2OTEsMTA4Niww.png",
    url: BH + "226978835/Sports-Graphics", featured: false, size: "" },

  { title: "T-Shirt Design", cat: "apparel", tags: "Apparel · Print", year: "",
    summary: "T-shirt design and printing.",
    image: "images/projects/245775919.webp", cover: CDN + "00d422245775919.Y3JvcCwxMzUwLDEwNTYsMzI0LDA.jpg",
    url: BH + "245775919/T-SHIRT-DESIGN-and-PRINTING", featured: false, size: "" },

  { title: "Flyers", cat: "prints", tags: "Print", year: "",
    summary: "Flyer designs.",
    image: "images/projects/204257565.webp", cover: CDN + "40494d204257565.Y3JvcCwxMDgwLDg0NCwwLDI1MQ.png",
    url: BH + "204257565/Flyers", featured: false, size: "wide" },

  { title: "Website Design", cat: "web", tags: "Web design", year: "",
    summary: "Website design.",
    image: "images/projects/204304545.webp", cover: CDN + "6f3cfe204304545.Y3JvcCwxNDQwLDExMjYsMCww.png",
    url: BH + "204304545/Website-Design", featured: false, size: "" },

  { title: "Logos", cat: "prints", tags: "Logo design", year: "",
    summary: "A selection of logo marks.",
    image: "images/projects/72518265.webp", cover: CDN + "b00f5f72518265.Y3JvcCwxMjAwLDkzOCwwLDYyOQ.png",
    url: BH + "72518265/logos", featured: false, size: "" },

  { title: "Local Review Explainer Video", cat: "video", tags: "Explainer video · Motion", year: "",
    summary: "An explainer video for Local Review.",
    image: "images/projects/204268287.webp", cover: CDN + "0d2652204268287.Y3JvcCwxMTA3LDg2NiwxMjYsMA.png",
    url: BH + "204268287/Local-Review-Explainer-Video", featured: false, size: "" },

  { title: "Banners", cat: "social", tags: "Banners · Digital ads", year: "",
    summary: "A collection of banner designs.",
    image: "images/projects/72517281.webp", cover: CDN + "e429e372517281.Y3JvcCw4NDUsNjYxLDI3NCww.jpg",
    url: BH + "72517281/banners", featured: false, size: "" },

  { title: "Website Design (earlier work)", cat: "web", tags: "Web design", year: "",
    summary: "Website design.",
    image: "images/projects/72518773.webp", cover: CDN + "7c20b572518773.Y3JvcCwxMjAwLDkzOCwwLDcwNg.jpg",
    url: BH + "72518773/Website-Design", featured: false, size: "" },
];
