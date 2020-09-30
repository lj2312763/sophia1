<template>
  <div>
    <Modal
        v-model="modal1"
        :footer-hide="true" 
        class-name="vertical-center-modal"
        width="650"
        @on-cancel="cancle">
        <div class="content">
          <Form :model="formItem" :label-width="95" ref="formItem" :rules="ruleValidate">
              <FormItem label="统计年份：" prop="year">
                  <DatePicker type="year" placeholder="请选择年份" size="large" v-model="formItem.year"></DatePicker>
              </FormItem>
              <FormItem label="季度：">
                  <RadioGroup v-model="formItem.quarter">
                      <Radio label="第一季度">第一季度</Radio>
                      <Radio label="第二季度">第二季度</Radio>
                      <Radio label="第三季度">第三季度</Radio>
                      <Radio label="第四季度">第四季度</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="统计月份：" prop="">
                   <Select v-model="formItem.month1"   placeholder="请选择月份" size="large" style="width:200px">
                        <Option v-for="item in months" :value="item" :key="item">{{item}}</Option>
                    </Select>
                    <span>&nbsp;至&nbsp;</span>
                   <Select v-model="formItem.month2"   placeholder="请选择月份" size="large" style="width:200px">
                        <Option v-for="item in months" :value="item" :key="item">{{item}}</Option>
                    </Select>
              </FormItem>
              <FormItem label="统计部委：" prop="category">
                <Select v-model="formItem.category"  @on-change="changeItem" placeholder="请选择统计部委" size="large">
                  <Option v-for="item in categories" :value="item" :key="item">{{item}}</Option>
                </Select>
              </FormItem>
              <FormItem label="详细分类：" prop="subCategory">
                <Select v-model="formItem.subCategory"  placeholder="请选择详细分类" size="large">
                  <Option v-for="item in subCategories" :value="item" :key="item">{{item}}</Option>
                </Select>
              </FormItem>
              
          </Form>
          <div class="btnSearch">
               <Button type="success" class="search1"  @click="jiansuo">检索</Button>
          </div>
        </div>
    </Modal>
  </div>
</template>

<script>
   export default {
        data () {
            return {
                modal1: true,
                months:[1,2,3,4,5,6,7,8,9,10,11,12],
                formItem: {
                  quarter:'',
                  year:'',
                  month1:'',
                  month2:'',
                  subCategory:'',
                  category:'',
                  monStr:''
                },
                ruleValidate:{
                    // category: [{ required: true, message: "内容不能为空", trigger: "change" }],
                },
                subCategories:[],
                categories:[],
            }
        },
        created(){
            this.initCategory();
        },
        methods: {
            initCategory(){
                this.$axios({
                    method: "get",
                    url: window.config.url+"/search/statistics/departs",
                    params:{
                        firstClass:'部委'
                    }
                }).then(res => {
                    if (res.data.code == 200000) {
                        this.categories=res.data.data;
                    }
                }).catch(err => {
                });
            },
            initSubcategory(val){
                this.$axios({
                    method: "get",
                    url: window.config.url+"/search/statistics/depTitles",
                    params:{
                        department:val
                    }
                }).then(res => {
                    if (res.data.code == 200000) {
                        this.subCategories=res.data.data.data;
                    }
                }).catch(err => {
                });
            },
            cancle () {
                this.$emit("closeDialog")
            },
            changeItem(item){
                this.initSubcategory(item);
            },
            jiansuo() {
                this.formItem.year=this.formItem.year?this.$dateUtil.formatTime(this.formItem.year,'yy'):''
                if(this.formItem.month1||this.formItem.month2){
                    if(this.formItem.month2<this.formItem.month1){
                        this.$Message.warning('请输入正确的月份');
                        return;
                    }else{
                        let startMon=this.formItem.month1;
                        let endMon=this.formItem.month2;
                        if(startMon==endMon){
                            this.formItem.monStr=startMon+'月'
                        }else{
                            for(var i=startMon;i<=endMon;i++){
                                if(i==endMon){
                                    this.formItem.monStr+=i+'月'
                                }else{
                                    this.formItem.monStr+=i+'月,'
                                }
                            }
                        }
                        console.log( this.formItem.monStr) 
                    }
                }
               this.$emit("jiansuo",this.formItem)
            }
        }
    }
</script>

<style scoped lang='less'>
.content{
    width:100%;
    padding:30px 45px;
    /deep/.ivu-radio-default {
      label {
        margin-right: 20px;
        .ivu-radio-inner::after {
          border-color: #03a971;
        }
        .ivu-radio-checked .ivu-radio-inner {
          border-color: #03a971;
        }
        .ivu-radio-inner::after {
          background-color: #03a971;
        }
      }
    }
    .btnSearch{
      margin-left: 95px;
      margin-top: 40px;
      .search1{
          width:140px;
          height: 42px;
          padding:0;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          border: none;
          background-color: #03A971;
          border-radius: 3px;
          margin-right: 30px;
      }
  }
}
</style>
<style lang='less'>
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>
