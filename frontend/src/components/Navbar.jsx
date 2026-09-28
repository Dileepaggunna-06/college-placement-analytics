import { useState } from "react";

const links = [
  ["dashboard", "Dashboard"],
  ["students", "Students"],
  ["companies", "Companies"],
  ["analytics", "Analytics"],
];

export default function Navbar({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (target) => { onNavigate(target); setMenuOpen(false); };
  return <header className="navbar">
    <a className="app-brand" href="#dashboard" onClick={(event) => { event.preventDefault(); navigate("dashboard"); }}>
      <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
      <span>Placement <b>Analytics</b></span>
    </a>
    <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
    <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
      {links.map(([target, label]) => <a href={`#${target}`} key={target} className={page === target ? "active" : ""} aria-current={page === target ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigate(target); }}>{label}</a>)}
    </nav>
    <div className="profile-area">
      <div className="profile-avatar" aria-hidden="true">AD</div>
      <div className="profile-copy"><strong>Admin</strong><span>Placement office</span></div>
      <button className="logout-button" type="button" disabled title="Authentication is not enabled">Log out</button>
    </div>
  </header>;
}
