const STAT_LABELS = {
  quality: "Quality",
  level: "Level",
  damage: "Damage",
  damage_2: "Damage",
  cat: "Boost",
  tower_caps: "Caps",
  tower_caps_individual: "Cap Combos",
  tower_totals: "All",
  app_totals: "App",
  hermit_totals: "Hermit",
  guardian_totals: "Guardian",
  support_caps: "Support Caps",
  scale: "Size",
  multiproj: "Multiple Projectiles",
  hdmgab1: "Ab1 DPS",
  hdmgab2: "Ab2 DPS",
  hdmgboth: "Hybrid DPS",
  hdmg: "HDmg",
  ab1: "Ab1",
  ab2: "Ab2",
  thp: "THP",
  trate: "TRate",
  tdmg: "TDmg",
  trange: "TRange",
};

const STAT_GROUPS = {
  Damage: ["damage", "damage_2"],
  DPS: ["hdmgab1", "hdmgab2", "hdmgboth"],
  Builder: [
    "tower_totals",
    "app_totals",
    "hermit_totals",
    "guardian_totals",
    "tower_caps",
    "tower_caps_individual",
  ],
  Singles: ["hdmg", "ab1", "ab2", "thp", "trate", "tdmg", "trange"],
  More: ["scale", "multiproj", "support_caps"],
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

const CAP_COMBOS = {
  1: "HP",
  2: "Rate",
  4: "Dmg",
  8: "Range",
  3: "HP + Rate",
  5: "HP + Dmg",
  6: "Rate + Dmg",
  9: "HP + Range",
  10: "Rate + Range",
  12: "Dmg + Range",
  7: "HP + Rate + Dmg",
  11: "HP + Rate + Range",
  13: "HP + Dmg + Range",
  14: "Rate + Dmg + Range",
  15: "All",
};

const DIFF_NAMES_SHORT = { Ruthless: "RL", Nightmare: "NM" };

const ACC_ALIAS_HEAD = ["head", "brooch", "hat"];
const ACC_ALIAS_MASK = ["mask", "face"];
const ACC_ALIAS_BRACER = ["wrist", "bracer"];

const ALIASES = {
  eye: ["eye of ruin", "eye of ravaging", "eye of devastation"],
  parrot: ["polly"],
  owl: ["mr. owl", "mr. peckers", "mr. crackers", "mr. bed", "mike"],
  bunny: [
    "bugs",
    "peter",
    "babs",
    "peppy",
    "ruby",
    "hopper",
    "thumper",
    "nibbles",
    "buttercup",
  ],
  "baby old one": ["boo"],
  dice: ["Fortuna", "Chance", "Roller", "Venture", "Risk", "Luck"],
  corgi: ["Chainsaw Corgi"],
};

const ALIAS_LOOKUP = {};
for (const [category, names] of Object.entries(ALIASES)) {
  names.forEach((name) => {
    ALIAS_LOOKUP[name.toLowerCase()] = category;
  });
}

function getTabName(key, rates) {
  return getReadableDamageType(rates[key].label) || STAT_LABELS[key] || key;
}

function getReadableDamageType(label) {
  switch (label) {
    case "Alt":
      return "Ranged";

    case "Base":
    case "Base + Additional":
      return "Base";

    case "Additional":
    case "Additional + Base":
      return "Elemental";

    case "50/50":
      return "Hybrid";

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
      return "TDmg + TRate + TRange";
    case "hermit_totals":
      return "TDmg + TRange + THP";
    case "guardian_totals":
      return "THP + TRate + TRange";
    case "tower_totals":
      return "TDmg + TRate + TRange + THP";
    case "hdmgab1":
      return "HDmg + Ab1";
    case "hdmgab2":
      return "HDmg + Ab2";
    case "hdmgboth":
      return "HDmg + Ab1 + Ab2";
  }
}

function orderQualityArray(arr) {
  return [...arr.slice(0, 13).reverse(), ...arr.slice(13)];
}
