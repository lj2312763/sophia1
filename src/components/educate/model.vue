<template>
<div>
  <div class="aiSyntax">
    <div class="banner" :style="{backgroundImage:'url(' + educate.banner + ')'}">
      <div class="banner_contant">
        <div class="desc">
          <div class="desc1">算法建模</div>
          <div class="desc2">提供傻瓜式、可视化操作的算法建模服务</div>
        </div>
        <div class="btn">
          <span @click="jump1">合作咨询</span>
        </div>
      </div>
    </div>
        <div  class="day_container">
            <div class="ai_content">
                <div class="ai_title">
                算法建模
                </div>
            </div>
        </div>
        <div  class="pic_container">
            <div class="ai_content">
               <img src="../../assets/images/liveHood/sf1.png" alt="">
               <div class="ai_item ai_item1" :class="{'active1':currentId==1}" @click="fnClick(1)">
                  <img src="../../assets/images/liveHood/1.png" alt="">
                  <div class="intro">
                      <p>导入数据</p>
                  </div>
               </div>
               <div class="ai_item ai_item2" :class="{'active1':currentId==2}" @click="fnClick(2)">
                  <img src="../../assets/images/liveHood/2.png" alt="">
                  <div class="intro">
                      <p>数据处理</p>
                  </div>
                </div>
               <div class="ai_item ai_item3" :class="{'active1':currentId==3}"  @click="fnClick(3)">
                   <img src="../../assets/images/liveHood/3.png" alt="">
                  <div class="intro">
                      <p>数据探索</p>
                  </div>
                </div>
               <div class="ai_item ai_item4" :class="{'active1':currentId==4}"  @click="fnClick(4)">
                  <img src="../../assets/images/liveHood/4.png" alt="">
                  <div class="intro">
                      <p>算法训练</p>
                  </div>
                </div>
               <div class="ai_item ai_item5" :class="{'active1':currentId==5}" @click="fnClick(5)">
                   <img src="../../assets/images/liveHood/5.png" alt="">
                  <div class="intro">
                      <p>模型评估</p>
                  </div>
               </div>
               <div class="ai_item ai_item6" :class="{'active1':currentId==6}" @click="fnClick(6)">
                  <img src="../../assets/images/liveHood/6.png" alt="">
                  <div class="intro">
                      <p>模型预测</p>
                  </div>
               </div>
            </div>
        </div>
    </div>
  <wisEducation :routeId="routeId" :title="title" :categoryList="categoryList" v-if="isShow&&routeId==1" @closeWindow="closeWindow" @getTableName="getTableName"></wisEducation>
  <wisEducation1 :routeId="routeId" :title="title" :tableName="tableName" v-if="isShow&&routeId==2" @closeWindow="closeWindow"></wisEducation1>
  <wisEducation2 :routeId="routeId" :title="title" :tableName="tableName" v-if="isShow&&routeId==3" @closeWindow="closeWindow"></wisEducation2>
  <wisEducation3 :routeId="routeId" :title="title" v-if="isShow&&routeId==4" @closeWindow="closeWindow"></wisEducation3>
  <wisEducation4 :routeId="routeId" :title="title" v-if="isShow&&routeId==5" @closeWindow="closeWindow"></wisEducation4>
  <wisEducation5 :routeId="routeId" :title="title" v-if="isShow&&routeId==6" @closeWindow="closeWindow"></wisEducation5>
</div>
</template>

<script>

import wisEducation from "../experienceColl/wisEducation/wisModel";
import wisEducation1 from "../experienceColl/wisEducation/wisModel1";
import wisEducation2 from "../experienceColl/wisEducation/wisModel2";
import wisEducation3 from "../experienceColl/wisEducation/wisModel3";
import wisEducation4 from "../experienceColl/wisEducation/wisModel4";
import wisEducation5 from "../experienceColl/wisEducation/wisModel5";
export default {
  data() {
    return {
      isShow:false,
      educate:{
          banner:require('@/assets/images/liveHood/suanfa.png'),
      },
      currentId: 1,
      title:'',
      routeId:'',
      timer:null,
      tableName:"b151f0e1c1d94d6fb49900e4fefbc5eb", // 异常值处理 暂时写死的表，等上传第一步上传结构通了，就把该默认值去除
      // tableName:"0ba5615aadaa4a8aa5ca24af0f751d78",// 数据预处理 暂时写死的表
      // tableName: '',
      categoryList:[],
    };
  },
  components: {
    wisEducation,wisEducation1,wisEducation2,wisEducation3,wisEducation4,wisEducation5
  },
  created(){
    this.goLogin();
  },
  mounted() {
    this.initData();
  },
  methods: {
    initCate(){
      this.$axios({
        method: "get",
        url: window.config.dataUrl+"/data/myData/getUserClassification",
      }).then(res => {
        if (res.data.code == 200000) {
              this.categoryList=res.data.data;
              console.log(this.categoryList)
            }
      }).catch(err => {

      });
    },
    goLogin(){
      this.$axios({
        method: "post",
        url: window.config.dataUrl+"/ucenter/user/login",
        data:{
          userPhone: '123',
          password: 'admin',
        }
      }).then(res => {
        if (res.data.code == 200000) {
            localStorage.setItem("yk-token",res.data.data);
            this.initCate()
        }
      }).catch(err => {

      });
    },
    getTableName(code){
      this.tableName=code;
      console.log(this.tableName)
    },
     jump1(){
       let routerUrl = this.$router.resolve({
            path:'/zixun',
            query:{
              ques:'算法建模'
            }
        });
        window.open(routerUrl.href,'_blank')
    },
    closeWindow(){
        this.isShow=false;
    },
    fnClick(val){
        this.isShow=true;
        if(val==6){
          this.title='模型预测';
           this.routeId=val;
        }else if(val==5){
          this.title='模型评估';
           this.routeId=val;
        }
        else if(val==4){
          this.title='算法训练';
           this.routeId=val;
        }
        else if(val==3){
          this.title='数据探索';
           this.routeId=val;
        }
        else if(val==2){
          this.title='数据处理';
           this.routeId=val;
        }
        else if(val==1){
          this.title='导入数据';
           this.routeId=val;
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
        top:20px;
        width:80px;
        font-size: 18px;
        color: #121C33;
        // p:nth-child(1){
        //   margin-bottom: 10px;
        // }
      }
      &.active1{
        img{
          animation: scale 1.5s linear infinite;
        }
      }
      &.ai_item1{
        left: 40px;
        top: 100px;
        .intro{
          position: absolute;
          left:-90px;
          top:20px;
          width:150px;
          font-size: 18px;
          color: #121C33;
        }
      }
      &.ai_item2{
        left: 610px;
        top: 300px;
      }
      &.ai_item3{
        left: 141px;
        top: 627px;
      }
      &.ai_item4{
        left: 447px;
        top: 471px;
      }
      &.ai_item5{
        left: 1079px;
        top: 541px;
      }
      &.ai_item6{
          left: 586px;
          top: 1060px;
      }
    }
  }
}
</style>
