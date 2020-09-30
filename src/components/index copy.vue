<template>
  <div>
    <div class="banner">
      <Carousel autoplay loop>
            <Carousel-item>
                <div class="demo-carousel">
                  <img :src="banner1" alt="" srcset="">
                </div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">
                  <img :src="banner2" alt="" srcset="">
                </div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">
                  <img :src="banner3" alt="" srcset="">
                </div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">
                  <img :src="banner4" alt="" srcset="">
                </div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">
                  <img :src="banner5" alt="" srcset="">
                </div>
            </Carousel-item>
        </Carousel>
    </div>
    <!-- <div class="subBanner">
      <div class="picImg" style="width:1200px;margin:auto;">
        <img :src="subBanner" alt="" srcset="">
      </div>
    </div> -->
     <!--AI助力产品加速测试-->
    <!-- <Vfeatur></Vfeatur> -->
    <!--AI助力产品加速-->
    <Vnofeatur :featurData='aitext' :type='0'></Vnofeatur>
    <!--数据智能应用-->
    <Vhasfeatur :hasbgdata='data_intell_app'></Vhasfeatur>
    <!--观星台-->
    <Vnofeatur :featurData='watch_star_data' :type='1'></Vnofeatur>
    <!--智能大数据-->
    <Vhasfeatur :hasbgdata='intell_big_data'></Vhasfeatur>
    <!--行为图谱-->
    <Vnofeatur :featurData='behaviormaptext' :type='2'></Vnofeatur>
  </div>
</template>

<script>
import Vnofeatur from './home/nobgcFeatures';
import Vfeatur from './home/vFeatures';
import Vhasfeatur from './home/hasbgFeatures';
import vMenu from './menu/menu';
export default {
  name: 'home',
  data () {
    return {
      subBanner:require('../assets/images/search/group.png'),
      banner1:require('../assets/images/home/banner1.png'),
      banner2:require('../assets/images/home/banner2.png'),
      banner3:require('../assets/images/home/banner3.png'),
      banner4:require('../assets/images/home/banner4.png'),
      banner5:require('../assets/images/home/banner5.png'),
      aitext:{
        cntitle:'AI助力产品加速',
        entitle:'Artificial Intelligence',
        featur:[
          {
            Text:'自然语言处理',
            img:require('../assets/images/home/ai1.png')
          },
          {
            Text:'语音技术',
            img:require('../assets/images/home/ai2.png')
          },
          {
            Text:'图像文字识别',
            img:require('../assets/images/home/ai3.png')
          },
          {
            Text:'视频识别',
            img:require('../assets/images/home/ai4.png')
          },
          {
            Text:'人脸检测',
            img:require('../assets/images/home/ai7.png')
          },
          {
            Text:'推荐',
            img:require('../assets/images/home/watch2.png')
          },
          {
            Text:'搜索',
            img:require('../assets/images/home/watch3.png')
          },
          {
            Text:'舆情分析',
            img:require('../assets/images/home/watch4.png')
          }
          ],
      },
      behaviormaptext:{
        cntitle:'行为图谱',
        entitle:'Behavior Map',
        featur:[
          {
            Text:'基础数据',
            img:require('../assets/images/home/behavior1.png')
          },
          {
            Text:'行为数据',
            img:require('../assets/images/home/behavior2.png')
          },
          {
            Text:'服务数据',
            img:require('../assets/images/home/behavior3.png')
          },
          {
            Text:'行为图谱',
            img:require('../assets/images/home/behavior4.png')
          }],
      },
      data_intell_app:{
        cn_title:'数据洞察',
        en_title:'Data Insight',
        contant_text:[
          {
            img:require('../assets/images/home/data1.png'),
            title:'法律综合分析',
            desc:'',
            path:'/insightData',
          },
          {
            img:require('../assets/images/home/data5.png'),
            title:'房产综合分析',
            desc:'',
            path:'/houseData',
          },
          {
            img:require('../assets/images/home/data2.png'),
            title:'品牌舆情洞察',
            desc:'',
            path:'/brandSentiment',
          },
          {
            img:require('../assets/images/home/data3.png'),
            title:'地理综合查询',
            desc:'',
            path:'/geographySearch',
          },
          {
            img:require('../assets/images/home/intell3.png'),
            title:'旅游数据洞察',
            desc:'',
            path:'/travelInsights',
          },
          {
            img:require('../assets/images/home/intell4.png'),
            title:'餐饮数据洞察',
            desc:'',
            path:'/foodInsights',
          },
        ]
      },
      intell_big_data:{
        cn_title:'大数据平台',
        en_title:'Big Data',
        contant_text:[
          {
            img:require('../assets/images/home/intell1.png'),
            title:'BI服务',
            desc:'支持离线在线流式等多种类型的数据源，集成sql和拖拽数据表建模'
          },
          {
            img:require('../assets/images/home/intell2.png'),
            title:'数据服务',
            desc:'数据服务指提供数据采集、数据传输、数据存储、数据处理（包括计算、分析、可视化等）'
          },
          {
            img:require('../assets/images/home/intell3.png'),
            title:'算法服务',
            desc:'为您提供算法服务相关的内容、还有VM虚拟机之间通信网站管理、官网。'
          },
          {
            img:require('../assets/images/home/intell4.png'),
            title:'数仓服务',
            desc:'为您提供智能数仓相关的内容，还有数据库类型、INT类型、虚拟主机的形式。'
          }
        ]
      },
      watch_star_data:{
        cntitle:'观星台',
        entitle:'Observatory',
        featur:[
          {
            Text:'政治数据',
            img:require('../assets/images/home/watch1.png'),
            desc:'提供政府机构与社会团体、环境与资源等政治类数据搜索以及数据可视化服务',
            featurType:0
          },
          {
            Text:'民生数据',
            img:require('../assets/images/home/watch2.png'),
            desc:'提供医疗、社保、就业、安全、交通等民生类数据搜索以及数据可视化服务',
            featurType:1
          },
          {
            Text:'经济数据',
            img:require('../assets/images/home/watch3.png'),
            desc:'提供信用、财税、消费房屋等经济类数据搜索以及数据可视化服务',
            featurType:2
          },
          {
            Text:'文化数据',
            img:require('../assets/images/home/watch4.png'),
            desc:'提供旅游、文体、教育、宗教、饮食等文化类数据搜索以及数据可视化服务',
            featurType:3
          },
          {
            Text:'样本数据',
            img:require('../assets/images/home/intell3.png'),
            desc:'为您的模型训练提供丰富的语音、文本、图像、视频等开源数据集',
            featurType:3
          }
        ],
      },
    }
  },
  components:{
    Vnofeatur,
    Vhasfeatur,
    Vfeatur
  },
}
</script>

<style scoped lang='less'>
.banner{
  width: 100%;
  height: 500px;
  .ivu-carousel{
    width: 100%;
    height: 500px;
    .demo-carousel{
      width: 100%;
      height: 500px;
      img{
        height: 100%;
        width: 100%;
        display: block;
        object-fit: cover;
        object-position: center center;
      }
    }
  }
}
.subBanner{
  width: 100%;
  background: #1F2D3D;
  img{
    width:100%;
    display: block;
  }
}
</style>
