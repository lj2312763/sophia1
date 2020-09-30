<template>
  <div class="footer_copy_container">
    <div class="footer_container">
        <div class="copyleft">
          <span>Sophia</span>
          <span>YUANZHI AI Research Institute</span>
        </div>
        <div class="copyright">
          <span>Copyright © YUANZHI Co.,Ltd. 保留所有权利  京ICP备20018041号-3  版权所有：元知智能研究院</span>
          <span><img src="../../assets/images/new_index/earth.png" alt=""></span>
          <span>EN</span>
        </div>
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
  height: 70px;
  background: #2D3240;
  .footer_container{
    width: 1200px;
    margin:auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .copyleft{
      span:nth-child(1){
        font-size: 24px;
        color: #FFFFFF;
        margin-right: 13px;
      }
      span:nth-child(2){
        opacity: 0.6;
        font-size: 14px;
        color: #FFFFFF;
      }
    }
    .copyright{
        text-align: right;
        opacity: 0.8;
        font-size: 14px;
        color: #F2F4F7;
        display: flex;
        align-items: center;
      span:nth-child(1){
        margin-right: 30px;
      }
      span:nth-child(2){
        display: inline-block;
        width:20px;
        margin-right: 9px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
}

}
</style>
