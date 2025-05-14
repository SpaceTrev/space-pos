import type { Config } from 'tailwindcss';

export const tailwindConfig: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#16a34a',
          dark: '#166534',
        },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;