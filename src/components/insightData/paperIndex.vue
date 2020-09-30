<template>
  <div class="tech_container">
    <div class="headerBg">
      <div class="header_content">
        <div class="header_title">论文洞察分析</div>
        <div class="header_search">
            <Input :search='true' enter-button placeholder="请输入您想要查询的论文" style="height:100%" @on-search="goPaperEchart"/>
        </div>
       <div class="header_item">
            <div class="searchItem" v-for="item in linkList" :key="item.id" @click="goPaperEchart(item)">{{item.title}}<span v-if="item.id!=3">&nbsp;&nbsp;|&nbsp;&nbsp;</span></div>
        </div>
      </div>
    </div>
     <div class="body_content">
        <div class="body_left"  id="echart1"></div>
        <div class="body_right" id="echart2"></div>
      </div>
       <div class="paperBtn" @click="goPaperPop">论文流行度预测</div>
  </div>
</template>

<script>
import $echarts from 'echarts'
export default {
  data() {
    return {
       linkList:[
          {title:'农业科学',id:1,path:"/serviceDetail",oneId:5,twoRouteId:'5.3',routeId:'5.3'},
          {title:'工业技术',id:2,path:"/serviceDetail",oneId:5,twoRouteId:'5.4',routeId:'5.4.1'},
          {title:'数理科学和化学',id:3,path:"/serviceDetail",oneId:1,twoRouteId:'1.1',routeId:'1.1.4'},
        ],
        result:null,
    };
  },
  mounted() {
    this.initData();
   
  },
  created(){
  },
  methods:{
    initEcharts1() {
      let option = {
        title: {
            text: '论文学科分布'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
           type: 'category',
           data:  this.result.lwxkfb_x.slice(0,8),
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data:  this.result.lwxkfb_y.slice(0,8),
            }
        ]
      };

      let myBarChart = $echarts.init(document.getElementById("echart2"));
      myBarChart.setOption(option);
    },
    initEcharts() {
        let option = {
              title: {
                  text: '论文发布趋势'
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: [
                  {
                      type: 'category',
                      boundaryGap: false,
                      data: this.result.lwfbqs_x,
                      splitLine: {
                          show: false
                      },
                      axisTick: {
                          show: false
                      },
                      axisLine: {
                          show: false
                      },
                  }
              ],
              yAxis: [
                  {
                      type: 'value',
                      axisTick: {
                          show: false
                      },
                      axisLine: {
                          show: false
                      },
                  }
              ],
              series: [
                  {
                      name: '',
                      type: 'line',
                      stack: '总量',
                      areaStyle: {},
                      data: this.result.lwfbqs_y
                  }
              ]
          };
          let myBarChart = $echarts.init(document.getElementById("echart1"));
          myBarChart.setOption(option);
       
    },
    jumpDetail(item){},
    initData(){
       this.$axios({
        method: "post",
        url: window.config.url+"/sophiaManager/api/lunwen/index",
      }).then(res => {
        if (res.data.code == 0) {
          this.result=res.data;
          this.initEcharts();
          this.initEcharts1();
        }
      }).catch(err => {

      });
    },
    goPaperPop(){
      this.$router.push({
        path:'/paperPopPre'
      });
    },
    goPaperEchart(val){
      this.$router.push({
        path:'/paperEchart',
        query:{
          searchKey:val?val.title:''
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
 img{
    width:100%;
    display: block;
  }
.headerBg {
  height: 240px;
  background: url("../../assets/images/insightData/banner.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .header_content {
    position: absolute;
    width: 1200px;
    left: 0;
    right: 0;
    top: 60px;
    margin: auto;
    .header_title {
      font-size: 30px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 10px;
    }
    .header_search {
      width: 440px;
      height:40px;
      margin:auto;
      margin-bottom: 10px;
      /deep/.ivu-input-group .ivu-input {
        height: 100%;
      }
      /deep/.ivu-input-group-append, .ivu-input-group-prepend{
        width:108px;
      }
       /deep/.ivu-input-search i{
        font-size: 18px;
      }
       /deep/.ivu-input-search{
         background: #03A971!important;
         border-color: #03A971!important;
      }
    }
    .header_item{
      display: flex;
      justify-content: center;
      .searchItem{
        font-size: 12px;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }
}
 .body_content{
    width: 1200px;
    margin:auto;
    margin-top: 39px;
    height: 220px;
    display: flex;
    justify-content: space-between;
    .body_left{
      width:50%;
      height: 100%;
    }
    .body_right{
      flex:1;
      height: 100%;
    }
  }
  .paperBtn{
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    background: #03A971;
    border-radius: 3px;
    width: 120px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 60px;
  }
</style>
