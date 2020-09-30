<template>
  <div class="product">
      <div v-for="(item,index) in advantext" :key="index" class="product_container" ref="advant">
          <div class="left">
              <img :src="item.img" alt="" srcset="">
          </div>
          <div class="right">
              <div>{{item.title}}</div>
              <div>{{item.desc}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    advantext:{
        type:Array,
        required:true
    },
    type:{
        type:Number,
        required:true,
        default:1
    }
  },
  mounted(){
      if(this.type == 1){
          if(this.$refs.advant){
            var domArr = this.$refs.advant;
            for(var i=0;i<domArr.length;i++){
                domArr[i].style='width:30%;';
            }
          }
      }
  }
}
</script>

<style scoped lang='less'>
.product{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .product_container{
        display: flex;
        align-items: center;
        width: 30%;
        margin-bottom: 30px;
        .left{
            width: 21%;
            margin-right: 12px;
            img{
                width: 100%;
            }
        }
        .right{
            width: 70%;
            div:nth-child(1){
                font-size: 18px;
                color: #121C33;
                margin-bottom: 11px;
            }
            div:nth-child(2){
                font-size: 14px;
                color: #7A8499;
                line-height: 22px;
            }
        }
    }
}
</style>
