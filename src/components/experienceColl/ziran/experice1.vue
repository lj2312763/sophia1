<template>
  <div class="experience">
    <!-- 关键词 -->
    <div class="experience_container" v-if="routeId=='5.1.5'">
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

    <!-- 句式识别 -->
    <div class="experience_container" v-if="routeId=='5.1.3'">
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

      <!-- 句法分分析 -->
    <div class="experience_container" v-if="routeId=='5.1.2'">
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

    <!-- 句子边界 -->
    <div class="experience_container" v-if="routeId=='5.1.9'">
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
     <!-- 词频统计 -->
    <div class="experience_container" v-if="routeId=='5.1.12'">
      <div class="info_text_type">
        <div class="info_text">请输入一段想分析的文本：</div>
        <div class="type">
            <Select v-model="source"  @on-change="changeVal1">
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText8"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom_emo">
          <div style="display:flex;justify-content:space-between;width:90%;margin:auto;">
            <span>序号</span>
            <span>关键词</span>
            <span>词频</span>
          </div>
          <div v-for="(val,key,index) in resultList" :key="index" style="width:90%;margin:auto;display:flex;justify-content:space-between">
            <span>{{index+1}}</span>
            <span>{{key}}</span>
            <span>{{val}}</span>
          </div>
        </div>
    </div>

     <!-- 情感分析 -->
    <div class="experience_container" v-if="routeId=='5.2.2'">
      <div class="info_text_type">
        <div class="info_text"></div>
        <div class="type">
            <Select v-model="source"  @on-change="changeVal">
                <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText2"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom_emo">
          <p>{{emo_result}}</p>
          <div class="reult_content">
            <div class="pic1"><img src="../../../assets/images/icon/12.png" alt="">
              <div class="emotion">正向情感</div>
            </div>
            <Progress :percent="positive_prob" />
             <div class="pic1"><img src="../../../assets/images/icon/ku.png" alt=""> <div class="emotion">负向情感</div></div>
          </div>
          
        </div>
    </div>
     <!-- 文本纠错 -->
    <div class="experience_container" v-if="routeId=='5.2.3'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText3"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
          <div class="tp" v-html="areaText4">
          </div>
        </div>
    </div>
      <!-- 文章标签 -->
    <div class="experience_container" v-if="routeId=='5.2.4'">
      <div class="top">
        <div class="top_textarea">
           <textarea cols="30" rows="1" maxlength="150"  v-model="title" class="textarea_title"></textarea>
        </div>
       <div class="bt_textarea">
           <textarea cols="30" rows="8" maxlength="150"  v-model="content" class="textarea_content"></textarea>
        </div>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
          <div class="tp" v-html="areaText5">
          </div>
        </div>
    </div>
       <!-- 文章分类 -->
    <div class="experience_container" v-if="routeId=='5.2.5'">
      <div class="top">
        <div class="top_textarea">
           <textarea cols="30" rows="1" maxlength="150"  v-model="title1" class="textarea_title"></textarea>
        </div>
       <div class="bt_textarea">
           <textarea cols="30" rows="8" maxlength="300"  v-model="content1" class="textarea_content"></textarea>
        </div>
        <div class="max_length">体验版本最多输入300个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
            <Tooltip :content="article.text.score">
                 <span style="display:inline-block;width:70px;height:70px;background:#19be6b;border-radius:50%;line-height:70px;text-align:center;font-size: 18px;color:#fff;margin:0 15px">{{article.text.tag}}</span>
            </Tooltip>
            <Tooltip :content="item.score" v-for="(item,index) in article.list" :key="index">
                 <span v-if="item.score>0.8" style="display:inline-block;font-size: 24px;color:#03A971;margin:0 15px">{{item.tag}}</span>
                 <span v-else-if="item.score<0.5" style="display:inline-block;font-size: 16px;color:#03A971;margin:0 15px">{{item.tag}}</span>
                 <span v-else style="display:inline-block;font-size: 18px;color:#03A971;margin:0 15px">{{item.tag}}</span>
            </Tooltip>
            <div class="scoreIntro" style="margin:50px 0">
              <p style="margin-bottom:30px">分值说明</p>
              <div class="low" style="display:inline-block;width:100px;height:3px;background:#03A971;opacity: 0.4;position:relative">
                <div class="tip1" style="position:absolute;top:-29px;left:0;color: #7A8499;">0</div>
                <div class="tip1" style="position:absolute;top:-29px;right:-12px;color: #7A8499;">0.5</div>
                <div class="tip1" style="position:absolute;bottom:-32px;left:11px;font-size: 12px;color: #7A8499;">相关度低</div>
              </div>
              <div class="nor" style="display:inline-block;width:100px;height:3px;background:#03A971;opacity: 0.7;margin-left:-5px;position:relative">
                <div class="tip1" style="position:absolute;top:-29px;right:-12px;color: #7A8499;">0.8</div>
                <div class="tip1" style="position:absolute;bottom:-32px;left:11px;font-size: 12px;color: #7A8499;">相关度低</div>
              </div>
              <div class="hgh" style="display:inline-block;width:100px;height:3px;background:#03A971;margin-left:-5px;position:relative">
                <div class="tip1" style="position:absolute;top:-29px;right:-2px;color: #7A8499;">1</div>
                <div class="tip1" style="position:absolute;bottom:-32px;left:11px;font-size: 12px;color: #7A8499;">相关度低</div>
              </div>
            </div>
        </div>
    </div>
       <!-- 新闻摘要 -->
    <div class="experience_container" v-if="routeId=='5.2.6'">
      <div class="top">
        <div class="top_textarea">
           <textarea cols="30" rows="1" maxlength="150"  v-model="title2" class="textarea_title"></textarea>
        </div>
       <div class="bt_textarea">
           <textarea cols="30" rows="8" maxlength="150"  v-model="content2" class="textarea_content"></textarea>
        </div>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <p class="result">分析结果：</p>
        <div class="bottom">
          <div class="tp" v-html="areaText6" style="font-size: 14px;color: #7A8499;text-align: justify;line-height: 22px;">
          </div>
        </div>
    </div>
       <!-- 地址识别 -->
    <div class="experience_container" v-if="routeId=='5.2.7'">
      <div class="top">
        <textarea cols="30" rows="10" maxlength="150"  v-model="areaText7"></textarea>
        <div class="max_length">体验版本最多输入150个字</div>
      </div>
        <div class="kaishi_fenxi" @click="select">开始分析</div>
        <div class="bottom" style="margin-top:40px">
          <div class="tp" style="display:flex">
            <div style="flex:1;font-size: 14px;color: #7A8499;">
              <p style="font-size: 18px;color: #121C33;">地址：</p>
              <p>省：{{address.province}}</p>
              <p>市：{{address.city}}</p>
              <p>区：{{address.county}}</p>
              <p>街道：{{address.town}}</p>
              <p>详细地址：{{address.detail}}</p>
            </div>
            <div style="flex:1;margin-left:60px;font-size: 14px;color: #7A8499;">
              <p style="font-size: 18px;color: #121C33;">联系人：</p>
              <p>姓名：{{address.person}}</p>
              <p>联系方式：{{address.phonenum}}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { VoBasic, VoEdit } from 'vue-orgchart'
  export default {
    props:['routeId'],
    components: { VoBasic,VoEdit },
    created() {
      this.areaText='徐先生还具体帮助他确定了把画雄鹰、松鼠和麻雀作为主攻目标。';
      this.select()
    },
    data() {
      return {
        source:'cn',
        langList:[
          {
            label:'中文',
            value:'cn'
          },
          {
            label:'英文',
            value:'en'
          }
        ],
        article:{
          text:'',
          list:'',
        },
        title2:'李克强向第五届中德创新大会致贺信',
        content2:`央广网北京2月28日消息 据中国之声《新闻和报纸摘要》报道，国务院总理李克强2月27日向第五届中德创新大会致贺信。
李克强在贺信中表示，当前新一轮科技革命和产业变革席卷全球，科技创新正深刻改变着人类的生产生活方式。中德科技创新合作开创了大国科技合作的先例，为两国务实合作装上了大功率“引擎”。`,
        title1:'欧洲冠军联赛',
        content1:`欧洲冠军联赛是欧洲足球协会联盟主办的年度足球比赛，代表欧洲俱乐部足球最高荣誉和水平，被认为是全世界最高素质、最具影响力以及最高水平的俱乐部赛事，亦是世界上奖金最高的足球赛事和体育赛事之一。`,
        title:'最高法：严厉打击以互联网金融名义进行的违法犯罪',
        content:`从最高人民法院获悉，最高法近日印发《最高人民法院关于进一步加强金融审判工作的若干意见》，就人民法院加强金融审判工作，保障经济和金融良性循环健康发展提出了30项意见。
                意见规定，依法认定互联网金融所涉具体法律关系，据此确定各方当事人之间的权利义务。依法严厉打击涉互联网金融或者以互联网金融名义进行的违法犯罪行为，规范和保障互联网金融健康发展。`,
        wordTree:null,
        keyList:[],
        notKeyList:[],
        areaText:'',
        areaText2:'这家日料的食材特别新鲜，跟朋友一起吃得很开心很满足。',
        areaText3:'日前，地球上的绿色之肺——森林正在一天天地萎缩。近200年来，地球上的森林大约已有三分之一被采筏和毁掉；而另一方面，由于燃烧物增多，二氧化炭的排放量在巨烈增加。',
        areaText4:'',
        areaText5:'',
        areaText6:'',
        areaText7:'收件人叶小姐 13815719956上海市清浦区徐泾镇谢卫路333弄8号502',
        areaText8:'一天，这个姑娘的脸突然变得容光焕发。在她母亲替她一手安排的堕落生涯里，天主似乎赐给了这个女罪人一点幸福。毕竟，天主已经赋予了她懦弱的性格，那么在她承受痛苦生活的重压的时候，为什么就不能给她一点安慰呢？这一天，她发觉自己怀孕了，她身上还残存的那么一点纯洁的思想，使她开心得全身哆嗦。人的灵魂有它不可理解的寄托。路易丝急忙去把那个使她欣喜若狂的发现告诉她母亲。说起来也使人感到羞耻。但是，我们并不是在这里随意编造什么风流韵事，而是在讲一件真人真事。这种事，如果我们认为没有必要经常把这些女人的苦难公诸于世，那也许还是索性闭口不谈为好。人们谴责这种女人而又不听她们的申诉，人们蔑视她们而又不公正地评价她们，我们说这是可耻的。',
        emo_result:'',
        positive_prob:0,
        areaText1:'',
        flags:'',
        resType:'',
        count:'',
        address:'',
        resultList:null
      }
    },
    mounted(){
      this.select();
    },
    watch:{
      routeId(newVal,oldVal){
        console.log(newVal,oldVal)
        this.select();
      }
    },
    methods:{
      changeVal(val){
        if(val=='en'){
          this.areaText2='The ingredients of this Japanese food are very fresh, and we are very happy and satisfied with our friends.';
        }else{
          this.areaText2='这家日料的食材特别新鲜，跟朋友一起吃得很开心很满足。';
        }
      },
      changeVal1(val){
        if(val=='en'){
          this.areaText8="One day, the girl's face suddenly became radiant. In the depraved career that her mother arranged for her, God seemed to give the female sinner a little happiness. After all, God has given her a cowardly personality, so why can't she give her a little comfort when she is under the pressure of a painful life? On this day, she realized that she was pregnant, and the little pure thoughts left in her made her tremble with joy. The human soul has its incomprehensible sustenance. Louise hurriedly told her mother the discovery that made her ecstatic. It also makes people feel ashamed. However, we are not here to make up a romantic affair at random, but to tell a real story. If we think that there is no need to publicize the sufferings of these women, then it may be better to just keep silent. People condemn such women without listening to their complaints. People despise them and judge them unfairly. We say this is shameful.";
        }else{
          this.areaText8='这一天，这个姑娘的脸突然变得容光焕发。在她母亲替她一手安排的堕落生涯里，天主似乎赐给了这个女罪人一点幸福。毕竟，天主已经赋予了她懦弱的性格，那么在她承受痛苦生活的重压的时候，为什么就不能给她一点安慰呢？这一天，她发觉自己怀孕了，她身上还残存的那么一点纯洁的思想，使她开心得全身哆嗦。人的灵魂有它不可理解的寄托。路易丝急忙去把那个使她欣喜若狂的发现告诉她母亲。说起来也使人感到羞耻。但是，我们并不是在这里随意编造什么风流韵事，而是在讲一件真人真事。这种事，如果我们认为没有必要经常把这些女人的苦难公诸于世，那也许还是索性闭口不谈为好。人们谴责这种女人而又不听她们的申诉，人们蔑视她们而又不公正地评价她们，我们说这是可耻的。';
        }
      },
      select(){
        if(this.routeId=='5.1.5'){
            this.flags="keyword";
            this.toAnalyze();
        }
        else if(this.routeId=='5.1.3'){
            this.flags="sentenceType";
            this.toAnalyze1();
        }
        else if(this.routeId=='5.1.2'){
            this.flags="parser";
            this.toAnalyze2();
        }
        else if(this.routeId=='5.1.9'){
            this.toAnalyze3();
        }
        else if(this.routeId=='5.2.2'){
          if(this.source=='cn'){
            this.toAnalyze4();
            console.log(111)
          }else{
            console.log(222)
            this.toAnalyze41();
          }
        }
        else if(this.routeId=='5.1.12'){
            this.toAnalyze10();
        }
        else if(this.routeId=='5.2.3'){
            this.toAnalyze5();
        }
        else if(this.routeId=='5.2.4'){
            this.toAnalyze6();
        }
        else if(this.routeId=='5.2.5'){
            this.toAnalyze7();
        }
        else if(this.routeId=='5.2.6'){
            this.toAnalyze8();
        }
        else if(this.routeId=='5.2.7'){
            this.toAnalyze9();
        }
      },
      toAnalyze10(){
          let formData = new FormData(); //创建form对象
         formData.append('text', this.areaText8);//
         this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/api/nl/"+this.source+"/wordCount",
          data: formData
        }).then(res => {
          if(res.data.code == 200){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.resultList=res.data.data;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze9(){
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/nlp/address",
          data: {
            text:this.areaText7,
          }
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.address=res.data.data;
          //  this.areaText7=res.data.data.summary;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze8(){
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/nlp/newsSummary",
          data: {
            title:this.title2,
            content:this.content2,
            max_summary_len:200
          }
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
           this.areaText6=res.data.data.summary;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze7(){
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/nlp/topic",
          data: {
            title:this.title1,
            content:this.content1
          }
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.article.text=res.data.data.item.lv1_tag_list[0];
            this.article.list=res.data.data.item.lv2_tag_list;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze6(){
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/nlp/keyword",
          data: {
            title:this.title,
            content:this.content
          }
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            let _result=res.data.data.items;
            let html='';
             _result.forEach(item=>{
               if(item.score>0.8){
                 html+=`<span class="success" style="padding: 3px 8px;margin:0 10px;background:#19be6b">${item.tag}</span>`;
               }else if(item.score<0.3){
                 html+=`<span class="error" style="padding: 3px 8px;margin:0 10px;background:#2d8cf0">${item.tag}</span>`;
               }else{
                 html+=`<span class="primary" style="padding: 3px 8px;margin:0 10px;background:#ed4014">${item.tag}</span>`;
               }

             })
             this.areaText5=html;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze5(){
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/nlp/textError",
          data: {
            text:this.areaText3
          }
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            let _result=res.data.data.item.vec_fragment;
            let str='';
            _result.forEach(item=>{
               let _result1=item.ori_frag;
               let _result2=item.correct_frag;
               var reg=new RegExp("("+_result1+")","g"); 
                  if(str){
                    str=str.replace(reg,'<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px 5px;border-radius:2px">'+_result2+'</span>');
                  }else{
                    str=this.areaText3.replace(reg,'<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px 5px;border-radius:2px">'+_result2+'</span>');
                  }
            })
            this.areaText4=str;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze41(){
        let formData = new FormData(); //创建form对象
        formData.append('text', this.areaText2);//
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/api/nl/en/sentiment",
          data: formData
        }).then(res => {
          if(res.data.code == 200){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.emo_result="情感偏向"
            this.positive_prob=Number((res.data.data*100).toFixed(2));
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze4(){
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/nlp/sentimentClassify",
          data: {
            text:this.areaText2
          }
        }).then(res => {
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            if(res.data.data.items[0].sentiment==0){
              this.emo_result="情感偏负向"
            }else  if(res.data.data.items[0].sentiment==1){
              this.emo_result="情感偏中性"
            }else  if(res.data.data.items[0].sentiment==2){
              this.emo_result="情感偏正向"
            }
            this.positive_prob=Number((res.data.data.items[0].positive_prob*100).toFixed(2));
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze3(){
        this.notKeyList=[];
        this.keyList=[];
        this.$axios({
          method: "post",
          url: window.config.url+"/action/v1/api/zhujian/sbd",
          data: {
            text:this.areaText//句子边界
          }
        }).then(res => {
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
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
          else{
            this.$Message.error('请求失败');
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
          url: window.config.url+"/action/v1/api/zhujian/participle",
          // url: window.config.url+"/ai/jnlp/parser",
          // data: {
          //   text:this.areaText,
          // }
          data: {
            queries:[this.areaText],
            flags:this.flags//句法分析
          }
        }).then(res => {
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
           let _result= res.data[0].parser.result;
            this.wordTree=this.parseArrr(_result);
          }
          else{
            this.$Message.error('请求失败');
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
        return this.parse(str);
      },
      parse(str) {
        console.log(str)
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
          url: window.config.url+"/action/v1/api/zhujian/participle",
          data: {
            queries:[this.areaText],
            flags:this.flags//句式识别
          }
        }).then(res => {
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.resType= res.data[0].sentenceType;
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      toAnalyze(){
        this.notKeyList=[];
        this.keyList=[];
        // this.areaText1='',
        this.$axios({
          method: "post",
          url: window.config.url+"/ai/jnlp/phraseExtract",
          data: {
            text:this.areaText,
          }
        }).then(res => {
          if(res.status == 200){
            if(!res.data){
              this.$Message.error('返回数据为空');
              return;
            }
            var resData = res.data.data.result.data.phrases;
            // var resData = res.data[0].keyword;
            var  resultArr=[];
            // for (var i = 0; i < resData.length; i++) {
            //   for (var j = 0; j < resultArr.length; j++) {
            //       if (resultArr[j].word == resData[i].word) {
            //           break;//一旦有重复arr[i],跳出循环
            //       }
            //   }
            //   //如果resultArr这个数组中没有arr[i],那么j经过内层循环后没有break,值应为resultArr.length
            //   if (j == resultArr.length) {
            //       resultArr[resultArr.length] = resData[i];
            //   }
            // }
            let result=this.areaText;
            resData.forEach(item => {
               var reg='/'+item+'/g';
                result=result.replace(eval(reg),'<span style="background:#89e39e;">'+item+'</span>');
            });
            this.areaText1=result
            // resultArr.forEach(item => {
            //   if(item.level!=0){
            //       var reg=new RegExp("("+item.word+")","g"); 
            //       if(this.areaText1) {
            //         this.areaText1=this.areaText1.replace(reg,'<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px  5px;border-radius:2px">'+item.word+'</span>');
            //       }else{
            //         this.areaText1=this.areaText.replace(reg,'<span style="display:inline-block;padding:0 10px;background:#89e39e;margin:10px 5px;border-radius:2px">'+item.word+'</span>');
            //       }
            //   }     
            // });
          }
          else{
            this.$Message.error('请求失败');
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
      width: 100%;
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
        }
      }
      .top {
        box-sizing: border-box;
        border: 1px solid #EBECF0;
        background: rgba(192,204,218,0.10);
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        .top_textarea{
          width:100%;
          height: 25%;
          //border-bottom: 1px solid red;
           .textarea_title{
            border: 1px solid #EBECF0;
            padding:14px 20px;  
          }
        }
        .bt_textarea{
           width:100%;
           height: 70%;
           .textarea_content{
            padding-top:10px;
            padding-bottom:30px;
          }
        }
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
          box-sizing: border-box;
         
          // &.textarea_content{
          //   height:85%;
          // }
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
        .bottom_emo{
            box-sizing: border-box;
            border: 1px solid #EBECF0;
            background: rgba(192,204,218,0.10);
            padding:20px;
            span{
              display: inline-block;
              width: 100px;
              text-align: center;
            }
            p{
              font-size: 26px;
              color: #03A971;
              text-align: center;
            }
            .reult_content{
              width: 80%;
              margin:10px auto 30px;
              display: flex;
              align-items: center;
              .pic1{
               margin: 0 15px;
                width: 54px;
                position: relative;
                .emotion{
                  width: 74px;
                  position: absolute;
                  bottom:-25px;
                  left:-10px;
                }
                img{
                  display:block;
                  width: 100%;
                }
              }
            }
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
        
        #chart-container{
          overflow-x: auto;
        }
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
            .span{
              display: inline-block;
              height: 22px;
              line-height: 22px;
              margin: 2px 4px 2px 0;
              padding: 0 8px;
              border: 1px solid #e8eaec;
              border-radius: 3px;
              background: #f7f7f7;
              font-size: 12px;
              vertical-align: middle;
              opacity: 1;
              overflow: hidden;
              &.primary{
                background:#2d8cf0;
              }
              &.success{
                background:#2d8cf0;
              }
              &.error{
                background:#2d8cf0;
              }
            }
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
