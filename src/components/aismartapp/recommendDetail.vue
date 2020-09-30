<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from './detailComponent';
  export default {
    name: 'recommendDetail',
    data() {
      return {
        audion_tech: {
          title: '推荐',
          title_desc: '以用户行为数据为基础，采用深度学习等先进的机器学习 算法，帮助企业构建智能物品分发中心，实现对用户“千人千面”的个性化推荐，改善用户体验， 持续提升核心业务指标。',
          use_btn: '立即使用',
          tech_file: '技术文档',
          list_img: require('@/assets/images/aiSmartAppDetail/tuijian.png'),
          menu_text: ['猜你喜欢', '相关推荐'],
          weitu: require('@/assets/images/aiSmartAppDetail/cainixihuan.png'),
          app_title: '猜你喜欢',
          app_desc: '基于用户画像和候选物料特征，采用机器学习模型，计算用户和各物料的匹配相似性，并按照相似度值排序输出展示，最大程度提升场景下的点击率和转化率。',
          detailType:'recommendetail',
          list_nav_text:['功能介绍','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '个性化推荐',
              desc: '实现对内容/商品/服务的个性化分发，在终端用户侧感知到千人千面'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '相关推荐',
              desc: '在终端用户侧感知到当前内容/商品/服务相关的物品，实现延伸消费的需求场景'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '热门推荐',
              desc: '在终端用户侧感知到当前/内容/商品/服务热门排行的物品列表，实现从众消费的需求场景'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '算法功能强大',
              desc: '提供深度学习等先进的机器学习算法，保证优秀的推荐效果'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '私有化部署',
              desc: '支持私有化部署，确保核心数据资产安全，赋能算法模型二次开发能力'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '推荐运营干预',
              desc: '可视化平台支持自主对物品设置加权、封禁、必推、过滤等运营干预能力，推荐结果更符合业务实际需求'
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
