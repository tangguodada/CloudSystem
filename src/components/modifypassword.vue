<template>
  <div class="modifypassword-div">
    <div class="form-password-div">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 80px">
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

    export default {
      name: "modifypassword",
      data(){
        var validateOldpass = (rule,value,callback) => {
          if(value === ''){
            callback(new Error('请输入密码'));
          }else{
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return{
          ruleForm2: {
            pass: '',
            checkPass: '',
            oldpass:'',
          },
          rules2: {
            oldpass:[
              { validator:validateOldpass,trigger:'blur'}
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        submitForm(formName) {
          let config = {
            headers:{'Content-Type':'application/json'}
          };
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.put('/changepassword',{
                'oldPassword':this.ruleForm2.oldpass,
                'newPassword':this.ruleForm2.pass,
              },config)
                .then(function(res){
//                  console.log(res);
                  if (res.data.status == false ){
                    this.$message.error('原始密码错误!');
                  }else{
                    this.$message.success('密码修改成功,请重新登录!');
                    this.$router.push('/login');
                  }
                }.bind(this))
                .catch(function(error){
                  console.log(error);
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  .modifypassword-div{
    position: relative;
    width: 700px;
  }
  .form-password-div{
    position: relative;
    margin-top: 80px;
    margin-left: 120px;
    width: 60%;
  }
</style>
