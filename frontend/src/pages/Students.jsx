import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import ResourceState from "../components/ResourceState";
import StudentTable from "../components/StudentTable";

export default function Students() {
  const { data, loading, error } = useApi(api.getStudents);
  return <>
    <section className="page-intro"><div><p className="eyebrow">STUDENT DIRECTORY</p><h1>Students</h1><p>Search and explore placement outcomes for every student.</p></div></section>
    <ResourceState loading={loading} error={error} empty={!data?.length}><StudentTable students={data || []} /></ResourceState>
  </>;
}
