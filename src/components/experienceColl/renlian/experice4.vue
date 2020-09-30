<template>
  <div class="experience experience1">
      <!-- 已完成的功能 -->
      <Spin fix v-if="isloading">
          <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
      </Spin>
      <!-- 驾驶行为分析 -->
    <div class="fn_container" v-if="routeId=='6.4.1'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="right_box" >
            <div class="title">识别结果：</div>
            <div v-if="result">
              <div style="display:flex">
                  <span style="width:100px">抽烟	</span>
                  <span style="flex:1"><Progress :percent="Number((result.smoke.score*100).toFixed(2))" status="active"> <span>{{Number((result.smoke.score)).toFixed(2)}}</span></Progress></span>
              </div>
               <div style="display:flex">
                 <span style="width:100px">使用手机	</span>
                  <span style="flex:1"><Progress :percent="Number((result.cellphone.score*100).toFixed(2))" status="active"> <span>{{Number((result.cellphone.score)).toFixed(2)}}</span></Progress></span>
              </div>
              <div style="display:flex">
                  <span style="width:100px">未系安全带	</span>
                   <span style="flex:1"><Progress :percent="Number((result.not_buckling_up.score*100).toFixed(2))" status="active"> <span>{{Number((result.not_buckling_up.score)).toFixed(2)}}</span></Progress></span>
              </div>
              <div style="display:flex">
                 <span style="width:100px">双手离开方向盘	</span>
              <span style="flex:1"><Progress :percent="Number((result.both_hands_leaving_wheel.score*100).toFixed(2))" status="active"> <span>{{Number((result.both_hands_leaving_wheel.score)).toFixed(2)}}</span></Progress></span>
              </div>
              <div style="display:flex">
                   <span style="width:100px">视角未看前方	</span>
                  <span style="flex:1"><Progress :percent="Number((result.not_facing_front.score*100).toFixed(2))" status="active"> <span>{{Number((result.not_facing_front.score)).toFixed(2)}}</span></Progress></span>
              </div>
              <div style="display:flex">
                  <span style="width:100px">未正确佩戴口罩	</span>
              <span style="flex:1"><Progress :percent="Number((result.no_face_mask.score*100).toFixed(2))" status="active"> <span>{{Number((result.no_face_mask.score)).toFixed(2)}}</span></Progress></span>
              </div>
              <div style="display:flex">
                   <span style="width:100px">打哈欠	</span>
                  <span style="flex:1"><Progress :percent="Number((result.yawning.score*100).toFixed(2))" status="active"> <span>{{Number((result.yawning.score)).toFixed(2)}}</span></Progress></span>
              </div>
              <div style="display:flex">
                 <span style="width:100px">闭眼	</span>
                  <span style="flex:1"><Progress :percent="Number((result.eyes_closed.score*100).toFixed(2))" status="active"> <span>{{Number((result.eyes_closed.score)).toFixed(2)}}</span></Progress></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- 手势识别 -->
    <div class="fn_container" v-if="routeId=='6.4.4'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload1"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic1" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right" v-if="result1">
          <p> 手势名称：{{result1.classname}}</p>
          <p>概率分数：{{result1.probability}}</p>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
 import { imgPreviewBase64, getImgSize } from '@/assets/js/imgPreviewBase64';
  export default {
     props:['routeId'],
     data() {
      return {
        isloading:false,
        whFlag:true,
        result1:null,
        uploadPic1:require("@/assets/images/renlian/xingwei/3.png"),
        result:null,
        uploadPic:require("@/assets/images/renlian/xingwei/1.png"),
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
      select(){
        this.isloading=true;
        if(this.routeId=='6.4.1'){
          this.getImg(this.uploadPic,()=>{
              // this.uploadPic=base64;
              // let =base64.split('data:image/png;base64,')[1];
              //setTimeout(()=>{
                this.upload();
              //},1500)
          })
        }
        else if(this.routeId=='6.4.4'){
          this.getImg(this.uploadPic1,()=>{
              // this.uploadPic1=base64;
              // let =base64.split('data:image/png;base64,')[1];
              this.upload1();
          })
        }
      },
      handleBeforeUpload1(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic1=base64;
          _this.result1=null;
          getImgSize(_this.uploadPic1).then(res => {
            _this.whFlag = res.flag;
          });
        })

         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/body/gesture?img_type=FILES",
          data: formData,
        }).then(res => {
          this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result1=res.data.data.result[0];
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },
      upload1(base){
        this.isloading=false;
        // this.$axios({
        //   headers: {
        //       'Accept': '*/*',
        //       'Content-Type': 'multipart/form-data'
        //   },
        //   method: "post",
        //   url: window.config.url+"/ai/body/gesture",
        //    params:{
        //     img_type:'BASE64',
        //     image_param:base
        //   }
        // }).then(res => {
        //   if(res.data.code == 200000){
        //     if(!res.data.data){
        //       this.$Message.error('返回数据为空');
        //       return;
        //     }
        //     this.result1=res.data.data.result[0];
               this.result1={top: 108, classname: "Nine", left: 421, probability: 0.8460444808006287, width: 708, height: 893}
        //   }
        //   else{
        //     this.$Message.error('请求失败');
        //   }
        // }).catch(err=>{
        //   console.log(err);
        // });
      },
      handleBeforeUpload(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic=base64;
          _this.result=null;
          getImgSize(_this.uploadPic).then(res => {
            _this.whFlag = res.flag;
          });
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/body/driverbehavior?img_type=FILES",
          data: formData,
        }).then(res => {
          this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            
            this.result=res.data.data.person_info[0].attributes;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },
      upload(base){
        this.isloading=false;
        // this.$axios({
        //   headers: {
        //       'Accept': '*/*',
        //       'Content-Type': 'multipart/form-data'
        //   },
        //   method: "post",
        //   url: window.config.url+"/ai/body/driverbehavior",
        //    params:{
        //     img_type:'BASE64',
        //     image_param:base
        //   }
        // }).then(res => {
        //   if(res.data.code == 200000){
        //     if(!res.data.data){
        //       this.$Message.error('返回数据为空');
        //       return;
        //     }
             this.result={"both_hands_leaving_wheel":{"score":0.96977990865707,"threshold":0.75},"eyes_closed":{"score":0.070456352084875,"threshold":0.55},"no_face_mask":{"score":0.95753675699234,"threshold":0.75},"not_buckling_up":{"score":0.76434111595154,"threshold":0.44},"smoke":{"score":0.013546190224588,"threshold":0.48},"cellphone":{"score":0.10960840433836,"threshold":0.69},"not_facing_front":{"score":0.89651507139206,"threshold":0.5},"yawning":{"score":0.018306172336452,"threshold":0.5},"head_lowered":{"score":0.35811890289187,"threshold":0.55}};
        //   }
        //   else{
        //     this.$Message.error('请求失败');
        //   }
        // }).catch(err=>{
        //   console.log(err);
        // });

      },
      getBase64Image(img) {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
          var dataURL = canvas.toDataURL("image/"+ext);
          return dataURL;
      },
      getImg(val,callback){
          var img = val;
          var image = new Image();
          image.src = img;
          image.setAttribute('crossOrigin', 'anonymous');
          image.onload = ()=>{
           // var base64 = this.getBase64Image(image);
            //callback(base64)
            callback()
          }
      },
  

  }
}
</script>

