import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Add from '@/components/Add'
import Invoice from '@/components/Invoice'
import Report from '@/components/Report'
import Setting from '@/components/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/',
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
      path: '/setting',
      name: 'Setting',
      component: Setting
    }

  ]
})
