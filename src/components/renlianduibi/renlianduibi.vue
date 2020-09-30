<template>
  <div class="experience">
    <!-- 未成的功能 -->
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>{{loadingText}}</div>
    </Spin>
    <!-- 人脸对比 -->
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="left_box">
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
                  <img :src="uploadPic1" alt="" />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
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
              :before-upload="handleBeforeUpload2"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="right_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic2" alt="" />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p>分析结果</p>
        <div class="bm">相似度：{{ simlar }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";
export default {
  props: ["routeId"],
  data() {
    return {
      isloading: true,
      whFlag: true,
      uploadPic2: require("@/assets/images/renlian/renliansousuo.png"),
      msg1: ``,
      uploadPic1: require("@/assets/images/renlian/9.png"),
      resultContent: "",
      msg: ``,
      formData: new FormData(),
      simlar: "",
      loadingText:'加载中...'
    };
  },
  mounted() {
    this.select();
  },
  watch: {
    routeId(newVal, oldVal) {
      this.select();
    }
  },
  methods: {
    select() {
      this.isloading = true;
      this.getImg(this.uploadPic1, base64 => {
        this.uploadPic1 = base64;
        let base1 = base64.split("data:image/png;base64,")[1];
        this.getImg(this.uploadPic2, res => {
          this.uploadPic2 = res;
          let base2 = res.split("data:image/png;base64,")[1];
          this.uploadSimliar(base1, base2);
        });
      });
    },
    handleBeforeUpload2(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic2 = base64;
        getImgSize(_this.uploadPic2).then(res => {
          _this.whFlag = res.flag;
        });
      });
      if (this.formData.get("files1")) {
        this.formData.set("files1", file); //
      } else {
        this.formData.append("files1", file); //
      }
      this.compareSimliar();
    },
    handleBeforeUpload1(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic1 = base64;
        _this.uploadPic2 = "";
        _this.simlar = "";
        getImgSize(_this.uploadPic1).then(res => {
          _this.whFlag = res.flag;
        });
      });
      if (this.formData.get("files")) {
        this.formData.set("files", file); //
      } else {
        this.formData.append("files", file); //
      }
    },
    compareSimliar() {
      if (this.formData.get("files") && this.formData.get("files1")) {
        this.isloading = true;
        this.$axios({
          method: "post",
          url: window.config.url + "/face/similarity/image",
         data: { app_id: 'system', app_secret: '12345', imgA: this.uploadPic1.split("base64,")[1], imgB: this.uploadPic1.split("base64,")[1] }
        })
          .then(res => {
            this.isloading = false;
            if (res.data.result == 0) {
              this.simlar = (res.data.score * 100).toFixed(2) + "%";
            } else {
              this.$Message.error("请求失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("请上传图片");
      }
    },
    uploadSimliar(img1, img2) {
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/bdface/match",
      //   params: {
      //     img_type: "BASE64",
      //     image_param: img1,
      //     img_type1: "BASE64",
      //     image_param1: img2
      //   }
      // })
      //   .then(res => {
            this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
      //       let result = res.data.data;
            this.simlar ='87.29%';
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
    getImg(val, callback) {
      var img = val;
      var image = new Image();
      image.src = img;
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = () => {
        var base64 = this.getBase64Image(image);
        callback(base64);
      };
    }
  }
};
</script>

<style lang="less">
.itemActive {
  border: 3px solid #03a971;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.ivu-upload-drag {
  height: 100%;
  background: rgba(192, 204, 218, 0.1);
  border: 1px solid #ebecf0;
}
.ivu-upload-drag:hover {
  border: 1px solid #ebecf0;
}
</style>
<style scoped lang="less">
.experience {
  display: flex;
  width: 100%;
  position: relative;
  .ivu-spin-fix {
    background: none;
    // color:#03a971;
  }
  .fn_container {
    width: 100%;
    margin: auto;
    .huoti_content{
      width: 100%;
      height: 400px;
      display: flex;
      .huoti_left{
        width: 585px;
        height: 100%;
        background: rgba(192,204,218,0.1);
        border: #EBECF0 0.5px solid;
        position: relative;
        overflow: hidden;
        .oper_info{
          width: 100%;
          font-family:'PingFangSC-Regular';
          font-size: 14px;
          color: #03A971;
          text-align: center;
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
        }
        .time_cicle{
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          opacity: 0.6;
          background: #03A971;
          border-radius: 50%;
          text-align: center;
          line-height: 32px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
        }
        .yanzhenM_container{
          position: absolute;
          left: 0;
          bottom: 50px;
          margin-bottom:10px;
          width: 100%;
          display: flex;
          justify-content: center;
          .yanzhenM{
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .yanzhenM_item{
              width: 21px;
              height: 27px;
              opacity: 0.8;
              background: black;
              color: #03A971;
              border-radius: 2px;
              text-align: center;
              line-height: 27px;
            }
          }
        }
        .huoti_video{
          width: 100%;
        }
        .kuang{
          width: 300px;
          position: absolute;
          top: 51px;
          left: 50%;
          transform: translateX(-50%);
          .kuangImg{
            width: 100%;
          }
        }
        .oper_btn_container{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 50px;
          background: rgba(18,28,51,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          .btn_content{
            width: 200px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            .dianT,.zhanY,.duS{
              width: 60px;
              height: 30px;
              background: #7A8499;
              border-radius: 3px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FFFFFF;
              text-align: center;
              line-height: 30px;
            }
          }
        }
      }
      .huoti_right{
        width: 411px;
        height: 100%;
        background-color:#F2F4F7;
        position: relative;
        .jiance_title{
          width: 100%;
          margin-top: 40px;
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #121C33;
          text-align: center;
        }
        .jiance_dushu_success_Score,.jiance_dushu_fail_Score{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 26px;
          .success_img,.fail_img{
            width: 40px;
            height: 40px;
            margin-bottom: 8px;
          }
          .success_text{
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #03A971;
            text-align: center;
          }
          .fail_text{
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #E02020;
            text-align: center;
          }
        }
        .tishi_info{
          width: 100%;
          height: 170px;
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          .tishi_title{
            width: 100%;
            height: 25px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #121C33;
            text-align: center;
            line-height: 25px;
          }
          .tishi_content{
            width: 348px;
            flex: 1;
            padding-bottom: 29px;
            padding-top: 25px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tishi_one,.tishi_two,.tishi_three,.tishi_fore{
              width: 72px;
              height: 100px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .img{
                width: 64px;
              }
              .text{
                margin-top: 10px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #7A8499;
                text-align: center;
              }
            }
          }
        }
      }
    }
    .radio_box {
      margin-bottom: 20px;
    }
    p {
      font-size: 14px;
      color: #7a8499;
      text-align: justify;
      line-height: 24px;
      margin-top: 10px;
    }
    .bottom {
      width: 100%;
      margin-bottom: 60px;
      p {
        font-size: 18px;
        color: #121c33;
        margin: 20px 0;
      }
      .bm {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ebecf0;
        background: rgba(192, 204, 218, 0.1);
        padding: 20px;
        font-size: 18px;
        color: #121c33;
        line-height: 30px;
        text-align: justify;
      }
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        color: #121c33;
        margin-bottom: 20px;
      }
      .left {
        width: 49%;
         position: relative;
        canvas {
          width: 100%;
        }
         #canvas3 {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 111;
          }
          .shadow {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 113;
            width: 100%;
            animation: manyou 3s linear infinite;
            img {
              width: 100%;
              display: block;
            }
          }
          @keyframes manyou {
            0% {
              top: 0;
            }
            100% {
              top: 334px;
            }
          }
        .left_box {
          // background: rgba(192,204,218,0.10);
          border: 1px solid #ebecf0;
          height: 100%;
          .left_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .pic {
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
              img {
                width: 100%;
                display: block;
              }
            }
            .intro {
              display: flex;
              justify-content: space-between;
              padding: 0 15px;
              align-items: center;
              opacity: 0.85;
              background: #121c33;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50px;
              .text {
                font-size: 12px;
                color: #ffffff;
                text-align: justify;
              }
            }
          }
        }
      }
      .right {
        width: 49%;
        background: rgba(192, 204, 218, 0.1);
        canvas {
          width: 100%;
        }
         .resultText {
            margin-top: 39px;
            margin-bottom: 38px;
            font-size: 18px;
            color: #121c33;
            text-align: center;
          }
          .imgHeader {
            border-radius: 50%;
            overflow: hidden;
            width: 180px;
            height: 180px;
            margin: auto;
            border: 5px solid #e02020;
            &.success {
              border: 5px solid #03a971;
            }
            img {
              height: 100%;
              width: 100%;
              display: block;
              object-fit: cover;
              object-position: center center;
            }
          }
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
        .right_box {
          height: 100%;
          overflow: auto;
          font-size: 14px;
          color: #121c33;
          letter-spacing: 0;
          line-height: 24px;
          //
          background: rgba(192, 204, 218, 0.1);
          border: 1px solid #ebecf0;
          &.right_pad {
            padding: 10px;
          }
          .right_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .pic {
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
              img {
                width: 100%;
                display: block;
              }
            }
            .intro {
              display: flex;
              justify-content: space-between;
              padding: 0 15px;
              align-items: center;
              opacity: 0.85;
              background: #121c33;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50px;
              .text {
                font-size: 12px;
                color: #ffffff;
                text-align: justify;
              }
            }
          }
        }
      }

    }
     #snap {
        width: 120px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #03a971;
        border-radius: 3px;
        font-size: 16px;
        color: #ffffff;
        margin: auto;
        cursor: pointer;
      }
  }
}

</style>
