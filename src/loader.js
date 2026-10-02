import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('axios-debug-log')
const axios = require('axios')
import chalk from 'chalk'
import fs from 'fs/promises'
import * as cheerio from 'cheerio'
import path from 'path'
import getRightName from './getRightName.js'
import resourseLoader from './resourсeLoader.js'
import { Listr } from 'listr2'
import debug from 'debug'
const debugPageLoader = debug('page-loader')

export default async function loader(adress, output = process.cwd()) {
  let url
  try {
    url = new URL(adress)
  }
  catch (error) {
    throw new Error('Ввведен не существующий адрес', { cause: error })
  }

  let response
  try {
    response = await axios({
      method: 'get',
      url,
      responseType: 'text',
    })
  }
  catch (error) {
    debugPageLoader(`Вот именно такая вот ошибка в запросе к странице ${error}`)

    const status = error.response ? error.response.status : error
    debugPageLoader(`Вот именно такой статус ${error.status}`)

    throw new Error(`Ошбика со стороны сервера: статус ошибки ${status}`, { cause: error })
  }

  const outputPath = path.resolve(output)
  await fs.mkdir(outputPath, { recursive: true })
  try {
    await fs.access(outputPath, fs.constants.W_OK)
  }
  catch (error) {
    debugPageLoader(`случилось ошибка вот тут именно вот такая ${error}`)
    throw new Error('ошибка директории', { cause: error })
  }

  const nameHtmlFile = getRightName(adress, '.html')
  const pathPageHtml = path.join(outputPath, nameHtmlFile)

  const pathFiles = path.join(output, getRightName(adress, '_files'))

  await fs.mkdir(pathFiles, { recursive: true })

  const $ = cheerio.load(response.data)

  const arrTasks = []
  const tegObject = { img: 'src',
    link: 'href',
    script: 'src',
  }

  for (let [teg, attr] of Object.entries(tegObject)) {
    arrTasks.push(...resourseLoader(teg, attr, $, adress, pathFiles))
  }

  const queueTasks = new Listr(arrTasks, {
    concurrent: true,
  })

  debugPageLoader(chalk.blue('start queue Taks All'))

  await queueTasks.run()
  console.log(`Page was successfully downloaded into '${pathPageHtml}'`)
  await fs.writeFile(pathPageHtml, $.html())
}
