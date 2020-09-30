<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'numberRecDetail',
    data() {
      return {
        audion_tech: {
          title: '数字识别',
          title_desc: '对图片中的数字进行提取和识别，自动过滤非数字内容，仅返回数字内容及其位置信息，识别准确率超过99%',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/shuzibanner.png'),
          menu_text: ['快递面单识别','仪表读数识别'],
          weitu: require('@/assets/images/aiSmartAppDetail/shuziWeitu.png'),
          app_title: '快递面单识别',
          app_desc: '使用数字识别技术，对快递面单、物流单据、外卖小票中的电话号码进行识别和提取，大幅度提升收货人信息的录入效率，方便进行收件通知，同时可识别纯数字形式的快递三段码，有效提升快件分拣速度',
          funExperiText:'',
          detailType:'numberRecDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '技术领先识别准确',
              desc: '对图片中的数字进行提取和识别，自动过滤非数字内容，仅返回数字内容及其位置信息，识别准确率超过99%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '云端服务',
              desc: '提供各类文字识别的云端Paas服务接口，用户可直接调用API或使用SDK对图片中的文字进行识别'
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

