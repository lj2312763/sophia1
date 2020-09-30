<template>
<div>
    <div class="aiSyntax" v-if="result">
        <div class="banner" :style="{backgroundImage:'url(' + imgUrl +result.pageBanner[0].fileUrl + ')'}">

          <div class="mask_container">
            <img :src="maskImg" alt="" srcset="">
          </div>

          <div class="banner_contant">
              <div class="desc">
              <div class="desc1">{{result.pageBanner[0].productTitle}}</div>
              <div class="desc2">{{result.pageBanner[0].productDesc}}</div>
              </div>
              <div class="btn">
              <span @click="useNow1()" v-if="result.pageBanner[0].showTrail==1">功能体验</span>
              <span @click="useNow()" v-show="ifShowUse">{{useNowText}}</span>
              <span @click="techFile(result.pageBanner[0])" v-show="routeId != '5.5.1'&& result.pageBanner[0].documentAddress " >技术文档</span>
              </div>
          </div>
        </div>

        <div class="list_nav_container" :class="{ 'list_nav_fixed': isfixed }"  ref="listNav">
        <div class="list_nav" ref="navListText">
            <div :data-id="index+1" @click="show(index+1)" v-for="(item,index) in result.pageWindow" :key="item.id">{{item.objectTitle}}</div>
        </div>
        </div>

        <!--动图区域-->
        <div class="gif_product_show" v-if="ifShowDynmic">
            <div class="gif_img_container">
                <img :src="product_show_img">
                <video autoplay="autoplay" controls="controls" :src="imgUrl+result.dynamicImageList[0].fileUrl" v-if="(imgUrl+result.dynamicImageList[0].fileUrl).indexOf('mp4') != -1" class="gif_img"></video>
                <img v-else :src="imgUrl+result.dynamicImageList[0].fileUrl" class="gif_img">
            </div>
        </div>
        
        <!--功能介绍-->
        <div class="featur_function_container">
        <div class="featur_function" ref="proList">
            <div class="title listDom" id="1">功能介绍</div>
            <div class="component">
            <iconStyle3 :num="result.listRowCount" :imgbaseUrl="imgUrl" :textImg="result.pageFunctionList"></iconStyle3>
            </div>
        </div>
        </div>

        <div class="app_list_container">
        <div class="app_list" ref="appScen">
            <div class="title listDom" id="2">应用场景</div>
            <div class="app_feature_container">
            <div class="top">
                <div
                v-for="(item,index) in result.pageScene"
                :key="index"
                :class="{'active': item.defaultScene==1}"
                @click="goActive(result.pageScene,item)"
                ref="yinyongchangjing"
                >{{item.sceneName}}</div>
            </div>
            <div class="bottom">
                <div class="left">
                <img :src="imgUrl+senceData.fileUrl"/>
                </div>
                <div class="right">
                <div class="right-top">{{senceData.sceneName}}</div>
                <div class="right-bottom">{{senceData.sceneDesc}}</div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <div class="featur_advantage_container">
        <div class="featur_advantage">
            <div class="title listDom" id="3" ref="featuresAdvan">特色优势</div>
            <div class="component">
            <iconStyle2 :num="result.featureRowCount" :imgbaseUrl="imgUrl" :textImg="result.pageFeature"></iconStyle2>
            </div>
        </div>
        </div>

        <div class="support_commit_container">
        <div class="support_commit">
            <div class="title listDom" id="4" ref="supportComm">支持交流</div>
            <div class="component">
               
            <vSupport1 :num="result.chatRowCount" :supportext="result.pageChat" :pdfUrl='pdfUrl' :moduleName="moduleName" :routeId="$route.query.routeId" :oneId="$route.query.oneId" :twoRouteId="$route.query.twoRouteId"></vSupport1>
            </div>
        </div>
        </div>

        <div class="get_audio_container">
        <div class="get_audio">
            <div class="title">即刻获得{{result.pageBanner[0].productTitle}}能力</div>
            <div class="btn" @click="useNow">{{useNowText}}</div>
        </div>
        </div>

        <vLogin v-if="ifShowLogin" @closeLoginWin="closeLoginWin"></vLogin>
        <!-- <v-Modal v-if="isVisible" :iframeUrl="iframeUrl" @closeModal="closeModal"></v-Modal> -->
    </div>
    <div class="loading" v-if="!result">
        <Spin fix>
            <Icon type="ios-loading" size=18 v-if="isLoading" class="demo-spin-icon-load"></Icon>
        </Spin>
    </div>
