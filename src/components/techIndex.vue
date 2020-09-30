<template>
  <div class="tech_container">
    <div class="headerBg" id="particles-js">
      <div class="header_content">
        <div class="header_title">AI智能应用服务</div>
        <div class="header_desc">全栈的AI能力，在这里有你所要的一切</div>
        <div class="header_search">
            <Select v-model="search" placeholder='请输入您想要搜索的产品' filterable allow-create  @on-create="handleCreate" @on-change="changeValue" :capture='false'>
                <Option v-for="item in searchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div @click="changeValue(null)" class="search_img">
              <img :src="seachBtn">
            </div>
        </div>
        <div class="header_item">
            <div class="searchItem" v-for="item in linkList" :key="item.id" @click="jumpDetail(item)">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="tech_panel">
       <div class="tech_panel_header">
          <div class="panel_icon"><img src="../assets/images/new_nav/hot-p.png" alt=""></div>热门推荐
       </div>
       <div class="tech_panel_content">
          <div class="panel_item" v-for="(item,index) in panelList" :key="index" @mouseleave="subBannerleave(item,index)" @mouseover="subBannerOver(item,index)" @click="jumpDetail(item)">
            <div class="itemCover" :class="{'subBannerItem_active':subBannerIndex==index}">
              <div class="itemCover_container">
                  <div class="itemCover_left">
                    <img :src="item.icon">
                  </div> 
                  <div class="itemCover_right">
                      <p>{{item.title}}</p>
                      <p>{{item.desc}}</p>
                  </div> 
              </div> 
            </div> 
            <img :src="item.img" alt="">
          </div>
       </div>
    </div>
    <div class="tech_content"  v-if="menuList.length>0">
      <div v-for="ele in menuList" :key="ele.id">
        <div class="tech_content_list"  v-for="item in ele.childModules" :key="item.id" v-if="ele.id!=2">
          <div class="tech_content_banner"  :style="{backgroundImage:'url('+url+item.bannerUrl + ')'}">
             <div class="tech_content_title">{{item.moduleName}}</div>
             <div class="tech_content_desc">{{item.description}}</div>
             <div class="tech_content_btn" v-if="ele.id==1">
                <div class="btn success" @click="jumpFn(item)">功能体验</div>
                <div class="btn" @click="mustUse">立即使用</div>
                <!-- <div class="btn">技术文档</div> -->
             </div>
          </div>
          <div class="tech_content_item" v-for="(subItem,subIndex) in item.childModules" :key="subIndex">
             <div class="tech_content_title" @click="collpace(subItem)">
               {{subItem.moduleName}}
               <div class="tech_content_icon">
                  <img src="../assets/images/new_nav/show.png" alt="" :class="{'imgActive':!subItem.expand}">
               </div>
             </div>
             <div class="tech_content_subcontent" ref="tech_content_subcontent" v-show="subItem.expand">
               <div class="tech_content_subItem" :class="{'tech_content_subItem_active':(index+1)%3==0}" v-for="(subChildItem,index) in subItem.childModules" :key="index"  @click="queryDetail(subChildItem,subItem.routeId,item.routeId)">
                 <div class="tech_content_subTitle">
                    <div class="tech_content_icon">
                      <img :src="url+subChildItem.iconUrl" alt="">
                    </div>
                   {{subChildItem.moduleName}}
                    <div class="panel_hot" v-if="subChildItem.hot"><img :src="panel_hot" alt=""></div>
                </div>
                 <div class="tech_content_subDesc">{{subChildItem.description}}</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
   <div v-else>
        <Spin v-if="isloading" style="margin:80px 0;">
            <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       isloading:true,
       url:window.config.iconUrl,
       ifShowLogin:false,
       menuList:[],  
       panel_hot:require('@/assets/images/new_nav/hot.png'),
       search:'',
       seachBtn:require('@/assets/images/new_index/search.png'),
       searchList:[
         {label:"图像识别",value:'图像识别'},
         {label:"词法分析",value:'词法分析'},
         {label:"短语音识别",value:'短语音识别'},
         {label:"人脸识别",value:'人脸识别'},
         {label:"卡证文字识别",value:'卡证文字识别'},
       ],
       linkList:[
        {title:'文本审核',id:1,path:"/serviceDetail",oneId:5,twoRouteId:'5.3',routeId:'5.3'},
        {title:'机器翻译',id:2,path:"/serviceDetail",oneId:5,twoRouteId:'5.4',routeId:'5.4.1'},
        {title:'语音合成',id:3,path:"/serviceDetail",oneId:1,twoRouteId:'1.1',routeId:'1.1.4'},
        {title:'人脸识别',id:4,path:"/serviceDetail",oneId:6,twoRouteId:'6.1',routeId:'6.1.1'},
        {title:'智能推荐',id:5,path:"/serviceDetail",oneId:7,twoRouteId:'7.4',routeId:'7.4'}
        ],
        subBannerIndex:-1,
        panelList:[
          {
            title:'语音识别',
            desc:"专业智能高效的语音处理服务",
            img:require('@/assets/images/new_nav/1.png'),
            icon:require('@/assets/images/new_nav/icon_80 copy 195.png'),
            path:'/serviceDetail',oneId:1,twoRouteId:'1.1',routeId:'1.1.1',
          },
          {
            title:'人脸识别',
            desc:"人脸检测、分析、识别与人脸搜索服务",
            img:require('@/assets/images/new_nav/2.png'),
            icon:require('@/assets/images/new_nav/icon_80 copy 161.png'),
            path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.1',
          },
          {
            title:'词法分析',
            desc:"提供分词、词性标注、命名实体识别",
            img:require('@/assets/images/new_nav/3.png'),
            icon:require('@/assets/images/new_nav/icon_80 copy 110.png'),
            path:'/serviceDetail',oneId:5,twoRouteId:'5.1',routeId:'5.1.1',
          },
          {
            title:'身份证识别',
            desc:"对二代居民身份证字段进行结构化识别",
            img:require('@/assets/images/new_nav/4.png'),
            icon:require('@/assets/images/new_nav/icon_80 copy 121.png'),
             path:'/serviceDetail',oneId:2,twoRouteId:'2.1',routeId:'2.1.1',
          },
          {
            title:'通用票据识别',
            desc:"各类票据单据的结构化识别服务",
            img:require('@/assets/images/new_nav/5.png'),
            icon:require('@/assets/images/new_nav/icon_80 copy 123.png'),
             path:'/serviceDetail',oneId:2,twoRouteId:'2.2',routeId:'2.2.1',
          },
          {
            title:'通用物体和场景识别',
            desc:"综合性的图像理解和分析服务",
            img:require('@/assets/images/new_nav/6.png'),
            icon:require('@/assets/images/new_nav/icon_80 copy 156.png'),
            path:'/serviceDetail',oneId:3,twoRouteId:'3.1',routeId:'3.1.1',
          },
        ],
    };
  },
  mounted() {
    particlesJS.load("particles-js", "./static/particles.json");
  },
  created(){
     this.initData();
  },
  methods:{
    initData(){
      this.isloading=true;
      this.$axios({
        method: "get",
        url: window.config.url+"/sitemgr/page/moduledesc",
        params:{
          category:'',
          keyword:'',
          rootId:'1,3,4,5'
          //rootId:''
        }
      }).then(res => {
        if (res.data.code == 200000) {
          this.menuList=res.data.data;
          this.isloading=false;
        }
      }).catch(err => {
         this.isloading=false;
      });
    },
    mustUse(){
      window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
    },
    jumpFn(item){
      let routeData='';
      if(item.childModules[0].routeId=='7.1'){
        routeData = this.$router.resolve({
          path:"/resumeList",
        });
      }else{
        routeData = this.$router.resolve({
          path:"/experienceColl",
          query:{
            oneId:item.routeId,
            twoRouteId:item.childModules[0].routeId,
            routeId:item.childModules[0].childModules[0].routeId,
          }
        });
      }
      window.open(routeData.href, '_blank');
    },
    jumpDetail(item){
        let routeData = this.$router.resolve({
          path:item.path,
          query:{
            oneId:item.oneId,
            twoRouteId:item.twoRouteId,
            routeId:item.routeId,
            title:2,
            subTitle:item.title
          }
        });
        window.open(routeData.href, '_blank');
      },
      queryDetail(item,levelTwoId,oneId){
         let routeData ='';
        if(item.routeId=='5.5.2'){
          routeData = this.$router.resolve({
            path:'/opinionAnalysisDetail',
            query:{
              title:2,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='6.4.12'){
          routeData = this.$router.resolve({
            path:'/liveHood',
            // query:{
            //   title:1,
            //   subTitle:"智慧教育"
            // }
          });
        }
        else if(item.routeId=='6.4.11'){
          routeData = this.$router.resolve({
             path:'/educate',
            // query:{
            //   title:1,
            //   subTitle:"智慧教育"
            // }
          });
        }
        else if(item.category=="11111"){
          routeData = this.$router.resolve({
            path:'/serviceDetail',
            query:{
              oneId:oneId,
              twoRouteId:levelTwoId,
              routeId:item.routeId,
              title:2,
              subTitle:item.moduleName
            }
          });
        }else{
          routeData = this.$router.resolve({
            path:'/serviceDetailSimple',
            query:{
              oneId:oneId,
              twoRouteId:levelTwoId,
              routeId:item.routeId,
              title:2,
              subTitle:item.moduleName
            }
          });
        }
         window.open(routeData.href, '_blank');
    },
    subBannerleave(){
      this.subBannerIndex=-1;
    },
    subBannerOver(item,index){
      this.subBannerIndex=index;
    },
    changeValue(val){
        var searText1;
        var searText = document.getElementsByClassName('ivu-select-default')[0].children[0].children[1].children[1].value;
        if(val){
            searText1 = val;
        }
        else{
            searText1 = searText;
            this.searchList.push({
                value: searText1,
                label: searText1
            });
        }
        // sessionStorage.TecSearchList=this.searchList;
        let routerUrl = this.$router.resolve({
            path:'/searchIndex',
            query:{
              search:searText1
            }
        });
        window.open(routerUrl.href,'_blank');
      },
      handleCreate (val) {
        this.searchList.push({
            value: val,
            label: val
        });
     },
     collpace(item){
       item.expand=!item.expand;
     }
  }
};
</script>
<style scoped lang="less">
 img{
    width:100%;
    display: block;
  }
.headerBg {
  height: 350px;
  background: url("../assets/images/new_nav/headerBg.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .header_content {
    position: absolute;
    width: 600px;
    left: 0;
    right: 0;
    top: 65px;
    margin: auto;
    .header_title {
      font-size: 36px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 15px;
    }
    .header_desc {
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 25px;
    }
    .header_search {
      width: 100%;
      height: 45px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      position: relative;
      /deep/.ivu-select-default {
        height: 100% !important;
        .ivu-select-selection {
          height: 100%;
          padding-left:7px;
           &>div{
             height: 100%;
              .ivu-select-input {
                height: 100% !important;
                line-height: 44px;
              }
          }
          .ivu-select-selected-value {
            line-height: 44px;
            height: 100%;
          }
          .ivu-select-placeholder {
            line-height: 44px;
            color: #B8BECC;
            height:100%;
          }
          .ivu-select-arrow {
            display: none;
          }
        }
        /deep/.ivu-select-dropdown {
          /deep/.ivu-select-dropdown-list {
            .ivu-select-item {
              padding: 11px 10px;
              color: #7A8499;
            }
            .ivu-select-item-focus{
              background: none;
              color: #03a971;
            }
            .ivu-select-item:hover {
              color: #03a971;
              background: none;
            }
          }
        }
      }
      .search_img{
        position: absolute;
        height: 100%;
        width: 40px;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 12;
        img {
          width: 16px;
          cursor: pointer;
        }
      }
      .search_img:hover{
        cursor: pointer;
      }
    }
    .header_item{
      display: flex;
      justify-content: center;
      .searchItem{
        font-size: 14px;
        color: #FFFFFF;
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
}
.tech_panel{
  width:1200px;
  box-shadow: 0 2px 16px 0 rgba(184,190,204,0.30);
  background: #fff;
  margin:auto;
  margin-top:-60px;
  z-index:1;
  position: relative;
  margin-bottom: 60px;
  padding:30px;
  padding-left:0;
  padding-bottom: 0;
  .tech_panel_header{
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #121C33;
      margin-bottom: 30px;
      margin-left: 30px;
      .panel_icon{
        width: 24px;
        margin-right: 10px;
        img{
          width:100%;
          display: block;
        }
      }
  }
  .tech_panel_content{
    display: flex;
    flex-wrap: wrap;
    .panel_item{
      width:360px;
      margin-left: 30px;
      margin-bottom: 30px;
      position: relative;
      cursor: pointer;
       .itemCover{
          position: absolute;
          left:0;
          top:0;
          bottom:0;
          right:0;
          .itemCover_container{
            margin-top: 28px;
            margin-left: 38px;
            display: flex;
            .itemCover_left{
              width: 40px;
              margin-right: 13px;
            }
            .itemCover_right{
              flex:1;
              p:nth-child(1){
                font-size: 16px;
                color: #FFFFFF;
                margin-bottom: 7px;
              }
              p:nth-child(2){
                opacity: 0.8;
                font-size: 14px;
                color: #FFFFFF;
              }
            }
          }
          &.subBannerItem_active{
            background: rgba(3,169,113,0.8);
            color: #fff;
          }
        }
      img{
          width:100%;
          display: block;
        }
      // &:nth-child(1){
       
      // }
    }
  }
 
}
.tech_content{
  width:1200px;
  margin:auto;
  
  .tech_content_list{
    .tech_content_banner{
      height:190px;
      //background: url("../assets/images/new_nav/ziran.png") no-repeat center center;
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      padding-top:30px;
      padding-left:40px;
      margin-bottom: 40px;
      .tech_content_title{
        font-size: 26px;
        color: #FFFFFF;
        margin-bottom: 10px;
      }
      .tech_content_desc{
        font-size: 14px;
        opacity: 0.8;
        color: #FFFFFF;
        margin-bottom: 30px;
      }
      .tech_content_btn{
        display: flex;
        .btn{
          width:120px;
          height:36px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30px;
          border: 1px solid #FFFFFF;
          border-radius: 3px;
          border-radius: 3px;
          font-size: 14px;
          color: #FFFFFF;
          cursor: pointer;
          &.success{
            background:#03A971; 
            border: 1px solid #03A971;
          }
        }
       

      }
    }
    .tech_content_item{
      margin-left: 20px;
      margin-bottom: 20px;
      .tech_content_title{
        font-size: 18px;
        color:#03A971;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .tech_content_icon{
          width:16px;
          margin-left: 6px;
          img{
            transition: all .3s ease-in-out;
            &.imgActive{
              transform: rotate(90deg);
            }
            width:100%;
            display: block;
          }
        }
      }
      .tech_content_subcontent{
        margin-left: 10px;
        display: flex;
        flex-flow: wrap;
        .tech_content_subItem{
          cursor: pointer;
           width:320px;
           margin-bottom: 30px;
           margin-right:80px;
           &.tech_content_subItem_active{
             margin-right:0;
           }
          .tech_content_subTitle{
            font-size: 14px;
            color: #3D4966;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .panel_hot{
              width:30px;
              margin-left: 5px;
              img{
                width:100%;
                display: block;
              }
            }
            .tech_content_icon{
              width:16px;
              margin-right: 4px;
              img{
                width:100%;
                display: block;
              }
            }
          }
          .tech_content_subDesc{
              padding-left:20px;
              font-size: 14px;
              color: #7A8499;
               display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
              overflow: hidden;
            }
        }
      }
    }
  }
}
</style>
