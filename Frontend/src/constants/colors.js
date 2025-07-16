// Color Palette for CSEDU Web Project
// Based on the dark footer theme with complementary colors

export const colors = {
  // Primary Colors (based on footer dark theme)
  primary: {
    50: "#f0f4f8",
    100: "#d9e5f0",
    200: "#b3cce0",
    300: "#8db2d0",
    400: "#6799c0",
    500: "#4a90e2", // Main blue
    600: "#7B2C2C",
    700: "#2d5a9a",
    800: "#1e3a5f",
    900: "#0f1d2f",
  },

  // Secondary Colors (complementary to footer)
  secondary: {
    50: "#f8fafb",
    100: "#f1f5f6",
    200: "#e2ebec",
    300: "#bdc3c7", // Footer text color
    400: "#95a5a6",
    500: "#7f8c8d",
    600: "#6c7b7d",
    700: "#596a6b",
    800: "#34495e", // Footer background
    900: "#2c3e50", // Main footer color
  },

  // Accent Colors
  accent: {
    success: "#27ae60",
    warning: "#f39c12",
    error: "#e74c3c",
    info: "#3498db",
  },

  // Neutral Colors
  neutral: {
    white: "#ffffff",
    50: "#f8f9fa",
    100: "#f1f3f4",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
    black: "#000000",
  },

  // Status Colors
  status: {
    online: "#27ae60",
    offline: "#95a5a6",
    busy: "#f39c12",
    away: "#f1c40f",
  },

  // Background Colors
  background: {
    primary: "#ffffff",
    secondary: "#f8f9fa",
    tertiary: "#f1f3f4",
    dark: "#2c3e50",
    darker: "#1a252f",
  },

  // Text Colors
  text: {
    primary: "#212529",
    secondary: "#495057",
    tertiary: "#6c757d",
    light: "#bdc3c7",
    white: "#ffffff",
    muted: "#999999",
  },
};

// Helper functions for color usage
export const getColor = (category, shade = 500) => {
  return colors[category]?.[shade] || colors.primary[500];
};

export const getStatusColor = (status) => {
  return colors.status[status] || colors.status.offline;
};

export default colors;
