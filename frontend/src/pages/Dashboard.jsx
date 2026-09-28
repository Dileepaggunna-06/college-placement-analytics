import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import PackageCard from "../components/PackageCard";
import ResourceState from "../components/ResourceState";

const summaries = [
  ["Total Students", "total_students", "students", "blue", ""],
  ["Total Companies", "total_companies", "companies", "violet", ""],
  ["Average Package", "average_package", "average", "teal", " LPA"],
  ["Highest Package", "highest_package", "highest", "gold", " LPA"],
  ["Lowest Package", "lowest_package", "lowest", "rose", " LPA"],
  ["Highest CGPA", "highest_cgpa", "cgpa", "green", ""],
];

export default function Dashboard() {
  const overview = useApi(api.getDashboard);
  const companies = useApi(api.getCompanySelections);
  const branches = useApi(api.getBranchSelections);
  const averageCompany = useApi(api.getAveragePackageByCompany);
  const averageBranch = useApi(api.getAveragePackageByBranch);
  const highPackage = useApi(api.getHighestPackage);
  const lowPackage = useApi(api.getLowestPackage);
  const highCgpa = useApi(api.getHighestCgpa);

  return <>
    <section className="page-intro"><div><p className="eyebrow">OVERVIEW</p><h1>Good morning, Admin</h1><p>Here’s how placements are shaping up across your campus.</p></div><span className="overview-badge"><span className="live-dot" /> Live data</span></section>
    <ResourceState loading={overview.loading} error={overview.error} empty={!overview.data}>
      {() => {
        const data = overview.data;
        if (!data) return null;
        return (
          <section className="summary-grid" aria-label="Placement summary">
            {summaries.map(([label, field, icon, tone, suffix]) => (
              <SummaryCard key={field} label={label} value={data[field]} icon={icon} tone={tone} suffix={suffix} />
            ))}
          </section>
        );
      }}
    </ResourceState>
    <section className="section-block"><div className="section-title"><div><p className="panel-kicker">PLACEMENT TRENDS</p><h2>Performance at a glance</h2></div></div>
      <div className="charts-grid">
        <ChartCard title="Students selected by company" data={companies.data} categoryKey="company" valueKey="students" valueLabel=" students" loading={companies.loading} error={companies.error} />
        <ChartCard title="Students selected by branch" data={branches.data} categoryKey="branch" valueKey="students" valueLabel=" students" color="#30a58e" loading={branches.loading} error={branches.error} />
        <ChartCard title="Average package by company" data={averageCompany.data} categoryKey="company" valueKey="package" valueLabel=" LPA" color="#8b72d4" loading={averageCompany.loading} error={averageCompany.error} />
        <ChartCard title="Average package by branch" data={averageBranch.data} categoryKey="branch" valueKey="package" valueLabel=" LPA" color="#dc9b4e" loading={averageBranch.loading} error={averageBranch.error} />
      </div>
    </section>
    <section className="section-block"><div className="section-title"><div><p className="panel-kicker">STUDENT SPOTLIGHT</p><h2>Standout placements</h2></div></div>
      <div className="spotlight-grid">
        {[ ["Highest Package", highPackage, "gold"], ["Lowest Package", lowPackage, "rose"], ["Highest CGPA", highCgpa, "violet"] ].map(([title, state, tone]) => <div className="package-state" key={title}><ResourceState loading={state.loading} error={state.error} empty={!state.data} compact><PackageCard title={title} student={state.data} tone={tone} /></ResourceState></div>)}
      </div>
    </section>
  </>;
}
