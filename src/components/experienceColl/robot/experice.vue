<template>
<div>
	<audio controls="controls" hidden id="audio"></audio>
	<div class="title">
		<p>
			智能语音对话机器人
			<!-- placement="bottom-start" -->
			 <Tooltip max-width="500px"  content="小智目前拥有疫情问答、查找音乐、陪您闲聊、预定机票火车票、查询天气、订外卖、翻译、会议室预定等技能，欢迎体验。">
				<div class="ques">
					<img src="../../../assets/images/robot/ques.png" alt="">
				</div>
			</Tooltip>
		</p>
		<div class="pic">
			<img src="../../../assets/images/robot/robot.png" alt="">
		</div>
		
	</div>
  <div class="fn_container">
    <div class="left">
      <div class="icon" style="">
        <div class="luzhi">
          <img src="../../../assets/images/aiSmartAppDetail/luzhi.png" alt="" />
        </div>
        <div v-if="isWork" class="timeline" style="">
			<img src="../../../assets/images/aiSmartAppDetail/timeLine.gif" alt="">
		</div>
        <div style="color:#fff;margin-top:10px">
			{{transMsg}}
		</div>
      </div>
	  <div class="times">
          <i-button type="success" @click="startRecord1">{{
            buttonMsg
          }}</i-button>
        </div>
    </div>
    <div class="right" ref="dialog" id="dialog">
		<div class="dialog">
			<div class="ro_header">
				<img src="../../../assets/images/robot/ro_header.png" alt="">
			</div>
			<div class="toolTip">
				<div class="arrow"></div>
				您好，我是元知智能语音机器人小智，陪我聊聊天呗
			</div>
		</div>
		<div class="dialog" v-for="(item,index) in dialogList" :key="index" :class="{'end':item.type==1}">
			<template v-if="item.type==1">
				<div class="toolTip">
					<div class="arrow"></div>
					{{item.msg}}
				</div>
				<div class="ro_header"><img src="../../../assets/images/robot/header.png" alt=""></div>
			</template>
			<template v-else>
				<div class="ro_header">
					<img src="../../../assets/images/robot/ro_header.png" alt="">
				</div>
				<div class="toolTip">
					<div class="arrow"></div>
					{{item.msg}}
				</div>
			</template>
		</div>
	</div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
	  audioSrc:'',
      isWork: false,
      buttonMsg: "开始对话",
	  recorder1: null,
	  flag:false,
	  transMsg:'',
	  msgList:[],
	  dialogList:[],
	  resetStart:false,
	  timeScroll:null,
	  timer:null,
	  talk:false,
	  sendFlag:false,
	  sendFirst:true,
    };
  },
  mounted() {
	  let _this=this;
	 	dialog.addEventListener("scroll", function() {
		  clearInterval(_this.timeScroll);
		  _this.timeScroll = null;
	  	})
		this.initScroll();
  },
  methods: {
	initScroll(){
		this.timeScroll = setInterval(()=>{
			var top=$(".fn_container .right")[0].scrollHeight-$(".fn_container .right")[0].clientHeight;
			$(".fn_container .right").animate({ scrollTop: top}, 500);
		},500)
	},
    startRecord1() {
      let _this = this;
      var canRecording = ZCRecorder.canRecording;
      if (!canRecording) {
        alert("不支持录音");
        return;
	  }
      ZCRecorder.get(
        function(res) {
		  _this.recorder1 = res;
          _this.flag = !_this.flag;
          //当为true，暂停状态
          _this.timer = null;
          if (_this.flag) {
			_this.msgList=[];
			_this.recorder1.start();
            
			_this.buttonMsg = "重置对话";
			//音频采集
			let _data = null;
			let isFirst=true;
			let islu=false;
			_this.timer=setInterval(()=>{
				if(res.isTalkFlag=='') return;
				if(res.isTalkFlag=='notTalk'){
					if(isFirst) return;
					_this.talk='notTalk';
					_this.isWork = false;
						if(_this.transMsg){
							_this.dialogList.push({
								type:1,
								msg:_this.transMsg
							});
							_this.sendRecord2(_this.transMsg);
							_this.transMsg='';
							console.log(22222222+"content")
						}else{
							console.log(22222222)
						}
					_data=null;
						
				}else {
					console.log(111111111+'talk')
					_this.talk=res.isTalkFlag;
					isFirst=false;
					_this.isWork = true;
					//if(!islu){
						_data =_this.recorder1.getBlobSegmentAndSize();
						//islu=true;
						_this.sendRecord1(_data);
					//}
					if(_this.timeScroll==null){
						_this.initScroll();
					}
					if(_this.flag){
						// _this.buttonMsg4="结束识别";
					}else{
						_this.isWork = false;
						if (_this.timer) {
							clearInterval(_this.timer);
							_this.timer =null
						}
						if(_this.timeScroll){
							clearInterval(_this.timeScroll);
		  					_this.timeScroll = null;
						}
						_data=null;
						_this.dialogList=[];
						_this.recorder1.stop()
					}
				}
			},800)
          } else {
			_this.isWork = false;
			_this.buttonMsg = "开始对话";
			_this.recorder1.stop()
            if (_this.timer) {
				clearInterval(_this.timer);
				_this.timer =null
			}
			if(_this.timeScroll){
				clearInterval(_this.timeScroll);
				_this.timeScroll = null;
			}
			_this.dialogList=[];
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    sendRecord1(val) {
	  if(!val) return;
	  let formData = new FormData(); //创建form对象
      formData.append("files", val); //
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/voice/asr?audioFormat=pcm16k16bit",
        data: formData
      })
        .then(res => {
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("没听清，请重复一遍");
              return;
			}
			console.log(res.data.data.ResponseInfo.Result.Text)
			if(res.data.data.ResponseInfo.ResCode=='Success'){
				if(res.data.data.ResponseInfo.Result.Text){
					if( res.data.data.ResponseInfo.Result.Text instanceof Object  == false){
						this.transMsg += res.data.data.ResponseInfo.Result.Text;
						// if(this.talk =='notTalk'){
						// 	console.log("notTalkfasle")
						// 	if(this.sendFlag){
						// 		this.dialogList.push({
						// 			type:1,
						// 			msg:this.transMsg
						// 		});
						// 	}else{
						// 		this.transMsg=res.data.data.ResponseInfo.Result.Text;
						// 		this.dialogList.push({
						// 			type:1,
						// 			msg:this.transMsg
						// 		});
						// 	}
						// 	this.sendFlag=false;
						// 	this.sendRecord2(this.transMsg);
						// 	this.transMsg='';
						// }else{
						// 		console.log("Talktrue")
								
						// 		console.log(this.transMsg);
						// 		this.sendFlag=true;
						// }
					}else{
						//this.$Message.error("没听清，请重复一遍");
					}
				}
				
			}else {
				this.$Message.error("没听清，请重复一遍");
			}
          } else {
            this.$Message.error("没听清，请重复一遍");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendRecord2(val) {
		console.log("请求接口"+val)
		let formData = new FormData(); //创建form对象
      	formData.append("queryWord", val); //
      	formData.append("userId", 1); //
      	formData.append("sessionId", 1); //
		console.log(val)
      this.$axios({
		 headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url + "/ai/voice/robotDialogue",
        data: formData
      })
        .then(res => {
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
			let result = JSON.parse(res.data.data).result.response_list[0].action_list[0].say;
			this.dialogList.push({
				type:2,
				msg:result
			});
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
	},
	play(val){
		this.$axios({
			method:'get',
			url:window.config.url+'/ai/voice/tts',
			params:{
				text:val,
				capKey:'tts.cloud.wangjing',
				speed:5,
				volume:5,
				voiceStyle:'vivid'
			}
		}).then(res=>{
			if(res.status == 200){
				if(!res.data.data){
					this.$Message.error('返回数据为空');
					return;
				}
				this.audioSrc= window.config.iconUrl+'/'+ res.data.data;
				$('#audio').attr('src',this.audioSrc);
				$('#audio')[0].play();
			}
			else{
			this.$Message.error('请求失败');
			}
		}).catch(err=>{
			console.log(err)
		});
	}
  },
  beforeDestroy(){
	if (this.timer) {
		clearInterval(this.timer);
		this.timer =null
	}
	if(this.timeScroll){
		clearInterval(this.timeScroll);
		this.timeScroll = null;
	}
  },
};
</script>
<style lang="less" scoped>
.title{
	p{
		display: flex;
		justify-content: center;
		align-items: center;
		.ques{
			width: 17px;
		}
		/deep/.ivu-tooltip-inner{
			min-width: 300px;
			font-size: 12px;
			color: #FFFFFF;
			line-height: 18px;
			// background-color:#3E4B59;
		}
	}
	font-size: 18px;
	color: #121C33;
	text-align: center;
	margin-top:-75px;
	.pic{
		width:224px;
		margin-left: 538px;
    	margin-top: -52px;
	}
}
img {
  width: 100%;
  display: block;
}
.fn_container {
  display: flex;
  .left {
	  position: relative;
    width: 400px;
    height: 380px;
    background: url(../../../assets/images/robot/tiyan.png) no-repeat center
      center;
    background-size: 100% 100%;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 74.5px;
      flex-direction: column;
      margin-bottom: 102px;
      .luzhi {
        width: 15px;
        margin-bottom: 23px;
      }
      .timeline {
        width: 293px;
      }
	}
	.times {
		position: absolute;
		left:0;
		right:0;
		margin:auto;
		width: 100%;
		bottom:80px;
        text-align: center;
      }
  }
  .right {
    flex: 1;
    background: rgba(192, 204, 218, 0.1);
    border: 1px solid #ebecf0;
	padding: 35px 25px;
	height: 380px;
	overflow: scroll;
	.dialog{
		margin-bottom: 28px;
		display: flex;
		align-items: center;
		.ro_header{
			width:45px;
			height:45px;
			border-radius: 50%;
			overflow: hidden;
		}
		.toolTip{
			max-width: 490px;
			min-width: 100px;
			margin-left:10px;
			background-color:#1F2D3D;
			border-radius: 4px;
			font-size: 12px;
			color: #FFFFFF;
			display: flex;
			padding:5px 10px;
			align-items: center;
			position: relative;
			.arrow{
				position: absolute;
				width: 0;
				height: 0;
				border-color: transparent;
				border-style: solid;
				top:0;
				bottom:0;
				margin:auto;
				border-width: 5px 5px 5px 0;
				left:-5px;    			
				border-right-color: #1F2D3D;
			}
		}
		&.end{
			justify-content:flex-end;
			.ro_header{
			
			}
			.toolTip{
				margin-left:0;
				margin-right:10px;
				background-color:#03A971;
				.arrow{
					border-width: 5px 0px 5px 5px;
					left:auto; 
					right:-5px;   			
					border-left-color: #03A971;
				}
			}
		}
	}
  }
}
</style>
