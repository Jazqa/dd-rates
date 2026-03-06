const STAT_LABELS = {
  quality: "Quality",
  level: "Level",
  damage: "Damage",
  damage_2: "Damage",
  tower_caps: "Caps",
  tower_totals: "Towers",
  app_totals: "App",
  hermit_totals: "Hermit",
  guardian_totals: "Guardian",
  support_caps: "Support Caps",
  scale: "Size",
  multiproj: "Multiple Projectiles",
};

const RARITY_LABELS = [
  "Cursed",
  "Torn",
  "Worn",
  "Stocky",
  "Solid",
  "Sturdy",
  "Polished",
  "Shining",
  "Powerful",
  "Amazing",
  "Epic",
  "Legendary",
  "Godly",
  "Mythical",
  "Transcendent",
  "Supreme",
  "Ultimate",
  "Ultimate 93",
  "Ultimate +",
  "Ultimate ++",
];

const RARITY_LABELS_SHORT = [
  "CRSD",
  "TORN",
  "WORN",
  "STKY",
  "SLD",
  "STRDY",
  "PLSH",
  "SHNY",
  "PWR",
  "AMZ",
  "EPIC",
  "LEG",
  "GODLY",
  "MYTH",
  "TRANS",
  "SUP",
  "ULT",
  "U93",
  "ULT+",
  "ULT++",
];

const DIFF_NAMES_SHORT = { Ruthless: "RL", Nightmare: "NM" };

function getTabName(key, rates) {
  return getReadableDamageType(rates[key].label) || STAT_LABELS[key] || key;
}

function getReadableDamageType(label) {
  switch (label) {
    case "Alt":
      return "Ranged Damage";

    case "Base":
    case "Base + Additional":
      return "Damage";

    case "Additional":
    case "Additional + Base":
      return "Elemental Damage";

    case "50/50":
      return "Hybrid Damage";

    default:
      return "";
  }
}

function getReadableUpgrades(info) {
  return info
    .replace("Additional Damage", "Elemental Damage")
    .replace("Alt", "Ranged");
}

function getReadableTotals(key) {
  switch (key) {
    case "app_totals":
      return "Damage + Rate + Range";
    case "hermit_totals":
      return "Damage + Range + HP";
    case "guardian_totals":
      return "HP + Rate + Range";
    case "tower_totals":
      return "Damage + Rate + Range + HP";
  }
}

function orderQualityArray(arr) {
  return [...arr.slice(0, 13).reverse(), ...arr.slice(13)];
}
