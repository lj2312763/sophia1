<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from './detailComponent';
  export default {
    name: 'aiSmartAppDetail',
    data() {
      return {
        audion_tech: {
          title: '词法分析',
          title_desc: '基于大数据和用户行为的分词、词性标注、命名实体识别，定位基本语言元素，消除歧义，支撑自然语言的准确理解',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/cifafenxibanner.png'),
          menu_text: ['语音指令解析', '多轮交互式搜索', '实体数据库构建'],
          weitu: require('@/assets/images/aiSmartAppDetail/yuyinzhiling.png'),
          app_title: '语音指令解析',
          app_desc: '以分词和词性标注为基础，分析语音命令中的关键名词、动词、数量、时间等，准确理解命令的含义，提高用户体验',
          funExperiText:'请输入一段想分析的文本',
          detailType:'cifafenxi',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '中文分词',
              desc: '中文分词是将连续的自然语言文本，切分成具有语义合理性和完整性的词汇序列的过程'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '词性标注',
              desc: '词性标注（Part-of-Speech tagging 或POS tagging）是指为自然语言文本中的每个词汇赋予一个词性的过程'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '专有名词',
              desc: '命名实体识别（简称NER），即"专名识别"，是指识别自然语言文本中具有特定意义的实体，主要包括人名、地名、机构名、时间日期等'
            }
          ],
          advant_text: [
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

