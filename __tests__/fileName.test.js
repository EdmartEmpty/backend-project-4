import 'axios-debug-log'
import { test, expect, describe } from '@jest/globals'
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
  test('Test name path files', () => {
    const url = new URL('/assets/application.css', 'https://ru.hexlet.io/courses')
    const result = getAssetName(url)
    expect(result).toEqual('ru-hexlet-io-assets-application.css')
  })
  test.each([['/assets/application.css', 'ru-hexlet-io-assets-application.css'],
    ['/assets/application', 'ru-hexlet-io-assets-application'],
  ])(`test from arr %p for %s`, (url, modernString) => {
    const urlParse = new URL(url, 'https://ru.hexlet.io/courses')
    const result = getAssetName(urlParse)
    expect(result).toEqual(modernString)
  })
})
