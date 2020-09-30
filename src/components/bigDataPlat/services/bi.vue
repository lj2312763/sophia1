<template>
  <div class="fuwu_container">
    <div class="banner_container">
      <div class="desc_btn_container">
        <div class="title">数据可视化从未如此简单</div>
        <div class="desc">快速敏捷发现数据价值，让您随时随地进行科学化决策。</div>
        <div class="btn_container">
          <div class="down_load" @click="jump">立即使用</div>
          <!-- <div class="tech_file" @click="techFile">技术文档</div> -->
        </div>
      </div>
    </div>
    <div class="fn_intro_container">
      <div class="fn_intro">
        <div class="title">整合信息 一站式访问</div>
        <div class="desc">对接企业现有的多套系统，获取数据，快速整合建模，一站式分析展现</div>
        <div class="content">
          <div class="img_container">
            <img :src="appSceneImg">
          </div>
        </div>
      </div>
    </div>
    <div class="data_computed_container">
      <div class="data_computed">
        <div class="title">跨屏展示 随时随地看报表</div>
        <div class="desc">让人数分析中更高高效，更专业</div>
        <div class="content">
          <div class="echarts_container">
            <div class="left" style="color:#fff">
                <p style="font-size: 16px;margin-bottom:30px;margin-top:40px">电脑WEB端</p>
                <p style="font-size: 16px;margin-bottom:30px">屏端</p>
                <p style="font-size: 16px;margin-bottom:30px">手机端</p>
                <p style="font-size: 16px;">微信端</p>
            </div>   
            <div class="center" id="echart-box"></div>
            <div class="right"  style="color:#fff">
               <img :src="appSceneImg1" alt="" srcset="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app_scene_container">
      <div class="app_scene">
        <div class="title">数据之美 始于展现</div>
        <div class="desc">让大数据分析更高效、更专业</div>
        <div class="content">
          <div class="left">
             <img :src="appSceneImg2" alt="" srcset="">
             <p style="font-size: 18px;color: #121C33;text-align: center;margin-top:20px">传统报表</p>
          </div>
          <div class="right">
            <img :src="appSceneImg3" alt="" srcset="">
            <p style="font-size: 18px;color: #121C33;text-align: center;margin-top:20px">Sophia报表</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $echarts from 'echarts';
  export default {
    data(){
      return {
        computedImg:require('../../../assets/images/bigDataPlat/computedImg.png'),
        appSceneImg:require('../../../assets/images/bigDataPlat/bianzu7.png'),
        appSceneImg1:require('../../../assets/images/bigDataPlat/1255-dribbble-upload.png'),
        appSceneImg2:require('../../../assets/images/bigDataPlat/weitu.png'),
        appSceneImg3:require('../../../assets/images/bigDataPlat/cdw.png'),
        appSceneImg4:require('../../../assets/images/bigDataPlat/computedImg.png'),
      }
    },
    mounted() {
      this.initEchart();
    },
    methods:{
      jump(){
         window.open("http://123.57.46.207:8081/user/login.do#/login",'_blank');
      },
      initEchart() {
        let myBarChart = $echarts.init(document.getElementById("echart-box"));
        var geoCoordMap = {
          新疆玛纳斯基地: [86.22, 44.3],
          九江: [116.0, 29.7],
          新乡: [116.402217, 35.311657],
          " ": [79.92, 37.12],
          "  ": [86.85, 47.7],
          若羌县: [88.17, 39.02],
          上海: [121.4648, 31.2891],
          东莞: [113.8953, 22.901],
          东营: [118.7073, 37.5513],
          中山: [113.4229, 22.478],
          临汾: [111.4783, 36.1615],
          临沂: [118.3118, 35.2936],
          丹东: [124.541, 40.4242],
          丽水: [119.5642, 28.1854],
          乌鲁木齐: [87.9236, 43.5883],
          佛山: [112.8955, 23.1097],
          保定: [115.0488, 39.0948],
          兰州: [103.5901, 36.3043],
          包头: [110.3467, 41.4899],
          北京: [116.4551, 40.2539],
          北海: [109.314, 21.6211],
          南京: [118.8062, 31.9208],
          南宁: [108.479, 23.1152],
          南昌: [116.0046, 28.6633],
          南通: [121.1023, 32.1625],
          厦门: [118.1689, 24.6478],
          台州: [121.1353, 28.6688],
          合肥: [117.29, 32.0581],
          呼和浩特: [111.4124, 40.4901],
          咸阳: [108.4131, 34.8706],
          哈尔滨: [127.9688, 45.368],
          唐山: [118.4766, 39.6826],
          嘉兴: [120.9155, 30.6354],
          大同: [113.7854, 39.8035],
          大连: [122.2229, 39.4409],
          天津: [117.4219, 39.4189],
          太原: [112.3352, 37.9413],
          威海: [121.9482, 37.1393],
          宁波: [121.5967, 29.6466],
          宝鸡: [107.1826, 34.3433],
          宿迁: [118.5535, 33.7775],
          常州: [119.4543, 31.5582],
          广州: [113.5107, 23.2196],
          廊坊: [116.521, 39.0509],
          延安: [109.1052, 36.4252],
          张家口: [115.1477, 40.8527],
          徐州: [117.5208, 34.3268],
          德州: [116.6858, 37.2107],
          惠州: [114.6204, 23.1647],
          成都: [103.9526, 30.7617],
          扬州: [119.4653, 32.8162],
          承德: [117.5757, 41.4075],
          拉萨: [91.1865, 30.1465],
          无锡: [120.3442, 31.5527],
          日照: [119.2786, 35.5023],
          昆明: [102.9199, 25.4663],
          杭州: [119.5313, 29.8773],
          枣庄: [117.323, 34.8926],
          柳州: [109.3799, 24.9774],
          株洲: [113.5327, 27.0319],
          武汉: [114.3896, 30.6628],
          汕头: [117.1692, 23.3405],
          江门: [112.6318, 22.1484],
          沈阳: [123.1238, 42.1216],
          沧州: [116.8286, 38.2104],
          河源: [114.917, 23.9722],
          泉州: [118.3228, 25.1147],
          泰安: [117.0264, 36.0516],
          泰州: [120.0586, 32.5525],
          济南: [117.1582, 36.8701],
          济宁: [116.8286, 35.3375],
          海口: [110.3893, 19.8516],
          淄博: [118.0371, 36.6064],
          淮安: [118.927, 33.4039],
          深圳: [114.5435, 22.5439],
          清远: [112.9175, 24.3292],
          温州: [120.498, 27.8119],
          渭南: [109.7864, 35.0299],
          湖州: [119.8608, 30.7782],
          湘潭: [112.5439, 27.7075],
          滨州: [117.8174, 37.4963],
          潍坊: [119.0918, 36.524],
          烟台: [120.7397, 37.5128],
          玉溪: [101.9312, 23.8898],
          珠海: [113.7305, 22.1155],
          盐城: [120.2234, 33.5577],
          盘锦: [121.9482, 41.0449],
          石家庄: [114.4995, 38.1006],
          福州: [119.4543, 25.9222],
          秦皇岛: [119.2126, 40.0232],
          绍兴: [120.564, 29.7565],
          聊城: [115.9167, 36.4032],
          肇庆: [112.1265, 23.5822],
          舟山: [122.2559, 30.2234],
          苏州: [120.6519, 31.3989],
          莱芜: [117.6526, 36.2714],
          菏泽: [115.6201, 35.2057],
          营口: [122.4316, 40.4297],
          葫芦岛: [120.1575, 40.578],
          衡水: [115.8838, 37.7161],
          衢州: [118.6853, 28.8666],
          西宁: [101.4038, 36.8207],
          西安: [109.1162, 34.2004],
          贵阳: [106.6992, 26.7682],
          连云港: [119.1248, 34.552],
          邢台: [114.8071, 37.2821],
          邯郸: [114.4775, 36.535],
          郑州: [113.4668, 34.6234],
          鄂尔多斯: [108.9734, 39.2487],
          重庆: [107.7539, 30.1904],
          金华: [120.0037, 29.1028],
          铜川: [109.0393, 35.1947],
          银川: [106.3586, 38.1775],
          镇江: [119.4763, 31.9702],
          长春: [125.8154, 44.2584],
          长沙: [113.0823, 28.2568],
          长治: [112.8625, 36.4746],
          阳泉: [113.4778, 38.0951],
          青岛: [120.4651, 36.3373],
          韶关: [113.7964, 24.7028]
        };

        var BJData = [
          [
            {
              name: "新乡"
            },
            {
              name: "新乡",
              value: 200
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "呼和浩特",
              value: 90
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "哈尔滨",
              value: 90
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "石家庄",
              value: 90
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "昆明",
              value: 30
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "北京",
              value: 100
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "长春",
              value: 40
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "重庆",
              value: 40
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "贵阳",
              value: 50
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "南宁",
              value: 30
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "济南",
              value: 10
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "太原",
              value: 40
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "西安",
              value: 60
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "武汉",
              value: 50
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "合肥",
              value: 40
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "南京",
              value: 30
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "沈阳",
              value: 20
            }
          ],
          [
            {
              name: "新乡"
            },
            {
              name: "成都",
              value: 10
            }
          ]
        ];

        var SHData = [
          [
            {
              name: "九江"
            },
            {
              name: "九江",
              value: 200
            }
          ],

          [
            {
              name: "九江"
            },
            {
              name: "长沙",
              value: 95
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "武汉",
              value: 30
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "南昌",
              value: 20
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "合肥",
              value: 70
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "南京",
              value: 60
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "福州",
              value: 50
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "上海",
              value: 100
            }
          ],
          [
            {
              name: "九江"
            },
            {
              name: "深圳",
              value: 100
            }
          ]
        ];

        var GZData = [
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "新疆玛纳斯基地",
              value: 200
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "  ",
              value: 90
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: " ",
              value: 40
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "呼和浩特",
              value: 90
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "昆明",
              value: 40
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "成都",
              value: 10
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "兰州",
              value: 95
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "银川",
              value: 90
            }
          ],
          [
            {
              name: "新疆玛纳斯基地"
            },
            {
              name: "西宁",
              value: 80
            }
          ]
        ];

        var planePath =
          "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";

        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push([
                {
                  coord: fromCoord
                },
                {
                  coord: toCoord
                }
              ]);
            }
          }
          return res;
        };

        var color = ["#3ed4ff", "#ffa022", "#a6c84c"];
        var series = [];
        [
          ["新乡", BJData],
          ["九江", SHData],
          ["新疆", GZData]
        ].forEach(function(item, i) {
          series.push(
            {
              name: item[0] + " Top10",
              type: "lines",
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: "#fff",
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + " Top10",
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + " Top10",
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              rippleEffect: {
                brushType: "stroke"
              },
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: "{b}"
                }
              },
              symbolSize: function(val) {
                return val[2] / 8;
              },
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item[1].map(function(dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
              })
            }
          );
        });

        let option = {
          backgroundColor: "#080a20",
          title: {
            text: "",
            subtext: "",
            left: "left",
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {
            trigger: "item"
          },
          legend: {
            orient: "vertical",
            top: "bottom",
            left: "right",
            data: ["北京 Top10", "上海 Top10", "广州 Top10"],
            textStyle: {
              color: "#fff"
            },
            selectedMode: "single"
          },
          geo: {
            map: "china",
            zoom: 1.2,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#132937",
                borderColor: "#0692a4"
              },
              emphasis: {
                areaColor: "#0b1c2d"
              }
            }
          },
          series: series
        };
        myBarChart.setOption(option);
      }
    },
  }
