import { useApi } from "../hooks/useApi";
import { getCompanyOverview } from "../services/api";
import ResourceState from "../components/ResourceState";

export default function Companies() {
  const { data, loading, error } = useApi(getCompanyOverview);
  return <>
    <section className="page-intro"><div><p className="eyebrow">EMPLOYER DIRECTORY</p><h1>Companies</h1><p>See how many students each employer selected and their average offer.</p></div></section>
    <section className="panel companies-panel"><div className="panel-heading table-heading"><div><p className="panel-kicker">COMPANY PERFORMANCE</p><h2>Placement partners</h2></div><span className="record-count">{data?.length ?? 0} companies</span></div>
      <ResourceState loading={loading} error={error} empty={!data?.length}><div className="company-grid">{data?.map((company) => <article className="company-card" key={company.company}><div className="company-avatar">{company.company.slice(0, 1).toUpperCase()}</div><div className="company-info"><h3>{company.company}</h3><span>{company.students} students selected</span></div><div className="company-package"><strong>{company.package ?? "—"}<small> LPA</small></strong><span>Average package</span></div></article>)}</div></ResourceState>
    </section>
  </>;
}
