<template>
  <div>
      <div class="listed_compan_container" v-for="(item,index) in obserStarData" :key="index">
          <div class="left">
              <div class="header" :style="{backgroundColor:currentColor}">{{item.category}}</div>
          </div>
          <div class="middle">
              <div class="title">{{item.dataType}}</div>
              <div class="desc">{{item.description}}</div>
              <div class="date">
                  <div class="down_load">时间:2020-3-10</div>&nbsp;&nbsp;
                  <div class="down_load">下载次数:571</div>&nbsp;&nbsp;
                  <div class="invok">数据容量:{{item.capacity}}</div>
              </div>
          </div>
          <div class="right">
              <!-- :href="item.href" -->
              <a class="top" @click="downLoad(item)">下载</a>
          </div>
      </div>
      <div class="page_container">
          <Page :total="totalNum" :page-size='pageSize' @on-change="changePage"/>
      </div>
      <vLogin v-if="ifShowLogin" @closeLoginWin='closeLoginWin'></vLogin>
  </div>
</template>

<script>
import vLogin from '../login/login';
  export default {
      props:{
          obserStarData:{
              type:Array,
              required:true,
              default:[]
          },
          totalNum:{
            type:Number
          },
          pageSize:{
              type:Number
          }
      },
      created(){
            this.pointType=this.$route.query.pointType;
            if(this.pointType=="1"){//图像
                this.currentColor='#FE5560 ';
            }
            else if(this.pointType=="0"){//视频
                this.currentColor='#13BFC1';
            }
            else if(this.pointType=="2"){//文本
                this.currentColor='#FFC10D ';
            }
            else if(this.pointType=="4"){//语音
                this.currentColor='#4A90E2';
            }
      },
      data(){
          return{
              currentColor:'',
              pointType:'',
              ifShowLogin:false
          }
      },
      components:{
          vLogin
      },
      methods:{
        closeLoginWin(arg) {
            this.ifShowLogin = arg;
            if(localStorage.username){
                if(this.downloadUrl){
                location.href=this.downloadUrl;
                }
            }
        },
        downLoad(item){
            this.downloadUrl="https://yuanzhi-data.oss-cn-beijing.aliyuncs.com/trainDataSet/"+item.fileName;
            if(!localStorage.username){
                this.ifShowLogin = true;
            }else{
                location.href=this.downloadUrl;
            }
        },
        changePage (val) {
            var baseUrl = window.config.url+'';
            let category="";
            var pointType = this.pointType;
            if(pointType == 0){
                 category="视频"
            }else if(pointType == 1){
                 category="图像"
            }else if(pointType == 2){
                 category="文本"
            }else if(pointType == 3){
                 category="语音"
            }
            this.$axios({
                method: "get",
                url: baseUrl + "/insight/algorithm/listAlgorithmDataset",
                params: {
                    category:category,
                    pageIndex:val,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                if(res.status == 200){
                    var videoList = res.data.data;
                    var totalNum = videoList.totalNum;
                    this.$emit('updateListData',[videoList.data,totalNum]);
                }
            }).catch(err=>{
                console.log(err)
            });
        },
      }
  }
</script>

<style scoped lang='less'>
.listed_compan_container{
    width: 1200px;
    height: 220px;
    padding: 34px 73px 34px 40px;
    box-sizing: border-box;
    display: flex;
    align-items:flex-start;
    // justify-content: space-between;
    margin-bottom: 40px;
    border: 1px solid #C2C4CC;
    .left{
        width: 49px;
        margin-right: 39px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .header{
          margin: auto;
          border-radius:50%;
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          color:#fff;
          background:#ccc;
        }
        .year_month{
            font-size: 14px;
            color: #3D4966;
            letter-spacing: 0;
        }
    }
    .middle{
        width:621px;
        margin-right: 232px;
        .title{
            font-size: 17px;
            color: #121C33;
            margin-bottom: 10px;
        }
        .desc,.date{
            font-size: 14px;
            color: #7A8499;
            letter-spacing: 0;
            line-height: 24px;
        }
        .desc{
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .date{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #3D4966;
            letter-spacing: 0;
            .down_load{
                margin-right: 30px;
            }
            div{
                margin-bottom: 20px;
            }
        }
    }
    .right{
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        .top,.bottom{
            width: 120px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 16px;
        }
        .top,.bottom:hover{
            cursor: pointer;
        }
        .top{
            margin-bottom: 20px;
            background-color: #03A971;
            color: #ffffff;
            border-radius: 3px;
        }
        .bottom{
            color: #03A971;
            border: 1px #03A971 solid;
            border-radius: 3px;
        }
    }
}
.page_container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
}
</style>
