<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {asyncRouterMap} from "./router";
import store from './vuex/store';
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    getRouterMap:function () {
    //   let isLogin = sessionStorage.getItem('userToken');
    //   if(!isLogin){
    //     this.$router.push('/login');
    //   }
    //   else{

      let vm = this;
      let routerMap = new Array();
      for (let i=0;i<asyncRouterMap.length;i++){
          if (sessionStorage.getItem('currentRole') == asyncRouterMap[i].meta.role){
            routerMap.push(asyncRouterMap[i]);
        }
      }
      vm.$router.addRoutes(routerMap);
    }
    // }
  },

  created(){
    this.getRouterMap();
  },

}
</script>

<style>
</style>
