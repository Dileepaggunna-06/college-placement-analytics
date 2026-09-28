import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ResourceState from "./ResourceState";

export default function ChartCard({ title, data, categoryKey, valueKey, valueLabel, color = "#4f83df", formatter, loading, error }) {
  const rows = Array.isArray(data) ? data : [];
  const crowded = rows.length > 5;

  return <section className="panel chart-panel">
    <div className="panel-heading"><div><p className="panel-kicker">PLACEMENT DATA</p><h2>{title}</h2></div></div>
    <ResourceState loading={loading} error={error} empty={rows.length === 0}>
      {() => (
        <div className="chart-wrap" role="img" aria-label={`${title} bar chart`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 12, right: 10, left: -12, bottom: 8 }}>
              <CartesianGrid stroke="#edf1f6" vertical={false} />
              <XAxis dataKey={categoryKey} tick={{ fill: "#78879b", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} angle={crowded ? -22 : 0} textAnchor={crowded ? "end" : "middle"} height={crowded ? 54 : 32} />
              <YAxis tick={{ fill: "#8c99aa", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => formatter ? formatter(value) : [`${value}${valueLabel}`, valueLabel.trim() || "Value"]} contentStyle={{ border: "1px solid #e6ebf2", borderRadius: 10, boxShadow: "0 8px 24px #243a5714" }} />
              <Bar dataKey={valueKey} name={valueLabel.trim() || "Value"} fill={color} radius={[5, 5, 0, 0]} maxBarSize={46} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ResourceState>
  </section>;
}
