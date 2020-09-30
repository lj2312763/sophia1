<template>
  <div class="nlp_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>{{loadingText}}</div>
    </Spin>
    <div class="nlp_content">
      <div class="nlp_title">词频统计</div>
      <div class="textarea_container">
        <div class="textarea_content">
          <textarea class="textarea" v-model="textContent" @focus="clearTextArea" id="wordInputId"></textarea>
        </div>
        <div class="textarea_info_content">
          <div class="info_text">{{wordLength}}/100000</div>
          <img :src="deleteImg" class="deleteImg" @click="cleanText" />
        </div>
      </div>
      <div class="btn_container">
        <div class="btn_content">
          <div class="btn_left" @click="wordCalcul">分词计算</div>
          <div class="btn_right">
            <Upload
              action
              class="uploadBtn"
              type="drag"
              :show-upload-list="false"
              :before-upload="uploadText"
              :format="['txt']"
              accept="text/plain"
            >
              <img :src="daoruImg" class="daoru" />导入文本
            </Upload>
          </div>
        </div>
      </div>
    </div>
    <div class="result_container" v-if="ifShowResult">
      <hr class="fenge_xian" />
      <div class="top_tab_btn" ref="topTab">
        <div class="cxfl_btn" @click="changeTab(0)">词性分类</div>
        <div class="cptj_btn" @click="changeTab(1)">词频统计</div>
        <div class="cy_btn" @click="changeTab(2)">词云</div>
      </div>
      <ciXing v-if="ifShowcixFenlResult" :cixingChildWenbenData="cicingWebbenPieData" :cixingChildPieData="cicingPieData" :sceneText="sceneText"></ciXing>
      <ciPin v-if="ifShowcipTongjResult" :cipinChildData="cipinData" :sceneText="sceneText"></ciPin>
      <ciYun v-if="ifShowciyunResult" :ciyunChildData="ciyunData" :sceneText="sceneText"></ciYun>
    </div>
  </div>
</template>

