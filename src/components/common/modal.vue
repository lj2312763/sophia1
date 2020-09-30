<template>
  <div class="modal-dialog">
     <Modal v-model="visible" :footer-hide="true"  @on-cancel="cancle" class-name="vertical-center" width="1200" height="90%">
        <div class="iframe-box" id="iframe-box">
          <iframe :src="url" frameborder="none" width="100%" height="100%" class="iframe" scrolling="yes" :style="{border:'none'}"></iframe>
        </div>
     </Modal>
  </div>
</template>

<script>
   export default {
        props:['iframeUrl'],
        data () {
            return {
                visible:false,
                url:'',
            }
        },
        created(){
            this.url=this.iframeUrl,
            this.visible=true;
        },
        methods: {
            cancle () {
                this.$emit("closeModal")
                //this.$refs["formItem"].resetFields();
            }
        }
    }
</script>

<style lang='less'>
.iframe-box {
  width:100%;
  height: 100%;
}
.vertical-center{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .ivu-modal{
          height: 90%;
        }
        .ivu-modal-content{
          height: 100%;
        }
        .ivu-modal-body{
          height: 100%;
        }
    }
   
</style>
