<template>
<div class="resumeList_container">
    <div class="banner_container">
        <div class="banner_content">
            <div class="banner_title">AI推荐简历</div>
            <div class="banner_desc">致力于通过AI技术提高招聘速度，降低时间成本，节省招聘支出。</div>
            <div class="banner_btn" @click="goHezuo">合作咨询</div>
        </div>
    </div>
    <div class="choice_job_btn_container">
        <div class="tuijian_title">请选择要推荐的岗位：</div>

        <div class="job_type_item_container">
            <div class="job_type_item" @click="selectJD('asd123')">
                <div class="left_img">
                    <img :src="suanfaIcon" class="iconImg">
                </div>
                <div class="right_text_btn">
                    <div class="job_title">算法工程师</div>
                    <div class="job_btn">立即查看<img :src="toRightImg" class="toRightImg"></div>
                </div>
            </div>
            <div class="job_type_item" @click="selectJD('asd124')">
                <div class="left_img">
                    <img :src="JavaIcon" class="iconImg">
                </div>
                <div class="right_text_btn">
                    <div class="job_title">Java工程师</div>
                    <div class="job_btn">立即查看<img :src="toRightImg" class="toRightImg"></div>
                </div>
            </div>
            <div class="job_type_item" @click="selectJD('asd125')">
                <div class="left_img">
                    <img :src="xzIcon" class="iconImg">
                </div>
                <div class="right_text_btn">
                    <div class="job_title">行政助理</div>
                    <div class="job_btn">立即查看<img :src="toRightImg" class="toRightImg"></div>
                </div>
            </div>
        </div>

        <div class="all_content_container" v-if="ifShowAllRes">
            <!--职责描述-->
            <div class="bottom_content_top">
                <div class="two">{{jobTitle}}</div>
                <div class="three">
                    <div class="zhize" v-html="zhizeText"></div>
                    <div class="yaoqiu" v-html="yaoqiuText"></div>
                </div>
                <div class="four">
                    <div class="btn_container">
                        <div class="left_btn" @click="watchEchart('查看留存漏斗')">查看留存漏斗</div>
                        <div class="right_btn" @click="watchEchart('简历来源分析')">简历来源分析</div>
                    </div>
                </div>
            </div>

            <!--行业背景综合能力-->
            <div class="hangye_nengli_container">
                <div class="hangye_nengli_left">
                    <div class="hangye_top">背景行业</div>
                    <div class="hangye_bottom" id="beijingHangyeId"></div>
                </div>
                <div class="hangye_nengli_right">
                    <div class="hangye_top">综合能力</div>
                    <div class="hangye_bottom" id="zongheNenliId"></div>
                </div>
            </div>

            <!--搜索出的结果部分-->
            <div class="bottom_content_bot">
                <div class="enginer_container" v-for="(item,index) in resumeList" :key="index" @click="goResumeDetail(item)">


                    <div class="enginer_left">
                        <div class="basic_info" style="color:#121C33;font-weight: 600;">
                            <div>{{item.name}}</div><span>&nbsp;|&nbsp;</span>
                            <div>{{item.education}}</div><span>&nbsp;|&nbsp;</span>
                            <div>{{item.workingYears}}年工作经验</div>
                        </div>
                        <div class="work_exp1" v-for="(expItem,index) in item.describe.split(',')" :key='index'>
                            <div>{{expItem.split('&')[1]}}</div><span>&nbsp;|&nbsp;</span>
                            <div>{{expItem.split('&')[3]}}</div>
                        </div>
                        <div class="key_word" style="margin-top:28px" ref="keyWordItem">
                            <div v-for="(keyItem,index) in item.keyword.split(' ')" :key="index">{{keyItem}}</div>
                        </div>
                    </div>

                    <div class="enginer_right">
                        <div class="match_score_container">
                            <div class="matchScore_container">
                                <div class="score_text">{{item.matchingScore}}</div>
                                <div class="score">匹配度</div>
                            </div>
                        </div>
                        <div class="job_Title">{{item.resumeName}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="echart_img_container" v-if="ifShowEchart">
        <div class="echart_content">
            <div class="echart_title">{{echartTitle}}</div>
            <div class="echart">
                <img :src="echartImg" class="echartImg">
            </div>
            <span class="close" @click="closeModel">X</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
        JobList: [
            {
                value: 'asd123',
                label: '算法工程师'
            },
            {
                value: 'asd124',
                label: '高级Java工程师'
            },
            {
                value: 'asd125',
                label: '行政助理'
            }
        ],
        jobSelectValue:'asd123',
        jobContent:`岗位职责：
                    <br>
                    1、协助研究新算法，改进现有的算法；
                    <br>
                    2、协助研究并实现摄像机图像的智能分析算法与ISP算法；
                    <br>
                    3、协助处理数据，需要进行一定量的信息检索、数据挖掘；
                    <br>
                    4、协助编写设计文档以及说明文档；
                    <br>
                    5、熟悉公司产品，使用算法来实现公司产品需求；
                    <br>
                    任职要求：
                    <br>
                    1、本科及以上学历，计算机、通信、电子、自动化等相关专业；
                    <br>
                    2、一年以上机器视觉与图像处理行业项目开发经验；
                    <br>
                    3、熟练掌握图像处理算法原理，精通OpenCV，熟悉Halcon等视觉算法库及工具；
                    <br>
                    4、精通C++/C#编程语言；
                    <br>
                    5、对图像识别算法有深刻理解及应用经验优先；
                    <br>
                    6、具有强的协调沟通能力、分析解决问题能力及团队合作精神；
                    <br>
                    7、熟悉神经网络、支持向量机、深度学习等优先考虑；
                    <br>
                    8、 熟悉主流的机器学习算法，能够熟练使用深度学习TensorFlow、Caffe等深度学习框架。`,
        resumeList:[],
        ifShowResult:false,
        avatarImg:require('../../assets/images/JobFile/avatar.png'),
        suanfaZhizeText:`岗位职责：
                        <br>
                        1、协助研究新算法，改进现有的算法；
                        <br>
                        2、协助研究并实现摄像机图像的智能分析算法与ISP算法；
                        <br>
                        3、协助处理数据，需要进行一定量的信息检索、数据挖掘；
                        <br>
                        4、协助编写设计文档以及说明文档；
                        <br>
                        5、熟悉公司产品，使用算法来实现公司产品需求；`,
        suanfaYaoqiuText:`任职要求：
                        <br>
                        1、本科及以上学历，计算机、通信、电子、自动化等相关专业；
                        <br>
                        2、一年以上机器视觉与图像处理行业项目开发经验；
                        <br>
                        3、熟练掌握图像处理算法原理，精通OpenCV，熟悉Halcon等视觉算法库及工具；
                        <br>
                        4、精通C++/C#编程语言；
                        <br>
                        5、对图像识别算法有深刻理解及应用经验优先；
                        <br>
                        6、具有强的协调沟通能力、分析解决问题能力及团队合作精神；
                        <br>
                        7、熟悉神经网络、支持向量机、深度学习等优先考虑；
                        <br>
                        8、 熟悉主流的机器学习算法，能够熟练使用深度学习TensorFlow、Caffe等深度学习框架。`,
        javaZhizeText:`岗位职责：
                        <br> 
                        1、负责软件开发、核心代码编写、修改bug等工作；
                        <br> 
                        2、负责攻克技术研发中的难点与关键点；
                        <br> 
                        3、参与产品构思和架构设计；
                        <br> 
                        4、编写技术代码及文件，并对开发代码做妥善管理
                        <br> 
                        5、完成上级领导交办的其他工作。
                        <br>`,
        javaYaoqiuText:`任职要求：
                        <br> 
                        1、计算机或相关专业本科以上学历，4年以上Java开发工作经验； 
                        <br>
                        2、精通Java语言，代码编写规范，编程基础扎实，逻辑思维能力强；
                        <br> 
                        3、对JVM，多线程有深入理解及实际经验； 
                        <br>
                        4、深入理解设计模式，熟悉常见的数据结构和算法； 
                        <br>
                        5、有分布式系统开发设计经验，熟悉spring、spring boot、等开源框架；
                        <br> 
                        6、熟悉mysql数据库，redis等开发与优化； 
                        <br>
                        7、良好的学习能力，有激情，能承受较大压力。`,
        xingzhengZhizeText:`岗位职责：
                            <br> 
                            1、负责前台电话的接听和转接；
                            <br>  
                            2、负责来访客户的接待工作；
                            <br>  
                            3、负责收发公司信件、快递，订水等； 
                            <br> 
                            4、负责办公环境的维护及管理； 
                            <br> 
                            5、负责办公用品的采购、发放、管理； 
                            <br> 
                            6、上级交办的其他行政类工作。
                            <br>`,
        xingzhengYaoqiuText:`任职要求：
                            <br> 
                            1、大专学历， 行政类、英语或医疗专业优先，一年以上行政类工作经验； 
                            <br>
                            2、普通话标准，年龄24-28岁，形象气质佳；
                            <br> 
                            3、善于沟通，性格外向，工作积极主动；
                            <br> 
                            4、熟练操作word、excel等办公软件；
                            <br>
                            5、有驾照并熟练驾驶以及英语听说读写优秀者优先`,
        zhizeText:`岗位职责：
                    <br>
                    1、协助研究新算法，改进现有的算法；
                    <br>
                    2、协助研究并实现摄像机图像的智能分析算法与ISP算法；
                    <br>
                    3、协助处理数据，需要进行一定量的信息检索、数据挖掘；
                    <br>
                    4、协助编写设计文档以及说明文档；
                    <br>
                    5、熟悉公司产品，使用算法来实现公司产品需求；`,
        yaoqiuText:`任职要求：
                    <br>
                    1、本科及以上学历，计算机、通信、电子、自动化等相关专业；
                    <br>
                    2、一年以上机器视觉与图像处理行业项目开发经验；
                    <br>
                    3、熟练掌握图像处理算法原理，精通OpenCV，熟悉Halcon等视觉算法库及工具；
                    <br>
                    4、精通C++/C#编程语言；
                    <br>
                    5、对图像识别算法有深刻理解及应用经验优先；
                    <br>
                    6、具有强的协调沟通能力、分析解决问题能力及团队合作精神；
                    <br>
                    7、熟悉神经网络、支持向量机、深度学习等优先考虑；
                    <br>
                    8、 熟悉主流的机器学习算法，能够熟练使用深度学习TensorFlow、Caffe等深度学习框架。`,
        
        suanfaIcon:require('../../assets/images/JobFile/suanfaIcon.png'),
        JavaIcon:require('../../assets/images/JobFile/JavaIcon.png'),
        xzIcon:require('../../assets/images/JobFile/xzIcon.png'),
        toRightImg:require('../../assets/images/JobFile/toRight.png'),
        jobTitle:'算法工程师',
        jobId:'asd123',
        ifShowAllRes:false,
        echartTitle:'',
        ifShowEchart:false,
        echartImg:''
    };
  },
  methods: {
        goHezuo(){
            this.$router.push({
                path:'/zixun'
            });
        },
        selectJD(val){
            this.ifShowAllRes = true;
            if(val == 'asd123'){
                this.zhizeText = this.suanfaZhizeText;
                this.yaoqiuText = this.suanfaYaoqiuText;
                this.jobTitle = '算法工程师';
            }
            else if(val == 'asd124'){
                this.zhizeText = this.javaZhizeText;
                this.yaoqiuText = this.javaYaoqiuText;
                this.jobTitle = '高级Java工程师';
            }
            else if(val == 'asd125'){
                this.zhizeText = this.xingzhengZhizeText;
                this.yaoqiuText = this.xingzhengYaoqiuText;
                this.jobTitle = '行政助理';
            }
            this.jobId = val;
            this.getJobList();
            this.$nextTick(()=>{
                this.initLeiDaMap();
            });
        },
        getJobList(){
            let jobId = this.jobId;
            this.$axios({
                method: "get", 
                url: window.config.url+"/ai/resume/getResumeByKeyword?postId="+jobId
            }).then(res => {
                if (res.data.code == 200000) {
                    this.ifShowResult = true;
                    this.resumeList=res.data.data; 
                    this.$nextTick(()=>{
                        var keyItemDomFn = this.$refs.keyWordItem || [];
                        for(var i = 0;i < keyItemDomFn.length;i++){
                            var keyItemDomSon = keyItemDomFn[i].children;
                            var colorArr = ['rgba(255,193,13,0.80)',' rgba(254, 85, 96,0.8)','rgba(19, 191, 193,0.8)','rgba(0, 194, 255,0.8)'];
                            for(var j = 0;j < keyItemDomSon.length;j++){
                                for(var k = 0;k < colorArr.length;k++){
                                    if(j == k){
                                        keyItemDomSon[j].style = `background:${colorArr[k]}`;
                                    }
                                }
                            }
                        }
                    }); 
                }
            }).catch(err => {
                console.log(err);
            });
        },
        initLeiDaMap(){
            var echarts = require("echarts");
            //行业背景部分
            var hangyeChart = echarts.init(document.getElementById('beijingHangyeId'));
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
                        color:'#1890FF'
                    },
                    name: '行业背景',
                    type: 'radar',
                    areaStyle:{
                        color:'#ebf1e4'
                    },
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
            var nengliChart = echarts.init(document.getElementById('zongheNenliId'));
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
                        color:'#1890FF'
                    },
                    name: '综合能力',
                    type: 'radar',
                    areaStyle:{
                        color:'#ebf1e4'
                    },
                    data: [
                        {
                            value: [parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000),parseInt(Math.random()*10000)],
                            name: '综合能力'
                        }
                    ]
                }]
            };
            nengliChart.setOption(nengliOption);
        },
        goResumeDetail(item){
            this.$router.push({
                path:'/resumeDetails',
                query:{
                    params:item
                }
            });
        },
        watchEchart(arg){
            if(arg == '查看留存漏斗'){
                this.echartImg = require('../../assets/images/JobFile/loudouFx.png');
            }
            else if(arg == '简历来源分析'){
                this.echartImg = require('../../assets/images/JobFile/jianliLy.png');
            }
            this.ifShowEchart = true;
            this.echartTitle = arg;
        },
        closeModel(){
            this.ifShowEchart = false;
        }
  }
};
</script>
<style scoped lang='less'>
.resumeList_container{
    flex: 1;
    .banner_container{
        width: 100%;
        height: 350px;
        background-image: url('../../assets/images/JobFile/banner.png');
        background-size: cover;
        background-position: center;
        padding-top: 81px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        .banner_content{
            width: 1200px;
            .banner_title{
                font-family: PingFangSC-Medium;
                font-size: 30px;
                color: #FFFFFF;
                margin-bottom: 15px;
            }
            .banner_desc{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                line-height: 28px;
            }
            .banner_btn{
                margin-top: 54px;
                background: #03A971;
                border-radius: 3px;
                width: 120px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .choice_job_btn_container{
        width: 100%;
        min-height: calc(910px - 350px);
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color:#f5f6f7;
        .tuijian_title{
            padding-top: 50px;
            box-sizing: border-box;
            font-family: PingFangSC-Regular;
            font-size: 30px;
            color: #121C33;
            margin-bottom: 30px;
        }
        .job_type_item_container{
            width: 1200px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            .job_type_item{
                width: 380px;
                height: 130px;
                display: flex;
                align-items: center;
                padding-left: 40.1px;
                box-sizing: border-box;
                background-color: #FFFFFF;
                .left_img{
                    width: 99.8px;
                    height: 99.8px;
                    margin-right: 20.1px;
                    .iconImg{
                        width: 100%;
                    }
                }
                .right_text_btn{
                    flex: 1;
                    .job_title{
                        width: 100%;
                        margin-bottom: 15px;
                        font-family: PingFangSC-Semibold;
                        font-size: 18px;
                        color: #121C33;
                        font-weight: 550;
                    }
                    .job_btn{
                        width: 86px;
                        height: 28px;
                        border: 1px solid #03A971;
                        border-radius: 3px;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #03A971;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .toRightImg{
                            width: 14px;
                            margin-left: 5px;
                        }
                    }
                }
            }
            .job_type_item:hover{
                cursor: pointer;
                background: #FFFFFF;
                border: 1px solid #F2F4F7;
                box-shadow: 0 2px 16px 0 rgba(184,190,204,0.50);
            }
        }

        .all_content_container{
            .bottom_content_top{
                width: 1200px;
                background: #FFFFFF;
                padding: 53px 60px;
                box-sizing: border-box;
                margin-bottom: 35px;
                .two{
                    padding-left: 40px;
                    box-sizing: border-box;
                    text-align: left;
                    margin-bottom: 10px;
                    width: 100%;
                    font-family: PingFangSC-Semibold;
                    font-size: 18px;
                    color: #121C33;
                    font-weight: 550;
                }
                .three{
                    padding-left: 60px;
                    display: flex;
                    margin-bottom: 60px;
                    .zhize{
                        width: 360px;
                        margin-right: 100px;
                        text-align: justify;
                    }
                    .yaoqiu{
                        width: 459px;
                        text-align: justify;
                    }
                }
                .four{
                    display: flex;
                    justify-content: center;
                    .btn_container{
                        width: 300px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .left_btn,.right_btn{
                            width: 140px;
                            height: 42px;
                        }
                        .left_btn{
                            border: 1px solid #03A971;
                            border-radius: 3px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 16px;
                            color: #03A971;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        .right_btn{
                            background: #03A971;
                            border-radius: 3px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 16px;
                            color: #FFFFFF;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                    }
                }


                .job_desc_content{
                    width: 100%;
                    height: 300px;
                    overflow: hidden;
                }
                .job_desc_content:hover{
                    overflow: auto !important;
                }
                .job_desc_content::-webkit-scrollbar{
                    width: 5px;     
                    height: 5px;
                }
                .job_desc_content::-webkit-scrollbar-thumb{
                    border-radius: 5px;
                    background: #999999;
                    height: 40px;
                }
                .job_desc_content::-webkit-scrollbar-track
                {
                    border-radius: 0;
                    background: white;
                }
            }

            .hangye_nengli_container{
                width: 1200px;
                background: #FFFFFF;
                padding: 40px 40px 25px 40px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
                .hangye_nengli_left,.hangye_nengli_right{
                    width: 540px;
                    .hangye_top{
                        width: 100%;
                        font-family: PingFangSC-Medium;
                        font-size: 18px;
                        color: #121C33;
                        margin-bottom: 18.5px;
                        font-weight: 550;
                    }
                    .hangye_bottom{
                        width: 100%;
                        height: 443.5px;
                    }
                }
            }

            .bottom_content_bot{
                width: 1200px;
                background: #FFFFFF;
                padding: 50px 40px;
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                justify-content: space-between;
                margin-bottom: 40px;
                .enginer_container{
                    background: #FFFFFF;
                    border: 1px solid #F2F4F7;
                    padding: 25px 46px 26px 24px;
                    box-sizing: border-box;
                    width: 49%;
                    line-height: 28px;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-between;
                    .enginer_left{
                        margin-right: 35px;
                    }
                    .enginer_right{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .match_score_container{
                            width: 96px;
                            height: 96px;
                            background-image: url('../../assets/images/JobFile/Ring.png');
                            background-size: cover;
                            background-position: center;
                            position: relative;
                            margin-bottom: 10px;
                            .matchScore_container{
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                .score_text{
                                    font-size: 36px;
                                    color: #03A971;
                                    text-align: center;
                                    line-height: 24px;
                                }
                                .score{
                                    font-size: 12px;
                                    color: #03A971;
                                    text-align: center;
                                    line-height: 24px;
                                }
                            }
                        }
                        .job_Title{
                            width: 100%;
                            font-size: 18px;
                            text-align: center;
                        }
                    }
                    .match_score_container,.basic_info,.work_exp1,.work_exp2,.key_word{
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        display: flex;
                        font-size: 14px;
                        span{
                            font-size: 13px;
                        }
                    }
                    .key_word{
                        div{
                            margin-right: 10px;
                            padding: 0 10px;
                            border-radius: 2px;
                            font-size: 12px;
                            color: #FFFFFF;
                            text-align: center;
                            line-height: 24px;
                        }
                    }
                }
                .enginer_container:hover{
                    cursor: pointer;
                    background: #FFFFFF;
                    border: 1px solid #F2F4F7;
                    box-shadow: 0 2px 16px 0 rgba(184,190,204,0.50);
                }
            }
        }
    }
    .echart_img_container{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.60);
        display: flex;
        align-items: center;
        justify-content: center;
        .echart_content{
            width: 800px;
            height: 580px;
            background-color: #FFFFFF;
            padding-top: 50px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .echart_title{
                margin-bottom: 27px;
                font-family: PingFangSC-Regular;
                font-size: 18px;
                color: #121C33;
                letter-spacing: 0;
                text-align: center;
            }
            .echart{
                width: 680px;
                .echartImg{
                    width: 100%;
                }
            }
            .close{
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 22px;
                color: gray;
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
