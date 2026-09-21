import fs from 'fs/promises'
import path from 'path'

export default function checkDir(dir) {
  const guessPath = path.resolve(process.cwd(), dir)
  fs.mkdir(guessPath, { recursive: true })
}
