<template>
  <div class="experience">
     <Spin fix v-if="isloading">
          <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
      </Spin>
      <!-- 已完成的功能 -->
    <!-- 汽车场景文字识别 -->
    <!-- 车牌识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.3.3'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload3"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
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
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg3">
          </div>
        </div>
      </div>
    </div>
    <!-- VIN码识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.3.4'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload4"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
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
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg4">
          </div>
        </div>
      </div>
    </div>
    <!-- 车辆合格证识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.3.5'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload5"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
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
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg5">
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
        isloading:false,     
        uploadPic3:require("@/assets/images/carSence/3.png"),
        msg3:``,
        uploadPic4:require("@/assets/images/carSence/4.png"),
        msg4:``,
        uploadPic5:require("@/assets/images/carSence/6.png"),
        msg5:``
      }
    },
    created() {
    },
    mounted(){
      let _this=this;
      $(document).ready(function(){
        _this.msg3=`<p>车牌号：京KBT355</p>
            <p>车牌颜色：blue</p>`;
        _this.msg4=`<p>VIN号码：LDC973249H2057345`;
        _this.msg5=`<p>合格证编号：F0S23527BF54</p>
            <p>发证日期：2019年01月21日</p>
            <p>车辆制造企业名称：</p>
            <p>车辆品牌：乘龙牌</p>
            <p>车牌名称：厢式运输车</p>
            <p>车辆型号：LZ5250605</p>
            <p>车架号：01GS423568GF7443</p>
            <p>车身颜色：白/蓝/黄</p>
            <p>发动机型号：YC6JA240</p>
            <p>发动机号：JA3L4J3</p>
            <p>燃料种类：柴油</p>
            <p>排量：6870</p>
            <p>功率：</p>
            <p>排放标准：GB17691-2005国V,GB3847-2005</p>
            <p>轮胎数：</p>
            <p>转向形式：方向盘</p>
            <p>总质量：25000</p>
            <p>整备质量：10020</p>
            <p>车辆制造日期：2018年12月12日-</p>`;
      })
    },
    methods:{  
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
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/licensePlate",
          data: formData,
        }).then(res => {
          this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            if(res.data.data){
              //this.uploadPic2="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>车牌号：${result.number}</p>`;
              html += `<p>车牌颜色：${result.color}</p>`;
              this.msg3=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload4(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic4=base64; 
          getImgSize(_this.uploadPic4).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
          this.isloading=true;
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/vinCode",
          data: formData,
        }).then(res => {
          this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            if(res.data.data){
              //this.uploadPic4="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>VIN号码：${result.words}</p>`;
              this.msg4=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload5(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic5=base64;
          getImgSize(_this.uploadPic5).then(res => {
            _this.whFlag = res.flag;
          });  
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
          this.isloading=true;
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/vehicleCertificate",
          data: formData,
        }).then(res => {
          this.isloading=false;
         if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            if(res.data.data){
              //this.uploadPic5="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>合格证编号：${result.CertificationNo}</p>`;
              html += `<p>发证日期：${result.CertificateDate}</p>`;
              html += `<p>车辆制造企业名称：${result.Manufacturer}</p>`;
              html += `<p>车辆品牌：${result.CarBrand}</p>`;
              html += `<p>车牌名称：${result.CarName}</p>`;
              html += `<p>车辆型号：${result.CarModel}</p>`;
              html += `<p>车架号：${result.VinNo}</p>`;
              html += `<p>车身颜色：${result.CarColor}</p>`;
              html += `<p>发动机型号：${result.EngineType}</p>`;
              html += `<p>发动机号：${result.EngineNo}</p>`;
              html += `<p>燃料种类：${result.FuelType}</p>`;
              html += `<p>排量：${result.Displacement}</p>`;
              html += `<p>功率：${result.Power}</p>`;
              html += `<p>排放标准：${result.EmissionStandard}</p>`;
              html += `<p>轮胎数：${result.TyreNum}</p>`;
              html += `<p>转向形式：${result.SteeringType}</p>`;
              html += `<p>总质量：${result.TotalWeight}</p>`;
              html += `<p>整备质量：${result.SaddleMass}</p>`;
              html += `<p>车辆制造日期：${result.ManufactureDate}</p>`;
              
              this.msg5=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          this.isloading=false;
          console.log(err);
        });
      } 
  }
}
</script>

<style lang='less'>
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
          flex:1;
          .left_box{
            height: 290px;
            // background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            .left_up{
              width: 100%;height:100%;background: rgba(192,204,218,0.10);
              position: relative;
              .pic{
                width: 100%;
                &.whFlag {
                  height: 100%;
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
           margin-left:20px;
          .right_box{
            overflow: auto;
            font-size: 14px;
            color: #121C33;
            letter-spacing: 0;
            line-height: 24px;
            padding:10px;
            height: 290px;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
          }
        }
      }
     
      
    }
  }
</style>
