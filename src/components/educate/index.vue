<template>
<div>
  <div class="aiSyntax">
    <div class="banner" :style="{backgroundImage:'url(' + educate.banner + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">智慧教育</div>
          <div class="desc2">基于元知多项AI技术，赋能软硬件教学产品，用更低的师资成本获得高质量的教育效果；同时打造智慧校园，实现校园安全、校内考勤、课堂效果监测等关键场景业务升级，提升校园生活体验和安全性，降低管理成本</div>
        </div>
        <div class="btn">
          <span @click="jump1">合作咨询</span>
        </div>
      </div>
    </div>
      <!-- 智慧校园 -->
    <div  class="ai_container">
        <div class="ai_content">
            <div class="ai_title">
              <div class="border-silde"></div>
              智慧校园
            </div>
            <div class="ai_subTitle">
              领先的人工智能技术为核心，结合物联网感知终端，为学校提供全栈式人工智能解决方案
            </div>
             <div class="ai_card">
                 <img src="../../assets/images/educate/banner.png" alt="">
                 <div class="list list1" :class="{'listActive':currentId==1}" @click="tabClick(1)">
                     <p>通行考勤管理</p>
                 </div>
                 <div class="list list2" :class="{'listActive':currentId==2}" @click="tabClick(2)">
                    <p>课堂专注度分析</p>
                 </div>
                 <div class="list list5" :class="{'listActive':currentId==4}" @click="tabClick(4)">
                    <p>作业辅导批改</p>
                </div>
                 <div class="list list4" :class="{'listActive':currentId==3}" @click="tabClick(3)">
                     <p>智慧食堂</p>
                </div>
                <div class="list list3" :class="{'listActive':currentId==5}" @click="tabClick(5)"> <p>教育大数据</p></div>
             </div>
        </div>
    </div>
    <div v-for="Pitem in educateModule" :key="Pitem.id" v-if='Pitem.id==clickId'>
        <!-- 作业辅导批改 -->
        <div  class="work_container">
            <div class="ai_content">
                <div class="ai_title">
                {{Pitem.work.title}}
                </div>
                <div class="ai_card">
                    <div class="list" v-for="(item,index) in  Pitem.work.bannerList" :key="index">
                        <img :src="item" alt="">
                    </div>
                    <div class="fn">
                        <div class="title">方案中所集成的AI服务</div>
                        <div class="subTitle" v-for="(item,index) in  Pitem.work.fn" :key="index" @click="fnClick(item)">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 方案构成 -->
        <div  class="fn_container">
            <div class="ai_content">
                <div class="ai_title">
                {{Pitem.workFn.title}}
                </div>
                <div class="ai_subTitle">
                {{Pitem.workFn.subTitle}}
                </div>
                <div class="ai_card">
                    <img :src="Pitem.workFn.banner" alt="">
                </div>
            </div>
        </div>
    </div>
  </div>
  <wisEducation :routeId="routeId" :title="title" v-if="isShow" @closeWindow="closeWindow"></wisEducation>
</div>
</template>

<script>

import wisEducation from "../experienceColl/wisEducation/wisEducation";
export default {
  data() {
    return {
      isShow:false,
      educate:{
          banner:require('@/assets/images/educate/12334.png'),
      },
      educateModule:[
        {
            id:4,
            work:{
                title:"作业辅导批改",
                bannerList:[require('@/assets/images/educate/gan1.gif'),require('@/assets/images/educate/176902424_1572702998656.gif')],
                fn:[
                    {title:'通用文字识别',path:'2.6.1'},
                    {title:'手写文字识别',path:'2.4.1'},
                    {title:'公式识别',path:'2.4.2'},
                    // {title:'数字识别',path:'2.5.2'}
                ]
            },
            workFn:{
                title:"方案构成",
                subTitle:"通过应用元知OCR技术，包括通用文字识别、手写识别、公式识别、数字识别等能力，对作业、答题卡图片进行扫描，智能识别学生考号、姓名等信息来判断学生身份；识别印刷题目和手写答题内容；识别客观题答案实现电子信息化阅卷等",
                banner:require('@/assets/images/educate/4.png'),
            },
        },
        {
            id:3,
            work:{
                title:"智慧食堂",
                bannerList:[require('@/assets/images/educate/1.gif'),require('@/assets/images/educate/20181018150227452745.gif')],
                fn:[
                    {title:'人脸支付',path:'6.1.20'},
                    {title:'菜品识别',path:'3.1.8'},
                    // {title:'图像识别',path:'3.1.2'},
                ]
            },
            workFn:{
                title:"方案构成",
                subTitle:"基于摄像头采集的图像信息，识别学生在课堂上的行为、表情、微动作、物品等要素，综合评估上课专注度，为学校、教育机构评估教学质量并采用针对性的提升方法提供精准依据",
                banner:require('@/assets/images/educate/3.png'),
            },
        },
        {
            id:2,
            work:{
                title:"课堂专注度分析",
                bannerList:[require('@/assets/images/educate/77e1-ieaiqii5687906.gif')],
                fn:[
                    {title:'表情分析',path:'6.1.1'},
                    {title:'课堂专注度分析 ',path:'6.2.3'},
                ]
            },
            workFn:{
                title:"方案构成",
                subTitle:'基于摄像头采集的图像信息，获取人脸信息后完成身份的确认。通过菜品识别、人脸识别，实现菜品自动结算和刷脸结账。实现学生自动服务，降低人工管理成本',
                banner:require('@/assets/images/educate/2.png'),
            },
        },
          {
            id:1,
            work:{
                title:"通行考勤管理",
                bannerList:[require('@/assets/images/educate/2018111617260216216.gif'),require('@/assets/images/educate/VYaXnmqZ_7vVx.gif')],
                fn:[
                    // {title:'人脸识别',path:'6.1.1'},
                    {title:'人脸搜索',path:'search'},
                ]
            },
            workFn:{
                title:"方案构成",
                subTitle:"针对校门口、宿舍、体育馆、重点区域等出入口，安装人脸闸机/门禁，实现刷脸通行，规避非本校人员等尾随入内，同时实现学生、教职员工刷脸考勤，验证是否为本人，杜绝作弊现象，提升考勤管理效率、安全管理效率和便捷性",
                banner:require('@/assets/images/educate/1.png'),
            },
        },
      ],
      currentId: 1,
      clickId: 1,
      ifShowLogin: false,
      timer:null,
      title:'',
      routeId:'',
    };
  },
  components: {
    wisEducation,
  },
  mounted() {
    this.initData();
  },
  methods: {
     jump1(){
       let routerUrl = this.$router.resolve({
            path:'/zixun',
            // query:{
            //  title:1,
            //  subTitle:'合作咨询'
            // }
        });
        window.open(routerUrl.href,'_blank')
    },
    closeWindow(){
        this.isShow=false;
    },
    fnClick(val){
        this.isShow=true;
        this.title=val.title;
        this.routeId=val.path;
    },
    tabClick(val){
        this.currentId=val;
        if(val!=5){
            this.clickId=val;
        }else{
           window.open("http://123.57.46.207:8081/view/report.do?reportId=39735e53069a4bc0801b25d1756a4128",'_blank');
        }
        
    },
    initData(){
        this.timer=setInterval(()=>{
            if(this.currentId>=5){
                this.currentId=1;
            }else{
                this.currentId++;
            }
        },3000)
    },
  }
};
</script>

