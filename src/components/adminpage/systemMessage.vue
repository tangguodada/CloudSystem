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
            <el-table-column>
              <!--带数据的具名插槽-->
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary">全部标为已读</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="handleRestore(scope.$index)">还原</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">清空回收站</el-button>
            </div>
          </template>
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
          unread: [{
            date: '2018-07-05 17:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
          },{
            date: '2018-07-06 13:00:00',
            title: '今晚12点整发大红包，先到先得',
          },{
            date:'2018-07-07 16:59:20',
            title:'请将用户表中的信息筛选一下，删除僵尸用户'
          }],
          read: [{
            date: '2018-07-05 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
          }, {
              date: '2018-07-06 20:00:00',
              title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
            }],
          recycle: [{
            date: '2018-07-06 17:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
          }]
        }
      },
      methods: {
        //  标为已读按钮时间
        handleRead(index) {
          //增删数组中的元素 按数组下标 一个一个删除
          const item = this.unread.splice(index, 1);
          console.log(item);
          this.read = item.concat(this.read);
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
      }
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
