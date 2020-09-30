<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'xshiLiceRecDetail',
    data() {
      return {
        audion_tech: {
          title: '行驶证识别',
          title_desc: '对机动车行驶证主页及副页所有21个字段进行结构化识别，包括号牌号码、车辆类型、所有人、品牌型号、车辆识别代码、发动机号码、核定载人数、质量、尺寸、检验记录等',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/xingshizhengBanner.png'),
          menu_text: ['司机身份认证', '车主信息服务','汽车后市场服务'],
          weitu: require('@/assets/images/aiSmartAppDetail/xingshizhengWeitu.png'),
          app_title: '司机身份认证',
          app_desc: '使用行驶证和驾驶证识别技术，实现对用户身份信息和驾驶证信息的结构化识别和录入，可应用于网约车或货车司机身份审查等场景，有效提升信息录入效率，降低用户输入成本，提升用户使用体验',
          funExperiText:'',
          detailType:'xshiLiceRecDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '深入场景',
              desc: '深入汽车服务场景进行专项优化，可覆盖汽车购买、使用和服务的全部场景，提供全流程解决方案'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '证件风险检测',
              desc: '检测上传的图片是否为身份证复印件、临时身份证、屏幕翻拍身份证或被PS过的身份证，并返回对应的风险类型'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon_BI_service.png'),
              title: '端上质量校验',
              desc: '提供移动端SDK，使用时能实时检测取景框中是否包含身份证，是否存在模糊、欠/过曝等情况，并提示用户矫正，提高采集质量，提升准确率'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '字段齐全',
              desc: '支持对行驶证主页及副页所有21个字段的结构化识别，能够实现不同业务场景下对任意字段信息的提取，满足各类相关需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '准确率高',
              desc: '依托优秀的图像处理技术和海量优质数据，支持识别各角度身份证照片，并对各少数民族身份证进行专项优化，识别准确率超过99%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定',
              desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
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

