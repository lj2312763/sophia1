<template>
  <div class="paperPopPre_container">
      <div class="paperPopPre_content">
          <div class="paper_title">论文流行度预测</div>
          <div class="search_content">
            <Form ref="formItem" :model="form" :rules="ruleValidate"  label-position="top" style="display:flex">
                <div class="search_left">
                    <FormItem label="论文标题" prop="paperTitle">
                        <Input v-model="form.paperTitle" placeholder="请输入论文标题" size='large'/>
                    </FormItem>
                    <FormItem label="关键词" prop="keyWord">
                        <Input v-model="form.keyWord" placeholder="" size='large'/>
                    </FormItem>
                    <FormItem label="论文学科" prop="dissert">
                         <Select v-model="form.dissert" size='large'>
                            <Option v-for="item in dissertList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </div>
                <div class="search_right">
                    <FormItem label="论文摘要" prop="summary">
                        <Input v-model="form.summary" size='large' type="textarea" placeholder="请输入论文摘要最多200字"/>
                    </FormItem>
                </div>
            </Form>
          </div>
          <div class="start_test_container" ref="startTest">
              <div class="start_test" @click="startTest">开始测试</div>
          </div>
          <div class="test_result_container" v-if="ifShowResult">
              <div class="test_title">测试结果</div>
              <div class="liuxingdu_container">
                  <div class="liuxingdu_yuan">
                      <img :src="liuIcon">
                      <div class="score">{{score}}</div>
                      <div class="score_desc">流行度</div>
                  </div>
                  <div class="liuxingdu_desc">
                      <span v-if="score>300">恭喜您！您的论文十分流行。</span>
                      <span v-else>您的论文低于平均水平。</span>
                  </div>
              </div>
              <div class="line_container">
                  <div class="line_left">
                      <div class="line_left_title">论文流行度分布</div>
                      <div class="line_left_chart" id="leftLine"></div>
                  </div>
                  <div class="line_right">
                      <div class="line_right_title">{{form.dissert}}流行度趋势</div>
                      <div class="line_right_chart" id="rightLine"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  data () {
    return {
        form:{
            paperTitle:'几类金融保险模型的大偏差和最小熵鞅测度',
            keyWord:'',
            dissert:'经济',
            summary:'在本文的第一章,我们阐述几类金融风险模型的背景,给出本文的主要结果,且列举一些本文所需要的预备知识.第二章我们考虑三类风险过程,即带马氏调控的再保险风险过程,具有马氏调控的带延迟的风险过程和具有Poisson散粒噪声强度的Cox风险过程.',
        },
        dissertList:[
            {
                value: '马克思主义、列宁主义',
                label: '马克思主义、列宁主义'
            },
            {
                value: '语言、文字',
                label: '语言、文字'
            },
            {
                value: '艺术',
                label: '艺术'
            },
            {
                value: '航空、航天',
                label: '航空、航天'
            },
            {
                value: '自然科学总论',
                label: '自然科学总论'
            },
            {
                value: '经济',
                label: '经济'
            },
            {
                value: '社会科学总论',
                label: '社会科学总论'
            },
            {
                value: '生物科学',
                label: '生物科学'
            },
            {
                value: '环境科学、安全科学',
                label: '环境科学、安全科学'
            },
            {
                value: '文学',
                label: '文学'
            },
            {
                value: '文化、科学、教育',
                label: '文化、科学、教育'
            },
            {
                value: '数理科学和化学',
                label: '数理科学和化学'
            },
            {
                value: '交通运输',
                label: '交通运输'
            },
            {
                value: '军事',
                label: '军事'
            },
            {
                value: '农业科学',
                label: '农业科学'
            },
            {
                value: '医药、卫生',
                label: '医药、卫生'
            },
            {
                value: '历史、地理',
                label: '历史、地理'
            },
            {
                value: '哲学、宗教',
                label: '哲学、宗教'
            },
            {
                value: '天文学、地球科学',
                label: '天文学、地球科学'
            },
            {
                value: '工业技术',
                label: '工业技术'
            },
            {
                value: '政治、法律',
                label: '政治、法律'
            },
        ],
        liuIcon:require('../../assets/images/JobFile/Ring.png'),
        ifShowResult:false,
        result:'',
        ruleValidate: {
            paperTitle:[{ required: true, message: "内容不能为空", trigger: "blur" }],
            summary:[{ required: true, message: "内容不能为空", trigger: "blur" }],
            dissert: [  { required: true, message: '内容不能为空', trigger: 'change' }],
        }
    }
  },
  methods:{
      initLine(){
        var leftLineChart = echarts.init(document.getElementById('leftLine'));
        var rightLineChart = echarts.init(document.getElementById('rightLine'));
        var leftLineoption = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.result.all_subject_popularity.subject
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '预测流行度',
                    type: 'line',
                    stack: '总量',
                    data: this.result.all_subject_popularity.pred,
                    lineStyle:{
                        color:'#5B8FF9'
                    }
                },
                {
                    name: '实际流行度',
                    type: 'line',
                    stack: '总量',
                    data: this.result.all_subject_popularity.value,
                    lineStyle:{
                        color:'#5AD8A6'
                    }
                }
            ]
        };
        leftLineChart.setOption(leftLineoption);
        var rightLineoption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.result.single_subject_popularity.yearStr,
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: this.result.single_subject_popularity.value,
                    areaStyle: {
                        color:'#5B8FF9'
                    },
                    lineStyle:{
                        color:'#1890FF'
                    }
                }
            ]
        };
        rightLineChart.setOption(rightLineoption);
      },
      startTest(){
        this.$refs["formItem"].validate(valid => {
            if (valid) {
                var testBtnDom = this.$refs.startTest;
                testBtnDom.style='margin-bottom:40px';
                this.$axios({
                    method: "post",
                    url: window.config.url + "/lunwen",
                    data: {
                        "title": this.form.paperTitle,
                        "summary": this.form.summary,
                        "keywords":this.form.keyWord,
                        "subject": this.form.dissert
                    }
                })
                .then(res => {
                if (res.data.code == 200) {
                    this.ifShowResult=true;
                    this.result = res.data;
                    this.score=JSON.parse(res.data.popularity)[0]=='nan'?'0':parseInt(JSON.parse(res.data.popularity)[0]);
                    setTimeout(()=>{
                        this.initLine();
                    },100)
                }
                })
                .catch(err => {});
            }
        });        
      }
  }
}
</script>
<style lang="less">
.paperPopPre_container{
    .ivu-form-label-top .ivu-form-item-label  {
        font-size: 18px !important;
        color: #121C33 !important;
        margin-bottom: 10px;
    }
}
</style>
<style scoped lang="less">
.paperPopPre_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .paperPopPre_content{
        width: 1200px;
        margin-top: 60px;
        .paper_title{
            width: 100%;
            text-align: center;
            font-size: 30px;
            color: #121C33;
            margin-bottom: 40px;
        }
        .search_content{
            display: flex;
            margin-bottom: 40px;
            .search_left{
                width: 360px;
                margin-right: 100px;
                
            }
            .search_right{
                width: 534px;
                /deep/ .ivu-input-type-textarea{
                    height: 100%;
                    /deep/ textarea{
                        height: 250px;
                    }
                }
            }
        }
        .start_test_container{
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 131px;
            .start_test{
                padding: 8px 32px;
                background: #03A971;
                border-radius: 3px;
                font-size: 14px;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
        .test_result_container{
            width: 100%;
            .test_title{
                width: 100%;
                font-size: 28px;
                color: #121C33;
                letter-spacing: 0;
                padding-bottom: 19px;
                border-bottom: 2px solid #EBECF0;
                margin-bottom: 40px;
            }
            .liuxingdu_container{
                width: 100%;
                height: 220px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .liuxingdu_yuan{
                    width: 96px;
                    height: 96px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    .score{
                        font-size: 36px;
                        color: #03A971;
                        line-height: 24px;
                    }
                    .score_desc{
                        font-size: 12px;
                        color: #03A971;
                        line-height: 24px;
                    }
                    img{
                        position: absolute;
                        top: -7px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                    }
                }
                .liuxingdu_desc{
                    font-size: 18px;
                    color: #121C33;
                    line-height: 24px;
                }
            }
            .line_container{
                width: 100%;
                margin-bottom: 60px;
                display: flex;
                align-items: center;
                .line_left{
                    width: 585px;
                    height: 330px;
                    margin-right: 30px;
                    padding: 23px 24px;
                    box-sizing: border-box;
                    .line_left_title{
                        font-size: 18px;
                        color: #000000;
                        margin-bottom: 6.5px;
                    }
                    .line_left_chart{
                        width: 100%;
                        height: 100%;
                    }
                }
                .line_right{
                    width: 585px;
                    height: 330px; 
                    padding: 23px 24px;
                    box-sizing: border-box;
                    .line_right_title{
                        font-size: 18px;
                        color: #000000;
                        margin-bottom: 6.5px;
                    }
                    .line_right_chart{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>

