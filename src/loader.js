import fs from 'fs/promises'
import validatorUrl from './helpers/validatorsUrl.js'
import getPageContent from './helpers/getPageContent.js'
import initStorage from './services/initStorage.js'
import parsePage from './services/parsePage.js'
import tasksRunner from './services/tasksRunner.js'

export default function loader(address, output = process.cwd()) {
  return new Promise((res, rej) => {
    try {
      const url = validatorUrl(address)
      res(Promise.all([getPageContent(url), initStorage(output, address)]))
    }
    catch (error) {
      rej(error)
    }
  })
    .then(([pageContent, pathsStorage]) => {
      const pathPageHtml = pathsStorage.pathPageHtml
      const pathFiles = pathsStorage.pathFiles
      const { links, html } = parsePage(pageContent, address, pathFiles)
      tasksRunner(links)
      return [pathPageHtml, html]
    })
    .then(([pathPageHtml, parseHtmlPageFromPromise]) => {
      fs.writeFile(pathPageHtml, parseHtmlPageFromPromise)
      return pathPageHtml
    })
    .then(pathPageHtml => console.log(`Page was successfully downloaded into '${pathPageHtml}'`))
}
