<template>
  <div class="experience">
    <!--词法分析-->
    <div class="experience_container" v-if="routeId == '5.1.1'">
      <div class="info_text_type">
        <div class="info_text">请输入一段想分析的文本：</div>
        <div class="type">
            <Select v-model="source" placeholder='中文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150" v-model="areaText"></textarea>
        <div class="max_length">最多输入150个字</div>
      </div>
      <div class="kaishi_fenxi" @click="toAnalyze">开始分析</div>
      <div class="bottom">
        <div class="left">
          <div class="content">
              <div class="item" 
                v-for="(item,index) in contenArr" 
                :key="index" 
                @click="changeBgc(index,item)" 
                ref="item">
              <div>{{item.word}}</div>
              <div class="triangle" ref="triangle"></div>  
              <!-- <div class="leftCixing" ref="leftCixing">词性：{{item.wordContrastsContrast}}</div> -->
            </div>
          </div>
        </div>
        <div class="right">
          <div class="cixing_leibie">词性类别</div>  
          <div class="cixing_leibie_container">
            <div v-for="(item,index) in uniqueCixingArr" :key="index" class="cixing" ref="cixing" @click="checkCixing(item,index)">
              {{item.wordContrasts}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--依存句法分析-->
    <div class="experience_container" v-if="routeId == '5.1.4'">
      <div class="info_text_type">
        <div class="info_text">请输入一段想分析的文本：</div>
        <div class="type">
            <Select v-model="source" placeholder='中文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="component">
        <textarea name="" id="" v-model="analyText"></textarea>
        <div class="experice_text">体验版本最多输入150个字</div>
      </div>
      <div class="kaishi_fenxi" @click="startAnaly">开始分析</div>
      <div class="analResult_container">
        <div class="analResult_title">分析结果：</div>
        <div class="analResult_content">
          <div class='result2_res_res1' style="padding:0px 30px;overflow: scroll;">
            <canvas id='canvasTest'></canvas>
          </div>
          <div class="analResult_content_right">
            <div class="shuxingtu">属性图例：</div>
            <div class="shuxing_content">
              <div class="shuxing_item" v-for="(item,index) in zhDescTextAtt" :key="index">
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--命名实体识别-->
    <div class="experience_container" v-if="routeId == '5.1.6'">
      <div class="info_text_type">
        <div class="info_text">请输入一段想分析的文本：</div>
        <div class="type">
            <Select v-model="source" placeholder='中文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="component">
        <textarea v-model="anayText" maxlength="300"></textarea>
      </div>
      <div class="kaishi_fenxi" @click="toAnaly">开始分析</div>
      <div class="analResult_container">
        <div class="analResult_title">分析结果：</div>
        <div class="analResult_result" v-for="(item,index) in typeArr" :key="index" ref="analResult" :style="{'background':item.color}">
          {{item.name}}-{{item.value}}
        </div>
      </div>
      <div class="result_content" v-html="resultContent"></div>
    </div>

    <!--短文本相似度-->   
    <div class="function_experice_container" v-if="routeId == '5.1.8'">
      <div class="function_experice">
        <div class="shuru_title">请输入第一段文本：</div>
        <div class="text_container">
          <textarea maxlength="150" v-model="shortText1"></textarea>
          <div class="tishiInfo">体验版本最多输入150个字</div>
        </div>
        <div class="shuru_title">请输入第二段文本：</div>
        <div class="text_container">
          <textarea maxlength="150" v-model="shortText2"></textarea>
          <div class="tishiInfo">体验版本最多输入150个字</div>
        </div>
        <div class="fenxi_btn" @click="shortextStartAnalySeman">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="result_container">相似度：{{shortTextSimilarity}}</div>
      </div>
    </div>

    <!--语义相似度-->
    <div class="function_experice_container" v-if="routeId == '5.1.11'">
      <div class="function_experice">
        <div class="shuru_title">请输入第一段文本：</div>
        <div class="text_container">
          <textarea maxlength="150" v-model="textAreaText1"></textarea>
          <div class="tishiInfo">体验版本最多输入150个字</div>
        </div>
        <div class="shuru_title">请输入第二段文本：</div>
        <div class="text_container">
          <textarea maxlength="150" v-model="textAreaText2"></textarea>
          <div class="tishiInfo">体验版本最多输入150个字</div>
        </div>
        <div class="fenxi_btn" @click="startAnalySeman">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="result_container">相似度：{{similarity}}</div>
      </div>
    </div>

    <!--去除停用词-->
    <div class="experience_container" v-if="routeId == '5.1.13'">
      <div class="info_text_type">
        <div class="info_text">请输入一段想分析的文本：</div>
        <div class="type">
            <Select v-model="source" placeholder='中文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="component">
        <textarea v-model="quChuText" maxlength="150"></textarea>
      </div>
      <div class="kaishi_fenxi" @click="quChuAnaly">开始分析</div>
      <div class="analResult_container">
        <div class="analResult_title">分析结果：</div>
      </div>
      <div class="result_content quchuResult">
        <div class="quchuResult_item" v-for="(item,index) in quChuArr" :key="index">{{item}}</div>
      </div>
    </div>

    <!--评论观点抽取-->
    <div class="function_experice_container" v-if="routeId == '5.2.8'">
      <div class="function_experice">
        <div class="shuru_title">请选择行业类型并输入相关评论：</div>
        <div class="Industry_type">
          <div class="itemIn" ref="itemIn" v-for="(item,index) in IndustryArr" :key="index" @click="choiceIndustry(index)">{{item}}</div>
        </div>
        <div class="component">
          <textarea name="" id="" v-model="pinLunText"></textarea>
          <div class="experice_text">体验版本最多输入150个字</div>
        </div>
        <div class="kaishi_fenxi" @click="pinlunAnaly()">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="analy_result">
          <div class="result">
            <div class="xiaoji" v-if="ifShowXiaoji">
              <img :src="fuImg" alt="">
              <span v-for="(item,index) in fuArr" :key="index">&nbsp;|&nbsp;{{item}}</span>
            </div>
            <div class="jiji" v-if="ifShowJiji">
              <img :src="zhengImg" alt="">
              <span v-for="(item,index) in jijiArr" :key="index">&nbsp;|&nbsp;{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--对话情绪识别-->
    <div class="function_experice_container" v-if="routeId == '5.2.9'">  
      <div class="function_experice">
        <div class="shuru_title">请选择行业类型并输入相关评论：</div>
        <div class="component">
          <textarea name="" id="" v-model="duihuaText"></textarea>
          <div class="experice_text">体验版本最多输入150个字</div>
        </div>
        <div class="kaishi_fenxi" @click="duihuaAnaly">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="analy_result">
          <div class="qingxu_result" ref="qingxu_result"><div class="fumian"><img :src="fuImg">负面情绪</div><div class="zhongxing"><img :src="zhongImg">中性情绪</div><div class="zhengxiang"><img :src="zhengImg">正向情绪</div></div>
          <div class="anfu">参考安抚话术：{{anfuResult}}</div>
        </div>
      </div>
    </div>

    <!--文本审核-->
    <div class="function_experice_container" v-if="routeTwoId == '5.3'">  
      <div class="function_experice">
        <div class="shuru_title">请输入一段想分析的文本：</div>
        <div class="component">
          <textarea name="" id="" v-model="shenheText"></textarea>
          <div class="experice_text">体验版本最多输入150个字</div>
        </div>
        <div class="kaishi_fenxi" @click="wenbenAnaly">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="analy_result">
          <div class="result">{{wenbenResult}}</div>
        </div>
      </div>
    </div>

    <!--通用翻译-->
    <div class="function_experice_container" v-if="routeId == '5.4.1'">  
      <div class="function_experice">
        <div class="choice_container">
          <div class="choice1">
            <Select v-model="source" placeholder='中文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="img_container">
            <img :src="arrowImg">
          </div>
          <div class="choice2">
            <Select v-model="target" placeholder='英文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="shuru_title">请输入一段想分析的文本：</div>
        <div class="component">
          <textarea name="" id="" v-model="tongyongText" maxlength="1000"></textarea>
          <div class="experice_text">体验版本最多输入1000个字</div>
        </div>
        <div class="kaishi_fenxi" @click="fanyiAnaly">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="analy_result">
          <div class="result">{{tongyongResult}}</div>
        </div>
      </div>
    </div>

    <!--垂直领域翻译-->
    <div class="function_experice_container" v-if="routeId == '5.4.2'">  
      <div class="function_experice">
        <div class="choice_container">
          <div class="lingyu" style="margin-right:100px">
            <span>领域选择：</span>
            <Select v-model="lingyu" placeholder='医疗' @on-change="getChange">
                <Option v-for="item in lingyuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="choice1">
            <Select v-model="source" placeholder='中文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="img_container">
            <img :src="arrowImg">
          </div>
          <div class="choice2">
            <Select v-model="target" placeholder='英文'>
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="shuru_title">请输入一段想分析的文本：</div>
        <div class="component">
          <textarea name="" id="" v-model="chuizhiText" maxlength="1000"></textarea>
          <div class="experice_text">体验版本最多输入1000个字</div>
        </div>
        <div class="kaishi_fenxi" @click="fanyiAnaly">开始分析</div>
        <div class="shuru_title">分析结果：</div>
        <div class="analy_result">
          <div class="result">{{tongyongResult}}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      areaText:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
      analyText:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进行保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
      anayText:'收光头大阴线，前期跌幅较大的猪肉、养鸡板块逆势上涨，领涨两市，午后港口航运强势拉升，最终小幅上涨，连云港等三股涨停，白酒、家电等白马蓝筹表现较为坚挺，国防军工概念大幅回调，领跌两市，中船科技等5股跌停，科创板预期股一路走低，跌幅居前，华胜天成等6股跌停，盘中多股出现恐慌性砸盘。',
      quChuText:'人工智能是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器，该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。',
      textAreaText1:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进行保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
      textAreaText2:'现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进行保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。',
      similarity:1,
      contenArr:'',
      resultContent:'',
      uniqueCixingArr:[],
      zhDescTextAtt:[],
      typeArr:[],
      IndustryArr:['酒店','KTV','丽人','美食','旅游','健康','教育','商业','房产','汽车','生活','购物','3C'],
      pinLunText:'服务好 态度好 产品好 一句话就是好',
      duihuaText:'天天下雨真麻烦',
      shenheText:'人存在的意义在于社会我是谁，这应该是哲学中最基本也是最重要的问题。在《苏菲的世界》中就是以我是谁为起源，来延伸出哲学的相关介绍。而关于我是谁的讨论在哲学界也是争论不休。在世界的东方，老子是东方在世纪之初最著名的思想家。在物质世界不断丰富的当时，老子在名利与权势的迷宫中，破天荒的发现了人的生命价值，他认为生命贵于名利，追求名利是为了人的生命，如果名利损害人的生命，宁肯抛弃名利，也要保全自己的生命。',
      tongyongText:'最近有什么科技新闻？',
      chuizhiText:'这是一场前所未有的战争，全球人类面对着同一个敌人—新型冠状病毒。',
      langList:[
        {
          label:'中文',
          value:'zh'
        },
        {
          label:'英文',
          value:'en'
        }
      ],
      lingyuList:[
        {
          label:'医疗',
          value:'medical'
        },
        {
          label:'社交',
          value:'social'
        },
        {
          label:'电商',
          value:'description'
        },
        {
          label:'科技电子',
          value:'electronics'
        },
        {
          label:'水利机械',
          value:'mechanics'
        },
        {
          label:'生物医药',
          value:'medicine'
        }
      ],
      source:'zh',
      target:'en',
      lang:'',
      arrowImg:require('../../../assets/images/icon/arrowImg.png'),
      lingyu:'medical',
      hangyeType:8,
      ifShowpinjia:true,
      fuArr:[],
      jijiArr:[],
      zhengImg:require('../../../assets/images/icon/12.png'),
      zhongImg:require('../../../assets/images/icon/33.png'),
      fuImg:require('../../../assets/images/icon/fu.png'),
      anfuResult:'请稍安勿躁',
      wenbenResult:'',
      ifShowXiaoji:false,
      ifShowJiji:false,
      tongyongResult:'What Technology News Is There Recently?',
      isInter: false, //接口 false: 医疗社交电商 true:科技水利生物
      shortText1:'今天天气很好，阳光明媚的很适合去郊游。',
      shortText2:'今天天气很不好，阴雨连绵。',
      shortTextSimilarity:0.4536193396226415,
      quChuArr:[]
    }
  },
  props:{
    routeId:{
      type:String
    },
    routeTwoId:{
      type:String
    }
  },
  mounted(){
    this.selectFn();
  },
  watch:{
    routeId(newVal,oldVal){
      if(newVal == '5.1.1'){
        this.toAnalyze();
      }
      else if(newVal == '5.1.4'){
        this.startAnaly();
      }
      else if(newVal == '5.1.6'){
        this.toAnaly();
      }
      else if(newVal == '5.1.8'){
        this.shortextStartAnalySeman();
      }
      else if(newVal == '5.1.11'){
        this.startAnalySeman();
      }
      else if(newVal == '5.1.13'){
        this.quChuAnaly();
      }
      else if(newVal == '5.2.8'){
        this.choiceIndustry();
        this.pinlunAnaly(8);
      }
      else if(newVal == '5.2.9'){
        this.duihuaAnaly()
      }
      else if(newVal == '5.3'){
        this.wenbenAnaly()
      }
      else if(newVal == '5.4.1' || newVal == '5.4.2'){
        this.fanyiAnaly();
      }
    }
  },
  updated(){
    // this.changeResultStyle();
  },
  methods:{
      selectFn(){
        var routerThreeId = this.routeId;
        if(routerThreeId == '5.1.1'){
          this.toAnalyze();
        }
        else if(routerThreeId == '5.1.4'){
          this.startAnaly();
        }
        else if(routerThreeId == '5.1.6'){
          this.toAnaly();
        }
        else if(routerThreeId == '5.1.8'){
          this.shortextStartAnalySeman();
        }
        else if(routerThreeId == '5.1.11'){
          this.startAnalySeman();
        }
        else if(routerThreeId == '5.1.13'){
           this.quChuAnaly();
        }
        else if(routerThreeId == '5.2.8'){
          this.choiceIndustry();
          this.pinlunAnaly(8);
        }
        else if(routerThreeId == '5.2.9'){
          this.duihuaAnaly()
        }
        else if(routerThreeId == '5.3'){
          this.wenbenAnaly()
        }
        else if(routerThreeId == '5.4.1' || routerThreeId == '5.4.2'){
          this.fanyiAnaly();
        }
      },
      changeBgc(index,item){
        var domArr = this.$refs.item;
        for(var i =0 ;i < domArr.length;i++){
          if(index == i){
            domArr[i].style = 'background-color: #66b3ff;color: #fff;border-color: #66b3ff;';
          }
          else{
            domArr[i].style = 'background-color:white;color:gray;';
          }
        }
      },
      toAnalyze(){
        var text = this.areaText;
        var langType = this.source;
        var url;
        if(langType == 'zh'){
          this.$axios({
            method: "post",
           // url: "/v1/api/daKuai/standardParticiple",
            url: window.config.url+"/ai/jnlp/participle",
            data:{
              sentence:text
            }
          }).then(res => {
            if(res.data.code == 200000){
              if(!res.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var resData = res.data.data;
              let _arr=[];
              resData.forEach(item=>{
                if(item.wordContrasts){
                  _arr.push(item)
                }
              })
              function unique(arr=[]){
                const res = new Map();
                return arr.filter((item)=> !res.has(item.wordContrasts) && res.set(item.wordContrasts,1))
              }
              this.uniqueCixingArr = unique(_arr);
              this.contenArr = resData;
               console.log(this.uniqueCixingArr)
              console.log(this.contenArr)
            }
            else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            console.log(err);
          });
        }
        else if(langType == 'en'){
          var formData = new FormData();
          formData.append('text',text);
          this.$axios({
            method: "post",
            url: window.config.url+"/api/nl/en/posTag",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res => {
            if(res.data.code == 200){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var resData = res.data.data;
              var leftArr = [];
              var rightArr = [];
              for(var i = 0;i < resData.length;i++){
                leftArr.push({
                  word:resData[i][0],
                  wordContrasts:resData[i][1],
                });
                rightArr.push({
                  wordContrasts:resData[i][1],
                });
              }
              function unique(arr=[]){
                const res = new Map();
                return arr.filter((item)=> !res.has(item.wordContrasts) && res.set(item.wordContrasts,1))
              }
              this.uniqueCixingArr = unique(rightArr);
              this.contenArr = leftArr;
            }
            else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            console.log(err);
          });
        }
      },
      checkCixing(item,index){
        if(this.$refs.cixing){
          var cixingArr = this.$refs.cixing;
          var itemDom = this.$refs.item; 
          var contenArr = this.contenArr;
          var searchArr = [];
          for(var m = 0;m <itemDom.length;m++){
            itemDom[m].style = 'background:none;border: 1px solid #03;font-size: 14px;color:#3D4966;';
          }
          for(var i = 0;i<cixingArr.length;i++){
            if(index == i){
              cixingArr[i].style = 'background: #03A971;border: 1px solid #03A971;font-size: 14px;color: #FFFFFF;';
            }
            else{
              cixingArr[i].style = 'background:none;border: 1px solid #3D4966;font-size: 14px;color: #3D4966';
            }
          }
          for(var j =0 ;j < contenArr.length;j++){
            if(contenArr[j].wordContrasts == item.wordContrasts){
              searchArr.push(contenArr[j])
            }
          }
          for(var k = 0;k < searchArr.length;k++){
            for(var l = 0 ;l < itemDom.length;l++){
              if(searchArr[k].word == itemDom[l].innerText){
                itemDom[l].style = 'background: #03A971;border: 1px solid #03A971;font-size: 14px;color: #FFFFFF;';
              }
            }
          }
        }
      },
      startAnaly(){
        var queriesList = this.analyText;
        this.wordArr = [];
        this.shuxingArr = [];
        this.$axios({
          method:'post',
          url:window.config.url+'/ai/nlp/depparser',
          data:{
            text:this.analyText,
          }
        }).then(res=>{
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var resultObj = res.data.data.items;
            var dependencyArr = [];
            resultObj.forEach(item=>{
                this.shuxingArr.push(item.deprel);
                 dependencyArr.push({
                    word:item.word,
                    result:item.deprel,
                    dependent:item.head,
                    id:item.id,
                  })
            })
            dependencyArr.forEach((item, index) => {
              item.cont = item.word
              item.parent = item.dependent - 1
              item.relate = item.result
              item.arg = []
              item.sem = []
              item.pos = index + 1
              // p 展示
              if (item.parent < 0) {
                item.x1 = 'Root'
              } else {
                item.x1 = dependencyArr[item.parent].word
              }
            })
            var demo = new Window.Demo('canvasTest')
            demo.addaptWidth()
            demo.analysis(dependencyArr)
            demo.update()
            this.getStructure(this.shuxingArr);
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      startAnalySeman(){
        var text1 = this.textAreaText1;
        var text2 = this.textAreaText2;
        this.$axios({
          method:'post',
          url:window.config.url+'/ai/nlp/simnet',
          data:{
            text1:text1,
            text2:text2
          }
          // url:window.config.url+'/action/v1/api/zhujian/similarity',
          // data:{
          //   text1:text1,
          //   text2:text2,
          //   flags:'sentence'
          // }
        }).then(res=>{
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
             var resultData = res.data.data.score;
             this.similarity = resultData;
            // var resultData = res.data;
            // this.similarity = resultData.body.output.similarity;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      quChuAnaly(){
        var text = this.quChuText;
        var langType = this.source;
        if(langType == 'zh'){
          var formData = new FormData();
          formData.append('text',text);
          this.$axios({
            method: "post",
            url: window.config.url+"/api/nl/cn/removeStopWords",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res => {
            if(res.data.code == 200){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var resData = res.data.data.split(' ');
              var totaArr = [];
              for(var i = 0;i < resData.length;i++){
                if(resData[i] != ''){
                  totaArr.push(resData[i]);
                }
              }
              this.quChuArr = totaArr;
            }
            else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            console.log(err);
          });
        }
        else if(langType == 'en'){
          var formData = new FormData();
          formData.append('text',text);
          this.$axios({
            method: "post",
            url: window.config.url+"/api/nl/en/removeStopWords",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
            },
            data:formData
          }).then(res => {
            if(res.data.code == 200){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var resData = res.data.data.split(' ');
              var totaArr = [];
              for(var i = 0;i < resData.length;i++){
                if(resData[i] != ''){
                  totaArr.push(resData[i]);
                }
              }
              this.quChuArr = totaArr;
            }
            else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            console.log(err);
          });
        }
      },
      shortextStartAnalySeman(){
        var text1 = this.shortText1;
        var text2 = this.shortText2;
        this.$axios({
          method:'post',
          url:window.config.url+'/ai/nlp/simnet',
          data:{
            text1:text1,
            text2:text2
          }
        }).then(res=>{
          if(res.status == 200){
            if(res.data.code == 200000){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var resultData = res.data.data.score;
              this.shortTextSimilarity = resultData;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      getStructure(args){
        this.zhDescTextAtt = [];
        this.$axios({
          method:'post',
          //url:window.config.url+'/action/v1/api/zhujian/participleContrast',
          url:window.config.url+'/ai/jnlp/participleContrast',
          data:{
            contrast:args
          }
        }).then(res=>{
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var zhDescArr = res.data.data;
            for(var i = 0;i < args.length;i++){
              this.zhDescTextAtt.push(args[i]+zhDescArr[i]);
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      toAnaly(){
        var text = this.anayText;
        this.typeArr = [];
        this.$axios({
          method: "post",
          url:window.config.url+'/ai/jnlp/lexer',
          data: {
            text:this.anayText
          }
          // data: {
          //   queries:[text+''],
          //   flags:'namedEntities'
          // }
        }).then(res => {
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var result=res.data.data.result.tokenizedText;
            var text = res.data.data.result.text;
             result.forEach(item=>{
               var reg='/'+item.word+'/g';
              if(item.ner=='PERSON'){
                text=text.replace(eval(reg),'<span style="background:#D4B109;">'+item.word+'</span>');
                let _arr=this.typeArr.filter(item1=>item1.value=='PERSON');
                if(_arr.length<1){
                    this.typeArr.push({
                      name:'人名',
                      value:'PERSON',
                      color:'#D4B109' 
                    });
                }
              }else if(item.ner=='LOC'){
                  text=text.replace(eval(reg),'<span style="background:#0A6DD9;">'+item.word+'</span>');
                  let _arr=this.typeArr.filter(item1=>item1.value=='LOC');
                  if(_arr.length<1){
                     this.typeArr.push({
                        name:'地名',
                        value:'LOC',
                        color:'#0A6DD9'  
                      });
                  }
                 
              }else if(item.ner=='PRODUCT'){
                  text=text.replace(eval(reg),'<span style="background:#389E0F;">'+item.word+'</span>');
                  let _arr=this.typeArr.filter(item1=>item1.value=='PRODUCT');
                  if(_arr.length<1){
                     this.typeArr.push({
                        name:'名词',
                        value:'PRODUCT',
                        color:'#389E0F'  
                      });
                  }
              }else if(item.ner=='MISC'){
                  text=text.replace(eval(reg),'<span style="background:#C41E5D;">'+item.word+'</span>');
                  let _arr=this.typeArr.filter(item1=>item1.value=='MISC');
                  if(_arr.length<1){
                      this.typeArr.push({
                          name:'基数词',
                          value:'MISC',
                          color:'#C41E5D' 
                      });
                  }
              }else if(item.ner=='ORG'){
                  text=text.replace(eval(reg),'<span style="background:rgba(255, 106, 0, 1);">'+item.word+'</span>');
                  let _arr=this.typeArr.filter(item1=>item1.value=='ORG');
                  if(_arr.length<1){
                      this.typeArr.push({
                          name:'机构名',
                          value:'ORG',
                          color:'rgba(255, 106, 0, 1)' 
                      });
                  }
              }
               
             })
            this.resultContent = text;
            // var mingmResultStr = res.data[0].namedEntities;
            // var analyResult = mingmResultStr.replace(/<START:/g,'<span').replace(/<END>/g,'</span>').replace(/TIM/g,' class="TIM"').replace(/LOC/g,' class="LOC"').replace(/ORG/g,' class="ORG"').replace(/PER/g,' class="PER"').replace(/NUM/g,' class="NUM"');
            // if(mingmResultStr.indexOf('PER') != -1){
            //   this.typeArr.push({
            //     name:'人名',
            //     value:'PER' 
            //   });
            // }
            // if(mingmResultStr.indexOf('LOC') != -1){
            //   this.typeArr.push({
            //     name:'地名',
            //     value:'LOC' 
            //   });
            // }
            // if(mingmResultStr.indexOf('TIM') != -1){
            //   this.typeArr.push({
            //     name:'时间点',
            //     value:'TIM' 
            //   });
            // }
            // if(mingmResultStr.indexOf('NUM') != -1){
            //   this.typeArr.push({
            //     name:'基数词',
            //     value:'NUM'
            //   });
            // }
            // if(mingmResultStr.indexOf('ORG') != -1){
            //   this.typeArr.push({
            //     name:'机构名',
            //     value:'ORG' 
            //   });
            // }
            // this.resultContent = analyResult;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      changeResultStyle(){
       
        var typeArr = this.typeArr;
        var resultStyleContent = this.resultContent;
        for(var i = 0;i<typeArr.length;i++){
          var classDom = document.getElementsByClassName(typeArr[i].value);
          for(var j =0;j < classDom.length;j++){
            classDom[j].style  =`background-color:${colorArr[i]};`;
          }
        }
        if(this.$refs.analResult){
          var analyResultDom = this.$refs.analResult;
          for(var i = 0;i < analyResultDom.length;i++){
            analyResultDom[i].style=`background-color:${colorArr[i]};`;
          }
        }
      },
      choiceIndustry(arg){
        this.hangyeType = arg ? 8 : arg + 1;
        if(!arg){
          setTimeout(() => {
            var IndustryDom = this.$refs.itemIn;
            IndustryDom[7].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
          }, 10);
        }
        else{
          var IndustryDom = this.$refs.itemIn;
          for(var i = 0; i < IndustryDom.length;i++){
            if(arg == i){
              IndustryDom[i].style = 'background: #03A971;border: 1px solid #03A971;color: #FFFFFF;';
            }
            else{
              IndustryDom[i].style = 'background: transparent;border: 1px solid #B8BECC;color: #7A8499;';
            }
          }
        }
      },
      pinlunAnaly(arg){
        var url = window.config.url+'/ai/nlp/commentTag';
        var text = this.pinLunText;
        var type = arg ? arg : 8;
        var that = this;
        this.$axios({
          url:url,
          method:'post',
          data:{
            text:text,
            type:type
          }
        }).then(res=>{
          if(res.status == 200){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var data = res.data.data.items || [];
            if(data.length == 0){
              that.ifShowJiji = false;
              that.ifShowXiaoji = false;
            }
            that.fuArr = [];
            that.jijiArr=[];
            for(var i = 0;i < data.length;i++){
              if(data[i].sentiment == 2){
                that.ifShowJiji = true;
                var result1 = data[i].abstract.match(/<span>(.+?)<\/span>/g)[0].replace('<span>','').replace('</span>','');
                that.jijiArr.push(result1);
              }
              else if(data[i].sentiment == 0 || data[i].sentiment == 1){
                that.ifShowXiaoji = true;
                var result2 = data[i].abstract.match(/<span>(.+?)<\/span>/g)[0].replace('<span>','').replace('</span>','');
                that.fuArr.push(result2);
              }
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      duihuaAnaly(){
        var url = window.config.url+'/ai/nlp/emotion';
        var text = this.duihuaText;
        this.$axios({
          url:url,
          method:'post',
          data:{
            text:text
          }
        }).then(res=>{
          if(res.status == 200){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var data = res.data.data.items[0];
            var anfuResult = data.replies[0];
            var qingxu = data.label;
            var qingxuDom = this.$refs.qingxu_result.childNodes;
            if(qingxu == 'pessimistic'){
              qingxuDom[0].style = 'opacity:1;';
              qingxuDom[1].style = 'opacity:0.5;';
              qingxuDom[2].style = 'opacity:0.5;';
            }
            else if(qingxu == 'neutral'){
              qingxuDom[0].style = 'opacity:0.5;';
              qingxuDom[1].style = 'opacity:1;';
              qingxuDom[2].style = 'opacity:0.5;';
            }
            else if(qingxu == 'optimistic'){
              qingxuDom[0].style = 'opacity:0.5;';
              qingxuDom[1].style = 'opacity:0.5;';
              qingxuDom[2].style = 'opacity:1;';
            }
            this.anfuResult = anfuResult;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      wenbenAnaly(){
        var url = window.config.url+'/ai/nlp/textCensor';
        var text = this.shenheText;
        this.$axios({
          url:url,
          method:'post',
          data:{
            text:text
          }
        }).then(res=>{
          if(res.status == 200){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var resultData = res.data.data.conclusion;
            this.wenbenResult = resultData;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      getChange(e){
        if(e == 'medicine' || e == 'mechanics' || e == 'electronics') {
          this.isInter = true
          this.domain = e
        }
        else{
          this.isInter = false
        }
        if(e == 'medical'){
          this.arrowImg=require('../../../assets/images/icon/arrowImg.png');
          this.chuizhiText="这是一场前所未有的战争，全球人类面对着同一个敌人—新型冠状病毒。"
        }
        else  if(e == 'social'){
          this.arrowImg=require('../../../assets/images/icon/arrowImg.png');
          this.chuizhiText="在男女聚会的场合，我认为，谈论一些女士感兴趣的话题，这是一种绅士风度。"
        }
        else  if(e == 'description'){
          this.arrowImg=require('../../../assets/images/icon/arrowImg.png');
          this.chuizhiText="个人觉得黑色经典好看，当然其他颜色也不错。"
        }
        else  if(e == 'electronics'){
          this.chuizhiText="莫尔斯码无线传输就是这种调制技术应用的一个实例。"
          this.arrowImg=require('../../../assets/images/icon/arrowImg1.png');
        }
        else  if(e == 'mechanics'){
          this.arrowImg=require('../../../assets/images/icon/arrowImg1.png');
          this.chuizhiText="将左侧冷却液管安装到曲轴箱内并拧紧紧固螺钉。"
        }
        else  if(e == 'medicine'){
          this.arrowImg=require('../../../assets/images/icon/arrowImg.png');
          this.chuizhiText="多肽作为自然界中大量存在蛋白质水解产物,其在生物活动中具有十分重要的调节作用。"
        }
      },
      fanyiAnaly(){
        if(!this.isInter){
          var url = window.config.url+'/ai/nlp/translateGeneral';
          var text,data,scene;
          if(this.routeId == '5.4.1'){
            text = this.tongyongText;
            scene = '';
          }
          else if(this.routeId == '5.4.2'){
            text = this.chuizhiText; 
            scene = this.lingyu;
          }
          data = {
            sourceLanguage:this.source || 'zh',
            targetLanguage:this.target|| 'en',
            sourceText:text|| '',
            Scene:scene || ''
          };
          this.$axios({
            url:url,
            method:'post',
            data:data
          }).then(res=>{
            if(res.status == 200){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              var anfuResult = res.data.data.data.translated;
              this.tongyongResult = anfuResult;
            }
            else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            console.log(err);
          });
        }else {
          var url = window.config.url+'/ai/nlp/fieldtranslate';
          var text,data,scene;
          data = {
            domain: this.domain,
            from:this.source || 'zh',
            to:this.target|| 'en',
            q:this.chuizhiText
          }
          this.$axios({
            url:url,
            method:'post',
            data:data
          }).then(res=>{
            if(res.status == 200){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              let html = ``
              let anfuResult = res.data.data.trans_result;
              anfuResult.forEach(item=>{
                if(item.dst){
                  html+=item.dst
                }
              })
              this.tongyongResult = html
            }
            else{
              this.$Message.error('请求失败');
            }
          }).catch(err=>{
            console.log(err);
          });
        }
      }
  }
}
</script>
<style scoped lang='less'>
.experience {
    width: 100%;
    .experience_container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-self: center;
      align-items: center;
      .info_text_type{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .info_text{
          flex-grow: 1;
          font-size: 18px;
          color: #121C33;
        }
        .type{
          width: 18%;
          /deep/.ivu-select-visible .ivu-select-selection{
            border-color: #03a971;
          }
          /deep/.ivu-select-selection-focused{
            border-color: #03a971;
          }
          /deep/.ivu-select-selection:hover{
            border:#03a971 1px solid;
          }
          /deep/.ivu-select-item-selected{
            color: #03a971;
          }
        }
      }
      .top {
        box-sizing: border-box;
        border: 1px solid #EBECF0;
        background: rgba(192,204,218,0.10);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 40px;
        textarea {
          width: 100%;
          height: 100px;
          font-size: 14px;
          color: #7A8499;
          text-align: justify;
          line-height: 22px;
          background-color: rgba(192,204,218,0.01);
          border: none;
          outline: none;
          resize: none;
        }
        .max_length{
          width: 100%;
          font-size: 12px;
          color: #B8BECC;
          margin-top: -14px;
        }
      }
      .kaishi_fenxi{
        width: 100px;
        height: 28px;
        text-align: center;
        background: #03A971;
        border-radius: 3px;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 28px;
      }
      .kaishi_fenxi:hover{
        cursor: pointer;
      }
      .bottom {
        width: 100%;
        margin-top: 10px;
        box-sizing: border-box;
        display: flex;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        .left{
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 22px;
          .content{
            display: flex;
            flex-wrap: wrap;
            .item{
              padding:2px 12px;
              height:24px;
              border: 1px solid #3D4966;
              margin-right: 10px;
              margin-bottom: 10px;
              text-align: center;
              font-size: 14px;
              color: #3D4966;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              .triangle{
                width: 0; 
                height: 0;
                display: none;
                margin-top: -10px;
                border-width: 10px;
                border-style: solid;
                border-color: transparent transparent rgba(3,169,113,0.60) transparent;
              }
              .leftCixing{
                background-color: rgba(3,169,113,0.60);
                box-shadow: 0 8px 24px 0 #EBECF0;
                padding: 13px;
                display: none;
                color: #FFFFFF;
              }
            }
          }
        }
        .right{
          width: 40%;
          padding: 22px 29.5px;
          box-sizing: border-box;
          border-left:1px solid #EBECF0;  
          .cixing_leibie{
            font-size: 18px;
            color: #121C33;
          }
          .cixing_leibie_container{
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .cixing{
              height:24px;
              padding:2px 12px;
              border: 1px solid #3D4966;
              text-align: center;
              font-size: 14px;
              color: #3D4966;
              margin-right: 10px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .component {
        width: 100%;
        height: 200px;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        padding: 17px 22px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        textarea{
          width: 100%;
          height: 100%;
          border: none;
          background: rgba(192,204,218,0.001);
          ::placeholder,:-moz-placeholder,:-ms-input-placeholder,::-moz-placeholder,::-webkit-input-placeholder{
            font-size: 14px;
            color: #7A8499;
            text-align: justify;
            line-height: 28px;
          }
        }
        .experice_text{
          width: 100%;
          font-size: 12px;
          color: #B8BECC;
          text-align: justify;
          line-height: 16px;
          padding-top: 10px;
        }
      }
      .analResult_container{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 20px;
        .analResult_title{
          font-size: 18px;
          color: #121C33;
          margin-right: 20px;
        }
        .analResult_content{
          width: 100%;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          display: flex;
          .result2_res_res1{
            height:230px;
            width: 75%;
            margin:15px;
            border-right: #E9E9E9 solid 1px;
            font-size: 14px;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            canvas{
              color: green !important;
            }
          }
          .result2_res_res1{
            overflow: hidden !important;
          }
          .result2_res_res1:hover{
            overflow: auto !important;
          }
          .result2_res_res1::-webkit-scrollbar{
            width: 5px;     
            height: 5px;
          }
          .result2_res_res1::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
            border-radius: 5px;
            background: #999999;
            height: 40px;
          }
          .result2_res_res1::-webkit-scrollbar-track
          {/*滚动条里面轨道*/
            border-radius: 0;
            background: white;
          }
          .analResult_content_right{
            width: 25%;
            height:230px;
            border-left: 1px solid #EBECF0;
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
            .shuxingtu{
              font-size: 18px;
              color: #121C33;
              margin-bottom: 8px;
            }
            .shuxing_content{
              display: flex;
              flex-wrap: wrap;
              .shuxing_item{
                margin-right: 10px;
                margin-bottom: 10px;
                color:#03A971;
              }
            }
          }
          .analResult_content_right:hover{
            overflow-y: scroll !important;
          }
          .analResult_content_right::-webkit-scrollbar{
            width: 5px;     
            height: 5px;
          }
          .analResult_content_right::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
            border-radius: 5px;
            background: #999999;
            height: 40px;
          }
          .analResult_content_right::-webkit-scrollbar-track
          {/*滚动条里面轨道*/
            border-radius: 0;
            background: white;
          }
        }
        .analResult_result{
          padding: 2px 12px;
          box-sizing: border-box;
          margin-right: 15px;
          font-size: 14px;
          color:#FFF;
        }
      }
      .result_content{
        width: 100%;
        height: 200px;
        background: rgba(192,204,218,0.10);
        border: 1px solid #EBECF0;
        padding: 17px 22px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
      }
      .quchuResult{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: auto !important;
        .quchuResult_item{
          padding: 2px 12px;
          border: 1px solid #3D4966;
          margin-right: 5px;
          margin-bottom: 22px;
          font-size: 14px;
          color: #3D4966;
        }
      }
      .kaishi_fenxi{
        width: 100px;
        height: 28px;
        text-align: center;
        background: #03A971;
        border-radius: 3px;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 28px;
        margin-top: 10px;
        margin-bottom: 15px;
      }
      .kaishi_fenxi:hover{
        cursor: pointer;
      }
    }
    .function_experice_container{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;
      .function_experice{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .shuru_title{
          width: 100%;
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .choice_container{
          display: flex;
          align-items: center;
          height: 36px;
          width: 100%;
          margin-bottom: 25px;
          .choice1{
            margin-right: 10px;
          }
          .img_container{
            width: 30px;
            height: 23px;
            margin-right: 10px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .choice2{
            margin-right: 100px;
          }
          .lingyu{
            display: flex;
            align-items: center;
            span{
              width: 125px;
              margin-right: 9px;
            }
          }
        }
        .Industry_type{
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .itemIn{
            width: 65px;
            height: 30px;
            text-align: center;
            line-height:30px;
            border: 1px solid #B8BECC;
            font-size: 14px;
            color: #7A8499;
            margin-right: 10px;
          }
        }
        .text_container{
          width: 100%;
          height: 200px;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          padding: 22px;
          box-sizing: border-box;
          textarea{
            width: 100%;
            height: 90%;
            border: none;
            background: rgba(192,204,218,0.01);
          }
          .tishiInfo{
            width: 100%;
            height: 10%;
            font-size: 12px;
            color: #B8BECC;
            text-align: justify;
            line-height: 16px;
          }
        }
        .fenxi_btn{
          background: #03A971;
          border-radius: 3px;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          padding: 10px 38px;
          box-sizing: border-box;
        }
        .fenxi_btn:hover{
          cursor: pointer;
        }
        .result_container{
          width: 100%;
          height: 93px;
          background: #F9FAFC;
          border: 1px solid #EBECF0;
          padding: 30px 40px;
          box-sizing: border-box;
          font-size: 18px;
          color: #121C33;
          margin-bottom: 80px;
        }
        .component {
          width: 100%;
          height: 200px;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          padding: 17px 22px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
          textarea{
            width: 100%;
            height: 100%;
            border: none;
            background: rgba(192,204,218,0.001);
            ::placeholder,:-moz-placeholder,:-ms-input-placeholder,::-moz-placeholder,::-webkit-input-placeholder{
              font-size: 14px;
              color: #7A8499;
              text-align: justify;
              line-height: 28px;
            }
          }
          .experice_text{
            width: 100%;
            font-size: 12px;
            color: #B8BECC;
            text-align: justify;
            line-height: 16px;
            padding-top: 10px;
          }
        }
        .kaishi_fenxi{
          width: 100px;
          height: 28px;
          text-align: center;
          background: #03A971;
          border-radius: 3px;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 28px;
          margin-top: 10px;
        }
        .kaishi_fenxi:hover{
          cursor: pointer;
        }
        .analy_result{
          width: 100%;
          background: rgba(192,204,218,0.10);
          border: 1px solid #EBECF0;
          padding: 40px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .result{
            font-size: 14px;
            color: #3D4966;
            .xiaoji,.zhongxing,.jiji{
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              img{
                width: 30px;
                margin-right: 20px;
              }
            }
          }
          .anfu{
            margin-top: 20px;
            font-size: 14px;
            color: #3D4966;
            line-height: 28px;
          }
          .qingxu_result{
            display: flex;
            align-items: center;
            .fumian,.zhongxing,.zhengxiang{
              display: flex;
              align-items: center;
              margin-right: 20px;
              opacity: 0.5;
              img{
                width: 35px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>

