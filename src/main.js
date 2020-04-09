import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/flexble.js' //rem配置文件
// import "vant/lib/index.css";//导入vant所有的css样式 。推荐按需引入


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
