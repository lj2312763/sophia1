<template>
  <div>
    <!--内容区域-->
    <Banner :banner="banner" ref="banner"></Banner>
    <TextPic :textImg="BuildText"></TextPic>
    <IconText :textImg="iconText"></IconText>
    <TextPic :textImg="BuildText1"></TextPic>
    <IconText :textImg="iconText1"></IconText>
    <TextEchart :textImg="BuildText2"></TextEchart>
    <div class="content">
      <p class="title">即刻获得地产综合分析能力</p>
      <div class="zixun">快速与我们取得联系，请点击下方的合作咨询</div>
      <div class="intro">
        <i-button type="success" @click="jump1()"
          >合作咨询</i-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../common/banner";
import TextPic from "../common/textPic";
import IconText from "../common/iconText";
import TextEchart from "../common/textEcharts";
export default {
  name: "insightData",
  data() {
    return {
      keyword: "",
      banner: {
        url: require("../../assets/images/room/dichan.png"),
        title: "地产综合分析",
        intro:
          "提供房产、物业真实有效的全维度信息，为您的工作生活、投资决策提供帮助。",
        btn: {
          btn1: { path: "/houseDetail", query: "2", text: "功能体验", id: "0" },
          btn2: { path: "", query: "2", text: "立即使用" },
          btn3: { path: "/document", query: "2", id: "1", text: "接口文档" }
        }
      },
      BuildText: {
        url: require("../../assets/images/room/loupan.png"),
        title: "楼盘综合分析",
        intro:
          "提供全国楼盘详情数据，结合楼盘周边社区配套以及舆情数据，进行综合分析并评分，为您提供便捷全面的房地产综合信息服务"
      },
      BuildText1: {
        url: require("../../assets/images/room/wuye.png"),
        title: "物业综合分析",
        intro:
          "提供全国物业公司的详细数据，结合所服务社区软硬件配置、服务评价以及相关物业、楼盘舆情信息，进行物业服务能力综合评价。"
      },
      BuildText2: {
        url: require("../../assets/images/room/gaopin.png"),
        title: "楼盘/物业舆情分析",
        intro:
          "根据全网新闻网站、微信自媒体、微博、论坛贴吧舆情数据，进行楼盘/物业整体舆情趋势统计，为您的工作生活、投资决策提供数据基础。",
        Echarts: {
          lineEcharts: {
            id: "loupan",
            title: "北京楼盘舆情趋势统计",
            subTitle: "舆情趋势统计",
            data: {
              legend: [],
              category: [],
              value: []
            }
          },
          barEcharts: {
            id: "hotWeibo",
            title: "北京微博热议小区",
            subTitle: "微博热议TopN",
            data: {
              legend: [],
              category: [],
              value: []
            }
          }
        },
        heighTitle: "高频词TopN"
      },
      iconText: {
        title: "社区成熟度评估",
        list: [
          {
            url:  require('@/assets/images/new_index/icon/dashuju.png'),
            subTitle: "购物关键数据"
          },
          {
            url:  require('@/assets/images/new_index/icon/jiqi.png'),
            subTitle: "餐饮关键数据"
          },
          {
            url: require('@/assets/images/new_index/icon/keshihua.png'),
            subTitle: "服务关键数据"
          },
          {
            url: require('@/assets/images/new_index/icon/neirong.png'),
            subTitle: "休闲关键数据"
          },
          {
            url:  require('@/assets/images/new_index/icon/yingyong.png'),
            subTitle: "机构关键数据"
          },
          {
            url: require('@/assets/images/new_index/icon/wenzi.png'),
            subTitle: "住宅关键数据"
          },
          {
            url:require('@/assets/images/new_index/icon/yuyin.png'),
            subTitle: "交通关键数据"
          }
        ]
      },
      iconText1: {
        title: "物业综合评估",
        list: [
          {
            url:require('@/assets/images/new_index/icon/yuyin.png'),
            subTitle: "软件服务"
          },
          {
            url: require('@/assets/images/new_index/icon/wenzi.png'),
            subTitle: "硬件设施"
          },
          {
            url: require('@/assets/images/new_index/icon/yingyong.png'),
            subTitle: "社区服务评价"
          },
          {
            url:require('@/assets/images/new_index/icon/neirong.png'),
            subTitle: "舆情数据"
          }
        ]
      }
    };
  },
  components: {
    Banner,
    TextPic,
    IconText,
    TextEchart
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
  created() {
    this.initData();
  },
  methods: {
    jump1(){
       let routerUrl = this.$router.resolve({
            path:'/zixun',
            // query:{
            //  title:1,
            //  subTitle:'合作咨询'
            // }
        });
        window.open(routerUrl.href,'_blank')
    },
    initData() {
      this.BuildText2.Echarts.barEcharts.data = {
        category: [
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
        value: [1481, 169, 999, 370, 43, 374, 36, 103, 428, 327, 674]
      };

      //北京楼盘舆情趋势统计
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
      var time = [];
      var series = {};
      for (var key in hot_data.list[0].data) {
        series[key] = [];
      }
      for (var i = 0; i < hot_data.list.length; i++) {
        time.push(hot_data.list[i].date);
        series["weibo"].push(hot_data.list[i].data.weibo);
        series["wechat"].push(hot_data.list[i].data.wechat);
        series["newsSite"].push(hot_data.list[i].data.newsSite);
      }

      this.BuildText2.Echarts.lineEcharts.data = {
        legend: ["微博", "网站", "微信"],
        category: time.reverse(),
        value: [
          {
            data: series["weibo"].reverse(),
            type: "line",
            name: "微博"
          },
          {
            data: series["newsSite"].reverse(),
            type: "line",
            name: "网站"
          },
          {
            data: series["wechat"].reverse(),
            type: "line",
            name: "微信"
          }
        ]
      };
    },
    goLogin() {
      this.ifShowLogin = true;
    }
  }
};
</script>
<style scoped lang="less">
.content {
  width: 1200px;
  margin: auto;
  margin-bottom: 80px;
  .title {
    font-size: 36px;
    color: #121c33;
    text-align: center;
    margin-bottom: 20px;
  }
  .zixun{
    color: #7A8499;
    margin: 10px 0 25px 0;
    font-size: 20px;
    text-align: center;
  }
  .intro {
    width: 509px;
    margin: auto;
    text-align: center;
  }
  .search {
    width: 450px;
    margin: auto;
    display: flex;
    justify-content: center;
  }
}
</style>
