import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Security configurations
  build: {
    // Disable source maps in production to prevent information disclosure
    sourcemap: false,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    
    // Rollup options for security
    rollupOptions: {
      output: {
        // Prevent external script injection
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            if (id.includes('framer-motion') || id.includes('motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'animation';
            }
          }
        },
      },
    },
  },
  
  // Server security configuration
  server: {
    // Restrict middleware
    middlewareMode: false,
    
    // CORS configuration
    cors: {
      origin: ['localhost:5173', 'localhost:3000'],
      methods: ['GET', 'HEAD'],
      allowedHeaders: ['Content-Type'],
      credentials: false,
    },
  },
  
  // Preview server configuration
  preview: {
    // CORS for preview
    cors: false,
  },
  
  // Security headers for development
  define: {
    // Prevent exposure of sensitive information
    __DEV__: false,
  },
})

