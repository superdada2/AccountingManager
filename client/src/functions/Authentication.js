import axios from 'Axios'
import {
  urlBase
} from '../settings'
var userMixin = {
  data () {
    return {
      auth: {
        user: {},
        token: ''
      }
    }
  },
  methods: {
    async GetUser () {
      const auth = JSON.parse(this.$cookie.get('auth'))
      if (auth === null) {
        this.$router.push({
          name: 'Register'
        })
      } else {
        this.auth = auth
      }
    },
    SetUser (auth) {
      this.$cookie.set('auth', JSON.stringify({ ...auth
      }))
    },
    async TestUser (token) {
      const url = urlBase + '/auth/test'

      var result = await this.Post(url, null)
      console.log(result)
      if (result === undefined) {
        return false
      }
      return true
    },
    Post (url, payload) {
      return axios.post(url, payload, {
        headers: {
          Authorization: 'JWT ' + this.auth.token
        }
      }).catch(err => {
        if (err.response.status === 401) {
          this.$router.push({
            name: 'Register'
          })
        }
      })
    },
    Get (url) {
      return axios.get(url, {
        headers: {
          Authorization: 'JWT ' + this.auth.token
        }
      })
    }
  },
  created () {
    this.GetUser()
  }
}

export default userMixin
