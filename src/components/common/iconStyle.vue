<template>
    <div class="fnIntro_container">
        <Row :gutter="textImg.gutter">
          <i-col :span="textImg.span" v-for="(item,index) in textImg.list" :key="index">
            <div class="one">
              <div class="left">
                <img :src="item.img"/>
              </div>
              <div class="right">
                <div class="title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
</template>

<script>
export default {
  props:['textImg','num'],
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
 .fnIntro_container {
      width: 100%;
      .one {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .left {
          width: 60px;
          display: flex;
          align-items: center;
          margin-right: 15px;
          img {
            width: 100%;
            display: block;
          }
        }
        .right {
          flex: 1;
          padding-right: 40px;
          .title {
            font-size: 18px;
            color: #121c33;
            margin-bottom: 11px;
          }
          .desc {
            font-size: 14px;
            color: #7a8499;
            line-height: 22px;
          }
        }
      }
    }
</style>
