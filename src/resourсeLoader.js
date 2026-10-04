import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('axios-debug-log')
const axios = require('axios')
import fs from 'fs/promises'
import getRightName from './getRightName.js'
import path from 'path'
import debug from 'debug'
import chalk from 'chalk'
const debugPageLoader = debug('page-loader')

export default function resourceLoader(tegName, attrName, page, adress, pathFiles) {
  debugPageLoader(chalk.red(`Вот тут значит начали обрабатывать такой вот тег:${tegName}`))
  const arrTasks = []
  page(tegName).each((i, el) => {
    const link = page(el).attr(attrName)
    if (!link) {
      return
    }

    const rightUrlLink = new URL(link, adress)
    const extLink = path.extname(link)
    if (rightUrlLink.origin !== new URL(adress).origin) {
      return
    }

    const rightNameLink = getRightName(link, '.html', adress)
    // const localPathName = `${pathFiles}/${rightNameLink}`
    const localPathName = path.join(pathFiles, rightNameLink)

    page(el).attr(attrName, `${getRightName(adress, '_files')}/${rightNameLink}`)

    // if (extLink === '') {
    //   return
    // }

    const task = {
      title: rightUrlLink.toString(),
      exitOnError: false,
      task: async () => {
        const response = await axios({
          method: 'get',
          url: rightUrlLink,
          responseType: 'arraybuffer',
        })
        debugPageLoader(chalk.green('Вот тут создалась новая задача'))
        await fs.writeFile(localPathName, response.data)
      },
    }

    arrTasks.push(task)
  })

  return arrTasks
}
