<template>
    <div class="fnIntro_container">
        <Row :gutter="50" type="flex">
          <i-col :span="24/2" v-for="(item,index) in textImg" :key="index">
            <div class="one">
              <div class="left">
                <img :src="imgbaseUrl+item.fileUrl"/>
              </div>
              <div class="right">
                <div class="title">{{item.featureName}}</div>
                <div class="desc">{{item.featureDesc}}</div>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
</template>

<script>
export default {
  props:['textImg','imgbaseUrl','num'],
  data () {
    return {

    }
  },
  created(){
    console.log(this.num,'特色优势')
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
        margin-bottom: 40px;
        align-items: flex-start;
        .left {
          width: 60px;
          display: flex;
          align-items: center;
          margin-right: 12px;
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
            text-align: justify;
          }
        }
      }
    }
</style>