</div>
</template>

<script>

import vModal from "../modal";
import iconStyle from "../iconStyle";
import iconStyle3 from "../iconStyle3";
import iconStyle2 from "../iconStyle2";
import vSupport1 from "../../support/supportPoint1";
import vLogin from "../../../components/login/login";
export default {
  data() {
    return {
      isLoading:false,
      result:null,
      routeId:'',
      senceData:null,
      iframeUrl:"",
      isVisible:false,
      isfixed:false,
      currentId: "",
      ifShowLogin: false,
      product_show_img:require('../../../assets/images/new_nav/pc.png'),
      ifShowDynmic:false,
      pdfUrl:'',
      imgUrl:window.config.iconUrl,
      useNowText:'立即使用',
      maskImg:require('../../../assets/images/new_nav/mask.png'),
      moduleName:''
    };
  },
  components: {
    vSupport1,
    vLogin,
    iconStyle3,
    iconStyle2,
    vModal,
  },
  computed:{
    ifShowUse:function(){
      if(this.routeId == '5.5.1'){
        return false;
      }
      else{
        return true;
      }
    }
  },
  created() {
    this.isLoading=true;
    this.routeId=this.$route.query.routeId;
    if(this.routeId == '7.4'){
      this.useNowText = '立即下载';
    }
    this.initData();
  },
  watch:{
    $route(newVal,oldVal){
      this.routeId=newVal.query.routeId;
    }
  },
  mounted() {
    
  },
  methods: {
    show(val){
      location.href="#"+val;
      let top=document.documentElement.scrollTop;
      document.documentElement.scrollTop=top-100;
    },
    initData(){
      this.$axios({
        method: "get",
        url: window.config.url+"/sitemgr/page/byrouteid?routeId="+this.routeId,
      }).then(res => {
        if (res.data.code == 200000) {
          this.moduleName = res.data.data.pageBanner[0].productTitle;
          var dynamicImageList = res.data.data.dynamicImageList;
          this.isLoading=false;
          this.result=res.data.data;  
          if(res.data.data.pageBanner[0].documentAddress){
            var pdfUrl = res.data.data.pageBanner[0].documentAddress.split('/');
            var fileName = pdfUrl[pdfUrl.length - 1];
            var textUrl = window.config.url;
            var totalUrl = textUrl + '/kyfysm/' + fileName;
            this.pdfUrl = totalUrl;
          }
          if(dynamicImageList && dynamicImageList.length > 0){
            this.ifShowDynmic = true;
          }
          this.result.pageScene.forEach(item => {
            if(item.defaultScene==1){
              this.senceData=item;
            }
          });
        //  setTimeout(() => {
        //    this.initScroll();
        //  }, 300);
        }
      }).catch(err => {

      });
    },
    goActive(list,val) {
      list.forEach(item => {
        item.defaultScene=0;
      });
      this.$set(val,'defaultScene',1);
      this.senceData=val;
    },
    initScroll() {
      let _this = this;
      // 监听页面滚动事件
      var listNavH = _this.$refs.listNav.offsetTop;
      window.addEventListener("scroll", function() {
        var removeClass = function(obj, cls) {
          if (obj.className == cls) {
            obj.className = "";
          }
        };
        var addClass = function(obj, cls) {
          if (obj.className != cls) {
            obj.className = cls;
          }
        };
        let pos = document.body.scrollTop || document.documentElement.scrollTop;
        if(!document.querySelector(".list_nav")){
          return;
        }
        // 获取全部导航dom与元素dom
        var navList = document.querySelector(".list_nav").querySelectorAll("div");
        var items = document.querySelector(".aiSyntax").querySelectorAll(".listDom");
        // 滚动后遍历元素，如果页面滚动位置大于元素的位置，赋值给变量
        var currentId = "";
        if (pos > listNavH - 100) {
           _this.isfixed=true;
        } else {
           _this.isfixed=false;
        }
        for (var i = 0; i < items.length; i++) {
          var _item = items[i];
          var _itemTop = _item.offsetTop-150;
          if (pos > _itemTop) {
             currentId = _item.id;
          } else {
            break;
          }
        }
        // 如果已赋值了变量，进行匹配，如果匹配则添加class其他删除
        if (currentId) {
          for (var j = 0; j < navList.length; j++) {
            var _navItem = navList[j];
            var _navId = _navItem.getAttribute("data-id");
            if (_navId != currentId) {
              removeClass(_navItem, "cur");
            } else {
              addClass(_navItem, "cur");
            }
          }
        }
      });
    },
    closeLoginWin(arg) {
      this.ifShowLogin = arg;
      // var ifExist = localStorage.username;
      // if(ifExist){
        if(this.result.pageBanner[0].documentAddress){
          var pdfUrl = this.result.pageBanner[0].documentAddress.split('/');
          var fileName = pdfUrl[pdfUrl.length - 1]
          var textUrl = window.config.url;
          var totalUrl = textUrl + '/kyfysm/' + fileName;
          window.open(totalUrl,'_blank');
        }
        else{
          this.$Message.error('返回链接地址为空');
        }
      // }
    },
    useNow() {
      // window.open('https://www.yzsophia.com/sophiaManager/sysindex.html#/','_blank');
      if(this.routeId == '7.4'){
         let routerUrl = this.$router.resolve({
          path:'/downLoad',
          query:{
            downLoadParm:this.result.pageBanner[0].detailAddress
          }
        });
        window.open(routerUrl.href,'_blank')
      }else{
        window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
      }
    },
    useNow1() {
      if(this.$route.query.routeId=='5.5.1'){
            this.$router.push({
              path:'/aiSousuo',
              query:{
                type:1,
              }
            });
      }else if(this.$route.query.routeId.indexOf('7.4')!=-1){
        // this.$router.push({    跳转第三方推荐
        //   path:'/aiTuijian',
        //   query:{
        //     type:1,
        //   }
        // });
        this.$router.push({
          path:'/resumeList1',
        });
      }else{
        let routerUrl = this.$router.resolve({
            path:'/experienceColl',
            query:{
              oneId:this.$route.query.oneId,
              twoRouteId:this.$route.query.twoRouteId,
              routeId:this.$route.query.routeId,
              type:1,
              subTilte:this.result.pageBanner[0].productTitle
            }
        });
        window.open(routerUrl.href,'_blank')
      }
     
    },
    techFile(item) {
      if(item.type){
        location.href="#baogao"
      }else{
        // var ifExist = localStorage.username;
        // if(ifExist){
          if(this.routeId == '7.4'){
            var pdfUrl = this.result.pageBanner[0].documentAddress; //智能推荐技术文档老倪说先不改
            window.open(pdfUrl,'_blank');
          }
          else{
            // this.$router.push({
            //   path:'/document',
            //   query:{
            //     oneId:this.$route.query.oneId,
            //     twoRouteId:this.$route.query.twoRouteId,
            //     routeId:this.$route.query.routeId,
            //     moduleName:this.moduleName
            //   }
            // });

            let routerUrl = this.$router.resolve({
                path:'/allDocument',
                query:{
                  oneId:this.$route.query.oneId,
                  twoRouteId:this.$route.query.twoRouteId,
                  routeId:this.$route.query.routeId,
                  moduleName:this.moduleName
                }
            });
            window.open(routerUrl.href,'_blank')


            // if(this.result.pageBanner[0].documentAddress){
            //   var pdfUrl = this.result.pageBanner[0].documentAddress.split('/');
            //   var fileName = pdfUrl[pdfUrl.length - 1]
            //   var textUrl = window.config.url;
            //   var totalUrl = textUrl + '/kyfysm/' + fileName;
            //   window.open(totalUrl,'_blank');
            // }
            // else{
            //   this.$Message.error('返回链接地址为空');
            // }
          }
        // }
        // else{
        //   this.ifShowLogin = true;
        // }
      }
    }
  }
};
</script>

