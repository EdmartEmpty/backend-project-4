import { test, expect, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import getPage from '../src/getPage.js'
import getPath from '../src/getPath.js'
import os from 'os'
import nock from 'nock'

nock('https://ru.hexlet.io')
  .get('/courses')
  .reply(200, `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Курсы по программированию Хекслет</title>
  </head>
  <body>
    <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
    <h3>
      <a href="/professions/nodejs">Node.js-программист</a>
    </h3>
  </body>
</html>`)
let tempDirPath
beforeEach(async () => {
  tempDirPath = await fs.mkdtemp(path.join(os.tmpdir()))
})
test('Test getPage', async () => {
  const url = 'https://ru.hexlet.io/courses'
  const pathForTest = await getPath(url, tempDirPath)

  await getPage(url, tempDirPath)

  const fileFromUnreall = await fs.readFile(pathForTest, 'utf-8')
  const fileFromFixtures = await fs.readFile(`${process.cwd()}/__fixtures__/ru-hexlet-io-courses.html`, 'utf-8')
  expect(fileFromUnreall).toEqual(fileFromFixtures)
})
