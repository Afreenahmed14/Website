/**
 * Datastore.js — Firebase Firestore data layer for HourlyRecruit
 * PRODUCTION VERSION
 *
 * How it works:
 *   - subscribeToData()  →  used by App.jsx (public site)
 *                           Uses Firestore onSnapshot (real-time listener).
 *                           Fires immediately on page load with current data.
 *                           Fires again automatically whenever the admin saves
 *                           any change — NO page refresh needed on any device.
 *
 *   - getData()          →  used by AdminDashboard (one-time read on open).
 *
 *   - setData()          →  used by AdminDashboard Save button.
 *                           Writes to Firestore → onSnapshot fires everywhere.
 *
 * Fallback chain (if Firestore unreachable):
 *   localStorage → DEFAULT_DATA
 */

import { db } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

// ── Firestore location ────────────────────────────────────────────────────────
const FS_COL      = "website";
const FS_DOC      = "content";
const STORAGE_KEY = "hr_site_data_v2";
const CACHE_TTL   = 5 * 60 * 1000; // 5 min — only used by getData()

let _cache     = null;
let _cacheTime = 0;

// ── Default / fallback data ───────────────────────────────────────────────────
export const DEFAULT_DATA = {
  home: {
    hero: {
      badge:    "Hire Developers On Hourly Basis",
      heading1: "Hire Skilled Developers on",
      heading2: "Hourly Basis",
      subtext:
        "Scale your projects faster with experienced developers available on flexible hourly engagement models. No long-term contracts, no risk.",
      checks: [
        "Flexible Hiring",
        "No Long-Term Contracts",
        "Quick Onboarding",
        "Pay Only for Productive Hours",
      ],
      cardStats: [
        { value: "98%",  label: "Success Rate" },
        { value: "4.9★", label: "Avg Rating"   },
        { value: "24h",  label: "Onboarding"   },
      ],
      floatStats: [
        { value: "500+", label: "Developers Ready to hire"   },
        { value: "200+", label: "Projects Delivered on time" },
      ],
    },
    trust: {
      label: "Trusted by Startups, Agencies & Businesses Worldwide",
      logos: ["Google", "Microsoft", "airbnb", "Uber", "PayPal", "shopify"],
    },
    offer: {
      label:   "What We Offer",
      heading: "Hire Developers On Demand",
      sub:     "Choose from a wide range of skilled developers and tech specialists.",
      items: [
        "Frontend Developers",
        "Backend Developers",
        "Full Stack Developers",
        "Mobile App Developers",
        "UI/UX Designers",
        "DevOps Engineers",
        "QA / Test Engineers",
        "AI & Automation Developers",
        "Python Developers",
        "Node.js Developers",
      ],
    },
    engagement: {
      label:   "Engagement Models",
      heading: "Flexible Hiring Models for Every Need",
      sub:     "Choose the engagement model that best fits your project requirements and budget.",
      models: [
        {
          title:    "Hourly Hiring",
          desc:     "Hire developers based on the exact number of hours you need. Perfect for short-term projects.",
          perks:    ["Startup MVPs", "Bug Fixes", "Feature Development", "Ongoing Support", "Technical Consultation"],
          featured: false,
        },
        {
          title:    "Dedicated Developers",
          desc:     "Get full-time dedicated resources working exclusively on your project with full transparency.",
          perks:    ["Faster delivery", "Better collaboration", "Flexible scaling", "Transparent communication"],
          featured: true,
        },
        {
          title:    "Project-Based Teams",
          desc:     "Build complete teams for web, mobile, SaaS, or enterprise applications end-to-end.",
          perks:    ["Developers", "UI/UX Designers", "QA Engineers", "Project Coordinators"],
          featured: false,
        },
      ],
    },
    startup: {
      tag:     "For Startups",
      heading: "Build Your MVP Faster",
      desc:    "We help startups go from idea to product with the right tech talent. Agile, affordable, and reliable.",
      checks: [
        "Build MVPs",
        "Develop SaaS products",
        "Create mobile apps",
        "Maintain existing products",
        "Add new features faster",
      ],
      card: {
        heading: "Launch Ready",
        desc:    "From concept to deployment in weeks, not months.",
        stats: [
          { value: "3x",   label: "Faster Launch" },
          { value: "60%",  label: "Cost Savings"  },
          { value: "50+",  label: "MVPs Built"    },
          { value: "100%", label: "On-Time Rate"  },
        ],
      },
    },
    how: {
      label:   "How It Works",
      heading: "Hire Exceptional Talent in Four Simple Steps",
      sub:     "Our streamlined hiring process helps businesses connect with skilled developers quickly, ensuring faster onboarding and successful project delivery.",
      steps: [
        { n: "01", title: "Share Your Requirements",  desc: "Tell us about your project goals, technical requirements, preferred technologies, and team size." },
        { n: "02", title: "Review Top Candidates",    desc: "We shortlist and present highly qualified professionals who match your business needs." },
        { n: "03", title: "Interview & Select",       desc: "Evaluate candidates through interviews and technical assessments to choose the right talent." },
        { n: "04", title: "Onboard & Start Building", desc: "Quickly onboard your selected professionals and begin delivering projects with confidence." },
      ],
    },
    why: {
      label:   "Why Choose Us",
      heading: "Why Businesses Trust Hourly Recruit",
      cards: [
        { title: "Pre-Screened Talent",      desc: "Access a pool of highly skilled and thoroughly vetted professionals ready to contribute from day one." },
        { title: "Flexible Hiring Models",   desc: "Choose hourly, part-time, full-time, or project-based engagement models tailored to your needs." },
        { title: "Fast Onboarding",          desc: "Reduce recruitment time and onboard qualified professionals quickly to keep projects moving." },
        { title: "Cost-Effective Solutions", desc: "Optimize your hiring budget while gaining access to top-tier talent without long-term commitments." },
        { title: "Dedicated Support",        desc: "Our team works closely with you throughout the hiring process to ensure a seamless experience." },
        { title: "Proven Success",           desc: "Trusted by startups and enterprises alike to deliver exceptional talent and successful outcomes." },
      ],
    },
    cta: {
      label:   "Get Started Today",
      heading: "Ready to Hire Top Talent for Your Next Project?",
      sub:     "Connect with experienced developers and technology professionals who can help accelerate your business growth.",
    },
    testimonials: [
      {
        initials: "AT",
        name:     "Alex Thompson",
        role:     "CTO, InnovateX",
        color:    "linear-gradient(135deg,#1a56db,#3b82f6)",
        quote:    "HourlyRecruit helped us quickly onboard frontend and backend developers for our SaaS product. The process was smooth, flexible and highly professional.",
      },
      {
        initials: "PS",
        name:     "Priya Sharma",
        role:     "Founder, HealthTrack",
        color:    "linear-gradient(135deg,#ec4899,#f43f5e)",
        quote:    "We were able to launch our MVP faster using their hourly developer model. Great communication and high-quality work delivered on time every single sprint.",
      },
      {
        initials: "RM",
        name:     "Rahul Mehta",
        role:     "Founder, SaaSFlow",
        color:    "linear-gradient(135deg,#06b6d4,#0891b2)",
        quote:    "HourlyRecruit helped us hire experienced developers within days. Their flexible engagement model allowed us to scale quickly without long-term hiring commitments.",
      },
    ],
  },

  about: {
    hero: {
      heading: "Bridging the Gap Between Talent and Opportunity",
      subtext:  "HourlyRecruit was built to solve the complexity of tech hiring. We connect businesses with pre-vetted developers across every major technology stack.",
    },
    stats: [
      { value: "500+", label: "Expert Developers"   },
      { value: "200+", label: "Projects Delivered"  },
      { value: "98%",  label: "Client Satisfaction" },
      { value: "48h",  label: "Average Onboarding"  },
    ],
    content: {
      mission: "Our mission is to make world-class technical talent accessible to every business — from seed-stage startups to enterprise companies.",
    },
  },

  technologies: {
    hero: {
      heading: "Modern Technologies. Expert Developers.",
      subtext:  "Our developers bring deep expertise across the full technology spectrum — from modern frontend frameworks to cloud infrastructure and AI.",
    },
    stacks: [
      {
        category: "Frontend",
        icon: "🖥️",
        techs: [
          { name: "React",      level: "Expert",        devs: 85 },
          { name: "Next.js",    level: "Expert",        devs: 62 },
          { name: "Vue.js",     level: "Expert",        devs: 48 },
          { name: "Angular",    level: "Advanced",      devs: 41 },
          { name: "TypeScript", level: "Expert",        devs: 74 },
          { name: "Tailwind",   level: "Expert",        devs: 69 },
        ],
      },
      {
        category: "Backend",
        icon: "⚙️",
        techs: [
          { name: "Node.js",    level: "Expert",        devs: 78 },
          { name: "Python",     level: "Expert",        devs: 91 },
          { name: "Django",     level: "Advanced",      devs: 54 },
          { name: "FastAPI",    level: "Advanced",      devs: 43 },
          { name: "Java",       level: "Expert",        devs: 47 },
          { name: "Go",         level: "Advanced",      devs: 31 },
        ],
      },
      {
        category: "Mobile",
        icon: "📱",
        techs: [
          { name: "React Native", level: "Expert",      devs: 56 },
          { name: "Flutter",      level: "Expert",      devs: 49 },
          { name: "Swift",        level: "Advanced",    devs: 28 },
          { name: "Kotlin",       level: "Advanced",    devs: 32 },
          { name: "Expo",         level: "Expert",      devs: 41 },
          { name: "Ionic",        level: "Intermediate",devs: 22 },
        ],
      },
      {
        category: "Database",
        icon: "🗄️",
        techs: [
          { name: "PostgreSQL",  level: "Expert",       devs: 67 },
          { name: "MongoDB",     level: "Expert",       devs: 73 },
          { name: "MySQL",       level: "Expert",       devs: 65 },
          { name: "Redis",       level: "Advanced",     devs: 44 },
          { name: "Firebase",    level: "Expert",       devs: 58 },
          { name: "Supabase",    level: "Advanced",     devs: 37 },
        ],
      },
      {
        category: "DevOps & Cloud",
        icon: "☁️",
        techs: [
          { name: "AWS",         level: "Expert",       devs: 61 },
          { name: "Docker",      level: "Expert",       devs: 69 },
          { name: "Kubernetes",  level: "Advanced",     devs: 38 },
          { name: "GCP",         level: "Advanced",     devs: 34 },
          { name: "CI/CD",       level: "Expert",       devs: 52 },
          { name: "Terraform",   level: "Advanced",     devs: 27 },
        ],
      },
      {
        category: "AI & ML",
        icon: "🤖",
        techs: [
          { name: "TensorFlow",  level: "Advanced",     devs: 29 },
          { name: "PyTorch",     level: "Advanced",     devs: 26 },
          { name: "OpenAI API",  level: "Expert",       devs: 47 },
          { name: "LangChain",   level: "Advanced",     devs: 33 },
          { name: "Scikit-learn",level: "Expert",       devs: 41 },
          { name: "Hugging Face",level: "Advanced",     devs: 24 },
        ],
      },
    ],
  },

  howItWorks: {
    hero: {
      heading: "From Brief to Build in 4 Simple Steps",
      subtext:  "A streamlined hiring process designed to get your project moving in days, not months.",
    },
    steps: [
      { n: "01", title: "Share Your Requirements",  desc: "Tell us about your project goals, technical requirements, preferred technologies, and team size." },
      { n: "02", title: "Get Matched in 24 Hours",  desc: "We handpick developers from our pre-vetted talent pool who match your exact requirements — skills, timezone, and availability." },
      { n: "03", title: "Interview & Select",        desc: "Meet your matched candidates via a live technical interview. You stay in full control — hire only who you're confident in." },
      { n: "04", title: "Onboard & Start Building", desc: "Once you've chosen your developer, they're ready to join your team within 48 hours. No long procurement cycles." },
    ],
    faqs: [
      { q: "How quickly can I hire a developer?",       a: "In most cases, you can have a developer ready to start within 48 hours of sharing your requirements." },
      { q: "What if I'm not happy with the developer?", a: "We offer a 7-day replacement guarantee. If you're not satisfied, we'll find you a better match at no extra cost." },
      { q: "How does billing work?",                    a: "Billing is weekly, based on hours logged. You'll receive transparent timesheets every week." },
      { q: "Can I scale my team up or down?",           a: "Yes, you can add or remove developers at any time with just 1 week's notice." },
    ],
  },

  contact: {
    hero: {
      heading: "Have a Project in Mind?",
      subtext:  "Let's discuss how we can help you build and scale your product with the right tech talent.",
    },
    info: {
      phone:    "+91 888 444 6677",
      email:    "hr@hourlyrecruit.com",
      location: "Bangalore, Karnataka, India",
      website:  "www.hourlyrecruit.com",
    },
    nextSteps: [
      "We review your requirements within 2 hours",
      "A team member schedules a quick 30-min call",
      "We share 3–5 matched developer profiles",
      "You interview and choose — hire in 48 hours",
    ],
  },

  // ── DEVELOPERS ──────────────────────────────────────────────────────────────
  developers: [
    {
      name:     "Arjun Mehta",
      initials: "AM",
      role:     "Senior Frontend Developer",
      category: "Frontend",
      color:    "#1a56db",
      skills:   ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      exp:      "6 Years",
      rating:   4.9,
      projects: "48",
      rate:     "$28/hr",
    },
    {
      name:     "Sneha Iyer",
      initials: "SI",
      role:     "Full Stack Developer",
      category: "Full Stack",
      color:    "#7c3aed",
      skills:   ["Node.js", "React", "MongoDB", "AWS"],
      exp:      "5 Years",
      rating:   4.8,
      projects: "41",
      rate:     "$32/hr",
    },
    {
      name:     "Rohan Kapoor",
      initials: "RK",
      role:     "Backend Engineer",
      category: "Backend",
      color:    "#0891b2",
      skills:   ["Python", "Django", "PostgreSQL", "Docker"],
      exp:      "7 Years",
      rating:   5.0,
      projects: "63",
      rate:     "$35/hr",
    },
    {
      name:     "Priya Nair",
      initials: "PN",
      role:     "Mobile App Developer",
      category: "Mobile",
      color:    "#dc2626",
      skills:   ["React Native", "Flutter", "Firebase", "Expo"],
      exp:      "4 Years",
      rating:   4.7,
      projects: "29",
      rate:     "$26/hr",
    },
    {
      name:     "Karan Desai",
      initials: "KD",
      role:     "DevOps Engineer",
      category: "DevOps",
      color:    "#059669",
      skills:   ["AWS", "Docker", "Kubernetes", "Terraform"],
      exp:      "6 Years",
      rating:   4.9,
      projects: "37",
      rate:     "$38/hr",
    },
    {
      name:     "Meera Rajput",
      initials: "MR",
      role:     "UI/UX Designer & Developer",
      category: "Design",
      color:    "#d97706",
      skills:   ["Figma", "React", "CSS", "Framer Motion"],
      exp:      "5 Years",
      rating:   4.8,
      projects: "44",
      rate:     "$24/hr",
    },
    {
      name:     "Vikram Singh",
      initials: "VS",
      role:     "Senior Backend Developer",
      category: "Backend",
      color:    "#0f766e",
      skills:   ["Go", "Microservices", "Redis", "Kafka"],
      exp:      "8 Years",
      rating:   5.0,
      projects: "71",
      rate:     "$42/hr",
    },
    {
      name:     "Divya Sharma",
      initials: "DS",
      role:     "React & Vue Developer",
      category: "Frontend",
      color:    "#be185d",
      skills:   ["Vue.js", "React", "GraphQL", "TypeScript"],
      exp:      "4 Years",
      rating:   4.7,
      projects: "33",
      rate:     "$25/hr",
    },
    {
      name:     "Aakash Patel",
      initials: "AP",
      role:     "Full Stack Engineer",
      category: "Full Stack",
      color:    "#1d4ed8",
      skills:   ["Next.js", "FastAPI", "PostgreSQL", "GCP"],
      exp:      "5 Years",
      rating:   4.9,
      projects: "52",
      rate:     "$34/hr",
    },
  ],

  // ── PRICING ─────────────────────────────────────────────────────────────────
  pricing: [
    {
      name:    "Starter",
      amount:  "$15",
      period:  "/hr",
      subtext: "Minimum 20 hrs/month · Billed weekly",
      popular: false,
      features: [
        "1 dedicated developer",
        "Flexible hourly engagement",
        "Daily progress updates",
        "Slack / Email communication",
        "Weekly timesheets",
        "7-day replacement guarantee",
      ],
    },
    {
      name:    "Growth",
      amount:  "$29",
      period:  "/hr",
      subtext: "Minimum 80 hrs/month · Billed weekly",
      popular: true,
      features: [
        "Up to 3 dedicated developers",
        "Priority developer matching",
        "Daily standups & reporting",
        "Dedicated account manager",
        "Code review & QA included",
        "7-day replacement guarantee",
        "Cancel anytime",
      ],
    },
    {
      name:    "Enterprise",
      amount:  "Custom",
      period:  "",
      subtext: "Full-team engagement · Custom SLA",
      popular: false,
      features: [
        "Unlimited developers",
        "Custom engagement model",
        "Dedicated project manager",
        "SLA-backed delivery",
        "On-site collaboration available",
        "White-label option",
        "Priority 24/7 support",
      ],
    },
  ],

  footer: {
    desc:      "Hire skilled developers on hourly basis and scale your projects faster without long-term commitments.",
    copyright: "© 2024 HourlyRecruit. All Rights Reserved.",
  },
};

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * deepMerge — fills any missing keys in `target` from `defaults`.
 * Arrays: kept as-is from target (not merged element-by-element).
 */
