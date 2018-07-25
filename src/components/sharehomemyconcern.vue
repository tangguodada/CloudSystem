<template>
    <div id="sharehomemyconcern">
      <div style="width: 100%;height: 40px"></div>
      <h4>Ta关注了{{myconcernnum}}个人</h4>
      <hr />
      <el-row>
        <el-col :span="6" v-for="(item, index) in myconcern" :key="index" :offset="2">
          <el-card :body-style="{ padding: '30px' }">
            <img :src="item.icon" alt="" style="display: block;float: left">
            <span style="display: block;float: left">&#12288;{{item.username}}</span>
            <img src="/static/image/已关注.png" style="cursor: pointer;width: 20px;height: 20px;position: relative;top: 25px;left: -20px" alt="" @click="cancelconcern(item.username)">
            <div style="clear: both;padding-top: 20px">
              说明：Ta还木有个人介绍呢。
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "sharehomemyconcern",
      data() {
        return {
          myconcernnum:0,
          myconcern:[]
        }
      },
      methods:{
        getmyconcern(){
          this.$axios.get("/userConcern/initConcern", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              this.myconcernnum = res.data.data.length;
              this.myconcern = [].concat(res.data.data);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        cancelconcern(val){
          this.$axios.delete("/userConcern/concernDelete/"+val, {
            headers: {
              'Authorization': sessionStorage.getItem('userToken'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.$notify({
                  title: '成功',
                  message: '取关成功',
                  type: 'success'
                });
                this.getmyconcern();
                this.getsharelist();
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '取关失败'
                });
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      mounted(){
        this.getmyconcern();
      }
    }
</script>

<style scoped>
  img{
    width: 60px;
    height: 60px;
  }
  .el-card{
    background-color: #fefefe;
  }
</style>
