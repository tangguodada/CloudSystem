<template>
   <div class="disktable">
     <div class="diskcontainer">
       <div class="crumb">
         <el-breadcrumb separator="/">
           <el-breadcrumb-item>
             <i class="el-icon-message"></i> 磁盘详情</el-breadcrumb-item>
         </el-breadcrumb>
       </div>

       <div class="table-message">
         <el-row :gutter="20">
           <el-col :xs="24" :sm="24" :lg="24" class="card-echarts-col">
             <div class="echarts-panel">
               <el-col :lg="12">
                 <div id="showcharts" :style="{height:'300px',width:'100%'}"></div>
               </el-col>
               <el-col :lg="12">
                 <div class="disk-info-group">
                   <div class="storage-status"   style="margin: 60px 0 60px 30px;">
                     <div  v-for="(item, index) in group1">
                       <p class="sign-online">在线服务器: <span>{{item.socketAddres}} </span></p>
                       <p style="margin-left: 20px"><span>Storage port:{{item.storagePort}}</span> &nbsp;&nbsp;&nbsp;&nbsp;StorageHttpPort:{{item.storageHttpPort}}</p>
                     </div>
                   </div>
                 </div>
               </el-col>
             </div>
           </el-col>
           <el-col :xs="24" :sm="24" :lg="24" class="card-echarts-col">
             <div class="echarts-panel" >
               <el-col :lg="12">
                 <div id="showchartsgroup2" :style="{height:'300px',width:'100%'}"></div>
               </el-col>
               <el-col :lg="12">
                 <div class="disk-info-group">
                   <div class="storage-status" style="margin: 60px 0 60px 30px;">
                     <div  v-for="(item, index) in group2">
                       <p class="sign-online">在线服务器: <span>{{item.socketAddres}} </span></p>
                       <p style="margin-left: 20px"><span>Storage port:{{item.storagePort}}</span> &nbsp;&nbsp;&nbsp;&nbsp;StorageHttpPort:{{item.storageHttpPort}}</p>
                     </div>
                   </div>
                 </div>
               </el-col>
             </div>
           </el-col>
           <el-col :xs="24" :sm="24" :lg="24" class="card-echarts-col">
             <div class="echarts-panel">
               <el-col :lg="12">
                 <div id="showchartsgroup3" :style="{height:'300px',width:'100%'}"></div>
               </el-col>
               <el-col :lg="12">
                 <div class="disk-info-group">
                   <div class="storage-status" style="margin: 60px 0 60px 30px;">
                     <div  v-for="(item, index) in group3">
                       <p class="sign-online">在线服务器: <span>{{item.socketAddres}} </span></p>
                       <p style="margin-left: 20px"><span>Storage port:{{item.storagePort}}</span> &nbsp;&nbsp;&nbsp;&nbsp;StorageHttpPort:{{item.storageHttpPort}}</p>
                     </div>
                   </div>
                 </div>
               </el-col>
             </div>
           </el-col>
         </el-row>
       </div>
     </div>
   </div>
</template>

<script>
    export default {
        name: "diskmessage",
      data(){
          return {
            fdfsStatus:[],
            group1:[],
            group1data1:'',
            group1data2:'',
            group2:[],
            group3:[],
            option:{
              title : {
                text: 'group1',
                subtext:'单位:Mb',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend:{
                orient:'vertical',
                left:'left',
                data:['可用空间','已用空间']
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '50%'],
                  color:['#C3B4DF','#5C88FF'],
                  data:[
                    {value:'', name:'可用空间'},
                    {value:'', name:'已用空间'}
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            },
            option2:{
              title : {
                text: 'group2',
                subtext:'单位:Mb',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend:{
                orient:'vertical',
                left:'left',
                data:['可用空间','已用空间']
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '50%'],
                  color:['#ff8a54','#C3B4DF'],
                  data:[
                    {value:'', name:'已用空间'},
                    {value:'', name:'可用空间'}
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            },
            option3:{
              title : {
                text: 'group3',
                subtext:'单位:Mb',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend:{
                orient:'vertical',
                left:'left',
                data:['可用空间','已用空间']
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '50%'],
                  color:['#C3B4DF','#e0db80'],
                  data:[
                    {value:'', name:'已用空间'},
                    {value:'', name:'可用空间'},
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            },
          }
      },
      methods:{
        getDiskStatus(){
          this.$axios.get('/fdfs_log/current_status')
            .then(function(res){
             // console.log(res);
              this.fdfsStatus = res.data.data;
              //.log(this.fdfsStatus);
              for(let i=0;i<this.fdfsStatus.length;i++){
                if(this.fdfsStatus[i].groupname == 'group1'){
                  this.group1.push(this.fdfsStatus[i]);
                }else if(this.fdfsStatus[i].groupname == 'group2'){
                  this.group2.push(this.fdfsStatus[i]);
                }else {
                  this.group3.push(this.fdfsStatus[i]);
                }
              }
              //.log(this.group1);
              //.log(this.group2);
              //.log(this.group3);
              this.group1StorageCount = this.group1[0].storageCount;
              this.group1ActiveCount = this.group1[0].activeCount;
              this.group1data1 = this.group1[0].totalMb;
              this.group1data2 = this.group1[0].freeMb;
              this.group2StorageCount = this.group2[0].storageCount;
              this.group2ActiveCount = this.group2[0].activeCount;
              this.group3StorageCount = this.group3[0].storageCount;
              this.group3ActiveCount = this.group3[0].activeCount;
              this.ShowChartsgroup1();
              this.ShowChartsgroup2();
              this.ShowChartsgroup3();
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })

        },

        ShowChartsgroup1() {
          let showcharts = this.$echarts.init(document.getElementById('showcharts'));
          this.option.series[0].data[0].value = this.group1data2;
          this.option.series[0].data[1].value = this.group1data1 - this.group1data2;
          showcharts.setOption(this.option);
        },
        ShowChartsgroup2(){
          let showchartsgroup2 = this.$echarts.init(document.getElementById('showchartsgroup2'))
          this.option2.series[0].data[0].value = this.group1data1-this.group1data2;
          //可用空间的计算
          this.option2.series[0].data[1].value = this.group1data2;
          showchartsgroup2.setOption(this.option2);
        },
        ShowChartsgroup3(){
          let showchartsgroup3 = this.$echarts.init(document.getElementById('showchartsgroup3'))
          this.option3.series[0].data[0].value = this.group1data2;
          this.option3.series[0].data[1].value = this.group1data1 - this.group1data2;
          showchartsgroup3.setOption(this.option3);
        }
      },
      mounted() {
        this.getDiskStatus();
        this.ShowChartsgroup1();
        this.ShowChartsgroup2();
        this.ShowChartsgroup3();
      },
    }
</script>

<style scoped>
  .table-message{
    margin-top: 40px;
  }
  .sign-online::before{
    content:'';
    display: inline-block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: #70DB55;
    margin-right: 10px;
  }

  .card-echarts-col{
    float: left;
    margin-bottom: 20px;
  }
  .echarts-panel{
    height: 320px;
    font-size: 14px;
    position: relative;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
</style>