function deepMerge(target, defaults) {
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return target !== undefined ? target : defaults;
  }
  const result = { ...target };
  Object.keys(defaults).forEach((key) => {
    if (result[key] === undefined || result[key] === null) {
      result[key] = defaults[key];
    } else if (
      typeof defaults[key] === "object" &&
      !Array.isArray(defaults[key]) &&
      defaults[key] !== null
    ) {
      result[key] = deepMerge(result[key], defaults[key]);
    }
  });
  return result;
}

function saveToLocalStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("[Datastore] localStorage write failed:", e);
  }
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("[Datastore] localStorage read failed:", e);
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * subscribeToData(callback)
 *
 * REAL-TIME Firestore subscription.
 *
 * ✅ Fires immediately on page load with the latest Firestore data.
 * ✅ Fires again automatically every time the admin saves — zero refresh needed.
 * ✅ Works across ALL production users simultaneously (different browsers/tabs).
 * ✅ Falls back to localStorage → DEFAULT_DATA if Firestore is unreachable.
 * ✅ Persists to localStorage after every Firestore read (offline fallback).
 *
 * @param {function} callback  — receives the merged data object
 * @returns {function}         — call this to stop listening (useEffect cleanup)
 *
 * Usage in App.jsx:
 *   useEffect(() => {
 *     const unsub = subscribeToData((data) => setSiteData(data));
 *     return () => unsub();
 *   }, []);
 */
