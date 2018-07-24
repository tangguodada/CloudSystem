<template>
    <div id="pdf">
      <!--<iframe id="pdfframe" width="100%" height="100%"></iframe>-->
      <iframe :src="'/static/pdf/web/viewer.html?file=http://192.168.100.35:8080/auth/preview/'+id" width="100%" height="100%"></iframe>
      <!--<iframe :src="'/static/pdf/web/viewer.html?file=KPygAVpWeU.pdf'" width="100%" height="100%"></iframe>-->
    </div>
</template>

<script>
    export default {
        name: "pdf",
      data(){
          return{
            id:'',
            url:''
          }
      },
      methods:{
        getParams () {
          this.id = sessionStorage.getItem('pdfid');
//          console.log(this.id);
          // this.$axios.get("/userfile/preview/b86a3a2ec076461c92857666970a97d9",{
          //   headers:{
          //     'Authorization':sessionStorage.getItem('userToken')
          //   }
          // },{timeout: 1000 * 60 * 2})
          //   .then(function (res) {
          //     console.log(res);
          //   }.bind(this))
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          // $.ajax({
          //   url:'http://192.168.100.139:8080/userfile/preview/67eda8fb97e542a883a118a9e82c99c7',
          //   type:'get',
          //   async:false,
          //   headers:{
          //     'Authorization': sessionStorage.getItem('userToken')
          //   },
          //   timeout:5000,
          //   error: function (error) {
          //     console.log(error);
          //   },
          //   success:function (res) {
          //     // $('#pdfframe').attr('src','../../static/pdf/web/viewer.html?file='+encodeURIComponent(res));
          //     // window.open('http://192.168.100.139:8080/auth/preview/85e0654c5ae843bfb3318fb3257eca79');
          //     // window.open('/static/pdf/web/viewer.html?file='+encodeURIComponent(res) + '&.pdf');
          //     this.url = res;
          //   }
          // });
        },
      },
      mounted(){
        let h=document.documentElement.clientHeight-10;
        $("#pdf").css('height',h + 'px');
        this.getParams();
      }
    }
</script>

<style scoped>

</style>
