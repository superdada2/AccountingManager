import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import Add from '@/components/Add'
import Invoice from '@/components/Invoice'
import Report from '@/components/Report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/default',
      name: 'Default',
      component: Default
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
    }
  ]
})
