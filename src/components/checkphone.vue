<template>
  <div id="checkphone">
    <div class="regist-head">
      <div class="regist-head-content">
        <img src="/static/image/云存储-01.png" width="200px" height="60px"/>
        <span><router-link to="/regist">注册账号</router-link></span>
        <div style="float: right">
          <router-link to="/">登录</router-link>
        </div>
      </div>
    </div>
    <div class="container-title">
      信息验证
    </div>
    <div class="container">
      <div style="float: left;margin-left: 140px;padding-top: 40px">
        <span>短信验证码已发送至</span>
        <span style="color: deepskyblue">{{phonenumber}}</span>
      </div>
      <form action="javascript:;">
        <div class="container-form-password">
          <el-input
            style="width: 200px;float: left;"
            placeholder="请输入校验码"
            v-model="checkstr"
            clearable
            name="checkstr"
            maxlength="6">
          </el-input>
          <div class="imgcheck">
            <el-button id="getCode" type="info" v-if="flag_getCode" class="getVerificationCode" @click="getCode">重新获取</el-button>
            <el-button type="primary" v-if="!flag_getCode" class="getVerificationCode" disabled>已发送({{authTime}})</el-button>
          </div>
        </div>
        <div class="btn-submit">
          <el-button type="primary" style="height: 40px;width: 100%" @click="click_regist">立即注册</el-button>
        </div>
        <div style="float: left;margin-left: 140px">
          <span style="color: deepskyblue;font-size: 12px"><a>短信验证码没收到?</a></span>
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
  let number = 0;
  export default {
    name: "checkphone",
    data(){
      return{
        checkstr:'',
        canvasstr:'',
        phonenumber:'',
        authTime:'60',
        flag_getCode:true,
        username:'',
        password:''
      }
    },
    methods:{
      getParams () {
        this.phonenumber = this.$route.query.phonenumber;
        this.username = this.$route.query.username;
        this.password = this.$route.query.password;
        console.log(this.phonenumber);
        console.log(this.username);
        console.log(this.password);
        $('#getCode').click();
      },
      click_regist(){
        this.$axios.post('/auth/validate',{
          'username':this.username,
          'password':this.password,
          'msgNum':this.checkstr
        }).then(function(res){
          console.log(res);
            if(res.data.info == "成功注册"){
            this.$message.success('用户注册成功,请登录!');
            this.$router.push('/');
            }
        }.bind(this))
          .catch(function(error){
            console.log(error);
          })
      },
      getCode(){
        number = this.phonenumber;
        this.flag_getCode = false;
        this.authTime = 60;
        let auth_timer = setInterval(()=>{
          this.authTime--;
          if(this.authTime <= 0){
            this.flag_getCode = true;
            clearInterval(auth_timer);
          }
        },1000);
        console.log(number);
        this.$axios.post('/auth/send',{
            phoneNumber:number,
        })
          .then(function (res) {
          console.log(res);

        }.bind(this))
          .catch(function(error){
            console.log(error);
          })
      }
    },
    mounted(){
      this.getParams();
    },
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #checkphone{
    background-color: rgb(245,245,245);
    min-width: 700px;
    height: 100%;
  }
  .regist-head{
    background-color: rgb(232,232,232);
    height: 68px;
  }
  .regist-head-content{
    width: 700px;
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
    height: 340px;
    font-size: 20px;
    text-align: center;
    padding: 20px;
  }
  .container-form-password{
    width: 380px;
    height: 40px;
    margin: 100px auto 0 auto;
  }
  .other-info{
    width: 700px;
    min-width: 700px;
    margin: 40px auto 0 auto;
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
    margin-left: 10px;
    height: 40px;
    float: right;
  }
  .btn-submit{
    width: 380px;
    height: 50px;
    margin: 70px auto 0 auto;
  }
  span{
    color: #000;
    font-size: 14px;
  }
  .other-info div{
    display: inline-block;
  }
  form{
    margin-top: 50px;
  }
  .getVerificationCode{
    padding: 10px;
    margin-right: 10px;
  }
</style>
