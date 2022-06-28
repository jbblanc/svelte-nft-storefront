import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  optimizeDeps: { include: ['ethers'] },

  preprocess: preprocess({
    preserve: ['ld+json'],
    postcss: true,
  }),

  kit: {
    adapter: vercel(),
  },
};

export default config;
