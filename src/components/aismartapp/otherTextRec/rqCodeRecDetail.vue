<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'rqCodeRecDetail',
    data() {
      return {
        audion_tech: {
          title: '二维码识别',
          title_desc: '对图片中的二维码、条形码进行检测和识别，返回存储的文字信息',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/erweimabanner.png'),
          menu_text: [],
          weitu: require('@/assets/images/aiSmartAppDetail/erweimaWeitu.png'),
          app_title: '物品信息管理',
          app_desc: '使用二维码识别技术，对各类物品的二维码或条形码信息进行解析识别，获取相应信息，可应用于商品、药品出入库管理及货物运输管理等场景，轻松一扫即可快速完成对物品信息的读取、登记和存储，大幅度简化物品管理流程',
          funExperiText:'',
          detailType:'rqCodeRecDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '二维码识别',
              desc: '支持对图片中的二维码进行检测和识别，返回存储的文字信息'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '条形码识别',
              desc: '支持对图片中的条形码进行检测和识别，返回存储的文字信息'
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

