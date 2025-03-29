import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { Plugin } from 'vite'

// Custom plugin to inject metadata based on route
const injectMetadataPlugin = (): Plugin => {
  return {
    name: 'inject-metadata',
    transformIndexHtml(html, ctx) {
      // Base metadata for all pages
      const baseMetadata = `
    <meta property="og:title" content="77-Bit Guides">
    <meta property="og:description" content="Community-created guides for the 77-Bit game. Learn useful tips, game data, mechanics, and more.">
    <meta property="og:image" content="https://guides.77-bit.wiki/images/77bit_wiki.png">
    <meta property="og:url" content="https://guides.77-bit.wiki">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="77-Bit Guides">
    <meta name="twitter:description" content="Community-created guides for the 77-Bit game. Learn useful tips, game data, mechanics, and more.">
    <meta name="twitter:image" content="https://guides.77-bit.wiki/images/77bit_wiki.png">`;

      // If in build mode and generating the main index.html
      if (ctx.chunk?.isEntry) {
        return html.replace('<!-- Base metadata - will be updated during build -->', baseMetadata);
      }
      return html;
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    injectMetadataPlugin()
  ],
  // Base path for GitHub Pages - change to your repo name or custom domain
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
})
