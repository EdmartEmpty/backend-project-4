import getRightName from '../helpers/getRightName.js'
import path from 'path'
import debug from 'debug'
import chalk from 'chalk'
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

    const rightNameLink = getRightName(link, '.html', address)
    const localPathName = path.join(pathFiles, rightNameLink)

    page(el).attr(attrName, `${getRightName(address, '_files')}/${rightNameLink}`)
    debugPageLoader(`Updated attribute for tag ${elementType} to ${getRightName(address, '_files')}/${rightNameLink}`)
    rightNameLinks.push([rightUrlLink, localPathName])
  })

  return rightNameLinks
}
