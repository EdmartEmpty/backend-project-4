import fs from 'fs/promises'
import path from 'path'
import getRightName from '../helpers/getRightName.js'
import debug from 'debug'
const debugPageLoader = debug('page-loader')

export default async function initStorage(output, address) {
  const outputPath = path.resolve(output)

  try {
    await fs.access(outputPath, fs.constants.W_OK)
  }
  catch (error) {
    debugPageLoader(`Target directory not found or unreachable: ${error.message}`)
    throw error
  }

  const nameHtmlFile = getRightName(address, '.html')
  const pathPageHtml = path.join(outputPath, nameHtmlFile)
  const pathFiles = path.join(outputPath, getRightName(address, '_files'))

  try {
    await fs.mkdir(pathFiles, { recursive: true })
    return { pathPageHtml, pathFiles }
  }
  catch (error) {
    debugPageLoader(`Failed to create assets directory: ${error.message}`)
    throw error
  }
}
