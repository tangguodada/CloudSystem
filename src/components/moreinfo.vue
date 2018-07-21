<template>
    <div id="moreinfo">
      <div class="moreinfo-content">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple" @click="jump('/home/sharecircle','1')">
            <div class="ct">
              <img src="/static/image/分享图标-01.png" alt="">
              <div class="ct-span"><span>分享圈</span></div></div>
            </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple" @click="jump('/home/notification','1')">
            <div class="ct">
              <img src="/static/image/通知.png" alt="">
              <div class="ct-span"><span>通知</span></div></div>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/文章-01.png" alt="">
              <div class="ct-span"><span>文章</span></div></div>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/视频-01.png" alt="">
              <div class="ct-span"><span>视频</span></div></div>
          </div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/清除-01.png" alt="">
              <div class="ct-span"><span>垃圾文件清理</span></div></div>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/记事本-01.png" alt="">
              <div class="ct-span"><span>记事本</span></div></div>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/通讯录-01.png" alt="">
              <div class="ct-span"><span>通讯录</span></div></div>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/图片-01.png" alt="">
              <div class="ct-span"><span>云冲印</span></div></div>
          </div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <div class="ct">
              <img src="/static/image/照片电影.png" alt="">
              <div class="ct-span"><span>照片电影</span></div></div>
          </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "moreinfo",
      methods:{
        jump(path,id){
          this.$router.push({
            path:path,
            query:{
              id:id
            }
          });
        },
      },
      mounted(){
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #moreinfo{
    width: 70%;
    margin: 1% auto 0 auto;
    height: 95%;
    background-color: white;
    border-radius: 10px;
  }
  .el-col{
    margin-top: 30px;
    cursor: pointer;
  }
  .grid-content {
    border-radius: 4px;
  }
  .grid-content img{
    height: 100px;
    width: 100px;
    border-radius: 50px
  }
  .ct{
    margin: 0 auto;
    width: 100px
  }
  .ct-span{
    text-align: center;
    margin-top: 10px;
  }
</style>
