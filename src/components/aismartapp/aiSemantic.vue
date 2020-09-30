<template>
   <div class="aiIdentity_container">
      <div class="banner" :style="{backgroundImage:'url(' + objText.list_img + ')'}">
        <div class="banner_contant">
          <div class="desc">
            <div class="desc1">{{objText.title}}</div>
            <div class="desc2">{{objText.title_desc}}</div>
          </div>
          <div class="btn">
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

    <div class="featur_function_container" ref="proList">
      <div class="featur_function">
        <div class="title">功能介绍</div>
        <div class="component">
          <vFunIn :funtext='objText.function_text' :detailType='objText.detailType'></vFunIn>
        </div>
      </div>
    </div>

    <div class="function_experice_container" ref="appExperice">
      <div class="function_experice">
        <div class="experice_title">功能体验</div>
        <div class="shuru_title">请输入第一段文本：</div>
        <div class="text_container">
          <textarea maxlength="150" v-model="textAreaText1"></textarea>
          <div class="tishiInfo">体验版本最多输入150个字</div>
        </div>
        <div class="shuru_title">请输入第二段文本：</div>
        <div class="text_container">
          <textarea maxlength="150" v-model="textAreaText2"></textarea>
          <div class="tishiInfo">体验版本最多输入150个字</div>
        </div>
        <div class="fenxi_btn" @click="startAnaly">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="result_container">相似度：{{similarity}}</div>
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
              <div class="info_container">
                <p v-for="(item,index) in objText.infoArr1" :key="index">{{item}}</p>
              </div>
              <div class="info_container">
                <p v-for="(item,index) in objText.infoArr2" :key="index">{{item}}</p>
              </div>
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

    <div class="support_commit_container" ref="supportComm">
      <div class="support_commit">
        <div class="title">支持交流</div>
        <div class="component">
          <vSupport :supportext='support_text'></vSupport>
        </div>
      </div>
    </div>

    <div class="get_audio_container">
      <div class="get_audio">
        <div class="title">即刻获得语义相似度分析能力</div>
        <div class="btn" @click="goLogin">立即使用</div>
      </div>
    </div>
<vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin> 
    </div>
