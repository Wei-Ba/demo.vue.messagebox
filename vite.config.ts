import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { relative, join } from 'path'

const normalizePath = (path: string) => path.replace(/\\{1,2}/g, '/')
const createTsConfigPaths = (alias: Record<string, string>, basePath?: string) => {
  const tsconfigPaths: Record<string, string[]> = Object.create(null)
  for (const [name, path] of Object.entries(alias)) {
    let resolvePath = basePath ? relative(basePath, path) : path
    resolvePath ||= '.'
    if (!name.endsWith('*')) tsconfigPaths[normalizePath(join(name, '*'))] = [normalizePath(join(resolvePath, '*'))]
    if (name !== '@') tsconfigPaths[name] = [resolvePath]
  }
  return JSON.stringify(tsconfigPaths, null, 2)
}
const createPath = (...base: string[]) => {
  return (...paths: string[]) => fileURLToPath(
    new URL(base.concat(paths).join('/'), import.meta.url)
  )
}
const src = createPath('src')
const typings = createPath('typings')

const alias = {
  '@': src(),
  '@components': src('components'),
  '@views': src('views'),
  '@utils': src('utils')
}
console.log(createTsConfigPaths(alias, src()))
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias
  },
  plugins: [vue()],
})
