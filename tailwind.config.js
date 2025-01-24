/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        primaryHover: "#2563eb",
        success: "#10b981",
        successHover: "#059669",
        danger: "#ef4444",
        dangerHover: "#dc2626",
        neutral: "#6b7280",
        neutralHover: "#4b5563",
      },
    },
  },
  plugins: [],
};
