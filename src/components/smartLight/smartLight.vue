<template>
  <div class="smart_light_container">
      <div class="banner_container">
          <div class="title">智慧路灯</div>
          <div class="pro_desc">智慧路灯将作为智慧城市建设采集数据的智能终端，实现智慧照明、智慧交通、智慧环保、智慧安防、智慧城管、网络覆盖（5G+WiFi）、广告发布等功能，让原本分立建设的智慧城市各子系统浑然一体</div>
          <div class="btn" @click="goHezuo">合作咨询</div>
      </div>
      <div class="content_container">
          <img class="conImg" :src="contImg" alt="" srcset="">
          <div class="oper_container">
              <div class="oper_title">智慧路灯</div>
              <div class="oper_content">
                  <div class="oper_item" v-for="(item,index) in operArr" :key="index" @click="goExperice(item)" ref='operItem'>{{item.title}}</div>
              </div>
          </div>
      </div>
      <wisEducation :routeId="routeId" :title="title" v-if="isShow" @closeWindow="closeWindow"></wisEducation>
  </div>
</template>

<script>
import wisEducation from "../experienceColl/wisEducation/wisEducation";
export default {
  data () {
    return {
        contImg:require("../../assets/images/smartLight/light_img.png"),
        operArr:[
            {
                index:0,
                title:'轨迹追踪',
                routeId:'2.3.3_1'
            },
            {
                index:1,
                title:'车流量监测',
                routeId:'3.5.3'
            },
            {
                index:2,
                title:'车型识别',
                routeId:'3.5.1'
            },
            {
                index:3,
                title:'人流监测',
                routeId:'6.2.2'
            },
            {
                index:4,
                title:'行为监测',
                routeId:'3.2.2'
            },
            {
                index:6,
                title:'驾驶行为分析',
                routeId:'6.4.1'
            },
            {
                index:5,
                title:'空气质量监测',
                routeId:'kongqi'
            }
        ],
        isShow:false,
    }
  },
  components:{
    wisEducation
  },
  mounted(){
  },
  methods:{
    goExperice(item){
        if(item.routeId == 'kongqi'){
            window.open('https://bi.yzsmart.top/view/report.do?reportId=d40a1a4cbfd642ca94b416a5c306ab9e','_blank');
            return;
        }
        this.isShow=true;
        this.title=item.title;
        this.routeId=item.routeId;
        if(this.$refs.operItem){
            let operItemDom = this.$refs.operItem;
            for(var i=0;i<operItemDom.length;i++){
                if(item.index == i){
                    operItemDom[i].style='background: #03A971;';
                }
                else{
                    operItemDom[i].style='background: rgba(0,0,0,0.60);';
                }
            }
        }
    },
    closeWindow(){
        this.isShow=false;
    },
    goHezuo(){
        let routerUrl = this.$router.resolve({
            path:'/zixun',
        });
        window.open(routerUrl.href,'_blank')
    }
  }
}
</script>
<style scoped lang="less">
.smart_light_container{
    width: 100%;
    .banner_container{
        width: 100%;
        height: 350px;
        background-image: url('../../assets/images/smartLight/banner.png');
        background-size: cover;
        background-position: center;
        padding-top: 85px;
        padding-left: 120px;
        box-sizing: border-box;
        .title{
            font-family: PingFangSC-Medium;
            font-size: 30px;
            color: #FFFFFF;
            margin-bottom: 15px;
        }
        .pro_desc{
            width: 710px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 28px;
            margin-bottom: 32px;
        }
        .btn{
            width: 120px;
            height: 36px;
            background: #03A971;
            border-radius: 3px;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 36px;
        }
    }
    .content_container{
        width: 100%;
        height: 810px;
        position: relative;
        padding-top: 60px;
        box-sizing: border-box;
        .conImg{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .oper_container{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 9999999;
            .oper_title{
                font-family: PingFangSC-Regular;
                font-size: 30px;
                color: #121C33;
                margin-bottom: 30px;
            }
            .oper_content{
                width: 800px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .oper_item{
                    height: 24px;
                    background: rgba(0,0,0,0.60);
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 24px;
                    padding: 0 9px;
                    box-sizing: border-box;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>

