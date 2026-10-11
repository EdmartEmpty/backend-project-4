import axios from 'axios'
import { addLogger } from 'axios-debug-log'
import fs from 'fs/promises'
import debug from 'debug'
const debugPageLoader = debug('page-loader')
import chalk from 'chalk'

addLogger(axios)

export default function tasksBuilder(rightNameLinks) {
  const tasks = []
  for (let [rightUrlLink, localPathName] of rightNameLinks) {
    const task = {
      title: rightUrlLink.toString(),
      task: () => {
        return axios({
          method: 'get',
          url: rightUrlLink,
          responseType: 'arraybuffer',
        }).then((response) => {
          debugPageLoader(chalk.green(`Created a new task for URL:${rightUrlLink}`))
          return fs.writeFile(localPathName, response.data)
        }).then(() => debugPageLoader(chalk.green(`Successfully wrote file to: ${localPathName}`)))
          .catch((e) => {
            debugPageLoader(chalk.red(`Task failed for ${rightUrlLink}: ${e.message}`))
            throw e
          })
      },
    }
    tasks.push(task)
  }
  return tasks
}
