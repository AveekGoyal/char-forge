// app/generate/nft/config/steps.js

export const steps = [
    {
      id: "artStyle",
      title: "Select Art Style",
      description: "Choose the visual style for your character",
      icon: "Brush",
      options: [
        {
          id: "pixel",
          label: "Pixel Art",
          description: "8-bit retro style graphics",
        },
        {
          id: "vector",
          label: "Vector Art",
          description: "Clean, scalable graphics",
        },
        {
          id: "handdrawn",
          label: "Hand-drawn",
          description: "Artistic, sketched look",
        },
        {
          id: "3d2d",
          label: "3D-styled 2D",
          description: "Depth with 2D rendering",
        },
        {
          id: "voxel",
          label: "Voxel",
          description: "3D pixel art style",
        },
        {
          id: "lowpoly",
          label: "Low-poly",
          description: "Geometric, minimalist 3D",
        },
        {
          id: "cartoon",
          label: "Cartoon",
          description: "Animated, expressive style",
        },
        {
          id: "anime",
          label: "Anime/Manga",
          description: "Japanese animation style",
        },
      ],
    },
    {
      id: "theme",
      title: "Choose Theme",
      description: "Select the thematic setting for your character",
      icon: "Wand2",
      options: [
        {
          id: "fantasy",
          label: "Fantasy",
          description: "Medieval magical world",
        },
        {
          id: "scifi",
          label: "Sci-fi",
          description: "Futuristic space setting",
        },
        {
          id: "postapoc",
          label: "Post-apocalyptic",
          description: "Survival in ruins",
        },
        {
          id: "cyberpunk",
          label: "Cyberpunk",
          description: "High tech, low life",
        },
      ],
    },
    {
      id: "class",
      title: "Select Character Class",
      description: "Define your character's role and abilities",
      icon: "Swords",
      options: [
        {
          id: "warrior",
          label: "Warrior",
          description: "Melee combat specialist",
        },
        {
          id: "mage",
          label: "Mage",
          description: "Master of arcane arts",
        },
        {
          id: "rogue",
          label: "Rogue",
          description: "Stealth and agility expert",
        },
        {
          id: "healer",
          label: "Healer",
          description: "Supportive spellcaster",
        },
      ],
    },
    {
      id: "attributes",
      title: "Character Attributes",
      description: "Customize your character's physical traits",
      icon: "User",
      options: [
        {
          id: "slim",
          label: "Slim Build",
          description: "Lean and agile physique",
        },
        {
          id: "athletic",
          label: "Athletic Build",
          description: "Balanced and fit",
        },
        {
          id: "muscular",
          label: "Muscular Build",
          description: "Strong and powerful",
        },
        {
          id: "short",
          label: "Short Height",
          description: "Below average height",
        },
      ],
    },
  ];