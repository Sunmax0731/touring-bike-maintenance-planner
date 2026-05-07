export function buildReviewModel(profile) {
  return {
    intake: profile.records,
    requiredFields: profile.requiredFields,
    warningFields: profile.warningFields,
    releaseGate: [
      "representative-suite",
      "required-docs",
      "qcds-a-minus-or-better",
      "manual-test-ready",
      "release-evidence"
    ]
  };
}
