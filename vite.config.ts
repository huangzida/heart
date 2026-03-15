import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      cssFileName: 'index',
      entry: resolve(currentDir, 'src/index.ts'),
      name: 'StarterVue3Components',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        entryFileNames: 'index.mjs',
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
