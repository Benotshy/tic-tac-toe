import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tic-tac-toe/', // Add this line
  plugins: [react()],
});