<style scoped lang='less'>
.loading{
  min-height: 500px;
  position: relative;
  // .ivu-spin-fix{
  //   background: rgba(255,255,255,0);
  // }
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
}
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center center;
  position: relative;
  .mask_container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    z-index: 0;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .banner_contant {
    width: 1200px;
    height: 100%;
    z-index: 9;
    .yuqingsousuo {
      background: #ffffff;
      border: 1px solid #b8becc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      width: 371px;
      input {
        width: 331px;
        height: 100%;
        padding-left: 20px;
        ::placeholder {
          font-size: 14px;
          color: #b8becc;
          letter-spacing: 0;
          line-height: 20px;
        }
        :-moz-placeholder {
          font-size: 14px;
          color: #b8becc;
          letter-spacing: 0;
          line-height: 20px;
        }
        ::-webkit-input-placeholder {
          font-size: 14px;
          color: #b8becc;
          letter-spacing: 0;
          line-height: 20px;
        }
      }
      .searchIcon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 50%;
          height: 50%;
        }
      }
    }
    .desc1 {
      margin-top: 81px;
      padding-bottom: 15px;
      font-size: 30px;
      color: #ffffff;
    }
    .desc2 {
      padding-bottom: 40px;
      width: 496px;
      font-size: 14px;
      color: #ffffff;
      line-height: 28px;
    }
    .btn {
      span {
        display: inline-block;
        padding: 8px 32px;
        margin-right: 40px;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
      }
      span:nth-child(1) {
        background: #03a971;
      }
      span:nth-child(2) {
        border: 1px solid #ffffff;
        border-radius: 3px;
        border-radius: 3px;
      }
      span:nth-child(3) {
        border: 1px solid #ffffff;
        border-radius: 3px;
        border-radius: 3px;
      }
    }
    .btn:hover {
      cursor: pointer;
    }
  }
}
.list_nav_fixed{
    position: fixed;top: 0;left: 0;margin: 0;z-index:100;
  }
