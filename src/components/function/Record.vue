<template>
  <div class="experience">
    <div class="duanyuyin_experience_container" v-if="routName=='shortSpeechRecoDetail'">
      <div class="top">
        <div class="icon" style="">
          <div class="luzhi" style="width:15px;">
             <img src="../../assets/images/aiSmartAppDetail/luzhi.png" alt="">
          </div>
          <div v-if="isWork" class="timeline" style="width:293px; margin:0 10px">
            <img src="../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
          </div>
          <span class="time" v-if="isWork" style="color:#fff;">00:{{upTime}} / 00:10</span>
        </div>
        <div class="times">
            <i-button type="success"  @click="startRecord">{{buttonMsg}}</i-button>
        </div>
      </div>
      <div class="bottom">
        {{transMsg}}
      </div>
    </div>


    <div class="duanyuyin_experience_container" v-if="routName=='realTimeReco'">
      <div class="top">
        <div class="icon" style="">
          <div class="luzhi" style="width:15px;">
             <img src="../../assets/images/aiSmartAppDetail/luzhi.png" alt="">
          </div>
          <div v-if="isWork" class="timeline" style="width:293px; margin:0 10px">
            <img src="../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
          </div>
          <span class="time" v-if="isWork" style="color:#fff;">00:{{upTime}} / 00:10</span>
        </div>
        <div class="times">
            <i-button type="success"  @click="startRecord1">{{buttonMsg}}</i-button>
        </div>
      </div>
      <div class="bottom">
        {{transMsg}}
      </div>
    </div>


    <div class="fn_container" v-if="routName=='fileReco'">
      <div class="content">
        <div class="left">
          <div class="title">上传音频：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <Upload
                ref="upload"
                type="drag"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                :on-format-error="handleFormatError"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                    <div class="pic">
                      <img src="../../assets/images/yuyin/voice.png" alt="">
                    </div>
                    <div class="intro">将文件拖到此处，或 <span>点击上传</span></div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box">
             {{anyMsg}}
          </div>
        </div>
      </div>
      <p>单个文件支持时长2分钟以内、5M以下，音频格式支持：mp3，pcm，wav，vox，Alaw，Ulaw</p>
    </div>

  </div>
</template>

