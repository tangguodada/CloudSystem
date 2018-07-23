<template>
    <div class="charts">
      <el-row class="panel-group" :gutter="20">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper">
              <i class="el-icon-view"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">用户访问量</div>
              <countTo class="card-panel-num" :startVal="0" :endVal="3333" :duration="3000"></countTo>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#el-icon-erp-people"></use>
              </svg>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">使用用户</div>
              <countTo class="card-panel-num" :startVal="0" :endVal=parseInt(this.count) :duration="1000"></countTo>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper">
              <!--<i class="el-icon-erp-disk"></i>-->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#el-icon-erp-disk"></use>
              </svg>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">磁盘总空间</div>
              <countTo class="card-panel-num" :startVal="0" :endVal="17563" :duration="3600"></countTo>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper">
              <i class="el-icon-date"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">日期</div>
              <span class="card-panel-num">{{presentTime}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!--<div id="showcharts" :style="{height:'600px',width:'600px'}"></div>-->
        <el-col :xs="24" :sm="24" :lg="8" class="card-echarts-col">
          <div class="echarts-panel">
            <div style="width: 100%">
            <el-col :lg="24" style="width: 100%">
              <div id="showcharts" class="showcharts" :style="{height:'280px',width:'90%'}" ref="showcharts"></div>
            </el-col>
            </div>
            <!--<div v-for="(item ,index) in group1">-->
            <!--<p v-if="index==0">{{item.storageCount}}</p>-->
            <!--</div>-->
              <div class="disk-info-group" style="margin-left: 40px;" >
                <p class="StorageNum"><span>StorageCount:     {{group1StorageCount}}</span> <span>ActiveStorage:    {{group1ActiveCount}}</span> </p>
                  <div class="storage-status"  v-for="(item ,index) in group1">
                   <p class="sign-online">在线服务器: <span>{{item.socketAddres}},<span>Storage port:{{item.storagePort}}</span> </span></p>
                  </div>
              </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="card-echarts-col">
          <div class="echarts-panel" >
          <div style="width: 100%">
            <el-col :lg="24" style="width: 100%">
              <div id="showchartsgroup2" class="showcharts"   :style="{height:'280px',width:'90%'}"></div>
            </el-col>
          </div>
          <div class="disk-info-group">

            <div class="storage-status" style="margin-left: 40px;padding-top: -10px">
              <p class="StorageNum"><span>StorageCount:     {{group2StorageCount}}</span> <span>ActiveStorage:    {{group2ActiveCount}}</span> </p>
              <div class="storage-status"  v-for="(item ,index) in group2">
                <p class="sign-online">在线服务器: <span>{{item.socketAddres}},<span>Storage port:{{item.storagePort}}</span> </span></p>
              </div>
            </div>
          </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="card-echarts-col">
          <div class="echarts-panel">
          <div style="width: 100%">
            <el-col :lg="24" style="width: 100%">
              <div id="showchartsgroup3"  class="showcharts"  :style="{height:'280px',width:'90%'}"></div>
            </el-col>
          </div>
          <div class="disk-info-group">

            <div class="storage-status" style="margin-left: 40px;padding-top: -10px">
              <p class="StorageNum"><span>StorageCount:     {{group3StorageCount}}</span> <span>ActiveStorage:    {{group3ActiveCount}}</span> </p>
              <div class="storage-status"  v-for="(item ,index) in group3">
                <p class="sign-online">在线服务器: <span>{{item.socketAddres}},<span>Storage port:{{item.storagePort}}</span> </span></p>
              </div>
            </div>
          </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Vue from 'vue'
import countTo from 'vue-count-to'
    export default {
        name: "systemindex",
      components:{ countTo },
        data() {
          return {
            charts:null,
            presentTime:'',
            fdfsStatus:[],
            group1:[],
            group1StorageCount:'',
            group1ActiveCount:'',
            group1data1:'',
            group1data2:'',
            group2:[],
            group2StorageCount:'',
            group2ActiveCount:'',
            group3:[],
            group3StorageCount:'',
            group3ActiveCount:'',
            count:'',
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
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '49%'],
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
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '49%'],
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
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '49%'],
                  color:['#5C88FF','#C3B4DF'],
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
          }
        },

      methods: {
//          获取用户总数
        getUserCount(){
          this.$axios.get('/count')
            .then(function(res){
//              console.log('11111111');
//              console.log(res);
              this.count = res.data.data;
            }.bind(this))
            .catch(function(error){
//              console.log(error);
            })
        },
        //获取当前日期
        getDate() {
          let date = new Date();
          let time = date.toLocaleDateString();
          this.presentTime = time;
        },

        //获取磁盘的的信息
        getDiskStatus(){
          this.$axios.get('/fdfs_log/current_status')
            .then(function(res){
//              console.log(res);
              this.fdfsStatus = res.data.data;
//              console.log(this.fdfsStatus);
              for(let i=0;i<this.fdfsStatus.length;i++){
                if(this.fdfsStatus[i].groupname == 'group1'){
                 this.group1.push(this.fdfsStatus[i]);
                }else if(this.fdfsStatus[i].groupname == 'group2'){
                  this.group2.push(this.fdfsStatus[i]);
                }else {
                  this.group3.push(this.fdfsStatus[i]);
                }
              }
//              console.log(this.group1);
//              console.log(this.group2);
//              console.log(this.group3);
              this.group1StorageCount = this.group1[0].storageCount;
              this.group1ActiveCount = this.group1[0].activeCount;
              this.group1data1 = this.group1[0].totalMb;
              this.group1data2 = this.group1[0].freeMb;
              this.group2StorageCount = this.group2[0].storageCount;
              this.group2ActiveCount = this.group2[0].activeCount;
              this.group3StorageCount = this.group3[0].storageCount;
              this.group3ActiveCount = this.group3[0].activeCount;
              this.showDiskDistribution();
              this.ShowChartsgroup2();
              this.ShowChartsGroup3();
            }.bind(this))
            .catch(function(error){
              console.log(error);
            })

        },
        //group1的图表
        showDiskDistribution() {
          this.option.title.text = 'group1';
          this.option.series[0].data[0].value = this.group1data2;
          this.option.series[0].data[1].value = this.group1data1 - this.group1data2;
//          console.log("test " + this.option.series[0].data[1].value);
          this.charts = this.$echarts.init(this.$refs.showcharts);
          this.charts.setOption(this.option);
        },
        //group2的图表
        ShowChartsgroup2() {
          let showchartsgroup2 = this.$echarts.init(document.getElementById('showchartsgroup2'));
          //计算已用空间
          this.option2.series[0].data[0].value = this.group1data1-this.group1data2;
          //可用空间的计算
          this.option2.series[0].data[1].value = this.group1data2;
          showchartsgroup2.setOption(this.option2);
        },
        //group3的图表
        ShowChartsGroup3() {
          let showchartsgroup3 = this.$echarts.init(document.getElementById('showchartsgroup3'));
          this.option3.series[0].data[0].value = this.group1data2;
          this.option3.series[0].data[1].value = this.group1data1 - this.group1data2;
          showchartsgroup3.setOption(this.option3);
        }
      },
      mounted() {
        this.getDate();
        this.getDiskStatus();
        this.getUserCount();
        this.showDiskDistribution();
        this.ShowChartsgroup2();
        this.ShowChartsGroup3();
      }


    }
