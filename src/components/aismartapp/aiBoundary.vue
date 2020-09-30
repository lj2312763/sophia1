<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>
<script>
  import vList from './detailList';
  export default {
    name: 'aiSmartAppDetail',
    data() {
      return {
        audion_tech: {
          title: '句子边界识别',
          title_desc: '基于大数据对中文句子进行边界的判定',
          btn:{
            tiyan:{text:"功能体验",isShow:true,},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/ai/juzibanner.png'),//banner区域

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
              list:[//功能介绍
                {
                  img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
                  title: '智能识别',
                  desc: '智能识别句子的开头，结束。并根据输入的内容进行句子的组合。'
                },
                {
                  img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
                  title: '数学建模',
                  desc: '使用数学方法，将数据抽象到纯数学层面以寻求普适的解决方法与结论，是一个利用数据推导结论的过程。'
                },
            ]
          },
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'请输入一段想分析的文本：',
            intro:'随机示例',
            demo:'徐先生还具体帮助他确定了把画雄鹰、松鼠和麻雀作为主攻目标。'
          },

          menu_text: {//应用场景
            curId:3,
            list:[
              {title:'用户身份认证',id:1},
              {title:'文字违规识别',id:2},
              {title:'出版物图像转文本',id:3},
              {title:'手写内容识别',id:4},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/ai/yingyong1.png'),
          app_title: '传统新闻媒体',
          app_desc: '通用OCR识别可以帮助将大量纸质文档转换成可编辑的文本，极大的便利了文字的排版、信息的检索。',
          app_title1: '出版物图片',
          app_desc1: '通用OCR识别可以将出版物的图像转成可供编辑的文本，在出版物的归类、检索等方面，大大降低人力投入成本。',
         

          advant_text: [//特色优势
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '算法通用性强',
              desc: '句法结构的描述体系简洁通用，适用于分析搜索Query、口语Query、网页Title 网页正文等各种类型的语言形式'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '基于语义的结构消歧',
              desc: '在大规模人工标注的树库的基础上，借助海量知识与弱标记数据等语义信息训练，有效缓解语言分析中的结构歧义问题'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '基于Attention机制解码框架',
              desc: '利用待分析词与其他所有词之间的依存强度，选择与其最相关的上下文信息，解决了分析算法局部最优的问题'
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

