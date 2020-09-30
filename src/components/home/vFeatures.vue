<template>
  <div>
      <div class="features_container">
          <!-- <div class="features_title">
              <div class="cn_title">{{aitext.cntitle}}</div>
              <div class="en_title">{{aitext.entitle}}</div>
          </div> -->
          <div class="dashuj2" style="width:1200px;margin:auto"><img src="../../assets/images/search/AiTitle.png" alt=""></div>
          <div class="features_point">
              <div class="features_point1">
                <div class="features_point_container" v-for="(item,index) in aitext.featur" :key="index"  :class="{'point_active':changeIndex==item.id}" @click="goFeatureList(item,index)">
                    <div class="pic"> 
                        <img :src="item.img" alt="" v-if="changeIndex==item.id">
                        <img :src="item.img1" alt="" v-else>
                    </div>
                    <div>{{item.Text}}</div>
                </div>
              </div>
              <div class="features_content" v-show="itemContent">
                  <div class="picImg"><img :src="itemContent.img" alt=""></div>
                  <div class="featuresList">
                      <div class="features_li" v-for="(item,index) in itemContent.list" :key="index" @mouseover="showList(item,index)">
                            <div class="left">
                                <p class='title'>{{item.title}}</p>
                                <p class='desc'>{{item.desc}}</p>
                            </div>
                            <div class="right"  v-show="listIndex==index">
                                <div class="use" @click="goMange"><img src="../../assets/images/search/use.png" alt=""></div>
                                <div class="more"><img src="../../assets/images/search/more.png" alt=""></div>
                            </div>
                       </div> 
                  </div>
              </div>
              <div class="features_point1">
                <div class="features_point_container" v-for="(item,index) in aitext.featur1" :key="index"   @click="goFeatureList1(item,index)" :class="{'point_active':changeIndex==item.id}">
                    <div class="pic"> 
                        <img :src="item.img" alt="" v-if="changeIndex==item.id">
                        <img :src="item.img1" alt="" v-else>
                    </div>
                    <div>{{item.Text}}</div>
                </div>
              </div>
              <div class="features_content" v-if="itemContent1">
                  <div class="picImg"><img :src="itemContent1.img" alt=""></div>
                  <div class="featuresList">
                      <div class="features_li" v-for="(item,index) in itemContent1.list" :key="index" @mouseover="showList(item,index)">
                            <div class="left">
                                <p class='title'>{{item.title}}</p>
                                <p class='desc'>{{item.desc}}</p>
                            </div>
                            <div class="right"  v-show="listIndex==index">
                                <div class="use" @click="goMange"><img src="../../assets/images/search/use.png" alt=""></div>
                                <div class="more"><img src="../../assets/images/search/more.png" alt=""></div>
                            </div>
                       </div> 
                  </div>
              </div>
          </div>
           <div class="aiBtn"><img src="../../assets/images/search/anniu1.png" alt="" @click="jump1(0)"></div>
           <div class="dashuj2" style="width:1200px;margin:auto"><img src="../../assets/images/search/dashujTitle.png" alt=""></div>
           <div class="dashuj">
               <div class="dashuj1" style="width:1200px;margin:auto">
                   <img src="../../assets/images/search/dashuj.png" alt="">
               </div>
            </div>
          <div class="fea_content">
             <div class="aiBtn"><img src="../../assets/images/search/anniu2.png" alt="" @click="jump1(1)"></div>
             <img src="../../assets/images/search/dashuj23.png" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import vFnintro from './fnIntro';
