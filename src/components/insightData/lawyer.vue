<template>
  <div>
    <!--内容区域-->
    <div class="insight_data_container">
      <div class="drop_down_menu_container">
        <div class="drop_down_menu">
          <div class="left" @click="$router.go(-1)">
            <span>法律综合分析</span>
            <span>> 律师</span>
          </div>
          <div class="right">
            <div class="address">
              <Dropdown>
                <a href="javascript:void(0)">
                  {{city}}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>全国</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="in_type">
              <Dropdown trigger="click" @on-click="changeConent">
                <a href="javascript:void(0)">
                  {{menuText}}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <!-- <DropdownItem name="loupan">案件</DropdownItem> -->
                  <DropdownItem name="lawyer">律师</DropdownItem>
                  <!-- <DropdownItem name="wuye">当事人</DropdownItem> -->
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
                  v-for="(item, index) in lawyerList"
                  :value="item.id"
                  :key="index"
                   @click.native="getMoreParams(item)" 
                >{{item.fullName}} {{item.firmName}}</Option>
              </Select>
              <Button  type="success" icon="ios-search" @click="search" style="margin-left:10px"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lawyer_container">
      <div class="lawyer_analysis_report">律师分析报告</div>
      <div class="basic_info_top">基本信息</div>
      <div style="height:1px;background: #EBECF0;width:1200px;margin:auto;"></div>
      <div class="basic_info_content">
           <span>律师姓名：</span><span>{{lawName}}</span>
           <span style="margin-left:50px">律所：</span><span >{{firmName}}</span>
           <span style="margin-left:50px">代理案件总数：</span><span >{{count}}</span>
              <!-- <div class="view_details" @click="viewCaseDetail">点击查看案件详情</div> -->
      </div>
      <div class="reason_eacharts_container">
          <div class="title_case_reason_map">案由分布</div>
          <div class="reason_map" id="reason_map"></div>
        </div>
      <div class="lawyer_anly_report_eacharts_container">
        <div class="lawyer_case_type_container">
          <div class="lawyer_case_type_title">案件类型分布</div>
          <div class="lawyer_case_type" id="lawyer_case_type"></div>
        </div>
        <div class="lawyer_court_level_container">
          <div class="lawyer_court_level_title">法院层级分布</div>
          <div class="lawyer_court_level" id="lawyer_court_level"></div>
        </div>
        <div class="lawyer_case_time_container">
          <div class="lawyer_case_time_title">案件时间分布</div>
          <div class="lawyer_case_time" id="lawyer_case_time"></div>
        </div>
        <div class="case_area_container">
          <div class="case_area_title">案件地区分布</div>
          <div class="case_area" id="case_area"></div>
        </div>
        <div class="customer_Type_container">
          <div class="customer_Type_title">客户类型分布</div>
          <div class="customer_Type" id="customer_Type"></div>
        </div>
        <div class="litigation_stage_container">
          <div class="litigation_stage_title">诉讼阶段分布</div>
          <div class="litigation_stage" id="litigation_stage"></div>
        </div>
        <div class="success_rate_container">
          <div class="success_rate_title">判决胜诉率</div>
          <div class="success_rate" id="success_rate"></div>
        </div>
        <div class="panjuebiao_fenbu_container">
          <div class="panjuebiao_fenbu_title">判决标的额分布</div>
          <div class="panjuebiao_fenbu" id="panjuebiao_fenbu"></div>
        </div>
      </div>
      <vPopwindow v-show="ifShowPopwindow" @close="closeWindow" :caseDetailArr="detailData"></vPopwindow>
    </div>
  </div>
</template>

