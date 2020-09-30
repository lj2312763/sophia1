<template>
  <div class="tech_container">
    <div class="title">{{searchKey}}发展分析</div>
    <div class="body_content">
      <div class="body_item" id="echart1"></div>
      <div class="body_item" id="echart2"></div>
      <div class="body_item" id="echart3"></div>
      <div class="body_item" id="echart4"></div>
      <div class="body_item" id="echart5"></div>
      <div class="body_item" id="echart6"></div>
    </div>
  </div>
</template>

<script>
import $echarts from "echarts";
export default {
  data() {
    return {
      searchKey: "",
      result: null
    };
  },
  mounted() {
    this.initData();
  },
  created() {
    this.searchKey = this.$route.query.searchKey;
  },
  methods: {
    initData() {
      this.$axios({
        method: "post",
        url: window.config.url + "/sophiaManager/api/lunwen/analysis",
        data: {
          subject: this.searchKey
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.result = res.data;
            this.initEcharts();
            this.initEcharts1();
            this.initEcharts2();
            this.initEcharts3();
            let arr=[];
            this.result.rmyjfx.forEach(item=>{
              item['max']=this.result.rmyjfx[0].value;
              arr.push(item.value)
            })

            this.initEcharts4(arr);
            this.initEcharts5();
          }
        })
        .catch(err => {});
    },
    initEcharts5() {
      this.result.zdxkrdqs.data.forEach(item=>{
        item['type']='line';
        item['areaStyle']={};
        item['name']='';
      })
       let option = {
        title: {
          text: "重点学科的热度趋势"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
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
            boundaryGap: false,
            data: this.result.zdxkrdqs.year
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.result.zdxkrdqs.data
      };
      let myBarChart = $echarts.init(document.getElementById("echart6"));
      myBarChart.setOption(option);
    },
    initEcharts4(arr) {
      let option = {
        title: {
          text: "年度热门研究方向"
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: this.result.rmyjfx
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {value:arr}
            ]
          }
        ]
      };
      let myBarChart = $echarts.init(document.getElementById("echart5"));
      myBarChart.setOption(option);
    },
    initEcharts3() {
      let option = {
        tooltip: {
            show: true
        },
        title: {
          text: "论文Top50导师",
          textStyle: {
            fontSize: 23
          }
        },
        // backgroundColor: "#F7F7F7",
        series: [
          {
            name: "论文Top50导师",
            type: "wordCloud",
            width:'100%',
            //size: ['9%', '99%'],
            sizeRange: [6, 66],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.result.lwtop50teacher
          }
        ]
      };
      let myBarChart = $echarts.init(document.getElementById("echart4"));
      myBarChart.setOption(option);
    },
    initEcharts2() {
      let option = {
        title: {
          text: "论文Top50学校",
          textStyle: {
            fontSize: 23
          }
        },
        tooltip: {
            show: true
        },
        // backgroundColor: "#F7F7F7",
        series: [
          {
            name: "论文Top50学校",
            type: "wordCloud",
            //size: ['9%', '99%'],
             width:'100%',
            sizeRange: [6, 66],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.result.lwtop50school
          }
        ]
      };



      let myBarChart = $echarts.init(document.getElementById("echart3"));
      myBarChart.setOption(option);
    },
    initEcharts1() {
      let leg=[];
      this.result.xfxkfb.forEach(item=>{
        leg.push(item.name)
      })
      let option = {
        title: {
          text: "细分学科分布"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          legend: {
              orient: 'vertical',
              right: 10,
              data: leg,
              type: 'scroll',
          },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.result.xfxkfb
          }
        ]
      };

      let myBarChart = $echarts.init(document.getElementById("echart2"));
      myBarChart.setOption(option);
    },
    initEcharts() {
      let option = {
        title: {
          text: "论文发布趋势"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
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
            boundaryGap: false,
            data: this.result.lwfbqs.lwfbqs_x
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: this.result.lwfbqs.lwfbqs_y
          }
        ]
      };
      let myBarChart = $echarts.init(document.getElementById("echart1"));
      myBarChart.setOption(option);
    }
  }
};
</script>
<style scoped lang="less">
img {
  width: 100%;
  display: block;
}
.title {
  font-size: 30px;
  color: #121c33;
  text-align: center;
  margin-top: 120px;
  margin-bottom: 40px;
}
.body_content {
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .body_item {
    width: 49%;
    height: 330px;
    padding-top:10px;
    padding-left:5px;
    border: 1px solid #f2f4f7;
    margin-bottom: 40px;
    box-sizing: border-box;
  }
}
.paperBtn {
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  background: #03a971;
  border-radius: 3px;
  width: 120px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 60px;
}
</style>
