import fs from 'fs'
import { defineConfig } from 'tsup'
import path from 'path'
import fg from 'fast-glob'

const files = fg.sync(['src/**/*.ts']).filter((f) => !/(spec|.d.ts|tests)/.test(f))

const indexExports = files
    .filter((f) => !/index.ts/.test(f))
    .map((f) => f.replace('src/', '').replace('.ts', ''))
    .map((f) => `export * from './${f}'`)
    .join('\n\n')

fs.writeFileSync(
    path.resolve(__dirname, 'src/index.ts'),
    ['// auto generated\n\n', indexExports, '\n'].join('')
)

files.push('src/index.ts')

export default defineConfig({
    entry: files,
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['esm', 'cjs'],
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
})
