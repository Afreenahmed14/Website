import { useState } from "react";
import "../styles/About.css";

export default function About({ navigate, siteData }) {
  const [activeTab, setActiveTab] = useState("Frontend");

  // ── Pull from Firebase, fall back to defaults ──
  const ab      = siteData?.about ?? {};
  const hero    = ab.hero    ?? {};
  const stats   = ab.stats   ?? [
    { value:"500+", label:"Vetted Developers" },
    { value:"200+", label:"Projects Delivered" },
    { value:"98%",  label:"Client Satisfaction" },
    { value:"48h",  label:"Average Onboarding" },
  ];
  const content = ab.content ?? {};
  const testimonials = siteData?.home?.testimonials ?? [];

  const techData = {
    Frontend: [
      { name:"React.js", color:"#61dafb" }, { name:"Angular", color:"#dd1b16" },
      { name:"Vue.js", color:"#42b883" },   { name:"HTML/CSS", color:"#e34c26" },
      { name:"Tailwind CSS", color:"#06b6d4" }, { name:"JavaScript", color:"#f7df1e" },
      { name:"TypeScript", color:"#3178c6" }, { name:"Next.js", color:"#000000" },
    ],
    Backend: [
      { name:"Node.js", color:"#339933" }, { name:"Python", color:"#3776ab" },
      { name:"Java", color:"#f89820" },    { name:"PHP", color:"#777bb4" },
      { name:".NET", color:"#512bd4" },    { name:"Django", color:"#0c4b33" },
      { name:"FastAPI", color:"#009688" }, { name:"Express.js", color:"#259dff" },
    ],
    "Cloud & DevOps": [
      { name:"AWS", color:"#ff9900" },   { name:"Azure", color:"#0078d4" },
      { name:"GCP", color:"#4285f4" },   { name:"Docker", color:"#2496ed" },
      { name:"Kubernetes", color:"#326ce5" }, { name:"CI/CD", color:"#22c55e" },
      { name:"Terraform", color:"#7b42bc" },  { name:"GitHub Actions", color:"#2088ff" },
    ],
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="sec-label sec-label-light">About Us</span>
          <h1>{hero.heading || "Helping Businesses Build Faster with Reliable Developers"}</h1>
          <p>{hero.subtext || "HourlyRecruit connects startups, agencies, and enterprises with skilled developers on flexible hourly engagement models. No long-term commitments, no risk."}</p>
          <div className="about-hero-btns">
            <button className="btn-white" onClick={() => navigate("hire")}>Hire Developers</button>
            <button className="btn-outline-white" onClick={() => navigate("contact")}>Book Free Consultation</button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="about-stats">
        <div className="about-stats-grid">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-card">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT CONTENT ── */}
      <section className="about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2>Who We Are</h2>
            {(content.paragraphs ?? []).length > 0
              ? content.paragraphs.map((p, i) => <p key={i}>{p}</p>)
              : (
                <>
                  <p>HourlyRecruit is a developer hiring platform that helps startups, agencies, and enterprises hire skilled developers on flexible hourly engagement models. From frontend engineering and backend architecture to DevOps, automation, and mobile app development — we provide experienced professionals who can work independently or alongside your internal team.</p>
                  <p>Whether you need one developer for a quick task or a complete engineering team for a large-scale project, our process makes tech hiring simple, fast, transparent, and scalable.</p>
                </>
              )
            }
            <div className="about-text-cta">
              <button className="btn-primary" onClick={() => navigate("hire")}>Explore Developers</button>
            </div>
          </div>

          <div className="about-features">
            {[
              { emoji:"🚀", title:"Fast Onboarding",    desc:"Get your developer onboarded and contributing within 24–48 hours of selection. No lengthy processes." },
              { emoji:"🔒", title:"Pre-Vetted Talent",  desc:"Every developer passes technical assessments, communication screenings, and reference checks before joining our pool." },
              { emoji:"⚡", title:"Flexible Engagement", desc:"Hourly, dedicated, or project-based — choose the model that fits your timeline and budget." },
              { emoji:"💬", title:"Transparent Process", desc:"Full visibility into timesheets, progress, and communications throughout your engagement." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="about-feat">
                <div className="about-feat-icon">{emoji}</div>
                <div><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section className="tech">
        <div className="sec-head">
          <span className="sec-label">Technologies We Work With</span>
          <h2 className="sec-title">Modern Technologies. Expert Developers.</h2>
        </div>
        <div className="tech-tabs">
          {Object.keys(techData).map(tab => (
            <button key={tab} className={`tech-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="tech-logos">
          {techData[activeTab].map(({ name, color }) => (
            <div key={name} className="tech-pill">
              <span className="tech-dot" style={{ background:color }} />
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="why">
        <div className="why-inner">
          <span className="sec-label sec-label-light">Why Choose HourlyRecruit</span>
          <h2 className="sec-title sec-title-light">Build Faster. Smarter. Better.</h2>
          <div className="why-grid">
            {[
              { icon:<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title:"Flexible Hiring",    desc:"Hire only when you need and optimize costs. No commitments." },
              { icon:<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,                                                            title:"Faster Execution", desc:"Quick onboarding with ready-to-work experts from day one." },
              { icon:<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title:"Scalable Teams",   desc:"Scale up or down based on your project needs instantly." },
              { icon:<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,                 title:"Startup Friendly", desc:"Affordable solutions designed for early-stage startups." },
              { icon:<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,                                           title:"Transparent Comms",desc:"Regular updates and clear communication throughout." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="why-card">
                <div className="why-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — from Firebase ── */}
      <section className="testimonials">
        <div className="sec-head">
          <span className="sec-label">Testimonials</span>
          <h2 className="sec-title">What Our Clients Say</h2>
          <p className="sec-sub">Trusted by businesses worldwide.</p>
        </div>
        <div className="testi-grid">
          {testimonials.map(({ initials, name, role, color, quote }, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">{quote}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background:color }}>{initials}</div>
                <div><h4>{name}</h4><span>{role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-inner">
          <div className="cta-content">
            <span className="sec-label cta-label">Get Started Today</span>
            <h2>Ready to Build Your<br />Dream Team?</h2>
            <p>Hire skilled developers on hourly basis and bring your ideas to life. No long-term contracts, no risk.</p>
          </div>
          <div className="cta-btns">
            <button className="btn-white" onClick={() => navigate("hire")}>Hire Developers Today</button>
            <button className="btn-outline-white" onClick={() => navigate("contact")}>Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}