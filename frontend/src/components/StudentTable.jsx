import { useMemo, useState } from "react";

export default function StudentTable({ students }) {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState("name");
  const [direction, setDirection] = useState("asc");

  const branches = [...new Set(students.map((student) => student.branch).filter(Boolean))].sort();
  const companies = [...new Set(students.map((student) => student.company).filter(Boolean))].sort();
  const visibleStudents = useMemo(() => students
    .filter((student) => String(student.name || "").toLowerCase().includes(search.toLowerCase()))
    .filter((student) => branch === "all" || student.branch === branch)
    .filter((student) => company === "all" || student.company === company)
    .slice()
    .sort((a, b) => {
      const result = ["cgpa", "package_lpa"].includes(sort)
        ? Number(a[sort]) - Number(b[sort])
        : String(a.name || "").localeCompare(String(b.name || ""));
      return direction === "asc" ? result : -result;
    }), [students, search, branch, company, sort, direction]);

  function changeSort(value) {
    if (sort === value) setDirection(direction === "asc" ? "desc" : "asc");
    else { setSort(value); setDirection("desc"); }
  }

  return <section className="panel students-panel">
    <div className="panel-heading table-heading"><div><p className="panel-kicker">STUDENT DIRECTORY</p><h2>Placement records</h2></div><span className="record-count">{visibleStudents.length} students</span></div>
    <div className="table-controls">
      <label className="search-field"><span className="sr-only">Search students by name</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/></svg><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" /></label>
      <label className="select-field"><span className="sr-only">Filter by branch</span><select value={branch} onChange={(event) => setBranch(event.target.value)}><option value="all">All branches</option>{branches.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="select-field"><span className="sr-only">Filter by company</span><select value={company} onChange={(event) => setCompany(event.target.value)}><option value="all">All companies</option>{companies.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="select-field"><span className="sr-only">Sort students</span><select value={sort} onChange={(event) => { setSort(event.target.value); setDirection(event.target.value === "name" ? "asc" : "desc"); }}><option value="name">Sort: Name</option><option value="cgpa">Sort: CGPA</option><option value="package_lpa">Sort: Package</option></select></label>
      {(sort === "cgpa" || sort === "package_lpa") && <button className="sort-direction" onClick={() => setDirection(direction === "asc" ? "desc" : "asc")} aria-label={`Sort ${direction === "asc" ? "descending" : "ascending"}`}>{direction === "asc" ? "↑" : "↓"}</button>}
    </div>
    <div className="table-scroll"><table>
      <thead><tr><th>Student ID</th><th>Name</th><th>Branch</th><th><button className="sort-heading" onClick={() => changeSort("cgpa")}>CGPA {sort === "cgpa" ? (direction === "asc" ? "↑" : "↓") : "↕"}</button></th><th>Company</th><th><button className="sort-heading" onClick={() => changeSort("package_lpa")}>Package LPA {sort === "package_lpa" ? (direction === "asc" ? "↑" : "↓") : "↕"}</button></th><th>Year</th></tr></thead>
      <tbody>{visibleStudents.map((student, index) => <tr key={student.student_id ?? `${student.name}-${index}`}><td className="student-id">{student.student_id ?? "—"}</td><td className="student-name">{student.name ?? "—"}</td><td><span className="branch-tag">{student.branch ?? "—"}</span></td><td>{student.cgpa ?? "—"}</td><td>{student.company ?? "—"}</td><td className="package-cell">{student.package_lpa ?? "—"}</td><td>{student.year ?? "—"}</td></tr>)}</tbody>
    </table>{visibleStudents.length === 0 && <div className="table-empty">No students match these filters.</div>}</div>
  </section>;
}
