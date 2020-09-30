<template>
    <div class="aiSmartApp_menu_container" v-if="navType == 1" @mouseleave="hideMenu">
      <div class="sub_container">
          <ul class="left">
            <li v-for="item in menuList" :key="item.id" @mouseover="lookDetail(item)" >{{item.moduleName}}</li>
            <li @click="jump()" style="font-size:14px;margin-top:30px"><Button type="success"  ghost>查看更多</Button></li>
          </ul>
          <ul class="right">
             <li v-for="item in rightList" :key="item.id">
               <div class="sub_title" @click="queryList(item)">{{item.moduleName}}</div>
               <div class="sub_child" v-for="subItem in item.childModules" :key="subItem.id" @click="queryDetail(subItem,item.routeId)">
                 <span>
                   {{subItem.moduleName}}
                    <!-- <div class="hot" v-if="subItem.hot">
                       <img v-if="item.hot=='hot'" src="../../assets/images/home/hot.png"  class="big_img">
                       <img v-if="item.hot=='new'" src="../../assets/images/home/new.png"  class="big_img">
                    </div> -->
                 </span>
                 
              </div>
             </li>
          </ul>
       </div>
    </div>
    <div class="insightData_menu_container" v-else-if="navType == 2" @mouseleave="hideMenu">
      <div @click="goList(8)" class="border_bottom_style falvzonghefenxi">法律综合分析</div>
      <div @click="goDetails(26)">地产综合分析</div>
      <div @click="goDetails(27)" class="pinpai">品牌舆情洞察</div>
      <div @click="goDetails(28)" class="dili">地理综合查询</div>
      <div @click="goDetails(33)" class="dili">旅游数据洞察</div>
      <div @click="goDetails(34)" class="dili">餐饮数据洞察</div>
      <div @click="goDetails(35)" class="dili">物业洞察分析</div>
    </div>
    <div class="obserData_menu_container" v-else-if="navType == 3" @mouseleave="hideMenu">
      <div @click="goList(9)" class="border_bottom_style">政治数据</div>
      <div @click="goDetails(29)">民生数据</div>
      <div @click="goDetails(30)">经济数据</div>
      <div @click="goDetails(31)">文化数据</div>
      <div @click="goDetails(32)">训练数据</div>
    </div>
    <!-- <div class="obserData_menu_container bigDataPlat" v-else-if="navType == 4" @mouseleave="hideMenu">
      <div @click="bigDataPlatChange(0)">推荐平台</div>
      <div @click="bigDataPlatChange(1)">算法实验室</div>
    </div> -->
</template>

