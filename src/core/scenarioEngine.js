export function evaluateRecord(record, profile) {
  const missing = profile.requiredFields.filter((field) => {
    const value = record[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  const warningFields = profile.warningFields.filter((field) => {
    const value = record[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    return { id: record.id ?? "unknown", status: "fail", missing, warnings: [] };
  }
  if (warningFields.length > 0) {
    return { id: record.id ?? "unknown", status: "warning", missing: [], warnings: warningFields };
  }
  return { id: record.id ?? "unknown", status: "pass", missing: [], warnings: [] };
}

export function evaluateScenario(scenario, profile) {
  const results = scenario.records.map((record) => evaluateRecord(record, profile));
  const summary = {
    passes: results.filter((result) => result.status === "pass").length,
    failures: results.filter((result) => result.status === "fail").length,
    warnings: results.filter((result) => result.status === "warning").length
  };
  return { id: scenario.id, summary, results };
}
