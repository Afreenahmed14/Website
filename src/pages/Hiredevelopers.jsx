import { useState } from "react";
import "../styles/HireDevelopers.css";
const ALL_FILTERS = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Design"];

export default function HireDevelopers({ navigate, siteData }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const developers = siteData?.developers ?? [];
  const pricing    = siteData?.pricing    ?? [];

  const filtered = activeFilter === "All"
    ? developers
    : developers.filter(d => d.category === activeFilter);

  return (
    <>
      <section className="hire-hero">
        <div className="hire-hero-inner">
          <div className="badge-tag badge-tag-dark badge-tag-center">
            <span className="badge-dot" />
            Pre-vetted & Ready to Start
          </div>
          <h1>Hire World-Class Developers</h1>
          <p>Browse our network of {developers.length}+ pre-screened developers and hire the perfect match for your project in hours, not weeks.</p>
          <div className="hero-btns">
            <button className="btn-white"        onClick={() => navigate("contact")}>Book Free Consultation</button>
            <button className="btn-outline-white" onClick={() => navigate("how")}>How It Works</button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="hire-filter">
        <div className="hire-filter-inner">
          <span className="filter-label">Filter by:</span>
          {ALL_FILTERS.map(f => (
            <button key={f} className={`filter-chip${activeFilter === f ? " active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* Developer Cards */}
      <section className="hire-grid">
        <div className="sec-head hire-grid-head">
          <span className="sec-label">Available Developers</span>
          <h2 className="sec-title">Choose Your Perfect Match</h2>
          <p className="sec-sub">{filtered.length} developers available · Hire in 48 hours or less</p>
        </div>
        <div className="dev-cards">
          {filtered.map((dev) => (
            <div key={dev.name} className="dev-card">
              <div className="dev-header">
                <div className="dev-avatar" style={{ background: dev.color }}>{dev.initials}</div>
                <div>
                  <div className="dev-name">{dev.name}</div>
                  <div className="dev-role">{dev.role}</div>
                </div>
                <div className="dev-avail">
                  <div className="dev-avail-dot" />
                  Available
                </div>
              </div>
              <div className="dev-skills">
                {(dev.skills ?? []).map(s => <span key={s} className="dev-skill">{s}</span>)}
              </div>
              <div className="dev-stats">
                <div className="ds"><strong>{dev.exp}</strong><span>Experience</span></div>
                <div className="ds"><strong>{dev.rating}★</strong><span>Rating</span></div>
                <div className="ds"><strong>{dev.projects}</strong><span>Projects</span></div>
              </div>
              <p className="dev-rate">Starting at <strong>{dev.rate}</strong></p>
              <div className="dev-actions">
                <button className="btn-primary dev-btn"   onClick={() => navigate("contact")}>Hire Now</button>
                <button className="btn-secondary dev-btn" onClick={() => navigate("contact")}>View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      {pricing.length > 0 && (
        <section className="pricing">
          <div className="sec-head">
            <span className="sec-label">Pricing</span>
            <h2 className="sec-title">Transparent Pricing. No Surprises.</h2>
            <p className="sec-sub">Choose the plan that fits your needs. Scale or cancel anytime.</p>
          </div>
          <div className="pricing-grid">
            {pricing.map((p) => (
              <div key={p.name} className={`price-card${p.popular ? " popular" : ""}`}>
                {p.popular && <div className="popular-badge">Most Popular</div>}
                <div className="price-name">{p.name}</div>
                <div className="price-amt">{p.amount}<span className="price-period-inline">{p.period}</span></div>
                <div className="price-period">{p.subtext}</div>
                <div className="price-features">
                  {(p.features ?? []).map(f => <div key={f} className="price-feat">{f}</div>)}
                </div>
                {p.popular
                  ? <button className="btn-white price-btn"    onClick={() => navigate("contact")}>Hire Now</button>
                  : <button className="btn-secondary price-btn" onClick={() => navigate("contact")}>{p.amount === "Custom" ? "Request a Quote" : "Get Started"}</button>
                }
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <div className="cta-content">
            <span className="sec-label cta-label">Start Today</span>
            <h2>Your Next Developer is<br />48 Hours Away</h2>
            <p>Tell us what you need. We'll match you with the perfect developer and have them ready to start within 48 hours.</p>
          </div>
          <div className="cta-btns">
            <button className="btn-white"         onClick={() => navigate("contact")}>Start Hiring</button>
            <button className="btn-outline-white"  onClick={() => navigate("contact")}>Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}