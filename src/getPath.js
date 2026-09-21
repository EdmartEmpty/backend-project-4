import path from 'path'
import checkUrl from './helpers/checkUrl.js'
import checkDir from './helpers/checkDir.js'

export default async function getPath(url, output) {
  if (!checkUrl(url)) {
    throw new Error('Не правильно указан адрес!')
  }
  checkDir(output)

  const [,prepeaPath] = url.split('//')
  const reg = /[^a-zA-z]/g
  const pathFile = prepeaPath.replace(reg, '-')
  const fullPath = path.join(output, `${pathFile}.html`)

  return fullPath
}
