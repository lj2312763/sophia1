<template>
  <div class="experience">
    <Spin fix v-if="ifShowLoading">
        <Icon type="ios-loading" size=88 class="demo-spin-icon-load"></Icon>
        <div>获取数据中，请稍后...</div>
    </Spin>
    <!-- 灰度图转换 -->
    <div class="fn_container" v-if="routeId=='3.4.15'">
      <div class="content">
        <div class="leftn left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="huidutuBeforeUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{'whFlag': !whFlag}">
                       <img :src="huiduLeftImg" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="rightn right1" :class="{'whFlag': !whFlag}">
          <img :src="huiduResult" alt="">
           <div class="intro">
              <div class="text">处理后</div>
            </div>
        </div>
      </div>
    </div>

    <!-- 创建缩略图 -->
    <div class="fn_container" v-if="routeId=='3.4.17'">
      <div class="content">
        <div class="leftn left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="suolueBeforeUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{'whFlag': !whFlag}">
                       <img :src="suolueLeftImg" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="rightn right1 scaleType">
           <div class="img_container" :class="{'whFlag': !whFlag}">
              <img :src="suolueResult" ref="suolueImg" alt="">
           </div>
           <div class="scaleType_container" ref="scaleType"><div class="type75" @click="changeStyle(0)">75%</div><div class="type50" @click="changeStyle(1)">50%</div><div class="type25" @click="changeStyle(2)">25%</div></div>
        </div>
       
      </div>
    </div>

  </div>
</template>
<script>
 import { imgPreviewBase64, getImgSize } from '@/assets/js/imgPreviewBase64';
