<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'returnPerRecDetail',
    data() {
      return {
        audion_tech: {
          title: '港澳通行证识别',
          title_desc: '支持对大陆居民往来港澳通行证的证件号码、姓名、姓名拼音、出生日期、性别、有效期限、签发地点7个关键字段进行结构化识别',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/gangaoBanner.png'),
          menu_text: ['境外旅游', '留学信息登记'],
          weitu: require('@/assets/images/aiSmartAppDetail/passWeitu.png'),
          app_title: '境外旅游',
          app_desc: '使用护照识别技术，实现对用户护照信息的结构化识别和录入，可应用于境外旅游产品预订、酒店入住登记等场景，满足护照信息自动录入的需求，有效提升信息录入效率，降低用户输入成本，提升用户使用体验',
          funExperiText:'',
          detailType:'returnPerRecDetail',
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
              title: '技术领先',
              desc: '依托优秀的图像处理技术和海量优质数据，支持对不同时期不同版式营业执照的结构化识别，能够满足对各式营业执照任意关键字段进行提取的需求',
              detailType:'returnPerRecDetail'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
              title: '服务稳定',
              desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%',
              detailType:'returnPerRecDetail'
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

