import axios from 'axios'
import { addLogger } from 'axios-debug-log'
import debug from 'debug'
const debugPageLoader = debug('page-loader')

addLogger(axios)

export default function getPageContent(url) {
  return axios({
    method: 'get',
    url,
    responseType: 'text',
  }).then(response => response.data).catch((error) => {
    debugPageLoader(`Failed request to the page: ${error}`)

    throw new Error(`Server error: Status code ${error.response.status}`, { cause: error })
  })
}
