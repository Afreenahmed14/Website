import "../styles/Technologies.css";
export default function Technologies({ navigate, siteData }) {
  const tech   = siteData?.technologies ?? {};
  const hero   = tech.hero   ?? { heading: "Modern Technologies.\nExpert Developers.", subtext: "" };
  const stacks = tech.stacks ?? [];

  const techData = {
    Frontend: [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "Tailwind CSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }
    ],
    Backend: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "FastAPI", logo: "https://cdn.worldvectorlogo.com/logos/fastapi.svg" },
      { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" }
    ],
    "Cloud & DevOps": [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "CI/CD", logo: "https://cdn-icons-png.flaticon.com/512/4149/4149680.png" },
      { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "GitHub Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
    ]
  };

  const allTechs = [
    ...techData.Frontend,
    ...techData.Backend,
    ...techData["Cloud & DevOps"]
  ];

  return (
    <>
      <section className="tech-hero">
        <div className="tech-hero-inner">
          <span className="sec-label sec-label-light">Technologies</span>
          <h1>{hero.heading.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</h1>
          <p>{hero.subtext}</p>
        </div>
      </section>

      <section className="tech-page">
        <div className="tech-page-head">
          <span className="tech-page-eyebrow">Our Expertise</span>
          <h2 className="tech-page-title">
            {hero.heading.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}
          </h2>
          <p className="tech-page-sub">{hero.subtext}</p>
        </div>

        <div className="tech-marquee-wrapper">
          {/* Row 1 */}
          <marquee direction="left" scrollAmount="4">
            {allTechs.map(({ name, logo }, index) => (
              <div key={`row1-${index}`} className="tech-marquee-item">
                <img src={logo} alt={name} className="tech-marquee-logo" />
                <span className="tech-marquee-name">{name}</span>
              </div>
            ))}
          </marquee>

          {/* Row 2 */}
          <marquee direction="right" scrollAmount="5">
            {allTechs.map(({ name, logo }, index) => (
              <div key={`row2-${index}`} className="tech-marquee-item">
                <img src={logo} alt={name} className="tech-marquee-logo" />
                <span className="tech-marquee-name">{name}</span>
              </div>
            ))}
          </marquee>

          {/* Row 3 */}
          <marquee direction="left" scrollAmount="6">
            {allTechs.map(({ name, logo }, index) => (
              <div key={`row3-${index}`} className="tech-marquee-item">
                <img src={logo} alt={name} className="tech-marquee-logo" />
                <span className="tech-marquee-name">{name}</span>
              </div>
            ))}
          </marquee>
        </div>

        {/* {stacks.map(({ name, techs }) => (
          <div key={name} className="tech-section">
            <div className="tech-section-header">
              <div className="tech-section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>{name}</h3>
            </div>
            <div className="tech-cards">
              {(techs ?? []).map(({ name: tname, color, desc }) => (
                <div key={tname} className="tech-card">
                  <div className="tech-card-dot" style={{ background: color }} />
                  <h4>{tname}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))} */}
      </section>

      <section className="cta">
        <div className="cta-inner">
          <div className="cta-content">
            <span className="sec-label cta-label">Need a Specialist?</span>
            <h2>Find the Right Tech Expert<br />for Your Stack</h2>
            <p>Whatever technology you're building with, we have vetted developers who specialize in it.</p>
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
            <button className="btn-outline-white" onClick={() => navigate("contact")}>Talk to Us</button>
          </div>
        </div>
      </section>
    </>
  );
}