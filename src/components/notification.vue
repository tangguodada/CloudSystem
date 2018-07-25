<template>
    <div id="notification">
      <div class="notification-head">
        <ul id="notification-menu">
          <li class="notification-menu-active" @click="getnotifications">全部通知&#12288;</li>
          <li @click="getntf(0)">申请通知&#12288;</li>
          <li @click="getntf(1)">禁封通知&#12288;</li>
          <li @click="getntf(2)">赞通知&#12288;</li>
          <li @click="getntf(3)">分享通知&#12288;</li>
          <li @click="getntf(4)" style="border-right: 0px">关注通知&#12288;</li>
          <li style="border-right: 0px;float: right;margin-right: 10px"><el-button type="primary" style="height: 30px" @click="allread">全部已读</el-button></li>
        </ul>
      </div>
      <div class="notification-content">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="info"
            label="标题内容">
          </el-table-column>
          <el-table-column
            label="通知时间"
            width="200">
            <template slot-scope="scope">
              <span>{{tstime(scope.row.createTime)}}</span>
            </template>>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.type == 0"
                size="medium"
                type="primary"
                @click="handleEdit(scope.row.id)" style="height: 20px">同意申请</el-button>
              <el-button
                v-show="scope.row.type != 0"
                size="medium"
                type="primary"
                @click="handleEditRead(scope.row.id)" style="height: 20px;margin-left: 0px">标记已读</el-button>
              <el-button
                v-show="scope.row.type == 3"
                size="medium"
                type="primary"
                @click="handleDelete(scope.row)" style="height: 20px;color: white;background-color: green">保存</el-button>
            </template>>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="保存到" :visible.sync="dialogTableVisible">
        <el-tree
          v-if="dialogTableVisible"
          :props="props"
          :load="loadNode"
          lazy
          accordion
          highlight-current
          @node-click="handleNodeClick">
          <div slot-scope="{node,data}" style="display: flex;align-items: center;">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#el-icon-erp-wenjianjiaweigongxiang"></use>
            </svg>
            <span>&#12288;{{node.label}}</span>
          </div>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button style="width: 70px;height: 40px" @click="dialogTableVisible = false">取 消</el-button>
          <el-button style="width: 70px;height: 40px" type="primary" @click="keepfile()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "notification",
      data() {
        return {
          tableData: [],
          dialogTableVisible:false,
          currenttreenodeid:'',
          currentfileid:'',
          props: {
            label: 'name',
            children: 'zones'
          },
          currentindex:10,
          ntfid:''
        }
      },
      methods:{
        getntf(val){
          this.currentindex = val;
          this.$axios.get("/message/unread/"+val,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              if (res.data.data.length != 0) {
                this.tableData = [].concat(res.data.data)
              } else {
                this.tableData = [];
                let ud = false;
                this.$store.commit('userNtf',ud);
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getnotifications(){
          this.$axios.get("/message/all_unread",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              if (res.data.data.length != 0) {
                this.tableData = [].concat(res.data.data)
              } else {
                this.tableData = [];
                let ud = false;
                this.$store.commit('userNtf',ud);
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        tstime(val) {
          let transformtime = new Date(val);
          let commonTime = transformtime.toLocaleDateString();
          Date.prototype.toLocaleDateString = function (commonTime) {
            return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
          };
          return commonTime;
        },
        handleEdit(id) {
          this.$axios.put("/friend/add_friend/"+ id,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.$message({
                  message: '好友添加成功',
                  type: 'success',
                  center: true
                });
                this.getnotifications();
              } else {
                this.$message.error('好友添加失败');
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
          if (this.currentindex != 10){
            this.getntf(this.currentindex);
          } else {
            this.getnotifications();
          }
        },
        handleEditRead(id){
          this.$axios.put("/message/message_readed/"+ id,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.$message({
                  message: '成功标记为已读',
                  type: 'success',
                  center: true
                });
                if (this.currentindex != 10){
                  this.getntf(this.currentindex);
                } else {
                  this.getnotifications();
                }
              } else {
                this.$message.error('标记为已读失败');
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        handleDelete(val) {
          this.ntfid = val.id;
          this.currentfileid = val.fileId;
          this.dialogTableVisible = true;
        },
        allread(){
          this.$axios.put("/message/all",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.$message({
                  message: '全部标记为已读',
                  type: 'success',
                  center: true
                });
                this.getnotifications();
              } else {
                this.$message.error('标记为已读失败');
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        handleNodeClick(data) {
          this.currenttreenodeid = data.id;
        },
        loadNode(node, resolve) {
          if (node.level === 0) {
            return resolve([{
              name:'全部文件',
              id:0
            }]);
          }
          setTimeout(() => {
            this.$axios.get("/userfile/getfolder/" + node.data.id, {
              headers: {
                'Authorization': sessionStorage.getItem('userToken')
              }
            })
              .then(function (res) {
                resolve(res.data.data);
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          }, 100);
        },
        keepfile(){
          this.$axios.post("/usershare/save",{
            fileId:this.currentfileid,
            parentId:this.currenttreenodeid,
            messageId:this.ntfid
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  center: true
                });
                this.dialogTableVisible = false;
                if (this.currentindex != 10){
                  this.getntf(this.currentindex);
                } else {
                  this.getnotifications();
                }
              } else {
                this.$message.error('保存失败');
                this.dialogTableVisible = false;
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      mounted(){
        let h=document.documentElement.clientHeight-60;
        $("#notification").css('height',h + 'px');
        this.getnotifications();
        var menu = $('#notification li');
        menu.click(function () {
          for (var i=0;i<menu.length;i++) {
            menu[i].className=""
          }
          this.className="notification-menu-active";
        })
      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  *{
    margin: 0;
    padding: 0;
  }
  #notification{
    background-color: rgb(244,244,244);
    width: 100%;
  }
  .notification-head{
    margin-top: 10px;
    padding-top: 20px;
  }
  ul{
    display: block;
    height: 10%;
  }
  li{
    float: left;
    list-style: none;
    margin-left: 20px;
    cursor: pointer;
    border-right: 1px solid black;
  }
  li:hover{
    color: blueviolet;
  }
  .notification-content{
    margin-top: 40px;
    width: 100%;
    height: 200px;
    background-color: white;
  }
  .notification-menu-active{
    color: blueviolet;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .icon{
    width: 25px;
    height: 25px;
  }
</style>
