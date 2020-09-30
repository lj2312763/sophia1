<template>
<div>
    <div class="resume_detail_container">
        <div class="resume_detail">
            <div class="white_box">
                <div class="title">简历画像</div>
                <div class="baseInfo_container">
                    <div class="baseInfo_left" :style="{backgroundImage: 'url(' + baseInfoImg + ')'}">
                        <div class="address" :class="{'scaleAnimation':currentId==1}">{{resumeDetailData.address}}</div>
                        <div class="sex" :class="{'scaleAnimation':currentId==2}">{{sex}}</div>
                        <div class="deg" :class="{'scaleAnimation':currentId==5}">{{resumeDetailData.education}}</div>
                        <div class="coll" :class="{'scaleAnimation':currentId==3}">{{resumeDetailData.schoolTag}}</div>
                        <div class="exper" :class="{'scaleAnimation':currentId==4}">{{resumeDetailData.workingYears}}年工作经验</div>
                    </div>
                    <div class="baseInfo_right">
                        <div class="name">{{resumeDetailData.name}}</div>
                        <div class="basic_info">
                            <div>{{resumeDetailData.address}}&nbsp;|&nbsp;</div>
                            <div>{{resumeDetailData.education}}&nbsp;|&nbsp;</div>
                            <div>{{resumeDetailData.workingYears}}年经验</div>
                        </div>
                        <div class="college">
                            <div>毕业院校：</div>
                            <div>{{resumeDetailData.schoolTag}}</div>
                        </div>
                        <div class="company">
                            <div>历史单位：</div>
                            <div>
                                <div v-for="(companItem,index) in resumeDetailData.describe.split(',')" :key="index">
                                    <span>{{companItem.split('&')[0]}}</span>
                                    <span>{{companItem.split('&')[1]}}</span>
                                    <span>{{companItem.split('&')[2]}}</span>
                                    <span>{{companItem.split('&')[3]}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="salary">
                            <div>薪资预估：</div>
                            <div>{{resumeDetailData.salary_start}}-{{resumeDetailData.salary_end}}元/月</div>
                        </div>
                        <div class="resignation">
                            <div>离职预估：</div>
                            <div>短期离职可能性高</div>
                        </div>
                    </div>
                </div>
                <div class="content_container">
                    <div class="huanxing_container">
                        <div class="yuce_title">预测职位</div>
                        <div class="huanxing" id="huanxingId"></div>
                    </div>
                    <div class="zhutu_container">
                        <div class="yuce_title jineng">技能标签</div>
                        <div class="hengXiangZhuTu_class" id="hengXiangZhuTu"></div>
                    </div>
                    <div class="leiDatu_container">
                        <div class="yuce_title">行业背景</div>
                        <div class="hengXiangZhuTu_class" id="hangyeBeijing"></div>
                    </div>
                    <div class="leiDatu_container">
                        <div class="yuce_title">能力评估</div>
                        <div class="hengXiangZhuTu_class" id="nengliPinggu"></div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
        resumeDetailData:{},
        baseInfoImg:null,
        manImg:require('../../assets/images/JobFile/man.png'),
        womenImg:require('../../assets/images/JobFile/women.png'),
        sex:'',
        currentId:1
    };
  },
  components: {
  },
  created() {
    this.resumeDetailData = this.$route.query.params;
    var nameStr = this.resumeDetailData.name;
    if(nameStr.indexOf('先生') != -1){
        this.baseInfoImg = this.manImg;
        this.sex = '男';
    }
    else{
        this.baseInfoImg = this.womenImg;
        this.sex = '女';
    }
  },
  watch:{
  },
  mounted() {
    this.initEcharts();
    setInterval(()=>{
        if(this.currentId >= 5){
            this.currentId = 1
        }
        else{
            this.currentId++;
        }
    },3000);
  },
  methods: {
    initEcharts(){
        //预测职位环形饼图
        var echarts = require("echarts");
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '预测职位',
                    type: 'pie',
                    hoverAnimation:false,
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal:{
                            show:true,
                            position:'outside'
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        {value: parseInt(Math.random()*100), name: '技术支持'},
                        {value: parseInt(Math.random()*100), name: '后端开发'},
                        {value: parseInt(Math.random()*100), name: '产品'},
                        {value: parseInt(Math.random()*100), name: '前端开发'},
                        {value: parseInt(Math.random()*100), name: '行政/高级管理'}
                    ]
                }
            ]
        };
        var myMapChart = echarts.init(document.getElementById("huanxingId"));
        myMapChart.setOption(option);

        //技能标签横向柱状图部分
        var dataArr = [];
        var jinengData = this.$route.query.params.tags.split(',');
        for(var i = 0;i < jinengData.length;i++){
            dataArr.push(
                [jinengData[i].split('&')[1],jinengData[i].split('&')[0]]
            )
        }
        var barChart = echarts.init(document.getElementById('hengXiangZhuTu'));
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
            xAxis: {
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: "black" // x轴坐标轴颜色
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        x: '消费指数',
                        y: 'product'
                    },
                    itemStyle:{
                        normal:{
                            color:'#00BFFF'
                        }
                    },
                    axisLabel:{interval: 0}
                }
            ]
        };
        barChart.setOption(barChartOption);

        //行业背景部分
        var hangyeChart = echarts.init(document.getElementById('hangyeBeijing'));
        var hangyeOption = {
            tooltip: {},
            radar: {
                name: {
                    textStyle: {
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '建筑/房地产', max: 10000},
                    { name: '咨询/法律/公务员', max: 10000},
                    { name: '生物/制药/医疗/护理', max: 10000},
                    { name: '教育/翻译/服务业', max: 10000},
                    { name: '工程师', max: 10000},
                    { name: '金融', max: 10000},
                    { name: '人事/行政/高级管理', max: 10000},
                    { name: '生产/采购/物流', max: 10000},
                    { name: '互联网', max: 10000},
                    { name: '其他', max: 10000}
                ]
            },
            series: [{
                lineStyle:{
                    color:'green'
                },
                name: '行业背景',
                type: 'radar',
                data: [
                    {
                        value: [parseInt(Math.random()*10000), parseInt(Math.random()*10000), parseInt(Math.random()*10000), parseInt(Math.random()*10000), parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000)],
                        name: '行业背景'
                    }
                ]
            }]
        };
        hangyeChart.setOption(hangyeOption);

        //能力评估
        var nengliChart = echarts.init(document.getElementById('nengliPinggu'));
        var nengliOption = {
            tooltip: {},
            radar: {
                name: {
                    textStyle: {
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '语言能力', max: 10000},
                    { name: '社会能力', max: 10000},
                    { name: '领导力', max: 10000},
                    { name: '工作能力', max: 10000},
                    { name: '教育背景', max: 10000},
                    { name: '所获荣誉', max: 10000}
                ]
            },
            series: [{
                lineStyle:{
                    color:'blue'
                },
                name: '能力评估',
                type: 'radar',
                data: [
                    {
                        value: [parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000)],
                        name: '能力评估'
                    }
                ]
            }]
        };
        nengliChart.setOption(nengliOption);

    }
  }
};
</script>
<style scoped lang='less'>
.resume_detail_container{
    width: 100%;
    display: flex;
    justify-content: center;
    .resume_detail{
        width: 100%;
        background-color:#F7F8FA;
        overflow: hidden;
        padding-top: 60px;
        padding-bottom: 80px;
        display: flex;
        justify-content: center;
        .white_box{
            width: 1200px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            .title{
                width: 100%;
                height: 95px;
                text-align: center;
                line-height: 95px;
                background: rgba(18,28,51,0.59);
                font-size: 30px;
                color: #FFFFFF;
                background-image: url('../../assets/images/JobFile/huaxiangBanner.png');
                background-size: cover;
                background-position: center;
            }
            .baseInfo_container{
                width: 100%;
                height: 347px;
                background-color: #ffffff;
                display: flex;
                align-items: center;
                padding: 40px 140px;
                .baseInfo_left{
                    width: 238.7px;
                    height: 227px;
                    background-image: url('../../assets/images/JobFile/man.png');
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    margin-right: 126px;
                    @keyframes scaleDraw {  
                        0%{
                            transform: scale(1);  
                        }
                        25%{
                            transform: scale(2); 
                            color: #03A971;
                        }
                        50%{
                            transform: scale(1);
                        }
                        75%{
                            transform: scale(2);
                            color: #03A971;
                        }
                    }
                    div{
                        &.scaleAnimation{
                            -webkit-animation-name: scaleDraw; 
                            -webkit-animation-timing-function: ease-in-out; 
                            -webkit-animation-iteration-count: infinite;  
                            -webkit-animation-duration: 3s; 
                        }
                    }
                    .address{
                        position: absolute;
                        left: 50%;
                        margin-left: -13px;
                        top: -27px;
                    }
                    .sex{
                        position: absolute;
                        top: 34%;
                        left: -19px;
                    }
                    .deg{
                        position: absolute;
                        right: -34px;
                        top: 39%;
                        margin-top: -10px;
                    }
                    .coll{
                        position: absolute;
                        bottom: -26px;
                        left: 10px;
                    }
                    .exper{
                        position: absolute;
                        right: 4px;
                        bottom: -26px;
                    }
                }
                .baseInfo_right{
                    .name{
                        width: 100%;
                        font-size: 18px;
                        color: #121C33;
                        margin-bottom: 10px;
                        font-weight: bold;
                    }
                    .basic_info,.college,.company,.salary,.resignation{
                        width: 100%;
                        display: flex;
                        font-size: 14px;
                        color: #7A8499;
                        line-height: 24px;
                        span{
                            margin-right: 10px;
                        }
                    }
                }
            }

            .content_container{
                width: 100%;
                background-color: #ffffff;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                .huanxing_container,.zhutu_container,.leiDatu_container{
                    width: 47%;
                    border: 1px solid #EBECF0;
                    margin-bottom: 30px;
                    .yuce_title{
                        width: 100%;
                        padding: 19px 25px;
                        box-sizing: border-box;
                        background-color:#F7F8FA;
                        font-size: 16px;
                        color: #3D4966;
                        letter-spacing: 0;
                    }

                    .jineng{
                        margin-bottom: -30px;
                    }

                    .huanxing {
                        width: 100%;
                        height: 350px;
                        margin-top: 20px;
                        div{
                            canvas{
                                height: 100%;
                                width: 100%;
                            }
                        }
                    }
                    
                    .hengXiangZhuTu_class{
                        width:600px;
                        height: 400px;
                        margin-top: 10px;
                        display: flex;
                        justify-content: center;
                    }
                }
            }
        }
    }
}
</style>
