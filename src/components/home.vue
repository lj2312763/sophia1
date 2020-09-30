<template>
  <div class="main">
    <Header :info="info"></Header>
    <subHeader :info="info" v-if="info!=null"></subHeader>
    <div class="main_container">
      <div class="container" :class="{'containerActive':info!=null}">
        <!-- <transition  name="fade"> -->
          <router-view></router-view>
        <!-- </transition> -->
      </div>
    </div>
    <!--底部及版权组件-->
    <vFooterCopy></vFooterCopy>
    <div class="suggest" v-if="isShow">
        <div class="li" :class="{'liActive':currentIndex==index}" v-for="(item,index) in suggestList" :key="index" @mouseover="itemOver(item,index)" @mouseleave="itemleave(item,index)" @click="itemClick(item,index)">
            <div>
              <div class="icon"  v-if="currentIndex==index"><img :src="item.iconActive" alt=""></div>
              <div class="icon" v-else><img :src="item.icon" alt=""></div>
              <p>{{item.name}}</p>
            </div>
        </div>
    </div>
     <!-- <Back-top></Back-top> -->
  </div>
</template>

<script>
import Header from './common/header';
import vFooterCopy from '../components/footerCopyright/footerCopyright';
export default {
  data () {
    return {
      isShow:false,
      info:null,
      currentIndex:-1,
      suggestList:[
        {name:'功能体验',icon:require('@/assets/images/common/tiyan.png'),iconActive:require('@/assets/images/common/tiyan1.png')},
        {name:'反馈',icon:require('@/assets/images/common/fankui.png'),iconActive:require('@/assets/images/common/fankui1.png')},
        {name:'顶部',icon:require('@/assets/images/common/top.png'),iconActive:require('@/assets/images/common/top1.png')},
      ]
    }
  },
  created(){
    if(this.$route.query.title){
      if(this.$route.query.title==1){
          this.info={
            title:'首页',
            subTitle:this.$route.query.subTitle
          }
      }else if(this.$route.query.title==2){
           this.info={
            title:'技术服务',
            subTitle:this.$route.query.subTitle
          }
      }else if(this.$route.query.title==3){
          this.info={
            title:'大数据服务',
            subTitle:this.$route.query.subTitle
          }
      }
    }else{
      if(this.$route.path=="/allDocument"){
          this.info={
            title1:'大数据服务',
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
            title:'首页',
            subTitle:newVal.query.subTitle
          }
      }else if(newVal.query.title==2){
           this.info={
            title:'技术服务',
            subTitle:newVal.query.subTitle
          }
      }else if(newVal.query.title==3){
          this.info={
            title:'大数据服务',
            subTitle:newVal.query.subTitle
          }
      }else if(newVal.path=="/experienceColl"){
          this.isShow=false;
      }else if(newVal.path=="/allDocument"){
            this.info={
              title1:'大数据服务',
            }
      }else{
         this.info=null;
      }
    }
  },
  components:{
    Header,
    vFooterCopy,
  },
  mounted(){
    if(this.$route.path!="/experienceColl"){
      this.initScroll();
    }
  },
  methods:{
    itemleave(item,index){
      this.currentIndex=-1;
    },
    itemOver(item,index){
      this.currentIndex=index;
    },
    itemClick(item,index){
      if(index==0){
         let routerUrl = this.$router.resolve({
            path:'/experienceColl',
            query:{
              oneId:5,
              twoRouteId:'5.1',
              routeId:'5.1.1',
            }
        });
        window.open(routerUrl.href,'_blank')

      }else if(index==1){
         let routerUrl = this.$router.resolve({
            path:'/fankui',
            query:{
             title:1,
             subTitle:'反馈意见'
            }
        });
        window.open(routerUrl.href,'_blank')
        
      }else if(index==2){
         document.documentElement.scrollTop=0;
      }
    },
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
  height: 100%;
  .main_container{
    display: flex;
    min-height: calc(100% - 70px);
    .container{
      flex:1;
      padding-top: 60px;
      &.containerActive{
        padding-top: 96px;
      }
    }
  }
  
  .suggest{
    position: fixed;
    right:30px;
    bottom:30px;
    background: #FFFFFF;
    box-shadow: 0 3px 17px 0 #B8BECC;
    z-index: 1000;
    .li{
      width:60px;
      height:60px;
      background: #FFFFFF;
      border-bottom:1px solid #EBECF0;
      text-align: center;
      font-size: 10px;
      color: #121C33;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &.liActive{
          background: #03A971;
          color: #fff;
      }
      &:last-child{
       border-bottom:none
      }
      .icon{
        width:17px;
        margin:auto;
        margin-bottom: 6px;
        img{
          width:100%;
          display: block;
        }
      }
    }
  }
}

</style>

