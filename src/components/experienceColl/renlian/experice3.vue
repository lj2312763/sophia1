<template>
  <div class="experience">
      <!-- 未成的功能 -->
    <Spin fix v-if="isloading">
          <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
      </Spin>
      <!-- 人脸融合 -->
    <div class="fn_container" v-if="routeId=='6.3.1'">
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
        <div class="right">
          <div class="right_box">
             <Upload
                  ref="upload"
                  type="drag"
                  :show-upload-list="false"
                  :before-upload="handleBeforeUpload11"
                  :max-size="5120"
                  style="width:100%;height:100%"
                  action=""
                  >
                  <div class="right_up">
                      <div class="pic" :class="{ whFlag: !whFlag1 }">
                        <img :src="uploadPic11" alt="">
                      </div>
                      <div class="intro">
                        <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                        <i-button type="success">上传图片</i-button>
                      </div>
                  </div>
              </Upload>
          </div>
        </div>
      </div>
      <p style="font-size: 18px;color: #121C33;margin: 20px 0;">融合结果</p>
      <div class="bottom" style="padding:0 25%" :class="{ whFlag: !whFlag2 }">
          <img :src="result1" alt="">
      </div>
    </div>
     <!-- 人像分割 -->
    <div class="fn_container" v-if="routeId=='6.3.2'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload2"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic2" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result2" alt="">
          <div class="intro">
            <div class="text">分割图</div>
          </div>
        </div>
      </div>
    </div>
    
      <!-- 人像动漫化 -->
    <div class="fn_container" v-if="routeId=='6.3.7'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload3"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic3" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1" :class="{ whFlag: !whFlag }">

          <img :src="result3" alt="">
          <div class="intro">
            <div class="text">效果图</div>
          </div>
        </div>
      </div>
    </div>
      <!-- 人脸属性编辑 -->
    <div class="fn_container" v-if="routeId=='6.3.4'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload4"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic4" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result4" alt="">
          <div class="intro">
            <div class="text">效果图</div>
          </div>
          <div class="tab">
            <div class="tab_li" v-for="(item) in list" @click="change(item)" :class="{'currentActive':item.value==currentValue}" :key="item.value">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
      <!-- 人像渐变 -->
    <!-- <div class="fn_container" v-if="routeId=='6.3.5'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload5"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic5" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1">
          <img :src="result5" alt="">
          <div class="intro">
            <div class="text">效果图</div>
          </div>
        </div>
      </div>
    </div> -->
      <!-- 美颜美白 -->
    <div class="fn_container" v-if="routeId=='6.3.6'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload6"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic6" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result6" alt="">
          <div class="intro">
            <div class="text">效果图</div>
          </div>
        </div>
      </div>
    </div>
      <!-- 美型 -->
    <div class="fn_container" v-if="routeId=='6.3.8'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload7"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic7" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result7" alt="">
           <div class="intro">
            <div class="text">效果图</div>
          </div>
        </div>
      </div>
    </div>
     <!-- 人流量统计 -->
    <div class="fn_container" v-if="routeId=='6.2.2'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload22"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic22" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="uploadPic22" alt="">
          <div class="intro">
            <div class="text">人数：<span style="font-size:24px">{{result22}}</span></div>
          </div>
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
        whFlag:true,
        whFlag1:true,
        whFlag2:true,
        isloading:false,
        currentValue:'TO_OLD',
        list:[
          {img:require("@/assets/images/renlian/renxiang-xiaoguo/old.png"),name:'变老人',value:'TO_OLD'},
          {img:require("@/assets/images/renlian/renxiang-xiaoguo/child.png"),name:'变小孩',value:'TO_KID'},
          {img:require("@/assets/images/renlian/renxiang-xiaoguo/man.png"),name:'变男人',value:'TO_MALE'},
          {img:require("@/assets/images/renlian/renxiang-xiaoguo/woman.png"),name:'变女人',value:'TO_FEMALE'},
        ],
        formData:new FormData(),
        formData1:null,
        result22:45,
        uploadPic22:require("@/assets/images/renlian/renti/3.png"),
        uploadPic1:require("@/assets/images/renlian/renxiang-xiaoguo/1.png"),
        uploadPic11:require("@/assets/images/renlian/renxiang-xiaoguo/2.png"),
        result1:require("@/assets/images/renlian/renxiang-xiaoguo/3.png"),
        uploadPic2:require("@/assets/images/renlian/renxiang-xiaoguo/4.png"),
        result2:require("@/assets/images/renlian/renxiang-xiaoguo/5.png"),
        uploadPic3:require("@/assets/images/renlian/renxiang-xiaoguo/7.png"),
        result3:require("@/assets/images/renlian/renxiang-xiaoguo/72.png"),
        
        uploadPic4:require("@/assets/images/renlian/renxiang-xiaoguo/8.png"),
        result4:'',
        uploadPic5:``,
        result5:``,
        uploadPic6:require("@/assets/images/renlian/renxiang-xiaoguo/8.png"),
        result6:require("@/assets/images/renlian/renxiang-xiaoguo/83.png"),
        uploadPic7:require("@/assets/images/renlian/renxiang-xiaoguo/9.png"),
        result7:require("@/assets/images/renlian/renxiang-xiaoguo/91.png"),
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
        if(this.routeId=='6.3.4'){
           this.getImg(this.uploadPic4,(base64)=>{
              this.uploadPic4=base64;
             // let base1=base64.split('data:image/png;base64,')[1];
             // this.upload4(base1);
              this.upload4(this.list[0].img);
          })
        }
      },
      change(item){
        this.currentValue=item.value;
        if(this.formData1){
          this.handleBeforeUpload4();
        }else{
          //  let base1=this.uploadPic4.split('data:image/png;base64,')[1];
          // this.upload4(base1)
          this.upload4(item.img)
        }
      },
      handleBeforeUpload11(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic11=base64;
          getImgSize(_this.uploadPic11).then(res => {
            _this.whFlag1 = res.flag;
          });
        })
        if(this.formData.get("files1")){
          this.formData.set('files1', file);//
        }else{
           this.formData.append('files1', file);//
        }
        this.compareSimliar();
      },
      handleBeforeUpload1(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic1=base64;
          getImgSize(_this.uploadPic1).then(res => {
            _this.whFlag = res.flag;
          });
          _this.uploadPic11='';
          _this.result1='';
        })
       
        if(this.formData.get("files")){
          this.formData.set('files', file);
        }else{
           this.formData.append('files', file);//
        }
      },
      compareSimliar(){
        if(this.formData.get("files")&&this.formData.get("files1")){
          this.isloading=true;
          this.$axios({
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            },
            method: "post",
            url: window.config.url+"/ai/bdface/merge?img_type=FILES&img_type1=FILES",
            data: this.formData,
          }).then(res => {
           this.isloading=false;
           if(res.data.code == 200000){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              this.result1="data:image/png;base64,"+res.data.data.result.merge_image;
              getImgSize(this.result1).then(res => {
                this.whFlag2 = res.flag;
              });
            }else{
            this.$Message.error('请求失败');
          }
          }).catch(err=>{
            this.isloading=false;
            console.log(err);
          });
        }else{
          alert("请上传图片")
        }
      },
      handleBeforeUpload22(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic22=base64;
          getImgSize(_this.uploadPic22).then(res => {
            _this.whFlag = res.flag;
          });
        })

         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/body/num?img_type=FILES",
          data: formData,
        }).then(res => {
         this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result22=res.data.data.person_num;
          }else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload2(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic2=base64;
          getImgSize(_this.uploadPic2).then(res => {
            _this.whFlag = res.flag;
          });
        })

         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/body/segment?img_type=FILES",
          data: formData,
        }).then(res => {
         this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result2="data:image/png;base64,"+res.data.data.foreground;
            getImgSize(this.result2).then(res => {
              this.whFlag = res.flag;
            });
          }else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload3(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic3=base64;
          getImgSize(_this.uploadPic3).then(res => {
            _this.whFlag = res.flag;
          });
        })

         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/bdface/selfieanime?img_type=FILES",
          data: formData,
        }).then(res => {
         this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result3="data:image/png;base64,"+res.data.data.image;
          }else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload4(file){
        let _this = this;
        if(file){
          imgPreviewBase64(_this, file, function(base64){
            _this.uploadPic4=base64;
            this.result4='';
            getImgSize(_this.uploadPic4).then(res => {
            _this.whFlag = res.flag;
          });
          })
          this.formData1 = new FormData(); //创建form对象
          this.formData1.append('files', file);//
         }
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/bdface/editattr?img_type=FILES&action_type="+this.currentValue,
          data: this.formData1,
        }).then(res => {
         this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result4="data:image/png;base64,"+res.data.data.result.image;
          }else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },
      upload4(base){
       this.isloading=false;
      //  this.$axios({
      //     headers: {
      //         'Accept': '*/*',
      //         'Content-Type': 'multipart/form-data'
      //     },
      //     method: "post",
      //     url: window.config.url+"/ai/bdface/editattr",
      //     params:{
      //       img_type:'BASE64',
      //       action_type:this.currentValue,
      //       image_param:base,
      //     }
      //   }).then(res => {
      //    this.isloading=false;
      //    if(res.data.code == 200000){
      //       if(!res.data.data){
      //         this.$Message.error('返回数据为空');
      //         return;
      //       }
             this.result4=base;
      //     }else{
      //       this.$Message.error('请求失败');
      //     }
      //   }).catch(err=>{
      //     this.isloading=false;
      //     console.log(err);
      //   });

      },  
      handleBeforeUpload6(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic6=base64;
           getImgSize(_this.uploadPic6).then(res => {
            _this.whFlag = res.flag;
          });
        })

         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/face/beautifyv1?imgType=FILES&whitening=100&smoothing=100",
          data: formData,
        }).then(res => {
         this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result6="data:image/png;base64,"+res.data.data.result;
          }else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },
      handleBeforeUpload7(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic7=base64;
          getImgSize(_this.uploadPic7).then(res => {
            _this.whFlag = res.flag;
          });
        })

         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/face/beautifyv2?imgType=FILES&whitening=50&smoothing=50&thinface=50&shrinkFace=50&enlargeEye=50&removeEyebrow=50&filterType=beautify",
          data: formData,
        }).then(res => {
         this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result7="data:image/png;base64,"+res.data.data.result;
          }else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
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
            var base64 = this.getBase64Image(image);
            callback(base64)
          }
      },
  }
}
</script>

