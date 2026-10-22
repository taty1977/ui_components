import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    lib: {
      entry: { index: 'src/index.ts', styles: 'global.css' },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}${format === 'es' ? '.esm.js' : '.cjs'}`,
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom|@heroicons\/react|recharts)(\/|$)/.test(id),
    },
  },
});
