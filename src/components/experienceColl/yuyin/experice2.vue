<template>
  <div>
    <!--语音合成-->
    <div class="featur_function_exper_container" v-if="routeId == '1.1.4'">
      <div class="featur_function_exper">
        <div class="type">
          <Select v-model="language" placeholder='中文' @on-change="changeLanguage" :disabled='isdisabled'>
              <Option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="subtitle">请输入一段文字：</div>
        <div class="operat_container">
            <div class="operat_left">
                <textarea v-model="inputText" maxlength="500" :disabled="isdisabled"></textarea>
                <div class="inputInfo">体验版本最多输入300个字</div>
            </div>
            <div class="operat_right">
                <div class="sex_container" ref="sexDom">
                    <div class="women_container" @click="checkSex(0)">
                        <div class="headImg">
                            <img :src="womenHeadImg">
                        </div>
                        <div class="intro">元元，温柔女生</div>
                    </div>
                    <div class="men_container" @click="checkSex(1)">
                        <div class="headImg">
                            <img :src="menHeadImg">
                        </div>
                        <div class="intro">小知，磁性男生</div>
                    </div>
                </div>
                <div class="volume">
                    <div>音量</div><Slider v-model="volume" :min='0' :max='100' :step='1' :disabled="isdisabled"></Slider><div>100</div>
                </div>
                <div class="speed_speech">
                    <div>语速</div><Slider v-model="speed" :min='-500' :max='500' :step='1' :disabled="isdisabled"></Slider><div>500</div>
                </div>
                <div class="speed_speech">
                    <div>语调</div><Slider v-model="Intonation" :min='-500' :max='500' :step='1' :disabled="isdisabled"></Slider><div>500</div>
                </div>
                <!-- <div class="readStyle">
                    <div>朗读风格</div>
                    <RadioGroup v-model="voiceStyle" >
                        <Radio label="生动" :disabled="isdisabled"></Radio>
                        <Radio label="清晰" :disabled="isdisabled"></Radio>
                        <Radio label="抑扬顿挫" :disabled="isdisabled"></Radio>
                    </RadioGroup>
                </div> -->
            </div>
        </div>
        <!-- <div class="hecheng_btn" @click="startSyn" v-if="ifShowSynBtn">开始合成</div> -->
        <div class="bofang_btn" @click="startBofang1">
          <img :src="bofangImg">
          <span>{{playText}}</span>
          <audio controls="controls" hidden id="audio"></audio>
        </div>
      </div>
        <Col class="demo-spin-col" v-if="ifShowLoading">
          <Spin fix>
              <Icon type="ios-loading" size=88 class="demo-spin-icon-load"></Icon>
              <div>合成中，请稍后...</div>
          </Spin>
      </Col>
    </div>

    <!-- 声音年龄识别 -->
    <div class="duanyuyin_experience_container" v-if="routeId=='1.2.4'">
      <div class="top">
        <div class="icon" style="">
          <div class="luzhi" style="width:15px;">
             <img src="../../../assets/images/aiSmartAppDetail/luzhi.png" alt="">
          </div>
          <div v-if="isWork4" class="timeline" style="width:293px; margin:0 10px">
            <img src="../../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
          </div>
          <span class="time" v-if="isWork4" style="color:#fff;">00:{{upTime4}} / 00:10</span>
        </div>
        <div class="times">
            <i-button type="success"  @click="syNlBeforeUpload">{{buttonMsg4}}</i-button>
        </div>
      </div>
      <p style="margin:15px 0;font-size: 18px;color: #121C33;">分析结果：</p>
      <div class="bottom">
        <span v-if="ifShowAgeSex">{{ageInfo}} - {{sexInfo}}</span>
      </div>
      <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
            <Icon type="ios-loading" size=88 class="demo-spin-icon-load"></Icon>
            <div>识别中，请稍后...</div>
        </Spin>
      </Col>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      isdisabled:false,
      inputText:'元知智能研究院作为元知科技集团的大数据资源整合平台和科技研发中心，在大数据、人工智能、脑神经科学、物联网等领域，面向国内外市场和全行业，提供大数据智能计算引擎、技术工程化和行业解决方案等技术服务。',
      womenHeadImg:require('../../../assets/images/aiSmartAppDetail/women.png'),
      menHeadImg:require('../../../assets/images/aiSmartAppDetail/men.png'),
      bofangImg:require('../../../assets/images/aiSmartAppDetail/bofang.png'),
      capKey:'Siqi',
      playText:'播放',
      speed:0,
      Intonation:0,
      volume:50,
      // voiceStyle:'生动',
      audioSrc:'',
      gqMsg:'',
      ageInfo:'',
      sexInfo:'',
      source:'',
      sourceTypeArr:[
        {
          label:'原声识别',
          value:'yuansheng'
        },
        {
          label:'哼唱识别',
          value:'hengchang'
        }
      ],
      sex:0,
      language:'',
      languageType:'zh',
      languageList:[
        {
          label:'中文',
          value:'zh'
        },
        {
          label:'粤语',
          value:'yue'
        }
      ],
      buttonMsg4:"开始识别",
      flag4:false,
      recorder4:null,
      isWork4:false,
      upTime4:10,
      ifShowAgeSex:false,
      ifShowLoading:false,
      isPlay:false,
    }
  },
  props:{
    routeId:{
      type:String
    }
  },
  watch:{
    inputText(newVal,oldVal){
       this.audioSrc='';
    }
  },
  mounted(){
    var audio = document.getElementById("audio"); 
    audio.loop = false;
    audio.addEventListener('ended',  ()=>{  
        this.audioSrc='';
        this.isPlay=false;
        this.isdisabled=false;
        this.playText='播放';
        this.bofangImg=require('@/assets/images/aiSmartAppDetail/bofang.png');
    }, false);
    this.recorder4 = new Recorder({
        sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1,         // 声道，支持 1 或 2， 默认是1
        compiling: false,       // 是否边录边转换，默认是false
    });
  },
  methods:{
    changeLanguage(v){
      this.languageType = v
      this.audioSrc = '';
      if(v == 'yue' && this.sex == 1){
        var sexDom = this.$refs.sexDom.childNodes;
        this.sex = 0
        sexDom[0].style = 'background:#03A971;';
        sexDom[0].childNodes[2].style = 'color: #FFFFFF';
        sexDom[2].style = 'opacity:0.6;background: #B8BECC;color:#3D4966;';
        sexDom[2].childNodes[2].style = 'color:#3D4966;';
      }
      switch (v) {
        case 'zh': 
          this.capKey = this.sex == 0 ? 'Siqi' : 'Aida'
          break;
        case 'yue':
          this.capKey = 'Shanshan'
          break;
        default:
          this.capKey = 'Siqi'
          break;
      }
      console.log(this.capKey);
    },
    checkSex(arg){
        if(this.isdisabled) return;
        this.audioSrc = '';
        var sexDom = this.$refs.sexDom.childNodes;
        if(arg == 0){
            this.sex = 0
            sexDom[0].style = 'background:#03A971;';
            sexDom[0].childNodes[2].style = 'color: #FFFFFF';
            sexDom[2].style = 'opacity:0.6;background: #B8BECC;color:#3D4966;';
            sexDom[2].childNodes[2].style = 'color:#3D4966;';
            this.capKey = this.languageType == 'zh' ? 'Siqi' : 'Shanshan';
        }
        else if(arg == 1){
            if(this.languageType == 'yue'){
              return
            }
            this.sex = 1
            sexDom[0].style = 'opacity:0.6;background: #B8BECC;';
            sexDom[0].childNodes[2].style = 'color:#3D4966;';
            sexDom[2].style = 'background:#03A971;opacity:1;';
            sexDom[2].childNodes[2].style = 'color: #FFFFFF;';
            this.capKey = this.languageType == 'zh' ? 'Aida' : '';
        }
        console.log(this.capKey,'this.capKey')
    },
    startBofang1(){
      if(this.isPlay){
        this.isdisabled=false;
        $('#audio')[0].pause();
        this.isPlay=false;
        this.playText='播放';
        this.bofangImg=require('@/assets/images/aiSmartAppDetail/bofang.png');
      }else{
        this.isPlay=true;
        this.playText='暂停';
        this.bofangImg=require('@/assets/images/aiSmartAppDetail/zanting.png');
        this.isdisabled=true;
        if(this.audioSrc){
          $('#audio')[0].play();
        }else{
           this.startBofang();
        }
      }
    },
    startBofang(){
      var inputText = this.inputText;
      var capKey = this.capKey;
      var speed = this.speed;
      var Intonation = this.Intonation;
      var volume = this.volume;
      var baseUrl = window.config.url;
      this.ifShowLoading = true;
      this.$axios({
        method:'post',
        url:baseUrl + '/ai/nlp/text2audio',
        params:{
          text:inputText,
          voice:capKey,
          volume:volume,
          speech_rate:speed,
          pitch_rate:Intonation
        }
      }).then(res=>{
        if(res.status == 200){
          this.ifShowLoading = false;
          if(!res.data.data){
            this.$Message.error('返回数据为空');
            return;
          }
          var audio = document.getElementById('audio');
          audio.src = "data:audio/wav;base64," + res.data.data;
          $('#audio')[0].play();
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    sendRequest(val){
      let _this = this;
      this.recorder4.stop();
      let wav=this.recorder4.getWAVBlob();
      let formData = new FormData(); 
      formData.append('files', wav);
      this.ifShowLoading = true;
      this.$axios({
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        },
        method: "post",
        url: window.config.url+"/ai/voice/ageDiscern",
        data: formData,
      }).then(res => {
        if(res.status == 200){
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var data = res.data.data.data.result;
            this.ifShowAgeSex = true;
            this.ifShowLoading = false;
            var ageInfo = data.age.age_type;
            var sexInfo = data.gender.gender_type;
            if(ageInfo == 0){
              _this.ageInfo = '中年';
            }
            else if(ageInfo == 1){
              _this.ageInfo = '儿童';
            }
            else if(ageInfo == 2){
              _this.ageInfo = '老年';
            }
            if(sexInfo == 0){
              _this.sexInfo = '女性';
            }
            else if(sexInfo == 1){
              _this.sexInfo = '男性';
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    syNlBeforeUpload(file){
      if (navigator.mediaDevices.getUserMedia) {
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints).then(
          stream => {
            console.log("授权成功！");
          },
          () => {
            console.error("授权失败！");
          }
        );
      } else {
        this.$Message.error("浏览器不支持 getUserMedia");
      }
      this.flag4=!this.flag4;
      this.ifShowAgeSex = false;
      this.ageInfo = '';
      this.sexInfo = '';
      var timer=null;
      if(this.flag4){
        this.upTime4=10;
        try {
          this.recorder4.start();
        } catch (error) {
          this.$Message.error("您的浏览器不支持");
          return;
        }
        this.isWork4=true;
        this.buttonMsg4="结束识别";
        timer=setInterval(()=>{
        if(this.upTime4==0){
            this.buttonMsg4="开始识别";
            this.flag4=false;
            clearInterval(timer)
            this.sendRequest();
            this.isWork4=false;
          }else{
            this.upTime4--;
            this.upTime4="0"+this.upTime4;
            if(this.flag4){
              this.buttonMsg4="结束识别";
            }else{
              this.isWork4=false;
              this.sendRequest();
              clearInterval(timer)
              this.buttonMsg4="开始识别";
            }
          }
        },1000)
      }else{
        this.buttonMsg4="开始识别";
        if(timer){
            clearInterval(timer)
        }
      } 
    }
  }
}
</script>
<style scoped lang='less'>
  .featur_function_exper_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    margin-bottom: 40px;
    position: relative;
    .featur_function_exper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-sizing: border-box;
      .type{
        width: 18%;
        align-self: start;
        margin-bottom: 20px;
      }
      .subtitle {
        width: 100%;
        font-size: 18px;
        color: #121C33;
        margin-bottom: 20px;
      }
      .operat_container{
          width: 100%;
          height: 290px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          .operat_left{
            width: 585px;
            height: 100%;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            border-right: none;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
            textarea{
                width: 100%;
                height: 90%;
                border: none;
                background: rgba(192,204,218,0.01);
            }
            .inputInfo{
                width: 100%;
                height: 10%;
                font-size: 12px;
                color: #B8BECC;
                text-align: justify;
                line-height: 16px;
            }
          }
          .operat_right{
            width: 585px;
            height: 100%;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            padding: 30px;
            box-sizing: border-box;
            .sex_container{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 35px;
                .women_container,.men_container{
                    width: 250px;
                    height: 58px;
                    background: #03A971;
                    padding: 8px 15px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    .headImg{
                        width: 42px;
                        height: 42px;
                        border-radius: 21px;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .intro{
                        font-size: 18px;
                        color: #3D4966;
                    }
                }
                .women_container{
                    .intro{
                        color: #FFF;
                    }     
                }
                .men_container{
                    opacity: 0.6;
                    background: #B8BECC;
                }
            }
            .speed_speech,.volume{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
                div:nth-child(1){
                    width: 10%;
                }
                .ivu-slider{
                    width: 75%;
                    margin-right: 10px;
                    /deep/.ivu-slider-bar{
                        background-color: #03A971;
                    }
                    /deep/.ivu-slider-button{
                        border: 2px solid #03A971;
                    }
                }
            }
            .readStyle{
                display: flex;
                align-items: center;
                justify-content:flex-start;
                margin-top: 5px;
                div:nth-child(1){
                    width: 14%;
                    margin-right: 28px;
                }
                /deep/.ivu-radio-default{
                    label{
                        margin-right: 20px;
                        .ivu-radio-inner::after{
                            border-color: #03A971;
                        }
                        .ivu-radio-checked .ivu-radio-inner{
                            border-color: #03A971;
                        }
                        .ivu-radio-inner::after{ 
                            background-color:#03A971;
                        }
                    }
                }
            }
          }
      }
      .hecheng_btn{
        background: #03A971;
        border-radius: 3px;
        padding: 10px 38px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
      }
      .bofang_btn{
        background: #03A971;
        border-radius: 3px;
        padding: 10px 43px;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        align-items: center;
        margin-top: 10px;
        img{
          width: 18px;
          height: 19px;
          margin-right: 5px;
        }
      }
      .bofang_btn:hover{
        cursor: pointer;
      }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        border: 1px solid #eee;
        position: absolute;
        left: 40%;
        top: 55%;
        transform: translate(-50%,-50%);
        /deep/.ivu-spin-text{
          width: 200px;
        }
    }
  }
   .duanyuyin_experience_container{
      width: 100%;
      position: relative;
      .type{
        width: 18%;
        margin-bottom: 20px;
      }
      .top{
        position: relative;
        width: 100%;
        height: 180px;
        margin-bottom: 10px;
        background: url(../../../assets/images/aiSmartAppDetail/tiyan.png) no-repeat center center;
        .icon{
          display:flex;justify-content:center;align-items:center;padding-top:50px;
          margin-bottom: 20px;
        }
        .times{
          text-align: center
        }
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
        
      }
      .bottom{
        width: 100%;
        height: 180px;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        padding: 10px;
        font-size: 14px;
        color: #7A8499;
        text-align: justify;
        line-height: 22px;
      }
      .demo-spin-icon-load{
          animation: ani-demo-spin 1s linear infinite;
      }
      @keyframes ani-demo-spin {
          from { transform: rotate(0deg);}
          50%  { transform: rotate(180deg);}
          to   { transform: rotate(360deg);}
      }
      .demo-spin-col{
          border: 1px solid #eee;
          position: absolute;
          left: 50%;
          top: 55%;
          transform: translate(-50%,-50%);
          /deep/.ivu-spin-text{
            width: 200px;
          }
      }
    }
</style>

