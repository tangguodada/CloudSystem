<template>
  <div class="adminmessage">
    <h4 style="text-align: center">管理员信息</h4>
    <div class="message" >
      <ul>
        <li>
          <span>姓名:</span><span>&nbsp;&nbsp;&nbsp;{{adminname}}</span>
        </li>
        <li>
          <span>注册时间:</span><span>&nbsp;&nbsp;&nbsp;{{adminRegistTime}}</span>
        </li>
        <li>
          <span>管理权限:</span><span>&nbsp;&nbsp;&nbsp;{{adminAuth}}</span>
        </li>
        <li>
          <span>更换头像:</span>
        </li>
        <li>
          <div class="avatar">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

    export default {
        name: "uploadavatar",
        data(){
          return{
            defaultSrc: '../static/image/tou.jpg',
            fileList: [],
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
            adminname:'',
            adminRegistTime:'',
            adminAuth:'删除用户，磁盘分配',
            imageUrl: '',
          }
        },
      methods:{
        //获取管理员信息
        getTime(){
          // let time =1531033927000 ;
          // let transformtime = new Date(time);
          // let commonTime  =transformtime.toLocaleDateString();
          //
          // Date.prototype.toLocaleDateString = function (commonTime){
          //   return this.getFullYear()+"-"+(this.getMonth()+1) + "-" + this.getDate();
          // }
//          // console.log(commonTime);
        },
        getAdminMessage(){
          this.$axios.get('/managerinfo').then(function(res){
//            console.log(res);
            this.adminname = res.data.data.username;
            let time = res.data.data.createTime;
            let transformtime = new Date(time);
            let commonTime  =transformtime.toLocaleDateString().replace(/\//g,"-");
            this.adminRegistTime = commonTime;
//            // console.log(commonTime);
          }.bind(this))
            .catch(function(error){
              console.log(error);
            })
        },

        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      },
      created(){
        this.getAdminMessage();
        this.getTime();
      }


    }
</script>

<style scoped>
  .message{
    width: 60%;
    min-height:500px;
    background-color:#ffffff;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: rgba(95, 95, 95, 0.17) 0 0 50px;
    margin-bottom: 20px;
  }
  .message ul li{
    list-style-type: none;
    width: 80%;
    padding: 20px;
  }
  .message ul{
    margin-left: 20px;
  }

  .dialog-footer > button{
    padding: 10px;
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
