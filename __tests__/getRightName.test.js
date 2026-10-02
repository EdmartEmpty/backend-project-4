import 'axios-debug-log'
import { test, expect } from '@jest/globals'
import getRightName from '../src/getRightName.js'

test('Test name website', async () => {
  const url = 'https://ru.hexlet.io/courses'

  const result = await getRightName(url, '')
  expect(result).toEqual('ru-hexlet-io-courses')
})

test('Test name path files', async () => {
  const url = 'https://ru.hexlet.io/courses'

  const result = await getRightName(url, '_files')
  expect(result).toEqual('ru-hexlet-io-courses_files')
})
