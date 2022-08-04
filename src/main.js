import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'; //后台交互
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'

Vue.use(ElementUI);

Vue.prototype.$axios = Axios;
//defaults 设置全局默认路径
Axios.defaults.baseURL = "http://localhost:8000";

Vue.use(VueSession)

Vue.use(VueCookies);

Axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
