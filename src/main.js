import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'

Vue.use(VueFire)

export const eventBus = new Vue({})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
