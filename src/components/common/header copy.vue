<template>
  <div class="hello">
    <div class="naviga">
      <div class="naviga_contant">
        <div class="left">
          <div class="top">{{cn_title}}</div>
          <div class="bottom">{{en_title}}</div>
        </div>
        <div class="right" v-show="flag">
          <div class="nav_text">
            <div v-for="(item,index) in nav_text"  :key="index" @click="jumpFn(index)"  @mouseout="hideChange" class="nav_text_container">
              <div class="top" ref="navTextTop" :class="{active:index==navType}" @mouseover="changeShow(index)">{{item}}</div>
              <div class="bottom" v-if="(index == 1) && showTrian1"></div>
              <div class="bottom" v-else-if="(index == 2) && showTrian2"></div>
              <div class="bottom" v-else-if="(index == 3) && showTrian3"></div>
            </div>
            <!-- <div  class="nav_text_container">
                 <div class="top search">
                   <div class="search_pic" @click="showFn">
                      <img src="../../assets/images/search/searchIcon.png" alt="">
                   </div>
                   <div class="search_fun"  v-show="!showSearch">
                     <input  v-model="search_content.title"  @focus="showlistFn" @input="filter"/>
                     <div class="icon_group">
                        <div class="search_pic1"  @click="search">
                          <img src="../../assets/images/search/searchIcon.png" alt="">
                        </div>
                        <div class="close_pic1"  @click="showFn1">
                          <img src="../../assets/images/search/close.png" alt="">
                        </div>
                     </div>
                     <div class="search_list" v-show="showList">
                      <div class="search_p">
                         <p class="title" style="border-bottom:1px solid #acacac;padding:10px 0; color:rgb(181, 188, 198);font-size:16px;margin-top:0">热门产品</p>
                      </div>
                       <div class="search_li" v-for="(item,index) in search_list" :key="index" @click="goSearchDetail(item)">
                         <p class="title">{{item.title}}</p>
                         <p class="subTitle">{{item.subTitle}}</p>
                       </div>
                     </div>
                   </div>
                 </div>
            </div> -->
          </div>
          <div class="sub_btn" @click="goMange" v-show="ifShowSubBtn">{{sub_btn}}</div>
          <div class="user_container" v-show="!ifShowSubBtn">
            <div class="img">
            </div>
            <div class="user">用户名</div>
            <div class="down_icon"></div>
          </div>
        </div>
      </div>
    </div>
    <vMenu v-show="showMenu" :navType='navMenu' @closeMenu='closeMenuFa'></vMenu>
    <vLogin v-if="ifShowLogin" @closeLoginWin='closeLoginWin'></vLogin>
  </div>
</template>

