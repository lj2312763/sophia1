<template>
  <div class="wuyeInsightDetail_container">
    <div class="content_container">

      <div class="maininfo_area">
        <div class="top">
          <div class="top1">{{companyName}}</div>
          <div class="top2">
            <div class="top2_left">{{status}}</div>
            <div class="top2_right">{{wuyeLevel}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom_left">
            <div class="bottom_left_top">成立日期：{{chengliDate}}</div>
            <div class="bottom_left_bottom">邮箱： {{email}}</div>
          </div>
          <div class="bottom_right">
            <div class="bottom_right_top">官网：{{webSite}}</div>
            <div class="bottom_right_bottom">地址：{{address}}</div>
          </div>
        </div>
      </div>

      <div class="menu_container">
        <div class="item" ref="item" v-for="(item,index) in menuArr" :key="index" @click="changeInfo(index)">{{item}}</div>
      </div>

      <div class="com_container">
        <vBasic v-if="ifShowBasic" :basicData='basicData'></vBasic>
        <vCre :creData='creData' v-else></vCre>
      </div>

    </div>
  </div>
</template>

<script>
import vBasic from './wuyeBasic.vue';
import vCre from './wuyeCre.vue'
export default {
  data() {
    return{
      wuCompany:'万科物业发展股份有限公司',
      menuArr:['基本信息','信用信息'],
      ifShowBasic:true,
      companyName:'万科物业发展股份有限公司',
      status:'存续',
      wuyeLevel:'物业一级',
      chengliDate:'1990-10-10',
      email:'wy_info@vanke.com',
      webSite:'www.vankeservice.com',
      address:'深圳市福田区梅林路63号梅林万科中心',
      basicData:null,
      creData:{}
    }
  },
  created(){
    var data = JSON.parse(window.localStorage.getItem('data'));
    console.log(data);
    this.basicData = data;
    this.creData = data;
    this.companyName = data.companyName;
    this.status = data.status;
    this.wuyeLevel = this.wuyeLevel;
    this.chengliDate = data.registDate;
    this.email = data.email;
    this.webSite = data.url;
    this.address = data.address;
  },
  mounted(){
    var menuDom = this.$refs.item;
    menuDom[0].style = 'background: rgb(3, 169, 113);color: rgb(255, 255, 255);';
  },
  components:{
    vBasic,
    vCre
  },
  methods:{
    keyupviewDetail(){},
    changeInfo(index){
      var menuDom = this.$refs.item;
      for(var i = 0;i < menuDom.length;i++){
        if(i == index){
          menuDom[i].style = 'background: rgb(3, 169, 113);color: rgb(255, 255, 255);border:1px solid rgb(3, 169, 113)';
        }
        else{
          menuDom[i].style = 'color: #7A8499;background:none';
        }
      }
      if(index == 0){
        this.ifShowBasic = true;
      }
      else if(index == 1){
        this.ifShowBasic = false;
      }
    },
    searchWuyeDetial(){
      console.log('aadddccc')
    }
  }
};
</script>
<style scoped lang='less'>
.wuyeInsightDetail_container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content_container{
    width: 1200px;
    .search_area{
      width: 100%;
      height: 80px;
      margin-top: 40px;
      border:  1px solid #EBECF0;
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      .title{
        margin-right: 150px;
        font-size: 16px;
      }
      .search{
        width: 260px;
      }
    }
    .maininfo_area{
      margin-top: 40px;
      width: 100%;
      border: 1px solid #B8BECC;
      margin-bottom: 40px;
      padding: 20px;
      box-sizing: border-box;
      .top{
        .top1{
          font-size: 18px;
          color: #121C33;
          margin-bottom: 10px;
        }
        .top2{
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .top2_left{
            background-color:#03A971;
            margin-right: 15px;
            padding: 5px 10px;
            color: #fff;
            border-radius: 2px;
          }
          .top2_right{
            background-color: #03A971;
            padding: 5px 10px;
             color: #fff;
            border-radius: 2px;
          }
        }
      }
      .bottom{
        display: flex;
        .bottom_left,.bottom_right{
          margin-right: 110px;
          .bottom_left_top,.bottom_right_top{
            margin-bottom: 10px;
          }
        }
      }
    }
    .menu_container{
      width: 100%;
      display: flex;
      .item{
        width: 100px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
        border: 1px solid #B8BECC;
        border-bottom: none;
        cursor: pointer;
      }
    }
    .com_container{
      width: 100%;
      padding: 50px;
      border: 1px solid #B8BECC;
      margin-bottom: 50px;
    }
  }
}
</style>
