<template>
  <div class="main">
    <div class="title">元知人脸相似度对比</div>
    <renlianduibi></renlianduibi>
  </div>
</template>

<script>
import renlianduibi from './renlianduibi';
export default {
  data () {
    return {
      isShow:false,
      info:null,
      currentIndex:-1
    }
  },
  created(){
    if(this.$route.query.title){
      if(this.$route.query.title==1){
          this.info={
            title:'元知人脸相似度对比',
            subTitle:this.$route.query.subTitle
          }
      }else{
        this.info=null;
      }
    }
  },
  watch:{
    $route(newVal,oldVal){
      if(newVal.query.title==1){
          this.info={
            title:'元知人脸相似度对比',
            subTitle:newVal.query.subTitle
          }
      }else{
         this.info=null;
      }
    }
  },
  components:{
    renlianduibi
  },
  mounted(){
    if(this.$route.path!="/experienceColl"){
      this.initScroll();
    }
  },
  methods:{
    initScroll() {
      let _this = this;
      window.addEventListener("scroll", function() {
         let pos = document.body.scrollTop || document.documentElement.scrollTop;
         if(pos>100){
           _this.isShow=true;
         }else{
           _this.isShow=false;
         }
      });
    },
  }
}
</script>
<style scoped lang="less">
.main{
  width: 90%;
  margin: 0 auto;
  .title{
    color: #121C33;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

</style>

