<template>
  <div>
    <Modal
        v-model="modal1"
        :footer-hide="true" 
        @on-ok="handleSubmit"
        class-name="vertical-center-modal"
        @on-cancel="cancle">
        <p slot="header" style="font-size: 22px;color: #121C33;text-align:center">
            <span>意见反馈</span>
            <!-- @on-visible-change="cancel" -->
        </p>
        <div class="content">
            <Form :model="formItem" :label-width="80" ref="formItem" :rules="ruleValidate" >
                <FormItem label="联系人" prop="name">
                    <Input v-model="formItem.name" placeholder="请填写联系人姓名" maxlength="24"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="tel">
                    <Input v-model="formItem.tel" placeholder="请填写联系人电话"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="mail">
                    <Input v-model="formItem.mail" placeholder="请填写联系人邮箱"></Input>
                </FormItem>
                <FormItem label="问题描述" prop="desc" placeholder="请填写15字以上的问题描述以便帮助我们更好的定位问题">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述" maxlength="200"></Input>
                </FormItem>
                <FormItem label="" prop="agree">
                   <Checkbox v-model="formItem.agree">提示：愿意接受产品团队联系，帮助定位解决问题。</Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="handleSubmit">立即提交</Button>
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
            const _checkMobile = (rule, value ,callback) => {
                if(value){
                    if(this.$formValidate.isMobile(value)) {
                        callback();
                    }else {
                        callback(new Error('手机格式不正确'));
                    }
                }else {
                    callback();
                }
            };
            return {
                modal1: true,
                formItem: {
                    name: '',
                    tel: '',
                    mail:'',
                    desc: '',
                    agree:true
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '内容不能为空', trigger: 'blur'}
                    ],
                    tel: [
                        { required: true, message: '请选择', trigger: 'blur',validator:_checkMobile}
                    ],
                    mail: [
                        { required: false, message: '请选择', trigger: 'blur' }
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
                });
                this.$emit("closeDialog");
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
.ivu-form-item-content{
    .ivu-checkbox-wrapper{
         font-size: 12px !important;
        color: #B8BECC !important;
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
