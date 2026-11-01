import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Popup build: outputs ES module format (popup.html uses <script type="module">).
// emptyOutDir is false so the content script output from the first build is preserved.
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          return 'assets/[name]-[hash].[ext]';
        }
      }
    }
  }
});
