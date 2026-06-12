import { useState, useEffect } from "react";
import { getData, setData, resetData, DEFAULT_DATA } from "../api/Datastore";
import logo from "../assets/logoweb.png";
import "../styles/Admindashboard.css";

// ── Primitive UI components ───────────────────────────────────────────────────

function Btn({ children, onClick, variant = "primary", size = "md", disabled, className = "" }) {
  const cls = [
    "admin-btn",
    `admin-btn-${size}`,
    `admin-btn-${variant}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Field({ label, value, onChange, multiline, rows = 3, type = "text" }) {
  return (
    <div className="admin-field">
      {label && <label className="admin-label">{label}</label>}
      {multiline
        ? <textarea rows={rows} className="admin-textarea" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        : <input type={type} className="admin-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`admin-card ${className}`}>{children}</div>;
}

function SectionTitle({ children, action }) {
  return (
    <div className="admin-section-title-bar">
      <h3 className="admin-section-title">{children}</h3>
      {action}
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2800); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="admin-toast">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18, flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {msg}
    </div>
  );
}

function CollapseItem({ header, children, isOpen, onToggle, onDelete }) {
  return (
    <div className="admin-collapse">
      <div className={`admin-collapse-head${isOpen ? " open" : ""}`} onClick={onToggle}>
        {header}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`admin-collapse-chevron${isOpen ? " open" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
        {onDelete && (
          <Btn variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(); }}>✕</Btn>
        )}
      </div>
      {isOpen && <div className="admin-collapse-body">{children}</div>}
    </div>
  );
}

// ── Helper: list editor (add/remove string items) ────────────────────────────

function ListEditor({ label, items, onChange, placeholder = "Add item…" }) {
  return (
    <div className="admin-field">
      {label && <label className="admin-label">{label}</label>}
      {items.map((item, i) => (
        <div key={i} className="admin-row">
          <input
            className="admin-input"
            value={item ?? ""}
            placeholder={placeholder}
            onChange={(e) => { const a = [...items]; a[i] = e.target.value; onChange(a); }}
          />
          <Btn variant="danger" size="sm" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</Btn>
        </div>
      ))}
      <Btn variant="ghost" size="sm" onClick={() => onChange([...items, ""])}>+ Add Item</Btn>
    </div>
  );
}

// ── PANELS ────────────────────────────────────────────────────────────────────

