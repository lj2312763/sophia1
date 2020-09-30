<template>
  <div>
    <Modal
        v-model="modal1"
        :footer-hide="true" 
        width="400"
        class-name="vertical-center-modal"
        @on-cancel="cancle">
        <div class="content">
          <div class="pic"><img src="../../../assets/images/common/success.png" alt=""></div>
          <p class="title">提交成功</p>
          <p class="desc">感谢您的支持，我们会尽快处理您的建议反馈</p>
          <div class="btn">
            <Button type="success" @click="cancle">确定</Button>
          </div>
        </div>
    </Modal>
  </div>
</template>

<script>
   export default {
        data () {
            return {
                modal1: true,
            }
        },
        methods: {
            cancle () {
                this.$emit("closeDialog")
            }
        }
    }
</script>

<style scoped lang='less'>
.content{
    padding:0 30px;
    .pic{
      width:48px;
      margin:auto;
      margin-bottom: 11px;
      margin-top: 19px;
      img{
        width: 100%;
        display: block;
      }
    }
    .title{
      font-size: 18px;
      color: #121C33;
      text-align: center;
      margin-bottom: 4px;
    }
    .desc{
      font-size: 14px;
      color: #7A8499;
      text-align: center;
      margin-bottom: 31px;
    }
    .btn{
      text-align: center;
    }
}
.ivu-form-item-content{
    .ivu-checkbox-wrapper{
         font-size: 12px !important;
        color: #B8BECC !important;
    }
   
}
</style>
<style lang='less'>
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>
