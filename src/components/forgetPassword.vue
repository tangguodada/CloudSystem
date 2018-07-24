<template>
    <div class="forget-password">
      <div class="regist-head">
        <div class="regist-head-content">
          <img src="/static/image/云存储-01.png" width="200px" height="60px"/>
          <span><a href="#">找回密码</a></span>
          <div style="float: right;">
            <router-link to="/">登录</router-link>
            <router-link to="/regist">注册</router-link>
          </div>
        </div>
    </div>
      <div class="container-title">
        输入账号
      </div>
      <div class="container">
        <form action="javascript:;">
          <div class="top-message-tip" style="height: 30px;margin: 50px auto 0 auto;">
            <p style="margin-bottom: 8px">请输入已注册的手机号/用户名</p>
          </div>
          <div class="container-form-account">
            <el-input
              placeholder="手机号/用户名"
              v-model="exitAccount"
              clearable
              name="phonenumber"
              @blur="isPhone"
              @focus="flag_exit_account=false"
              maxlength="11">
              <i slot="prefix" class="el-input__icon el-icon-erp-account"></i>
            </el-input>
          </div>
          <div class="input-warning">
            <p v-show="flag_exit_account" >手机号格式有误，请重新输入</p>
            <p v-show="flag2_exit_account" >用户名不能为空</p>
          </div>
          <div class="container-form-password">
            <el-input
              type="password"
              placeholder="密码请设置8-20个字符"
              v-model="newPassword"
              name="newpassword"
              clearable
              @focus="flag_new_password=false"
              @blur="isPassword"
              maxlength="20">
              <i slot="prefix" class="el-input__icon el-icon-erp-password"></i>
            </el-input>
          </div>
          <div class="input-warning">
            <p v-show="flag_new_password">密码不能少于8位字符，请重新输入</p>
          </div>
          <div class="container-form-password">
            <el-input
              type="password"
              placeholder="请再次确认密码"
              v-model="repeatPassword"
              clearable
              @focus="flag_repeat_password=false"
              @blur="isRepeatPassword"
              maxlength="20">
              <i slot="prefix" class="el-input__icon el-icon-erp-password"></i>
            </el-input>
          </div>
          <div class="input-warning">
            <p v-show="flag_validate_password">两次输入的密码不一致，请重新输入</p>
          </div>
          <div class="container-form-password">
            <el-input
              style="width: 200px;float: left;"
              placeholder="请输入短信验证码"
              name="message"
              v-model="checkMessageStr"
              clearable
              maxlength="6">
            </el-input>
            <div class="imgcheck">
              <el-button type="info" v-if="flag_getCode" class="getVerificationCode" @click="getCode">获取验证码</el-button>
              <el-button type="primary" v-if="!flag_getCode" class="getVerificationCode" >重新获取({{authTime}})</el-button>
            </div>
          </div>
          <div class="btn-submit">
            <el-button type="primary" style="height: 40px;width: 100%" @click="click_confirm">确认</el-button>
          </div>
        </form>
      </div>
      <div class="other-info">
        <div style="border-right: 1px solid #828282">
          <span>帮助中心&#12288;</span>
        </div>
        <div>
          <span>&#12288;立即申诉</span>
        </div>
      </div>
      <div class="other-info" style="margin-top: 20px">
        <span>
          Copyright©2018-2018 360.CN All Rights Reserved 云存储系统<br/>
          <a href="#">京ICP证080047号[京ICP备08010314号-6]<br/>
          京公网安备 11000002000006号</a>
        </span>
      </div>
      <div style="height: 20px"></div>
      </div>
</template>

