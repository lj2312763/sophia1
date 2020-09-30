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
                <span @click="useNow1(result.pageBanner[0].productTitle)">立即下载</span>
              </div>
          </div>
        </div>

        <div class="list_nav_container" :class="{ 'list_nav_fixed': isfixed }"  ref="listNav">
          <div class="list_nav" ref="navListText">
              <div :data-id="index+1" @click="show(index+1)" v-for="(item,index) in result.pageWindow" :key="item.id">{{item.objectTitle}}</div>
          </div>
        </div>
   
        <!--产品简介-->
        <div class="featur_function_container">
            <div class="featur_function" ref="proList">
                <div class="title listDom" id="1">产品简介</div>
                <div class="component">
                    <div class="left_text">
                        <div class="left_text_icon">
                            <img :src="iconUrl" alt="" srcset="">
                        </div>
                        <div class="left_text_container">
                            <div class="top">{{result.pageProductList[0].productName}}</div>
                            <div class="bottom">{{result.pageProductList[0].productDesc}}</div>
                        </div>
                    </div>
                    <div class="right_img">
                        <div class="right_text_title"><span class="product_name_title">{{result.pageProductList[0].productName}}</span>产品文档</div>
                        <div class="btn_container">
                          <div class="chakan_btn" @click="goTechFile">立即查看</div>
                          <div class="xiazai_btn" @click="useNow1(result.pageBanner[0].productTitle)">立即下载</div>
                        </div>
                    </div>
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
                >{{item.sceneName}}</div>
              </div>
              <div class="bottom">
                <div class="left">
                  <img :src="imgUrl+senceData.fileUrl" alt />
                </div>
                <div class="right">
                  <div class="right-top">{{senceData.sceneName}}</div>
                  <div class="right-bottom">{{senceData.sceneDesc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="support_commit_container">
          <div class="support_commit">
              <div class="title listDom" id="3" ref="supportComm">相关推荐</div>
              <div class="component">
                  <vSupport3 :num="tuijianColumn" :supportext="tuijianArr"></vSupport3>
              </div>
          </div>
        </div>

        <vLogin v-if="ifShowLogin" @closeLoginWin="closeLoginWin"></vLogin>
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
import iconStyle2 from "../iconStyle2";
import vSupport3 from "../../support/supportPoint3";
import vLogin from "../../../components/login/login";
export default {
  data() {
    return {
      isLoading:false,
      iconUrl:require('../../../assets/images/new_nav/icon_80 copy 102.png'),
      appScenImg:require('../../../assets/images/new_nav/appScenImg.png'),
      routeId:'',
      iframeUrl:"",
      isVisible:false,
      isfixed:false,
      currentId: "",
      ifShowLogin: false,
      product_show_img:require('../../../assets/images/new_nav/pc.png'),
      result:null,
      senceData:null,
      tuijianColumn:0,
      tuijianArr:[],
      imgUrl:window.config.iconUrl,
      maskImg:require('../../../assets/images/new_nav/mask.png')
    };
  },
  components: {
    vSupport3,
    vLogin,
    iconStyle2,
    vModal,
  },
  created() {
    this.isLoading=true;
    this.routeId=this.$route.query.routeId;
    this.initData();
  },
  watch:{
    $route(newVal,oldVal){
      this.routeId=newVal.query.routeId;
      this.initData();
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
           this.isLoading=false;
           this.result=res.data.data;
           if(this.result.pageScene.length == 0){
            this.senceData = {
              fileUrl:'',
              sceneName:'',
              sceneDesc:''
            };
           }else{
            this.result.pageScene.forEach(item => {
              if(item.defaultScene==1){
                this.senceData=item;
              }
            });
           }
           if(res.data.data.recommendList != null){
              var recommendList = res.data.data.recommendList;
              if(recommendList.length <= 3){
                this.tuijianArr = res.data.data.recommendList;
                this.tuijianColumn = recommendList.length;
              }
              else{
                this.tuijianArr = res.data.data.recommendList.slice(0,3);
                this.tuijianColumn = 3;
              }
           }
        }
      }).catch(err => {
        console.log(err);
      });
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
        if(!document.querySelector(".list_nav")){
          return;
        }
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
    useNow1(t) {
      var downLoadParm = this.result.pageBanner[0].detailAddress;
      let routerUrl = this.$router.resolve({
        path:'/downLoad',
        query:{
          downLoadParm:downLoadParm,
          title:t
        }
      }); 
       window.open(routerUrl.href,'_blank')
    },
    goTechFile(){
      if(this.result.pageProductList[0].productDetailAddress){
        var pdfUrl = this.result.pageProductList[0].productDetailAddress.split('/');
        var fileName = pdfUrl[pdfUrl.length - 1];
        var textUrl = window.config.url;
        var totalUrl = textUrl + '/kyfysm/' + fileName;
        window.open(totalUrl,'_blank');
      }
      else{
        this.$Message.error('返回链接地址为空');
      } 
    },
    goActive(list,val) {
      list.forEach(item => {
        item.defaultScene=0;
      });
      this.$set(val,'defaultScene',1);
      this.senceData=val;
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
      margin-bottom: 40px;
    }
    .component {
      width: 992px;
      height: 260px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_text{
        height: 100%;
        width: 75%;
        overflow: scroll;
        display: flex;
        align-items: flex-start;
        padding:40px 76px 40px 0;
        box-sizing: border-box;
        .left_text_icon{
            width: 60px;
            height: 60px;
            margin-right: 20px;
            img{
                width: 100%;
            }
        }
        .left_text_container{
            flex: 1;
            .top{
                font-size: 20px;
                color: #121C33;
                margin-bottom: 10px;
            }
            .bottom{
                font-size: 16px;
                color: #7A8499;
                text-align: justify;
                line-height: 29px;
            }
        }
      }
      .right_img{
        width: 231px;
        height: 100%;
        background-image: url('../../../assets/images/new_nav/WechatIMG42.png');
        background-size: 100% 100%;
        position: relative;
        .right_text_title{
            position: absolute;
            left: 17px;
            top: 30px;
            font-size: 20px;
            color: #FFFFFF;
            height: 60px;
            .product_name_title{
              display: inline-block;
              width: 203px;
              height: 30px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
        }
        .btn_container{
          position: absolute;
          left: 17px;
          top: 116px;
          width: 202px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .chakan_btn{
            height: 100%;
            width: 45%;
            line-height: 36px;
            text-align: center;
            border: 1px white solid;
            color: white;
            border-radius: 3px;
          }
          .xiazai_btn{
            height: 100%;
            width: 45%;
            line-height: 36px;
            text-align: center;
            border: 1px #03A971 solid;
            color: #03A971;
            border-radius: 3px;
          }
        }
      }
      .right_img:hover{
        cursor: pointer;
      }
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
// .app_list_container {
//   width: 100%;
//   background-color: rgba(184, 190, 204, 0.15);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-sizing: border-box;
//   padding-bottom: 60px;
//   .app_list {
//     width: 1200px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
    
//     .title {
//       margin-top: 60px;
//       margin-bottom: 30px;
//       font-size: 30px;
//       color: #121c33;
//       text-align: center;
//     }
//     .app_feature_container {
//       width: 100%;
//       display: flex;
//       justify-content: center;
//       .bottom {
//           width:1079px;
//           .bottom_top,.bottom_bottom{
//             width: 100%;
//             height: 318px;
//             display: flex;
//             .one_img{
//                 width: 50%;
//                 height: 100%;
//                 img{
//                     width: 100%;
//                 }
//             }
//             .two_text{
//                 width: 50%;
//                 height: 100%;
//                 padding: 40px 50px;
//                 background-color:#fff;
//                 .p_title{
//                     font-size: 22px;
//                     color: #121C33;
//                     margin-bottom: 10px;
//                 }
//                 .p_desc{
//                     font-size: 14px;
//                     color: #7A8499;
//                     line-height: 26px;
//                 }
//             }
//           }
//       }
//     }
//   }
// }

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
      // .bottom {   没改之前样式
      //   display: flex;
      //   justify-content: space-between;
      //   width: 100%;
      //   height: 446px;
      //   overflow: hidden;
      //   .left {
      //     width: 65%;
      //     img {
      //       width: 100%;
      //     }
      //   }
      //   .right {
      //     width: 35%;
      //     padding-left: 30px;
      //     box-sizing: border-box;
      //     background-color: #ffffff;
      //     .right-top {
      //       padding-top: 50px;
           
      //       box-sizing: border-box;
      //       font-size: 22px;
      //       color: #121c33;
      //       margin-bottom: 10px;
      //       border: none;
      //     }
      //     .right-bottom {
      //       font-size: 14px;
      //       color: #7a8499;
      //       line-height: 26px;
      //       padding-bottom: 50px;
      //     }
      //   }
      // }
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
</style>
