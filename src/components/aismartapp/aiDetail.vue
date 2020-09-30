<template>
<div>
  <div class="aiSyntax" v-if="result">
    <div class="banner" :style="{backgroundImage:'url(' + result.imageAddress+'?fileId='+result.pageBanner[0].fileId + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">{{result.pageBanner[0].productTitle}}</div>
          <div class="desc2">{{result.pageBanner[0].productDesc}}</div>
        </div>
        <div class="btn">
          <span @click="useNow1()" v-if="result.pageBanner[0].showTrail==1">功能体验</span>
          <span @click="useNow()">立即使用</span>
          <span @click="techFile(result.pageBanner[0])">技术文档</span>
        </div>
      </div>
    </div>

    <div class="list_nav_container" :class="{ 'list_nav_fixed': isfixed }"  ref="listNav">
      <div class="list_nav" ref="navListText">
        <div :data-id="index+1" @click="show(index+1)" v-for="(item,index) in result.pageWindow" :key="item.id">{{item.objectTitle}}</div>
      </div>
    </div>

    <div class="featur_function_container">
      <div class="featur_function" ref="proList">
        <div class="title listDom" id="1">功能介绍</div>
        <div class="component">
          <iconStyle3 :num="result.listRowCount" :imgbaseUrl="result.imageAddress" :textImg="result.pageFunctionList"></iconStyle3>
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
              <img :src="result.imageAddress+'?fileId='+senceData.fileId" alt />
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
           <iconStyle2 :num="result.featureRowCount" :imgbaseUrl="result.imageAddress" :textImg="result.pageFeature"></iconStyle2>
        </div>
      </div>
    </div>

    <div class="support_commit_container">
      <div class="support_commit">
        <div class="title listDom" id="4" ref="supportComm">支持交流</div>
        <div class="component">
          <vSupport1 :num="result.chatRowCount" :supportext="result.pageChat"></vSupport1>
        </div>
      </div>
    </div>

    <div class="get_audio_container">
      <div class="get_audio">
        <div class="title">即刻获得{{result.pageBanner[0].productTitle}}能力</div>
        <div class="btn" @click="useNow">立即使用</div>
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

import vModal from "../common/modal";
import iconStyle from "../common/iconStyle";
import iconStyle3 from "../common/iconStyle3";
import iconStyle2 from "../common/iconStyle2";
import vSupport1 from "../support/supportPoint1";
import vLogin from "@/components/login/login";
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
      ifShowLogin: false
    };
  },
  components: {
    vSupport1,
    vLogin,
    iconStyle3,
    iconStyle2,
    vModal,
  },
  created() {
    this.isLoading=true;
    this.routeId=this.$route.query.routeId;
  },
  watch:{
    $route(newVal,oldVal){
      this.routeId=newVal.query.routeId;
      this.initData();
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    show(val){
      location.href="#"+val;
    },
    initData(){
      this.$axios({
        method: "get",
        url: window.config.url+"/sitemgr/page/byrouteid?routeId="+this.routeId,
      }).then(res => {
        if (res.data.code == 200000) {
           this.isLoading=false;
           this.result=res.data.data;
           this.result.pageScene.forEach(item => {
             if(item.defaultScene==1){
               this.senceData=item;
             }
           });
         setTimeout(() => {
           this.initScroll();
         }, 300);
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
    },
    useNow() {
      this.ifShowLogin = true;
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
        this.$router.push({
          path:'/aiTuijian',
          query:{
            type:1,
          }
        });
      }else{
        let routerUrl = this.$router.resolve({
            path:'/experienceColl',
            query:{
              oneId:this.$route.query.oneId,
              twoRouteId:this.$route.query.twoRouteId,
              routeId:this.$route.query.routeId,
              type:1,
            }
        });
        window.open(routerUrl.href,'_blank')
      }
     
    },
    techFile(item) {
      if(item.type){
        location.href="#baogao"
      }else{
        this.$router.push({
          path:'aiDocument',
          query:{
            type:1,
          }
        })
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
  height: 450px;
  background-size: cover;
  background-position: center center;
  .banner_contant {
    width: 1200px;
    height: 100%;
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
      margin-top: 120px;
      padding-bottom: 20px;
      font-size: 36px;
      color: #ffffff;
    }
    .desc2 {
      padding-bottom: 60px;
      width: 496px;
      font-size: 16px;
      color: #ffffff;
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
  background-color: #f2f4f7;
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
      font-size: 18px;
      color: #3d4966;
      text-align: center;
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
    padding: 80px 0;
    box-sizing: border-box;
    .title {
      font-size: 36px;
      color: #121c33;
      text-align: center;
      margin-bottom: 50px;
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
      font-size: 36px;
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
        justify-content: space-between;
        width: 100%;
        height: 446px;
        overflow: hidden;
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
      font-size: 36px;
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
    padding: 80px 0;
    box-sizing: border-box;
    .title {
      font-size: 36px;
      color: #121c33;
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
    padding: 40px 0 82px 0;
    box-sizing: border-box;
    .title {
      font-size: 36px;
      color: #121c33;
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
  background-color: #ffffff;
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
