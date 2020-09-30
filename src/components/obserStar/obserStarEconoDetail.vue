<template>
  <div class="obser_star_list_container">

    <!--图形统计区域-->
    <div class="echarts_container">
        <div class="chart">
            <div class="chart_top">{{subTitleName}}</div>
            <div class="chart_container">
              <div class="top">
                <div class="topLeft" id="topLeft"></div>
                <div class="topRight" id="topRight"></div>
              </div>
              <div class="middle">
                <div class="middleLeft">
                  <div class="middleLeft_top" id="middleLeft_top"></div>
                  <div class="middleLeft_bottom" id="middleLeft_bottom"></div>
                </div>
                <div class="middleRight" id="middleRight"></div>
              </div>
              <div class="bottom">
                <div class="bottom_left" id="bottom_left"></div>
                <div class="bottom_right" id="bottom_right"></div>
              </div>
            </div>
        </div>
    </div>


  </div>
</template>

<script>
export default {
    name:'obserStarLiveDetail',
    data(){
        return {
          subTitleName:'',
          showTrian1:false,
          showTrian2:false,
          showTrian3:false,
          showMenu:false,
          navType:3
        }
    },
    mounted(){
        this.getChartData();
    },
    methods:{
        getChartData(){
            var echarts = require('echarts');
            var baseUrl = window.config.url+''; 
            var parentTitle = this.$route.query.parentTitle;
            var subTitleCode = this.$route.query.subTitleCode;
            var that = this;
            this.subTitleName = this.$route.query.subTitleName;

            //上左柱形图
            this.$axios({
                method: "post",
                url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                data: {
                    chartLocation:1,
                    chartType:1,
                    parentTitle:parentTitle,
                    subTitleCode:subTitleCode,
                    statisticsYear:''
                }
            }).then(res => {
                if(res.status == 200){
                    var topLeftData = res.data.data;
                    var topLeftDataChart = echarts.init(document.getElementById('topLeft')); 
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    var strDara = topLeftData;
                    var topLeftTopDataArr = strDara.cockpitDatatList;
                    for(var i = 0; i < topLeftTopDataArr.length;i++){
                        xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                        xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                        xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                    }
                    var topLeft_option = {
                        title:{
                            text:topLeftData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        background:'#2D8C6A',
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis'
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    // x轴刻度的颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' // x轴坐标轴颜色
                                    }
                                },
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' //坐标轴颜色
                                    }
                                },
                                splitLine:{
                                    show:true,  //是否显示后面的网格线
                                    lineStyle:{
                                        color:'#2D8C6A'  //网格线颜色
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name:xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };;
                    topLeftDataChart.setOption(topLeft_option);
                }
            }).catch(err=>{
                console.log(err);
            });

            //上右环形饼图
            if(subTitleCode == 233165 || subTitleCode == 343212){
              this.$axios({
                  method: "post",
                  url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                  data: {
                      chartLocation:2,
                      chartType:1,
                      parentTitle:parentTitle,
                      subTitleCode:subTitleCode,
                      statisticsYear:''
                  }
              }).then(res => {
                  if(res.status == 200){
                      var topRightData = res.data.data;
                      var topRightChart = echarts.init(document.getElementById('topRight')); 
                      var xAxisDataObj = {
                          xAxisData:[],
                          data:[],
                          name:''
                      };
                      var strDara = topRightData;
                      var topRightDataArr = strDara.cockpitDatatList;
                      for(var i = 0; i < topRightDataArr.length;i++){
                          xAxisDataObj.xAxisData.push(topRightDataArr[i].statisticalIndicator);
                          xAxisDataObj.data.push(topRightDataArr[i].firstStatisticalContent);
                          xAxisDataObj.name = topRightDataArr[i].firstDescription;
                      }
                      var topRight_option = {
                          title:{
                              text:topRightData.chartName,
                              textStyle:{
                                  color:'#fff',
                                  fontSize:14
                              },
                              left:'center'
                          },
                          background:'#2D8C6A',
                          color: ['#0FA16D'],
                          tooltip: {
                              trigger: 'axis'
                          },
                          axisLabel:{
                              color:'#fff',
                              fontSize:14
                          },
                          grid: {
                              left: '3%',
                              right: '4%',
                              bottom: '3%',
                              containLabel: true
                          },
                          xAxis: [
                              {
                                  type: 'category',
                                  data: xAxisDataObj.xAxisData,
                                  axisTick: {
                                      alignWithLabel: true,
                                      lineStyle:{color:'#2D8C6A'}    // x轴刻度的颜色
                                  },
                                  axisLine:{
                                      lineStyle:{
                                          color:'#2D8C6A' // x轴坐标轴颜色
                                      }
                                  },
                              }
                          ],
                          yAxis: [
                              {
                                  type: 'value',
                                  axisTick: {
                                      alignWithLabel: true,
                                      lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
                                  },
                                  axisLine:{
                                      lineStyle:{
                                          color:'#2D8C6A' //坐标轴颜色
                                      }
                                  },
                                  splitLine:{
                                      show:true,  //是否显示后面的网格线
                                      lineStyle:{
                                          color:'#2D8C6A'  //网格线颜色
                                      }
                                  }
                              }
                          ],
                          series: [
                              {
                                  name:xAxisDataObj.name,
                                  type: 'bar',
                                  barWidth: '30%',
                                  data: xAxisDataObj.data
                              }
                          ]
                      };;
                      topRightChart.setOption(topRight_option);
                  }
              }).catch(err=>{
                  console.log(err);
              });
            }
            else{
              this.$axios({
                  method: "post",
                  url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                  data: {
                      chartLocation:2,
                      chartType:2,
                      parentTitle:parentTitle,
                      subTitleCode:subTitleCode,
                      statisticsYear:''
                  }
              }).then(res => {
                  if(res.status == 200){
                    var topRightChart = echarts.init(document.getElementById('topRight'));
                    var topLeftBottomPieData = res.data.data;
                    var cockpitDatatList = topLeftBottomPieData.cockpitDatatList;
                    var formatData = [];
                    var tipName;
                    var color = [
                    "#53B17D",
                    "#468266",
                    "#929292",
                    "#53B17D",
                    "#929292",
                    "#468266",
                    "#929292",
                    "#53B17D",
                    "#468266"
                    ];
                    for(var i = 0;i<cockpitDatatList.length;i++){
                        var pieColor;
                        if(color[i]){
                            pieColor = color[i];
                        }else{
                        if(i > 8){
                            pieColor = color[i-8];
                        }
                        }
                        formatData.push({
                            value:cockpitDatatList[i].firstStatisticalContent,
                            name:cockpitDatatList[i].statisticalIndicator,
                            itemStyle:{color:pieColor}
                        });
                    }
                    var topRight_option = {
                        background:'#2D8C6A',
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}:{c}({d}%)'
                        },
                        title:{
                            text:topLeftBottomPieData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '75%',
                                center: ['50%', '50%'],
                                data:formatData,
                                // label: {normal: {position: 'inner',formatter: "{b}\n {c} ({d}%)"}},labelLine: {normal: {show: false}},
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
                    topRightChart.setOption(topRight_option);
                  }
              }).catch(err=>{
                  console.log(err);
              });
            }

            //中间左边上边柱状图
            this.$axios({
                method: "post",
                url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                data: {
                    chartLocation:3,
                    chartType:1,
                    parentTitle:parentTitle,
                    subTitleCode:subTitleCode,
                    statisticsYear:''
                }
            }).then(res => {
                if(res.status == 200){
                    var middleLeftPopData = res.data.data;
                    var middleLeftTopChart = echarts.init(document.getElementById('middleLeft_top'));  
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    var strDara = middleLeftPopData;
                    var topLeftTopDataArr = strDara.cockpitDatatList;
                    for(var i = 0; i < topLeftTopDataArr.length;i++){
                        xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                        xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                        xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                    }
                    var middleLeftTop_option = {
                        title:{
                            text:middleLeftPopData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        background:'#2D8C6A',
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis'
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    // x轴刻度的颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' // x轴坐标轴颜色
                                    }
                                },
                                axisLabel:{
                                    interval: 0,
                                    rotate:-30,
                                    margin: 30,
                                    textStyle:{
                                        align: 'center'
                                    },
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' //坐标轴颜色
                                    }
                                },
                                splitLine:{
                                    show:true,  //是否显示后面的网格线
                                    lineStyle:{
                                        color:'#2D8C6A'  //网格线颜色
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name:xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };;
                    middleLeftTopChart.setOption(middleLeftTop_option);
                }
            }).catch(err=>{
                console.log(err);
            });

            //中间左边下面环形饼图
            if(subTitleCode == 343212 || subTitleCode == 909786 || subTitleCode == 898231){
              this.$axios({
                  method: "post",
                  url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                  data: {
                      chartLocation:6,
                      chartType:1,
                      parentTitle:parentTitle,
                      subTitleCode:subTitleCode,
                      statisticsYear:''
                  }
              }).then(res => {
                  if(res.status == 200){
                      var middleLeftBottomData = res.data.data;
                      var middleLeftChart = echarts.init(document.getElementById('middleLeft_bottom'));
                      var xAxisDataObj = {
                          xAxisData:[],
                          data:[],
                          name:''
                      };
                      var strDara = middleLeftBottomData;
                      var topLeftTopDataArr = strDara.cockpitDatatList;
                      for(var i = 0; i < topLeftTopDataArr.length;i++){
                          xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                          xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                          xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                      }
                      var middleLeft_option = {
                          title:{
                              text:middleLeftBottomData.chartName,
                              textStyle:{
                                  color:'#fff',
                                  fontSize:14
                              },
                              left:'center'
                          },
                          background:'#2D8C6A',
                          color: ['#0FA16D'],
                          tooltip: {
                              trigger: 'axis'
                          },
                          axisLabel:{
                              color:'#fff',
                              fontSize:14
                          },
                          grid: {
                              left: '3%',
                              right: '4%',
                              bottom: '3%',
                              containLabel: true
                          },
                          xAxis: [
                              {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    // x轴刻度的颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' // x轴坐标轴颜色
                                    }
                                },
                                axisLabel:{
                                    interval: 0,
                                    rotate:-30,
                                    margin: 30,
                                    textStyle:{
                                        align: 'center'
                                    },
                                }
                              }
                          ],
                          yAxis: [
                              {
                                  type: 'value',
                                  axisTick: {
                                      alignWithLabel: true,
                                      lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
                                  },
                                  axisLine:{
                                      lineStyle:{
                                          color:'#2D8C6A' //坐标轴颜色
                                      }
                                  },
                                  splitLine:{
                                      show:true,  //是否显示后面的网格线
                                      lineStyle:{
                                          color:'#2D8C6A'  //网格线颜色
                                      }
                                  }
                              }
                          ],
                          series: [
                              {
                                  name:xAxisDataObj.name,
                                  type: 'bar',
                                  barWidth: '30%',
                                  data: xAxisDataObj.data
                              }
                          ]
                      };;
                      middleLeftChart.setOption(middleLeft_option);
                  }
              }).catch(err=>{
                  console.log(err);
              });
            }
            else{
              this.$axios({
                  method: "post",
                  url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                  data: {
                      chartLocation:6,
                      chartType:2,
                      parentTitle:parentTitle,
                      subTitleCode:subTitleCode,
                      statisticsYear:''
                  }
              }).then(res => {
                  if(res.status == 200){
                      var middleLeftBottomData = res.data.data;
                      var cockpitDatatList = middleLeftBottomData.cockpitDatatList;
                      var formatData = [];
                      var color = [
                        "#53B17D",
                        "#468266",
                        "#929292",
                        "#53B17D",
                        "#929292",
                        "#468266",
                        "#929292",
                        "#53B17D",
                        "#468266"
                      ];
                      for(var i = 0;i<cockpitDatatList.length;i++){
                        var pieColor;
                        if(color[i]){
                            pieColor = color[i];
                        }else{
                            if(i > 8){
                            pieColor = color[i-8];
                            }
                        }
                        formatData.push({
                            value:cockpitDatatList[i].firstStatisticalContent,
                            name:cockpitDatatList[i].statisticalIndicator,
                            itemStyle:{color:pieColor}
                        });
                      }
                      var middleLeftChart = echarts.init(document.getElementById('middleLeft_bottom'));
                      var middleLeft_option = {
                          tooltip: {
                              trigger: 'item',
                              formatter: '{b}: {c} ({d}%)'
                          },
                          title:{
                              text:middleLeftBottomData.chartName,
                              textStyle:{
                                  color:'#fff',
                                  fontSize:14
                              },
                              left:'center'
                          },
                          series: [
                              {
                                  type: 'pie',
                                  radius: ['40%', '70%'],
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
                                  data:formatData
                              }
                          ]
                      };
                      middleLeftChart.setOption(middleLeft_option);
                  }
              }).catch(err=>{
                  console.log(err);
              });
            }

            //中间右边中国地图  
            this.$axios({
                method: "post",
                url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                data: {
                    chartLocation:4,
                    chartType:3,
                    parentTitle:parentTitle,
                    subTitleCode:subTitleCode,
                    statisticsYear:''
                }
            }).then(res => {
                if(res.status == 200){
                    var middleRightData = res.data.data;
                    var cockpitDatatList = middleRightData.cockpitDatatList;
                    var mapData = [];
                    var firstDescription;
                    for(var i = 0; i < cockpitDatatList.length;i++){
                        firstDescription = cockpitDatatList[i].firstDescription;
                        if(i == 0){
                            mapData.push({  
                                name:cockpitDatatList[i].statisticalIndicator.replace(/\s*/g,''),
                                value:Number(cockpitDatatList[i].firstStatisticalContent) +''
                            });
                        }
                        else{
                            mapData.push({
                                name:cockpitDatatList[i].statisticalIndicator.replace(/\s*/g,''),
                                value:Number(cockpitDatatList[i].firstStatisticalContent)
                            });
                        }

                    }
                    console.log(mapData + 'middleLeft_option')
                    var middleRightMapChart = echarts.init(document.getElementById('middleRight'));        
                    var middleRight_option = {
                        title: {//这里是整个图的标题
                            text: middleRightData.chartName,//大标题
                            x: 'center',//标题的位置，左边中间或者右边
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            }
                        },
                        tooltip: {//图例
                            trigger: 'item',
                            //文本上方的浮动小块
                            backgroundColor:'rgba(255,255,255,0.7)',//文本上方的浮动小块的颜色
                            padding:[20,20],//文字与边框之间的内边距
                            textStyle:{//文本样式设置
                                color:'#00000',//这里要注意一下，必须是标准6位，否则可能显现不出来
                                fontSize:18,//字号大小
                                lineHeight:'300px'//最后一个属性不加逗号，行高
                            }
                            
                        },
                        series: [{
                            name:firstDescription,
                            type: 'map',
                            mapType: 'china',
                            roam: true,//是否允许鼠标滚轮控制大小
                            label: {
                                normal:{
                                    show:true,
                                    textStyle:{
                                        color:'rgba(255,255,255,0.3)'
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
                                    borderWidth: .5, //区域边框宽度
                                    borderColor: 'rgba(255,255,255,0.3)',//区域边框颜色
                                    areaColor: "rgba(3,169,113,0.3)", //区域颜色
                                },
                                emphasis: {
                                    borderWidth: .5,
                                    borderColor: '#4b0082',
                                    areaColor: "#2D8C6A",
                                }
                            },
                            data:mapData   // 数据
                        }]
                    };
                    middleRightMapChart.setOption(middleRight_option);

                }
            }).catch(err=>{
                console.log(err);
            });

            //下左柱状图
            this.$axios({
                method: "post",
                url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                data: {
                    chartLocation:5,
                    chartType:1,
                    parentTitle:parentTitle,
                    subTitleCode:subTitleCode,
                    statisticsYear:''
                }
            }).then(res => {
                if(res.status == 200){
                    var bottomLeftData = res.data.data;
                    var bottomLeftChart = echarts.init(document.getElementById('bottom_left')); 
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    var strDara = bottomLeftData;
                    var topLeftTopDataArr = strDara.cockpitDatatList;
                    for(var i = 0; i < topLeftTopDataArr.length;i++){
                        xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                        xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                        xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                    }
                    var bottomLeft_option = {
                        title:{
                            text:bottomLeftData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        background:'#2D8C6A',
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis'
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    // x轴刻度的颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' // x轴坐标轴颜色
                                    }
                                },
                                axisLabel:{
                                    interval: 0,
                                    rotate:-30,
                                    margin: 30,
                                    textStyle:{
                                        align: 'center'
                                    },
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' //坐标轴颜色
                                    }
                                },
                                splitLine:{
                                    show:true,  //是否显示后面的网格线
                                    lineStyle:{
                                        color:'#2D8C6A'  //网格线颜色
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name:xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };;
                    bottomLeftChart.setOption(bottomLeft_option);
                }
            }).catch(err=>{
                console.log(err);
            });

            //下右柱状图
            this.$axios({
                method: "post",
                url: baseUrl + "/stargaze/stargazaCockpit/getCockpitData",
                data: {
                    chartLocation:7,
                    chartType:1,
                    parentTitle:parentTitle,
                    subTitleCode:subTitleCode,
                    statisticsYear:''
                }
            }).then(res => {
                if(res.status == 200){
                    var bottomRightData = res.data.data;
                    var bottomRightChart = echarts.init(document.getElementById('bottom_right')); 
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    var strDara = bottomRightData;
                    var topLeftTopDataArr = strDara.cockpitDatatList;
                    for(var i = 0; i < topLeftTopDataArr.length;i++){
                        xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                        xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                        xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                    }
                    var bottomRight_option = {
                        title:{
                            text:bottomRightData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        background:'#2D8C6A',
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis'
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    // x轴刻度的颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' // x轴坐标轴颜色
                                    }
                                },
                                axisLabel:{
                                    interval: 0,
                                    rotate:-30,
                                    margin: 30,
                                    textStyle:{
                                        align: 'center'
                                    },
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#2D8C6A' //坐标轴颜色
                                    }
                                },
                                splitLine:{
                                    show:true,  //是否显示后面的网格线
                                    lineStyle:{
                                        color:'#2D8C6A'  //网格线颜色
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name:xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };
                    bottomRightChart.setOption(bottomRight_option);
                }
            }).catch(err=>{
                console.log(err);
            });
        },
    }
}
</script>

