import axios from 'axios'
import { addLogger } from 'axios-debug-log'

addLogger(axios)

const http = {
  get(url, responseType) {
    return axios.get(url, { responseType })
  },
}

export default http
