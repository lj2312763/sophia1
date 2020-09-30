<template>
    <div class="product">
        <Row :gutter="40" type="flex" align="middle">
          <i-col :span="24/num" v-for="(item,index) in textImg" :key="index">
              <div class="img">
                  <img :src="imgbaseUrl+'?fileId='+item.productFileId"/>
              </div>
              <div class="title">
                <span>
                  {{item.productName}}
                   <!-- <div class="hot" v-if="item.hot">
                     <img v-if="item.hot=='hot'" src="../../assets/images/home/hot.png"  class="big_img">
                     <img v-if="item.hot=='new'" src="../../assets/images/home/new.png"  class="big_img">
                   </div> -->
                </span>
              </div>
              <div class="description">{{item.productDesc}}</div>
              <div class="btn" @click="jump(item)">了解详情</div>
          </i-col>
        </Row>
      </div>
</template>

<script>
export default {
  props:['textImg','imgbaseUrl','num'],
  data () {
    return {

    }
  },
  created(){

  },
  methods:{
    jump(val){
      this.$router.push({
        path:'/aiDetail',
        query:{
          oneId:this.$route.query.oneId,
          twoRouteId:this.$route.query.routeId,
          routeId:val.routeId,
          type:1,
        }
      });
    }
  }
}
</script>
<style scoped lang='less'>
.product{
      .img{
        width: 100%;
        position: relative;
        min-height: 197px;
        img{width: 100%;display: block;}
        .big_img{
          width: 100%;
          display: block;
        }
        .bofang{
          width: 40px;
          height: 40px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .title{
        margin-top: 30px;
        font-size: 22px;
        color: #121C33;
        span{
           position: relative;
           .hot{
              width:35px;
              position: absolute;
              right:-38px;
              top:-5px;
              img{
                width: 100%;
                display: block
              }
            }
        }
       
        
      }
      .description{
        margin-top: 10px;
        font-size: 14px;
        color: #7A8499;
        line-height: 26px;
        height: 50px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .btn{
        margin-top: 30px;
        margin-bottom: 50px;
        border: 1px solid #03A971;
        color:#03A971;
        border-radius: 3px;
        border-radius: 3px;
        width: 30%;
        text-align: center;
        padding: 2px 0;
        cursor:pointer
      }
      .btn:hover{
          cursor: pointer;
      }
}
</style>
