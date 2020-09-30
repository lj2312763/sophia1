<template>
   <div class="banner">
      <div class="box" ><img :src="banner.url" alt=""></div>
      <div class="content">
        <p class="title">{{banner.title}}</p>
        <div class="intro">{{banner.intro}}</div>
        <div class="button">
          <i-button type="success" size="large" @click="jump(banner.btn.btn1)">{{banner.btn.btn1.text}}</i-button>
          <i-button @click="jump1(banner.btn.btn2)"  size="large" ghost>{{banner.btn.btn2.text}}</i-button>
          <i-button @click="jump2(banner.btn.btn3)"  size="large" ghost>{{banner.btn.btn3.text}}</i-button>
        </div>
      </div>
       <!-- <Apply v-if="isShow" @closeDialog="closeDialog"></Apply> -->
       <vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin>
    </div>
</template>
<script>
// import Apply from "./apply";
import vLogin from "@/components/login/login";
export default {
  props:['banner'],
  data () {
    return {
      isShow:false,
    }
  },
  components:{
    // Apply,
    vLogin
  },
  watch:{
  },
  methods:{
    jump(val){
      if(val.id==0){
         this.$router.push({
          path:val.path,
          query:{
            type:val.query,
          }
        })
      }else{
         location.href=val.path;
      }
     
    },
    jump1(){
      this.isShow=true;
    },
    jump2(val){
       this.$router.push({
        path:val.path,
        query:{
          type:val.query,
          id:val.id,
          subId:val.subId?val.subId:''
        }
      })
    },
    closeDialog(){
      this.isShow=false;
    }
  }
}
</script>

<style scoped lang='less'>
.banner{
    position:relative;
    display: flex;
    align-items: center;
    height: 450px;
    margin-bottom: 60px;
    .box{
      width:100%;
      height: 100%;
      overflow: hidden;
      img{
        display: block;
        width: 100%;
        height:100%;
        object-fit: cover;
        object-position: center center;
      }
    }
    .content{
      width:1200px;
      position: absolute;
      left:0;
      right: 0;
      margin: auto;
      color: #FFFFFF;
      .title{
        font-size: 36px;
        margin-bottom: 15px;
      }
      .intro{
        width:454px;
        margin-bottom: 32px;
        font-size: 16px;
        line-height: 32px;
      }
      .ivu-btn-large{
        padding:8px 32px;
        border-radius: 3px;
      }
      .ivu-btn{
        margin-right: 40px
      }
    }
}
</style>
