<template>
  <div class="parties_container">
      <div class="parties_analysis_report">当事人分析报告</div>
      <div class="basic_info_top">基本信息</div>
      <div class="basic_info_bottom">
          <div class="left">
              <div class="head_picture">
                  <img :src="parties_head_picture" alt="" srcset="">
              </div>
              <div class="detail_info">
                  <div>
                      <span>当事人：</span>
                      <span>王新明</span> 
                  </div>
                  <div>
                      <span>上海万科房地产有限公司</span>
                  </div>
                  <div>
                      <span>案件总数：</span>
                      <span>14</span>
                  </div>
                  <div class="view_details">点击查看案件详情</div>
              </div>
          </div>
          <div class="right">
              <div class="title_case_reason_map">案由分布</div>
              <div class="reason_map" id="reason_map"></div>
          </div>
      </div>
      <div class="parties_anly_report_eacharts_container">
          <div class="parties_case_type_container">
              <div class="parties_case_type_title">案件类型分布</div>
              <div class="parties_case_type" id="parties_case_type"></div>
          </div>
          <div class="parties_court_level_container">
              <div class="parties_court_level_title">法院层级分布</div>
              <div class="parties_court_level" id="parties_court_level"></div>
          </div>
          <div class="parties_case_time_container">
              <div class="parties_case_time_title">案件时间分布</div>
              <div class="parties_case_time" id="parties_case_time"></div>
          </div>
          <div class="parties_case_area_container">
              <div class="parties_case_area_title">案件地区分布</div>
              <div class="parties_case_area" id="parties_case_area"></div>
          </div>
          <!-- <div class="customer_Type" id="customer_Type"></div>
          <div class="litigation_stage" id="litigation_stage"></div> -->
          <div class="success_rate_container">
              <div class="success_rate_title">判决胜诉率</div>
              <div class="success_rate" id="success_rate"></div>
          </div>
          <div class="panjuebiao_fenbu_container">
              <div class="panjuebiao_fenbu_title">判决标的额分布</div>
              <div class="panjuebiao_fenbu" id="panjuebiao_fenbu"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        parties_head_picture:require('../../assets/images/insightData/parties_head_picture.png')
    }
  },
  mounted(){
    var echarts = require('echarts');
    //案由分布
    var reasonMapChart = echarts.init(document.getElementById('reason_map'));
    var reason_map_option = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}({d}%)'
    },
    legend: {
        bottom: 10,
        data: ['Behaiour1', 'Behaiour2', 'Behaiour3', 'Behaiour4', 'Behaiour5']
    },
    series: [
        {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
                position: 'inner'
            },
            labelLine: {
                show: false
            },
        },
        {
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
                formatter: '{b|{b}:}{c}  {per|{d}%}',
                rich: {
                    b: {
                        fontSize: 16,
                        lineHeight: 33
                    }
                }
            },
            data: [
                {value: 310, name: 'Behaiour1'},
                {value: 234, name: 'Behaiour2'},
                {value: 135, name: 'Behaiour3'},
                {value: 1048, name: 'Behaiour4'},
                {value: 251, name: 'Behaiour5'}
            ]
        }
    ]
    };
    reasonMapChart.setOption(reason_map_option);

    //案件类型分布
    var partiesCaseChart = echarts.init(document.getElementById('parties_case_type'));
    var parties_case_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}:{c}({d}%)'
        },
        series: [
            {
                name: '类型',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 0.13, name: '13'},
                    {value: 0.17, name: '0.17'},
                    {value: 0.4, name: '0.4'},
                    {value: 0.21, name: '0.21'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    partiesCaseChart.setOption(parties_case_option);

    //法院层级分布 parties_court_level
    var partiesCourtChart = echarts.init(document.getElementById('parties_court_level'));
    var parties_court_level_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}:{c}({d}%)'
        },
        series: [
            {
                name: '法院',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '高级人民法院'},
                    {value: 310, name: '中级人民法院'},
                    {value: 234, name: '基层人民法院'},
                    {value: 135, name: '最高人民法院'}
                ],
                label: {normal: {position: 'inner',formatter: "{b}\n {c} ({d}%)"}},labelLine: {normal: {show: false}},
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    partiesCourtChart.setOption(parties_court_level_option);

    //案件时间分布
    var partiesCaseTimeChart = echarts.init(document.getElementById('parties_case_time'));
    var parties_case_time_option = {
        color: ['#6699FF'],
        xAxis: {
            type: 'category',
            data: ['1951年', '1952年', '1956年', '1957年', '1958年', '1959年', '1960年','1961年'],
            axisLine:{
                symbol:['none', 'arrow'],
                symbolSize:[5,5]
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
                symbol:['none', 'arrow'],
                symbolSize:[5,5]
            }
        },
        series: [{
            data: [40,70,79, 150, 40, 30, 30,30],
            type: 'bar'
        }]
    };
    partiesCaseTimeChart.setOption(parties_case_time_option);

    //案件地区分布
    var caseAreaChart = echarts.init(document.getElementById('parties_case_area'));
    var parties_case_area_option = {
        color: ['#6699FF'],
        xAxis: {
            type: 'category',
            data: ['北京', '上海', '广州', '深圳', '天津', '兰州', '南京','珠江'],
            axisLine:{
                symbol:['none', 'arrow'],
                symbolSize:[5,5]
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
                symbol:['none', 'arrow'],
                symbolSize:[5,5]
            }
        },
        series: [{
            data: [40,70,79, 150, 40, 30, 30,30],
            type: 'bar'
        }]
    };
    caseAreaChart.setOption(parties_case_area_option);

    //判决胜诉率
    var successRateChart = echarts.init(document.getElementById('success_rate'));
    var success_rate_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}:{c}({d}%)'
        },
        series: [
            {
                name: '胜诉率',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 35, name: '胜诉'},
                    {value: 10, name: '部分胜诉'},
                    {value: 4, name: '败诉'}
                ],
                label: {normal: {position: 'inner',formatter: "{b}\n {c} ({d}%)"}},labelLine: {normal: {show: false}},
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    successRateChart.setOption(success_rate_option);

    //判决标的额分布
    var panjueBiaoChart = echarts.init(document.getElementById('panjuebiao_fenbu'));
    var panjuebiao_fenbu_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['判决标的额1', '判决标的额2', '判决标的额3']
        },
        series: [
            {
                name: '判决标的额',
                type: 'pie',
                radius: ['50%','70%'],
                data: [
                    {value: 335, name: '判决标的额1'},
                    {value: 310, name: '判决标的额2'},
                    {value: 234, name: '判决标的额3'}
                ]
            }
        ]
    };
    panjueBiaoChart.setOption(panjuebiao_fenbu_option);
      
  }
}
</script>

