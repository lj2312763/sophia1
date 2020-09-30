<template>
  <div class="wuyeCre_container">
    <div class="content_container">
      <div class="echarts_container">
        <div class="left_echarts" id="left_echarts"></div>
        <div class="right_echarts" id="right_echarts"></div>
      </div>
      <div class="caipan_wenshu">裁判文书</div>
      <Table :data="creData.adjudicationDocumentList" :columns="wenshuDataColumns" stripe>
        <template slot-scope="{ row }" slot="publishDate">
           {{ row.publishDate.split(' ')[0] }}
        </template>
      </Table>
      <div class="kaiting_gonggao">开庭公告</div>
      <Table :data="creData.courthouseNoticeList" :columns="gonggaoDataColumns" stripe>
          <template slot-scope="{ row }" slot="openDate">
            {{ row.openDate.split(' ')[0] }}
          </template>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    creData:{
      type:Object
    }
  },
  data() {
    return {
      wenshuDataColumns: [
        {
            title: '序号',
            key: 'orderNo',
            width:110,
        },
        {
            title: '案件名称',
            key: 'title',
            width:260,
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '发布时间',
            //key: 'publishDate',
            width:130,
            height:46,
            ellipsis:true,
            tooltip:true,
            slot: 'publishDate'
        },
        {
            title: '案件编号',
            key: 'caseNo',
            ellipsis:true,
            tooltip:true,
        },
        {
            title:'案由',
            key:'remark'
        },
        {
            title:'执行法院',
            key:'courthouse',
            height:46,
            ellipsis:true,
            tooltip:true
        }
      ],
      gonggaoDataColumns:[
        {
            title: '序号',
            key: 'orderNo',
            width:110,
            height:46,
            ellipsis:true,
            tooltip:true
        },
        {
            title: '案号',
            key: 'caseNo',
            width:260,
            height:46,
            ellipsis:true,
            tooltip:true
        },
        {
            title: '开庭时间',
            //key: 'openDate',
            height:46,
            ellipsis:true,
            tooltip:true,
            slot: 'openDate'
        },
        {
            title: '案由',
            key: 'caseReason',
            height:46,
            ellipsis:true,
            tooltip:true
        },
        {
            title:'公诉人/原告/上诉人/申请人',
            width:260,
            key:'plaintiff'
        },
        {
            title:'被告人/被告/被上诉人/被申请人',
            width:260,
            key:'accused',
            ellipsis:true,
            tooltip:true
        }
      ]
    }
  },
  mounted(){
    this.initEcharts();
  },
  methods:{
    initEcharts(){
      var echarts = require("echarts");

      //左侧饼图
      var leftChart = echarts.init(document.getElementById("left_echarts"));  
      var leftOption = {
        title: {
            text: '案由分析',
            left: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '案由分析',
                type: 'pie',
                radius: '65%',
                center: ['center', 'center'],
                data: [
                    {value: 310, name: '其他类型纠纷'},
                    {value: 234, name: '房屋买卖合同纠纷'},
                    {value: 135, name: '财产损害赔偿纠纷'},
                    {value: 1548, name: '物业服务合同纠纷'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      leftChart.setOption(leftOption);

      //右侧饼图
      var rightChart = echarts.init(document.getElementById("right_echarts"));  
      var rightOption = {
        title: {
            text: '案件身份分析',
            left: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '案件身份分析',
                type: 'pie',
                radius: '65%',
                center: ['center', 'center'],
                data: [
                    {value: 907, name: '原告'},
                    {value: 93, name: '被告'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      rightChart.setOption(rightOption);
    }
  }
};
</script>
<style scoped lang='less'>
.wuyeCre_container{
  width: 100%;
  .content_container{
    /deep/.ivu-table-wrapper{
        /deep/.ivu-table-stripe{
            /deep/.ivu-table-header{
                table{
                    border-spacing: 0px 0px !important;
                }
            }
            /deep/.ivu-table-body{
                table{
                    border-spacing: 0px 0px !important;
                }
            }
            /deep/.ivu-table-tip{
                table{
                    border-spacing: 0px 0px !important;
                }
            }
        }
    }
    .echarts_container{
      width: 100%;
      height: 400px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_echarts{
        width: 49%;
        height: 100%;
        border: 1px solid #B8BECC;
        padding: 20px;
      }
      .right_echarts{
        width: 49%;
        height: 100%;
        border: 1px solid #B8BECC;
        padding: 20px;
      }
    }
    .caipan_wenshu{
      width: 100%;
      font-size: 24px;
      margin-bottom: 30px;
    }
    .kaiting_gonggao{
      width: 100%;
      font-size: 24px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>

