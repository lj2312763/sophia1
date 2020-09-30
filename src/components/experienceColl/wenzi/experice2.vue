<template>
  <div class="experice2_container">
    <div class="Detail_experience_container" v-if="routeId == '2.1.3' || routeId == '2.1.7' || routeId == '2.2.8' || routeId == '2.3.2'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_top">上传图片：</div>
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <img :src="leftImg">
          </div>
          <div class="info_btn">
            <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
            <div class="ivbutton">
              <Upload
              action="" 
              :format="['jpg','jpeg','png','bmp']" 
              accept="image/png,image/jpeg,image/jpg,image/bmp"
              :max-size="5120"
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

    <!--pdf文字提取-->
    <div class="Detail_experience_container" v-if="routeId == '2.7.1'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_bottom">
          <div class="Img_container">
            <iframe :src="tiquPdf"></iframe>
          </div>
          <div class="info_btn">
            <div class="text">文件大小不超过10M</div>
            <div class="ivbutton">
              <Upload
              action="" 
              :format="['pdf']" 
              accept=".pdf"
              :max-size="51200"
              :before-upload="tiquPdfBeforeUpload"
              >
                <Button>上传PDF</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      <div class="RecDetail_right">
        <div class="RecDetail_right_bottom">
          <div class="RecDetail_right_top">识别结果：</div>
          <p>{{tiquResult}}</p>
        </div>
      </div>
    </div>

    <!--pdf页面旋转-->
    <div class="pdf_rotated_container" v-if="routeId == '2.7.2'">
      <div class="btn_container">
        <div class="btn" ref='rotatedBtn'><div @click="changeRotatedNum(0)"><img :src="btnImg">顺时针90度</div><div @click="changeRotatedNum(1)"><img :src="btnImg">顺时针180度</div><div @click="changeRotatedNum(2)"><img :src="btnImg">顺时针270度</div></div>
      </div>
      <div class="content_container">
        <iframe :src="pdfSrc"></iframe>
      </div>
      <div class="upload_container">
        <div class="up_text">文件大小不超过10M</div>
        <div class="upload_btn">
          <Upload
            action="" 
            :format="['pdf']" 
            accept=".pdf"
            :max-size="51200"
            :before-upload="pdfRotateBeforeUpload"
          >
            <Button>上传PDF</Button>
          </Upload>
        </div>
      </div>
    </div>

    <!--loading-->
    <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
            <Icon type="ios-loading" size=88 class="demo-spin-icon-load"></Icon>
            <div>获取数据中，请稍后...</div>
        </Spin>
    </Col>

  </div>