<script>
import vMenu from '../menu/menu';
import vLogin from '../login/login';
export default {
  name: 'home',
  data () {
    return {
      showSearch:true,
      showList:false,
      search_list:[
        {title:'人脸识别',subTitle:'对图像中的人脸及其五官关键点信息进行检测',path:"/aiDetail",oneId:'6',twoRouteId:'6.1',routeId:"6.1.1",type:'1'},
        {title:'图像识别',subTitle:'对图片的内容进行打标识别，可识别上千种标签',path:"/aiDetail",oneId:'3',twoRouteId:'3.1',routeId:"3.1.1",type:'1'},
        {title:'实时语音识别',subTitle:'对音频流做实时转写，达到“边说边出文字”的效果',path:"/aiDetail",oneId:'1',twoRouteId:'1.1',routeId:"1.1.1",type:'1'},
        {title:'卡证文字识别',subTitle:'可以解决通用卡证类的文字识别及识别信息结构化的问题',path:"/aiDetail",oneId:'2',twoRouteId:'2.1',routeId:"2.1.1",type:'1'},
      ],
      search_list1:[
        {title:'人脸识别',subTitle:'对图像中的人脸及其五官关键点信息进行检测',path:"/aiDetail",oneId:'6',twoRouteId:'6.1',routeId:"6.1.1",type:'1'},
        {title:'图像识别',subTitle:'对图片的内容进行打标识别，可识别上千种标签',path:"/aiDetail",oneId:'3',twoRouteId:'3.1',routeId:"3.1.1",type:'1'},
        {title:'实时语音识别',subTitle:'对音频流做实时转写，达到“边说边出文字”的效果',path:"/aiDetail",oneId:'1',twoRouteId:'1.1',routeId:"1.1.1",type:'1'},
        {title:'卡证文字识别',subTitle:'可以解决通用卡证类的文字识别及识别信息结构化的问题',path:"/aiDetail",oneId:'2',twoRouteId:'2.1',routeId:"2.1.1",type:'1'},
      ],
      search_content:{
        title:"请输入关键词"
      },
      cn_title:'Sophia平台',
      en_title:'元知智能研究院',
      nav_text:['首页','AI智能应用','数据洞察','观星台','大数据平台','行为图谱'],
      sub_btn:'管理控制台',
      navType:-1,
      navMenu:-1,
      showTrian1:false,
      showTrian2:false,
      showTrian3:false,
      showTrian4:false,
      ifShowLogin:false,
      ifShowSubBtn:true,
      showMenu:false,
      isActive:true,
      flag:true
    }
  },
  components:{
    vMenu,
    vLogin
  },
  watch:{
    $route(){
      this.navType  = this.$route.query.type?this.$route.query.type:-1;
      this.navMenu  = this.$route.query.type?this.$route.query.type:-1;
    }
  },
  created(){
      if(this.$route.path=="/experienceColl2"){
        this.flag=false;
      }else{
         this.flag=true;
      }
  },
  methods:{
    filter(){
      let arr=[];
      this.search_list1.forEach(item=>{
        if(item.title.indexOf(this.search_content.title)>=0){
            arr.push(item);
        }
        this.search_list=arr;
      })
    },
    goSearchDetail(item){
      this.showList=false;
      this.showSearch=!this.showSearch;
      this.search_content=item;
      this.$router.push({
        path:item.path,
        query:{
          oneId:item.oneId,
          twoRouteId:item.twoRouteId,
          routeId:item.routeId,
        }
      })
    },
    search(){
      this.showList=false;
      this.showSearch=!this.showSearch;
      if(this.search_content.path){
         this.$router.push({
            path:this.search_content.path,
            query:{
              oneId:this.search_content.oneId,
              twoRouteId:this.search_content.twoRouteId,
              routeId:this.search_content.routeId,
            }
          })
      }
    },
    showFn(){
      this.showSearch=false;
    },
    showlistFn(){
       this.showList=true;
    },
    showFn1(){
      this.showList=false;
      this.showSearch=!this.showSearch;
    },
    jumpFn(index){
      if(index==0){
        this.$router.push({
          path:'/home',
        })
      }
      else if(index === 4){
        this.$router.push({
          path:'/bigDataPlat',
        })
      }
      else if(index === 5){
        this.ifShowLogin = true;
      }
    },
    changeShow(index){
      var dom = this.$refs.navTextTop;
      for(var i = 0;i< dom.length;i++){
        dom[i].style = 'border:none;';
      }
      this.navType = index;
      this.navMenu = index;
      if(index == 1){
        this.showMenu = true;
        this.showTrian1 = true;
        this.showTrian2 = false;
        this.showTrian3 = false;
        this.showTrian4 = false;
      }else if(index == 2){
        this.showMenu = true;
        this.showTrian1 = false;
        this.showTrian2 = true;
        this.showTrian3 = false;
        this.showTrian4 = false;
      }else if(index == 3){
        this.showMenu = true;
        this.showTrian1 = false;
        this.showTrian2 = false;
        this.showTrian3 = true;
        this.showTrian4 = false;
      }else if(index == 4){
        this.showMenu = true;
        this.showTrian1 = false;
        this.showTrian2 = false;
        this.showTrian3 = false;
        this.showTrian4 = true;
      }
      else{
        this.showMenu = false;
        this.showTrian1 = false;
        this.showTrian2 = false;
        this.showTrian3 = false;
        this.showTrian4 = false;
      }
    },
    closeMenuFa(arg){
      this.showMenu = arg;
      this.showTrian1 = arg;
      this.showTrian2 = arg;
      this.showTrian3 = arg;
      this.showTrian4 = arg;
    },
    hideChange(){
        this.navType=-1;
    },
    goMange(){
      window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
    },
    closeLoginWin(arg){
      this.ifShowLogin = arg;
    }
  }
}
</script>

