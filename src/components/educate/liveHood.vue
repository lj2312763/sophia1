<template>
<div>
  <div class="aiSyntax">
    <div class="banner" :style="{backgroundImage:'url(' + educate.banner + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">智慧办公</div>
          <div class="desc2">AI赋能，提供完善的智慧办公解决方案</div>
        </div>
        <div class="btn">
          <span @click="jump1">合作咨询</span>
        </div>
      </div>
    </div>
        <div  class="day_container">
            <div class="ai_content">
                <div class="ai_title">
                智慧办公
                </div>
            </div>
        </div>
        <div  class="pic_container">
            <div class="ai_content">
               <img src="../../assets/images/liveHood/smart-office.png" alt="">
               <div class="ai_item ai_item1" :class="{'active1':currentId==1}" @click="fnClick(1)">
                  <img src="../../assets/images/liveHood/1.png" alt="">
                  <div class="intro">
                      <p>场景：智能停车</p>
                      <p>服务：车牌识别</p>
                  </div>
               </div>
               <div class="ai_item ai_item2" :class="{'active1':currentId==2}" @click="fnClick(2)">
                  <img src="../../assets/images/liveHood/2.png" alt="">
                  <div class="intro">
                      <p>场景：打卡签到</p>
                      <p>服务：人脸搜索</p>
                  </div>
                </div>
               <div class="ai_item ai_item3" :class="{'active1':currentId==3}"  @click="fnClick(3)">
                   <img src="../../assets/images/liveHood/3.png" alt="">
                  <div class="intro">
                      <p>场景：进入环境</p>
                      <p>服务：口罩识别</p>
                  </div>
                </div>
               <div class="ai_item ai_item4" :class="{'active1':currentId==4}"  @click="fnClick(4)">
                  <img src="../../assets/images/liveHood/4.png" alt="">
                  <div class="intro">
                      <p>场景：会议室开会</p>
                      <p>服务：语音识别</p>
                  </div>
                </div>
               <div class="ai_item ai_item5" :class="{'active1':currentId==5}" @click="fnClick(5)">
                   <img src="../../assets/images/liveHood/5.png" alt="">
                  <div class="intro">
                      <p>场景：工作沟通</p>
                      <p>服务：智能翻译</p>
                  </div>
               </div>
               <div class="ai_item ai_item6" :class="{'active1':currentId==6}" @click="fnClick(6)">
                  <img src="../../assets/images/liveHood/6.png" alt="">
                  <div class="intro">
                      <p>场景：办公使用</p>
                      <p>服务：发票识别</p>
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
          banner:require('@/assets/images/liveHood/banner.png'),
      },
      bannerList:[require('@/assets/images/liveHood/biao1.png'),require('@/assets/images/liveHood/biao2.png')],
      timeList:[
        {id:"1",name:'8:00 出小区',direction:"left"},
        {id:"2",name:'9:00 进公司',direction:"left"},
        {id:"3",name:'10:30 识别发票',direction:"left"},
        {id:"4",name:'12:00 午饭',direction:"left"},
        {id:"5",name:'14:00 处理视频',direction:"bottom"},
        {id:"10",name:'22:30 睡觉',direction:"top"},
        {id:"9",name:'21:00 学英语',direction:"right"},
        {id:"8",name:'19:00 晚饭',direction:"right"},
        {id:"7",name:'17:30 填写发票',direction:"right"},
        {id:"6",name:'16:00 翻译',direction:"right"},
      ],
      currentId: 1,
      liveId:1,
      title:'',
      routeId:'',
      timer:null,
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
        });
        window.open(routerUrl.href,'_blank')
    },
    closeWindow(){
        this.isShow=false;
    },
    fnClick(val){
        this.isShow=true;
        if(val==6){
          this.title='识别发票';
           this.routeId='2.2.3';
        }else if(val==5){
          this.title='智能翻译';
           this.routeId='5.4.1';
        }
        else if(val==4){
          this.title='语音识别';
           this.routeId='1.1.2';
        }
        else if(val==3){
          this.title='口罩识别';
           this.routeId='6.4.6';
        }
        else if(val==2){
          this.title='人脸搜索';
           this.routeId='search';
        }
        else if(val==1){
          this.title='车牌识别';
           this.routeId='2.3.3';
        }
        
    },
     initData(){
        this.timer=setInterval(()=>{
            if(this.currentId>=6){
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
.work_container{
  background: #F9F9F9;
  padding-bottom: 60px;
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
.pic_container{
  padding-bottom: 60px;
  .ai_content{
    width: 1200px;
    margin: auto;
    position: relative;
    .ai_item{
      position: absolute;
      font-size: 14px;
      color: #3D4966;
      line-height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
       width: 56px;
      .intro{
        position: absolute;
        left:72px;
        top:5px;
        width:150px;
        font-size: 18px;
        color: #121C33;
        p:nth-child(1){
          margin-bottom: 10px;
        }
      }
      &.active1{
        img{
          animation: scale 1.5s linear infinite;
        }
      }
      &.ai_item1{
        left: 93px;
        top: 100px;
      }
      &.ai_item2{
        left: 262px;
        top: 261px;
      }
      &.ai_item3{
        left: 613px;
        top: 302px;
      }
      &.ai_item4{
        left: 511px;
        top: 28px;
      }
      &.ai_item5{
        left: 902px;
        top: 26px;
      }
      &.ai_item6{
          left: 864px;
          top: 240px;
      }
    }
  }
}
</style>
