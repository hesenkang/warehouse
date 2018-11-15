// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routes'
import Axios from 'axios'
import iView from 'iview'
import '@/assets/styles/global.scss'
import 'iview/dist/styles/iview.css'
import 'animate.css'
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()

Axios.defaults.timeout = 5000
// Axios.defaults.baseURL = 'http://127.0.0.1:8075/edward/http'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
