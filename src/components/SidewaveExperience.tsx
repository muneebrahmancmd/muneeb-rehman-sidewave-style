"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import WaveScene from "./WaveScene";
import LivePreview from "./LivePreview";
import {
  ORIGIN_LIST,
  ABOUT_LIST,
  AWARD_IMAGES,
  SERVICE_STATS,
  SERVICE_CATEGORIES,
  PORTFOLIO_ITEMS,
  NAV_ITEMS,
  SECTION_SUBNAV,
} from "@/lib/content";

// Each "beat" is one scroll-snap-ish viewport step. Order matches the
// original site's Unity camera waypoints (origin-1..3, about-1..3, etc).
const BEATS = [
  "origin-1",
  "origin-2",
  "origin-3",
  "origin-4",
  "origin-5",
  "origin-list",
  "origin-6",
  "about-1",
  "about-2",
  "about-3",
  "about-4",
  "about-list",
  "about-awards",
  "services-1",
  "services-2",
  "services-3",
  "usecases-1",
  "usecases-clients",
  "contact",
] as const;

type Beat = (typeof BEATS)[number];

function sectionOf(beat: Beat): "origin" | "about" | "services" | "usecases" | "contact" {
  if (beat.startsWith("origin")) return "origin";
  if (beat.startsWith("about")) return "about";
  if (beat.startsWith("services")) return "services";
  if (beat.startsWith("usecases")) return "usecases";
  return "contact";
}

