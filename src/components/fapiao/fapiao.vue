<template>
  <div class="experience">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>识别中...</div>
    </Spin>

    <div class="total_title">增值税发票识别</div>
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
              ref="upload"
              :show-upload-list="false"
              type="drag"
              :before-upload="handleBeforeUpload4"
              :max-size="5120"
              style="width:100%;height:100%"
              action=''
              multiple="true"
              :format="['jpg','jpeg','png','bmp']"
              accept="image/png, image/jpeg, image/jpg, image/bmp"
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic4" alt />
                </div>
                <div class="intro">
                  <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
          <div class="option">
            <div
              class="tag1"
              :class="{ tagActive1: option4 == item.value }"
              v-for="(item, index) in optionList4"
              :key="index"
              @click="changeMiniImg(item)"
            >
              <img :src="item.imgUrl" alt />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box">
            <div class="" v-html="msg4"></div>
            <table border="1" cellpadding="20px" class="table" style="width: 100%;text-align: center;">
                  <tr>
                    <th>货物服务明细</th>
                    <th>规格型号</th>
                    <th>单位</th>
                    <th>数量</th>
                    <th>单价</th>
                    <th>金额</th>
                    <th>税率</th>
                    <th>税额</th>
                  </tr>
                  <tr v-for="(item,index) in commodityArr" :key="index">
                    <td>{{item.huowuName}}</td>
                    <td>{{item.xinghao}}</td>
                    <td>{{item.danwei}}</td>
                    <td>{{item.shuliang}}</td>
                    <td>{{item.danjia}}</td>
                    <td>{{item.jine}}</td>
                    <td>{{item.shuilv}}</td>
                    <td>{{item.shuie}}</td>
                  </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="total_title">通用机打发票识别</div>
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
              ref="upload"
              :show-upload-list="false"
              type="drag"
              :before-upload="handleBeforeUpload8"
              :max-size="5120"
              style="width:100%;height:100%"
              action
              multiple="true"
              :format="['jpg','jpeg','png','bmp']"
              accept="image/png, image/jpeg, image/jpg, image/bmp"
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic8" alt class="leftImg" />
                </div>
                <div class="intro">
                  <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg8">
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
      uploadPic4: require("@/assets/images/carSence/fapiao.png"),
      msg4: ``,
      uploadPic8: require("@/assets/images/piaoju/6.png"),
      msg8: "",
      isloading: false,
      whFlag: true,
      option4: "1",
      optionList4: [
        {
          value: "1",
          imgUrl: require("@/assets/images/carSence/fapiao.png")
        }
      ],
      fileList:[],
      currentIndex:0,
      commodityArr:[
        {
          huowuName:'服务费',
          jine:'5785.38',
          shuliang:'',
          danjia:'',
          shuie:'347.12',
          shuilv:'6%',
          xinghao:'',
          danwei:''
        }
      ]
    };
  },
  mounted() {
    let _this = this;
    $(document).ready(function () {
      (_this.msg4 = `<p>价税合计(大写)：陆仟壹佰叁拾贰圆伍角整</p>
                    <p>开票人：焦红娟</p>
                    <p>销售方地址及电话：北京市朝阳区64377727</p>
                    <p>数量：</p>
                    <p>销售方纳税人识别号：110105057317113</p>
                    <p>销售方开户行及账号：上海浦发银行91150154740007408</p>
                    <p>备注：2016.9</p>
                    <p>合计税额：347.12</p>
                    <p>发票代码：1100154130</p>
                    <p>开票日期：2016年11月15日</p>
                    <p>购方纳税人识别号：110108802100433</p>
                    <p>发票名称：北京增值税专用发票</p>
                    <p>购方开户行及账号：招商银行北京分行上地支行110902160610706</p>
                    <p>价税合计(小写)：6132.50</p>
                    <p>复核：马学琦</p>
                    <p>合计金额：5785.38</p>
                    <p>购方名称：北京百度网讯科技有限公司</p>
                    <p>发票种类：专用发票</p>
                    <p>购方地址及电话：北京市海淀区上地十街10号百度大厦2层010-59928888</p>
                    <p>销售方名称：北京圣紫茗管理咨询有限公司</p>
                    <p>货物名称：服务费</p>
                    <p>发票号码：00772445</p>`),
        (_this.msg8 = `<p>商品名称：</p>
            <p>发票代码：111001271011</p>
            <p>发票日期：2012-11-10</p>
            <p>发票号码：03694979</p>
            <p>发票类型：北京市国家税务局通用机打发票</p>
            <p>合计金额：44.00</p>`);
    });
  },
  methods: {
    handleBeforeUpload4(file) {
      this.optionList4 = [];
      var _this = this;
      this.isloading = true;
      imgPreviewBase64(_this, file, function (base64) {
        _this.uploadPic4 = base64;
        let formData = new FormData();
        formData.append("files", file);
        formData.append('index',file.name)
        _this.$axios({
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
          method: "post",
          url: window.config.url + "/ai/ocr/invoice?img_type=FILES",
          data: formData,
        })
        .then((res) => {
          _this.currentIndex++;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              _this.$Message.error("返回数据为空");
              return;
            }
            if (res.data.data) {
              _this.fileList.push({
                result:res.data.data,
                current:_this.currentIndex,
                imgUrl:base64,
              })
              _this.optionList4.push({
                value:_this.currentIndex + '',
                imgUrl:base64,
              });
              _this.changeMiniImg({
                value:_this.currentIndex + '',
                imgUrl:base64,
              });
            }
          } else {
            _this.$Message.error("请求失败");
          }
        })
        .catch((err) => {
          _this.isloading = false;
          console.log(err);
        });
        getImgSize(_this.uploadPic4).then((res) => {
          _this.whFlag = res.flag;
        });
      });
    },
    handleBeforeUpload8(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function (base64) {
        _this.uploadPic8 = base64;
        getImgSize(_this.uploadPic8).then((res) => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        url: window.config.url + "/ai/ocr/invoice?img_type=FILES",
        data: formData,
      })
        .then((res) => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            if (res.data.data) {
              let totalDataObj = res.data.data;
              if (totalDataObj.setupCode == "ali") {
                let result = totalDataObj.data;
                let html = ``;
                for (var key in result) {
                  if (key == "发票代码解析") {
                    html += `<p>发票代码解析：</p>`;
                    let obj1 = result[key];
                    for (var attr in obj1) {
                      html += `<p>&nbsp;&nbsp;&nbsp;&nbsp;${attr}：${obj1[attr]}</p>`;
                    }
                  } else if (key == "发票详单") {
                    html += `<p>发票详单：</p>`;
                    let obj2 = result[key];
                    for (var i = 0; i < obj2.length; i++) {
                      let newStr = "";
                      for (var attr2 in obj2[i]) {
                        newStr += `&nbsp;&nbsp;&nbsp;&nbsp;<span>${attr2}：${obj2[i][attr2]}</span>`;
                      }
                      html += `<p>${newStr}</p><br/>`;
                    }
                  } else {
                    html += `<p>${key}：${result[key]}</p>`;
                  }
                }
                this.msg8 = html;
              } else {
                let result = totalDataObj.words_result;
                let html = ``;
                let CommodityAmountArr = result.CommodityAmount || []; //金额
                let CommodityNameArr = result.CommodityName || []; //货物服务明细
                let CommodityNumArr = result.CommodityNum || []; //数量
                let CommodityPriceArr = result.CommodityPrice || []; //单价
                let CommodityTaxArr = result.CommodityTax || []; //税额
                let CommodityTaxRateArr = result.CommodityTaxRate || []; //税率
                let CommodityTypeArr = result.CommodityType || []; //规格型号
                let CommodityUnitArr = result.CommodityUnit || []; //单位
                for (var key in result) {
                  if (key == "AmountInWords") {
                    html += `<p>价税合计(大写)：${result[key]}</p>`;
                  } else if (key == "NoteDrawer") {
                    html += `<p>开票人：${result[key]}</p>`;
                  } else if (key == "SellerAddress") {
                    html += `<p>销售方地址及电话：${result[key]}</p>`;
                  } else if (key == "SellerRegisterNum") {
                    html += `<p>销售方纳税人识别号：${result[key]}</p>`;
                  } else if (key == "SellerBank") {
                    html += `<p>销售方开户行及账号：${result[key]}</p>`;
                  } else if (key == "Remarks") {
                    html += `<p>备注：${result[key]}</p>`;
                  } else if (key == "TotalTax") {
                    html += `<p>合计税额：${result[key]}</p>`;
                  } else if (key == "InvoiceCode") {
                    html += `<p>发票代码：${result[key]}</p>`;
                  } else if (key == "InvoiceDate") {
                    html += `<p>开票日期：${result[key]}</p>`;
                  } else if (key == "PurchaserRegisterNum") {
                    html += `<p>购方纳税人识别号：${result[key]}</p>`;
                  } else if (key == "InvoiceTypeOrg") {
                    html += `<p>发票名称：${result[key]}</p>`;
                  } else if (key == "PurchaserBank") {
                    html += `<p>购方开户行及账号：${result[key]}</p>`;
                  } else if (key == "AmountInFiguers") {
                    html += `<p>价税合计(小写)：${result[key]}</p>`;
                  } else if (key == "Checker") {
                    html += `<p>复核：${result[key]}</p>`;
                  } else if (key == "TotalAmount") {
                    html += `<p>合计金额：${result[key]}</p>`;
                  } else if (key == "PurchaserName") {
                    html += `<p>购方名称：${result[key]}</p>`;
                  } else if (key == "InvoiceType") {
                    html += `<p>发票种类：${result[key]}</p>`;
                  } else if (key == "PurchaserAddress") {
                    html += `<p>购方地址及电话：${result[key]}</p>`;
                  } else if (key == "SellerName") {
                    html += `<p>销售方名称：${result[key]}</p>`;
                  } else if (key == "InvoiceNum") {
                    html += `<p>发票号码：${result[key]}</p>`;
                  } else if (key == "CommodityName") {
                    for (var i = 0; i < CommodityNameArr.length; i++) {
                      html += `<p>货物服务明细：${CommodityNameArr[i].word}，
                        规格型号：${
                          !CommodityTypeArr[i] ? "" : CommodityTypeArr[i].word
                        }，
                        单位：${
                          !CommodityUnitArr[i] ? "" : CommodityUnitArr[i].word
                        }，
                        数量：${
                          !CommodityNumArr[i] ? "" : CommodityNumArr[i].word
                        }，
                        单价：${
                          !CommodityPriceArr[i] ? "" : CommodityPriceArr[i].word
                        }，
                        金额：${
                          !CommodityAmountArr[i]
                            ? ""
                            : CommodityAmountArr[i].word
                        }，
                        税率：${
                          !CommodityTaxRateArr[i]
                            ? ""
                            : CommodityTaxRateArr[i].word
                        }，
                        税额：${
                          !CommodityTaxArr[i] ? "" : CommodityTaxArr[i].word
                        }，</p>`;
                    }
                  }
                }
                this.msg8 = html;
              }
            }
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch((err) => {
          this.isloading = false;
          console.log(err);
        });
    },
    changeMiniImg(item) {
      this.option4 = item.value;
      let resultData = this.fileList;
      let totalData = null;
      this.uploadPic4 = item.imgUrl;
      for(var i=0;i<resultData.length;i++){
        if(resultData[i].current == item.value){
          totalData = resultData[i].result;
          break 
        }
      }
      this.formResultData(totalData)
    },
    formResultData(totalData){
      var _this = this;
      let totalDataObj = totalData;
      if (totalDataObj.setupCode == "ali") {
        let result = totalDataObj.data;
        let html = ``;
        for (var key in result) {
          if (key == "发票代码解析") {
            html += `<p>发票代码解析：</p>`;
            let obj1 = result[key];
            for (var attr in obj1) {
              html += `<p>&nbsp;&nbsp;&nbsp;&nbsp;${attr}：${obj1[attr]}</p>`;
            }
          } else if (key == "发票详单") {
            html += `<p>发票详单：</p>`;
            let obj2 = result[key];
            for (var i = 0; i < obj2.length; i++) {
              let newStr = "";
              for (var attr2 in obj2[i]) {
                newStr += `&nbsp;&nbsp;&nbsp;&nbsp;<span>${attr2}：${obj2[i][attr2]}</span>`;
              }
              html += `<p>${newStr}</p><br/>`;
            }
          } else {
            html += `<p>${key}：${result[key]}</p>`;
          }
        }
        _this.msg4 = html;
      } else {
        let result = totalDataObj.words_result;
        let html = ``;
        let totalCommodityArr = [];
        let CommodityAmountArr = result.CommodityAmount || []; //金额
        let CommodityNameArr = result.CommodityName || []; //货物服务明细
        let CommodityNumArr = result.CommodityNum || []; //数量
        let CommodityPriceArr = result.CommodityPrice || []; //单价
        let CommodityTaxArr = result.CommodityTax || []; //税额
        let CommodityTaxRateArr = result.CommodityTaxRate || []; //税率
        let CommodityTypeArr = result.CommodityType || []; //规格型号
        let CommodityUnitArr = result.CommodityUnit || []; //单位
        for(var i=0;i < CommodityNameArr.length;i++){
          totalCommodityArr.push({
            huowuName:CommodityNameArr[i].word,
            jine:!CommodityAmountArr[i] ? '' :CommodityAmountArr[i].word,
            shuliang:!CommodityNumArr[i] ? '' :CommodityNumArr[i].word,
            danjia:!CommodityPriceArr[i] ? '' :CommodityPriceArr[i].word,
            shuie:!CommodityTaxArr[i] ? '' :CommodityTaxArr[i].word,
            shuilv:!CommodityTaxRateArr[i] ? '' :CommodityTaxRateArr[i].word,
            xinghao:!CommodityTypeArr[i] ? '' :CommodityTypeArr[i].word,
            danwei:!CommodityUnitArr[i] ? '' :CommodityUnitArr[i].word
          });
        }
        this.commodityArr = totalCommodityArr;
        for (var key in result) {
          if (key == "AmountInWords") {
            html += `<p>价税合计(大写)：${result[key]}</p>`;
          } else if (key == "NoteDrawer") {
            html += `<p>开票人：${result[key]}</p>`;
          } else if (key == "SellerAddress") {
            html += `<p>销售方地址及电话：${result[key]}</p>`;
          } else if (key == "SellerRegisterNum") {
            html += `<p>销售方纳税人识别号：${result[key]}</p>`;
          } else if (key == "SellerBank") {
            html += `<p>销售方开户行及账号：${result[key]}</p>`;
          } else if (key == "Remarks") {
            html += `<p>备注：${result[key]}</p>`;
          } else if (key == "TotalTax") {
            html += `<p>合计税额：${result[key]}</p>`;
          } else if (key == "InvoiceCode") {
            html += `<p>发票代码：${result[key]}</p>`;
          } else if (key == "InvoiceDate") {
            html += `<p>开票日期：${result[key]}</p>`;
          } else if (key == "PurchaserRegisterNum") {
            html += `<p>购方纳税人识别号：${result[key]}</p>`;
          } else if (key == "InvoiceTypeOrg") {
            html += `<p>发票名称：${result[key]}</p>`;
          } else if (key == "PurchaserBank") {
            html += `<p>购方开户行及账号：${result[key]}</p>`;
          } else if (key == "AmountInFiguers") {
            html += `<p>价税合计(小写)：${result[key]}</p>`;
          } else if (key == "Checker") {
            html += `<p>复核：${result[key]}</p>`;
          } else if (key == "TotalAmount") {
            html += `<p>合计金额：${result[key]}</p>`;
          } else if (key == "PurchaserName") {
            html += `<p>购方名称：${result[key]}</p>`;
          } else if (key == "InvoiceType") {
            html += `<p>发票种类：${result[key]}</p>`;
          } else if (key == "PurchaserAddress") {
            html += `<p>购方地址及电话：${result[key]}</p>`;
          } else if (key == "SellerName") {
            html += `<p>销售方名称：${result[key]}</p>`;
          } else if (key == "InvoiceNum") {
            html += `<p>发票号码：${result[key]}</p>`;
          }
        }
        _this.msg4 = html;  
        setTimeout(()=>{
          _this.isloading = false;
        },8500);
      }
    }
  },
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
        flex: 1;
        .left_box {
          height: 290px;
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
            border:grey 1px solid;
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
          height: 290px;
          background: rgba(192, 204, 218, 0.1);
          border: 1px solid #ebecf0;
          .table{
            border-collapse: collapse;
            tr{
              th,td{
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

