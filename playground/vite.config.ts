import { dirname, resolve } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const currentDir = dirname(fileURLToPath(import.meta.url))
const repositoryName = env.GITHUB_REPOSITORY?.split('/')[1]
const base = env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/'

export default defineConfig({
  base,
  root: currentDir,
  plugins: [
    tailwindcss(),
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: 'starter-vue3',
        replacement: resolve(currentDir, '../dist/index.mjs'),
      },
      {
        find: '@',
        replacement: resolve(currentDir, '../src'),
      },
    ],
  },
})
