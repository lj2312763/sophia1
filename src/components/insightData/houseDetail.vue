<template>
  <div>
    <!--内容区域-->
    <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left" @click="$router.go(-1)">
            <span>地产综合分析</span>
            <span>> 楼盘小区搜索</span>
          </div>
          <div class="right">
            <div class="address">
              <Dropdown>
                <a href="javascript:void(0)">
                  {{ city }}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>北京</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="in_type">
              <Dropdown trigger="click" @on-click="changeConent">
                <a href="javascript:void(0)">
                  {{ menuText }}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loupan">楼盘</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="search">
              <Select
                style="width:250px"
                v-model="keyword"
                filterable
                remote
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="searchLoading"
              >
                <Option
                  v-for="item in wordList"
                  :value="item.id"
                  :key="item.id"
                  @click.native="getMoreParams(item)"
                  >{{ item.name }}</Option
                >
              </Select>
              <Button
                type="success"
                icon="ios-search"
                @click="search"
                style="margin-left:10px"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <p class="title">{{ locationName }}评估报告</p>
      <div class="data-map-container" id="data-map-container"></div>
    </div>
    <div class="content">
      <p class="title">区域配套</p>
      <div class="peitao">
        <piesEcharts
          :id="listData0.id"
          :pieEchartsData="listData0.list"
        ></piesEcharts>
      </div>
    </div>
    <div class="content">
      <p class="title">社区生态</p>
      <echartList
        :listData1="listData"
        :location="location"
        :locationName="locationName"
      ></echartList>
      <echartList
        :listData1="listData1"
        :location="location"
        :locationName="locationName"
      ></echartList>
      <echartList
        :listData1="listData2"
        :location="location"
        :locationName="locationName"
      ></echartList>
      <echartList
        :listData1="listData3"
        :location="location"
        :locationName="locationName"
      ></echartList>
      <echartList
        :listData1="listData4"
        :location="location"
        :locationName="locationName"
      ></echartList>
      <echartList
        :listData1="listData5"
        :location="location"
        :locationName="locationName"
      ></echartList>
    </div>
  </div>
</template>

