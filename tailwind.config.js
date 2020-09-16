/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        'light-theme-gray': '#edf2f7',
        'light-button-gray': '#edf2f7',
        'light-font': '#474747',
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        'light-card':
          '12px 12px 16px 0 rgba(255, 255, 255, 0.3), -8px -8px 12px 0 rgba(0, 0, 0, .25)',
        'light-button':
          '6px 6px 10px 0 rgba(255, 255, 255, 0.25), -4px -4px 8px 0 rgba(0, 0, 0, .25)',
        'light-input':
          'inset 6px 6px 10px 0 rgba(255, 255, 255, 0.25), inset -4px -4px 8px 0 rgba(0, 0, 0, .25)',
      },
      height: {
        card: '300px',
        button: '40px',
        input: '2.25rem',
      },
      width: {
        card: '250px',
        button: '150px',
      },
    },
    backgroundColor: (theme) => ({
      default: '#edf2f7',
    }),
  },
  variants: {
    boxShadow: ['active'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