// HOME → Hero
function HeroEditor({ data, onChange }) {
  const h = data?.home?.hero ?? {};
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, hero: { ...h, [k]: v } } });

  return (
    <Card>
      <SectionTitle>Hero Section</SectionTitle>
      <Field label="Badge Text"     value={h.badge}    onChange={(v) => upd("badge", v)} />
      <Field label="Heading Line 1" value={h.heading1} onChange={(v) => upd("heading1", v)} />
      <Field label="Heading Line 2 (accent)" value={h.heading2} onChange={(v) => upd("heading2", v)} />
      <Field label="Subtext" value={h.subtext} onChange={(v) => upd("subtext", v)} multiline rows={3} />

      <ListEditor
        label="Checklist Items"
        items={h.checks ?? []}
        onChange={(v) => upd("checks", v)}
      />

      <div className="admin-field">
        <label className="admin-label">Card Stats</label>
        <div className="admin-grid-3">
          {(h.cardStats ?? []).map((s, i) => (
            <div key={i} className="admin-stat-mini">
              <input className="admin-stat-mini-input" value={s.value ?? ""} placeholder="Value"
                onChange={(e) => { const a = [...(h.cardStats ?? [])]; a[i] = { ...a[i], value: e.target.value }; upd("cardStats", a); }} />
              <input className="admin-stat-mini-input" value={s.label ?? ""} placeholder="Label"
                onChange={(e) => { const a = [...(h.cardStats ?? [])]; a[i] = { ...a[i], label: e.target.value }; upd("cardStats", a); }} />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-field">
        <label className="admin-label">Float Stats</label>
        <div className="admin-grid-2">
          {(h.floatStats ?? []).map((s, i) => (
            <div key={i} className="admin-stat-mini">
              <input className="admin-stat-mini-input" value={s.value ?? ""} placeholder="Value"
                onChange={(e) => { const a = [...(h.floatStats ?? [])]; a[i] = { ...a[i], value: e.target.value }; upd("floatStats", a); }} />
              <input className="admin-stat-mini-input" value={s.label ?? ""} placeholder="Label"
                onChange={(e) => { const a = [...(h.floatStats ?? [])]; a[i] = { ...a[i], label: e.target.value }; upd("floatStats", a); }} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// HOME → Trust Bar
function TrustEditor({ data, onChange }) {
  const trust = data?.home?.trust ?? { label: "", logos: [] };
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, trust: { ...trust, [k]: v } } });

  return (
    <Card>
      <SectionTitle>Trust Bar</SectionTitle>
      <Field label="Label Text" value={trust.label} onChange={(v) => upd("label", v)} />
      <ListEditor label="Logo Names" items={trust.logos ?? []} onChange={(v) => upd("logos", v)} placeholder="Company name…" />
    </Card>
  );
}

// HOME → What We Offer
function OfferEditor({ data, onChange }) {
  const offer = data?.home?.offer ?? { label: "", heading: "", sub: "", items: [] };
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, offer: { ...offer, [k]: v } } });

  return (
    <Card>
      <SectionTitle>What We Offer</SectionTitle>
      <Field label="Section Label" value={offer.label}   onChange={(v) => upd("label", v)} />
      <Field label="Heading"       value={offer.heading} onChange={(v) => upd("heading", v)} />
      <Field label="Subtext"       value={offer.sub}     onChange={(v) => upd("sub", v)} multiline rows={2} />
      <ListEditor label="Service Items" items={offer.items ?? []} onChange={(v) => upd("items", v)} placeholder="e.g. Frontend Developers" />
    </Card>
  );
}

// HOME → Engagement Models
function EngagementEditor({ data, onChange }) {
  const eng = data?.home?.engagement ?? { label: "", heading: "", sub: "", models: [] };
  const [expand, setExpand] = useState(null);
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, engagement: { ...eng, [k]: v } } });

  return (
    <Card>
      <SectionTitle>Engagement Models</SectionTitle>
      <Field label="Section Label" value={eng.label}   onChange={(v) => upd("label", v)} />
      <Field label="Heading"       value={eng.heading} onChange={(v) => upd("heading", v)} />
      <Field label="Subtext"       value={eng.sub}     onChange={(v) => upd("sub", v)} multiline rows={2} />

      <div className="admin-field">
        <label className="admin-label">Models</label>
        {(eng.models ?? []).map((m, i) => (
          <CollapseItem
            key={i}
            isOpen={expand === i}
            onToggle={() => setExpand(expand === i ? null : i)}
            onDelete={() => { upd("models", eng.models.filter((_, j) => j !== i)); if (expand === i) setExpand(null); }}
            header={
              <div className="admin-collapse-info">
                <div className="admin-collapse-name">{m.title || `Model ${i + 1}`}</div>
                {m.featured && <span className="admin-collapse-badge">Popular</span>}
              </div>
            }
          >
            <Field label="Title" value={m.title} onChange={(v) => { const a = [...eng.models]; a[i] = { ...a[i], title: v }; upd("models", a); }} />
            <Field label="Description" value={m.desc} onChange={(v) => { const a = [...eng.models]; a[i] = { ...a[i], desc: v }; upd("models", a); }} multiline rows={3} />
            <label className="admin-checkbox-label">
              <input type="checkbox" checked={!!m.featured}
                onChange={(e) => { const a = [...eng.models]; a[i] = { ...a[i], featured: e.target.checked }; upd("models", a); }} />
              Mark as Popular / Featured
            </label>
            <ListEditor label="Perks" items={m.perks ?? []} onChange={(v) => { const a = [...eng.models]; a[i] = { ...a[i], perks: v }; upd("models", a); }} />
          </CollapseItem>
        ))}
        <Btn variant="ghost" size="sm" onClick={() => upd("models", [...(eng.models ?? []), { title: "New Model", desc: "", perks: [], featured: false }])}>
          + Add Model
        </Btn>
      </div>
    </Card>
  );
}

// HOME → Startup Section
function StartupEditor({ data, onChange }) {
  const s = data?.home?.startup ?? {};
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, startup: { ...s, [k]: v } } });
  const updCard = (k, v) => upd("card", { ...(s.card ?? {}), [k]: v });

  return (
    <>
      <Card>
        <SectionTitle>Startup Section</SectionTitle>
        <Field label="Tag"      value={s.tag}     onChange={(v) => upd("tag", v)} />
        <Field label="Heading"  value={s.heading} onChange={(v) => upd("heading", v)} />
        <Field label="Description" value={s.desc} onChange={(v) => upd("desc", v)} multiline rows={3} />
        <ListEditor label="Checklist" items={s.checks ?? []} onChange={(v) => upd("checks", v)} />
      </Card>
      <Card className="admin-card-mt">
        <SectionTitle>Launch Card</SectionTitle>
        <Field label="Card Heading"     value={s.card?.heading} onChange={(v) => updCard("heading", v)} />
        <Field label="Card Description" value={s.card?.desc}    onChange={(v) => updCard("desc", v)} multiline rows={2} />
        <div className="admin-field">
          <label className="admin-label">Card Stats</label>
          <div className="admin-grid-2">
            {(s.card?.stats ?? []).map((st, i) => (
              <div key={i} className="admin-stat-mini">
                <input className="admin-stat-mini-input" value={st.value ?? ""} placeholder="Value"
                  onChange={(e) => { const a = [...(s.card?.stats ?? [])]; a[i] = { ...a[i], value: e.target.value }; updCard("stats", a); }} />
                <input className="admin-stat-mini-input" value={st.label ?? ""} placeholder="Label"
                  onChange={(e) => { const a = [...(s.card?.stats ?? [])]; a[i] = { ...a[i], label: e.target.value }; updCard("stats", a); }} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}

// HOME → How It Works steps
function HomeHowEditor({ data, onChange }) {
  const how = data?.home?.how ?? {};
  const [expand, setExpand] = useState(null);
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, how: { ...how, [k]: v } } });

  return (
    <Card>
      <SectionTitle>How It Works (Home)</SectionTitle>
      <Field label="Section Label" value={how.label}   onChange={(v) => upd("label", v)} />
      <Field label="Heading"       value={how.heading} onChange={(v) => upd("heading", v)} />
      <Field label="Subtext"       value={how.sub}     onChange={(v) => upd("sub", v)} multiline rows={2} />

      <div className="admin-field">
        <label className="admin-label">Steps</label>
        {(how.steps ?? []).map((step, i) => (
          <CollapseItem
            key={i}
            isOpen={expand === i}
            onToggle={() => setExpand(expand === i ? null : i)}
            onDelete={() => { upd("steps", how.steps.filter((_, j) => j !== i)); if (expand === i) setExpand(null); }}
            header={
              <div className="admin-collapse-info">
                <div className="admin-collapse-name">{step.n}. {step.title || "Untitled Step"}</div>
              </div>
            }
          >
            <Field label="Step Number" value={step.n}     onChange={(v) => { const a = [...how.steps]; a[i] = { ...a[i], n: v }; upd("steps", a); }} />
            <Field label="Title"       value={step.title} onChange={(v) => { const a = [...how.steps]; a[i] = { ...a[i], title: v }; upd("steps", a); }} />
            <Field label="Description" value={step.desc}  onChange={(v) => { const a = [...how.steps]; a[i] = { ...a[i], desc: v }; upd("steps", a); }} multiline rows={2} />
          </CollapseItem>
        ))}
        <Btn variant="ghost" size="sm" onClick={() => upd("steps", [...(how.steps ?? []), { n: String((how.steps?.length ?? 0) + 1), title: "", desc: "" }])}>
          + Add Step
        </Btn>
      </div>
    </Card>
  );
}

