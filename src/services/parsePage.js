import * as cheerio from 'cheerio'
import transformHtmlLinks from './transformHtmlLinks.js'

export default function parsePage(dataFromResponce, address, pathFiles) {
  const $ = cheerio.load(dataFromResponce)

  const rightNameLinks = []
  const elementType = { img: 'src',
    link: 'href',
    script: 'src',
  }
  for (let [tag, attr] of Object.entries(elementType)) {
    rightNameLinks.push(...transformHtmlLinks(tag, attr, $, address, pathFiles))
  }
  const parseHtmlPage = $.html()
  return [rightNameLinks, parseHtmlPage]
}
