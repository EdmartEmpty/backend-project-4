import nock from 'nock'
import tasksBuilder from '../src/services/tasksBuilder.js'
import { expect, test } from '@jest/globals'

nock.disableNetConnect()

nock('https://ru.hexlet.io')
  .get('/courses')
  .reply(401, 'Error')

test('Test taskBuilder error task', async () => {
  const arr = ['https://ru.hexlet.io', 'localPathName']
  const [task] = tasksBuilder(arr)
  await expect(task.task()).rejects.toThrow()
})
