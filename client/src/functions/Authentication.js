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
    },
    Authorize (requredPermissions) {
      console.log(requredPermissions)
      const permissions = [...this.auth.user.user_permissions]
      if (requredPermissions.constructor === Array) {
        var authorize
        for (var i = 0; i < requredPermissions.length; i++) {
          authorize = permissions.find(j => {
            return j.module === requredPermissions[i].type && j.role === requredPermissions[i].role
          })
          if (authorize) {
            break
          }
        }
        if (authorize) {
          console.log('authorized')
          return true
        } else {
          console.log('Unauthorized')
          return false
        }
      } else {
        console.log(requredPermissions, permissions)
        const authorize = permissions.find(i => {
          return i.module === requredPermissions.type && i.role === requredPermissions.role
        })
        console.log(authorize)
        if (authorize) {
          console.log('authorized')
          return true
        } else {
          console.log('Unauthorized')
          return false
        }
      }
    }

  },
  created () {
    this.GetUser()
  }
}

export default userMixin
