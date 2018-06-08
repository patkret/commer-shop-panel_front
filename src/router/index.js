import Vue from 'vue'
import Router from 'vue-router'
import Login from './../Login'
import Admin from './../Admin'
import Dashboard from '../components/dashboard/Dashboard'
import buttons from '../components/buttons'
import AttributeSets from '../components/attribute-sets/AttributeSets'
import Categories from '../components/categories/Categories'
import AddProduct from '../components/products/Products'
import EditProduct from '../components/products/addProduct'
import ProductsList from '../components/products/ProductsList'
import VatRates from '../components/vat-rates/VatRates'
import Variants from '../components/variants/Variants'
import Vendors from '../components/vendors/Vendors'
import Users from '../components/users/Users'
import Stock from '../components/stock/Stock'
import OrdersList from '../components/orders/OrdersList'
import AddOrder from '../components/orders/AddOrder'
import Integrations from '../components/integrations/Integrations'
import permissionList from '../components/users/permissionList'
import Account from '../components/accounts/account'
import select from '../components/custom-select'
import Logs from '../components/Logs'
import Paginator from '../components/paginator'
import MainInfo from '../components/products/mainInfo'
import AdditionalInfo from '../components/products/additionalInfo'



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
      path: '/select',
      name: 'select',
      component: select,
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
        {
          path: '/categories',
          name: 'Categories',
          component: Categories,
        },
        {
          path: '/product-add',
          name: 'AddProduct',
          component: AddProduct,
          children: [
            {
              path: 'main-info',
              name: 'MainInfo',
              component: MainInfo,
            },

            {
              path: 'additional-info',
              name: 'AdditionalInfo',
              component: AdditionalInfo,
            },
          ]
        },
        {
          path: '/products',
          name: 'ProductsList',
          component: ProductsList
        },
        {
          path: '/products/edit/:item',
          name: 'EditProduct',
          component: EditProduct
        },
        {
          path: '/vat-rates',
          name: 'VatRates',
          component: VatRates,
        },
        {
          path: '/variants',
          name: 'Variants',
          component: Variants,
        },
        {
          path: '/vendors',
          name: 'Vendors',
          component: Vendors,
        },
        {
          path: '/users',
          name: 'Users',
          component: Users,
        },
        {
          path: '/permission',
          name: 'permissionList',
          component: permissionList,
        },
        {
          path: '/stock',
          name: 'Stock',
          component: Stock,
        },
        {

          path: '/account',
          name: 'Account',
          component: Account,
        },
        {
          path: '/orders',
          name: 'OrdersList',
          component: OrdersList,
        },
        {
          path: '/order-add',
          name: 'AddOrder',
          component: AddOrder,
        },
        {
          path: '/integrations',
          name: 'Integrations',
          component: Integrations,
        },
        {
          path: '/logs',
          name: 'Logs',
          component: Logs,
        },
        {
          path: '/paginator',
          name: 'Paginator',
          component: Paginator,
        },
      ],
    },
  ],
})
