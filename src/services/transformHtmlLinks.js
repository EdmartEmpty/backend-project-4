import path from 'path'
import debug from 'debug'
import chalk from 'chalk'
import { getAssetName, getAssetsDir, getPageName } from '../helpers/fileName.js'
const debugPageLoader = debug('page-loader')

export default function transformHtmlLinks(elementType, attrName, selector, address, pathFiles) {
  debugPageLoader(chalk.red(`Started processing tag:${elementType}`))

  const links = []
  const asserDirName = getAssetsDir(address)
  selector(elementType).each((i, el) => {
    const link = selector(el).attr(attrName)
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

    selector(el).attr(attrName, `${asserDirName}/${rightNameLink}`)
    debugPageLoader(`Updated attribute for tag ${elementType} to ${asserDirName}/${rightNameLink}`)
    links.push([rightUrlLink, localPathName])
  })

  return links
}
