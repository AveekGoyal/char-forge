// app/generate/nft/config/steps.js
export const steps = [
    {
      id: "style",
      title: "Art Style",
      description: "Choose the visual style for your character",
      icon: "Palette",
      options: [
        {
          id: "pixel",
          label: "Pixel Art",
          description: "Retro 8-bit style perfect for classic gaming aesthetics",
        },
        {
          id: "anime",
          label: "Anime",
          description: "Japanese animation style with bold colors and clean lines",
        },
        {
          id: "realistic",
          label: "Realistic",
          description: "Highly detailed digital art with realistic proportions",
        },
        {
          id: "vector",
          label: "Vector",
          description: "Clean, scalable art with smooth gradients",
        },
        {
          id: "painterly",
          label: "Painterly",
          description: "Digital painting style with visible brushstrokes",
        },
        {
          id: "cyberpunk",
          label: "Cyberpunk",
          description: "Futuristic style with neon colors and tech elements",
        },
        {
          id: "fantasy",
          label: "High Fantasy",
          description: "Classic fantasy art style with magical elements",
        },
        {
          id: "chibi",
          label: "Chibi",
          description: "Cute, super-deformed style with exaggerated features",
        },
      ],
    },
    {
      id: "class",
      title: "Character Class",
      description: "Select your character's role and abilities",
      icon: "Swords",
      options: [
        {
          id: "warrior",
          label: "Warrior",
          description: "Master of weapons and combat",
        },
        {
          id: "mage",
          label: "Mage",
          description: "Wielder of arcane magic",
        },
        {
          id: "rogue",
          label: "Rogue",
          description: "Stealthy expert in precision and deception",
        },
        {
          id: "ranger",
          label: "Ranger",
          description: "Skilled archer and wilderness survivor",
        },
        {
          id: "paladin",
          label: "Paladin",
          description: "Holy warrior combining combat and divine magic",
        },
        {
          id: "necromancer",
          label: "Necromancer",
          description: "Dark spellcaster controlling undead forces",
        },
        {
          id: "monk",
          label: "Monk",
          description: "Martial artist harnessing inner power",
        },
        {
          id: "druid",
          label: "Druid",
          description: "Nature-based spellcaster with shapeshifting abilities",
        },
      ],
    },
    {
      id: "race",
      title: "Race",
      description: "Choose your character's species and heritage",
      icon: "User",
      options: [
        {
          id: "human",
          label: "Human",
          description: "Versatile and adaptable",
        },
        {
          id: "elf",
          label: "Elf",
          description: "Graceful and long-lived",
        },
        {
          id: "dwarf",
          label: "Dwarf",
          description: "Strong and resilient",
        },
        {
          id: "orc",
          label: "Orc",
          description: "Powerful and fierce",
        },
        {
          id: "halfling",
          label: "Halfling",
          description: "Small and nimble",
        },
        {
          id: "dragonborn",
          label: "Dragonborn",
          description: "Dragon-blooded humanoid",
        },
      ],
    },
    {
      id: "gender",
      title: "Gender",
      description: "Select your character's gender presentation",
      icon: "User",
      options: [
        {
          id: "male",
          label: "Male",
          description: "Masculine appearance and features",
        },
        {
          id: "female",
          label: "Female",
          description: "Feminine appearance and features",
        },
        {
          id: "androgynous",
          label: "Androgynous",
          description: "Gender-neutral appearance",
        },
      ],
    },
    {
      id: "equipment",
      title: "Equipment",
      description: "Choose your character's primary gear",
      icon: "Shield",
      options: [
        {
          id: "sword-shield",
          label: "Sword & Shield",
          description: "Classic warrior loadout",
        },
        {
          id: "staff",
          label: "Magical Staff",
          description: "Traditional spellcaster weapon",
        },
        {
          id: "daggers",
          label: "Twin Daggers",
          description: "Rogue's favorite weapons",
        },
        {
          id: "bow",
          label: "Bow & Arrows",
          description: "Ranged combat equipment",
        },
        {
          id: "hammer",
          label: "War Hammer",
          description: "Heavy crushing weapon",
        },
        {
          id: "grimoire",
          label: "Grimoire & Orb",
          description: "Spellbook and focusing crystal",
        },
      ],
    },
  ];