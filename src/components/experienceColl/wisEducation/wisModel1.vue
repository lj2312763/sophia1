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
         <Table :columns="columns" :data="data"></Table>
        <!--<div class="btn">-->
            <!--<div class="btn_btn btn_sure"  @click="closeModel" >确定</div>-->
            <!--<div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>-->
        <!--</div>-->
      </div>

    </div>
    <div class="wisEducation" v-if="routeId == '2'&&preview==false">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div class="form">
          <div class="subtitle c-mt-40">数据预处理</div>
          <el-form ref="dialogForm"  label-width="90px" size="mini" :rules="rules">
            <el-form-item label="OneHot编码">
              <el-select :multiple="true" v-model="encoder.oneHot" @change="select" placeholder="请选择" >
                <el-option
                  v-for="item in options"
                  :key="item.key"
                  :disabled="disabledOptions.includes(item.value)"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="序列编码">
              <el-select :multiple="true" v-model="encoder.factorize" @change="select" placeholder="请选择" >
                <el-option
                  v-for="item in options"
                  :key="item.key"
                  :disabled="disabledOptions.includes(item.value)"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="subtitle">异常值处理</div>
          <el-form ref="dialogForm" :model="formParams" label-width="90px" size="mini" :rules="rules">
                <el-form-item label="范围">
                <el-select v-model="formParams.choiceField" placeholder="选择字段">
                    <el-option v-for="(item,index) in choiceFieldArr" :key="index" :label="item.column_name" :value="item.column_name"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="标准">
                <el-checkbox-group v-model="formParams.standardType" @change="handleClickStandType">
                    <el-checkbox label="missNumber">缺失数字</el-checkbox>
                    <el-checkbox label="numberLess">
                    <el-form-item prop="numLtValue">
                        数字&lt; <el-input v-model="formParams.numLtValue" :disabled="numLtValueDis" style="width:92px" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    </el-checkbox>
                    <el-checkbox label="numberGreater">
                    <el-form-item prop="numGtValue">
                        数字&gt; <el-input  v-model="formParams.numGtValue" :disabled="numGtValueDis" style="width:92px" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    </el-checkbox>
                    <el-checkbox label="standardDev">
                    <el-form-item prop="numPlusValue">
                        数字+/- <el-input v-model="formParams.numPlusValue" :disabled="numPlusValueDis" style="width:92px" placeholder="请输入内容"></el-input>标准差
                    </el-form-item>
                    </el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item label="处理方法">
                <el-radio-group v-model="formParams.resource">
                    <el-radio label="01" class="c-mb-20" checked>删除异常值</el-radio>
                    <el-radio label="02" class="c-mb-20">设置为NULL</el-radio>
                    <el-radio label="03">
                    填补
                    <el-select v-model="formParams.deal" placeholder="请选择" style="width:120px;display:inline-block">
                        <el-option label="locf法" value="01">最小近邻法</el-option>
                        <el-option label="平均值" value="02">平均值</el-option>
                        <el-option label="中位数" value="03">中位数</el-option>
                        <el-option label="众数" value="04">众数</el-option>
                    </el-select>
                    </el-radio>
                </el-radio-group>
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
  props: ["routeId", "title", "tableName"],
  data() {
    return {
      preview:false,
      isloading:false,
      closeIcon: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
      encoder: { oneHot: [], factorize: []},
      unitChangeParm1: {},
      unitChangeParm2: {},
      columns: [],
      data: [],
      formParams: {
          numGtValue: '',
          numLtValue:'',
          numPlusValue:'',
          choiceField:'',
          standardType: ['missNumber'],
          resource:'01',
          deal:''
      },
      choiceFieldArr:[],
      options:[ ],
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
      numLtValueDis:true,
      numGtValueDis:true,
      numPlusValueDis:true,
      isMerge:false,
      NewTableId:'',
    };
  },
   created() {
    this.ininSearch();
  },
  methods: {
    // 查询异常处理
    submitFunc1(tableName){
        var operData = this.formParams;
        var missNumber,numLess,numGreater,standard,fillUpWay;
        var standardTypeArr = operData.standardType;
        if(standardTypeArr.includes('numberLess')){
          numLess = operData.numLtValue;
        } else{
          numLess = '';
        }

        if(standardTypeArr.includes('missNumber')){
          missNumber = '1';
        } else{
          missNumber = '2';
        }

        if(standardTypeArr.includes('numberGreater')){
          numGreater = operData.numGtValue;
        } else{
          numGreater = '';
        }

        if(standardTypeArr.includes('standardDev')){
          standard = operData.numPlusValue;
        } else{
          standard = '';
        }
        if(operData.resource == '03'){
          fillUpWay = operData.deal;
        } else{
          fillUpWay = '';
        }
      const formData = new FormData()
      formData.append('tableName',tableName || '');
      formData.append('fieldScope',operData.choiceField || '');
      formData.append('missNumber',missNumber);
      formData.append('numberLess',numLess);
      formData.append('numberGreater',numGreater);
      formData.append('standardDev',standard);
      formData.append('dealMethod',operData.resource);
      formData.append('fillUpWay',fillUpWay);
      return this.$axios({
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "post",
        url: window.config.dataUrl+"/data/abnormalValue/abnormalHandle",
        data: formData,
      }).then((res)=>{
        if(res.data.code === 200000){
          if(typeof res.data.data === 'string'){
            this.$Message.error(res.data.data);
          }else {
            return res.data.data
          }

        }else {
          this.$Message.error('请求失败');
        }
        return Promise.reject()
      })
      },
     handleClickStandType(e){
        let choiceSrr = e;
        if(choiceSrr.includes('numberLess')){
          this.rules.numLtValue[0].required = true;
          this.numLtValueDis = false;
        }
        else{
          this.rules.numLtValue[0].required = false;
          this.numLtValueDis = true;
        }
        if(choiceSrr.includes('numberGreater')){
          this.rules.numGtValue[0].required = true;
          this.numGtValueDis = false;
        }
        else{
          this.rules.numGtValue[0].required = false;
          this.numGtValueDis = true;
        }
        if(choiceSrr.includes('standardDev')){
          this.rules.numPlusValue[0].required = true;
          this.numPlusValueDis = false;
        }
        else{
          this.rules.numPlusValue[0].required = false;
          this.numPlusValueDis = true;
        }
      },
     ininSearch() {
      this.$axios({
        method: "get",
        url: window.config.dataUrl + "/data/excelOperate/getTableCosumn",
        params: {
          name: this.tableName
        }
      }).then(res => {
          if (res.data.code == 200000) {
            this.designList = res.data.data;
            this.designList.forEach((item, index) => {
              if (item.column_name != "id") {
                this.options.push({ label: item.column_name, value: item.column_name })
              }
            });
           this.ininMyData();
          }
        })
        .catch(err => {});
    },
     closeModel() {
        this.$emit("closeWindow", false);
     },
    // 查看数据
    view(){
      // 没有选择
      if(!this.formParams.choiceField || (!this.encoder.oneHot.length && !this.encoder.factorize.length)){
        this.$message.warning('请选择异常值处理条件或数据预处理条件');
        return
      }
      if(!this.NewTableId){
        return this.$message.error('数据预处理错误，无法进行异常处理')
      }
      this.submitFunc1(this.NewTableId).then((data)=>{
        const col = data.queryList[0];
        this.columns = Object.keys(col).sort().map(e=>({ key: e, title: e }));
        this.data = data.queryList;
        this.$emit('getTableName', this.NewTableId);
        this.preview = true
      })
    },
    // 算法数据编码请求
   submitFunc2(){
     const data = { tableId: this.tableName, encoder: this.encoder };
     return this.$axios({
       method: "post",
       url: window.config.dataUrl + "/algorithm/dataProcessDemo/encoder",
       data
     }).then((res)=>{
       if(res.data.code === '200'){
         return res.data
       }else {
         this.$Message.error('请求失败');
       }
       return Promise.reject()
     })
   },
    // 数据预处理的选择项选择事件
    select(){
      //oneHot编码和序列编码只要有一个选择时就可以请求
      if(this.encoder.factorize.length || this.encoder.oneHot.length){
        this.submitFunc2().then((data)=>{
          this.NewTableId = data.NewTableId;
          this.choiceFieldArr = [];
          data.res.col.forEach((item) => {
            if (item !== "id" && item) {
              this.choiceFieldArr.push({ column_name: item });
            }
          });
        })
      }
    }
  },
  computed: {
    // 已经被选中过的下拉，禁止再次选中
    disabledOptions(){
      return (this.options || []).filter(e=>( this.encoder.factorize.includes(e.value) || this.encoder.oneHot.includes(e.value))).map(e=>e.value)
    }
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
