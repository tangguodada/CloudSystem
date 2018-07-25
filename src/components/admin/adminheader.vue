<template>
<div class="adminheadr">
    <!--<div class="collapse-btn" @click="collapseChange">-->
      <!--<i class="el-icon-upload"></i>-->
    <!--</div>-->
  <div class="logo" @click="collapseChange"><img src="/static/image/云存储-01.png" alt="" style="width: 180px;height:60px"></div>
  <div class="nav-right">
    <div style="float: left">
      <span style="font-size: 14px;margin-right: 10px">欢迎登录</span>
      <span style="margin-right: 20px">{{adminname}}</span>
    </div>
    <div class="btn-bell" style="float:left">
      <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
        <router-link to="/systemMessage">
          <i class="el-icon-bell"></i>
        </router-link>
      </el-tooltip>
      <span class="btn-bell-badge" v-show="message_flag"></span>
    </div>
    <div class="modifymenu">
      <div class="showspace" style="float: right">
        <!--<img v-show=showHeadImg v-bind:src="this.$store.state.image" class="personHead"/>-->
        <img src="/static/image/tou.jpg" class="personHead"/>
        <ul class="submenu">
          <li @click="showMessage">
            <p>个人信息</p>
          </li>
          <li @click="logout">
            <p>注销登录</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</div>
</template>

<script>
  import bus from '../admin/event'
    export default {
        name: "adminheader",
      data(){
          return{
            collapse: false,
            adminname:sessionStorage.getItem('username'),
            message:'',
          }
      },
      methods:{
        collapseChange(){
            this.collapse = !this.collapse;
            bus.$emit('collapse',this.collapse);
          },
        showMessage(){
          this.$router.push('/adminmessage');
        },
        logout(){
          this.$confirm('此操作将退出改系统，是否继续?','提示',{
            confirmButtonText:'确定',
            cancleButtonText:'取消',
            type:'warning'
          }).then(() => {
            this.$router.push('/login');
          }).catch(() => {
            this.$message({
              type:'info',
              message:'取消退出'
            });
          })
        },
        getUnreadNum(){
          this.$axios.get('/fdfsException/unreadNum')
            .then(function(res){
              console.log(res);
              this.message = res.data.data;
              if(res.data.data != 0){
                this.$store.commit('userMessage_flag',true);
              }else{
                this.$store.commit('userMessage_flag',false);
              }
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        },

      },
      mounted(){
          //设置当当前的网页的大小小于1500的时候侧边导航栏是收起来的
          if(document.body.clientWidth < 1000){
            this.collapseChange();
          }
        this.getUnreadNum();
      },
      computed:{
        message_flag(){
          return this.$store.state.message_flag;
        }
      }
    }
</script>

<style scoped>

  .adminheadr{
    width: 100%;
    height: 70px;
    background-color: #242f42;
    color:white;
    font-size: 20px;
  }
  .collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
   .logo{
    float: left;
    width:250px;
    line-height: 70px;
     margin-left: 16px;
  }

  .nav-right{
    float: right;
    margin-top: 12px;
    height: 80%;
    /*margin-right: 10px;*/
  }
  .btn-bell-badge{
    position: absolute;
    right: 115px;
    top: 15px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .btn-bell .el-icon-bell{
    color: #fff;
  }
  .personHead{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 18px;
  }
  .modifymenu {
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 100px;
    display: block;
    float: right;
    position: relative;
    background: transparent;
    z-index: 999;
    top: 0;
    margin-right: 18px;
  }

  .modifymenu p {
    color: #F0F0F0;
    display: block;
    font-size: 16px;
    line-height: 30px;
    padding: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
  }

  /* onhover styles */
  .modifymenu:hover {
    color: #F5F5F5;

  }

  /* submenu styles */
  .submenu {
    margin-top: 5px;
    left: -10%;
    max-height: 0;
    position: absolute;
    top: 100%;
    z-index: 0;

    -webkit-perspective: 400px;
    -moz-perspective: 400px;
    -ms-perspective: 400px;
    -o-perspective: 400px;
    perspective: 400px;
  }

  .submenu li {
    background: #FFFFFF;
    list-style-type: none;
    opacity: 0;

    -webkit-transform: rotateY(90deg);
    -moz-transform: rotateY(90deg);
    -ms-transform: rotateY(90deg);
    -o-transform: rotateY(90deg);
    transform: rotateY(90deg);

    -webkit-transition: opacity .4s, -webkit-transform .5s;
    -moz-transition: opacity .4s, -moz-transform .5s;
    -ms-transition: opacity .4s, -ms-transform .5s;
    -o-transition: opacity .4s, -o-transform .5s;
    transition: opacity .4s, transform .5s;
  }

  .submenu li p {
    color: #909090;
    font-size: 14px;
  }

  .submenu li:hover {
    background: #ECECFF;
    border-radius: 3px;
    cursor: pointer;
  }

  .submenu li:hover p {
    color: #ACD0FF;
  }

  .modifymenu:hover .submenu li, .modifymenu:focus .submenu li {
    opacity: 1;

    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
  }
</style>
