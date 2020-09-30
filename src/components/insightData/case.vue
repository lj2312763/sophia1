<template>
  <div class="case_container">
     
      <div class="case_analysis_report">全国案件分布</div>
      <div class="map_statistics" id="map"></div>
      <div class="total_num">
          <div class="case_total_num">
              <div>累计案件总数</div>
              <div class="case_num_container">
                  <div class="case_num">{{totalNum}}</div>
              </div>
          </div>
          <div class="first_instance_num">
              <div>一审案件总数</div>
              <div class="case_num_container">
                  <div class="case_num">{{firstInstanceNum}}</div>
              </div>
          </div>
          <div class="two_instance_num">
              <div>二审案件总数</div>
              <div class="case_num_container">
                  <div class="case_num">{{twoInstanceNum}}</div>
              </div>
          </div>
          <div class="three_instance_num">
              <div>三审案件总数</div>
              <div class="case_num_container">
                  <div class="case_num">{{threeInstanceNum}}</div>
              </div>
          </div>
      </div>
      <div class="case_echarts_container">
          <div class="top_ten_container">
              <div class="top_ten_title">TOP10案件分布</div>
              <div class="top_ten" id="top_ten"></div>
          </div>
          <div class="case_time_container">
              <div class="case_time_title">案件时间分布</div>
              <div class="case_time" id="case_time"></div>
          </div>
          <div class="case_reason_type_container">
              <div class="case_reason_type_title">总体案由分类</div>
              <div class="case_reason_type" id="case_reason_type"></div>
          </div>
          <div class="court_level_container">
              <div class="court_level_title">法院层级分布</div>
              <div class="court_level" id="court_level"></div>
          </div>
      </div>
  </div>
</template>

