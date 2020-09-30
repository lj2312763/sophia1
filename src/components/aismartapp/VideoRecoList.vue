<template>
  <div>
    <vList :objText='aiListData'></vList>
  </div>
</template>

<script>
import vList from './listComponent';
import vMenu from '../menu/menu';
import vLogin from '../login/login';
export default {
  name: 'textReocList',
  data () {
    var language_tech = {
        title:'视频识别',
        title_desc:'利用多模态的视频处理和智能分析技术识别视频的片段，语音、图像、文本中包含的结构化信息，可用于视频内容的管理、搜索、推荐和审核场景',
        use_btn:'立即使用',
        tech_file:'技术文档',
        funText:'即刻获得视频识别能力',
        list_img:require('@/assets/images/aiSmartAppList/shipinshibie.png'),
        listType:'shipinshibie',
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/neirongfenxi.png'),
            title:'视频内容分析',
            desc:'通过多维AI技术，对视频进行智能分析，输出视频内容的泛标签，从而提高搜索准确度和用户推荐视频的曝光量'
          },
          {
            img:require('@/assets/images/aiSmartAppList/neirongshenhe.png'),
            title:'视频内容审核',
            desc:'针对视频内容进行多维智能审核，其中包括色情、暴恐、政治敏感、广告、自定义黑库等，让您的平台免去审核的后顾之忧'
          }
        ],
        menu_text:['视频个性化推荐','视频内容检索','UGC短视频审核','直播平台内容审核'],
        weitu:require('../../assets/images/aiSmartAppList/gexinghua.png'),
        app_title:'视频个性化推荐',
        app_desc:'通过视频内容分析技术，自动抽取视频内容标签，有效解决新视频冷启动推荐问题，实现个性化推荐，增加视频曝光',
        advant_text:[
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'行业首创',
            desc:'国内首个基于视频内容理解的分析技术，提供独有的场景化服务'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'识别精度高',
            desc:'海量视频数据训练，分析，建模，输出TAG达万级别，识别精度高'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'高效易用',
            desc:'与云视频点播服务和存储服务联动，提供内容分析API，使用便捷，处理高效'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'全面审核',
            desc:'业界首创，从10+种维度对视频内容进行审核，不放过任何风险'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'准确率高',
            desc:'对色情、暴恐、政敏、广告等识别准确率高，极大减少人工审核成本'
          },
          {
            img:require('../../assets/images/aiSmartAppList/advant.png'),
            title:'成熟应用',
            desc:'基于互联网数以千万的视频内容进行分析，归纳总结后形成视频内容审核产品'
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
    if(type == 1 && featurType == 0){
      this.aiListData = this.language_tech;
    }else if(type == 1 && featurType == 1){
      this.aiListData = this.audion_tech;
    }
  },
}
</script>

