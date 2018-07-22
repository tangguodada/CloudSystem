
<template>
    <div id="login">
      <div class="carousel" style="transform: matrix(1, 0, 0, 1, 0, 0); transition: all 500ms linear;" >
        <div class="logo-header" style="">
          <div class="logo">
            <a href="#"></a>
          </div>
          <div class="login-title">
            <ul>
              <li>@Cloud首页</li>
              <li>官方微博</li>
              <li>问题反馈</li>
              <li class="centry-enter">会员中心</li>
            </ul>
          </div>
        </div>
        <div class="loginDiv" v-if="flag_account_login">
          <div class="topDiv">
            <form   class="form-normal">
              <p class="form-top-tip">账号密码登录</p>
              <br>
              <el-input
                placeholder="手机号/用户名"
                v-model="value1"
                clearable
                style="width: 98%"
                name="username"
                @blur = "validateInput1"
                @focus = "clearUsernameTips">
                <i slot="prefix" class="el-input__icon el-icon-erp-account"></i>
              </el-input>
              <div class="Tip1" style="height: 20px">
                <p style="color: red;font-size: 12px" v-show="usernameTip1" >用户名不能为空</p>
              </div>
              <el-input
                placeholder="密码"
                v-model="password"
                style="width: 98%"
                name="password"
                clearable
                @blur = "passwordValidate"
                @focus = "passwordTip1 = false"
                type="password"
                @keyup.enter.native="click_login">
                <i slot="prefix" class="el-input__icon el-icon-erp-password"></i>
              </el-input>
              <div class="Tip2" style="height: 20px">
                <p style="color: red;font-size: 12px" v-show="passwordTip1">密码不能为空</p>
              </div>
              <Checkbox v-model="single">下次自动登录</Checkbox>
              <p style="height: 20px"></p>
              <el-button type="primary" class="loginButton" @click="click_login">登录</el-button>
              <p style="height: 10px"></p>
              <router-link to="/fogetpassword" class="forget-passward" tag="a" target="_blank">忘记密码？</router-link>
            </form>
          </div>
          <div class="changeDiv" style="height:60px;margin-top:7px;background-color: rgba(204,229,220,0.42)">
            <p class="identify-login"  @click="phoneNumberLogin">验证码登录</p>
            <router-link class="register-button" to="/regist" tag="a" target="_blank">立即注册</router-link>
          </div>
        </div>
        <!--手机号码登录-->
        <div class="loginDiv" v-if="flag_phoneNumber_login">
          <div class="topDiv">
            <form action="" class="form-normal">
              <p class="form-top-tip">手机号登录</p>
              <br>
              <el-input
                placeholder="手机号"
                v-model="phoneNumber"
                style="width: 98%"
                clearable
                @blur = "validatePhoneNumberInput"
                @focus = "clearPhoneNumberTips">
                <i slot="prefix" class="el-input__icon el-icon-erp-account"></i>
              </el-input>
              <div class="Tip1" style="height: 20px">
                <p style="color: red;font-size: 12px" v-show="phoneNumberTip1">手机号码不能为空</p>
                <p style="color: red;font-size: 12px" v-show="phoneNumberTip2">手机号码输入有误</p>
              </div>
              <div class="validate-message" style="height: 50px;margin-top: 20px">
                <el-input
                  style="width: 200px;float: left;"
                  placeholder="请输入短信验证码"
                  v-model="checkMessageStr"
                  clearable
                  @blur = "messageValidate"
                  @focus = "messageTip1 = false"
                  maxlength="6">
                </el-input>
                <div class="imgcheck">
                  <el-button type="info" v-if="flag_getCode" class="getVerificationCode" @click="getCode">获取验证码</el-button>
                  <el-button type="primary" v-if="!flag_getCode" class="getVerificationCode" >重新获取({{authTime}})</el-button>
                </div>
              </div>
              <div class="Tip2" style="height: 20px;">
                <p style="color: red;font-size: 12px" v-show="messageTip1">请输入验证码</p>
              </div>
              <p style="height: 20px"></p>
              <el-button type="primary" class="loginButton" @click="phoneNumber_login">登录</el-button>
              <p style="height: 10px"></p>
            </form>
          </div>
          <div class="changeDiv" style="height:60px;margin-top:25px;background-color: rgba(204,229,220,0.42)">
            <p class="identify-login" @click="accountlogin">账号登录</p>
            <router-link class="register-button" to="/regist" tag="a" target="_blank">立即注册</router-link>
          </div>
        </div>
        <el-carousel  :interval="5000" height="600px"  class="el-carousel">
          <el-carousel-item v-for="item in imgList" :key="item">
            <img :src=item >
          </el-carousel-item>
        </el-carousel>
        <div class="middleText">
          <h3 class="text1">大容量云存储</h3>
        </div>
      </div>
      <div class="banner2">
        <div id="block1" class="section" style="width: 1300px;margin: 0 auto;">
        <ul class="xz_list clearfix" style="list-style-type: none">
          <li>
            <div class="bannerLeft1">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="el-icon-edit"></i>
                  <h4>云存储</h4>
                  <p>智能存储、在线预览、快速转换</p>
                </div>
                <div class="mask">
                  <img src="/static/image/responseimg1.png" alt="">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="bannerLeft2">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="el-icon-view"></i>
                  <h4>分布式</h4>
                  <p>Docker 镜像 反向代理 多端存储</p>
                </div>
                <div class="mask">
                  <img src="/static/image/图2.png" alt="">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="bannerLeft3">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="el-icon-document"></i>
                    <h4>在线保存</h4>
                    <p>文档上传 在线预览 在线下载</p>
                </div>
                <div class="mask">
                  <img src="../../static/image/图1.png" alt="">
                </div>
              </div>
            </div>
          </li>
        </ul>
        </div>
      </div>
      <div class="middleText2">
        <h3 class="text1">数据安全存储</h3>
      </div>
      <div class="banner2">
      <div id="block2" class="section" style="width: 1300px;margin: 0 auto;">
          <ul class="xz_list clearfix" style="list-style-type: none">
            <li>
              <div class="wrap">
                <img src="../../static/image/block2a.png" class="main"><img
                src="../../static/image/block21.png" class="a image"><img
                src="../../static/image/block22.png" class="b imagef"><img
                src="../../static/image/block22a.png" class="c"><img
                src="../../static/image/block23.png" class="d image">
              </div>
              <div class="wrapRight" >
                <h4>
                  加密存储
                </h4>
                <p>采用分块加密存储技术，保障数据安全</p>
                <h4>
                  安全传输
                </h4>
                <p>采用SSL加密传输，多重身份校验</p>
                <h4>
                  数据管理
                </h4>
                <p>异地备份，多机房容灾机制，安全可靠</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="footer-text">
          <p class="links">
            <a href="#">使用协议</a>
            <span class="divider">|</span>
            <a href="#">隐私协议</a>
            <span class="divider">|</span>
            <a href="#">帮助中心</a>
            <span class="divider">|</span>
            <a href="#">问题反馈</a>
            <span class="divider">|</span>
          </p>
          <p class="links"> 根据国家版权局要求：用户应遵守著作权法，尊重著作权人合法权益，不违法上传、存储并分享他人作品。 </p>
          <p class="links">侵权投诉指引 | 举报或投诉 </p>
          <p class="links"> Copyright &copy; 2018.7-8 云存储 版权所有</p>
        </div>
      </div>
    </div>
