// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import env from './env'
import normalize from 'normalize.css'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import Multiselect from 'vue-multiselect'
import multiselectStyle from 'vue-multiselect/dist/vue-multiselect.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import Vuex from 'vuex'
import axios from 'axios'
import { store } from './store/store'
import customInput from './components/custom-input'
import passwordInput from './components/password-input'
import customTextarea from './components/custom-textarea'
import singleSelect from './components/singleSelect'
import VModal from 'vue-js-modal'
import './assets/css/main.css'
import './assets/css/component-styles.css'
import './assets/css/custom-buttons.css'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Editor from '@tinymce/tinymce-vue'
import VueMoment from 'vue-moment'
import DateTimePicker from "simple-vue2-datetimepicker";




Vue.config.productionTip = false

Vue.use(normalize)
Vue.use(VeeValidate)
Vue.use(multiselectStyle)
Vue.component('multiselect', Multiselect)
Vue.component('custom-input', customInput)
Vue.component('password-input', passwordInput)
Vue.component('custom-textarea', customTextarea)
Vue.component('single-select', singleSelect)
Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.use(VModal)
Vue.use(DateTimePicker)
Vue.use(VueMoment)
Vue.component('editor', Editor)
Vue.component('vue2Dropzone', vue2Dropzone)


vue2Dropzone.autoDiscover = false;

window.axios = axios


axios.interceptors.request.use(config => {

  let token = localStorage.getItem('token')

  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    router.push({path: '/login'})
  }
  return config
})
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token')
    router.push({path: '/login'})
  }
  return error
})
axios.defaults.baseURL = env.API_URL


let token = localStorage.getItem('token')
if (!token) {
  router.push({path: '/login'})
} else {
  // router.push({path: '/dashboard'})
}
const dictionary = {
  pl: {
    messages: {
      required: () => 'Pole obowiązkowe',
      numeric: () => 'Pole może zawierać tylko cyfry ',
      max_value: () => 'Podaj odpowiednią wartość',
      confirmed: () => 'Hasła muszą być takie same',
      decimal: () => 'Podaj odpowiednią cenę np. 100 lub 100.25',
      email: () => 'Podaj odpowiedni adres e-mail'
    },
  },
}

Validator.localize(dictionary)

const validator = new Validator({
  required: 'required',
  numeric: 'numeric',
  max_value: 'max_value',
  confirmed: 'confirmed',
  decimal: 'decimal',
  email: 'email'
})

validator.localize('pl')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: {App, vueDropzone: vue2Dropzone},
  template: '<App/>',
})
