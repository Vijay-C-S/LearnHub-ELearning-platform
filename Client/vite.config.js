import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
    // Code splitting configuration for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for larger dependencies
          vendor: ['react', 'react-dom', 'react-router-dom'],
          bootstrap: ['bootstrap', 'react-bootstrap'],
          charts: ['chart.js', 'react-chartjs-2'],
        },
        // Optimize chunk names
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps only in development
    sourcemap: process.env.NODE_ENV === 'development',
  },
  server: {
    // Development server settings
    port: 5173,
    open: true,
  },
})
