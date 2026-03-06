Chart.defaults.font.family = "monospace";
Chart.defaults.font.size = 11;
Chart.defaults.color = "#ededed";

function renderChart(labels, data, chartType = "line") {
  const rootStyles = getComputedStyle(document.documentElement);
  const accentColor = rootStyles.getPropertyValue("--accent").trim();
  const bgColor = rootStyles.getPropertyValue("--bg").trim();
  const bg2Color = rootStyles.getPropertyValue("--bg2").trim();
  const borderColor = rootStyles.getPropertyValue("--border").trim();
  const fgColor = rootStyles.getPropertyValue("--fg").trim();
  const fg2Color = rootStyles.getPropertyValue("--fg2").trim();

  const chartContext = document.getElementById("chart").getContext("2d");
  const yAxisType = document.getElementById("yAxisTypeSelect").value;

  if (currentChart) currentChart.destroy();

  currentChart = new Chart(chartContext, {
    type: chartType,
    data: {
      labels,
      datasets: [
        {
          data,
          tension: 0.2,
          borderWidth: 2,
          borderColor: accentColor,
          backgroundColor: `${accentColor}22`,
          pointBackgroundColor: accentColor,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 4,
        },
      ],
    },
    options: {
      responsive: true,
      animation: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          type: yAxisType,
          grid: { color: "transparent" },
          ticks: { callback: () => "" },
        },
        x: {
          grid: {
            color: bgColor,
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 20,
            color: fg2Color,
            callback: function (value, index, values) {
              const label = this.getLabelForValue(value);
              return label;
            },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: bg2Color,
          bodyColor: fg2Color,
          borderColor: borderColor,
          titleColor: fgColor,
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          cornerRadius: 0,
          titleFont: {
            family: "sans-serif",
          },
          callbacks: {
            label: (context) => {
              const rate = context.raw;

              let formatted;
              if (!rate) {
                formatted = "∞";
              } else {
                let chance = totalSeeds / rate;
                formatted =
                  chance < 10
                    ? chance.toFixed(2)
                    : Math.round(chance).toLocaleString("fr-FR");
              }

              return `1 / ${formatted}`;
            },
          },
        },
      },
    },
  });

  const canvas = document.getElementById("chart");

  canvas.onmouseleave = () => {
    document
      .querySelectorAll(".rate-item")
      .forEach((el) => el.classList.remove("highlight"));
  };
}
