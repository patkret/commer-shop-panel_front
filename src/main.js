// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import env from './env'
import normalize from 'normalize.css'
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import Multiselect from 'vue-multiselect'
import multiselectStyle from 'vue-multiselect/dist/vue-multiselect.min.css'

import './assets/css/main.css'
import './assets/css/custom-buttons.css'

Vue.config.productionTip = false

Vue.use(normalize);
Vue.use(VeeValidate);
Vue.use(multiselectStyle);
Vue.component('multiselect', Multiselect);

import axios from 'axios';
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
  return response;
}, error => {
  if(error.response.status === 401) {
    localStorage.removeItem('token')
    router.push({path: '/login'})
  }
  return error
});
axios.defaults.baseURL = env.API_URL

let token = localStorage.getItem('token')
if(!token) {
  router.push({path: '/login'})
} else {
  router.push({path: '/dashboard'})
}
const dictionary = {
  pl: {
    messages:{
      required: () => 'Pole obowiązkowe',
      numeric: () => 'Pole może zawierać tylko cyfry ',
      max_value: () => 'Podaj odpowiednią wartość'
    }
  },
};

Validator.localize(dictionary);

const validator = new Validator({
  required: 'required',
  numeric: 'numeric',
  max_value: 'max_value'
});

validator.localize('pl');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

