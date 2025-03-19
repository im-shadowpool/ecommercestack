/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container automatically
        
      },
      colors: {
        egreen: {
          50: "#effef5",
          100: "#d9ffe9",
          200: "#b5fdd4",
          300: "#7cf9b3",
          400: "#3bed8a",
          500: "#12d569",
          600: "#08b153",
          700: "#0a8b44",
          800: "#0e6c39",
          900: "#0e5932",
          950: "#013219",
        },
        skygreen: {
          50: "#f4f9ec",
          100: "#e6f2d5",
          200: "#d0e5b1",
          300: "#bbd992",
          400: "#94c05b",
          500: "#76a53d",
          600: "#5a832d",
          700: "#466526",
          800: "#3a5123",
          900: "#334621",
          950: "#19250e",
        },
        egray: {
          50: "#f6f7f6",
          100: "#dde1db",
          200: "#c5ccc3",
          300: "#a1ab9d",
          400: "#7c8978",
          500: "#616f5d",
          600: "#4d5849",
          700: "#3f483d",
          800: "#353c33",
          900: "#2f342d",
          950: "#181c17",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
