Chart.defaults.font.family = "monospace";
Chart.defaults.color = "#888";

function renderChart(labels, data, chartType = "line") {
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
          borderWidth: 2,
          borderColor: "#0091ff",
          backgroundColor: "#0091ff22",
          pointBackgroundColor: "#0060c0",
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 4,
          pointBorderWidth: 2,
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
            color: "#333",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 20,
            callback: function (value, index, values) {
              const label = this.getLabelForValue(value);
              return label;
            },
          },
        },
      },
      onHover: (event, activeElements) => {
        document
          .querySelectorAll(".rate-item")
          .forEach((el) => el.classList.remove("highlight"));

        if (activeElements.length > 0) {
          const index = activeElements[0].index;
          const items = document.querySelectorAll(".rate-item");

          const labelText = currentChart.data.labels[index];
          const target = Array.from(items).find(
            (item) => item.querySelector("label").textContent === labelText,
          );

          if (target) {
            target.classList.add("highlight");
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#121212",
          titleColor: "#aaa",
          bodyColor: "#0091ff",
          borderColor: "#444",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          cornerRadius: 0,
          titleColor: "#fff",
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
