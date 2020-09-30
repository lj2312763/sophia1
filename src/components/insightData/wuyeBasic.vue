<template>
  <div class="wuye_content">
    <div class="basic_info">
      <div class="info_list">
        <div class="tilte">注册资本</div>
        <div class="info">{{result.registeredCapital}}</div>
      </div>
      <div class="info_list">
        <div class="tilte">营业收入</div>
        <div class="info">{{result.income}}</div>
      </div>
      <div class="info_list">
        <div class="tilte">管理面积</div>
        <div class="info">{{result.areaSize}}</div>
      </div>
      <div class="info_list">
        <div class="tilte">覆盖社区</div>
        <div class="info">{{result.community}}</div>
      </div>
      <div class="info_list">
        <div class="tilte">员工人数</div>
        <div class="info">{{result.staffCount}}</div>
      </div>
    </div>
    <div class="table_info">
      <p>工商信息</p>
     <table border="1" width="100%" cellspacing="0" cellpadding="0">
        <tr>
           <td class="table_name">注册资本：</td>
           <td>{{result.registeredCapital}}</td>
           <td class="table_name">实缴资本：</td>
           <td>{{result.painCapital}}</td>
        </tr>
        <tr>
          <td>经营状态：</td>
          <td>{{result.status}}</td>
          <td>成立日期：</td>
          <td>{{result.registDate}}</td>
        </tr>
        <tr>
          <td>统一社会信用代码：</td>
          <td>{{result.creditCode}}</td>
          <td>纳税人识别号：</td>
          <td>{{result.taxpayer}}</td>
        </tr>
        <tr>
          <td>注册号：</td>
          <td>{{result.registNo}}</td>
          <td>组织机构代码：</td>
          <td>{{result.orgNo}}</td>
        </tr>
        <tr>
          <td>公司类型：</td>
          <td>{{result.companyType}}</td>
          <td>所属行业：</td>
          <td>{{result.industry}}</td>
        </tr>
        <tr>
          <td>核准日期：</td>
          <td>{{result.auditDate}}</td>
          <td>登记机关：</td>
          <td>{{result.registGov}}</td>
        </tr>
        <tr>
          <td>所属地区：</td>
          <td></td>
          <td>英文名：</td>
          <td>{{result.comanyEname}}</td>
        </tr>
        <tr>
          <td>人员规模：</td>
          <td>{{result.staffCount}}</td>
          <td>参保人数：</td>
          <td>{{result.insuredCount}}</td>
        </tr>
        <tr>
          <td>实缴资本：</td>
          <td>{{result.painCapital}}</td>
          <td>营业期限：</td>
          <td>{{result.limitDate}}</td>
        </tr>
        <tr>
          <td class="table_name">曾用名：</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td  class="table_name">注册地址：</td>
          <td colspan="3">{{result.registAddress}}</td>
        </tr>
        <tr>
          <td  class="table_name">经营范围：</td>
          <td colspan="3">{{result.businessScope}}</td>
        </tr>
      </table>
    </div>
    <div class="echart_info">
      <p>舆情信息</p>
      <div class="echart_containter">
        <div class="left">
          <p>企业舆情声量走势</p>
          <div id="echart_box1"></div>
        </div>
        <div class="right">
          <p>企业舆情情感态度分布</p>
          <div id="echart_box2"></div>
        </div>
      </div>
    </div>
    <p class="key_events_tilte">重点事件摘要</p>
    <div class="key_events">
      <p class="tilte">{{result.estateNewsList[0].title}}</p>
      <p class="desc">{{result.estateNewsList[0].content}}</p>
    </div>
    <div class="comments">
      <p class="tilte">微博评论</p>
      <Table :columns="columns" :data="result.newsCommentList" stripe></Table>
    </div>

  </div>
</template>

