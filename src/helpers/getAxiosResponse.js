import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('axios-debug-log')
const axios = require('axios')
import debug from 'debug'
const debugPageLoader = debug('page-loader')

export default async function getAxiosResponse(url) {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'text',
    })
    return response.data
  }
  catch (error) {
    debugPageLoader(`Failed request to the page: ${error}`)

    throw new Error(`Server error: Status code ${error.response.status}`, { cause: error })
  }
}
