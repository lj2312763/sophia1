<template>
  <div class="experience">
    <div class="fn_container" v-if="routName=='businessLiceRecDetail'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic">
                       <img :src="uploadPic" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg">
          </div>
        </div>
      </div>
    </div>

    <div class="fn_container" v-if="routName=='idCardRecDetail'">
      `<RadioGroup v-model="templateType" class="radio_box">
            <Radio label="IDCARD_PERSON_SIDE">身份证正面</Radio>
            <Radio label="IDCARD_GOV_SIDE">身份证反面</Radio>
        </RadioGroup>
      <div class="content">
        
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :before-upload="handleBeforeUpload1"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                    <div class="pic">
                       <img :src="uploadPic1" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg1">
           
          </div>
        </div>
      </div>
    </div>

    <div class="fn_container" v-if="routName=='carInvoRecDetail'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload2"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic">
                       <img :src="uploadPic2" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg2">
          </div>
        </div>
      </div>
    </div>

    <div class="fn_container" v-if="routName=='jiashiLiceRecDetail'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                 :show-upload-list="false"
                :before-upload="handleBeforeUpload3"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic">
                       <img :src="uploadPic3" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg3">
          </div>
        </div>
      </div>
    </div>

    <div class="fn_container" v-if="routName=='ticketTextRecDetail'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload4"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                >
                <div class="left_up">
                   <div class="pic">
                       <img :src="uploadPic4" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg4">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
     data() {
      return {
        templateType:'IDCARD_GOV_SIDE',
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
        loading:false,
        uploadPic4:require("@/assets/images/carSence/fapiao.png"),
        msg4:`<p>证件类型：增值税发票-增值税发票常用条目</p><p>序号：1100154130</p><p>编号：00772445</p><p>日期：2016年11月15日</p><p>密码区：16-565353*1*00379-658/>3<2/266>2*+<>48-853064<771-3+5><0650>1-24743*1840368>+29/<>+3<299>248<>0+-853*27<1<2></p><p>税率：6%</p><p>金额：￥5785.38</p><p>税额：￥347.12</p><p>总额：￥6132.50</p><p>购货单位名称：北京百度网讯科技有限公司</p><p>购货单位纳税人识别号：110108802100433</p><p>购货单位开户行及帐号：招商银行北京分行上地支行110902160610706</p><p>销货单位名称：北京圣紫茗管理咨询有限公司</p><p>销货单位纳税人识别号：110105057317113</p><p>销货单位开户行及帐号：上海浦发银行91150154740007408</p><p>二维码：01,01,1100154130,00772445,5785.38,20161115,,7EFE,</p><p>发票类型：增值税专用发票</p>`,
        uploadPic3:require("@/assets/images/carSence/2.png"),
        msg3:`<p>证件类型：机动车驾驶证-驾驶证正页</p><p>证号：3704811989111</p><p>初次领证日期：2016-10-12</p><p>起始有效日期：2016-10-01</p><p>姓名：陈涛</p><p>性别：男</p><p>国籍：中国</p><p>住址：山东省腰州市龙阳镇工号工工</p><p>出生日期：1989-01-01</p><p>准驾车型：C1</p><p>有效期限：2016-10-2至2022-10-2</p><p>头像： </p>`,
        uploadPic2:require("@/assets/images/carSence/41.png"),
        msg2:`<p>证件类型：增值税发票-增值税发票常用条目</p>
            <p>序号：2415000000</p>
            <p>编号：11710000</p>
            <p>日期：20180122</p>
            <p>密码区：00650*>2<60*96*>87>-12<2/41-7**970-970-9781012<*912*/*57<<2-4+>136611*6+4*1*+571-*2465-*50<521-3</p>
            <p>税率：3%</p>`,
        uploadPic1:require("@/assets/images/card/shen1.png"),
        msg1:`<p>证件类型：二代身份证-身份证签发机关页</p>
            <p>签发机关：天津市公安局和平分局</p>
            <p>有效期限：20190102-20390102</p>`,
        uploadPic:require("@/assets/images/card/12DA9F7A1DD38F3.png"),
        msg:`<p>注册号：330200334928321</p>
            <p>社会信用代码：997449337210928</p>
            <p>单位名称：成都市华莲商贸有限公司</p>
            <p>住址：四川省成都市新林大路121</p>
            <p>法定代表人：李双双</p>
            <p>有效日期至：2050年08月21日</p>
            <p>成立日期：无</p>
            <p>类型：无</p>`,
      }
    },
    created() {
      this.routName=this.$route.name;
    },
    methods:{
      handleBeforeUpload4(file){
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType=VAT&needScore=true",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            if(res.data.data){
              this.uploadPic4="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.data.form[0].page[0].cell;
              let result1=res.data.data.data.form[0];
              let result2=res.data.data.data.form[0].page[0];
              let html=`<p>证件类型：${result1.name}-${result2.name}</p>`;
              result.forEach(item=>{
                if(item.result){
                  if(item.result[0].result){
                    html+=`<p>${item.name}：${item.result[0].result}</p>`
                  }
                }
              })
              this.msg4=html;
              console.log(this.msg4)
            }else{
              alert("后台数据返回为空")
            }
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      handleBeforeUpload3(file){
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType=DLC&needScore=true",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            if(res.data.data){
              this.uploadPic3="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.data.form[0].page[0].cell;
              let result1=res.data.data.data.form[0];
              let result2=res.data.data.data.form[0].page[0];
              let html=`<p>证件类型：${result1.name}-${result2.name}</p>`;
              result.forEach(item=>{
                if(item.result){
                  if(item.result[0].result){
                    html+=`<p>${item.name}：${item.result[0].result}</p>`
                  }
                }
              })
              this.msg3=html;
              console.log(this.msg3)
            }else{
              alert("后台数据返回为空")
            }
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      handleBeforeUpload2(file){
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType=VAT&needScore=true",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            if(res.data.data){
              this.uploadPic2="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.data.form[0].page[0].cell;
              let result1=res.data.data.data.form[0];
              let result2=res.data.data.data.form[0].page[0];
              let html=`<p>证件类型：${result1.name}-${result2.name}</p>`;
              result.forEach(item=>{
                if(item.result){
                  html+=`<p>${item.name}：${item.result[0].result}</p>`
                }
              })
              this.msg2=html;
            }else{
              alert("后台数据返回为空")
            }
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      handleBeforeUpload1(file){
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType="+this.templateType+"&needScore=true",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
            this.uploadPic1="data:image/png;base64,"+res.data.data.base64;
            let result=res.data.data.data.form[0].page[0].cell;
            let result1=res.data.data.data.form[0];
            let result2=res.data.data.data.form[0].page[0];
            let html=`<p>证件类型：${result1.name}-${result2.name}</p>`;
            result.forEach(item=>{
              if(item.result){
                html+=`<p>${item.name}：${item.result[0].result}</p>`
              }
            })
            this.msg1=html;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      handleBeforeUpload(file){
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType=BL&needScore=true",
          data: formData,
        }).then(res => {
          if(res.data.code == 200000){
             this.uploadPic="data:image/png;base64,"+res.data.data.base64;
            let result=res.data.data.data.form[0].page[0].cell;
            let result1=res.data.data.data.form[0];
            let html=`<p>证件类型：${result1.name}</p>`;
            result.forEach(item=>{
              if(item.result){
                html+=`<p>${item.name}：${item.result[0].result}</p>`
              }
            })
            this.msg=html;
          }
        }).catch(err=>{
          console.log(err);
        });
      }
  

  }
}
</script>

<style lang='less'>
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
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
      .radio_box{
        margin-bottom: 20px;
      }
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
              position: relative;
              .pic{
                width: 100%;
                // margin-left:10%;
                img{
                  width: 100%;
                  display: block;
                }
              }
              .intro{
                display: flex;
                justify-content: space-between;
                padding:0 15px;
                align-items: center;
                opacity: 0.85;
                background: #121C33;
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                height: 50px;
                .text{
                   font-size: 12px;
                  color: #FFFFFF;
                  text-align: justify;
                }
               
              }
            }
          }
        }
        .right{
           flex:1;
           margin-left:20px;
          .right_box{
            overflow: auto;
            font-size: 14px;
            color: #121C33;
            letter-spacing: 0;
            line-height: 24px;
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
