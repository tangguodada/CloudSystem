<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-message"></i> 用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="share-message">

      <el-table
        :data="shareList"
        style="width: 100%">
        <el-table-column
          label="分享者"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.uname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文件"
          width="200"
        >
          <template slot-scope="scope">
            <span @click="showpdf(scope.row)" style="cursor: pointer">{{ scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分享描述"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="160"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.shareTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.freeze"
              @click="handleOperate(scope.row.id)">禁封</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="编辑禁封原因" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" >
      <el-form-item>
      <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="prohibitShare">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="图片预览" :visible.sync="dialogImgVisible">
      <img :src="dialogimgsrc" width="100%" height="300px"/>
    </el-dialog>

    <el-dialog title="视频播放" :visible.sync="dialogVideoVisible" width="80%" @close="closevideo">
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
        name: "sharemessage",
      data(){
          return{
            shareList:[],
            currentPage1:1,
            pagetotal:0,
            editVisible:false,
            form:{
              reason:'',
            },
            prohibitId:'',
            dialogimgsrc:'',
            dialogvideosrc:'',
            dialogmusicsrc:'',
            dialogImgVisible:false,
            dialogVideoVisible:false,
            dialogMusicVisible:false
        }
      },
      methods:{
        closemusic(){
          $('#musica').get(0).pause();
        },
        closevideo(){
          $('#movie').get(0).pause();
        },
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage1 = val;
          this.getshareList();
        },
          getshareList(){
            this.$axios.get('/getUserShare'+'?page='+this.currentPage1+'&page_size=8')
              .then(function(res){
               // console.log(res);
                this.shareList = res.data.data.records;
                this.pagetotal = res.data.data.total;
                for(let i=0;i<this.shareList.length;i++){
                  let time = this.shareList[i].shareTime;
                  let transformtime = new Date(time);
                  let commonTime = transformtime.toLocaleDateString().replace(/\//g,"-");
                  this.shareList[i].shareTime = commonTime;
                }

              }.bind(this))
              .catch(function(error){
                console.log(error);
              })
          },
        handleOperate(id){
          this.editVisible = true;
          this.prohibitId = id;
        },
        prohibitShare(){
            this.$axios.put('/freeze/share/'+this.prohibitId + '?reason=' + this.form.reason + '')
              .then(function(res){
//                console.log(res);
                this.$message.success("禁封一条消息成功");
                this.getshareList();
              }.bind(this))
              .catch(function(error){
                console.log(error);
              });
          this.editVisible = false;
        },
        showpdf(val){
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
          } else if (result == 'mp4'){
            this.dialogvideosrc = val.fileUrl;
            this.dialogVideoVisible = true;
          } else if (result == 'mp3'){
            this.dialogmusicsrc = val.fileUrl;
            this.dialogMusicVisible = true;
          } else {
            this.$message('抱歉，该文件暂不支持预览');
          }
        }
      },
      created(){
        this.getshareList();
      }
    }
</script>

<style scoped>
.share-message{
  margin-top: 40px;
  margin-left: 30px;
  padding: 25px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;

}
</style>
