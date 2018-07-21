<template>
  <div class="account-set">
    <div class="regist-head">
      <div class="regist-head-content">
        <img src="/static/image/云存储黑色-01.png" width="200px" height="60px"/>
        <span class="span1">账号设置</span>
        <div style="float: right" class="right-div">
          <div class="account-name-div">
            <span>{{accountname}}</span>
          </div>
          <span>|</span>&nbsp;
          <router-link to="/">云存储首页>></router-link>
        </div>
      </div>
    </div>
    <div class="personal">
      <div class="personal-head">
        <ul class="mainnav">
          <li class="current">
            <router-link to="/accountset">&nbsp;首页&nbsp;&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/accountset/personaldata" style="margin-left: -3px">账号信息</router-link>
          </li>
          <li>
            <a href="#">账号关联</a>
          </li>
          <li>
            <a href="#">帮助中心</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-content">
      <div class="personal-left-menu">
        <div class="personal-avatar">
          <div class="img-avatar" @click="jump">
            <!--<img src="../../static/image/tou.jpg" alt="avatar" v-show="!showAvatar">-->
            <img :src="imgsrc" alt="avatar" class="">
          </div>
          <div class="account-name">
            <p style="color: white">{{accountname}}</p>
          </div>
        </div>
        <div class="left-menu">
          <el-menu
            router
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            text-color="#ffffff"
            active-text-color="#ffffff">
            <el-menu-item index="/modifyavatar">
              <i class="el-icon-document"></i>
              <span slot="title">修改头像</span>
            </el-menu-item>
            <el-menu-item index="/modifypassword">
              <i class="el-icon-share"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
            <el-menu-item index="">
              <i class="el-icon-setting"></i>
              <span slot="title">使用情况</span>
            </el-menu-item>
            <el-menu-item index="/home/disk/handlefile">
              <i class="el-icon-back"></i>
              <span slot="title">退出</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div style="" class="rightContainDiv">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  export default {
    name: "accountset",
    data(){
      return{
        accountname:sessionStorage.getItem('username'),
        showAvatar:'true'
      }
    },

    methods:{
      jump(){
        this.$router.push('/modifyavatar');
      }

    },
    computed: {
      // ...mapGetters({
      //   imgsrc: 'userImage'
      // })
      imgsrc(){
        if(sessionStorage.getItem('userAvatar') == null){
          this.$store.commit('userImageGet',null);
        }else{
          this.$store.commit('userImageGet',sessionStorage.getItem('userAvatar'));
        }
        return this.$store.getters.userImage;
      },
    },
    created(){
      if(this.$store.state.image == null){}
      this.showAvatar = false;
    }
  }
</script>

<style scoped>
  .account-set{
    height: 100%;
  }
  .regist-head{
    height: 68px;
  }
  .personal{
    background-color: #363259;
    height: 50px;
    min-width: 900px;
    margin-top: -18px;
  }
  .personal-head{
    margin: 0 auto;
    position: relative;
    width: 1000px;
  }
  .mainnav li{
    list-style-type: none;
    float: left;
    line-height: 50px;
    margin-right: 20px;
  }
  .mainnav li a{
    color: #ffffff;
    font-size: 18px;
    padding: 0 25px;
    text-decoration: none;
    display: block;
  }
  .mainnav li a:hover{
    background-color: #4b51bd;
  }
  .current{
    background-color: #4c56c6;
  }
  .regist-head-content{
    width:900px;
    min-width: 700px;
    margin: 0 auto;
    height: 68px;
    line-height: 68px;
  }
  .regist-head-content img{
    margin-right: 25px;
    margin-top: -10px;
  }
  .span1{
    border-left: 1px solid #929292;
    color: #000;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    padding-left: 25px;
  }
  .regist-head-content a{
    font-size: 14px;
    text-decoration: none;
    color: black;
  }
  .regist-head-content a:hover{
    color: deepskyblue;
  }
  .account-name-div{
    display: inline-block;
    width: 100px;
    margin-top: 10px;
  }
  .main-content{
    width: 1000px;
    /*margin: 0 auto;*/
    position: absolute;
    top: 116px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    overflow-y: hidden;
    /* height: 100%; */

  }
  .rightContainDiv{
    position: absolute;
    left: 240px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
   .rightContainDiv::-webkit-scrollbar{
     width: 0;
   }
  .personal-left-menu{
    position: relative;
    width: 240px;
    /*background-color: #4d68d7;*/
    background-image: url("/static/image/main_bg.png");
    background-repeat: no-repeat;
    float: left;
    height: 100%;
  }
  .personal-avatar{
    width: 100%;
    height: 200px;
    position: relative;
  }
  .img-avatar{
    position: relative;
    padding-top: 20px;
  }
  .img-avatar img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    display: block;
    cursor: pointer;
  }
  .account-name p{
    /*display: block;*/
    margin-top: 20px;
    text-align: center;
  }
  .el-menu{
    background-color:transparent;
  }
  .el-menu-item:hover{
    background-color:rgba(255, 255, 255, 0.15) !important;
  }
  .el-menu-item.is-active {
    background-color:rgba(255, 255, 255, 0.15) !important;
  }
  .header-li.is-active{
    background-color:transparent !important;
  }
  .left-menu > ul{
    /*height: 300px;*/
  }
  .left-menu > ul >li{
    height: 66px;
  }
  .left-menu span{
    font-size: 16px;
  }
  .left-menu i{
    margin-left: 18px;
    color: white;
  }
</style>
