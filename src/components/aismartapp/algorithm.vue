<template>
  <div class="hello">
    <div class="banner">
      <div class="box" ><img src="../../assets/images/houseData/web-12.png" alt=""></div>
      <div class="content">
        <p class="title">AI智能服务大全</p>
      </div>
    </div>

    <!--内容区域-->
    <div class="insight_data_container">
        <div class="drop_down_menu_container">
            <div class="drop_down_menu">
                <div class="left">
                    <!-- <span>开源算法集</span> -->
                    <span>资源数：{{totalNum}}</span>
                </div>
                <div class="right">
                    <div class="address">
                        <Select v-model="order" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="search">
                        <i-input v-model="keyword" placeholder="输入您要查找的算法名称或关键词" style="width:270px">
                          <i-button slot="append" icon="ios-search" @click="searchClick"></i-button>
                        </i-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sub_container">
        <ul class="menu">
            <li v-for="(item,index) in menuList" :key="index" :class="currentIndex==item.productModuleCode?'tabActive':''" @click="queryDetail(item)">{{item.productModuleName}}（{{item.moduleCount}}）</li>
        </ul>
        <ul class="list">
          <li v-for="item in content" :key="item.id">
            <div class="left">
              <div class="header" :style="{backgroundColor:item.color}">{{item.header}}</div>
            </div>
            <div class="center">
              <div class="title">{{item.childModule}}</div>
              <div class="intro">{{item.description}}</div>
              <div class="comment">
                <!-- <div class="icon"><img src="../../assets/images/houseData/github.png" alt=""> </div>  -->
                <!-- <span>github</span> -->
                <span class="time">{{item.createTime}}</span>
                <!-- <span class="isPublic">{{item.isPublic}}</span> -->
              </div>
            </div>
            <div class="right">
              <div class="downLoad" v-if="(item.filename).indexOf('.zip')!=-1" @click="downLoad(item)">立即下载</div>
              <div class="lookDetail" v-if="item.readme" @click="lookDetail(item)">查看详情</div>
            </div>
          </li>
        </ul>
    </div>
       
    
    <div style="margin:auto;margin-bottom:50px;margin-top:-40px;text-align:center">
       <Page :total="paging.total"  @on-change="pagingChange"></Page>
    </div>
     <Modal v-model="visible" :footer-hide="true"  @on-cancel="cancle" class-name="vertical-center" width="1200" height="90%">
        <div class="iframe-box" id="iframe-box">
          <iframe :src="url" frameborder="none" width="100%" height="100%" class="iframe" scrolling="yes" :style="{border:'none'}"></iframe>
        </div>
     </Modal>
    <vLogin v-show="ifShowLogin" @closeLoginWin="closeLoginWin"></vLogin>
  </div>
</template>

