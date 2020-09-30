<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'netWorkPicRecDetail',
    data() {
      return {
        audion_tech: {
          title: '网络图片文字识别',
          title_desc: '针对网络图片进行专项优化，支持识别艺术字体或背景复杂的文字内容',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/wangluobanner.png'),
          menu_text: [],
          weitu: require('@/assets/images/aiSmartAppDetail/wangluoWeitu.png'),
          app_title: '内容审核',
          app_desc: '使用网络图片文字识别技术，实现对艺术字体或背景复杂的文字内容进行识别，应用于社交、电商、短视频、直播等场景，同时结合图像审核技术对图片或视频进行审核，识别其中存在的违规、广告内容，有效规避业务风险',
          funExperiText:'',
          detailType:'netWorkPicRecDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '技术领先识别准确',
              desc: '针对网络图片进行专项优化，支持识别艺术字体或背景复杂的文字内容，总体识别准确率可达95%以上'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '云端服务',
              desc: '提供各类文字识别的云端Paas服务接口，用户可直接调用API或使用SDK对图片中的文字进行识别'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '准确率高',
              detailType:'netWorkPicRecDetail',
              desc: '依托元智优秀的图像处理技术和海量优质数据，针对各种艺术字体及背景复杂的文字内容进行专项优化，总体识别准确率可达95%以上'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定',
              detailType:'netWorkPicRecDetail',
              desc: '依托元智技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
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

