<template>
   <div class="aiIdentity_container">
      <div class="banner">
        <div class="box" ><img :src="bannerImg" alt=""></div>
        <div class="banner_contant">
          <div class="desc">
            <div class="desc1">{{objText.title}}</div>
            <div class="desc2">{{objText.title_desc}}</div>
          </div>
          <div class="btn">
            <span @click="go">{{objText.fn_exper}}</span>
            <span @click="goLogin">{{objText.use_btn}}</span>
            <span @click="goViewTec">{{objText.tech_file}}</span>
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

    <div class="featur_function_exper_container" ref="fnExper">
      <div class="featur_function_exper">
        <div class="title" id="tiyan">功能体验</div>
        <div class="subtitle">请输入一段文字：</div>
        <div class="operat_container">
            <div class="operat_left">
                <textarea v-model="inputText" maxlength="50"></textarea>
                <div class="inputInfo">体验版本最多输入50个字</div>
            </div>
            <div class="operat_right">
                <div class="sex_container" ref="sexDom">
                    <div class="women_container" @click="checkSex(0)">
                        <div class="headImg">
                            <img :src="womenHeadImg">
                        </div>
                        <div class="intro">元元，温柔女生</div>
                    </div>
                    <div class="men_container" @click="checkSex(1)">
                        <div class="headImg">
                            <img :src="menHeadImg">
                        </div>
                        <div class="intro">小知，磁性男生</div>
                    </div>
                </div>
                <div class="speed_speech">
                    <div>语速</div><Slider v-model="speed" :min='0' :max='10' :step='1'></Slider><div>10</div>
                </div>
                <div class="volume">
                    <div>音量</div><Slider v-model="volume" :min='0' :max='10' :step='1'></Slider><div>10</div>
                </div>
                <div class="readStyle">
                    <div>朗读风格</div>
                    <RadioGroup v-model="voiceStyle">
                        <Radio label="生动"></Radio>
                        <Radio label="清晰"></Radio>
                        <Radio label="抑扬顿挫"></Radio>
                    </RadioGroup>
                </div>
            </div>
        </div>
        <!-- <div class="hecheng_btn" @click="startSyn" v-if="ifShowSynBtn">开始合成</div> -->
        <div class="bofang_btn" @click="startBofang">
          <img :src="bofangImg">
          <span>播放</span>
          <audio controls="controls" hidden id="audio"></audio>
        </div>
      </div>
    </div>

    <div class='app_list_container'>
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

    <div class="featur_advantage_container">
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
        <div class="title">即刻获得语音合成能力</div>
        <div class="btn" @click="goLogin">立即使用</div>
      </div>
    </div>
<vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin> 
    </div>
