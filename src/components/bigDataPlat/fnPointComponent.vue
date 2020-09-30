<template>
  <div class="fnPoint_container" ref="fnPoint_container">
    <div class="title">{{funtext.title}}</div>
    <div class="desc">{{funtext.desc}}</div>
    <div class="introduce_container">
        <div v-for="(item,index) in funtext.function_text" :key="index" class="introduce">
            <div class="left">
                <img :src="item.img" alt="" srcset="">
            </div>
            <div class="right">
                <div>{{item.title}}</div>
                <div>{{item.desc}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      funtext: {
        type: Object,
        required: true
      },
      pointType:{
          type:Number,
          required:true
      }
    },
    mounted(){
        if(this.pointType == 2){
            var fnPointDom = this.$refs.fnPoint_container;
            fnPointDom.style='background-color: rgba(242,244,247,0.4);';
        }
    }
  }
</script>

<style scoped lang='less'>
.fnPoint_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
    .title{
        width: 1200px;
        font-size: 36px;
        color: #121C33;
        text-align: center;
    }
    .desc{
        width: 1200px;
        margin-top: 10px;
        margin-bottom: 50px;
        font-size: 16px;
        color: #B8BECC;
        text-align: center;
        line-height: 27px;
    }
    .introduce_container {
        width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .introduce {
            display: flex;
            align-items: flex-start;
            width: 50%;
            margin-bottom: 30px;
            .left {
                width: 21%;
                margin-right: 12px;
                img {
                width: 80px;
                }
            }
            .right {
                width: 70%;
                div:nth-child(1) {
                font-size: 18px;
                color: #121C33;
                margin-bottom: 11px;
                }
                div:nth-child(2) {
                font-size: 14px;
                color: #7A8499;
                line-height: 22px;
                }
            }
        }
  }
}
</style>
