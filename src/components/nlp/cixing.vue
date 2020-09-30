<template>
  <div class="cixing_fenlei_result_container">
    <div class="cixing_fenlei_result_left" ref="xixingfenleiLeftBtn">
      <div class="cixing_fenlei_result_tubiao" @click="cixingResultBtn(0)">图表</div>
      <div class="cixing_fenlei_result_wenben" @click="cixingResultBtn(1)">文本</div>
    </div>
    <div class="cixing_fenlei_result_right">
      <div class="cixing_fenlei_result_right_tubiao" v-show="ifShowCxflTubiao" id="fenleiBingtu"></div>
      <div class="cixing_fenlei_result_right_wenben" v-show="ifShowCxflWenben">
        <div class="cixing_result_title">词性统计</div>
        <div class="cixing_result_content">
          <div class="cixing_left">
            <div class="cixing_left_item" v-for="(item,index) in wenbenLeftData" :key="index" ref="cixingLeftItem">
              <span>{{item.word}}</span>
              <span>{{item.count}}</span>
            </div>
          </div>
          <div class="cixing_detail_right">
            <div class="cixing_detail_right_item" ref="cixingDetailRightItem" v-for="(item,index) in wenbenRightData" :key="index">{{item.ci}}/{{item.ciXing}}/{{item.ciNum}}</div>
          </div>
        </div>
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
      ifShowCxflTubiao: true,
      ifShowCxflWenben: false,
      daochuImg: require("../../assets/images/nlp/daochu.png"),
      wenbenleftData: [],
      wenbenRightData: [],
      wenbenLeftData:[]
    };
  },
  props:['cixingChildWenbenData','cixingChildPieData','sceneText'],
  mounted() {
    this.initPieChart(this.cixingChildPieData);
  },
  methods: {
    arrayUnique2(arr, name) {
        var hash = {};
        return arr.reduce(function (item, next) {
            hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
            return item;
        }, []);
    },
    cixingResultBtn(arg) {
      let xixingfenleiLeftBtnDom = this.$refs.xixingfenleiLeftBtn.children || [];
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
        this.ifShowCxflTubiao = true;
        this.ifShowCxflWenben = false;
      } else {
        this.ifShowCxflTubiao = false;
        this.ifShowCxflWenben = true;
        this.$nextTick(()=>{
          this.formatterWenbenData(this.cixingChildWenbenData);
        });
      }
    },
    initPieChart(pieData) {
      function sortFn(a,b){
          return b - a ;
      }
      var pieData = pieData;
      var totalArr = [];
      var sortTotalArr;
      var sliceArr = [];
      var totalDataObj = [];
      for(var attr in pieData){
          totalArr.push(pieData[attr]);
      }
      sortTotalArr = totalArr.sort(sortFn) || [];
      sliceArr = sortTotalArr.length >= 10 ? sortTotalArr.slice(0,10) : sortTotalArr.slice(0,sortTotalArr.length);
        for(var i=0;i<sliceArr.length;i++){
            for(var attr1 in pieData){
                if(pieData[attr1] == sliceArr[i]){
                    totalDataObj.push({
                        name:attr1,
                        value:pieData[attr1]
                    })
                }
            }
        }
      var totalDataObj1 = this.arrayUnique2(totalDataObj,'name');
      var echarts = require("echarts");
      var leftChart = echarts.init(document.getElementById("fenleiBingtu"));
      var pieOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "词频统计",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            data: totalDataObj1,
            itemStyle: {   
                normal:{  
                    color: function (params){
                        var colorList = ['rgb(91,143,249)','rgb(90,216,166)','rgb(93,112,146)','rgb(246,189,22)','rgb(232,104,74)','rgb(202,104,74)','rgb(90,206,166)','rgb(132,104,74)','rgb(202,104,174)','rgb(90,216,166)'];
                        return colorList[params.dataIndex];
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
          },
        ],
      };
      leftChart.setOption(pieOption);
    },
    
    formatterWenbenData(data){
        var totalDataArr = data; 
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
        }
        var totaiNum = 0 ;
        var sortArr = totalDataArr.sort(compare('count'));
        for(let i=0;i<sortArr.length;i++){
          totaiNum += sortArr[i]['count'];
        }
        var totalDataObj2 = sortArr.slice(0,5);
        totalDataObj2.push({
            word:'总计',
            count:totaiNum
        });
        this.wenbenLeftData = totalDataObj2;
        var totalData = [];
        for(let i=0;i<totalDataArr.length;i++){
          let wordObj = totalDataArr[i].wordMap;
          for(var attr in wordObj){
            totalData.push({
              ciXing:totalDataArr[i].word,
              ci:attr,
              ciNum:wordObj[attr]
            });
          }
        }
        this.wenbenRightData = totalData;
        this.$nextTick(()=>{
          let cixingLeftItemDom = this.$refs.cixingLeftItem || [];  
          let cixingDetailRightItemDom = this.$refs.cixingDetailRightItem || []; 
          for(var i=0;i<totalDataObj2.length;i++){
            if(i==0){
              cixingLeftItemDom[i].style = 'background:#C4DBEF;';
              for(var k=0;k<cixingDetailRightItemDom.length;k++){
                if(cixingDetailRightItemDom[k].innerText.indexOf(totalDataObj2[i].word) != -1){
                  cixingDetailRightItemDom[k].style = 'background:#C4DBEF;';
                }
              }
            }
            else if(i == 1){
              cixingLeftItemDom[i].style = 'background:#C4E0EF;';
              for(var k=0;k<cixingDetailRightItemDom.length;k++){
                if(cixingDetailRightItemDom[k].innerText.indexOf(totalDataObj2[i].word) != -1){
                  cixingDetailRightItemDom[k].style = 'background:#C4E0EF;';
                }
              }
            }
            else if(i == 2){
              cixingLeftItemDom[i].style = 'background:#C3E3ED;';
              for(var k=0;k<cixingDetailRightItemDom.length;k++){
                if(cixingDetailRightItemDom[k].innerText.indexOf(totalDataObj2[i].word) != -1){
                  cixingDetailRightItemDom[k].style = 'background:#C3E3ED;';
                }
              }
            }
            else if(i == 3){
              cixingLeftItemDom[i].style = 'background: #C4EAEF;';
              for(var k=0;k<cixingDetailRightItemDom.length;k++){
                if(cixingDetailRightItemDom[k].innerText.indexOf(totalDataObj2[i].word) != -1){
                  cixingDetailRightItemDom[k].style = 'background: #C4EAEF;';
                }
              }
            }
            else if(i == 4){
              cixingLeftItemDom[i].style = 'background: #BEE8E8;';
              for(var k=0;k<cixingDetailRightItemDom.length;k++){
                if(cixingDetailRightItemDom[k].innerText.indexOf(totalDataObj2[i].word) != -1){
                  cixingDetailRightItemDom[k].style = 'background: #BEE8E8;';
                }
              }
            }
            else if(i == 5){
              cixingLeftItemDom[i].style = 'background: #BEE8E8;';
              for(var k=0;k<cixingDetailRightItemDom.length;k++){
                if(cixingDetailRightItemDom[k].innerText.indexOf(totalDataObj2[i].word) != -1){
                  cixingDetailRightItemDom[k].style = 'background: #BEE8E8;';
                }
              }
            }
          }
        });
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
.cixing_fenlei_result_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  .cixing_fenlei_result_left {
    width: 120px;
    .cixing_fenlei_result_tubiao {
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
    .cixing_fenlei_result_wenben {
      width: 100%;
      height: 36px;
      border: 1px solid #f2f4f7;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7a8499;
      letter-spacing: 0;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }
  }
  .cixing_fenlei_result_right {
    width: 1070px;
    .cixing_fenlei_result_right_tubiao {
      width: 100%;
      height: 496px;
      background: rgba(242, 244, 247, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cixing_fenlei_result_right_wenben {
      width: 100%;
      height: 496px;
      background: rgba(242, 244, 247, 0.5);
      padding: 40px;
      box-sizing: border-box;
      .cixing_result_title {
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #121c33;
        margin-bottom: 12px;
      }
      .cixing_result_content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .cixing_left {
          width: 143px;
          height: 100%;
          padding-right: 10px;
          box-sizing: border-box;
          overflow: auto;
          .cixing_left_item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 21px;
            box-sizing: border-box;
            border-radius: 16px;
            margin-bottom: 12px;
            font-family: "微软雅黑";
            font-size: 16px;
          }
        }
        .cixing_detail_right {
          width: 797px;
          height: 100%;
          overflow: auto;
          display: flex;
          flex-wrap: wrap;
          .cixing_detail_right_item {
            font-family: "微软雅黑";
            font-size: 16px;
            display: flex;
            align-items: center;
            background: #c4eaef;
            border-radius: 4px;
            padding: 6px 6px;
            box-sizing: border-box;
            margin-right: 6px;
            margin-bottom: 6px;
          }
        }
      }
    }
    .fenci_result_daochu_btn_container {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
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
        cursor: pointer;
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