<style scoped lang='less'>

.naviga{
  width: 100%;
  height: 90px;
  background-color:  #3C3C46;
  display: flex;
  align-items: center;
  justify-content: center;
  .naviga_contant{
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 230px;
      .top{
        font-size: 24px;
        color: #FFFFFF;
        letter-spacing: 0.5px;
      }
      .bottom{
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 5px;
      }
    }
    .right{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      .nav_text{
        display: flex;
        height: 90px;
        .nav_text_container{
          font-size: 16px;
          color: #FFFFFF;
          margin-right: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          .active{
            box-sizing: border-box !important;
            padding-bottom:3px !important;
            border-bottom: 3px #ffffff solid !important
          }
          :hover{
            cursor: pointer;
          }
          .top{
            margin-top: 30px;
            &.search{
              position: relative;
              .search_pic{
                width:19px;
              }
              img{
                  width: 100%;
                  display: block;
                }
              .search_fun{
                // display: none;
                position: absolute;
                width: 650px;
                height: 45px;
                right: -2px;
                top:-9px;
                padding:5px 5px;
                padding-left: 20px;
                border-radius: 4px;
                border-radius: 4px;
                background: #fff;
                border: 1px solid #B8BECC;
                z-index: 20;
                .search_list{
                    position: absolute;
                    left:0;
                    top:55px;
                    width: 100%;
                    height: 300px;
                    border-radius: 6px;
                    background: #fff;
                    z-index: 50;
                    padding:0 20px;
                    padding-bottom: 20px;
                    overflow: auto;
                    .search_li{
                        .title{
                          color:#3D4966;
                          font-size: 16px;
                          margin-bottom: 5px;
                          margin-top: 10px;
                           &:hover{
                            color:#03A971;
                          }
                        }
                        .subTitle{
                           color:#7A8499;
                           font-size: 12px;
                        }
                    }
                  }
                .icon_group{
                  position: absolute;
                  right:4px;
                  top:0;
                  display: flex;
                  width: 71px;
                  height: 100%;
                  align-items: center;
                  .search_pic1{
                    width: 31px;
                    padding-right:10px;
                  }
                  .close_pic1{
                    width: 28px;
                    padding-left:10px;
                    border-left: 1px solid  #B8BECC;;
                  }
                }
                input{
                  width: 100%;
                  height: 100%;
                  font-size: 14px;
                  color: #B8BECC;
                }
              }
            }
          }
          .bottom{
            width: 0; 
            height: 0;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #FFF transparent;
          }
        }
      }
      .sub_btn{
        background: #03A971;
        border-radius: 3px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        padding: 10px 38px;
        box-sizing: border-box;
      }
      .user_container{
        display: flex;
        align-items: center;
        flex-grow: 1;
        .img{
          height: 40px;
          width: 40px;
          border-radius: 40px;
          margin-right: 10px;
          margin-left: 60px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 40px;
          }
        }
        .user{
          color: #FFF;
        }
      }
      .sub_btn:hover{
        cursor: pointer;
      }
    }
  }
}
.banner{
  width: 100%;
  height: 500px;
  .ivu-carousel{
    width: 100%;
    height: 500px;
    .demo-carousel{
      width: 100%;
      height: 500px;
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