.list_nav_container {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#F2F4F7;
  .list_nav {
    cursor: pointer;
    width: 1200px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .cur{
      color: #03A971;
    }
    div {
      font-size: 16px;
      color: #3d4966;
      text-align: center;
    }
  }
}

.gif_product_show{
    width: 100%;
    height: 446px;
    background-image: url('../../../assets/images/new_nav/gif_product_show_bgimg.png');
    display: flex;
    justify-content: center;
    align-items: center;
    .gif_img_container{
        width: 653px;
        position: relative;
        img{
            width: 100%;
        }
        .gif_img{
            width: 73%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }
}

.featur_function_container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  .featur_function {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px 0;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      color: #121c33;
      text-align: center;
      margin-bottom: 52px;
    }
    .component {
      width: 100%;
    }
  }
}
.app_list_bao{
  width: 100%;
  background-color: rgba(184, 190, 204, 0.15);
  padding: 80px 0;
  .app_list {
    width: 1200px;
    margin: auto;
    .title {
      margin-bottom: 50px;
      font-size: 30px;
      color: #121c33;
      text-align: center;
    }
    .bao_container{
      width: 100%;
      .list_con{
        background: #FFFFFF;
        text-align: left;
        padding:40px;
        display: block;
        .title1{
          font-size: 18px;
          color: #121C33;
        }
        .content{
         font-size: 14px;
          color: #7A8499;
          text-align: justify;
          line-height: 22px;
          height:150px;
          margin-top:10px;
        }
        .title{
          font-size: 18px;
          color: #121C33;
        }
      }
      .list_con:hover{
        // box-shadow: 0 0 35px 0 rgba(235,236,240,0.70);
          margin-top:-10px;
          box-shadow: 0 2px 35px 0 #EBECF0;
      }
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
  padding-bottom: 60px;
  .app_list {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    .title {
      margin-top: 60px;
      margin-bottom: 20px;
      font-size: 30px;
      color: #121c33;
      text-align: center;
      // z-index: 9999;
    }
    .app_feature_container {
      width: 100%;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid rgba(184, 190, 204, 0.41);
        margin-bottom: 41px;
        font-size: 18px;
        color: #7a8499;
        text-align: center;
        div {
          padding: 13px 0;
          box-sizing: border-box;
          border:none;
          font-size: 18px;
          cursor: pointer;
          &.active {
            border-bottom: 3px #03a971 solid;
            color: #121c33;
            margin-bottom: -2px;
          }
        }
        
      }
      .bottom {
        display: flex;
        width: 100%;
        overflow: hidden;
        .left {
          width: 540px;
          max-height: 324px;
          img {
            width: 100%;
          }
        }
        .right {
          width: 660px;
          max-height: 324px;
          padding-left: 30px;
          padding-right: 30px;
          text-align: justify;
          box-sizing: border-box;
          background-color: #ffffff;
          .right-top {
            padding-top: 50px;
           
            box-sizing: border-box;
            font-size: 22px;
            color: #121c33;
            margin-bottom: 10px;
            border: none;
          }
          .right-bottom {
            font-size: 14px;
            color: #7a8499;
            line-height: 26px;
            padding-bottom: 50px;
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
  background-color: #ffffff;
  .featur_function_exper {
    width: 1200px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-direction: column;
    padding: 80px 0;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      color: #121c33;
      text-align: center;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 18px;
      color: #121C33;
      text-align: left;
      margin-bottom: 20px;
      &.subActive{
        text-align: center;
        color: #7A8499;
         margin-bottom: 50px;
      }
      span {
        font-size: 14px;
        color: #03a971;
      }
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
  background-color: #ffffff;
  .featur_advantage {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px 0 20px 0;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      color: #121c33;
      text-align: center;
      margin-bottom: 40px;
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
  background-color: #f5f6f8;
  .optionanaly_featur_advantage {
    width: 1200px;
    height: 100%;
    padding-top: 80px;
    box-sizing: border-box;
    .optionanaly_title {
      width: 100%;
      text-align: center;
      font-size: 36px;
      color: #121c33;
      margin-bottom: 20px;
    }
    .optioncontainer {
      width: 100%;
      display: flex;
      align-items: center;
      .oneOfOptionana {
        width: 240px;
        height: 187px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        div:nth-child(1) {
          width: 80px;
          height: 80px;
          margin-bottom: 14px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        div:nth-child(2),
        div:nth-child(3) {
          font-size: 18px;
          color: #121c33;
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
  background: #ffffff;
  .support_commit {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px 0 60px 0;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      color: #121c33;
      text-align: center;
      margin-bottom: 40px;
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
  background-color: #ffffff;
  .get_audio {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px 0;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      color: #121c33;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn {
      background: #03a971;
      border-radius: 3px;
      border-radius: 3px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      padding: 10px 38px;
      box-sizing: border-box;
    }
    .btn:hover {
      cursor: pointer;
    }
  }
}
</style>
