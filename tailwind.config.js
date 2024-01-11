/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'traverse-dark-blue': '#5193B3',
        'traverse-light-blue': '#62C4C3',
        'traverse-peach': '#FBD49B',
        'traverse-cream': '#F8E6CB',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Custom gradient using the Traverse City color palette
        'traverse-gradient-radial': 'radial-gradient(circle, #5193B3, #62C4C3, #FBD49B, #F8E6CB)',
      },
    },
  },
  plugins: [],
};
