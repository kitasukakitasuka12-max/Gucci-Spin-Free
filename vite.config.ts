import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vercel defaults to looking for a "build" folder for React projects.
    // Vite defaults to "dist", so we change it here to match Vercel.
    outDir: 'build', 
  },
});
