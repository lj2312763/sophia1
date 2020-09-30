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
          title: '实时语音识别',
          title_desc: '将音频流实时识别为文字，并返回每句话的开始和结束时间，适用于长句语音输入、音视频字幕、会议等场景',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/yuyin/10391397_093508040316_2.png'),//banner区域

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
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '技术领先识别准确',
              desc: '基于Deep Peak2端到端建模，超过10万小时数据训练，多采样率多场景声学建模，近场中文普通话识别准确率达98%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '多语种和多方言识别',
              desc: '支持普通话和略带口音的中文识别；支持粤语、四川话方言识别；支持英文识别'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '智能语言处理',
              desc: '使用大规模数据集训练语言模型，对识别中间结果进行智能纠错，并根据语音的内容理解和停顿智能匹配合适的标点符号，。！？'
            },
            {
              img: require('@/assets/images/yuyin/icon_BI_service_80.png'),
              title: '多种调用方式',
              desc: '支持WebSocket API，支持Android、iOS、Linux SDK，可以在多种操作系统、多种设备终端上调用，快速上手，简单易用'
            },
            {
              img: require('@/assets/images/yuyin/icon_culture_data_80.png'),
              title: '毫秒级实时识别音频流',
              desc: '首包响应时间毫秒级，并实时展示中间文字结果，快速识别音频流'
            },
            {
              img: require('@/assets/images/yuyin/icon_property_recommendation_80.png'),
              title: '文字识别结果支持时间戳',
              desc: '识别返回的文字结果带有时间戳，展示VAD切分句子开始和结束时间，方便进行功能开发'
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
            curId:1,
            list:[
              {title:'实时语音输入',id:1},
              {title:'实时会议记录',id:2},
              {title:'课堂音频识别',id:3},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/yuyin/shishiyuyin.png'),
          app_title: '实时语音输入',
          app_desc: '语音输入准确高效，解放双手，说话内容实时展示在屏幕上，聊天顺畅',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '识别效果领先',
              desc: '基于Deep Peak2端到端建模，多采样率多场景声学建模，近场中文普通话识别准确率达98%%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '支持多设备终端',
              desc: '支持WebSocket API方式、Android、iOS、Linux SDK方式调用，可以适用于多种操作系统、多设备终端均可使用'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定高效',
              desc: '企业级稳定服务保障，专有集群承载大流量并发，高效灵活，服务稳定'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '模型自助优化',
              desc: '中文普通话模型可在语音自训练平台上零代码自助训练，上传文本语料即可有效提升业务词汇的识别准确率5-25%'
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

