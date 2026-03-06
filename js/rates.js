function shouldDisplayRate(stat, chance, displayed, index, length) {
  if (index > length - 7) {
    return true;
  }

  if (
    stat === "damage" ||
    stat === "damage_2" ||
    stat === "level" ||
    stat === "scale" ||
    stat.includes("totals")
  ) {
    if (chance < 30) return false;
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
