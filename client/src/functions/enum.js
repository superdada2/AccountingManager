import axios from 'Axios'

const urlBase = 'http://' + window.location.hostname + ':3030'

export function GetProductEnum (onSuccess) {
  const url = urlBase + '/api/v1/enum/product'
  axios.get(url).then(onSuccess)
}
