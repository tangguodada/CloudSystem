<template>
    <div class="adminhome">
      <aheader></aheader>
      <asidemenu></asidemenu>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <taglist></taglist>
        <div class="content">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
  import aheader from './adminheader'
  import asidemenu from './adminsidemenu'
  import taglist from './tagList'
  import bus from './event'
    export default {
        name: "adminhome",
      data(){
          return{
            collapse:false,
            tagsList:[],
          }
      },
      components:{
          aheader,asidemenu,taglist,
      },
      methods:{

      },
      created(){
        bus.$on('collapse',msg=>{
          this.collapse  =msg;
        })

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
          let arr = [];
          for(let i = 0, len = msg.length; i < len; i ++){
            msg[i].name && arr.push(msg[i].name);
          }
          this.tagsList = arr;
        })
      }
    }
</script>

<style scoped>
.content-box{
  position: absolute;
  top: 70px;
  left: 220px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: rgba(240, 240, 240, 0.62);
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
}
  .content{
    width: auto;
    padding: 40px;
  }
  .content-collapse{
    left: 65px;
  }
</style>
