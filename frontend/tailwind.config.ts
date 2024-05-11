import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'beige': {
          '50': '#f9f9ed',
          '100': '#f1f2d9',
          '200': '#e1e1a7',
          '300': '#d0cc74',
          '400': '#c2b94d',
          '500': '#b2a440',
          '600': '#998535',
          '700': '#7b652d',
          '800': '#68532b',
          '900': '#5a4629',
          '950': '#332615',
        },
        playfulRed: {
          '500': '#ff4757',  // a vibrant, playful red
          '600': '#e84118',  // slightly darker shade for hover or active states
        },
        darkGreen: {
          '500': '#1e4d2b',  // a medium dark green, good for contrast against lighter shades
          '600': '#123d25',  // darker for more depth or UI interaction
        },
        playfulPurple: {
          '500': '#a55eea',  // a bright, playful purple
          '600': '#8854d0',  // slightly darker for interactive elements
        }
      }
    },
  },
  plugins: [],
};
export default config;
