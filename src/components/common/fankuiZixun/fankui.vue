<template>
  <div class="fankui_container">
      <div class="banner">
           <div class="content">
                <div class="title">建议反馈</div>
                <div class="desc">您的意见是我们不断改进的动力，请留下您在使用过程中遇到的问题或提出宝贵建议</div>
            </div>
      </div>
      <div class="content_container">
          <div class="content">
              <div class="item_container">
                  <div class="lebal"><span>*</span>请选择建议类型：</div>
                  <div class="desc_content">
                    <RadioGroup v-model="fankuiType">
                        <Radio label="产品建议"></Radio>
                        <Radio label="功能缺陷"></Radio>
                        <Radio label="文档问题"></Radio>
                        <Radio label="其他"></Radio>
                    </RadioGroup>
                  </div>
              </div>
              <div class="item_container">
                  <div class="lebal"><span>*</span>标题：</div>
                  <div class="desc_content">
                      <Input v-model="fankuiTitle" placeholder="请输入标题最多50个字符" style="width: 360px;height:40px" maxlength="50" @on-blur="checkTitleRequire"/>
                      <p style="color: #ed4014;" v-show="ifShowTitleinfo">标题是必输项</p>
                  </div>
              </div>
              <div class="item_container">
                  <div class="lebal"><span>*</span>产品名称：</div>
                  <div class="desc_content">
                      <Input v-model="productTitle" placeholder="请输入产品名称" style="width: 360px;height:40px" @on-blur="checkProTitleRequire"/>
                      <p style="color: #ed4014;" v-show="ifShowProductinfo">产品名称是必输项</p>
                  </div>
              </div>
              <div class="item_container">
                  <div class="lebal"><span>*</span>建议反馈内容：</div>
                  <div class="desc_content">
                      <Input v-model="fankuiContent" placeholder="请输入建议反馈内容" type="textarea" style="width:621px;height:182px;margin-bottom:10px" @on-blur="checkNeirRequire"/>
                      <p style="color: #ed4014;" v-show="ifShowJianyiinfo">建议反馈内容是必输项</p>
                  </div>
              </div>
              <div class="item_container">
                  <div class="lebal">附件：</div>
                  <div class="desc_content fujian_upload">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/" 
                        :format="['jpg','jpeg','png','gif']" 
                        accept="image/png,image/jpeg,image/jpg,image/gif"
                        :max-size="5120"
                        :before-upload="handleBeforeUpload"
                    >
                        <Button>点击上传</Button>
                    </Upload>
                    <div class="upload_desc">选择文件,允许的文件类型：png，jpg，gif，jpeg，且不超过5MB</div>
                  </div>
              </div>
              <div class="item_container">
                  <div class="lebal"><span>*</span>联系方式：</div>
                  <div class="desc_content">
                    <CheckboxGroup v-model="contact_methods" @on-change="contactMethods">
                        <Checkbox label="邮件" value='email'></Checkbox>
                        <Checkbox label="电话" value='tel'></Checkbox>
                    </CheckboxGroup>
                  </div>
              </div>
              <div class="item_container" v-show="ifShowEmail">
                  <div class="lebal"><span>*</span>邮箱地址：</div>
                  <div class="desc_content">
                      <Input v-model="mailbox" placeholder="请输入您的邮箱" style="width: 360px;height:40px" @on-blur="checkMailbRequire"/>
                      <p style="color: #ed4014;" v-show="ifShowMailboxinfo">{{mailboxErrMsg}}</p>
                  </div>
              </div>
              <div class="item_container" v-show="ifShowTel">
                  <div class="lebal"><span>*</span>联系电话：</div>
                  <div class="desc_content">
                      <Input v-model="tel" placeholder="请输入您的手机号码" style="width: 360px;height:40px" @on-blur="checkTelRequire"/>
                      <p style="color: #ed4014;" v-show="ifShowtelinfo">{{telErrMsg}}</p>
                  </div>
              </div>
              <div class="item_container tijiao_btn">
                  <div class="lebal"></div>
                  <div class="btn" @click="submit">提交</div>
              </div>
          </div>
      </div>
      <vPop :msg='popMsg' v-if="ifshowPop" @closePopWindow='closePop'></vPop>
  </div>
</template>