export function subscribeToData(callback) {
  const ref = doc(db, FS_COL, FS_DOC);

  const unsubscribe = onSnapshot(
    ref,
    // ── success handler (fires on load + on every admin save) ──
    (snap) => {
      let merged;

      if (snap.exists()) {
        // Merge Firestore data with DEFAULT_DATA to fill any missing keys
        merged = deepMerge(snap.data(), DEFAULT_DATA);
      } else {
        // Document doesn't exist yet — seed Firestore with defaults
        console.info("[Datastore] Firestore doc missing — seeding defaults.");
        const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
        setDoc(ref, defaults).catch((e) =>
          console.warn("[Datastore] Seed failed:", e)
        );
        merged = defaults;
      }

      // Keep in-memory cache current
      _cache     = merged;
      _cacheTime = Date.now();

      // Always save latest to localStorage as offline backup
      saveToLocalStorage(merged);

      // Notify any same-tab listeners (AdminDashboard preview, etc.)
      window.dispatchEvent(new CustomEvent("hr_data_updated", { detail: merged }));

      // Give the data to the subscriber (App.jsx → setSiteData)
      callback(merged);
    },

    // ── error handler (network error, rules denied, etc.) ──
    (error) => {
      console.warn("[Datastore] Firestore listener error, falling back:", error.message);

      // Try localStorage first
      const local = loadFromLocalStorage();
      if (local) {
        callback(deepMerge(local, DEFAULT_DATA));
        return;
      }

      // Final fallback: DEFAULT_DATA
      callback(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    }
  );

  return unsubscribe;
}

/**
 * getData()
 *
 * One-time read (not real-time). Used only by AdminDashboard on mount.
 * Priority: in-memory cache (5 min TTL) → Firestore → localStorage → DEFAULT_DATA
 */
export async function getData() {
  const now = Date.now();

  // 1. In-memory cache
  if (_cache && now - _cacheTime < CACHE_TTL) return _cache;

  // 2. Firestore (one-time)
  try {
    const ref  = doc(db, FS_COL, FS_DOC);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const merged = deepMerge(snap.data(), DEFAULT_DATA);
      _cache = merged; _cacheTime = now;
      saveToLocalStorage(merged);
      return merged;
    }

    // Seed if doc missing
    console.info("[Datastore] Seeding Firestore with DEFAULT_DATA.");
    const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
    await setDoc(doc(db, FS_COL, FS_DOC), defaults);
    _cache = defaults; _cacheTime = now;
    saveToLocalStorage(defaults);
    return defaults;

  } catch (err) {
    console.warn("[Datastore] Firestore read failed:", err.message);
  }

  // 3. localStorage
  const local = loadFromLocalStorage();
  if (local) {
    const merged = deepMerge(local, DEFAULT_DATA);
    _cache = merged; _cacheTime = now;
    return merged;
  }

  // 4. Hardcoded defaults
  const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
  _cache = defaults; _cacheTime = now;
  return defaults;
}

