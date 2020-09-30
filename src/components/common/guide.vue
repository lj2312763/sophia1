<template>
<div>
   <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left">
            <span  @click="$router.go(-1)">通用参考</span>
            <span>> {{title}}</span>
          </div>
        </div>
      </div>
    </div>
  <div class="layout">
     <Layout>
          <Sider class="slider">
            <Tree :data="document" @on-select-change="view"></Tree>
          </Sider>
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
                title:'',
                url:'',
                document:[
                    {
                        "id": "guide",
                        "title": "接入指引",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/guide/guide.html",
                    },
                    {
                        "id": "vertify",
                        "title": "接口鉴权认证",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/guide/vertify.html"
                    },
                    {
                        "id": "code",
                        "title": "返回码",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/guide/code.html"
                    },
                    {
                        "id": "ques",
                        "title": "常见问题",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/guide/ques.html"
                    },
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
          next(vm=>{
            if(from.name){
              vm.init("guide");
              localStorage.guideName="guide";
            }else{
              if(localStorage.guideName){
                  vm.init(localStorage.guideName);
              }
            }
              
          })

        },
        methods:{
          init(val){
             for(var i in this.document){
              if(this.document[i].id==val){
                this.document[i].expand=true;
                this.title=this.document[i].title;
                this.document[i]['selected']= true;
                this.url=this.document[i].path;
              }
            }
          },
          view(val){
            this.title=val[0].title;
            for(var i in this.document){
              if(this.document[i].selected){
                this.document[i].selected=false;
                localStorage.guideName=this.document[i].id;
              }else{
                if(this.document[i].children){
                  for(var m in this.document[i].children){
                    this.document[i].children[m]['selected']= false;
                  }
                }
                // else{
                //   this.document[i]['selected']= false;
                // }
              }
            }
          
            //console.log(val)
            if(val[0].path){
              val[0].selected=true;
              this.url=val[0].path;
            }else{
              this.url=''
            }
            //console.log(this.document)
            
          }
        }
    }
</script>

<style scoped lang='less'>
.insight_data_container {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .drop_down_menu_container {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-top: 1px solid #F2F4F7;
    border-bottom: 1px solid #F2F4F7;
    position: fixed;
    top:60px;
    left:0;
    z-index: 12;
    .drop_down_menu {
      width: 1200px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 318px;
        span:nth-child(1) {
          font-size: 16px;
          color: #121c33;
          letter-spacing: 0;
          cursor: pointer
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #b8becc;
          letter-spacing: 0;
        }
      }
    }
  }
}
.layout{
  width: 1200px;
  margin: auto;
  height:900px;
  margin-top: 36px;
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
