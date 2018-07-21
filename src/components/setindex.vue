<template>
    <div class="setindex">
      <div class="showdata">
        <div class="safe-test-show">
          <el-progress type="circle" :percentage="29"  class="safeshow"></el-progress>
          <div class="show-setting-message">
            <h5><b>安全评分</b></h5>
            <ul>
              <li><i class="el-icon-warning" style="color: #ffc363"></i>&nbsp;&nbsp;你的账号存在风险，请完善用户信息<el-button size="mini" @click="jump">立即完善</el-button></li>
              <li><i class="el-icon-warning" style="color: #ffc363"></i>&nbsp;&nbsp;绑定邮箱，开启安全验证 <el-button size="mini" @click="jump">立即绑定</el-button></li>
            </ul>
          </div>
        </div>
        <hr style="border: 1px dashed #e9e9e9">
        <div class="history-record">
          <h5><b>登录记录</b></h5>
          <div id="dataChart" :style="{width:'600px',height:'400px'}"></div>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "setindex",
      data(){
          return{

        }
      },
      methods:{
        jump(){
          this.$router.push('/accountset/personaldata');
        },
          showLoginHistory(){
            let dataChart = this.$echarts.init(document.getElementById('dataChart'))
            dataChart.setOption({
                color: ['#3398DB'],
                title:{text:"该数据为最近一周的登录使用情况",
                        left:'right',
                        textStyle:{
                          fontSize:14,
                        },
                },
                tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis : [
                  {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis : [
                  {
                    type : 'value'
                  }
                ],
                series : [
                  {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                  }
                ]
            })
          }
      },
      mounted(){
          this.showLoginHistory();
      }
    }
</script>

<style scoped>
.setindex{
  margin-left: 60px;
  margin-top: 10px;
}
  .showdata{
    /*border: 1px solid #e9e9e9;*/
    padding: 30px;
    background-color: white;
    border-bottom: 1px solid #e9e9e9;
  }
  .safe-test-show{
    height: 200px;
    margin-top: 20px;
  }
  .history-record{
    margin-top: 40px;
  }
  .show-setting-message{
    float: right;
    width: 400px;

    /*background-color: #55a532;*/
  }
.show-setting-message > ul{
  margin-top: 10px;
}
  .show-setting-message > ul > li{
    list-style-type: none;
    font-size: 14px;
    margin-top: 10px;
    line-height: 30px;
    margin-right: 10px;
  }
  .show-setting-message > ul > li > button{
   float: right;
  }
</style>
