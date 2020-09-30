<template>
  <div class="experience">
    <div class="experience_container" v-if="routName=='aiKeyword'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px 5px;border-radius:2px">关键词</span></p>
        <div class="bottom">
          <div class="tp" v-html="areaText1">
          </div>
          <!-- <div class="bt">
             非关键词：<span v-for="(item,index) in notKeyList" :key="index">{{item.word}}</span>
          </div> -->
        </div>
    </div>


    <div class="experience_container" v-if="routName=='aiSyntax'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
          {{resType}}
        </div>
    </div>

    <div class="experience_container" v-if="routName=='aiSentence'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
          <!-- <vo-basic :data="wordTree"></vo-basic> -->
          <vo-basic :data='wordTree' v-if="wordTree" 
                    ></vo-basic>
        </div>
    </div>

    <div class="experience_container" v-if="routName=='aiBoundary'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
          <div v-for="(item,index) in resType" :key="index" class="list">
            <div class="title">句子{{index+1}}</div>
            <p v-for="(subItem,subIndex) in item" :key="subIndex"><span>{{index+1}}.{{subIndex+1}}</span>{{subItem.txt}}</p>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import { VoBasic, VoEdit } from 'vue-orgchart'
  export default {
    props:['demo'],
    components: { VoBasic,VoEdit },
    created() {
      this.areaText=this.demo;
      this.routName=this.$route.name;
      this.select()
    },
    data() {
      return {
        wordTree:null,
        keyList:[],
        notKeyList:[],
        areaText:'',
        areaText1:'',
        routName:'',
        flags:'',
        resType:'',
        count:'',
      }
    },
    methods:{
      select(){
        if(this.routName=='aiKeyword'){
            this.flags="keyword";
            this.toAnalyze();
        }
        else if(this.routName=='aiSyntax'){
            this.flags="sentenceType";
            this.toAnalyze1();
        }
        else if(this.routName=='aiSentence'){
            this.flags="parser";
            this.toAnalyze2();
        }
        else if(this.routName=='aiBoundary'){
            this.toAnalyze3();
        }
      },
      toAnalyze3(){
        this.notKeyList=[];
        this.keyList=[];
        this.$axios({
          method: "post",
          url: "/v1/api/zhujian/sbd",
          data: {
            text:this.areaText//关键词提取；
          }
        }).then(res => {
          if(res.status == 200){
            this.count= res.data.body.output.sentenceCnt;
            let _result = res.data.body.output.sentences;
            _result.forEach(item=>{
              item.forEach((subItem,index)=>{
                if(subItem.type=="PU"){
                  item.splice(index,1)
                }
              })
            })
            this.resType=_result;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze2(){
        this.notKeyList=[];
        this.keyList=[];
        this.wordTree=null;
        this.$axios({
          method: "post",
          url: "/v1/api/zhujian/participle",
          data: {
            queries:[this.areaText],
            flags:this.flags//关键词提取；
          }
        }).then(res => {
          if(res.status == 200){
            let _result= res.data[0].parser.result;
            this.wordTree=this.parseArrr(_result);
            console.log(this.wordTree)
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      parseArrr(x) { // x ="(ROOT (IP (NP (PN 我)) (VP (VC 是) (NP (NR 小王)))))"
        var u = x.replace(/\(/g,'[');
        var str = u.replace(/\)/g,']');

        str = str.replace(/^\s+/, "");
        var open = 0;
        for (var i = 0; i < str.length; i++) {
          if (str[i] == "[") open++;
          if (str[i] == "]") open--;
        }
        while (open < 0) {
          str = "[" + str;
          open++;
        }
        while (open > 0) {
          str = str + "]";
          open--;
        }
        console.log(this);
        return this.parse(str);
      },
      parse(str) {
        // var n =new Node();
        var n = {name:'',children:[]};

        if (str[0] != "[") { // Text node
          // Get any movement information.
          // Make sure to collapse any spaces around <X> to one space, even if there is no space.
          str = str.replace(/\s*<(\w+)>\s*/,
            function(match, tail) {
              n.tail = tail;
              return " ";
            });
          str = str.replace(/^\s+/, "");
          str = str.replace(/\s+$/, "");
          n.name = str;
          return n;
        }

        var i = 1;
        while ((str[i] != " ") && (str[i] != "[") && (str[i] != "]")) i++;
        n.name = str.substr(1, i-1)
        n.name = n.name.replace(/\^/,
          function () {
            n.starred = true;
            return "";
          });
        n.name = n.name.replace(/_(\w+)$/,
          function(match, label) {
            n.label = label;
            if (n.label.search(/^\d+$/) != -1)
              return subscriptify(n.label);
            return "";
          });

        while (str[i] == " ") i++;
        if (str[i] != "]") {
          var level = 1;
          var start = i;
          for (; i < str.length; i++) {
            var temp = level;
            if (str[i] == "[") level++;
            if (str[i] == "]") level--;
            if (((temp == 1) && (level == 2)) || ((temp == 1) && (level == 0))) {
              if (str.substring(start, i).search(/[^\s]/) > -1)
                n.children.push(this.parse(str.substring(start, i)));
              start = i;
            }
            if ((temp == 2) && (level == 1)) {
              n.children.push(this.parse(str.substring(start, i+1)));
              start = i+1;
            }
          }
        }
        return n;
      },
      toAnalyze1(){
        this.notKeyList=[];
        this.keyList=[];
        this.$axios({
          method: "post",
          url: "/v1/api/zhujian/participle",
          data: {
            queries:[this.areaText],
            flags:this.flags//关键词提取；
          }
        }).then(res => {
          if(res.status == 200){
            this.resType= res.data[0].sentenceType;
            
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze(){
        this.notKeyList=[];
        this.keyList=[];
        this.areaText1='',
        this.$axios({
          method: "post",
          url: "/v1/api/zhujian/participle",
          data: {
            queries:[this.areaText],
            flags:this.flags//关键词提取；
          }
        }).then(res => {
          if(res.status == 200){
            var resData = res.data[0].keyword;
            var  resultArr=[];
            for (var i = 0; i < resData.length; i++) {
              for (var j = 0; j < resultArr.length; j++) {
                  if (resultArr[j].word == resData[i].word) {
                      break;//一旦有重复arr[i],跳出循环
                  }
              }
              //如果resultArr这个数组中没有arr[i],那么j经过内层循环后没有break,值应为resultArr.length
              if (j == resultArr.length) {
                  resultArr[resultArr.length] = resData[i];
              }
            }
            resultArr.forEach(item => {
              if(item.level!=0){
                  var reg=new RegExp("("+item.word+")","g"); 
                  if(this.areaText1) {
                    this.areaText1=this.areaText1.replace(reg,'<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px  5px;border-radius:2px">'+item.word+'</span>');
                  }else{
                    this.areaText1=this.areaText.replace(reg,'<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px 5px;border-radius:2px">'+item.word+'</span>');
                  }
              }     
            });

            
          }
        }).catch(err=>{
          console.log(err);
        });
      },
    }
  }
</script>
<style lang='less'>
.orgchart .node{
  width:60px !important;
}
</style>
<style scoped lang='less'>
  .experience {
    display: flex;
    width: 100%;
    .experience_container {
      width: 1200px;
      .top {
        box-sizing: border-box;
        border: 1px solid #EBECF0;
        background: rgba(192,204,218,0.10);
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        textarea {
          width: 100%;
          height: 100%;
          font-size: 14px;
          padding:20px;
          color: #7A8499;
          text-align: justify;
          line-height: 22px;
          background-color: rgba(192,204,218,0.10);
          border: none;
          outline: none;
          resize: none;
        }
      
        .max_length{
          width: 100%;
          font-size: 12px;
          color: #B8BECC;
          margin-top: -25px;
          margin-left: 40px;
        }
      }
      .kaishi_fenxi{
          width: 100px;
          height: 28px;
          margin: auto;
          text-align: center;
          background: #03A971;
          border-radius: 3px;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 28px;
          margin-top: 30px;
        }
        .kaishi_fenxi:hover{
          cursor: pointer;
        }
        .result{
          font-size: 18px;
          color: #121C33;
           margin-top: 20px;
           margin-bottom: 10px;
        }
      .bottom {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #EBECF0;
        background: rgba(192,204,218,0.10);
        padding:20px;
        font-size: 18px;
        color: #121C33;
        line-height: 30px;
        text-align: justify;
        .list{
          margin-bottom: 15px;
          .title{
            margin-bottom:15px
          }
          p{
            margin-left: 20px;
            span{margin-right: 30px;}
          }
        }
        .tp{
          // margin-bottom:20px;
        }
        .bt{
          span{
            font-size: 24px;
            color: #000015;
           padding:0 8px;
          }
        }
      }

    }
  }
</style>
