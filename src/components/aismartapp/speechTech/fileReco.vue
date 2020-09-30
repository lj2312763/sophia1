<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>
<script>
  import vList from '../detailList';
  export default {
    data() {
      return {
        audion_tech: {
          title: '录音文件识别',
          title_desc: '对用户上传的录音文件进行识别，上传完之后24小时内完成识别并返回识别文本。可用于呼叫中心语音质检、庭审数据库录入、会议记录总结、医院病历录入等场景',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/yuyin/10391397_093508040316_23.png'),//banner区域

          list_nav_text:[
              {title:'功能介绍',id:1},
              {title:'功能体验',id:2},
              {title:'应用场景',id:3},
              {title:'特色优势',id:4},
              {title:'支持交流',id:5},
          ],//导航

          function_text: {
            gutter:50,
            span:12,
            list:[
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '技术领先识别准确',
              desc: '基于行业领先的深度学习算法，多采样率多场景声学建模，近场中文普通话识别准确率达98%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '批量音频快速识别',
              desc: '将大量录音批量上传，通过语音识别引擎精准、快速的转为文字，12小时内返回识别结果'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '文字识别结果支持时间戳',
              desc: '识别返回的文字结果带有时间戳，展示VAD切分句子开始和结束时间，方便进行功能开发'
            },
            {
              img: require('@/assets/images/yuyin/icon_BI_service_80.png'),
              title: '多语种识别',
              desc: '支持普通话和略带口音的中文识别，支持英文识别'
            },
          ]},
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'',
            position:true,
            // intro:'随机示例',
            // demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大。'
          },

          menu_text: {//应用场景
            curId:1,
            list:[
              {title:'会议记录总结',id:1},
              {title:'庭审数据库录入',id:2},
              {title:'医院病历录入',id:3},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/yuyin/yuyinzhiling.png'),
          app_title: '会议记录总结',
          app_desc: '对会议记录的音频文件进行识别，然后通过人工或者自动的方法，对会议记录作出总结',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '高效稳定',
              desc: '企业级稳定服务保障，专有集群承载大流量并发，高效灵活，使用最新切分及并发调度技术，可快速返回识别结果'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '智能语音处理',
              desc: '使用大规模数据集训练语言模型，对识别中间结果进行智能纠错，并根据语音的内容理解和停顿智能匹配合适的标点符号，。！？'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '模型自助优化',
              desc: '中文普通话模型可在语音自训练平台上零代码自助训练，上传文本语料即可有效提升业务词汇的识别准确率5-25%'
            },
          ],
        },
      }
    },
    components: {
      vList,
    }
  }
</script>