<style scoped lang='less'>
.echarts_container{
    width: 100%;
    background-image: url('../../assets/images/obserStar/chart_bg_img.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .chart{
        width: 1200px;
        padding: 80px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        .chart_top{
            font-size: 28px;
            color: #fff;
            text-align: center;
            margin-bottom: 48px;
        }
        .chart_container{
            width: 100%;
            .top{
              width: 100%;
              height: 264px;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              .topLeft{
                width: 590px;
                height: 100%;
                margin-right: 19px;
                border:rgba(3,169,113,0.3) 1px solid;
              }
              .topRight{
                width: 590px;
                height: 100%;
                border:rgba(3,169,113,0.3) 1px solid;
              }
            }
            .middle{
              width: 100%;
              height: 640px;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              .middleLeft{
                width: 378px;
                height: 100%;
                margin-right: 10px;
                .middleLeft_top{
                  width: 100%;
                  height: 309px;
                  margin-bottom: 22px;
                  border:rgba(3,169,113,0.3) 1px solid;
                }
                .middleLeft_bottom{
                  width: 100%;
                  height: 309px;
                  border:rgba(3,169,113,0.3) 1px solid;
                }
              }
              .middleRight{
                width: 799px;
                height: 100%;
                border:rgba(3,169,113,0.3) 1px solid;
              }
            }
            .bottom{
              width: 100%;
              height: 264px;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              .bottom_left{
                width: 590px;
                height: 100%;
                margin-right: 19px;
                border:rgba(3,169,113,0.3) 1px solid;
              }
              .bottom_right{
                width: 590px;
                height: 100%;
                border:rgba(3,169,113,0.3) 1px solid;
              }
            }
        }
    }
}
</style>
