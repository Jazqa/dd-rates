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
        : Math.floor(chance).toLocaleString("fr-FR");

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

  const calcItem = document.createElement("div");
  calcItem.className = "rate-item simulator-item";

  calcItem.innerHTML = `
        <input type="text" id="gridCalcResult" class="grid-input-2" 
               placeholder="Value" autocomplete="off" spellcheck="false"
               inputmode="decimal">
        <div class="rate-value" style="display: inline-flex; white-space: nowrap; align-items: center; border-bottom: 1px solid var(--border2);">
            1 /&nbsp;
            <input type="text" id="gridCalcChance" class="grid-input" 
                  placeholder="Chance" autocomplete="off" spellcheck="false"
                  inputmode="numeric"
                  value="${savedCustomChance}">
        </div>
    `;
  ratestList.appendChild(calcItem);

  const chanceInput = document.getElementById("gridCalcChance");
  const valueInput = document.getElementById("gridCalcResult");

  const clean = (val) => val.replace(/\s/g, "").replace(",", ".");

  const toFr = (num, dec = 0) =>
    num.toLocaleString("fr-FR", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  const formatOnBlur = (input) => {
    const num = parseFloat(clean(input.value));
    if (!isNaN(num)) {
      const dec = input === valueInput && isScale ? 2 : 0;
      input.value = toFr(num, dec);
      input.size = Math.max(1, input.value.length);
    }
  };

  const runForward = () => {
    const chance = parseInt(clean(chanceInput.value), 10);
    savedCustomChance = chanceInput.value;

    if (isNaN(chance) || chance < 1) return (valueInput.value = "");

    const result = interpolate(chance, buckets);
    const finalVal = isScale ? result / 10 : Math.round(result);
    valueInput.value = toFr(finalVal, isScale ? 2 : 0);
  };

  const runReverse = () => {
    const val = parseFloat(clean(valueInput.value));
    if (isNaN(val)) return (chanceInput.value = "");

    const internalVal = isScale ? val * 10 : val;
    const chance = reverseInterpolate(internalVal, buckets);

    const finalChance = chance === Infinity ? "" : toFr(Math.round(chance), 0);
    chanceInput.value = finalChance;
    savedCustomChance = finalChance;
  };

  chanceInput.oninput = runForward;
  valueInput.oninput = runReverse;

  [chanceInput, valueInput].forEach((input) => {
    input.onblur = () => formatOnBlur(input);

    input.onkeydown = (e) => {
      if (e.key === "Enter") input.blur();
    };

    input.onkeypress = (e) => {
      const regex = input === chanceInput ? /[0-9\s]/ : /[0-9.,\s]/;
      if (!regex.test(e.key)) e.preventDefault();
    };
  });

  if (savedCustomChance) {
    const initial = parseInt(clean(savedCustomChance), 10);
    if (!isNaN(initial)) {
      chanceInput.value = toFr(initial, 0);
      formatOnBlur(chanceInput);
    }
    runForward();
  }
}
