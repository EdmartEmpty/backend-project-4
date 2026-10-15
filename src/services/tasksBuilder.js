import http from '../helpers/http.js'
import fs from 'fs/promises'
import debug from 'debug'
import chalk from 'chalk'

const debugPageLoader = debug('page-loader')

export default function tasksBuilder(links) {
  const tasks = []
  for (const [rightUrlLink, localPathName] of links) {
    const task = {
      title: rightUrlLink.toString(),
      task: () => {
        return http.get(rightUrlLink, 'arraybuffer')
          .then((response) => {
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
