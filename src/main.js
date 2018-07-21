// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './vuex/store'
import echarts from 'echarts'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(iView);
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = '/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

import qs from 'qs';
// 请求拦截器

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     //这里判断用户是否登录，这里判断本地存储是否有token
//     if (sessionStorage.userToken == '') {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })

axios.interceptors.request.use( (config) => {
  let token = sessionStorage.getItem('userToken');
  if(token){
      config.headers.Authorization = token;
    }

  if (config.method=="post"){
    config.data = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
  },
  (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response=>{
    return response;
  },
  error => {
    if(error.response){
      switch(error.response.status){
        case 401:      //401未授权
          sessionStorage.setItem("userToken",null);
          sessionStorage.setItem("username",null);
          sessionStorage.clear();
          router.replace({
            path:'/login',
            query:{redirect:router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response)
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
