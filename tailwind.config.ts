import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/forms/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primarybg: 'var(--background-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        mainBlack: 'var(--color-mainBlack)',
      },
      fontFamily: {
        headFont: ["var(--font-head)"],
        bodyFont: ["var(--font-all)"],
      },
      borderRadius: {
        main: 'var(--radius-main)',
      },
    },
  },
} satisfies Config