// HOME → Why Us
function WhyEditor({ data, onChange }) {
  const why = data?.home?.why ?? {};
  const [expand, setExpand] = useState(null);
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, why: { ...why, [k]: v } } });

  return (
    <Card>
      <SectionTitle>Why Choose Us</SectionTitle>
      <Field label="Section Label" value={why.label}   onChange={(v) => upd("label", v)} />
      <Field label="Heading"       value={why.heading} onChange={(v) => upd("heading", v)} />

      <div className="admin-field">
        <label className="admin-label">Cards</label>
        {(why.cards ?? []).map((c, i) => (
          <CollapseItem
            key={i}
            isOpen={expand === i}
            onToggle={() => setExpand(expand === i ? null : i)}
            onDelete={() => { upd("cards", why.cards.filter((_, j) => j !== i)); if (expand === i) setExpand(null); }}
            header={<div className="admin-collapse-info"><div className="admin-collapse-name">{c.title || `Card ${i + 1}`}</div></div>}
          >
            <Field label="Title"       value={c.title} onChange={(v) => { const a = [...why.cards]; a[i] = { ...a[i], title: v }; upd("cards", a); }} />
            <Field label="Description" value={c.desc}  onChange={(v) => { const a = [...why.cards]; a[i] = { ...a[i], desc: v }; upd("cards", a); }} multiline rows={2} />
          </CollapseItem>
        ))}
        <Btn variant="ghost" size="sm" onClick={() => upd("cards", [...(why.cards ?? []), { title: "", desc: "" }])}>+ Add Card</Btn>
      </div>
    </Card>
  );
}

// HOME → CTA
function CTAEditor({ data, onChange }) {
  const cta = data?.home?.cta ?? {};
  const upd = (k, v) => onChange({ ...data, home: { ...data.home, cta: { ...cta, [k]: v } } });

  return (
    <Card>
      <SectionTitle>Call To Action (Home)</SectionTitle>
      <Field label="Label"   value={cta.label}   onChange={(v) => upd("label", v)} />
      <Field label="Heading" value={cta.heading} onChange={(v) => upd("heading", v)} />
      <Field label="Subtext" value={cta.sub}     onChange={(v) => upd("sub", v)} multiline rows={2} />
    </Card>
  );
}

