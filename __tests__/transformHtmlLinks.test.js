import * as cheerio from 'cheerio'
import transformHtmlLinks from '../src/services/transformHtmlLinks.js'
import { test, expect } from '@jest/globals'

test('Transform links test', () => {
  const $ = cheerio.load(`<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Курсы по программированию Хекслет</title>
  </head>
  <body>
    <img src="" alt="Иконка профессии Node.js-программист" />
    <h3>
      <a href="/professions/nodejs">Node.js-программист</a>
    </h3>
  </body>
</html>`)
  expect(transformHtmlLinks('img', 'src', $, 'https://ru.hexlet.io', 'pathFiles')).toEqual([])
})
