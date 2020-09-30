<template>
  <div class="case_container">
    <div class="case_analysis_report">住房监测指标</div>
    <div class="houseContainer">
      <div class="map_statistics">
          <div  id="map"></div>
      </div>
      <div class="total_num">
        <p class="title">微博热议楼盘榜单</p>
        <p class="subTitle">2020年2月</p>
        <hr />
        <ul class="content">
          <li>
            <div class="num">序号</div>
            <div class="area">楼盘名称</div>
            <div class="comment">评论数</div>
          </li>
          <li v-for="(item,index) in list" :key="index">
            <div class="num">{{index+1}}</div>
            <div class="area">{{item.keyWord}}</div>
            <div class="comment">{{item.num}}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="case_echarts_container">
      <div class="top_ten_container">
        <div class="top_ten_title">全国楼盘舆情趋势统计</div>
        <div class="top_ten" id="top_ten"></div>
      </div>
      <div class="case_time_container">
        <div class="case_time_title">网络微博热议小区</div>
        <div class="case_time" id="hot_net"></div>
      </div>
    </div>
    <div class="loupan">
        <img src="../../assets/images/houseData/loupan.png" alt />
      <div class="cover">
        <img src="../../assets/images/houseData/font.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          keyWord: "天通苑",
          num: 1205
        },
        {
          keyWord: "嘉都",
          num: 580
        },
        {
          keyWord: "恒大绿洲",
          num: 365
        },
        {
          keyWord: "新城家园",
          num: 250
        },
        {
          keyWord: "潮白河孔雀城",
          num: 191
        },
        {
          keyWord: "天润城",
          num: 168
        },
        {
          keyWord: "绿地国际花都",
          num: 109
        },
        {
          keyWord: "水晶城",
          num: 103
        },
        {
          keyWord: "远洋山水",
          num: 92
        },
        {
          keyWord: "桂花园",
          num: 79
        }
      ]
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    var echarts = require("echarts");

    var mapData = [
      { name: "北京", value: "24728" },
      { name: "天津", value: "13984" },
      { name: "河北", value: "27842" },
      { name: "山西", value: "9687" },

      { name: "辽宁", value: "18850" },
      { name: "吉林", value: "7781" },
      { name: "黑龙江", value: "7897" },
      { name: "上海", value: "35924" },
      { name: "江苏", value: "54324" },
      { name: "浙江", value: "34472" },
      { name: "安徽", value: "29827" },
      { name: "福建", value: "17856" },
      { name: "江西", value: "10821" },
      { name: "山东", value: "45065" },
      { name: "河南", value: "27283" },
      { name: "湖北", value: "20305" },
      { name: "湖南", value: "15864" },
      { name: "广东", value: "63286" },

      { name: "海南", value: "4281" },
      { name: "重庆", value: "16245" },
      { name: "四川", value: "35964" },
      { name: "贵州", value: "5561" },
      { name: "云南", value: "8509" },

      { name: "陕西", value: "13552" },
      { name: "甘肃", value: "6798" },
      { name: "青海", value: "4175" },
      { name: "广西", value: "12279" },
      { name: "西藏", value: "314" },
      { name: "宁夏", value: "2239" },
      { name: "新疆", value: "5604" },
      { name: "内蒙古", value: "8900" },
      { name: "台湾", value: "1" },
      { name: "澳门", value: "272" }
    ];
    var myMapChart = echarts.init(document.getElementById("map"));
    var mayMap_option = {
      title: {
        //这里是整个图的标题
        text: "", //大标题
        x: "center", //标题的位置，左边中间或者右边
        textStyle: {
          color: "#fff",
          fontSize: 14
        }
      },
      grid: {
        top: -20,
        bottom: 0,
        left: 0,
        right: 0,
        containLabel: true
      },
      tooltip: {
        //图例
        trigger: "item",
        //文本上方的浮动小块
        backgroundColor: "rgba(0,0,0,0.7)", //文本上方的浮动小块的颜色
        padding: [20, 20], //文字与边框之间的内边距
        textStyle: {
          //文本样式设置
          color: "#fff", //这里要注意一下，必须是标准6位，否则可能显现不出来
          fontSize: 18, //字号大小
          //lineHeight: "300px" //最后一个属性不加逗号，行高
        },
        formatter: function(params) {
            if (params.data) {
                let str=`<p>${params.data.name}</p><p style="font-size:14px">小区：${params.data.value}个</p>`;
                return str;
            }
        }
      },
      series: [
        {
          name: "小区",
          type: "map",
          mapType: "china",
          roam: false, //是否允许鼠标滚轮控制大小
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "rgba(0,0,0,1)"
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
//                    areaColor: '#267bee',
                    areaColor: 'rgba(61,97,166,0.5)',
                    borderWidth: 1,
                    borderColor: 'rgba(108,136,216,0.9)'
                },
                emphasis: {
                    areaColor: 'rgba(61,97,166,1)'
                }
            },
        data: mapData // 数据
        }
      ]
    };
    myMapChart.setOption(mayMap_option);

    //top10案件分布
    var hot_data = {
      total: 5174544,
      list: [
        {
          date: "2020-02-29",
          data: {
            weibo: 87458,
            wechat: 74749,
            newsSite: 12849
          },
          count: 175056
        },
        {
          date: "2020-02-28",
          data: {
            weibo: 34559,
            wechat: 95339,
            newsSite: 22302
          },
          count: 152200
        },
        {
          date: "2020-02-27",
          data: {
            weibo: 31505,
            wechat: 101611,
            newsSite: 23818
          },
          count: 156934
        },
        {
          date: "2020-02-26",
          data: {
            weibo: 34703,
            wechat: 99693,
            newsSite: 22422
          },
          count: 156818
        },
        {
          date: "2020-02-25",
          data: {
            weibo: 30802,
            wechat: 97963,
            newsSite: 23460
          },
          count: 152225
        },
        {
          date: "2020-02-24",
          data: {
            weibo: 40204,
            wechat: 96038,
            newsSite: 24365
          },
          count: 160607
        },
        {
          date: "2020-02-23",
          data: {
            weibo: 38823,
            wechat: 80898,
            newsSite: 13798
          },
          count: 133519
        },
        {
          date: "2020-02-22",
          data: {
            weibo: 40498,
            wechat: 89398,
            newsSite: 15240
          },
          count: 145136
        },
        {
          date: "2020-02-21",
          data: {
            weibo: 35812,
            wechat: 112722,
            newsSite: 26654
          },
          count: 175188
        },
        {
          date: "2020-02-20",
          data: {
            weibo: 37213,
            wechat: 114377,
            newsSite: 27939
          },
          count: 179529
        },
        {
          date: "2020-02-19",
          data: {
            weibo: 41259,
            wechat: 103487,
            newsSite: 25730
          },
          count: 170476
        },
        {
          date: "2020-02-18",
          data: {
            weibo: 43732,
            wechat: 111897,
            newsSite: 30368
          },
          count: 185997
        },
        {
          date: "2020-02-17",
          data: {
            weibo: 44887,
            wechat: 114630,
            newsSite: 30215
          },
          count: 189732
        },
        {
          date: "2020-02-16",
          data: {
            weibo: 47168,
            wechat: 94903,
            newsSite: 19764
          },
          count: 161835
        },
        {
          date: "2020-02-15",
          data: {
            weibo: 38584,
            wechat: 99158,
            newsSite: 24842
          },
          count: 162584
        },
        {
          date: "2020-02-14",
          data: {
            weibo: 42154,
            wechat: 113502,
            newsSite: 39755
          },
          count: 195411
        },
        {
          date: "2020-02-13",
          data: {
            weibo: 50241,
            wechat: 113741,
            newsSite: 42247
          },
          count: 206229
        },
        {
          date: "2020-02-12",
          data: {
            weibo: 59813,
            wechat: 118995,
            newsSite: 41260
          },
          count: 220068
        },
        {
          date: "2020-02-11",
          data: {
            weibo: 95368,
            wechat: 107616,
            newsSite: 41285
          },
          count: 244269
        },
        {
          date: "2020-02-10",
          data: {
            weibo: 99552,
            wechat: 115810,
            newsSite: 39019
          },
          count: 254381
        },
        {
          date: "2020-02-09",
          data: {
            weibo: 65404,
            wechat: 100498,
            newsSite: 28144
          },
          count: 194046
        },
        {
          date: "2020-02-08",
          data: {
            weibo: 76703,
            wechat: 101984,
            newsSite: 28299
          },
          count: 206986
        },
        {
          date: "2020-02-07",
          data: {
            weibo: 58433,
            wechat: 104517,
            newsSite: 30271
          },
          count: 193221
        },
        {
          date: "2020-02-06",
          data: {
            weibo: 57649,
            wechat: 114516,
            newsSite: 31548
          },
          count: 203713
        },
        {
          date: "2020-02-05",
          data: {
            weibo: 62717,
            wechat: 109608,
            newsSite: 30328
          },
          count: 202653
        },
        {
          date: "2020-02-04",
          data: {
            weibo: 58759,
            wechat: 92412,
            newsSite: 27970
          },
          count: 179141
        },
        {
          date: "2020-02-03",
          data: {
            weibo: 43492,
            wechat: 80438,
            newsSite: 26623
          },
          count: 150553
        },
        {
          date: "2020-02-02",
          data: {
            weibo: 58946,
            wechat: 67688,
            newsSite: 19266
          },
          count: 145900
        },
        {
          date: "2020-02-01",
          data: {
            weibo: 36182,
            wechat: 63793,
            newsSite: 20162
          },
          count: 120137
        }
      ]
    };
    var time=[];
    var series={};
    for(var key in hot_data.list[0].data){
        series[key]=[];
    }
    for(var i=0;i<hot_data.list.length;i++){
        time.push(hot_data.list[i].date);
        series["weibo"].push(hot_data.list[i].data.weibo);
        series["wechat"].push(hot_data.list[i].data.wechat);
        series["newsSite"].push(hot_data.list[i].data.newsSite);
    }
    console.log(series)
   
    var topTenChart = echarts.init(document.getElementById("top_ten"));
    var top_ten_option = {
      tooltip: {
        trigger: "axis"
      },
      legend: {
            data: ['微博', '网站', '微信'],
            bottom: 10,
        },
      xAxis: {
        type: "category",
        data: time.reverse(),
        axisLine: {
          symbol: ["none", "arrow"],
          symbolSize: [5, 5]
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          symbol: ["none", "arrow"],
          symbolSize: [5, 5]
        }
      },
      series: [
        {
          data: series["weibo"].reverse(),
          type: "line",
          name: "微博",
        },
        {
          data: series["newsSite"].reverse(),
          type: "line",
          name: "网站",
        },
        {
          data: series["wechat"].reverse(),
          type: "line",
          name: "微信",
        },
        // {
        //   data: [99021, 101021, 120323, 109021, 99021, 89021],
        //   type: "line",
        //   name: "贴吧",
        //   itemStyle: {
        //     normal: {
        //       color: "#275F82",
        //       lineStyle: {
        //         color: "#f00"
        //       }
        //     }
        //   }
        // }
      ]
    };
    topTenChart.setOption(top_ten_option);

    //案件时间分布
    var caseTimeChart = echarts.init(document.getElementById("hot_net"));
    var case_time_option = {
      color: ["#03A971"],
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        data: [
          "天通苑",
          "嘉都",
          "恒大绿洲",
          "新城家园",
          "潮白河孔雀城",
          "天润城",
          "锦绣龙城",
          "绿地国际花都",
          "水晶城",
          "远洋山水",
          "桂花园"
        ],
        axisLine: {
          symbol: ["none", "arrow"],
          symbolSize: [5, 5]
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          symbol: ["none", "arrow"],
          symbolSize: [5, 5]
        }
      },
      series: [
        {
          data: [1481, 169, 999, 370, 43, 374, 36, 103, 428, 327, 674],
          type: "bar"
        }
      ]
    };
    caseTimeChart.setOption(case_time_option);
  }
};
</script>

