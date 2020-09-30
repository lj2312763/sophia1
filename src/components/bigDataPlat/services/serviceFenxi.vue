<template>
  <div class="fuwu_container">
    <div class="banner_container">
      <div class="banner">
        <div class="title1">零基础</div>
        <div class="title2">带你体验数据的魅力</div>
        <div class="down_load" @click="useNow">立即使用</div>
      </div>
    </div>
    <div class="fn_intro_container">
      <div class="fn_intro">
        <div class="title">产品功能</div>
        <div class="desc">以卓越的数据技术为客户创造价值</div>
        <div class="content">
          <div v-for="(item,index) in imgList" :key="index" class="img_container">
            <img :src="item.src">
          </div>
        </div>
      </div>
    </div>
    <div class="app_scene_container">
      <div class="app_scene">
        <div class="title">应用场景</div>
        <div class="desc">让大数据分析更高效、更专业</div>
        <div class="content">
          <div class="left" ref="sceneLeft">
            <div class="one" @click="changeScene(1)">场景一</div>
            <div class="two" @click="changeScene(2)">场景二</div>
            <div class="three" @click="changeScene(3)">场景三</div>
          </div>
          <div class="right">
            <div class="text">
              <div class="text_title">{{sceneTitle}}</div>
              <div class="text_desc">{{sceneDesc}}</div>
            </div>
            <div class="image">
              <img :src="sceneImg">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fn_intro_container product_container">
      <div class="fn_intro">
        <div class="title">产品优势</div>
        <div class="desc">用性能卓越的产品实现客户成功</div>
        <div class="content">
          <div v-for="(item,index) in productImgList" :key="index" class="img_container product_advan">
            <img :src="item.src">
          </div>
        </div>
      </div>
    </div>


    <div class="sophia_container">
      <div class="title">Sophia，更好的数据服务平台</div>
      <div class="desc">企业及个人的数据处理神器</div>
      <div class="down_load_btn" @click="useNow">立即使用</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        imgList:[
          {
            src:require('../../../assets/images/bigDataPlat/z1.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z2.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z3.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z4.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z5.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z6.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z7.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z8.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z9.png')
          }
        ],
        productImgList:[
          {
            src:require('../../../assets/images/bigDataPlat/z10.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z11.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/z12.png')
          }
        ],
        sceneImg:require('../../../assets/images/bigDataPlat/场景一.png'),
        sceneImg1:require('../../../assets/images/bigDataPlat/场景一.png'),
        sceneImg2:require('../../../assets/images/bigDataPlat/场景二.png'),
        sceneImg3:require('../../../assets/images/bigDataPlat/场景三.png'),
        sceneTitle:'大数据挖掘',
        sceneDesc:'提供分类分析，关联分析，回归分析，聚类分析，时间序列预测等多样的算法；全程可视化，不懂算法也不用担心，操作简单，轻松掌握数据挖掘；提供科学的模型评估分析，选择最佳模型。',
        sceneTitle1:'大数据挖掘',
        sceneDesc1:'提供分类分析，关联分析，回归分析，聚类分析，时间序列预测等多样的算法；全程可视化，不懂算法也不用担心，操作简单，轻松掌握数据挖掘；提供科学的模型评估分析，选择最佳模型。',
        sceneTitle2:'业务人员自助分析',
        sceneDesc2:'业务人员通过拖拽式的流程设计，实现了数据抽取、清洗、转换、装载及调度；无需多套工具，数据处理和分析完美衔接；快速制作图文并茂的数据分析报告并进行展示',
        sceneTitle3:'数据融合分析',
        sceneDesc3:'将日常excel格式业务数据与业务系统后台的库表进行数据合并，采用自助式数据探索、数据处理、统计分析及可视化展现形式，快速生成敏捷分析报告，满足不同用户个性化的业务分析服务'
      }
    },
    mounted(){
      this.initSceneStyle();
    },
    methods:{
      changeScene(item){
        var sceneLeftDom = this.$refs.sceneLeft.children || [];
        for(var i = 0;i < sceneLeftDom.length;i++){
          if(item-1 == i){
            sceneLeftDom[i].style='background: #FFFFFF;box-shadow: 0 2px 13px 0 rgba(184,190,204,0.59);color: #03A971;border:none;';
          }
          else{
            sceneLeftDom[i].style='background: #F7F8FA;;box-shadow: 0 0px 0px 0;color: #121C33;';
          }
        }
        if(item == 1){
          this.sceneImg = this.sceneImg1;
          this.sceneTitle = this.sceneTitle1;
          this.sceneDesc = this.sceneDesc1;
        }
        else if(item == 2){
          this.sceneImg = this.sceneImg2;
          this.sceneTitle = this.sceneTitle2;
          this.sceneDesc = this.sceneDesc2;
        }
        else if(item == 3){
          this.sceneImg = this.sceneImg3;
          this.sceneTitle = this.sceneTitle3;
          this.sceneDesc = this.sceneDesc3;
        }
      },
      useNow(){
        window.open('https://test.yzsmart.top/dataAnalysis/sysindex.html','_blank');
      },
      initSceneStyle(){
        var sceneLeftDom = this.$refs.sceneLeft.children || [];
        for(var i = 0;i < sceneLeftDom.length;i++){
          if(0 == i){
            sceneLeftDom[i].style='background: #FFFFFF;box-shadow: 0 2px 13px 0 rgba(184,190,204,0.59);color: #03A971;border:none;';
          }
          else{
            sceneLeftDom[i].style='background: #F7F8FA;;box-shadow: 0 0px 0px 0;color: #121C33;';
          }
        }
      }
    }
  }
