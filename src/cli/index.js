import fs from "node:fs";
import path from "node:path";
import { productProfile } from "../core/productProfile.js";
import { evaluateScenario } from "../core/scenarioEngine.js";
import { buildValidationReport } from "../report/reportBuilder.js";

const suitePath = process.argv[2] ?? "samples/representative-suite.json";
const suite = JSON.parse(fs.readFileSync(suitePath, "utf8"));
const evaluations = suite.scenarios.map((scenario) => evaluateScenario(scenario, productProfile));
const report = buildValidationReport(productProfile, evaluations);
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync(path.join("dist", "validation-result.json"), JSON.stringify(report, null, 2) + "\n", "utf8");
console.log(JSON.stringify(report.totals));
