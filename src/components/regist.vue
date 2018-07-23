<template>
  <div id="regist">
    <div class="regist-head">
      <div class="regist-head-content">
        <img src="/static/image/云存储-01.png" width="200px" height="60px"/>
        <span><a href="#">注册账号</a></span>
        <div style="float: right">
          <router-link to="/">登录</router-link>
        </div>
      </div>
    </div>
    <div class="container-title">
      注册云存储账号
    </div>
    <div class="container">
      <form action="javascript:;">
        <div class="container-form-account">
          <el-input
            placeholder="请填写用户名"
            v-model="username"
            name="username"
            clearable
            @blur="isUsername"
            @focus="flag_username=false;flag_username1=false"
            maxlength="11">
            <i slot="prefix" class="el-input__icon el-icon-erp-account"></i>
          </el-input>
        </div>
        <div class="input-warning">
          <p v-show="flag_username">用户名不能为空</p>
          <p v-show="flag_username1">用户名已被注册</p>
        </div>
        <div class="container-form-password">
          <el-input
            placeholder="请输入要注册的手机号"
            v-model="account"
            name="phoneNumber"
            clearable
            @blur="isPhone"
            @focus="flag_account=false"
            maxlength="11">
            <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
          </el-input>
        </div>
        <div class="input-warning">
          <p v-show="flag_account">手机号格式有误，请重新输入</p>
          <p v-show="flag_account1">手机号已被注册</p>
        </div>
        <div class="container-form-password">
          <el-input
            type="password"
            placeholder="密码请设置8-20个字符"
            v-model="password"
            clearable
            @focus="flag_password=false;flag_password1=false"
            @blur="isPassword"
            maxlength="20">
            <i slot="prefix" class="el-input__icon el-icon-erp-password"></i>
          </el-input>
        </div>
        <div class="input-warning">
          <p v-show="flag_password">密码不能少于8位字符，请重新输入</p>
          <p v-show="flag_password1">密码至少包含数字大小写字母</p>
        </div>
        <div class="container-form-password">
          <el-input
            style="width: 200px;float: left;"
            placeholder="请输入校验码"
            v-model="checkstr"
            clearable
            maxlength="4">
          </el-input>
          <div class="imgcheck" @click="drawPic">
            <canvas id="canvas" width="120px" height="38px"></canvas>
          </div>
        </div>
        <div class="btn-submit">
          <el-button type="primary" style="height: 40px;width: 100%" @click="click_regist">下一步</el-button>
        </div>
      </form>
      <div class="div-checkbox">
        <input type="checkbox" id="check_box">
        <span>阅读并同意<a href="#">“云存储用户协议”</a>和<a href="#">“云存储用户隐私政策”</a></span>
      </div>
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
    name: "regist",
    data(){
      return{
        username:'',
        account:'',
        password:'',
        checkstr:'',
        flag_username:false,
        flag_username1:false,
        flag_account:false,
        flag_account1:false,
        flag_password:false,
        flag_password1:false,
        canvasstr:'',
        usernameTip:'',
        accountTip:'',
      }
    },
    methods:{
      isUsername(){
        if (this.username == ''){
          this.flag_username = true;
        } else {
          this.flag_username = false;
          this.$axios.post('/auth/checkname',{
            'username':this.username,
          }).then(function (res) {
//            console.log(res);
            this.usernameTip = res.data.info;
            if(this.usernameTip == "用户名已被注册"){
              this.flag_username1 = true;
              return;
            }
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        }
      },
      isPhone(){
        let telreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(!telreg.test(this.account)){
          this.flag_account = true;
        } else {
          this.flag_account = false;

          this.$axios.post('/auth/checkPhone',{
            'phoneNumber':this.account,
          }).then(function (res) {
//            console.log(res);
            this.accountTip = res.data.info;
            if(this.accountTip == "手机号已被注册"){
              this.flag_account1 = true;
              return;
            }
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        }
      },
      isPassword(){
        // if(this.password.length < 8 || this.password.length > 20){
        //   this.flag_password = true;
        // } else {
        //   this.flag_password = false;
        //   let regex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,20}$');
        //   if (!regex.test(this.password)){
        //     this.flag_password1 = true;
        //   } else {
        //     this.flag_password1 = false;
        //   }
        // }
      },
      click_regist(){
        if (this.flag_username || this.username.length == 0){
          this.$message.error('请按要求输入用户名');
          this.drawPic();
          return;
        }
        if (this.flag_account || (this.account.length == 0)) {
          this.$message.error('请输入正确手机号');
          this.drawPic();
          return;
        }
        if (this.flag_password || (this.password.length == 0) ||this.flag_password1){
          this.$message.error('请按要求输入密码');
          this.drawPic();
          return;
        }
        if ((this.checkstr != this.canvasstr) || (this.checkstr.length == 0)){
          this.$message.error('验证码错误');
          this.drawPic();
          return
        }
        if(this.usernameTip == "用户名已被注册" || this.accountTip == "手机号已被注册"){
          this.$message.error('用户名或手机号已被注册');
          return;
        }
        if($("#check_box").is(":checked")){
          this.$router.push({path:'/checkphone',query:{phonenumber:this.account,username:this.username,password:this.password}});
        } else {
          this.$message.error('请阅读并同意“云存储用户协议”和“云存储用户隐私政策”');
          this.drawPic();
          return;
        }
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      randomColor(min, max) {
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
      },
      drawPic() {
        this.canvasstr = '';
        var canvas = document.getElementById("canvas");
        var width = canvas.width;
        var height = canvas.height;
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = this.randomColor(180, 240);
        ctx.fillRect(0, 0, width, height);
        var str = 'ABCDEFGHIJKLMNOPQRSTWXYqwertuyuiopasdfghjklzxcvbnm123456789';
        for(var i = 0; i < 4; i++) {
          var txt = str[this.randomNum(0, str.length)];
          this.canvasstr += txt;
          ctx.fillStyle = this.randomColor(50, 160);
          ctx.font = this.randomNum(25, 40) + 'px SimHei';
          var x = 10 + i * 25;
          var y = this.randomNum(25, 45);
          var deg = this.randomNum(-25, 25);
          ctx.translate(x, y);
          ctx.rotate(deg * Math.PI / 180);
          ctx.fillText(txt, 0, 0);
          ctx.rotate(-deg * Math.PI / 180);
          ctx.translate(-x, -y);
        }
        for(var i = 0; i < 3; i++) {
          ctx.strokeStyle = this.randomColor(40, 180);
          ctx.beginPath();
          ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
          ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
          ctx.stroke();
        }
        for(var i = 0; i < 2; i++) {
          ctx.fillStyle = this.randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    },
    mounted(){
      this.drawPic();
    },
  }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  *{
    margin: 0;
    padding: 0;
  }
  #regist{
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
    height: 500px;
    font-size: 20px;
    text-align: center;
    padding: 20px;
  }
  .container-form-account{
    width: 380px;
    height: 40px;
    margin: 50px auto 0 auto;
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
    border:1px solid #000;
    height: 40px;
    float: right;
    cursor: pointer;
  }
  .btn-submit{
    width: 380px;
    height: 50px;
    margin: 70px auto 0 auto;
  }
  .div-checkbox{
    margin-top: 10px;
    font-size: 10px;
  }
  span{
    color: #828282
  }
  .other-info div{
    display: inline-block;
  }
</style>