<script>
    export default {
        name: "forget-password",
      data(){
          return{
            exitAccount:'',
            flag_exit_account:false,
            flag2_exit_account:false,
            newPassword:'',
            flag_new_password:false,
            repeatPassword:'',
            flag_repeat_password:false,
            checkMessageStr:'',
            flag_validate_password:false,
            authTime:'60',
            flag_getCode:true,
            time:''
        }
      },
      methods:{
        isPhone(){
          let telreg = /^1[3,4,5,7,8,][0-9]{9}$/
          if (!telreg.test(this.exitAccount)){
            this.flag_exit_account = true;
          }
          if(this.exitAccount == null){
            this.flag2_exit_account = true;
          }
        },
        isPassword(){
          if (this.newPassword.length < 8 || this.newPassword.length > 20){
            this.flag_new_password = true;
          }
          else{
            this.flag_new_password = false;
          }
        },
        isRepeatPassword(){
          if(this.newPassword !== this.repeatPassword){
            this.flag_validate_password = true;
          }
        },
        click_confirm(){
          if (!this.exitAccount || !this.newPassword || !this.repeatPassword || !this.checkMessageStr){
            this.$message.error("请将信息填写完整!");
            return;
          }

          this.$axios.post('/auth/validateNum',
            {
              msgNum:this.checkMessageStr,
            })
            .then(function (res) {
              console.log(res);
              if(res.data.status == true){
                this.$message("重置密码成功，请返回登录");
                this.$router.push('/');
              }
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })

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

          this.$axios.post('/auth/loginByPhone',{
            phoneNumber:this.exitAccount,
            password:this.newPassword
          })
            .then(function (res) {
//              console.log(res);
            })
            .catch(function(error){
              console.log(error);
            })
        }
      },
      created(){

      },
      mounted(){
        // let h=document.documentElement.clientHeight;
        // $(".forget-password").css('height',h + 'px');
      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  *{
    margin: 0;
    padding: 0;
  }
  p{
    margin-left: 22%;
  }
  .forget-password{
    background-color: rgb(245,245,245);
    min-width: 700px;
    height: 100%;
  }
  .regist-head{
    background-color: rgb(232,232,232);
    height: 68px;
  }
  .regist-head-content{
    width: 740px;
    min-width: 700px;
    margin: 0 auto;
    height: 68px;
    line-height: 68px;
  }
  .regist-head-content img{
    margin-right: 25px;
    margin-top: -10px;
  }
  .regist-head-content span{
    border-left: 1px solid #929292;
    color: #000;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    padding-left: 25px;
  }
  .regist-head-content a{
    text-decoration: none;
    color: black;
    margin-right: 20px;
  }
  .regist-head-content a:hover{
    color: deepskyblue;
  }
  .container-title{
    clear: both;
    width: 700px;
    min-width: 700px;
    margin: 72px auto 2px auto;
    background-color: white;
    height: 70px;
    font: 20px 'Microsoft YaHei';
    text-align: center;
    padding: 20px;
  }
  .container{
    width: 700px;
    min-width: 700px;
    margin: 0 auto;
    background-color: white;
    height: 500px;
    font-size: 20px;
    padding: 20px;
  }
  .container-form-account{
    width: 380px;
    height: 40px;
    margin:  0 auto;
  }
  .container-form-password{
    width: 380px;
    height: 40px;
    margin: 0 auto;
  }
  .input-warning{
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
    color: red;
  }
  p{
    font-size: 14px;
  }
  .btn-submit{
    width: 380px;
    height: 50px;
    margin: 40px auto 0 auto;
  }
  span{
    color: #828282
  }
  .other-info{
    width: 700px;
    min-width: 700px;
    margin: 20px auto 0 auto;
    text-align: center;
  }
  .other-info span{
    font-size: 14px;
  }
  .other-info a{
    color: #828282;
    text-decoration: none;
    font-size: 14px;
  }
  .imgcheck{
    display: inline-block;
    /*margin-left: 10px;*/
    /*border:1px solid #000;*/
    /*height: 40px;*/
    float: right;
    /*cursor: pointer;*/
  }
  .getVerificationCode{
    padding: 10px;
    margin-right: 10px;
  }
  .other-info div{
    display: inline-block;
  }
</style>
