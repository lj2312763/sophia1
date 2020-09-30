<template>
  <div class="hello">
    <div class="banner" :style="{backgroundImage:'url(' + objText.list_img + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">{{objText.title}}</div>
          <div class="desc2">{{objText.title_desc}}</div>
        </div>
        <div class="btn">
          <span @click="useNow">{{objText.use_btn}}</span>
          <span @click="techFile">{{objText.tech_file}}</span>
        </div>
      </div>
    </div>

    <div class="list_nav_container" ref="listNav">
      <div class='list_nav' ref="navListText">
        <div v-for='(item,index) in list_nav_text' :key="index">{{item}}</div>
      </div>
    </div>

    <div class='product_list_container'>
      <div class="product_list">
        <div class="title" ref="proList">
          产品列表
        </div>
        <div class="feature_container">
          <vProduct :productData='objText.product_list_data' :listType='objText.listType'></vProduct>
        </div>
      </div>
    </div>

    <div class='app_list_container'>
      <div class="app_list">
        <div class="title" ref="appScen">
          应用场景
        </div>
        <div class="app_feature_container">
          <div class="top">
            <div  v-for="(item,index) in objText.menu_text" :key="index" ref="yinyongchangjing">{{item}}</div>
          </div>
          <div class="bottom">
            <div class='left'>
              <img :src="objText.weitu" alt="">
            </div>
            <div class='right'>
              <div class="bottom_top">{{objText.app_title}}</div>
              <div class="bottom">{{objText.app_desc}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="featur_advantage_container">
      <div class="featur_advantage">
        <div class="title" ref="featuresAdvan">特色优势</div>
        <div class="component">
          <vAdvant :advantext='objText.advant_text' :type='1'></vAdvant>
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
        <div class="title">{{objText.funText}}</div> 
        <div class="btn">立即使用</div>
      </div>
    </div>
    <vLogin v-show="ifShowLogin" @closeLoginWin='closeLoginWin'></vLogin>
  </div>
</template>

<script>
import vProduct from '../product';
import vAdvant from '../../advantage/advant';
import vSupport from '../../support/supportPoint';
import vLogin from '@/components/login/login';
export default {
  name: 'cardTextRecList',
  data () {
    return {
      objText:{
        title:'卡证文字识别',
        title_desc:'基于业界领先的深度学习技术，提供对身份证、银行卡、营业执照等常用卡片及证照的文字内容进行结构化识别的服务',
        use_btn:'立即使用',
        tech_file:'技术文档',
        funText:'即可获得卡证文字识别能力',
        list_img:require('@/assets/images/aiSmartAppList/kazhengwenzi.png'),
        product_list_data:[
            {
              img:require('@/assets/images/aiSmartAppList/shengfenzhengshibie.png'),
              title:'身份证识别',
              desc:'对二代居民身份证正反面所有8个字段进行结构化识别',
              path:'/idCardRecDetail'
            },
            {
              img:require('@/assets/images/aiSmartAppList/huzhaoshibie.png'),
              title:'护照识别',
              desc:'对中国大陆护照个人资料页所有10个字段进行结构化识别',
              path:'/passportRecDetail'
            },
            {
              img:require('@/assets/images/aiSmartAppList/yingyezhizhaoshibie.png'),
              title:'营业执照识别',
              desc:'对营业执照的注册号、社会信用代码、单位名称、法人、地址、有效期进行结构化识别',
              path:'/businessLiceRecDetail'
            },
            {
              img:require('@/assets/images/aiSmartAppList/gangaotongxingzhengshibie.png'),
              title:'港澳通行证识别',
              desc:'支持识别证件的姓名，出生日期，有效日期，签发日期，性别，证件号码等结构化数据',
              path:'/returnPerRecDetail'
            }
        ],
        menu_text:['远程身份认证','金融服务','出境旅游、留学'],
        weitu:require('../../../assets/images/aiSmartAppList/yuancheng.png'),
        app_title:'远程身份认证',
        app_desc:'结合OCR和人脸识别技术，实现对用户身份证件信息的自动识别和录入，同时通过人脸核身解决方案进行人脸识别和活体检测，完成用户身份验证，应用于金融保险、社保、电商、O2O等行业，有效降低用户输入成本，控制业务风险',
        advant_text:[
            {
            img:require('../../../assets/images/aiSmartAppList/advant.png'),
            title:'种类齐全',
            desc:'覆盖所有常用卡片证照类型，能够满足身份认证、金融开户、征信评估、平台商户入驻等高频场景的使用需求'
            },
            {
            img:require('../../../assets/images/aiSmartAppList/advant.png'),
            title:'技术领先',
            desc:'依托优秀的深度学习算法和海量优质数据，识别准确率高达99%，并提供身份证风险检测、端上质量校验等特色功能，让业务更安全'
            },
            {
            img:require('../../../assets/images/aiSmartAppList/advant.png'),
            title:'服务稳定',
            desc:'依托元知人工智能技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
            }
        ],
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
        list_nav_text:['产品列表','应用场景','特色优势','支持交流'],
        ifShowLogin:false

    }
  },
  components:{
      vProduct,
      vAdvant,
      vSupport,
      vLogin
  },
  watch:{
    '$route' (to, from) {
        this.$router.go(0);
    }
  },
  mounted(){
    if(this.$refs.yinyongchangjing)
    {
      var appDomArr = this.$refs.yinyongchangjing;
      appDomArr[0].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
    }
    var objListNav = this.$refs.listNav;
    var objProList = this.$refs.proList;
    var objAppScen = this.$refs.appScen;
    var objFeaturesAdvan = this.$refs.featuresAdvan;
    var objSupportComm = this.$refs.supportComm;
    this.ceiling(objListNav,objProList,objAppScen,objFeaturesAdvan,objSupportComm);
  },
  methods:{
    ceiling(objListNav,objProList,objAppScen,objFeaturesAdvan,objSupportComm) {
        var listNavH = objListNav.offsetTop;
        var ProListH = objProList.offsetTop;
        var AppScenH = objAppScen.offsetTop;
        var FeaturesAdvanH = objFeaturesAdvan.offsetTop;
        var SupportCommH = objSupportComm.offsetTop;
        var that = this;
        document.onscroll = function () {
          var st = (document.body.scrollTop || document.documentElement.scrollTop)-200;
          if(st > listNavH || st==listNavH){
            if(that.$refs.listNav){
              that.$refs.listNav.style='position: fixed;top: 0;left: 0;margin: 0;z-index:999';
            }
          }else{
            if(that.$refs.listNav){
              that.$refs.listNav.style='position:relative;';
            }
          }
          if(that.$refs.navListText.childNodes){
            var arrnavList = that.$refs.navListText.childNodes;
            if(st<AppScenH || st == AppScenH){
              arrnavList[0].style = 'color: #03A971;';
              arrnavList[1].style = 'color:#3D4966;';
              arrnavList[2].style = 'color:#3D4966;';
              arrnavList[3].style = 'color:#3D4966;';
            }else if(st>AppScenH && st < FeaturesAdvanH){
              arrnavList[0].style = 'color:#3D4966;';
              arrnavList[1].style = 'color: #03A971;';
              arrnavList[2].style = 'color:#3D4966;';
              arrnavList[3].style = 'color:#3D4966;';
            }else if(st>FeaturesAdvanH && st < SupportCommH){
              arrnavList[0].style = 'color:#3D4966;';
              arrnavList[1].style = 'color: #3D4966;';
              arrnavList[2].style = 'color:#03A971;';
              arrnavList[3].style = 'color: #3D4966;';
            }
            else{
              arrnavList[0].style = 'color:#3D4966;';
              arrnavList[1].style = 'color: #3D4966;';
              arrnavList[2].style = 'color:#3D4966;';
              arrnavList[3].style = 'color: #03A971;';
            }
          }
        }
    },
    useNow(){
        this.ifShowLogin = true;
    },
    techFile(){
      this.$router.push({
        path:'/aiDocument',
        query:{
          type:1
        }
      });
    },
    closeLoginWin(arg){
      this.ifShowLogin = arg;
    },
    goProDetail(e){
      console.log(e)
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

.list_nav_container{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: #F2F4F7;
  height: 56px;
  .list_nav{
    width:1200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;
    color: #3D4966;
    text-align: center;
    :hover{
      cursor: pointer;
    }
  }
}

.product_list_container{
  width: 100%;
  background-color:#FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  .product_list{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title{
      margin-top: 80px;
      margin-bottom: 50px;
      font-size: 36px;
      color: #121C33;
    }
    .feature_container{
      width: 100%;
    }
  }
}

.app_list_container{
  width: 100%;
  background-color:rgba(184,190,204,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 80px;
  .app_list{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title{
      margin-top: 80px;
      margin-bottom: 50px;
      font-size: 36px;
      color: #121C33;
      text-align: center;
      z-index: 9999;
    }
    .app_feature_container{
      width: 100%;
      .top{
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid rgba(184,190,204,0.41);
        margin-bottom:41px;
        :hover{
          cursor: pointer;
        }
        div{
          padding: 13px 0;
          box-sizing: border-box;
          font-size: 18px;
        }
      }
      .bottom{
        display:flex;
        justify-content: space-between;
        width: 100%;
        .left{
          width: 65%;
          img{
            width: 100%;
          }
        }
        .right{
          width: 35%;
          padding-left: 30px;
          box-sizing: border-box;
          background-color: #FFFFFF;
          .bottom_top{
            padding-top: 50px;
            box-sizing: border-box;
            font-size: 22px;
            color: #121C33;
            margin-bottom: 10px;
            border: none;
          }
          .bottom{
            font-size: 14px;
            color: #7A8499;
            line-height: 26px;
          }
        }
      }
    }
  }
}

.featur_advantage_container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  .featur_advantage{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding:80px 0;
    box-sizing: border-box;
    .title{
      font-size: 36px;
      color: #121C33;
      text-align: center;
      margin-bottom: 50px;
    }
    .component{
      width: 100%;
    }
  }
}

.support_commit_container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  .support_commit{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding:40px 0 82px 0;
    box-sizing: border-box;
    .title{
      font-size: 36px;
      color: #121C33;
      text-align: center;
      margin-bottom: 52px;
    }
    .component{
      width: 100%;
    }
  }
}

.get_audio_container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  .get_audio{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 80px;
    box-sizing: border-box;
    .title{
      font-size: 36px;
      color: #121C33;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn{
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
