import {
  urlBase
} from '../settings'

import axios from 'axios'

function Post (url, payload) {
  return new Promise((res, rej) => {
    axios.post(url, payload, {
      headers: {
          Authorization: 'JWT ' + this.auth.token
        }
    })
      .then(response => {
        res(response)
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.$router.push({
            name: 'Register'
          })
        } else {
          rej(err)
        }
      })
  })
}

function Get (url, token) {
  return axios.get(url, {
    headers: {
      Authorization: 'JWT ' + token
    }
  })
}
var EnumApi = {

  GetAllEnum: function (token) {
    const url = urlBase + '/api/v1/enum/all'
    return Get(url, token)
  }

}

export default EnumApi