// HOME → Testimonials
function TestimonialsEditor({ data, onChange }) {
  const ts = data?.home?.testimonials ?? [];
  const [expand, setExpand] = useState(null);
  const upd = (newTs) => onChange({ ...data, home: { ...data.home, testimonials: newTs } });

  return (
    <Card>
      <SectionTitle
        action={
          <Btn variant="primary" size="sm" onClick={() => {
            const newTs = [...ts, { initials: "AB", name: "New Person", role: "Title, Company", color: "linear-gradient(135deg,#1a56db,#3b82f6)", quote: "Great experience!" }];
            upd(newTs);
            setExpand(newTs.length - 1);
          }}>+ Add</Btn>
        }
      >Testimonials</SectionTitle>

      {ts.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-title">No testimonials yet</div>
          <div className="admin-empty-sub">Click + Add above to create one</div>
        </div>
      )}

      {ts.map((t, i) => (
        <CollapseItem
          key={i}
          isOpen={expand === i}
          onToggle={() => setExpand(expand === i ? null : i)}
          onDelete={() => { upd(ts.filter((_, j) => j !== i)); if (expand === i) setExpand(null); }}
          header={
            <div className="admin-collapse-info">
              <div className="admin-collapse-name">{t.name || `Testimonial ${i + 1}`}</div>
              <div className="admin-collapse-meta">{t.role}</div>
            </div>
          }
        >
          <div className="admin-grid-2">
            <Field label="Initials" value={t.initials} onChange={(v) => { const a = [...ts]; a[i] = { ...a[i], initials: v }; upd(a); }} />
            <Field label="Name"     value={t.name}     onChange={(v) => { const a = [...ts]; a[i] = { ...a[i], name: v }; upd(a); }} />
          </div>
          <Field label="Role, Company" value={t.role}  onChange={(v) => { const a = [...ts]; a[i] = { ...a[i], role: v }; upd(a); }} />
          <Field label="Quote"         value={t.quote} onChange={(v) => { const a = [...ts]; a[i] = { ...a[i], quote: v }; upd(a); }} multiline rows={3} />
        </CollapseItem>
      ))}
    </Card>
  );
}

// DEVELOPERS
function DevelopersEditor({ data, onChange }) {
  const devs = data?.developers ?? [];
  const [expand, setExpand] = useState(null);
  const upd = (newDevs) => onChange({ ...data, developers: newDevs });
  const CATEGORIES = ["Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Design"];

  return (
    <Card>
      <SectionTitle
        action={
          <Btn variant="primary" size="sm" onClick={() => {
            const nd = { initials: "NW", name: "New Developer", role: "Role", exp: "3 yrs", rate: "$30/hr", rating: "4.8", projects: 10, color: "linear-gradient(135deg,#1a56db,#3b82f6)", skills: ["React", "Node.js"], category: "Frontend" };
            upd([...devs, nd]);
            setExpand(devs.length);
          }}>+ Add Developer</Btn>
        }
      >Developer Profiles</SectionTitle>

      {devs.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-title">No developers yet</div>
          <div className="admin-empty-sub">Click + Add Developer to create a profile</div>
        </div>
      )}

      {devs.map((d, i) => (
        <CollapseItem
          key={i}
          isOpen={expand === i}
          onToggle={() => setExpand(expand === i ? null : i)}
          onDelete={() => { upd(devs.filter((_, j) => j !== i)); if (expand === i) setExpand(null); }}
          header={
            <>
              <div className="admin-collapse-avatar" style={{ background: d.color }}>{d.initials}</div>
              <div className="admin-collapse-info">
                <div className="admin-collapse-name">{d.name}</div>
                <div className="admin-collapse-meta">{d.role} · {d.rate}</div>
              </div>
              <span className="admin-collapse-badge">{d.category}</span>
            </>
          }
        >
          <div className="admin-grid-2">
            {[["initials","Initials"],["name","Name"],["role","Role"],["exp","Experience"],["rate","Rate / hr"],["rating","Rating"]].map(([k, lbl]) => (
              <Field key={k} label={lbl} value={d[k]} onChange={(v) => { const a = [...devs]; a[i] = { ...a[i], [k]: v }; upd(a); }} />
            ))}
          </div>
          <div className="admin-field">
            <label className="admin-label">Category</label>
            <select className="admin-input" value={d.category}
              onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], category: e.target.value }; upd(a); }}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-label">Skills (comma-separated)</label>
            <input className="admin-input" value={(d.skills ?? []).join(", ")}
              onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }; upd(a); }} />
          </div>
        </CollapseItem>
      ))}
    </Card>
  );
}

// PRICING
function PricingEditor({ data, onChange }) {
  const plans = data?.pricing ?? [];
  const [expand, setExpand] = useState(null);
  const upd = (newPlans) => onChange({ ...data, pricing: newPlans });

  return (
    <Card>
      <SectionTitle
        action={
          <Btn variant="primary" size="sm" onClick={() => {
            upd([...plans, { name: "New Plan", amount: "$0", period: "/mo", subtext: "", popular: false, features: [] }]);
            setExpand(plans.length);
          }}>+ Add Plan</Btn>
        }
      >Pricing Plans</SectionTitle>

      {plans.length === 0 && (
        <div className="admin-empty">
          <div className="admin-empty-title">No pricing plans yet</div>
          <div className="admin-empty-sub">Click + Add Plan above to create one</div>
        </div>
      )}

      {plans.map((p, i) => (
        <CollapseItem
          key={i}
          isOpen={expand === i}
          onToggle={() => setExpand(expand === i ? null : i)}
          onDelete={() => { upd(plans.filter((_, j) => j !== i)); if (expand === i) setExpand(null); }}
          header={
            <div className="admin-collapse-info">
              <div className="admin-collapse-name">{p.name || "Untitled Plan"}</div>
              {p.popular && <span className="admin-collapse-badge-popular">Popular</span>}
            </div>
          }
        >
          <div className="admin-grid-3">
            <Field label="Plan Name" value={p.name}   onChange={(v) => { const a = [...plans]; a[i] = { ...a[i], name: v }; upd(a); }} />
            <Field label="Amount"    value={p.amount} onChange={(v) => { const a = [...plans]; a[i] = { ...a[i], amount: v }; upd(a); }} />
            <Field label="Period"    value={p.period} onChange={(v) => { const a = [...plans]; a[i] = { ...a[i], period: v }; upd(a); }} />
          </div>
          <Field label="Subtext" value={p.subtext} onChange={(v) => { const a = [...plans]; a[i] = { ...a[i], subtext: v }; upd(a); }} />
          <label className="admin-checkbox-label">
            <input type="checkbox" checked={!!p.popular}
              onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], popular: e.target.checked }; upd(a); }} />
            Mark as Popular
          </label>
          <ListEditor
            label="Features"
            items={p.features ?? []}
            onChange={(v) => { const a = [...plans]; a[i] = { ...a[i], features: v }; upd(a); }}
            placeholder="Feature description…"
          />
        </CollapseItem>
      ))}
    </Card>
  );
}