</template>
<script>
  import qs from 'qs'
  import store from '../vuex/store'
  import {mapGetters} from 'vuex'
  import {asyncRouterMap} from "../router/index";
    export default {
        name: "login",
      data(){
          return{
            imgList: [
              require('../../static/image/item.jpg'),
              require('../../static/image/item3.jpg'),
              require('../../static/image/item2.jpg')],
            value1:'',
            password:'',
            single:false,
            usernameTip1:false,
            usernameTip2:false,
            passwordTip1:false,
            flag_getCode:true,
            checkMessageStr:'',
            authTime:'60',
            flag_phoneNumber_login:false,
            flag_account_login:true,
            messageTip1:false,
            phoneNumber:'',
            phoneNumberTip1:false,
            phoneNumberTip2:false,
            role:'',
            isLogin:false
          }
      },
      methods:{
          validatePhoneNumberInput(){
            let telreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!telreg.test(this.phoneNumber)){
              this.phoneNumberTip2 = true;
            }
          },
        validateInput1(){
          if(this.value1 == null){
            this.usernameTip1 = true;
          }
        },
          passwordValidate(){
            if (this.password == null){
              this.passwordTip1  =true;
            }
         },
        messageValidate(){
            if(this.checkMessageStr == ''){
              this.messageTip1 = true;
            }
        },
        clearUsernameTips(){
            this.usernameTip1 = false;
            this.usernameTip2 = false;
        },
        clearPhoneNumberTips(){
          this.phoneNumberTip1 = false;
          this.phoneNumberTip2 = false;
        },
        accountlogin(){
          this.flag_account_login = true;
          this.flag_phoneNumber_login = false;
          if(this.usernameTip2==true || this.usernameTip1 == true ||this.passwordTip1 == true){
            this.usernameTip2 = false;
            this.usernameTip1 = false;
            this.passwordTip1 = false;
          }
        },
        phoneNumberLogin(){
          this.flag_account_login = false;
          this.flag_phoneNumber_login = true;
          if(this.usernameTip2==true || this.usernameTip1 == true ||this.passwordTip1 == true){
            this.usernameTip2 = false;
            this.usernameTip1 = false;
            this.passwordTip1 = false;
          }
        },
        click_login(){
          if( !this.value1 || !this.password){
            this.$message.error("用户名或密码不能为空!");
            return;
          }

          this.$axios.post("/login",{
            username:this.value1,
            password:this.password
          })
            .then(function (res) {
              console.log(res);
              sessionStorage.setItem('userToken',res.headers.authorization);
              if(res.data.status == false){
                this.$message.error("用户名或密码错误");
                return;
              } else {
                this.getToken()
              }
            }.bind(this))
            .catch(function (error) {
            console.log(error);
          })


          // let routerMap = new Array();
          // for(let i=0;i<asyncRouterMap.length;i++){
          //   // console.log(asyncRouterMap[i]);
          //   if(0 == asyncRouterMap[i].meta.role){
          //     routerMap.push(asyncRouterMap[i]);
          //   }
          // }
          // this.$router.addRoutes(routerMap);
          // console.log(routerMap);
          //
          // if(this.role == 1){
          //   this.$router.push('/home/handlefile');
          // }
          // if(this.role == 0){
          //   this.$router.push('/adminhome');
          // }


          // if (this.single){
          //   localStorage.setItem('username',this.value1);
          //   localStorage.setItem('password',this.password);
          // } else {
          //   localStorage.clear();
          // }
          // this.$router.push('/home/handlefile');
          // this.$router.push('/adminhome');

        },
        getToken(){
          this.$axios.get('/token')
            .then(function (res) {
              console.log(res);
              sessionStorage.setItem('username',res.data.data.userInfo.username);
              sessionStorage.setItem('userAvatar',res.data.data.userInfo.icon);
              sessionStorage.setItem('userId',res.data.data.userInfo.id);
              this.$store.commit('userImageGet',res.data.data.userInfo.icon);
              this.$store.commit('userInfoGet',res.data.data.userInfo);
              store.state.userInfo = res.data.data.userInfo;
              console.log(store.state.userInfo);
              // store.state.username = res.data.data.userInfo.username;
              // console.log(store.state.username);
              //role_id =1 为普通用户 role_id= 0 为管理员用户
              if(res.data.data.role_id == 1){
                this.role = res.data.data.role_id;
                sessionStorage.setItem('currentRole','1');
              }
              if(res.data.data.role_id == 0){
                sessionStorage.setItem('currentRole','0');
                this.role = res.data.data.role_id;
              }
              let routerMap = new Array();
              for(let i=0;i<asyncRouterMap.length;i++){
                if(sessionStorage.getItem('currentRole') == asyncRouterMap[i].meta.role){
                  routerMap.push(asyncRouterMap[i]);
                }
              }
              this.$router.addRoutes(routerMap);
              // console.log(routerMap);

              if(this.role == 1){
                this.$router.push('/home/disk/handlefile');
                this.$message({
                  message: sessionStorage.getItem('username')+'，欢迎登陆',
                  type: 'success',
                  center: true
                });
              }
              if(this.role == 0){
                this.$router.push('/adminhome');
              }
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        },
        phoneNumber_login(){
          if( !this.phoneNumber || !this.checkMessageStr){
            this.$message.error("手机号或验证码不能为空!");
            return;
          }
        },
        getCode(){
          this.flag_getCode = false;
          this.authTime = 60;
          let auth_timer = setInterval(()=>{
            this.authTime--;
            if(this.authTime <= 0){
              this.flag_getCode = true;
              clearInterval(auth_timer);
            }
          },1000);
        }
      },
      mounted(){
          this.value1 = localStorage.getItem('username');
          this.password = localStorage.getItem('password');
          if (this.value1 !=  null){
            this.single = true;
          } else {
            this.single = false;
          }
      },
      created(){
      },
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  *{
    margin: 0;
    padding: 0;
    font-family: Microsoft YaHei,SimHei;
  }
  .logo-header{
    width: 100%;
    min-width: 1300px;
    height: 70px;
    position: absolute;
    top: 0px;
    /*background-color: rgba(69, 69, 69, 0.63);*/
    z-index: 999;
  }
  .logo{
    background:url("/static/image/云存储-01.png") no-repeat scroll 0 ;
    float: left;
    height: 52px;
    margin: 18px 0 0 25px;
    overflow: hidden;
    width: 260px;
    display: inline;
    z-index: 3;
  }
  .login-title{
    float: right;
    margin-right: 100px;
  }
  .login-title > ul >li{
    float: left;
    text-decoration: none;
    margin: 25px 30px 0 0 ;
    color: white;
    cursor: pointer;
  }
  .login-title > ul >li:hover{
    color: #3c51e1;
  }
  .centry-enter{
    background-color: red;
    color: white;
    padding: 0px 8px;
    border-radius: 20px;
  }
  .el-carousel{
    width: 100%;
    min-width: 1300px;
  }
  .el-carousel__item img {
    opacity: 0.75;
    margin-left: auto;
    margin-right: auto;
    width:100%;
    height:100%;
  }
  .loginDiv{
    position: absolute;
    top: 100px;
    right: 100px;
    width: 350px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 3px;
    z-index: 999;
    vertical-align: middle;
    box-shadow: rgba(0,0,0,0.3) 0 0 50px;
  }
  .form-normal{
    padding: 0 20px;
  }
  .form-top-tip{
    font-size: 20px;
    text-align: center;
    padding: 30px 0 12px 0;
    /*font-weight: 100;*/
    color: #333;
    line-height: 26px;
  }
  .loginButton{
    width: 98%;
    height: 42px;
  }
  .forget-passward{
    color: gray;
    font-size: 14px;
  }
  .identify-login{
    margin-left: 20px;
    display: inline-block;
    line-height: 65px;
    width: 80px;
    font-size: 14px;
    color: #3582f8;
    cursor: pointer;
  }
  .register-button{
    display: inline-block;
    float: right;
    border: 1px solid rgba(255, 69, 0, 0.48);
    padding: 6px 0;
    border-radius: 4px;
    line-height: 14px;
    color: #f79e7d;
    width: 80px;
    text-align: center;
    margin-right: 20px;
    margin-top: 17px;
  }
  .imgcheck{
    display: inline-block;
    float: right;
    margin-right: 5px;

  }
  .getVerificationCode{
    padding: 10px;
  }
  .bannerLeft1{
    width: 23%;
    height: 300px;
    position: relative;
    margin-left: 100px;
    margin-top: 50px;
    background-color: gainsboro;
    float: left;
  }
  .view{
    float: none;
    overflow: hidden;
    position: relative;
    text-align: center;
    background-color: #f5f5f5;
    /*min-height: 300px;*/
  }
  .agile_text_box{
    width: 300px;
    height: 300px;
  }
  .agile_text_box i{
    font-size: 32px;
    padding-top: 50px;
    padding-bottom: 20px;
  }
  .agile_text_box h4 {
    font-size: 1.4em;
    color: #7db2ff;
    line-height: 1.5em;
    margin: 0.5em 0 .5em;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .agile_text_box p {
    line-height: 1.8em;
    width: 89%;
    margin: 0 auto;
    font-size: 0.9em;
    color: #777;
  }
  .view {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .view-tenth img{
    -moz-transform: scaleY(1);
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
    -moz-transition: all 0.7s ease-in-out;
    -webkit-transition: all 0.7s ease-in-out;
    transition: all 0.7s ease-in-out;
    width: 100%;
  }
  .view-tenth .mask{
    transition: all 0.5s linear;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .view-tenth img{
    filter: alpha(opacity=1);
    opacity: 1;
    display: block;
    position: relative;
  }
  .view-tenth:hover .mask{
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
    opacity: 1;
  }
  .bannerLeft2{
    position: relative;
    width: 23%;
    height: 300px;
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 50px;
    background-color: gainsboro;
    float: left;
  }
  .bannerLeft3{
    position: relative;
    width: 23%;
    height: 300px;
    margin-right: 100px;
    margin-top: 50px;
    background-color: gainsboro;
    float: right;
  }
.middleText{
  margin-top: 40px;
  text-align: center;
}
.text1{
  color: #7db2ff ;
}
.text1::before,.text1::after{
  content: '';
  display: inline-block;
  height: 4px;
  width: 15px;
  border-radius: 4px;
  background-color: #2ac38a;
  vertical-align: middle;
  margin: 0 20px;
}
  .middleText2{
    position: relative;
    margin-top: 60px;
    clear: both;
    text-align: center;
  }
  .banner2{
    position: relative;
  }

  /*第二块*/
  #block2 .xz_list li:first-child img {
    max-width: 311px
  }

  #block2 .xz_list li .wrap {
    width: 311px;
    position: relative;
    margin-left: 300px;
    float: left;
  }
  .wrapRight {
    float: left;
    width: 400px;
    height: 400px;
    margin-left: 160px;
    position: relative;
  }
  .wrapRight h4{
    color: #3c4441;
    font-size: 18px;
    margin: 50px 0 10px;
  }
  .wrapRight p{
    color: #3c4441;
    font-size: 16px;
    line-height: 22px;
  }
  #block2 .xz_list li .wrap img {
    width: auto
  }

  #block2 .xz_list li .wrap .a {
    position: absolute;
    top: 58px;
    left: 76px
  }

  #block2 .xz_list li .wrap .b {
    position: absolute;
    top: 117px;
    left: 157px
  }

  #block2 .xz_list li .wrap .c {
    position: absolute;
    bottom: 0;
    left: 206px
  }

  #block2 .xz_list li .wrap .d {
    position: absolute;
    top: 221px;
    left: 50px
  }

  #block2 .xz_list li img {
    width: 100%;
    max-width: 430px;
    margin: 0 auto
  }

  .image {
    -webkit-animation-name: spin;
    -webkit-animation-duration: 4s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 4s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spin;
    -ms-animation-duration: 4s;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;
    animation-name: spin;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear
  }

  .imagef {
    -webkit-animation-name: spinf;
    -webkit-animation-duration: 4s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spinf;
    -moz-animation-duration: 4s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spinf;
    -ms-animation-duration: 4s;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;
    animation-name: spinf;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear
  }

  @-ms-keyframes spin {
    from {
      -ms-transform: rotate(0)
    }
    to {
      -ms-transform: rotate(360deg)
    }
  }

  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0)
    }
    to {
      -moz-transform: rotate(360deg)
    }
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0)
    }
    to {
      -webkit-transform: rotate(360deg)
    }
  }

  @-ms-keyframes spinf {
    from {
      -ms-transform: rotate(360deg)
    }
    to {
      -ms-transform: rotate(0)
    }
  }

  @-moz-keyframes spinf {
    from {
      -moz-transform: rotate(360deg)
    }
    to {
      -moz-transform: rotate(0)
    }
  }

  @-webkit-keyframes spinf {
    from {
      -webkit-transform: rotate(360deg)
    }
    to {
      -webkit-transform: rotate(0)
    }
  }
  /*页脚*/
  div.footer {
    background-color: rgba(118, 184, 159, 0.37);
    height: 140px;
    clear: both;
    margin-top: 40px;
    position: relative;
    min-width: 1300px;
  }
  .footer-text{
    padding-top: 20px;
    margin-left: 100px;
    color: #8d8d8d;
    font:12px "Microsoft YaHei",Verdana;
  }
  .footer-text .links{
    margin-bottom: 10px;
    overflow: hidden;
  }
  .footer-text .links a{
    color: #8d8d8d;
    text-decoration: none;
    outline: none;
  }
  .footer-text .links .divider{
    padding: 0 3px;
  }
  a{
    text-decoration: none;
  }
</style>
