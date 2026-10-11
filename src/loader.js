import fs from 'fs/promises'
import validatorUrl from './helpers/validatorsUrl.js'
import getPageContent from './helpers/getPageContent.js'
import initStorage from './services/initStorage.js'
import parsePage from './services/parsePage.js'
import tasksRunner from './services/tasksRunner.js'

export default function loader(address, output = process.cwd()) {
  const url = validatorUrl(address)

  let pathPageHtml
  let parseHtmlPageFromPromise

  return Promise.all([getPageContent(url), initStorage(output, address)])
    .then(([pageContent, pathsStorage]) => {
      pathPageHtml = pathsStorage.pathPageHtml
      const pathFiles = pathsStorage.pathFiles
      const [rightNameLinks, parseHtmlPage] = parsePage(pageContent, address, pathFiles)
      parseHtmlPageFromPromise = parseHtmlPage
      return tasksRunner(rightNameLinks)
    })
    .then(() => fs.writeFile(pathPageHtml, parseHtmlPageFromPromise))
    .then(() => console.log(`Page was successfully downloaded into '${pathPageHtml}'`))
    .catch((error) => { throw new Error(`File system error  ${error}`, { cause: error }) })
}
