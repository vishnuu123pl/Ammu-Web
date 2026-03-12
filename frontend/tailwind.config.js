/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "oklch(0.55 0.12 220)",
          foreground: "oklch(1 0 0)",
          light: "oklch(0.72 0.1 215)",
          dark: "oklch(0.42 0.13 225)",
        },
        secondary: {
          DEFAULT: "oklch(0.88 0.06 210)",
          foreground: "oklch(0.25 0.08 220)",
        },
        muted: {
          DEFAULT: "oklch(0.94 0.02 215)",
          foreground: "oklch(0.52 0.04 220)",
        },
        accent: {
          DEFAULT: "oklch(0.82 0.08 195)",
          foreground: "oklch(0.2 0.06 210)",
        },
        destructive: {
          DEFAULT: "oklch(0.55 0.2 25)",
          foreground: "oklch(1 0 0)",
        },
        success: {
          DEFAULT: "oklch(0.6 0.14 155)",
          foreground: "oklch(1 0 0)",
        },
        warning: {
          DEFAULT: "oklch(0.72 0.15 75)",
          foreground: "oklch(0.18 0.02 220)",
        },
        card: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.18 0.02 220)",
        },
        popover: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.18 0.02 220)",
        },
        fluxera: {
          blue: "oklch(0.55 0.12 220)",
          "blue-light": "oklch(0.72 0.1 215)",
          "blue-pale": "oklch(0.88 0.06 210)",
          teal: "oklch(0.7 0.1 195)",
          "teal-light": "oklch(0.88 0.07 190)",
          white: "oklch(0.99 0.002 220)",
          "gray-light": "oklch(0.96 0.01 215)",
        },
        chart: {
          "1": "oklch(0.55 0.12 220)",
          "2": "oklch(0.65 0.1 195)",
          "3": "oklch(0.72 0.08 175)",
          "4": "oklch(0.6 0.14 240)",
          "5": "oklch(0.5 0.1 260)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 12px oklch(0.55 0.12 220 / 0.08)",
        "card-hover": "0 8px 24px oklch(0.55 0.12 220 / 0.15)",
        nav: "0 1px 8px oklch(0.55 0.12 220 / 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
