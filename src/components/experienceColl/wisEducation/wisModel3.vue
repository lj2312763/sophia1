<template>
  <div class="wisEducation_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <div class="wisEducation" v-if="preview">
      <div class="title">算法设置</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div class="tree"  v-if="formParams.suanfa==1">
          <p class="res_title">决策树</p>
          <img :src="img1" />
          <p class="res_title">结果分析</p>
          <img :src="img" />
        </div>
        <div class="tree"  v-else>
          <p class="res_title">回归曲线</p>
          <img :src="img2" />
          <p class="res_title">结果分析</p>
          <img :src="img" />
        </div>
        <div class="btn">
            <div class="btn_btn btn_sure"  @click="closeModel" >确定</div>
            <div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>
        </div>
      </div>
      
    </div>
    <div class="wisEducation" v-if="routeId == '4'&&preview==false">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div class="form">
            <div class="subtitle">算法设置</div>
            <el-form ref="dialogForm" :model="formParams" label-width="140px" size="mini" :rules="rules" :inline="true" >
                <div class="form_list">
                  <el-form-item label="算法类型">
                    <el-select v-model="formParams.suanfaType" placeholder="选择字段">
                        <!-- <el-option v-for="(item,index) in choiceFieldArr" :key="index" :label="item.label" :value="item.value"></el-option> -->
                        <el-option  label="回归" value="1"></el-option>
                        <el-option  label="分类" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="选择算法">
                    <el-select v-model="formParams.suanfa" placeholder="选择字段">
                        <el-option  label="决策树" value="1"></el-option>
                        <el-option  label="线性回归" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="subtitle c-mt-40">变量设置</div>
                <div class="form_list">
                  <el-form-item label="选择自变量">
                    <el-select v-model="formParams.self" placeholder="选择字段">
                        <el-option  label="网购满意度" value="1"></el-option>
                        <el-option  label="网购金额" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="选择因变量">
                    <el-select v-model="formParams.yin" placeholder="选择字段">
                        <el-option  label="网购满意度" value="1"></el-option>
                        <el-option  label="网购金额" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="subtitle c-mt-40">参数设置</div>
                <template v-if="formParams.suanfa==1">
                  <div class="form_list">
                    <el-form-item label="几折交叉验证"  prop='yan'>
                      <el-input v-model="formParams.yan" placeholder="请输入整数"></el-input>
                    </el-form-item>
                    <el-form-item label="特征划分准则"  prop='penalty'>
                      <el-select v-model="formParams.penalty" placeholder="请选择" multiple>
                        <el-option  v-for="item in penaltyList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="form_list">
                    <el-form-item label="节点分裂最小样本数"  prop='max_iter'>
                      <el-input v-model="formParams.max_iter" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="树的最大深度"  prop='xishu'>
                      <el-input v-model="formParams.xishu" placeholder="输入多个用“,”隔开 "></el-input>
                    </el-form-item>
                  </div>  
                  <div class="form_list">
                    <el-form-item label="叶子节点最小样本数"  prop='max_iter1'>
                      <el-input v-model="formParams.max_iter1" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="结果展示选项"  prop='show_options' >
                      <el-select v-model="formParams.show_options" placeholder="请选择" multiple>
                        <el-option  v-for="item in show_optionsList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </template>
                <template v-else>
                  <div class="form_list">
                   <el-form-item label="几折交叉验证"  prop='yan'>
                      <el-input v-model="formParams.yan" placeholder="请输入整数"></el-input>
                    </el-form-item>
                    <el-form-item label="结果展示选项"  prop='show_options' >
                      <el-select v-model="formParams.show_options" placeholder="请选择" multiple>
                        <el-option  v-for="item in show_optionsList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </template>
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

export default {
  props: ["routeId", "title"],
  data() {
    return {
      img: require("../../../assets/images/liveHood/13.png"),
      img1: require("../../../assets/images/card/1599803772.png"),
      img2: require("../../../assets/images/card/quxian.jpg"),
      penaltyList:[
        {name:'entropy',value:'entropy'},
        {name:'gini',value:'gini'},
      ],//惩罚项
      show_optionsList:[
          {name:'分类报告',value:'report'},
          {name:'混淆矩阵',value:'matrix'},
          {name:'roc曲线',value:'roc'},
        //  {name:'拟合优度',value:'r2'},
        //  {name:'系数解读',value:'coff'},
        //  {name:'独立性检验',value:'independence'},
        //  {name:'残差正态性检验',value:'resid_normal'},
        //  {name:'残差pp图',value:'pp'},
        //  {name:'残差qq图',value:'qq'},
        //  {name:'方差齐性检验',value:'var'},
        //  {name:'多重共线性检验',value:'vif'},
        //  {name:'异常值检测',value:'outliers'},
        //  {name:'预测值与真实值对比散点图',value:'pred_y_contrast'},
      ],//结果展示选项
      preview:false,
      isloading:false,
      closeIcon: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
      encoder: { oneHot: [], factorize: []},
      columns1: [
          {
              title: '姓名',
              key: 'name'
          },
          {
              title: 'A年龄',
              key: 'age'
          },
          {
              title: '地址',
              key: 'address'
          }
      ],
      data1: [
          {
              name: 'John Brown1',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
          },
          {
              name: 'Jim Green2',
              age: 22,
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
          },
          {
              name: 'Jon Snow2',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
          }
      ],
      formParams: {
          suanfaType:'',
          suanfa:'1',
          self:'',
          yin:'',
          yan:'3',//几折交叉验证
          penalty:['gini'],//惩罚项
          xishu:'',//最大深度列表
          max_iter:'2',//最大迭代步数
          max_iter1:'1',//最大迭代步数
          max_features:'',//最大特征数量 
          show_options:["report", "matrix", "roc"],
      },
      rules:{
            numLtValue: [
              { required: false,message: '请输入内容'}
            ],
            numGtValue:[
              { required: false,message: '请输入内容'}
            ],
            numPlusValue:[
              { required: false,message: '请输入内容'}
            ]
          },
    };
  },
 methods: {
    closeModel() {
        this.$emit("closeWindow", false);
    },
    view(){
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
        .res_title{
          text-align: center;
          font-size: 18px;
          color: #121c33;
          margin-bottom: 30px;
          margin-top: 30px;
        }
        .form_list{
          width:70%;
          margin: auto;
          display: flex;
          justify-content: space-between;
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
