<template>
  <div class="wisEducation_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <div class="wisEducation" v-show="preview">
      <div class="title"></div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div id="echart1" v-show="formParams1.suanfa==1"></div>
        <div id="echart2" v-show="formParams1.suanfa==2"></div>
        <div class="btn">
            <div class="btn_btn btn_sure"  @click="closeModel" >确定</div>
            <div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>
        </div>
      </div>
      
    </div>
    <div class="wisEducation" v-if="routeId == '6'&&preview==false">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div class="form">
            <div class="subtitle">预测设置</div>
            <el-form ref="dialogForm1" :model="formParams1" label-width="100px" size="mini" :rules="rules1" label-position="left" :inline="true" >
              <el-form-item label="选择算法"  prop='suanfa'>
                <el-select v-model="formParams1.suanfa" placeholder="请选择">
                  <!-- <el-option  v-for="item in model_name_list" :key="item" :label="item" :value="item"></el-option> -->
                        <el-option  label="决策树" value="1"></el-option>
                        <el-option  label="线性回归" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择模型"  prop='model'>
                <el-select v-model="formParams1.model" placeholder="请选择">
                  <!-- <el-option  v-for="item in model_name_list" :key="item" :label="item" :value="item"></el-option> -->
                    <el-option  label="线性回归20200731" value="1"></el-option>
                    <el-option  label="决策树20200731" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择数据"  prop='ku'>
                <el-select v-model="formParams1.ku" placeholder="请选择" @change="selectTable">
                  <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择自变量"  prop='cate1'>
                <el-select v-model="formParams1.cate1" placeholder="请选择" @change="selectEl" multiple>
                  <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
        </div>
        <div class="btn">
            <div class="btn_btn btn_sure"  @click="view" >确定</div>
            <div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";
import $echarts from 'echarts'
export default {
  props: ["routeId", "title"],
  data() {
    return {
      preview:false,
      isloading:false,
      closeIcon: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
      img: require("../../../assets/images/liveHood/13.png"),
      encoder: { oneHot: [], factorize: []},
      columns1: [
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Age',
                key: 'age'
            },
            {
                title: 'Address',
                key: 'address'
            }
        ],
        data1: [
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }
        ],
       formParams1: {
          suanfa:'1',
          algorithm:'',
          model:'',
          ku:'',
          cate1:[],
          cate2:'',
          show_options:[],
        },
        designList:[
          {column_name:'网购满意度'},
          {column_name:'网购金额'},
        ],
        dataList:[{id:'1',tableName:'1',userTableName:'表1'},{id:'2',tableName:'2',userTableName:'表2'}],
        rules1:{
            algorithm: [
              { required: true, message: '请选择内容', trigger: 'change' }
            ],
            model: [
              { required: true, message: '请选择内容', trigger: 'change' }
            ],
            ku: [
              { required: true, message: '请选择内容', trigger: 'change' }
            ],
            cate1: [
              {  type: 'array', required: true, message: '请选择内容', trigger: 'change' }
            ],
            // cate2: [
            //   {  required: true, message: '请选择内容', trigger: 'change' }
            // ],
            show_options: [
              { type: 'array', required: true, message: '请至少选择一个因素', trigger: 'change' }
            ],
        },
    };
  },
 mounted(){
   this.initEchart1()
   this.initEchart2()
 },
 methods: {
    initEchart1(){
      let option = {
          title: {
              text: '预测结果',
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 'left',
          //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          // },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                      {value: 335, name: '直接访问'},
                      {value: 310, name: '邮件营销'},
                      {value: 234, name: '联盟广告'},
                      {value: 135, name: '视频广告'},
                      {value: 1548, name: '搜索引擎'}
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
      let myChart=$echarts.init(document.getElementById('echart1'));
      myChart.setOption(option);
    },
    initEchart2(){
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      var  option = {
            title: {
                text: '预测结果',
                left: 'center'
            },
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                right: '5%',
                top:'5%',
                data:['2015 ', '2016 ']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '2015 ',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '2016 ',
                    type: 'line',
                    smooth: true,
                    data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                }
            ]
        };

      let myChart=$echarts.init(document.getElementById('echart2'));
      myChart.setOption(option);
    },
    closeModel() {
        this.$emit("closeWindow", false);
    },
    view(){
        console.log(2222222222)
        this.preview=true;
    },
  }
};
</script>
<style scoped lang="less">

.wisEducation_container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 23;

  /deep/ .ivu-spin-show-text {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .wisEducation {
    width: 1090px;
    min-height: 500px;
    max-height: 550px;
    background: #ffffff;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    margin-top: 94px;
    margin-bottom: 94px;
    overflow: auto;
    position: relative;

    .title {
      width: 100%;
      text-align: center;
      margin-top: 32px;
      margin-bottom: 30px;
      font-size: 22px;
      color: #121c33;
      letter-spacing: 0.1px;
    }

    .closeIcon {
      width: 14px;
      height: 14px;
      position: absolute;
      right: 14px;
      top: 14px;
    }

    .closeIcon:hover {
      cursor: pointer;
    }
    .fn_container{
        width: 100%;
        padding: 0 48px 44px 47px;
        box-sizing: border-box;
         img{
          width: 100%;
          display: block;
        }
        #echart1{
          width: 900px;
          height: 300px;
          margin:auto;
        }
        #echart2{
          width: 900px;
          height: 300px;
          margin:auto;
        }
        .subtitle{
            margin-bottom: 25px;
            font-size: 16px;
            color: #121c33;
            text-align: center;
            &.c-mt-40{
                margin-top: 40px;
            }
        }
        .btn{
            margin: auto;
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            width: 255px;
            margin-bottom: 40px;
            .btn_btn{
                width: 120px;
                height: 38px;
                border-radius: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                color: #FFFFFF;
                background: #03A971;
                cursor: pointer;
                &.btn_cancle{
                    font-size: 16px;
                    color: #3D4966;
                    background: #fff;
                    border: 1px solid #B8BECC;
                }
            }
        }
    }
  }
}
</style>
