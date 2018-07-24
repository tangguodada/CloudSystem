<template>
  <div id="avatar">
    <div class="tupian" style="position:relative;background-color: #f0f0f0;margin:0 auto;">
      <div class="myPhoto" v-show="personalPhoto">
        <div class="viewPhoto">
          <img src="" alt="" id="portrait"style="width: 300px;height: 300px" />
        </div>
        <div class="listBox">
          <dl>
            <dt>请上传图片</dt>
            <dd>
              <input type="file"id="saveImage" name="myphoto"  >
            </dd>
          </dl>
        </div>
        <div class="save">
          <el-button type="primary" @click="imageSubmit">保存图片</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import router from '../router/index'
    export default {
      name: "modify-avatar",
      data(){
        return {
          personalPhoto:true,
        }
      },
      methods:{
        great(){
          document.getElementById('saveImage').onchange = function () {
            var imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
              document.getElementById('portrait').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
          }
        },
        imageSubmit() {
          let x = document.getElementById('saveImage').files[0];
//          console.log(x);
          var type = x.name.split('\.');
//          console.log(type[1]);
          if (x == null) {
            this.$message.error('请选择文件!');
          } else if (type[1] == 'jpg' || type[1] == 'png' || type[1] == 'PNG') {
            let params = new FormData(); //创建一个form对象
            params.append('file', x, x.name);  //append 向form表单添加数据
            //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
            let config = {
              headers: {'Content-Type': 'multipart/form-data'}
            };
            this.$axios.put("/icon", params, config)
              .then(function (res) {
//                console.log(res);
                this.$store.commit('userImageGet', res.data.data.userInfo.icon);
                sessionStorage.setItem('userAvatar', res.data.data.userInfo.icon);
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          }
          else {
            this.$message.error('请上传jpg或png格式的文件!');
          }
        }
        },
      mounted(){
        this.great();
      }

    }
</script>

<style scoped>
  #avatar{
    margin-top: 10px;
    margin-left: 60px;
  }
  .myPhoto{
    position: relative;
    clear: both;
    margin-top: 20px;
    width: 700px;
    /*float: left;*/
  }
  .viewPhoto{
    position: relative;
    width: 300px;
    height: 300px;

    float: left;
    margin-left: 40px;
    margin-top: 30px;
    background-image: url("/static/image/viewport_background.gif");
  }
  .listBox{
    float: left;
    width:230px ;
    height: 90px;
    background-color: #fffdea;
    margin-left: 40px;
    margin-top: 30px;
  }
  .listBox input{
    width: 220px;
    margin-top: 20px;
    margin-left: 15px;
  }
  .listBox dt{
    margin-left: 15px;
    color: #a7a7a7;
    font-size: 12px;
    margin-top: 10px;
  }
  .save{
    position: absolute;
    left: 350px;
    top: 310px;
  }
</style>