<script>
import Banner from "../common/banner"
export default {
    components:{
        Banner
    },
  data () {
    return {
        totalNum:88487922,
        firstInstanceNum:61440778,
        twoInstanceNum:24598610,
        threeInstanceNum:2448534,
    }
  },
  methods:{
      getEchartData(){
          var echarts = require('echarts');
           //上边中间   中国地图
           let baseUrl=window.config.url+'';
            this.$axios({
                method: "get",
                url: baseUrl + "/insight/lawQuery/client_caseArea_distribute",
            }).then(res => {
                console.log(res.data.data)
                if(res.status==200){
                    console.log(res.data)
                }
            }).catch(err=>{
                console.log(err);
            });

            
            //this.$axios({
            //     method: "get",
            //     url: baseUrl + "/insight/lawQuery/client_caseArea_distribute",
            // }).then(res => {
            //     if(res.status == 200){

                    // var topCenterData = res.data.data.map.name;
                    // var cockpitDatatList = res.data.data.map.value;
                    var mapData = [
                        {name:"北京",value:"2555615"},
                        {name:"天津",value:"1399373"},
                        {name:"河北",value:"3902240"},
                        {name:"山西",value:"1543609"},
                        
                        {name:"辽宁",value:"3007175"},
                        {name:"吉林",value:"2534321"},
                        {name:"黑龙江",value:"2233216"},
                        {name:"上海",value:"2686064"},
                        {name:"江苏",value:"5522647"},
                        {name:"浙江",value:"6775214"},
                        {name:"安徽",value:"4367067"},
                        {name:"福建",value:"3159746"},
                        {name:"江西",value:"2028033"},
                        {name:"山东",value:"6279237"},
                        {name:"河南",value:"6348401"},
                        {name:"湖北",value:"3144996"},
                        {name:"湖南",value:"3825987"},
                        {name:"广东",value:"5986639"},
                        
                        {name:"海南",value:"298263"},
                        {name:"重庆",value:"2564822"},
                        {name:"四川",value:"4737664"},
                        {name:"贵州",value:"1236897"},
                        {name:"云南",value:"2940747"},
                       
                        {name:"陕西",value:"2667066"},
                        {name:"甘肃",value:"1133276"},
                        {name:"青海",value:"363498"},
                        {name:"广西",value:"2062266"},
                         {name:"西藏",value:"63289"},
                        {name:"宁夏",value:"690915"},
                        {name:"新疆",value:"860015"},
                        {name:"内蒙古",value:"2022547"},
                        // {name:"新疆维吾尔自治区高级人民法院生产建设兵团分院",value:"137262"},
                    ];

                    
                    // for(var i = 0; i < topCenterData.length;i++){
                    //      for(var j = 0; j < cockpitDatatList.length;j++){
                    //          if(i==j){
                    //             mapData.push({
                    //                 name:topCenterData[i].replace(/\s*/g,''),
                    //                 value:parseInt(cockpitDatatList[i])
                    //             });
                    //          }
                           
                    //      }
                    // }
                     console.log(mapData)
                    var myMapChart = echarts.init(document.getElementById('map'));        
                    var mayMap_option = {
                        title: {//这里是整个图的标题
                            text: '',//大标题
                            x: 'center',//标题的位置，左边中间或者右边
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            }
                        },
                         grid: {
                            top: '0',
                            bottom: '0',
                            containLabel: true
                        },
                        tooltip: {//图例
                            trigger: 'item',
                            //文本上方的浮动小块
                            backgroundColor:'rgba(0,0,0,0.7)',//文本上方的浮动小块的颜色
                            padding:[20,20],//文字与边框之间的内边距
                            textStyle:{//文本样式设置
                                color:'#fff',//这里要注意一下，必须是标准6位，否则可能显现不出来
                                fontSize:18,//字号大小
                                lineHeight:'300px'//最后一个属性不加逗号，行高
                            },
                             formatter: function(params) {
                                if (params.data) {
                                    let str=`<p>${params.data.name}</p><p style="font-size:14px">案件数：${params.data.value}</p>`;
                                    return str;
                                }
                            }
                            
                        },
                        series: [{
                            name: '报告',
                            type: 'map',
                            mapType: 'china',
                            roam: false,//是否允许鼠标滚轮控制大小
                            label: {
                                normal:{
                                    show:true,
                                    textStyle:{
                                        color:'rgba(0,0,0,1)'
                                    }
                                },
                                emphasis: {//鼠标移入动态时显示的样式
                                    show: true,
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
                            data: mapData   // 数据
                        }]
                    };
                    myMapChart.setOption(mayMap_option);

            //     }
            // }).catch(err=>{
            //     console.log(err);
            // });
      }
  },
  mounted(){
    var echarts = require('echarts');
    this.getEchartData();
    var topTenChart = echarts.init(document.getElementById('top_ten'));
    var top_ten_option = {
        grid: {
            left: '4%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['浙江', '安徽', '福建', '山东', '河南', '湖南', '广东','四川','河北','辽宁'],
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
            data: [6775214,4367067, 3159746, 6279237, 6348401, 3825987, 5986639, 4737664,3902240,3007175],
            type: 'line',
            itemStyle : { 
                normal : { 
                    color:'#275F82', 
                    lineStyle:{ 
                        color:'#253A5D' 
                    } 
                } 
            },
        },]
    };
    topTenChart.setOption(top_ten_option);

    //案件时间分布
    var caseTimeChart = echarts.init(document.getElementById('case_time'));

    var case_time_option = {
        grid: {
            left: '4%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis'
        },
        color: ['#03A971'],
        xAxis: {
            type: 'category',
            data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018','2019','2020'],
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
            data: [97137, 193546, 218421, 411372, 1451322, 7117914, 9964799,12754382,16865258,19178241,19885409,268968],
            type: 'bar'
        }]
    };
    caseTimeChart.setOption(case_time_option);

    //总体案由分布
    var caseReasonChart = echarts.init(document.getElementById('case_reason_type'));
    var case_reason_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['刑事案由', '民事案由', '执行案由', '国家赔偿案由', '行政案由']
        },
        series: [
            {
                name: '案件理由',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 9257342, name: '刑事案由'},
                    {value: 56758877, name: '民事案由'},
                    {value: 11882085, name: '执行案由'},
                    {value: 28580, name: '国家赔偿案由'},
                    {value: 2425740, name: '行政案由'}
                ]
            }
        ]
    };
    caseReasonChart.setOption(case_reason_option);

    //法院层级分布court_level
    var courtLevelChart = echarts.init(document.getElementById('court_level'));
    var court_level_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['最高法院', '高级法院', '中级法院', '基层法院']
        },
        series: [
            {
                name: '层级',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 76296, name: '最高法院'},
                    {value: 1079089, name: '高级法院'},
                    {value: 11795764, name: '中级法院'},
                    {value: 75303326, name: '基层法院'},
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
    courtLevelChart.setOption(court_level_option);

    //案件类型分布
    // var caseTypeChart = echarts.init(document.getElementById('case_type'));
    // var case_type_option = {
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //     },
    //     series: [
    //         {
    //             name: '半径模式',
    //             type: 'pie',
    //             radius: [20, 110],
    //             center: ['25%', '50%'],
    //             roseType: 'radius',
    //             label: {
    //                 show: false
    //             },
    //             emphasis: {
    //                 label: {
    //                     show: true
    //                 }
    //             },
    //             data: [
    //                 {value: 10, name: '类型1'},
    //                 {value: 5, name: '类型2'},
    //                 {value: 15, name: '类型3'},
    //                 {value: 25, name: '类型4'},
    //                 {value: 20, name: '类型5'},
    //                 {value: 35, name: '类型6'},
    //                 {value: 30, name: '类型7'},
    //                 {value: 40, name: '类型8'}
    //             ]
    //         },
    //         {
    //             name: '面积模式',
    //             type: 'pie',
    //             radius: [30, 110],
    //             center: ['75%', '50%'],
    //             roseType: 'area',
    //             data: [
    //                 {value: 10, name: '类型1'},
    //                 {value: 5, name: '类型2'},
    //                 {value: 15, name: '类型3'},
    //                 {value: 25, name: '类型4'},
    //                 {value: 20, name: '类型5'},
    //                 {value: 35, name: '类型6'},
    //                 {value: 30, name: '类型7'},
    //                 {value: 40, name: '类型8'}
    //             ]
    //         }
    //     ]
    // };
    // caseTypeChart.setOption(case_type_option);

    //原告主体类型分布plaintiff_type
    // var plainTiffChart = echarts.init(document.getElementById('plaintiff_type'));
    // var plain_tiff_type_option = {
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //         data: ['主体类型1', '主体类型2', '主体类型3', '主体类型4', '主体类型5']
    //     },
    //     series: [
    //         {
    //             name: '主体类型',
    //             type: 'pie',
    //             radius: '55%',
    //             center: ['50%', '60%'],
    //             data: [
    //                 {value: 935, name: '主体类型1'},
    //                 {value: 1310, name: '主体类型2'},
    //                 {value: 834, name: '主体类型3'},
    //                 {value: 735, name: '主体类型4'},
    //                 {value: 500, name: '主体类型5'}
    //             ],
    //             emphasis: {
    //                 itemStyle: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                 }
    //             }
    //         }
    //     ]
    // };
    // plainTiffChart.setOption(plain_tiff_type_option);

    //案件上诉、改判、再审率
    // var caseAppealChart = echarts.init(document.getElementById('case_appeal'));
    // var case_appeal_option = {
    //     color: ['#03A971'],
    //     xAxis: {
    //         type: 'category',
    //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //         axisLine:{
    //             symbol:['none', 'arrow'],
    //             symbolSize:[5,5]
    //         }
    //     },
    //     yAxis: {
    //         type: 'value',
    //         axisLine:{
    //             symbol:['none', 'arrow'],
    //             symbolSize:[5,5]
    //         }
    //     },
    //     series: [{
    //         data: [0.1, 0.7, 0.3, 0.5, 0.34, 0.9, 0.66],
    //         type: 'bar'
    //     }]
    // };
    // caseAppealChart.setOption(case_appeal_option);
    // //二审判决结果分析
    // var analysisResultsChart = echarts.init(document.getElementById('analysis_results_second'));
    // var analysis_results_option = {
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         left: 'left',
    //         data: ['判决结果1', '判决结果2', '判决结果3', '判决结果4', '判决结果5']
    //     },
    //     series: [
    //         {
    //             name: '判决结果',
    //             type: 'pie',
    //             radius: '55%',
    //             center: ['50%', '60%'],
    //             data: [
    //                 {value: 335, name: '判决结果1'},
    //                 {value: 310, name: '判决结果2'},
    //                 {value: 234, name: '判决结果3'},
    //                 {value: 135, name: '判决结果4'},
    //                 {value: 1548, name: '判决结果5'}
    //             ],
    //             emphasis: {
    //                 itemStyle: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                 }
    //             }
    //         }
    //     ]
    // };
    // analysisResultsChart.setOption(analysis_results_option);
    // //再审案件分析
    // var retrialCaseChart = echarts.init(document.getElementById('retrial_case_analysis'));
    // var retrial_case_option = {
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b}: {c} ({d}%)'
    //     },
    //     legend: {
    //         orient: 'vertical',
    //         left: 10,
    //         data: ['理由1', '理由2', '理由3', '理由4', '理由5']
    //     },
    //     series: [
    //         {
    //             name: '再审案件',
    //             type: 'pie',
    //             radius: ['50%', '70%'],
    //             avoidLabelOverlap: false,
    //             label: {
    //                 normal: {
    //                     show: false,
    //                     position: 'center'
    //                 },
    //                 emphasis: {
    //                     show: true,
    //                     textStyle: {
    //                         fontSize: '30',
    //                         fontWeight: 'bold'
    //                     }
    //                 }
    //             },
    //             labelLine: {
    //                 normal: {
    //                     show: false
    //                 }
    //             },
    //             data: [
    //                 {value: 335, name: '理由1'},
    //                 {value: 310, name: '理由2'},
    //                 {value: 234, name: '理由3'},
    //                 {value: 135, name: '理由4'},
    //                 {value: 1548, name: '理由5'}
    //             ]
    //         }
    //     ]
    // };
    // retrialCaseChart.setOption(retrial_case_option);

    // //判决标的额分布
    // var judgmentDistributionChart = echarts.init(document.getElementById('judgment_distribution'));
    // var judgment_distribution_option = {
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //     },
    //     series: [
    //         {
    //             name: '半径模式',
    //             type: 'pie',
    //             radius: [20, 110],
    //             center: ['25%', '50%'],
    //             roseType: 'radius',
    //             label: {
    //                 show: false
    //             },
    //             emphasis: {
    //                 label: {
    //                     show: true
    //                 }
    //             },
    //             data: [
    //                 {value: 10, name: '标的额1'},
    //                 {value: 5, name: '标的额2'},
    //                 {value: 15, name: '标的额3'},
    //                 {value: 25, name: '标的额4'},
    //                 {value: 20, name: '标的额5'},
    //                 {value: 35, name: '标的额6'},
    //                 {value: 30, name: '标的额7'},
    //                 {value: 40, name: '标的额8'}
    //             ]
    //         },
    //         {
    //             name: '面积模式',
    //             type: 'pie',
    //             radius: [30, 110],
    //             center: ['75%', '50%'],
    //             roseType: 'area',
    //             data: [
    //                 {value: 10, name: '标的额1'},
    //                 {value: 5, name: '标的额2'},
    //                 {value: 15, name: '标的额3'},
    //                 {value: 25, name: '标的额4'},
    //                 {value: 20, name: '标的额5'},
    //                 {value: 35, name: '标的额6'},
    //                 {value: 30, name: '标的额7'},
    //                 {value: 40, name: '标的额8'}
    //             ]
    //         }
    //     ]
    // };
    // judgmentDistributionChart.setOption(judgment_distribution_option);

  }
}
</script>

