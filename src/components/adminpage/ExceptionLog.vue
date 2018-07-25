<template>
  <div class="system-disk-log">
    <div class="crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-news"></i> fdfs系统日志</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-message">
      <div>fdfs系统日志表</div>
      <hr>
      <el-table
        :data="fdfdExceptionLog"
        style="font-size: 14px">

        <el-table-column
          label="提示信息"
        >
          <template slot-scope="scope">
            <span >{{scope.row.info}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属IP"
        >
          <template slot-scope="scope">
            <span >{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="信息状态"
        >
          <template slot-scope="scope">
            <span>{{scope.row.hasRead}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block" style="margin-top: 30px;float: right;margin-right: 50px;margin-bottom: 40px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        :page-sizes="[10]"
        layout=" total,sizes, prev, pager, next, jumper"
        :total="pagetotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "exception-log",
      data(){
        return{
          fdfdExceptionLog:[],
          currentPage1:1,
          pagetotal:0,
        }
      },
      methods:{
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage1 = val;
          this.getfdfslog();
        },
        getfdfslog(){
          this.$axios.get('/fdfsException/log'+"?current="+this.currentPage1+'&size=10')
            .then(function(res){
               console.log(res);
              this.pagetotal = res.data.data.total;
              this.fdfdExceptionLog = res.data.data.records;
              for(let i=0;i<this.fdfdExceptionLog.length;i++){
                let time = this.fdfdExceptionLog[i].createTime;
                let transformtime = new Date(time);
                let updatetime = transformtime.toLocaleDateString().replace(/\//g,"-")+" "+transformtime.toTimeString().substr(0,8);
//
                this.fdfdExceptionLog[i].createTime = updatetime;
              }

            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        }
      },
      created(){
        this.getfdfslog();
      }
    }
</script>

<style scoped>
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
