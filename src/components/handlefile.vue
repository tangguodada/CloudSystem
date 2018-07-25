<template>
    <div id="handlefile">
      <div class="main-content-head">
        <el-button class="se1" id="btnup" type="primary" @click="showuploaddiv">
          <i class="el-icon-upload el-icon--left" style="position: absolute;left: 16px;top: 9px"></i>
          <span style="position: absolute;left: 35px;top: 10px">上传</span>
        </el-button>
        <el-button class="se3" @click="creatNewfile">
          <i class="el-icon-erp-wangpanxinjianwenjianjia-copy el-icon--left" style="position: absolute;left: 16px;top: 9px"></i>
          <span style="position: absolute;left: 35px;top: 10px">新建文件夹</span>
        </el-button>
        <el-button class="se4" v-show="flag_deleteall" @click="deletechoosefile"><i class="el-icon-delete el-icon--left" style="position: relative;top: -2px;left: -5px"></i><span style="position: relative;top: -2px;left: -5px">删除</span></el-button>
        <el-button class="se5" v-show="flag_deleteall" @click="downloadchoosefile"><i class="el-icon-download el-icon--left" style="position: relative;top: -2px;left: -5px"></i><span style="position: relative;top: -2px;left: -5px">下载</span></el-button>
      </div>
      <div style="float: right">
        <el-input
          size="medium"
          placeholder="请输入内容"
          v-model=searchinfo
          clearable
          suffix-icon="el-icon-search"
          @keyup.enter.native="searchfile">
        </el-input>
      </div>
      <div style="float: right;margin-right: 10px;cursor: pointer" @click="getdownloadlist">
        <i class="el-icon-sort" style="font-size: 25px;color: #00b7ee"></i>
      </div>

      <div id="upfile" style="clear: both;height: 10px"></div>
      <div>
        <el-breadcrumb separator="|" style="float: left" v-show="flag_back">
          <el-breadcrumb-item><span class="breadspan" @click="backup">返回上一级</span></el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="float: left">
          <el-breadcrumb-item v-for="(item,key) in pathlist" :key="key">
            <span v-if="key<pathlist.length-1" class="breadspan" @click="currentChange(key)">{{item.name}}</span>
            <span v-if="key==pathlist.length-1">{{item.name}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--树形控件-->
      <el-dialog title="移动到" :visible.sync="dialogTableVisible">
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
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="movefile()">确 定</el-button>
        </div>
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

      <el-dialog title="下载记录" :visible.sync="dialogDownloadVisible">
        <el-table
          :data="tableDownload"
          style="width: 100%">
          <el-table-column
            label="名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px;position: absolute;top: 50%;transform: translateY(-60%);">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="downloadDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="5"
            @current-change="currentchange"
          >
          </el-pagination>
        </div>
      </el-dialog>

      <el-dialog title="分享" :visible.sync="dialogShareVisible">
        <el-tabs v-model="activeName">
          <el-tab-pane name="first">
            <span slot="label"><i class="el-icon-erp-people"></i>发给好友</span>
            <el-transfer v-if="dialogShareVisible" :data="sharefriendlist" v-model="value1" :titles="['好友', '选中']" @right-check-change="transferchange" style="margin-left: 60px">
              <el-button class="transfer-footer" slot="right-footer" size="small" @click="sharetofriend">分享</el-button>
            </el-transfer>

          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-erp-pengyouquan"></i>发给朋友圈</span>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述一下分享的文件吧(少于50个字符)"
              maxlength="50"
              v-model="textarea">
            </el-input>
            <el-button type="primary" @click="sharetocircle">分享</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>

      <div id="filetable">
        <el-table
          :data="filelist"
          tooltip-effect="dark"
          style="width: 100%"
          height="90%"
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
              <div v-show=scope.row.istoggle>
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
              <span @click="nextfilelist(scope.row)"
                    style="cursor: pointer;position: absolute;top: 50%;transform: translateY(-60%);width:45%;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;"
              >&#12288;{{ scope.row.name }}</span>
              <!--<span class="table-icon"><i class="el-icon-more" v-show=scope.row.isshow></i></span>-->
              <el-dropdown trigger="click" style="float: right" @visible-change="isDropdown">
                <span class="table-icon"><i class="el-icon-more" v-show=scope.row.isshow></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="dropfont" @click.native="clickitem(scope.row,0);dialogTableVisible = true">移动到</el-dropdown-item>
                  <el-dropdown-item class="dropfont" @click.native="clickitem(scope.row,1)" >复制到</el-dropdown-item>
                  <el-dropdown-item class="dropfont" @click.native="clickitem(scope.row,2)" >重命名</el-dropdown-item>
                  <el-dropdown-item class="dropfont" @click.native="clickitem(scope.row,3)" >删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
                <a :href="'http://192.168.100.35:8080/auth/download/'+scope.row.id" download=""><span class="table-icon" style="margin-right: 10px" v-show="scope.row.isshow&&scope.row.type!=0"><i class="el-icon-download"></i></span></a>
                <!--<span class="table-icon" style="margin-right: 10px" v-show=scope.row.isshow @click="downloadfile(scope.row.id)"><i class="el-icon-download"></i></span>-->
                <span class="table-icon" style="margin-right: 10px" v-show=scope.row.isshow @click="sharefile(scope.row.id)"><i class="el-icon-share"></i></span>
              </div>
              <div v-show=!scope.row.istoggle>
                <el-input
                  size="medium"
                  v-model=scope.row.name
                  clearable
                  style="width: 50%">
                </el-input>
                <el-button size="mini" type="primary" icon="el-icon-check" circle @click="nameChange(scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-close" circle @click="nameCancleChange(scope.row)"></el-button>
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
      <div id="ShowDiv" name="ShowDiv">
        <div style="width: 100%;text-align: right">
          <i class="el-icon-erp-suoxiao" @click="showuploaddiv"></i>
        </div>
        <div id="wrapper">
          <div id="container">
            <!--头部，相册选择和格式选择-->
            <div id="uploader">
              <div class="queueList">
                <div id="dndArea" class="placeholder">
                  <div id="filePicker"></div>
                  <p>或将文件拖到这里</p>
                </div>
              </div>
              <div class="statusBar" style="display:none;">
                <div class="progress">
                  <span class="text">0%</span>
                  <span class="percentage"></span>
                </div>
                <div class="info"></div>
                <div class="btns">
                  <div id="filePicker2"></div>
                  <div class="uploadBtn">开始上传</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";
    import '../icon/iconfont'
    export default {
      components: {ElButton},
      name: "handlefile",
      data() {
        return {
          flag_back:false,
          flag_deleteall:false,
          dialogTableVisible: false,
          pathlist:[{name:"全部文件",id:0}],
          filelist: [],
          multipleSelection: [],
          dropdownshow:false,
          oldname:'',
          searchinfo:'',
          isCreateflag:false,
          currentcatalogue:0,
          props: {
            label: 'name',
            children: 'zones'
          },
          count: 1,
          currenttreenodeid:'',
          currentchooseid:'',
          treedata:[],
          uploadSuccess:false,
          dialogImgVisible:false,
          dialogimgsrc:'',
          dialogVideoVisible:false,
          dialogvideosrc:'',
          dialogDownloadVisible:false,
          tableDownload:[],
          total:1,
          currentpagenum:1,
          testLock:0,
          successflag:false,
          dialogShareVisible:false,
          activeName: 'first',
          sharefriendlist:[],
          value1:[1,2],
          textarea:'',
          friendid:'',
          dialogMusicVisible:false,
          dialogmusicsrc:'',
          listfileid:[],
          hasdir:false
        }
      },
      methods:{
        downloadchoosefile(){
          if (this.hasdir){
            this.$message.error('文件夹不能下载');
            return;
          }
          for (let i=0;i<this.listfileid.length;i++){
            window.open('http://192.168.100.35:8080/auth/download/'+this.listfileid[i]);
          }
        },
        deletechoosefile(){
          this.$confirm('此操作将把文件移入回收站, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post("/userfile/remove",{
              fileId:this.listfileid.join()
            },{
              headers:{
                'Authorization':sessionStorage.getItem('userToken'),
                'Content-Type':'application/x-www-form-urlencoded'
              }
            })
              .then(function (res) {
//                console.log(res.data);
                if (res.data.status){
                  this.$message({
                    message: '文件放入回收站成功',
                    type: 'success',
                    center: true
                  });
                  this.getfilelist();
                } else {
                  this.$message.error('文件放入回收站失败');
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
        closevideo(){
          $('#movie').get(0).pause();
        },
        closemusic(){
          $('#musica').get(0).pause();
        },
        changetime(val){
          let transformtime = new Date(val);
          let commonTime  =transformtime.toLocaleDateString();
          Date.prototype.toLocaleDateString = function (commonTime){
            return this.getFullYear()+"-"+(this.getMonth()+1) + "-" + this.getDate();
          };
          return commonTime;
        },
        creatNewfile(){
            let data = {
              id:'',
              date: '',
              name: '',
              type:0,
              isshow:false,
              istoggle:false
            };
            this.filelist.unshift(data);
            this.isCreateflag = true;
          },
        clickitem(command,index){ //更多下拉菜单点击事件
            if (index == 0){
              this.dropdownshow = false;
              command.isshow = false;
              this.currentchooseid = command.id;
            } else if (index == 1){
//              console.log("复制到"+command.name);
              this.dropdownshow = false;
              command.isshow = false;
            } else if (index == 2){
              command.istoggle = false;
              this.oldname = command.name;
              this.dropdownshow = false;
            } else if (index == 3){
              command.isshow = false;
              let indexid = this.filelist.indexOf(command);
              this.$confirm('此操作将把文件移入回收站, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$axios.post("/userfile/remove",{
                  fileId:this.filelist[indexid].id
                },{
                  headers:{
                    'Authorization':sessionStorage.getItem('userToken'),
                    'Content-Type':'application/x-www-form-urlencoded'
                  }
                })
                  .then(function (res) {
//                    console.log(res);
                    if (res.data.status){
                      this.$message({
                        message: '文件放入回收站成功',
                        type: 'success',
                        center: true
                      });
                      this.filelist.splice(indexid,1);
                    } else {
                      this.$message.error('文件放入回收站失败');
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
              this.dropdownshow = false;
            } else {
              return
            };
          },
        nameChange(val){ //重命名确定
          if (val.name == ''){
            return;
          } else {
            if (this.isCreateflag){
              val.istoggle = true;
              this.isCreateflag = false;
              this.$axios.post("/userfile/create/",{
                parentId:this.currentcatalogue,
                name:val.name,
                type:0
              },{
                headers:{
                  'Authorization':sessionStorage.getItem('userToken')
                }
              })
                .then(function (res) {
//                  console.log(res);
                  if (res.data.status){
                    this.$message({
                      message: '文件夹创建成功',
                      type: 'success',
                      center: true
                    });
                    this.filelist = [].concat(res.data.data);
                  } else {
                    this.$message.error('文件夹重名，创建失败');
                    this.filelist.splice(0,1);
                    return;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                })
            } else {
              this.$axios.post("/userfile/rename/"+val.id+"?new_name="+val.name,{
                headers:{
                  'Authorization':sessionStorage.getItem('userToken'),
                  'Content-Type':'application/x-www-form-urlencoded'
                }
              })
                .then(function (res) {
//                  console.log(res.data);
                  if (res.data.status){
                    this.$message({
                      message: '文件重命名成功',
                      type: 'success',
                      center: true
                    });
                  } else {
                    this.$message.error('文件重名，重命名失败');
                    val.name = this.oldname;
                  }
                  // this.filelist = [].concat(res.data.data);
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
              val.istoggle = true;
            }
          }
        },
        nameCancleChange(val){ //重命名取消
          if (this.isCreateflag){
            this.isCreateflag = false;
            this.filelist.splice(0,1);
            return;
          }
          val.name = this.oldname;
          val.istoggle = true;
          this.$message({
            message: '取消文件重命名',
            type: 'success',
            center: true
          });
        },
        handleCommand(command) { //更多下拉菜单点击事件
          command.istoggle = false;
          this.oldname = command.name;
        },
        isDropdown(val){ //下拉菜单是否显示
          this.dropdownshow = val;
        },
        handleSelectionChange(val) { //多选框选中的行
          this.hasdir = false;
          this.multipleSelection = val;
//          console.log(this.multipleSelection);
          this.listfileid = [];
          for(let i=0;i<this.multipleSelection.length;i++){
            if (this.multipleSelection[i].type == 0){
              this.hasdir = true;
            }
            this.listfileid.push(this.multipleSelection[i].id);
          }
          if (this.multipleSelection.length != 0){
            this.flag_deleteall = true;
          } else {
            this.flag_deleteall = false;
          }
        },
        handleHover(val){ //行移入
          val.isshow = true;
        },
        handleHoverout(val){ //行移除`
          if (this.dropdownshow){
            val.isshow = true;
            this.dropdownshow = false;
          } else {
            val.isshow = false;
          }
        },
        nextfilelist(val){ //当前所在文件夹
          if (val.type == 0){
            this.currentcatalogue = val.id;
            if (val.name != undefined){
              let params = {
                name:val.name,
                id:val.id
              };
              this.pathlist = this.pathlist.concat(params);
            }
            this.getfilelist();
          } else {
            let pos=val.name.lastIndexOf("\.");
            let result = val.name.substring(pos + 1);
            if (result == 'doc' || result == 'docx' || result == 'ppt' || result == 'pptx' || result == 'xls' || result == 'xlsx' || result == 'pdf'){
              sessionStorage.setItem('pdfid',val.id);
              // this.$router.push('/pdf');
              let routeData = this.$router.resolve({
                name: "pdf"
              });
              window.open(routeData.href, '_blank');
            } else if (result == 'png' || result == 'jpg' || result == 'PNG' || result == 'JPG'){
              this.dialogimgsrc = val.url;
              this.dialogImgVisible = true;
            } else if (result == 'mp4') {
              this.dialogvideosrc = val.url;
              this.dialogVideoVisible = true;
            } else if (result == 'mp3'){
              this.dialogmusicsrc = val.url;
              this.dialogMusicVisible = true;
            } else {
              this.$message('抱歉，该文件暂不支持预览');
            }
          }
        },
        getfilelist(){ //文件列表拉取
          if (this.currentcatalogue == '0'){
            this.flag_back = false;
          } else {
            this.flag_back = true;
          }
          this.$axios.get("/userfile/select/"+this.currentcatalogue,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
                this.getstoresize();
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        currentChange(val){ //当前所在目录
          this.pathlist = this.pathlist.slice(0,val+1);
          this.currentcatalogue = this.pathlist[val].id;
          this.getfilelist();
        },
        backup(){
          this.pathlist.pop();
          this.currentcatalogue = this.pathlist[this.pathlist.length-1].id;
          this.getfilelist();
        },
        // --------------------------------------------------------------------
        //弹出框树状图
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
        movefile(){
            if (this.currenttreenodeid == ''){
              this.currenttreenodeid = 0;
            }
          this.$axios.post("/userfile/move/"+this.currentchooseid+"?new_parentid="+this.currenttreenodeid,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.$message({
                  message: '文件移动成功',
                  type: 'success',
                  center: true
                });
                this.getfilelist();
              } else {
                this.$message.error('文件移动失败');
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
          this.dialogTableVisible = false;
        },
        showuploaddiv(){
          if($("#ShowDiv").css("display")=='none'){
            $("#ShowDiv").slideDown();
          }else{
            $("#ShowDiv").slideUp();
          }
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
        downloadfile(val){
//          console.log(val);
          // this.$axios.get("/auth/download/" + val,
          //   {
          //     headers: {
          //       'Authorization': sessionStorage.getItem('userToken')
          //     }
          //   },
          //   {timeout: 1000 * 60 * 10})
          //   .then(function (res) {
          //     console.log(res);
          //     let url = res.config.url;
          //     window.open(url);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          $.ajax({
            url:'http://192.168.100.35:8080/auth/download/'+val,
            type:'get',
            async:false,
            headers:{
              'Authorization': sessionStorage.getItem('userToken')
            },
            timeout:5000,
            error: function (error) {
              console.log(error);
              alert('no');
            },
            success:function (res) {
              window.open('http://192.168.100.35:8080/auth/download/'+val);
              // let url = res.config.url;
              // window.open(url);
            }
          });
        },
        getpictures(){
          this.$axios.get("/userfile/pictures",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
              } else {
                this.filelist = [];
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getdocuments(){
          this.$axios.get("/userfile/documents",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
              } else {
                this.filelist = [];
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getvideo(){
          this.$axios.get("/userfile/video",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
              } else {
                this.filelist = [];
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getseed(){
          this.$axios.get("/userfile/select/"+this.currentcatalogue,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
              } else {
                this.filelist = [];
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getmusic(){
          this.$axios.get("/userfile/music",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
              } else {
                this.filelist = [];
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getother(){
          this.$axios.get("/userfile/other",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.filelist = [].concat(res.data.data);
              } else {
                this.filelist = [];
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getdownloadlist(){
          this.dialogDownloadVisible = true;
          this.$axios.post("/downloadrecord?page="+this.currentpagenum+"&page_size=5",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              this.tableDownload = [].concat(res.data.data.records);
              this.total = res.data.data.total;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        downloadDelete(index, row){
//          console.log(index, row);
          this.$axios.delete("/delete/"+row.id,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              if (res.data.status){
                this.$message({
                  message: '下载记录删除成功',
                  type: 'success',
                  center: true
                });
                this.getdownloadlist();
              } else {
                this.$message.error('下载记录删除失败');
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        currentchange(val){
          this.currentpagenum = val;
          this.getdownloadlist();
        },
        searchfile(){
          this.$axios.post("/userfile/search",{
            key:this.searchinfo
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.data != null){
                this.$message({
                  message: '搜索成功',
                  type: 'success',
                  center: true
                });
                this.filelist = [].concat(res.data.data)
                let params = [{name:"全部文件",id:0},{
                  name:'搜索'+'"'+this.searchinfo+'"',
                  id:-1
                }];
                this.pathlist = [].concat(params);
                this.flag_back = false;
              } else {
                this.$message.error('搜索失败');
                let params = [{name:"全部文件",id:0},{
                  name:'搜索'+'"'+this.searchinfo+'"',
                  id:-1
                }];
                this.pathlist = [].concat(params);
                this.filelist = [];
                this.flag_back = false;
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        sharefile(val){
          this.currentchooseid = val;
          this.dialogShareVisible=true;
          this.$axios.get("/friend/friend_list",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              let data = [];
              for (let i=0;i<res.data.data.length;i++){
                data.push({
                  key:res.data.data[i].id,
                  label:`${res.data.data[i].username}`,
                  disabled:false
                });
              }
              this.sharefriendlist = [].concat(data);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        transferchange(value){
//          console.log(value);
          this.friendid = value.join();
        },
        sharetofriend(){
          if (this.friendid == ''){
            this.$message.error('请先选择好友');
            return;
          }
          this.$axios.post("/usershare/sharetofriends",{
            fileId:this.currentchooseid,
            friendId:this.friendid
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              if (res.data.status){
                this.$message({
                  message: '成功分享给好友',
                  type: 'success',
                  center: true
                });
              } else {
                this.$message.error('分享给好友失败');
              };
              this.dialogShareVisible = false;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        sharetocircle(){
//          if (this.textarea.length > 50 ){
//            this.$message({
//              message: '字符过长，重新输入',
//              type: 'warning',
//              center: true
//            });
//            return ;
//          }
          this.$axios.post("/usershare/share",{
            fileId:this.currentchooseid,
            description:this.textarea
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              if (res.data.status){
                this.$message({
                  message: '成功分享至分享圈',
                  type: 'success',
                  center: true
                });
              } else {
                this.$message.error('分享至分享圈失败');
              }
              this.dialogShareVisible = false;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getstoresize() {
          this.$axios.get("/getstorage", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              let pe = parseInt(((res.data.data.size) / (res.data.data.storage)) * 100);
              this.$store.commit('userPercent',pe);
              this.$store.commit('userStoresize',res.data.data.size.toFixed(2));
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      beforeRouteUpdate(to,from,next){
        next();
        if (to.query.id == "1"){
          this.currentcatalogue = 0;
          this.pathlist = [].concat([{name:"全部文件",id:0}]);
          this.getfilelist();
        } else if (to.query.id == "2"){
          this.pathlist = [].concat([{name:"全部图片",id:-1}]);
          this.flag_back = false;
          this.getpictures();
        } else if (to.query.id == "3"){
          this.pathlist = [].concat([{name:"全部文档",id:-1}]);
          this.flag_back = false;
          this.getdocuments();
        } else if (to.query.id == "4"){
          this.pathlist = [].concat([{name:"全部视频",id:-1}]);
          this.flag_back = false;
          this.getvideo();
        } else if (to.query.id == "5"){
          this.pathlist = [].concat([{name:"全部种子",id:-1}]);
          this.flag_back = false;
          this.filelist = [];
        } else if (to.query.id == "6"){
          this.pathlist = [].concat([{name:"全部音乐",id:-1}]);
          this.flag_back = false;
          this.getmusic();
        } else if (to.query.id == "7"){
          this.pathlist = [].concat([{name:"其它",id:-1}]);
          this.flag_back = false;
          this.getother();
        }
      },
      watch:{
        'currentcatalogue':function () {
          sessionStorage.setItem('parentid',this.currentcatalogue);
        }
      },
      mounted(){
        let ht=document.documentElement.clientHeight-150;
        $("#filetable").css("height",ht+'px');
        this.getfilelist();
        sessionStorage.setItem('parentid','0');
        // const s = document.createElement('script');
        // s.type = 'text/javascript';
        // s.src = '/static/js/upload.js';
        // document.body.appendChild(s);

        var that = this;
        // setInterval(function () {
        //   that.getfilelist();
        // },1000);
          // 当domReady的时候开始初始化
        var $wrap = $('#uploader'),

              file_md5,

              chunks,
              // 文件容器
              $queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList')),

              // 状态栏，包括进度和控制按钮
              $statusBar = $wrap.find('.statusBar'),

              // 文件总体选择信息。
              $info = $statusBar.find('.info'),

              // 上传按钮
              $upload = $wrap.find('.uploadBtn'),

              // 没选择文件之前的内容。
              $placeHolder = $wrap.find('.placeholder'),

              $progress = $statusBar.find('.progress').hide(),

              //服务器路径
              serverRootUrl = 'http://192.168.100.35:8080',
              checkMd5 = serverRootUrl + '/userfile/check_md5',
              checkUrl = serverRootUrl + '/userfile/check',
              checkMerge = serverRootUrl + '/userfile/merge',
              uploadUrl = serverRootUrl + '/userfile/upload',

              // 添加的文件数量
              fileCount = 0,

              // 添加的文件总大小
              fileSize = 0,

              // 优化retina, 在retina下这个值是2
              ratio = window.devicePixelRatio || 1,

              // 缩略图大小
              thumbnailWidth = 110 * ratio,
              thumbnailHeight = 110 * ratio,

              // 可能有pedding, ready, uploading, confirm, done.
              state = 'pedding',

              // 所有文件的进度信息，key为file id
              percentages = {},

              // 判断浏览器是否支持图片的base64
              isSupportBase64 = (function() {
                var data = new Image();
                var support = true;
                data.onload = data.onerror = function() {
                  if(this.width != 1 || this.height != 1) {
                    support = false;
                  }
                }
                data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                return support;
              })(),

              // 检测是否已经安装flash，检测flash的版本
              flashVersion = (function() {
                var version;
                try {
                  version = navigator.plugins['Shockwave Flash'];
                  version = version.description;
                } catch(ex) {
                  try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                      .GetVariable('$version');
                  } catch(ex2) {
                    version = '0.0';
                  }
                }
                version = version.match(/\d+/g);
                return parseFloat(version[0] + '.' + version[1], 10);
              })(),

              supportTransition = (function() {
                var s = document.createElement('p').style,
                  r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
                s = null;
                return r;
              })(),

              // WebUploader实例
              uploader,
              //设置分片大小
              chunkSize = 2 * 1024 * 1024,
              // 文件名、文件MD5、文件大小、表单数据
              fileName, fileMd5, fileSize, formData;

            //不支持flash，并且是ie浏览器
            if(!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {
              // flash 安装了但是版本过低。
              if(flashVersion) {
                (function(container) {
                  window['expressinstallcallback'] = function(state) {
                    switch(state) {
                      case 'Download.Cancelled':
                        alert('您取消了更新！')
                        break;

                      case 'Download.Failed':
                        alert('安装失败')
                        break;

                      default:
                        alert('安装已成功，请刷新！');
                        break;
                    }
                    delete window['expressinstallcallback'];
                  };

                  var swf = '../images/expressInstall.swf';
                  // insert flash object
                  var html = '<object type="application/' +
                    'x-shockwave-flash" data="' + swf + '" ';

                  if(WebUploader.browser.ie) {
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                  }

                  html += 'width="100%" height="100%" style="outline:0">' +
                    '<param name="movie" value="' + swf + '" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="allowscriptaccess" value="always" />' +
                    '</object>';

                  container.html(html);

                })($wrap);
                // 压根就没有安转。
              } else {
                $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
              }
              return;
            } else if(!WebUploader.Uploader.support()) {
              alert('Web Uploader 不支持您的浏览器！');
              return;
            }

            WebUploader.Uploader.register({
              'name': 'webUploaderHookCommand',
              'before-send-file': 'beforeSendFile',
              "before-send": "beforeSend",
              "after-send-file": "afterSendFile"
            }, {
              beforeSendFile: function(file) {
                var parentid = sessionStorage.getItem('parentid');
                chunks = Math.ceil(file.size/chunkSize);
                var task = new WebUploader.Deferred();
                fileName = file.name;
                fileSize = file.size;
                // fileSize = (file.size/1024/1024).toFixed(2);
                (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function(percentage) {}).then(function(val) {
                  fileMd5 = val;
                  file_md5 = val;
//                  console.log("md5:"+fileMd5);
                  var url = checkMd5;
                  var data = {
                    name: fileName,
                    mdValue: fileMd5,
                    size: fileSize,
                    parentId:parentid,
                    type:1
                  };
                    $.ajax({
                      type: "POST",
                      headers:{
                        'Authorization': sessionStorage.getItem('userToken')
                      },
                      url: url,
                      data: data,
                      beforeSend: function(request) {
                        request.setRequestHeader("Authorization", sessionStorage.getItem('userToken'));
                      },
                      cache: false,
                      async: false, // 同步
                      timeout: 5000, // todo 超时的话，只能认为该分片未上传过
                      dataType: "json",
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                        file.statusText = 'server_error';
                        task.reject();
                      }
                    }).then(function(data, textStatus, jqXHR) {
//                      console.log(data);
                      if (data.data.result == "1"){
                        task.resolve();
                      }
                      if (data.data.result == "0"){
                        task.reject();
                        file.statusText ='file_existed';
                      }
                      if(data.data.result == "2") {
                        task.reject();
                        uploader.skipFile(file);
                      }
                    });
                });
                return task.promise();
              },
              beforeSend: function(block) {
                var task = new WebUploader.Deferred();
                var url = checkUrl;
                var data = {
                  name: fileName,
                  chunk: block.chunk,
                  size: block.end - block.start,
                  chunks:chunks,
                  fileMd5:file_md5
                };
                $.ajax({
                  type: "POST",
                  headers:{
                    'Authorization': sessionStorage.getItem('userToken')
                  },
                  url: url,
                  data: data,
                  beforeSend: function(request) {
                    request.setRequestHeader("Authorization", sessionStorage.getItem('userToken'));
                  },
                  cache: false,
                  async: false, // 同步
                  timeout: 5000, // todo 超时的话，只能认为该分片未上传过
                  dataType: "json",
                }).then(function(data, textStatus, jqXHR) {
//                  console.log(data.data.result);
                  if(data.data.result == 1) {
                    task.reject(); // 分片存在，则跳过上传
                  } else {
                    task.resolve();
                  }
                });
                this.owner.options.formData.fileMd5 = fileMd5;
                this.owner.options.formData.chunkSize = chunkSize;
                return task.promise();
              },
              afterSendFile:function(file){
                var parentid = sessionStorage.getItem('parentid');
                var chunksTotal = Math.ceil(file.size/chunkSize);
                var task = new WebUploader.Deferred();
                (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function(percentage) {}).then(function(val) {
                  // fileMd5 = val;
                  fileMd5 = file_md5;
//                  console.log("md5:"+fileMd5);
                  var url = checkMerge;
                  var data = {
                    name: file.name,
                    chunks: chunksTotal,
                    size: file.size,
                    fileMd5:fileMd5
                  };
                  $.ajax({
                    type: "POST",
                    headers:{
                      'Authorization': sessionStorage.getItem('userToken')
                    },
                    url: url + '/' + parentid,
                    data: data,
                    timeout: 5000,
                    beforeSend: function(request) {
                      request.setRequestHeader("Authorization", sessionStorage.getItem('userToken'));
                    },
                    cache: false,
                    async: false,  // 同步
                    dataType: "json",
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                      file.statusText = 'server_error';
                      task.reject();
                    }
                  }).then(function (data, textStatus, jqXHR) {
                    // 业务逻辑...
//                    console.log(data);
                    if (data.status){
                      that.successflag = true;
                      setTimeout(function () {
                        task.resolve();
                      },5000)
                    }
                    if (!data.status){
                      that.successflag = false;
                      task.reject();
                      file.statusText = '';
                    }
                  });
                });
                return task.promise();
              }
            });

            // 实例化
            uploader = WebUploader.create({
              pick: {
                id: '#filePicker',
                label: '点击选择文件'
              },
              formData: {
                uid: 123
              },
              dnd: '#dndArea', //指定文件拖拽的区域
              paste: '#uploader', //指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为document.body.
              swf: '../webuploader/Uploader.swf',
              chunked: true,
              chunkSize: chunkSize,
              chunkRetry: false,
              threads: 1,
              server: uploadUrl,
              // runtimeOrder: 'flash',
              headers:{
                'Authorization': sessionStorage.getItem('userToken')
              },
              duplicate :true,

              // accept: {
              //     title: 'Images',
              //     extensions: 'gif,jpg,jpeg,bmp,png',
              //     mimeTypes: 'image/*'
              // },
              // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
              disableGlobalDnd: true,
              fileNumLimit: 300 //限制多文件上传的个数
              //fileSizeLimit: 200 * 1024 * 1024, // 限制所有文件的大小 200 M
              //fileSingleSizeLimit: 50 * 1024 * 1024 // 限制单个文件的大小 50 M
            });

            // 拖拽时校验
            uploader.on('dndAccept', function(items) {
              //			var denied = false,len = items.length,i = 0,unAllowed = 'text/plain;application/javascript ';
              //			for(; i < len; i++) {
              //				if(~unAllowed.indexOf(items[i].type)) {
              //					denied = true;
              //					break;
              //				}
              //			}
              //			return !denied;
              return true;
            });

            //当一批文件添加进队列以后触发
            // uploader.on('filesQueued', function() {
            //     uploader.sort(function( a, b ) {
            //         if ( a.name < b.name )
            //           return -1;
            //         if ( a.name > b.name )
            //           return 1;
            //         return 0;
            //     });
            // });

            // 添加“添加文件”的按钮，
            uploader.addButton({
              id: '#filePicker2',
              label: '继续添加'
            });

            //uploader实例化执行
            uploader.on('ready', function() {
              window.uploader = uploader;
            });

            function gen_html_li(file) {
              var $li = $('<li id="' + file.id + '" title="' + file.name + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>' +
                '<p class="progress"><span></span></p>' +
                '</li>')
              return $li;
            }

            function gen_html_btns(li) {
              var $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo(li);
              return $btns;
            }

            function getErrorText(code) {
              var text;
              switch(code) {
                case 'exceed_size':
                  text = '文件大小超出';
                  break;

                case 'interrupt':
                  text = '上传暂停';
                  break;
                case 'file_existed':
                  text = '文件已存在';
                  break;
                case 'server_error':
                  text = '服务器异常';
                  break;
                default:
                  text = '上传失败，请重试';
                  break;
              }
              return text;
            }

            // 当有文件添加进来时执行，负责view的创建
            function addFile(file) {
              var $li = gen_html_li(file),
                $btns = gen_html_btns($li),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find('p.imgWrap'),
                $info = $('<p class="error"></p>'),
                showError = function(code) {
                  var text = getErrorText(code);
                  $info.text(text).appendTo($li);
                };
              if(file.getStatus() === 'invalid') {
                showError(file.statusText);
              } else {
                // @todo lazyload
                $wrap.text('预览中');
                //生成缩略图
                uploader.makeThumb(file, function(error, src) {
                  var img;
                  if(error) {
                    $wrap.text('');
                    return;
                  }
                  if(isSupportBase64) {
                    img = $('<img src="' + src + '">');
                    $wrap.empty().append(img);
                  } else {
                    //浏览器不支持base64，生成缩略图需要做处理
                    $.ajax('../../server/preview.php', {
                      method: 'POST',
                      data: src,
                      dataType: 'json'
                    }).done(function(response) {
                      if(response.result) {
                        img = $('<img src="' + response.result + '">');
                        $wrap.empty().append(img);
                      } else {
                        $wrap.text("预览出错");
                      }
                    });
                  }
                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
              }

              //监控文件的状态变化
              file.on('statuschange', function(cur, prev) {
                if(prev === 'progress') {
                  $prgress.hide().width(0);
                } else if(prev === 'queued') {
                  $li.off('mouseenter mouseleave');
                  $btns.remove();
                }
                // 成功
                if(cur === 'error' || cur === 'invalid') {
                  showError(file.statusText);
                  percentages[file.id][1] = 1;
                } else if(cur === 'interrupt') {
                  showError('interrupt');
                } else if(cur === 'queued') {
                  percentages[file.id][1] = 0;
                } else if(cur === 'progress') {
                  $info.remove();
                  $prgress.css('display', 'block');
                } else if(cur === 'complete') {
                  $li.append('<span class="success"></span>');
                  $(".error").remove();
                }
                $li.removeClass('state-' + prev).addClass('state-' + cur);
              });

              $li.on('mouseenter', function() {
                $btns.stop().animate({
                  height: 30
                });
              });

              $li.on('mouseleave', function() {
                $btns.stop().animate({
                  height: 0
                });
              });

              $btns.on('click', 'span', function() {
                var index = $(this).index(),
                  deg;
                switch(index) {
                  case 0:
                    uploader.removeFile(file);
                    return;
                  case 1:
                    file.rotation += 90;
                    break;
                  case 2:
                    file.rotation -= 90;
                    break;
                }

                if(supportTransition) {
                  deg = 'rotate(' + file.rotation + 'deg)';
                  $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                  });
                } else {
                  $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                  // use jquery animate to rotation
                  // $({
                  //     rotation: rotation
                  // }).animate({
                  //     rotation: file.rotation
                  // }, {
                  //     easing: 'linear',
                  //     step: function( now ) {
                  //         now = now * Math.PI / 180;

                  //         var cos = Math.cos( now ),
                  //             sin = Math.sin( now );

                  //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                  //     }
                  // });
                }

              });
              $li.appendTo($queue);
            }

            // 负责view的销毁
            function removeFile(file) {
              var $li = $('#' + file.id);
              delete percentages[file.id];
              updateTotalProgress();
              $li.off().find('.file-panel').off().end().remove();
            }

            function updateTotalProgress() {
              var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;
              $.each(percentages, function(k, v) {
                total += v[0];
                loaded += v[0] * v[1];
              });
              percent = total ? loaded / total : 0;
              spans.eq(0).text(Math.round(percent * 100) + '%');
              spans.eq(1).css('width', Math.round(percent * 100) + '%');
              updateStatus();
            }

            function updateStatus() {
              var text = '',
                stats;
              if(state === 'ready') {
                text = '选中' + fileCount + '个文件，共' + WebUploader.formatSize(fileSize) + '。';
              } else if(state === 'confirm') {
                stats = uploader.getStats();
                if(stats.uploadFailNum) {
                  text = '已成功上传' + stats.successNum + '个文件，' + stats.uploadFailNum + '个文件上传失败了，<a class="retry" href="#">重新上传</a>失败文件或忽略'
                }
              } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '个（' + WebUploader.formatSize(fileSize) + '），已上传' + stats.successNum + '个';
                if(stats.uploadFailNum) {
                  text += '，失败' + stats.uploadFailNum + '个';
                }
              }
              $info.html(text);
            }

            function setState(val) {
              var file, stats;
              if(val === state) {
                return;
              }
              $upload.removeClass('state-' + state);
              $upload.addClass('state-' + val);
              state = val;

              switch(state) {
                case 'pedding':
                  $placeHolder.removeClass('element-invisible');
                  $queue.hide();
                  $statusBar.addClass('element-invisible');
                  uploader.refresh();
                  break;
                case 'ready':
                  $placeHolder.addClass('element-invisible');
                  $('#filePicker2').removeClass('element-invisible');
                  $queue.show();
                  $statusBar.removeClass('element-invisible');
                  uploader.refresh();
                  break;
                case 'uploading':
                  $('#filePicker2').addClass('element-invisible');
                  $progress.show();
                  $upload.text('暂停上传');
                  break;
                case 'paused':
                  $progress.show();
                  $upload.text('继续上传');
                  break;
                case 'confirm':
                  $progress.hide();
                  $('#filePicker2').removeClass('element-invisible');
                  $upload.text('开始上传');

                  stats = uploader.getStats();
                  if(stats.successNum && !stats.uploadFailNum) {
                    setState('finish');
                    return;
                  }
                  break;
                case 'finish':
                  stats = uploader.getStats();
                  if(stats.successNum) {
                    that.$message({
                      message: '文件上传成功',
                      type: 'success',
                      center: true
                    });
                    that.getfilelist();
                  } else {
                    // 没有成功的图片，重设
                    state = 'done';
                    location.reload();
                  }
                  break;
              }
              updateStatus();
            }

            //上传过程中触发，携带上传进度
            uploader.onUploadProgress = function(file, percentage) {
              var $li = $('#' + file.id),
                $percent = $li.find('.progress span');
              $percent.css('width', percentage * 100 + '%');
              percentages[file.id][1] = percentage;
              updateTotalProgress();
            };

            //当文件被加入队列以后触发
            uploader.onFileQueued = function(file) {
              fileCount++;
              fileSize += file.size;
              if(fileCount === 1) {
                $placeHolder.addClass('element-invisible');
                $statusBar.show();
              }
              addFile(file);
              setState('ready');
              updateTotalProgress();
            };

            //当文件被移除队列后触发
            uploader.onFileDequeued = function(file) {
              fileCount--;
              fileSize -= file.size;
              if(!fileCount) {
                setState('pedding');
              }
              removeFile(file);
              updateTotalProgress();
            };

            uploader.on('all', function(type) {
              var stats;
              switch(type) {
                case 'uploadFinished': //当所有文件上传结束时触发
                  setState('confirm');
                  break;
                case 'startUpload': //当开始上传流程时触发
                  setState('uploading');
                  break;
                case 'stopUpload': //当开始上传流程暂停时触发
                  setState('paused');
                  break;
              }
            });

            // uploader.on('uploadComplete', function (file) {
            //   console.log(that.successflag);
            //   if (that.successflag){
            //     that.$message({
            //       message: '上传成功',
            //       type: 'success'
            //     });
            //     that.successflag = false;
            //     uploader.removeFile(file);
            //     that.getfilelist();
            //   } else {
            //     that.$message.error('上传失败');
            //   }
            // });
            //选择文件校验失败以后触发
            uploader.onError = function(code) {
              alert('Eroor: ' + code);
            };

            //上传按钮
            $upload.on('click', function() {
              if($(this).hasClass('disabled')) {
                return false;
              }
              if(state === 'ready') {
                uploader.upload();
              } else if(state === 'paused') {
                uploader.upload();
              } else if(state === 'uploading') {
                uploader.stop(true);
              }
            });

            //重新上传
            $info.on('click', '.retry', function() {
              uploader.retry();
            });

            //上传按钮样式变化
            $upload.addClass('state-' + state);

            //更新上传进度
            updateTotalProgress();


      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  @import "../../static/css/style.css";
  #handlefile{
  }
  .table-icon{
    float: right;
    cursor: pointer;
    font-size: 20px;
    color: #3b8cff;
  }
  .table-icon:hover{
    color: aqua;
  }
  .breadspan{
    color: #3b8cff;
    cursor: pointer;
  }
  .dropfont{
    color: #3b8cff;
    cursor: pointer;
    font-size: 14px;
  }
  .main-content-head{
    width: 300px;
    float: left;
  }
  .main-content-head button{
    height: 35px;
  }
  .se1{
    width:100px;
    position:absolute;
    top: 14px;
    left: 20px;
  }
  .se1:hover{
    cursor: pointer;
  }
  .se3{
    width: 130px;
    position:absolute;
    top: 14px;
    left: 130px;
  }
  .se4{
    width: 80px;
    position:absolute;
    top: 14px;
    left: 260px;
  }
  .se5{
    width: 80px;
    position:absolute;
    top: 14px;
    left: 340px;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  #ShowDiv{
    position: absolute;
    display:none;
    width:80%;
    height:445px;
    border:1px solid #ccc;
    border-right:2px solid #888;
    border-bottom:2px solid #888;
    background-color:white;
    z-index: 1;
    bottom: 0px;
    right: 0px;
    box-shadow: 0 0 10px #ccc;
  }
  .el-dropdown-menu{
    width: 80px;
    text-align: center;
    line-height: 30px;
  }
  .icon{
    width: 25px;
    height: 25px;
  }
</style>