<script>
import vLogin from "@/components/login/login";
export default {
  name: 'insightData',
  components: {
    vLogin,
  },
  data () {
    return {
      downloadUrl:null,
      ifShowLogin:false,
      visible:false,
      url:'',
      currentIndex:'',
      keyword:"",
      totalNum:'',
      menuText:'楼盘',
      menuList:[],
      moduleCode:'',
      content:[],
      cityList: [
        {
            value: 'create_time',
            label: '按时间排序'
        },
        {
            value: 'product_module',
            label: '按算法类型排序'
        },
    ],
    order:'create_time',
    paging: {
      index: 1,
      size: 10,
      total: 0
    },
   
            
    }
  },
  created(){
    this.initData();
    this.initMenu();
  },
  methods:{
    initMenu(){
      this.$axios({
          method: "get",
          url: window.config.url+'/stargaze/sophiaOpenData/productmodules',
      }).then(res => {
        if(res.data.code==200000){
          this.menuList=res.data.data;
          let sum=0;
           this.menuList.forEach(item=>{
             sum+=item.moduleCount;
           })
          this.totalNum=sum;
          this.menuList.unshift({
            childModule: null,
            createTime: null,
            description: null,
            downloadUrl: null,
            filename: null,
            id: null,
            moduleCount: sum,
            otherUrl: null,
            productModuleCode: "",
            productModuleName: "所有服务",
            readme: null,
            siteName: null,
          })
        }
      })
    },
    queryDetail(val){
      this.currentIndex=val.productModuleCode;
      this.moduleCode=val.productModuleCode;
      this.initData();
    },
    initPaging() {
      this.paging.index = 1;
      this.paging.size = 10;
    },
    searchClick(){
      this.initPaging();
      this.initData();
    },
    pagingChange(val){
      this.paging.index = val;
      document.documentElement.scrollTop=0;
      this.initData();
    },
    
    initData(){
       //上边中间   中国地图
            let baseUrl=window.config.url+'';
            this.$axios({
                method: "post",
                url: baseUrl + "/stargaze/sophiaOpenData/listSophiaOpenData",
                params:{
                  keyword:this.keyword,
                  orderField:this.order,
                  orderType:"desc",
                  pageIndex:this.paging.index,
                  pageSize:this.paging.size,
                  moduleCode:this.moduleCode,
                }
            }).then(res => {
                console.log(res.data.data)
                if(res.status==200){
                  // 01=自然语言
                  // 02=语音
                  // 03=应用系统
                  // 04=物联网
                  // 05=文字
                  // 06=推荐
                  // 07=图像
                  // 08=搜索
                  // 09=视频
                  // 10=深度学习
                  // 11=人体
                  // 12=人脸
                  // 13=人工智能
                  // 14=区块链
                  // 15=大数据算法
                  // 16=VR
                  // 17=AR/VR
                  // 18=AR
                  let result=res.data.data.sophiaOpenData.data;
                  this.paging.total=res.data.data.sophiaOpenData.totalNum;
                  // this.totalNum=res.data.data.sophiaOpenData.totalNum;
                  result.forEach(item=>{
                    if(item.productModule=="01"){
                      item['header']='自然语言';
                      item['color']='#FFC10D ';
                    }
                    else if(item.productModule=="02"){
                      item['header']='语音';
                      item['color']='#13BFC1';
                    }
                    else if(item.productModule=="03"){
                      item['header']='应用系统';
                      item['color']='#FE5560 ';
                    }
                    else if(item.productModule=="04"){
                      item['header']='物联网';
                      item['color']='#B6B2BC';
                    }
                    else if(item.productModule=="05"){
                      item['header']='文字';
                      item['color']='#4A90E2';
                    }
                    else if(item.productModule=="06"){
                      item['header']='推荐';
                      item['color']='#53B884 ';
                    }
                    else if(item.productModule=="07"){
                      item['header']='图像';
                      item['color']='#00C2FF';
                    }
                    else if(item.productModule=="08"){
                      item['header']='搜索';
                      item['color']='#FD6A2B';
                    }
                    else if(item.productModule=="09"){
                      item['header']='视频';
                      item['color']='#4C65A8';
                    }
                    else if(item.productModule=="10"){
                      item['header']='深度学习';
                      item['color']='#71B22E';
                    }
                    else if(item.productModule=="11"){
                      item['header']='人体';
                      item['color']='#E03FBB';
                    }
                    else if(item.productModule=="12"){
                      item['header']='人脸';
                      item['color']='#407758';
                    }
                    else if(item.productModule=="13"){
                      item['header']='人工智能';
                      item['color']='#407758';
                    }
                    else if(item.productModule=="14"){
                      item['header']='区块链';
                      item['color']='#407758';
                    }
                    else if(item.productModule=="15"){
                      item['header']='大数据算法';
                      item['color']='#407758';
                    }
                    else if(item.productModule=="16"){
                      item['header']='VR';
                      item['color']='#407758';
                    }
                    else if(item.productModule=="17"){
                      item['header']='AR/VR';
                      item['color']='#407758';
                    }
                    else if(item.productModule=="18"){
                      item['header']='AR';
                      item['color']='#407758';
                    }
                  })
                  this.content=result;
                }
            }).catch(err=>{
                console.log(err);
            });
    },
    lookDetail(item){
      this.url=window.config.url+"/kyfysm/"+item.readme;
      this.visible=true;
    },
    closeLoginWin(arg) {
      this.ifShowLogin = arg;
      if(localStorage.username){
        if(this.downloadUrl){
          location.href=this.downloadUrl;
        }
      }
      
    },
    downLoad(item){
      this.downloadUrl=window.config.url+"/ai/zip/open_source_services/"+item.filename;
      if(!localStorage.username){
        this.ifShowLogin = true;
      }else{
        location.href=this.downloadUrl;
      }
    },
    cancle(){
      this.visible=false;
    }
  }
}
</script>

