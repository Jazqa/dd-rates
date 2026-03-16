function shouldDisplayRate(stat, chance, displayed, index, length) {
  if (index > length - 7) {
    return true;
  }

  if (
    stat === "damage" ||
    stat === "damage_2" ||
    stat === "level" ||
    stat === "scale" ||
    stat === "cat"
  ) {
    if (chance < 30) return false;
  }

  if (
    stat.includes("totals") ||
    stat === "hdmgab1" ||
    stat === "hdmgab2" ||
    stat === "hdmgboth" ||
    stat === "hdmg" ||
    stat === "ab1" ||
    stat === "ab2" ||
    stat === "thp" ||
    stat === "trate" ||
    stat === "tdmg" ||
    stat === "trange"
  ) {
    if (chance < 50) return false;
  }

  return true;
}

function updateRatesList(labels, data) {
  const ratestList = document.getElementById("ratesList");
  if (!ratestList) return;

  ratestList.innerHTML = "";
  const stat = document.getElementById("statSelect").value;
  let displayed = 0;

  labels.forEach((label, index) => {
    const rate = data[index];

    if (!rate || rate <= 0 || isNaN(rate)) return;

    const chance = totalSeeds / rate;

    if (!shouldDisplayRate(stat, chance, displayed, index, labels.length))
      return;
    displayed += 1;

    const formattedChance =
      chance < 10
        ? chance.toFixed(2)
        : Math.round(chance).toLocaleString("fr-FR");

    const row = document.createElement("div");
    row.className = "rate-item";
    row.dataset.index = index;

    row.innerHTML = `
                    <label>${label}</label>
                    <span class="rate-value">1 / ${formattedChance}</span>
                `;

    ratestList.appendChild(row);
  });

  ratestList.style.display = ratestList.childElementCount > 0 ? "grid" : "none";
}

let savedCustomChance = "";

function updateCustomRate(buckets) {
  const ratestList = document.getElementById("ratesList");
  if (!ratestList || !buckets) return;

  const stat = document.getElementById("statSelect").value;
  const isScale = stat === "scale";

  // Calculate the rarest chance in this bucket set for the "+" logic
  const keys = Object.keys(buckets)
    .map(Number)
    .sort((a, b) => a - b);
  let totalInBuckets = 0;
  keys.forEach((k) => (totalInBuckets += buckets[k]));
  const rarestChance = totalSeeds / buckets[keys[keys.length - 1]];
  // Note: If your interpolate logic uses cumulative,
  // rarestChance is usually totalSeeds / buckets[maxKey]

  const calcItem = document.createElement("div");
  calcItem.className = "rate-item simulator-item";
  calcItem.innerHTML = `
        <label id="gridCalcResult" style="color: var(--fg);">∞</label>
        <div class="rate-value">
            1 / <input type="number" id="gridCalcChance" placeholder="Custom" 
                 class="grid-input" inputmode="numeric" step="1" 
                 value="${savedCustomChance}">
        </div>
    `;
  ratestList.appendChild(calcItem);

  const chanceInput = document.getElementById("gridCalcChance");
  const resultLabel = document.getElementById("gridCalcResult");

  const runCalc = (val) => {
    savedCustomChance = val;
    if (!val) {
      resultLabel.textContent = "∞";
      return;
    }
    const target = parseInt(val, 10);
    if (isNaN(target) || target < 1) {
      resultLabel.textContent = "∞";
      return;
    }

    const value = interpolate(target, buckets);
    if (!value || value <= 0) {
      resultLabel.textContent = "∞";
    } else {
      const displayVal = isScale
        ? (value / 10).toFixed(2)
        : Math.round(value).toLocaleString("fr-FR");

      // Check if target meets or exceeds the rarest documented bucket
      const isMaxed = target >= rarestChance;
      resultLabel.textContent = isMaxed ? `${displayVal}+` : displayVal;
    }
  };

  if (savedCustomChance) runCalc(savedCustomChance);

  // Block decimals/scientific notation
  chanceInput.onkeypress = (e) => {
    if ([".", ",", "e", "+", "-"].includes(e.key)) e.preventDefault();
  };

  chanceInput.oninput = () => runCalc(chanceInput.value);
}
