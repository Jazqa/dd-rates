function setupSidebarSearch() {
  const input = document.getElementById("sidebarSearch");
  const sidebarSearchResults = document.getElementById("sidebarSearchResults");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    sidebarSearchResults.innerHTML = "";
    if (query.length < 2) return;

    const aliases = [];
    for (const [alias, category] of Object.entries(ALIAS_LOOKUP)) {
      if (alias.includes(query)) {
        aliases.push(category);
      }
    }

    let matches = [];

    for (const [map, diffs] of Object.entries(manifestData)) {
      for (const [diff, items] of Object.entries(diffs)) {
        if (!diff.toLowerCase().includes("ruthless")) continue;

        items.forEach((item) => {
          const itemLow = item.toLowerCase();

          if (
            itemLow.includes(query) ||
            map.toLowerCase().includes(query) ||
            aliases.includes(itemLow)
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
