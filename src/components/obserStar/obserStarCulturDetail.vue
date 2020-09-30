<template>
  <div class="obser_star_list_container">
    <!--图形统计区域-->
    <div class="echarts_container">
      <div class="chart">
        <div class="chart_top">{{subTitleName}}</div>
        <div class="chart_container">
          <!-- 上部分 -->
          <div class="top">
            <div class="left" id="map">
              <!-- 左上地图 -->
            </div>
            <div class="right">
              <!-- 右上数据 -->
              <div class="top" id="part_one"></div>
              <div class="bottom" id="part_two"></div>
            </div>
          </div>
          <!-- 下部分 -->
          <div class="bottom">
            <div class="chart_two" id="part_six"></div>
            <div class="chart_one" id="part_five"></div>
            <div class="chart_three" id="part_three"></div>
            <div class="chart_four" id="part_seven"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "obserStarLiveDetail",
  data() {
    return {
      subTitleName:'',
      topLeftTopData: {}, //上左上数据  柱状图
      topLeftBottomData: {}, //上左下数据  饼图
      topCenterData: {}, //上中数据   中国地图
      topRightTopData: {}, //上右上数据 折线图
      topRightBottomData: {}, //上右下数据  环形饼图
      BottomLeftData: {}, //下左数据   下方左面柱状图
      BottomRightData: {} //下右数据  下方右面三角形柱状图
    };
  },
  methods: {
    getChartData() {
      var echarts = require("echarts");
      var baseUrl = window.config.url+"";
      var parentTitle = this.$route.query.parentTitle;
      var subTitleCode = this.$route.query.subTitleCode;
      var that = this;
      this.subTitleName = this.$route.query.subTitleName;
      //上左上数据  柱状图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 1,
          chartType: 1,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            var topLeftTopData = res.data.data;
            var yiZaoguimo = echarts.init(document.getElementById("part_one")); //
            var xAxisDataObj = {
              xAxisData: [],
              data: [],
              name: ""
            };
            var strDara = topLeftTopData;
            var topLeftTopDataArr = strDara.cockpitDatatList;
            for (var i = 0; i < topLeftTopDataArr.length; i++) {
              xAxisDataObj.xAxisData.push(
                topLeftTopDataArr[i].statisticalIndicator
              );
              xAxisDataObj.data.push(
                topLeftTopDataArr[i].firstStatisticalContent
              );
              xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
            }
            var yiZaoguimo_option = {
              title: {
                text: topLeftTopData.chartName,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                left: "center"
              },
              background: "#2D8C6A",
              color: ["#0FA16D"],
              tooltip: {
                trigger: "axis"
              },
              axisLabel: {
                color: "#fff",
                fontSize: 14
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              xAxis: [
                {
                  type: "category",
                  data: xAxisDataObj.xAxisData,
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: { color: "#2D8C6A" } // x轴刻度的颜色
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#2D8C6A" // x轴坐标轴颜色
                    }
                  },
                  axisLabel:{
                      interval: 0,
                      rotate:-30,
                      margin: 30,
                      textStyle:{
                          align: 'center'
                      },
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#2D8C6A" //坐标轴颜色
                    }
                  },
                  splitLine: {
                    show: true, //是否显示后面的网格线
                    lineStyle: {
                      color: "#2D8C6A" //网格线颜色
                    }
                  }
                }
              ],
              series: [
                {
                  name: xAxisDataObj.name,
                  type: "bar",
                  barWidth: "30%",
                  data: xAxisDataObj.data
                }
              ]
            };
            yiZaoguimo.setOption(yiZaoguimo_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      //上边中间   中国地图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 4,
          chartType: 3,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
      .then(res => {
          if (res.status == 200) {
            var topCenterData = res.data.data;
            var cockpitDatatList = topCenterData.cockpitDatatList;
            var mapData = [];
            var firstDescription;
            for (var i = 0; i < cockpitDatatList.length; i++) {
              firstDescription = cockpitDatatList[i].firstDescription;
              if (i == 0) {
                mapData.push({
                  name: cockpitDatatList[i].statisticalIndicator.replace(
                    /\s*/g,
                    ""
                  ),
                  value: cockpitDatatList[i].firstStatisticalContent
                });
              } else {
                mapData.push({
                  name: cockpitDatatList[i].statisticalIndicator.replace(
                    /\s*/g,
                    ""
                  ),
                  value: Number(cockpitDatatList[i].firstStatisticalContent)
                });
              }
            }
            console.log(mapData+'mapData')
            var myMapChart = echarts.init(document.getElementById("map"));
            var mayMap_option = {
              title: {
                //这里是整个图的标题
                text: topCenterData.chartName, //大标题
                x: "center", //标题的位置，左边中间或者右边
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              },
              tooltip: {
                //图例
                trigger: "item",
                //文本上方的浮动小块
                backgroundColor: "rgba(255,255,255,0.7)", //文本上方的浮动小块的颜色
                padding: [20, 20], //文字与边框之间的内边距
                textStyle: {
                  //文本样式设置
                  color: "#00000", //这里要注意一下，必须是标准6位，否则可能显现不出来
                  fontSize: 18, //字号大小
                  lineHeight: "300px" //最后一个属性不加逗号，行高
                }
              },
              series: [
                {
                  name:firstDescription,
                  type: "map",
                  mapType: "china",
                  roam: true, //是否允许鼠标滚轮控制大小
                  label: {
                    normal: {
                      show: true,
                      textStyle: {
                        color: "rgba(255,255,255,0.3)"
                      }
                    },
                    emphasis: {
                      //鼠标移入动态时显示的样式
                      show: true
                      //backgroundColor控制的就是鼠标移入的时候文字的背景颜色而不是模块的背景颜色
                      //color:鼠标移入的时候文字的颜色
                    }
                  },
                  itemStyle: {
                    normal: {
                      borderWidth: 0.5, //区域边框宽度
                      borderColor: "rgba(255,255,255,0.3)", //区域边框颜色
                      areaColor: "rgba(3,169,113,0.3)" //区域颜色
                    },
                    emphasis: {
                      borderWidth: 0.5,
                      borderColor: "#4b0082",
                      areaColor: "#2D8C6A"
                    }
                  },
                  data: mapData // 数据
                }
              ]
            };
            myMapChart.setOption(mayMap_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      //上面左边的饼图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 2,
          chartType: 2,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            var yiliaozhizaoChart = echarts.init(
              document.getElementById("part_two")
            );
            var topLeftBottomData = res.data.data;
            var cockpitDatatList = topLeftBottomData.cockpitDatatList;
            var formatData = [];
            var tipName;
            var color = [
              "#53B17D",
              "#468266",
              "#929292",
              "#53B17D",
              "#929292",
              "#468266",
              "#929292",
              "#53B17D",
              "#468266"
            ];
            for (var i = 0; i < cockpitDatatList.length; i++) {
              var pieColor;
              if(color[i]){
                pieColor = color[i];
              }else{
                if(i > 8){
                  pieColor = color[i-8];
                }
              }
              formatData.push({
                value: cockpitDatatList[i].firstStatisticalContent,
                name: cockpitDatatList[i].statisticalIndicator,
                itemStyle: { color: pieColor}
              });
            }
            var yiliaozhizao_option = {
              background: "#2D8C6A",
              tooltip: {
                trigger: "item",
                formatter: "{b}:{c}({d}%)"
              },
              title: {
                text: topLeftBottomData.chartName,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                left: "center"
              },
              series: [
                {
                  type: "pie",
                  radius: "75%",
                  center: ["50%", "50%"],
                  data: formatData,
                  // label: {normal: {position: 'inner',formatter: "{b}\n {c} ({d}%)"}},labelLine: {normal: {show: false}},
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  }
                }
              ]
            };
            yiliaozhizaoChart.setOption(yiliaozhizao_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      //上面右边折线图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 5,
          chartType: 1,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            var topRightTopData = res.data.data;
            var cockpitDatatList = topRightTopData.cockpitDatatList;
            var xAxisDataObj = {
              xAxisData: [],
              data: [],
              name: ""
            };
            for (var i = 0; i < cockpitDatatList.length; i++) {
              xAxisDataObj.xAxisData.push(
                cockpitDatatList[i].statisticalIndicator
              );
              xAxisDataObj.data.push(
                cockpitDatatList[i].firstStatisticalContent
              );
              xAxisDataObj.name = cockpitDatatList[i].firstDescription;
            }
            var yiweijigouChart = echarts.init(
              document.getElementById("part_five")
            );
            var yiweijigou_option = {
              title: {
                text: topRightTopData.chartName,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                left: "center"
              },
              tooltip: {
                trigger: "axis"
              },
              color: ["#0FA16D"],
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: xAxisDataObj.xAxisData,
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                },
                axisLabel: {
                  color: "#fff",
                  fontSize: 12
                }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              yAxis: {
                type: "value",
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                },
                axisLine: {
                  lineStyle: {
                    color: "#2D8C6A" //坐标轴颜色
                  }
                },
                axisLabel: {
                  color: "#fff",
                  fontSize: 12
                },
                splitLine: {
                  show: true, //是否显示后面的网格线
                  lineStyle: {
                    color: "#2D8C6A" //网格线颜色
                  }
                }
              },
              series: [
                {
                  data: xAxisDataObj.data,
                  type: "line",
                  areaStyle: {}
                }
              ]
            };
            yiweijigouChart.setOption(yiweijigou_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      //上面右边环形饼图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 6,
          chartType: 2,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            var topRightBottomData = res.data.data;
            var cockpitDatatList = topRightBottomData.cockpitDatatList;
            var formatData = [];
            var color = [
              "#53B17D",
              "#468266",
              "#929292",
              "#53B17D",
              "#929292",
              "#468266",
              "#929292",
              "#53B17D",
              "#468266"
            ];
            for (var i = 0; i < cockpitDatatList.length; i++) {
              var pieColor;
              if(color[i]){
                pieColor = color[i];
              }else{
                if(i > 8){
                pieColor = color[i-8];
                }
              }
              formatData.push({
                value: cockpitDatatList[i].firstStatisticalContent,
                name: cockpitDatatList[i].statisticalIndicator,
                itemStyle: { color: pieColor }
              });
            }
            var yiliaozhizaoChart = echarts.init(
              document.getElementById("part_six")
            );
            var yiliaozhizao_option = {
              tooltip: {
                trigger: "item",
                formatter: "{b}: {c} ({d}%)"
              },
              title: {
                text: topRightBottomData.chartName,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                left: "center"
              },
              series: [
                {
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: "center"
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: "30",
                        fontWeight: "bold"
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: formatData
                }
              ]
            };
            yiliaozhizaoChart.setOption(yiliaozhizao_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      //下面左边的  柱状图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 3,
          chartType: 1,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            var BottomLeftData = res.data.data;
            var cockpitDatatList = BottomLeftData.cockpitDatatList;
            var xAxisDataObj = {
              xAxisData: [],
              data: [],
              name: ""
            };
            for (var i = 0; i < cockpitDatatList.length; i++) {
              xAxisDataObj.xAxisData.push(
                cockpitDatatList[i].statisticalIndicator
              );
              xAxisDataObj.data.push(
                cockpitDatatList[i].firstStatisticalContent
              );
              xAxisDataObj.name = cockpitDatatList[i].firstDescription;
            }
            var renjunweishengChart = echarts.init(
              document.getElementById("part_three")
            );
            var renjunweisheng_option = {
              title: {
                text: BottomLeftData.chartName,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                left: "center"
              },
              color: ["#0FA16D"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              axisLabel: {
                color: "#fff",
                fontSize: 14
              },
              xAxis: [
                {
                  type: "category",
                  data: xAxisDataObj.xAxisData,
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                  },
                  axisLabel:{
                    interval: 0,
                    rotate:-30,
                    margin: 30,
                    textStyle:{
                        align: 'center'
                    },
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#2D8C6A" //坐标轴颜色
                    }
                  },
                  axisLabel: {
                    color: "#fff",
                    fontSize: 12
                  },
                  splitLine: {
                    show: true, //是否显示后面的网格线
                    lineStyle: {
                      color: "#2D8C6A" //网格线颜色
                    }
                  }
                }
              ],
              series: [
                {
                  name: xAxisDataObj.name,
                  type: "bar",
                  barWidth: "30%",
                  data: xAxisDataObj.data
                }
              ]
            };
            renjunweishengChart.setOption(renjunweisheng_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      //下面右边的三角形柱状图
      this.$axios({
        method: "post",
        url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
        data: {
          chartLocation: 7,
          chartType: 1,
          parentTitle: parentTitle,
          subTitleCode: subTitleCode,
          statisticsYear: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            var BottomRightData = res.data.data;
            var cockpitDatatList = BottomRightData.cockpitDatatList;
            var xAxisDataObj = {
              xAxisData: [],
              data: [],
              name: ""
            };
            for (var i = 0; i < cockpitDatatList.length; i++) {
              xAxisDataObj.xAxisData.push(
                cockpitDatatList[i].statisticalIndicator
              );
              xAxisDataObj.data.push(
                cockpitDatatList[i].firstStatisticalContent
              );
              xAxisDataObj.name = cockpitDatatList[i].firstDescription;
            }
            var yiliaoyanChart = echarts.init(
              document.getElementById("part_seven")
            );
            var yiliaoyan_option = {
              title: {
                text: BottomRightData.chartName,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                left: "center"
              },

              color: ["#0FA16D"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                },
                formatter: function(params) {
                  return params[0].name + ": " + params[0].value;
                }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              axisLabel: {
                color: "#fff",
                fontSize: 14
              },
              xAxis: [
                {
                  type: "category",
                  data: xAxisDataObj.xAxisData,
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisTick: {
                    alignWithLabel: true,
                    lineStyle: { color: "#2D8C6A" } //坐标轴刻度线颜色
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#2D8C6A" //坐标轴颜色
                    }
                  },
                  axisLabel: {
                    color: "#fff",
                    fontSize: 12
                  },
                  splitLine: {
                    show: true, //是否显示后面的网格线
                    lineStyle: {
                      color: "#2D8C6A" //网格线颜色
                    }
                  }
                }
              ],
              series: [
                {
                  name: xAxisDataObj.name,
                  type: "bar",
                  barWidth: "30%",
                  data: xAxisDataObj.data
                }
              ]
            };
            yiliaoyanChart.setOption(yiliaoyan_option);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getChartData();
  }
};
</script>

<style scoped lang='less'>
.echarts_container {
  width: 100%;
  // height: 1983px;
  background-image: url("../../assets/images/obserStar/chart_bg_img.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  box-sizing: border-box;
  flex-direction: column;
  .chart {
    width: 1200px;
    padding-bottom: 80px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .chart_top {
      font-size: 28px;
      color: #fff;
      text-align: center;
      margin-bottom: 48px;
    }
    .chart_container {
      width: 100%;
      height: 1212px;
      // background-image: url('../../assets/images/obserStar/wenhuamokuai.png');
      // background-size: 100% 100%;
      .top {
        width: 100%;
        height: 636px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .left {
          width: 797px;
          height: 638px;
          border: rgba(3, 169, 113, 0.3) 1px solid;
          margin-right: 21px;
        }
        .right {
          width: 376px;
          height: 100%;
          .top {
            width: 100%;
            height: 307px;
            border: rgba(3, 169, 113, 0.3) 1px solid;
            margin-bottom: 22px;
          }
          .bottom {
            width: 100%;
            height: 308px;
            border: rgba(3, 169, 113, 0.3) 1px solid;
          }
        }
      }
      .bottom {
        width: 100%;
        height: 576px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: space-between;
        .chart_one,
        .chart_two,
        .chart_three,
        .chart_four {
          width: 588px;
          height: 264px;
          border: rgba(3, 169, 113, 0.3) 1px solid;
          // margin-right: 19px;
        }
      }
    }
  }
}
</style>
