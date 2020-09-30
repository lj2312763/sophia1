<template>
  <div class="big_data_container">
    <div class="banner" :style="{backgroundImage:'url(' + objText.list_img + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">{{objText.title}}</div>
          <div class="desc2">{{objText.title_desc}}</div>
        </div>
        <div class="btn">
          <span>{{objText.use_btn}}</span>
          <span>{{objText.tech_file}}</span>
        </div>
      </div>
    </div>
    <div class="list_nav_container" ref="listNav">
      <div class='list_nav' ref="navListText">
        <div v-for='(item,index) in objText.list_nav_text' :key="index">{{item}}</div>
      </div>
    </div>
    <!--大数据介绍-->
    <vFnpointPlat :funtext='bigDataIntro' :pointType='1' ref="bigDataIntro"></vFnpointPlat>
    <!--算法介绍-->
    <vFnpointPlat :funtext='AlgorithmIntro' :pointType='2' ref="AlgorithmIntro"></vFnpointPlat>
    <!--BI介绍-->
    <vFnpointPlat :funtext='BiIntro' :pointType='3' ref="BiIntro"></vFnpointPlat>
    <div class="get_audio_container">
      <div class="get_audio">
        <div class="title">即刻获得大数据应用能力</div>
        <div class="btn">立即使用</div>
      </div>
    </div>
  </div>
</template>
<script>
import vFnpointPlat from './fnPointComponent';
  export default {
    name: 'opinionAnalysisDetail',
    data() {
      return {
        objText: {
          title: '大数据平台',
          title_desc: '高性能数据接入引擎，在金融、政务、房产、零售等领域积累了丰富的业务应用，深度与各行业优秀的大数据开发、数据治理服务及应用商合作',
          use_btn: '立即使用',
          tech_file: '技术文档',
          list_img: require('@/assets/images/bigDataPlat/dashuju.png'),
          searchIcon:require('@/assets/images/aiSmartAppDetail/search.png'),
          list_nav_text:['大数据','算法','BI'],
        },
        bigDataIntro:{
            title:'大数据介绍',
            desc:'从客户需求到销售、订单、计划、研发、工艺、制造、采购、供应、库存、物流、售后、运维、报废、回收等整个产品全生命周期所产生的各类数据，以及生产过程的人、机、料、法、环、测的各种生产制造数据进行智能化分析建模。',
            function_text: [
                {
                    img: require('@/assets/images/bigDataPlat/icon_basic_data_80.png'),
                    title: '机器学习',
                    desc: '从客户需求到销售、订单、计划、研发、工艺、制造、采购、供应、库存、物流、售后、运维、报废、回收等整个产品全生命周期所产生的各类数据，以及生产过程的人、机、料、法、环、测的各种生产制造数据进行智能化分析建模。'
                },
                {
                    img: require('@/assets/images/bigDataPlat/icon_BI_service_80.png'),
                    title: '数学建模',
                    desc: '使用数学方法，将数据抽象到纯数学层面以寻求普适的解决方法与结论，是一个利用数据推导结论的过程。'
                },
                {
                    img: require('@/assets/images/bigDataPlat/icon_basic_data_80.png'),
                    title: '大数据分析',
                    desc: '为用户提供海量数据可视化、数据挖掘、自然语言处理等分析与应用。'
                },
                {
                    img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
                    title: '算法库',
                    desc: '针对特定行业的数据，利用数学建模方法，提供行业机器学习算法库。'
                }
            ]
        },
        AlgorithmIntro:{
            title:'算法介绍',
            desc:'物联网边缘智能数据处理（IoT Edge Intelligent Data Process，IoT EIDP）面向物联网运营企业，提供包括边缘 AI 盒子或网关等形态的边缘 AI 计算平台，以及云端管理平台服务，让客户可以简单、快速、低成本地实现边缘 AI 数据处理能力',
            function_text: [
                {
                    img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
                    title: '设备自动接入',
                    desc: '边缘盒子或网关出厂时无需进行个性化配置，只需与注册 PC 同一局域网，即可实现设备的自动发现，支持设备分组管理、权限管理、授权管理，进一步可以远程连接设备、图形化配置及监控数据展示'
                },
                {
                    img: require('@/assets/images/bigDataPlat/icon_property_recommendation_80.png'),
                    title: '离线AI计算',
                    desc: '支持将 AI 算法容器部署在算力可伸缩的边缘硬件平台，视频图片等非结构化数据直接在边缘设备进行智能处理，让数据响应更迅速、带宽要求更低，节约运营成本'
                },
                {
                    img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
                    title: '丰富算法',
                    desc: '丰富的算法市场集合了自有 AI 算法、第三方 AI 算法，满足不同客户对不同边缘场景下的智能数据处理需求。'
                },
                {
                    img: require('@/assets/images/bigDataPlat/icon_basic_data_80.png'),
                    title: '快速二次开发',
                    desc: '客户可自主开发 AI 模型算法，或者基于算法 API 二次开发边缘应用，并上传云端进行分发部署，实现边缘智能数据处理、云端分析与展示。'
                }
            ]
        },
        BiIntro:{
            title:'BI介绍',
            desc:'商业智能分析（Business Intelligence，BI）支持自服务数据准备、探索式分析和企业级管控，是新一代的敏捷自助型 BI 服务平台。只需几分钟，您就可以在云端轻松自如地完成数据分析、业务数据探查、报表制作等一系列数据可视化操作',
            function_text: [
                {
                    img: require('@/assets/images/bigDataPlat/icon_BI_service_80.png'),
                    title: '机器学习',
                    desc: '从客户需求到销售、订单、计划、研发、工艺、制造、采购、供应、库存、物流、售后、运维、报废、回收等整个产品全生命周期所产生的各类数据，以及生产过程的人、机、料、法、环、测的各种生产制造数据进行智能化分析建模。'
                },
                {
                    img: require('@/assets/images/bigDataPlat/icon_basic_data_80.png'),
                    title: '数学建模',
                    desc: '使用数学方法，将数据抽象到纯数学层面以寻求普适的解决方法与结论，是一个利用数据推导结论的过程。'
                },
                {
                    img: require('@/assets/images/bigDataPlat/icon_property_recommendation_80.png'),
                    title: '大数据分析',
                    desc: '为用户提供海量数据可视化、数据挖掘、自然语言处理等分析与应用。'
                },
                {
                    img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
                    title: '算法库',
                    desc: '针对特定行业的数据，利用数学建模方法，提供行业机器学习算法库。'
                }
            ]
        },
        previewUrl:'../../../static/word/ceshi.docx'
      }
    },
    components: {
        vFnpointPlat
    },
    mounted(){
      var objListNav = this.$refs.listNav;
      var objProList = this.$refs.bigDataIntro.$el;
      var objAppScen = this.$refs.AlgorithmIntro.$el;
      var objFeaturesAdvan = this.$refs.BiIntro.$el;
      console.log(objProList,objAppScen,objFeaturesAdvan)
      this.ceiling(objListNav,objProList,objAppScen,objFeaturesAdvan);
    },
    methods:{
      ceiling(objListNav,objProList,objAppScen,objFeaturesAdvan) {
        var listNavH = objListNav.offsetTop;
        var ProListH = objProList.offsetTop;
        var AppScenH = objAppScen.offsetTop;
        var FeaturesAdvanH = objFeaturesAdvan.offsetTop;
        var that = this;
        document.onscroll = function () {
          var st = (document.body.scrollTop || document.documentElement.scrollTop) + 70;
          if(st > listNavH || st==listNavH){
            that.$refs.listNav.style='position: fixed;top: 0;left: 0;margin: 0;';
          }else{
            that.$refs.listNav.style='position:relative;';
          }
          if(that.$refs.navListText.childNodes){
            var arrnavList = that.$refs.navListText.childNodes;
            if(st<AppScenH || st == AppScenH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 0){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }else if(st>AppScenH && st < FeaturesAdvanH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 1){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }else if(st>FeaturesAdvanH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 2){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }
            else{
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 3){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }
          }
        }
      },
    }
  }
