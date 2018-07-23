<template>
    <div id="shareconcernme">
      <div style="width: 100%;height: 40px"></div>
      <h4>Ta有{{concernnum}}个粉丝</h4>
      <hr />
      <el-row>
        <el-col :span="6" v-for="(item, index) in concernlist" :key="index" :offset="2">
          <el-card :body-style="{ padding: '30px' }">
            <img :src="item.icon" alt="" style="display: block;float: left">
            <span style="display: block;float: left">&#12288;{{item.username}}</span>
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
        name: "shareconcernme",
      data() {
        return {
          concernnum:0,
          concernlist:[]
        }
      },
      methods:{
        getconcern(){
          this.$axios.get("/userConcern/getConcern", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              if (res.data.data != null){
                this.concernnum = res.data.data.length;
                this.concernlist = [].concat(res.data.data)
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
      },
      mounted(){
          this.getconcern();
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