<script>
import echartList from "../common/echartList";
import piesEcharts from "../common/echarts/piesEcharts";
import $echarts from "echarts";
export default {
  name: "insightData",
  data() {
    return {
      locationName: "合生汇",
      infoWindow: new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -33),
        anchor: "bottom-center"
      }),
      marker: null,
      circle: null,
      location: "116.4792250000,39.8939740000",
      wordList: [],
      types: "120300",
      city: "北京",
      searchLoading: false,
      id: "data-map-container",
      AMap: null,
      menuText: "楼盘",
      keyword: "",
      QuArr: [],
      listData0: {
        id: "peitao",
        list: [
          {
            desc: "大型商场、超市、便利店、集市、家电数码、家具建材",
            name: "购物",
            value: 5
          },
          {
            desc: "大型超市、中型超市、连锁超市、小型超市",
            name: "餐饮",
            value: 5
          },
          { desc: "金融、汽车、酒店、生活", name: "服务", value: 5 },
          { desc: "娱乐、丽人、旅游、运动", name: "休闲", value: 5 }
        ]
      },
      listData: {
        title: "购物关键数据",
        gutter: 4,
        id: "shop",
        list: [
          {
            desc: "购物中心、百货商场、社区商业、休闲广场、步行街、综合商场",
            name: "大型商场（个）",
            value: 5
          },
          {
            desc: "大型超市、中型超市、连锁超市、小型超市",
            name: "超市（个）",
            value: 5
          },
          { desc: "便利店、杂货店", name: "便利店（个）", value: 5 },
          { desc: "集市", name: "集市（个）", value: 5 },
          { desc: "家电数码", name: "家电数码（个）", value: 5 },
          { desc: "家居建材", name: "家居建材（个）", value: 5 }
        ]
      },
      listData1: {
        title: "餐饮关键数据",
        gutter: 6,
        id: "canyin",
        list: [
          // { desc:'', name: "餐厅（家）", value: 5 },
          {
            desc: "川,湘,鲁,粤等地方菜,火锅,民族餐厅,野味餐厅,水产餐厅等",
            name: "中餐厅（家）",
            value: 5
          },
          {
            desc: "茶座,蛋糕甜品店,酒吧,咖啡厅,奶茶/饮品",
            name: "轻餐厅（家）",
            value: 5
          },
          { desc: "中式简餐,地方特色小吃", name: "小吃快餐厅（家）", value: 5 },
          {
            desc: "欧式菜系,日韩菜系,东南亚菜系,牛排等",
            name: "外国餐厅（家）",
            value: 5
          }
        ]
      },
      listData2: {
        title: "服务关键数据",
        gutter: 6,
        id: "service",
        list: [
          {
            desc: "ATM、典当行、投资理财信用社、银行、其他金融服务",
            name: "金融（家）",
            value: 5
          },
          {
            desc:
              "汽车检测场、汽车美容、汽车配件、汽车维修、汽车销售、汽车租赁、其他汽车服务",
            name: "汽车（家）",
            value: 5
          },
          {
            desc: "公寓式酒店、快捷酒店星级酒店、其他酒店服务",
            name: "酒店（家）",
            value: 5
          },
          {
            desc:
              "报刊亭、殡葬服务、彩票销售点、宠物服务、房产中介机构、公共厕所、公用事业、家政服务、售票处、通讯营业厅、图文快印店、维修点、物流公司、洗衣店、邮局照相馆、其他生活服务",
            name: "生活（家）",
            value: 5
          }
        ]
      },
      listData3: {
        title: "休闲关键数据",
        gutter: 6,
        id: "xiuxian",
        list: [
          {
            desc:
              "KTV、电影院、度假村、歌舞厅、剧院、农家院、网吧、洗浴按摩、休闲广场、游戏场所、其他娱乐休闲",
            name: "娱乐（家）",
            value: 5
          },
          {
            desc: "美发、美甲、美容、美体、其它丽人",
            name: "丽人（家）",
            value: 5
          },
          {
            desc:
              "博物馆、动物园、风景区、公园、海滨浴场、教堂、水族馆、文物古迹、游乐园、植物园、其他旅游休闲",
            name: "旅游（家）",
            value: 5
          },
          {
            desc:
              "博物馆、动物园、风景区、公园、海滨浴场、教堂、水族馆、文物古迹、游乐园、植物园、其他旅游休闲",
            name: "运动（家）",
            value: 5
          }
        ]
      },
      listData4: {
        title: "机构关键数据",
        gutter: 6,
        id: "jigou",
        list: [
          {
            desc:
              "成人教育、高等院校、科技馆、科研机构、留学中介机构、培训机构、亲子教育、特殊教育学校、图书馆、小学、幼儿园、中学、其他教育设施",
            name: "教育（家）",
            value: 5
          },
          {
            desc:
              "广播电视、美术馆、文化宫、新闻出版、艺术团体、展览馆、其他文化设施",
            name: "文化（家）",
            value: 5
          },
          {
            desc:
              "急救中心、疾控中心、疗养院、药店、诊所、专科医院、综合医院、体检机构、中医院、妇产科及儿童医院、社区医院、其他医疗设施",
            name: "医疗（家）",
            value: 5
          },
          {
            desc:
              "党派团体、福利机构、各级政府、公检法机构、行政单位、涉外机构、政治教育机构、其他政府设施",
            name: "政府（家）",
            value: 5
          }
        ]
      },
      listData5: {
        url: require("../../assets/images/room/jiaotongmap.png"),
        title: "交通关键数据",
        subtitle: "交通列表",
        gutter: 8,
        id: "traffic",
        trafficList: [
          { desc: "", name: "公交站", distance: 5 },
          { desc: "", name: "公交站", distance: 5 }
        ],
        list: [
          { desc: "", name: "公交站（个）", value: 5 },
          { desc: "", name: "地铁站（个）", value: 5 },
          { desc: "", name: "停车场（个）", value: 5 }
        ]
      }
    };
  },
  components: {
    echartList,
    piesEcharts
  },
  watch: {
    QuArr: {
      handler(newName, oldName) {
        this.getEchartsData();
      },
      //immediate: true,
      deep: true //
    }
  },
  mounted() {
    let _scale = new AMap.Scale(),
      _toolbar = new AMap.ToolBar({
        liteStyle: true
      });
    this.AMap = new AMap.Map(this.id, window.defaultMapOption);
    this.AMap.addControl(_scale);
    this.AMap.addControl(_toolbar);
    this.addCircle();
    this.addMarker();
    // setTimeout(() => {
    //   this.getEchartsData();
    // }, 1500);
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.listData0.list.forEach(item => {
        this.initData(item.name, item);
      });
    },
    initData(keywords, val) {
      this.$axios({
        method: "get",
        url: "https://restapi.amap.com/v3/place/around",
        params: {
          key: window.mapKey,
          location: this.location,
          radius: this.circle,
          keywords: keywords
        }
      })
        .then(res => {
          if (res.status == 200) {
            val.value = res.data.count;
          }
        })
        .catch(err => {});
    },
    changeConent() {},
    remoteMethod(query) {
      this.searchLoading = true;
      setTimeout(() => {
        if (query !== "") {
          this.$axios({
            method: "get",
            url: "https://restapi.amap.com/v3/place/text",
            params: {
              key: window.mapKey,
              keywords: query,
              types: this.types, //住宅区
              city: this.city, //查询城市
              children: 0, //当为0的时候，子POI都会显示。当为1的时候，子POI会归类到父POI之中。
              offset: 15, //每页记录数据
              page: 1
            }
          })
            .then(res => {
              console.log(res.data);
              if (res.status == 200) {
                this.searchLoading = false;
                this.wordList = res.data.pois;
              }
            })
            .catch(err => {
              this.searchLoading = false;
              this.wordList = [];
            });
        } else {
          this.lawyerList = [];
        }
      }, 500);
    },
    addCircle() {
      this.circle = new AMap.Circle({
        center: new AMap.LngLat(
          this.location.split(",")[0],
          this.location.split(",")[1]
        ), // 圆心位置
        radius: 1500, // 圆半径
        fillColor: "#1791fc", // 圆形填充颜色
        fillOpacity: 0.4,
        strokeColor: "#fff", // 描边颜色
        strokeWeight: 2 // 描边宽度
      });

      this.AMap.add(this.circle);
      this.AMap.setFitView([this.circle]);
    },
    clearCircle() {
      this.AMap.remove(this.circle);
    },
    clearMarker() {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
    },
    addMarker() {
      this.marker = new AMap.Marker({
        position: [this.location.split(",")[0], this.location.split(",")[1]],
        offset: new AMap.Pixel(-13, -30)
      });
      this.marker.content = `<p style="margin:0 15px;color:#fff">${this.locationName}<p>`;
      this.marker.setMap(this.AMap);
      this.marker.on("click", this.markerClick);
      //if(item.rsPtName == this.data.rsPtName){
      this.marker.emit("click", { target: this.marker });
      //}
    },
    markerClick(e) {
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.AMap, e.target.getPosition());
    },
    search() {
      this.initQuYu();
    },
    getMoreParams(item) {
      this.location = item.location;
      this.locationName = item.name;
      this.clearCircle();
      this.clearMarker();
      this.addMarker();
      this.addCircle();
      this.init();
    }
  }
};
</script>

