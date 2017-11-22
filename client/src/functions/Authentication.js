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
    },
    CheckPermission (type = 'view') {
      switch (type) {
        case 'admin':
          return this.auth.user <= 2
        case 'delete':
          return this.auth.user <= 3
        case 'modify':
          return this.auth.user <= 4
        case 'add':
          return this.auth.user <= 5
        case 'view':
          return this.auth.user <= 6
      }
    }
  },
  created () {
    this.GetUser()
  }
}

export default userMixin
