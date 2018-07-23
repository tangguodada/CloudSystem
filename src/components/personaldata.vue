<template>
    <div class="personaldata">
      <div class="crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-message"></i> 修改资料</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-personal-div">
      <el-form ref="user_info" :model="user_info" label-width="80px">
        <el-form-item label="真名" prop="realname">
          <el-input v-model="user_info.realname" style="width: 80%" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user_info.email" style="width: 80%" clearable @blur="testemail" @focus="flag_emailtip = false"></el-input>
          <p v-if="flag_emailtip" style="color: red">邮箱格式不正确!</p>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="user_info.birthday" style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="user_info.sex" prop="sex">
            <el-radio label="男" ></el-radio>
            <el-radio label="女" ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个性签名" prop="sign">
          <el-input type="textarea" v-model="user_info.sign" style="width: 80%" clearable></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 300px;margin-top: 40px">
          <el-button type="primary" @click="onSubmit()">确认</el-button>

        </el-form-item>
      </el-form>
      </div>
    </div>
</template>

<script>
  import store from '../vuex/store'
  import {mapGetters} from 'vuex'
    export default {
      name: "personaldata",
      data(){
          return{
            user_info: {
              realname: this.$store.state.userInfo.realname,
              email: this.$store.state.userInfo.email,
              birthday: this.$store.state.userInfo.brithday,
              sex: this.$store.state.userInfo.sex,
              sign:this.$store.state.userInfo.sign,
            },
            flag_emailtip:false,
          }
      },
      methods: {
//        邮箱输入验证
        testemail(){
          var  emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
          if(!emailReg.test(this.user_info.email)){
            this.flag_emailtip = true;
          }else{
            this.flag_emailtip = false;
          }
        },
        onSubmit() {
          var brithday = new Date(this.user_info.birthday)
          var Y = brithday.getFullYear() + '-';
          var M = (brithday.getMonth() + 1 < 10 ? '0' + (brithday.getMonth() + 1) : brithday.getMonth() + 1) + '-';
          var D = (brithday.getDate() < 10 ? '0' + (brithday.getDate()) : brithday.getDate());
          // var D = brithday.getDate();
          this.user_info.birthday = Y + M + D;
          this.$axios.post('/userinfo',{
            "realname":this.user_info.realname,
            "email":this.user_info.email,
            // "brithday":this.user_info.birthday,
            "sex":this.user_info.sex,
            "sign":this.user_info.sign,
          })
            .then(function(res){
              store.state.userInfo = res.data.data.userInfo;
              this.$message.success("修改信息成功!");
//              console.log(res);
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        }
      },
      computed:{
        ...mapGetters({
          getuserinfo:'userInfo',
        })
      },
      created(){

      }
    }
</script>

<style scoped>
  .personaldata{
    position: relative;
    width: 700px;
    margin-left: 60px;
    margin-top: 10px;
  }
  .crumb{
    margin-top: 30px;
    margin-left: 30px;
  }
  .form-personal-div{
    position: relative;
    margin-top: 50px;
    margin-left: 40px;
    width: 80%;
  }
</style>
