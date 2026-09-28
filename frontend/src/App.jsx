import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Companies from "./pages/Companies";
import Analytics from "./pages/Analytics";
import "./App.css";

const pages = { dashboard: Dashboard, students: Students, companies: Companies, analytics: Analytics };

function getPage() {
  const key = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return pages[key] ? key : "dashboard";
}

export default function App() {
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const handleHash = () => setPage(getPage());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  function navigate(target) {
    if (window.location.hash === `#${target}`) setPage(target);
    else window.location.hash = target;
  }

  const Page = pages[page];
  return <div className="app-frame">
    <Navbar page={page} onNavigate={navigate} />
    <main className="main-content" id="main-content"><Page /></main>
    <footer className="app-footer"><span>Placement Analytics</span><span>College placement insights</span></footer>
  </div>;
}
