module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', "sans-serif"],
        serif: ['"Source Serif Pro"', "serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(220, 80%, 12%)",
          foreground: "hsl(210, 100%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(265, 75%, 55%)",
          foreground: "hsl(210, 100%, 98%)",
        },
        tertiary: {
          DEFAULT: "hsl(198, 90%, 45%)",
          foreground: "hsl(210, 100%, 98%)",
        },
        neutral: {
          DEFAULT: "hsl(221, 30%, 8%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        background: "hsl(220, 80%, 12%)",
        foreground: "hsl(210, 100%, 98%)",
        border: "hsl(220, 30%, 25%)",
        input: "hsl(220, 30%, 20%)",
        ring: "hsl(198, 90%, 45%)",
        card: {
          DEFAULT: "hsl(220, 50%, 16%)",
          foreground: "hsl(210, 100%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(220, 30%, 20%)",
          foreground: "hsl(220, 9%, 75%)",
        },
        accent: {
          DEFAULT: "hsl(198, 90%, 45%)",
          foreground: "hsl(210, 100%, 98%)",
        },
        success: "hsl(142, 70%, 45%)",
        warning: "hsl(36, 100%, 55%)",
        gray: {
          50: "hsl(220, 15%, 98%)",
          100: "hsl(220, 14%, 95%)",
          200: "hsl(220, 10%, 90%)",
          300: "hsl(220, 9%, 75%)",
          400: "hsl(220, 8%, 60%)",
          500: "hsl(220, 6%, 45%)",
          600: "hsl(220, 6%, 35%)",
          700: "hsl(220, 7%, 25%)",
          800: "hsl(220, 8%, 16%)",
          900: "hsl(220, 10%, 8%)",
        },
        "hero-text": "hsl(210, 100%, 98%)",
        "nav-text": "hsl(210, 25%, 95%)",
        "cta-primary": "hsl(198, 90%, 45%)",
        "cta-primary-foreground": "hsl(210, 100%, 98%)",
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      spacing: {
        4: "1rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        24: "6rem",
        32: "8rem",
        48: "12rem",
        64: "16rem",
      },
      backgroundImage: {
        "gradient-1":
          "linear-gradient(135deg, hsl(265, 75%, 55%) 0%, hsl(198, 90%, 45%) 100%)",
        "gradient-2":
          "linear-gradient(135deg, hsl(220, 80%, 12%) 0%, hsl(210, 55%, 20%) 100%)",
        "gradient-hero":
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
        "gradient-card":
          "linear-gradient(135deg, hsl(220, 50%, 16%) 0%, hsl(220, 60%, 20%) 100%)",
      },
      letterSpacing: {
        tight: "-0.025em",
      },
      lineHeight: {
        tight: "1.2",
      },
      keyframes: {
        "fade-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-pulse": "fade-pulse 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