</script>
<style lang="less" scoped>
.banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
    background-color: #242321;
    background-size: 100% 100%;
    background-position: bottom right;
    background-repeat: no-repeat;
    .banner_contant {
      width: 1200px;
      height: 100%;
      .yuqingsousuo{
        background: #FFFFFF;
        border: 1px solid #B8BECC;
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        width: 371px;
        input{
          width: 331px;
          height: 100%;
          padding-left: 20px;
          ::placeholder{
            font-size: 14px;
            color: #B8BECC;
            letter-spacing: 0;
            line-height: 20px;
          }
          :-moz-placeholder{
            font-size: 14px;
            color: #B8BECC;
            letter-spacing: 0;
            line-height: 20px;
          }
          ::-webkit-input-placeholder{
            font-size: 14px;
            color: #B8BECC;
            letter-spacing: 0;
            line-height: 20px;
          }
        }
        .searchIcon{
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 50%;
            height: 50%;
          }
        }
      }
      .desc1 {
        margin-top: 120px;
        padding-bottom: 20px;
        font-size: 36px;
        color: #FFFFFF;
      }
      .desc2 {
        padding-bottom: 60px;
        width: 496px;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 32px;
      }
      .btn {
        span {
          display: inline-block;
          padding: 8px 32px;
          margin-right: 40px;
          box-sizing: border-box;
          border-radius: 3px;
          font-size: 14px;
          color: #FFFFFF;
          text-align: center;
        }
        span:nth-child(1) {
          background: #03A971;
        }
        span:nth-child(2) {
          border: 1px solid #FFFFFF;
          border-radius: 3px;
          border-radius: 3px;
        }
      }
      .btn:hover{
        cursor: pointer;
      }
    }
}

.list_nav_container {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F2F4F7;
    .list_nav {
      width: 1200px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        font-size: 18px;
        color: #3D4966;
        text-align: center;
      }
    }
}

.get_audio_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    .get_audio {
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 80px 0;
        box-sizing: border-box;
        .title {
        font-size: 36px;
        color: #121C33;
        text-align: center;
        margin-bottom: 20px;
        }
        .btn {
        background: #03A971;
        border-radius: 3px;
        border-radius: 3px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        padding: 10px 38px;
        box-sizing: border-box;
        }
        .btn:hover{
        cursor: pointer;
        }
    }
}
</style>
