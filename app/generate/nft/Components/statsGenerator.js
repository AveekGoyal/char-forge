// utils/statsGenerator.js

// Base stats ranges for different classes
const CLASS_BASE_STATS = {
    warrior: {
      HP: { min: 75, max: 100 },
      MP: { min: 20, max: 40 },
      STR: { min: 70, max: 90 },
      INT: { min: 30, max: 50 }
    },
    mage: {
      HP: { min: 50, max: 70 },
      MP: { min: 80, max: 100 },
      STR: { min: 20, max: 40 },
      INT: { min: 75, max: 95 }
    },
    rogue: {
      HP: { min: 60, max: 80 },
      MP: { min: 40, max: 60 },
      STR: { min: 60, max: 80 },
      INT: { min: 50, max: 70 }
    },
    ranger: {
      HP: { min: 65, max: 85 },
      MP: { min: 45, max: 65 },
      STR: { min: 65, max: 85 },
      INT: { min: 45, max: 65 }
    },
    paladin: {
      HP: { min: 80, max: 100 },
      MP: { min: 50, max: 70 },
      STR: { min: 65, max: 85 },
      INT: { min: 40, max: 60 }
    },
    necromancer: {
      HP: { min: 55, max: 75 },
      MP: { min: 75, max: 95 },
      STR: { min: 30, max: 50 },
      INT: { min: 70, max: 90 }
    },
    monk: {
      HP: { min: 70, max: 90 },
      MP: { min: 60, max: 80 },
      STR: { min: 65, max: 85 },
      INT: { min: 55, max: 75 }
    },
    druid: {
      HP: { min: 65, max: 85 },
      MP: { min: 70, max: 90 },
      STR: { min: 45, max: 65 },
      INT: { min: 65, max: 85 }
    }
  };
  
  // Race modifiers (multipliers)
  const RACE_MODIFIERS = {
    human: { HP: 1.0, MP: 1.0, STR: 1.0, INT: 1.0 }, // Balanced
    elf: { HP: 0.9, MP: 1.2, STR: 0.9, INT: 1.2 }, // Magic-oriented
    dwarf: { HP: 1.2, MP: 0.8, STR: 1.2, INT: 0.9 }, // Sturdy
    orc: { HP: 1.3, MP: 0.7, STR: 1.3, INT: 0.8 }, // Physical power
    halfling: { HP: 0.8, MP: 1.1, STR: 0.8, INT: 1.1 }, // Agile
    dragonborn: { HP: 1.1, MP: 1.1, STR: 1.1, INT: 1.0 } // Powerful
  };
  
  // Equipment bonuses (flat additions)
  const EQUIPMENT_BONUSES = {
    'sword-shield': { HP: 10, MP: 0, STR: 5, INT: 0 },
    'staff': { HP: 0, MP: 10, STR: 0, INT: 5 },
    'daggers': { HP: 0, MP: 5, STR: 5, INT: 0 },
    'bow': { HP: 0, MP: 5, STR: 5, INT: 0 },
    'hammer': { HP: 5, MP: 0, STR: 10, INT: 0 },
    'grimoire': { HP: 0, MP: 15, STR: 0, INT: 10 }
  };
  
  // Special powers based on class and attributes
  const CLASS_SPECIAL_POWERS = {
    warrior: [
      { name: "Berserker Rage", description: "Enter a powerful rage state, increasing damage" },
      { name: "Shield Wall", description: "Create a defensive barrier for allies" },
      { name: "Devastating Strike", description: "Perform a powerful weapon attack" }
    ],
    mage: [
      { name: "Arcane Burst", description: "Release a powerful magical explosion" },
      { name: "Time Manipulation", description: "Briefly control the flow of time" },
      { name: "Elemental Mastery", description: "Command all elemental forces" }
    ],
    rogue: [
      { name: "Shadow Step", description: "Teleport through shadows to strike" },
      { name: "Deadly Precision", description: "Guaranteed critical strike chance" },
      { name: "Smoke Bomb", description: "Create a cloud of concealing smoke" }
    ],
    ranger: [
      { name: "Beast Command", description: "Control nearby creatures" },
      { name: "Perfect Shot", description: "Guaranteed hit with bonus damage" },
      { name: "Nature's Blessing", description: "Gain benefits from surroundings" }
    ],
    paladin: [
      { name: "Divine Shield", description: "Become temporarily invulnerable" },
      { name: "Holy Strike", description: "Weapon attack with divine damage" },
      { name: "Blessing of Light", description: "Heal and protect allies" }
    ],
    necromancer: [
      { name: "Soul Drain", description: "Steal life force from enemies" },
      { name: "Undead Legion", description: "Summon undead minions" },
      { name: "Death's Embrace", description: "Convert damage to healing" }
    ],
    monk: [
      { name: "Chi Burst", description: "Release powerful spiritual energy" },
      { name: "Perfect Balance", description: "Enter a state of combat mastery" },
      { name: "Inner Peace", description: "Rapid health regeneration" }
    ],
    druid: [
      { name: "Wild Shape", description: "Transform into powerful creatures" },
      { name: "Nature's Wrath", description: "Command plants and elements" },
      { name: "Healing Grove", description: "Create an area of regeneration" }
    ]
  };
  
  // Random number generator within a range
  const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Main stats generation function
  export const generateCharacterStats = (characterClass, race, equipment) => {
    const baseStats = CLASS_BASE_STATS[characterClass] || CLASS_BASE_STATS.warrior;
    const raceModifiers = RACE_MODIFIERS[race] || RACE_MODIFIERS.human;
    const equipBonus = EQUIPMENT_BONUSES[equipment] || { HP: 0, MP: 0, STR: 0, INT: 0 };
  
    // Generate base stats with race modifiers and equipment bonuses
    const stats = {
      HP: Math.round(getRandomInRange(baseStats.HP.min, baseStats.HP.max) * raceModifiers.HP) + equipBonus.HP,
      MP: Math.round(getRandomInRange(baseStats.MP.min, baseStats.MP.max) * raceModifiers.MP) + equipBonus.MP,
      STR: Math.round(getRandomInRange(baseStats.STR.min, baseStats.STR.max) * raceModifiers.STR) + equipBonus.STR,
      INT: Math.round(getRandomInRange(baseStats.INT.min, baseStats.INT.max) * raceModifiers.INT) + equipBonus.INT
    };
  
    // Get random special power for the class
    const classPowers = CLASS_SPECIAL_POWERS[characterClass] || CLASS_SPECIAL_POWERS.warrior;
    const specialPower = classPowers[Math.floor(Math.random() * classPowers.length)];
  
    return {
      stats,
      specialPower
    };
  };