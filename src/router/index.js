import Vue from 'vue'
import Router from 'vue-router'
import Login from './../Login'
import Admin from './../Admin'
import Dashboard from '../components/dashboard/Dashboard'
import buttons from '../components/buttons'
import AttributeSets from '../components/attribute-sets/AttributeSets'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: '/attribute-sets',
          name: 'AttributeSets',
          component: AttributeSets,
        },
        {
          path: '/buttons',
          name: 'Buttons',
          component: buttons,
        },
      ],
    },
  ],
})
