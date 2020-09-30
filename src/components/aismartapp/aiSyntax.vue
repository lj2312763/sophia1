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
          title: '句式识别',
          title_desc: '依存句法分析技术自动确定句子内“主谓宾定状补”等结构元素，识别词汇间依存关系。',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/ai/jushibanner.png'),//banner区域

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
              desc: '自动确定句子内“主谓宾定状补”等结构元素，识别词汇间依存关系'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '高度定制',
              desc: '自动识别 15 类依存关系，自动揭示句子的树状结构'
            },
          ]},
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'请输入一段想分析的文本：',
            intro:'随机示例',
            demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大，最终失守3000点，创指大跌近2.5%，收光头大阴线，前期跌幅较大的猪肉、养鸡板块逆势上涨，领涨两市，午后港口航运强势拉升，最终小幅上涨，连云港等三股涨停，白酒、家电等白马蓝筹表现较为坚挺，国防军工概念大幅回调，领跌两市，中船科技等5股跌停，科创板预期股一路走低，跌幅居前，华胜天成等6股跌停，盘中多股出现恐慌性砸盘。'
          },

          menu_text: {//应用场景
            curId:1,
            list:[
              {title:'内容审核',id:1},
              {title:'文档电子化',id:2},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/ai/yingyong2.png'),
          app_title: '内容审核',
          app_desc: '使用通用文字识别技术，实现对图像中文字内容的提取，结合文本审核技术识别违规内容，提示相应风险，协助进行违规处理，可应用于电商广告审核、舆情监管等场景，帮助用户有效规避业务风险',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [//特色优势
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '粒度更灵活',
              desc: '模型既保证了基本词汇的原子性，又保证了大粒度词汇，对领域新词、专有名词的识别尤其有效'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '海量数据建模',
              desc: '海量训练样本，百亿级的点击反馈，提高了算法在复杂多变的应用场景下的效果稳定性和适配性'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '自由定制',
              desc: '可根据需求自主干预和定制分词效果，自由定制专名实体类目，打造个性化的分词和专名识别系统'
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

