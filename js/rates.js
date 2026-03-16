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