// ABOUT
function AboutEditor({ data, onChange }) {
  const ab      = data?.about ?? {};
  const hero    = ab.hero ?? {};
  const content = ab.content ?? {};
  const stats   = ab.stats ?? [];

  const updHero    = (k, v) => onChange({ ...data, about: { ...ab, hero:    { ...hero,    [k]: v } } });
  const updContent = (k, v) => onChange({ ...data, about: { ...ab, content: { ...content, [k]: v } } });

  return (
    <>
      <Card>
        <SectionTitle>About Hero</SectionTitle>
        <Field label="Heading" value={hero.heading} onChange={(v) => updHero("heading", v)} />
        <Field label="Subtext" value={hero.subtext} onChange={(v) => updHero("subtext", v)} multiline rows={3} />
      </Card>

      <Card className="admin-card-mt">
        <SectionTitle>Mission / Content</SectionTitle>
        <Field label="Mission Statement" value={content.mission} onChange={(v) => updContent("mission", v)} multiline rows={3} />
        {content.heading !== undefined && (
          <Field label="Section Heading" value={content.heading} onChange={(v) => updContent("heading", v)} />
        )}
        <ListEditor
          label="Paragraphs"
          items={content.paragraphs ?? []}
          onChange={(v) => updContent("paragraphs", v)}
          placeholder="Paragraph text…"
        />
      </Card>

      <Card className="admin-card-mt">
        <SectionTitle>Stats</SectionTitle>
        <div className="admin-grid-2">
          {stats.map((s, i) => (
            <div key={i} className="admin-stat-mini">
              <input className="admin-stat-mini-input" value={s.value ?? ""} placeholder="Value"
                onChange={(e) => { const a = [...stats]; a[i] = { ...a[i], value: e.target.value }; onChange({ ...data, about: { ...ab, stats: a } }); }} />
              <input className="admin-stat-mini-input" value={s.label ?? ""} placeholder="Label"
                onChange={(e) => { const a = [...stats]; a[i] = { ...a[i], label: e.target.value }; onChange({ ...data, about: { ...ab, stats: a } }); }} />
            </div>
          ))}
        </div>
        <Btn variant="ghost" size="sm" onClick={() => onChange({ ...data, about: { ...ab, stats: [...stats, { value: "", label: "" }] } })}>
          + Add Stat
        </Btn>
      </Card>
    </>
  );
}

// CONTACT
function ContactEditor({ data, onChange }) {
  const ct = data?.contact ?? {};
  const isNested = ct.hero !== undefined || ct.info !== undefined;

  const heading  = isNested ? (ct.hero?.heading  ?? "") : (ct.heading  ?? "");
  const subtext  = isNested ? (ct.hero?.subtext  ?? "") : (ct.subtext  ?? "");
  const location = isNested ? (ct.info?.location ?? "") : (ct.location ?? "");
  const email    = isNested ? (ct.info?.email    ?? "") : (ct.email    ?? "");
  const phone    = isNested ? (ct.info?.phone    ?? "") : (ct.phone    ?? "");
  const website  = isNested ? (ct.info?.website  ?? "") : (ct.website  ?? "");

  const upd = (k, v) => onChange({ ...data, contact: { ...ct, [k]: v } });
  const updNested = (key, topKey, innerKey, v) =>
    onChange({ ...data, contact: { ...ct, [topKey]: v, [key]: { ...(ct[key] ?? {}), [innerKey]: v } } });

  const updH = (v) => isNested ? updNested("hero", "heading", "heading", v) : upd("heading", v);
  const updS = (v) => isNested ? updNested("hero", "subtext", "subtext", v) : upd("subtext", v);
  const updL = (v) => isNested ? updNested("info", "location", "location", v) : upd("location", v);
  const updE = (v) => isNested ? updNested("info", "email", "email", v)       : upd("email", v);
  const updP = (v) => isNested ? updNested("info", "phone", "phone", v)       : upd("phone", v);
  const updW = (v) => isNested ? updNested("info", "website", "website", v)   : upd("website", v);

  return (
    <>
      <Card>
        <SectionTitle>Contact Hero</SectionTitle>
        <Field label="Heading" value={heading} onChange={updH} />
        <Field label="Subtext" value={subtext} onChange={updS} multiline rows={3} />
      </Card>
      <Card className="admin-card-mt">
        <SectionTitle>Contact Info</SectionTitle>
        <Field label="Location" value={location} onChange={updL} />
        <Field label="Email"    value={email}    onChange={updE} />
        <Field label="Phone"    value={phone}    onChange={updP} />
        <Field label="Website"  value={website}  onChange={updW} />
      </Card>
      <Card className="admin-card-mt">
        <SectionTitle>Next Steps</SectionTitle>
        <ListEditor
          items={ct.nextSteps ?? []}
          onChange={(v) => upd("nextSteps", v)}
          placeholder="Step description…"
        />
      </Card>
    </>
  );
}

