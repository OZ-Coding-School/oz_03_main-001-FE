import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindCSS from 'tailwindCSS';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins: [tailwindCSS, autoprefixer] } },
});
