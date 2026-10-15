import fs from 'fs/promises'
import path from 'path'
import { getAssetsDir, getPageName } from '../helpers/fileName.js'
import debug from 'debug'

const debugPageLoader = debug('page-loader')

export default function initStorage(output, address) {
  const outputPath = path.resolve(output)
  const nameHtmlFile = getPageName(address)
  const pathPageHtml = path.join(outputPath, nameHtmlFile)
  const pathFiles = path.join(outputPath, getAssetsDir(address))

  return fs.access(outputPath, fs.constants.W_OK).catch((error) => {
    debugPageLoader(`Target directory not found or unreachable: ${error.message}`)
    throw error
  }).then(() => {
    return fs.mkdir(pathFiles, { recursive: true })
  }).catch((error) => {
    debugPageLoader(`Failed to create assets directory: ${error.message}`)
    throw error
  }).then(() => ({ pathPageHtml, pathFiles }))
}
