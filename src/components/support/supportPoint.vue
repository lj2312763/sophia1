<template>
  <div class="product">
      <div v-for="(item,index) in supportext" :key="index" class="product_container">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
          <div class="btn" v-if="item.btnText" @click="jump(item.id)">{{item.btnText}}</div>
      </div>
      <Suggest v-if="isShow" @closeDialog="closeDialog"></Suggest>
  </div>
</template>

<script>
import Suggest from "../common/suggest";
export default {
  props:{
      supportext:{
          type:Array,
          required:true
      }
  },
  created(){
  },
  data () {
    return {
        isShow:false,
    }
  },
  components:{
      Suggest
  },
  methods:{
      jump(val){
          if(val==1){
               this.$router.push({
                    path:'guide',
                    query:{
                        type:1,
                    }
                })
          }else if(val==2){
                 this.$router.push({
                    path:'aiDocument',
                    query:{
                        type:1,
                    }
                })
          }else if(val==3){
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    .product_container{
        width: 30%;
        padding: 28px 30px;
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
            width: 47%;
            border: 1px solid #03A971;
            border-radius: 3px;
            border-radius: 3px;
            color: #03A971;
            padding: 10px 38px;
            box-sizing: border-box;
            text-align: center;
        }
        .btn:hover{
            cursor: pointer;
        }
    }
    .product_container:hover{
        box-shadow: 0 0 35px 0 rgba(235, 236, 240, 0.7);
    }

}
</style>
