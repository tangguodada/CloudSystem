<template>
    <div id="sharehomefile" style="width: 90%;margin: 0 auto">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="fileName"
          label="分享文件">
          <template slot-scope="scope">
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==0">
              <use xlink:href="#el-icon-erp-wenjianjiaweigongxiang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==1">
              <use xlink:href="#el-icon-erp-wendang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==2">
              <use xlink:href="#el-icon-erp-docx"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==3">
              <use xlink:href="#el-icon-erp-ppt"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==4">
              <use xlink:href="#el-icon-erp-excel"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==5">
              <use xlink:href="#el-icon-erp-pdf"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==6">
              <use xlink:href="#el-icon-erp-shipin"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==7">
              <use xlink:href="#el-icon-erp-tupian"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==8">
              <use xlink:href="#el-icon-erp-zip"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==9">
              <use xlink:href="#el-icon-erp-yinyue"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="cuttfile(scope.row.fileName)==10">
              <use xlink:href="#el-icon-erp-file"></use>
            </svg>
            <span
              style="cursor: pointer;position: absolute;top: 50%;transform: translateY(-60%);width:320px;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;"
            >&#12288;{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="star"
          label="点赞次数"
          width="180">
        </el-table-column>
        <el-table-column
          label="分享时间"
          width="180">
          <template slot-scope="scope">
            <span>{{tsttime(scope.row.shareTime)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "sharehomefile",
      data() {
        return {
          tableData: []
        }
      },
      methods:{
        tsttime(val) {
          let transformtime = new Date(val);
          let commonTime = transformtime.toLocaleDateString();
          Date.prototype.toLocaleDateString = function (commonTime) {
            return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
          };
          return commonTime;
        },
        cuttfile(val){
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
        getusershare(){
          this.$axios.get("/usershare", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.tableData = [].concat(res.data.data);
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      mounted(){
        this.getusershare();
      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  .icon{
    width: 25px;
    height: 25px;
  }
  .el-table{
    top: -60px;
  }
</style>
