import http from './http.js'
import debug from 'debug'

const debugPageLoader = debug('page-loader')

export default function getPageContent(url) {
  return http.get(url, 'text')
    .then(response => response.data).catch((error) => {
      debugPageLoader(`Failed request to the page: ${error}`)
      throw new Error(`Server error: Status code ${error.response.status}`, { cause: error })
    })
}