<style scoped lang='less'>
.case_container {
  width: 1200px;
  padding: 80px 0;
  box-sizing: border-box;
  .case_analysis_report {
    width: 100%;
    text-align: center;
    font-size: 36px;
    color: #121c33;
    margin-bottom: 40.4px;
  }
  .houseContainer {
    display: flex;
    width: 100%;
    margin-bottom: 40px;
    .map_statistics {
      width: 75%;
      position: relative;
      #map{
          position: absolute;
          width: 100%;
         top:-60px;
         bottom: -60px;
      }
    }
    .total_num {
      width: 25%;
      background: #f2f4f7;
      padding: 10px;
      .title {
        font-size: 22px;
        color: #121c33;
        letter-spacing: 0.03px;
      }
      .subTitle {
        font-size: 14px;
        color: #7a8499;
        letter-spacing: 0;
      }
      .content {
        li {
          display: flex;
          padding: 5px;
          justify-content: space-between;
          .num{
            display: flex;
            width:30px; 
            justify-content: center; 
            margin-right: 59px; 
          }
          .comment{
            display: flex;
            width:43px; 
            justify-content: flex-start;  
          }
          .area {
            display: flex;
            flex:1;
            color: #03a971;
            justify-content: flex-start;  
          }
        }
      }
    }
  }

  .case_echarts_container {
    width: 1200px;
    display: flex;
    justify-content: space-between;
     margin-bottom: 30px;
    .top_ten_container,
    .case_time_container{
      width: 568px;
      height: 340px;
      border: 1px solid #ebecf0;
      .top_ten_title,
      .case_time_title
      {
        width: 100%;
        height: 60px;
        padding-left: 25px;
        box-sizing: border-box;
        line-height: 60px;
        font-size: 16px;
        color: #3d4966;
        letter-spacing: 0;
        background-color: #f2f4f7;
      }
      .top_ten,
      .case_time
     {
        width: 100%;
        height: 280px;
      }
    }
  }
  .loupan {
    position: relative;
    width: 1200px;
    img {
      width: 100%;
      display: block;
    }
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.1);
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .reyi {
    .title {
      font-size: 16px;
      color: #121c33;
      letter-spacing: 0;
    }
    width: 1200px;
    display: flex;
    height: 297;
    justify-content: space-between;
    margin-top: 40px;
    font-size: 14px;
    color: #7a8499;
    letter-spacing: 0;
    .house {
      width: 45%;
      border: 1px solid #ebecf0;
      li {
        display: flex;
        padding: 5px;
        div {
          flex: 1;
        }
      }
    }
    .gard {
      width: 45%;
      border: 1px solid #ebecf0;
      li {
        display: flex;
        padding: 5px;
        div {
          flex: 1;
        }
      }
    }
  }
  .judgment_analy_report {
    width: 1200px;
    font-size: 36px;
    color: #121c33;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 40px;
  }
  .court_navigation {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 43.6px;
    .court_navigation_left {
      width: 892px;
      height: 600px;
      background-image: url("../../assets/images/insightData/china_map.jpg");
      background-size: 100% 100%;
    }
    .court_navigation_right {
      width: 308px;
      height: 600px;
      // background-color: #FF3D40;
      padding: 0 30px;
      box-sizing: border-box;
      .top {
        height: 70px;
        width: 100%;
        line-height: 70px;
        border-bottom: 1px solid #b8becc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14.5px;
        .left {
          font-size: 18px;
          color: #121c33;
          letter-spacing: 0.03px;
        }
        .right {
          font-size: 18px;
          color: #03a971;
          letter-spacing: 0.03px;
        }
      }
      .bottom {
        width: 100%;
        display: flex;
        .court_left {
          p {
            font-size: 14px;
            color: #3d4966;
            letter-spacing: 0;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .court_echarts_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid #ebecf0;
    .case_appeal_container,
    .analysis_results_second_container,
    .retrial_case_analysis_container,
    .judgment_distribution_container {
      width: 568px;
      height: 340px;
      margin-right: 30px;
      margin-bottom: 30px;
      .case_appeal_title,
      .analysis_results_second_title,
      .retrial_case_analysis_title,
      .judgment_distribution_title {
        width: 100%;
        height: 60px;
        padding-left: 25px;
        box-sizing: border-box;
        line-height: 60px;
        font-size: 16px;
        color: #3d4966;
        letter-spacing: 0;
        background-color: #f2f4f7;
      }
      .case_appeal,
      .analysis_results_second,
      .retrial_case_analysis,
      .judgment_distribution {
        width: 100%;
        height: 280px;
      }
    }
  }
}
</style>
