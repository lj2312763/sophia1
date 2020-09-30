(function (window) {
    /*jshint -W079 */
    var URL = window.URL;
  
    if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
        /*global URL:true */
        URL = webkitURL;
    }
  
    if (typeof navigator !== 'undefined') {
        if (typeof navigator.webkitGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.webkitGetUserMedia;
        }
  
        if (typeof navigator.mozGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.mozGetUserMedia;
        }
    }
  
    if (typeof AudioContext === 'undefined') {
      if (typeof webkitAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = webkitAudioContext;
      }
  
      if (typeof mozAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = mozAudioContext;
      }
    }
  
   
    var ZCRecorder = function (stream, config) {
      if (typeof AudioContext !== 'undefined') {
        var context = new AudioContext();
      }
      config = config || {};
      config.sampleBits = config.sampleBits || 16; //采样数位 8, 16
      config.sampleRate = config.sampleRate || (16000); //采样率(1/6 44100)
      
      var audioStream = stream;
      var audioInput = context.createMediaStreamSource(stream);
      var createScript = context.createScriptProcessor || context.createJavaScriptNode;
      var recorder = createScript.apply(context, [4096, 2, 2]);
      // //音频采集
      var isTalkArr=[];
      var audioData = {
        size: 0 //录音文件长度
          ,
        buffer: [] //录音缓存
          ,
        inputSampleRate: context.sampleRate //输入采样率
          ,
        inputSampleBits: 16 //输入采样数位 8, 16
          ,
        outputSampleRate: config.sampleRate //输出采样率
          ,
        oututSampleBits: config.sampleBits //输出采样数位 8, 16
          ,
        input: function (data) {
          this.buffer.push(new Float32Array(data));
          this.size += data.length;
        },
        clear: function () {
          this.buffer = [];
          this.size = 0;
        },
        resample: function() {
          // merge
          var data = new Float32Array(this.size);
          var offset = 0;
          for (var i = 0; i < this.buffer.length; i++) {
            data.set(this.buffer[i], offset);
            offset += this.buffer[i].length;
          }
          // resemple
          var fitCount = Math.round(data.length * (this.outputSampleRate / this.inputSampleRate));
          var newData = new Float32Array(fitCount);
          var springFactor = new Number((data.length -  1) / (fitCount - 1));
          newData[0] = data[0];
          for (var i = 1; i < fitCount - 1; i++) {
            var tmp = i * springFactor;
            var before = new Number(Math.floor(tmp)).toFixed();
            var after = new Number(Math.ceil(tmp)).toFixed();
            var atPoint = tmp - before;
            newData[i] = this.linearInterpolate(data[before], data[after], atPoint);
          }
          newData[fitCount - 1] = data[data.length - 1];
          return newData;
        },
        linearInterpolate: function(before, after, atPoint) {
          return before + (after - before) * atPoint;
        },
        export16kMono: function() {
          var buf = this.resample();
          var dataview = this.encodeRAW(buf);
          var audioBlob = new Blob([dataview], { type: 'audio/xraw' });
          return audioBlob;
        },
        encodeRAW: function(samples) {
          var buffer = new ArrayBuffer(samples.length * 2);
          var view = new DataView(buffer);
          this.floatTo16BitPCM(view, 0, samples);
          return view;
        },
        floatTo16BitPCM: function(output, offset, input) {
          for (var i = 0; i < input.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
          }
        },
        encodeWAV: function () {
          var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
          var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
          var bytes = this.resample();
          var dataLength = bytes.length * (sampleBits / 8);
          var buffer = new ArrayBuffer(44 + dataLength);
          var data = new DataView(buffer);
  
          var channelCount = 1; //单声道
          var offset = 0;
  
          var writeString = function (str) {
            for (var i = 0; i < str.length; i++) {
              data.setUint8(offset + i, str.charCodeAt(i));
            }
          }
  
          // 资源交换文件标识符
          writeString('RIFF');
          offset += 4;
          // 下个地址开始到文件尾总字节数,即文件大小-8
          data.setUint32(offset, 36 + dataLength, true);
          offset += 4;
          // WAV文件标志
          writeString('WAVE');
          offset += 4;
          // 波形格式标志
          writeString('fmt ');
          offset += 4;
          // 过滤字节,一般为 0x10 = 16
          data.setUint32(offset, 16, true);
          offset += 4;
          // 格式类别 (PCM形式采样数据)
          data.setUint16(offset, 1, true);
          offset += 2;
          // 通道数
          data.setUint16(offset, channelCount, true);
          offset += 2;
          // 采样率,每秒样本数,表示每个通道的播放速度
          data.setUint32(offset, sampleRate, true);
          offset += 4;
          // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
          data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
          offset += 4;
          // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
          data.setUint16(offset, channelCount * (sampleBits / 8), true);
          offset += 2;
          // 每样本数据位数
          data.setUint16(offset, sampleBits, true);
          offset += 2;
          // 数据标识符
          writeString('data');
          offset += 4;
          // 采样数据总数,即数据总大小-44
          data.setUint32(offset, dataLength, true);
          offset += 4;
          // 写入采样数据
          if (sampleBits === 8) {
            for (var i = 0; i < bytes.length; i++, offset++) {
              var s = Math.max(-1, Math.min(1, bytes[i]));
              var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
              val = parseInt(255 / (65535 / (val + 32768)));
              data.setInt8(offset, val, true);
            }
          } else {
            for (var i = 0; i < bytes.length; i++, offset += 2) {
              var s = Math.max(-1, Math.min(1, bytes[i]));
              data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
          }
  
          return new Blob([data], {
            type: 'audio/wav'
          });
        }
      };
      this.recorder = recorder;
      //开始录音
      this.start = function () {
        audioInput.connect(recorder);
        recorder.connect(context.destination);
      }

  
      //停止
      this.stop = function () {
        audioStream.getTracks()[0].stop();
        recorder.disconnect();
      }
      this.isTalkFlag='';
      //获取音频文件
      this.getBlob = function () {
        //this.stop();
        return audioData.export16kMono();
      }
  
      // 获取wav音频文件
      this.getWavBlob = function () {
        this.stop();
        return audioData.encodeWAV();
      }
  
      // 获取音频文件片段
      this.getBlobSegmentAndSize = function () {
        var data = audioData.export16kMono();
        var size = data.size;
        audioData.clear();
        return data;
      }
  
      //回放
      this.play = function (audio) {
        audio.src = window.URL.createObjectURL(this.getBlob());
      }
  
      //上传
      this.upload = function (url, callback) {
        var fd = new FormData();
        fd.append("audioData", this.getBlob());
        var xhr = new XMLHttpRequest();
        if (callback) {
          xhr.upload.addEventListener("progress", function (e) {
            callback('uploading', e);
          }, false);
          xhr.addEventListener("load", function (e) {
            callback('ok', e);
          }, false);
          xhr.addEventListener("error", function (e) {
            callback('error', e);
          }, false);
          xhr.addEventListener("abort", function (e) {
            callback('cancel', e);
          }, false);
        }
        xhr.open("POST", url);
        xhr.send(fd);
      }
  
      //保存文件
      this.save = function invokeSaveAsDialog(fileName) {
        var file = this.getBlob();
        if (!file) {
          throw 'Blob object is required.';
        }
  
        if (!file.type) {
          try {
            file.type = 'video/webm';
          } catch (e) {}
        }
  
        var fileExtension = (file.type || 'video/webm').split('/')[1];
  
        if (fileName && fileName.indexOf('.') !== -1) {
          var splitted = fileName.split('.');
          fileName = splitted[0];
          fileExtension = splitted[1];
        }
  
        var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;
  
        if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
          return navigator.msSaveOrOpenBlob(file, fileFullName);
        } else if (typeof navigator.msSaveBlob !== 'undefined') {
          return navigator.msSaveBlob(file, fileFullName);
        }
  
        var hyperlink = document.createElement('a');
        hyperlink.href = URL.createObjectURL(file);
        hyperlink.target = '_blank';
        hyperlink.download = fileFullName;
  
        if (!!navigator.mozGetUserMedia) {
          hyperlink.onclick = function () {
            (document.body || document.documentElement).removeChild(hyperlink);
          };
          (document.body || document.documentElement).appendChild(hyperlink);
        }
  
        var evt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
  
        hyperlink.dispatchEvent(evt);
  
        if (!navigator.mozGetUserMedia) {
          URL.revokeObjectURL(hyperlink.href);
        }
      }
     
  
      let _this=this;
      recorder.onaudioprocess = function (e) {
        //console.log(e)
        audioData.input(e.inputBuffer.getChannelData(0));
        // 获取缓冲区中最大的音量值
        //let maxVal = Math.max.apply(Math, e.inputBuffer.getChannelData(0));
        const buffer = e.inputBuffer.getChannelData(0)
          // 获取缓冲区中最大的音量值
        const maxVal = Math.max(...buffer);
       // 显示音量值
        const mv = Math.round(maxVal * 100);
        // 显示音量值
        
        if(mv>35){
          isTalkArr.push(true);
        }else{
          isTalkArr.push(false);
        }
        if(isTalkArr.length>12){
          if(isTalkArr.includes(true)){//在说话
            isTalkArr=[];
            _this.isTalkFlag="isTalk";
            console.log(_this.isTalkFlag)
          }else{//不说话
           // console.log(isTalkArr)
            isTalkArr=[];
            _this.isTalkFlag="notTalk";
            console.log(_this.isTalkFlag)
          }
        }
        //console.log(_this.isTalkFlag)
        // callback(_this.isTalkFlag)
        
        
       
        
      }
  
    };
    //抛出异常
    ZCRecorder.throwError = function (message) {
      alert(message);
      throw new function () {
        this.toString = function () {
          return message;
        }
      }
    }
    //是否支持录音
    ZCRecorder.canRecording = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia != null);
    //获取录音机
    ZCRecorder.get = function (successCb, errorCb, config) {
      if (successCb) {
        if (navigator.mediaDevices.getUserMedia) {
          var promise = navigator.mediaDevices.getUserMedia({
              audio: true
            }).then(function (stream) {
              var rec = new ZCRecorder(stream, config);
              successCb(rec);
            });
  
          promise['catch'](function (error) {
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                errorCb('用户拒绝提供信息。')
                // ZCRecorder.throwError('用户拒绝提供信息。');
                break;
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                errorCb('浏览器不支持硬件设备。')
                // ZCRecorder.throwError('浏览器不支持硬件设备。');
                break;
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
              case 'DevicesNotFoundError':
              case 'NotFoundError':
                errorCb('没有发现录音硬件设备。')
                // ZCRecorder.throwError('无法发现指定的硬件设备。');
                break;
              default:
                errorCb('无法打开麦克风。');
                // ZCRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                break;
            }
          });
        } else {
          errorCb('当前浏览器不支持录音功能。')
          // ZCRecorder.throwErr('当前浏览器不支持录音功能。');
          return;
        }
      }
    }
  
    window.ZCRecorder = ZCRecorder;
  
  })(window);