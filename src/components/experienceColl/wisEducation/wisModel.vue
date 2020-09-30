<template>
  <div class="wisEducation_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <!--人脸识别-->
    <div class="wisEducation" v-if="routeId == '1'&&preview==false">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
        <div class="top">
            <Upload
                type="drag"
                :format="['csv', 'xls', 'xlsx']"
                :max-size="1024"
                :before-upload="handleBeforeUpload"
                action="//jsonplaceholder.typicode.com/posts/">
                <div class="iconBox">
                    <Icon type="ios-cloud-upload" size="52" style="color: #B8BECC;"></Icon>  
                    <p  style="font-size: 12px;color:#7A8499;">将文件拖到此处，或  <span style="font-size: 14px;color:#03A971;">点击上传</span> </p>
                    <p style="font-size: 12px;color: #B8BECC;">支持 csv/xls/xlsx 文件，且单个文件最大不超过50M</p>
                </div>
            </Upload>
        </div>
        <div class="bottom">
            csv、xls、xlsx文件只获取第一个sheet表格，表格示例如下：<br>
            1、请上传有标准行列的一维数据表格。（有合并单元格的数据请处理过后再上传，否则可能出现表头识别有误）<br>
            2、日期字段需包含年月日（如2016/1/1），或年月日时分秒。（如2016/1/1 00:00:00）
        </div>
        <div class="btn">
            <div class="btn_btn btn_sure"  @click="view" >确定</div>
            <div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>
        </div>
      </div>
    </div>
    <div class="wisEducation" v-show="preview">
      <div class="title">数据预览</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel" />
      <div class="fn_container">
          <div v-for="(item,index) in dataList" :key="index" class="c-detail-box">
            <!-- <div class="c-title">
                {{item.userTableName}}
            </div> -->
            <vxe-table
                border
                show-header-overflow
                show-overflow
                highlight-hover-row
                :data="item.content"
                >
                <vxe-table-column :field="subItem" :title="subItem" v-for="(subItem,subIndex) in item.nameList" :key="subIndex"></vxe-table-column>
            </vxe-table>
        </div>
        <div class="btn">
            <div class="btn_btn btn_sure"  @click="closeModel" >确定</div>
            <div class="btn_btn btn_cancle"  @click="closeModel" >取消</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";

export default {
  props: ["routeId", "title",'categoryList'],
  data() {
    return {
      preview:false,
      isloading:false,
      closeIcon: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
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
        code:'',
        dataList:[],
    };
  },
  created(){
  },
 methods: {
    handleBeforeUpload(file){
          let formData = new FormData(); //创建form对象
          formData.append('file',file);//通过append向form对象添加数据
          formData.append('haveHeader',0);//通过append向form对象添加数据
          formData.append('tableRemark','');//通过append向form对象添加数据
          formData.append('classId',this.categoryList[0].id);//
          this.$axios({
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "post",
            url: window.config.dataUrl+"/data/excelOperate/load",
            data: formData,
          }).then(res => {
           this.isloading=false;
           if(res.data.code == 200000){
              this.code=res.data.data;
              this.ininMyData(this.code)
              this.$emit('getTableName',this.code)
            }else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            this.isloading=false;
            console.log(err);
          });
    },
    ininMyData(code){
            this.$axios({
              method: "get",
              url: window.config.dataUrl+"/data/excelOperate/getTableData",
              params:{
                'name':code
              }
            }).then(res => {
              if (res.data.code == 200000) {
                     let cloumName=[];
                    for(var key in res.data.data.list[0]){
                        cloumName.push(key);
                    }
                    this.dataList.push({
                       nameList:cloumName,
                       userTableName:res.data.data.userTableName,
                       content:res.data.data.list
                    });
                }
            }).catch(err => {

            });
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
        .c-detail-box{
          width: 100%;

          /deep/.vxe-table{
            /deep/.vxe-table--main-wrapper{
              /deep/.vxe-table--header{
                width: 100% !important;
                /deep/.vxe-cell {
                    width: 100% !important;
                  }
              }
              /deep/.vxe-table--body{
                width: 100% !important;
                /deep/.vxe-cell {
                    width: 100% !important;
                  }
              }
            }
          }

          // /deep/.body--wrapper{
          //   /deep/.vxe-table--header{
          //      width: 100%;
          //   }
          // }
          // /deep/.vxe-table .vxe-table--header {
          //     width: 100%;
          // }


          // .vxe-table  {
          //   .vxe-table--header{
          //     width: 100%;
          //   }
          // }

        }
        .top{
            height: 240px;
            background: #ccc;
            /deep/ .ivu-upload{
                height: 100%;
                background:#F2F4F7;
                .ivu-upload-drag{
                    display: flex;
                    align-items: center;
                    width:100%;
                    justify-content: center;
                    border: 1px solid #B8BECC;
                    .iconBox{
                        // height: 100%;
                        
                    }
                }
            }
        }
        .bottom{
            margin-top: 50px;
            font-size: 12px;
            color: #B8BECC;
            letter-spacing: 0;
            line-height: 20px;
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
