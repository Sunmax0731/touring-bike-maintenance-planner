const scenarios = ["happy-path", "missing-required", "warning", "mixed-batch"];
const list = document.querySelector("#scenario-list");
for (const scenario of scenarios) {
  const item = document.createElement("li");
  item.textContent = scenario;
  list.appendChild(item);
}
document.querySelector("#run-review").addEventListener("click", () => {
  document.querySelector("#result").textContent = "代表シナリオ4件を確認しました。詳細は dist/validation-result.json を参照してください。";
});
