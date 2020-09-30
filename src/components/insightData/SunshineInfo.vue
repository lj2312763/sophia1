<template>
  <div class="SunshineInfo_container">
      <div class="china_map_container" id="chinaMap"></div>
      <div class="line_title">2018年{{addreess}}日照趋势图</div>
      <div class="line_container" id="lineChart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        addreess:'北京'
    };
  },
  mounted(){
    this.initChinaMap();
    this.initLine();
  },
  methods:{
    initChinaMap(){
        var echarts = require('echarts'); 
        var baseUrl = window.config.url+'/insight';
        this.$axios({
            method:'post',
            url:baseUrl + '/geographic/query_geographic_data'
        }).then(res=>{
            if(res.status == 200){
                var sunShineData = res.data.data;
                var geoCoordMap = {};
                var data = [];
                for(var i = 0;i < sunShineData.length; i++){
                    geoCoordMap[sunShineData[i].cityName.replace(/\s*/g,'')] = [sunShineData[i].latitude,sunShineData[i].longitude];  //
                    data.push({
                        name:sunShineData[i].cityName.replace(/\s*/g,''),
                        value:sunShineData[i].sunlightYear
                    });
                }
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];    //得到对应坐标
                        if (geoCoord) {  //判断data第i个的name对应的地理坐标是否存在
                        res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)  //两个value值连接
                            });
                        }
                    }
                    return res;
                };
                var convertedData = [
                    convertData(data),
                    convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0))
                ];
                console.log(convertedData + 'ttttttttttttttttt')
                var option = {  //设置自定义地图
                    backgroundColor: '#404a59',  //地图背景色
                    animation: true,
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'cubicInOut',
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                            show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0, 
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1, 
                                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter:function(params){
                            var cityName = params.name;
                            var guanceDian = params.seriesName;
                            var guanceDianNum = params.value[2];
                            return cityName + '<br />' + guanceDian + '：'+ guanceDianNum;
                        }
                    },
                    series : [
                        {
                            name: '站点',
                            type: 'scatter',    //散点图
                            coordinateSystem: 'geo',  //地理坐标系
                            data: convertedData[0],
                            symbolSize: function (val) {    //标记的大小,大小不一样会用如下公式计算
                                return Math.max(val[2] / 100, 8);
                            },
                            label: {  //图形上的文本标签
                                normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false  //站点地名的直接显示
                                },
                                emphasis: {
                                    show: true  //悬浮显示
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'  //屎黄
                                }
                            },
                        },
                        {
                            name: '年日照时长',
                            type: 'effectScatter',    //带有涟漪的散点图
                            coordinateSystem: 'geo',
                            data: convertedData[1],
                            symbolSize: function (val) {
                                return Math.max(val[2] / 100, 8);
                            },
                            showEffectOn: 'emphasis',  //配置何时显示特效:高亮（hover）的时候显示特效。
                            rippleEffect: {
                                brushType: 'stroke'    //波纹的绘制方式:空心或者实心fill
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',  //模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',  //亮黄
                                    shadowBlur: 10,
                                    shadowColor: '#333'    //悬浮灰
                                }
                            },
                            zlevel: 1
                        }
                    ]
                };
                var mapChart = echarts.init(document.getElementById('chinaMap'));
                var that = this;
                mapChart.setOption({
                    series:[{
                      type:'map',
                      map:'china'
                    }]
                });
                mapChart.setOption(option);
                mapChart.on('click', function (params) {
                    var proviceName;
                    var paramsName = params.name;
                    if(paramsName == '北京' || paramsName == '上海' || paramsName == '天津' || paramsName == '重庆'){
                        proviceName = paramsName + '市';
                    }
                    else if(paramsName == '内蒙古' || paramsName == '西藏'){
                        proviceName = paramsName + '自治区';
                    }
                    else if(paramsName == '广西'){
                        proviceName = paramsName + '壮族自治区';
                    }
                    else if(paramsName == '新疆'){
                        proviceName = paramsName + '维吾尔自治区';
                    }
                    else if(paramsName == '宁夏'){
                        proviceName = paramsName + '回族自治区';
                    }
                    else{
                        proviceName = paramsName + '省';
                    }
                    that.addreess = proviceName;
                    that.initLine(proviceName);
                });
            }
        }).catch(err=>{
            console.log(err)
        });
    },
    initLine(priviceName = '北京市'){
        var echarts = require('echarts'); 
        var baseUrl = window.config.url+'/insight';
        this.$axios({
            method:'post',
            url:baseUrl + '/geographic/query_geographic_data',
            params: {
                cityProvince:priviceName
           }
        }).then(res=>{
            if(res.status == 200){
                var lineData = res.data.data[0].geographicCityRelList || [];
                var xAxisData = [];
                var yAxisData = [];
                for(var i = 0;i < lineData.length;i++){
                    xAxisData.push(lineData[i].statisticsMonth);
                    yAxisData.push(lineData[i].sunlightMonth)
                }
                var option = {
                    color:'	#00FA9A',  //折线图的颜色
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            name:'时间',
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '日照时长  ' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data:xAxisData,
                            axisLabel:{
                                show:true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name:'时长（小时）',
                            nameTextStyle:{
                                align:'right'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '日照时长',
                            type: 'line',
                            smooth: true,
                            data:yAxisData
                        }
                    ]
                };
                var lineChart = echarts.init(document.getElementById('lineChart'));
                lineChart.setOption(option);
            }
        }).catch(err=>{
            console.log(err)
        });
    }
  }
}
</script>
<style scoped lang='less'>
.SunshineInfo_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .china_map_container{
        width: 1200px;
        height: 632px;
        // background-color: greenyellow;
    }
    .line_title{
        margin-top: 40px;
        margin-bottom: 30px;
        font-size: 18px;
        color: #121C33;
    }
    .line_container{
        width: 926px;
        height: 395px;
        // background-color: hotpink;
        margin-bottom: 108px;
    }
}
</style>