export default {
  data () {
    return {
        listIndex:null,
        changeIndex:0,
        itemContent:'',
        itemContent1:'',
        aitext:{
            cntitle:'AI助力产品加速',
            entitle:'提供丰富完善的AI产品体系，赋能产业升级',
            featur:[
                {
                    Text:'自然语言处理',
                    id:0,
                    img1:require('@/assets/images/search/icon_nlp_951.png'),
                    img:require('@/assets/images/home/ai1.png'),
                    content:{
                        img:require('@/assets/images/search/yuyan.png'),
                        list:[
                            {
                                title:"语言处理基础技术",
                                desc:"领先的NLP基础模块能力，涵盖词、短语、句子等不同粒度的底层能力",
                            },
                            {
                                title:"语言处理应用技术",
                                desc:"以多场景技术应用为导向，让您的产品更好地理解语言、理解用户",
                            },
                            {
                                title:"机器翻译",
                                desc:"结合了神经机器翻译和统计机器翻译的优点，从大规模双语语料库自动学习翻译知识",
                            },
                            {
                                title:"文本审核",
                                desc:"一站式检测文本内容，净化网络环境，为您的应用提供更可靠的内容安全保障",
                            },
                        ]
                    }
                },
                {
                    Text:'语音技术',
                    id:1,
                    img1:require('@/assets/images/search/icon_speech_technology_95.png'),
                    img:require('@/assets/images/home/ai2.png'),
                    content:{
                        img:require('@/assets/images/search/yuyin.png'),
                        list:[
                            {
                                title:"语音识别",
                                desc:"赋予产品“能听、会说、懂你”式的智能人机交互体验",
                            },
                            {
                                title:"语音扩展",
                                desc:"基于智能语音识别基础，提供具像化应用场景落地",
                            },
                        ]
                    }
                },
                {
                    Text:'文字识别',
                    id:2,
                    img1:require('@/assets/images/search/icon_basic_data_95.png'),
                    img:require('@/assets/images/home/behavior1.png'),
                    content:{
                        img:require('@/assets/images/search/wenzi.png'),
                        list:[
                            {
                                title:"通用文字识别",
                                desc:"提供多场景、多语种、高精度的整图文字检测和识别服务",
                            },
                            {
                                title:"卡证文字识别",
                                desc:"提供对身份证、银行卡等常用卡片及证照的文字内容进行结构化识别服务",
                            },
                            {
                                title:"票据文字识别",
                                desc:"提供对增值税普票、专票、电子发票所有30个字段进行结构化识别服务",
                            },
                            {
                                title:"汽车场景文字识别",
                                desc:"提供对汽车购买及使用过程中所涉及的各类卡证、票据进行结构化识别服务",
                            },
                            {
                                title:"教育场景文字识别",
                                desc:"提供对教育所涉及的作业及试卷中公式、手写文字等进行识别服务",
                            },
                        ]
                    }
                },
                {
                    Text:'图像识别',
                     id:3,
                    img1:require('@/assets/images/search/icon_image_recognition_95.png'),
                    img:require('@/assets/images/home/ai3.png'),
                    content:{
                        img:require('@/assets/images/search/tuxiang.png'),
                        list:[
                            {
                                title:"图像识别",
                                desc:"精准识别超过十万种物体和场景",
                            },
                            {
                                title:"图像审核",
                                desc:"准确识别图片的涉黄、涉暴涉恐、政治敏感、微商广告、恶心等内容",
                            },
                            {
                                title:"图像搜索",
                                desc:"以图搜图，在指定图库中搜索出相同或相似的图片",
                            },
                            {
                                title:"车辆分析",
                                desc:"准确识别图像中的车辆相关信息，提供车型识别、车辆检测等能力",
                            },
                            {
                                title:"图像效果增强",
                                desc:"提供对质量较低的图片进行去雾、对比度增强等服务",
                            },
                        ]
                    }
                },
            ],
            featur1:[
                {
                    Text:'视频技术',
                    id:4,
                    img1:require('@/assets/images/search/icon_video_technology_95.png'),
                    img:require('@/assets/images/home/ai4.png'),
                    content:{
                        img:require('@/assets/images/search/shipin.png'),
                        list:[
                            {
                                title:"视频内容识别",
                                desc:"提供全面的音视频内容结构化，让“采、编、存、发”流程更简单",
                            },
                            {
                                title:"视频内容分析",
                                desc:"对视频进行智能分析，输出视频内容的泛标签",
                            },
                            {
                                title:"视频内容审核",
                                desc:"针对视频内容进行色情、暴恐等多维智能审核",
                            },
                            {
                                title:"视频处理",
                                desc:"智能、强悍、全面的多媒体数据处理服务",
                            },
                        ]
                    }
                },
                {
                    Text:'人脸与人体识别',
                    id:5,
                    img1:require('@/assets/images/search/icon_body_recognition_95.png'),
                    img:require('@/assets/images/home/ai5.png'),
                    content:{
                        img:require('@/assets/images/search/renlian.png'),
                        list:[
                            {
                                title:"人脸识别",
                                desc:"包含人脸检测与属性分析、人脸对比、人脸搜索、活体检测等能力",
                            },
                            {
                                title:"人体分析",
                                desc:" 准确识别图像中的人体相关信息",
                            },
                            {
                                title:"人像特效",
                                desc:"结合人脸检测、人像分割等技术，为用户提供与众不同的特效处理",
                            },
                            {
                                title:"行为分析",
                                desc:"准确识别场景中的特殊事件，实时高效的响应突发情况",
                            },
                        ]
                    }
                },
                {
                    Text:'智能算法',
                    id:6,
                    img1:require('@/assets/images/search/icon_algorithm_service_957.png'),
                    img:require('@/assets/images/search/icon_algorithm_service_957.png'),
                    //img:require('@/assets/images/search/icon_algorithm_service_953.png'),
                    content:null
                },
                {
                    Text:'AI应用大全',
                    id:7,
                    img1:require('@/assets/images/search/icon_behaviour_data_95.png'),
                    img:require('@/assets/images/search/icon_behaviour_data_95.png'),
                    //img:require('@/assets/images/search/icon_behaviour_data_953.png'),
                    content:null
                },
            ],
        },
    }
  },
  components:{
      vFnintro
  },
  created(){
      this.itemContent=this.aitext.featur[0].content
  },
  methods:{
    goMange(){
      window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
    },
    jump1(num){
        var num = num;
        let routerUrl = this.$router.resolve({
            path:'/yanshiDetail',
            query:{
                top:num
            }
        });
        window.open(routerUrl.href,'_blank')
    },
    showList(item,index){
        this.listIndex=index;
    },
    goFeatureList(item,index){
        this.changeIndex=item.id;
        this.itemContent=item.content;
        this.itemContent1='';
        this.listIndex=null;
    },
    goFeatureList1(item,index){
        this.changeIndex=item.id;
        this.itemContent1=item.content;
        this.itemContent='';
        this.listIndex=null;
    },
    fnClearTimer(arg){
        this.ifShowIntro = arg;
        this.ifShowIntroBottom = arg;
        this.showTraBottom0 = arg;
        this.showTra0 = arg;
        this.showTra1 = arg;
        this.showTra2 = arg;
        this.showTra3 = arg;
    },
    goFeatureDetail(e){
        if(this.type ==1){
            this.$router.push({
                path:'/obserStarData',
                query:{
                    featurType:e.featurType,
                    type:3
                }
            });
        }
    },
  }
}
</script>

