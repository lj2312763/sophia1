<template>
    <div class="aiSyntax">
      <div class="left">
        <div class="title">活体检测（SDK）</div>
        <div class="desc">在身份验证的业务场景下确定对象的真实生理特征,检测其是否为“真人”,有效抵御照片、视频、3D模具等作弊手段,保障业务安全性</div>
        <div class="btn" @click="downLoad">立即下载</div>
      </div>
      <div class="right">
        <img :src="phone" alt="">
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        phone:require('@/assets/images/trialcenter/phone.png'),
      };
    },
    methods: {
      downLoad(){
        location.href="https://sophia-portal-files.yzsmart.top/app/SophiaFaceDemo-v0909.apk";
      },
    }
  };
</script>

<style scoped lang='less'>
img{
  width: 100%;
  display: block;
}
 .aiSyntax{
   width: 1200px;
   padding-top: 46px;
   margin: auto;
   display: flex;
   .left{
     flex:1;
     .title{
       margin-top: 107px;
       font-size: 22px;
      color: #121C33;
     }
     .desc{
       margin-top: 10px;
       font-size: 14px;
      color: #7A8499;
      line-height: 26px;
      margin-bottom: 73px;
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
         cursor: pointer;
      }
   }
   .right{
     width: 663px;
   }
 }
</style>