<script>
import ciXing from "./cixing";
import ciPin from "./cipin";
import ciYun from "./ciyun";
export default {
  data() {
    return {
      textContent: "请将源文本粘贴到此处…",
      deleteImg: require("../../assets/images/nlp/delete.png"),
      daoruImg: require("../../assets/images/nlp/daoru.png"),
      daochuImg: require("../../assets/images/nlp/daochu.png"),
      ifShowcixFenlResult: false,
      ifShowcipTongjResult: false,
      ifShowciyunResult: false,
      cicingWebbenPieData: [],
      cicingPieData:null,
      cipinData: [],
      ciyunData: [],
      ifShowResult: false,
      sceneText:'',
      loadingText:'计算中...',
      isloading:false
    };
  },
  components: {
    ciXing,
    ciPin,
    ciYun,
  },
  computed:{
    wordLength:function(){
      return this.textContent.length; 
    }
  },
  methods: {
    changeTab(arg) {
      let topTabDom = this.$refs.topTab.children || [];
      for (var i = 0; i < topTabDom.length; i++) {
        if (arg == i) {
          topTabDom[i].style =
            "color: #03A971;border-bottom: 2px solid #03A971;";
        } else {
          topTabDom[i].style = "color: #3D4966;border-bottom:none;";
        }
      }
      if (arg == 0) {
        this.ifShowcixFenlResult = true;
        this.ifShowcipTongjResult = false;
        this.ifShowciyunResult = false;
      } else if (arg == 1) {
        this.ifShowcixFenlResult = false;
        this.ifShowcipTongjResult = true;
        this.ifShowciyunResult = false;
      } else if (arg == 2) {
        this.ifShowcixFenlResult = false;
        this.ifShowcipTongjResult = false;
        this.ifShowciyunResult = true;
      }
    },
    uploadText(e) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsText(e, "UTF-8");
      reader.onload = function (evt) {
        var fileString = evt.target.result;
        _this.textContent = fileString;
      };
    },
    wordCalcul() {
      this.isloading = true;
      var fenxiText = this.textContent || "";
      var finalText = fenxiText.replace(/[\r\n]/g, "").replace(/\s*/g, "");
      this.sceneText = finalText;
      var self = this;
      var ceshiBaseUrl = window.config.url;
      this.$axios({
        method: "post",
        url: ceshiBaseUrl + "/ai/jnlp/participleByWordCount",
        data: {
          sentence: finalText,
          stopWord:0,
          number:0
        },
      })
        .then((res) => {
          let resultData = res.data;
          if (resultData.code == 200000) {
            let totalData = resultData.data;
            self.cicingWebbenPieData = totalData;
            self.cipinData = totalData;
            self.ciyunData = totalData;
            var ceshiBaseUrl = window.config.url;
            self.$axios({
                method: "post",
                url: ceshiBaseUrl + "/ai/jnlp/participleCount",
                data: {
                    sentence: finalText,
                },
            }).then((res) => {
                let resultData = res.data;
                // console.log(res,'rrrrrrrrrrr')
                if (resultData.code == 200000) {
                    self.ifShowResult = true;
                    // self.ifShowcixFenlResult = true;
                    // self.ifShowcipTongjResult = false;
                    // self.ifShowciyunResult = false;
                    self.isloading = false;
                    setTimeout(()=>{
                       self.changeTab(0);
                    },300);
                    let totalData1 = JSON.parse(resultData.data);
                    self.cicingPieData = totalData1;
                } else {
                    self.$Message.error("计算失败!");
                }
            }).catch((err) => {
                self.$Message.error("计算失败!");
            });
          } else {
            self.$Message.error("计算失败!");
          }
        })
        .catch((err) => {
          this.$Message.error("计算失败!");
        });

    },
    cleanText() {
      this.textContent = "";
    },
    clearTextArea(){
      if(this.textContent == '请将源文本粘贴到此处…'){
          this.textContent = "";
      }
    }
  },
};
</script>
<style scoped lang="less">
.nlp_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /deep/.ivu-spin-fix{
    position: fixed;
    z-index: 13;
  }
  .nlp_content {
    width: 1200px;
    margin-top: 40px;
    .nlp_title {
      width: 100%;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #121c33;
      margin-bottom: 20px;
    }
    .textarea_container {
      width: 100%;
      background: #f9fafc;
      border: 1px solid #ebecf0;
      .textarea_content {
        width: 100%;
        height: 436px;
        position: relative;
        .textarea {
          width: 100%;
          height: 100%;
          background: #f9fafc;
          padding: 17px 20px;
          box-sizing: border-box;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #7a8499;
          text-align: justify;
          line-height: 28px;
        }
      }
      .textarea_info_content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 17px 20px;
        box-sizing: border-box;
        .info_text {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #b8becc;
          text-align: justify;
          line-height: 16px;
        }
        .deleteImg {
          width: 16px;
          cursor: pointer;
        }
      }
    }
    .btn_container {
      width: 100%;
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 70px;
      .btn_content {
        width: 260px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn_left {
          width: 120px;
          height: 100%;
          background: #03a971;
          border-radius: 3px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #ffffff;
          text-align: center;
          line-height: 42px;
          cursor: pointer;
        }
        .btn_right {
          width: 120px;
          height: 100%;
          border: 1px solid #3d4966;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #3d4966;
          .uploadBtn {
            width: 100%;
            height: 100%;
            .daoru {
              width: 13.2px;
              height: 12.3px;
              margin-right: 3px;
            }
            /deep/.ivu-upload-drag {
              width: 100%;
              height: 100%;
              background: none !important;
              border: none !important;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
  .result_container {
    width: 1200px;
    position: relative;
    .fenge_xian {
      width: 100%;
      border: 1px solid #ebecf0;
      position: absolute;
      top: 27px;
      z-index: -1;
    }
    .top_tab_btn {
      width: 100%;
      display: flex;
      margin-bottom: 30px;
      .cxfl_btn,
      .cptj_btn,
      .cy_btn {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #3d4966;
        letter-spacing: 0;
        line-height: 14px;
        padding-bottom: 13px;
        box-sizing: border-box;
        cursor: pointer;
      }
      .cxfl_btn,
      .cptj_btn {
        margin-right: 60px;
      }
      .cxfl_btn {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #03a971;
        letter-spacing: 0;
        line-height: 14px;
        border-bottom: 2px solid #03a971;
      }
    }
  }
}
</style>

