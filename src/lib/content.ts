export const ORIGIN_LIST = [
  { key: "design", title: "DESIGN", desc: "Clean layouts, strong typography and calm interfaces. I design websites that feel clear before they feel clever." },
  { key: "coding", title: "CODING", desc: "From landing pages to creative, animated front ends. Fast, responsive code built with Next.js, React and modern tools." },
  { key: "visuals", title: "AI VISUALS", desc: "Cinematic images and video created with Veo 3, Midjourney, Flux and Imagen, turned into real visuals for real projects." },
  { key: "photo", title: "GRAPHICS & PHOTO", desc: "Posters, social graphics, brand visuals and careful photo editing that finish a project properly." },
];

export const ABOUT_LIST = [
  { key: "vision", title: "VISION", desc: "Make technology feel human. Build things that look great, load fast and are simple to use." },
  { key: "me", title: "ME", desc: "I am Muneeb Rehman, a creative developer, web and graphic designer and photo editor from Pakistan. I study computer science and build websites every day." },
  { key: "industry", title: "WORK", desc: "Portfolios, landing pages, AI visual projects and more. Every project here is a live website you can open." },
  { key: "space", title: "WHERE", desc: "Based in Pakistan, working with people everywhere. Remote, flexible and quick to reply." },
  { key: "bluelime", title: "AI LAB", desc: "My personal playground for AI-generated cinematic video and images. Testing new tools and ideas all the time.", link: "https://github.com/muneebrahmancmd" },
  { key: "awards", title: "TOOLS", desc: "The tools behind my work: Next.js, GSAP, Three.js, Veo 3, Midjourney, Flux and Imagen." },
];

export const AWARD_IMAGES = [
  { src: "/images/tools/veo3.svg", alt: "Veo 3" },
  { src: "/images/tools/midjourney.svg", alt: "Midjourney" },
  { src: "/images/tools/flux.svg", alt: "Flux" },
  { src: "/images/tools/imagen.svg", alt: "Imagen" },
  { src: "/images/tools/nextjs.svg", alt: "Next.js" },
];

export const SERVICE_STATS = [
  { value: "16", label: "LIVE PROJECTS ONLINE" },
  { value: "4", label: "CORE SKILLS: DESIGN, CODE, AI, PHOTO" },
  { value: "100%", label: "RESPONSIVE, FAST WEBSITES" },
  { value: "24H", label: "USUAL REPLY TIME" },
];

export const SERVICE_CATEGORIES = {
  top: {
    key: "coding", label: "CODING", color: "#00ff2b",
    intro: "FAST, CLEAN AND ANIMATED. FRONT ENDS BUILT TO LOOK GREAT AND RUN SMOOTHLY ON EVERY DEVICE.",
    items: [
      { title: "WEB DEVELOPMENT", desc: "Responsive websites and web apps built with Next.js, React and Tailwind." },
      { title: "CREATIVE CODING", desc: "GSAP animation, Three.js and WebGL for interactive, memorable experiences." },
      { title: "PORTFOLIOS", desc: "Personal and studio portfolio sites with live project previews." },
      { title: "DEPLOYMENT", desc: "Shipping to Vercel and Netlify with sensible performance defaults." },
    ],
  },
  bottom: {
    key: "design", label: "DESIGN", color: "#7df9ff",
    intro: "FROM IDEA TO INTERFACE. CLEAR VISUAL SYSTEMS THAT SHAPE HOW A SITE FEELS.",
    items: [
      { title: "UI/UX DESIGN", desc: "Layouts, flows and interactions designed around clarity and usability." },
      { title: "BRAND VISUALS", desc: "Logos, colour and type that make a project look consistent and professional." },
      { title: "GRAPHIC DESIGN", desc: "Posters, social media graphics and print-ready layouts." },
      { title: "LANDING PAGES", desc: "Focused pages that explain one idea well and make contact easy." },
    ],
  },
  left: {
    key: "consulting", label: "AI VISUALS", color: "#ffffff",
    intro: "CINEMATIC IMAGES AND VIDEO CREATED WITH MODERN AI TOOLS.",
    items: [
      { title: "AI VIDEO", desc: "Short cinematic clips created with Veo 3 and similar tools." },
      { title: "AI IMAGES", desc: "Concept art and key visuals with Midjourney, Flux and Imagen." },
      { title: "PROMPT DESIGN", desc: "Writing prompts that give consistent, directed results." },
      { title: "VISUAL STORYTELLING", desc: "Combining AI visuals with design and motion for a clear story." },
    ],
  },
  right: {
    key: "marketing", label: "PHOTO EDITING", color: "#00ffff",
    intro: "CAREFUL, NATURAL EDITING THAT MAKES PHOTOS LOOK THEIR BEST.",
    items: [
      { title: "RETOUCHING", desc: "Clean, natural retouching for portraits and product photos." },
      { title: "COMPOSITING", desc: "Combining images into one believable, polished picture." },
      { title: "COLOUR GRADING", desc: "Consistent colour and mood across a set of images." },
      { title: "SOCIAL VISUALS", desc: "Edits sized and styled for Instagram, X and LinkedIn." },
    ],
  },
} as const;