<style scoped lang='less'>
.features_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .aiBtn{
        width:200px;
            margin:50px auto;
            cursor: pointer;
    }
    .dashuj{
        width:100%;
        background: #2B303B;
    }
    img{
        width:100%;
        display:block;
    }
    .fea_content{
        width:1200px;
        margin:auto;
       
    }
    .features_title{
        width: 1000px;
        margin-top:50px;
        .cn_title{
            font-size: 36px;
            color: #1F2D3D;
            text-align: center;
        }
        .en_title{
            font-size: 22px;
            color: #B8BECC;
            text-align: center;
        }
    }
    .features_point{
         width: 100%;
          .features_content{
            width:100%;
            margin:auto;
            background: url("../../assets/images/search/beijing.png") no-repeat center center;
            padding:40px 0;
            .featuresList{
                    margin-top:10px;
                    width:1200px;
                    margin:auto;
                    display: flex;
                    flex-wrap: wrap;
                    padding-top:20px;
                    .features_li{
                        // background: url("../../assets/images/search/beijing.png") no-repeat;
                        width:50%;
                        display: flex;
                        justify-content: space-between;
                        padding:20px;
                        margin-bottom: 20px;
                        &:hover{
                            background:#fff;
                        }
                        .left{
                            .tilte{
                                font-size: 18px;
                                color: #3D4966;
                            }
                            .desc{
                                font-size: 14px;
                                color: #7A8499;
                                line-height: 22px;
                            }
                        }
                        .right{
                            width:150px;
                            img{
                                width:100%;
                                display: block;
                            }
                            .use{
                                width:100px;
                                margin-bottom: 10px;
                                float:right;
                                cursor: pointer;
                            }
                            .more{
                                width:100px;
                                float:right;
                                cursor: pointer;
                            }
                        }
                    }
                }
            .picImg{
                width:1200px;
                margin:auto;
                img{
                    width:100%;
                    display: block;
                }
                
               
            }
        }
    .features_point1{
        width: 1200px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin:auto;
        .features_point_container{
            cursor:pointer;
            width: 25%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 20px;
            margin-top: 20px;
             color: #121C33;
            &.point_active{
                color: #03A971;
            }
            .pic{
                width: 80px;
                margin-bottom: 10px;
                 img{
                    width: 100%;
                    display: block;
                }
            }
            div:nth-child(2){
                margin-bottom: 15px;
                font-size: 20px;
            }
        }
        // .features_point_container:hover{
        //     cursor: pointer;
        //     background: #FFFFFF;
        //     div:nth-child(2){
        //         font-size: 22px;
        //         color: #03A971;
        //     }
        // }
        .guanxing_xingwei:hover{
            box-shadow:  0 2px 35px 0 rgba(192,204,218,0.70);
            border: none !important;
        }
    }
    }
}
</style>
