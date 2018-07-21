<template>
    <div id="recycle">
      <div class="main-content-head">
      <el-button class="se4" v-show="flag_deleteall"><i class="el-icon-delete el-icon--left"></i><span>还原</span></el-button>
      </div>
      <div style="float: right">
        <el-button @click="deleteall"><i class="el-icon-delete el-icon--left"></i><span>清空回收站</span></el-button>
      </div>
      <div id="upfile" style="clear: both;height: 10px"></div>
      <div>
        <el-table
          :data="filelist"
          tooltip-effect="dark"
          style="width: 100%"
          height="450"
          @cell-mouse-enter="handleHover"
          @cell-mouse-leave="handleHoverout"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="文件名">
            <template slot-scope="scope">
              <div>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==0">
                  <use xlink:href="#el-icon-erp-wenjianjiaweigongxiang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==1">
                  <use xlink:href="#el-icon-erp-wendang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==2">
                  <use xlink:href="#el-icon-erp-docx"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==3">
                  <use xlink:href="#el-icon-erp-ppt"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==4">
                  <use xlink:href="#el-icon-erp-excel"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==5">
                  <use xlink:href="#el-icon-erp-pdf"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==6">
                  <use xlink:href="#el-icon-erp-shipin"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==7">
                  <use xlink:href="#el-icon-erp-tupian"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==8">
                  <use xlink:href="#el-icon-erp-zip"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==9">
                  <use xlink:href="#el-icon-erp-yinyue"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="cutfile(scope.row.name,scope.row.type)==10">
                  <use xlink:href="#el-icon-erp-file"></use>
                </svg>
                <span style="cursor: pointer;position: absolute;top: 50%;transform: translateY(-60%);width:320px;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;font-size: 15px">&#12288;{{ scope.row.name }}</span>
                <span class="table-icon" style="margin-right: 10px" v-show=scope.row.isshow @click="deletefile(scope.row.id)"><i class="el-icon-delete"></i></span>
                <span class="table-icon" style="margin-right: 10px" v-show=scope.row.isshow @click="fileback(scope.row.id)"><i class="el-icon-refresh"></i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="大小"
            width="100">
            <template slot-scope="scope">
              <span v-show="scope.row.type != 0">{{scope.row.size}}M</span>
              <span v-show="scope.row.type == 0">----</span>
            </template>
          </el-table-column>
          <el-table-column
            label="日期"
            width="150">
            <template slot-scope="scope">
              <span>{{changetime(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import ElButton from "element-ui/packages/button/src/button";
    export default {
        name: "recycle",
      data(){
        return{
          filelist:[],
          multipleSelection:[],
          flag_deleteall:false
        }
      },
      methods:{
        changetime(val){
          let transformtime = new Date(val);
          let commonTime  =transformtime.toLocaleDateString();
          Date.prototype.toLocaleDateString = function (commonTime){
            return this.getFullYear()+"-"+(this.getMonth()+1) + "-" + this.getDate();
          };
          return commonTime;
        },
        handleSelectionChange(val) { //多选框选中的行
          this.multipleSelection = val;
          if (this.multipleSelection.length != 0){
            this.flag_deleteall = true;
          } else {
            this.flag_deleteall = false;
          }
        },
        handleHover(val){ //行移入
          val.isshow = true;
        },
        handleHoverout(val){ //行移除
          val.isshow = false;
        },
        fileback(val){
          this.$axios.post("/userfile/restore/"+ val,{
            headers:{
              'Authorization':sessionStorage.getItem('token'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              console.log(res.data.data);
              this.filelist = [].concat(res.data.data);
              if (res.data.status){
                this.$message({
                  message: '文件还原成功',
                  type: 'success',
                  center: true
                });
              } else {
                this.$message.error('文件还原失败');
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        deleteall(){
          this.$axios.delete("/userfile/empty/",{
            headers:{
              'Authorization':sessionStorage.getItem('token'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              console.log(res);
              this.filelist = [];
              if (res.data.status){
                this.$message({
                  message: '回收站清空成功',
                  type: 'success',
                  center: true
                });
              } else {
                this.$message.error('回收站清空失败');
              }
              // this.filelist = [].concat(res.data.data);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        deletefile(val){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete("/userfile/empty/"+val,{
              headers:{
                'Authorization':sessionStorage.getItem('token'),
                'Content-Type':'application/x-www-form-urlencoded'
              }
            })
              .then(function (res) {
                console.log(res);
                if (res.status){
                  this.$message({
                    message: '彻底删除成功',
                    type: 'success',
                    center: true
                  });
                  this.getfilelist();
                } else {
                  this.$message.error('删除失败');
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
              center: true
            });
          });
        },
        getfilelist(){ //文件列表拉取
          this.$axios.get("/userfile/bin/",{
            headers:{
              'Authorization':sessionStorage.getItem('token')
            }
          })
            .then(function (res) {
              console.log(res.data.data);
              this.filelist = [].concat(res.data.data);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        cutfile(val,type){
          if (type == 0){
            return 0;
          }
          let pos=val.lastIndexOf("\.");
          let result = val.substring(pos + 1);
          switch (result){
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
            case "pdf":
              return 5;
              break;
            case "mp4":
              return 6;
              break;
            case "jpg":
              return 7;
              break;
            case "png":
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
      },
      mounted(){
          this.getfilelist();
      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  .table-icon{
    float: right;
    cursor: pointer;
    font-size: 20px;
    color: #3b8cff;
  }
  .table-icon:hover{
    color: aqua;
  }
  .main-content-head{
    width: 300px;
    float: left;
    height: 40px;
  }
  .main-content-head button{
    height: 35px;
  }
  .se4{
    width: 80px;
    position:absolute;
    top: 14px;
    left: 20px;
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
