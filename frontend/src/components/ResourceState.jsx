export default function ResourceState({ loading, error, empty, children, compact = false }) {
  const className = `resource-state ${compact ? "compact" : ""}`;
  if (loading) return <div className={className} role="status"><span className="state-spinner" />Loading data…</div>;
  if (error) return <div className={`${className} error-state`} role="alert"><span>{error}</span></div>;
  if (empty) return <div className={className} role="status">No data available yet.</div>;
  return typeof children === "function" ? children() : children;
}