export default function SidewaveExperience() {
  const [loaded, setLoaded] = useState(false);
  const [activeBeat, setActiveBeat] = useState<Beat>("origin-1");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [cookieChoice, setCookieChoice] = useState<"pending" | "accepted" | "rejected">("pending");
  const [openServiceBox, setOpenServiceBox] = useState<null | keyof typeof SERVICE_CATEGORIES>(null);
  const [activeOriginItem, setActiveOriginItem] = useState(0);

  const beatRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("mr-cookie-choice") : null;
    if (stored === "accepted" || stored === "rejected") setCookieChoice(stored);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-beat") as Beat | null;
            if (id) setActiveBeat(id);
          }
        }
      },
      { threshold: 0.55 }
    );
    for (const beat of BEATS) {
      const el = beatRefs.current[beat];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeBeat === "origin-list") {
      const iv = setInterval(() => {
        setActiveOriginItem((i) => (i + 1) % ORIGIN_LIST.length);
      }, 2200);
      return () => clearInterval(iv);
    }
  }, [activeBeat]);

  function scrollToBeat(beat: string) {
    beatRefs.current[beat]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setMenuOpen(false);
  }

  function scrollToSection(section: string) {
    const beat = BEATS.find((b) => sectionOf(b) === section);
    if (beat) scrollToBeat(beat);
  }

  function acceptCookies(accepted: boolean) {
    const choice = accepted ? "accepted" : "rejected";
    setCookieChoice(choice);
    localStorage.setItem("mr-cookie-choice", choice);
  }

  const activeSection = sectionOf(activeBeat);
  const visible = (beat: Beat) => activeBeat === beat;

  return (
    <div className="relative min-h-screen bg-[#111111] text-white">
      {/* Loader */}
      <div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black transition-opacity duration-700"
        style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="mt-6 font-mono text-xs uppercase tracking-wide text-white/70">
          Optimizing performance. Making everything smoother behind the scenes.
        </p>
        <p className="mt-2 font-mono text-[10px] text-white/40">
          {Math.round(loadProgress * 100)}%
        </p>
      </div>

      {/* Own animated point-wave scene; reacts to the scroll position. */}
      <WaveScene beat={BEATS.indexOf(activeBeat) / (BEATS.length - 1)} onReady={() => { setLoadProgress(1); setLoaded(true); }} />

      {/* Logo */}
      <a href="#origin" className="fixed left-5 top-[30px] z-[9999]" onClick={(e) => { e.preventDefault(); scrollToBeat("origin-1"); }}>
        <Image src="/images/logo.svg" alt="Muneeb Rehman" width={115} height={30} priority />
      </a>

      {/* Menu button */}
      <div
        id="menuBtn"
        className={menuOpen ? "menuOpened" : ""}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="openMenu">MENU</span>
        <span className="closeMenu">CLOSE</span>
      </div>

      {/* Menu panel */}
      <div id="menuPanel" className={menuOpen ? "open" : ""}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a id="company_profile" href="https://github.com/muneebrahmancmd" target="_blank" rel="noreferrer">
              GITHUB
            </a>
          </li>
        </ul>
      </div>

      {/* Scroll to discover */}
      <div className={`scrollToDiscover ${activeBeat === "origin-1" && !menuOpen ? "visible" : ""}`}>
        Scroll to discover
      </div>

      {/* Lateral sub-nav */}
      {SECTION_SUBNAV[activeSection] && !menuOpen && (
        <div className="lateralMenu visible">
          <ul>
            {SECTION_SUBNAV[activeSection].map((item, i) => (
              <li key={item.id} className={i === 0 ? "active" : ""}>
                <a href={`#${item.id}`} onClick={(e) => e.preventDefault()}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------------- ORIGIN OVERLAYS ---------------- */}
      <ScrollText visible={visible("origin-1")} title="CREATIVE DEVELOPER BEYOND THE ORDINARY" body="Muneeb Rehman. Design, code and AI visuals, built into websites that feel alive." align="left" />
      <ScrollText visible={visible("origin-2")} title="FEEL BEFORE YOU SEE IT" body="Human first. I turn ideas and projects into websites people enjoy using." align="right" />
      <ScrollText visible={visible("origin-3")} title="PEOPLE FIRST" body="Every project has its own goals and limits. I start by listening, then choose the simplest path that works." align="left" />
      <ScrollText visible={visible("origin-4")} title="LISTEN, THEN BUILD" body="Cutting the noise. Design and code are two sides of the same thing." align="right" />
      <ScrollText visible={visible("origin-5")} title="DESIGN MEETS CODE" body="Turning raw pixels into light, motion and clean, working code." align="left" />

      {/* Origin cycling list (4 pillars) */}
      <div className={`scroll-overlay-list ${visible("origin-list") ? "visible" : ""}`}>
        <ul>
          {ORIGIN_LIST.map((item, i) => (
            <li key={item.key} style={{ opacity: i === activeOriginItem ? 1 : 0.25 }}>
              <div className="title">{item.title}</div>
              <div className="hoverToShow">{item.desc}</div>
            </li>
          ))}
        </ul>
      </div>

      <ScrollText visible={visible("origin-6")} title="BACKWARDS FROM THE RESULT" body="Starting from the finished result and working backwards to the first line of code." align="center" />

      {/* ---------------- ABOUT OVERLAYS ---------------- */}
      <ScrollText visible={visible("about-1")} title="DESIGN, CODE AND AI" body="" align="left" />
      <ScrollText visible={visible("about-2")} title="GROWING WITH EVERY PROJECT" body="I am a computer science student from Pakistan, where art, technology and emotion meet in every project." align="left" />
      <ScrollText visible={visible("about-3")} title="MADE TO BE USED" body="Not just design and code." align="right" />
      <ScrollText visible={visible("about-4")} title="BORDERLESS WORK" body="Pushing the limits of design, motion and AI visuals. Working independently keeps me fast, flexible and always learning." align="left" />

      <div className={`scroll-overlay-list ${visible("about-list") ? "visible" : ""}`}>
        <ul>
          {ABOUT_LIST.filter((i) => i.key !== "awards").map((item) => (
            <li key={item.key}>
              <div className="title">{item.title}</div>
              <div className="hoverToShow">
                {item.desc}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="reachus ml-2">
                    FIND OUT MORE
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`scroll-overlay-text center ${visible("about-awards") ? "visible" : ""}`} id="about_awards_label">
        <h2>TOOLS</h2>
        <p style={{ maxWidth: "40vw" }}>
          The tools behind my work: Next.js, GSAP, Three.js and AI creation tools such as Veo 3,
          Midjourney, Flux and Imagen.
        </p>
        <div id="about_awards_list" style={{ pointerEvents: "auto", width: "50vw" }}>
          <ul>
            {AWARD_IMAGES.map((a) => (
              <li key={a.alt}>
                <Image src={a.src} alt={a.alt} width={150} height={150} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- SERVICES OVERLAYS ---------------- */}
      <div className={`scroll-overlay-text center ${visible("services-1") ? "visible" : ""}`}>
        <h2>WHERE IDEAS BECOME WEBSITES.</h2>
        <p>Sketch, build, refine, launch. Simple steps, real results.</p>
      </div>

      <div className={`scroll-overlay-text center ${visible("services-2") ? "visible" : ""}`} style={{ pointerEvents: "auto", width: "60vw" }}>
        <div id="services-stats-container">
          {SERVICE_STATS.map((s) => (
            <div className="services-stats" key={s.label} style={{ transform: "scale(1)" }}>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`scroll-overlay-text center ${visible("services-3") ? "visible" : ""}`}>
        <h2>CALM DESIGN. SOLID CODE.</h2>
        <p>TAP A SKILL TO EXPLORE WHAT I DO</p>
        <div className="mt-6 grid grid-cols-2 gap-3" style={{ pointerEvents: "auto" }}>
          {(Object.keys(SERVICE_CATEGORIES) as (keyof typeof SERVICE_CATEGORIES)[]).map((key) => {
            const cat = SERVICE_CATEGORIES[key];
            return (
              <button
                key={key}
                onClick={() => setOpenServiceBox(key)}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs uppercase tracking-wide hover:bg-white/10"
                style={{ color: cat.color }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Service detail boxes */}
      {(Object.keys(SERVICE_CATEGORIES) as (keyof typeof SERVICE_CATEGORIES)[]).map((key) => {
        const cat = SERVICE_CATEGORIES[key];
        return (
          <div key={key} className={`servicesBox ${key} ${openServiceBox === key ? "open" : ""}`}>
            <h2 style={{ display: "block", color: cat.color }}>{cat.label}</h2>
            <p>{cat.intro}</p>
            <div className="grid-2" style={{ marginTop: 20 }}>
              {cat.items.map((it) => (
                <div key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
              ))}
            </div>
            <a
              className="reachus"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setOpenServiceBox(null);
                scrollToBeat("contact");
              }}
            >
              REACH US
            </a>
          </div>
        );
      })}
      {openServiceBox && (
        <div className="servicesClose" onClick={() => setOpenServiceBox(null)}>
          <span className="closeMenu">CLOSE</span>
        </div>
      )}

      {/* ---------------- USE CASES OVERLAYS ---------------- */}
      <div className={`scroll-overlay-text center ${visible("usecases-1") ? "visible" : ""}`}>
        <h2>LIVE PROJECTS</h2>
        <p style={{ pointerEvents: "auto" }}>
          <button
            onClick={() => setPortfolioOpen(true)}
            className="reachus"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            VIEW WORK
          </button>
        </p>
      </div>

      <div className={`scroll-overlay-text right ${visible("usecases-clients") ? "visible" : ""}`} id="partnersLabel" style={{ width: "30vw", textAlign: "right" }}>
        <h2>PROJECTS</h2>
      </div>
      <div className={`logo-slider ${visible("usecases-clients") ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
        <ul className="logo-track">
          {[...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS].map((p, i) => (
            <li key={i}>
              <a href={`https://${p.host}/`} target="_blank" rel="noreferrer" className="pg-thumb">
                <LivePreview host={p.host} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------- CONTACT OVERLAY ---------------- */}
      <div className={`scroll-overlay-text center ${visible("contact") ? "visible" : ""}`} style={{ pointerEvents: "auto", width: "60vw" }}>
        <h2>SAY HELLO</h2>
        <div id="contacts_bottom" style={{ display: "flex", position: "static", width: "auto", gap: 20, marginTop: 24 }}>
          <div className="contactsBtns">
            <button className="contactBtn" onClick={() => { window.location.href = "mailto:muneebrahman500@gmail.com"; }}>
              Email Me
            </button>
            <p className="mt-2 font-mono text-[10px] text-white/50">[ Reply within a day ]</p>
          </div>
          <div className="contactsBtns">
            <ContactForm />
            <p className="mt-2 font-mono text-[10px] text-white/50">[ get a message back from me ]</p>
          </div>
        </div>
      </div>

      {/* Scroll spacer sections that drive the IntersectionObserver */}
      <div className="relative z-10">
        {BEATS.map((beat) => (
          <div
            key={beat}
            id={beat}
            data-beat={beat}
            ref={(el) => {
              beatRefs.current[beat] = el;
            }}
            className="h-screen w-full"
          />
        ))}
      </div>

      {/* Footer */}
      <div id="footer">
        <div id="social">
          <div className="mb-2 font-mono text-[10px] uppercase text-white/50">Social</div>
          <a className="socialIcon mr-2" href="https://www.linkedin.com/in/muneeb-soomro-887925333/" target="_blank" rel="noreferrer">
            <Image src="/images/linkedin-icon.svg" alt="LinkedIn" width={12} height={12} />
          </a>
          <a className="socialIcon mr-2" href="https://www.instagram.com/he__muneeb/" target="_blank" rel="noreferrer">
            <Image src="/images/instagram-icon.svg" alt="Instagram" width={12} height={12} />
          </a>
          <a className="socialIcon mr-2" href="https://github.com/muneebrahmancmd" target="_blank" rel="noreferrer">GH</a>
          <a className="socialIcon" href="https://x.com/Muneeb455365487" target="_blank" rel="noreferrer">X</a>
        </div>
        <div id="policies">
          <a href="https://github.com/muneebrahmancmd" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="https://www.linkedin.com/in/muneeb-soomro-887925333/" target="_blank" rel="noreferrer">LINKEDIN</a>
        </div>
        <div id="company">
          MUNEEB REHMAN
          <br />
          CREATIVE DEVELOPER &amp; DESIGNER
          <br />
          PAKISTAN
          <br />
          <a href="mailto:muneebrahman500@gmail.com">MUNEEBRAHMAN500@GMAIL.COM</a>
        </div>
      </div>

      {/* Clients button + popup */}
      <div id="clientsButton" className={clientsOpen ? "clientsOpen" : ""} onClick={() => setClientsOpen((o) => !o)}>
        <span id="openText">PROJECTS</span>
        <span id="closeText">CLOSE</span>
      </div>
      <div id="clientsPopup" className={clientsOpen ? "open" : ""}>
        <ul>
          {PORTFOLIO_ITEMS.map((p) => (
            <li key={p.host}>
              <LivePreview host={p.host} />
              <a className="pg-meta" href={`https://${p.host}/`} target="_blank" rel="noreferrer">{p.client}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Portfolio grid overlay */}
      <div className={`portfolio-grid ${portfolioOpen ? "open" : ""}`}>
        <div className="portfolioClose" onClick={() => setPortfolioOpen(false)}>
          <span className="closeMenu">CLOSE</span>
        </div>
        <ul>
          {PORTFOLIO_ITEMS.map((p) => (
            <li key={p.host}>
              <a href={`https://${p.host}/`} target="_blank" rel="noreferrer" style={{ position: "absolute", inset: 0, zIndex: 2 }} aria-label={p.client} />
              <div className="pg-thumb"><LivePreview host={p.host} /></div>
              <div className="pg-meta">
                <div className="client-name">{p.client}</div>
                <div className="client-type">{p.type}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chatbot */}
      <div id="chatbotBtn" className={chatbotOpen ? "chatbotOpened" : ""} onClick={() => setChatbotOpen((o) => !o)}>
        {chatbotOpen ? "CLOSE" : "SAY HELLO"}
      </div>
      <div id="chatbotPanel" className={chatbotOpen ? "open" : ""}>
        <p className="font-mono text-xs uppercase text-white/70">
          Hi! I am Muneeb. Tell me about your project and I will reply by email.
        </p>
        <form
          id="chatbotForm"
          onSubmit={(e) => {
            e.preventDefault();
            const q = (document.getElementById("chatbotQuestion") as HTMLTextAreaElement | null)?.value ?? "";
            window.location.href = "mailto:muneebrahman500@gmail.com?subject=" + encodeURIComponent("Project enquiry") + "&body=" + encodeURIComponent(q);
          }}
        >
          <textarea id="chatbotQuestion" rows={1} placeholder="Tell me about your project" />
          <button type="submit" className="contactBtn" style={{ padding: "10px 40px 10px 15px" }}>
            SEND
          </button>
        </form>
        
      </div>

      {/* Cookie banner */}
      {cookieChoice === "pending" && (
        <div className="cookie-banner">
          <p className="mb-1 font-bold normal-case">Cookies</p>
          <p>This site stores only your cookie choice. No analytics.</p>
          <div>
            <button onClick={() => acceptCookies(true)}>OK</button>
            <button onClick={() => acceptCookies(false)}>Decline</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ScrollText({
  visible,
  title,
  body,
  align,
}: {
  visible: boolean;
  title: string;
  body: string;
  align: "left" | "right" | "center";
}) {
  return (
    <div className={`scroll-overlay-text ${align} ${visible ? "visible" : ""}`}>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return <p className="font-mono text-xs uppercase text-white/70">Thanks. Your email app should open - I will reply soon.</p>;
  }
  return (
    <form
      className="sendy-form"
      onSubmit={(e) => {
        e.preventDefault();
        const em = (e.currentTarget.querySelector("input[type=email]") as HTMLInputElement).value;
        window.location.href = "mailto:muneebrahman500@gmail.com?subject=" + encodeURIComponent("Hello from " + em);
        setSubmitted(true);
      }}
    >
      <div className="mb-2 font-mono text-[10px] uppercase text-white/50">Say hello</div>
      <div style={{ display: "flex" }}>
        <input className="sendy-email" type="email" placeholder="YOUR EMAIL" required />
        <button className="sendy-submit" type="submit" aria-label="Send" />
      </div>
      <label className="mt-2 block font-mono text-[10px] text-white/50">
        <input type="checkbox" required className="mr-1" />
        I agree to be contacted about my message
      </label>
    </form>
  );
}
