import debug from 'debug'
const debugPageLoader = debug('page-loader')

export default function validatorUrl(address) {
  debugPageLoader(`Started processing URL: ${address}`)
  let url
  try {
    url = new URL(address)
    return url
  }
  catch (error) {
    debugPageLoader(`Failed URL validation: ${address}`)
    throw new Error('Invalid URL', { cause: error })
  }
}
