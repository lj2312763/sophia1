<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>
<script>
  import vList from '../detailList';
  export default {
    name: 'aiSmartAppDetail',
    data() {
      return {
        audion_tech: {
          title: '短语音识别',
          title_desc: '将60秒以内的语音精准识别为文字，可适用于手机语音输入、智能语音交互、语音指令、语音搜索等短语音交互场景',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/houseData/falv.png'),//banner区域

          list_nav_text:[
              {title:'功能介绍',id:1},
              {title:'功能体验',id:2},
              {title:'应用场景',id:3},
              {title:'特色优势',id:4},
              {title:'支持交流',id:5},
          ],//导航

          function_text: {
            gutter:50,
            span:8,
            list:[
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '高识别率',
              desc: '基于深度学习技术，对特定领域场景和语料进行优化，语音识别率达到业界领先'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '前沿技术',
              desc: '使用工业界成熟的算法，结合语音识别学术界最新研究成果，为企业提供独特竞争力优势'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '可定制化',
              desc: '针对客户的特定场景需求，定制垂直领域的语音识别模型，识别效果更精确'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '支持热词',
              desc: '针对专业词汇，支持上传至热词表，增加专业词汇的语音识别准确率'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '一句话识别',
              desc: '对时长较短（1分钟以内）的语音进行识别，提供良好的可扩展性，支持热词定制'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '录音文件识别',
              desc: '对于录制的长语音进行识别，转写成文字，提供不同领域模型，具备良好的可扩展性，支持热词定制'
            }
          ]},
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'请点击“开始录音”，即可边说话边识别！',
            position:true,
            // intro:'随机示例',
            // demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大。'
          },

          menu_text: {//应用场景
            curId:2,
            list:[
              {title:'语音客服质检',id:1},
              {title:'会议记录',id:2},
              {title:'语音短消息',id:3},
              {title:'游戏娱乐',id:4},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/aiSmartAppDetail/huiyijuluweitu.png'),
          app_title: '会议记录',
          app_desc: '对会议记录的音频文件，进行快速的识别，转化成文字，方便进行会议记录',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '技术领先',
              desc: '采用领先国际的流式端到端语音语言一体化建模方法，融合百度自然语言处理技术，近场中文普通话识别准确率达98%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '自助训练专属模型',
              desc: '支持在语音自训练平台上自助训练模型，上传词汇文本即可零代码完成训练，精准提升业务领域词汇识别率5-20%，并可专属使用'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '简单快速',
              desc: '支持API及多种SDK接入，可基于Demo快速简单接入，采用最新识别解码技术，识别速度极大提升'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '高效稳定',
              desc: '专有服务集群、提供企业级的稳定服务，弹性灵活的高并发承载及高可靠性保障'
            }
          ],
        },
      }
    },
    components: {
      vList,
    }
  }
</script>

