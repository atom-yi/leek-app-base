import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8080/leek';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