<script>
import vPopwindow from "./caseDetail";
export default {
  data() {
    return {
      count:'',
      lawyerInfo:null,
      firmName:'',
      lawName:"",
      keyword: "",
      paramCode:'',
      baseUrl: window.config.url+"",
      searchLoading: false,
      lawyerList: [],
      city: "全国",
      menuText: "律师",
      head_picture: require("../../assets/images/insightData/head_picture.png"),
      ifShowPopwindow: false,
      detailData: [
        {
          caseNum: "(2020)鄂XX民初XX号",
          caseDate: "2020-02-23",
          caseParties: "110234199403243763 王女士",
          caseProgress: "已立案待排期",
          caseReason: "买卖合同纠纷"
        },
        {
          caseNum: "(2020)鄂XX民初XX号",
          caseDate: "2020-02-23",
          caseParties: "110234199403243763 王女士",
          caseProgress: "已立案待排期",
          caseReason: "买卖合同纠纷"
        },
        {
          caseNum: "(2020)鄂XX民初XX号",
          caseDate: "2020-02-23",
          caseParties: "110234199403243763 王女士",
          caseProgress: "已立案待排期",
          caseReason: "买卖合同纠纷"
        }
      ]
    };
  },
  created(){
      this.paramCode=this.$route.query.id;
      this.lawName=this.$route.query.lawName;
      this.firmName=this.$route.query.firmName;
      this.count=this.$route.query.count;
      console.log(this.paramCode)
  },
  methods: {
    changeConent(){},
    remoteMethod(query) {
      this.searchLoading = true;
      setTimeout(() => {
        if (query !== "") {
          this.$axios({
            method: "get",
            url: this.baseUrl + "/insight/lawQuery/lawyer_search",
            params: {
              keyword: query,
              pageNo: 1,
              pageSize: 20
            }
          })
            .then(res => {
              if (res.status == 200) {
                this.searchLoading = false;
                this.lawyerList = res.data.data.map.list;
              }
            })
            .catch(err => {
              this.searchLoading = false;
              this.lawyerList = [];
            });
        } else {
          this.lawyerList = [];
        }
      }, 500);
    },
    search() {
       this.getEchartData();
    },
    getMoreParams(item){
      this.lawyerInfo=item;
      this.paramCode=this.keyword;
      this.lawName=this.lawyerInfo.fullName,
      this.firmName=this.lawyerInfo.firmName;
      this.count=this.lawyerInfo.mount;
      this.getEchartData();
      console.log(item)
    },
    viewCaseDetail() {
      this.ifShowPopwindow = true;
    },
    closeWindow(arg) {
      this.ifShowPopwindow = arg;
    },
    getEchartData() {
      var echarts = require("echarts");
      //上边中间   中国地图
      let baseUrl = window.config.url+"";
      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/lawyer_case_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          if (res.status == 200) {
            //案由分布
            var reasonMapChart = echarts.init(
              document.getElementById("reason_map")
            );
            var reason_map_option = {
              tooltip: {
                trigger: "item",
                formatter: "{b}: {c}({d}%)"
              },
              legend: {
                bottom: 10,
                data: [
                ]
              },
              series: [
                {
                  type: "pie",
                  selectedMode: "single",
                  radius: [0, "30%"],
                  label: {
                     show:false,
                    position: "inner"
                  },
                  labelLine: {
                    show: false
                  }
                },
                {
                  type: "pie",
                  radius: ["40%", "55%"],
                  label: {
                    show:false,
                    formatter: "{b|{b}:}{c}  {per|{d}%}",
                    rich: {
                      b: {
                        fontSize: 16,
                        lineHeight: 33
                      }
                    }
                  },
                  data: res.data.data.map.list
                }
              ]
            };
            reasonMapChart.setOption(reason_map_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_caseArea_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          console.log(res.data.data);
          if (res.status == 200) {
            //案件地区分布
            var caseAreaChart = echarts.init(
              document.getElementById("case_area")
            );
            var case_area_option = {
              color: ["#6699FF"],
              xAxis: {
                type: "category",
                data: res.data.data.map.name,
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
                  data: res.data.data.map.value,
                  type: "bar"
                }
              ]
            };
            caseAreaChart.setOption(case_area_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_caseTime_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          console.log(res.data.data);
          if (res.status == 200) {
            //案件时间分布
            var lawyerCaseTimeChart = echarts.init(
              document.getElementById("lawyer_case_time")
            );
            var lawyer_case_time_option = {
              color: ["#6699FF"],
              xAxis: {
                type: "category",
                data: res.data.data.map.name,
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
                  data: res.data.data.map.value,
                  type: "bar"
                }
              ]
            };
            lawyerCaseTimeChart.setOption(lawyer_case_time_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/lawyer_caseType_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          console.log(res.data.data);
          if (res.status == 200) {
            //案件类型分布
            var lawyerCaseChart = echarts.init(
              document.getElementById("lawyer_case_type")
            );
            var lawyer_case_option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}:{c}({d}%)"
              },
              series: [
                {
                  name: "类型",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: res.data.data.map.list,
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
            lawyerCaseChart.setOption(lawyer_case_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_courtLevel_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          console.log(res.data.data);
          if (res.status == 200) {
            //法院层级分布 lawyer_court_level
            var lawyerCourtChart = echarts.init(
              document.getElementById("lawyer_court_level")
            );
            var lawyer_court_level_option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}:{c}({d}%)"
              },
              series: [
                {
                  name: "法院",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: res.data.data.map.list,
                  label: {
                    normal: { position: "inner", formatter: "{b}\n {c} ({d}%)" }
                  },
                  labelLine: { normal: { show: false } },
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
            lawyerCourtChart.setOption(lawyer_court_level_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_sentence_money?paramCode="+this.paramCode,
      })
        .then(res => {
          console.log(res.data.data);
          if (res.status == 200) {
            var topCenterData = res.data.data.map.name;
            var cockpitDatatList = res.data.data.map.value;
            var mapData = [];
            for (var i = 0; i < topCenterData.length; i++) {
              for (var j = 0; j < cockpitDatatList.length; j++) {
                if (i == j) {
                  mapData.push({
                    name: topCenterData[i].replace(/\s*/g, ""),
                    value: parseInt(cockpitDatatList[i])
                  });
                }
              }
            }
            //判决标的额分布
            var panjueBiaoChart = echarts.init(
              document.getElementById("panjuebiao_fenbu")
            );
            var panjuebiao_fenbu_option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              // legend: {
              //     orient: 'vertical',
              //     left: 10,
              //     data: res.data.data.map.name,
              // },
              series: [
                {
                  name: "判决标的额",
                  type: "pie",
                  radius: ["50%", "70%"],
                  data: mapData
                }
              ]
            };
            panjueBiaoChart.setOption(panjuebiao_fenbu_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_sentence_rate?paramCode="+this.paramCode,
      })
        .then(res => {
          if (res.status == 200) {
            //判决胜诉率
            var successRateChart = echarts.init(
              document.getElementById("success_rate")
            );
            var success_rate_option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}:{c}({d}%)"
              },
              series: [
                {
                  name: "胜诉率",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: res.data.data.map.list,
                  label: {
                    normal: { position: "inner", formatter: "{b}\n {c} ({d}%)" }
                  },
                  labelLine: { normal: { show: false } },
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
            successRateChart.setOption(success_rate_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_litigationStep_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          if (res.status == 200) {
            //诉讼阶段分布
            var litigationStageChart = echarts.init(
              document.getElementById("litigation_stage")
            );
            var litigation_stage_option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}:{c}({d}%)"
              },
              series: [
                {
                  name: "阶段",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: res.data.data.map.list,
                  label: {
                    normal: { position: "inner", formatter: "{b}\n {c} ({d}%)" }
                  },
                  labelLine: { normal: { show: false } },
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
            litigationStageChart.setOption(litigation_stage_option);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "get",
        url: baseUrl + "/insight/lawQuery/law_customerType_distribute?paramCode="+this.paramCode,
      })
        .then(res => {
          if (res.status == 200) {
            //客户类型分布
            var customerypeChart = echarts.init(
              document.getElementById("customer_Type")
            );
            var customer_Type_option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}:{c}({d}%)"
              },
              series: [
                {
                  name: "客户类型",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: res.data.data.map.list,
                  label: {
                    normal: { position: "inner", formatter: "{b}\n {c} ({d}%)" }
                  },
                  labelLine: { normal: { show: false } },
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
            customerypeChart.setOption(customer_Type_option);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getEchartData();
  },
  components: {
    vPopwindow
  }
};
</script>

<style scoped lang='less'>
.lawyer_container {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0;
  box-sizing: border-box;
  .lawyer_analysis_report {
    width: 1200px;
    font-size: 36px;
    color: #121c33;
    text-align: center;
    margin-bottom: 40px;
  }
  .basic_info_top {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    color: #121c33;
  }
  .basic_info_content{
    width: 1200px;
    margin:auto;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #121C33;
  }
  .reason_eacharts_container {
      width: 1200px;
      margin:auto;
      border: 1px solid #EBECF0;
      margin-bottom:30px;
      .title_case_reason_map {
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
      .reason_map {
        width: 100%;
        height: 280px;
      }
    }
  .basic_info_bottom {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 41px;
    box-sizing: border-box;
    margin-bottom: 60.6px;
    .left {
      width: 536px;
      height: 100%;
      display: flex;
      align-items: center;
      .head_picture {
        width: 277px;
        height: 345px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    
  }
  .lawyer_anly_report_eacharts_container {
    width: 1200px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 80px;
    .lawyer_case_type_container,
    .lawyer_court_level_container,
    .lawyer_case_time_container,
    .case_area_container,
    .customer_Type_container,
    .litigation_stage_container,
    .success_rate_container,
    .panjuebiao_fenbu_container {
      width: 568px;
      height: 340px;
      margin-right: 30px;
      margin-bottom: 30px;
      border: 1px solid #ebecf0;
      .lawyer_case_type_title,
      .lawyer_court_level_title,
      .lawyer_case_time_title,
      .case_area_title,
      .customer_Type_title,
      .litigation_stage_title,
      .success_rate_title,
      .panjuebiao_fenbu_title {
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
      .lawyer_case_type,
      .lawyer_court_level,
      .lawyer_case_time,
      .case_area,
      .customer_Type,
      .litigation_stage,
      .success_rate,
      .panjuebiao_fenbu {
        width: 100%;
        height: 280px;
      }
    }
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
      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 50%;
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
        .search {
          display: flex;
          align-items: center;
          input {
            width: 331px;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
            ::placeholder {
              font-size: 14px;
              color: #b8becc;
              letter-spacing: 0;
            }
            :-moz-placeholder {
              font-size: 14px;
              color: #b8becc;
              letter-spacing: 0;
            }
            :-ms-input-placeholder {
              font-size: 14px;
              color: #b8becc;
              letter-spacing: 0;
            }
            ::-moz-placeholder {
              font-size: 14px;
              color: #b8becc;
              letter-spacing: 0;
            }
            ::-webkit-input-placeholder {
              font-size: 14px;
              color: #b8becc;
              letter-spacing: 0;
            }
          }
        }
      }
    }
  }
}
</style>