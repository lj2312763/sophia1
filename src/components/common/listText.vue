<template>
   <div class="content">
      <p class="title">{{textImg.title}}</p>
      <div class="intro">{{textImg.intro}}</div>
      <div class="textImg">
        <ul class="list">
          <li class="listTitle">{{textImg.listTitle}}</li>
          <li v-for="(item,index) in textImg.list" :key="index">{{item}}</li>
        </ul>
        <div class="pic">
          <img :src="textImg.url" alt="">
        </div>
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
    border: 1px solid #EBECF0;
    display: flex;
    // height:480px;
    .pic{
     flex:1;
      img{
        width: 100%;
        display: block;
      }
    }
    .list{
      padding:20px;
      width: 308px;
      .listTitle{
        font-size: 22px;
        color: #121C33;
      }
      li{
        list-style:none;
        font-size: 18px;
        color: #3D4966;
        margin-top: 20px
      }
    }
  }
}
</style>
