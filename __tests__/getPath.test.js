import { test, expect } from '@jest/globals'
import os from 'os'
import getPath from '../src/getPath.js'

test('Test getPath', async () => {
  const url = 'https://ru.hexlet.io/courses'
  const notRealPath = os.tmpdir()
  const result = await getPath(url, notRealPath)
  expect(result).toEqual(`${notRealPath}/ru-hexlet-io-courses.html`)
})
