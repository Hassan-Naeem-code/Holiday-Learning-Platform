import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './games/**/*.{js,ts,jsx,tsx,mdx}',
    './tutorials/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: {
            dark: '#6B46C1',
            DEFAULT: '#7C3AED',
            light: '#A78BFA'
          },
          blue: {
            dark: '#3B82F6',
            DEFAULT: '#60A5FA',
            light: '#93C5FD'
          },
          gold: {
            dark: '#F59E0B',
            DEFAULT: '#FCD34D',
            light: '#FDE68A'
          },
        },
        tree: {
          green: {
            dark: '#059669',
            DEFAULT: '#10B981',
            light: '#6EE7B7'
          },
          brown: {
            dark: '#78350F',
            DEFAULT: '#92400E',
            light: '#B45309'
          },
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      animation: {
        'tree-grow': 'treeGrow 0.5s ease-out',
        'leaf-shimmer': 'leafShimmer 2s ease-in-out infinite',
        'branch-extend': 'branchExtend 1s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'confetti': 'confetti 1s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        treeGrow: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        leafShimmer: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1', filter: 'brightness(1.2)' },
        },
        branchExtend: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(252, 211, 77, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(252, 211, 77, 0.8)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
