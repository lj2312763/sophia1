<template>
  <div>
    <Modal
        v-model="modal1"
        :footer-hide="true" 
        class-name="vertical-center-modal"
        @on-cancel="cancle">
        <div class="content">
          <Form :model="formItem" :label-width="95" ref="formItem" :rules="ruleValidate">
              <FormItem label="标准状态：">
                  <RadioGroup v-model="formItem.status">
                      <Radio label="现行">现行</Radio>
                      <Radio label="作废">作废</Radio>
                      <Radio label="">全部</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="关键词：" prop="keywords">
                  <Input v-model="formItem.keywords" size="large" placeholder="请输入相关字段，示例：“环境”或“规范”"></Input>
              </FormItem>
              <FormItem label="标准号：" prop="number">
                  <Input v-model="formItem.number" size="large" placeholder="示例：“GB 24613-2009”或“24613”"></Input>
              </FormItem>
              <FormItem label="分类：" prop="category">
                <Select v-model="formItem.category" multiple  placeholder="请选择" size="large">
                  <Option v-for="item in categories" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
               <FormItem label="年代号：" prop="year">
                  <DatePicker type="year" placeholder="请选择年代号" size="large" v-model="formItem.year"></DatePicker>
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
                formItem: {
                  number: "",
                  keywords: "",
                  status:'',
                  year:'',
                  category:[]
                },
                ruleValidate:{
                    name: [{ required: true, message: "内容不能为空", trigger: "blur" }],
                },
                categories:[
                  {
                      value: 'GB',
                      label: '国家标准'
                  },
                  {
                      value: 'JB',
                      label: '国行业标准-机械'
                  },
                  {
                      value: 'SJ',
                      label: '行业标准-电子'
                  },
                  {
                      value: 'YD',
                      label: '行业标准-邮电通信'
                  },
                  {
                      value: 'HB',
                      label: '行业标准-航空'
                  },
                  {
                      value: 'HG',
                      label: '行业标准-化工'
                  },
                  {
                      value: 'QJ',
                      label: '行业标准-航天'
                  },
                  {
                      value: 'SN',
                      label: '行业标准-商品检验'
                  },
                  {
                      value: 'NY',
                      label: '行业标准-农业'
                  },
                  {
                      value: 'QB',
                      label: '行业标准-轻工'
                  },
                ],
            }
        },
        methods: {
            cancle () {
                this.$emit("closeDialog")
            },
            jiansuo() {
                this.formItem.year=this.formItem.year?this.$dateUtil.formatTime(this.formItem.year,'yy'):''
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
