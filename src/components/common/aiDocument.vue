<template>
<div>
   <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left">
            <span  @click="$router.go(-1)">自然语言处理</span>
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
                        "id": "aiSmartAppList",
                        "title": "自然语言处理API接口说明",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/aiAPI/aiSmartAppList.html",
                        // "children": [
                        //     {
                        //         "subId":0,
                        //         "title": "律师查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/aiAPI/lvshi.html"
                        //     },
                        //     {
                        //        "subId":1,
                        //         "title": "当事人查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/aiAPI/self.html"
                        //     },
                        //     {
                        //        "subId":2,
                        //         "title": "案件文书分页查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/aiAPI/casePage.html"
                        //     },
                        //     {
                        //        "subId":3,
                        //         "title": "案件文书详情查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/aiAPI/caseDetail.html"
                        //     }
                        // ]
                    },
                    {
                        "id": "aiSmartAppDetail",
                        "title": "分词和词性标注API",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/aiAPI/aiSmartAppDetail.html"
                    },
                    {
                        "id": "aiKeyword",
                        "title": "关键词提取API",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/aiAPI/aiKeyword.html"
                    },
                    {
                        "id": "aiSentence",
                        "title": "句法分析API",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/aiAPI/aiSentence.html"
                    },
                    {
                        "id": "aiSyntax",
                        "title": "句式识别API",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/aiAPI/aiSyntax.html"
                    },
                    {
                        "id": "aiBoundary",
                        "title": "句子边界识别API",
                         "expand": false,
                         "selected":false,
                         "path": "./static/html/aiAPI/aiBoundary.html"
                    },
                    {
                        "id": "aiIdentity",
                        "title": "命名实体识别API",
                         "expand": false,
                         "selected":false,
                         "path": "./static/html/aiAPI/aiIdentity.html"
                    },
                    {
                        "id": "aiDepenpars",
                        "title": "依存句法分析API",
                         "expand": false,
                         "selected":false,
                         "path": "./static/html/aiAPI/aiDepenpars.html"
                    },
                    {
                         "id": "aiSemantic",
                         "title": "语义相似度API",
                         "expand": false,
                         "selected":false,
                         "path": "./static/html/aiAPI/aiSemantic.html"
                    }
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
          next(vm=>{
            if(from.name){
              vm.init(from.name);
              localStorage.routeName=from.name;
            }else{
              if(localStorage.routeName){
                  vm.init(localStorage.routeName);
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
                localStorage.routeName=this.document[i].id;
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
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px 0 #f2f4f7;
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
