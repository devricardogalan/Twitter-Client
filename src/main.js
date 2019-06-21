import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import "aos/dist/aos.css"
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false

Vue.use(vueDebounce)

new Vue({
  created(){
    AOS.init();
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Setting a different event to listen to
Vue.use(vueDebounce, {
  listenTo: 'search'
})

 
// Setting a default timer This is set to '300ms' if not specified
Vue.use(vueDebounce, {
  defaultTime: '700ms'
})