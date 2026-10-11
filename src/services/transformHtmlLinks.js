import path from 'path'
import debug from 'debug'
import chalk from 'chalk'
import { getAssetName, getAssetsDir, getPageName } from '../helpers/fileName.js'
const debugPageLoader = debug('page-loader')

export default function transformHtmlLinks(elementType, attrName, page, address, pathFiles) {
  debugPageLoader(chalk.red(`Started processing tag:${elementType}`))

  const rightNameLinks = []
  page(elementType).each((i, el) => {
    const link = page(el).attr(attrName)
    if (!link) {
      return
    }

    const rightUrlLink = new URL(link, address)
    if (rightUrlLink.origin !== new URL(address).origin) {
      debugPageLoader(`Skipped URL ${rightUrlLink}: external resource detected`)
      return
    }

    const rightNameLink = attrName === 'href' ? getPageName(new URL(rightUrlLink)) : getAssetName(new URL(rightUrlLink))
    const localPathName = path.join(pathFiles, rightNameLink)
    const asserDirName = getAssetsDir(address)

    page(el).attr(attrName, `${asserDirName}/${rightNameLink}`)
    debugPageLoader(`Updated attribute for tag ${elementType} to ${asserDirName}/${rightNameLink}`)
    rightNameLinks.push([rightUrlLink, localPathName])
  })

  return rightNameLinks
}
