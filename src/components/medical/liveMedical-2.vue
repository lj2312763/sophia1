<template>
<div>
  <div class="aiSyntax">
    <div class="banner" :style="{backgroundImage:'url(' + educate.banner + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">智慧医疗</div>
          <div class="desc2">AI赋能，提供完善的智慧医疗解决方案</div>
        </div>
        <div class="btn">
          <span @click="jump1">合作咨询</span>
        </div>
      </div>
    </div>
        <div  class="day_container">
            <div class="ai_content">
                <div class="ai_title">
                智慧医疗
                </div>
            </div>
        </div>
        <div  class="pic_container">
            <div class="ai_content">
               <img src="../../assets/images/medical/smart-medical.png" alt="">
               <div class="ai_item ai_item1" :class="{'active1':currentId==1}" @click="fnClick('pifu')"></div>
               <div class="ai_item ai_item2" :class="{'active1':currentId==2}" @click="fnClick('bingli')"></div>

               <div class="ai_item ai_item3" :class="{'active1':currentId==3}"  @click="fnClick('shetai')"></div>

              <!-- <div class="ai_item ai_item3" :class="{'active1':currentId==3}"  @click="fnClick('yingxiang')"></div> -->

               <div class="ai_item ai_item4" :class="{'active1':currentId==4}"  @click="fnClick('wenzi')"></div>
               <div class="ai_item ai_item5" :class="{'active1':currentId==5}"  @click="fnClick('guge')"></div>
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
          banner:require('@/assets/images/medical/banner-medical.png'),
      },
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
        if(val=='guge'){
          this.title='骨骼分析';
           this.routeId='guge';
        }
        else if(val=='bingli'){
          this.title='化验单分析';
           this.routeId='bingli';
        }
        else if(val=='pifu'){
          this.title='皮肤分析';
           this.routeId='6.1.8';
        }
        else if(val=='wenzi'){
          this.title='手写文字识别';
           this.routeId='wenzi';
        }
        else if(val=='shetai'){
          this.title='舌苔检查';
           this.routeId='shetai';
        }
        else if(val=='yingxiang'){
           this.isShow=false;
          this.title='影响分析';
          window.open('https://bi.yzsmart.top/view/report.do?reportId=6ba06067b77b4e668aa43e89263ffcbb')
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
      /*border: 1px solid;*/
      height: 35px;
      width: 113px;
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
        left: 168px;
        top: 210px;
      }
      &.ai_item2{
        left: 323px;
        top: 366px;
      }
      &.ai_item3{
        left: 663px;
        top: 303px;
      }
      &.ai_item4{
        left: 527px;
        top: 321px;
      }
      &.ai_item5{
        left: 829px;
        top: 209px;
      }
      &.ai_item6{
          left: 864px;
      }
    }
  }
}
</style>
