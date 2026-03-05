function setupSidebarSearch() {
  const input = document.getElementById("sidebarSearch");
  const sidebarSearchResults = document.getElementById("sidebarSearchResults");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    sidebarSearchResults.innerHTML = "";
    if (query.length < 2) return;

    let matches = [];

    for (const [map, diffs] of Object.entries(manifestData)) {
      for (const [diff, items] of Object.entries(diffs)) {
        if (!diff.toLowerCase().includes("ruthless")) continue; // TODO: Enable search for lower difficulties

        items.forEach((item) => {
          if (
            item.toLowerCase().includes(query) ||
            map.toLowerCase().includes(query)
          ) {
            matches.push({ map, diff, item });
          }
        });
      }
    }

    matches.slice(0, 10).forEach((match) => {
      const div = document.createElement("div");

      div.style.padding = "10px";
      div.style.borderBottom = "1px solid #333";

      div.innerHTML = `<label>${match.item}</label><small>${match.map}</small>`;

      div.onclick = () => {
        applySelection(match.map, match.diff, match.item);
        sidebarSearchResults.innerHTML = "";
        input.value = "";
      };

      sidebarSearchResults.appendChild(div);
    });
  });
}
