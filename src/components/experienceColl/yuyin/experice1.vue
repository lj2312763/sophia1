<template>
  <div class="experience">
      <!-- 短语音识别 -->
    <div class="duanyuyin_experience_container" v-if="routeId=='1.1.1'">
      <div class="type">
          <Select v-model="language" placeholder='普通话' @on-change="changeLanguage">
              <Option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      <div class="top">
        
        <div class="icon" style="">
          <div class="luzhi" style="width:15px;">
             <img src="../../../assets/images/aiSmartAppDetail/luzhi.png" alt="">
          </div>
          <div v-if="isWork" class="timeline" style="width:293px; margin:0 10px">
            <img src="../../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
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

    <!-- 实时语音识别 -->
    <div class="duanyuyin_experience_container" v-if="routeId=='1.1.2'">
      <div class="top">
        <div class="icon" style="">
          <div class="luzhi" style="width:15px;">
             <img src="../../../assets/images/aiSmartAppDetail/luzhi.png" alt="">
          </div>
          <div v-if="isWork" class="timeline" style="width:293px; margin:0 10px">
            <img src="../../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
          </div>
          <span class="time" v-if="isWork" style="color:#fff;">00:{{upTime}} / 00:10</span>
        </div>
        <div class="times">
            <i-button type="success"  @click="startRecord1">{{shishiButtonMsg}}</i-button>
        </div>
      </div>
      <div class="bottom">
        {{shishiTransMsg}}
      </div>
    </div>

    <!-- 录音文件识别 -->
    <div class="fn_container" v-if="routeId=='1.1.3'">
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
                      <img src="../../../assets/images/yuyin/voice.png" alt="">
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
        <Col class="demo-spin-col" v-if="ifShowLoading">
          <Spin fix>
              <Icon type="ios-loading" size=88 class="demo-spin-icon-load"></Icon>
              <div>识别中，请稍后...</div>
          </Spin>
        </Col>
      </div>
      <p>单个文件支持时长2分钟以内、5M以下，音频格式支持：pcm，wav，vox，Alaw，Ulaw</p>
    </div>

      <!-- 语音评测 -->
    <div class="duanyuyin_experience_container" v-if="routeId=='1.2.1'">
      <div class="info_text_type">
        <div class="info_text">请朗读以下文字：</div>
        <div class="type">
            <Select v-model="source"  @on-change="changeVal">
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div style="background: rgba(192,204,218,0.10);height:180px;border: 1px solid #EBECF0;padding:15px;margin-bottom:20px">
        {{demoText}}
      </div>
      <div class="top">
        <div class="icon" style="">
          <div class="luzhi" style="width:15px;">
             <img src="../../../assets/images/aiSmartAppDetail/luzhi.png" alt="">
          </div>
          <div v-if="isWork3" class="timeline" style="width:293px; margin:0 10px">
            <img src="../../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
          </div>
          <span class="time" v-if="isWork3" style="color:#fff;">00:{{upTime3}} / 00:10</span>
        </div>
        <div class="times">
            <i-button type="success"  @click="startRecord2">{{buttonMsg3}}</i-button>
        </div>
      </div>
      <div style="text-align:center;margin:20px 0;">
          <i-button type="success"  @click="sendRecord2(demoText)">开始测评</i-button>
      </div>
      <div class="bottom" style="height:auto">
        总分：{{result}}
      </div>
    </div>
     <!-- 歌曲识别 -->
    <div class="duanyuyin_experience_container" v-if="routeId=='1.2.2'">
       <div class="info_text_type">
        <div class="info_text"></div>
        <div class="type">
            <Select v-model="source1">
                <Option v-for="item in singList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
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
            <i-button type="success"  @click="startRecord3">{{buttonMsg4}}</i-button>
        </div>
      </div>
      <p style="margin:15px 0;font-size: 18px;color: #121C33;">分析结果：</p>
      <div class="bottom" >
        <span v-if="result1">{{result1.song}} —— {{result1.singer}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['routeId'],
    data() {
      return {
        result1:'',
        result:'',
        demoText:'将文字信息转化为声音信息，',
        source:'zh_cn',
        source1:'2',
        singList:[
          {
            label:'哼唱识别',
            value:'1'
          },
          {
            label:'原声识别',
            value:'2'
          }
        ],
        langList:[
          {
            label:'中文',
            value:'zh_cn'
          },
          {
            label:'英文',
            value:'en_us'
          }
        ],
        isWork:false,
        isWork3:false,
        isWork4:false,
        upTime:10,
        upTime3:10,
        upTime4:10,
        numTime:0,
        numTime4:0,
        transMsg:"请说出你想说的话...",
        shishiTransMsg:'请说出你想说的话...',
        buttonMsg:"开始录音",
        shishiButtonMsg:'开始识别',
        buttonMsg3:"开始录音",
        buttonMsg4:"开始识别",
        flag:false,
        flag3:false,
        flag4:false,
        recorder:null,
        recorder1:null,
        recorder2:null,
        recorder3:null,
        recorder4:null,
        anyMsg:"",
        capkey:'1537',
        language:'',
        languageList:[
          {
            label:'普通话',
            value:'1537'
          },
          {
            label:'英文',
            value:'1737'
          },
          {
            label:'粤语',
            value:'1637'
          },
          {
            label:'四川话',
            value:'1837'
          },
          {
            label:'普通话远场',
            value:'1936'
          }
        ],
        socket:null,
        timmner:null,
        ifShowLoading:false
      }
    },
    created() {
    },
    mounted(){
      this.recorder = new Recorder({
          sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,         // 声道，支持 1 或 2， 默认是1
          compiling: false,       // 是否边录边转换，默认是false
      });
      this.recorder4 = new Recorder({
          sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,         // 声道，支持 1 或 2， 默认是1
          compiling: false,       // 是否边录边转换，默认是false
      });
      this.recorder3 = new Recorder({
          sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,         // 声道，支持 1 或 2， 默认是1
          compiling: false,       // 是否边录边转换，默认是false
      });
    },
    methods:{
      changeLanguage(v){
        this.capkey = v
      },
      changeVal(val){
        if(val=='en_us'){
          this.demoText="Firefighters take part in an emergency rescue drill in a forest in Taian city, Shandong province, on Feb 24, 2019. This is the country's largest joint air-ground drill with around 2,000 rescuers, seven helicopters and vehicles, and over 1,200 firefighting equipment taking part in the exercise.";
        }else{
          this.demoText='将文字信息转化为声音信息，给应用配上嘴巴。我们提供了众多极具特色的发音人供您选择。';
        }
        console.log(this.demoText)
      },
      handleSuccess(){},
      handleBeforeUpload(file){
          var _this=this;
          var baseUrl = window.config.url;
          var formData = new FormData(); 
          _this.ifShowLoading = true;
          formData.append('files',file);
          formData.append('fileType ','AUDIO');
          formData.append('fileSource','ai');
          _this.$axios({
            url:baseUrl + '/ai/alivideo/upload',
            method:'post',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res=>{
            if(res.status == 200){
              if(!res.data.data){
                _this.$Message.error('返回数据为空');
                return;
              }
              var filePath = res.data.data.fileUrl;
              var baseUrl = window.config.iconUrl;
              var baseUrl1 = window.config.url;
              var videoUrl = baseUrl + '/' + filePath; 
              var formData = new FormData(); 
              formData.append('speech_url',videoUrl);
              formData.append('format','wav');
              formData.append('pid','1537'); 
              _this.$axios({
                url:baseUrl1 + '/ai/voice/voiceFileAsr',
                method:'post',
                headers: {
                  'Accept': '*/*',
                  'Content-Type': 'multipart/form-data'
                },
                data:formData
              }).then(res=>{
                if(res.data.code == 200000){   
                  var taskId = res.data.data.task_id;
                  var taskObj = {
                      'task_ids':[taskId]
                  };
                  _this.timmner = setInterval(()=>{
                    _this.$axios({
                      url:baseUrl1 + '/ai/voice/getVoiceFileAsrResult',
                      method:'post',
                      data:taskObj
                    }).then(res=>{
                      if(res.data.code == 200000){
                        var resData = res.data.data.tasks_info[0];
                        if(resData.task_status == "Success"){
                          _this.ifShowLoading = false;
                          var resultText = resData.task_result.result[0];
                          _this.anyMsg = resultText;
                          clearInterval(_this.timmner);
                        }
                        else if(resData.task_status == "Failure"){
                          _this.ifShowLoading = false;
                          _this.$Message.error('转写失败！');
                          clearInterval(_this.timmner);
                        } 
                      }
                      else{
                        _this.ifShowLoading = false;
                        _this.$Message.error('获取识别结果失败！');
                      }
                    }).catch(err=>{
                      _this.ifShowLoading = false;
                      _this.$Message.error('获取识别结果失败！');
                    });
                  },1000);
                }
                else{
                  _this.$Message.error('获取识别任务id失败！');
                }
              }).catch(err=>{
                _this.$Message.error('获取识别任务id失败！');
              });
            }
            else{
              _this.$Message.error('上传失败');
            }
          }).catch(err=>{
            _this.$Message.error('上传失败');
          });
      },
      handleFormatError (file) {
        //console.log(file)
          // this.$Notice.warning({
          //     title: 'The file format is incorrect',
          //     desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
          // });
      },
      startRecord3(){
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
        this.flag4=!this.flag4;
        //当为true，暂停状态
        var timer=null;
        if(this.flag4){
          this.upTime4=10;
          try {
            this.recorder4.start();
          } catch (error) {
            alert("您的浏览器不支持");
            return;
          }
          this.isWork4=true;
          this.buttonMsg4="结束识别";
          timer=setInterval(()=>{
          if(this.upTime4==0){
              this.buttonMsg4="开始识别";
              this.flag4=false;
              clearInterval(timer)
              this.sendRecord3();
              this.isWork4=false;
            }else{
              this.upTime4--;
              this.upTime4="0"+this.upTime4;
              if(this.flag4){
                this.buttonMsg4="结束识别";
              }else{
                this.isWork4=false;
                this.sendRecord3();
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
      },
      sendRecord3(val){
        this.recorder4.stop();
        let wav=this.recorder4.getWAVBlob();
        let formData = new FormData(); //创建form对象
        formData.append('files', wav);//
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/voice/songDiscern",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.result1=res.data.data.data[0];
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      startRecord2(){
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
        this.flag3=!this.flag3;
        //当为true，暂停状态
        var timer=null;
        if(this.flag3){
          this.upTime3=10;
          try {
            this.recorder3.start();
          } catch (error) {
            alert("您的浏览器不支持");
            return;
          }
          this.isWork3=true;
          this.buttonMsg3="结束识别";
          timer=setInterval(()=>{
          if(this.upTime3==0){
              this.buttonMsg3="开始录音";
              this.flag3=false;
              clearInterval(timer)
              this.recorder3.stop();
              this.isWork3=false;
            }else{
              this.upTime3--;
              this.upTime3="0"+this.upTime3;
              if(this.flag3){
                this.buttonMsg3="结束识别";
              }else{
                this.isWork3=false;
                this.recorder3.stop();
                clearInterval(timer)
                this.buttonMsg3="开始录音";
              }
            }
          },1000)
        }else{
          this.buttonMsg3="开始录音";
          if(timer){
              clearInterval(timer)
          }
        }        
      },
      sendRecord2(val){
        let wav=this.recorder3.getWAVBlob();
        console.log(wav)
        let formData = new FormData(); //创建form对象
        formData.append('files', wav);//
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/voice/evaluation?text="+val+"&language="+this.source,
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            if(this.source=='en_us'){
              this.result=res.data.data.data.read_sentence.rec_paper.read_chapter.total_score;
            }else{
              this.result=res.data.data.data.read_sentence.rec_paper.read_sentence.total_score;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      startRecord1(){
        // var self = this;
        // var ws = null; //实现WebSocket 
        // var record = null; //多媒体对象，用来处理音频
        // var Recorder = function(stream) {
        //     var sampleBits = 16; //输出采样数位 8, 16
        //     var sampleRate = 8000; //输出采样率
        //     var context = new AudioContext();
        //     var audioInput = context.createMediaStreamSource(stream);
        //     var recorder = context.createScriptProcessor(4096, 1, 1);
        //     var audioData = {
        //         size: 0, //录音文件长度
        //         buffer: [], //录音缓存
        //         inputSampleRate: 48000, //输入采样率
        //         inputSampleBits: 16, //输入采样数位 8, 16
        //         outputSampleRate: sampleRate, //输出采样数位
        //         oututSampleBits: sampleBits, //输出采样率
        //         clear: function() {
        //             this.buffer = [];
        //             this.size = 0;
        //         },
        //         input: function(data) {
        //             this.buffer.push(new Float32Array(data));
        //             this.size += data.length;		
        //         },
        //         compress: function() { //合并压缩
        //             //合并
        //             var data = new Float32Array(this.size);
        //             var offset = 0;
        //             for (var i = 0; i < this.buffer.length; i++) {
        //                 data.set(this.buffer[i], offset);
        //                 offset += this.buffer[i].length;
        //             }
        //             //压缩
        //             var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
        //             var length = data.length / compression;
        //             var result = new Float32Array(length);
        //             var index = 0,
        //             j = 0;
        //             while (index < length) {
        //                 result[index] = data[j];
        //                 j += compression;
        //                 index++;
        //             }
        //             return result;
        //         },
        //         encodePCM: function() { //这里不对采集到的数据进行其他格式处理，如有需要均交给服务器端处理。
        //             var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
        //             var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
        //             var bytes = this.compress();
        //             var dataLength = bytes.length * (sampleBits / 8);
        //             var buffer = new ArrayBuffer(dataLength);
        //             var data = new DataView(buffer);
        //             var offset = 0;
        //             for (var i = 0; i < bytes.length; i++, offset += 2) {
        //             var s = Math.max(-1, Math.min(1, bytes[i]));
        //                 data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        //             }
        //             return new Blob([data]);
        //         }
        //     };
 
        //     var sendData = function() { //对以获取的数据进行处理(分包)
        //         var reader = new FileReader();
        //         reader.onload = e => {
        //             var outbuffer = e.target.result;
        //             var arr = new Int8Array(outbuffer);
        //             if (arr.length > 0) {
        //                 var tmparr = new Int8Array(1024);
        //                 var j = 0;
        //                 for (var i = 0; i < arr.byteLength; i++) {
        //                     tmparr[j++] = arr[i];
        //                     if (((i + 1) % 1024) == 0) {
        //                         ws.send(tmparr);
        //                         if (arr.byteLength - i - 1 >= 1024) {
        //                             tmparr = new Int8Array(1024);
        //                         } else {
        //                             tmparr = new Int8Array(arr.byteLength - i - 1);
        //                         }
        //                         j = 0;
        //                     }
        //                     if ((i + 1 == arr.byteLength) && ((i + 1) % 1024) != 0) {
        //                         ws.send(tmparr);
        //                     }
        //                 }
        //             }
        //         };
        //         reader.readAsArrayBuffer(audioData.encodePCM());
        //         audioData.clear();//每次发送完成则清理掉旧数据
        //     };
			
        //     this.start = function() {
        //         audioInput.connect(recorder);
        //         recorder.connect(context.destination);
        //     }
 
        //     this.stop = function() {
        //         recorder.disconnect();
        //     }
 
        //     this.getBlob = function() {
        //         return audioData.encodePCM();
        //     }
 
        //     this.clear = function() {
        //         audioData.clear();
        //     }
			
        //     recorder.onaudioprocess = function(e) {
        //         var inputBuffer = e.inputBuffer.getChannelData(0);
        //         audioData.input(inputBuffer);
        //         sendData();
        //     }
        // }

        // function init(rec) {
        //     record = rec;
        // }

        // function useWebSocket() {
        //    // ws = new WebSocket("wss://www.yzsophia.com/ai/voice/voiceAsrCt");  //ws://10.16.39.169:8084/ai/WebSocket
        //     ws = new WebSocket("ws://10.16.39.169:8084/ai/WebSocket");  
        //     ws.binaryType = 'arraybuffer'; //传输的是 ArrayBuffer 类型的数据
        //     ws.onopen = function() {
        //         console.log('握手成功');
        //         if (ws.readyState == 1) { //ws进入连接状态，则每隔500毫秒发送一包数据
        //             record.start();
        //         }
        //     };
			
        //     ws.onmessage = function(msg) {
        //       console.log('msg')
        //       console.info(msg);
        //       self.shishiTransMsg=msg.data;
        //     }
			
        //     ws.onerror = function(err) {
        //       console.info(err)
        //     }
        // }

        // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        // if (!navigator.getUserMedia) {
        //     this.$Message.info('浏览器不支持音频输入');
        // }
        // else {
        //     navigator.getUserMedia({audio: true},(mediaStream)=>{
        //         var timer=null;
        //         self.flag=!self.flag;
        //         if(self.flag){
        //           useWebSocket();
        //           init(new Recorder(mediaStream));
        //           self.upTime=10;
        //           self.numTime=0;
        //           self.isWork=true;
        //           self.shishiButtonMsg="结束识别";
        //           timer=setInterval(()=>{
        //           if(self.upTime==0){
        //               self.shishiButtonMsg="开始录音";
        //               self.flag=false;
        //               clearInterval(timer);
        //               if (ws) {
        //                 ws.close();
        //                 record.stop();
        //               }
        //               self.isWork=false;
        //             }else{
        //               self.numTime++;
        //               self.upTime--;
        //               self.upTime="0"+self.upTime;
        //               if(self.flag){
        //                 self.shishiButtonMsg="结束识别";
        //               }else{
        //                 self.isWork=false;
        //                 clearInterval(timer);
        //                 if (ws) {
        //                   ws.close();
        //                   record.stop();
        //                 }
        //                 self.shishiButtonMsg="开始录音";
        //               }
        //             }
        //           },1000)
        //         }else{
        //           self.shishiButtonMsg="开始录音";
        //           if(timer){
        //             clearInterval(timer);
        //             if (ws) {
        //               ws.close();
        //               record.stop();
        //             }
        //           }
        //         } 
        //     },(error)=>{
        //         switch (error.message || error.name) {
        //           case 'PERMISSION_DENIED':  
        //           case 'PermissionDeniedError':  
        //               this.$Message.error('用户拒绝提供信息。');  
        //               break;  
        //           case 'NOT_SUPPORTED_ERROR':  
        //           case 'NotSupportedError':  
        //               this.$Message.error('浏览器不支持硬件设备。');  
        //               break;  
        //           case 'MANDATORY_UNSATISFIED_ERROR':  
        //           case 'MandatoryUnsatisfiedError':  
        //               this.$Message.error('无法发现指定的硬件设备。');  
        //               break;  
        //               default:  
        //               this.$Message.error('无法打开麦克风。异常信息:' + (error.code || error.name));  
        //               break;  
        //         }
        //       }
        //     )
        // }


        let _this=this;
        var canRecording=ZCRecorder.canRecording;
        if(!canRecording){
          alert("不支持录音")
          return;
        }
          ZCRecorder.get(function(res){
            _this.recorder1=res;
            _this.flag=!_this.flag;
            //当为true，暂停状态
            var timer=null;
            if(_this.flag){
               _this.recorder1.start();
              _this.upTime=10;
              _this.numTime=0;
              _this.isWork=true;
              _this.shishiButtonMsg="结束识别";
              let _data=null;
              _data=_this.recorder1.getBlob();
              _this.sendRecord1(_data);
              timer=setInterval(()=>{
              if(_this.upTime==0){
                  _this.shishiButtonMsg="开始录音";
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
                    _this.shishiButtonMsg="结束识别";
                  }else{
                    _this.isWork=false;
                    clearInterval(timer)
                     _data=_this.recorder1.getBlob();
                     _this.recorder1.stop();
                    _this.sendRecord1(_data);
                    _this.shishiButtonMsg="开始录音";
                  }
                }
              },2000)
            }else{
              _this.shishiButtonMsg="开始录音";
              if(timer){
                  clearInterval(timer)
              }
            }        
        },function(error){
          console.log(error)
        });
       
      },
      sendRecord1(val){
        let baseUrl = window.config.url;
        let formData = new FormData(); 
        formData.append('files', val);
        formData.append('audioFormat','pcm');
        formData.append('dev_pid','1537');
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: baseUrl +"/ai/voice/audioAsrCt",
          data: formData,
        }).then(res => {
          console.log(res,'res')
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.shishiTransMsg=res.data.data.result[0];
          }
          else{
            this.$Message.error('请求失败');
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
            alert("您的浏览器不支持");
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
        let formData = new FormData(); 
        formData.append('files', wav);
        if(this.capkey){
          formData.append('dev_pid', this.capkey)
        }
        formData.append('audioFormat','pcm')
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/voice/voiceAsr",
          data: formData,
        }).then(res => {
          console.log(res,'新接口')
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.transMsg=res.data.data.result[0];
          }
          else{
            this.$Message.error('请求失败');
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
      width: 100%;
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
         position: relative;
        .title{
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .left{
          flex:1;
          .left_box{
            height: 290px;
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
            /deep/.ivu-upload{
              /deep/.ivu-upload-list{
                /deep/.ivu-upload-list-file-finish{
                  /deep/span{
                    display: none !important;
                  }
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
     
      
    }
    .duanyuyin_experience_container{
      width: 100%;
     .info_text_type{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .info_text{
          flex-grow: 1;
          font-size: 18px;
          color: #121C33;
        }
        .type{
          width: 18%;
        }
      }
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
    }
  }
</style>
