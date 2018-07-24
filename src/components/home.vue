<template>
    <div id="home" style="background-image: url(/static/image/main_bg.png);">
      <div class="header-home">
        <div style="float: left">
          <img src="/static/image/云存储-01.png" width="220px" height="60px" alt="">
        </div>
        <div class="header-home-menu">
          <el-menu :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect"
                   text-color="#ffffff"
                   active-text-color="#ffffff"
                   style="border-bottom: none">
            <el-menu-item index="1" class="header-li" style="text-align: center" @click="jump('/home/disk/handlefile','1')">网盘</el-menu-item>
            <el-menu-item index="2" class="header-li" style="text-align: center" @click="jump('/home/share','1')">会话</el-menu-item>
            <el-menu-item index="3" class="header-li" style="text-align: center" @click="jump('/home/moreinfo','1')">更多</el-menu-item>
          </el-menu>
        </div>
        <div class="header-user">
          <div class="header-otherinfo">
            <span>|&#12288;客户端下载</span>
            <i class="el-icon-bell" @click="jump('/home/notification','1')"></i>
            <i v-show="!isnotification" style="margin-left: -5px;font-size: 15px;position: relative;top: -10px;width: 5px">&#12288;</i>
            <i v-show="isnotification" style="margin-left: -5px;font-size: 15px;position: relative;top: -10px;width: 5px;color: red">{{notificationnum}}</i>
            <i class="el-icon-tickets" style="margin-left: 0px"></i>
            <i class="el-icon-phone"></i>
          </div>
          <div class="header-userinfo">
            <el-popover
              placement="top-start"
              width="250"
              trigger="hover">
              <div>
                <img :src="imgsrc" alt="头像" style="height: 50px;width: 50px;border-radius: 25px">
                <span>&#12288;{{username}}</span>
                <ul class="header-userinfo-ul">
                  <router-link to="/accountset"><li class="header-userinfo-li"><span>个人资料</span></li></router-link>
                  <router-link to="/"><li class="header-userinfo-li"><span>帮助中心</span></li></router-link>
                  <router-link to="/"><li class="header-userinfo-li"><span>退出</span></li></router-link>
                </ul>
              </div>
              <div slot="reference">
                <img :src="imgsrc" alt="头像">
                <span style="color: #ffffff">&#12288;{{username}}</span>
              </div>
            </el-popover>
          </div>
          <div style="float: right;padding-right: 10px;height: 60px;line-height:60px;
overflow:hidden;
vertical-align:middle;">
            <router-link style="color: gold;font-size: 11px;display: inline-block" to="/member" tag="a" target="_blank">超级会员</router-link>
          </div>
        </div>
      </div>
      <div class="slider-content" style="clear: both">
        <router-view></router-view>
        <!--<div class="slider-home">-->
          <!--&lt;!&ndash;<el-menu :default-active="activeIndex"&ndash;&gt;-->
                   <!--&lt;!&ndash;class="el-menu-demo"&ndash;&gt;-->
                   <!--&lt;!&ndash;mode="vertical"&ndash;&gt;-->
                   <!--&lt;!&ndash;@select="handleSelect"&ndash;&gt;-->
                   <!--&lt;!&ndash;background-color="#eff4f8"&ndash;&gt;-->
                   <!--&lt;!&ndash;text-color="#000000"&ndash;&gt;-->
                   <!--&lt;!&ndash;active-text-color="#3b8cff"&ndash;&gt;-->
                   <!--&lt;!&ndash;style="border-bottom: none">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="1" class="slider-li">全部文件&#12288;</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="2" class="slider-li">我的分享&#12288;</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="3" class="slider-li">回收站&#12288;</el-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-menu>&ndash;&gt;-->
          <!--<el-menu-->
            <!--default-active="1"-->
            <!--class="el-menu-vertical-demo"-->
            <!--text-color="#ffffff"-->
            <!--active-text-color="#ffffff">-->
            <!--<el-menu-item index="1" @click="jump('/home/handlefile','1')">-->
              <!--<i class="el-icon-document" style="color: #ffffff"></i>-->
              <!--<span slot="title">全部文件</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="2" @click="jump('/home/handlefile','2')">-->
              <!--<span slot="title">&#12288;&#12288;图片</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="3" @click="jump('/home/handlefile','3')">-->
              <!--<span slot="title">&#12288;&#12288;文档</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="4" @click="jump('/home/handlefile','4')">-->
              <!--<span slot="title">&#12288;&#12288;视频</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="5" @click="jump('/home/handlefile','5')">-->
              <!--<span slot="title">&#12288;&#12288;种子</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="6" @click="jump('/home/handlefile','6')">-->
              <!--<span slot="title">&#12288;&#12288;音乐</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="7" @click="jump('/home/handlefile','7')">-->
              <!--<span slot="title">&#12288;&#12288;其它</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="8" @click="jump('/home/handlefile','8')">-->
              <!--<i class="el-icon-share" style="color: #ffffff"></i>-->
              <!--<span slot="title">我的分享</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="9" @click="jump('/home/recycle')">-->
              <!--<i class="el-icon-delete" style="color: #ffffff"></i>-->
              <!--<span slot="title">回收站</span>-->
            <!--</el-menu-item>-->
          <!--</el-menu>-->
          <!--<div style="height: 20px"></div>-->
          <!--<el-progress :text-inside="true" :stroke-width="7" :percentage="percentage" color="rgb(146, 239, 85)" :show-text="false"-->
                       <!--style="width: 150px;margin: 0 auto">-->
          <!--</el-progress>-->
          <!--<div>-->
            <!--<span style="color: #ffffff">{{(size/1024/1024).toFixed(2)}}M/{{(storage/1024)}}G</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="main-content">-->
          <!--&lt;!&ndash;<div class="main-content-head">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" style="width: 80px"><i class="el-icon-upload el-icon&#45;&#45;left"></i><span>上传</span></el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button style="width: 130px"><i class="el-icon-circle-plus-outline el-icon&#45;&#45;left"></i><span>新建文件夹</span></el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div style="float: right">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-input&ndash;&gt;-->
              <!--&lt;!&ndash;size="medium"&ndash;&gt;-->
              <!--&lt;!&ndash;placeholder="请输入内容"&ndash;&gt;-->
              <!--&lt;!&ndash;v-model=searchinfo&ndash;&gt;-->
              <!--&lt;!&ndash;clearable&ndash;&gt;-->
              <!--&lt;!&ndash;suffix-icon="el-icon-search">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div style="clear: both;height: 10px"></div>&ndash;&gt;-->
          <!--<router-view></router-view>-->
        <!--</div>-->
      </div>
    </div>
