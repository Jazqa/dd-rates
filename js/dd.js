const STAT_LABELS = {
  quality: "Quality",
  level: "Level",
  damage: "Damage",
  damage_2: "Damage",
  cat: "Boost",
  tower_caps: "Caps",
  tower_totals: "Towers",
  app_totals: "App",
  hermit_totals: "Hermit",
  guardian_totals: "Guardian",
  support_caps: "Support Caps",
  scale: "Size",
  multiproj: "Multiple Projectiles",
  hdmgab1: "HDmg + Ab1",
  hdmgab2: "HDmg + Ab2",
  hdmg: "HDmg",
  ab1: "Ab1",
  ab2: "Ab2",
  thp: "THP",
  trate: "TRate",
  tdmg: "TDmg",
  trange: "TRange",
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

  "Rudolph's Spare Antlers": ACC_ALIAS_HEAD,
  "Rudolph's Spare Nose": ACC_ALIAS_MASK,
  "Spare Christmas Lights": ACC_ALIAS_BRACER,

  "Cat Brooch": ACC_ALIAS_HEAD,
  "Cat Mask": ACC_ALIAS_MASK,
  "Cat Bracers": ACC_ALIAS_BRACER,
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
