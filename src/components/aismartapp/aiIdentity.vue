<template>
   <div class="aiIdentity_container">
      <div class="banner" :style="{backgroundImage:'url(' + objText.list_img + ')'}">
        <div class="banner_contant">
          <div class="desc">
            <div class="desc1">{{objText.title}}</div>
            <div class="desc2">{{objText.title_desc}}</div>
          </div>
          <div class="btn">
            <span @click="go">{{objText.fn_exper}}</span>
            <span @click="goLogin">{{objText.use_btn}}</span>
            <span @click="goViewTecFile">{{objText.tech_file}}</span>
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
        <div class="subtitle">
          <span>{{objText.funExperiText}}</span>
        </div>
        <div class="component">
          <textarea v-model="anayText" maxlength="300"></textarea>
        </div>
        <div class="startAnal" @click="toAnaly">开始分析</div>
        <div class="analResult_container">
          <div class="analResult_title">分析结果：</div>
          <div class="analResult_result" v-for="(item,index) in typeArr" :key="index" ref="analResult" @click="changeKeywordStyle(item)">
            {{item.name}}-{{item.value}}
          </div>
        </div>
        <div class="result_content" v-html="resultContent"></div>
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
        <div class="title">即刻获得命名实体识别能力</div>
        <div class="btn" @click="goLogin">立即使用</div>
      </div>
    </div>
    <vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin> 
    </div>
