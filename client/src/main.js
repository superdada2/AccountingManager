// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
import VueCookie from 'vue-cookie'
import VueLocalStorage from 'vue-localstorage'
import UserMixin from './functions/Authentication'

Vue.config.productionTip = false
Vue.use(i18n)
Vue.config.lang = 'en'
Vue.use(ElementUI, {
  locale
})
Vue.use(VueCookie)
Vue.use(VueLocalStorage)
Vue.mixin(UserMixin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
