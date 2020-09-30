<template>
  <div class="tech_container">
    <div class="headerBg" id="particles-js">
      <div class="header_content">
        <div class="header_title">大数据应用服务</div>
        <div class="header_desc">完善的大数据产品体系，助力企业数字化转型</div>
        <div class="header_search">
            <Select v-model="search" placeholder='请输入您想要搜索的数据应用服务' filterable allow-create @on-create="handleCreate" @on-change="changeValue" :capture='false'>
                <Option v-for="item in searchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div @click="changeValue" class="search_img">
              <img :src="seachBtn">
            </div>
        </div>
        <div class="header_item">
            <div class="searchItem" v-for="item in linkList" :key="item.id" @click="jumpDetail(item)">
                  {{item.name}}
            </div>
        </div>
      </div>
    </div>
    <div class="tech_panel">
       <div class="panel_item" v-for="(item,index) in panelList" :key="item.id" @click="jumpBanner(item)" @mouseover="subBannerOver(item,index)">
            <img :src="item.url" alt="" >
            <div class="itemCover" style="width:100%;height:100%">
                <div class="picIcon" v-show="subBannerIndex==index">
                  <img :src="item.pic" >
                </div> 
                <p>{{item.name}}</p>
            </div> 
       </div>
    </div>
    <div class="tech_content"  v-if="menuList.length>0">
      <div v-for="ele in menuList" :key="ele.id">
        <div class="tech_content_list"  v-for="item in ele.childModules" :key="item.id">
          <div class="tech_content_banner"   :style="{backgroundImage:'url('+url+item.bannerUrl + ')'}">
             <div class="tech_content_title">{{item.moduleName}}</div>
             <div class="tech_content_desc">{{item.description}}</div>
          </div>
          <div class="tech_content_item" v-for="(subItem,subIndex) in item.childModules" :key="subIndex">
             <div class="tech_content_title" @click="collpace(subItem)">
               {{subItem.moduleName}}
               <div class="tech_content_icon">
                  <img src="../assets/images/new_nav/show.png" :class="{'imgActive':!subItem.expand}" alt="" >
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
      subBannerIndex:-1,
       menuList:[],
       panel_hot:require('@/assets/images/new_nav/hot.png'),
       search:'',
       seachBtn:require('@/assets/images/new_index/search.png'),
       searchList:[
         {label:"BI平台",value:'BI平台'},
         {label:"民生数据",value:'民生数据'},
         {label:"品牌舆情洞察",value:'品牌舆情洞察'},
         {label:"法律综合分析",value:'法律综合分析'},
         {label:"地理综合查询",value:'地理综合查询'},
       ],
       linkList:[
          {path:"/brandSentiment",name:'品牌舆情',id:1},
          {path:"/travelInsights",name:'旅游服务',id:2},
          {path:"/geographySearch",name:'地理信息',id:3},
          {path:"/insightData",name:'律师案件',id:4},
          {path:"/foodInsights",name:'餐饮洞察',id:5}
        ],
        panelList:[
          {path:'/brandSentiment',url:require('@/assets/images/new_index/3033388.gif'),name:'品牌舆情洞察',pic:require('@/assets/images/new_index/brandIcon.png')},
          {path:'/insightData',url:require('@/assets/images/new_index/2509601.gif'),name:'法律洞察分析',pic:require('@/assets/images/new_index/falvIcon.png')},
          {path:'/travelInsights',url:require('@/assets/images/new_index/800ps.gif'),name:'旅游数据洞察',pic:require('@/assets/images/new_index/wuyeIcon.png')},
        ],
    };
  },
  created(){
     this.initData();
  },
  mounted() {
    particlesJS.load("particles-js", "./static/particles.json");
  },
  methods:{
    queryDetail(item,levelTwoId,oneId){
      let  routeData='';
      if(levelTwoId=='B1.1'){
          routeData = this.$router.resolve({
            path:'/fuwu',
            query:{
              title:3,
              subTitle:'数据服务平台'
            }
          });
        }
        else if(levelTwoId=='B1.2'){
          routeData = this.$router.resolve({
            path:'/serviceFenxi',
            query:{
              title:3,
              subTitle:'数据分析平台'
            }
          });
        }
        else if(levelTwoId=='B1.3'){
          routeData = this.$router.resolve({
            path:'/BI',
            query:{
              title:3,
              subTitle:'BI平台'
            }
          });
        }
        else if(levelTwoId=='B2.2.1'){
          routeData = this.$router.resolve({
            path:'/insightData',
            query:{
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        else if(levelTwoId=='B2.2.2'){
          routeData = this.$router.resolve({
            path:'/houseData',
            query:{
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        else if(levelTwoId=='B2.2.3'){
          routeData = this.$router.resolve({
            path:'/brandSentiment',
            query:{
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        else if(levelTwoId=='B2.2.4'){
          routeData = this.$router.resolve({
            path:'/foodInsights',
            query:{
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        else if(levelTwoId=='B2.2.5'){
          routeData = this.$router.resolve({
            path:'/travelInsights',
            query:{
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        else if(levelTwoId=='B2.2.6'){
          routeData = this.$router.resolve({
            path:'/geographySearch',
            query:{
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        else if(levelTwoId=='B2.3.1'||levelTwoId=='B2.3.2'||levelTwoId=='B2.3.3'||levelTwoId=='B2.3.4'){
          window.open(item.pageUrl,'_blank')
        }
        else if(levelTwoId=='B2.3.5'){
          if(item.routeId=='B2.3.5.1'){
            routeData = this.$router.resolve({
              path:'/obserStarList',
              query:{
                dataType:5,
                pointType:0,
                type:3,
                title:3,
                subTitle:item.moduleName
              }
            });
          }
          else if(item.routeId=='B2.3.5.2'){
            routeData = this.$router.resolve({
              path:'/obserStarList',
              query:{
                type:3,
                dataType:5,
                pointType:1,
                 title:3,
                subTitle:item.moduleName
              }
            });

          }
          else if(item.routeId=='B2.3.5.3'){
            routeData = this.$router.resolve({
              path:'/obserStarList',
              query:{
                type:3,
                dataType:5,
                pointType:2,
                 title:3,
                subTitle:item.moduleName
              }
            });

          }
          else if(item.routeId=='B2.3.5.4'){
            routeData = this.$router.resolve({
              path:'/obserStarList',
              query:{
                type:3,
                dataType:5,
                pointType:3,
                title:3,
                subTitle:item.moduleName
              }
            });

          }
        }
        else if(levelTwoId=='5.6'){
           routeData = this.$router.resolve({
            path:'/serviceDetailSimple',
            query:{
              oneId:oneId,
              twoRouteId:levelTwoId,
              routeId:item.routeId,
              title:3,
              subTitle:item.moduleName
            }
          });
        }
        if(routeData){
           window.open(routeData.href, '_blank');
        }
    },
    jumpDetail(item){
      let routeData=this.$router.resolve({
        path:item.path,
        query:{
          title:3,
          subTitle:item.name
        }
      });
      window.open(routeData.href, '_blank');
    },
    subBannerOver(item,index){
      this.subBannerIndex=index;
    },
    jumpBanner(item){
        let routeData = this.$router.resolve({
          path:item.path,
          query:{
            title:3,
            subTitle:item.name
          }
        });
        window.open(routeData.href, '_blank');
     },
    initData(){
      this.isloading=true;
      this.$axios({
        method: "get",
        url: window.config.url+"/sitemgr/page/moduledesc",
        params:{
          category:'10111',
          keyword:'',
          rootId:''
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
        sessionStorage.DataSearchList=this.searchList;
        let routerUrl = this.$router.resolve({
            path:'/searchDataIndex',
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
  margin:auto;
  margin-top:-60px;
  z-index:1;
  position: relative;
  margin-bottom: 60px;
  display: flex;
  .panel_item{
    font-size: 22px;
    flex:1;
    margin-left: 30px;
    position: relative;
    border:10px solid #fff;
    box-shadow: 0 2px 16px 0 rgba(184,190,204,0.30);
    height: 206px;
    overflow: hidden;
     .itemCover{
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        font-size: 16px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        .picIcon{
          width:24px;
          margin-bottom:5px;
          img{
            width: 100%;
            display: block;
          }
        }
     }
    &:nth-child(1){
     margin-left: 0;
    }
    img{
        width:100%;
        display: block;
      }
  }
}
.tech_content{
  width:1200px;
  margin:auto;
  .tech_content_list{
    .tech_content_banner{
      height:190px;
      background: url("../assets/images/new_nav/ziran.png") no-repeat center center;
      background-size: 100% 100%;
      // background-position: center center;
      // background-repeat: no-repeat;
      padding-top:30px;
      padding-left:40px;
      margin-bottom: 40px;
      .tech_content_title{
        font-size: 26px;
        color: #FFFFFF;
        margin-bottom: 10px;
      }
      .tech_content_desc{
        width:683px;
        opacity: 0.8;
        line-height: 30px;
        font-size: 14px;
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
