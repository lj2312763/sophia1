<template>
  <div class="echarts-list-box" :id="id"></div>
</template>

<script>
import $echarts from "echarts";
export default {
  props: {
    //pieEchartsData: Array,
    id: String
  },
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    // 根据窗口大小重新渲染
    initEcharts() {
      let _option = this.defaultOption();
      if (!this.myChart) {
        this.myChart = $echarts.init(document.getElementById(this.id));
      }
      this.myChart.setOption(_option);
    },
    // 饼图右侧展示前5个数据
    // legendData() {
    // 	let arr = [];
    // 	this.pieEchartsData.map((x, index) => {
    // 		if (index < 5) {
    // 			arr.push(x.name);
    // 		}
    // 	});
    // 	return arr;
    // },
    // dealData() {
    //     let arr = [];
    //     this.pieEchartsData.map(x => {
    //         arr.push({
    // 			name: x.name,
    // 			value: x.count
    // 		});
    //     });
    //     return arr;
    // },
    defaultOption() {
      var data = [ {name: '北京', value: 79},];
      var geoCoordMap = {
      	 北京: [116.46, 39.92],
      };

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let option = {
        backgroundColor: "#404a59",
        title: {
          text: "",
          subtext: "",
          sublink: "",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["案件数量"],
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            name: "案件数量",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            }
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
            ),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      return option;
    }
  }
};
</script>
<style lang="less" scoped>
.echarts-list-box {
  width: 100%;
  height: 100%;
}
</style>