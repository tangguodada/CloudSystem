<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-message"></i> 系统消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column >
              <!--带数据的具名插槽-->
              <template slot-scope="scope">
                <span>{{scope.row.info}}</span>
              </template>
            </el-table-column>
            <el-table-column >
              <!--带数据的具名插槽-->
              <template slot-scope="scope">
                <span >{{scope.row.position}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px">
              <template slot-scope="scope">
                <span >{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary" @click="readflag" :disabled="unread.length === 0">全部标为已读</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "system-message",
      data() {
        return {
          message: 'first',
          showHeader: false,
          unread: [],
          read: [],
          recycle: [],
        }
      },
      methods: {

          getUnreadMessage(){
            this.$axios.get('/fdfsException/unreadMessage')
              .then(function(res){
                // console.log(res);
                this.unread = res.data.data;
                for(let i=0;i<this.unread.length;i++){
                  let time = this.unread[i].createTime;
                  let transformtime = new Date(time);
                  let updatetime = transformtime.toLocaleDateString().replace(/\//g,"-")+" "+transformtime.toTimeString().substr(0,8);
//                  console.log(updatetime);
                  this.unread[i].createTime = updatetime;
                }
              }.bind(this))
              .catch(function(error){
                console.log(error);
              })
          },
          readflag(){
            this.$axios.put('/fdfsException/readAll')
              .then(function(res){
                console.log(res);
                this.getUnreadMessage();
                this.$store.commit('userMessage_flag',false);
              }.bind(this))
              .catch(function(error){
                console.log(error);
              })
          },
        //删除按钮事件
        handleDel(index) {
          const item = this.read.splice(index, 1);
          this.recycle = item.concat(this.recycle);
        },
        //还原按钮事件
        handleRestore(index) {
          const item = this.recycle.splice(index, 1);
          this.read = item.concat(this.read);
        }
      },
      computed: {
        unreadNum(){
          return this.unread.length;
        }
      },
      created(){
          this.getUnreadMessage();
      },
    }
</script>

<style scoped>
  .container {
    margin-top: 40px;
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 92%;
  }
  .message-title{
    cursor: pointer;
  }
  .handle-row{
    margin-top: 30px;
  }
</style>
