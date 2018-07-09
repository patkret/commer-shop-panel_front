import Vue from 'vue'
import Router from 'vue-router'
import Login from '../Login'
import LoginForm from '../loginForm'
import LoginPassword from '../loginPassword'
import resetPassword from '../resetPassword'
import Admin from './../Admin'
import Dashboard from '../components/dashboard/Dashboard'
import buttons from '../components/buttons'
import AttributeSets from '../components/attribute-sets/AttributeSets'
import AttributeSetsList from '../components/attribute-sets/AttributeSetsList'
import AttributeSetForm from '../components/attribute-sets/AttributeSetForm'
import attributesList from '../components/attribute-sets/attributesList'
import addAttribute from '../components/attribute-sets/addAttribute'
import editAttribute from '../components/attribute-sets/editAttribute'
import Categories from '../components/categories/Categories'
import CategoriesList from '../components/categories/CategoriesList'
import AttributesCategoriesList from '../components/attribute-sets/CategoriesList'
import AddCategory from '../components/categories/AddCategory'
import DuplicateCategory from '../components/categories/DuplicateCategory'
import EditCategory from '../components/categories/EditCategory'
import AddProduct from '../components/products/Products'
import EditProduct from '../components/products/addProduct'
import ProductsList from '../components/products/ProductsList'
import VatRates from '../components/vat-rates/VatRates'
import VatRatesList from '../components/vat-rates/VatRatesList'
import EditVatRate from '../components/vat-rates/EditVatRate'
import Variants from '../components/variants/Variants'
import VariantsList from '../components/variants/VariantsList'
import VariantSetForm from '../components/variants/VariantsSetForm'
import allVariants from '../components/variants/allVariants'
import addVariant from '../components/variants/addVariant'
import Vendors from '../components/vendors/Vendors'
import AddVendor from '../components/vendors/AddVendor'
import VendorsList from '../components/vendors/VendorsList'
import EditVendor from '../components/vendors/EditVendor'
import Users from '../components/users/Users'
import Stock from '../components/stock/Stock'
import Orders from '../components/orders/Orders'
import OrdersList from '../components/orders/OrdersList'
import clientInfo from '../components/orders/clientInfo'
import paymentDetails from '../components/orders/paymentDetails'
import shippingDetails from '../components/orders/shippingDetails'
import presale from '../components/orders/presale'
import tickets from '../components/orders/tickets'
import AddOrder from '../components/orders/AddOrder'
import Integrations from '../components/integrations/Integrations'
import permissionList from '../components/users/permissionList'
import Account from '../components/accounts/account'
import select from '../components/custom-select'
import Logs from '../components/Logs'
import Paginator from '../components/paginator'
import inpt from '../components/custom-input'
import MainInfo from '../components/products/mainInfo'
import Descriptions from '../components/products/Descriptions'
import AdditionalInfo from '../components/products/additionalInfo'
import attributeSets from '../components/products/attributeSets'
import Gallery from '../components/products/Gallery'
import Drafts from '../components/products/ProductDrafts'
import ProductsTable from '../components/products/ProductsTable'
import ProductTickets from '../components/products/ProductTickets'
import ProductsSeo from '../components/products/ProductsSeo'
import ImportedProducts from '../components/products/ImportedProducts'
import AddVatRate from '../components/vat-rates/AddVatRate'
import StockForm from '../components/stock/StockForm'
import StockList from '../components/stock/StockList'
import addToStock from '../components/stock/addToStock'
import StockItems from '../components/stock/StockItems'
import AddPage from '../components/static-pages/AddPage'
import EditPage from '../components/static-pages/EditPage'
import PagesList from '../components/static-pages/PagesList'
import Pages from '../components/static-pages/Pages'
import Emails from '../components/emails/Emails'
import AddEmail from '../components/emails/AddEmail'
import EditEmail from '../components/emails/EditEmail'
import EmailsList from '../components/emails/EmailsList'
import variantSets from '../components/products/variantSets'
import relatedProductsList from '../components/products/relatedProductsList'
import relatedProducts from '../components/products/relatedProducts'
import productDetails from '../components/products/productDetails'
import descriptionTemplates from '../components/description-templates/descriptionTemplates'
import descriptionTemplatesList from '../components/description-templates/descriptionTemplatesList'
import descriptionTemplateForm from '../components/description-templates/descriptionTemplateForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [
        {
        path: '',
        name: 'LoginForm',
        component: LoginForm,
        },
        {
          path: 'forgot-password',
          name: 'LoginPassword',
          component: LoginPassword,
        },
      ],
    },
    {
      path: '/user/:id/reset-password',
      name: 'resetPassword',
      component: resetPassword,
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
          children: [
            {
              path: 'list',
              name: 'AttributeSetsList',
              component: AttributeSetsList,
            },
            {
              path: 'add',
              name: 'AttributeSetForm',
              component: AttributeSetForm,
              children: [
                {
                  path: 'categories',
                  name: 'AttributesCategoriesList',
                  component: AttributesCategoriesList,
                },
                {
                  path: 'attribute-add',
                  name: 'addAttribute',
                  component: addAttribute,
                },
                {
                  path: 'attributes',
                  name: 'attributesList',
                  component: attributesList,
                },
                {
                  path: 'attribute-edit/:id',
                  name: 'editAttribute',
                  component: editAttribute,
                },
              ]
            },
            {
              path: 'edit/:item',
              name: 'AttributeSetForm',
              component: AttributeSetForm,
              children: [
                {
                  path: 'categories',
                  name: 'AttributesCategoriesListEdit',
                  component: AttributesCategoriesList,
                },
                {
                  path: 'attribute-add',
                  name: 'addAttributeEdit',
                  component: addAttribute,
                },
                {
                  path: 'attributes',
                  name: 'attributesListEdit',
                  component: attributesList,
                },
                {
                  path: 'attribute-edit/:id',
                  name: 'editAttributeEdit',
                  component: editAttribute,
                },
              ]
            },
          ]
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
          children: [
            {
              path: 'list',
              name: 'CategoriesList',
              component: CategoriesList,
              children: [
                {
                  path: 'add',
                  name: 'AddCategory',
                  component: AddCategory,
                },
                {
                  path: 'duplicate/:id',
                  name: 'DuplicateCategory',
                  component: DuplicateCategory,
                },
                {
                  path: 'edit/:id',
                  name: 'EditCategory',
                  component: EditCategory,
                }
              ]
            },
          ]
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
            {
              path: 'descriptions',
              name: 'Descriptions',
              component: Descriptions,
            },
            {
              path: 'seo',
              name: 'ProductsSeo',
              component:ProductsSeo,
            },
            {
              path: 'attribute-sets',
              name: 'attributeSets',
              component: attributeSets,
            },
            {
              path: 'variant-sets',
              name: 'variantSets',
              component: variantSets,
            },
            {
              path: 'gallery',
              name: 'Gallery',
              component: Gallery,
            },
            {
              path: 'related-products',
              name: 'relatedProducts',
              component: relatedProducts,
            },
            {
              path: 'select-related-products',
              name: 'relatedProductsList',
              component: relatedProductsList,
            },

          ]
        },
        {
          path: '/product-edit/:id',
          name: 'EditProduct',
          component: AddProduct,
          children: [
            {
              path: 'main-info',
              name: 'MainInfoEdit',
              component: MainInfo,
            },

            {
              path: 'additional-info',
              name: 'AdditionalInfoEdit',
              component: AdditionalInfo,
            },
            {
              path: 'descriptions',
              name: 'DescriptionsEdit',
              component: Descriptions,
            },
            {
              path: 'attribute-sets',
              name: 'attributeSetsEdit',
              component: attributeSets,
            },
            {
              path: 'variant-sets',
              name: 'variantSetsEdit',
              component: variantSets,
            },
            {
              path: 'seo',
              name: 'ProductsSeo',
              component:ProductsSeo,
            },
            {
              path: 'gallery',
              name: 'GalleryEdit',
              component: Gallery,
            },
            {
              path: 'related-products',
              name: 'relatedProductsEdit',
              component: relatedProducts,
            },
            {
              path: 'select-related-products',
              name: 'relatedProductsListEdit',
              component: relatedProductsList,
            },

          ]
        },
        {
          path: '/products',
          name: 'ProductsList',
          component: ProductsList,
          children: [
            {
              path: 'drafts',
              name: 'Drafts',
              component: Drafts,
            },
            {
              path: 'list',
              name: 'ProductsTable',
              component: ProductsTable,
            },
            {
              path: 'tickets',
              name: 'ProductTickets',
              component: ProductTickets,
            },
            {
              path: 'imported',
              name: 'ImportedProducts',
              component: ImportedProducts,
            },
            {
              path: 'product-details/:id',
              name: 'productDetails',
              component: productDetails,
            },
          ]
        },
        {
          path: '/vat-rates',
          name: 'VatRates',
          component: VatRates,
          children: [
            {
              path: 'add',
              name: 'AddVatRate',
              component: AddVatRate,
            },
            {
              path: 'list',
              name: 'VatRatedList',
              component: VatRatesList,
            },
            {
              path: 'edit/:item',
              name: 'EditVatRate',
              component: EditVatRate,
            },
          ]
        },
        {
          path: '/variants',
          name: 'Variants',
          component: Variants,
          children: [
            {
              path: 'list',
              name: 'VariantsList',
              component: VariantsList,
            },
            {
              path: 'add',
              name: 'VariantSetForm',
              component: VariantSetForm,
              children: [
                {
                  path: 'variant-add',
                  name: 'addVariant',
                  component: addVariant,
                },
                {
                  path: 'variant-edit/:item',
                  name: 'editVariant',
                  component: addVariant,
                },
                {
                  path: 'all-variants',
                  name: 'allVariants',
                  component: allVariants,
                },
              ]
            },

            {
              path: 'edit/:id',
              name: 'VariantSetEditForm',
              component: VariantSetForm,
              children: [
                {
                  path: 'variant-add',
                  name: 'addVariantEdit',
                  component: addVariant,
                },
                {
                  path: 'variant-edit/:item',
                  name: 'editVariantEdit',
                  component: addVariant,
                },
                {
                  path: 'all-variants',
                  name: 'allVariantsEdit',
                  component: allVariants,
                },
              ]
            },
          ]
        },
        {
          path: '/vendors',
          name: 'Vendors',
          component: Vendors,
          children: [
            {
              path: 'add',
              name: 'AddVendor',
              component: AddVendor,
            },
            {
              path: 'list',
              name: 'VendorList',
              component: VendorsList,
            },
            {
              path: 'edit/:item',
              name: 'EditVendor',
              component: EditVendor,
            }
          ]
        },
        {
          path: '/static-pages',
          name: 'Pages',
          component: Pages,
          children: [
            {
              path: 'add',
              name: 'AddPage',
              component: AddPage,
            },
            {
              path: 'list',
              name: 'PagesList',
              component: PagesList,
            },
            {
              path: 'edit/:item',
              name: 'EditPage',
              component: EditPage,
            }
          ]
        },
        {
        path: '/emails',
          name: 'Emails',
          component: Emails,
          children: [
            {
              path: 'add',
              name: 'AddEmail',
              component: AddEmail,
            },
            {
              path: 'list',
              name: 'EmailsList',
              component: EmailsList,
            },
            {
              path: 'edit/:item',
              name: 'EditEmail',
              component: EditEmail,
            }
          ]
        },
        {
          path: '/users',
          name: 'Users',
          component: Users,
        },




















        {
          path: '/description-templates',
          name: 'descriptionTemplates',
          component: descriptionTemplates,
          children: [
            {
              path: 'list',
              name: 'descriptionTemplatesList',
              component: descriptionTemplatesList,
            },
            {
              path: 'add',
              name: 'descriptionTemplateForm',
              component: descriptionTemplateForm,
            },
            {
              path: 'edit/:id',
              name: 'descriptionTemplateFormEdit',
              component: descriptionTemplateForm,
            },
          ]
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
          children: [
            {
              path: 'add',
              name: 'AddStock',
              component: StockForm,
            },
            {
              path: 'list',
              name: 'StockList',
              component: StockList,
            },
            {
              path: 'edit/:item',
              name: 'EditStock',
              component: StockForm,
            },
            {
              path: 'items/:item/add-to',
              name: 'addToStock',
              component: addToStock,
            },
            {
              path: 'items/:item',
              name: 'StockItems',
              component: StockItems,
            },
          ]
        },
        {

          path: '/account',
          name: 'Account',
          component: Account,
        },
        {
          path: '/orders',
          name: 'Orders',
          component: Orders,
          children: [
            {
              path: 'list',
              name: 'OrdersList',
              component: OrdersList,
            },
            {
              path: 'presale',
              name: 'presale',
              component: presale,
            },
            {
              path: 'tickets',
              name: 'tickets',
              component: tickets,
            },
          ]
        },
        {
          path: '/order-add',
          name: 'AddOrder',
          component: AddOrder,
          children: [
            {
              path: 'client-info',
              name: 'clientInfo',
              component: clientInfo,
            },
            {
              path: 'payment-details',
              name: 'paymentDetails',
              component: paymentDetails,
            },
            {
              path: 'shipping-details',
              name: 'shippingDetails',
              component: shippingDetails,
            },
          ]
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
        {
          path: '/inpt',
          name: 'inpt',
          component: inpt,
        },
      ],
    },
  ],
})
