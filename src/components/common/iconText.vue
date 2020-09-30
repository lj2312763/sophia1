<template>
   <div class="content">
      <p class="title">{{textImg.title}}</p>
      <Row>
        <i-col span="6" v-for="(item,index) in textImg.list" :key="index">
          <div class="pic"><img :src="item.url" alt=""></div>
          <div class="subTitle">{{item.subTitle}}</div>
        </i-col>
    </Row>
    </div>
</template>

<script>
export default {
  props:['textImg'],
  data () {
    return {

    }
  },
  created(){
    console.log(this.textImg)
  },
  methods:{
  }
}
</script>

<style scoped lang='less'>
.content{
  width:1200px;
  margin: auto;
  margin-bottom: 80px;
  margin-top:-50px;
  .title{
    font-size: 22px;
    color: #121C33;
    text-align: center;
    margin-bottom: 30px;
  }
  .subTitle{
    font-size: 18px;
    color: #3D4966;
    text-align: center;
    margin-bottom: 40px;
  }
  .pic{
    width:80px;
    margin: auto;
    margin-bottom: 15px;
     img{
        width: 100%;
        display: block;
      }
  }
}
</style>
