<template>
  <div class="subHeader">
    <div class="header_content">
      <span class="title">{{info.title}} &nbsp;</span>
      <span class="subTitle"> &nbsp; > &nbsp;{{info.subTitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['info'],
  data () {
    return {
    }
  },
  created(){
  },
  methods:{
  }
}
</script>

<style scoped lang='less'>
.subHeader{
  height: 36px;
  position: fixed;
  width:100%;
  top:60px;
  left:0;
  background: #fff;
  z-index: 12;
  // box-shadow: 0 6px 6px 0 rgba(122,132,153,0.43);
  border-top: 1px solid #F2F4F7;
  border-bottom: 1px solid #F2F4F7;
  .header_content{
    width: 1200px;
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;
    .title{
      font-size: 12px;
      color: #3D4966;
    }
    .subTitle{
      font-size: 12px;
      color: #B8BECC;
    }
   
  }
}

</style>
