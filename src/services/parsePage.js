import * as cheerio from 'cheerio'
import transformHtmlLinks from './transformHtmlLinks.js'

export default function parsePage(dataFromResponce, address, pathFiles) {
  const $ = cheerio.load(dataFromResponce)

  const links = []
  const elementType = { img: 'src',
    link: 'href',
    script: 'src',
  }
  for (const [tag, attr] of Object.entries(elementType)) {
    links.push(...transformHtmlLinks(tag, attr, $, address, pathFiles))
  }
  return {
    links,
    html: $.html(),
  }
}
