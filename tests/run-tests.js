import fs from "node:fs";
    import path from "node:path";
    import assert from "node:assert/strict";
    import { productProfile } from "../src/core/productProfile.js";
    import { evaluateScenario } from "../src/core/scenarioEngine.js";
    import { assertExpectedSummary } from "../src/validators/scenarioValidator.js";
    import { buildValidationReport } from "../src/report/reportBuilder.js";
    import { buildReviewModel } from "../src/review-model/reviewModel.js";

    const requiredDocs = [
  "README.md",
  "AGENTS.md",
  "SKILL.md",
  "docs/requirements.md",
  "docs/specification.md",
  "docs/design.md",
  "docs/implementation-plan.md",
  "docs/test-plan.md",
  "docs/manual-test.md",
  "docs/installation-guide.md",
  "docs/user-guide.md",
  "docs/release-checklist.md",
  "docs/responsibility-map.md",
  "docs/ui-ux-polish.md",
  "docs/post-mvp-roadmap.md",
  "docs/competitive-benchmark.md",
  "docs/evaluation-criteria.md",
  "docs/qcds-evaluation.md",
  "docs/qcds-remote-benchmark.md",
  "docs/qcds-strict-gap-analysis.md",
  "docs/qcds-strict-metrics.json",
  "docs/qcds-regression-baseline.json",
  "docs/security-privacy-checklist.md",
  "docs/traceability-matrix.md",
  "docs/strict-manual-test-addendum.md",
  "docs/source-idea-pack.json",
  "docs/release-evidence.json",
  "docs/releases/v0.1.0-alpha.1.md"
];
    const gradeOrder = ["D-", "D+", "C-", "C+", "B-", "B+", "A-", "A+", "S-", "S+"];
    const badCodePoints = [0x7e67, 0x90e2, 0x9aeb, 0xfffd];

    function readJson(file) {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    }

    function walk(dir) {
      const entries = [];
      for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
          if (![".git", "dist", "node_modules"].includes(item.name)) entries.push(...walk(full));
        } else {
          entries.push(full);
        }
      }
      return entries;
    }

    const suite = readJson("samples/representative-suite.json");
    const evaluations = suite.scenarios.map((scenario) => {
      const actual = evaluateScenario(scenario, productProfile);
      assertExpectedSummary(actual.summary, scenario.expected);
      return actual;
    });
    const report = buildValidationReport(productProfile, evaluations);
    assert.equal(report.totals.passes, 2);
    assert.equal(report.totals.failures, 2);
    assert.equal(report.totals.warnings, 2);

    for (const rel of requiredDocs) {
      assert.ok(fs.existsSync(rel), `required doc missing: ${rel}`);
    }

    const metrics = readJson("docs/qcds-strict-metrics.json");
    for (const [axis, value] of Object.entries(metrics.ratings)) {
      assert.ok(gradeOrder.indexOf(value.grade) >= gradeOrder.indexOf("A-"), `${axis} below A-`);
    }
    assert.deepEqual(metrics.belowAMinus, []);

    const source = readJson("docs/source-idea-pack.json");
    assert.equal(source.metadataRepositoryMatches, true);
    assert.equal(source.exactFolderExists, true);
    assert.equal(source.exactFolderZipExists, true);
    assert.equal(source.zipMojibakeDetected, false);

    const evidence = readJson("docs/release-evidence.json");
    assert.equal(evidence.tag, "v0.1.0-alpha.1");
    assert.ok(evidence.manualTest === "not-run-by-codex");

    const reviewModel = buildReviewModel(productProfile);
    assert.ok(reviewModel.releaseGate.includes("release-evidence"));

    for (const file of walk(".")) {
      if (!/\.(md|json|js|html|css|xml|lua|py|ps1)$/i.test(file)) continue;
      const text = fs.readFileSync(file, "utf8");
      for (const cp of badCodePoints) {
        assert.equal([...text].some((ch) => ch.codePointAt(0) === cp), false, `mojibake-like code point in ${file}`);
      }
    }

    fs.mkdirSync("dist", { recursive: true });
    fs.writeFileSync("dist/validation-result.json", JSON.stringify(report, null, 2) + "\n", "utf8");

    if (productProfile.domain === "WebApp") {
      const html = fs.readFileSync("public/index.html", "utf8");
      assert.ok(html.includes(`data-product-root="${productProfile.repositoryName}"`));
      assert.ok(html.includes(productProfile.ideaName));
      const smoke = {
        method: "static-html-dom-equivalent",
        notBlank: html.trim().length > 400,
        markers: ["data-product-root", "run-review", "scenario-list"],
        checkedAt: "stable-web-smoke",
        manualBrowserTest: "not-run-by-codex"
      };
      fs.writeFileSync("dist/web-smoke-result.json", JSON.stringify(smoke, null, 2) + "\n", "utf8");
    }

    console.log(`ok ${productProfile.repositoryName} scenarios=${suite.scenarios.length} docs=${requiredDocs.length}`);
