<template>
  <div class="cipin_fenlei_result_container">
    <div class="cipin_fenlei_result_left" ref="xixingfenleiLeftBtn">
      <div class="cipin_fenlei_result_tubiao" @click="cipinResultBtn(0)">柱形图</div>
      <div class="cipin_fenlei_result_wenben" @click="cipinResultBtn(1)">折线图</div>
      <div class="cipin_fenlei_result_wenben" @click="cipinResultBtn(2)">文本</div>
    </div>
    <div class="cipin_fenlei_result_right">
      <div class="cipin_fenlei_result_right_zhutu" v-show="ifShowCpinZhutu">
        <div class="cPinZhutuClass">
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">名词</div>
            <div class="zhutu" id="mingcizhutuID"></div>
          </div>
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">动词</div>
            <div class="zhutu" id="dongcizhutuID"></div>
          </div>
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">形容词</div>
            <div class="zhutu" id="xingrongcizhutuID"></div>
          </div>
        </div>
        <div class="ciPin_info">注：上图各类词性只列出词频前10的词语，若需查看更多，可查看分词结果或者分词结果导出</div>
      </div>

      <div class="cipin_fenlei_result_right_zhutu" v-show="ifShowCpinZhexian">
        <div class="cPinZhutuClass">
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">名词</div>
            <div class="zhutu" id="mingciZhexianID"></div>
          </div>
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">动词</div>
            <div class="zhutu" id="dongciZhexianID"></div>
          </div>
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">形容词</div>
            <div class="zhutu" id="xiangrongciZhexianID"></div>
          </div>
        </div>
        <div class="ciPin_info">注：上图各类词性只列出词频前10的词语，若需查看更多，可查看分词结果或者分词结果导出</div>
      </div>

      <div class="cipin_fenlei_result_right_zhutu" v-show="ifShowCpinwenben">
        <div class="cPinZhutuClass">
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">名词</div>
            <div class="zhutu cPinwenben">
              <div class="juti_ci_container">
                <div class="juti_ci" v-for="(item,index) in wenbenMinciCiArr" :key="index">{{item}}、</div>
              </div>
              <div class="cip_Title">词频统计：</div>
              <div class="ci_Num_container">
                <div class="ci_Num" v-for="(item,index) in wenbenMinciNumArr" :key="index">{{item}}、</div>
              </div>
            </div>
          </div>
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">动词</div>
            <div class="zhutu cPinwenben">
              <div class="juti_ci_container">
                <div class="juti_ci" v-for="(item,index) in wenbenDongciCiArr" :key="index">{{item}}、</div>
              </div>
              <div class="cip_Title">词频统计：</div>
              <div class="ci_Num_container">
                <div class="ci_Num" v-for="(item,index) in wenbenDongciNumArr" :key="index">{{item}}、</div>
              </div>
            </div>
          </div>
          <div class="zhutu_Item">
            <div class="zhutu_Item_title">形容词</div>
            <div class="zhutu cPinwenben">
              <div class="juti_ci_container">
                <div class="juti_ci" v-for="(item,index) in wenbenXingRonCiArr" :key="index">{{item}}、</div>
              </div>
              <div class="cip_Title">词频统计：</div>
              <div class="ci_Num_container">
                <div class="ci_Num" v-for="(item,index) in wenbenXingRonNumArr" :key="index">{{item}}、</div>
              </div>
            </div>
          </div>
        </div>
        <div class="ciPin_info">注：上图各类词性只列出词频前10的词语，若需查看更多，可查看分词结果或者分词结果导出</div>
      </div>

      <div class="fenci_result_daochu_btn_container">
        <div class="fenci_result_daochu_btn" @click="exportResult">
          <img :src="daochuImg" class="daochuImg" />
          分词结果导出
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifShowCpinZhutu: true,
      ifShowCpinZhexian: false,
      ifShowCpinwenben: false,
      wenbenMinciCiArr:[],
      wenbenDongciCiArr:[],
      wenbenXingRonCiArr:[],
      wenbenMinciNumArr:[],
      wenbenDongciNumArr:[],
      wenbenXingRonNumArr:[],
      daochuImg: require("../../assets/images/nlp/daochu.png"),
    };
  },
  props: ["cipinChildData",'sceneText'],
  mounted() {
    this.formatterData(this.cipinChildData,0);
  },
  methods: {
    cipinResultBtn(arg) {
      let xixingfenleiLeftBtnDom =
        this.$refs.xixingfenleiLeftBtn.children || [];
      for (var i = 0; i < xixingfenleiLeftBtnDom.length; i++) {
        if (arg == i) {
          xixingfenleiLeftBtnDom[i].style =
            "color: #03A971;background:rgba(3,169,113,0.1);border:none;";
        } else {
          xixingfenleiLeftBtnDom[i].style =
            "color: #7A8499;background: none !important;border: 1px solid #F2F4F7;";
        }
      }
      if (arg == 0) {
        this.ifShowCpinZhutu = true;
        this.ifShowCpinZhexian = false;
        this.ifShowCpinwenben = false;
        this.$nextTick(() => {
          this.formatterData(this.cipinChildData,0);
        });
      } else if (arg == 1) {
        this.ifShowCpinZhutu = false;
        this.ifShowCpinZhexian = true;
        this.ifShowCpinwenben = false;
        this.$nextTick(() => {
          this.formatterData(this.cipinChildData,1);
        });
      } else if (arg == 2) {
        this.ifShowCpinZhutu = false;
        this.ifShowCpinZhexian = false;
        this.ifShowCpinwenben = true;
        this.$nextTick(() => {
          this.formatterData(this.cipinChildData,2);
        });
      }
    },
    formatterData(data,arg){
      var dataArr = data;
      var totalminCiDataYArr = [];
      var totalminCiDataXArr = [];
      var totalDongciDataYArr = [];
      var totalDongciDataXArr = [];
      var totalXingrongciYDataArr = [];
      var totalXingrongciXDataArr = [];
      function compare(a,b){
          return b - a;
      }
      function unique(arr1) {
        const res = new Map();
        return arr1.filter((a) => !res.has(a.word) && res.set(a.word, 1))
      }
      for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].word == "名词") {
            let wordMapObj = dataArr[i].wordMap;
            let sortArr = Object.values(wordMapObj).sort(compare).slice(0,10);
            let chongfuTenData = [];
            sortArr.forEach((item)=>{
                for (var attr in wordMapObj) {
                    if(item == wordMapObj[attr]){
                        chongfuTenData.push({
                          word:attr,
                          value:wordMapObj[attr]
                        })
                    }
                }
            });
            let beforeTen = unique(chongfuTenData).slice(0,10);
            beforeTen.forEach((item,index)=>{
              totalminCiDataYArr.push(item.word);
              totalminCiDataXArr.push(item.value);
            });
        } else if (dataArr[i].word == "动词") {
            let wordMapObj = dataArr[i].wordMap;
            let sortArr = Object.values(wordMapObj).sort(compare).slice(0,10);
            let chongfuTenData = [];
            sortArr.forEach((item)=>{
                for (var attr in wordMapObj) {
                    if(item == wordMapObj[attr]){
                        chongfuTenData.push({
                          word:attr,
                          value:wordMapObj[attr]
                        })
                    }
                }
            })
            let beforeTen = unique(chongfuTenData).slice(0,10);
            beforeTen.forEach((item,index)=>{
              totalDongciDataYArr.push(item.word);
              totalDongciDataXArr.push(item.value);
            });
        } else if (dataArr[i].word.indexOf("形容词") != "-1") {
            let wordMapObj = dataArr[i].wordMap;
            let sortArr = Object.values(wordMapObj).sort(compare).slice(0,10);
            let chongfuTenData = [];
            sortArr.forEach((item)=>{
                for (var attr in wordMapObj) {
                    if(item == wordMapObj[attr]){
                        chongfuTenData.push({
                          word:attr,
                          value:wordMapObj[attr]
                        })
                    }
                }
            })
            let beforeTen = unique(chongfuTenData).slice(0,10);
            beforeTen.forEach((item,index)=>{
              totalXingrongciYDataArr.push(item.word);
              totalXingrongciXDataArr.push(item.value);
            });
          
        }
      }
      if(arg == 0){
          this.initBarChart(totalminCiDataYArr,totalminCiDataXArr,totalDongciDataYArr,totalDongciDataXArr,totalXingrongciYDataArr,totalXingrongciXDataArr);
      }
      else if(arg == 1){
          this.initLineChart(totalminCiDataYArr,totalminCiDataXArr,totalDongciDataYArr,totalDongciDataXArr,totalXingrongciYDataArr,totalXingrongciXDataArr);
      }
      else if(arg == 2){
          this.wenbenMinciCiArr = totalminCiDataYArr.slice(0,10);
          this.wenbenMinciNumArr = totalminCiDataXArr.slice(0,10);
          this.wenbenDongciCiArr = totalDongciDataYArr.slice(0,10);
          this.wenbenDongciNumArr = totalDongciDataXArr.slice(0,10);
          this.wenbenXingRonCiArr = totalXingrongciYDataArr.slice(0,10);
          this.wenbenXingRonNumArr = totalXingrongciXDataArr.slice(0,10);
      }
    },
    initBarChart(totalminCiDataYArr,totalminCiDataXArr,totalDongciDataYArr,totalDongciDataXArr,totalXingrongciYDataArr,totalXingrongciXDataArr) {
      var echarts = require("echarts");
      var mingCizhutuChart = echarts.init(
        document.getElementById("mingcizhutuID")
      );
      var dongCizhutuChart = echarts.init(
        document.getElementById("dongcizhutuID")
      );
      var xingrongCizhutuChart = echarts.init(
        document.getElementById("xingrongcizhutuID")
      );
      var barMingci0ption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: totalminCiDataYArr.slice(0, 10),
        },
        series: [
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "right",
              color: "#000000",
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    "rgb(164,205,238)",
                    "rgb(42,170,227)",
                    "rgb(195,229,94)",
                    "rgb(195,229,35)",
                    "rgb(195,229,135)",
                    "rgb(195,229,205)",
                    "rgb(195,229,285)",
                    "rgb(195,229,145)",
                    "rgb(195,229,215)",
                    "rgb(195,229,275)",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: totalminCiDataXArr.slice(0, 10),
          },
        ],
      };
      mingCizhutuChart.setOption(barMingci0ption);
      var barDongci0ption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: totalDongciDataYArr.slice(0, 10),
        },
        series: [
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "right",
              color: "#000000",
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    "rgb(164,205,238)",
                    "rgb(42,170,227)",
                    "rgb(195,229,94)",
                    "rgb(195,229,35)",
                    "rgb(195,229,135)",
                    "rgb(195,229,205)",
                    "rgb(195,229,285)",
                    "rgb(195,229,145)",
                    "rgb(195,229,215)",
                    "rgb(195,229,275)",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: totalDongciDataXArr.slice(0, 10),
          },
        ],
      };
      dongCizhutuChart.setOption(barDongci0ption);
      var barXingrongci0ption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: totalXingrongciYDataArr.slice(0, 10),
        },
        series: [
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "right",
              color: "#000000",
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    "rgb(164,205,238)",
                    "rgb(42,170,227)",
                    "rgb(195,229,94)",
                    "rgb(195,229,35)",
                    "rgb(195,229,135)",
                    "rgb(195,229,205)",
                    "rgb(195,229,285)",
                    "rgb(195,229,145)",
                    "rgb(195,229,215)",
                    "rgb(195,229,275)",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: totalXingrongciXDataArr.slice(0, 10),
          },
        ],
      };
      xingrongCizhutuChart.setOption(barXingrongci0ption);
    },
    initLineChart(totalminCiDataYArr,totalminCiDataXArr,totalDongciDataYArr,totalDongciDataXArr,totalXingrongciYDataArr,totalXingrongciXDataArr) {
      var echarts = require("echarts");
      var mingciZhexianChart = echarts.init(
        document.getElementById("mingciZhexianID")
      );
      var dongciZhexianChart = echarts.init(
        document.getElementById("dongciZhexianID")
      );
      var xiangrongciZhexianChart = echarts.init(
        document.getElementById("xiangrongciZhexianID")
      );
      var lineMingciOption = {
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}",
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          axisLine: { onZero: false },
          boundaryGap: false,
          data:totalminCiDataYArr,
        },
        series: [
          {
            width: "100%",
            name: "词频统计",
            type: "line",
            smooth: true,
            lineStyle: {
              width: 3,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: "#5B8FF9",
            },
            data:totalminCiDataXArr,
          },
        ],
      };

      var lineDongciOption = {
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}",
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          axisLine: { onZero: false },
          boundaryGap: false,
          data:totalDongciDataYArr.slice(0, 10),
        },
        series: [
          {
            width: "100%",
            name: "词频统计",
            type: "line",
            smooth: true,
            lineStyle: {
              width: 3,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: "#03A971",
            },
            data:totalDongciDataXArr.slice(0, 10),
          },
        ],
      };

      var lineXingrongciOption = {
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}",
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          axisLine: { onZero: false },
          boundaryGap: false,
          data:totalXingrongciYDataArr.slice(0, 10),
        },
        series: [
          {
            width: "100%",
            name: "词频统计",
            type: "line",
            smooth: true,
            lineStyle: {
              width: 3,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: "#FA6400",
            },
            data:totalXingrongciXDataArr.slice(0, 10),
          },
        ],
      };
      mingciZhexianChart.setOption(lineMingciOption);
      dongciZhexianChart.setOption(lineDongciOption);
      xiangrongciZhexianChart.setOption(lineXingrongciOption);
    },
    exportResult(){
      var fenxiText = this.sceneText || "";
      var finalText = fenxiText.replace(/[\r\n]/g, "").replace(/\s*/g, "");
      var baseUrl = 'https://test.yzsmart.top:38443';
      var self = this;
      this.$axios({
        method: "post",
        url: baseUrl + "/ai/jnlp/export",
        responseType: 'blob',
        data: {
          sentence: finalText
        }
      })
        .then((res) => {
            var eleLink = document.createElement('a');
            eleLink.download = "分词结果.xls";  
            eleLink.style.display = 'none'
            var blob = new Blob([res.data],{type: 'application/vnd.ms-excel'}); 
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink); 
            eleLink.click(); 
            document.body.removeChild(eleLink); 
            console.log(res,'res')
        })
        .catch((err) => {
          this.$Message.error("导出失败!");
        });
    }
  },
};
</script>
<style lang="less">
.cipin_fenlei_result_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  .cipin_fenlei_result_left {
    width: 120px;
    .cipin_fenlei_result_tubiao {
      width: 100%;
      height: 36px;
      background: rgba(3, 169, 113, 0.1);
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #03a971;
      letter-spacing: 0;
      text-align: center;
      line-height: 36px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .cipin_fenlei_result_wenben {
      width: 100%;
      height: 36px;
      border: 1px solid #f2f4f7;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7a8499;
      letter-spacing: 0;
      line-height: 36px;
      text-align: center;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
  .cipin_fenlei_result_right {
    width: 1070px;
    .cipin_fenlei_result_right_zhutu {
      width: 100%;
      height: 496px;
      background: rgba(242, 244, 247, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      box-sizing: border-box;
      .cPinZhutuClass {
        width: 100%;
        height: 376px;
        display: flex;
        justify-content: space-between;
        .zhutu_Item {
          width: 310px;
          height: 100%;
          .zhutu_Item_title {
            width: 100%;
            margin-bottom: 10px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #000000;
          }
          .zhutu {
            width: 100%;
            height: 321.5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cPinwenben {
            display: flex;
            align-items: center;
            flex-direction: column;
            border: 1px solid #b8becc;
            border-radius: 3px;
            padding: 30px 20px;
            box-sizing: border-box;
            .juti_ci_container {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 60px;
              .juti_ci {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #121c33;
                letter-spacing: 0;
                line-height: 23px;
              }
            }
            .cip_Title,
            .ci_Num_container {
              width: 100%;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #121c33;
              letter-spacing: 0;
              line-height: 23px;
            }
            .ci_Num_container {
              display: flex;
              flex-wrap: wrap;
            }
          }
        }
      }
      .ciPin_info {
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #7a8499;
        margin-top: 24px;
      }
    }
    .fenci_result_daochu_btn_container {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      cursor: pointer;
      .fenci_result_daochu_btn {
        width: 153px;
        height: 42px;
        background: #03a971;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        .daochuImg {
          width: 13.2px;
          height: 12.2px;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>