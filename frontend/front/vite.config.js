import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default {
  // other config options...
  server: {
    proxy: {
      '/contacts': 'http://localhost:8000',
      '/contacts': 'https://contact-app-5czc.onrender.com',
    },
  },
};
