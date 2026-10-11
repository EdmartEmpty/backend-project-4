import path from 'path'

const toBase = (url) => {
  let urlAdressWithOutProtocol = url.host + url.pathname

  if (urlAdressWithOutProtocol.length > 200) {
    urlAdressWithOutProtocol = urlAdressWithOutProtocol.slice(0, 200)
  }
  let ext = path.extname(url.pathname)

  if (ext) {
    urlAdressWithOutProtocol = urlAdressWithOutProtocol.slice(0, -ext.length)
  }
  else {
    const regCheckLastSimbol = /[^A-Za-z0-9]$/g
    urlAdressWithOutProtocol = urlAdressWithOutProtocol.replace(regCheckLastSimbol, '')
  }

  const regChangeSimbols = /[^A-Za-z0-9]/g
  const regChangeEnDash = /-(?=-)/g

  let getRightName = urlAdressWithOutProtocol.replace(regChangeSimbols, '-')
  getRightName = getRightName.replace(regChangeEnDash, '')

  return getRightName
}

export const getPageName = (urlString) => {
  const urlObject = new URL(urlString)
  return toBase(new URL(urlString)) + (path.extname(urlObject.pathname) || '.html')
}

export const getAssetName = (urlString) => {
  const urlObject = new URL(urlString)
  let ext = path.extname(urlObject.pathname)
  if (ext) {
    return toBase(new URL(urlString)) + ext
  }
  else {
    return toBase(new URL(urlString))
  }
}

export const getAssetsDir = (urlString) => {
  return toBase(new URL(urlString)) + '_files'
}
