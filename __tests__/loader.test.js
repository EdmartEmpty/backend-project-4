import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('axios-debug-log')

import { test, expect, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import loader from '../src/loader.js'
import os from 'os'
import nock from 'nock'
import getRightName from '../src/getRightName.js'

nock.disableNetConnect()

let tempDirPath
beforeEach(async () => {
  tempDirPath = await fs.mkdtemp(path.join(os.tmpdir()))
})
test('Test loader picture', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, `
<!DOCTYPE html>
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
  nock('https://ru.hexlet.io').get('/assets/professions/nodejs.png').reply(200, Buffer.from('fake-image-binary'))
  const url = 'https://ru.hexlet.io/courses'
  const pathTemPage = path.join(tempDirPath, getRightName(url, '.html'))
  await loader(url, tempDirPath)

  const fileFromUnreall = await fs.readFile(pathTemPage, 'utf-8')
  const fileFromFixtures = await fs.readFile(`${process.cwd()}/__fixtures__/ru-hexlet-io-courses.html`, 'utf-8')

  expect(fileFromUnreall).toEqual(fileFromFixtures)
})

test('Test loader picture', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, `
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Курсы по программированию Хекслет</title>
    <link rel="stylesheet" media="all" href="https://cdn2.hexlet.io/assets/menu.css">
    <link rel="stylesheet" media="all" href="/assets/application.css" />
    <link href="/courses" rel="canonical">
  </head>
  <body>
    <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
    <h3>
      <a href="/professions/nodejs">Node.js-программист</a>
    </h3>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://ru.hexlet.io/packs/js/runtime.js"></script>
    </body>
</html>`)

  nock('https://ru.hexlet.io')
    .get('/assets/professions/nodejs.png')
    .reply(200, Buffer.from('fake-image-binary'))

  nock('https://ru.hexlet.io')
    .get('/assets/application.css')
    .reply(200, Buffer.from('fake-css-binary'))

  nock('https://ru.hexlet.io')
    .get('/packs/js/runtime.js')
    .reply(200, Buffer.from('fake-js-binary'))

  nock('https://cdn2.hexlet.io')
    .get('/assets/menu.css')
    .reply(200, Buffer.from('fake-css-binary'))

  nock('https://js.stripe.com')
    .get('/v3')
    .reply(200, Buffer.from('fake-js-binary'))

  const url = 'https://ru.hexlet.io/courses'
  const pathTemPage = path.join(tempDirPath, getRightName(url, '.html'))

  await loader(url, tempDirPath)

  const fileFromUnreall = await fs.readFile(pathTemPage, 'utf-8')
  const fileFromFixtures = await fs.readFile(path.join(process.cwd(), '__fixtures__', 'ru-hexlet-io2-courses.html'), 'utf-8')

  expect(fileFromUnreall).toEqual(fileFromFixtures)
})
test('test Invalid Url on loader', () => {
  expect(async () => await loader('Invalid Url')).rejects.toThrow('Ввведен не существующий адрес')
})
test('cannot write in directory test', async () => {
  await fs.chmod(tempDirPath, '100')
  nock('http://www.example.com').get('/').reply(200)

  await expect(loader('http://www.example.com', tempDirPath)).rejects.toThrow('ошибка директории')
})

test('bad status server', async () => {
  nock.disableNetConnect()
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(401)

  await expect(loader('https://ru.hexlet.io/courses', tempDirPath)).rejects.toThrow()
})