<style scoped lang='less'>

.iframe-box {
  width:100%;
  height: 100%;
}
.hello{
  position: relative;
  .sub_container{
     margin:80px auto;
     width: 1200px;
     display: flex;
      .menu{
        width:200px;
        li{
         font-size: 16px;
         color: #121C33;
         margin-bottom: 20px;
         padding-left:10px;
         border-left:3px solid rgba(0,0,0,0);
         cursor: pointer;
          &.tabActive{
            color: #03A971;
            border-left:3px solid #03A971;
          }
        }
      }
      .list{
          flex:1;
          li{
            height: 220px;
            padding: 20px;
            border: 1px solid #EBECF0;
            margin-bottom: 10px;
            display: flex;
            .left{
              width:100px;
              .header{
                margin: auto;
                border-radius:50%;
                width: 60px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                color:#fff;
              }
            }
            .center{
              width:650px;
              position: relative;
              .title{
                font-size: 22px;
                color: #3D4966;
                letter-spacing: 0;
                margin-bottom:10px;
              };
              .intro{
                font-size: 14px;
                color: #7A8499;
                letter-spacing: 0;
                line-height: 24px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
              }
              .comment{
                position: absolute;
                bottom:20px;
                display: flex;
                align-items: center;
                .icon{
                  display: inline-block;
                  width:24px;
                  margin-right: 20px;
                  img{
                    width:100%;
                    display: block;
                  }
                }
                .time{
                  // margin-left:50px;
                  font-size: 14px;
                  color: #3D4966;
                  letter-spacing: 0;
                }
                .isPublic{
                  margin-left:50px;
                  font-size: 14px;
                  color: #3D4966;
                  letter-spacing:0; 
                }

              
              }
            }
            .right{
            flex:1;
            position: relative;
              .lookDetail{
                width:120px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                position: absolute;
                right: 40px;
                bottom:10px;
                border: 1px solid #03A971;
                border-radius: 3px;
                color:#03A971;
                cursor: pointer;
              }
              .downLoad{
                width:120px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                position: absolute;
                right: 180px;
                bottom:10px;
                border: 1px solid #03A971;
                border-radius: 3px;
                color:#03A971;
                cursor: pointer;
              }
            }
          }
        }
  }
 
  .banner{
    position:relative;
    display: flex;
    align-items: center;
    height: 450px;
    background: #3F3F4B;
    .box{
      margin-left:35%;
      height: 100%;
      img{
        height: 100%;
        display: block;
        width: auto;
      }
    }
    
    .content{
      position: absolute;
      left:0;
      right: 0;
      width:1200px;
      margin: auto;
      .title{
        font-size: 36px;
        color: #FFFFFF;
      }
      .intro{
        font-size: 16px;
        color: #FFFFFF;
        line-height: 32px;
      }
    }
  }
  .insight_data_container{
      width: 100%;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .drop_down_menu_container{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content:center;
        box-shadow: 0 3px 6px 0 #F2F4F7;
        .drop_down_menu{
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                width: 218px;
                span:nth-child(1){
                    font-size: 16px;
                    color: #121C33;
                    letter-spacing: 0;
                }
                span:nth-child(2){
                    font-size: 16px;
                    color: #B8BECC;
                    letter-spacing: 0;
                }
            }
            .right{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .address{
                  margin-right: 30px;
                  .ivu-dropdown{
                    width: 60px;
                    .ivu-dropdown-rel{
                      display: flex;
                      width: 65px;
                      a{
                        font-size: 14px;
                        color: #121C33;
                        letter-spacing: 0;
                      }
                  }
                  .ivu-select-dropdown{
                      .ivu-dropdown-menu{
                          li:hover{
                            color: #03A971;
                            width: 100%;
                          }
                      }
                    }
                  }
                }
                .in_type{
                  margin-right: 30px;
                  .ivu-dropdown{
                    .ivu-dropdown-rel{
                      display: flex;
                      width: 65px;
                      a{
                        color: #03A971;
                      }
                    }
                    .ivu-select-dropdown{
                      .ivu-dropdown-menu{
                          li:hover{
                            color: #03A971;
                            width: 100%;
                          }
                      }
                    }
                  }
                }
            }
        }
      }
  }
}
</style>
<style lang='less'>
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