</script>

<style scoped lang='less'>
.fuwu_container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .banner_container{
    width: 100%;
    height: 350px;
    background-image: url(../../../assets/images/bigDataPlat/bibanner.png);
    background-size:cover;
    background-position: center;
    display: flex;
    justify-content: center;
    .desc_btn_container{
      width: 1200px;
      height: 100%;
      .title{
        font-size: 30px;
        color: #FFFFFF;
        letter-spacing: -0.24px;
        margin-top: 81px;
        margin-bottom: 15px;
      }
      .desc{
        font-size: 14px;
        color: #FFFFFF;
        margin-bottom: 54px;
      }
      .btn_container{
        display: flex;
        .down_load,.tech_file{
          border-radius: 3px;
          padding: 8px 32px;
          box-sizing: border-box;
          font-size: 14px;
          color: #FFFFFF;
        }
        .down_load{
          background: #03A971;
          margin-right: 40px;
        }
        .down_load:hover{
          cursor: pointer;
        }
        .tech_file{
          left: 197px;
          border: 1px solid #FFFFFF;
        }
        .tech_file:hover{
          cursor: pointer;
        }
      }
    }
  }
  .fn_intro_container{
    width: 100%;
    background-color:#F7F8FA;
    display: flex;
    justify-content: center;
    .fn_intro{
      width: 1200px;
      .title{
        margin-top: 60px;
        font-size: 30px;
        color: #121C33;
        margin-bottom: 15px;
        padding-left: 20px;
        border-left: 4px #03A971 solid;
      }
      .desc{
        padding-left: 20px;
        font-size: 18px;
        color: #7A8499;
        margin-bottom: 30px;
      }
      .content{
        width: 100%;
        .img_container{
          margin-bottom: 60px;
          img{
            width: 100%;
            display:block
          }
        }
      }
    }
  }
  .data_computed_container{
    width: 100%;
    display: flex;
    justify-content: center;
    .data_computed{
      width: 1200px;
      .title{
        margin-top: 60px;
        font-size: 30px;
        color: #121C33;
        margin-bottom: 15px;
        padding-left: 20px;
        border-left: 4px #03A971 solid;
      }
      .desc{
        padding-left: 20px;
        font-size: 18px;
        color: #7A8499;
        margin-bottom: 30px;
      }
      .content{
        width: 100%;
        .echarts_container {
          background: #080920;
          height: 460px;
          display: flex;
          padding-right: 15px;
          position: relative;
          .left {
            position: absolute;
            left:28px;
            top:28px;
            width: 130px;
            height:404px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            z-index:10;
          }
          .center {
            flex: 1;
          }
          .right {
            display: flex;
            width: 527px;
            align-items: center;
            img{
              width:100%;
              display: block;
            }
          }
        }
      }
    }
  }
  .app_scene_container{
    width: 100%;
    display: flex;
    justify-content: center;
    .app_scene{
      width: 1200px;
      .title{
        margin-top: 60px;
        font-size: 30px;
        color: #121C33;
        margin-bottom: 15px;
        padding-left: 20px;
        border-left: 4px #03A971 solid;
      }
      .desc{
        padding-left: 20px;
        font-size: 18px;
        color: #7A8499;
        margin-bottom: 30px;
      }
      .content{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 60px;
        .left{
          width: 635px;
          margin-right: 37px;
          img{
             box-shadow: 0 2px 13px 0 #B8BECC;
            width: 100%;
           display: block;
          }
        }
        .right{
          flex:1;
          img{
             box-shadow: 0 2px 13px 0 #B8BECC;
            width: 100%;
           display: block;
          }
        }
      }
    }
  }
  .sophia_container{
    width: 100%;
    height: 257px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
      margin-top: 60px;
      font-size: 30px;
      color: #121C33;
      margin-bottom: 9px;
    }
    .desc{
      font-size: 16px;
      color: #7A8499;
      margin-bottom: 22px;
    }
    .down_load_btn{
      padding: 10px 38px;
      font-size: 16px;
      color: #FFFFFF;
      background: #03A971;
      border-radius: 3px;
    }
  }
}
</style>
