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
          title: '关键词抽取',
          title_desc: '基于大数据进而识别并提取出句子的关键词',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/ai/guanjiancibanner.png'),//banner区域

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
              title: '多语言支持',
              desc: '模型语言无关性，支持中/英/俄/西等多个语种'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '海量电商数据建模',
              desc: '丰富大规模电商场景，借助电商大数据完成中心词建模'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '深度语义模型',
              desc: '基于卷积的深度语义网络CDSSM模型，借助电商类目体系，提升关键词提取准确率'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '跨语言迁移学习',
              desc: '借助语料丰富的语言的知识，提升语料较少的语言的分析准确率'
            },
          ]},
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'请输入一段想分析的文本：',
            intro:'随机示例',
            demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大。'
          },

          menu_text: {//应用场景
            curId:1,
            list:[
              {title:'相关性计算',id:1},
              {title:'物品推荐',id:2},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/ai/yingyong3.png'),
          app_title: '相关性计算',
          app_desc: '快速分析词语与主体相关性，找到相似度最高或相近的内容',
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

