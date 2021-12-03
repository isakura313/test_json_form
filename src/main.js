import Vue from 'vue'
import App from './App.vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

Vue.config.productionTip = false

Vue.use(VueFormGenerator)

new Vue({
  render: h => h(App),
}).$mount('#app')