<script>
import $echarts from 'echarts'
export default {
  props:['basicData'],
  data() {
    return {
       result:'',
       columns: [
              {
                title: '微博昵称',
                key: 'nickName',
                width: 150,
            },
            {
                title: '微博评论',
                key: 'content',
                ellipsis:true,
                tooltip:true,
            },
            {
                title: '日期',
                key: 'createDate',
                width: 200,
            },
        ],
    }
  },
  created(){
    this.result=this.basicData;
  },
  mounted(){
    this.init();
  },
  methods: {
     init(){
        let result1=this.result.consensusInfoList;//饼图
        let category=[];
        let arr=[];
        let pieArr=[];
        let pieArr1=[];
        let pieArr2=[];
        result1.forEach(item=>{
          category.push(item.createDate);
          arr.push(item.totalCount);
          pieArr.push(item.goodCount)
          pieArr1.push(item.normalCount)
          pieArr2.push(item.badCount)
        })
        var MapChart = $echarts.init(document.getElementById("echart_box1"));
        let option = {
                dataset: {
                    source: [
                        ['product', '2012', '2013', '2014', '2015'],
                        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                        ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
                    ]
                },
                tooltip: {
                    trigger: "axis"
                },
                // legend: {
                //     data: ['总量'],
                //     bottom: 10,
                // },
                grid:{
                    left: 60,
                    right: 20,
                    top:20
                },
                xAxis: {
                    type: 'category',
                   // data: this.lineEchartsData.category,
                    data:category,
                    axisLine: {
                        symbol: ["none", "arrow"],
                        symbolSize: [5, 5]
                    }
                },
                yAxis:  {
                    type: 'value',
                    axisLine: {
                        symbol: ["none", "arrow"],
                        symbolSize: [5, 5]
                    }
                },
                series: [{
                    data: arr,
                    type: 'line',
                    name:'总量',
                    smooth: true
                }]
            };
            MapChart.setOption(option);

            var reasonMapChart = $echarts.init(document.getElementById("echart_box2"));
            var reason_map_option = {
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     data: ['正面', '中性', '负面']
                // },
                grid: {
                    left: 60,
                    right: 20,
                    top:20,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: category
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                   {
                        name: '正面',
                        type: 'line',
                        data: pieArr,
                        areaStyle: {},
                        smooth: true
                    },
                    {
                        name: '中性',
                        type: 'line',
                        data: pieArr1,
                        areaStyle: {},
                        smooth: true
                    },
                    {
                        name: '负面',
                        type: 'line',
                        data: pieArr2,
                        areaStyle: {},
                        smooth: true
                    },
                ]
                
            };
            reasonMapChart.setOption(reason_map_option);
     }
  }
 
};
</script>
<style scoped lang='less'>
.wuye_content{
  width: 100%;
  .basic_info{
    display: flex;
    justify-content: space-between;
    .info_list{
      flex:1;
      text-align: center;
      margin: 0 50px;
      &:nth-child(1){
        margin-left:0;
      }
      &:last-child{
        margin-right:0;
      }
      .tilte{
        font-size:18px;
        margin-bottom: 15px;
        color:#000;
      }
      .info{
        width: 100%;
        font-size: 20px;
        background-color: #03A971;
        color: #fff;
        border-radius: 2px;
      }
    }
  }
  .table_info{
    p{
      font-size: 22px;
      margin:20px 0;
    }
    table{
      border-collapse: collapse;
      text-align: center;
      
      td{
        padding:10px 0;
        &.table_name{
          width: 150px;
        }
      }
    }
  }
  .echart_info{
    p{
      font-size: 22px;
      margin:20px 0;
    }
    .echart_containter{
      display: flex;
      .left{
        height: 350px;
        flex:1;
        border: 1px solid #ccc;
        margin-right: 20px;
        p{
          height: 10%;
          display: flex;
          align-items: center;
          padding-left:20px;
        }
        div{
          width: 100%;
          height: 90%;
        }
      }
      .right{
        height: 350px;
        flex:1;
        border: 1px solid #ccc;
         p{
          height: 10%;
          display: flex;
          align-items: center;
          padding-left:20px;
        }
        div{
          width: 100%;
          height: 90%;
        }
      }
    }
  }
  .key_events_tilte{
    margin-top: 30px;
      font-size: 18px;
      color: #121C33;
      margin-bottom: 20px;
  }
  .key_events{
    background: rgba(242,244,247,0.50);
    padding:10px;
    .tilte{
      font-size: 18px;
      color: #121C33;
      margin-bottom: 10px;
    }
    .desc{
      text-indent: 28px;
      font-size: 14px;
      color: #3D4966;
      line-height: 26px;
    }
  }
  .comments{
    margin-top: 30px;
    .tilte{
      font-size: 18px;
      color: #121C33;
      margin-bottom: 20px;
    }
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
  }
}
</style>
