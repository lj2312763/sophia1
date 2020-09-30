<template>
  <div class="product">
        <Row :gutter="50">
            <i-col :span="24/num" v-for="(item,index) in supportext" :key="index" >
                <div class="product_container" @click="jump(item)">
                    <div class="title">{{item.moduleName}}</div>
                    <div class="desc">{{item.description.length > 44 ? item.description.substr(0,41) + ' . . . ' : item.description}}</div>
                    <div class="btn">查看更多<img :src="toRight"></div>
                </div>
            </i-col>
        </Row>
        <Suggest v-if="isShow" @closeDialog="closeDialog"></Suggest>
  </div>
</template>

<script>
import Suggest from "../common/suggest";
export default {
  props:['supportext','num'],
  created(){
  },
  data () {
    return {
        isShow:false,
        toRight:require('../../assets/images/new_nav/toRight.png')
    }
  },
  components:{
      Suggest
  },
  methods:{
      jump(item){
          if(item.category == 11111){
            let routerUrl = this.$router.resolve({
                path:'/serviceDetail',
                query:{
                    routeId:item.routeId,
                }
            });
            window.open(routerUrl.href,'_blank')
          }
          else{
            let routerUrl = this.$router.resolve({
                path:'/serviceDetailSimple',
                query:{
                    routeId:item.routeId,
                }
            });
            window.open(routerUrl.href,'_blank')
          }
      },
      closeDialog(){
        this.isShow=false;
     }
  }
}
</script>

<style scoped lang='less'>
.product{
    width:100%;
    display: block;
    .product_container{
        padding: 28px 30px;
        width: 380px;
        position: relative;
        height: 208px;
        &:hover{
            cursor: pointer;
            box-shadow: 0 0 35px 0 rgba(235,236,240,0.70);
        }
        .title{
            font-size: 18px;
            color: #121C33;
            margin-bottom: 8px;
        }
        .desc{
            height: 44px;
            font-size: 14px;
            color: #7A8499;
            line-height: 22px;
            margin-bottom: 29px;
            overflow: hidden;
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
