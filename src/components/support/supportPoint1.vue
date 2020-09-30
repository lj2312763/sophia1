<template>
  <div class="product">
        <Row :gutter="50">
            <i-col :span="24/num" v-for="(item,index) in supportext" :key="index" >
                <div class="product_container">
                    <div class="title">{{item.chatName}}</div>
                    <div class="desc">{{item.chatDesc}}</div>
                    <div class="btn" @click="jump(index)">{{item.label}}<img :src="toRight"></div>
                </div>
            </i-col>
        </Row>
        <Suggest v-if="isShow" @closeDialog="closeDialog"></Suggest>
        <vLogin v-if="ifShowLogin" @closeLoginWin="closeLoginWin"></vLogin>
  </div>
</template>

<script>
import Suggest from "../common/suggest";
import vLogin from "../login/login";
export default {
  props:['supportext','num','pdfUrl','oneId','twoRouteId','routeId','moduleName'],
  created(){
  },
  data () {
    return {
        isShow:false,
        toRight:require('../../assets/images/new_nav/toRight.png'),
        ifShowLogin: false,
    }
  },
  components:{
      Suggest,
      vLogin
  },
  methods:{
    jump(val){
        if(val==0){
            this.$router.push({
                path:'/guide',
                query:{
                    type:1,
                }
            })
        }else if(val==1){
            //  this.$router.push({
            //     path:'/aiDocument',
            //     query:{
            //         type:1,
            //     }
            // })
            // var ifExist = localStorage.username;
            var pdfUrl = this.pdfUrl;
            // if(ifExist){
                if(pdfUrl){
                     let routerUrl = this.$router.resolve({
                        path:'/allDocument',
                        query:{
                            oneId:this.oneId,
                            twoRouteId:this.twoRouteId,
                            routeId:this.routeId,
                            moduleName:this.moduleName
                        }
                    });
                    window.open(routerUrl.href,'_blank')
                }
                else{
                    this.$Message.error('返回链接地址为空');
                }
            // }
            // else{
            //     this.ifShowLogin = true;
            // }
        }else if(val==2){
            this.isShow=true;
        }
    },
    closeDialog(){
        this.isShow=false;
    },
    closeLoginWin(arg) {
      this.ifShowLogin = arg;
      var pdfUrl = this.pdfUrl;
    //   var ifExist = localStorage.username;
    //   if(ifExist){
        window.open(pdfUrl,'_blank');
    //   }
    },
  }
}
</script>

<style scoped lang='less'>
.product{
    width:100%;
    display: block;
    .product_container{
        // padding:28px 30px;
        // margin-bottom: 20px;
        padding: 28px 30px;
        width: 380px;
        position: relative;
        height: 208px;
        &:hover{
            box-shadow: 0 0 35px 0 rgba(235,236,240,0.70);
        }
        .title{
            font-size: 18px;
            color: #121C33;
            margin-bottom: 8px;
        }
        .desc{
            font-size: 14px;
            color: #7A8499;
            line-height: 22px;
            margin-bottom: 29px;
        }
        .btn{
            position: absolute;
            left: 30px;
            bottom: 42px;
            width: 45%;
            color: #03A971;
            display: flex;
            align-items: center;
            img{
                width: 28px;
                height: 10px;
                margin-left: 9px;
            }
        }
        .btn:hover{
            cursor: pointer;
        }
    }

}
</style>
