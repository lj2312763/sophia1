<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'sealDetectDetail',
    data() {
      return {
        audion_tech: {
          title: '印章检测',
          title_desc: '支持对合同文件或常用票据中的印章进行检测，并返回其位置信息。暂支持对圆形章、椭圆形章进行位置检测，更多印章种类支持及识别功能敬请期待',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/yinzhangbanner.png'),
          menu_text: [],
          weitu: require('@/assets/images/aiSmartAppDetail/erweimaWeitu.png'),
          app_title: '合同、票据合法性检测',
          app_desc: '使用印章检测技术，可检测合同文件与常用票据中有无印章，用于快速确认合同及票据的合法性，并可定位印章位置进行印章图案抠取，有效提高验证效率，降低财税及商务合同签订过程的业务风险',
          funExperiText:'',
          detailType:'sealDetectDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '合法性检测',
              desc: '使用印章检测技术，可检测合同文件与常用票据中有无印章，用于快速确认合同及票据的合法性'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '检测范围',
              desc: '暂支持对圆形章、椭圆形章进行位置检测'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '使用便捷',
              detailType:'',
              desc: '无需对识别结果进行后续处理，自动过滤图片中的非数字内容，仅返回数字内容及其位置信息，直接满足使用需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '准确率高',
              detailType:'',
              desc: '依托优秀的图像处理技术和海量优质数据，支持识别各角度图片，并对不同的数字字体进行专项优化，识别准确率超过99%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定',
              detailType:'',
              desc: '依托元知技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
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

