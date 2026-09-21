import axios from 'axios'
import fs from 'fs/promises'
import * as cheerio from 'cheerio'
import getPath from './getPath.js'

async function getPage(url, output) {
  const fullPath = await getPath(url, output)
  const page = await axios({
    method: 'get',
    url,
    responseType: 'text',
  })

  const $ = cheerio.load(page.data)
  $('img').each((i, el) => {
    console.log(`Это i: ${i}}` + '\n' + `Это el: ${$(el).attr('src')}`)
  })
  await fs.writeFile(fullPath, $('html').html())
}

export default getPage
