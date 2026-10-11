import { Listr } from 'listr2'
import tasksBuilder from './tasksBuilder.js'
import debug from 'debug'
const debugPageLoader = debug('page-loader')
import chalk from 'chalk'

export default function tasksRunner(rightNameLinks) {
  const tasks = tasksBuilder(rightNameLinks)
  const queueTasks = new Listr(tasks, {
    concurrent: true,
  })
  return queueTasks.run().then(() => {
    debugPageLoader(chalk.blue(`All tasks completed successfully!`))
  })
}
