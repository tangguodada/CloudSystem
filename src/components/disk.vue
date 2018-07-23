<template>
    <div id="disk">
      <div class="slider-home">
        <!--<el-menu :default-active="activeIndex"-->
        <!--class="el-menu-demo"-->
        <!--mode="vertical"-->
        <!--@select="handleSelect"-->
        <!--background-color="#eff4f8"-->
        <!--text-color="#000000"-->
        <!--active-text-color="#3b8cff"-->
        <!--style="border-bottom: none">-->
        <!--<el-menu-item index="1" class="slider-li">全部文件&#12288;</el-menu-item>-->
        <!--<el-menu-item index="2" class="slider-li">我的分享&#12288;</el-menu-item>-->
        <!--<el-menu-item index="3" class="slider-li">回收站&#12288;</el-menu-item>-->
        <!--</el-menu>-->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          text-color="#ffffff"
          active-text-color="#ffffff">
          <el-menu-item index="1" @click="jump('/home/disk/handlefile','1')">
            <i class="el-icon-document" style="color: #ffffff"></i>
            <span slot="title">全部文件</span>
          </el-menu-item>
          <el-menu-item index="2" @click="jump('/home/disk/handlefile','2')">
            <span slot="title">&#12288;&#12288;图片</span>
          </el-menu-item>
          <el-menu-item index="3" @click="jump('/home/disk/handlefile','3')">
            <span slot="title">&#12288;&#12288;文档</span>
          </el-menu-item>
          <el-menu-item index="4" @click="jump('/home/disk/handlefile','4')">
            <span slot="title">&#12288;&#12288;视频</span>
          </el-menu-item>
          <el-menu-item index="5" @click="jump('/home/disk/handlefile','5')">
            <span slot="title">&#12288;&#12288;种子</span>
          </el-menu-item>
          <el-menu-item index="6" @click="jump('/home/disk/handlefile','6')">
            <span slot="title">&#12288;&#12288;音乐</span>
          </el-menu-item>
          <el-menu-item index="7" @click="jump('/home/disk/handlefile','7')">
            <span slot="title">&#12288;&#12288;其它</span>
          </el-menu-item>
          <el-menu-item index="8" @click="jump('/home/disk/myshare','8')">
            <i class="el-icon-share" style="color: #ffffff"></i>
            <span slot="title">我的分享</span>
          </el-menu-item>
          <el-menu-item index="9" @click="jump('/home/disk/recycle')">
            <i class="el-icon-delete" style="color: #ffffff"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
        <div style="height: 20px"></div>
        <el-progress :text-inside="true" :stroke-width="7" :percentage="storeper" color="rgb(146, 239, 85)" :show-text="false"
                     style="width: 150px;margin: 0 auto">
        </el-progress>
        <div>
          <span style="color: #ffffff">{{storesize}}M/{{(storage/1024)}}G</span>
        </div>
      </div>
      <div class="main-content">
        <!--<div class="main-content-head">-->
        <!--<el-button type="primary" style="width: 80px"><i class="el-icon-upload el-icon--left"></i><span>上传</span></el-button>-->
        <!--<el-button style="width: 130px"><i class="el-icon-circle-plus-outline el-icon--left"></i><span>新建文件夹</span></el-button>-->
        <!--</div>-->
        <!--<div style="float: right">-->
        <!--<el-input-->
        <!--size="medium"-->
        <!--placeholder="请输入内容"-->
        <!--v-model=searchinfo-->
        <!--clearable-->
        <!--suffix-icon="el-icon-search">-->
        <!--</el-input>-->
        <!--</div>-->
        <!--<div style="clear: both;height: 10px"></div>-->
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
        name: "disk",
      data(){
        return{
          size:'',
          storage:'',
          percentage:0
        }
      },
      methods: {
        jump(path, id) {
          this.$router.push({
            path: path,
            query: {
              id: id
            }
          });
        },
        handleSelect(key, keyPath) {
//          console.log(key, keyPath);
        },
        getstoresize() {
          this.$axios.get("/getstorage", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              this.size = res.data.data.size;
              this.storage = res.data.data.storage;
              this.percentage = parseInt(((res.data.data.size) / (res.data.data.storage)) * 100);
              this.$store.commit('userPercent',this.percentage);
              this.$store.commit('userStoresize',this.size.toFixed(2));
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
      },
      computed:{
        storeper(){
          return this.$store.state.storepercentage;
        },
        storesize(){
          return this.$store.state.storesize;
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
    height: 85%;
    min-height: 550px;
    background-color: white;
    float: left;
    border-radius: 10px;
    position: absolute;
    top: 70px;
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
    border-right: 0px;
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
