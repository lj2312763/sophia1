<template>
  <div class="fuwu_container">
    <div class="banner_container">
      <div class="desc_btn_container">
        <div class="title">Big data leads to infinite future</div>
        <div class="desc">海量数据 无限未来</div>
        <div class="btn_container">
          <div class="down_load" @click="downLoad">立即下载</div>
          <div class="tech_file" @click="techFile">技术文档</div>
        </div>
      </div>
    </div>
    <div class="fn_intro_container">
      <div class="fn_intro">
        <div class="title">功能介绍</div>
        <div class="desc">致力于帮助企业级用户快速在业务场景中应用大数据，助力业务发展和产业升级</div>
        <div class="content">
          <div v-for="(item,index) in imgList" :key="index" class="img_container">
            <img :src="item.src">
          </div>
        </div>
      </div>
    </div>
    <div class="data_computed_container">
      <div class="data_computed">
        <div class="title">数据计算</div>
        <div class="desc">让大数据分析更高效、更专业</div>
        <div class="content">
          <img :src="computedImg" alt="" srcset="">
        </div>
      </div>
    </div>
    <div class="app_scene_container">
      <div class="app_scene">
        <div class="title">应用场景</div>
        <div class="desc">让大数据分析更高效、更专业</div>
        <div class="content">
          <div class="left" ref="sceneLeft">
            <div class="one" @click="changeScene(1)">数据集成</div>
            <div class="two" @click="changeScene(2)">离线计算</div>
            <div class="three" @click="changeScene(3)">Ad Hoc数据分析</div>
            <div class="four" @click="changeScene(4)">流式计算</div>
          </div>
          <div class="right">
            <img :src="appSceneImg" alt="" srcset="">
          </div>
        </div>
      </div>
    </div>
    <div class="sophia_container">
      <div class="title">Sophia，更好的数据服务平台</div>
      <div class="desc">企业及个人的数据处理神器</div>
      <div class="down_load_btn" @click="downLoad">立即下载</div>
    </div>
    <vLogin v-show="ifShowLogin" @closeLoginWin="closeLoginWin"></vLogin>
  </div>
</template>

<script>
  import vLogin from "@/components/login/login";
  export default {
    data(){
      return {
        imgList:[
          {
            src:require('../../../assets/images/bigDataPlat/c1.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c2.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c3.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c4.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c5.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c6.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c7.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c8.png')
          },
          {
            src:require('../../../assets/images/bigDataPlat/c9.png')
          }
        ],
        computedImg:require('../../../assets/images/bigDataPlat/computedImg.png'),
        appSceneImg:require('../../../assets/images/bigDataPlat/dataJc.png'),
        appSceneImg1:require('../../../assets/images/bigDataPlat/dataJc.png'),
        appSceneImg2:require('../../../assets/images/bigDataPlat/lxjs.png'),
        appSceneImg3:require('../../../assets/images/bigDataPlat/adHoc.png'),
        appSceneImg4:require('../../../assets/images/bigDataPlat/lsjs.png'),
        ifShowLogin:false,
        downloadUrl:'',
      }
    },
    mounted(){
      this.initSceneStyle();
    },
    methods:{
      closeLoginWin(arg) {
        this.ifShowLogin = arg;
        if(localStorage.username){
          if(this.downloadUrl){
            location.href=this.downloadUrl;
          }
        }
        
      },
      changeScene(item){
        var sceneLeftDom = this.$refs.sceneLeft.children || [];
        for(var i = 0;i < sceneLeftDom.length;i++){
          if(item-1 == i){
            sceneLeftDom[i].style='background: #FFFFFF;box-shadow: 0 2px 13px 0 rgba(184,190,204,0.59);color: #03A971;';
          }
          else{
            sceneLeftDom[i].style='background: #F7F8FA;;box-shadow: 0 0px 0px 0;color: #121C33;';
          }
        }
        if(item == 1){
          this.appSceneImg = this.appSceneImg1;
        }
        else if(item == 2){
          this.appSceneImg = this.appSceneImg2;
        }
        else if(item == 3){
          this.appSceneImg = this.appSceneImg3;
        }
        else if(item == 4){
          this.appSceneImg = this.appSceneImg4;
        }
      },
      downLoad(){
        this.downloadUrl=window.config.url+'/ai/zip/open_source_services/'+"cm5.1.3_x86_64.tar.gz";
        if(!localStorage.username){
          this.ifShowLogin = true;
        }else{
          location.href=this.downloadUrl;
        }
      },
      techFile(){
        window.open(window.config.url+"/kyfysm/大数据平台.pdf",'_blank');
      },
      initSceneStyle(){
        var sceneLeftDom = this.$refs.sceneLeft.children || [];
        for(var i = 0;i < sceneLeftDom.length;i++){
          if(0 == i){
            sceneLeftDom[i].style='background: #FFFFFF;box-shadow: 0 2px 13px 0 rgba(184,190,204,0.59);color: #03A971;';
          }
          else{
            sceneLeftDom[i].style='background: #F7F8FA;;box-shadow: 0 0px 0px 0;color: #121C33;';
          }
        }
      }
    },
    components:{
      vLogin
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
    background-image: url(../../../assets/images/bigDataPlat/fuwubanner.png);
    background-size:cover;
    background-position: center;
    display: flex;
    justify-content: center;
    .desc_btn_container{
      width: 1200px;
      height: 100%;
      .title{
        font-size: 40px;
        color: #FFFFFF;
        letter-spacing: -0.24px;
        margin-top: 94px;
        margin-bottom: 10px;
      }
      .desc{
        font-size: 30px;
        color: #FFFFFF;
        margin-bottom: 25px;
      }
      .btn_container{
        display: flex;
        .down_load,.tech_file{
          border-radius: 3px;
          padding: 8px 32px;
          box-sizing: border-box;
          font-size: 14px;
          color: #FFFFFF;
        }
        .down_load{
          background: #03A971;
          margin-right: 40px;
        }
        .down_load:hover{
          cursor: pointer;
        }
        .tech_file{
          left: 197px;
          border: 1px solid #FFFFFF;
        }
        .tech_file:hover{
          cursor: pointer;
        }
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
      }
    }
  }
  .data_computed_container{
    width: 100%;
    height: 817px;
    display: flex;
    justify-content: center;
    .data_computed{
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
        height: 596px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .app_scene_container{
    width: 100%;
    height: 613px;
    background-color: #F7F8FA;
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
        height: 380px;
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
          img{
            width: 100%;
            height: 100%;
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
