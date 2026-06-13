import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Security configurations
  build: {
    // Disable source maps in production to prevent information disclosure
    sourcemap: false,
    
    // Minify build output to reduce attack surface
    minify: 'terser',
    
    // Use terser with compression options
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
      mangle: true, // Mangle variable names for obfuscation
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    
    // Rollup options for security
    rollupOptions: {
      output: {
        // Prevent external script injection
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation': ['framer-motion', 'motion', 'gsap', 'lenis'],
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

