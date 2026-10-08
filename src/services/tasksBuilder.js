import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('axios-debug-log')
const axios = require('axios')
import fs from 'fs/promises'
import debug from 'debug'
const debugPageLoader = debug('page-loader')
import chalk from 'chalk'

export default function tasksBuilder(rightNameLinks) {
  const tasks = []
  for (let [rightUrlLink, localPathName] of rightNameLinks) {
    const task = {
      title: rightUrlLink.toString(),
      exitOnError: false,
      task: async () => {
        const response = await axios({
          method: 'get',
          url: rightUrlLink,
          responseType: 'arraybuffer',
        })
        debugPageLoader(chalk.green(`Created a new task for URL:${rightUrlLink}`))
        await fs.writeFile(localPathName, response.data)
      },
    }
    tasks.push(task)
  }
  return tasks
}
