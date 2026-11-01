import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Content script build: outputs a single self-contained IIFE file.
// Chrome injects content_scripts as classic (non-module) scripts, so
// ES module syntax (import/export) is not allowed.  Using "iife" format
// and inlineDynamicImports ensures everything is bundled into one file
// with no import statements.
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/content.js')
      },
      output: {
        format: 'iife',
        entryFileNames: 'content.js',
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'content.css' || assetInfo.name === 'overlay.css') {
            return 'overlay.css';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    }
  }
});
