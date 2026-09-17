import axios from 'axios'
import * as cheerio from 'cheerio'
async function showInside(url) {
  const inside = await axios.get(url)
  const $ = cheerio.load(inside.data)
  console.log($('h1').text())
}

showInside('https://ria.ru/')
