<template>
    <div class="usertable">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-message"></i> 用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user-table">
        <div class="handle-box">
          <el-button type="primary" icon="delete" class="handle-del mr10" @click="freezeAll">批量封禁</el-button>
          <div class="search-box">
            <el-input v-model="search_word" placeholder="搜索用户名" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
          </div>

        </div>
          <el-table
            :data="userList"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          border>
            <el-table-column
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column
              label="注册日期"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户名"
              width="220"
              align="center"
              >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" >
                  <span>姓名: {{ scope.row.username}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>性别: {{ scope.row.sex}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p style="margin-top: 8px">电话号码: {{ scope.row.tel}}</p>
                  <p>邮箱: {{ scope.row.email }}</p>
                  <p>个性签名: {{ scope.row.sign }}</p>
                  <div slot="reference" class="name-wrapper">
                    <span size="medium">{{ scope.row.username }}</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240px" align="center" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :disabled="scope.row.freeze"
                  @click="handleEdit(scope.row.id)">封禁</el-button>
                <el-button
                  size="mini"
                  @click="handleUnfreezeTip(scope.row.id)">解禁</el-button>
              </template>
            </el-table-column>
            <el-table-column label="封禁状态" align="center">
              <template slot-scope="scope">
                <span style="color: red">{{scope.row.freeze}}</span>
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

        <el-dialog title="提示" :visible.sync="editVisible" width="30%">
          <div class="del-dialog-cnt">确定禁封该用户？</div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlefreeze">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="unfreezeVisible" width="300px" center>
          <div class="del-dialog-cnt">确定解禁该用户？</div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="unfreezeVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUnfreeze">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "usertable",
      data() {
        return {
          search_word:'',
          currentPage1:1,
          pagetotal:0,
          unfreezeVisible:false,
          editVisible:false,
          userList:[],
          status:'',
          idx:-1,
          userId:'',
          is_search: false,
          unfreezeuserId:'',
        }
      },
      methods: {
        //  分页处理函数
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage1 = val;
          this.getTableList();
        },
        //  获取用户列表
        getTableList(){
          this.$axios.get('/alluser'+'?page='+this.currentPage1+'&page_size=10')
            .then(function(res){
              // console.log(res);
              this.userList =res.data.data.records;
              for(let i=0;i<this.userList.length;i++){
                let time = this.userList[i].createTime;
                let transformtime = new Date(time);
                let commonTime = transformtime.toLocaleDateString().replace(/\//g,"-");
                this.userList[i].createTime = commonTime;
              }
              console.log(this.userList);
              this.pagetotal = res.data.data.total;
              // console.log(this.pagetotal);
            }.bind(this))
            .catch(function(error){
              console.log(error);
            });
        },

        //  封禁某个用户时弹出dialog
        handleEdit(id) {
          this.userId = id;
          this.editVisible = true;
        },
        //封禁某个用户时发送请求
        handlefreeze(){
          this.$axios.put('/freeze/'+this.userId).then(function(res){
//            console.log(res);
            this.getTableList();
          }.bind(this))
            .catch(function(error){
              console.log(error);
            });
          this.$message.success(`封禁该用户成功`);
          this.editVisible = false;
        },
        //禁封某个用户时弹出dialog
        handleUnfreezeTip(id){
          this.unfreezeuserId = id;
          this.unfreezeVisible = true;
        },
        //禁封某个用户时的请求
        handleUnfreeze(){
          this.$axios.put('/unfreeze/'+this.unfreezeuserId).then(function(res){
//            console.log(res);
            this.getTableList();
          }.bind(this))
            .catch(function(error){
              console.log(error);
            });
          this.unfreezeVisible = false;
          this.$message.success("解禁该用户成功!");
        },
        //搜索用户
        search() {
          if(this.search_word == null){
            this.getTableList();
          }
          this.$axios.post('/search'+'?username='+this.search_word)
            .then(function(res){
//              console.log(res);
              if(res.data.status == true){
                this.userList = res.data.data;
              }else if(res.data.status == false){
                this.$message.warning("您搜索的用户不存在");
              }else{
                this.getTableList();
              }
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        },
        handleSelectionChange(val){
          this.multipleSelection = val;
        },

        //批量禁封用户
        freezeAll(){
          let comments = this.multipleSelection;
          let num = [];
          for(let i=0;i<comments.length;i++){
            num.push(comments[i].id);
//            console.log(num);
          }
          let numJoin =  num.join(',');
//          console.log(numJoin);
          this.$axios.put('/freeze'+ '?list='+numJoin +'')
            .then(function(res){
//              console.log(res);
              this.getTableList();
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        },


      },
      created(){
        this.getTableList();
      }

    }
</script>

<style scoped>
.user-table{
  margin-top: 40px;
  margin-left: 30px;
  padding: 25px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;

}
.handle-box {
  margin-bottom: 20px;
}
.search-box{
  float: right;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>
