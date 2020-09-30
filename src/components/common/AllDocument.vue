<template>
<div class="menuCantainer">
   <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left">
            <span  @click="$router.go(-1)">帮助文档</span>
            <!-- <span>> {{subTitle}}</span> -->
            <span v-if="childTitle">> {{childTitle}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="layout">
            <div class="slider">
              <Menu accordion :active-name="threeId" :open-names="[oneId,twoId,threeId]">
                  <Submenu :name="item.routeId" v-for="item in menuList[0].childModules" :key="item.id">
                      <template slot="title">
                          {{item.moduleName}}
                      </template>
                      <template v-if="item.childModules[0].childModules.length<1">
                        <MenuItem @click.native="itemClick(item,subItem)" :name="subItem.routeId" v-for="subItem in item.childModules" :key="subItem.id" v-if="subItem.documentAddress">{{subItem.moduleName}}</MenuItem>
                      </template>
                      <Submenu  :name="subItem.routeId"  v-for="subItem in item.childModules" :key="subItem.id" v-else>
                          <template slot="title"> {{subItem.moduleName}}</template>
                          <MenuItem @click.native="itemClick(item,subItem,childItem)"  v-for="childItem in subItem.childModules" :key="childItem.id" :name="flag?childItem.id:childItem.routeId" v-if="childItem.documentAddress">{{childItem.moduleName}}</MenuItem>
                      </Submenu>
                  </Submenu>
              </Menu>
            </div>
            <div class="content">
              <iframe :src="url" frameborder="none" class="iframe" scrolling="yes" :style="{border:'none'}"></iframe>
            </div>
    </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                title:'',
                subTitle:'',
                childTitle:'',
                url:'',
                menuList:JSON.parse(localStorage.menuListNav),
                oneId:'',
                twoId:'',
                threeId:'',
                flag:false,
                document:{
                    "routeId": "abc",
                    "moduleName": "新手指南",
                    "path": "./static/html/guide/guide.html",
                    'childModules':[
                      {
                          "routeId": "guide",
                          "moduleName": "接入指引",
                          "documentAddress": "./static/html/guide/guide.html",
                          'childModules':[],
                      },
                      {
                          "routeId": "vertify",
                          "moduleName": "接口鉴权认证",
                          "documentAddress": "./static/html/guide/vertify.html",
                           'childModules':[],
                      },
                      {
                          "routeId": "code",
                          "moduleName": "返回码",
                          "documentAddress": "./static/html/guide/code.html",
                          'childModules':[],
                      },
                      {
                          "routeId": "ques",
                          "moduleName": "常见问题",
                          "documentAddress": "./static/html/guide/ques.html",
                          'childModules':[],
                      },
                    ]
                },
            }
        },
        created(){
           this.menuList[0].childModules.pop();
           this.menuList[0].childModules.forEach(item=>{
                item.childModules.forEach(subItem=>{
                    subItem.childModules = subItem.childModules.filter((list)=>{
                          return list.documentAddress != null;
                    })
                })
            })
          this.menuList[0].childModules.unshift(this.document);
          if(this.$route.query.oneId){
              this.oneId=this.$route.query.oneId;
              this.twoId=this.$route.query.twoRouteId;
              this.threeId=this.$route.query.routeId;
              this.menuList[0].childModules.forEach(item=>{
                if(item.routeId== this.oneId){
                  this.title=item.moduleName;
                  item.childModules.forEach(subItem=>{
                    if(subItem.routeId == this.twoId){
                      this.subTitle=subItem.moduleName;
                      subItem.childModules.forEach(childItem=>{
                        if(subItem.routeId==this.threeId){
                          this.url=subItem.childModules[0].documentAddress;
                          this.childTitle=subItem.childModules[0].moduleName;
                          this.threeId=subItem.childModules[0].id;
                          this.flag=true;
                        }else{
                          if(childItem.routeId == this.threeId){
                              this.childTitle=childItem.moduleName;
                              this.url=childItem.documentAddress;
                            }
                        }
                        
                      })
                    }
                  })
                }
              })
          }else{
            this.oneId="abc";
            this.twoId="guide";
            this.threeId="guide"
            this.menuList[0].childModules.forEach(item=>{
              if(item.routeId== this.oneId){
                //this.title=item.moduleName;
                item.childModules.forEach(subItem=>{
                  if(subItem.routeId == this.twoId){
                    //this.subTitle=subItem.moduleName;
                    this.childTitle=subItem.moduleName;
                    this.url=subItem.documentAddress;
                    // subItem.childModules.forEach(childItem=>{
                    //   if(childItem.routeId== this.threeId){
                    //     this.childTitle=childItem.moduleName;
                    //   }
                    // })
                  }
                })
              }
            })
          }
            
        },
        methods:{
          itemClick(item,subItem,childItem){
             this.childTitle='';
            // this.title=item.moduleName;
            // this.subTitle=subItem.moduleName;
            if(childItem){
              this.childTitle=childItem.moduleName;
              this.url=childItem.documentAddress;
            }else{
              this.childTitle=subItem.moduleName;
               this.url=subItem.documentAddress;
            }
           
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
        span:nth-child(1) {
          font-size: 12px;
          color: #3D4966;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #B8BECC;
        }
        span:nth-child(3) {
          font-size: 12px;
          color: #B8BECC;
        }
      }
    }
  }
}
.layout{
  width: 1200px;
  min-height: 1000px;
  margin: auto;
  display: flex;
    .slider{
      background: #fff;
      height: 100%;
      padding-top:10px;
    }
    .content{
        flex:1;
       padding-top:10px;
       padding-left:10px;
       background: #fff;
      .iframe{
        width: 100%;
        height: 97%;
      }
    }
  
}
</style>
<style  lang='less'>
.menuCantainer {
  .ivu-menu{
    z-index: 0;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    padding:9px 24px;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: #03A971;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
      background: #03A971;
  }
  .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
      color: #03A971;
  }
}
</style>

