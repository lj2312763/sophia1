<template>
  <div class="foodInsights_info_container">
    <div class="banner_container">
        <div class="text_container">
            <div class="pinpaiTitle">餐饮洞察</div>
            <div class="pinpaiDesc">数据餐饮与智慧行业的深度结合</div>
            <div class="use_btn_container">
                <a class="one" href="#inLineExperince">功能体验</a>
                <div class="two" @click="useNow">立即使用</div>
                <div class="three" @click="viewTecFile">技术文档</div>
            </div>
        </div>
    </div>
    <div class="zaixiantiyan">
        功能介绍
    </div>
    <div class="fnIntro_container">
        <div class="fnIntro_container_one">
            <div class="left">
                <img :src="oneIcon" alt="" srcset="">
            </div>
            <div class="right">
                <div class="title">数字化运营</div>
                <div class="desc">商品数字化、流程数字化、顾客数字化，并形成有效的数据沉淀</div>
            </div>
        </div>
        <div class="fnIntro_container_two">
            <div class="left">
                <img :src="twoIcon" alt="" srcset="">
            </div>
            <div class="right">
                <div class="title">挖掘价值</div>
                <div class="desc">融合外部多放行业数据，进一步挖掘数据价值</div>
            </div>
        </div>
        <div class="fnIntro_container_three">
            <div class="left">
                <img :src="threeIcon" alt="" srcset="">
            </div>
            <div class="right">
                <div class="title">指数升级</div>
                <div class="desc">权威数据支撑的行业指数分析，为业务进一步升级</div>
            </div>
        </div>
    </div>
    <div class="echarts_title">2019中国各省餐饮行业收入排行</div>
    <div class="echarts_container">
        <div class="left" id="chinaMap"></div>
        <div class="right" id="hengXiangZhuTu" ref="hengXiangZhuTu"></div>
    </div>
    <div class="zaixiantiyan" id="inLineExperince">
        查看品牌指数
    </div>
    <div class="search_container">
        <Input v-model="companyName" placeholder="请输入您想查看的品牌" @on-keyup="keyupviewDetail">
            <!-- <Select slot="prepend" style="width: 80px">
                <Option value="zhongshizhengcan">中式正餐</Option>
                <Option value="kuaicanliansuo">连锁快餐</Option>
                <Option value="huoguo">火锅</Option>
                <Option value="xican">西餐</Option>
            </Select> -->
            <Button slot="append" class="view_btn" @click="viewDetail">查看品牌指数</Button>
        </Input>
    </div>
    <div class="zaixiantiyan marginFood">
        即刻获得餐饮洞察能力
    </div>
    <div class="zixun">快速与我们取得联系，请点击下方的合作咨询</div>
    <div class="use_now" @click="jump1">合作咨询</div>
    <vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin> 
    <vFoodInsightDetail v-if="ifShowFoodDetail" @closeDetailWindow='closeThisDetail' :companyDetailData='companyDetailData'></vFoodInsightDetail>
  </div>
</template>