<style scoped lang='less'>
.parties_container{
    width: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 80px;
    box-sizing: border-box;
    .parties_analysis_report{
        width: 1200px;
        font-size: 36px;
        color: #121C33;
        text-align: center;
        margin-bottom: 40px;
    }
    .basic_info_top{
        width: 1200px;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #121C33;
    }
    .basic_info_bottom{
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 41px;
        box-sizing: border-box;
        margin-bottom: 60.6px;
        .left{
            width: 536px;
            height: 100%;
            display: flex;
            align-items: center;
            .head_picture{
                width: 277px;
                height: 345px;
                margin-right: 30px;
                background-color:  #EBECF0;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 206px;
                    height: 206px;
                }
            }
            .detail_info{
                div:nth-child(1),div:nth-child(2),div:nth-child(3){
                    font-size: 18px;
                    color: #121C33;
                    letter-spacing: 0;
                    line-height: 26px;
                    margin-bottom: 15px;
                }
                div:nth-child(3){
                    margin-bottom: 196px;
                }
                .view_details{
                    width: 140px;
                    height: 42px;
                    line-height: 42px;
                    text-align: center;
                    border: 1px solid #03A971;
                    border-radius: 3px;
                    font-size: 14px;
                    color: #03A971;
                }
            }
        }
        .right{
            width: 660px;
            .title_case_reason_map{
                font-size: 18px;
                color: #121C33;
                letter-spacing: 0;
                line-height: 26px;
                text-align: center;
            }
            .reason_map{
                width: 100%;
                height: 472px;
            }
        }
    }
    .parties_anly_report_eacharts_container{
        width: 1200px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 80px;
        .parties_case_type_container,.parties_court_level_container,.parties_case_time_container,.parties_case_area_container,.customer_Type_container,.litigation_stage_container,.success_rate_container,.panjuebiao_fenbu_container{
            width: 568px;
            height: 340px;
            margin-right: 30px;
            margin-bottom: 30px;
            border: 1px solid #EBECF0;
            .parties_case_type_title,.parties_court_level_title,.parties_case_time_title,.parties_case_area_title,.customer_Type_title,.litigation_stage_title,.success_rate_title,.panjuebiao_fenbu_title{
                width: 100%;
                height: 60px;
                padding-left: 25px;
                box-sizing: border-box;
                line-height: 60px;
                font-size: 16px;
                color: #3D4966;
                letter-spacing: 0;
                background-color: #F2F4F7;
            }
            .parties_case_type,.parties_court_level,.parties_case_time,.parties_case_area,.customer_Type,.litigation_stage,.success_rate,.panjuebiao_fenbu{
                width: 100%;
                height: 280px;
            }
        }
    }
}
</style>