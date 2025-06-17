export const lightTheme = {
  colors: {
    background: "#F8F9FA",
    surface: "#FFFFFF",
    border: "#E9ECEF",
    textPrimary: "#212529",
    textSecondary: "#6C757D",
    accent: "#EF5350",
    normal: "#A8A77A",
    fire: "#F7786B",
    water: "#58ABF6",
    grass: "#62B957",
    electric: "#F7D02C",
    ice: "#96D9D6",
    fighting: "#708090",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  },
  // Você pode adicionar mais coisas, como fontes, espaçamentos, etc.
  // fonts: { main: 'Roboto, sans-serif' }
};

export const darkTheme = {
  colors: {
    ...lightTheme.colors,
    background: "#12181B",
    surface: "#1A2025",
    border: "#3A4149",
    textPrimary: "#E8E6E3",
    textSecondary: "#A0AEC0",
    accent: "#EF5350",
  },
};
