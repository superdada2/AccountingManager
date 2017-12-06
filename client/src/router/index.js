import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Add from '../components/Add'
import Invoice from '../components/Invoice'
import Report from '../components/Report'
import Setting from '../components/Setting'
import Details from '../components/Details'
import Register from '../components/Register'
import Historys from '../components/History'
import Welcome from '../components/Welcome'
import ForceReset from '../components/ForceReset'

Vue.use(Router)

var router = new Router({
  routes: [{
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/setting/',
    name: 'Setting',
    component: Setting,
    props: true
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/history',
    name: 'History',
    component: Historys
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ForceReset
  }
  ]
})

export default router
