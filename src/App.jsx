/**
 * App.jsx — HourlyRecruit root component
 * PRODUCTION VERSION
 *
 * Uses subscribeToData() (Firestore onSnapshot) instead of getData().
 * This means:
 *   ✅ On every hard refresh  → reads latest data from Firestore immediately
 *   ✅ On admin save          → all open browser sessions update automatically
 *   ✅ On network error       → falls back to localStorage silently
 *   ✅ No Spring Boot / Java backend — Firebase only
 */

import { useState, useEffect } from "react";
import Home           from "./pages/Home";
import HireDevelopers from "./pages/Hiredevelopers";
import Technologies   from "./pages/Technologies";
import HowItWorks     from "./pages/Howitworks";
import Contact        from "./pages/Contact";
import About          from "./pages/About";
import Navbar         from "./components/NavBar";
import Footer         from "./components/Footer";
import AdminLogin     from "./pages/Adminloogin";
import AdminDashboard from "./pages/Admindashboard";
import { subscribeToData } from "./api/Datastore";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [adminAuthed, setAdminAuthed] = useState(
    () => sessionStorage.getItem("hr_admin_auth") === "1"
  );

  const [siteData,    setSiteData]    = useState(null);
  const [siteLoading, setSiteLoading] = useState(true);

  // ── Real-time Firestore subscription ─────────────────────────────────────
  //
  // subscribeToData fires:
  //   1. Immediately on mount — loads latest Firestore data (handles hard refresh)
  //   2. Again whenever the admin saves — updates all open sessions live
  //
  // The returned `unsubscribe` function stops the listener when the app unmounts.
  // This is the correct production pattern for Firestore real-time updates.
  //
  useEffect(() => {
    const unsubscribe = subscribeToData((data) => {
      setSiteData(data);
      setSiteLoading(false);
    });

    // Cleanup: detach the Firestore listener when component unmounts
    return () => unsubscribe();
  }, []); // ← empty deps: subscribe once, stays active for the app lifetime

  // ── Navigation ────────────────────────────────────────────────────────────
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setAdminAuthed(false);
    sessionStorage.removeItem("hr_admin_auth");
  };

  // ── Admin flow ────────────────────────────────────────────────────────────
  if (currentPage === "admin-login") {
    if (adminAuthed) {
      return (
        <AdminDashboard
          onLogout={() => {
            handleLogout();
            navigate("admin-login");
          }}
        />
      );
    }
    return (
      <AdminLogin
        onLogin={() => setAdminAuthed(true)}
      />
    );
  }

  if (currentPage === "admin") {
    if (adminAuthed) {
      return (
        <AdminDashboard
          onLogout={() => {
            handleLogout();
            navigate("home");
          }}
        />
      );
    }
    navigate("admin-login");
    return null;
  }

  // ── Public site ───────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (currentPage) {
      case "home":         return <Home           navigate={navigate} siteData={siteData} />;
      case "about":        return <About          navigate={navigate} siteData={siteData} />;
      case "hire":         return <HireDevelopers navigate={navigate} siteData={siteData} />;
      case "technologies": return <Technologies   navigate={navigate} siteData={siteData} />;
      case "how":          return <HowItWorks     navigate={navigate} siteData={siteData} />;
      case "contact":      return <Contact        navigate={navigate} siteData={siteData} />;
      default:             return <Home           navigate={navigate} siteData={siteData} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>
        {siteLoading ? (
          <div style={loadingStyles.wrap}>
            <div style={loadingStyles.spinner} />
          </div>
        ) : (
          renderPage()
        )}
      </main>
      <Footer navigate={navigate} siteData={siteData} />
    </div>
  );
}

// ── Loading spinner styles (used while first Firestore read completes) ────────
const loadingStyles = {
  wrap: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid var(--gray-100, #e8eef8)",
    borderTopColor: "var(--blue, #1a56db)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
