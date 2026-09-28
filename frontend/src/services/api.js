const API_BASE_URL = "http://127.0.0.1:5000";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

function mapToRows(data, nameKey, valueKey) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return [];
  return Object.entries(data).map(([name, value]) => ({ [nameKey]: name, [valueKey]: Number(value) }));
}

export const api = {
  getDashboard: () => request("/api/dashboard"),
  getStudents: () => request("/api/students"),
  getCompanySelections: async () => mapToRows(await request("/api/companies"), "company", "students"),
  getBranchSelections: async () => mapToRows(await request("/api/branches"), "branch", "students"),
  getAveragePackageByCompany: async () => mapToRows(await request("/api/average-package/company"), "company", "package"),
  getAveragePackageByBranch: async () => mapToRows(await request("/api/average-package/branch"), "branch", "package"),
  getHighestPackage: () => request("/api/highest-package"),
  getLowestPackage: () => request("/api/lowest-package"),
  getHighestCgpa: () => request("/api/highest-cgpa"),
};

export async function getCompanyOverview() {
  const [selections, packages] = await Promise.all([
    api.getCompanySelections(),
    api.getAveragePackageByCompany(),
  ]);
  const packageByCompany = new Map(packages.map((row) => [row.company, row.package]));
  return selections.map((row) => ({
    ...row,
    package: packageByCompany.get(row.company) ?? null,
  }));
}
