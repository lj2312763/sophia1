<template>
  <div class="product">
        <div class="title">支持交流</div>
        <div class="product_container_list">
            <div class="product_container" v-for="(item,index) in supportext" :key="index">
                <div class="title">{{item.chatName}}</div>
                <div class="desc">{{item.chatDesc}}</div>
                 <div class="btn" @click="jump(index)">
                    <p>{{item.label}}</p>
                    <div class="fu_btn_icon">
                        <img src="../../assets/images/new_index/right2.png" alt="" srcset="">
                    </div>
                </div>
            </div>
        </div>
        <Suggest v-if="isShow" @closeDialog="closeDialog"></Suggest>
  </div>
</template>

<script>
import Suggest from "../common/suggest";
export default {
  created(){
  },
  data () {
    return {
        isShow:false,
        supportext: [
          {
            chatName: "新手指南",
            id:"1",
            chatDesc: "找到适合您业务的AI技术能力，快速创建应用，开始便捷的开发之旅",
            label: "查看更多"
          },
          {
            chatName: "技术文档",
            id:"2",
            chatDesc: "针对使用API或SDK的开发者，提供Sophia AI技术开发文档",
            label: "查看更多"
          },
          {
            chatName: "意见反馈",
            id:"3",
            chatDesc: "请留下您在使用过程中遇到的问题或提出宝贵建议",
            label: "联系我们"
          }
        ],
    }
  },
  components:{
      Suggest
  },
  methods:{
      jump(val){
          if(val==0){
            let routerUrl = this.$router.resolve({
                path:'/guide',
                query:{
                    type:1,
                }
            });
            window.open(routerUrl.href,'_blank')
          }else if(val==1){
                 this.$router.push({
                    path:'/allDocument',
                    query:{
                        type:1,
                    }
                })
          }else if(val==2){
               this.isShow=true;
          }
      },
      closeDialog(){
        this.isShow=false;
     }
  }
}
</script>

<style scoped lang='less'>
.product{
    width:100%;
    display: block;
    .title{
        font-size: 30px;
        color: #121C33;
        text-align: center;
        margin-bottom: 40px;
    }
    .product_container_list{
       display: flex;
       justify-content: space-between;
        .product_container{
            padding:28px 30px;
            width:380px;
            position: relative;
            height: 208px;
            &:hover{
                box-shadow: 0 0 35px 0 rgba(235,236,240,0.70);
            }
            .title{
                font-size: 18px;
                color: #121C33;
                margin-bottom: 8px;
            }
            .desc{
                font-size: 14px;
                color: #7A8499;
                line-height: 22px;
                margin-bottom: 29px;
            }
            .btn{
                position: absolute;
                left:30px;
                bottom:42px;
                font-size: 16px;
                color: #03A971;
                display: flex;
                align-items: center;
                cursor: pointer;
                .fu_btn_icon{
                    width: 28px;
                    margin-left: 9px;
                    img{
                        width: 100%;
                        display: block;
                    }
                }
            }
        }
    }
   

}
</style>
