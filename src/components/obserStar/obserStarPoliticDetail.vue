<template>
  <div class="obser_star_list_container">

    <!--图形统计区域-->
    <div class="echarts_container">
        <div class="chart">
            <div class="chart_top">{{subTitleName}}</div>
            <div class="chart_container">
              <div class="top">
                <div class="left">
                  <div class="left_top_bar" id="topLeftTopBar"></div>
                  <div class="left_bottom_pie" id="topLeftBottomPie"></div>
                </div>
                <div class="right" id="topRightChinaMap"></div>
              </div>
              <div class="middle">
                <div class="middle_left" id="middleLeftBar"></div>
                <div class="middle_right" id="middleRightPie"></div>
              </div>
              <div class="bottom">
                <div class="bottom_left" id="bottomLeftBar"></div>
                <div class="bottom_right" id="bottomRightBar"></div>
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
        subTitleName:''
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

            //上面左上 柱状图
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
                    var topLeftTopBarData = res.data.data;
                    var topLeftTopBarChart = echarts.init(document.getElementById('topLeftTopBar'));  
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    var strDara = topLeftTopBarData;
                    var topLeftTopDataArr = strDara.cockpitDatatList;
                    for(var i = 0; i < topLeftTopDataArr.length;i++){
                        xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                        xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                        xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                    }
                    var topLeftTopBar_option = {
                        title:{
                            text:topLeftTopBarData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        background:'#2D8C6A',
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            
                                type: 'shadow'        
                            }
                            
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
                                    margin: 20,
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
                                axisLabel:{
                                    color:'#fff',
                                    fontSize:12
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
                    topLeftTopBarChart.setOption(topLeftTopBar_option);
                }
            }).catch(err=>{
                console.log(err);
            });

            //上面左下 饼图
            if(subTitleCode == 687544 || subTitleCode == 435738 || subTitleCode == 880812){
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
                        var topLeftBottomPieData = res.data.data;
                        var topLeftBottomPieChart = echarts.init(document.getElementById('topLeftBottomPie'));
                        var xAxisDataObj = {
                            xAxisData:[],
                            data:[],
                            name:''
                        };
                        var strDara = topLeftBottomPieData;
                        var topLeftTopDataArr = strDara.cockpitDatatList;
                        for(var i = 0; i < topLeftTopDataArr.length;i++){
                            xAxisDataObj.xAxisData.push(topLeftTopDataArr[i].statisticalIndicator);
                            xAxisDataObj.data.push(topLeftTopDataArr[i].firstStatisticalContent);
                            xAxisDataObj.name = topLeftTopDataArr[i].firstDescription;
                        }
                        var topLeftTopBar_option = {
                            title:{
                                text:topLeftBottomPieData.chartName,
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
                                        margin: 20,
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
                        topLeftBottomPieChart.setOption(topLeftTopBar_option);
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
                        var topLeftBottomPieChart = echarts.init(document.getElementById('topLeftBottomPie'));
                        var topLeftBottomPieData = res.data.data;
                        var cockpitDatatList = topLeftBottomPieData.cockpitDatatList;
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
                        var topLeftBottomPieData_option = {
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
                        topLeftBottomPieChart.setOption(topLeftBottomPieData_option);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }

            //上右中国地图  topRightChinaMap

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
                    var topCenterData = res.data.data;
                    console.log(topCenterData+'地图数据');
                    var cockpitDatatList = topCenterData.cockpitDatatList;
                    var mapData = [];
                    var firstDescription;
                    for(var i = 0; i < cockpitDatatList.length;i++){
                        firstDescription = cockpitDatatList[i].firstDescription;
                        if(i == 0){
                            mapData.push({
                                name:cockpitDatatList[i].statisticalIndicator.replace(/\s*/g,''),
                                value:cockpitDatatList[i].firstStatisticalContent
                            });
                        }
                        else{
                            mapData.push({
                                name:cockpitDatatList[i].statisticalIndicator.replace(/\s*/g,''),
                                value:Number(cockpitDatatList[i].firstStatisticalContent)
                            });
                        }
                    }
                    console.log(mapData+'aaaaaaaaa')
                    var myMapChart = echarts.init(document.getElementById('topRightChinaMap'));        
                    var mayMap_option = {
                        title: {//这里是整个图的标题
                            text: topCenterData.chartName,//大标题
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
                            data: mapData   // 数据
                        }]
                    };
                    myMapChart.setOption(mayMap_option);

                }
            }).catch(err=>{
                console.log(err);
            });

            //中左柱状图middleLeftBar
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
                    var middleLeftBarData = res.data.data;
                    var cockpitDatatList = middleLeftBarData.cockpitDatatList;
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    for(var i = 0; i < cockpitDatatList.length;i++){
                        xAxisDataObj.xAxisData.push(cockpitDatatList[i].statisticalIndicator);
                        xAxisDataObj.data.push(cockpitDatatList[i].firstStatisticalContent);
                        xAxisDataObj.name = cockpitDatatList[i].firstDescription;
                    }
                    var middleLeftBarDataChart = echarts.init(document.getElementById('middleLeftBar'));
                    var middleLeftBar_option = {
                        title:{
                            text:middleLeftBarData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            
                                type: 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
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
                                axisLabel:{
                                    color:'#fff',
                                    fontSize:12
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
                                name: xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };
                    middleLeftBarDataChart.setOption(middleLeftBar_option);
                }
            }).catch(err=>{
                console.log(err);
            });

            //中右柱形图
            if(subTitleCode == 455672 || subTitleCode == 546798 || subTitleCode == 357228 || subTitleCode == 237562 || subTitleCode == 880812){
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
                        var middleRightPieChart = echarts.init(document.getElementById('middleRightPie'));
                        var middleRightPieData = res.data.data;
                        var cockpitDatatList = middleRightPieData.cockpitDatatList;
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
                        var middleRightPie_option = {
                            background:'#2D8C6A',
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}:{c}({d}%)'
                            },
                            title:{
                                text:middleRightPieData.chartName,
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
                        middleRightPieChart.setOption(middleRightPie_option);
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
                        chartType:1,
                        parentTitle:parentTitle,
                        subTitleCode:subTitleCode,
                        statisticsYear:''
                    }
                }).then(res => {
                    if(res.status == 200){
                        var middleRightPieData = res.data.data;
                        var cockpitDatatList = middleRightPieData.cockpitDatatList;
                        var xAxisDataObj = {
                            xAxisData:[],
                            data:[],
                            name:''
                        };
                        for(var i = 0; i < cockpitDatatList.length;i++){
                            xAxisDataObj.xAxisData.push(cockpitDatatList[i].statisticalIndicator);
                            xAxisDataObj.data.push(cockpitDatatList[i].firstStatisticalContent);
                            xAxisDataObj.name = cockpitDatatList[i].firstDescription;
                        }
                        var middleRightPieChart = echarts.init(document.getElementById('middleRightPie'));
                        var middleRightPie_option = {
                            title:{
                                text:middleRightPieData.chartName,
                                textStyle:{
                                    color:'#fff',
                                    fontSize:14
                                },
                                left:'center'
                            },
                            color: ['#0FA16D'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            
                                    type: 'shadow'        
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            axisLabel:{
                                color:'#fff',
                                fontSize:14
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: xAxisDataObj.xAxisData,
                                    axisTick: {
                                        alignWithLabel: true,
                                        lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
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
                                    axisLabel:{
                                        color:'#fff',
                                        fontSize:12
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
                                    name: xAxisDataObj.name,
                                    type: 'bar',
                                    barWidth: '30%',
                                    data: xAxisDataObj.data
                                }
                            ]
                        };
                        middleRightPieChart.setOption(middleRightPie_option);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }


            //下左柱状图 bottomLeftBar
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
                    var bottomLeftBarData = res.data.data;
                    var cockpitDatatList = bottomLeftBarData.cockpitDatatList;
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    for(var i = 0; i < cockpitDatatList.length;i++){
                        xAxisDataObj.xAxisData.push(cockpitDatatList[i].statisticalIndicator);
                        xAxisDataObj.data.push(cockpitDatatList[i].firstStatisticalContent);
                        xAxisDataObj.name = cockpitDatatList[i].firstDescription;
                    }
                    var bottomLeftBarChart = echarts.init(document.getElementById('bottomLeftBar'));
                    var bottomLeftBar_option = {
                        title:{
                            text:bottomLeftBarData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            
                                type: 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
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
                                axisLabel:{
                                    color:'#fff',
                                    fontSize:12
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
                                name: xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };
                    bottomLeftBarChart.setOption(bottomLeftBar_option);
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
                    var bottomRightBarData = res.data.data;
                    var cockpitDatatList = bottomRightBarData.cockpitDatatList;
                    var xAxisDataObj = {
                        xAxisData:[],
                        data:[],
                        name:''
                    };
                    for(var i = 0; i < cockpitDatatList.length;i++){
                        xAxisDataObj.xAxisData.push(cockpitDatatList[i].statisticalIndicator);
                        xAxisDataObj.data.push(cockpitDatatList[i].firstStatisticalContent);
                        xAxisDataObj.name = cockpitDatatList[i].firstDescription;
                    }
                    var bottomRightBarChart = echarts.init(document.getElementById('bottomRightBar')); 
                    var bottomRightBar_option = {
                        title:{
                            text:bottomRightBarData.chartName,
                            textStyle:{
                                color:'#fff',
                                fontSize:14
                            },
                            left:'center'
                        },
                        color: ['#0FA16D'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            
                                type: 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        axisLabel:{
                            color:'#fff',
                            fontSize:14
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xAxisDataObj.xAxisData,
                                axisTick: {
                                    alignWithLabel: true,
                                    lineStyle:{color:'#2D8C6A'}    //坐标轴刻度线颜色
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
                                axisLabel:{
                                    color:'#fff',
                                    fontSize:12
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
                                name: xAxisDataObj.name,
                                type: 'bar',
                                barWidth: '30%',
                                data: xAxisDataObj.data
                            }
                        ]
                    };
                    bottomRightBarChart.setOption(bottomRightBar_option);
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    },
}
</script>

<style scoped lang='less'>
.echarts_container{
    width: 100%;
    background-image: url('../../assets/images/obserStar/chart_bg_img.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .chart{
        width: 1200px;
        padding: 80px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .chart_top{
            font-size: 28px;
            color: #fff;
            text-align: center;
            margin-bottom: 48px;
        }
        .chart_container{
            width: 100%;
            margin-bottom: 40px;
            .top{
              width: 100%;
              height: 640px;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .left{
                width: 378px;
                height: 100%;
                margin-right: 21px;
                .left_top_bar{
                  width: 100%;
                  height: 309px;
                  margin-bottom: 21px;
                  // background-color: blue;
                  border:rgba(3,169,113,0.3) 1px solid;
                }
                .left_bottom_pie{
                  width: 100%;
                  height: 309px;
                  // background-color: green;
                  border:rgba(3,169,113,0.3) 1px solid;
                }
              }
              .right{
                height: 100%;
                flex-grow: 1;
                // background-color: cornflowerblue;
                border:rgba(3,169,113,0.3) 1px solid;
              }
            }
            .middle{
              width: 100%;
              height: 264px;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .middle_left{
                width: 590px;
                height: 100%;
                margin-right: 21px;
                // background-color: red;
                border:rgba(3,169,113,0.3) 1px solid;
              }
              .middle_right{
                height: 100%;
                width: 590px;
                // background-color: pink;
                border:rgba(3,169,113,0.3) 1px solid;
              }
            }
            .bottom{
              width: 100%;
              height: 264px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .bottom_left{
                width: 590px;
                height: 100%;
                margin-right: 21px;
                // background-color:orangered;
                border:rgba(3,169,113,0.3) 1px solid;
              }
              .bottom_right{
                width: 590px;
                height: 100%;
                // background-color:skyblue;
                border:rgba(3,169,113,0.3) 1px solid;
              }
            }
        }
    }
}
</style>