// HOW IT WORKS page
function HowItWorksEditor({ data, onChange }) {
  const hw   = data?.howItWorks ?? {};
  const hero = hw.hero ?? {};
  const [expand, setExpand] = useState(null);
  const updHero = (k, v) => onChange({ ...data, howItWorks: { ...hw, hero: { ...hero, [k]: v } } });

  return (
    <>
      <Card>
        <SectionTitle>How It Works — Hero</SectionTitle>
        <Field label="Heading" value={hero.heading} onChange={(v) => updHero("heading", v)} />
        <Field label="Subtext" value={hero.subtext} onChange={(v) => updHero("subtext", v)} multiline rows={3} />
      </Card>
      <Card className="admin-card-mt">
        <SectionTitle>FAQ</SectionTitle>
        {(hw.faqs ?? []).map((f, i) => (
          <CollapseItem
            key={i}
            isOpen={expand === i}
            onToggle={() => setExpand(expand === i ? null : i)}
            onDelete={() => { onChange({ ...data, howItWorks: { ...hw, faqs: hw.faqs.filter((_, j) => j !== i) } }); if (expand === i) setExpand(null); }}
            header={<div className="admin-collapse-info"><div className="admin-collapse-name">{f.q || `FAQ ${i + 1}`}</div></div>}
          >
            <Field label="Question" value={f.q} onChange={(v) => { const a = [...hw.faqs]; a[i] = { ...a[i], q: v }; onChange({ ...data, howItWorks: { ...hw, faqs: a } }); }} />
            <Field label="Answer"   value={f.a} onChange={(v) => { const a = [...hw.faqs]; a[i] = { ...a[i], a: v }; onChange({ ...data, howItWorks: { ...hw, faqs: a } }); }} multiline rows={3} />
          </CollapseItem>
        ))}
        <Btn variant="ghost" size="sm" onClick={() => onChange({ ...data, howItWorks: { ...hw, faqs: [...(hw.faqs ?? []), { q: "", a: "" }] } })}>
          + Add FAQ
        </Btn>
      </Card>
    </>
  );
}

// TECHNOLOGIES
const TECH_CATEGORIES = ["Frontend", "Backend", "DevOps & Cloud"];

