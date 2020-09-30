<template>
<div>
    <div class="resumeList_container">
        <div class="resumeList">
            <div class="top_title">岗位匹配</div>
            <div class="bottom_content">

                <!--职位名称部分-->
                <div class="bottom_content_top">
                    <div class="one">
                        <div class="avatar_container">
                            <img :src="avatarImg" alt="" srcset="">
                        </div>
                        <div class="jobName_container">
                            <div class="job_name">职位名称</div>
                            <div class="job_select">
                                <Select v-model="jobSelectValue" @on-change='selectChange'>
                                    <Option v-for="item in JobList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="two">职位描述</div>
                    <div class="three">
                        <div class="zhize" v-html="zhizeText"></div>
                        <div class="yaoqiu" v-html="yaoqiuText"></div>
                    </div>
                    <div class="four">
                        <div class="btn" @click="searchJob">匹配</div>
                    </div>



                </div>

                <!--搜索出的结果部分-->
                <div class="bottom_content_bot" v-show="ifShowResult">
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
                    8、 熟悉主流的机器学习算法，能够熟练使用深度学习TensorFlow、Caffe等深度学习框架。`
    };
  },
  components: {
  },
  created() {
  },
  watch:{
  },
  mounted() {
    // this.searchJob();  去掉初始化数据
  },
  methods: {
    goResumeDetail(item){
        this.$router.push({
            path:'/resumeDetails',
            query:{
                params:item
            }
        });
    },
    selectChange(val){
        this.jobSelectValue = val;
        if(val == 'asd123'){
            this.zhizeText = this.suanfaZhizeText;
            this.yaoqiuText = this.suanfaYaoqiuText;
        }
        else if(val == 'asd124'){
            this.zhizeText = this.javaZhizeText;
            this.yaoqiuText = this.javaYaoqiuText;
        }
        else if(val == 'asd125'){
            this.zhizeText = this.xingzhengZhizeText;
            this.yaoqiuText = this.xingzhengYaoqiuText;
        }
    },
    searchJob(){
        var jobId = this.jobSelectValue;
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
    }
  }
};
</script>
<style scoped lang='less'>
.resumeList_container{
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #F7F8FA;  
    padding-top: 60px;
    padding-bottom: 40px;
    .resumeList{
        width: 1200px;
        .top_title{
            width: 100%;
            height: 95px;
            line-height: 95px;
            font-size: 30px;
            color: #FFFFFF;
            text-align: center;
            background-image: url('../../assets/images/JobFile/jobBanner.png');
            background-size: cover;
            background-position: center;
        }
        .bottom_content{
            width: 100%;
            // height: 520px;
            min-height: 520px;
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            margin-bottom: 30px;
            .bottom_content_top,.bottom_content_bot{
                width: 100%;
                height: 100%;
                background-color:#fff;
            }
            .bottom_content_top{
                padding: 53px 60px;
                box-sizing: border-box;
                margin-bottom: 35px;
                .one{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .avatar_container{
                        width: 104px;
                        height: 104px;
                        margin-right: 40px;
                        img{
                            width: 100%;
                        }
                    }
                    .jobName_container{
                        width: 360px;
                        .job_name{
                            width: 100%;
                            text-align: left;
                            font-size: 16px;
                            color: #333;
                            margin-bottom: 20px;
                        }
                    }
                }
                .two{
                    padding-left: 144px;
                    width: 100%;
                    text-align: left;
                    font-size: 16px;
                    color: #333;
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                .three{
                    padding-left: 144px;
                    display: flex;
                    margin-bottom: 30px;
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
                    padding-left: 144px;
                    .btn{
                        width: 140px;
                        background: #03A971;
                        border-radius: 3px;
                        padding: 10px 54px;
                        box-sizing: border-box;
                        font-size: 16px;
                        color: #FFFFFF;
                        text-align: center;
                    }
                    .btn:hover{
                        cursor: pointer;
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
            .bottom_content_bot{
                padding: 50px 40px;
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                justify-content: space-between;
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
            .bottom_content_bot:hover{
                overflow: auto !important;
            }
            .bottom_content_bot::-webkit-scrollbar{
                width: 5px;     
                height: 5px;
            }
            .bottom_content_bot::-webkit-scrollbar-thumb{
                border-radius: 5px;
                background: #999999;
                height: 40px;
            }
            .bottom_content_bot::-webkit-scrollbar-track
            {
                border-radius: 0;
                background: white;
            }
        }
    }
}
</style>
