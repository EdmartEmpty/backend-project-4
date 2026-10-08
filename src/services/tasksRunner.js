import { Listr } from 'listr2'
import tasksBuilder from './tasksBuilder.js'
import debug from 'debug'
const debugPageLoader = debug('page-loader')
import chalk from 'chalk'

export default async function tasksRunner(rightNameLinks) {
  const tasks = tasksBuilder(rightNameLinks)
  const queueTasks = new Listr(tasks, {
    concurrent: true,
  })
  await queueTasks.run()
  debugPageLoader(chalk.blue(`All tasks completed successfully!`))
}
