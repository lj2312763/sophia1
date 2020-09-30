<template>
  <div class="fankui_container">
      <div class="banner">
          <div class="content">
               <div class="title">合作咨询</div>
                <div class="desc">元知智能研究院专业服务团队将为您提供地理、旅游、餐饮、法律、品牌、物业洞察等技术服务，助力您的企业发展！</div>
          </div>
      </div>
      <div class="content_container">
          <div class="content">
              <Form :model="formItem" :label-width="150" ref="formItem"   style="width:771px" :rules="ruleValidate">
                    <FormItem label="咨询的技术服务：" prop="service">
                      <Select v-model="formItem.service" placeholder="请选择" size="large" style="width:360px">
                        <Option v-for="item in serviceList" :value="item" :key="item">{{item}}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="需求描述：" prop="desc">
                        <Input v-model="formItem.desc" type="textarea" size="large" maxlength="400" show-word-limit :autosize="{minRows: 10,maxRows: 5}" placeholder="请描述您的具体需求"></Input>
                    </FormItem>
                     <FormItem label="联系人：" prop="name">
                        <Input v-model="formItem.name" size="large" placeholder="请输入联系人姓名" style="width:360px"></Input>
                    </FormItem>
                     <FormItem label="联系电话：" prop="tel">
                        <Input v-model="formItem.tel" type="tel" size="large" placeholder="请输入手机号" style="width:360px"></Input>
                    </FormItem>
                    <FormItem label="您的行业：" prop="work">
                      <Select v-model="formItem.work" placeholder="企业服务" size="large" style="width:360px">
                        <Option v-for="item in workList" :value="item" :key="item">{{item}}</Option>
                      </Select>
                    </FormItem>
                     <FormItem label="您公司的网址：" prop="net" >
                        <Input v-model="formItem.net" size="large" placeholder="请输入公司网址" style="width:360px"></Input>
                    </FormItem>
                     <FormItem label="验证码：" prop="ma">
                       <div class="formBox">
                            <Input v-model="formItem.ma" size="large" placeholder="请输入右侧验证码" style="width:188px;margin-right:20px;"></Input>
                            <identify :width="107" :height="40" :identifyCode="identifyCode"></identify>
                            <span style="margin-left:20px;font-size: 14px;color: rgba(0,0,0,0.65);">看不清，</span><span style="font-size: 14px;color: #03A971;cursor:pointer" @click="random">换一张</span>
                       </div>
                    </FormItem>
                     <FormItem label="">
                        <Checkbox v-model="agree" size="large" type="success">我已阅读并同意 《隐私保护》</Checkbox>
                    </FormItem>
                     <FormItem label="">
                        <div style="font-size: 12px;color: #B8BECC;line-height: 24px;">温馨提示：<br>
                          1、反馈会在1个工作日内和您联系（工作时间周一至周五9:00-18:00） <br>
                          2、紧急问题请拨打4000-955-988 | 950808 按1转1进行快速解答
                        </div>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="submit" style="width:110px;height:40px;background: #03A971;border-radius: 4px;">提交</Button>
                    </FormItem>
              </Form>
          </div>
      </div>
      <popUp v-if="isShow" @closeDialog="closeDialog"></popUp>
  </div>
</template>

<script>
import popUp from './popUp1.vue';
import identify from './identify.vue';
  export default {
    components:{popUp,identify},
      data(){
          const _checkMobile = (rule, value ,callback) => {
              if(value){
                  if(this.$formValidate.isMobile(value)) {
                      callback();
                  }else {
                      callback(new Error('手机格式不正确'));
                  }
              }else {
                  // callback(new Error('手机号不能为空!'));
                  callback();
              }
          };
          const domain = (rule, value ,callback) => {
              if(value){
                  if(this.$formValidate.domain(value)) {
                      callback();
                  }else {
                      callback(new Error('网址格式不正确'));
                  }
              }else {
                  //callback(new Error('手机号不能为空!'));
                  callback();
              }
          };
         const _checkma = (rule, value ,callback) => {
              if(value){
                  if(value==this.identifyCode) {
                      callback();
                  }else {
                      callback(new Error('验证码不正确'));
                  }
              }else {
                  callback(new Error('验证码不能为空!'));
              }
          };
          return{
            identifyCode:'',
            isShow:false,
            agree:true,
            formItem: {
              service:'地理综合查询',
              desc: "",
              name: "",
              work: '',
              net: "",
              tel:''
            },
            serviceList:[
            "自然语言处理",
            "语音技术",
            "文字识别",
            "图像技术",
            "视频技术",
            "人脸与人体识别",
            "法律综合分析",
            "地产综合分析",
            "品牌舆情洞察",
            "餐饮数据洞察",
            "旅游数据洞察",
            "地理综合查询",
            "物业洞察分析",
            "算法建模",
            ],
            workList:[
              "企业服务",
              "游戏",
              "视频直播",
              "房产家装",
              "教育培训",
              "智能手机",
              "软件工具",
              "安防监控",
              "法律政务",
              "农业",
              "制造业",
              "智能硬件",
              "商业地产",
              "医疗健康",
              "生活服务",
              "物流货运",
              "酒店旅游",
              "零售",
              "金融",
              "电子商务",
              "交通出行",
              "文化娱乐",
              "其他",
            ],
            ruleValidate:{
                service: [  { required: true, message: '内容不能为空', trigger: 'change' }],
                desc: [{ required: true, message: "内容不能为空", trigger: "blur" }],
                name: [{ required: true, message: "内容不能为空", trigger: "blur" }],
                tel: [{ validator: _checkMobile, trigger: "blur" }],
                ma: [{ validator: _checkma, trigger: "blur" }],
                net: [{ validator: domain, trigger: "blur" }],
            }
        }
      },
      created(){
        this.formItem.service=this.$route.query.ques;
        this.random()
      },
      methods:{
        random(){
          var a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          var html='';
          for(var i=0;i<4;i++){
            var s=parseInt(Math.random()*62);
            html+=a.substring(s,s+1);
          }
          this.identifyCode=html;
        },
        submit(){
           this.$refs["formItem"].validate(valid => {
            if (valid) {
              this.isShow = true;
            }
          });
        },
        closeDialog(){
          this.isShow=false;
        }
      }
  }
</script>

<style scoped lang='less'>
.formBox{
  display: flex;
  align-items: center;
}
.fankui_container{
    width: 100%;
    .banner{
        width: 100%;
        height: 350px;
        background-image: url('../../../assets/images/common/zixunbanner.png');
        background-size: cover;
        background-position: center;
        padding: 80px;
        .content{
            width: 1200px;
            margin: auto;
            .title{
                font-size: 30px;
                color: #121C33;
                margin-bottom: 20px;
            }
            .desc{
                width: 400px;
                opacity: 0.8;
                font-size: 14px;
                color: #121C33;
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
            background-color: #fff;
            padding: 48px 70px;
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
                    /deep/.ivu-checkbox-large{
                        /deep/.ivu-checkbox-checked{
                            /deep/.ivu-checkbox-inner{
                                border-color: #03A971;
                                background-color: #03A971;
                            }
                        }
                    }
        }
    }
}
</style>
