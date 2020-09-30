<template>
  <div class="brandSentiment_container">
    <div ref="qudao_picter_container">
        <div class="one" v-for="(item,index) in brandFnArr" :key="index" ref="oneOfbrand" @mouseover="changeBrandStyle(index)" @mouseleave="hideDesc">
            <div>{{item.title}}</div>
            <div v-show="index==0 && ifShowDesc0" class="desc">{{item.desc}}</div>
            <div v-show="index==1 && ifShowDesc1" class="desc">{{item.desc}}</div>
            <div v-show="index==2 && ifShowDesc2" class="desc">{{item.desc}}</div>
            <div v-show="index==3 && ifShowDesc3" class="desc">{{item.desc}}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    brandFnArr:{
        type:Array,
        required:true
    },
    fnType:{
        type:Number,
        required:true
    }
  },
  data () {
    return {
        ifShowDesc0:false,
        ifShowDesc1:false,
        ifShowDesc2:false,
        ifShowDesc3:false
    }
  },
  mounted(){
    var brandDomArr = this.$refs.oneOfbrand;
    var fnType = this.fnType;
    for(var i = 0; i < brandDomArr.length;i++){
        if(i == 0){
            brandDomArr[i].style='background:rgba(61, 73, 102, 0.4);';
        }
        else if(i == 1){
            brandDomArr[i].style = 'background:rgba(61, 73, 102, 0.5);';
        }
        else if(i == 2){
            brandDomArr[i].style = 'background:rgba(61, 73, 102, 0.65);';
        }
        else{
            brandDomArr[i].style = 'background:rgba(61, 73, 102, 0.5);';
        }
    }

    if(fnType == 1){
        this.$refs.qudao_picter_container.setAttribute('class','branFn1');
    }
    else if(fnType == 2){
        this.$refs.qudao_picter_container.setAttribute('class','branFn2');
    }
    else if(fnType == 3){
        this.$refs.qudao_picter_container.setAttribute('class','branFn3');
    }
  },
  methods:{
    changeBrandStyle(index){
        if(index == 0){
            this.ifShowDesc0 = true;
            this.ifShowDesc1 = false;
            this.ifShowDesc2 = false;
            this.ifShowDesc3 = false;
        }
        else if(index == 1){
            this.ifShowDesc0 = false;
            this.ifShowDesc1 = true;
            this.ifShowDesc2 = false;
            this.ifShowDesc3 = false;
        }
        else if(index == 2){
            this.ifShowDesc0 = false;
            this.ifShowDesc1 = false;
            this.ifShowDesc2 = true;
            this.ifShowDesc3 = false;
        }
        else if(index == 3){
            this.ifShowDesc0 = false;
            this.ifShowDesc1 = false;
            this.ifShowDesc2 = false;
            this.ifShowDesc3 = true;
        }
        var brandDomArr = this.$refs.oneOfbrand;
        for(var i = 0; i < brandDomArr.length;i++){
            if(i == index){
                brandDomArr[i].style='background-color:rgba(3,169,113,0.8);';
            }else{
                brandDomArr[i].style = 'background:rgba(61, 73, 102, 0.5);';
            }
        }
    },
    hideDesc(){
        this.ifShowDesc0 = false;
        this.ifShowDesc1 = false;
        this.ifShowDesc2 = false;
        this.ifShowDesc3 = false;
        var brandDomArr = this.$refs.oneOfbrand;
        for(var i = 0; i < brandDomArr.length;i++){
            brandDomArr[i].style = 'background:rgba(61, 73, 102, 0.5);';
        }
    }
  }
}
</script>

<style scoped lang='less'>
.branFn1{
    display: flex;
    align-items: center;
    height: 335px;
    background-image: url('../../assets/images/insightData/qudao.png');
    background-size:100% 100%;
    .one{
        width: 300px;
        height: 335px;
        opacity: 0.8;
        background: #03A971;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 46px;
        padding-right: 46px;
        box-sizing: border-box;
        justify-content: center;
        div:nth-child(1){
            font-size: 18px;
            color: #FFFFFF;
            text-align: center;
            line-height: 26px;
            margin-bottom: 30px
        }
        .desc{
            font-size: 14px;
            color: #FFFFFF;
            text-align: justify;
            line-height: 24px;
        }
    }
}
.branFn2{
    display: flex;
    align-items: center;
    height: 335px;
    background-image: url('../../assets/images/insightData/hangye.png');
    background-size:100% 100%;
    .one{
        width: 300px;
        height: 335px;
        opacity: 0.8;
        background: #03A971;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 46px;
        padding-right: 46px;
        box-sizing: border-box;
        justify-content: center;
        div:nth-child(1){
            font-size: 18px;
            color: #FFFFFF;
            text-align: center;
            line-height: 26px;
            margin-bottom: 30px
        }
        .desc{
            font-size: 14px;
            color: #FFFFFF;
            text-align: justify;
            line-height: 24px;
        }
    }
}
.branFn3{
    display: flex;
    align-items: center;
    height: 335px;
    background-image: url('../../assets/images/insightData/xiaofeizhe.png');
    background-size:100% 100%;
    .one{
        width: 300px;
        height: 335px;
        opacity: 0.8;
        background: #03A971;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 46px;
        padding-right: 46px;
        box-sizing: border-box;
        justify-content: center;
        div:nth-child(1){
            font-size: 18px;
            color: #FFFFFF;
            text-align: center;
            line-height: 26px;
            margin-bottom: 30px
        }
        .desc{
            font-size: 14px;
            color: #FFFFFF;
            text-align: justify;
            line-height: 24px;
        }
    }
}
</style>
