<template>
  <div>
    <div class="aiSyntax">
      <div class="banner" :style="{backgroundImage:'url(' + educate.banner + ')'}">
        <div class="banner_contant">
          <div class="desc">
            <div class="desc1">Sophia平台行业应用使用中心</div>
            <div class="desc2">行业体验中心，已打通智慧医疗，智慧设计，智慧基建等8个行业多个板块</div>
          </div>
          <div class="btn" @click="goLogin">
            合作咨询
          </div>
        </div>
      </div>
      <div  class="pic_container">
        <div class="title">
          <div class="border"></div>
          产品体验列表
        </div>
        <div class="title-desc">
          在这里您可以体验为不同版块提供的通用AI服务，欢迎您的使用
        </div>
        <div class="item-box">
          <div v-for="(el, i) in list" :key="el.name" :class="i%3 === 2 ? 'item no-right' : 'item'">
            <img :src="el.img" alt="">
            <div class="tags-box">
              <div v-for="tag in el.tags" :class="`tags ${tagConfig[tag].cls}`">{{tagConfig[tag].text}}</div>
            </div>
            <div class="title">{{el.name}}</div>
            <div class="desc">{{el.desc}}</div>
            <div class="btn" @click="checkLogin(el)">立即体验</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        educate:{
          banner:require('@/assets/images/trialcenter/banner.png'),
        },
        list: [
          { path:'tongyonFp', name: '发票识别', img: require('@/assets/images/trialcenter/fapiao.png'), desc: '支持对增值税普票、专票、电子发票、卷票的所有关键字段进行结构化识别，包括发票基本信息、销售方及购买方信息等。', tags: ['medical', 'design' ]},
          { path:'certificate', name: '证书编号提取', img: require('@/assets/images/trialcenter/zhengshu.png'), desc: '支持对职称和注册不同等级的建筑师的证书编号提取', tags: ['design','jianse' ]},
          { path:'renlianduibi', name: '人脸对比', img: require('@/assets/images/trialcenter/renlian.png'), desc: '两张人脸进行 1：1 比对，得到人脸相似度', tags: ['design','house' ]},
          { path:'liveSdk', name: '活体检测（SDK）', img: require('@/assets/images/trialcenter/huoti.png'), desc: '确定对象的真实生理特征,检测其是否为“真人”,有效抵御照片、视频、3D模具等作弊手段,保障业务安全性', tags: ['medical','design' ]},
          { path:'busCertificat', name: '营业执照识别', img: require('@/assets/images/trialcenter/yingyezhizhao.png'), desc: '对营业执照的注册号、社会信用代码、单位名称、法人、地址、有效期进行结构化识别', tags: ['medical','design' ]},
        ],
        tagConfig: {
          design: { text: '智慧设计', cls: 'medical' },
          medical: { text: '智慧医疗', cls: 'design' },
          jianse: { text: '智慧建设', cls: 'design' },
          house: { text: '智慧小镇', cls: 'design' },
          'undefined': {}
        }
      };
    },
    components: {
    },
    created() {
      //document.cookie='JSESSIONID=8ff3fbad-99e7-43a6-beb7-cc5d9a13e2f8';//JSESSIONID=883ac7ec-d083-4bb0-a97b-3ecc6ae5cb31
    },
    methods: {
      tiyan(item,flag){
        if(flag){
          let routerUrl = this.$router.resolve({
              path:"/"+item.path,
          });
          window.open(routerUrl.href,'_blank')
        }else{
         let routerUrl = this.$router.resolve({
              path:'/login1',
              query:{
                to:item.path,
              }
          });
          window.open(routerUrl.href,'_blank')
          return;
        }
      },
      checkLogin(item) {
        //document.cookie='JSESSIONID=8ff3fbad-99e7-43a6-beb7-cc5d9a13e2f8';//JSESSIONI
        //Vue.prototype.$axios.defaults.headers.cookie = encodeURIComponent('JSESSIONID=8ff3fbad-99e7-43a6-beb7-cc5d9a13e2f8');
        // var xhr=new XMLHttpRequest();
        // xhr.onreadystateChange=function()
        //   {
        //   if (xmlhttp.readyState==4 && xmlhttp.status==200)
        //     {
        //     // document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        //     }
        //   };
        // xhr.withCredentials = true;
        // xhr.open("GET", window.config.url + "/sophiaManager/sys/checklogin",true);
        // xhr.send(null);
        let _this=this;
        $.ajax({
            type: "get",
            url:  window.config.url + "/sophiaManager/sys/checklogin",
            async: false,
    //         xhrFields: {
    // 　　　　　　withCredentials: true
    // 　　　　},
            withCredentials: true,
            success: function(result){
            if(result.code == 0){//登录成功
              localStorage.username=result.user.username;
              _this.$store.commit(
                  'setUserName',
                  {
                      username:result.user.username
                  }
              );
               _this.tiyan(item,true)
            }else{
               _this.tiyan(item,false)
            }
          }
        });
      },
      // checkLogin(item) {
      //   this.$axios({
      //     method: "get",
      //     url: window.config.url + "/sophiaManager/sys/checklogin",
      //   })
      //     .then(res => {
      //       if (res.data.code == 200) {
      //         this.tiyan(item,true)
      //       }else{
      //          this.tiyan(item,false)
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
      goLogin(){
        let routerUrl = this.$router.resolve({
           path:'/zixun',
        });
        window.open(routerUrl.href,'_blank')
      }
    }
  };
