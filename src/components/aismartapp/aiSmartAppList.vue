<template>
  <div class="hello">
    <vList :objText='aiListData'></vList>
  </div>
</template>

<script>
import vList from './listComponent';
export default {
  name: 'home',
  data () {
    return {
      language_tech:{
        title:'自然语言处理',
        title_desc:'自然语言处理是为各类企业及开发者提供的用于文本分析及挖掘的核心工具，已经广泛应用在电商、文化娱乐、金融、物流等行业客户的多项业务中。',
        use_btn:'立即使用',
        tech_file:'技术文档',
        listType:'yuyanchuli',
        list_img:require('@/assets/images/aiSmartAppList/audio_tech.png'),
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/cifafenxi.png'),
            title:'词法分析',
            path:"/aiSmartAppDetail",
            desc:'基于大数据和用户行为的分词、词性标注、命名实体识别，定位基本语言元素，消除歧义，支撑自然语言的准确理解'
          },
          {
            img:require('@/assets/images/aiSmartAppList/jufafenxi_318.png'),
            title:'句法分析',
            path:"/aiSentence",
            desc:'基于大数据自动确定句子内“主谓宾定状补”等结构元素'
          },
          {
            img:require('@/assets/images/aiSmartAppList/jushi.png'),
            title:'句式识别',
            path:"/aiSyntax",
            desc:'基于大数据自动确定句子内的句式组成结构元素'
          },
          {
            img:require('@/assets/images/aiSmartAppList/yicunjufa.png'),
            title:'依存句法分析',
             path:"/aiDepenpars",
            desc:'基于神经网络的高性能依存句法分析器;基于ArcEager转移系统的柱搜索依存句法分析器'
          },
          {
            img:require('@/assets/images/aiSmartAppList/guanjianci.png'),
            title:'关键词抽取',
             path:"/aiKeyword",
            desc:'基于大数据进而识别并提取出句子的关键词'
          },
          {
            img:require('@/assets/images/aiSmartAppList/minmingshiti_shibie.png'),
            title:'命名实体识别',
             path:"/aiIdentity",
            desc:'基于大数据的特定意义实体进行自动识别'
          },
          {
            img:require('@/assets/images/aiSmartAppList/wenbentuijian.png'),
            title:'语义相似度',
             path:"/aiSemantic",
            desc:'基于大数据对中文句子进行语义相似度判定'
          },
          {
            img:require('@/assets/images/aiSmartAppList/juzibianjie_shibie.png'),
            title:'句子边界识别',
             path:"/aiBoundary",
            desc:'基于大数据对中文句子进行边界的判定'
          }
        ],
        menu_text:['智能问答系统','病例结构化','评论聚合'],
        weitu:require('../../assets/images/aiSmartAppList/zhinengwenda.png'),
        app_title:'智能问答系统',
        app_desc:'通过中文分词、短文本相似度、命名实体识别等自然语言处理相关技术，计算；两个问题对的相似度，可解决问答、对话、语料挖掘、知识库构建等问题。',
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
      },
      audion_tech:{
        title:'语音技术',
        title_desc:'采用国际领先的流氏端到端语音语言一体化建模算法，将语音快速识别为文字，支持手机应用语音交互、语音内容分析、机器人对话等多个场景',
        use_btn:'立即使用',
        tech_file:'技术文档',
        funText:'即刻获得文字识别能力',
        list_img:require('@/assets/images/aiSmartAppList/audio_tech.png'),
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/duanyuying.png'),
            title:'短语音识别',
            desc:'对60秒以内的语音精准识别为文字，融合元知领先的自然语言处理技术，支持手机语言输入'
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
      aiListData:{
        title:'自然语言处理',
        title_desc:'自然语言处理是为各类企业及开发者提供的用于文本分析及挖掘的核心工具，已经广泛应用在电商、文化娱乐、金融、物流等行业客户的多项业务中。',
        use_btn:'立即使用',
        tech_file:'技术文档',
        list_img:require('@/assets/images/aiSmartAppList/audio_tech.png'),
        product_list_data:[
          {
            img:require('@/assets/images/aiSmartAppList/cifafenxi.png'),
            title:'词法分析',
            desc:'基于大数据和用户行为的分词、词性标注、命名实体识别，定位基本语言元素，消除歧义，支撑自然语言的准确理解'
          },
          {
            img:require('@/assets/images/aiSmartAppList/guanjiancitiqu.png'),
            title:'关键词提取',
            desc:'TextRank关键词提取'
          },
          {
            img:require('@/assets/images/aiSmartAppList/zidongzhaiyao.png'),
            title:'自动摘要',
            desc:'TextRank自动摘要'
          },
          {
            img:require('@/assets/images/aiSmartAppList/duanyutiqu.png'),
            title:'短语提取',
            desc:'基于互信息和左右信息熵的短语提取'
          },
          {
            img:require('@/assets/images/aiSmartAppList/pinyinzhuanhuan.png'),
            title:'拼音转换',
            desc:'多音字、声母、韵母、声调'
          },
          {
            img:require('@/assets/images/aiSmartAppList/jianfanzhuanhuan.png'),
            title:'简繁转换',
            desc:'简繁分歧词（简体、繁体、臺灣正體、香港繁體）'
          },
          {
            img:require('@/assets/images/aiSmartAppList/wenbentuijian.png'),
            title:'文本推荐',
            desc:'语义推荐、拼音推荐、字词推荐'
          },
          {
            img:require('@/assets/images/aiSmartAppList/yicunjufa.png'),
            title:'依存句法分析',
            desc:'基于神经网络的高性能依存句法分析器;基于ArcEager转移系统的柱搜索依存句法分析器'
          },
          {
            img:require('@/assets/images/aiSmartAppList/word2vec.png'),
            title:'文本分类',
            desc:'识别文本的领域信息，提供在17个领域上分类：歌曲、广播、故事、百科、天气、时间、新闻'
          },
          {
            img:require('@/assets/images/aiSmartAppList/wenbenjulei.png'),
            title:'文本聚类',
            desc:'KMeans、Repeated Bisection、自动推断聚类数目k'
          },
        ],
        menu_text:['智能问答系统','相似内容推荐','评论聚合'],
        weitu:require('../../assets/images/aiSmartAppList/zhinengwenda.png'),
        app_title:'智能问答系统',
        app_desc:'通过中文分词、短文本相似度、命名实体识别等自然语言处理相关技术，计算；两个问题对的相似度，可解决问答、对话、语料挖掘、知识库构建等问题。',
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
    }
  },
  components:{
    vList,
  },
  watch:{
     $route(){
        this.init()
      },
  },
  created(){
    this.init()
   
  },
  methods:{
   init(){
      var type = this.$route.query.type;
      var featurType = this.$route.query.featurType;
      if(type == 1 && featurType == 0){
        this.aiListData = this.language_tech;
      }else if(type == 1 && featurType == 1){
        this.aiListData = this.audion_tech;
      }
      else{
        this.aiListData = this.language_tech;
      }
   }
  }
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
          .user{
          color: #FFF;
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
