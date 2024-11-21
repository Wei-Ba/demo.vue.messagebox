import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { relative, join } from 'path'

const normalizePath = (path: string) => path.replace(/\\{1,2}/g, '/')

const quote = (value: string) => `"${value}"`

function formatJson(str: string): string
function formatJson(obj: object): string
function formatJson(value: string | object) {
  if (typeof value === 'string') value = JSON.parse(value)
  value = value as object
  const indent = 2
  const cache = new WeakSet()
  const wrapper = (val: string, level: number) => {
    return `${' '.repeat(level * indent)}${val}`
  }
  const stringify = (val: unknown, level: number) => {
    // json 数值
    if (typeof val === 'string') return wrapper(quote(val), level)
    if (typeof val === null || typeof val === 'boolean' || typeof val === 'number') return wrapper(String(val), level)
    if (typeof val === 'object') {
      if (cache.has(val as object)) throw new Error('Converting circular structure to JSON')
      cache.add(val as object)
      if (Array.isArray(val)) {
        const newline = val.length > 2 && val.some(v => v === null && typeof v !== 'object')
        const v: string = val.map<string>((child) => stringify(child, newline ? level + 1 : 0)).join(newline ? ',\n' : ', ')
        return `[${newline ? '\n' : ' '}${v}${newline ? wrapper(']', level) : ' ]'}`
      } else {
        const entries = Object.entries(val as object)
        const v: string = entries.map<string>(([key, child]) => {
          return `${wrapper(quote(key), level + 1)}: ${stringify(child, level + 1)}`
        }).join(',\n')
        return `{\n${v}\n${wrapper('}', level)}`
      }
    }
    throw new TypeError(`Unsupported value: ${val}`)
  }

  return stringify(value, 0)
}

const createTsConfigPaths = (alias: Record<string, string>, basePath?: string) => {
  const tsconfigPaths: Record<string, string[]> = Object.create(null)
  for (const [name, path] of Object.entries(alias)) {
    let resolvePath = basePath ? relative(basePath, path) : path
    resolvePath ||= '.'
    if (!name.endsWith('*')) tsconfigPaths[normalizePath(join(name, '*'))] = [normalizePath(join(resolvePath, '*'))]
    if (name !== '@') tsconfigPaths[name] = [resolvePath]
  }
  return formatJson(tsconfigPaths)
}
const createPath = (...base: string[]) => {
  return (...paths: string[]) => fileURLToPath(
    new URL(base.concat(paths).join('/'), import.meta.url)
  )
}
const src = createPath('src')
const typings = createPath('typings')

const alias = {
  '@components': src('components'),
  '@views': src('views'),
  '@utils': src('utils'),
  '@': src()
}
console.log(createTsConfigPaths(alias, src()))
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias
  },
  plugins: [vue()],
})