</script>

<style scoped lang='less'>
  @keyframes scale {
    0%{ transform: scale(1);}
    50%{transform: scale(1.2);}
    100%{transform: scale(1);}
  }
  img{
    width:100%;
    display: block;
  }
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 350px;
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
      }
      .desc1 {
        margin-top: 74px;
        padding-bottom: 15px;
        font-size: 36px;
        color: #ffffff;
      }
      .desc2 {
        padding-bottom: 25px;
        width: 575px;
        font-size: 16px;
        color: #ffffff;
        line-height: 32px;
      }
      .btn {
        width: 120px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #03A971;
         border-radius: 3px;
         color:#fff;
      }
      .btn:hover {
        cursor: pointer;
      }
    }
  }
  .tags{
    font-size: 12px;
    color: #FFFFFF;
    background: rgba(3, 169, 113, 0.6);
    border-radius: 2px;
    margin-right: 12px;
    padding: 2px 4px;
    &:last-child{
      margin-right: 0;
    }
  }
  .tags.medical{
    background: rgba(3, 169, 113, 0.6);
  }
  .tags.design{
    background: rgba(0,145,255,0.6);
  }

  .day_container{
    padding-top:60px;
    .ai_content{
      width: 1200px;
      margin: auto;
      .ai_title{
        margin-bottom:72px;
        font-size: 30px;
        color: #121C33;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .pic_container{
    padding: 60px 0;
    width: 1200px;
    margin: 0 auto;
    .item-box{
      flex-wrap: wrap;
      display: flex;
      margin-top: 30px;
      .item{
        width: 380px;
        margin-right: 30px;
        margin-bottom: 60px;
        img{
          width: 380px;
          height: 200px;
        }
        .tags-box{
          display: flex;
          margin-top: 10px;
        }
        .title{
          font-size: 22px;
          color: #121C33;
          margin: 21px 0 10px;
        }
        .desc{
          font-size: 14px;
          color: #7A8499;
          line-height: 26px;
          height: 52px;
          margin-top: 10px;
          // 以下样式是 2行之后省略
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .btn{
          width: 120px;
          height: 36px;
          border: 1px solid #03A971;
          border-radius: 3px;
          color: #03A971;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          padding: 0;
          cursor: pointer;
        }
      }
      .item.no-right{
        margin-right: 0;
      }
    }
    .title{
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
    }
    .title-desc{
      font-size: 18px;
      color: #7A8499;
      padding-left: 26px;
      margin-top: 15px;
    }
    .border{
      background: #03A971;
      width: 6px;
      height: 26px;
      margin-right: 20px;
    }
  }
</style>
