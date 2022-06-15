const varToHsla =
  (colorValue) =>
  ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${colorValue}), ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `hsla(var(${colorValue}), var(${opacityVariable}, 1))`
    }
    return `hsl(var(${colorValue}))`
  }

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      white: 'white',
      dark: 'hsla(225, 24%, 25%, 1)',

      base: {
        0: varToHsla('--base-0'),
        100: varToHsla('--base-100'),
        200: varToHsla('--base-200'),
        300: varToHsla('--base-300'),
        400: varToHsla('--base-400'),
        500: varToHsla('--base-500'),
        600: varToHsla('--base-600'),
        700: varToHsla('--base-700'),
        800: varToHsla('--base-800'),
        900: varToHsla('--base-900'),
      },
      primary: {
        100: varToHsla('--primary-100'),
        200: varToHsla('--primary-200'),
        300: varToHsla('--primary-300'),
        400: varToHsla('--primary-400'),
        500: varToHsla('--primary-500'),
        600: varToHsla('--primary-600'),
        700: varToHsla('--primary-700'),
        800: varToHsla('--primary-800'),
        900: varToHsla('--primary-900'),
      },
      secondary: {
        100: varToHsla('--secondary-100'),
        200: varToHsla('--secondary-200'),
        300: varToHsla('--secondary-300'),
        400: varToHsla('--secondary-400'),
        500: varToHsla('--secondary-500'),
        600: varToHsla('--secondary-600'),
        700: varToHsla('--secondary-700'),
        800: varToHsla('--secondary-800'),
        900: varToHsla('--secondary-900'),
      },
      tertiary: {
        100: varToHsla('--tertiary-100'),
        200: varToHsla('--tertiary-200'),
        300: varToHsla('--tertiary-300'),
        400: varToHsla('--tertiary-400'),
        500: varToHsla('--tertiary-500'),
        600: varToHsla('--tertiary-600'),
        700: varToHsla('--tertiary-700'),
        800: varToHsla('--tertiary-800'),
        900: varToHsla('--tertiary-900'),
      },
      intermediate: {
        100: varToHsla('--intermediate-100'),
        200: varToHsla('--intermediate-200'),
        300: varToHsla('--intermediate-300'),
        400: varToHsla('--intermediate-400'),
        500: varToHsla('--intermediate-500'),
        600: varToHsla('--intermediate-600'),
        700: varToHsla('--intermediate-700'),
        800: varToHsla('--intermediate-800'),
        900: varToHsla('--intermediate-900'),
      },
      accent: {
        100: varToHsla('--accent-100'),
        200: varToHsla('--accent-200'),
        300: varToHsla('--accent-300'),
        400: varToHsla('--accent-400'),
        500: varToHsla('--accent-500'),
        600: varToHsla('--accent-600'),
        700: varToHsla('--accent-700'),
        800: varToHsla('--accent-800'),
        900: varToHsla('--accent-900'),
      },
      success: {
        100: varToHsla('--success-100'),
        200: varToHsla('--success-200'),
        300: varToHsla('--success-300'),
        400: varToHsla('--success-400'),
        500: varToHsla('--success-500'),
        600: varToHsla('--success-600'),
        700: varToHsla('--success-700'),
        800: varToHsla('--success-800'),
        900: varToHsla('--success-900'),
      },
      warning: {
        100: varToHsla('--warning-100'),
        200: varToHsla('--warning-200'),
        300: varToHsla('--warning-300'),
        400: varToHsla('--warning-400'),
        500: varToHsla('--warning-500'),
        600: varToHsla('--warning-600'),
        700: varToHsla('--warning-700'),
        800: varToHsla('--warning-800'),
        900: varToHsla('--warning-900'),
      },
      caution: {
        100: varToHsla('--caution-100'),
        200: varToHsla('--caution-200'),
        300: varToHsla('--caution-300'),
        400: varToHsla('--caution-400'),
        500: varToHsla('--caution-500'),
        600: varToHsla('--caution-600'),
        700: varToHsla('--caution-700'),
        800: varToHsla('--caution-800'),
        900: varToHsla('--caution-900'),
      },
      alert: {
        100: varToHsla('--alert-100'),
        200: varToHsla('--alert-200'),
        300: varToHsla('--alert-300'),
        400: varToHsla('--alert-400'),
        500: varToHsla('--alert-500'),
        600: varToHsla('--alert-600'),
        700: varToHsla('--alert-700'),
        800: varToHsla('--alert-800'),
        900: varToHsla('--alert-900'),
      },
    },

    fontFamily: {
      body: [
        'Inter var',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      headings: ['Red Hat Display'],
    },

    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      circle: 'circle',
    },

    extend: {
      boxShadow: {
        underline: '0px 2px 0 0 currentColor',
        image: 'inset 0px 0px 0px 3px hsl(0deg 0% 0% / 15%)',
        post: 'inset 0px 0px 0px 1.5px hsl(var(--base-400))',
        'post-hover': 'inset 0px 0px 0px 4px hsl(var(--primary-500))',
      },
      keyframes: {
        'slide-left': {
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 60s linear infinite',
      },
      backgroundImage: (theme) => ({
        'wave-pattern': 'url(/images/wave.svg)',
        'low-poly': 'url(/images/low-poly-bg.svg)',
        'diagonal-lines': 'url(/images/diagonal-lines.svg)',
        'hero-waves': 'url(/images/hero-waves.svg)',
        'fade-in-out':
          'linear-gradient(to right,rgba(255, 255, 255, 1) 0%,rgba(255, 255, 255, 0) 10%,rgba(255, 255, 255, 0) 90%,rgba(255, 255, 255, 1) 100%)',
        'dark-fade-in-out':
          'linear-gradient(to right,hsl(var(--base-0)) 0%,hsla(var(--base-700), 0) 10%,hsla(var(--base-700), 0) 90%,hsl(var(--base-0)) 100%)',
      }),
      backgroundSize: (theme) => ({
        'diagonal-lines': '6px 6px',
        'hero-waves': '2200px',
        'low-poly': '550px',
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'inherit',
            // ...
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tailwindcss-multi-column')(),
    plugin(function ({ addVariant }) {
      // Add a `tab-active` variant
      addVariant('tab-active', '&[data-state="active"]')
    }),
  ],
}
