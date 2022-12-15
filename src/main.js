import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';


import router from './routes';
import VueRouter from 'vue-router';
import store from './store'
import "tailwindcss/tailwind.css";
import axios from "axios";

import 'element-ui/lib/theme-chalk/index.css';
import './global.css'
import 'font-awesome/css/font-awesome.min.css'
import './icons'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.$axios = axios


new Vue({
  render: h => h(App),
  router: router,
  components: {},
  store,
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局时间总线
  },

}).$mount('#app')
//先回页面顶部再跳转
router.afterEach((to, from, next) => {
  window, scrollTo(0, 0)
  // to and from are both route objects.
})

