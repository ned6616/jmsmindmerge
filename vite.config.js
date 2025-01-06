import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/jms/', // Ensure all assets are loaded from the /jms path
});
