import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import ChartCard from "../components/ChartCard";

export default function Analytics() {
  const companies = useApi(api.getCompanySelections);
  const branches = useApi(api.getBranchSelections);
  const averageCompany = useApi(api.getAveragePackageByCompany);
  const averageBranch = useApi(api.getAveragePackageByBranch);
  return <>
    <section className="page-intro"><div><p className="eyebrow">DATA EXPLORER</p><h1>Placement analytics</h1><p>Compare selection and package outcomes across companies and branches.</p></div></section>
    <div className="analytics-note"><span className="note-icon">i</span><span>These visualizations use the current placement dataset and can be reused with future data sources.</span></div>
    <section className="charts-grid analytics-grid" aria-label="Placement analytics charts">
      <ChartCard title="Students selected by company" data={companies.data} categoryKey="company" valueKey="students" valueLabel=" students" loading={companies.loading} error={companies.error} />
      <ChartCard title="Students selected by branch" data={branches.data} categoryKey="branch" valueKey="students" valueLabel=" students" color="#30a58e" loading={branches.loading} error={branches.error} />
      <ChartCard title="Average package by company" data={averageCompany.data} categoryKey="company" valueKey="package" valueLabel=" LPA" color="#8b72d4" loading={averageCompany.loading} error={averageCompany.error} />
      <ChartCard title="Average package by branch" data={averageBranch.data} categoryKey="branch" valueKey="package" valueLabel=" LPA" color="#dc9b4e" loading={averageBranch.loading} error={averageBranch.error} />
    </section>
  </>;
}
