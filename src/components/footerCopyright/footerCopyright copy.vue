<template>
  <div class="footer_copy_container">
    <div class="footer_container">
        <div>
          <span>Sophia</span>
          <span>YUANZHI AI Research Institute</span>
        </div>
    </div>
    <div class="line"></div>
    <div class="copyright">
      <p>Copyright @2020 YUANZHI Co.,Ltd. 保留所有权利  京ICP备19041462号  版权所有：元知智能研究院</p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
    }
}
</script>

<style scoped lang='less'>
.footer_copy_container{
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #2D3240;
  .footer_container{
    width: 1000px;
    height: 90px;
    display: flex;
    align-items: center;
    div{
      width: 100%;
      span:nth-child(1){
        font-size: 24px;
        color: #FFFFFF;
      }
      span:nth-child(2){
        opacity: 0.6;
        font-size: 14px;
        color: #FFFFFF;
      }
    }
}
.line{
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.10);
}
.copyright{
  width: 1000px;
  padding: 25px 0;
  p{
    opacity: 0.8;
    font-size: 14px;
    color: #C8CCCC;
  }
}
}
</style>
