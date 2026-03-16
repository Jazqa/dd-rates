function interpolate(target, buckets) {
  const keys = Object.keys(buckets)
    .map(Number)
    .sort((a, b) => a - b);
  if (keys.length === 0) return 0;

  let runningTotal = 0;
  const cumulativeData = [];

  for (let i = keys.length - 1; i >= 0; i--) {
    runningTotal += buckets[keys[i]];
    cumulativeData.unshift({
      val: keys[i],
      chance: totalSeeds / runningTotal,
    });
  }

  if (cumulativeData[0].chance >= target) return cumulativeData[0].val;

  for (let i = 0; i < cumulativeData.length - 1; i++) {
    const low = cumulativeData[i];
    const high = cumulativeData[i + 1];

    if (target >= low.chance && target <= high.chance) {
      const ratio = (target - low.chance) / (high.chance - low.chance);
      return low.val + ratio * (high.val - low.val);
    }
  }

  return cumulativeData[cumulativeData.length - 1].val;
}

function reverseInterpolate(targetValue, buckets) {
  const keys = Object.keys(buckets)
    .map(Number)
    .sort((a, b) => a - b);
  if (keys.length === 0) return 0;
  const maxKey = keys[keys.length - 1];

  if (targetValue > maxKey) {
    return Infinity;
  }

  let runningTotal = 0;
  const cumulativeData = [];
  for (let i = keys.length - 1; i >= 0; i--) {
    runningTotal += buckets[keys[i]];
    cumulativeData.unshift({
      val: keys[i],
      chance: totalSeeds / runningTotal,
    });
  }

  if (targetValue <= cumulativeData[0].val) return cumulativeData[0].chance;

  for (let i = 0; i < cumulativeData.length - 1; i++) {
    const low = cumulativeData[i];
    const high = cumulativeData[i + 1];

    if (targetValue >= low.val && targetValue <= high.val) {
      const ratio = (targetValue - low.val) / (high.val - low.val);
      return low.chance + ratio * (high.chance - low.chance);
    }
  }

  return cumulativeData[cumulativeData.length - 1].chance;
}

function updateAverages(buckets) {
  const averageList = document.getElementById("averageList");
  const stat = document.getElementById("statSelect").value;
  if (!averageList || !buckets) return;

  averageList.innerHTML = "";
  const targets = [50, 100, 250, 500, 1000, 2500, 5000];

  targets.forEach((target) => {
    const value = interpolate(target, buckets);

    let displayVal =
      stat === "scale"
        ? (value / 10).toFixed(2)
        : Math.round(value).toLocaleString("fr-FR");

    const row = document.createElement("div");
    row.className = "average-item";
    row.innerHTML = `
            <span class="avg-label">${displayVal}</span>
            <span class="avg-count">1 / ${target.toLocaleString("fr-FR")}</span>
        `;
    averageList.appendChild(row);
  });

  averageList.style.display = "grid";
}
