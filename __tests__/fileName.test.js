import 'axios-debug-log'
import { test, expect } from '@jest/globals'
import { getPageName, getAssetName, getAssetsDir } from '../src/helpers/fileName.js'

describe('fileName tests', () => {
  test('Test name website', () => {
    const url = 'https://ru.hexlet.io/courses'

    const result = getPageName(url)
    expect(result).toEqual('ru-hexlet-io-courses.html')
})

  test('Test name path files', () => {
    const url = 'https://ru.hexlet.io/courses'

    const result = getAssetsDir(url)
    expect(result).toEqual('ru-hexlet-io-courses_files')
  })
})
