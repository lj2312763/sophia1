<template>
  <div class="experience">
    <!--视频内容分析-->
    <div class="experience_container" v-if="routeTwoId == '4.1' || routeTwoId == '4.2'">
      <div class="shangchuan_text">请上传一段想分析的视频：</div>
      <div class="video_container">
        <div class="RecDetail_left">
          <div class="RecDetail_left_bottom">
            <div class="Img_container" @click="bofangShipin">
              <img :src="shipinImg">
              <img :src="bofangImg" class="bofang" ref="bofang">
              <video ref="video" :src="videoUrl" controls></video>
            </div>
            <Row v-show="ifShowLoading">
                <Col class="demo-spin-col" span="8">
                    <Spin fix>
                        <Icon type="ios-loading" size=90 class="demo-spin-icon-load"></Icon>
                        <div>视频分析中，请稍后...</div>
                    </Spin>
                </Col>
            </Row>
            <div class="info_btn">
              <div class="text">体验版本视频片大小不超过20M</div>
              <div class="ivbutton">
                <Upload
                action="" 
                :max-size="1024"
                :before-upload="handleBeforeUpload"
                >
                  <Button>上传视频</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="analy_result_text">分析结果：</div>
      <div class="result_container">
        <div class="tag_container">
          <div class="result_type" ref="result_type" v-for="(item,index) in typeResultArr" :key="index" @click="changeType(index)">{{item}}</div>
        </div>
        <div class="result_text" v-if="typeIndex == 0">
          <div class="time_content_container" v-for="(item,index) in yuyinArr" :key="index">
            <div class="time">{{item.time}}</div>
            <div class="content">{{item.text}}</div>
          </div>
        </div>
        <div class="result_text" v-if="typeIndex == 1">
          <div class="time_content_container" v-for="(item) in wenziArr" :key="item.time">
            <div class="time">{{item.time}}</div>
            <div class="content_container"> 
              <div class="content" v-for="(item1,index) in item.detailInfo" :key="index">{{item1.text}}</div>
            </div>
          </div>
        </div>
        <div class="result_text" v-if="typeIndex == 2">
          <div class="time_content_container" v-for="(item,index) in renlianArr" :key="index">
            <div class="time">{{item.label}}</div>
            <div class="content_container">
              <div class="content" v-for="(item1,index) in item.detailInfo" :key="index">{{item1.startTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{item1.endTime}}</div>
            </div>
          </div>
        </div>
        <div class="result_text" v-if="typeIndex == 3">
          <div class="time_content_container" v-for="(item,index) in changjinArr" :key="index">
            <div class="time">{{item.labelLevel1}}</div>
            <div class="content">{{item.label}}</div>
          </div>
        </div>
        <div class="result_text" v-if="typeIndex == 4">
          <div class="time_content_container" v-for="(item,index) in tagArr" :key="index">
            <div class="time">{{item.labelLevel1}}</div>
            <div class="content">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>

    <!--视频内容审核-->
    <div class="experience_container" v-if="routeTwoId == '4.3'">
      <div class="shangchuan_text">请上传一段想分析的视频：</div>
      <div class="video_container">
        <div class="RecDetail_left">
          <div class="RecDetail_left_bottom">
            <div class="Img_container" @click="bofangShipin">
              <img :src="shenheImg">
              <img :src="bofangImg" class="bofang" ref="bofang">
              <video ref="video" :src="shenheVideoUrl" controls></video>
            </div>
            <Row v-show="ifShowShenLoading">
                <Col class="demo-spin-col" span="8">
                    <Spin fix>
                        <Icon type="ios-loading" size=90 class="demo-spin-icon-load"></Icon>
                        <div>视频审核中，请稍后...</div>
                    </Spin>
                </Col>
            </Row>
            <div class="info_btn">
              <div class="text">体验版本视频片大小不超过20M</div>
              <div class="ivbutton">
                <Upload
                action="" 
                :max-size="1024"
                :before-upload="shenheUpload"
                >
                  <Button>上传视频</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="analy_result_text">分析结果：</div>
      <div class="result_container">
        <div class="shenheTongg" v-if="ifShowTongIcon"><img :src="tongIcon">审核通过</div>
        <div class="shenheBut" v-if="ifShowBuTIcon"><img :src="buTIcon">审核不通过</div>
        <div class="title">
          <div>审核维度</div>
          <div>状态</div>
          <div>置信度</div>
          <div>违禁词</div>
        </div>
        <div class="baokongCon">
          <div>暴恐违禁</div>
          <div ref="baokongCon_status">{{baokongObj.status}}</div>
          <div>{{baokongObj.zhixinScore}}</div>
          <div>{{baokongObj.weijinCi}}</div>
        </div>
        <div class="seQin">
          <div>视频色情</div>
          <div ref="seQin_status">{{seQinObj.status}}</div>  
          <div>{{seQinObj.zhixinScore}}</div>
          <div>{{seQinObj.weijinCi}}</div>
        </div>
        <div class="zhengZhi">
          <div>政治敏感</div>
          <div ref="zhengZhi_status">{{zhengZhiObj.status}}</div>
          <div>{{zhengZhiObj.zhixinScore}}</div>
          <div>{{zhengZhiObj.weijinCi}}</div>
        </div>
        <div class="weijin">
          <div>违禁品</div>
          <div ref="weijin_status">{{weijinObj.status}}</div>
          <div>{{weijinObj.zhixinScore}}</div>
          <div>{{weijinObj.weijinCi}}</div>
        </div>
        <div class="guanggao">
          <div>广告检测</div>
          <div ref="guanggao_status">{{guanggaoObj.status}}</div>
          <div>{{guanggaoObj.zhixinScore}}</div>
          <div>{{guanggaoObj.weijinCi}}</div>
        </div>
      </div>
    </div>

    <!--视频处理-->
    <div class="experience_container" v-if="routeTwoId == '4.4'">
      <div class="shangchuan_text">请上传一段想分析的视频：</div>
      <div class="video_container">
        <div class="RecDetail_left">
          <div class="RecDetail_left_bottom">
            <div class="Img_container" @click="bofangShipin">
              <img :src="chuliImg">
              <img :src="bofangImg" class="bofang" ref="bofang">
              <video ref="video" :src="chuliVideoUrl" controls></video>
            </div>
            <Row v-show="ifShowChuLoading">
                <Col class="demo-spin-col" span="8">
                    <Spin fix>
                        <Icon type="ios-loading" size=90 class="demo-spin-icon-load"></Icon>
                        <div>正在处理中，请稍后...</div>
                    </Spin>
                </Col>
            </Row>
            <div class="info_btn">
              <div class="text">体验版本视频片大小不超过20M</div>
              <div class="ivbutton">
                <Upload
                action="" 
                :max-size="1024"
                :before-upload="chuliUpload"
                >
                  <Button>上传视频</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="analy_result_text">分析结果：</div>
      <div class="result_container chuliResult">
        <div class="title_container" ref="chuliTitle">
          <div @click="chgTitleStyle(0)">视频GIF</div>
          <div @click="chgTitleStyle(2)">视频首图</div>
        </div>
        <div class="chuliResult_container">
          <div class="img_container" v-for="(item,index) in chuliResult" :key="index">
            <img :src="item.src" alt="" srcset="">
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      typeResultArr:['语音','文字','人脸','场景','标签'],
      shipinImg:require('../../../assets/images/shipin/shipinZhanwei.png'),
      shenheImg:require('../../../assets/images/shipin/shipinShen.png'),
      chuliImg:require('../../../assets/images/shipin/shipinChu.png'),
      yuyinArr:null,
      wenziArr:[],
      renlianArr:null,
      changjinArr:null,
      tagArr:null,
      typeIndex:'',
      bofangImg:require('../../../assets/images/aiSmartAppDetail/bofang.png'),
      timer:null,
      covertTimer:null,
      shenheTimer:null,
      ifShowLoading:false,
      ifShowShenLoading:false,
      ifShowChuLoading:false,
      videoUrl:'',
      shenheVideoUrl:'',
      chuliVideoUrl:'',
      tongIcon:require('../../../assets/images/icon/pass.png'),
      buTIcon:require('../../../assets/images/icon/fail.png'),
      ifShowTongIcon:false,
      ifShowBuTIcon:false,
      baokongObj:{
        status:'',
        zhixinScore:'',
        weijinCi:''
      },
      seQinObj:{
        status:'',
        zhixinScore:'',
        weijinCi:''
      },
      zhengZhiObj:{
        status:'',
        zhixinScore:'',
        weijinCi:''
      },
      weijinObj:{
        status:'',
        zhixinScore:'',
        weijinCi:''
      },
      guanggaoObj:{
        status:'',
        zhixinScore:'',
        weijinCi:''
      },
      chuliResult:[
        {
          src:''
        },
        {
          src:''
        },
        {
          src:''
        }
      ],
      chuliResultType:'gif',
      chuliFile:null
    }
  },
  props:{
    routeTwoId:{
      type:String
    }
  },
  mounted(){
    console.log(this.routeTwoId,'this.routeTwoId')
    this.initResultTypeStyle()
  },
  watch:{
    routeTwoId(newVal,oldVal){
      if(this.timer){
        clearInterval(this.timer);
      }
      if(this.covertTimer){
        clearInterval(this.covertTimer);
      }
      if(this.shenheTimer){
        clearInterval(this.shenheTimer);
      }
      //清缓存
      this.videoUrl = '';
      this.shenheVideoUrl = '';
      this.chuliVideoUrl = '';
      this.baokongObj = {
        status:'',
        zhixinScore:'',
        weijinCi:''
      };
      this.seQinObj = {
        status:'',
        zhixinScore:'',
        weijinCi:''
      };
      this.zhengZhiObj = {
        status:'',
        zhixinScore:'',
        weijinCi:''
      };
      this.weijinObj = {
        status:'',
        zhixinScore:'',
        weijinCi:''
      };
      this.guanggaoObj = {
        status:'',
        zhixinScore:'',
        weijinCi:''
      };
      var videoDom = this.$refs.video;
      var bofangDom = this.$refs.bofang;
      videoDom.style.opacity = '0';
      bofangDom.style.opacity = '1';
      this.yuyinArr = [];
      this.wenziArr = [];
      this.renlianArr = [];
      this.changjinArr = [];
      this.tagArr = [];
      this.initResultTypeStyle(newVal)

      if(newVal == '4.2'){
        this.shipinImg = require('../../../assets/images/shipin/shipinZhanwei.png');
        if(this.ifShowLoading){
          this.ifShowLoading = false;
        }
      }
      else if(newVal == '4.3'){
        this.ifShowTongIcon = false;
        this.ifShowBuTIcon = false;
        this.shenheImg = require('../../../assets/images/shipin/shipinShen.png');
        if(this.ifShowShenLoading){
          this.ifShowShenLoading = false;
        }
      }
      else if(newVal == '4.4'){
        this.chuliImg = require('../../../assets/images/shipin/shipinChu.png');
        if(this.ifShowChuLoading){
          this.ifShowChuLoading = false;
        }
      }
    }
  },
  updated(){
    if(this.$refs.baokongCon_status){
      var bkStatus = this.$refs.baokongCon_status;
      var sqStatus = this.$refs.seQin_status;
      var zzStatus = this.$refs.zhengZhi_status;
      var wjStatus = this.$refs.weijin_status;
      var ggStatus = this.$refs.guanggao_status;
      if(bkStatus.innerHTML == '通过'){
        bkStatus.style = 'font-size: 14px;color: #03A971;';
      }
      else if(bkStatus.innerHTML == '不通过'){
        bkStatus.style = 'font-size: 14px;color: #FF5400;';
      }
      else if(bkStatus.innerHTML == '待定'){
        bkStatus.style = 'font-size: 14px;color: #F7BA2A;';
      }

      if(sqStatus.innerHTML == '通过'){
        sqStatus.style = 'font-size: 14px;color: #03A971;';
      }
      else if(sqStatus.innerHTML == '不通过'){
        sqStatus.style = 'font-size: 14px;color: #FF5400;';
      }
      else if(sqStatus.innerHTML == '待定'){
        sqStatus.style = 'font-size: 14px;color: #F7BA2A;';
      }

      if(zzStatus.innerHTML == '通过'){
        zzStatus.style = 'font-size: 14px;color: #03A971;';
      }
      else if(zzStatus.innerHTML == '不通过'){
        zzStatus.style = 'font-size: 14px;color: #FF5400;';
      }
      else if(zzStatus.innerHTML == '待定'){
        zzStatus.style = 'font-size: 14px;color: #F7BA2A;';
      }

      if(wjStatus.innerHTML == '通过'){
        wjStatus.style = 'font-size: 14px;color: #03A971;';
      }
      else if(wjStatus.innerHTML == '不通过'){
        wjStatus.style = 'font-size: 14px;color: #FF5400;';
      }
      else if(wjStatus.innerHTML == '待定'){
        wjStatus.style = 'font-size: 14px;color: #F7BA2A;';
      }

      if(ggStatus.innerHTML == '通过'){
        ggStatus.style = 'font-size: 14px;color: #03A971;';
      }
      else if(ggStatus.innerHTML == '不通过'){
        ggStatus.style = 'font-size: 14px;color: #FF5400;';
      }
      else if(ggStatus.innerHTML == '待定'){
        ggStatus.style = 'font-size: 14px;color: #F7BA2A;';
      }
    }
  },
  methods:{
    bofangShipin(){
      var videoDom = this.$refs.video;
      var bofangDom = this.$refs.bofang;
      videoDom.style.opacity = '1';
      if(videoDom.paused){
        videoDom.play();
        bofangDom.style.opacity = '0';
      }
      else{
        bofangDom.style.opacity = '1';
        videoDom.pause();
      }          
    },
    chgTitleStyle(arg){
      if(arg == 0){
        this.chuliResultType = 'gif';
      }
      else if(arg == 2){
        this.chuliResultType = 'stic';
      }
      this.chuliUpload(this.chuliFile);
      var chuliTitleDom = this.$refs.chuliTitle.childNodes;
      for(var i = 0;i < chuliTitleDom.length;i++){
        if(arg == i){
          chuliTitleDom[i].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
        }
        else{
          chuliTitleDom[i].style = 'background: rgba(3,169,113,0.10);color: #03A971;';
        }
      }
    },
    initResultTypeStyle(arg){
      console.log(arg,'arg')
      if(!arg){
        if(this.$refs.result_type.length > 0){
          var resultTypeDom = this.$refs.result_type;
          resultTypeDom[0].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
        }
      }
      if(arg == '4.1' || arg == '4.2'){
        if(this.$refs.result_type){
          setTimeout(() => {
            var resultTypeDom = this.$refs.result_type;
            resultTypeDom[0].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
          }, 200);
        }
      }
      else if(arg == '4.4'){
        setTimeout(() => {
          var chuliTitleDom = this.$refs.chuliTitle.childNodes;
          chuliTitleDom[0].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
        }, 200);
      }
    },
    changeType(arg){
      var resultTypeDom = this.$refs.result_type;
      for(var i = 0;i < resultTypeDom.length;i++){
        if(arg == i){
          resultTypeDom[i].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
        }
        else{
          resultTypeDom[i].style = 'background: rgba(3, 169, 113, 0.1);border:none;color: #03A971;';
        }
      }
      this.typeIndex = arg;
    },
    secondToDate(result) {
      var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
      var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
      var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
      return result = h + ":" + m + ":" + s;
    },
    getStatus(taskId){
      var that = this;
      var taskId1 = taskId + '';
      var baseUrl = window.config.url+'/ai';
      var formData = new FormData(); 
      formData.append('taskId',taskId1);
      that.$axios({
        url:baseUrl + '/alivideo/queryAnalysisStatus',
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200000){
          if(!res.data.data){
            this.ifShowLoading = false;
            this.$Message.error('返回数据为空');
            return;
          }
          if(res.data.data.status == 2){
            clearInterval(that.timer);
            that.getAnalyResult(taskId);
          }
        }
        else{
          this.ifShowLoading = false;
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        this.ifShowLoading = false;
        console.log(err + 'err')
      });
    },
    getCoverUrl(td,type){
      var baseUrl = window.config.url+'/ai';
      var formData = new FormData(); 
      var pUrl;
      if(type == 'fenxi' || type == 'shenhe' || type == 'stic'){
        pUrl = '/alivideo/getStaticCover';
      }
      else if(type == 'gif'){
        pUrl = '/alivideo/getDynamicCover';
      }
      formData.append('taskId',td);
      this.$axios({
        url:baseUrl + pUrl,
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200000){
          this.chuliImg = '';
          this.ifShowChuLoading = false;
          if(!res.data.data){
            this.$Message.error('获取封面接口，返回数据为空');
            return;
          }
          if(type == 'fenxi'){
            var coverUrl = res.data.data[0].result[0].content.url;
            this.shipinImg = coverUrl;
          }
          if(type == 'shenhe'){
            var coverUrl = res.data.data[0].result[0].content.url;
            this.shenheImg = coverUrl;
          }
          if(type == 'stic' || type == 'gif'){
            this.ifShowChuLoading = false;
            this.chuliResult = [];
            var dataArr = res.data.data;
            for(var i = 0;i < dataArr.length;i++){
              var contentObj = dataArr[i].result[0].content;
              if(i == 0){
                this.chuliImg = contentObj['url'];
              }
              for(var attr in contentObj){
                this.chuliResult.push({
                  src:contentObj[attr]
                });
              }
            }
          }
        }
        else{
          this.ifShowChuLoading = false;
          this.$Message.error('获取封面接口请求失败');
        }
      }).catch(err=>{
        this.ifShowChuLoading = false;
        console.log(err)
      });
    },
    getCoverStatus(tskid,type){
      var that = this;
      var taskId1 = tskid + '';
      var baseUrl = window.config.url+'/ai';
      var formData = new FormData(); 
      formData.append('taskId',taskId1);
      that.$axios({
        url:baseUrl + '/alivideo/queryAnalysisStatus',
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200000){
          if(!res.data.data){
            this.ifShowChuLoading = false;
            this.$Message.error('创建封面状态，返回数据为空');
            return;
          }
          if(res.data.data.status == 2){
            clearInterval(that.covertTimer);
            that.getCoverUrl(taskId1,type);
          }
        }
        else{
          this.ifShowChuLoading = false;
          this.$Message.error('创建封面状态，接口请求失败');
        }
      }).catch(err=>{
        this.ifShowChuLoading = false;
        console.log(err);
      });
    },
    getCover(arg,type){
      var that = this;
      var baseUrl = window.config.url+'/ai';
      var pUrl;
      var formData = new FormData(); 
      formData.append('video_url',arg);
      formData.append('video_name ','视频识别');
      if(type == 'fenxi' || type == 'shenhe' || type == 'stic'){
        pUrl = '/alivideo/createStaticCover';
      }
      else if(type == 'gif'){
        pUrl = '/alivideo/createDynamicCover';
      }
      this.$axios({
        url:baseUrl + pUrl,
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200000){
          if(!res.data.data){
            this.ifShowChuLoading = false;
            this.$Message.error('创建封面任务，接口返回数据为空');
            return;
          }
          var taskId = res.data.data.taskId;
          this.covertTimer = setInterval(() => {
            that.getCoverStatus(taskId,type);
          }, 1000);
        }
        else{
          this.ifShowChuLoading = false;
          this.$Message.error('创建封面任务失败');
        }
      }).catch(err=>{
        this.ifShowChuLoading = false;
        console.log(err)
      });
    },
    getAnalyResult(taskId){
      var that = this;
      var taskId1 = taskId + '';
      var baseUrl = window.config.url+'/ai';
      var formData = new FormData(); 
      formData.append('taskId',taskId + '');
      that.$axios({
        url:baseUrl + '/alivideo/getAnalysisResult',
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200000){
          this.ifShowLoading = false;
          if(!res.data.data){
            this.$Message.error('返回数据为空');
            return;
          }
          var totalData = res.data.data;
          this.yuyinArr = [];
          this.wenziArr = [];
          this.renlianArr = [];
          this.changjinArr = [];
          this.tagArr = [];
          for(var i = 0;i < totalData.length;i++){
            if(totalData[i].name == 'ocr'){
              var totalResult = totalData[i].result[0].content.data;
              for(var j = 0;j <totalResult.length; j++){
                var startTime = this.secondToDate((totalResult[j].startTime + '').split('.')[0]);
                var endTime = this.secondToDate((totalResult[j].endTime + '').split('.')[0]);
                this.wenziArr.push({
                  time:startTime+' - '+endTime,
                  detailInfo:totalResult[j].detailInfo
                });
              }
              console.log(this.wenziArr,'wenzi')
            }
            else if(totalData[i].name == 'tag'){
              var totalResult = totalData[i].result[0].content.data;
              for(var m = 0;m < totalResult.length;m++){
                if(totalResult[m].labelLevel1 == '人脸'){
                  var rightArr = [];
                  var oneOfRightArr = totalResult[m].detailInfo;
                  for(var j = 0;j < oneOfRightArr.length;j++){
                    var startTime = this.secondToDate((oneOfRightArr[j].startTime + '').split('.')[0]);
                    var endTime = this.secondToDate((oneOfRightArr[j].endTime + '').split('.')[0]);
                    rightArr.push({
                      startTime:startTime,
                      endTime:endTime
                    });
                  }
                  this.renlianArr.push({
                    label:totalResult[m].label,
                    detailInfo:rightArr
                  });
                }
                else if(totalResult[m].labelLevel1 == '关键词'){
                  this.tagArr.push({
                    labelLevel1:totalResult[m].labelLevel1,
                    label:totalResult[m].label
                  });
                }
                else{
                  this.changjinArr.push({
                    labelLevel1:totalResult[m].labelLevel1,
                    label:totalResult[m].label
                  });
                  console.log(this.changjinArr)
                }
              }
            }
            else if(totalData[i].name == 'asr'){
              var totalResult = totalData[i].result[0].content.data;
              for(var j = 0;j <totalResult.length; j++){
              var startTime = this.secondToDate(('' + totalResult[j].startTime).split('.')[0]);
              var endTime = this.secondToDate(('' + totalResult[j].endTime).split('.')[0]);
                this.yuyinArr.push({
                  time:startTime+' - '+endTime,
                  text:totalResult[j].text
                });
              }
              console.log(this.yuyinArr,'this.yuyinArr')
            }
          }
        }
        else{
          this.ifShowLoading = false;
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        this.ifShowLoading = false;
        console.log(err + 'err')
      });
    },
    queryCheckResult(argUrl){
      var that = this;
      var baseUrl = window.config.url+'/ai';
      var formData = new FormData(); 
      formData.append('video_url',argUrl);
      that.$axios({
        url:baseUrl + '/bdvideo/queryCheckResult',
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200000){
          // this.ifShowShenLoading = false;
          if(!res.data.data){
            // this.$Message.error('返回数据为空');
            return;
          }
          if(res.data.data.status == 'FINISHED'){
            clearInterval(that.shenheTimer);
            var result = res.data.data;
            var resultArr = result.results;
            this.shenheVideoUrl = result.source;
            this.ifShowShenLoading = false;
            if(result.label == 'NORMAL'){
              this.ifShowTongIcon = true;
              this.ifShowBuTIcon = false;
            }
            else if(result.label == 'REVIEW' || res.data.data.label == 'REJECT'){
              this.ifShowTongIcon = false;
              this.ifShowBuTIcon = true;
            }
            if(resultArr.length == 0){
              this.baokongObj = {
                status:'通过',
                zhixinScore:'0.00',
                weijinCi:'无'
              };
              this.seQinObj = {
                status:'通过',
                zhixinScore:'0.00',
                weijinCi:'无'
              };
              this.zhengZhiObj = {
                status:'通过',
                zhixinScore:'0.00',
                weijinCi:'无'
              };
              this.weijinObj = {
                status:'通过',
                zhixinScore:'0.00',
                weijinCi:'无'
              };
              this.guanggaoObj = {
                status:'通过',
                zhixinScore:'0.00',
                weijinCi:'无'
              }
            }
            if(resultArr.length > 0){
              for(var i = 0;i < resultArr.length;i++){
                this.baokongObj = {
                  status:'',
                  zhixinScore:'',
                  weijinCi:''
                };
                this.seQinObj = {
                  status:'',
                  zhixinScore:'',
                  weijinCi:''
                };
                this.zhengZhiObj = {
                  status:'',
                  zhixinScore:'',
                  weijinCi:''
                };
                this.weijinObj = {
                  status:'',
                  zhixinScore:'',
                  weijinCi:''
                };
                this.guanggaoObj = {
                  status:'',
                  zhixinScore:'',
                  weijinCi:''
                };
                var baokongStr = 'terrorist_group,terrorist,terror_event';
                var seQingStr = 'sexual_porn,sexual_sexy,sexual_intimacy,sexual_vulgar';
                var zhengzhiStr = 'politician,political_event,political_group';
                var weijingPinStr = 'illegal_gamble,illegal_forgery,illegal_trade,illegal_privacy';
                var guanggaoStr = 'ad_brand,ad_marketing';
                //暴恐违禁
                if(baokongStr.indexOf(resultArr[i].type) != -1){
                  var status = resultArr[i].items[0].label;
                  var score = resultArr[i].items[0].confidence;
                  var jinci = !resultArr[i].items[0].extra ? '无' : resultArr[i].items[0].extra;
                  var status1;
                  if(status == 'REJECT'){
                    status1 = '不通过';
                  }
                  else if(status == 'NORMAL'){
                    status1 = '通过';
                  }
                  else if(status == 'REVIEW'){
                    status1 = '待定';
                  }
                  this.baokongObj = {
                    status:status1,
                    zhixinScore:score,
                    weijinCi:jinci
                  };
                }
                else{
                  this.baokongObj = {
                    status:'通过',
                    zhixinScore:'0.00',
                    weijinCi:'无'
                  };
                }
                
                //视频色情
                if(seQingStr.indexOf(resultArr[i].type) != -1){
                  var status = resultArr[i].items[0].label;
                  var score = resultArr[i].items[0].confidence;
                  var jinci = !resultArr[i].items[0].extra ? '无' : resultArr[i].items[0].extra;
                  var status1;
                  if(status == 'REJECT'){
                    status1 = '不通过';
                  }
                  else if(status == 'NORMAL'){
                    status1 = '通过';
                  }
                  else if(status == 'REVIEW'){
                    status1 = '待定';
                  }
                  this.seQinObj = {
                    status:status1,
                    zhixinScore:score,
                    weijinCi:jinci
                  };
                }
                else{
                  this.seQinObj = {
                    status:'通过',
                    zhixinScore:'0.00',
                    weijinCi:'无'
                  };
                }

                //政治敏感
                if(zhengzhiStr.indexOf(resultArr[i].type) != -1){
                  var status = resultArr[i].items[0].label;
                  var score = resultArr[i].items[0].confidence;
                  var jinci = !resultArr[i].items[0].extra ? '无' : resultArr[i].items[0].extra;
                  var status1;
                  if(status == 'REJECT'){
                    status1 = '不通过';
                  }
                  else if(status == 'NORMAL'){
                    status1 = '通过';
                  }
                  else if(status == 'REVIEW'){
                    status1 = '待定';
                  }
                  this.zhengZhiObj = {
                    status:status1,
                    zhixinScore:score,
                    weijinCi:jinci
                  };
                }
                else{
                  this.zhengZhiObj = {
                    status:'通过',
                    zhixinScore:'0.00',
                    weijinCi:'无'
                  };
                }

                //违禁品
                if(weijingPinStr.indexOf(resultArr[i].type) != -1){
                  var status = resultArr[i].items[0].label;
                  var score = resultArr[i].items[0].confidence;
                  var jinci = !resultArr[i].items[0].extra ? '无' : resultArr[i].items[0].extra;
                  var status1;
                  if(status == 'REJECT'){
                    status1 = '不通过';
                  }
                  else if(status == 'NORMAL'){
                    status1 = '通过';
                  }
                  else if(status == 'REVIEW'){
                    status1 = '待定';
                  }
                  this.weijinObj = {
                    status:status1,
                    zhixinScore:score,
                    weijinCi:jinci
                  };
                }
                else{
                  this.weijinObj = {
                    status:'通过',
                    zhixinScore:'0.00',
                    weijinCi:'无'
                  };
                }

                //广告检测
                if(guanggaoStr.indexOf(resultArr[i].type) != -1){
                  var status = resultArr[i].items[0].label;
                  var score = resultArr[i].items[0].confidence;
                  var jinci = !resultArr[i].items[0].extra ? '无' : resultArr[i].items[0].extra;
                  var status1;
                  if(status == 'REJECT'){
                    status1 = '不通过';
                  }
                  else if(status == 'NORMAL'){
                    status1 = '通过';
                  }
                  else if(status == 'REVIEW'){
                    status1 = '待定';
                  }
                  this.guanggaoObj = {
                    status:status1,
                    zhixinScore:score,
                    weijinCi:jinci
                  };
                }
                else{
                  this.guanggaoObj = {
                    status:'通过',
                    zhixinScore:'0.00',
                    weijinCi:'无'
                  };
                }
              }
            }
          }
        }
        else{
          this.ifShowShenLoading = false;
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        this.ifShowShenLoading = false;
        console.log(err)
      });
    },
    shenheUpload(e){
      this.ifShowShenLoading = true;
      var baseUrl = window.config.url;
      var formData = new FormData(); 
      formData.append('files',e);
      formData.append('fileType ','VIDEO');
      formData.append('fileSource','ai');
      this.$axios({
        url:baseUrl + '/ai/alivideo/upload',
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.status == 200){
          var that = this;
          var filePath = res.data.data.fileUrl;
          var baseUrl = window.config.iconUrl;
          var baseUrl1 = window.config.url;
          var videoUrl = baseUrl + '/' +filePath;
          this.getCover(videoUrl,'shenhe');
          var formData = new FormData(); 
          formData.append('video_url',videoUrl);
          formData.append('video_name ','视频审核');
          that.$axios({
            url:baseUrl1 + '/ai/bdvideo/videoCheck',
            method:'post',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res=>{
            if(res.data.code == 200000){
              if(!res.data.data){
                this.ifShowShenLoading = false;
                this.$Message.error('返回数据为空');
                return;
              }
              if(res.data.data.code == 200){
                this.shenheTimer = setInterval(() => {
                  that.queryCheckResult(videoUrl);
                }, 2000);
              }
            }
            else{
              this.ifShowShenLoading = false;
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            this.ifShowShenLoading = false;
            console.log(err)
          });
        }
        else{
          this.$Message.error('请求失败');
          this.ifShowShenLoading = false;
        }
      }).catch(err=>{
        this.ifShowShenLoading = false;
        console.log(err)
      });
    },
    handleBeforeUpload(e){
      this.ifShowLoading = true;
      var baseUrl = window.config.url;
      var formData = new FormData(); 
      formData.append('files',e);
      formData.append('fileType ','VIDEO');
      formData.append('fileSource','ai');
      this.$axios({
        url:baseUrl + '/ai/alivideo/upload',
        method:'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.status == 200){
          var that = this;
          var filePath = res.data.data.fileUrl;
          var baseUrl = window.config.iconUrl;
          var baseUrl1 = window.config.url;
          var videoUrl = baseUrl+ '/' +filePath;
          this.videoUrl = videoUrl;
          this.getCover(videoUrl,'fenxi');
          var formData = new FormData(); 
          formData.append('video_url',videoUrl);
          formData.append('video_name ','视频识别');
          that.$axios({
            url:baseUrl1 + '/ai/alivideo/createVideoAnalysis',
            method:'post',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res=>{
            if(res.data.code == 200000){
              if(!res.data.data){
                this.ifShowLoading = false;
                this.$Message.error('返回数据为空');
                return;
              }
              var taskId = res.data.data.taskId;
              this.timer = setInterval(() => {
                that.getStatus(taskId);
              }, 1000);
            }
            else{
              this.ifShowLoading = false;
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            this.ifShowLoading = false;
            console.log(err)
          });
        }
        else{
          this.ifShowLoading = false;
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        this.ifShowLoading = false;
        console.log(err)
      });
    },
    chuliUpload(e){
      this.ifShowChuLoading = true;
      this.chuliFile = e;
      var that = this;
      var baseUrl = window.config.url;
      var formData = new FormData(); 
      formData.append('files',e);
      formData.append('fileType ','VIDEO');
      formData.append('fileSource','ai');
      this.$axios({
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
            this.ifShowChuLoading = false;
            this.$Message.error('返回数据为空');
            return;
          }
          var filePath = res.data.data.fileUrl;
          var baseUrl = window.config.iconUrl;
          var baseUrl1 = window.config.url;
          var videoUrl = baseUrl + '/' + filePath;
          that.chuliVideoUrl = videoUrl;
          var chuliResultType = that.chuliResultType;
          if(chuliResultType == 'gif'){
            this.getCover(videoUrl,'gif');
          }
          else if(chuliResultType == 'stic'){
            this.getCover(videoUrl,'stic');
          }
        }
        else{
          this.ifShowChuLoading = false;
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        this.ifShowChuLoading = false;
        console.log(err)
      });
    }
  }
}
</script>
<style scoped lang='less'>
.experience {
    width: 100%;
    .experience_container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-self: center;
      align-items: center;
      .shangchuan_text{
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        color: #121C33;
      }
      .video_container{
        width: 100%;
        height: 420px;
        background-color: rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        .RecDetail_left{
          width: 590px;
          height: 100%;
          .RecDetail_left_bottom{
            width: 100%;
            height: 100%;
            position: relative;
            .Img_container{
              width: 100%;
              height: 90%;
              // background: rgba(192,204,218,0.10);
              position: relative;
              img{
                height: 100%;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                height: 100%;
              }
              .bofang{
                width: 40px;
                height: 40px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                z-index: 999;
              }
              .bofang:hover{
                cursor: pointer;
              }
              video{
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                height: 100%;
                opacity: 0;
                object-fit: fill;
              }
              img[src=""],img:not([src]){opacity:0;}
            }
            .ivu-row{
              position: absolute;
              left: 50%;
              top: 110%;
              .ivu-col-span-8{
                height: auto !important;
              }
              /deep/.ivu-spin-main{
                width: 200px;
                height: 200px;
                /deep/.ivu-spin-text{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  /deep/.ivu-icon-ios-loading{
                    font-size: 95px;
                    z-index: 1000000000010;
                    margin-bottom: 10px;
                  }
                }
              }
              transform: translate(-50%,-50%);
              .demo-spin-icon-load{
                  animation: ani-demo-spin 1s linear infinite;
              }
              @keyframes ani-demo-spin {
                  from { transform: rotate(0deg);}
                  50%  { transform: rotate(180deg);}
                  to   { transform: rotate(360deg);}
              }
              .demo-spin-col{
                  height: 100px;
                  position: relative;
                  border: 1px solid #eee;
              }
            }
            .info_btn{
              width: 100%;
              height: 10%;
              background-color: rgba(18,28,51,0.85);
              padding: 10px 20px;
              box-sizing: border-box;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .text{
                font-size: 12px;
                color: #FFFFFF;
                text-align: justify;
              }
              .ivbutton{
                height: 30px;
                align-items: center;
                .ivu-upload{
                  /deep/.ivu-upload-select{
                    .ivu-btn-default{
                      background: #03A971 !important;
                      border: none !important;
                      span{
                        color: #ffffff;
                      }
                    } 
                  }
                  /deep/.ivu-upload-list{
                    li{
                      display: none !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .analy_result_text{
        width: 100%;
        font-size: 18px;
        color: #121C33;
        margin-bottom: 15px;
      }
      .result_container{
        width: 100%;
        overflow: scroll;
        background: #F2F4F7;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 50px;
        .tag_container{
          width: 50%;
          display: flex;
          margin-top: 20px;
          margin-bottom: 30px;
          .result_type{
            width: 80px;
            height: 36px;
            background: rgba(3,169,113,0.10);
            font-size: 14px;
            color: #03A971;
            letter-spacing: 0;
            text-align: center;
            line-height: 36px;
            margin-right: 10px;
          }
        }
        .result_text{
          width: 100%;
          font-size: 14px;
          color: #7A8499;
          letter-spacing: 0;
          line-height: 24px;
          .time_content_container{
            display: flex;
            margin-bottom: 15px;
            .time{
              min-width: 110px;
              font-size: 14px;
              white-space: nowrap;
              color: #121C33;
              letter-spacing: 0;
              line-height: 24px;
              margin-right: 30px;
            }
            .content_container{
              margin-left: 40px;
            }
          }
          .target_container{
            width: 100%;
            .renwuContainer,.renwujuese,.wuti,.biaoshi{
              display: flex;
              .left{
                width: 100px;
              }
              .right{
                display: flex;
              }
            }
          }
        }
        .shenheTongg{
          width: 100%;
          font-size: 18px;
          color: #03A971;
          margin-top: 30px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          img{
            width: 30px;
            margin-right: 10px;
          }
        }
        .shenheBut{
          width: 100%;
          font-size: 18px;
          color: #FF5400;
          margin-top: 30px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          img{
            width: 30px;
            margin-right: 10px;
          }
        }
        .title,.baokongCon,.seQin,.zhengZhi,.weijin,.logo,.guanggao{
          width: 100%;
          display: flex;
          align-items: center;
          div{
            min-width: 100px;
            margin-right: 140px;
            margin-bottom: 10px;
            text-align: center;
            white-space: nowrap;
            border: none !important;
          }
        }
        .baokongCon,.seQin,.zhengZhi,.weijin,.logo,.guanggao{
          div:nth-child(1){
            font-size: 14px;
            color: #121C33;
          }
        }
        .title{
          font-size: 14px;
          color: #7A8499;
        }
        .title_container{
          display: flex;
          align-items: center;
          margin-bottom: 29px;
          width: 100%;
          justify-content: space-between;
          div{
            width: 50%;
            padding: 11px 12px;
            background: rgba(3,169,113,0.10);
            font-size: 14px;
            color: #03A971;
            letter-spacing: 0;
            text-align: center;
          }
          div:nth-child(1){
            margin-right: 10px;
          }
        }
        .chuliResult_container{
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
          .img_container{
            width: 50%;
            height: 180px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            img{
              height: 100%;
            }
          }
        }
      }
      .result_container{
        overflow: hidden !important;
      }
      .result_container:hover{
        overflow: auto !important;
      }
      .result_container::-webkit-scrollbar{
        width: 3px;     
        height: 3px;
      }
      .result_container::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
        border-radius: 5px;
        background: #999999;
        height: 40px;
      }
      .result_container::-webkit-scrollbar-track
      {/*滚动条里面轨道*/
        border-radius: 0;
        background: white;
      }
    }
  }
</style>

