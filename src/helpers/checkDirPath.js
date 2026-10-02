import fs from 'fs/promises'
import debug from 'debug'
const debugPageLoader = debug('page-loader')

export default async function checkDirPath(path) {
  try {
    await fs.access(path)
    return true
  }
  catch (error) {
    debugPageLoader(`Вот не такого пути и мы возвращаем false ${error}`)
    return false
  }
}
