<template>
  <div>
    <vList :objText='aiListData'></vList>
  </div>
</template>

<script>
import vList from './listComponent';
export default {
  name: 'textReocList',
  data () {
    var language_tech = {
        title:'人脸识别',
        title_desc:'包含人脸检测与属性分析、人脸对比、人脸搜索、活体检测等能力。灵活应用于金融、泛安防、零售等行业场景，满足身份核验、人脸考勤、闸机通行等业务需求',
        use_btn:'立即使用',
        tech_file:'技术文档',
        funText:'即刻获得人脸识别能力',
        list_img:require('@/assets/images/aiSmartAppList/renlian.png'),
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/renlianjiance.png'),
            title:'人脸检测与属性分析',
            desc:'快速检测人脸并返回人脸框位置，准确识别多种属性信息，并输出人脸150个关键点坐标'
          },
          {
            img:require('@/assets/images/aiSmartAppList/renliansousuo.png'),
            title:'人脸搜索',
            desc:'对比指定图片和人脸库中N张人脸，找出最相似的一张或多张人脸，并返回相似度分值'
          },
          {
            img:require('@/assets/images/aiSmartAppList/renlianduibi.png'),
            title:'人脸对比',
            desc:'提取人脸特征，对比两张人脸相似度并返回评分，判断是否为同一个人'
          },
          {
            img:require('@/assets/images/aiSmartAppList/huoti.png'),
            title:'活体检测',
            desc:'提供6种在线/离线活体检测能力，判断是否真人操作，抵御图片、视频、模具等作弊行为'
          }
        ],
        menu_text:['刷脸移动支付','人脸实名认证','智能相册分类','互动娱乐美颜','人脸注册登录'],
        weitu:require('../../assets/images/aiSmartAppList/shualian.png'),
        app_title:'刷脸移动支付',
        app_desc:'应用前端人脸采集方案，搭配百万级人脸库1：N检索功能，将人脸与银行卡、手机等支付工具绑定，解决支付场景对安全、效率、精度的严苛要求，实现「无现金」刷脸支付代替传统密码，提高支付效率与体验',
        advant_text:[
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'全线免费试用',
            desc:'公有云API最高可享10 QPS无限量免费调用，人脸离线采集SDK永久免费'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'端云能力齐全',
            desc:'在线API、离线SDK、私有化部署多种服务形式全面开放，适配多种应用场景'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'稳定服务保障',
            desc:'提供企业级稳定、精确的大流量服务，拥有毫秒级识别响应能力、弹性灵活的高并发承载，可靠性保障高达99.99%'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'算法世界领先',
            desc:'基于专业的深度学习算法和海量数据训练，人脸识别算法在最权威的公开评测比赛中排名世界领先'
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
  created(){
    var name = localStorage.getItem('name');
    if(name){
      this.ifShowSubBtn = false;
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