/**
 * setData(data)
 *
 * Called by AdminDashboard when the admin clicks "Save Changes".
 * Writes to Firestore → the onSnapshot listener fires on ALL open
 * browser sessions automatically — public site updates instantly.
 */
export async function setData(data) {
  const ref = doc(db, FS_COL, FS_DOC);
  await setDoc(ref, data);          // ← this triggers onSnapshot everywhere

  _cache     = data;
  _cacheTime = Date.now();
  saveToLocalStorage(data);

  // Same-tab instant update (AdminDashboard live preview)
  window.dispatchEvent(new CustomEvent("hr_data_updated", { detail: data }));
}

/**
 * resetData()
 * Resets all content to DEFAULT_DATA in Firestore + clears localStorage cache.
 */
export async function resetData() {
  const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
  await setDoc(doc(db, FS_COL, FS_DOC), defaults);

  _cache     = null;
  _cacheTime = 0;
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(new CustomEvent("hr_data_updated", { detail: defaults }));
  return defaults;
}

/**
 * invalidateCache()
 * Forces the next getData() call to re-fetch from Firestore.
 */
export function invalidateCache() {
  _cache     = null;
  _cacheTime = 0;
}

export default {
  getData,
  setData,
  resetData,
  invalidateCache,
  subscribeToData,
  DEFAULT_DATA,
};