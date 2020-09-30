<template>
  <div class="product" ref="productRef">
      <div class="product_detail_container" v-for="(item,index) in productData" :key="index" ref="product_detail_container">
          <div class="img">
              <img :src="item.img"  class="big_img">
              <img :src="bofang" class="bofang" v-show="listType == 'shipinshibie'">
          </div>
          <div class="title">
            {{item.title}}
            <div class="hot" v-if="item.title=='词法分析'">
                <img src="../../assets/images/home/hot.png"  class="big_img">
            </div>
          </div>
          <div class="description">{{item.desc}}</div>
          <div class="btn" @click="jump(item.path)">了解详情</div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
      productData:{
        type:Array,
        required:true
      },
      listType:{
        type:String
      }
  },
  data(){
    return{
      bofang:require('@/assets/images/aiSmartAppList/bofang.png')
    }
  },
  mounted(){
    if(this.listType == 'shipinshibie' || this.listType =='ticketTextRecLiset'){
      this.$refs.productRef.style = 'justify-content: flex-start;';
      var prodcutArrDom = this.$refs.product_detail_container;
      prodcutArrDom[0].style='margin-right:40px';
    }
    if(this.listType ==  'yuyanchuli' ||  this.listType == 'otherTextRecList'){
      this.$refs.productRef.style = 'justify-content: flex-start;';
      var prodcutArrDom = this.$refs.product_detail_container;
      for(var i = 0;i < prodcutArrDom.length;i++){
        if(i == 0 || i == 1 || i == 3 || i == 4 || i == 6){
          prodcutArrDom[i].style='margin-right:40px';
        }
        else{
          prodcutArrDom[i].style='margin-right:0px';
        }
      }
      
    }
  },
  methods:{
    jump(arg){
      console.log(arg)
      //if(arg=="词法分析"){
         this.$router.push({
            path:arg,
            query:{
              type:1
            }
          });
      //}
      

    }
  }

}
</script>

<style scoped lang='less'>
.product{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    .product_detail_container{
      width:30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .img{
        width: 100%;
        position: relative;
        .big_img{
          width: 100%;
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
        .hot{
          width:35px;
          display: inline-block;
          vertical-align: super;
          img{
            width: 100%;
            display: block
          }
        }
      }
      .description{
        margin-top: 10px;
        font-size: 14px;
        color: #7A8499;
        line-height: 26px;
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
      }
      .btn:hover{
          cursor: pointer;
      }
}
}
</style>