<script>
  export default {
    props:['navType'],
    data(){
      return{
        levelOne:"",
        levelTwo:'',
        ifShowMenu:true,
        hotImg:require('../../assets/images/home/hot.png'),
        rightList:[],
        activeClass:'',
      }
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        this.$axios({
          method: "get",
          url: window.config.url+"/sitemgr/page/modulelist",
        }).then(res => {
          if (res.data.code == 200000) {
            this.menuList=res.data.data;
            this.rightList=this.menuList[0].childModules;
            this.levelOne=this.menuList[0].routeId;
          }
        }).catch(err => {

        });
      },
      queryList(item){
        // if(item.routeId){
        //    //if(item.hot){
        //       this.$router.push({
        //         path:'/aiList',
        //         query:{
        //           oneId:this.levelOne,
        //           routeId:item.routeId,
        //           type:1,
        //         }
        //       });
        //    //}
        // }
        // this.hideMenu()
      },
      queryDetail(item,levelTwoId){
        if(item.routeId){
          if(item.routeId=='5.5.2'){
            this.$router.push({
              path:'/opinionAnalysisDetail',
              query:{
                type:1,
              }
            });
          }else{
            this.$router.push({
              path:'/aiDetail',
              query:{
                oneId:this.levelOne,
                twoRouteId:levelTwoId,
                routeId:item.routeId,
                type:1,
              }
            });
          }
        }
        this.hideMenu()
      },
      lookDetail(item){
        this.rightList=item.childModules;
        this.levelOne=item.routeId;
      },
      jump(item){
          this.$router.push({
            path:'/algorithm',
            query:{
              type:1,
            }
          });
          this.hideMenu()
      },
      goList(arg){
        if(arg == 0){
          this.$router.push({
            path:'/aiSmartAppList',
            query:{
              type:1,
              featurType:0
            }
          });
        }
        else if(arg == 1){
          this.$router.push({
            path:'/faceRecoList',
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 2){
          this.$router.push({
            path:'/VideoRecoList',
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 3){
          this.$router.push({
            path:'/searchDetail', 
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 4){
          this.$router.push({
            path:'/opinionAnalysisDetail', 
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 5){
          this.$router.push({
            path:'/textReocList',
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 6){
          this.$router.push({
            path:'/aiSmartAppList',  
            query:{
              type:1,
              featurType:1
            }
          }); 
        }
        else if(arg == 7){
          this.$router.push({
            path:'/recommendDetail', 
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 8){
          this.$router.push({
            path:'/insightData',   
            query:{
              type:2
            }
          }); 
        }
        else if(arg == 9){
          this.$router.push({
            path:'/obserStarData',  
            query:{
              type:3,
              featurType:0
            }
          }); 
        }
       this.hideMenu()
      },
      goDetails(arg){
        switch(arg){
          case 0:
            this.$router.push({
              path:'/aiSmartAppDetail',
              query:{
                type:1,
              } 
            });
            break;
          case 1:
            this.$router.push({
              path:'/aiSentence',
              query:{
                type:1,
              } 
            });
            break;
          case 2:
            this.$router.push({
              path:'/aiSyntax',
              query:{
                type:1,
              } 
            });
            break;
          case 3:
            this.$router.push({
              path:'/aiDepenpars',     //依存句法分析
              query:{
                type:1,
              } 
            });
            break;
          case 4:
            this.$router.push({
              path:'/aiKeyword',
              query:{
                type:1,
              } 
            });
            break;
          case 5:
            this.$router.push({
              path:'/aiIdentity',  //命名实体识别
              query:{
                type:1,
              } 
            });
            break;
          case 6:
            this.$router.push({
              path:'/aiSemantic',  //语义相似度
              query:{
                type:1,
              } 
            });
            break;
          case 7:
            this.$router.push({
              path:'/aiBoundary',
              query:{
                type:1,
              } 
            });
            break;
          case 17:
            this.$router.push({
              path:'/cardTextRecList',  
              query:{
                type:1,
              } 
            });
            break;      
          case 18:
            this.$router.push({
              path:'/ticketTextRecLiset',  
              query:{
                type:1,
              } 
            });
            break;       
          case 19:
            this.$router.push({
              path:'/carSceneRecList',  
              query:{
                type:1,
              } 
            });
            break;   
          case 21:
            this.$router.push({
              path:'/shortSpeechRecoDetail',  
              query:{
                type:1,
              } 
            });
            break;
          case 22:
            this.$router.push({
              path:'/realTimeReco',
              query:{
                type:1,
              } 
            });
            break;
          case 23:
            this.$router.push({
              path:'/fileReco',
              query:{
                type:1,
              } 
            });
            break;
          case 25:
            this.$router.push({
              path:'/speSyn',
              query:{
                type:1,
              } 
            });
            break;
          case 26:
            this.$router.push({
              path:'/houseData',  //geographySearch
              query:{
                type:2,
              }  
            });
            break;
          case 27:
            this.$router.push({
              path:'/brandSentiment',
              query:{
                type:2,
              }   //geographySearch 
            });
            break;
          case 28:
            this.$router.push({
              path:'/geographySearch',
              query:{
                type:2,
              } 
            });
            break;
          case 29 :
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:1
              }
            });
            break;
          case 30 :
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:2
              }
            });
            break;
          case 31:
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:3
              }
            });
            break;
            case 32:
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:4
              }
            });
            break;
            case 33:
            this.$router.push({ 
              path:'/travelInsights',  
              query:{
                type:2,
              }
            });
            break;  
            case 34:
            this.$router.push({ 
              path:'/foodInsights',  
              query:{
                type:2
              }
            });
            break;
            case 35:
            this.$router.push({ 
              path:'/wuyeInsight',  
              query:{
                type:2
              }
            });
            break;  
          default:
        }
        this.hideMenu()
      },
      goAlgorithm(){
        this.$router.push({
          path:'/algorithm',
          query:{
            type:1
          }
        });
        this.hideMenu()
      },
      hideMenu(){
        this.$emit('closeMenu',false);
      },
      // bigDataPlatChange(parm){
      //   if(parm == 0){
      //     this.$router.push({
      //       path:'/demo',
      //     });
      //    // window.open('https://sfdemo.cloud.sensorsdata.cn/dashboard/?project=RealEstate&dash_type=normal&id=1096&client=')
      //   }
      //   else if(parm == 1){
      //     this.$axios({
      //       method:'post',
      //       url:'http://labs.cnscience.net/users/sign_in?user%5Bloginname%5D=15110111712&user%5Bpassword%5D=zhuxp2020',
      //     }).then(res=>{
      //       if(res.data.status == 1){
      //         window.open('http://labs.cnscience.net/projects/3409/stage.html');
      //       }
      //     }).catch(err=>{
      //       console.log(err)
      //     });
      //   }
      // }
    }
  }
