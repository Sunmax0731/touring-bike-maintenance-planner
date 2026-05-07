export function assertExpectedSummary(actual, expected) {
  for (const key of ["passes", "failures", "warnings"]) {
    if (actual[key] !== expected[key]) {
      throw new Error(`Expected ${key}=${expected[key]} but got ${actual[key]}`);
    }
  }
}