<style lang='less'>
  .active{
    border:1px solid #03A971;
  }
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
 .ivu-upload-drag{
  height: 100%;
  background: rgba(192,204,218,0.10);
  border: 1px solid #EBECF0;
}
.ivu-upload-drag:hover {
     border: 1px solid #EBECF0;
}
</style>
<style scoped lang='less'>
  .currentActive{
                    background:#03A971;
                  }
  .experience {
    display: flex;
    width: 100%;
     position: relative;
    .ivu-spin-fix{
      background: none;
      // color:#03a971;
    }
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
      .bottom{
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
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
            width:100%;
            display: block;
          }
            p{
              font-size: 18px;
              color: #121C33;
              margin:20px 0;
              }
            .bm{
              width: 100%;
              box-sizing: border-box;
              border: 1px solid #EBECF0;
              background: rgba(192,204,218,0.10);
              padding:20px;
              font-size: 18px;
              color: #121C33;
              line-height: 30px;
              text-align: justify;
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
          width:49%;
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
           width:49%;
           position: relative;
           background: rgba(192,204,218,0.10);
           border: 1px solid #EBECF0;
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
            .tab{
                width: 80%;
                display: flex;
                align-items: center;
                background: rgba(71,86,105,0.56);
                // border: 1px solid #03A971;
                position: absolute;
                top:20px;
                left:10%;
                box-sizing: border-box;
                .tab_li{
                  border-top: 1px solid #03A971 ;
                  border-bottom: 1px solid #03A971 ;
                  border-right: 1px solid #03A971 ;
                  box-sizing: border-box;
                  flex:1;
                  font-size: 14px;
                  height:100%;
                  color: #FFFFFF;
                  text-align: center;
                  padding:8px 0;
                  cursor: pointer;
                 &:nth-child(1){
                      border-left: 1px solid #03A971 ;
                 }
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
          .right_box{
            height:100%;
            overflow: auto;
            font-size: 14px;
            color: #121C33;
            letter-spacing: 0;
            line-height: 24px;
            // 
            background: rgba(192,204,218,0.10);
            
            &.right_pad{
              padding:10px;
            }
            .right_up{
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
              
            }
          }
        }
        
        }
       
      
    }
  }
</style>