<script>
import vPop from './popUp';
  export default {
      data(){
          return{
            img:require('../../../assets/images/common/jianyiBanner.png'),
            fankuiType:'产品建议',
            fankuiTitle:'',
            productTitle:'',
            fankuiContent:'',
            contact_methods:['邮件','电话'],
            mailbox:'',
            tel:'',
            ifshowPop:false,
            popMsg:'感谢您的支持，我们会尽快处理您的建议反馈',
            ifShowEmail:true,
            ifShowTel:true,
            ifShowTitleinfo:false,
            ifShowProductinfo:false,
            ifShowJianyiinfo:false,
            ifShowMailboxinfo:false,
            ifShowtelinfo:false,
            telErrMsg:'',
            mailboxErrMsg:''
          }
      },
      components:{
          vPop
      },
      methods:{
          submit(){
              this.ifshowPop = true;
          },
          closePop(arg){
              this.ifshowPop = arg;
          },
          contactMethods(e){
              var checkArr = e;
              if(checkArr.length == 0){
                  this.ifShowEmail = false;
                  this.ifShowTel = false;
              }
              else if(checkArr.length == 1){
                if(checkArr.includes('邮件')){
                    this.ifShowEmail = true;
                    this.ifShowTel = false;
                }
                else if(checkArr.includes('电话')){
                    this.ifShowTel = true;
                    this.ifShowEmail = false;
                }
              }
              else if(checkArr.length == 2){
                  this.ifShowTel = true;
                  this.ifShowEmail = true;
              }
          },
          handleBeforeUpload(e){
            console.log(e)
          },
          checkTitleRequire(e){
            let fankuiTitle = this.fankuiTitle;
            if(!fankuiTitle){
                this.ifShowTitleinfo = true;
                e.target.style='border: 1px solid #ed4014;';
                return false;
            }
            else{
                this.ifShowTitleinfo = false;
                e.target.style = 'border: 1px solid #dcdee2;';
                return true;
            }
          },
          checkProTitleRequire(e){
            var productTitle = this.productTitle;
            if(!productTitle){
                this.ifShowProductinfo = true;
                e.target.style='border: 1px solid #ed4014;';
                return false;
            }
            else{
                this.ifShowProductinfo = false;
                e.target.style = 'border: 1px solid #dcdee2;';
                return true;
            }
          },
          checkNeirRequire(e){
            var fankuiContent = this.fankuiContent;
            if(!fankuiContent){
                this.ifShowJianyiinfo = true;
                e.target.style='border: 1px solid #ed4014;';
                return false;
            }
            else{
                this.ifShowJianyiinfo = false;
                e.target.style = 'border: 1px solid #dcdee2;';
                return true;
            }
          },
          checkMailbRequire(e){
              //'border: 1px solid #ed4014;'
            var mailbox = this.mailbox;
            if(!mailbox){
                this.ifShowMailboxinfo = true;
                e.target.style='border: 1px solid #ed4014;';
                this.mailboxErrMsg='邮箱地址是必输项';
                return false;
            }
            else{
                var checkBl = this.$formValidate.isEmail(mailbox);
                if(!checkBl){
                    this.ifShowMailboxinfo = true;
                    e.target.style='border: 1px solid #ed4014;';
                    this.mailboxErrMsg='邮箱地址输入有误';
                    return false;
                }
                else{
                    this.ifShowMailboxinfo = false;
                    e.target.style = 'border: 1px solid #dcdee2;';
                    return true;
                }
            }
          },
          checkTelRequire(e){
            var tel = this.tel;
            if(!tel){
                this.ifShowtelinfo = true;
                this.telErrMsg = '联系电话是必输项';
                e.target.style='border: 1px solid #ed4014;';
                return false;
            }
            else{
                var checkTel = this.$formValidate.isMobile(tel);
                if(!checkTel){
                    this.ifShowtelinfo = true;
                    e.target.style='border: 1px solid #ed4014;';
                    this.telErrMsg='手机号输入有误';
                    return false;
                }
                else{
                    this.ifShowtelinfo = false;
                    e.target.style = 'border: 1px solid #dcdee2;';
                    return true;
                }
            }
          }
      }
  }
</script>

<style scoped lang='less'>
.fankui_container{
    width: 100%;
    .banner{
        width: 100%;
        height: 350px;
        background-image: url('../../../assets/images/common/jianyiBanner.png');
        background-size: cover;
        background-position: center;
        padding: 80px;
        .content{
            width: 1200px;
            margin: auto;
            .title{
                font-size: 30px;
                color: #FFFFFF;
                margin-bottom: 20px;
            }
            .desc{
                width: 400px;
                opacity: 0.8;
                font-size: 14px;
                color: #FFFFFF;
                line-height: 28px;
            }
        }
        
    }
    .content_container{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 40px 0 80px 0;
        background-color: #F5F6F7;
        .content{
            width: 1200px;
            height: 742px;
            background-color: #fff;
            padding: 48px 70px;
            .item_container{
                margin-bottom: 20px;
                width: 100%;
                display: flex;
                .lebal{
                    width: 150px;
                    margin-right: 15px;
                    font-size: 16px;
                    color: #3D4966;
                    letter-spacing: 0;
                    text-align: right;
                    span{
                        color: red;
                    }
                }
                .desc_content{
                    flex: 1;
                    font-size: 14px;
                    // color: #B8BECC;
                    letter-spacing: 0;
                    line-height: 14px;
                    /deep/.ivu-input-type-textarea{
                        textarea{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    /deep/.ivu-radio-default{
                        /deep/.ivu-radio-checked{
                            .ivu-radio-inner{
                                border-color:#03A971;
                            }
                            .ivu-radio-inner::after{
                                background-color:#03A971;
                            }
                        }
                    }
                    /deep/.ivu-checkbox-default{
                        /deep/.ivu-checkbox-checked{
                            /deep/.ivu-checkbox-inner{
                                border-color: #03A971;
                                background-color: #03A971;
                            }
                        }
                    }
                }
                .btn{
                    background: #03A971;
                    border-radius: 4px;
                    font-size: 16px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    padding: 8px 39px;
                }
                .fujian_upload{
                    display: flex;
                    // .upload_btn{
                    //     background: #03A971;
                    //     border-radius: 4px;
                    //     padding: 7px 10px;
                    //     font-size: 12px;
                    //     color: #FFFFFF;
                    //     letter-spacing: 0;
                    //     margin-right: 10px;
                    // }
                    /deep/.ivu-upload{
                        display: flex;
                        margin-right: 10px;
                        /deep/.ivu-upload-select{
                            /deep/.ivu-btn-default{
                                background: #03A971;
                                color: #fff;
                                border: none;
                            }
                        }
                        /deep/.ivu-upload-list{
                            margin-top: 0;
                            .ivu-upload-list-file{
                                .ivu-progress-show-info{
                                    display: none;
                                }
                            }
                        }
                    }
                    .upload_desc{
                        font-size: 12px;
                        color: #8492A6;
                        letter-spacing: 0;
                        line-height: 28px;
                    }
                }
            }
            .tijiao_btn{
                margin-bottom: 40px;
            }
        }
    }
}
</style>