</template>
<script>
import { imgPreviewBase64 , getImgSize} from '@/assets/js/imgPreviewBase64';
export default {
  props:{
    routeId:{
      type:String
    }
  },
  data () {
    return {
      whFlag:true,
      leftImg:null,
      resultArr:[],
      btnImg:require('../../../assets/images/shibie/shunRotate.png'),
      rotateNum:90,
      pdfSrc:'',
      pdfFile:null,
      ifShowLoading:false,
      tiquPdf:'',
      tiquResult:''
    }
  },
  mounted(){
    this.changeData(this.routeId);
  },
  watch:{
    routeId(newVal,oldVal){
      this.changeData(newVal);
    }
  },
  methods:{
    changeRotatedNum(num){
      var rotatedNumDom = this.$refs.rotatedBtn.childNodes;
      if(num == 0){
        this.rotateNum = 90;
      }
      else if(num == 1){
        this.rotateNum = 180;
      }
      else if(num == 2){
        this.rotateNum = 270;
      }
      for(var i = 0;i < rotatedNumDom.length;i++){
        if(num == i){
          rotatedNumDom[i].style = 'opacity:1;';
        }
        else{
          rotatedNumDom[i].style = 'opacity: 0.39;';
        }
      }
      this.pdfRotateBeforeUpload();
    },
    changeData(val){
      if(val == '2.1.3'){
        this.leftImg = require('../../../assets/images/aiSmartAppDetail/huzhao.png');
        this.resultArr = [
         "姓名：乌日奇利", "护照签发地点：内蒙古/NEIMONGOL", "签发机关：公安部出入境管理局", "签发日期：20130106", "出生地点：内蒙古/NEIMONGOL", "生日：19950612", "有效期至：20230105", "姓名拼音：WURIQIHE", "性别：男/M"
        ];
      }
      else if(val == '2.1.7'){
        this.leftImg = require('../../../assets/images/aiSmartAppDetail/gangaoImg.png');
          this.resultArr = [
            '姓名：刘芷兰',
            'Name：LAU,TSZLAN',
            '出生日期：1981.08.03',
            '有效期限：201212120-20201211',
            '性别：女',
            '证件号码：H12345678'
          ];
      }
      else if(val == '2.2.8'){
        this.leftImg = require('../../../assets/images/aiSmartAppDetail/tongyongFapiao.png');
          this.resultArr = [
            '开票日期：2012-11-10',
            '行业分类：文化艺术业',
            '发票代码：111001271011',
            '发票号码：03694979',
            '金额：44.00'
          ];
      }
      else if(val == '2.3.2'){
          this.leftImg = require('../../../assets/images/aiSmartAppDetail/fuExpeXingshizheng.png');
           this.resultArr = [
             "车辆识别代号：LGBG42E06HY6HY041", "住址：山东省滕州市龙阳镇", "品牌型号：东风日产牌DFL7165", "发证日期：20170204", "车辆类型：小型轿车", "所有人：陈涛", "使用性质：非营运", "发动机号码：138955", "号牌号码：鲁D282", "注册日期：20170204"
           ];
      }
    },
    handleBeforeUpload(e){
      this.ifShowLoading = true;
      var _this = this;
      imgPreviewBase64(_this, e, function(base64){
        _this.leftImg=base64;
         getImgSize(_this.leftImg).then(res => {
          _this.whFlag = res.flag;
        });
      })
      var url = window.config.url+'/ai/bdocr/passport?img_type=FILES';
      if(this.routeId == '2.1.3'){
        var formData = new FormData(); 
        formData.append('files',e);
        this.resultArr = [];
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
            this.ifShowLoading = false;
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            let result=res.data.data.words_result;
            for(var key in result){
                this.resultArr.push(key + '：' + result[key].words)
            }
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
      else if(this.routeId == '2.1.7'){
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
      else if(this.routeId == '2.3.2'){
          var formData = new FormData(); 
          formData.append('files',e);
          this.resultArr = [];
          this.$axios({
            url:window.config.url+'/ai/bdocr/vehicleLicense?img_type=FILES',
            method:'post',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res=>{
            if(res.status == 200){
              this.ifShowLoading = false;
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var resultData = res.data.data.words_result;
              
              for(var i in  resultData){
                this.resultArr.push(i + '：' + resultData[i].words);
              }
              console.log(this.resultArr)
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
    },
    pdfRotateBeforeUpload(e){
      this.ifShowLoading = true;
      var url = window.config.url+'/api/pdf/rotated';
      var num = this.rotateNum
      var formData = new FormData(); 
      var totalFile;
      var that = this;
      if(e){
        this.pdfFile = e;
        totalFile = e;
      }
      else{
        totalFile = this.pdfFile;
      }
      if(!totalFile){
        this.ifShowLoading = false;
        return
      }
      formData.append('file',totalFile);
      formData.append('num',num);
      this.$axios({
        url:url,
        method:'post',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        },
        data:formData
      }).then(res=>{
        if(res.data.code == 200){
          var pdfData = res.data.data;
          if(!pdfData){
            that.ifShowLoading = false;
            this.$Message.error('返回数据为空');
            return;
          }
          that.pdfSrc = '';
          setTimeout(() => {
            that.ifShowLoading = false;
            that.pdfSrc = pdfData;
          }, 500);
        }
        else{
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    tiquPdfBeforeUpload(e){
      this.ifShowLoading = true;
      var url = window.config.url+'/ai/pdfReco/pdfToText';
      var formData = new FormData(); 
      var that = this;
      formData.append('file',e);
      this.$axios({
        url:url,
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
          var tiqupdfData = res.data.data.text;
          var tiquPdfUrl = res.data.data.pdfUrl;
          that.tiquPdf = '';
          setTimeout(() => {
            that.tiquPdf = tiquPdfUrl;
          }, 500);
          that.tiquResult = tiqupdfData;
        }
        else{
          this.ifShowLoading = false;
          this.$Message.error('请求失败');
        }
      }).catch(err=>{
        this.ifShowLoading = false;
        this.$Message.error('请求失败');
        console.log(err)
      });
    }
  }
}
</script>
<style scoped lang='less'>
.experice2_container{
  width: 100%;
  position: relative;
  .Detail_experience_container {
    width: 100%;
    height: 335px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .RecDetail_left{
      width: 49%;
      height: 100%;
      .RecDetail_left_top{
        width: 100%;
        font-size: 18px;
        color: #121C33;
        margin-bottom: 20px;
      }
      .RecDetail_left_bottom{
        width: 100%;
        height: 290px;
        position: relative;
        .Img_container{
          width: 100%;
          height: 100%;
          background: rgba(192,204,218,0.10);
          &.whFlag {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            img {
              width: auto;
              height: 100%;
            }

            canvas {
              width: auto;
              height: 100%;
            }
          }
          img{
            width: 100%;
            // height: 100%;
            display: block;
          }
          img[src=""],img:not([src]){opacity:0;}
          iframe{
            width: 100%;
            height: 100%;
            border: none;
          }
        }
        .info_btn{
          width: 100%;
          height: 50px;
          position: absolute;
          left:0;
          bottom:0;
          background-color: rgba(18,28,51,0.85);
          padding: 10px 10px;
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
              /deep/.ivu-upload-list{
                display: none;
              }
            }
          }
        }
      }
    }
    .RecDetail_right{
      width: 49%;
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
      .RecDetail_right_bottom{
        overflow: hidden !important;
      }
      .RecDetail_right_bottom:hover{
        overflow: auto !important;
      }
      .RecDetail_right_bottom::-webkit-scrollbar{
        width: 5px;     
        height: 5px;
      }
      .RecDetail_right_bottom::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background: #999999;
        height: 40px;
      }
      .RecDetail_right_bottom::-webkit-scrollbar-track
      {
        border-radius: 0;
        background: white;
      }
    }
  }
  .pdf_rotated_container{
    width: 100%;
    height: 530px;
    position: relative;
    .btn_container{
      width: 100%;
      height:50px;
      opacity: 0.85;
      background: #121C33;
      display: flex;
      justify-content: center;
      .btn{
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
          background: #03A971;
          border-radius: 3px;
          padding: 4px 12px;
          margin-right: 24px;
          font-size: 14px;
          opacity: 0.39;
          color: #FFFFFF;
          letter-spacing: 0;
          display: flex;
          align-items: center;
          img{
            width: 17px;
            margin-right: 5px;
          }
        }
        div:nth-child(1){
          opacity: 1;
        }
      }
    }
    .content_container{
      width: 100%;
      height: 430px;
      background-color: #FFF;
      iframe{
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .upload_container{
      width: 100%;
      height: 50px;
      opacity: 0.85;
      background: #121C33;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      .up_text{
        font-size: 12px;
        color: #FFFFFF;
        text-align: justify;
      }
      .upload_btn{
        background: #03A971;
        border-radius: 3px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        align-items: center;
        .ivu-upload{
          height: 30px;
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
            display: none;
          }
        }
      }
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
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      /deep/.ivu-spin-text{
        width: 200px;
      }
  }
}
</style>