<style scoped lang="less">
.content {
  width: 1200px;
  margin: auto;
  margin-bottom: 80px;
  margin-top: 60px;
  .title {
    font-size: 36px;
    color: #121c33;
    text-align: center;
    margin-bottom: 30px;
  }
  .data-map-container {
    height: 480px;
  }
  .textImg {
    height: 480px;
    img {
      width: 100%;
      display: block;
    }
  }
  .code-row-bg {
    padding: 30px;
  }
  .peitao {
    border: 1px solid #ebecf0;
    height: 400px;
  }
}

.insight_data_container {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .drop_down_menu_container {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px 0 #f2f4f7;
    .drop_down_menu {
      width: 1200px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 218px;
        span:nth-child(1) {
          font-size: 16px;
          color: #121c33;
          letter-spacing: 0;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #b8becc;
          letter-spacing: 0;
        }
      }
      .left {
        cursor: pointer;
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .address {
          margin-right: 30px;
          .ivu-dropdown {
            .ivu-dropdown-rel {
              display: flex;
              a {
                font-size: 14px;
                color: #121c33;
                letter-spacing: 0;
              }
            }
            .ivu-select-dropdown {
              .ivu-dropdown-menu {
                li:hover {
                  color: #03a971;
                }
              }
            }
          }
        }
        .in_type {
          margin-right: 30px;
          .ivu-dropdown {
            .ivu-dropdown-rel {
              display: flex;
              width: 65px;
              a {
                color: #03a971;
              }
            }
            .ivu-select-dropdown {
              .ivu-dropdown-menu {
                li:hover {
                  color: #03a971;
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
