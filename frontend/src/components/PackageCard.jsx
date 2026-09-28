export default function PackageCard({ title, student, tone }) {
  return <article className={`panel package-card ${tone}`}>
    <div className="package-heading"><span className="package-symbol">{tone === "gold" ? "↗" : tone === "rose" ? "↘" : "★"}</span><span>{title}</span></div>
    {student ? <>
      <h3>{student.name || "Student"}</h3>
      <p className="package-company">{student.company || "Company not listed"} <span>·</span> {student.branch || "Branch not listed"}</p>
      <div className="package-stats">
        <div><span>{title === "Highest CGPA" ? "CGPA" : "Package"}</span><strong>{title === "Highest CGPA" ? student.cgpa : `${student.package_lpa} LPA`}</strong></div>
        <div><span>{title === "Highest CGPA" ? "Package" : "CGPA"}</span><strong>{title === "Highest CGPA" ? `${student.package_lpa} LPA` : student.cgpa}</strong></div>
      </div>
    </> : <div className="package-placeholder">No student information available.</div>}
  </article>;
}
