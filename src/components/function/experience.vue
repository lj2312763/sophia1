<template>
  <div class="experience">
    <div class="experience_container" v-if="detailType == 'cifafenxi'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150" v-model="areaText"></textarea>
        <div class="kaishi_fenxi" @click="toAnalyze">开始分析</div>
        <div class="max_length">最多输入150个字</div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="content">
              <div class="item" 
                v-for="(item,index) in contenArr" 
                :key="index" 
                @click="changeBgc(index,item)" 
                ref="item" 
                @mouseleave="hideCixing">
              <div>{{item.word}}</div>
              <div class="triangle" ref="triangle"></div>  
              <div class="leftCixing" ref="leftCixing">词性：{{item.nature.nameContrast}}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="cixing_leibie">词性类别</div>  
          <div class="cixing_leibie_container">
            <div v-for="(item,index) in uniqueCixingArr" :key="index" class="cixing" ref="cixing" @click="checkCixing(item,index)">
              {{item.nature.nameContrast}}
            </div>
          </div>
          <!-- <div class="cixing_leibie">专有名词类别：</div>  
          <div class="cixing_leibie_container">
            <div v-for="(item,index) in typeArr" :key="index" class="cixing" ref="mingShiti" @click="mingShiti(item)">
              {{item.name}}-{{item.value}}
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="Detail_experience_container" v-else-if="detailType == 'passportRecDetail' || detailType == 'returnPerRecDetail' || detailType == 'xshiLiceRecDetail'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_top">上传图片：</div>
        <div class="RecDetail_left_bottom">
          <div class="Img_container">
            <img :src="passPortImg">
          </div>
          <div class="info_btn">
            <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
            <div class="ivbutton">
              <Upload
              action="" 
              :format="['jpg','jpeg','png','bmp']" 
              :max-size="1024"
              :before-upload="handleBeforeUpload"
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      <div class="RecDetail_right">
        <div class="RecDetail_right_top">识别结果：</div>
        <div class="RecDetail_right_bottom">
          <p v-for="(item,index) in resultArr" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="Detail_experience_container" v-else-if="detailType == 'netWorkPicRecDetail' || detailType == 'numberRecDetail' || detailType == 'rqCodeRecDetail' || detailType == 'sealDetectDetail'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_top">上传图片：</div>
        <div class="RecDetail_left_bottom">
          <div class="Img_container">
            <img :src="passPortImg">
          </div>
          <div class="info_btn">
            <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
            <div class="ivbutton">
              <Upload
              action="" 
              :format="['jpg','jpeg','png','bmp']" 
              :max-size="1024"
              :before-upload="handleBeforeUpload"
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      <div class="RecDetail_right">
        <div class="RecDetail_right_top">识别结果：</div>
        <div class="RecDetail_right_bottom">
          <div class="titile_container">
            <span class="title_left">序号</span><span class="title_right">内容</span>
          </div>
          <div class="content_container" v-for="(item,index) in otherResultArr" :key="index">
            <div class="index">{{item.index}}</div>
            <div class="content">{{item.cont}}</div>
          </div>
          <p v-for="(item,index) in resultArr" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
    <Alert type="warning" show-icon closable v-show="ifShowMsg">
        警告
      <template slot="desc">
        无法识别。
      </template>
    </Alert>
  </div>
</template>

