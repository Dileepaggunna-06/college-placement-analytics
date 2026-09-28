const icons = {
  students: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.2a5.5 5.5 0 0 1 11 0V19zM16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V19" /></>,
  companies: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-3h4v3" /></>,
  average: <><path d="M4 17 9 12l4 3 7-8" /><path d="M15 7h5v5" /></>,
  highest: <><path d="M12 3v18M5 10l7-7 7 7" /><path d="M5 21h14" /></>,
  lowest: <><path d="M12 3v18M5 14l7 7 7-7" /><path d="M5 3h14" /></>,
  cgpa: <><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" /></>,
};

export default function SummaryCard({ label, value, suffix = "", icon, tone = "blue" }) {
  return <article className={`summary-card tone-${tone}`}>
    <div className="summary-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[icon]}</svg></div>
    <p className="summary-label">{label}</p>
    <p className="summary-value">{value ?? "—"}<span>{suffix}</span></p>
  </article>;
}
