<template>
  <div class="hello">
    <vList :objText='aiListData'></vList>
  </div>
</template>

<script>
import vList from './listComponent';
export default {
  name: 'textReocList',
  data () {
    var language_tech = {
        title:'文字识别',
        title_desc:'提供多场景、高精度的图像文字识别服务，降低人工录入成本，提升输入效率',
        use_btn:'立即使用',
        tech_file:'技术文档',
        funText:'即刻获得文字识别能力',
        list_img:require('@/assets/images/aiSmartAppList/wenzishibie.png'),
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/kazheng.png'),
            title:'卡证文字识别',
            desc:'提供对身份证、银行卡、营业执照等常用卡片及证照的文字内容进行结构化识别的服务'
          },
          {
            img:require('@/assets/images/aiSmartAppList/piaoju.png'),
            title:'票据文字识别',
            desc:'提供对财税报销、金融保险等场景所涉及的各类票据进行结构化识别的服务'
          },
          {
            img:require('@/assets/images/aiSmartAppList/qiche.png'),
            title:'汽车场景文字识别',
            desc:'提供对汽车购买及使用过程中所涉及的各类卡证、票据进行结构化识别的服务'
          },
          {
            img:require('@/assets/images/aiSmartAppList/qita.png'),
            title:'其他文字识别',
            desc:'提供对表格、手写文字、网络图片、数字、二维码等内容进行识别的服务'
          }
        ],
        menu_text:['远程身份认证','财税报销','文档电子化','金融保险'],
        weitu:require('../../assets/images/aiSmartAppList/yuancheng.png'),
        app_title:'远程身份认证',
        app_desc:'结合OCR和人脸识别技术，实现对用户身份证件信息的自动识别和录入，同时通过人脸核身解决方案进行人脸识别和活体检测，完成用户身份验证，应用于金融保险、社保、电商、O2O等行业，有效降低用户输入成本，控制业务风险',
        advant_text:[
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'能力丰富',
            desc:'数十种自然语言核心算法与解决方案，全面覆盖语言处理的各类需求'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'接口易用',
            desc:'标准化接口封装，通过云计算调用可快速使用工具，大大降低开发人力成本'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'服务可靠',
            desc:'SLA稳定保持99.99%以上，支持千亿量级调用需求，配有完善的统计和监控措施'
          }
      ]
    }
    return {
      aiListData:language_tech,
      audion_tech:{
        title:'语音技术',
        title_desc:'采用国际领先的流氏端到端语音语言一体化建模算法，将语音快速识别为文字，支持手机应用语音交互、语音内容分析、机器人对话等多个场景',
        use_btn:'立即使用',
        tech_file:'技术文档',
        list_img:require('@/assets/images/aiSmartAppList/audio_tech.png'),
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/duanyuying.png'),
            title:'短语音识别',
            desc:'对60秒以内的语音精准识别为文字，融合元知领先的自然语言处理技术，支持手机语言输'
          },
          {
            img:require('@/assets/images/aiSmartAppList/duanyujisu.png'),
            title:'短语音识别极速版',
            desc:'对60秒以内的语音快速识别为文字，适用于手机语音输入、语音搜索，人机对话等语音交互场'
          },
          {
            img:require('@/assets/images/aiSmartAppList/shishiyuying.png'),
            title:'实时语音识别',
            desc:'将音频流实时识别为文字，并返回每句话的开始和结束时间，适用于长句语音输入、音视频'
          },
          {
            img:require('@/assets/images/aiSmartAppList/yuanchangyuying.png'),
            title:'远场语音识别',
            desc:'通过麦克风阵列前端处理算法，让目标说话人即使在3-5米的距离说话，也可准确识别'
          },
          {
            img:require('@/assets/images/aiSmartAppList/hujiaozhongxin.png'),
            title:'呼叫中心实时语音识别',
            desc:'采用呼叫中心专属模型，识别更精准，支持百毫秒级实时语音转文字的服务'
          },
          {
            img:require('@/assets/images/aiSmartAppList/hujiaozhuanxie.png'),
            title:'呼叫中心音频文件转写',
            desc:'采用呼叫中心专属模型，可大批量低成本的将音频文件识别为文本'
          }
        ],
        menu_text:['手机应用语音输入','机器人对话','语音内容分析','实时语音转写'],
        weitu:require('../../assets/images/aiSmartAppList/weitu.png'),
        app_title:'手机应用语音输入',
        app_desc:'将语音实时识别为文字，适用于语音聊天、语音输入、语音搜索、语音下单、语音指令、语音问答等多种场景。',
        advant_text:[
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'技术领先',
            desc:'采用领先国际的流式端到端语音语言一体化建模方法，融合百度自然语言处理技术，近场中文普通话识别准确率达98%'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'自助训练专属模型',
            desc:'支持在语音自训练平台上自助训练模型，上传词汇文本即可零代码完成训练，精准提升业务领域词汇识别率5-20%，并可专属使用'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'简单快速',
            desc:'支持API及多种SDK接入，可基于Demo快速简单接入，采用最新识别解码技术，识别速度极大提升'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'高效稳定',
            desc:'专有服务集群、提供企业级的稳定服务，弹性灵活的高并发承载及高可靠性保障'
          }
      ],
      },
      language_tech:language_tech
    }
  },
  components:{
    vList,
  },
  watch:{
    '$route' (to, from) {
        this.$router.go(0);
    }
  },
  mounted(){
    document.documentElement.scrollTo(0,0);
    document.body.scrollTo(0,0);
    var type = this.$route.query.type;
    var featurType = this.$route.query.featurType;
    // if(type == 1){
    //   this.$refs.navTextTop[1].style='box-sizing: border-box;padding-bottom:3px;border-bottom: 3px #ffffff solid;';
    // }
    if(type == 1 && featurType == 0){
      this.aiListData = this.language_tech;
    }else if(type == 1 && featurType == 1){
      this.aiListData = this.audion_tech;
    }
  },
}
</script>

<style scoped lang='less'>
.hello{
  position: relative;
  .naviga{
    width: 100%;
    height: 90px;
    background-color:  #3C3C46;
    display: flex;
    align-items: center;
    justify-content: center;
    .naviga_contant{
      width: 1200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 230px;
        .top{
          font-size: 24px;
          color: #FFFFFF;
          letter-spacing: 0.5px;
        }
        .bottom{
          font-size: 12px;
          color: #FFFFFF;
          letter-spacing: 5px;
        }
      }
      .right{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        .nav_text{
          display: flex;
          height: 90px;
          .nav_text_container{
            font-size: 16px;
            color: #FFFFFF;
            margin-right: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            :hover{
              cursor: pointer;
            }
            .top{
              margin-top: 30px;
            }
            .bottom{
              width: 0; 
              height: 0;
              border-width: 10px;
              border-style: solid;
              border-color: transparent transparent #FFF transparent;
            }
          }
        }
        // span{
        //   font-size: 16px;
        //   color: #FFFFFF;
        //   margin-right: 20px;
        // }
        .sub_btn{
          background: #03A971;
          border-radius: 3px;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          padding: 10px 38px;
          box-sizing: border-box;
        }
        .user_container{
          display: flex;
          align-items: center;
          flex-grow: 1;
          .user{
            color: #FFF;
          }
          .img{
            height: 40px;
            width: 40px;
            border-radius: 40px;
            margin-right: 10px;
            margin-left: 60px;
            img{
              width: 100%;
              height: 100%;
              border-radius: 40px;
            }
          }
        }
        .sub_btn:hover{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
