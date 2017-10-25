import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import Add from '@/components/Add'
import Invoice from '@/components/Invoice'
import Search from '@/components/Search'

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
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    }
  ]
})
