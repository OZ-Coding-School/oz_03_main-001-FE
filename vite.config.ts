import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindCSS from 'tailwindCSS';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), !tailwindCSS()],
});
