/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green:        '#3ab54a',
        'green-dark': '#1d6b2e',
        'green-light':'#e8f5eb',
        'green-mid':  '#2e9440',
        dark:         '#1a1a1a',
        light:        '#f5f5f5',
        muted:        '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        nav:  '0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