</template>
<script>
import vLogin from "@/components/login/login";
import vFunIn from '../function/introduce';
import vAdvantDetail from '../advantage/advantDetail';
import vSupport from '../support/supportPoint';
export default {
  data () {
    return {
        isShow:false,
        objText: {
          title: '命名实体识别',
          title_desc: '命名实体识别，又称作“专名识别”（NER），指对特定意义实体进行自动识别的技术，是信息提取、知识图谱、问答系统、句法分析、搜索引擎、机器翻译等应用的重要基础。',
          fn_exper:'功能体验',
          use_btn: '立即使用',
          tech_file: '技术文档',
          list_img: require('@/assets/images/aiSmartAppDetail/minmingshiti_shibie_banner.png'),
          weitu: require('@/assets/images/aiSmartAppDetail/yingyong2.png'),
          app_title: '内容审核',
          app_desc: '使用通用文字识别技术，实现对图像中文字内容的提取，结合文本审核技术识别违规内容，提示相应风险，协助进行违规处理，可应用于电商广告审核、舆情监管等场景，帮助用户有效规避业务风险',
          detailType:'aiIdentity',
          list_nav_text:['功能介绍', '功能体验', '应用场景','特色优势','支持交流'],
          menu_text:['内容审核', '文档电子化'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '智能识别',
              desc: '对特定意义实体进行自动识别的技术，是信息提取、知识图谱、问答系统、句法分析、搜索引擎、机器翻译等应用的重要基础'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '高度定制',
              desc: '支持对人名、地名、机构名、时间等 4 类常见实体的自动识别结果。可为客户定制开发特定类型的实体抽取系统'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '粒度更灵活',
              desc: '模型既保证了基本词汇的原子性，又保证了大粒度词汇，对领域新词、专有名词的识别尤其有效'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '海量数据建模',
              desc: '海量训练样本，百亿级的点击反馈，提高了算法在复杂多变的应用场景下的效果稳定性和适配性'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '自由定制',
              desc: '可根据需求自主干预和定制分词效果，自由定制专名实体类目，打造个性化的分词和专名识别系统'
            }
          ],
          funExperiText:'请输入一段想分析的文本：',
          randomE:'随机示例'
        },
        resultArr:['人名','地名','机构名','时间'],
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
        anayText:'收光头大阴线，前期跌幅较大的猪肉、养鸡板块逆势上涨，领涨两市，午后港口航运强势拉升，最终小幅上涨，连云港等三股涨停，白酒、家电等白马蓝筹表现较为坚挺，国防军工概念大幅回调，领跌两市，中船科技等5股跌停，科创板预期股一路走低，跌幅居前，华胜天成等6股跌停，盘中多股出现恐慌性砸盘。',
        typeArr:[],
        keyWord:[],
        resultContent:'',
        mingminShitiArr:[]
    }
  },
  components:{
    vFunIn,
    vAdvantDetail,
    vSupport,vLogin
  },
  watch:{
  },
  created(){
    this.toAnaly();
  },
  mounted(){
    this.changeAppMenuStyle();
    this.suspendNav();
  },
  updated(){
    this.changeResultStyle();
  },
  methods:{
    toAnaly(){
        var text = this.anayText;
        this.typeArr = [];
        this.$axios({
          method: "post",
          url: window.config.url+"/action/v1/api/zhujian/participle",
          data: {
            queries:[text+''],
            flags:'namedEntities'
          }
        }).then(res => {
          var mingmResultStr = res.data[0].namedEntities;
          var analyResult = mingmResultStr.replace(/<START:/g,'<span').replace(/<END>/g,'</span>').replace(/TIM/g,' class="TIM"').replace(/LOC/g,' class="LOC"').replace(/ORG/g,' class="ORG"').replace(/PER/g,' class="PER"').replace(/NUM/g,' class="NUM"');
          if(mingmResultStr.indexOf('PER') != -1){
            this.typeArr.push({
              name:'人名',
              value:'PER' 
            });
          }
          if(mingmResultStr.indexOf('LOC') != -1){
            this.typeArr.push({
              name:'地名',
              value:'LOC' 
            });
          }
          if(mingmResultStr.indexOf('TIM') != -1){
            this.typeArr.push({
              name:'时间点',
              value:'TIM' 
            });
          }
          if(mingmResultStr.indexOf('NUM') != -1){
            this.typeArr.push({
              name:'基数词',
              value:'NUM'
            });
          }
          if(mingmResultStr.indexOf('ORG') != -1){
            this.typeArr.push({
              name:'机构名',
              value:'ORG' 
            });
          }
          this.resultContent = analyResult;
        }).catch(err=>{
          console.log(err);
        });
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
    goViewTecFile(){
      this.$router.push({
        path:'/aiDocument',
        query:{
          type:1
        }
      });
    },
    changeResultStyle(){
      var colorArr = ['#D4B109','#0A6DD9','#389E0F','#C41E5D','#C41E5B','#C41E5C'];
      var typeArr = this.typeArr;
      var resultStyleContent = this.resultContent;
      for(var i = 0;i<typeArr.length;i++){
        var classDom = document.getElementsByClassName(typeArr[i].value);
        for(var j =0;j < classDom.length;j++){
          classDom[j].style  =`background-color:${colorArr[i]};`;
        }
      }
      if(this.$refs.analResult){
        var analyResultDom = this.$refs.analResult;
        for(var i = 0;i < analyResultDom.length;i++){
          analyResultDom[i].style=`background-color:${colorArr[i]};`;
        }
      }
    },
    changeKeywordStyle(keyWord){
      console.log(keyWord+'oooooooooooooo')
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
        margin-bottom: 20px;
        span:nth-child(1){
          font-size: 18px;
          color: #121C33;
          margin-right: 10px;
        }
        span:nth-child(2){
          font-size: 14px;
          color: #03A971;
          border-bottom: 1px #03A971 solid;
        }
      }
      .component {
        width: 100%;
        height: 200px;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        padding: 17px 22px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        textarea{
          width: 100%;
          height: 100%;
          border: none;
          background: rgba(192,204,218,0.10);
          ::placeholder,:-moz-placeholder,:-ms-input-placeholder,::-moz-placeholder,::-webkit-input-placeholder{
            font-size: 14px;
            color: #7A8499;
            text-align: justify;
            line-height: 28px;
          }
        }
      }
      .startAnal{
        background: #03A971;
        border-radius: 3px;
        padding: 10px 38px;
        box-sizing: border-box;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 50px;
      }
      .startAnal:hover{
        cursor: pointer;
      }
      .analResult_container{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 20px;
        .analResult_title{
          font-size: 18px;
          color: #121C33;
          margin-right: 20px;
        }
        .analResult_result{
          padding: 2px 12px;
          box-sizing: border-box;
          margin-right: 15px;
          font-size: 14px;
          color:#FFF;
        }
      }
      .result_content{
        width: 100%;
        height: 200px;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        padding: 17px 22px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
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
