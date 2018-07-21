<template>
    <div id="member">
      <div class="member-bg">
        <h2>超级会员专享超大容量，急速下载特权</h2>
        <div style="width: 100%;text-align: center;margin-top: 30px">
          <el-button style="height: 56px;font-size: 20px" type="warning" round @click="dialogMemberVisible=true">开通超级会员</el-button>
        </div>
        <div style="width: 80%;margin: 50px auto 0 auto">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content">
            <h3>5T超大容量</h3>
            <p>容量扩容至5T，空间更大</p>
            <img src="/static/image/会员超大.png" alt="">
          </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <h3>极速下载</h3>
            <p>下载速度提升,省时省力</p>
            <img src="/static/image/极速下载.png" alt="">
          </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <h3>视频高速通道</h3>
            <p>视频播放极速加载</p>
            <img src="/static/image/视频高速通道.png" alt="">
          </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <h3>转存上限提升</h3>
            <p>单词转存文件提示至5W</p>
            <img src="/static/image/转存上限提升.png" alt="">
          </div></el-col>
        </el-row>
        </div>
      </div>
      <div style="width: 100%;margin-top: 30px">
        <h3>更多超级会员特权</h3>
        <img style="display: block;margin: 0 auto" src="/static/image/更多特权.png" alt="">
      </div>
      <el-dialog
        title="开通超级会员"
        :visible.sync="dialogMemberVisible"
        width="30%">
        <img style="display: block;margin: 0 auto" src="/static/image/付款.png" alt="">
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "member",
      data(){
          return {
            dialogMemberVisible:false
          }
      }
    }
</script>

<style scoped>
  .member-bg{
    width: 100%;
    height: 480px;
    background: url("/static/image/会员.png") no-repeat;
    background-size: 100% 480px;
    padding-top: 50px;
  }
  h2{
    color: #f9d681;
    text-align: center;
  }
  h3{
    text-align: center;
  }
  p{
    text-align: center;
    color: #999;
  }
  .grid-content{
    background-color: #eee;
    height: 260px;
    padding: 40px 10px 0 10px;
  }
  .grid-content img{
    display: block;
    margin: 30px auto 0 auto;
    width: 65px;
    height: 65px;
  }
</style>