<script>
  export default {
    //props: [],
     data() {
      return {
        isWork:false,
        upTime:10,
        numTime:0,
        transMsg:"请说出你想说的话...",
        buttonMsg:"开始录音",
        routName:'',
        flag:false,
        recorder:null,
        recorder1:null,
        anyMsg:"",
      }
    },
    created() {
      this.routName=this.$route.name;
       console.log(this.routName)
    },
    mounted(){
      this.recorder = new Recorder({
          sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,         // 声道，支持 1 或 2， 默认是1
          compiling: false,       // 是否边录边转换，默认是false
      });
    },
    methods:{
      handleBeforeUpload(file){
        console.log(file)
        let _this=this;
         var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e){
              // target.result 该属性表示目标对象的DataURL
              
               let data=e.target.result;
               var mimeString = data.split(',')[0].split(':')[1].split(';')[0];//图片类型
               data=data.split(',')[1];
              //转化为二进制
              data=window.atob(data);
              var ia = new Uint8Array(data.length);
              for (var i = 0; i < data.length; i++) {
                  ia[i] = data.charCodeAt(i);
              }
              var blob=new Blob([ia],{type:"audio/amr"});
              console.log(blob);
              let formData = new FormData(); //创建form对象
              formData.append('files', blob);//
              _this.$axios({
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data'
                },
                method: "post",
                url: window.config.url+"/ai/voice/asr?audioFormat=amr",
                data: formData,
              }).then(res => {
                if(res.data.code == 200000){
                  _this.anyMsg=res.data.data.ResponseInfo.Result.Text;
                }
              }).catch(err=>{
                console.log(err);
              });
          }
      },
      handleFormatError (file) {
        //console.log(file)
          // this.$Notice.warning({
          //     title: 'The file format is incorrect',
          //     desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
          // });
      },
      startRecord1(){
        let _this=this;
        var canRecording=ZCRecorder.canRecording;
        if(!canRecording){
          alert("不支持录音")
          return;
        }
          ZCRecorder.get(function(res){
            _this.recorder1=res;
            console.log(_this.recorder1)
            _this.flag=!_this.flag;
            //当为true，暂停状态
            var timer=null;
            if(_this.flag){
               _this.recorder1.start();
              _this.upTime=10;
              _this.numTime=0;
              _this.isWork=true;
              _this.buttonMsg="结束识别";
              let _data=null;
              timer=setInterval(()=>{
              if(_this.upTime==0){
                  _this.buttonMsg="开始录音";
                  _this.flag=false;
                  clearInterval(timer)
                  _data=_this.recorder1.getBlob();
                  _this.sendRecord1(_data);
                  _this.isWork=false;
                }else{
                  _this.numTime++;
                  _this.upTime--;
                  _this.upTime="0"+_this.upTime;
                  _data=_this.recorder1.getBlob();
                  _this.sendRecord1(_data);
                  if(_this.flag){
                    _this.buttonMsg="结束识别";
                  }else{
                    _this.isWork=false;
                    clearInterval(timer)
                     _data=_this.recorder1.getBlob();
                     _this.recorder1.stop();
                    _this.sendRecord1(_data);
                    _this.buttonMsg="开始录音";
                  }
                }
              },2000)
            }else{
              _this.buttonMsg="开始录音";
              if(timer){
                  clearInterval(timer)
              }
            }        

        },function(error){
          console.log(error)
        });
       
      },
      sendRecord1(val){
        let formData = new FormData(); //创建form对象
        formData.append('files', val);//
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          //url: "http://10.2.63.144/ai/voice/asrByRt?identify=101:123456789098.87411692366634&index="+val,
          url: window.config.url+"/ai/voice/asr?audioFormat=pcm16k16bit",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            this.transMsg=res.data.data.ResponseInfo.Result.Text;
            //console.log(this.transMsg)
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      startRecord(){
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
            alert("浏览器不支持 getUserMedia");
        }
        this.flag=!this.flag;
        //当为true，暂停状态
        var timer=null;
        if(this.flag){
          this.upTime=10;
          try {
            this.recorder.start();
          } catch (error) {
            alet("您的浏览器不支持");
            return;
          }
          this.isWork=true;
          this.buttonMsg="结束识别";
          timer=setInterval(()=>{
          if(this.upTime==0){
              this.buttonMsg="开始录音";
              this.flag=false;
              clearInterval(timer)
              this.sendRecord();
              this.isWork=false;
            }else{
              this.upTime--;
              this.upTime="0"+this.upTime;
              if(this.flag){
                this.buttonMsg="结束识别";
              }else{
                this.isWork=false;
                this.sendRecord();
                clearInterval(timer)
                this.buttonMsg="开始录音";
              }
            }
          },1000)
        }else{
          this.buttonMsg="开始录音";
          if(timer){
              clearInterval(timer)
          }
        }        
      },
      sendRecord(val){
          this.recorder.stop();
        let wav=this.recorder.getWAVBlob();
        console.log(wav)
        let formData = new FormData(); //创建form对象
        formData.append('files', wav);//
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/voice/asr?audioFormat=pcm16k16bit",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            this.transMsg=res.data.data.ResponseInfo.Result.Text;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
    }
  }
</script>

<style lang='less'>
 .ivu-upload-drag{
  height: 100%;
  background: rgba(192,204,218,0.10);
  border: 1px solid #EBECF0;
}
.ivu-upload-drag:hover {
     border: 1px solid #EBECF0;
}
</style>
<style scoped lang='less'>

  .experience {
    display: flex;
    width: 100%;
    .fn_container{
      width: 1200px;
      margin: auto;
      p{
        font-size: 14px;
        color: #7A8499;
        text-align: justify;
        line-height: 24px;
        margin-top: 10px;
      }
      .content{
         width: 100%;
         display: flex;
         justify-content: space-between;
        .title{
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .left{
          flex:1;
          .left_box{
            height: 290px;
            // background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            .left_up{
              width: 100%;height:100%;background: rgba(192,204,218,0.10);
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              .pic{
                width: 56px;
                img{
                  width: 100%;
                  display: block;
                }
              }
              .intro{
                font-size: 16px;
                color: #03002F;
                letter-spacing: 0;
                line-height: 14px;
                margin-top:30px;
                span{
                  color:#03a971;
                }
              }
            }
          }
        }
        .right{
           flex:1;
           margin-left:20px;
          .right_box{
            padding:10px;
            height: 290px;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
          }
        }
      }
     
      
    }
    .duanyuyin_experience_container{
      width: 585px;
      margin: auto;
      .top{
        position: relative;
        width: 100%;
        height: 180px;
        margin-bottom: 10px;
        background: url(../../assets/images/aiSmartAppDetail/tiyan.png) no-repeat center center;
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
    }
  }
</style>
