<template>
  <div class="wisEducation_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <div class="wisEducation" v-if="preview">
      <div class="title">处理结果</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <img :src="img" />
        <div class="btn">
            <div class="btn_btn btn_sure"  @click="closeModel" >确定</div>
            <div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>
        </div>
      </div>
      
    </div>
    <div class="wisEducation" v-if="routeId == '5'&&preview==false">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div class="form">
            <div class="subtitle">评估设置</div>
            <el-form ref="dialogForm1" :model="formParams1" label-width="100px" size="mini" :rules="rules1" label-position="left" :inline="true" >
              <el-form-item label="选择模型"  prop='model'>
                <el-select v-model="formParams1.model" placeholder="请选择">
                  <el-option  v-for="item in model_name_list" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择数据表"  prop='ku'>
                <el-select v-model="formParams1.ku" placeholder="请选择" @change="selectTable">
                  <el-option  v-for="item in dataList" :key="item.id" :label="item.userTableName" :value="item.tableName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择自变量"  prop='cate1'>
                <el-select v-model="formParams1.cate1" placeholder="请选择" @change="selectEl" multiple>
                  <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择因变量"  prop='cate2'>
                <el-select v-model="formParams1.cate2" placeholder="请选择">
                  <el-option  v-for="item in designList" :key="item.column_name" :label="item.column_name" :value="item.column_name" :disabled="item.disabled"></el-option>
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
          algorithm:'',
          model:'',
          ku:'',
          cate1:[],
          cate2:'',
          show_options:[],
        },
        model_name_list:['线性回归20200731','决策树20200731'],
        designList:[
          {column_name:'网购满意度'},
          {column_name:'网购金额'},
        ],
        dataList:[{id:'1',tableName:'1',userTableName:'表1'},{id:'2',tableName:'2',userTableName:'表2'},],
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
 methods: {
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
