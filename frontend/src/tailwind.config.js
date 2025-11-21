// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
 colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",

  primary: "var(--primary)",
  "primary-foreground": "var(--primary-foreground)",

  secondary: "var(--secondary)",
  "secondary-foreground": "var(--secondary-foreground)",

  muted: "var(--muted)",
  "muted-foreground": "var(--muted-foreground)",

  accent: "var(--accent)",
  "accent-foreground": "var(--accent-foreground)",

  destructive: "var(--destructive)",

  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",

  card: "var(--card)",
  "card-foreground": "var(--card-foreground)",
}

}

  },
  plugins: [],
};