</template>

<script>
  import store from '../vuex/store'
    export default {
        name: "home",
      data(){
          return{
            activeIndex: '1',
            screenHeight: '600px',
            username:sessionStorage.getItem('username'),
            imgsrc:sessionStorage.getItem('userAvatar'),
            searchinfo:'',
            size:'',
            storage:'',
            percentage:0,
            notificationnum:'●',
            // isnotification:this.$store.state.isntf
          }
      },
      methods: {
          jump(path,id){
            this.$router.push({
              path:path,
              query:{
                id:id
              }
            });
          },
        handleSelect(key, keyPath) {
//          console.log(key, keyPath);
        },
        getstoresize(){
          this.$axios.get("/getstorage", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              this.size = res.data.data.size;
              this.storage = res.data.data.storage;
              this.percentage = parseInt(((res.data.data.size/1024/1024/1024)/(res.data.data.storage/1024))*100);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getnotifications(){
          this.$axios.get("/message/all_unread",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              if (res.data.data.length !=0){
                this.$store.commit('userNtf',true);
              } else {
                this.$store.commit('userNtf',false);
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      mounted(){
        let h=document.documentElement.clientHeight-60;
        $(".slider-content").css('height',h + 'px');
        let hd=document.documentElement.clientWidth-210;
        $(".main-content").css('width',hd + 'px');
        window.onresize = function temp() {
          let ht=document.documentElement.clientHeight-60;
          $(".slider-content").css('height',ht + 'px');
          let hd=document.documentElement.clientWidth-210;
          $(".main-content").css('width',hd + 'px');
        };
        this.getstoresize();
        this.getnotifications();
      },
      computed:{
        isnotification(){
          return this.$store.state.isntf;
        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #home{
    width: 100%;
    background-color: #eff4f8;
    min-width: 900px;
    height: 100%;
  }
  .header-home{
    width: 100%;
    min-width: 900px;
    height: 9%;
    min-height: 60px;
  }
  .header-li{
    margin-left: 25px;
    width: 50px;
  }
  .header-home-menu{
    float: left;
    width: 30%;
    min-width: 300px;
  }
  .header-user{
    float: right;
    width: 30%;
    min-width: 380px;
    height: 60px;
  }
  .header-user img{
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  .header-user span{
    line-height: 60px;
    font-size: 13px;
  }
  .slider-content{
    width: 100%;
    min-width: 900px;
    min-height: 570px;
    max-height: 700px;
  }
  .slider-home{
    width: 11%;
    float: left;
    min-width: 200px;
    margin-bottom: -1%;
    height: 95%;
    text-align: center;
    min-height: 570px;
    padding-top: 10px;
  }
  .main-content{
    /*width: 1100px;*/
    /*max-width: 81%;*/
    width: 81%;
    min-width: 700px;
    height: 90%;
    min-height: 570px;
    background-color: white;
    float: left;
    border-radius: 10px;
    position: absolute;
    top: 60px;
    left: 200px;
    padding: 15px;
  }
  li{
    font-size: 17px;
    font-family: "Microsoft YaHei";
  }
  .header-userinfo{
    width: 100px;
    float: right;
  }
  .header-userinfo-li{
    cursor: pointer;
  }
  .header-userinfo-li:hover{
    background-color: #eff4f8;
  }
  .header-otherinfo{
    width: 200px;
    height: 30px;
    float: right;
  }
  .header-otherinfo span{
    color: #ffffff;
  }
  .header-otherinfo i{
    color: #ffffff;
  }
  .header-otherinfo i{
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  .el-menu-item{
    text-align: left;
  }
  .header-userinfo-ul a{
    text-decoration: none;
    color: black;
  }
  .header-userinfo-li{
    height: 35px;
    line-height: 35px;
    list-style-type:none;
  }
  .header-userinfo-li span{
    font-size: 10px;
  }
  .main-content-head{
    width: 300px;
    float: left;
  }
  .main-content-head button{
    height: 35px;
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
</style>
