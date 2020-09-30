<template>
  <div class="elevation_info_container">
      <div class="back_btn" v-show="ifShowBtn">
          <div class="btn" @click="backFn">返回</div>
      </div>
      <div class="china_elvation_map" id="chinaElvationMap"></div>
  </div>
</template>

<script>
import 'echarts/map/js/china.js';
export default {
  data() {
    return {
        latLongitInfo:{},
        altitudeArr:[],
        mapJson:[
             {name:"北京",areaCode:"110000"}
            ,{name:"天津",areaCode:"120000"}
            ,{name:"河北",areaCode:"130000"}
            ,{name:"山西",areaCode:"140000"}
            ,{name:"内蒙古",areaCode:"150000"}
            ,{name:"辽宁",areaCode:"210000"}
            ,{name:"吉林",areaCode:"220000"}
            ,{name:"黑龙江",areaCode:"230000"}
            ,{name:"上海市",areaCode:"310000"}
            ,{name:"江苏",areaCode:"320000"}
            ,{name:"浙江",areaCode:"330000"}
            ,{name:"安徽",areaCode:"340000"}
            ,{name:"福建",areaCode:"350000"}
            ,{name:"江西",areaCode:"360000"}
            ,{name:"山东",areaCode:"370000"}
            ,{name:"河南",areaCode:"410000"}
            ,{name:"湖北",areaCode:"420000"}
            ,{name:"湖南",areaCode:"430000"}
            ,{name:"广东",areaCode:"440000"}
            ,{name:"广西",areaCode:"450000"}
            ,{name:"海南",areaCode:"460000"}
            ,{name:"重庆市",areaCode:"500000"}
            ,{name:"四川",areaCode:"510000"}
            ,{name:"贵州",areaCode:"520000"}
            ,{name:"云南",areaCode:"530000"}
            ,{name:"西藏",areaCode:"540000"}
            ,{name:"陕西",areaCode:"610000"}
            ,{name:"甘肃",areaCode:"620000"}
            ,{name:"青海",areaCode:"630000"}
            ,{name:"宁夏",areaCode:"640000"}
            ,{name:"新疆",areaCode:"650000"}
            ,{name:"台湾",areaCode:"710000"}
            ,{name:"香港",areaCode:"810000"}
            ,{name:"澳门",areaCode:"820000"}
        ],
        ifShowBtn:false,
        NavArrtext:['全国海拔信息','全国日照信息','全国降雨信息']
    };
  },
  watch:{
    '$route' (to, from) {
        this.$router.go(0);
    }
  },
  mounted(){
    this.ifShowBtn = false;
    this.initMapChina();
    if(this.$refs.navArr){
        var navArrDom = this.$refs.navArr.childNodes;
        navArrDom[0].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
    }
  },
  methods:{
    backFn(){
        this.$router.go(-1);
        setTimeout(() => {
            this.$router.push({
                path:'/geograpInfoQuery',
                query:{
                    type:2
                }
            });
        }, 10);
    },
    initMapChina(){
        var echarts = require('echarts');
        var baseUrl = window.config.url+"";
        var that = this;
        //以下是中国地图部分
        this.$axios({
            method: "get",
            url: baseUrl + "/stargaze/poi/countProvincesPoints",
        }).then(res=>{
            if(res.status == 200){
                var proviceGeograpInfo = res.data.data || [];
                var latLngobj = {};
                var altitudeARR = [];
                for(var i = 0;i < proviceGeograpInfo.length;i++){
                    latLngobj[proviceGeograpInfo[i].provinceName+''] = [proviceGeograpInfo[i].lng,proviceGeograpInfo[i].lat]; 
                    altitudeARR.push({
                        name:proviceGeograpInfo[i].provinceName + '',
                        value:proviceGeograpInfo[i].num
                    });
                }
                that.latLongitInfo = latLngobj;
                that.altitudeArr = altitudeARR;
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = that.latLongitInfo[data[i].name];    
                        if (geoCoord) {  
                        res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)  
                            });
                        }
                    }
                    return res;
                };
                var convertedData = [
                    convertData(that.altitudeArr),
                    convertData(that.altitudeArr.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0))
                ];
                var optionMap = {  
                    backgroundColor: '#404a59',  
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: true
                            }
                        },
                        roam: false,
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
                        trigger:true
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter:function(params){
                            var priceName = params.name;
                            var guanceDian = params.seriesName;
                            var guanceDianNum = params.value[2];
                            return priceName + '<br />' + guanceDian + '：'+ guanceDianNum;
                        }
                    },
                    series : [
                        {
                            name: '观测点数据量',
                            type: 'scatter',    //散点图
                            coordinateSystem: 'geo',  //地理坐标系
                            data: convertedData[0],
                            symbolSize: function (val) {    //标记的大小,大小不一样会用如下公式计算
                                return Math.max(val[2] / 5, 8);
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
                                    color: '#ddb926'  
                                }
                            },
                        },
                        {
                            name: '观测点数据量',
                            type: 'effectScatter',    //带有涟漪的散点图
                            coordinateSystem: 'geo',
                            data: convertedData[1],
                            symbolSize: function (val) {
                                return Math.max(val[2] / 5, 8);
                            },
                            showEffectOn: 'emphasis',  //配置何时显示特效:高亮（hover）的时候显示特效。
                            rippleEffect: {
                                brushType: 'stroke'    //波纹的绘制方式:空心或者实心fill
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{c}',  //模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                                    position: 'right',
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',  //亮黄
                                    shadowBlur: 10,
                                    shadowColor: '#333'    //悬浮灰
                                }
                            },
                            zlevel: 2
                        }
                    ]
                };
                var mapChart = echarts.init(document.getElementById('chinaElvationMap'));
                mapChart.setOption({
                    series:[{
                      type:'map',
                      map:'china'
                    }]
                });
                mapChart.setOption(optionMap);
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
                that.$axios({
                    method: "post",
                    url: baseUrl + "/stargaze/poi/searchByProvince",
                    params: {
                        provinceName:proviceName
                    }
                }).then(res=>{
                    if(res.status == 200 ){
                        that.ifShowBtn = true;
                        var proviceGeograpInfo = res.data.data;
                        console.log(proviceGeograpInfo)
                        var latLngobj = {};
                        var altitudeARR = [];
                        for(var i = 0;i < proviceGeograpInfo.length;i++){
                            latLngobj[proviceGeograpInfo[i].address+''] = [proviceGeograpInfo[i].lng,proviceGeograpInfo[i].lat]; 
                            altitudeARR.push({
                                name:proviceGeograpInfo[i].address + '',
                                value:proviceGeograpInfo[i].altitude
                            });
                        }
                        that.latLongitInfo = latLngobj;
                        that.altitudeArr = altitudeARR;
                        var geoCoordMap = that.latLongitInfo;
                        var data = that.altitudeArr;
                        var mapChart = echarts.init(document.getElementById('chinaElvationMap'));
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
                        that.mapJson.forEach(item=>{
                        if(item.name==params.name){
                            var href = window.location.href;
                            var getJsonUrl;
                            if(href.indexOf('localhost') != -1){
                                getJsonUrl = 'http://localhost:8080/static/mapJson/';
                            }
                            else{
                                getJsonUrl = window.config.url+'/static/mapJson/';
                            }
                            that.$axios({
                                method: "get",
                                url:getJsonUrl+item.areaCode+".geoJson",
                            }).then(res=>{
                                echarts.registerMap(item.areaCode, res.data);
                                mapChart.hideLoading();
                                var max = 480, min = 9; 
                                var maxSize4Pin = 100, minSize4Pin = 20;
                                var convertData = function (data) {
                                    var res = [];
                                    for (var i = 0; i < data.length; i++) {
                                        var geoCoord = geoCoordMap[data[i].name];
                                        if (geoCoord) {
                                            res.push({
                                                name: data[i].name,
                                                value: geoCoord.concat(data[i].value)
                                            });
                                        }
                                    }
                                    return res;
                                };
                                var option = {
                                    title: {
                                        text:proviceName,
                                        subtext: '',
                                        x: 'center',
                                        textStyle: {
                                            color: '#121C33',
                                            padding: [
                                                20,  // 上
                                                0, // 右
                                                0,  // 下
                                                0 // 左
                                            ]
                                        }
                                    },
                                    tooltip : {    //悬浮提示信息
                                        trigger: 'item',
                                        formatter:function(params){
                                            var haiba = params.value[2];
                                            var jingDu = params.value[0];
                                            var weiDu = params.value[1];
                                            if(!haiba || !jingDu || !weiDu){
                                                return params.name
                                            }else{
                                                return params.name + '<br />' +'海拔（米）：' + haiba + '<br />' +'经度：' + jingDu + '<br />' + '维度：' + weiDu;
                                            }
                                        },
                                    },
                                    legend: {
                                        orient: 'vertical',
                                        y: 'bottom',
                                        x: 'right',
                                        data: ['海拔信息'],
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    },
                                    geo: {
                                        show: true,
                                        map: item.areaCode,
                                        label: {
                                            show:false,
                                            normal: {
                                                show: false
                                            },
                                            emphasis: {
                                                show: false,
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
                                    series : [
                                        {
                                        name: '海拔信息',
                                        type: 'scatter',
                                        coordinateSystem: 'geo',
                                        data:convertedData[0],
                                        symbolSize: function (val) {
                                            return val[2] / 100;
                                        },
                                        label: {
                                            normal: {
                                                formatter: '{b}',
                                                position: 'right',
                                                show: false
                                            },
                                            emphasis: {
                                                show: true
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '#05C3F9'
                                            }
                                        }
                                    },
                                    {
                                        type: 'map',
                                        map: item.areaCode,
                                        geoIndex: 0,
                                        aspectScale: 0.75, //长宽比
                                        showLegendSymbol: false, // 存在legend时显示
                                        label: {
                                            normal: {
                                                show: false
                                            },
                                            emphasis: {
                                                show: false,
                                                textStyle: {
                                                    color: '#fff'
                                                }
                                            }
                                        },
                                        roam: true,
                                        itemStyle: {
                                            normal: {
                                                areaColor: '#031525',
                                                borderColor: '#3B5077',
                                            },
                                            emphasis: {
                                                areaColor: '#2B91B7'
                                            }
                                        },
                                        animation: false,
                                        data: convertedData[1],
                                    },
                                    {
                                        name: '海拔信息',
                                        type: 'scatter',
                                        coordinateSystem: 'geo',
                                        symbol: 'pin',
                                        symbolSize: function (val) {
                                            var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                            var b = minSize4Pin - a*min;
                                            b = maxSize4Pin - a*max;
                                            return a*val[2]/50+b;
                                        },
                                        label: {
                                            normal: {
                                                show: false,
                                                textStyle: {
                                                    color: '#fff',
                                                    fontSize: 9,
                                                }
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '#F62157', //标志颜色
                                            }
                                        },
                                        zlevel: 6,
                                        data: convertedData[1],
                                    }
                                ]
                                };
                                mapChart.setOption(option);
                            })
                        }
                    })}}).catch(err=>{
                        console.log(err)
                    });
            });
            }
        }).catch(err=>{
            console.log(err)
        });
    }
  }
}
</script>

<style scoped lang='less'>
.elevation_info_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .back_btn{
        width: 1200px;
        margin-bottom: -55px;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        box-sizing: border-box;
        .btn{
            border: 1px #3B5077 solid;
            font-size: 18px;
            color: #FFF;
            padding: 5px 15px;
            border-radius: 4px;
        }
        .btn:hover{
            background-color:#2B91B7;
            cursor: pointer;
        }
    }
    .china_elvation_map{
        position: relative;
        width: 1200px;
        height: 850px;
        margin-bottom: 80px;
    }
}
</style>
