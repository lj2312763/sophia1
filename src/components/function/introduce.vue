<template>
  <div class="introduce" ref="introduce">
    <div v-for="(item,index) in funtext" :key="index" class="introduce_container" ref="introduce_container">
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
    props: {
      funtext: {
        type: Array,
        required: true
      },
      detailType:{
        type:String
      }
    },
    data() {
      return {}
    },
    mounted(){
      var detailType = this.detailType;
      var introDom = this.$refs.introduce_container;
      if(detailType == 'searchdetail' || detailType == 'optionanaly' || detailType == 'aiIdentity' || detailType =='aiSemantic' || detailType =='netWorkPicRecDetail' || detailType == 'tableTextRecDetail' || detailType == 'numberRecDetail' || detailType == 'rqCodeRecDetail' || detailType == 'sealDetectDetail'){
        this.$refs.introduce.style = 'justify-content: flex-start;'
        for(var i = 0;i < introDom.length;i++){
          introDom[i].style = 'width:50%';
        }
      }
    },
    components: {}
  }
</script>

<style scoped lang='less'>
  .introduce {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .introduce_container {
      display: flex;
      align-items: flex-start;
      width: 30%;
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
</style>
