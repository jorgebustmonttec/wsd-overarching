const skeleton = require('@skeletonlabs/skeleton/tailwind/skeleton.cjs');

module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@skeletonlabs/skeleton/**/*.svelte',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    ...skeleton(),
  ],
};
