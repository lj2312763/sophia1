<template>
  <div>
      <div class="features_container" v-if="type == 0">
          <div class="features_title">
              <div class="cn_title">{{featurData.cntitle}}</div>
              <div class="en_title">{{featurData.entitle}}</div>
          </div>
          <div class="features_point" ref="point1">
              <div class="features_point_container" ref="features1" v-for="(item,index) in beforeFour" :key="index" @mouseover="changeStyleData(index)"  @click="goFeatureList(index)">
                  <div class="pic"> <img :src="item.img" alt=""></div>
                  <div>{{item.Text}}</div>
                  <div>{{item.desc}}</div>
                  <div class="bottom" v-if="(index == 0) && showTra0"></div>
                  <div class="bottom" v-else-if="(index == 1) && showTra1"></div>
                  <div class="bottom" v-else-if="(index == 2) && showTra2"></div>
                  <div class="bottom" v-else-if="(index == 3) && showTra3"></div>
              </div>
          </div>
          <vFnintro v-show="ifShowIntro" :introData='introData' @clearTimer='fnClearTimer' :typeSymbol='typeSymbol'></vFnintro>
          <div class="features_point">
                <div class="features_point_container" ref="features2" v-for="(item,index) in afterThree" :key="index" @mouseover="changeStyleDataBottom(index)" @click="goFeatureList1(index)">
                    <div class="pic"> <img :src="item.img" alt=""></div>
                    <div>{{item.Text}}</div>
                    <div>{{item.desc}}</div>
                    <div class="bottom" v-if="(index == 0) && showTraBottom0"></div>
                </div>
           </div>
            <vFnintro v-show="ifShowIntroBottom" :introData='introDataBottom' @clearTimer='fnClearTimer'></vFnintro>
      </div>
      <div class="features_container" v-else>
          <div class="features_title">
              <div class="cn_title">{{featurData.cntitle}}</div>
              <div class="en_title">{{featurData.entitle}}</div>
          </div>
          <div class="features_point" ref="point">
              <div class="features_point_container guanxing_xingwei" v-for="(item,index) in featurData.featur" :key="index" @click="goFeatureDetail(item)">
                  <div class="pic"> <img :src="item.img" alt=""></div>
                  <div>{{item.Text}}</div>
                  <div>{{item.desc}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import vFnintro from './fnIntro';
export default {
  props:{
      featurData:{
        type:Object,
        required:true
      },
      type:{
          type:Number,
          required:true
      }
  },
  data () {
    return {
        beforeFour:[],
        afterThree:[],
        ifShowIntro:false,
        ifShowIntroBottom:false,
        showTra0:false,
        showTra1:false,
        showTra2:false,
        showTra3:false,
        showTraBottom0:false,
        introData:[],
        introDataBottom:[],
        typeSymbol:'',
        beforeFourIntroData0:[
            {
                title:'词法分析',
                path:"/aiSmartAppDetail",
                desc:'基于大数据和用户行为的分词、词性标注、命名实体识别，定位基本语言元素，消除歧义，支撑自然语言的准确理解'
            },
            {
                title:'句法分析',
                path:"/aiSentence",
                desc:'基于大数据自动确定句子内“主谓宾定状补”等结构元素'
            },
            {
                title:'句式识别',
                path:"/aiSyntax",
                desc:'基于大数据自动确定句子内的句式组成结构元素'
            },
            {
                title:'依存句法分析',
                 path:"/aiDepenpars",
                desc:'基于神经网络的高性能依存句法分析器;基于ArcEager转移系统的柱搜索依存句法分析器'
            },
            {
                title:'关键词抽取',
                 path:"/aiKeyword",
                desc:'基于大数据进而识别并提取出句子的关键词'
            },
        ],
        beforeFourIntroData1:[
            {
                title:'短语音识别',
                path:'/shortSpeechRecoDetail',
                desc:'将60秒以内的语音精准识别为文字，可适用于手机语音输入、智能语音交互、语音指令、语音搜索等短语音交互场景'
            },
            {
                title:'实时语音识别',
                desc:'将音频流实时识别为文字，并返回每句话的开始和结束时间，适用于长句语音输入、音视频字幕、会议等场景'
            },
            {
                title:'录音文件识别',
                desc:'可大批量低成本的将8k采样率电话录音文件识别为文本'
            },
            {
                title:'语音唤醒',
                desc:'支持特定语音指令唤醒，唤醒的同时执行指令操作，轻量级，低功耗，可自定义设置多个唤醒词，为您的应用打造自然流畅的对话'
            },
            {
                title:'语音合成',
                desc:'基于业界领先的深度神经网络技术，提供高度拟人、流畅自然的语音合成服务，让您的应用、设备开口说话，更具个性'
            },
        ],
        beforeFourIntroData2:[
            {
                title:'卡证文字识别',
                desc:'提供对身份证、银行卡、营业执照等常用卡片及证照的文字内容进行结构化识别的服务'
            },
            {
                title:'票据文字识别',
                desc:'提供对财税报销、金融保险等场景所涉及的各类票据进行结构化识别的服务'
            },
            {
                title:'汽车场景文字识别',
                desc:'提供对汽车购买及使用过程中所涉及的各类卡证、票据进行结构化识别的服务'
            },
            {
                title:'其他文字识别',
                desc:'提供对表格、手写文字、网络图片、数字、二维码等内容进行识别的服务'
            }
        ],
        beforeFourIntroData3:[
            {
                title:'视频内容分析',
                desc:'通过多维AI技术，对视频进行智能分析，输出视频内容的泛标签，从而提高搜索准确度和用户推荐视频的曝光量'
            },
            {
                title:'视频内容审核',
                desc:'针对视频内容进行多维智能审核，其中包括色情、暴恐、政治敏感、广告、自定义黑库等'
            }
        ],
        afterThreeIntroData0:[
            {
                title:'人脸检测',
                desc:'识别图像中是否有人脸并给出人脸区域，进行人脸检测后返回检测到的人脸矩形框坐标'
            },
            {
                title:'人脸对比',
                desc:'基于用户输入的两张图片，可检测两张图片中的人脸，并挑选两张图片的最大人脸进行比较，判断是否是同一人'
            },
            {
                title:'人脸搜索',
                desc:'基于输入的图像或视频，与注册库比对，实现1：N的人脸识别。适用于人脸登录、VIP人脸识别等无需刷卡验证的场景。'
            },
            {
                title:'活体检测',
                desc:'识别业务场景中的用户是否为「真人」，有效抵御照片、视频、3D模具等作弊行为，保障业务安全性'
            }
        ],
    }
  },
  components:{
      vFnintro
  },
  created(){
      if(this.type === 0){
        this.beforeFour = this.featurData.featur.slice(0,4);
        this.afterThree = this.featurData.featur.slice(4,8);
      }
  },
  mounted(){
    this.setStyle();
    if(this.$refs && this.$refs.features2){
        var afterTeaturDom = this.$refs.features2;
        for(var i = 0; i<afterTeaturDom.length;i++){
            afterTeaturDom[i].style = 'margin-top:-100px;';
        }
    }
  },
  updated(){
    if(this.$refs && this.$refs.features2){
        var afterTeaturDom = this.$refs.features2;
        for(var i = 0; i<afterTeaturDom.length;i++){
            afterTeaturDom[i].style = 'margin-top:-100px;';
        }
    }
  },
  methods:{
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
    setStyle(){
        if(this.type != 0){
            if(this.type == 1){
                var obserDom = this.$refs.point.childNodes;
                for(var i = 0;i< obserDom.length;i++){
                    obserDom[i].style='border: 1px solid #EBECF0;border-radius:3px;padding:45px 35px 24px 34px;';
                }
            }
            else if(this.type == 2){
                var obserDom = this.$refs.point.childNodes;
                for(var i = 0;i< obserDom.length;i++){
                    obserDom[i].style='height: 210px;margin-top:25px;padding-top: 35px;box-sizing: border-box;margin-bottom:45px';
                }
            }
            else{
                var arrDom = this.$refs.point.childNodes;
                arrDom[3].style='margin-right:0;';
            }
        }
        else{
            var arrDom = this.$refs.point1.childNodes;
            arrDom[3].style='margin-right:0;';
        }
        var arrFeatures = this.$refs.features1;
        if(this.$refs.introContant){
            this.$refs.introContant.style = 'margin-bottom:75px;';
        }
        if(arrFeatures){
            for(var i =0 ;i < arrFeatures.length;i++){
                arrFeatures[i].style = 'margin-bottom:35px;';
            }
        }
        if(this.$refs.introContant && this.$refs.introContant.childNodes){
            var arrIntroDom = this.$refs.introContant.childNodes;
            arrIntroDom[4].style='margin-right:0;';
            arrIntroDom[10].style='margin-right:0;';
        }
    },
    changeStyleData(index){
        var that = this;
        this.$refs.features1[index].style = 'box-shadow: none;margin-bottom: 35px;';
        this.ifShowIntro = true;
        if(index === 0){
            this.showTra0 = true;
            this.showTra1 = false;
            this.showTra2 = false;
            this.showTra3 = false;
            this.introData = this.beforeFourIntroData0;
            this.typeSymbol = 'yuyan';
        }
        else if(index === 1){
            this.showTra0 = false;
            this.showTra1 = true;
            this.showTra2 = false;
            this.showTra3 = false;
            this.introData = this.beforeFourIntroData1;
            this.typeSymbol = 'yuyin';
        }
        else if(index === 2){
            this.showTra0 = false;
            this.showTra1 = false;
            this.showTra2 = true;
            this.showTra3 = false;
            this.introData = this.beforeFourIntroData2;
            this.typeSymbol = 'tuxiang';
        }
        else{
            this.showTra0 = false;
            this.showTra1 = false;
            this.showTra2 = false;
            this.showTra3 = true;
            this.introData = this.beforeFourIntroData3;
            this.typeSymbol = 'shipin';
        }
    },
    changeStyleDataBottom(index){
        // this.$refs.features2[index].style = 'box-shadow: none;margin-bottom: 20px;';
        this.ifShowIntroBottom = true;
        if(index === 0){
            this.showTraBottom0 = true;
            this.introDataBottom = this.afterThreeIntroData0;
        }
        else if(index === 1){
            this.showTraBottom0 = false;
            this.introDataBottom = [];
            this.ifShowIntroBottom = false;
        }
        else{
            this.showTraBottom0 = false;
            this.introDataBottom = [];
            this.ifShowIntroBottom = false;
        }
    },
    goFeatureList(index){
        if(index == 0 || index == 1){
            this.$router.push({
                path:'/aiSmartAppList',
                query:{
                    type:1,
                    featurType:index
                }
            });
        }
        else if(index == 2){
            this.$router.push({
                path:'/textReocList',
                query:{
                    type:1
                }
            });     
        }
        else if(index == 3){
            this.$router.push({
                path:'/VideoRecoList',
                query:{
                    type:1
                }
            });     
        }
    },
    goFeatureList1(index){
        if(index == 0){
            this.$router.push({
                path:'/faceRecoList',
                query:{
                    type:1
                }
            });
        }
        else if(index == 1){
            this.$router.push({
                path:'/recommendDetail',
                query:{
                    type:1
                }
            });
        }
        else if(index == 2){
            this.$router.push({
                path:'/searchDetail',
                query:{
                    type:1
                }
            });
        }else{
            this.$router.push({
                path:'/opinionAnalysisDetail',
                query:{
                    type:1
                }
            });      
        }
    }
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
        width: 1000px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        .features_point_container{
            width: 18%;
            height: 310px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 20px;
            .pic{
                width: 95px;
                margin-bottom: 15px;
                 img{
                    width: 100%;
                    display: block;
                }
            }
            div:nth-child(2){
                margin-bottom: 15px;
                font-size: 22px;
                color: #121C33;
                margin-top: 10px;
            }
            div:nth-child(3){
                margin-bottom: 14px;
                font-size: 14px;
                color: #7A8499;
                text-align: justify;
                line-height: 24px;
            }
            .bottom{
                width: 0; 
                height: 0;
                border-width: 10px;
                border-style: solid;
                border-color: transparent transparent #F2F4F7 transparent;
            }
        }
        .features_point_container:hover{
            cursor: pointer;
            background: #FFFFFF;
            div:nth-child(2){
                font-size: 22px;
                color: #03A971;
            }
        }
        .guanxing_xingwei:hover{
            box-shadow:  0 2px 35px 0 rgba(192,204,218,0.70);
            border: none !important;
        }
    }
}
</style>