<script>
  export default {
    props: {
      detailType:{
        type:String,
        required:true
      }
    },
    created() {
    },
    data() {
      return {
        isWork:false,
        upTime:10,
        transMsg:"请说出你想说的话...",
        buttonMsg:"开始录音",
        flag:0,
        cixing:'',
        shitishibie:'',
        areaText:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
        contenArr:[],
        recorder:null,
        ifShowCixing:false,
        uniqueCixingArr:[],
        showItem:false,
        passPortImg:null,
        resultArr:[],
        otherResultArr:[],
        ifShowMsg:false
      }
    },
    mounted(){
      this.toAnalyze();
      this.changeData();
      this.recorder = new Recorder({
          sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,         // 声道，支持 1 或 2， 默认是1
          compiling: false,       // 是否边录边转换，默认是false
      });
    },
    methods:{
      changeBgc(index,item){
        var domArr = this.$refs.item;
        for(var i =0 ;i < domArr.length;i++){
          if(index == i){
            domArr[i].style = 'background-color: #66b3ff;color: #fff;border-color: #66b3ff;';
          }
          else{
            domArr[i].style = 'background-color:white;color:gray;';
          }
        }
      },
      toAnalyze(){
        var text = this.areaText;
        this.$axios({
          method: "get",
          url: "/v1/api/daKuai/standardParticiple",
          params: {
            str:text
          }
        }).then(res => {
          if(res.status == 200){
            var resData = res.data;
            function unique(arr=[]){
              const res = new Map();
              return arr.filter((item)=> !res.has(item.nature.name) && res.set(item.nature.name,1))
            }
            this.uniqueCixingArr = unique(res.data);
            this.contenArr = resData;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      checkCixing(item,index){
        if(this.$refs.cixing){
          var cixingArr = this.$refs.cixing;
          var itemDom = this.$refs.item; //要修改颜色
          var contenArr = this.contenArr;
          var searchArr = [];
          for(var m = 0;m <itemDom.length;m++){
            itemDom[m].style = 'background:none;border: 1px solid #03;font-size: 14px;color:#3D4966;';
          }
          for(var i = 0;i<cixingArr.length;i++){
            if(index == i){
              cixingArr[i].style = 'background: #03A971;border: 1px solid #03A971;font-size: 14px;color: #FFFFFF;';
            }
            else{
              cixingArr[i].style = 'background:none;border: 1px solid #3D4966;font-size: 14px;color: #3D4966';
            }
          }
          for(var j =0 ;j < contenArr.length;j++){
            if(contenArr[j].nature.name == item.nature.name){
              searchArr.push(contenArr[j])
            }
          }
          for(var k = 0;k < searchArr.length;k++){
            for(var l = 0 ;l < itemDom.length;l++){
              if(searchArr[k].word == itemDom[l].innerText){
                itemDom[l].style = 'background: #03A971;border: 1px solid #03A971;font-size: 14px;color: #FFFFFF;';
              }
            }
          }
        }
      },
      hideCixing(){
        var triangle  = this.$refs.triangle;
        var cixing = this.$refs.leftCixing;
        for(var i = 0; i < triangle.length;i++){
            triangle[i].style = 'display: none;'
        }
        for(var j =0 ;j < cixing.length;j++){
          cixing[j].style = 'display: none;'
        }
      },
      changeData(){
        if(this.detailType == 'passportRecDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/huzhao.png');
          this.resultArr = [
            '证件号：330200334928321',
            '姓名：乌日奇和',
            '性别：男',
            '出生地点：内蒙古',
            '签发地点：内蒙古',
            '出生日期：1995年06月12日',
            '签发日期：2013年01月06日',
            '有效期：2013年01月05日',
            '签发机关：公安部出入境管理局'
          ];
        }
        else if(this.detailType == 'returnPerRecDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/gangaoImg.png');
           this.resultArr = [
             '姓名：刘芷兰',
             'Name：LAU,TSZLAN',
             '出生日期：1981.08.03',
             '有效期限：201212120-20201211',
             '性别：女',
             '证件号码：H12345678'
           ];
        }
        else if(this.detailType == 'xshiLiceRecDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/fuExpeXingshizheng.png');
           this.resultArr = [
             '车辆识别代号：LBV8W11',
             '注册日期：2018-09-07',
             '发证日期：2018-09-07',
             '号牌号码：鲁A闽杆8',
             '车辆类型：小型轿车',
             '所有人：济南',
             '住址：山东省浙南市柳阴区号日国区南山工公路厂',
             '使用性质：非运营',
             '品牌型号：宝马牌BWM',
             '发动机号码：A31'
           ];
        }
        else if(this.detailType == 'netWorkPicRecDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/netWorkExper.png');
           this.otherResultArr = [
             {
              index:1,
              cont:'梦想起航'
             },
             {
              index:2,
              cont:'前往下一个目的地'
             },
             {
              index:3,
              cont:'开始新的旅程'
             }
           ];
        }
        else if(this.detailType == 'numberRecDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/shuziExper.png');
           this.otherResultArr = [
             {
               index:1,
               cont:'1460896673 宽度： 261  高度： 36 左间距： 531 上间距： 792'
             }
           ];
        }  
        else if(this.detailType == 'rqCodeRecDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/erweimaExper.png');
           this.otherResultArr = [
             {
               index:1,
               cont:'类型： QR_CODE 内容： [ "hello world" ]'
             }
           ];
        }  
        else if(this.detailType == 'sealDetectDetail'){
          this.passPortImg = require('../../assets/images/aiSmartAppDetail/yinzhangExper.png');
           this.otherResultArr = [
             {
               index:1,
               cont:'宽度： 292  高度： 201  上边距： 191  左边距： 713'
             },
             {
               index:2,
               cont:'宽度： 384  高度： 290  上边距： 514  左边距： 978'
             }
           ];
        }  
      },
      handleBeforeUpload(e){
        var url = window.config.url+'/ai/ocr/distinguish';
        if(this.detailType == 'passportRecDetail'){
          var formData = new FormData(); 
          formData.append('files',e);
          formData.append('capKey','CERTIFICATION');
          formData.append('templateType','PCN');
          this.$axios({
            url:url,
            method:'post',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res=>{
            if(res.status == 200){
              if(!res.data.data){
                this.ifShowMsg = true;
                return
              }
              var resultData = res.data.data.data.form[0].page[0].cell;
              var base64img = res.data.data.base64;
              var imgType = e.name.split('.')[1];
              this.resultArr = [];
              this.passPortImg = '';
              this.passPortImg = `data:image/${imgType};base64,` + base64img;
              for(var i =0; i<resultData.length;i++){
                if(i > 1){
                  if(i == 2){
                    this.resultArr.push(resultData[i].name + '：' + resultData[i].result[0].result)
                  }
                  else if(i == 3 || i == 4){
                    var xing,ming,xingMing;
                    if(i == 3){
                      xing = resultData[i].result[0].result;
                      continue;
                    }
                    else if(i == 4){
                      ming = resultData[i].result[0].result;
                    }
                    xingMing = xing + ming;
                    this.resultArr.push('姓名：' + xingMing)
                  }
                  else{
                    this.resultArr.push(resultData[i].name + '：' + resultData[i].result[0].result)
                  }
                }
              }
            }
          }).catch(err=>{
            console.log(err)
          });
        }
        else if(this.detailType == 'returnPerRecDetail'){
          var templateType = 'PCN';
          this.$axios({
            url:url,
            method:'post',
            data:  {
              file:file,
              capKey:capKey,
              templateType:templateType,
              needScore:true
            }
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          });
        }
        else  if(this.detailType == 'xshiLiceRecDetail'){
          var formData = new FormData(); 
          formData.append('files',e);
          formData.append('capKey','CERTIFICATION');
          formData.append('templateType','VLC');
          this.$axios({
            url:url,
            method:'post',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res=>{
            if(res.status == 200){
              if(!res.data.data){
                this.ifShowMsg = true;
                return
              }
              var resultData = res.data.data.data.form[0].page[0].cell;
              console.log(resultData + 'resultData')
              var base64img = res.data.data.base64;
              var imgType = e.name.split('.')[1];
              this.resultArr = [];
              this.passPortImg = '';
              this.passPortImg = `data:image/${imgType};base64,` + base64img;
              for(var i =0; i<resultData.length;i++){
                this.resultArr.push(resultData[i].name + '：' + resultData[i].result[0].result);
              }
            }
          }).catch(err=>{
            console.log(err)
          });
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  .experience {
    width: 100%;
    .experience_container {
      width: 1200px;
      .top {
        box-sizing: border-box;
        border: 1px solid #EBECF0;
        background: rgba(192,204,218,0.10);
        display: flex;
        flex-direction: column;
        align-items: center;
        textarea {
          width: 100%;
          height: 100px;
          font-size: 14px;
          color: #7A8499;
          text-align: justify;
          line-height: 22px;
          background-color: rgba(192,204,218,0.10);
          border: none;
          outline: none;
          resize: none;
        }
        .kaishi_fenxi{
          width: 100px;
          height: 28px;
          text-align: center;
          background: #03A971;
          border-radius: 3px;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 28px;
          margin-top: 10px;
        }
        .kaishi_fenxi:hover{
          cursor: pointer;
        }
        .max_length{
          width: 100%;
          font-size: 12px;
          color: #B8BECC;
          margin-top: -14px;
        }
      }
      .bottom {
        width: 100%;
        margin-top: 30px;
        box-sizing: border-box;
        display: flex;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        .left{
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 22px;
          .content{
            display: flex;
            flex-wrap: wrap;
            .item{
              padding:2px 12px;
              height:24px;
              border: 1px solid #3D4966;
              margin-right: 10px;
              margin-bottom: 10px;
              text-align: center;
              font-size: 14px;
              color: #3D4966;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              .triangle{
                width: 0; 
                height: 0;
                display: none;
                margin-top: -10px;
                border-width: 10px;
                border-style: solid;
                border-color: transparent transparent rgba(3,169,113,0.60) transparent;
              }
              .leftCixing{
                background-color: rgba(3,169,113,0.60);
                box-shadow: 0 8px 24px 0 #EBECF0;
                padding: 13px;
                display: none;
                color: #FFFFFF;
              }
            }
          }
        }
        .right{
          width: 40%;
          padding: 22px 29.5px;
          box-sizing: border-box;
          border-left:1px solid #EBECF0;  
          .cixing_leibie{
            font-size: 18px;
            color: #121C33;
          }
          .cixing_leibie_container{
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .cixing{
              height:24px;
              padding:2px 12px;
              border: 1px solid #3D4966;
              text-align: center;
              font-size: 14px;
              color: #3D4966;
              margin-right: 10px;
              margin-bottom: 10px;
            }
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
    .Detail_experience_container {
      width: 1200px;
      height: 335px;
      display: flex;
      align-items: center;
      .RecDetail_left{
        width: 650px;
        height: 100%;
        margin-right: 20px;
        .RecDetail_left_top{
          width: 100%;
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .RecDetail_left_bottom{
          width: 100%;
          height: 290px;
          .Img_container{
            width: 100%;
            height: 240px;
            background: rgba(192,204,218,0.10);
            img{
              width: 100%;
              height: 100%;
            }
            img[src=""],img:not([src]){opacity:0;}
          }
          .info_btn{
            width: 100%;
            height: 50px;
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
              width: 100px;
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
              }
            }
          }
        }
      }
      .RecDetail_right{
        width: 650px;
        height: 100%;
        .RecDetail_right_top{
          width: 100%;
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .RecDetail_right_bottom{
          width: 100%;
          height: 290px;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          padding: 20px;
          box-sizing: border-box;
          overflow: auto;
          p{
            font-size: 14px;
            color: #121C33;
            letter-spacing: 0;
            line-height: 24px;
          }
          .titile_container{
            font-size: 14px;
            color: #121C33;
            letter-spacing: 0;
            line-height: 24px;
            .title_left{
              display: inline-block;
              margin-right: 35px;
              width: 41px;
              margin-bottom: 20px;
            }
          }
          .content_container{
              display: flex;
              align-items: center;
              .index{
                width: 41px;
                margin-right: 35px;
              }
          }
        }
      }
    }
  }
</style>
