import path from 'path'

export default function getRightName(url, teg = '.html', baseName) {
  const urlObject = new URL(url, baseName)
  let urlAdressWithOutProtocol = urlObject.host + urlObject.pathname
  if (urlAdressWithOutProtocol.length > 200) {
    urlAdressWithOutProtocol = urlAdressWithOutProtocol.slice(0, 200)
  }
  let ext = path.extname(urlObject.pathname)

  if (ext) {
    urlAdressWithOutProtocol = urlAdressWithOutProtocol.slice(0, -ext.length)
  }
  else {
    const regCheckLastSimbol = /[^A-Za-z0-9]$/g
    urlAdressWithOutProtocol = urlAdressWithOutProtocol.replace(regCheckLastSimbol, '')
    ext = teg
  }

  const regChangeSimbols = /[^A-Za-z0-9]/g
  const regChangeEnDash = /-(?=-)/g

  let getRightName = urlAdressWithOutProtocol.replace(regChangeSimbols, '-')
  getRightName = getRightName.replace(regChangeEnDash, '')

  getRightName = getRightName + ext

  return getRightName
}
