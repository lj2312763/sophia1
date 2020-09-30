<template>
<div>
   <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left">
            <span  @click="$router.go(-1)">数据洞察</span>
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
                        "id": 0,
                        "title": "法律综合分析",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/lvshi.html",
                        // "children": [
                        //     {
                        //         "subId":0,
                        //         "title": "律师查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/lvshi.html"
                        //     },
                        //     {
                        //        "subId":1,
                        //         "title": "当事人查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/self.html"
                        //     },
                        //     {
                        //        "subId":2,
                        //         "title": "案件文书分页查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/casePage.html"
                        //     },
                        //     {
                        //        "subId":3,
                        //         "title": "案件文书详情查询接口",
                        //         "selected":false,
                        //         "path": "./static/html/caseDetail.html"
                        //     }
                        // ]
                    },
                    {
                        "id": 1,
                        "title": "地产综合分析",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/POI.html"
                        // "children": [
                        //     {
                        //         "title": "文档1",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     },
                        //     {
                        //         "title": "文档2",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     }
                        // ]
                    },
                    {
                        "id": 2,
                        "title": "品牌舆情洞察",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/pinpai.html"
                        // "children": [
                        //     {
                        //         "title": "文档1",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     },
                        //     {
                        //         "title": "文档2",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     }
                        // ]
                    },
                    {
                        "id": 3,
                        "title": "地理综合查询",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/dili.html"
                        // "children": [
                        //     {
                        //         "title": "文档1",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     },
                        //     {
                        //         "title": "文档2",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     }
                        // ]
                    },
                    {
                        "id": 4,
                        "title": "旅游数据洞察",
                        "expand": false,
                        "selected":false,
                        "path": "./static/html/lvyou.html"
                        // "children": [
                        //     {
                        //         "title": "文档1",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     },
                        //     {
                        //         "title": "文档2",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     }
                        // ]
                    },
                    {
                        "id": 5,
                        "title": "餐饮数据洞察",
                         "expand": false,
                         "selected":false,
                         "path": "./static/html/canyin.html"
                        // "children": [
                        //     {
                        //         "title": "文档1",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     },
                        //     {
                        //         "title": "文档2",
                        //         "expand": false,
                        //         "path": "./static/html/1.html"
                        //     }
                        // ]
                    }
                ]
            }
        },
        created(){
          for(var i in this.document){
            if(this.document[i].id==this.$route.query.id){
              this.document[i].expand=true;
              this.title=this.document[i].title;
              if(this.document[i].children){
                for(var m in this.document[i].children){
                  if(this.document[i].children[m].subId==this.$route.query.subId){
                     this.url=this.document[i].children[m].path;
                     this.document[i].children[m]['selected']= true;
                  }
                }              
              }else{
                this.document[i]['selected']= true;
                this.url=this.document[i].path;
              }
            }
          }
        },
        methods:{
          view(val){
            this.title=val[0].title;
            for(var i in this.document){
              if(this.document[i].selected){
                this.document[i].selected=false;
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
        width: 218px;
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
