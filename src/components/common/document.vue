<template>
<div class="menuCantainer">
   <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left">
            <span  @click="$router.go(-1)">帮助文档</span>
            <!-- <span>> {{subTitle}}</span> -->
            <span>> {{childTitle}}</span>
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
                      <Submenu  :name="subItem.routeId"  v-for="subItem in item.childModules" :key="subItem.id">
                          <template slot="title"> {{subItem.moduleName}}</template>
                          <MenuItem @click.native="itemClick(item,subItem,childItem)" :name="flag?childItem.id:childItem.routeId" v-for="childItem in subItem.childModules" :key="childItem.id" v-if="childItem.documentAddress" >{{childItem.moduleName}}</MenuItem>
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
            }
        },
        created(){
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
        },
        methods:{
          itemClick(item,subItem,childItem){
            this.title=item.moduleName;
            this.subTitle=subItem.moduleName;
            this.childTitle=childItem.moduleName;
            this.url=childItem.documentAddress;
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
    height: 50px;
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
        span:nth-child(3) {
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
  margin-top: 50px;
  display: flex;
    .slider{
      background: #fff;
      height: 100%;
      padding-top:10px;
    }
    .content{
       flex:1;
       height: 100%;
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
}
</style>

