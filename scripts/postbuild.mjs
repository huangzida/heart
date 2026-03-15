import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const declarationPath = 'dist/index.d.ts'
const declarationMtsPath = 'dist/index.d.mts'
const stylePath = 'dist/index.css'
const legacyStylePath = 'dist/styles.css'

if (existsSync(declarationPath)) {
  const declarationContent = readFileSync(declarationPath, 'utf8')
  const normalizedContent = declarationContent
    .replace('import \'./styles.css\';\n', '')
    .replace('import \'./index.css\';\n', '')
  writeFileSync(declarationMtsPath, normalizedContent, 'utf8')
  rmSync(declarationPath, { force: true })
}

if (existsSync(stylePath))
  rmSync(stylePath, { force: true })

if (existsSync(legacyStylePath))
  rmSync(legacyStylePath, { force: true })
