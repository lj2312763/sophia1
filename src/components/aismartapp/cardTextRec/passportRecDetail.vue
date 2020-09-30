<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'passportRecDetail',
    data() {
      return {
        audion_tech: {
          title: '护照识别',
          title_desc: '支持对中国大陆护照个人资料页所有10个字段进行结构化识别，包括国家码、护照号、姓名、姓名拼音、性别、出生地点、出生日期、签发地点、签发日期、有效期',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/passBanner.png'),
          menu_text: ['境外旅游', '留学信息登记'],
          weitu: require('@/assets/images/aiSmartAppDetail/passWeitu.png'),
          app_title: '境外旅游',
          app_desc: '使用护照识别技术，实现对用户护照信息的结构化识别和录入，可应用于境外旅游产品预订、酒店入住登记等场景，满足护照信息自动录入的需求，有效提升信息录入效率，降低用户输入成本，提升用户使用体验',
          funExperiText:'',
          detailType:'passportRecDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '全字段识别',
              desc: '支持对护照所有10个字段的结构化识别，能够实现不同业务场景下对任意字段信息的提取，满足各类相关需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '准确率高',
              desc: '依托优秀的图像处理技术，对护照反光、底纹等情况进行专项优化，关键字段识别准确率超过95%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
              title: '服务稳定',
              desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
              title: '字段齐全',
              desc: '支持对护照所有10个字段的结构化识别，能够实现不同业务场景下对任意字段信息的提取，满足各类相关需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '准确率高',
              desc: '依托优秀的图像处理技术和海量优质数据，支持识别各角度身份证照片，并对各少数民族身份证进行专项优化，识别准确率超过99%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
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

