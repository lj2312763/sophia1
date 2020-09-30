<template>
  <div>
    <Modal
        v-model="modal1"
        :footer-hide="true" 
        @on-ok="handleSubmit"
        class-name="vertical-center-modal"
        @on-cancel="cancle">
        <p slot="header" style="font-size: 22px;color: #121C33;text-align:center">
            <span>申请表</span>
            <!-- @on-visible-change="cancel" -->
        </p>
        <div class="content">
            <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
                <FormItem label="应用名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入名称"></Input>
                </FormItem>
                <FormItem label="应用类型" prop="type">
                    <Select v-model="formItem.type">
                        <Option v-for="item in typeList" :key="item.value" :value="item.value" >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="接口选择" prop="api">
                    <Select v-model="formItem.api">
                        <!-- <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="应用描述" prop="desc">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="handleSubmit">立即申请</Button>
                    <Button @click="cancle" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
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
                    name: '',
                    type: '',
                    api:'',
                    desc: ''
                },
                typeList:[
                    {name:"游戏娱乐",value:1},
                    {name:"工具应用",value:2},
                    {name:"交通出行",value:3},
                    {name:"学习办公",value:4},
                    {name:"智能硬件",value:5},
                    {name:"聊天社交",value:6},
                    {name:"电子商务",value:7},
                    {name:"机器人",value:8},
                    {name:"金融",value:9},
                    {name:"安全",value:10},
                    {name:"农业",value:11},
                    {name:"政务",value:12},
                    {name:"旅游",value:13},
                    {name:"健康医疗",value:14},
                    {name:"广告营销",value:15},
                    {name:"房产家居",value:16},
                    {name:"其他",value:17},
                ],
                apiList:[],
                ruleValidate: {
                    name: [
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                    ],
                    api: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit () {
                this.$refs["formItem"].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            cancle () {
                this.$emit("closeDialog")
                console.log(1111)
                //this.$refs["formItem"].resetFields();
            }
        }
    }
</script>

<style scoped lang='less'>
.content{
    padding:0 30px;
}
</style>