</script>

<style scoped lang='less'>
.fuwu_container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .banner_container{
    width: 100%;
    height: 350px;
    background-image: url(../../../assets/images/bigDataPlat/dataFenxi.png);
    background-size:cover;
    background-position: center;
    display: flex;
    justify-content: center;
    .banner{
      width: 1200px;
      height: 100%;
      .title1,.title2{
        font-size: 30px;
        color: #FFFFFF;
      }
      .title1{
        margin-top: 81px;
        margin-bottom: 10px;
      }
      .title2{
        margin-bottom: 69px;
      }
      .down_load{
        width: 120px;
        background: #03A971;
        border-radius: 3px;
        padding: 8px 32px;
        box-sizing: border-box;
        font-size: 14px;
        color: #FFFFFF;
      }
      .down_load:hover{
        cursor: pointer;
      }
    }
  }
  .fn_intro_container{
    width: 100%;
    height: 964px;
    background-color:#F7F8FA;
    display: flex;
    justify-content: center;
    .fn_intro{
      width: 1200px;
      .title{
        margin-top: 60px;
        font-size: 30px;
        color: #121C33;
        margin-bottom: 15px;
        padding-left: 20px;
        border-left: 4px #03A971 solid;
      }
      .desc{
        padding-left: 20px;
        font-size: 18px;
        color: #7A8499;
        margin-bottom: 30px;
      }
      .content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .img_container{
          width: 380px;
          height: 227px;
          margin-bottom: 30px;
          img{
            width: 100%;
          }
        }
        .product_advan{
          height: 166px;
        }
      }
    }
  }
  .product_container{
    height: 389px;
  }
  .app_scene_container{
    width: 100%;
    height: 613px;
    display: flex;
    justify-content: center;
    .app_scene{
      width: 1200px;
      .title{
        margin-top: 60px;
        font-size: 30px;
        color: #121C33;
        margin-bottom: 15px;
        padding-left: 20px;
        border-left: 4px #03A971 solid;
      }
      .desc{
        padding-left: 20px;
        font-size: 18px;
        color: #7A8499;
        margin-bottom: 30px;
      }
      .content{
        width: 100%;
        height: 280px;
        display: flex;
        .left{
          width: 242px;
          margin-right: 35px;
          .one,.two,.three,.four{
            width: 242px;
            height: 80px;
            border: 1px solid rgba(184,190,204,0.40);
            font-size: 18px;
            color: #121C33;
            line-height: 80px;
            padding-left: 30px;
          }
          .one,.two,.three{
            margin-bottom: 20px;
          }
        }
        .right{
          width: 922px;
          height: 100%;
          display: flex;
          background: rgba(242,244,247,0.35);
          padding: 87px;
          position: relative;
          .text{
            width: 304px;
            margin-right: 32.4px;
            .text_title{
              font-size: 20px;
              color: #3D4966;
              line-height: 42px;
              margin-bottom: 7px;
            }
            .text_desc{
              font-size: 12px;
              color: #7A8499;
              text-align: justify;
              line-height: 24px;
            }
          }
          .image{
            position: absolute;
            left: 474px;
            top: -47px;
            width: 298px;
            height: 306px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .sophia_container{
    width: 100%;
    height: 257px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
      margin-top: 60px;
      font-size: 30px;
      color: #121C33;
      margin-bottom: 9px;
    }
    .desc{
      font-size: 16px;
      color: #7A8499;
      margin-bottom: 22px;
    }
    .down_load_btn{
      padding: 10px 38px;
      font-size: 16px;
      color: #FFFFFF;
      background: #03A971;
      border-radius: 3px;
    }
    .down_load_btn:hover{
      cursor: pointer;
    }
  }
}
</style>
