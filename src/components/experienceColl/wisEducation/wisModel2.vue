<template>
  <div class="wisEducation_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <div class="wisEducation" v-if="routeId == '3'">
      <div class="title">处理结果</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <img :src="img" />
        <div class="btn">
          <div class="btn_btn btn_sure" @click="closeModel">确定</div>
          <div class="btn_btn btn_cancle" @click="closeModel">取消</div>
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
      isloading: false,
      preview: false,
      closeIcon: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
      img: require("../../../assets/images/liveHood/12.png"),
      designList: [],
      selfList:[]
    };
  },
  created() {
    this.ininSearch();
  },
  methods: {
    ininSearch() {
      this.$axios({
        method: "get",
        url: window.config.dataUrl + "/data/excelOperate/getTableCosumn",
        params: {
          name: this.tableName
        }
      })
        .then(res => {
          if (res.data.code == 200000) {
            this.designList = res.data.data;
            this.designList.forEach((item, index) => {
              if (item.column_name != "id") {
                this.selfList.push(item.column_name);
              }
            });
           this.ininMyData();
          }
        })
        .catch(err => {});
    },
    ininMyData() {
      this.$axios({
        method: "post",
        url: window.config.dataUrl + "/algorithm/dataAnalysis",
        data: {
          tableName: this.tableName,
          count: [this.selfList[0]], //频率分布直方图
          box: [this.selfList[0]], //箱型图
          pairPlot: [this.selfList[0]] //相关系数矩阵
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.getRes(res.data)
          }
        })
        .catch(err => {});
    },
    getRes(res){
      this.resFlag=true;
      this.result=[];
      this.stResult=[];
      this.baseResult=[];
      this.lookresult=null;
      this.saveData={
          data:res.model_info?res.model_info:'',
          title:'数据探索',
          dom:'pdfDom',
          doc:'svmClassifier'
      }
      var res=res.res;
      for(var key in res){
          if(res[key].data){
              if(Object.prototype.toString.call(res[key].data) =='[object Array]'){
                  let obj={};
                  res[key].col.forEach((item,index)=>{
                      let newkey='colName'+index;
                      obj[newkey]=item;
                  })
                  res[key].col = obj;
                  let arr=[];
                  res[key].data.forEach(item1=>{
                      let obj1={};
                      item1.forEach((item2,index2)=>{
                          let newkey1='colName'+index2;
                          obj1[newkey1]=item2;
                      })
                      arr.push(obj1)
                      res[key].data=arr;
                  })
                  this.result.push(res[key]);
              }
          }else{
              if(res[key].base64){
                  this.baseResult.push(res[key]);
              }
              if(res[key].str){
                  this.stResult.push(res[key]);
              }
          }
          this.resultArr=res;
      }
      
      
  },
    closeModel() {
      this.$emit("closeWindow", false);
    },
    view() {
      this.preview = true;
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
    .fn_container {
      width: 100%;
      padding: 0 48px 44px 47px;
      box-sizing: border-box;
      img {
        width: 100%;
        display: block;
      }
      .subtitle {
        margin-bottom: 25px;
        font-size: 16px;
        color: #121c33;
        text-align: center;
        &.c-mt-40 {
          margin-top: 40px;
        }
      }
      .btn {
        margin: auto;
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        width: 255px;
        margin-bottom: 40px;
        .btn_btn {
          width: 120px;
          height: 38px;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #ffffff;
          background: #03a971;
          cursor: pointer;
          &.btn_cancle {
            font-size: 16px;
            color: #3d4966;
            background: #fff;
            border: 1px solid #b8becc;
          }
        }
      }
    }
  }
}
</style>
