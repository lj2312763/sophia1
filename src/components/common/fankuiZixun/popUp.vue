<template>
  <div class="pop_up_container">
      <div class="pop_up">
          <div class="close_icon" @click="closePop">
              <img :src="closeIcon" alt="" srcset="">
          </div>
          <div class="dui_container">
              <img :src="success">
          </div>
          <div class="title">提交成功</div>
          <div class="desc">{{msg}}</div>
          <div class="sure_btn">确定</div>
      </div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
              success:require('../../../assets/images/common/success.png'),
              closeIcon:require('../../../assets/images/login/dialog_button_close_normal.png')
          }
      },
      props:{
          msg:{
              type:String,
              default:'',
              require:true
          }
      },
      methods:{
          closePop(){
              this.$emit('closePopWindow',false)
          }
      }
  }
</script>

<style scoped lang='less'>
.pop_up_container{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    z-index: 999999;
    .pop_up{
        width: 400px;
        height: 230px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .close_icon{
            position: absolute;
            top: 15px;
            right: 15px;
            width: 10px;
            height: 10px;
            img{
                width: 100%;
            }
        }
        .dui_container{
            width: 48px;
            height: 48px;
            margin-top: 35px;
            margin-bottom: 11px;
            img{
                width: 100%;
            }
        }
        .title{
            font-size: 18px;
            color: #121C33;
            letter-spacing: 0;
            margin-bottom: 4px;
        }
        .desc{
            font-size: 14px;
            color: #7A8499;
            letter-spacing: 0;
            text-align: center;
            margin-bottom: 31px;
        }
        .sure_btn{
            background: #03A971;
            border-radius: 4px;
            padding: 8px 34px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
        }
    }
}
</style>
