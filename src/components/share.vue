<template>
    <div id="share">
      <div id="leftdiv">
        <ul class="ul-header">
          <li class="ul-header-li-active">
            <span class="ul-span" style="border-right: 1px solid #6b6a6a" @click="toggle=true">
              <i class="el-icon-erp-account"></i>
              <span>好友</span>
            </span>
          </li>
          <li class="ul-header-li">
            <span class="ul-span" @click="toggle=false">
              <i class="el-icon-erp-huihua"></i>
              <span>会话</span>
            </span>
          </li>
        </ul>
        <div v-show="toggle" class="friendlist" style="height: 80%;overflow: auto">
          <ul style="margin-top: 10px">
            <li v-for="(item,index) in friendlist" :key="index" v-bind:class="{friendlist_li_active:index==currentclass}" @click="choosefd(item,index)">
              <img :src="item.icon" alt="">
              <span>&#12288;{{item.username}}</span>
              <span v-show="isunread(item.id)" style="color: red;float: right;margin-top: 16px;margin-right: 10px">●</span>
            </li>
          </ul>
        </div>
        <div v-show="!toggle" class="chatlist" style="height: 80%">
        </div>
        <ul class="ul-bottom">
          <li>
            <span class="ul-span" style="border-right: 1px solid #6b6a6a">
              <span>创建群组</span>
            </span>
          </li>
          <li>
            <span class="ul-span" style="border-right: 1px solid #6b6a6a" @click="dialogFriendSearch=true">
              <span>添加好友</span>
            </span>
          </li>
          <li>
            <span class="ul-span">
              <span>设置</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="rightdiv" v-show="!showrightdiv">
        <div class="chat-top">
          <strong>{{fdname}}</strong>
        </div>
        <div class="chat-content" id="chatct">
        </div>
        <div class="chat-bottom">
          <el-input v-model="ct" placeholder="输入文字消息" style="width: 50%" @keyup.enter.native="sendinfo" id="saytext" name="saytext"></el-input>
          <span class="emotion"><img class="emotion" style="height: 40px;width: 40px;cursor: pointer" src="/static/image/发表情.png"></span>
          <el-button @click="sendinfo">发送</el-button>
        </div>
      </div>

      <div class="rightdiv" v-show="showrightdiv">
        <!--<img src="/static/image/聊天记录.png" alt="" style="width: 84px;height: 80px;position: relative;top: 140px;left: 290px">-->
        <div style="margin: 160px auto;width: 320px">
          <img src="/static/image/头像%20男孩.png" alt="" style="width: 84px;height: 80px;float: left">
          <div style="width: 150px;float: left">
            <img src="/static/image/聊天记录.png" style="width: 84px;height: 80px;float: left;margin-top: -50px;margin-left: 23px" alt="">
            <div style="clear: both"></div>
          <hr style="border : 1px dashed blue;float: left;width:124px;margin-left: 5px;margin-top: 15px;" />
          <div style="width: 0;height: 0;border-width: 5px;border-style: solid;border-color: transparent transparent transparent blue;float: left;margin-top: 11px"></div>
          </div>
          <img src="/static/image/头像%20女孩.png" alt="" style="width: 84px;height: 80px;float: right">
          <div style="clear: both;width: 300px;height: 30px;text-align: center"></div>
          <h5 style="text-align: center">简单操作即可与好友轻松畅聊</h5>
        </div>

      </div>

      <el-dialog title="添加好友" :visible.sync="dialogFriendSearch" width="40%">
        <p>输入账号添加好友：</p>
        <el-input v-model="friendname" auto-complete="off" placeholder="用户名" style="margin-top: 20px;width: 70%;display: inline-block"></el-input>
        <el-button type="primary" style="width: 20%;display:inline-block;height: 40px;margin-left: 5%" @click="applyfriend">搜索</el-button>
        <p v-show="applytrue" class="applywarn">好友申请已发送</p>
        <p v-show="applyfalse" class="applywarn">该用户不存在</p>
      </el-dialog>
    </div>
</template>

