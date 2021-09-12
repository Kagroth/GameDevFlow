import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from "@/store"

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),

  created() {
    const modules = store._modulesNamespaceMap
    for (const module in modules) {
      if (module === "") {
        continue
      }

      store.commit(`${module}init`)
    }
  }

}).$mount('#app')
