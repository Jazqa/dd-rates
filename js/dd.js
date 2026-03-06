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
      return "Ranged Dmg";

    case "Base":
    case "Base + Additional":
      return "Dmg";

    case "Additional":
    case "Additional + Base":
      return "Ele Dmg";

    case "50/50":
      return "Hybrid Dmg";

    default:
      return "";
  }
}

function getReadableUpgrades(info) {
  return info
    .replace("Additional Projectiles", "Projs")
    .replace("Projectile Speed", "ProjSpeed")
    .replace("Shots Per Second", "SPS")
    .replace("Charge Speed", "Charge")
    .replace("Base Damage", "Base Dmg")
    .replace("Additional Damage", "Ele Dmg")
    .replace("Alt Damage", "Ranged Dmg");
}

function getReadableTotals(key) {
  switch (key) {
    case "app_totals":
      return "Dmg + Rate + Range";
    case "hermit_totals":
      return "Dmg + Range + HP";
    case "guardian_totals":
      return "HP + Rate + Range";
    case "tower_totals":
      return "Dmg + Rate + Range + HP";
  }
}

function orderQualityArray(arr) {
  return [...arr.slice(0, 13).reverse(), ...arr.slice(13)];
}