<script>
    import Pdf from "./pdf";
    import ElButton from "element-ui/packages/button/src/button";
    import '../icon/iconfont'
    import '../../static/js/jquery.qqFace'

    export default {
      components: {
        ElButton,
        Pdf},
      name: "share",
      data(){
        return{
          toggle:true,
          dialogFriendSearch:false,
          friendname:'',
          applytrue:false,
          applyfalse:false,
          friendlist:[],
          ct:'',
          fdid:'',
          fdname:'',
          mysrc:sessionStorage.getItem('userAvatar'),
          fdsrc:'',
          currentclass:'-1',
          unreadlist:[],
          showrightdiv:true,
        }
      },
      methods:{
        applyfriend(){
          this.$axios.post("/friend/add_friend",{
            info:this.friendname
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data);
              if (res.data.status){
                this.applytrue = true;
                this.applyfalse = false;
                this.$message({
                  message: '好友申请已发送',
                  type: 'success'
                });
              } else {
                if (res.data.info == "已申请"){
                  this.applytrue = true;
                  this.applyfalse = false;
                  this.$message({
                    message: '好友申请已发送',
                    type: 'success'
                  });
                } else {
                  this.applyfalse = true;
                  this.applytrue = false;
                  this.$message.error('该用户不存在');
                }
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getfriendlist(){
          this.$axios.get("/friend/friend_list",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data.data);
              this.friendlist = [].concat(res.data.data);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        choosefd(val,index){
          this.fdname = val.username;
          this.fdid = val.id;
          this.fdsrc = val.icon;
          this.currentclass = index;
          this.getchatlist();
          this.showrightdiv = false;
          $('.chat-content').empty();
          let result = this.unreadlist.indexOf(val.id);
          this.unreadlist.splice(result,1);
        },
        initWebSocket:function(){ //初始化weosocket
          let userid = sessionStorage.getItem('userId');

          this.websock = new WebSocket("ws://192.168.100.35:8080/ws/"+userid);

          this.websock.onopen = this.websocketonopen;

          // this.websock.onerror = this.websocketonerror;

          this.websock.onmessage = this.websocketonmessage;

          this.websock.onclose = this.websocketclose;
        },

        websocketonopen:function() {
          console.log("WebSocket连接成功");
        },

        websocketonerror:function(e) { //错误
          console.log("WebSocket连接发生错误");
        },

        websocketonmessage:function(e){ //数据接收
          let port = eval('(' + e.data + ')');
//          console.log(port.content);
          if (port.sender == this.fdid) {
            let recevmessage = "<div class='dialogByyou'><div id='talk-img'><img id='talk-myimg' src='"+this.fdsrc+"'></div><div class='sanjiaoLeft'></div><div class='talkbubble'>"+this.replace_em(port.content)+"</div></div>";
            $('.chat-content').append(recevmessage);
          } else {
            let result = this.unreadlist.indexOf(port.sender);
            if (result == -1){
              this.unreadlist.push(port.sender);
            }
          }
          this.setbottom();
        },

        websocketsend:function(agentData){//数据发送
          this.websock.send(agentData);
        },

        websocketclose:function(e){ //关闭
          console.log("connection closed (" + e.code + ")");
        },

        sendinfo(){
          let content = $('#saytext').val();
//          console.log(content);
          let chatmessage = "<div class='dialogByme'><div id='talk-img'><img id='talk-myimg' src='"+this.mysrc+"'></div><div class='sanjiao'></div><div class='talkbubbleMe'>"+this.replace_em(content)+"</div></div>";
          $('.chat-content').append(chatmessage);
          this.$axios.post("/chat/send",{
            content:content,
            receiver:this.fdid
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
          this.ct = '';
          $('#saytext').value = '';
          this.setbottom();
        },

        getunread(){
          this.$axios.get("/chat/unRead",{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data.data.data);
              for (let i=0;i<res.data.data.data.length;i++){
                this.unreadlist.push(res.data.data.data[i].sender)
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },

        isunread(val){
          let result = this.unreadlist.indexOf(val);
          if (result == -1){
            return false;
          } else {
            return true;
          }
        },

        getchatlist(){
          this.$axios.post("/chat/history",{
            days:1,
            receiver:this.fdid
          },{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
              for (let i=res.data.data.length-1;i>=0;i--){
                let content = res.data.data[i].content;
                if (content.length == 0){
                  content = '&nbsp;';
                }
                if (res.data.data[i].sender == this.fdid){
                  let recevmessage = "<div class='dialogByyou'><div id='talk-img'><img id='talk-myimg' src='"+this.fdsrc+"'></div><div class='sanjiaoLeft'></div><div class='talkbubble'>"+this.replace_em(content)+"</div></div>";
                  $('.chat-content').append(recevmessage);
                } else {
                  let chatmessage = "<div class='dialogByme'><div id='talk-img'><img id='talk-myimg' src='"+this.mysrc+"'></div><div class='sanjiao'></div><div class='talkbubbleMe'>"+this.replace_em(content)+"</div></div>";
                  $('.chat-content').append(chatmessage);
                }
              }
              this.setbottom();
            }.bind(this))
            .catch(function (error) {
//              console.log(error);
            })

          this.$axios.get("/chat/read/"+this.fdid,{
            headers:{
              'Authorization':sessionStorage.getItem('userToken'),
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
            .then(function (res) {
//              console.log(res.data.data.data);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })

        },
        replace_em(str){

          str = str.replace(/\</g,'&lt;');

          str = str.replace(/\>/g,'&gt;');

          str = str.replace(/\n/g,'<br/>');

          str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/static/arclist/$1.gif" border="0" />');

          return str;

        },
        setbottom(){
          var div = document.getElementById('chatct');
          div.innerHTML = div.innerHTML + '<br />';
          div.scrollTop = div.scrollHeight;
        }

      },
      mounted(){
        let h=document.documentElement.clientHeight-80;
        $("#share").css('height',h + 'px');
        this.getfriendlist();
        var menu = $('.ul-header li');
        menu.click(function () {
          for (var i=0;i<menu.length;i++) {
            menu[i].className="ul-header-li"
          }
          this.className="ul-header-li-active";
        });
        this.initWebSocket();
        this.getunread();
        $('.emotion').qqFace({
          id : 'facebox',
          assign:'saytext',
          path:'/static/arclist/'	//表情存放的路径
        });
      }
    }
</script>

<style scoped>
  @import "../icon/iconfont.css";
  *{
    margin: 0;
    padding: 0;
  }
  #share{
    width: 70%;
    margin: 0 auto;
    height: 99%;
  }
  #leftdiv{
    width: 29%;
    height: 96%;
    float: left;
    border-radius: 10px;
    margin-top: 10px;
    background-color: #eee;
  }
  .rightdiv{
    width: 70%;
    height: 96%;
    float: right;
    border-radius: 10px;
    margin-top: 10px;
    background-color: #eee;
  }
  .ul-header{
    display: block;
    height: 10%;
  }
  .ul-header-li{
    float: left;
    width: 50%;
    height: 100%;
    list-style: none;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .ul-header-li-active{
    color: blueviolet;
    float: left;
    width: 50%;
    height: 100%;
    list-style: none;
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom: 2px solid blueviolet;
  }
  .ul-bottom{
    display: block;
    height: 10%;
  }
  .ul-bottom li{
    float: left;
    width: 33%;
    height: 100%;
    list-style: none;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .ul-span{
    width: 100%;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
  }
  .friendlist{
    border-bottom: 1px solid #6b6a6a;
  }
  .chatlist{
    border-bottom: 1px solid #6b6a6a;
  }
  .applywarn{
    margin-top: 20px;
    text-align: center;
    font-size: 15px;
  }
  .friendlist li{
    padding-left: 5px;
    border-bottom: 1px solid #d1d1d1;
  }
  .friendlist li:hover{
    cursor: pointer;
    background-color: #e5f5ff;
  }
  .friendlist_li_active{
    background-color: blueviolet !important;
    color: white !important;
  }
  .friendlist img{
    height: 50px;
    width: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  span:hover{
    color: blueviolet;
  }
  .chat-top{
    width: 100%;
    height: 10%;
    background-color: #dedede;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
  }
  .chat-content{
    width: 100%;
    height: 80%;
    overflow: auto
  }
  .chat-bottom{
    width: 100%;
    height: 10%;
    background-color: #dedede;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .chat-bottom button{
    width: 10%;
    height: 75%;
    background-color: blueviolet;
    color: white;
    margin-left: 5%;
  }

</style>