<script>
import vFoodInsightDetail from './foodInsightDetail';
import vLogin from "@/components/login/login";
import 'echarts/map/js/china.js';
export default {
  data() {
    return {
        downIcon:require('../../assets/images/insightData/down_arrow.png'),
        oneIcon:require('@/assets/images/new_index/icon/neirong.png'),
        twoIcon:require('@/assets/images/new_index/icon/keshihua.png'),
        threeIcon:require('@/assets/images/new_index/icon/jiqi.png'),
        ifShowFoodDetail:false,
        companyName:'',
        selectValue:'day',
        isShow:false,
        companyDetailData:{}
    };
  },
  methods:{
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
    viewDetail(){
        console.log(this.companyName);
        var companyName = this.companyName;
        if(!companyName){
            companyName = this.selectValue;
        }
        var baseUrl = window.config.url+'/insight';
        var that = this;
        this.$axios({
            method: "get",
            url: baseUrl + "/catering/get",
            params: {
                restaurantBrand:companyName
            }
        }).then(res => {
        if (res.status == 200) {
            var companyIndexData = res.data.data || {};
            that.companyDetailData = companyIndexData; 
            this.ifShowFoodDetail = true;
        }}).catch(err => {
            console.log(err);
        });
    },
    keyupviewDetail(e){
        if(e.keyCode == 13){
            this.viewDetail();
        }
    },
    closeThisDetail(arg){
        this.ifShowFoodDetail = arg;
    },
    viewTecFile(){
    this.$router.push({
        path:'/document',
        query:{
            type:2,
            id:5
        }
    });
    },
    useNow(){
        this.isShow=true;
    },
    closeDialog(){
        this.isShow=false;
    },
    initEcharts(){
        var echarts = require('echarts'); 
        //以下是中国地图部分
        var geoCoordMap = {    //地理坐标  
            '山东':[116.98,36.67],
            '广东':[113.27,23.13],
            '江苏':[118.78,32.07],
            '河北':[114.52,38.05],
            '河南':[113.62,34.75],
            '四川':[104.07,30.67],
            '浙江':[120.15,30.28],
            '湖南':[112.93,28.23],
            '辽宁':[123.43,41.80],
            '福建':[119.30,26.08],
            '安徽':[117.25,31.83],
            '重庆':[106.55,29.57],
            '黑龙江':[126.53,45.80],
        };
        var data = [    
            {name: "山东", value: 173},
            {name: "广东", value: 163},
            {name: "江苏", value: 152},
            {name: "河北", value: 144},
            {name: "河南", value: 134},
            {name: "四川", value: 129},
            {name: "浙江", value: 113},
            {name: "湖南", value: 97},
            {name: "辽宁", value: 87},
            {name: "福建", value: 74},
            {name: "安徽", value: 64},
            {name: "重庆", value: 49},
            {name: "黑龙江", value:23},
        ];
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
        var option = {  //设置自定义地图
            backgroundColor: 'rgba(64,74,89,0.1)',  //地图背景色
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            geo: {
                map: 'china',
                // left: '10',  此部分是定位设置
                // right: '35%',
                // center: [117.98561551896913, 31.205000490896193],
                // zoom: 2.5,
                label: {
                    emphasis: {
                    show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#017054',  //两种深黑灰
                        borderColor: '#48dcad'
                    },
                    emphasis: {
                        areaColor: '#1b654f'  //深黑灰
                    }
                }
            },
            tooltip : {    //悬浮提示信息
            trigger: 'item'
            },
            series : [
                {
                    name: '站点',
                    type: 'scatter',    //散点图
                    coordinateSystem: 'geo',  //地理坐标系
                    data: convertedData[0],
                    symbolSize: function (val) {    //标记的大小,大小不一样会用如下公式计算
                        return Math.max(val[2] / 10, 8);
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
                    name: '餐饮收入',
                    type: 'effectScatter',    //带有涟漪的散点图
                    coordinateSystem: 'geo',
                    data: convertedData[1],
                    symbolSize: function (val) {
                        return Math.max(val[2] / 10, 8);
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
        mapChart.setOption({
            series:[{
              type:'map',
              map:'china'
            }]
        });
        mapChart.setOption(option);
        mapChart.on('click', function (params) {
            console.log(params);
        });
        //以下是横向柱状图部分
        var barChart = echarts.init(document.getElementById('hengXiangZhuTu'));
        var dataArr = [
                    [95.75, '山东'],
                    [73.38, '广东'],
                    [61.86, '江苏'],
                    [50.26, '河北'],
                    [49.52, '河南'],
                    [40.68, '四川'],
                    [30.84, '浙江'],
                    [29.84, '湖南'],
                    [20.84, '辽宁'],
                    [19.84, '福建'],
                    [18.84, '安徽'],
                    [10.84, '重庆'],
                    [9.84, '黑龙江']
                ];
        var numArr = [];
        for(var i = 0;i < dataArr.length;i++){
            numArr.push(dataArr[i][0])
        }
        var sortNumArr = numArr.sort(function(a,b){
            return a - b; 
        });
        var sortDataArr = [];
        for(var j = 0 ;j < sortNumArr.length;j++){
            for(var k = 0;k < dataArr.length;k++){
                if(sortNumArr[j] == dataArr[k][0]){
                    sortDataArr.push(dataArr[k]);
                }
            }
        }
        var barChartOption = {
            dataset: {
                source: sortDataArr
            },
            grid: {containLabel: true},
            xAxis: {
                position:'top',
                name: '全国各省消费指数',
                axisLine: {
                    lineStyle: {
                    color: "#FFF" // x轴坐标轴颜色
                    }
                },
                splitLine: {     //不显示网格线
                    show: false
                },
                nameLocation:'center',
                nameTextStyle:{
                    verticalAlign:'bottom',
                    padding:15
                }
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: "#FFF" // x轴坐标轴颜色
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: '消费指数',
                        // Map the "product" column to Y axis
                        y: 'product'
                    },
                    itemStyle:{
                        normal:{
                            color:'#5DBD31'
                        }
                    },
                    axisLabel:{interval: 0}
                }
            ]
        };
        barChart.setOption(barChartOption);
    }
  },
  components:{
      vFoodInsightDetail,
      vLogin
  },
  mounted(){
      this.initEcharts();
  }
}
</script>

<style scoped lang='less'>
.foodInsights_info_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .banner_container{
        width: 100%;
        height: 450px;
        position: relative;
        background: url('../../assets/images/insightData/canyin.png') no-repeat center center;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 125px;
        padding-bottom: 223px;
        box-sizing: border-box;
        .text_container{
            width: 1200px;
            .pinpaiTitle{
                margin-bottom: 20px;
                font-size: 36px;
                color: #FFFFFF;
            }
            .pinpaiDesc{
                font-size: 16px;
                color: #FFFFFF;
                line-height: 32px;
            }
            .use_btn_container{
                display: flex;
                align-items: center;
                margin-top: 60px;
                .one,.two,.three{
                    padding: 8px 32px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #FFFFFF;
                }
                .one{
                    background: #03A971;
                    border-radius: 3px;
                    margin-right: 40px;
                }
                .two:hover{
                    border: 1px solid #57a3f3;
                    color:#57a3f3;
                }
                .three:hover{
                    border: 1px solid #57a3f3;
                    color:#57a3f3;
                }
                .two,.three{
                    border: 1px solid #FFFFFF;
                    border-radius: 3px;
                    
                }
                .two{
                    margin-right: 40px;
                }
                .one,.two,.three:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .zaixiantiyan{
        margin-top: 80px;
        margin-bottom: 30px;
        font-size: 36px;
        color: #121C33;
        text-align: center;
    }
    .marginFood{
        margin-bottom: 0px;
    }
    .zixun{
        color: #7A8499;
        margin: 10px 0 25px 0;
        font-size: 20px;
        text-align: center;
    }
    .search_container{
        display: flex;
        width: 457px;
        height: 40px;
        .down_btn{
            width: 71px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
            border: 1px solid #B8BECC;
            border-radius: 4px 0 0 4px;
            border-right: none;
            img{
                width: 8px;
                height: 5px;
            }
        }
        .input_text{
            flex-grow: 1;
            height: 40px;
            input{
                width: 100%;
                height: 100%;
                padding-left: 10px;
                box-sizing: border-box;
            }
        }
        .view_btn{
            // width: 114px;
            // height: 40px;
            background: #03A971;
            border: 1px solid #03A971;
            border-radius: 0px 4px 4px 0px;
            // text-align: center;
            // line-height: 40px;
            // font-size: 14px;
            color: #FFFFFF;
            // letter-spacing: 0;
        }
        .view_btn:hover{
            cursor: pointer;
        }
        .ivu-input-group-prepend{
            display: none;
        }
    }
    .fnIntro_container{
        width: 1200px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 80px;
        .fnIntro_container_two,.fnIntro_container_three{
            width: 30%;
            display: flex;
            align-items: center;
            .left{
                width: 80px;
                margin-bottom: 12px;
                margin-right: 10px;
                img{
                    width: 100%;
                    display: block;
                }
            }
            .right{
                .title{
                    font-size: 18px;
                    color: #121C33;
                    margin-bottom: 11px;
                }
                .desc{
                    font-size: 14px;
                    color: #7A8499;
                    line-height: 22px;
                }
            }
        }
        .fnIntro_container_one{
            width: 30%;
            display: flex;
            align-items: center;
            .left{
                width: 80px;
                margin-bottom: 12px;
                margin-right: 10px;
                img{
                    width:80px;
                   display: block;
                }
            }
            .right{
                .title{
                    font-size: 18px;
                    color: #121C33;
                    margin-bottom: 11px;
                }
                .desc{
                    font-size: 14px;
                    color: #7A8499;
                    line-height: 22px;
                }
            }
        }
    }
    .echarts_title{
        margin-bottom: 40px;
        font-size: 36px;
        color: #121C33;
    }
    .echarts_container{
        width: 1200px;
        height: 579px;
        display: flex;
        align-items: center;
        background-color: #041B4A;
        .left{
            width: 60%;
            height: 100%;
        }
        .right{
            width: 40%;
            height: 100%;
        }
    }
    .use_now{
        width: 140px;
        height: 42px;
        background: #03A971;
        border-radius: 3px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height:42px;
        margin-bottom: 80px;
    }
}
</style>