</script>

<style scoped>
  .sign-online::before{
    content:'';
    display: inline-block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: #70DB55;
    margin-right: 10px;
  }

  .icon {
    width: 4em; height: 4em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .panel-group{
    margin-top: 18px;
  }
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel{
    height: 120px;
    font-size: 14px;
    position: relative;
    /*overflow: hidden;*/
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
  .showcharts{
    margin-left: 10%;
  }
  .card-panel-icon-wrapper{
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    border-radius: 6px;
  }
  .card-panel-icon-wrapper:hover{
    background: #00b7ee;
  }
  .card-panel-icon-wrapper > i{
    font-size: 50px;
    color: #00b7ee;
  }
  .card-panel-icon-wrapper > i:hover{
    color: white;
  }
  .card-panel-col{
    float: left;
    font-size: 48px;
  }
  .card-panel-description{
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
  }
  .card-panel-text{
    line-height: 18px;
    color:rgba(0,0,0,0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
  .card-panel-num{
    font-size: 20px;
  }
  .card-echarts-col{
    float: left;
    margin-bottom: 20px;
  }
  .echarts-panel{
    min-height: 400px;
    height: 100%;
    font-size: 14px;
    position: relative;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  }
  .StorageNum > span{
    display: inline-block;
    margin-right:20px;
    margin-left: 26px;
  }
</style>
