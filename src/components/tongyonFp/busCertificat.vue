<template>
  <div class="experience">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>识别中...</div>
    </Spin>

    <div class="total_title">营业执照识别</div>
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
              ref="upload"
              :show-upload-list="false"
              type="drag"
              :before-upload="chengduiUpload"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
              :format="['jpg', 'jpeg', 'png', 'bmp']"
              accept="image/png,image/jpeg,image/jpg,image/bmp"
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="chengDuiPic" alt="" />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box">
           <template  v-if="chengduiMsg">
            <p>统一社会信用代码：{{chengduiMsg.social_credit_code}}</p>
            <p>单位名称：{{chengduiMsg.name}}</p>
            <p>企业类型：{{chengduiMsg.category}}</p>
            <p>注册地址：{{chengduiMsg.address}}</p>
            <p>法人：{{chengduiMsg.legal_person}}</p>
            <p>注册资本：{{chengduiMsg.registered_capital}}</p>
            <p>成立日期：{{chengduiMsg.date}}</p>
            <p>营业期限：{{chengduiMsg.term}}</p>
            <p>经营范围：{{chengduiMsg.business_scope}}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";
export default {
  data() {
    return {
      chengDuiPic: require("@/assets/images/card/12DA9F7A1DD38F3.png"),
      chengduiMsg: ``,
      isloading: false,
      whFlag: true
    };
  },
  created() {},
  mounted() {
    let _this = this;
    $(document).ready(function() {
      _this.getImg1(_this.chengDuiPic, () => {
         _this.chengduiMsg={"social_credit_code":"997449337210928","name":"成都市华莲商贸有限公司","category":"","address":"四川省成都市新林大路121","legal_person":"李双双","registered_capital":"","date":"","term":"","business_scope":""};
      });
     
    });
  },
  methods: {
    getImg1(val, callback) {
      var img = val;
      var image = new Image();
      image.src = img;
      image.crossOrigin = "anonymous";
      image.onload = () => {
        callback();
      };
    },
    chengduiUpload(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.chengDuiPic = base64;
        getImgSize(_this.chengDuiPic).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      _this.chengduiMsg = '';
      this.isloading = true;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        url: window.config.url + "/ai/inv/license",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
               _this.chengduiMsg = '暂无数据';
              return;
            }
            if (res.data.data) {
              _this.chengduiMsg = res.data.data.identify_results[0].details;
              console.log(JSON.stringify( _this.chengduiMsg))
            }
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
           _this.chengduiMsg = '暂无数据';
          this.isloading = false;
          console.log(err);
        });
    },
  }
};
</script>
<style scoped lang="less">
.experience {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: relative;
  .total_title {
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .fn_container {
    width: 90%;
    margin: auto;
    margin-bottom: 60px;
    /deep/.ivu-radio-default {
      font-size: 14px;
      color: #121c33;
      margin-bottom: 10px;
      label {
        margin-right: 20px;
        .ivu-radio-inner::after {
          border-color: #03a971;
        }
        .ivu-radio-checked .ivu-radio-inner {
          border-color: #03a971;
        }
        .ivu-radio-inner::after {
          background-color: #03a971;
        }
      }
    }
    p {
      font-size: 14px;
      color: #7a8499;
      text-align: justify;
      line-height: 24px;
      margin-top: 10px;
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
        width: 50%;
        .left_box {
          height: 350px;
          border: 1px solid #ebecf0;
          .left_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .imgBox {
              display: inline-block;
              margin: 20px 50px;
              .imgPic {
                width: 60px;
                margin: auto;
                position: relative;
                img {
                  width: 100%;
                  display: block;
                }
                .del {
                  position: absolute;
                  right: -8px;
                  top: -3px;
                  width: 15px;
                  cursor: pointer;
                }
              }

              p {
                text-align: center;
              }
            }
            .pic {
              width: 100%;
              &.whFlag {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                img {
                  width: -webkit-fill-available;
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
          .ivu-upload {
            /deep/.ivu-upload-drag {
              height: 100%;
            }
            /deep/.ivu-upload-select {
              .ivu-btn-default {
                background: #03a971 !important;
                border: none !important;
                span {
                  color: #ffffff;
                }
              }
            }
            /deep/.ivu-upload-list {
              display: none;
            }
          }
        }
        .option {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          .tag {
            padding: 5px 10px;
            font-size: 14px;
            background: rgba(0, 0, 0, 0.6);
            float: left;
            color: #fff;
            margin-right: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            border-radius: 3px;

            &.tagActive {
              background: #03a971;
            }
          }

          .tag1 {
            width: 150px;
            margin-right: 20px;
            position: relative;
            border: grey 1px solid;
            margin-bottom: 20px;
            max-height: 70px;
            overflow: hidden;
            cursor: pointer;
            float: left;
            img {
              width: 100%;
              display: block;
            }
            .typeText {
              width: 100%;
              height: 25px;
              line-height: 25px;
              text-align: center;
              position: absolute;
              left: 0;
              bottom: 0;
              opacity: 0.85;
              background: #121c33;
              font-size: 14px;
              color: #ffffff;
            }
            &.tagActive1 {
              border: #03a971 2px solid;
            }
          }
        }
      }
      .right {
        flex: 1;
        margin-left: 20px;
        .right_box {
          overflow: auto;
          font-size: 14px;
          color: #121c33;
          letter-spacing: 0;
          line-height: 24px;
          padding: 10px;
          height: 350px;
          background: rgba(192, 204, 218, 0.1);
          border: 1px solid #ebecf0;
          .table {
            border-collapse: collapse;
            tr {
              th,
              td {
                border: grey 1px solid;
              }
            }
          }
        }
      }
    }
  }
}
</style>