<style lang='less'>
.experience1{
  .demo-spin-icon-load{
          animation: ani-demo-spin 1s linear infinite;
      }
    .ivu-progress-outer{
              width:85%;
            }
  .ivu-upload-drag{
    height: 100%;
    background: rgba(192,204,218,0.10);
    border: 1px solid #EBECF0;
  }
  .ivu-upload-drag:hover {
      border: 1px solid #EBECF0;
  }
}
</style>
<style scoped lang='less'>
 
  .experience {
    display: flex;
    width: 100%;
    .fn_container{
      width: 100%;
      margin: auto;
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
      .option{
         margin-top:10px;
         .tag{
           padding:5px 10px;
           font-size: 14px;
           background: rgba(0,0,0,0.60);
           float:left;
           color:#fff;
           margin-right:10px;
          margin-bottom:20px;
          cursor:pointer;
          border-radius: 3px;
          &.tagActive{
             background: #03A971;
          }
         }
         .tag1{
            width: 80px;
            margin-right: 20px;
            position: relative;
            opacity: 0.5;
            cursor:pointer;
            float:left;
            img{
              width:100%;
              display:block;
            }
            .typeText{
              width: 100%;
              height: 25px;
              line-height: 25px;
              text-align: center;
              position: absolute;
              left: 0;
              bottom: 0;
              opacity: 0.85;
              background: #121C33;
              font-size: 14px;
              color: #FFFFFF;
            }
          &.tagActive1{
             opacity: 1;
          }
         }
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
        .left{
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
                &.whFlag {
                  height: 400px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  img {
                    width: auto;
                    height: 100%;
                  }

                  canvas {
                    width: auto;
                    height: 100%;
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
        .right{
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
        }
      }
     
      
    }
  }
</style>
