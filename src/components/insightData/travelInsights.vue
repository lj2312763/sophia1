<template>
  <div class="travel_info_container">
    <Banner :banner="banner" ref="banner"></Banner>
    <div class="travle-box">
      <div class="zaixiantiyan">功能介绍</div>
      <div class="fnIntro_container">
        <Row>
          <i-col span="8" v-for="(item,index) in funList" :key="index">
            <div class="one">
              <div class="left">
                <img :src="item.oneIcon" alt srcset />
              </div>
              <div class="right">
                <div class="title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
      <div class="zaixiantiyan1">全国旅游实时运行概况</div>
      <div class="subMsg">汇集了包括全国火车，航班等综合信息，一览全国旅游实时数据</div>
      <div class="echarts_container">
        <div class="left" style="color:#fff">
            <p style="font-size: 18px;">今日</p>
            <p style="font-size: 14px;margin-top:10px">{{$dateUtil.formatTime(new Date().getTime())}}</p>
            <div style="height:1px;opacity: 0.5;background:#EBECF0;margin:10px 0 20px 0"></div>
            <div class="renci" style="font-size: 16px;margin-bottom:10px">今日全国晚点车次数</div>
            <div class="num" style="font-size: 32px;margin-bottom:30px">1373</div>
            <div class="destnation" style="font-size: 16px;margin-bottom:10px">大面积晚点车站</div>
            <div class="city" style="font-size: 32px;margin-bottom:30px">2</div>
            <div class="destnation" style="font-size: 16px;margin-bottom:10px">今日全国停运车次数</div>
            <div class="city" style="font-size: 32px; margin-bottom:30px">0</div>
            <div class="destnation" style="font-size: 16px;margin-bottom:10px">未来2小时预计晚点车次数</div>
            <div class="city" style="font-size: 32px;">349</div>
        </div>
        <div class="center" id="echart-box"></div>
        <div class="right"  style="color:#fff">
            <p style="font-size: 18px;">今日</p>
            <p style="font-size: 14px;margin-top:10px">{{$dateUtil.formatTime(new Date().getTime())}}</p>
            <div style="height:1px;opacity: 0.5;background:#EBECF0;margin:10px 0 20px 0"></div>
            <div class="renci" style="font-size: 16px;margin-bottom:10px">出发晚点车次最多</div>
            <div class="num" style="font-size: 32px;margin-bottom:30px">无锡</div>
            <div class="destnation" style="font-size: 16px;margin-bottom:10px">最长晚点时常</div>
            <div class="city" style="font-size: 32px;margin-bottom:30px">31m</div>
            <div class="destnation" style="font-size: 16px;margin-bottom:10px">晚点车次数</div>
            <div class="city" style="font-size: 32px;margin-bottom:10px">60</div>
            <div class="destnation" style="font-size: 16px;margin-bottom:10px">最长晚点车次</div>
            <div class="city" style="font-size: 32px;">K233</div>
        </div>
      </div>
      <div class="zaixiantiyan" id="tiyan">查询景区流量趋势</div>
      <!-- <div class="subtitle">查询景区流量趋势</div> -->
      <div class="search_container">
        <Form :model="formItem" :label-width="60" ref="formItem" :rules="ruleValidate" inline>
          <Row>
            <i-col span="8">
              <FormItem label="省份" prop="province">
                <Select v-model="formItem.province" placeholder="请选择" style="width:250px" @on-change="selectProvice">
                  <Option v-for="item in provinceList" :value="item" :key="item">{{item}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="城市" prop="city">
                <Select v-model="formItem.city" placeholder="请选择" style="width:250px" @on-change="selectCity">
                  <Option v-for="item in cityList" :value="item" :key="item">{{item}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="日期" prop="date">
                <DatePicker
                  style="width: 250px"
                  format="yyyy-MM-dd"
                  :start-date="new Date(2020, 1, 1)"
                  v-model="formItem.date"
                  type="daterange"
                  placement="bottom-end"
                  placeholder="选择日期"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="区域" prop="area">
                <Select v-model="formItem.area" placeholder="请选择" style="width:250px">
                  <Option v-for="item in areaList" :value="item" :key="item">{{item}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="粒度" prop="lidu">
                <Select v-model="formItem.lidu" placeholder="请选择" style="width:250px">
                  <Option value="hour">1小时</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </Form>
        <div style="text-align:center;margin-top:20px">
          <i-button type="success" @click="queryData">查看数据</i-button>
        </div>
      </div>
      <div class="zaixiantiyan travelInsi">即刻获得旅游洞察能力</div>
      <div class="zixun">快速与我们取得联系，请点击下方的合作咨询</div>
      <div style="text-align:center;margin-bottom:80px">
        <i-button type="success" @click="jump1()">合作咨询</i-button>
      </div>
      <Modal v-model="visible" :footer-hide="true"  @on-cancel="cancle" class-name="vertical-center-modal" width="1200">
        <div class="echart-line" id="echart-line" v-if="visible">
        </div>
      </Modal>
      <!-- <vFoodInsightDetail v-show="ifShowFoodDetail" @closeDetailWindow='closeThisDetail'></vFoodInsightDetail> -->
    </div>
    <!-- <vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin> -->
  </div>
</template>

<script>
import vFoodInsightDetail from "./foodInsightDetail";
import Banner from "../common/banner";
import $echarts from 'echarts';
// import vLogin from "@/components/login/login";
import 'echarts/map/js/china.js';
export default {
  data() {
    return {
      baseURL: window.config.url+"",
      myLineChart:null,
      visible: false,
      listData: {
        legend:null,
        category:null,
        value:[],
      }, 
      formItem: {
        province: "北京市",
        city: "全部",
        area: "北京欢乐谷",
        date: ['2020-2-1','2020-2-2'],
        lidu: "hour"
      },
      provinceList:[],
      cityList:[],
      areaList:[],
      banner: {
        url: require("../../assets/images/travel/lvyou.png"),
        title: "旅游洞察",
        intro: "旅游需求为核心，提供多渠道、全方位、个性化、精细化的数据",
        btn: {
          btn1: { path: "#tiyan", query: "2", text: "功能体验" },
          btn2: { path: "", query: "", text: "立即使用" },
          btn3: { path: "/document", query: "2", id: "4", text: "接口文档" }
        }
      },
      funList: [
        {
          oneIcon:  require('@/assets/images/new_index/icon/keshihua.png'),
          title: "掌握过去数据",
          desc: "掌控海量历史数据，对景区历史数据分析有备无患"
        },
        {
          oneIcon:  require('@/assets/images/new_index/icon/jiqi.png'),
          title: "为现在做决定",
          desc: "基于大数据统计分析，快速帮助业务建立分析决策"
        },
        {
          oneIcon:  require('@/assets/images/new_index/icon/neirong.png'),
          title: "未来趋势判断",
          desc: "通过对大数据的人工智能分析，更加科学的预测未来"
        }
      ],
      ruleValidate: {
        province: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        city: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        area: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        lidu: [{ required: true, message: "内容不能为空", trigger: "change" }],
        area: [{ required: true, message: "内容不能为空", trigger: "change" }],
        date: [{
            type: 'array',
            required: true,
            fields: {
                0: {type: 'date', required: true, message: '请选择起止日期'},
                1: {type: 'date', required: true, message: '请选择起止日期'}
            }
        }],
      }
    };
  },
  created() {
    this.getProvince();
    this.getCity(this.formItem.province)
    this.getSpot(this.formItem.city)
    // this.selectProvice(this.formItem.province)
    // this.selectCity(this.formItem.city)
  },
  mounted() {
    this.initEchart();
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
    selectProvice(val){
      this.formItem.province=val;
      this.getCity(val);
      this.areaList=[];
      this.formItem.area='';
    },
    selectCity(val){
     this.formItem.city=val;
     this.getSpot(val);
    },
    getSpot(val){
       this.$axios({
        method: "get",
        url: window.config.url+"/insight/travel/getSpot",
        params: {
          city: val,
        }
      }).then(res => {
          if (res.status == 200) {
            this.areaList=res.data.data;
          }
      }).catch(err => {

      });
    },
    getCity(val){
       this.$axios({
        method: "get",
        url: window.config.url+"/insight/travel/getCity",
        params: {
          province:  val,
        }
      }).then(res => {
          if (res.status == 200) {
            this.cityList=res.data.data;
          }
      }).catch(err => {

      });
    },
    getProvince(){
       this.$axios({
        method: "get",
        url: window.config.url+"/insight/travel/getProvince",
        // params: {
        //   spot: this.formItem.area,
        //   startDate: this.$dateUtil.formatTime(this.formItem.date[0],"yy-mm-dd"),
        //   endDate: this.$dateUtil.formatTime(this.formItem.date[1], "yy-mm-dd")
        // }
      }).then(res => {
          if (res.status == 200) {
            this.provinceList=res.data.data;
          }
      }).catch(err => {

      });
    },
    cancle () {
         this.visible = false;
    },
    queryData() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          this.visible = true;
          this.initData();
        }
      });
    },
    initData() {
      this.$axios({
        method: "get",
        url: window.config.url+"/insight/travel/get",
        params: {
          spot: this.formItem.area,
          startDate: this.$dateUtil.formatTime(this.formItem.date[0],"yy-mm-dd"),
          endDate: this.$dateUtil.formatTime(this.formItem.date[1], "yy-mm-dd")
        }
      })
        .then(res => {
          if (res.status == 200) {
             
              let legend=[];
              let category=[];
              let series={};
              let dataArr=[];
              let result=res.data.data;
               
               let item=result[0];
                for(let key in item){
                    if(key=="zero"){
                    category.push("00:00:00");
                    series[key]=[];
                    }
                    else if(key=="one"){
                    category.push("01:00:00");
                    series[key]=[];
                    }
                    else if(key=="two"){
                    category.push("02:00:00");
                    series[key]=[];
                    }
                    else if(key=="three"){
                    category.push("03:00:00");
                    series[key]=[];
                    }
                    else if(key=="four"){
                    category.push("04:00:00");
                    series[key]=[];
                    }
                    else if(key=="five"){
                    category.push("05:00:00");
                    series[key]=[];
                    }
                    else if(key=="six"){
                    category.push("06:00:00");
                    series[key]=[];
                    }
                    else if(key=="seven"){
                    category.push("07:00:00");
                    series[key]=[];
                    }
                    else if(key=="eight"){
                    category.push("08:00:00");
                    series[key]=[];
                    }
                    else if(key=="nine"){
                    category.push("09:00:00");
                    series[key]=[];
                    }
                    else if(key=="ten"){
                    category.push("10:00:00");
                    series[key]=[];
                    }
                    else if(key=="eleven"){
                    category.push("11:00:00");
                    series[key]=[];
                    }
                    else if(key=="twelve"){
                    category.push("12:00:00");
                    series[key]=[];
                    }
                    else if(key=="thirteen"){
                    category.push("13:00:00");
                    series[key]=[];
                    }
                    else if(key=="fourteen"){
                    category.push("14:00:00");
                    series[key]=[];
                    }
                    else if(key=="fifteen"){
                    category.push("15:00:00");
                    series[key]=[];
                    }
                    else if(key=="sixteen"){
                    category.push("16:00:00");
                    series[key]=[];
                    }
                    else if(key=="seventeen"){
                    category.push("17:00:00");
                    series[key]=[];
                    }
                    else if(key=="eighteen"){
                    category.push("18:00:00");
                    series[key]=[];
                    }
                    else if(key=="nineteen"){
                    category.push("19:00:00");
                    series[key]=[];
                    }
                    else if(key=="twenty"){
                    category.push("20:00:00");
                    series[key]=[];
                    }
                    else if(key=="twentyOne"){
                    category.push("21:00:00");
                    series[key]=[];
                    }
                    else if(key=="twentyTwo"){
                    category.push("22:00:00");
                    series[key]=[];
                    }
                    else if(key=="twentyThree"){
                    category.push("23:00:00");
                    series[key]=[];
                    }
                }
                result.forEach(item=>{
                    legend.push(item.trafficDate.split(' ')[0]);
                })
                result.forEach(item1=>{
                    let item=item1.trafficDate.split(' ')[0];
                    series[item]=[
                        item1["zero"],item1["one"],item1["two"],item1["three"],item1["four"],item1["five"],
                        item1["six"],item1["seven"],item1["eight"],item1["nine"],item1["ten"],item1["eleven"],
                        item1["twelve"],item1["thirteen"],item1["fourteen"],item1["fifteen"],item1["sixteen"],item1["seventeen"],
                        item1["eighteen"],item1["nineteen"],item1["twenty"],item1["twentyOne"],item1["twentyTwo"],item1["twentyThree"],
                    ]
                })
              legend.forEach(item=>{
                 dataArr.push({
                    data: series[item],
                    type: "line",
                    smooth: true,
                    name:item
                 })
             })
             this.listData.value=dataArr;
             this.listData.legend=legend;
             this.listData.category=category;
             this.initLineData();
          }
        })
        .catch(err => {
        });
    },
    initLineData(){
        //if(!this.myLineChart){
            this.myLineChart = $echarts.init(document.getElementById("echart-line"));
        //}
        let option = {
                title: {
                  text: this.formItem.province + " " +this.formItem.city+ " " +this.formItem.area,
                  textStyle: {
                                color: '#000',
                                fontSize:22,

                  },
                  x: "center",
                  top: 10
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: this.listData.legend,
                    top: 80,
                    type:'scroll',
                },
                grid:{
                    left: 40,
                    right: 40,
                    top:150,
                    bottom:20,
                },
                xAxis: {
                    name:"时间",
                    type: 'category',
                    boundaryGap: false,
                    data: this.listData.category,
                    axisLine: {
                        symbol: ["none", "arrow"],
                        symbolSize: [5, 5]
                    }
                },
                yAxis:  {
                    name:"指数",
                    type: 'value',
                    axisLine: {
                        symbol: ["none", "arrow"],
                        symbolSize: [5, 5]
                    }
                },
                series: this.listData.value 
            };
            console.log(option)
             this.myLineChart.setOption(option);
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
  components: {
    vFoodInsightDetail,
    Banner
  }
};
</script>
<style scoped lang='less'>
.echart-line {
  width:1150px;
  height: 500px;
  margin:auto;
}
.travel_info_container {
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;

  .travle-box {
    width: 1200px;
    margin: auto;
    .zaixiantiyan {
      margin-top: 80px;
      margin-bottom: 30px;
      font-size: 36px;
      color: #121c33;
      text-align: center;
    }
    .travelInsi{
      margin-bottom: 0px;
    }
    .zixun{
        color: #7A8499;
        margin: 10px 0 25px 0;
        font-size: 20px;
        text-align: center;
    }
    .zaixiantiyan1 {
      margin-top: 80px;
      margin-bottom: 10px;
      font-size: 36px;
      color: #121c33;
      text-align: center;
    }
    .subMsg{
      font-size: 22px;
      color: #121c33;
      text-align: center;
      margin-bottom: 15px;
    }
    .subtitle {
      font-size: 22px;
      color: #121c33;
      margin-bottom: 20px;
    }
    .search_container {
      width: 1200px;
      margin: auto;
    }
    .fnIntro_container {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 80px;
      .one {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .left {
          width: 80px;
          display: flex;
          align-items: center;
          margin-right: 15px;
          img {
            width: 100%;
            display: block;
          }
        }
        .right {
          flex: 1;
          padding-right: 40px;
          .title {
            font-size: 18px;
            color: #121c33;
            margin-bottom: 11px;
          }
          .desc {
            font-size: 14px;
            color: #7a8499;
            line-height: 22px;
          }
        }
      }
    }
    .echarts_container {
      width: 1200px;
      background: #080920;
      // height: 569px;
      display: flex;
      padding: 15px;
      .left {
        width: 250px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      .center {
        flex: 1;
      }
      .right {
        width: 250px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
    }
    .use_now {
      width: 140px;
      height: 42px;
      background: #03a971;
      border-radius: 3px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      line-height: 42px;
      margin-bottom: 80px;
    }
  }
}
</style>
<style lang='less'>
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>
