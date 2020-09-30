<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>

<script>
  import vList from '../detailComponent';
  export default {
    name: 'tableTextRecDetail',
    data() {
      return {
        audion_tech: {
          title: '表格文字识别',
          title_desc: '对图片中的表格文字内容进行提取和识别，支持识别完整框线表格、含合并单元格表格或无框线表格，并可选择以JSON或Excel形式进行返回',
          use_btn: '立即使用',
          tech_file: '技术文档',
          tiyan: '功能体验',
          list_img: require('@/assets/images/aiSmartAppDetail/biaogebanner.png'),
          menu_text: ['财税报表识别','信息登记表识别'],
          weitu: require('@/assets/images/aiSmartAppDetail/biaogeWeitu.png'),
          app_title: '财税报表识别',
          app_desc: '使用表格文字识别技术，对银行对账单、资产负债表、损益表等财税场景常用表格内容进行提取和识别，快速实现表格内容的电子化，用于财税信息统计、存档及核算，大幅度提升信息录入效率，节省企业人力成本',
          funExperiText:'',
          detailType:'tableTextRecDetail',
          list_nav_text:['功能介绍','功能体验','应用场景','特色优势','支持交流'],
          function_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '全字段识别',
              desc: '支持对增值税普票、专票、电子发票、卷票全部关键字段的结构化识别，能够满足财税报销等场景中对任意字段的识别需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '二维码识别校验',
              desc: '识别票面左上角的二维码，获取发票代码、号码、金额、开票日期、校验码五个字段信息，与识别到的对应字段信息进行匹配校验，保证更高的识别准确率'
            }
          ],
          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '功能完善',
              detailType:'',
              desc: '仅需调整请求参数即可支持识别完整框线表格、含合并单元格表格和无框线表格，满足各类业务场景对不同样式表格的识别需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '准确率高',
              detailType:'',
              desc: '依托优秀的图像处理技术，支持对不同样式表格进行解析，并准确识别单元格内的汉字、字母、长串数字、分隔符、小数点等内容'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定',
              detailType:'',
              desc: '依托元知人工智能技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
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

