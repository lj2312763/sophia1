<template>
   <div class="content">
      <p class="title">{{textImg.title}}</p>
      <div class="intro">{{textImg.intro}}</div>
      <div class="textImg">
          <Row :gutter="20">
            <i-col span="8" >
              <div class="echart_container">
                  <div class="echart_title">{{textImg.Echarts.lineEcharts.title}}</div>
                  <div class="echart_content">
                    <lineEcharts :id="textImg.Echarts.lineEcharts.id" :lineEchartsData="textImg.Echarts.lineEcharts.data"></lineEcharts>
                  </div>
              </div>
              <div class="subTitle">{{textImg.Echarts.lineEcharts.subTitle}}</div>
            </i-col>
            <i-col span="8" >
              <div class="echart_container">
                  <div class="echart_title">{{textImg.Echarts.barEcharts.title}}</div>
                  <div class="echart_content" >
                    <barEcharts :id="textImg.Echarts.barEcharts.id" :barEchartsData="textImg.Echarts.barEcharts.data"></barEcharts>
                  </div>
              </div>
              <div class="subTitle">{{textImg.Echarts.barEcharts.subTitle}}</div>
            </i-col>
            <i-col span="8" >
              <div class="echart_container">
                 <div class="echart_pic" >
                    <img :src="textImg.url" alt="">
                  </div>
              </div>
              <div class="subTitle">{{textImg.heighTitle}}</div>
            </i-col>
        </Row>
      </div>
    </div>
</template>

<script>
import lineEcharts from "./echarts/lineEcharts";
import barEcharts from "./echarts/barEcharts";
export default {
  props:['textImg'],
  data () {
    return {

    }
  },
  components:{
    lineEcharts,
    barEcharts
  },
  created(){
    console.log(this.textImg)
  },
  methods:{
    jump(val){
      console.log(val)
    }
  }
}
</script>

<style scoped lang='less'>
.content{
  width:1200px;
  margin: auto;
  margin-bottom: 80px;
  .title{
    font-size: 36px;
    color: #121C33;
    text-align: center;
    margin-bottom: 10px;
  }
  .intro{
    width:509px;
    margin: auto;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    margin-bottom: 20px
  }
  .textImg{
    width:100%;
    .echart_container{
      border: 1px solid #EBECF0;
      .echart_title{
        height: 40px;
        background-color: #F2F4F7;
        line-height: 40px;
        padding-left: 20px
      }
      .echart_content{
        height: 250px;
      }
      .echart_pic{
        height: 100%;
      }
      img{
        width: 100%;
        display: block;
      }
    }
    .subTitle{
      margin-top: 15px;
      font-size: 22px;
      color: #121C33;
      text-align: center;
    }

     
  }
}
</style>
