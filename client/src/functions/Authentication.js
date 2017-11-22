var userMixin = {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    GetUser () {
      const tempUser = JSON.parse(this.$cookie.get('user'))
      if (tempUser === null) {

      }
    },
    SetUser (user) {
      this.$cookie.set('user', JSON.stringify({ ...user
      }))
    },
    TestUser () {

    }
  },
  created () {
    this.GetUser()
  }
}

export default userMixin
