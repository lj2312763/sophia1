<template>
  <div class="hello">
    <div class="banner" :style="{backgroundImage:'url(' + objText.list_img + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="yuqingsousuo" v-show="false"> <!--v-show="objText.detailType == 'optionanaly'"在div加上这句话舆情分析会出现搜索框-->
            <input type="text" placeholder="请输入要搜索的品牌名称" style="border:none;">
            <div class="searchIcon">
              <img :src="objText.searchIcon" alt="" srcset="">
            </div>
          </div>
          <div class="desc1">{{objText.title}}</div>
          <div class="desc2">{{objText.title_desc}}</div>
        </div>
        <div class="btn">
          <span @click="useNow1" v-if="objText.tiyan">{{objText.tiyan}}</span>
          <span @click="useNow">{{objText.use_btn}}</span>
          <span v-show="objText.detailType != 'optionanaly'" @click="techFile">{{objText.tech_file}}</span>
        </div>
      </div>
    </div>
    <div class="list_nav_container" ref="listNav">
      <div class='list_nav' ref="navListText">
        <div v-for='(item,index) in objText.list_nav_text' :key="index">{{item}}</div>
      </div>
    </div>
    <div class="featur_function_container">
      <div class="featur_function" ref="proList">
        <div class="title">功能介绍</div>
        <div class="component">
          <vFunIn :funtext='objText.function_text' :detailType='objText.detailType'></vFunIn>
        </div>
      </div>
    </div>
    <div class="featur_function_exper_container" v-show="ifShowFnexpe">
      <div class="featur_function_exper" id="tiyan">
        <div class="title">功能体验</div>
        <div class="subtitle">{{objText.funExperiText}}</div>
        <div class="component">
          <vFunEx :detailType='objText.detailType'></vFunEx>
        </div>
      </div>
    </div>
    <div class='app_list_container' v-show="ifShowAppChang">
      <div class="app_list" ref="appScen">
        <div class="title">
          应用场景
        </div>
        <div class="app_feature_container">
          <div class="top">
            <div v-for="(item,index) in objText.menu_text" :key="index" ref="yinyongchangjing">{{item}}</div>
          </div>
          <div class="bottom">
            <div class='left'>
              <img :src="objText.weitu" alt="">
            </div>
            <div class='right'>
              <div class="right-top">{{objText.app_title}}</div>
              <div class="right-bottom">{{objText.app_desc}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="optionanaly_featur_advantage_container" v-if="objText.detailType == 'optionanaly'">
      <div class="optionanaly_featur_advantage">
        <div class="optionanaly_title" ref="featuresAdvan">特色优势</div>
        <div class="optioncontainer">
          <div class="oneOfOptionana" v-for="(item,index) in objText.advant_text" :key="index">
            <div>
              <img :src="item.img" alt="" srcset="">
            </div>
            <div>{{item.title}}</div>
            <div>{{item.desc}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="featur_advantage_container" v-else>
      <div class="featur_advantage">
        <div class="title" ref="featuresAdvan">特色优势</div>
        <div class="component">
          <vAdvantDetail :advantext='objText.advant_text'></vAdvantDetail>
        </div>
      </div>
    </div>
    <div class="support_commit_container">
      <div class="support_commit">
        <div class="title" ref="supportComm">支持交流</div>
        <div class="component">
          <vSupport :supportext='support_text'></vSupport>
        </div>
      </div>
    </div>
    <div class="get_audio_container">
      <div class="get_audio">
        <div class="title">即刻获得{{objText.title}}能力</div>
        <div class="btn" @click="useNow">立即使用</div>
      </div>
    </div>


    <vLogin v-show="ifShowLogin" @closeLoginWin='closeLoginWin'></vLogin>
  </div>
</template>

<script>
  import vFunIn from '../function/introduce';
  import vFunEx from '../function/experience';
  import vAdvant from '../advantage/advant';
  import vAdvantDetail from '../advantage/advantDetail';
  import vSupport from '../support/supportPoint';
  import vLogin from '@/components/login/login';
  export default {
    props: {
      objText: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
         support_text: [
          {
            title: "新手指南",
            id:"1",
            desc: "找到适合您业务的AI技术能力，快速创建应用，开始便捷的开发之旅",
            btnText: "查看更多"
          },
          {
            title: "技术文档",
            id:"2",
            desc: "针对使用API或SDK的开发者，提供Sophia AI技术开发文档",
            btnText: "查看更多"
          },
          {
            title: "意见反馈",
            id:"3",
            desc: "请留下您在使用过程中遇到的问题或提出宝贵建议",
            btnText: "联系我们"
          }
        ],
        ifShowFnexpe:true,
        ifShowAppChang:true,
        ifShowLogin:false
      }
    },
    components: {
      vFunIn,
      vFunEx,
      vAdvant,
      vAdvantDetail,
      vSupport,
      vLogin
    },
    mounted() {
      var detailType = this.objText.detailType;
      if(this.$refs.yinyongchangjing){
        var appDomArr = this.$refs.yinyongchangjing;
        if(detailType == 'searchdetail' || detailType =='duanyuyin'){
          appDomArr[1].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
        }
        else{
          appDomArr[0].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
        }
      }
      if(detailType == 'searchdetail1' ||detailType == 'searchdetail' || detailType == 'recommendetail' || detailType == 'optionanaly' || detailType == 'tableTextRecDetail'){
        this.ifShowFnexpe = false;
      }
      if(detailType == 'optionanaly'){
        this.ifShowAppChang = false;
      }

      var objListNav = this.$refs.listNav;
      var objProList = this.$refs.proList;
      var objAppScen = this.$refs.appScen;
      var objFeaturesAdvan = this.$refs.featuresAdvan;
      var objSupportComm = this.$refs.supportComm;
      this.ceiling(objListNav,objProList,objAppScen,objFeaturesAdvan,objSupportComm);
    },
    methods: {
      ceiling(objListNav,objProList,objAppScen,objFeaturesAdvan,objSupportComm) {
        var listNavH = objListNav.offsetTop;
        var ProListH = objProList.offsetTop;
        var AppScenH = objAppScen.offsetTop;
        var FeaturesAdvanH = objFeaturesAdvan.offsetTop;
        var SupportCommH = objSupportComm.offsetTop;
        var that = this;
        document.onscroll = function () {
          var st = (document.body.scrollTop || document.documentElement.scrollTop);
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
            }else if(st>FeaturesAdvanH && st < SupportCommH){
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
      closeLoginWin(arg){
        this.ifShowLogin = arg;
      },
      useNow(){
        this.ifShowLogin = true;
      },
      useNow1(){
        location.href="#tiyan";
      },
      techFile(){
        this.$router.push({
          path:'/aiDocument',
          query:{
            type:1
          }
        });
      }
    }
  }
</script>

<style scoped lang='less'>
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
        span:nth-child(3) {
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
    background-color: #F2F4F7;;
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

  .featur_function_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    .featur_function {
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
        margin-bottom: 50px;
      }
      .component {
        width: 100%;
      }
    }
  }

  .app_list_container {
    width: 100%;
    background-color: rgba(184, 190, 204, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-bottom: 80px;
    .app_list {
      width: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        margin-top: 80px;
        margin-bottom: 50px;
        font-size: 36px;
        color: #121C33;
        text-align: center;
        z-index: 9999;
      }
      .app_feature_container {
        width: 100%;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid rgba(184,190,204,0.41);
          margin-bottom: 41px;
          font-size: 18px;
          color: #7A8499;
          text-align: center;
          div {
            padding: 13px 0;
            box-sizing: border-box;
            font-size: 18px;
          }
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .left {
            width: 65%;
            img {
              width: 100%;
            }
          }
          .right {
            width: 35%;
            padding-left: 30px;
            box-sizing: border-box;
            background-color: #FFFFFF;
            .right-top {
              padding-top: 50px;
              box-sizing: border-box;
              font-size: 22px;
              color: #121C33;
              margin-bottom: 10px;
              border: none;
            }
            .right-bottom {
              font-size: 14px;
              color: #7A8499;
              line-height: 26px;
            }
          }
        }
      }
    }
  }

  .featur_function_exper_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    .featur_function_exper {
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
        margin-bottom: 10px;
      }
      .subtitle {
        font-size: 18px;
        color: #7A8499;
        text-align: center;
        margin-bottom: 50px;
      }
      .component {
        width: 100%;
      }
    }
  }

  .featur_advantage_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    .featur_advantage {
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
        margin-bottom: 50px;
      }
      .component {
        width: 100%;
      }
    }
  }

  .optionanaly_featur_advantage_container {
    width: 100%;
    height: 397px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#F5F6F8;
    .optionanaly_featur_advantage{
      width: 1200px;
      height: 100%;
      padding-top: 80px;
      box-sizing: border-box;
      .optionanaly_title{
        width: 100%;
        text-align: center;
        font-size: 36px;
        color: #121C33;
        margin-bottom: 20px;
      }
      .optioncontainer{
        width: 100%;
        display: flex;
        align-items: center;
        .oneOfOptionana{
          width: 240px;
          height: 187px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          div:nth-child(1){
            width: 80px;
            height: 80px;
            margin-bottom: 14px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          div:nth-child(2),div:nth-child(3){
            font-size: 18px;
            color: #121C33;
            text-align: center;
            line-height: 26px;
          }
        }
      }
    }
  }

  .support_commit_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    .support_commit {
      width: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 40px 0 82px 0;
      box-sizing: border-box;
      .title {
        font-size: 36px;
        color: #121C33;
        text-align: center;
        margin-bottom: 52px;
      }
      .component {
        width: 100%;
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
