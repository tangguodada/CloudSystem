<template>
    <div class="admin-sidemenu">
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"
               :collapse="collapse" background-color="rgba(60, 75, 99, 0.93)"
               text-color="#fff"
               active-text-color="#4392f8"
               unique-opened router>
        <template v-for="item in items">
          <template >
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script>
  import bus from '../admin/event'
    export default {
        name: "adminsidemenu",
      data(){
          return{
            collapse:false,
            items:[
              {
                icon:'el-icon-menu',
                index:'systemindex',
                title:'系统首页',
              },
              {
                icon:'el-icon-rank',
                index:'usertable',
                title:'用户列表',
              },
              {
                icon:'el-icon-tickets',
                index:'diskmessage',
                title:'磁盘详情',
              },
              {
                icon:'el-icon-time',
                index:'systemdisklog',
                title:'Fdfs日志',
              },
              {
                icon:'el-icon-info',
                index:'userdisk',
                title:'用户磁盘',
              },
              {
                icon:'el-icon-news',
                index:'sharemessage',
                title:'分享管理',
              },
              {
                icon:'el-icon-time',
                index:'ExceptionLog',
                title:'Fdfs异常日志',
              },
              {
                icon:'el-icon-bell',
                index:'systemMessage',
                title:'系统消息',
              },
              {
                icon:'el-icon-document',
                index:'adminmessage',
                title:'管理员信息',
              },{
                icon:'el-icon-setting',
                index:'login',
                title:'退出系统',
              },
            ]

          }
      },
     computed:{
       onRoutes(){
         return this.$route.path.replace('/','');
       }
     },
      created(){
          bus.$on('collapse',msg => {
            this.collapse  = msg;
          })
      }
    }
</script>

<style scoped>
  .admin-sidemenu{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
    background-color: rgba(60, 75, 99, 0.93);

  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
  }
  .admin-sidemenu > ul{
    height: 100%;
  }
  .admin-sidemenu > ul > li{
    height: 60px;
    font-size: 15px;
  }
  .el-menu-vertical-demo > i{
    color: white;
  }
</style>
