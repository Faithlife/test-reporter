import {normalizeFilePath} from './path-utils'

export const DEFAULT_LOCALE = 'en-US'

export function getExceptionSource(
  stackTrace: string,
  trackedFiles: string[]
): {path: string; line: number} | undefined {
  const lines = stackTrace.split(/\r?\n/)
  const patterns = [/\((.*):(\d+):\d+\)$/, / in (.+):line (\d+)$/]

  for (const str of lines) {
    for (const re of patterns) {
      const match = str.match(re)
      if (match !== null) {
        const [_, fileStr, lineStr] = match
        const filePath = normalizeFilePath(fileStr)
        if (filePath.startsWith('internal/') || filePath.includes('/node_modules/')) {
          continue
        }
        const path = trackedFiles
          .filter(file => filePath.endsWith(file))
          .sort((a, b) => b.length - a.length)
          .at(0)
        if (!path) {
          continue
        }
        const line = parseInt(lineStr)

        return {path, line}
      }
    }
  }
}
