/* global React, ReactDOM */
const { useState, useEffect } = React;

const C = window.CI_CONTENT;

// ---- utils ----

const fmtDate = (iso) => {
  const d = new Date(iso + "T12:00:00");
  return {
    mon: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()).padStart(2, "0"),
    year: d.getFullYear(),
  };
};

// ---- Topbar ----

function Topbar() {
  const h = C.hero;
  return (
    <header className="topbar">
      <div className="mark">
        <span className="dot" aria-hidden="true"></span>
        <span className="mark-full">Commitment Issues · {h.established}</span>
        <span className="mark-short">{h.shortName} · {h.established}</span>
      </div>
      <nav>
        <a href="#shows">Shows</a>
        <a href="#video">Video</a>
        <a href="#setlist">Setlist</a>
        <a href="#band">Band</a>
        <a href="#press">Press</a>
        <a href="#connect">Connect</a>
      </nav>
      <div className="right">
        <span className="va-label">VA · 757</span>
        <a className="cta" href="#connect">Book us</a>
      </div>
    </header>
  );
}

// ---- Hero ----

function Hero() {
  const h = C.hero;
  const nextShow = C.shows.shows.find(s => s.status !== "PRIVATE") || C.shows.shows[0];
  const n = nextShow ? fmtDate(nextShow.date) : null;
  const wordmarkRef = React.useRef(null);
  const taglineParts = h.tagline.split(" and/or ");
  useFitText(wordmarkRef, []);

  return (
    <section className="hero container" id="top">
      <div className="hero-top">
        <div className="meta-line">
          <b>Commitment Issues</b> / {h.descriptor}
        </div>
        <div className="meta-line">
          [ <b>{h.issueLabel}</b> / {h.issueSeason} ]
        </div>
      </div>

      <div className="hero-logo-wrap">
        <h1 className="hero-wordmark" ref={wordmarkRef} aria-label="Commitment Issues">
          <span className="line">Commitment</span>
          <span className="line">Issues<span className="dot-accent">.</span></span>
        </h1>
      </div>

      <div className="hero-tagline">
        {taglineParts.map((part, i, arr) => (
          <React.Fragment key={i}>
            {part}
            {i < arr.length - 1 && <span className="slash">and/or</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="hero-bottom">
        <div className="cell">
          Next show
          <span className="val">
            {n ? `${n.mon} ${n.day} · ${nextShow.venue}` : "TBA"}
          </span>
        </div>
        <div className="cell center">
          {h.heroSubtitle}
          <span className="val">{h.heroMission}</span>
        </div>
        <div className="cell right">
          {h.bookingsLabel}
          <span className="val">{h.bookingsEmail}</span>
        </div>
      </div>

      <div className="hero-scroll">{h.scrollHint}</div>
    </section>
  );
}

// ---- Shows ----

function Shows() {
  const { sectionKicker, sectionTitle, sectionMeta, shows } = C.shows;
  const titleLines = sectionTitle.split("\n");

  return (
    <section className="shows" id="shows">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{sectionKicker}</div>
            <h2>{titleLines.map((l, i) => <React.Fragment key={i}>{l}{i < titleLines.length - 1 && <br/>}</React.Fragment>)}</h2>
          </div>
          <div className="meta">{shows.length} dates booked · {sectionMeta}</div>
        </div>

        <div className="shows-list">
          {shows.map((s, i) => {
            const d = fmtDate(s.date);
            const statusClass = s.status === "FEW LEFT" ? "few" : s.status === "PRIVATE" ? "private" : "";
            return (
              <div className="show-row" key={i}>
                <div className="date">
                  <span className="dow">{s.dow}</span>
                  <span className="big">{d.mon} {d.day}</span>
                </div>
                <div>
                  <div className="venue">{s.venue}</div>
                  <div className="city">{s.city} · {d.year}</div>
                </div>
                <div className="note">{s.note}</div>
                <div>
                  <div className="price">{s.price}</div>
                  <div className={`status ${statusClass}`}>{s.status}</div>
                </div>
                {s.status === "PRIVATE"
                  ? <span className="go private">Private</span>
                  : <a className="go" href={s.url || "#"}>Tickets →</a>
                }
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- Video ----

function Video() {
  const v = C.video;
  const [playing, setPlaying] = useState(false);

  return (
    <section className="video" id="video">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{v.sectionKicker}</div>
            <h2>{v.sectionTitle.split("\n").map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br/>}</React.Fragment>)}</h2>
          </div>
          <div className="meta">{v.sectionMeta}</div>
        </div>

        {playing ? (
          <div className="video-frame" style={{cursor: "default"}}>
            <iframe
              style={{position:"absolute",inset:0,width:"100%",height:"100%",border:0}}
              src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
              title="Commitment Issues — live"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="video-frame" onClick={() => setPlaying(true)}>
            <div className="thumb" style={{
              backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(159,255,58,0.18), transparent 55%),
                radial-gradient(ellipse at 70% 80%, rgba(255,60,80,0.18), transparent 55%),
                linear-gradient(180deg, #0f0f0e 0%, #050505 100%),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 8px)`,
            }}></div>
            <div className="badge">{v.badge}</div>
            <div className="runtime">{v.runtime}</div>
            <div className="title-overlay">
              {v.videoTitle}
              <span className="sub">{v.videoSub}</span>
            </div>
            <button className="play" aria-label="Play video">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        )}

        <div className="video-caption">
          <div dangerouslySetInnerHTML={{__html: v.captionMain.replace(/^(One take\.)/, '<b>$1</b>')}}></div>
          <div>Filmed by <b>a stranger</b></div>
          <div>More clips · <b>YouTube ↗</b></div>
        </div>
      </div>
    </section>
  );
}

// ---- Setlist ----

function Setlist() {
  const { sectionKicker, sectionTitle, sectionMeta, notes, songs } = C.setlist;
  const titleLines = sectionTitle.split("\n");

  return (
    <section className="setlist-section" id="setlist">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{sectionKicker}</div>
            <h2>{titleLines.map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br/>}</React.Fragment>)}</h2>
          </div>
          <div className="meta">{songs.length} songs · rotating set · we take requests</div>
        </div>

        <div className="setlist-grid">
          {songs.map((s, i) => {
            const [artist, title] = s.split(" — ");
            return (
              <div className="song" key={i}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="song-body">
                  <span className="artist">{artist}</span>
                  <span className="title" data-title={title}>{title}</span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="setlist-note">
          {notes.map((n, i) => <span key={i}><b>▸</b> {n}</span>)}
        </div>
      </div>
    </section>
  );
}

// ---- Band ----

function Band() {
  const { sectionKicker, sectionTitle, sectionMeta, members } = C.band;
  const titleLines = sectionTitle.split("\n");

  return (
    <section className="band" id="band">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{sectionKicker}</div>
            <h2>{titleLines.map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br/>}</React.Fragment>)}</h2>
          </div>
          <div className="meta">{sectionMeta}</div>
        </div>

        <div className="band-grid">
          {members.map((m, i) => (
            <div className="member" key={m.name}>
              <div className="portrait">
                <div className="ph">[ photo {String(i + 1).padStart(2, "0")} ]</div>
                <div className="initials">{m.name[0]}</div>
              </div>
              <div>
                <div className="name">{m.name}</div>
                <div className="role">{m.role}</div>
                <div className="tag">{m.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Press ----

function Press() {
  const { sectionKicker, sectionTitle, sectionMeta, quotes } = C.press;
  const titleLines = sectionTitle.split("\n");

  return (
    <section className="press" id="press">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{sectionKicker}</div>
            <h2>{titleLines.map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br/>}</React.Fragment>)}</h2>
          </div>
          <div className="meta">{sectionMeta}</div>
        </div>

        <div className="press-grid">
          {quotes.map((p, i) => (
            <div className="quote" key={i}>
              <div className="q-mark">"</div>
              <div className="q-body">{p.quote}</div>
              <div className="q-src">— {p.src}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Connect ----

function Connect() {
  const { sectionKicker, sectionTitle, sectionMeta, socials, booking, marquee } = C.connect;
  const titleLines = sectionTitle.split("\n");
  const headlineLines = booking.headline.split("\n");

  const accentWords = new Set(["Weddings", "40ths", "Corporate"]);

  return (
    <section className="connect" id="connect">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{sectionKicker}</div>
            <h2>{titleLines.map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br/>}</React.Fragment>)}</h2>
          </div>
          <div className="meta">{sectionMeta}</div>
        </div>

        <div className="connect-wrap">
          <div>
            <div className="socials-list">
              {socials.map((s, i) => (
                <a className="social" key={i} href={s.url}>
                  <div>
                    <div className="name">{s.name}</div>
                    <div className="handle">{s.handle}</div>
                  </div>
                  <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="booking">
            <div className="kicker">{booking.kicker}</div>
            <h3>
              {headlineLines.map((line, i, a) => (
                <React.Fragment key={i}>
                  {line === booking.accentWord
                    ? <span style={{color: "var(--accent)"}}>{line}</span>
                    : line}
                  {i < a.length - 1 && <br/>}
                </React.Fragment>
              ))}
            </h3>
            <p>{booking.lead}</p>
            <div className="contacts">
              <a href={`mailto:${booking.email}`}>
                <span>{booking.email}</span>
                <span className="label">Email</span>
              </a>
              <a href={`tel:${booking.phone.replace(/[^0-9]/g, "")}`}>
                <span>{booking.phone}</span>
                <span className="label">Call / Text</span>
              </a>
              <span>
                <span>{booking.location}</span>
                <span className="label">Based</span>
              </span>
            </div>
          </div>
        </div>

        <div className="marquee-cta" aria-hidden="true">
          <div className="track">
            {[0, 1].map(k =>
              marquee.map((item, i) => (
                <span key={`${k}-${i}`} className={accentWords.has(item) ? "acc" : ""}>{item}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----

function Footer() {
  const f = C.footer;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">{f.logo}</div>
            <div>{f.descriptor}</div>
            <div style={{marginTop: 10}}>{f.copyright}</div>
          </div>
          <div>
            <h4>{f.siteLinksLabel}</h4>
            {f.siteLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
          </div>
          <div>
            <h4>{f.contactLinksLabel}</h4>
            {f.contactLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
          </div>
        </div>
        <div className="footer-bottom">
          <span>{f.bottomLeft}</span>
          <span>{f.bottomCenter}</span>
          <span>{f.bottomRight}</span>
        </div>
      </div>
    </footer>
  );
}

// ---- fit wordmark to container width ----

function useFitText(ref, deps) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = '';
      const container = el.parentElement.clientWidth;
      // measure the widest line (first span = "COMMITMENT")
      const line = el.querySelector('.line');
      if (!line) return;
      const natural = line.scrollWidth;
      if (natural > container) {
        const ratio = container / natural;
        const current = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = (current * ratio * 0.97) + 'px';
      }
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, deps);
}

// ---- App ----

function App() {
  const [chalk, setChalk] = useState(40);

  useEffect(() => {
    document.documentElement.style.setProperty("--chalk", String(chalk));
    const disp = document.querySelector("#ci-chalk-hero feDisplacementMap");
    if (disp) disp.setAttribute("scale", String(0.5 + chalk / 100 * 14));
    const disp2 = document.querySelector("#ci-chalk feDisplacementMap");
    if (disp2) disp2.setAttribute("scale", String(0.5 + chalk / 100 * 4));
  }, [chalk]);

  return (
    <React.Fragment>
      <Topbar />
      <Hero />
      <Shows />
      <Video />
      <Setlist />
      <Band />
      <Press />
      <Connect />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
