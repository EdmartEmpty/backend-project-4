import fs from 'fs/promises'
import validatorUrl from './helpers/validatorsUrl.js'
import getAxiosResponse from './helpers/getAxiosResponse.js'
import initStorage from './services/initStorage.js'
import parsePage from './services/parsePage.js'
import tasksRunner from './services/tasksRunner.js'

export default async function loader(address, output = process.cwd()) {
  const url = validatorUrl(address)
  const dataFromResponce = await getAxiosResponse(url)

  const { pathPageHtml, pathFiles } = await initStorage(output, address)
  const [rightNameLinks, parseHtmlPage] = parsePage(dataFromResponce, address, pathFiles)
  await tasksRunner(rightNameLinks)
  try {
    await fs.writeFile(pathPageHtml, parseHtmlPage)
    console.log(`Page was successfully downloaded into '${pathPageHtml}'`)
  }
  catch (error) {
    throw new Error(`File system error  ${error}`, { cause: error })
  }
}
