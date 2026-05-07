export function buildValidationReport(profile, evaluations) {
  const totals = evaluations.reduce((acc, item) => {
    acc.passes += item.summary.passes;
    acc.failures += item.summary.failures;
    acc.warnings += item.summary.warnings;
    return acc;
  }, { passes: 0, failures: 0, warnings: 0 });
  return {
    product: profile.repositoryName,
    domain: profile.domain,
    generatedAt: new Date().toISOString(),
    totals,
    evaluations,
    closedAlphaReady: totals.failures === 2 && totals.passes >= 2 && totals.warnings >= 2
  };
}