</template>
<script>
import vFunIn from '../function/introduce';
import vLogin from "@/components/login/login";
import vAdvantDetail from '../advantage/advantDetail';
import vSupport from '../support/supportPoint';
export default {
  data () {
    return {
      isShow:false,
      objText: {
        title: '语义相似度',
        title_desc: '基于大数据对中文句子进行语义相似度判定',
        use_btn: '立即使用',
        tech_file: '技术文档',
        list_img: require('@/assets/images/aiSmartAppDetail/yuyibanner.png'),
        weitu: require('@/assets/images/aiSmartAppDetail/yingyong2.png'),
        app_title: '资讯热点挖掘',
        infoArr1:['行业资讯热点实时挖掘','新闻资讯信息/金融咨询报告','NLP文本分类/自动摘要接口','NLP智能分词/关键词提取接口','文章实时热点分析','文章热词标签'],
        infoArr2:['用户留言评论热点分析','QQ说说/游戏社区留言','NLP智能分词/关键词提取接口','用户关注度热点分布词频统计'],
        detailType:'aiSemantic',
        list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
        menu_text:['用户评论分析', '资讯热点挖掘','电话投诉分析'],
        function_text: [
          {
            img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
            title: '智能识别',
            desc: '基于大数据的分析可以从不同的层次度量,从词、短语到段落、文档'
          },
          {
            img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
            title: '数学建模',
            desc: '使用数学方法，将数据抽象到纯数学层面以寻求普适的解决方法与结论，是一个利用数据推导结论的过程'
          }
        ],
        advant_text: [
          {
            img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
            title: '算法通用性强',
            desc: '句法结构的描述体系简洁通用，适用于分析搜索Query、口语Query、网页Title 网页正文等各种类型的语言形式'
          },
          {
            img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
            title: '基于语义的结构消歧',
            desc: '在大规模人工标注的树库的基础上，借助海量知识与弱标记数据等语义信息训练，有效缓解语言分析中的结构歧义问题'
          },
          {
            img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
            title: '基于Attention机制解码框架',
            desc: '利用待分析词与其他所有词之间的依存强度，选择与其最相关的上下文信息，解决了分析算法局部最优的问题'
          }
        ]
      },
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
      textAreaText1:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进行保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
      textAreaText2:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进行保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
      similarity:1
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
        appDomArr[1].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
      }
    },
    suspendNav(){
      var objListNav = this.$refs.listNav;
      var objProList = this.$refs.proList;
      var objAppExperice = this.$refs.appExperice;
      var objAppScen = this.$refs.appScen;
      var objFeaturesAdvan = this.$refs.featuresAdvan;
      var objSupportComm = this.$refs.supportComm;
      this.ceiling(objListNav,objProList,objAppExperice,objAppScen,objFeaturesAdvan,objSupportComm);
    },
    ceiling(objListNav,objProList,objAppExperice,objAppScen,objFeaturesAdvan,objSupportComm) {
        var listNavH = objListNav.offsetTop;
        var ProListH = objProList.offsetTop;
        var AppExpericeH = objAppExperice.offsetTop;
        var AppScenH = objAppScen.offsetTop;
        var FeaturesAdvanH = objFeaturesAdvan.offsetTop;
        var SupportCommH = objSupportComm.offsetTop;
        var that = this;
        document.onscroll = function () {
          var st = (document.body.scrollTop || document.documentElement.scrollTop) + 80;
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
            }
            else if(st>AppExpericeH && st<AppScenH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 1){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }
            else if(st>AppScenH && st < FeaturesAdvanH){
              for(var i = 0; i<arrnavList.length;i++){
                if(i == 2){
                  arrnavList[i].style = 'color: #03A971;';
                }
                else{
                  arrnavList[i].style = 'color:#3D4966;';
                }
              }
            }
            else if(st>FeaturesAdvanH && st < SupportCommH){
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
      },
      startAnaly(){
        var text1 = this.textAreaText1;
        var text2 = this.textAreaText2;
        this.$axios({
          method:'post',
          url:window.config.url+'/action/v1/api/zhujian/similarity',
          data:{
            text1:text1,
            text2:text2,
            flags:'sentence'
          }
        }).then(res=>{
          if(res.status == 200){
            var resultData = res.data;
            this.similarity = resultData.body.output.similarity;
          }
        }).catch(err=>{
          console.log(err)
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

  .function_experice_container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    .function_experice{
      width: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .experice_title{
        font-size: 36px;
        color: #121C33;
        text-align: center;
        margin-bottom: 50px;
      }
      .shuru_title{
        width: 100%;
        font-size: 18px;
        color: #121C33;
        margin-bottom: 20px;
      }
      .text_container{
        width: 100%;
        height: 200px;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        padding: 22px;
        box-sizing: border-box;
        textarea{
          width: 100%;
          height: 90%;
          border: none;
          background: rgba(192,204,218,0.01);
        }
        .tishiInfo{
          width: 100%;
          height: 10%;
          font-size: 12px;
          color: #B8BECC;
          text-align: justify;
          line-height: 16px;
        }
      }
      .fenxi_btn{
        background: #03A971;
        border-radius: 3px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        padding: 10px 38px;
        box-sizing: border-box;
      }
      .fenxi_btn:hover{
        cursor: pointer;
      }
      .result_container{
        width: 100%;
        height: 93px;
        background: #F9FAFC;
        border: 1px solid #EBECF0;
        padding: 30px 40px;
        box-sizing: border-box;
        font-size: 18px;
        color: #121C33;
        margin-bottom: 80px;
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
              margin-bottom: 15px;
            }
            .info_container{
              margin-bottom: 30px;
              p{
                font-size: 14px;
                color: #7A8499;
                text-align: justify;
                line-height: 26px;
              }
              p:nth-child(1){
                font-size: 16px;
                color: #121C33;
                text-align: justify;
                margin-bottom: 10px;
              }
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