</template>
<script>
import vFunIn from '../../function/introduce';
import vLogin from "@/components/login/login";
import vAdvantDetail from '../../advantage/advantDetail';
import vSupport from '../../support/supportPoint';
export default {
  data () {
    return {
        isShow:false,
        bannerImg: require('@/assets/images/aiSmartAppDetail/yuyinhecheng_banner.png'),
        objText: {
          title: '语音合成',
          title_desc: '语音合成服务，通过先进的深度学习技术，将文本转换成自然流畅的语音。适用于智能客服、语音交互、文学有声阅读和无障碍播报等场景。',
          fn_exper:'功能体验',
          use_btn: '立即使用',
          tech_file: '技术文档',
          weitu: require('@/assets/images/aiSmartAppDetail/zhinengKefu.png'),
          app_title: '智能客服',
          app_desc: '提供多行业多场景的智能客服语音合成能力。提高解答效率，提升客户满意度，降低呼叫中心人工成本。',
          detailType:'aiIdentity',
          list_nav_text:['功能介绍', '功能体验', '应用场景','特色优势','支持交流'],
          menu_text:['智能客服', '智能语音交互','无障碍播报'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '提供多场景音库库',
              desc: '提供基础音库和精品音库共9种音库供您选择，适用于泛阅读、订单播报、智能硬件等应用场景，即将推出更多特色音库'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon_BI_service.png'),
              title: '语速、音调可调节',
              desc: '支持多种参数配置，可根据场景需求对音库的语速、音调、音量进行灵活设置，满足个性化需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '支持多音字标注',
              desc: '中文多音字可通过标注拼音、音调自行定义发音，例如“轻舟已过万重（chong2）山”、“脑筋急转（zhuan3）弯”'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '多语调用方式，满足多场景需求',
              desc: '提供REST API接口、在线离线融合SDK，满足不同网络环境下的语音合成需求，提供流畅自然的合成体验'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '支持多语言多音色',
              desc: '支持中文、英文、中英文混读合成，提供基础音库和精品音库共9种音库供您选择，让您的应用拥有个性化的声音'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '丰富的场景应用',
              desc: '支持纯在线、在线离线融合两种应用方式，支持在弱网环境下的合成播报，满足不同的场景需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '方便快捷的集成方式',
              desc: '提供REST API接口，方便可发起网络请求的设备进行合成；提供Android、iOS SDK，轻巧简便，便于手机、智能硬件快速集成'
            }
          ]
        },
        inputText:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进行保险产品中。',
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
      womenHeadImg:require('../../../assets/images/aiSmartAppDetail/women.png'),
      menHeadImg:require('../../../assets/images/aiSmartAppDetail/men.png'),
      bofangImg:require('../../../assets/images/aiSmartAppDetail/bofang.png'),
      capKey:'tts.cloud.wangjing',
      speed:5,
      volume:5,
      voiceStyle:'生动',
      audioSrc:'',
      //ceshiYuyin:'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'
      // ifShowSynBtn:true
    }
  },
  components:{
    vFunIn,
    vAdvantDetail,
    vSupport,vLogin
  },
  watch:{
  },
  mounted(){
    this.changeAppMenuStyle();
    this.suspendNav();
  },
  methods:{
    startBofang(){
      var inputText = this.inputText;
      var capKey = this.capKey;
      var speed = this.speed;
      var volume = this.volume;
      var voiceStyle = this.voiceStyle;
      var totalVoiceStyle;
      if(voiceStyle == '生动'){
        totalVoiceStyle = 'vivid';
      }
      else if(voiceStyle == '清晰'){
        totalVoiceStyle = 'clear';
      }
      else if(voiceStyle == '抑扬顿挫'){
        totalVoiceStyle = 'plain';
      }
      this.$axios({
        method:'get',
        url:window.config.url+'/ai/voice/tts',
        params:{
          text:inputText,
          capKey:capKey,
          speed:speed,
          volume:volume,
          voiceStyle:totalVoiceStyle
        }
      }).then(res=>{
        if(res.status == 200){
          var synResult = 'data:audio/mp3;base64,' + res.data.data;
          $('#audio').attr('src',synResult);
          $('#audio')[0].play();
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    checkSex(arg){
        var sexDom = this.$refs.sexDom.childNodes;
        if(arg == 0){
            sexDom[0].style = 'background:#03A971;';
            sexDom[0].childNodes[2].style = 'color: #FFFFFF';
            sexDom[2].style = 'opacity:0.6;background: #B8BECC;color:#3D4966;';
            sexDom[2].childNodes[2].style = 'color:#3D4966;';
            this.capKey='tts.cloud.wangjing';
        }
        else if(arg == 1){
            sexDom[0].style = 'opacity:0.6;background: #B8BECC;';
            sexDom[0].childNodes[2].style = 'color:#3D4966;';
            sexDom[2].style = 'background:#03A971;opacity:1;';
            sexDom[2].childNodes[2].style = 'color: #FFFFFF;';
            this.capKey='tts.cloud.haobo';
        }
    },
    closeDialog(){
      this.isShow=false;
    },
    go(){
      location.href="#tiyan";
    },
    goLogin(){
      this.isShow=true;
    },
    goViewTec(){
      this.$router.push({
        path:'/aiDocument',
        query:{
          type:1
        }
      });
    },
    changeAppMenuStyle(){
      if(this.$refs.yinyongchangjing){
        var appDomArr = this.$refs.yinyongchangjing;
        appDomArr[0].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
      }
    },
    suspendNav(){
      var objListNav = this.$refs.listNav;
      var objProList = this.$refs.proList;
      var fnExperList = this.$refs.fnExper;
      var objAppScen = this.$refs.appScen;
      var objFeaturesAdvan = this.$refs.featuresAdvan;
      var objSupportComm = this.$refs.supportComm;
      this.ceiling(objListNav,objProList,fnExperList,objAppScen,objFeaturesAdvan,objSupportComm);
    },
    ceiling(objListNav,objProList,fnExperList,objAppScen,objFeaturesAdvan,objSupportComm) {
        var listNavH = objListNav.offsetTop;
        var ProListH = objProList.offsetTop;
        var fnExperH = fnExperList.offsetTop;
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
            if(st<ProListH || st == ProListH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 0){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }else if(st>fnExperH && st < FeaturesAdvanH){
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
            else if(st>SupportCommH && st < SupportCommH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 3){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }
            else{
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 4){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }
          }
        }
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
    position:relative;
    // .blank_model{
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width:100%;
    //   height: 100%;
    //   background-color:rgba(36, 35, 33, 0.8);
    // }
    .box{
      width:100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      img{
        width: 100%;
        height:100%;
      }
    }
    .banner_contant {
      width: 1200px;
      height: 100%;
      z-index: 9;
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
          border: 1px solid #FFFFFF;
        }
        span:nth-child(1) {
          background: #03A971;
          border: none;
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

  .featur_function_exper_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    margin-bottom: 40px;
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
        width: 100%;
        font-size: 18px;
        color: #121C33;
        margin-bottom: 20px;
      }
      .operat_container{
          width: 100%;
          height: 290px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          .operat_left{
            width: 585px;
            height: 100%;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
            textarea{
                width: 100%;
                height: 90%;
                border: none;
                background: rgba(192,204,218,0.01);
            }
            .inputInfo{
                width: 100%;
                height: 10%;
                font-size: 12px;
                color: #B8BECC;
                text-align: justify;
                line-height: 16px;
            }
          }
          .operat_right{
            width: 585px;
            height: 100%;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            padding: 30px;
            box-sizing: border-box;
            .sex_container{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 35px;
                .women_container,.men_container{
                    width: 250px;
                    height: 58px;
                    background: #03A971;
                    padding: 8px 15px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    .headImg{
                        width: 42px;
                        height: 42px;
                        border-radius: 21px;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .intro{
                        font-size: 18px;
                        color: #3D4966;
                    }
                }
                .women_container{
                    .intro{
                        color: #FFF;
                    }     
                }
                .men_container{
                    opacity: 0.6;
                    background: #B8BECC;
                }
            }
            .speed_speech,.volume{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
                div:nth-child(1){
                    width: 10%;
                }
                .ivu-slider{
                    width: 75%;
                    margin-right: 10px;
                    /deep/.ivu-slider-bar{
                        background-color: #03A971;
                    }
                    /deep/.ivu-slider-button{
                        border: 2px solid #03A971;
                    }
                }
            }
            .readStyle{
                display: flex;
                align-items: center;
                justify-content:flex-start;
                margin-top: 5px;
                div:nth-child(1){
                    width: 14%;
                    margin-right: 28px;
                }
                /deep/.ivu-radio-default{
                    label{
                        margin-right: 20px;
                        .ivu-radio-inner::after{
                            border-color: #03A971;
                        }
                        .ivu-radio-checked .ivu-radio-inner{
                            border-color: #03A971;
                        }
                        .ivu-radio-inner::after{ 
                            background-color:#03A971;
                        }
                    }
                }
            }
          }
      }
      .hecheng_btn{
        background: #03A971;
        border-radius: 3px;
        padding: 10px 38px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
      }
      .bofang_btn{
        background: #03A971;
        border-radius: 3px;
        padding: 10px 43px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        align-items: center;
        margin-top: 10px;
        img{
          width: 18px;
          height: 19px;
          margin-right: 5px;
        }
      }
      .bofang_btn:hover{
        cursor: pointer;
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