export default {
  props:{
    routeId:{
      type:String
    }
  },
  data () {
    return {
      whFlag:true,
      huiduLeftImg:window.config.url+"/sophia/static/images/xiaoguo/color_cat.png",
      suolueLeftImg:window.config.url+'/sophia/static/images/xiaoguo/suolue1.png',
      huiduResult:window.config.url+'/sophia/static/images/xiaoguo/no_color_cat.png',
      suolueResult:require('@/assets/images/tuxiang/suolue2.png'),
      scaleType:0.5,
      suolueFile:null,
      ifShowLoading:false
    }
  },
  mounted(){
    this.select();
  },
  watch:{
    routeId(newVal,oldVal){
      this.select();
    }
  },
  methods:{
    changeStyle(num){
      if(num == 0){
        this.scaleType = 0.75
      }
      else if(num == 1){
        this.scaleType = 0.5
      }
      else if(num == 2){
        this.scaleType = 0.25
      }
      var scaleTypeDom = this.$refs.scaleType.childNodes;
      for(var i = 0;i < scaleTypeDom.length;i++){
        if(i == num){
          scaleTypeDom[i].style='background: #03A971;';
        }
        else{
          scaleTypeDom[i].style='background: #B8BECC;';
        }
      }
      this.suolueBeforeUpload();
    },
    select(){
      if(this.routeId=='3.4.15'){
        // this.initHuiduUpload(this.uploadPic);
      }
      else if(this.routeId=='3.4.17'){
        // this.initSuolueUpload(this.uploadPic);
      }
    },
    initSuolueUpload(base){
      this.$axios({
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        },
        method: "post",
        url: window.config.url+"/api/photo/scale",
        params:{
          img_type:'URL',
          image_param:base
        }
      }).then(res => {
        if(res.data.code == 200000){
          if(!res.data.data){
            this.$Message.error('返回数据为空');
            return;
          }
          this.result43="data:image/jpeg;base64,"+res.data.data.image;
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    suolueBeforeUpload(file){
      this.ifShowLoading = true;
      var size = this.scaleType;
      let formData = new FormData(); 
      var totalFile;
      if(file){
        this.suolueFile = file;
        totalFile = file;
      }
      else{
        totalFile = this.suolueFile;
      }
      if(!totalFile){
          var suolueImg = this.$refs.suolueImg;
          if(size == 0.75){
            suolueImg.style='width:75%';
          }
          else if(size == 0.5){
            suolueImg.style='width:50%';
          }
          else if(size == 0.25){
            suolueImg.style='width:25%';
          }
          getImgSize(this.suolueResult).then(res=>{
            this.whFlag=res.flag;
          })
        this.ifShowLoading = false;
        return
      }
      formData.append('file', totalFile);
      formData.append('size', size);
      this.suolueResult='';
      // this.suolueLeftImg='';
      this.$axios({
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        },
        method: "post",
        url: window.config.url+"/api/photo/scale",
        data: formData,
      }).then(res => {
        if(res.data.code == 200){
          if(!res.data){
            this.$Message.error('返回数据为空');
            return;
          }
          var suolueImg = this.$refs.suolueImg;
          if(size == 0.75){
            suolueImg.style='width:75%';
          }
          else if(size == 0.5){
            suolueImg.style='width:50%';
          }
          else if(size == 0.25){
            suolueImg.style='width:25%';
          }
          this.ifShowLoading = false;
          var resultData = res.data;
          this.suolueResult = res.data.modify;
          this.suolueLeftImg = res.data.local;
          getImgSize(this.suolueResult).then(res=>{
            this.whFlag=res.flag;
          })
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    huidutuBeforeUpload(file){
      var that = this;
      var url = window.config.url+'/api/photo/convert';
      var formData = new FormData(); 
      formData.append('file',file);
      this.ifShowLoading = true;
      this.huiduResult = '';
      // this.huiduLeftImg = '';
      this.$axios({
        url:url,
        method:'post',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
         this.ifShowLoading = false;
        if(res.data.code == 200){
          if(!res.data){
            this.$Message.error('返回数据为空');
            return;
          }
          var imgData = res.data;
          that.huiduLeftImg = imgData.local;
          that.huiduResult = imgData.modify;
          getImgSize(that.huiduLeftImg).then(res=>{
            that.whFlag=res.flag;
          })
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
         this.ifShowLoading = false;
        console.log(err)
      });
    },
    initHuiduUpload(base){
      this.$axios({
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        },
        method: "post",
        url: window.config.url+"/ai/image/qualityenhance",
        params:{
          img_type:'URL',
          image_param:base
        }
      }).then(res => {
        if(res.data.code == 200000){
          if(!res.data.data){
            this.$Message.error('返回数据为空');
            return;
          }
          this.result43="data:image/png;base64,"+res.data.data.image;
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        console.log(err);
      });
    },
  }
}
</script>
<style scoped lang='less'>
 
  .experience {
     position: relative;
     .demo-spin-icon-load{
     animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-spin-fix{
      background: none;
      // color:#03a971;
    }
  }
    .fn_container{
      width: 100%;
      margin: auto;
      position: relative;
      .radio_box{
        margin-bottom: 20px;
      }
      p{
        font-size: 14px;
        color: #7A8499;
        text-align: justify;
        line-height: 24px;
        margin-top: 10px;
      }
      .content{
         width: 100%;
         display: flex;
         justify-content: space-between;
        .title{
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .leftn{
          width:649px;
          &.left_box1{
            width:49%;
          }
          .left_box{
            // background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            .left_up{
              width: 100%;height:100%;background: rgba(192,204,218,0.10);
              position: relative;
              .pic{
                width: 100%;
               &.whFlag{
                  height:420px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  img{
                    width: auto;
                    height:100%;
                  }
                   canvas{
                    width:auto;
                    height:100%;
                  }
                }
                img{
                  width: 100%;
                  display: block;
                }
              }
              .intro{
                display: flex;
                justify-content: space-between;
                padding:0 15px;
                align-items: center;
                opacity: 0.85;
                background: #121C33;
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                height: 50px;
                .text{
                   font-size: 12px;
                  color: #FFFFFF;
                  text-align: justify;
                }
               
              }
            }
          }
        }
        .left{
          width:649px;
          &.left1{
            width:50% !important;
          }
          .left_box{
            // background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            .left_up{
              width: 100%;height:100%;background: rgba(192,204,218,0.10);
              position: relative;
              .pic{
                width: 100%;
                &.whFlag{
                  height:420px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  img{
                    width: auto;
                    height:100%;
                  }
                   canvas{
                    width:auto;
                    height:100%;
                  }
                }
                img{
                  width: 100%;
                  display: block;
                }
              }
              .intro{
                display: flex;
                justify-content: space-between;
                padding:0 15px;
                align-items: center;
                opacity: 0.85;
                background: #121C33;
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                height: 50px;
                .text{
                   font-size: 12px;
                  color: #FFFFFF;
                  text-align: justify;
                }
               
              }
            }
          }
        }
        .rightn{
          flex:1;
          overflow: auto;
          font-size: 14px;
          color: #121C33;
          letter-spacing: 0;
          line-height: 24px;
          padding:10px;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          position: relative;
          &.right1{
             width:49%;
             padding:0;
             flex:none;
             &.whFlag{
              height:420px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              img{
                width: auto;
                height:100%;
              }
                canvas{
                width:auto;
                height:100%;
              }
            }
             img{
               width: 100%;
               display:block;
             }
             .intro{
                display: flex;
                justify-content: space-between;
                padding:0 15px;
                align-items: center;
                opacity: 0.85;
                background: #121C33;
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                height: 50px;
                .text{
                  font-size: 12px;
                  color: #FFFFFF;
                  text-align: justify;
                }
                
              }
          }
         .right_content{
            font-size: 14px;
            color: #3D4966;
            letter-spacing: 0;
            line-height: 28px;
         }
         .img_container{
           display: flex;
           align-items: center;
           justify-content: center;
           min-height: 272px;
           width: 100%;
           &.whFlag{
            height:352px;
            overflow: hidden;
            // img{
            //   width: auto;
            //   height:100%;
            // }
          }
           img{
             width: 50%;
           }
         }
         .scaleType_container{
           width: 100%;
           display: flex;
           padding: 20px 0;
           align-items: center;
           justify-content: center;
           .type75,.type50,.type25{
              background: #B8BECC;
              border-radius: 3px;
              margin-right: 15px;
              padding: 2px 15px;
              font-size: 14px;
              color: #FFFFFF;
           }
           .type50{
              background: #03A971;
           }
         }
        }
        .scaleType{
          display: flex;
          flex-direction: column;
        }
        .demo-spin-icon-load{
            animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
            from { transform: rotate(0deg);}
            50%  { transform: rotate(180deg);}
            to   { transform: rotate(360deg);}
        }
        .demo-spin-col{
            border: 1px solid #eee;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            /deep/.ivu-spin-text{
              width: 200px;
            }
        }
        .right{
           position:relative;
          flex:1;
          overflow: auto;
          font-size: 14px;
          color: #121C33;
          letter-spacing: 0;
          line-height: 24px;
          padding:10px;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          .intro{
                display: flex;
                justify-content: space-between;
                padding:0 15px;
                align-items: center;
                opacity: 0.85;
                background: #121C33;
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                height: 50px;
                .text{
                   font-size: 12px;
                  color: #FFFFFF;
                  text-align: justify;
                }
               
              }
         .right_content{
            font-size: 14px;
            color: #3D4966;
            letter-spacing: 0;
            line-height: 28px;
         }

        }
      }
    }
</style>

