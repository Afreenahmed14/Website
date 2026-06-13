import { useState } from "react";

import "../styles/HowItWorks.css";
export default function HowItWorks({ navigate, siteData }) {
  const [openFaq, setOpenFaq] = useState(null);
  const hw    = siteData?.howItWorks ?? {};
  const hero  = hw.hero  ?? { heading: "From Brief to Build in 4 Simple Steps", subtext: "" };
  const steps = (hw.steps && hw.steps.length > 0) ? hw.steps : [
    { n: 1, title: "Share Your Requirements", desc: "Tell us about your project, tech stack, team size, and timeline. Our intake form takes less than 5 minutes to complete." },
    { n: 2, title: "Get Matched in 24 Hours", desc: "We handpick developers from our pre-vetted talent pool who match your exact requirements — skills, timezone, and availability." },
    { n: 3, title: "Interview & Select", desc: "Meet your matched candidates via a live technical interview. You stay in full control — hire only who you're confident in." },
    { n: 4, title: "Onboard & Start Building", desc: "Once you've chosen your developer, they're ready to join your team within 48 hours. No long procurement cycles." },
  ];
  const faqs  = hw.faqs  ?? [];

  return (
    <>
      <section className="how-hero">
        <div className="how-hero-inner">
          <span className="sec-label sec-label-light"> Hiring Process</span>
          <h1>{hero.heading}</h1>
          <p>{hero.subtext}</p>
        </div>
      </section>

      <section className="how-page">
        <div className="how-page-container">
          <div className="how-page-head">
            <span className="how-page-eyebrow">
              {hero.heading}
            </span>
            <h2 className="how-page-title">
              Hire Top Developers in 48 Hours
            </h2>
            <p className="how-page-sub">
              {hero.subtext}
            </p>
          </div>

          <div className="how-timeline">
            {/* Vertical Line */}
            <div className="how-timeline-line" />

            {steps.map((item, index) => (
              <div key={index} className="how-timeline-row">
                <div className="how-timeline-num">
                  {item.n || index + 1}
                </div>
                <div
                  className="how-timeline-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(10px)";
                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(37,99,235,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                  }}
                >
                  <h3 className="how-timeline-card-title">{item.title}</h3>
                  <p className="how-timeline-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="engage-section">
        <div className="sec-head engage-head">
          <span className="sec-label">Engagement Models</span>
          <h2 className="sec-title">Choose How You Work With Us</h2>
        </div>
        <div className="engage-grid">
          {(siteData?.home?.engagement?.models ?? [
            { title:"Hourly Hiring", featured:false, desc:"Pay only for productive hours logged. Ideal for ongoing feature development, bug fixes, or ad-hoc technical support.", perks:["Pay for actual hours logged","Weekly billing & timesheets","Start & pause anytime","No minimum commitment"] },
            { title:"Dedicated Developer", featured:true, desc:"A full-time developer embedded into your team — attending standups, working your timezone, and owning deliverables just like an in-house hire.", perks:["Exclusive to your project","Full timezone alignment","Monthly fixed pricing","7-day replacement guarantee"] },
            { title:"Project-Based Team", featured:false, desc:"Assemble a complete team scoped to deliver a defined product milestone from design to deployment.", perks:["Fixed scope & deliverables","Dedicated project manager","Milestone-based billing","End-to-end ownership"] },
          ]).map((m) => (
            <div key={m.title} className={`eng-card${m.featured ? " featured" : ""}`}>
              {m.featured && <span className="eng-badge">Popular</span>}
              <div className={`eng-icon${m.featured ? " inv" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div className="eng-perks">
                {(m.perks ?? []).map(p => <div key={p} className="eng-perk">{p}</div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="faq">
          <div className="sec-head">
            <span className="sec-label">FAQ</span>
            <h2 className="sec-title">Frequently Asked Questions</h2>
            <p className="sec-sub">Everything you need to know about working with HourlyRecruit.</p>
          </div>
          <div className="faq-list">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="faq-item">
                <button className={`faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q}
                  <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {openFaq === i && <div className="faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <div className="cta-content">
            <span className="sec-label cta-label">Ready?</span>
            <h2>Start Your Project<br />in 48 Hours</h2>
            <p>Share your requirements today. We'll have matched candidates in your inbox by tomorrow.</p>
          </div>
          <div className="cta-btns">
            <button
              className="btn-white"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSdJleRoQ4AtK_GARvDOV39sfBGv9Zk2VDYqiKF8TgwVMBIeTg/viewform?usp=publish-editor",
                  "_blank"
                )
              }
            >
              Get Started
            </button>
            {/* <button className="btn-white" onClick={() => navigate("contact")}>Get Started</button> */}
            <button className="btn-outline-white" onClick={() => navigate("contact")}>Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}