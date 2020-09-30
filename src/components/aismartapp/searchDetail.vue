<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from './detailComponent';
  export default {
    name: 'searchDetail',
    data() {
      return {
        audion_tech: {
          title: '智能搜索',
          title_desc: '搭建开放式数据搜索平台，整合企业数据，为企业内外部提供搜索业务支持',
          use_btn: '立即使用',
          tech_file: '技术文档',
          list_img: require('@/assets/images/aiSmartAppDetail/sousuo.png'),
          menu_text: ['日志分析', '全文搜索', '商业智能（BI）'],
          weitu: require('@/assets/images/aiSmartAppDetail/quanwensousuo.png'),
          app_title: '全文搜索',
          app_desc: '电商商品搜索、移动应用搜索、企业内部信息搜索等海量数据下的站内搜索服务是高效获取信息的必要途径，Elasticsearch Service拥有全文检索功能，对结构化和非结构化数据都有良好的支持，同时还提供了简单易用的RESTful API和各种语言的客户端，方便用户快速搭建稳定的搜索服务，整合到已有到业务框架中。',
          detailType:'searchdetail1',
          list_nav_text:['功能介绍','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/home/ai1.png'),
              title: '数据接入',
              desc: '支持十余种数据库接入，可解析二百余种文件格式'
            },
            {
              img: require('@/assets/images/home/ai2.png'),
              title: '数据处理 ',
              desc: '以插件方式提供多种数据ETL和文本语义分析，分类聚类等功能'
            },
            {
              img: require('@/assets/images/home/ai3.png'),
              title: '数据索引 ',
              desc: '支持海量数据索引，包括简繁体转换，中文分词，实时索引等'
            },
            {
              img: require('@/assets/images/home/ai4.png'),
              title: '数据聚合 ',
              desc: ' 可根据用户已有数据，按照不同维度进行数据聚合和分析，生成各类图表'
            },
            {
              img: require('@/assets/images/home/ai5.png'),
              title: '数据爬虫 ',
              desc: '用户仅通过简单的自定义规则，即可获取所需的个性化、结构化数据'
            },
            {
              img: require('@/assets/images/home/ai6.png'),
              title: '数据库索引 ',
              desc: '可连接和检索当前主流数据库系统，同时支持数据库和文件关联查询'
            },
            {
              img: require('@/assets/images/home/ai7.png'),
              title: '文档检索 ',
              desc: '可以通过指定文件所在目录进行高效检索，并内置文件解析器'
            },
            {
              img: require('@/assets/images/home/data1.png'),
              title: '数据交换接口与协议 ',
              desc: '可通过基于webservice的数据推送和数据提取接口，以及线点ICF数据交换协议进行数据采集和索引'
            },
            {
              img: require('@/assets/images/home/data2.png'),
              title: '可视化界面 ',
              desc: '独立的可视化界面，用户可以通过页面进行查询'
            },
          ],
          advant_text: [
            {
              img: require('@/assets/images/home/data3.png'),
              title: '快速检索 ',
              desc: '在上亿级数据条目下，2秒钟以内返回检索结果'
            },
            {
              img: require('@/assets/images/home/ai2.png'),
              title: '检索准确',
              desc: '在上亿级数据条目下，2秒钟以内返回检索结果'
            },
            {
              img: require('@/assets/images/home/ai3.png'),
              title: '智能检索 ',
              desc: '根据用户行为，自动识别高质量数据，提高数据使用率；个性化数据推荐，针对不同用户，个性化推荐相关内容'
            }
          ],
        },
      }
    },
    components: {
      vList,
    },
  }
</script>