<style scoped lang='less'>
.case_container{
    width: 1200px;
    padding: 60px 0;
    box-sizing: border-box;
    .case_analysis_report{
        width: 100%;
        text-align: center;
        font-size: 36px;
        color: #121C33;
        margin-bottom: -60px;
    }
    .map_statistics{
        width: 100%;
        height: 650px;
    }
    .total_num{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .case_total_num,.first_instance_num,.two_instance_num,.three_instance_num{
            flex:1;
            text-align: center;
            div:nth-child(1){
                font-size: 18px;
                color: #121C33;
                letter-spacing: 0.03px;
                margin-bottom: 16px;
            }
            .case_num_container{
                .case_num{
                    font-size: 20px;
                    color: #03A971;
                    letter-spacing: 1px;
                }
            }
            .increase_container{
                display: flex;
                div:nth-child(1){
                    margin-right: 50px;
                }
                div{
                    .time,.mom{
                        font-size: 14px;
                        color: #7A8499;
                        letter-spacing: 0;
                    }
                    .increase_num{
                        font-size: 18px;
                        color: #03A971;
                        letter-spacing: 0;
                    }
                    .percent{
                        font-size: 18px;
                        color: #FF3D40;
                        letter-spacing: 0;
                    }
                }
            }
        }
    }
    .case_echarts_container{
        width: 1200px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .top_ten_container,.case_time_container,.case_reason_type_container,.court_level_container,.case_type_container,.plaintiff_type_container{
            width: 568px;
            height: 340px;
            margin-right: 30px;
            margin-bottom: 30px;
            border: 1px solid #EBECF0;
            .top_ten_title,.case_time_title,.case_reason_type_title,.court_level_title,.case_type_title,.plaintiff_type_title{
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
            .top_ten,.case_time,.case_reason_type,.court_level,.case_type,.plaintiff_type{
                width: 100%;
                height: 280px;
            }
        }
    }
    .judgment_analy_report{
        width: 1200px;
        font-size: 36px;
        color: #121C33;
        text-align: center;
        margin-top: 80px;
        margin-bottom: 40px;
    }
    .court_navigation{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 43.6px;
        .court_navigation_left{
            width: 892px;
            height: 600px;
            img{
                width: 100%;
            }
        }
        .court_navigation_right{
            width: 308px;
            height: 600px;
            // background-color: #FF3D40;
            padding: 0 30px;
            box-sizing: border-box;
            .top{
                height: 70px;
                width: 100%;
                line-height: 70px;
                border-bottom: 1px solid #B8BECC;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 14.5px;
                .left{
                    font-size: 18px;
                    color: #121C33;
                    letter-spacing: 0.03px;
                }
                .right{
                    font-size: 18px;
                    color: #03A971;
                    letter-spacing: 0.03px;
                }
            }
            .bottom{
                width: 100%;
                display: flex;
                .court_left{
                    p{
                        font-size: 14px;
                        color: #3D4966;
                        letter-spacing: 0;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    .court_echarts_container{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border: 1px solid #EBECF0;
        .case_appeal_container,.analysis_results_second_container,.retrial_case_analysis_container,.judgment_distribution_container{
            width: 568px;
            height: 340px;
            margin-right: 30px;
            margin-bottom: 30px;
            .case_appeal_title,.analysis_results_second_title,.retrial_case_analysis_title,.judgment_distribution_title{
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
            .case_appeal,.analysis_results_second,.retrial_case_analysis,.judgment_distribution{
                width: 100%;
                height: 280px;
            }
        }
    }
}
</style>
