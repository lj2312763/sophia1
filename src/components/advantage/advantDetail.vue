<template>
  <div class="advant">
    <div v-for="(item,index) in advantext" :key="index" class="advant_container" ref="advant_container">
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
      advantext: {
        type: Array,
        required: true
      }
    },
    mounted(){
      if(this.$refs.advant_container){
        var advantext = this.advantext;
        var advantDom = this.$refs.advant_container;
        var detaiType;
        for(var i = 0;i < advantext.length;i++){
          detaiType = advantext[i].detailType;
          break;
        }
        if(detaiType == 'returnPerRecDetail' || detaiType == 'netWorkPicRecDetail'){
          for(var j = 0;j < advantDom.length;j++){
            advantDom[j].style='width:50%';
          }
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  .advant {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .advant_container {
      display: flex;
      align-items: start;
      width: 32%;
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
