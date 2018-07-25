<template>
    <div id="sharecircle">
      <div class="sharecircle-content">
        <div style="width: 70%;margin: 0 auto">
          <div style="width: 100%;height: 20px"></div>
          <el-row :gutter="30">
            <el-col :span="14">
              <div class="share-a">
                <el-row>
                  <el-col :span="4">
                    <div class="share-h">
                      <img class="share-img" src="/static/image/分享专辑.png" alt="">
                      分享专辑
                    </div>
                  </el-col>
                  <el-col :span="4"><div class="share-h">
                    <img class="share-img" src="/static/image/分享图片.png" alt="">
                    分享图片</div></el-col>
                  <el-col :span="4"><div class="share-h">
                    <img class="share-img" src="/static/image/分享视频.png" alt="">
                    分享视频</div></el-col>
                  <el-col :span="4"><div class="share-h">
                    <img class="share-img" src="/static/image/分享文档.png" alt="">
                    分享文档</div></el-col>
                  <el-col :span="4"><div class="share-h">
                    <img class="share-img" src="/static/image/分享音乐.png" alt="">
                    分享音乐</div></el-col>
                  <el-col :span="4"><div class="share-h">
                    <img class="share-img" src="/static/image/分享其他.png" alt="">
                    分享其他</div></el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="share-a">
                <el-row>
                  <el-col :span="8">
                    <div>
                      <img :src="imgsrc" alt="" style="width: 60px;height: 60px;display: block;margin: 10px auto 0px auto">
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="share-o" @click="jump('/home/sharehome/sharehomefile','1')">
                      <h4>{{sharenum}}</h4>
                      <span>分享</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="share-o">
                      <h4>0</h4>
                      <span>专辑</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="share-o" @click="jump('/home/sharehome/sharehomemyconcern','3')">
                      <h4>{{myconcernnum}}</h4>
                      <span>关注</span>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="share-o" @click="jump('/home/sharehome/shareconcernme','4')">
                      <h4>{{concernnum}}</h4>
                      <span>粉丝</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <h4 v-show="isnull" style="margin-top: 150px;color: #999;">暂无分享内容</h4>
        <el-row>
          <el-col :span="10" v-for="(item, index) in sharelist" :key="index" :offset="index%2 != 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <span style="width:90%;overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space:nowrap;display: block;float: left">&#12288;{{item.fileName}}</span>
              <img v-if="item.uname==currentusername" src="/static/image/关闭.png" style="width: 23px;height: 23px;display: block;float: left;cursor: pointer" alt="" @click="cancelshare(item.id)">
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==0">
                <use xlink:href="#el-icon-erp-wenjianjiaweigongxiang"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==1">
                <use xlink:href="#el-icon-erp-wendang"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==2">
                <use xlink:href="#el-icon-erp-docx"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==3">
                <use xlink:href="#el-icon-erp-ppt"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==4">
                <use xlink:href="#el-icon-erp-excel"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==5">
                <use xlink:href="#el-icon-erp-pdf"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==6">
                <use xlink:href="#el-icon-erp-shipin"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==7">
                <use xlink:href="#el-icon-erp-tupian"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==8">
                <use xlink:href="#el-icon-erp-zip"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==9">
                <use xlink:href="#el-icon-erp-yinyue"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-show="cutfile(item.fileName)==10">
                <use xlink:href="#el-icon-erp-file"></use>
              </svg>
              <span style="position: relative;top: 10px;color: #999;display: inline-block;width: 45%;vertical-align: top">&#12288;&#12288;{{item.description==null?desnull:item.description}}</span>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <img :src="item.uicon" alt="" style="width: 30px;height: 30px;border-radius: 15px">
                  <span>{{item.uname}}</span>
                  <img v-if="item.uname!=currentusername&&!item.concern" style="cursor: pointer;width: 20px;height: 20px" src="/static/image/关注.png" alt="" @click="newconcern(item.uname)">
                  <img v-if="item.concern" src="/static/image/已关注.png" style="cursor: pointer;width: 20px;height: 20px" alt="" @click="cancelconcern(item.uname)">
                  <!--<span v-if="item.uname!=currentusername&&!item.concern" style="color: blue;margin-left: 5px;font-size: 14px;cursor: pointer" @click="newconcern(item.uname)">关注TA</span>-->
                  <!--<span v-if="item.concern" style="color: blue;margin-left: 5px;font-size: 14px;cursor: pointer" @click="cancelconcern(item.uname)">取关TA</span>-->
                  <time class="time">{{tstime(item.shareTime)}}</time>
                </div>
                <!--<el-button type="text" class="button" @click="downloadfile(item.fileId)">&#12288;下载</el-button>-->
                <el-button type="text" class="button"><a :href="'http://192.168.100.35:8080/auth/download/'+item.fileId" class="dl" download="">&#12288;下载</a></el-button>
                <el-button type="text" class="button" @click="preview(item)" style="color: #007bff">&#12288;预览</el-button>
                <el-button type="text" class="button" style="margin-left: 0px" @click="praise(item.id,item.uname)">{{item.star}}</el-button>
                <i class="el-icon-erp-dianzan" v-show="!item.myStar" style="float: right;cursor: pointer;margin-top: 2px" @click="praise(item.id,item.uname)"></i>
                <!--<i class="el-icon-erp-dianzan" v-show="item.myStar" style="float: right;cursor: pointer;margin-top: 2px" @click="praise(item.id,item.uname)"></i>-->
                <i style="float: right;cursor: pointer;width: 16px;height: 16px" @click="cancelpraise(item.id)">
                <svg aria-hidden="true" v-show="item.myStar" style="width: 16px;height: 16px">
                  <use xlink:href="#el-icon-erp-zan"></use>
                </svg>
                </i>
              </div>
            </el-card>
          </el-col>
        </el-row>
        </div>
      </div>

      <el-dialog title="图片预览" :visible.sync="dialogImgVisible">
        <img :src="dialogimgsrc" width="100%" height="300px"/>
      </el-dialog>

      <el-dialog title="在线播放" :visible.sync="dialogVideoVisible" width="80%" @close="closevideo">
        <video id="movie" :src="dialogvideosrc" controls="controls" width="100%" height="500px">
          您的浏览器不支持 video 标签。
        </video>
      </el-dialog>

      <el-dialog title="音乐播放" :visible.sync="dialogMusicVisible" @close="closemusic">
        <audio id="musica" :src="dialogmusicsrc" controls/>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "sharecircle",
      data() {
        return {
          sharelist:[],
          desnull:'该分享暂无描述',
          imgsrc:sessionStorage.getItem('userAvatar'),
          sharenum:0,
          currentusername:sessionStorage.getItem('username'),
          concernnum:0,
          myconcernnum:0,
          dialogimgsrc:'',
          dialogvideosrc:'',
          dialogImgVisible:false,
          dialogVideoVisible:false,
          isnull:true,
          dialogMusicVisible:false,
          dialogmusicsrc:''
        }
      },
      methods: {
        closevideo(){
          $('#movie').get(0).pause();
        },
        closemusic(){
          $('#musica').get(0).pause();
        },
        jump(path, id) {
          this.$router.push({
            path: path,
            query: {
              id: id
            }
          });
        },
        getsharelist() {
          this.$axios.get("/usershare/init", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              console.log(res.data.data);
              if (res.data.data.length != 0){
                this.sharelist = [].concat(res.data.data);
                this.isnull = false;
              } else {
                this.sharelist = [];
                this.isnull = true;
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
        cutfile(val) {
          let pos = val.lastIndexOf("\.");
          let result = val.substring(pos + 1);
          switch (result) {
            case "txt":
              return 1;
              break;
            case "doc":
              return 2;
              break;
            case "docx":
              return 2;
              break;
            case "ppt":
              return 3;
              break;
            case "pptx":
              return 3;
              break;
            case "excel":
              return 4;
              break;
            case "xls":
              return 4;
              break;
            case "xlsx":
              return 4;
              break;
            case "pdf":
              return 5;
              break;
            case "mp4":
              return 6;
              break;
            case "jpg":
              return 7;
              break;
            case "JPG":
              return 7;
              break;
            case "png":
              return 7;
              break;
            case "PNG":
              return 7;
              break;
            case "rar":
              return 8;
              break;
            case "zip":
              return 8;
              break;
            case "mp3":
              return 9;
              break;
            default:
              return 10;
          }
        },
        preview(val) {
          let pos=val.fileName.lastIndexOf("\.");
          let result = val.fileName.substring(pos + 1);
          if (result == 'doc' || result == 'docx' || result == 'ppt' || result == 'pptx' || result == 'xls' || result == 'xlsx' || result == 'pdf'){
            sessionStorage.setItem('pdfid',val.fileId);
            let routeData = this.$router.resolve({
              name: "pdf"
            });
            window.open(routeData.href, '_blank');
          } else if (result == 'png' || result == 'jpg' || result == 'PNG' || result == 'JPG'){
            this.dialogimgsrc = val.fileUrl;
            this.dialogImgVisible = true;
          } else if (result == 'mp4') {
            this.dialogvideosrc = val.fileUrl;
            this.dialogVideoVisible = true;
          } else if (result == 'mp3'){
            this.dialogmusicsrc = val.fileUrl;
            this.dialogMusicVisible = true;
          } else {
            this.$message('抱歉，该文件暂不支持预览');
          }
        },
        downloadfile(val) {
          $.ajax({
            url: 'http://192.168.100.35:8080/auth/download/' + val,
            type: 'get',
            async: false,
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            },
            timeout: 5000,
            error: function (error) {
              console.log(error);
              alert('no');
            },
            success: function (res) {
              window.open('http://192.168.100.35:8080/auth/download/' + val);
              // let url = res.config.url;
              // window.open(url);
            }
          });
        },
        praise(id,name){
          if (name == this.currentusername){
            this.$notify({
              title: '警告',
              message: '不能给自己点赞',
              type: 'warning'
            });
            return;
          }
          this.$axios.put("/usershare/applause?id="+id, {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              console.log(res.data);
              if (res.data.status){
                this.getsharelist();
                this.$notify({
                  title: '成功',
                  message: '点赞成功',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '点赞失败'
                });
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        cancelpraise(id){
          this.$axios.delete("/usershare/delapplause?id="+id, {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              console.log(res.data);
              if (res.data.status){
                this.getsharelist();
                this.$notify({
                  title: '成功',
                  message: '取消点赞成功',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '取消点赞失败'
                });
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        getusershare(){
          this.$axios.get("/usershare", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              if (res.data.data != null) {
                this.sharenum = res.data.data.length;
              } else {
                this.sharenum = 0;
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        getconcern(){
          this.$axios.get("/userConcern/getConcern", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              console.log(res.data.data);
              this.concernnum = res.data.data.length;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        newconcern(val){
          this.$axios.post("/userConcern/concern", {
            star:val,
            group:'默认分组'
          },{
            headers: {
              'Authorization': sessionStorage.getItem('userToken'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              console.log(res.data);
              if (res.data.status){
                this.$notify({
                  title: '成功',
                  message: '关注成功',
                  type: 'success'
                });
                this.getmyconcern();
                this.getsharelist();
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '关注失败'
                });
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        getmyconcern(){
          this.$axios.get("/userConcern/initConcern", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              console.log(res.data);
              this.myconcernnum = res.data.data.length;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        cancelconcern(val){
          this.$axios.delete("/userConcern/concernDelete/"+val, {
            headers: {
              'Authorization': sessionStorage.getItem('userToken'),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              console.log(res.data);
              if (res.data.status){
                this.$notify({
                  title: '成功',
                  message: '取关成功',
                  type: 'success'
                });
                this.getmyconcern();
                this.getsharelist();
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '取关失败'
                });
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
        cancelshare(id){
          this.$confirm('此操作将取消分享该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          this.$axios.delete("/usershare/cancelshare?id="+id, {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              console.log(res.data);
              if (res.data.status){
                this.getsharelist();
                this.$notify({
                  title: '成功',
                  message: '取消分享成功',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '取消分享失败'
                });
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
              center: true
            });
          });
        }
      },
      mounted(){
        let h=document.documentElement.clientHeight-60;
        $(".sharecircle-content").css('min-height',h + 'px');
        this.getsharelist();
        this.getusershare();
        this.getconcern();
        this.getmyconcern();
      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  .sharecircle-content{
    width: 100%;
    background-color: #eee;
    margin: 10px auto 0px auto;
  }
  .icon{
    width: 100%;
    display: block;
  }
  .time {
    font-size: 13px;
    color: #999;
    float: right;
    margin-top: 8px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
    height: 20px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .icon{
    width: 50%;
    display: inline-block;
    margin-top: 5px;
  }
  .el-card{
    margin-top: 20px;
  }
  .share-a{
    height: 80px;
    background-color: white;
    box-shadow: 1px 1px 1px 1px #999;
  }
  .share-h{
    height: 80px;
    border-right: 1px solid #e9e9e9;
    text-align: center;
    font-size: 10px;
  }
  .share-img{
    width: 30px;
    height: 30px;
    display: block;
    margin: 10px auto 10px auto;
  }
  .share-h:hover{
    color: blueviolet;
    cursor: pointer;
  }
  h4{
    margin-top: 10px;
    text-align: center;
  }
  .share-o span{
    width: 100%;
    text-align: center;
    display: block;
    font-size: 15px;
  }
  .share-o:hover{
    cursor: pointer;
    color: blueviolet;
  }
  .dl{
    text-decoration: none;
  }
</style>
