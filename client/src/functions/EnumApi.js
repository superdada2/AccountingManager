import {
  urlBase
} from '../settings'
var enumMixin = {
  data () {
    return {

    }
  },
  methods: {
    GetAllEnum () {
      const url = urlBase + '/api/v1/enum/all'
      return this.Get(url)
    }
  }
}

export default enumMixin
