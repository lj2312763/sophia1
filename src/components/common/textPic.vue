<template>
   <div class="content">
      <p class="title">{{textImg.title}}</p>
      <div class="intro">{{textImg.intro}}</div>
      <div class="textImg">
         <img :src="textImg.url" alt="">
      </div>
    </div>
</template>

<script>
export default {
  props:['textImg'],
  data () {
    return {

    }
  },
  components:{
  },
  created(){
    console.log(this.textImg)
  },
  methods:{
    jump(val){
      console.log(val)
    }
  }
}
</script>

<style scoped lang='less'>
.content{
  width:1200px;
  margin: auto;
  margin-bottom: 80px;
  .title{
    font-size: 36px;
    color: #121C33;
    text-align: center;
    margin-bottom: 10px;
  }
  .intro{
    width:509px;
    margin: auto;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    margin-bottom: 20px
  }
  .textImg{
    width:100%;
      img{
        width: 100%;
        display: block;
      }
  }
}
</style>
