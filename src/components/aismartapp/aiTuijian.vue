<template>
<div>
  <div class="layout">
     <Layout>
        <Content class="content">
            <iframe :src="url" frameborder="none" class="iframe" scrolling="yes" :style="{border:'none'}"></iframe>
        </Content>
    </Layout>
  </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                url:'',
                timer:null
            }
        },
        mounted(){
            this.goReal()
        },
        methods:{
            goReal(){
                this.url = 'https://sfdemo.cloud.sensorsdata.cn/dashboard/?project=RealEstate&dash_type=normal&id=1096&client=';
            }
        }
    }
</script>

<style scoped lang='less'>
.layout{
  width: 1200px;
  margin: auto;
  height:900px;
  margin-top: 20px;
  .ivu-layout{
    height: 100%;
    .ivu-layout-sider{
      background: #fff;
      height: 100%;
      padding:20px 0;
      padding-top:10px;
    }
    .content{
       height: 100%;
       padding:0 0 0 10px;
       background: #fff;
      .iframe{
        width: 100%;
        height: 97%;
      }
    }
  }
}
</style>
<style lang='less'>
  .ivu-tree-title {
    &:hover{
      background-color: #fff!important;
      color:#03A971
    }
  }
.layout{
  .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
    background-color: #fff;
    color:#03A971;
    border-left:2px solid #03A971;
  }
  .ivu-tree ul li {
        list-style: none;
        margin: 0;
        margin-bottom: 8px;
        padding:0;
        white-space: nowrap;
        outline: 0;
        .ivu-tree-title{
        width:90%;
        height: 100%;
        padding:0 0 0 7px;
        border-radius: 1px;
        }
        .ivu-tree-arrow{
        width: 0;
        }
    }
  
}

</style>
