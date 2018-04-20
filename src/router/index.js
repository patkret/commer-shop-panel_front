import Vue from 'vue'
import Router from 'vue-router'
import Login from './../Login'
import Admin from './../Admin'
import Dashboard from '../components/dashboard/Dashboard'
import buttons from '../components/buttons'
import AttributeSets from '../components/attribute-sets/AttributeSets'
import Categories from '../components/categories/Categories'
import AddProduct from '../components/products/addProduct'
import EditProduct from '../components/products/addProduct'
import ProductsList from '../components/products/ProductsList'
import VatRates from '../components/vat-rates/VatRates'
import Variants from '../components/variants/Variants'
import Vendors from '../components/vendors/Vendors'
import Users from '../components/users/Users'
import Warehouse from '../components/warehouse/Warehouse'
import permissionList from '../components/users/permissionList'

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
        {
          path: '/categories',
          name: 'Categories',
          component: Categories,
        },
        {
          path: '/product-add',
          name: 'AddProduct',
          component: AddProduct
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
          path: '/warehouse',
          name: 'warehouse',
          component: Warehouse,
        },
      ],
    },
  ],
})
