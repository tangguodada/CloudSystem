<template>
  <div class="disktable">
    <div class="diskcontainer">
      <div class="crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-news"></i> 用户磁盘列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="grogress">
        <div>用户磁盘使用情况所占比例
          <el-button style="float: right" size="mini" v-if="hideprogress" @click="hideProgressTable">隐藏</el-button>
          <el-button style="float: right" size="mini" v-if="showprogress" @click="showProgressTable">显示</el-button>
        </div>
        <hr>
        <el-row>
        <div v-for="(item, index) in userDiskProgress" v-if="flag_progress">
          <el-col :xs="12" :sm="6" :lg="6" class="progress-userdisk">
            <el-progress type="circle" :percentage="parseInt(item.size)"></el-progress>
            <div>{{item.username}}</div>
          </el-col>
        </div>
        </el-row>
      </div>
      <div class="table-message">
        <div>用户磁盘使用情况明细表</div>
        <hr>
        <el-table
          :data="userDiskList"
          style="font-size: 14px">
          <el-table-column
            label="用户名"
           >
            <template slot-scope="scope">
              <span >{{scope.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="磁盘总大小"
            >
            <template slot-scope="scope">
              <span>{{scope.row.storage}} M</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已用空间"
            prop="size">
            <template slot-scope="scope">
              <span>{{scope.row.size}} M</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block" style="margin-top: 30px;float: right;margin-right: 50px;margin-bottom: 40px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="8"
        :page-sizes="[8]"
        layout=" total,sizes, prev, pager, next, jumper"
        :total="pagetotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "userdisk",
      data(){
        return{
          userDiskList: [],
          userDiskProgress:[],
          currentPage1:1,
          pagetotal:0,
          hideprogress:true,
          showprogress:false,
          flag_progress:true,
        }
      },
      methods:{
        hideProgressTable(){
          this.hideprogress = false;
          this.flag_progress = false;
          this.showprogress = true;
        },
        showProgressTable(){
          this.showprogress = false;
          this.flag_progress = true;
          this.hideprogress = true;
        },
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage1 = val;
          this.getTableList();
        },
        getuserdiskProgress(){
          this.$axios.post('/getuserdisk'+'?page='+this.currentPage1+'&page_size=8')
            .then(function(res){
              console.log(res);
              this.pagetotal =  res.data.data.total;
              this.userDiskProgress = res.data.data.records;
              for(let i=0;i<this.userDiskProgress.length;i++){
                var percentage =(parseFloat(((this.userDiskProgress[i].size)/(this.userDiskProgress[i].storage))*100)).toFixed(2)
                this.userDiskProgress[i].size = percentage;
              }
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        },
        getuserdisk(){
          this.$axios.post('/getuserdisk'+'?page='+this.currentPage1+'&page_size=8')
            .then(function(res){
              console.log(res);
              this.userDiskList = res.data.data.records;
              this.pagetotal =  res.data.data.total;
//             for(let i=0;i<this.userDiskList.length;i++){
//                var size = (this.userDiskList[i].size).toFixed(2);
//                this.userDiskList[i].size = size;
//              }
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        }

      },
      created(){
        this.getuserdiskProgress();
        this.getuserdisk();
      },
    }
</script>

<style scoped>
  .grogress{
    position: relative;
    margin-top: 40px;
    margin-left: 30px;
    padding: 16px 25px 25px 25px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 90%;
    /*min-height: 250px;*/
    height: 100%;

  }
  .progress-userdisk{
    /*background-color: #70DB55;*/
    height: 100%;
    text-align: center;
  }
  .table-message{
    margin-top: 40px;
    margin-left: 30px;
    padding: 25px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 90%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