function TechnologiesEditor({ data, onChange }) {
  const tech   = data?.technologies ?? {};
  const hero   = tech.hero ?? {};
  const stacks = tech.stacks ?? [];
  const [activeSub, setActiveSub] = useState(TECH_CATEGORIES[0]);
  const [expand, setExpand] = useState(null);

  const updHero   = (k, v) => onChange({ ...data, technologies: { ...tech, hero: { ...hero, [k]: v } } });
  const updStacks = (newStacks) => onChange({ ...data, technologies: { ...tech, stacks: newStacks } });

  const stackIdx = stacks.findIndex((s) => s.name === activeSub);
  const stack    = stacks[stackIdx] ?? { name: activeSub, techs: [] };
  const techs    = stack.techs ?? [];

  const setTechs = (newTechs) => {
    const newStacks = [...stacks];
    if (stackIdx === -1) newStacks.push({ name: activeSub, techs: newTechs });
    else newStacks[stackIdx] = { ...stack, techs: newTechs };
    updStacks(newStacks);
    if (expand >= newTechs.length) setExpand(null);
  };

  const subTabClass = { Frontend: "admin-tech-tab-frontend", Backend: "admin-tech-tab-backend", "DevOps & Cloud": "admin-tech-tab-devops" };

  return (
    <>
      <Card>
        <SectionTitle>Technologies Hero</SectionTitle>
        <Field label="Heading" value={hero.heading} onChange={(v) => updHero("heading", v)} />
        <Field label="Subtext" value={hero.subtext} onChange={(v) => updHero("subtext", v)} multiline rows={3} />
      </Card>

      <Card className="admin-card-mt">
        <SectionTitle
          action={<Btn variant="primary" size="sm" onClick={() => { const def = { name: "New Tech", color: "#6366f1", desc: "" }; const nt = [...techs, def]; setTechs(nt); setExpand(nt.length - 1); }}>+ Add</Btn>}
        >Technology Stacks</SectionTitle>

        <div className="admin-tech-tabs">
          {TECH_CATEGORIES.map((sub) => (
            <button
              key={sub}
              onClick={() => { setActiveSub(sub); setExpand(null); }}
              className={`admin-tech-tab ${subTabClass[sub] ?? ""} ${activeSub === sub ? "active" : ""}`}
            >{sub}</button>
          ))}
        </div>
        <div className="admin-tech-count">{techs.length} technologies in <strong>{activeSub}</strong></div>

        {techs.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty-title">No technologies in {activeSub}</div>
            <div className="admin-empty-sub">Click + Add above to add one</div>
          </div>
        )}

        {techs.map((t, i) => (
          <CollapseItem
            key={i}
            isOpen={expand === i}
            onToggle={() => setExpand(expand === i ? null : i)}
            onDelete={() => setTechs(techs.filter((_, j) => j !== i))}
            header={
              <>
                <div className="admin-collapse-dot" style={{ background: t.color ?? "#6366f1" }} />
                <div className="admin-collapse-info"><div className="admin-collapse-name">{t.name || "Unnamed"}</div></div>
              </>
            }
          >
            <div className="admin-grid-2">
              <Field label="Technology Name" value={t.name} onChange={(v) => { const a = [...techs]; a[i] = { ...a[i], name: v }; setTechs(a); }} />
              <div className="admin-field">
                <label className="admin-label">Dot Colour</label>
                <div className="admin-color-row">
                  <input type="color" className="admin-color-swatch" value={t.color ?? "#6366f1"}
                    onChange={(e) => { const a = [...techs]; a[i] = { ...a[i], color: e.target.value }; setTechs(a); }} />
                  <input className="admin-input" value={t.color ?? ""} placeholder="#hex"
                    onChange={(e) => { const a = [...techs]; a[i] = { ...a[i], color: e.target.value }; setTechs(a); }} />
                </div>
              </div>
            </div>
            <Field label="Short Description" value={t.desc} onChange={(v) => { const a = [...techs]; a[i] = { ...a[i], desc: v }; setTechs(a); }} multiline rows={2} />
            <div className="admin-field">
              <label className="admin-label">Preview</label>
              <div className="admin-tech-preview">
                <span className="admin-tech-preview-dot" style={{ background: t.color ?? "#6366f1" }} />
                {t.name || "Technology Name"}
              </div>
            </div>
          </CollapseItem>
        ))}
      </Card>
    </>
  );
}

