<template>
  <div class="downLoad">
     <!-- v-if="path=='fenxi'" -->
    <img src="../../assets/images/new_index/fenxi.png" v-if="path=='fenxi'"/>
    <img src="../../assets/images/new_index/fuwu.png" v-if="path=='fuwu'" alt="">
    <img src="../../assets/images/new_index/BI.png" v-if="path=='BI'" alt="">
    <div class="button btn1" @click="jump1()" v-if="path!='fenxi'"></div>
    <div class="button btn2" @click="jump2()"></div>
    <div class="button btn3" @click="jump3()" v-if="path!='fenxi'"></div>
    <vLogin v-show="ifShowLogin" @closeLoginWin="closeLoginWin"></vLogin>
  </div>
</template>

<script>
import vLogin from "@/components/login/login";
export default {
  components: {
    vLogin,
  },
  data () {
    return {
      path:'',
      pdf:'',
      zip:'',
      downloadUrl:'',
      ifShowLogin:false,
    }
  },
  created(){
    this.path=this.$route.query.path;
  },
  methods:{
    closeLoginWin(arg) {
      this.ifShowLogin = arg;
      if(localStorage.username){
        if(this.downloadUrl){
          location.href=this.downloadUrl;
        }
      }
      
    },
    downLoad(item){
      this.downloadUrl=window.config.url+"/ai/zip/open_source_services/"+item.filename;
      if(!localStorage.username){
        this.ifShowLogin = true;
      }else{
        location.href=this.downloadUrl;
      }
    },
    jump1(){
      if(this.path=="fenxi"){

      }else if(this.path=="fuwu"){
         //location.href=window.config.url+'/ai/zip/open_source_services/'+"cm5.1.3_x86_64.tar.gz";
        // location.href='https://www.yzsophia.com/ai/zip/open_source_services/cm5.1.3_x86_64.tar.gz';
         this.downloadUrl=window.config.url+'/ai/zip/open_source_services/'+"cm5.1.3_x86_64.tar.gz";
         //this.downloadUrl='https://www.yzsophia.com/ai/zip/open_source_services/cm5.1.3_x86_64.tar.gz';
        if(!localStorage.username){
          this.ifShowLogin = true;
        }else{
          location.href=this.downloadUrl;
        }
      }else if(this.path=="BI"){
         window.open("'http://39.105.98.186/workbench/home.do#/report/list",'_blank');
      }
    },
    jump2(){
      if(this.path=="fenxi"){

      }else if(this.path=="fuwu"){
         //window.open("https://www.yzsophia.com/kyfysm/大数据平台.pdf",'_blank');
         window.open(window.config.url+"/kyfysm/大数据平台.pdf",'_blank');
         //window.open(this.$route.query.pdf,'_blank');
      }else if(this.path=="BI"){

      }
    },
    jump3(){
      if(this.path=="fenxi"){

      }else if(this.path=="fuwu"){
        this.jump1()
      }else if(this.path=="BI"){

      }
    }
  }
}
</script>
<style scoped lang='less'>
img{
  width: 100%;
  display: block;
}
.downLoad{
  position: relative;
  .button{
    position: absolute;
    width:120px;
    height: 48px;
    cursor: pointer;
    &.btn1{
      left:99px;
      top:182px;
    }
    &.btn2{
      left:240px;
      top:182px;
    }
    &.btn3{
      left:577px;
      bottom:47px;
    }
  }
}
</style>