</script>

<style scoped lang='less'>
  .aiSmartApp_menu_container{
    position: absolute;
    z-index: 999;
    top: 90px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 8px 24px 0 #3D4966;
    .sub_container{
      width: 1200px;
      height:542px;
      margin:auto;
      display: flex;
      padding: 30px 0;
      box-sizing: border-box;
      .left{
        width:165px;
        height:100%;
        border-right:1px solid #EBECF0;
        overflow: scroll;
        li{
         font-size: 16px;
         color: #121C33;
         margin-bottom: 20px;
         padding-left:10px;
         border-left:3px solid rgba(0,0,0,0);
         cursor: pointer;
          &:hover{
            color: #03A971;
            border-left:3px solid #03A971;
          }
          &:last-child{
             &:hover{
              border-left:3px solid rgba(0,0,0,0);
            }
          }
        }
      }
      .right{
        flex:1;
        display: flex;
        flex-flow:wrap;
        height:100%;
        padding-left:30px;
        overflow: auto;
        box-sizing: border-box;
        li{
          width: 175px;
          margin-right: 25px;
          margin-bottom: 30px;
          .sub_title{
            font-size: 16px;
            color: #3D4966;
            border-bottom: 1px solid #EBECF0;
            padding:10px 0;
            // cursor: pointer;
            // &:hover{
            //   color: #03A971;
            // }
          }
          .sub_child{
            font-size: 14px;
            color: #7A8499;
            margin-top:18px;
            cursor: pointer;
            span{
              position: relative;
              .hot{
                width:28px;
                position: absolute;
                right:-32px;
                top:-5px;
                img{
                  width: 100%;
                  display: block
                }
              }
            }
            
            &:hover{
              color: #03A971;
            }
          }
        }
      }
    }
   
  }
  .insightData_menu_container,.obserData_menu_container{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
    z-index: 999;
    top: 90px;
    left: 50%;
    transform: translateX(-64%);
    background-color: #FFFFFF;
    box-shadow: 0 8px 24px 0 #3D4966;
    div{
      margin-bottom: 11px;
      font-size: 14px;
      color: #7A8499;
    }
    div:hover{
      color:#03A971;
      cursor: pointer;
      // box-shadow: 0 2px 35px 0 #EBECF0;
    }
    // .falvzonghefenxi:hover{
    //   color:#03A971;
    //   cursor: pointer;
    //   background:rgba(128, 128, 128, 0.1);
    //   box-shadow: 0 2px 35px 0 #EBECF0;
    // }
    // .pinpai:hover{
    //   color:#03A971;
    //   cursor: pointer;
    //   background:rgba(128, 128, 128, 0.1);
    //   box-shadow: 0 2px 35px 0 #EBECF0;
    // }
    // .dili:hover{
    //   color:#03A971;
    //   cursor: pointer;
    //   background:rgba(128, 128, 128, 0.1);
    //   box-shadow: 0 2px 35px 0 #EBECF0;
    // }
  }
  .obserData_menu_container{
    transform: translateX(17%);
    div:hover{
      color:#03A971;
      cursor: pointer;
     // box-shadow: 0 2px 35px 0 #EBECF0;
    }
  }
  .bigDataPlat{
    transform: translateX(88%) !important;
  }
</style>
