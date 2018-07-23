<template>
    <div id="sharehome">
      <div class="sharehome-head">
        <div class="imgdiv">
          <img :src="imgsrc" alt="">
          <div style="height: 100px;position: relative;left: 145px;top: -120px;width: 300px">
            <h3>{{currentusername}}</h3>
            <i class="el-icon-edit-outline" style="cursor: pointer"></i>
            <span style="font-size: 14px;color: #999">介绍一下自己</span>
            <ul id="ul-share">
              <li @click="jump('/home/sharehome/sharehomefile','1')">{{sharenum}}分享</li>
              <li style="margin-left: 20px">0专辑</li>
              <li style="margin-left: 20px" @click="jump('/home/sharehome/sharehomemyconcern','1')">{{myconcernnum}}关注</li>
              <li style="margin-left: 20px" @click="jump('/home/sharehome/shareconcernme','1')">{{concernnum}}粉丝</li>
            </ul>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sharehome",
      data() {
        return {
          imgsrc:sessionStorage.getItem('userAvatar'),
          sharenum:0,
          concernnum:0,
          myconcernnum:0,
          currentusername:sessionStorage.getItem('username'),
        }
      },
      methods:{
        jump(path, id) {
          this.$router.push({
            path: path,
            query: {
              id: id
            }
          });
        },
        getusershare(){
          this.$axios.get("/usershare", {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          })
            .then(function (res) {
              if (res.data.data != null){
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
//              console.log(res.data.data);
              this.concernnum = res.data.data.length;
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
//              console.log(res.data);
              this.myconcernnum = res.data.data.length;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        },
      },
      mounted(){
        this.getusershare();
        this.getconcern();
        this.getmyconcern();
        var menu = $('#ul-share li');
        menu.click(function () {
          for (var i=0;i<menu.length;i++) {
            menu[i].className=""
          }
          this.className="li-active";
        })
        let h=document.documentElement.clientHeight-60;
        $("#sharehome").css('height',h + 'px');
        menu[this.$route.query.id-1].className = 'li-active';
      }
    }
</script>

<style scoped>
  #sharehome{
    margin-top: 10px;
    width: 100%;
    min-height: 575px;
    background-color: white;
  }
  .sharehome-head{
    background: #eee url("/static/image/自由存.png") right  no-repeat;
    height: 130px;
    width: 100%;
  }
  .imgdiv{
    width: 123px;
    height: 123px;
    padding: 2px;
    border: 2px solid #aaa;
    position: relative;
    top: 30px;
    left: 20px;
    background-color: white;
  }
  .sharehome-head img{
    width: 115px;
    height: 115px;
  }
  ul{
    margin-top: 10px;
  }
  li{
    display: block;
    float: left;
    list-style: none;
    font-size: 1.1em;
    width: 50px;
  }
  li:hover{
    color: blueviolet;
    cursor: pointer;
  }
  .li-active{
    color: blueviolet;
    border-bottom: 2px solid blueviolet;
  }
</style>