// FOOTER
function FooterEditor({ data, onChange }) {
  const ft = data?.footer ?? {};
  return (
    <Card>
      <SectionTitle>Footer</SectionTitle>
      <Field label="Description"    value={ft.desc}      onChange={(v) => onChange({ ...data, footer: { ...ft, desc: v } })} multiline rows={3} />
      <Field label="Copyright Text" value={ft.copyright} onChange={(v) => onChange({ ...data, footer: { ...ft, copyright: v } })} />
    </Card>
  );
}

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS = [
  { id: "hero",         label: "Hero",             icon: "🏠", group: "HOME" },
  { id: "trust",        label: "Trust Bar",        icon: "🤝", group: "HOME" },
  { id: "offer",        label: "What We Offer",    icon: "📦", group: "HOME" },
  { id: "engagement",   label: "Engagement Models",icon: "🔄", group: "HOME" },
  { id: "startup",      label: "Startup Section",  icon: "🚀", group: "HOME" },
  { id: "homeHow",      label: "How It Works",     icon: "⚙️", group: "HOME" },
  { id: "why",          label: "Why Us",           icon: "✅", group: "HOME" },
  { id: "cta",          label: "CTA Band",         icon: "📣", group: "HOME" },
  { id: "testimonials", label: "Testimonials",     icon: "💬", group: "HOME" },
  { id: "developers",   label: "Developers",       icon: "👥", group: "PAGES" },
  { id: "pricing",      label: "Pricing",          icon: "💰", group: "PAGES" },
  { id: "about",        label: "About",            icon: "ℹ️",  group: "PAGES" },
  { id: "contact",      label: "Contact",          icon: "📩", group: "PAGES" },
  { id: "technologies", label: "Technologies",     icon: "⚙️", group: "PAGES" },
  { id: "howItWorks",   label: "How It Works Page",icon: "❓", group: "PAGES" },
  { id: "footer",       label: "Footer",           icon: "📋", group: "PAGES" },
];

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard({ onLogout }) {
  const [tab,        setTab]        = useState("hero");
  const [data,       setDataState]  = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [saved,      setSaved]      = useState(false);
  const [sideOpen,   setSideOpen]   = useState(false);
  const [saveError,  setSaveError]  = useState("");

  // Load data from localStorage / defaults on mount
  useEffect(() => {
    let cancelled = false;
    getData().then((d) => {
      if (!cancelled) { setDataState(d); setLoading(false); }
    }).catch(() => {
      if (!cancelled) { setDataState(JSON.parse(JSON.stringify(DEFAULT_DATA))); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);

  const save = async () => {
    setSaveError("");
    try {
      await setData(data);
      // Dispatch so any open public-facing tab also updates
      window.dispatchEvent(new CustomEvent("hr_data_updated", { detail: data }));
      setSaved(true);
    } catch (e) {
      setSaveError("Save failed: " + (e?.message ?? "unknown error"));
    }
  };

  const reset = async () => {
    if (!window.confirm("Reset ALL content to defaults? This cannot be undone.")) return;
    const defaults = await resetData();
    setDataState(defaults);
    setSaved(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hr_admin_auth");
    onLogout();
  };

  if (loading || !data) {
    return (
      <div className="admin-loading-wrap">
        <div className="admin-loading-spinner" />
        <span className="admin-loading-label">Loading dashboard…</span>
        <style>{`@keyframes adminSpin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const renderPanel = () => {
    switch (tab) {
      case "hero":         return <HeroEditor         data={data} onChange={setDataState} />;
      case "trust":        return <TrustEditor        data={data} onChange={setDataState} />;
      case "offer":        return <OfferEditor        data={data} onChange={setDataState} />;
      case "engagement":   return <EngagementEditor   data={data} onChange={setDataState} />;
      case "startup":      return <StartupEditor      data={data} onChange={setDataState} />;
      case "homeHow":      return <HomeHowEditor      data={data} onChange={setDataState} />;
      case "why":          return <WhyEditor          data={data} onChange={setDataState} />;
      case "cta":          return <CTAEditor          data={data} onChange={setDataState} />;
      case "testimonials": return <TestimonialsEditor data={data} onChange={setDataState} />;
      case "developers":   return <DevelopersEditor   data={data} onChange={setDataState} />;
      case "pricing":      return <PricingEditor      data={data} onChange={setDataState} />;
      case "about":        return <AboutEditor        data={data} onChange={setDataState} />;
      case "contact":      return <ContactEditor      data={data} onChange={setDataState} />;
      case "technologies": return <TechnologiesEditor data={data} onChange={setDataState} />;
      case "howItWorks":   return <HowItWorksEditor   data={data} onChange={setDataState} />;
      case "footer":       return <FooterEditor       data={data} onChange={setDataState} />;
      default:             return null;
    }
  };

  const currentTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="admin-page">

      {/* ── Top Bar ── */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <button className="admin-hamburger" onClick={() => setSideOpen((v) => !v)} aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="admin-topbar-logo">
            <img src={logo} alt="HourlyRecruit" />
            <span className="admin-portal-label">Admin Portal</span>
          </div>
        </div>

        <div className="admin-topbar-actions">
          <Btn variant="ghost" size="sm" onClick={reset}>Reset Defaults</Btn>
          <Btn variant="success" size="sm" onClick={save}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:14, height:14 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Save Changes
          </Btn>
          <button className="admin-logout-btn" onClick={handleLogout} title="Logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      <div className="admin-body">

        {/* Backdrop */}
        <div
          className={`admin-sidebar-backdrop${sideOpen ? " open" : ""}`}
          onClick={() => setSideOpen(false)}
        />

        {/* ── Sidebar ── */}
        <aside className={`admin-sidebar${sideOpen ? " mobile-open" : ""}`}>
          <div className="admin-sidebar-inner">
            {["HOME", "PAGES"].map((group) => (
              <div key={group}>
                <div className="admin-group-label">{group}</div>
                {TABS.filter((t) => t.group === group).map((t) => (
                  <button
                    key={t.id}
                    className={`admin-nav-btn${tab === t.id ? " active" : ""}`}
                    onClick={() => { setTab(t.id); setSideOpen(false); }}
                  >
                    <span className="admin-nav-icon">{t.icon}</span>
                    {t.label}
                    {tab === t.id && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="admin-nav-chevron">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="admin-tip-wrap">
            <div className="admin-tip-card">
              <div className="admin-tip-title">💾 Auto-Save Tip</div>
              <div className="admin-tip-body">
                Changes are saved to localStorage and persist after hard refresh. Click <strong>Save Changes</strong> to publish live.
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Panel ── */}
        <main className="admin-main">
          <div className="admin-panel-heading">
            <div className="admin-panel-title-row">
              <span className="admin-panel-icon">{currentTab.icon}</span>
              <h2 className="admin-panel-title">{currentTab.label}</h2>
            </div>
            <p className="admin-panel-desc">
              Edit content below — click <strong>Save Changes</strong> to persist data and update the live site.
            </p>
          </div>

          {renderPanel()}

          {saveError && (
            <div className="admin-save-error">{saveError}</div>
          )}

          <div className="admin-panel-footer">
            <Btn variant="success" onClick={save}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:14, height:14 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save Changes
            </Btn>
            <Btn variant="ghost" onClick={() => getData().then(setDataState)}>Discard</Btn>
          </div>
        </main>
      </div>

      {saved && <Toast msg="Changes saved! Reload the site to see updates." onClose={() => setSaved(false)} />}

      <style>{`
        @keyframes adminToastIn {
          from { opacity:0; transform:translateY(16px) scale(.95); }
          to   { opacity:1; transform:translateY(0)    scale(1);   }
        }
        @keyframes adminSpin { to { transform:rotate(360deg); } }
        .admin-card-mt { margin-top: 22px; }
        .admin-save-error {
          margin-top: 12px;
          background: rgba(239,68,68,.12);
          border: 1px solid rgba(239,68,68,.3);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}