<style scoped lang='less'>
@keyframes scale {
    0%{ transform: scale(1);}
    50%{transform: scale(1.1);}
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
      span {
        display: inline-block;
        width:120px;
        height:36px;
        line-height: 36px;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
      }
      span:nth-child(1) {
       background: #03A971;
      }
    }
    .btn:hover {
      cursor: pointer;
    }
  }
}
.ai_container{
  background: #F7F8FA;
  padding-bottom:60px;
  padding-top:60px;
  .ai_content{
    width: 1200px;
    margin: auto;
     .ai_title{
      margin-bottom:15px;
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
      .border-silde{
        width: 4px;
        height: 26px;
        background: #03A971;
        margin-right:20px;
      }
    }
    .ai_subTitle{
      padding-left:24px;
      font-size: 18px;
      color: #7A8499;
      margin-bottom:70px;
    }
    .ai_card{
      position: relative;
      .list{
        position: absolute;
        padding:7px;
        background: rgba(0,0,0,0.26);
        border-radius: 26px;
        cursor: pointer;
        p{
            background: rgba(0,0,0,0.85);
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            padding:3px 17px;
            border-radius: 13px;
        }
        &.listActive{
            background: rgba(3,169,113,0.26);
            animation: scale 1.5s linear infinite;
            p{
            background: #03A971;; 
            }
        }
        &.list1{
            bottom:120px;
            left:100px
        }
        &.list2{
            bottom:200px;
            left:450px
        }
        &.list3{
            top:230px;
            right:10px
        }
        &.list4{
            bottom:130px;
            left:650px
        }
        &.list5{
            top:70px;
            left:800px
        }
      }
    }
  }
}
.work_container{
  padding-top:60px;
  .ai_content{
    width: 1200px;
    margin: auto;
     .ai_title{
      margin-bottom:32px;
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ai_card{
      position: relative;
      display: flex;
      .list{
          margin-right: 30px;
          overflow: hidden;
          flex:1;
      }
      .fn{
          width:308px;
          padding:25px;
          box-sizing: border-box;
          border: 1px solid #B8BECC;
          .tilte{
              font-size: 16px;
              color: #121C33;
              line-height: 33px
          }
          .subTitle{
            font-size: 14px;
            color: #03A971;
            line-height: 33px;
            cursor: pointer;
          }
      }
    }
  }
}
.fn_container{
  padding-top:60px;
  .ai_content{
    width: 1200px;
    margin: auto;
     .ai_title{
      margin-bottom:12px;
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ai_subTitle{
        width:1030px;
        margin: auto;
        font-size: 18px;
        color: #7A8499;
        text-align: center;
        line-height: 31px;
        margin-bottom:26px;
    }
    .ai_card{
      position: relative;
      display: flex;
      padding:47px 12px;
      box-shadow: 0 2px 21px 0 rgba(184,190,204,0.63);
      margin-bottom: 60px;
      .list{
          margin-right: 30px;
          overflow: hidden;
          flex:1;
      }
      .fn{
          width:308px;
          padding:25px;
          box-sizing: border-box;
          border: 1px solid #B8BECC;
          .tilte{
              font-size: 16px;
              color: #121C33;
              line-height: 33px
          }
          .subTitle{
            font-size: 14px;
            color: #03A971;
            line-height: 33px;
            cursor: pointer;
          }
      }
    }
  }
}
</style>