export const PORTFOLIO_ITEMS = [
  { client: "TRIONN STYLE", type: "Studio-style portfolio", host: "muneeb-rehman-trionn-style.vercel.app" },
  { client: "HAQI PORTFOLIO", type: "Creative portfolio", host: "muna-haqi-portfolio.vercel.app" },
  { client: "MUNA 226", type: "Studio-style portfolio", host: "muna-226.netlify.app" },
  { client: "PORTFOLIO 50", type: "Creative portfolio", host: "muneeb-portfolio-50.netlify.app" },
  { client: "PORTFOLIO DARW", type: "Creative portfolio", host: "muneeb-rehman-portfolio-darw.vercel.app" },
  { client: "REHMAN 40", type: "Creative portfolio", host: "muneeb-rehman-40.vercel.app" },
  { client: "PORTFOLIO 30", type: "Creative portfolio", host: "muneeb-rehman-portfolio-30.vercel.app" },
  { client: "PORTFOLIO 20", type: "Creative portfolio", host: "muneeb-rehman-portfolio-20.vercel.app" },
  { client: "PORTFOLIO 2K26 NETLIFY", type: "Portfolio 2026", host: "muna-portfolio-2k26.netlify.app" },
  { client: "PORTFOLIO 2K26 VERCEL", type: "Portfolio 2026", host: "muna-portfolio-2k26.vercel.app" },
  { client: "MUNEEB DEV", type: "Developer portfolio", host: "muneeb-dev.netlify.app" },
  { client: "DEV PORTFOLIO", type: "Developer portfolio", host: "muneeb-dev-portfolio.netlify.app" },
  { client: "PORT FOLIO", type: "Portfolio", host: "muneeb-port-folio.netlify.app" },
  { client: "MUNA DEV 2", type: "Developer portfolio", host: "muna-dev2.netlify.app" },
  { client: "PORTFOLIO ONE", type: "Portfolio", host: "muneeb-portfolio-1.netlify.app" },
  { client: "PORTFOLIO ZERO", type: "Portfolio", host: "muneeb-portfoli0.netlify.app" },
];

export const NAV_ITEMS = [
  { id: "origin", label: "ORIGIN" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "usecases", label: "WORK" },
  { id: "contact", label: "CONTACT" },
];

export const SECTION_SUBNAV: Record<string, { id: string; label: string }[]> = {
  origin: [
    { id: "origin-1", label: "Intro" },
    { id: "origin-2", label: "Company" },
    { id: "origin-3", label: "Services" },
  ],
  about: [
    { id: "about-1", label: "Intro" },
    { id: "about-2", label: "Vision" },
    { id: "about-3", label: "Essence" },
  ],
  services: [
    { id: "services-1", label: "Intro" },
    { id: "services-2", label: "Key Data" },
    { id: "services-3", label: "Services" },
  ],
  usecases: [
    { id: "usecases-1", label: "Intro" },
    { id: "usecases-2", label: "Projects" },
    { id: "usecases-3", label: "Portfolio" },
  ],
};
