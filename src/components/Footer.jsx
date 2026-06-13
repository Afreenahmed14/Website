import logo from "../assets/logo.png";

export default function Footer({ navigate, siteData }) {
  const info      = siteData?.contact?.info ?? {};
  const email     = info.email    || "hr@hourlyrecruit.com";
  const location  = info.location || "Bangalore, Karnataka, India";
  const website   = info.website  || "www.hourlyrecruit.com";
  const websiteHref = website.startsWith("http") ? website : `https://${website}`;

  const copyright = siteData?.footer?.copyright || "© 2024 HourlyRecruit. All Rights Reserved.";
  const desc      = siteData?.footer?.desc       || "Hire skilled developers on hourly basis and scale your projects faster without long-term commitments.";

  return (
    <footer className="footer">
      <div className="footer-top">

        {/* ── Brand ── */}
        <div className="footer-brand">
          <button onClick={() => navigate("home")} className="footer-logo-btn">
            <img src={logo} alt="HourlyRecruit" className="footer-logo-img" />
          </button>
          <p className="footer-brand-desc">{desc}</p>
          <div className="footer-socials">
            <div className="footer-social" title="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div className="footer-social" title="Twitter">
              <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </div>
            <div className="footer-social" title="YouTube">
              <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </div>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          {[
            ["home",         "Home"],
            ["about",        "About"],
            ["technologies", "Technologies"],
            ["how",          "How It Works"],
            ["contact",      "Contact"],
          ].map(([id, label]) => (
            <button key={id} className="footer-col-link" onClick={() => navigate(id)}>{label}</button>
          ))}
        </div>

        {/* ── Services ── */}
        <div className="footer-col">
          <h4>Services</h4>
          {[
            "Hourly Developers",
            "Dedicated Developers",
            "MVP Development",
            "Remote Developers",
            "Project Teams",
          ].map((s) => (
            <span key={s} className="footer-col-link footer-col-link--static">{s}</span>
          ))}
        </div>

        {/* ── Contact Us ── */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <a className="footer-col-link"
            href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
            target="_blank" rel="noopener noreferrer">
            📍 {location}
          </a>
          <a className="footer-col-link" href={`mailto:${email}`}>
            📧 {email}
          </a>
          <a className="footer-col-link" href={websiteHref} target="_blank" rel="noopener noreferrer">
            🌐 {website}
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>{copyright}</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </footer>
  );
}