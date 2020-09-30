<template>
  <div class="elevation_info_container">
      <div class="menu_container">
          <div class="menu" @click="$router.go(-1)">
              <span>品牌洞察</span><span> > 消费者聆听</span>
          </div>
      </div>
      <div class="content_container">
          <div class="search_area">
              <div class="top">
                  <div class="left">
                    <span>品类</span>
                    <Select v-model="category" style="width:270px" placeholder='手机'>
                        <Option v-for="item in CategoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div class="middle">
                    <span>品牌</span>
                    <Select v-model="brand" style="width:270px" placeholder='所有' @on-select="selectBrand">
                        <Option v-for="item in brandList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div class="right">
                      <span>日期</span>
                      <DatePicker type="datetime" placeholder="选择日期" v-model="startDate"></DatePicker>
                      &nbsp;&nbsp;<span>至</span>
                      <DatePicker type="datetime" placeholder="选择日期" v-model="endDate"></DatePicker>
                  </div>
              </div>
              <div class="bottom">
                <div class="left">
                    <span>平台</span>
                    <Select v-model="platform" style="width:270px" placeholder='所有' @on-change='changePlatform'>
                        <Option v-for="item in platformList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="middle">
                    <span>系列</span>
                    <Select v-model="series" style="width:270px" placeholder='所有'>
                        <Option v-for="item in seriesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="right">
                    <span>店铺</span>
                    <Select v-model="shop" style="width:270px" placeholder='所有'>
                        <Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div class="search_btn" @click="search">查询</div>
                </div>
              </div>
          </div>
          <div class="product_show_zhexian_area">
              <div class="top_nav" @click="selectGoodorBad" ref="top_nav">
                  <span>全部</span><span>正面</span><span>中性</span><span>负面</span>
              </div>
              <div class="bottom_content">
                  <div class="bottom_content_left" @click="selectFnType" ref="bottom_content_left">
                      <div class="firstDiv">产品</div><div>运营</div><div>物流</div><div>其他</div>
                  </div>
                  <div class="bottom_content_right" id="bottomContentRight"></div>
              </div>
          </div>

          <!--新增内容-->
          <div class="emation_container">
              <div class="emation_title">
                  情感分析占比<img :src="whyIcon" class="why_icon" @mouseover="showWordModel('ema')" @mouseleave="hideWordModel('ema')">
                  <div class="emation_title_model" v-show="ifShowEmat">
                      依托元知中文语义分析处理能力，结合机器学习，通过对内容精准分词、中文语义分析、通过词距词序词频计算并按照权重打分等方式，根据模型训练结果的判定标准，对内容进行情感判定。
                  </div>
              </div>
              <div class="zhutu_container" id="zhutuId"></div>
          </div>

          <div class="word_cloud_container">
              <div class="word_cloud_title">
                关键词云<img :src="whyIcon" class="why_icon" @mouseover="showWordModel('wor')" @mouseleave="hideWordModel('wor')">
                <div class="wordClodTitle" v-show="ifShowClTi">
                    利用语义分析算法，对评论中所提及的关键词进行分词聚合，呈现出被提及频次最多的关键词，字号越大的词组，被提及频次越多
                </div>
              </div>
              <div class="word_cloud_echarts" v-if="!brand">
                  <div class="ciItem_contanier">
                      <div class="word_cloud" id="huaweiId"></div>
                      <div class="bottom_title">华为</div>
                  </div>
                  <div class="ciItem_contanier">
                      <div class="word_cloud" id="AppleId"></div>
                      <div class="bottom_title">Apple</div>
                  </div>
                  <div class="ciItem_contanier">
                      <div class="word_cloud" id="xiaoMiId"></div>
                      <div class="bottom_title">小米</div>
                  </div>
                  <div class="ciItem_contanier">
                      <div class="word_cloud" id="vivoId"></div>
                      <div class="bottom_title">VIVO</div>
                  </div>
              </div>
              <div class="word_cloud_echarts" v-else>
                 <div class="ciItem_contanier" style="width:100%;height:271px;" v-if="brand == '华为'">
                      <div class="word_cloud" id="huaweiId"></div>
                      <div class="bottom_title">华为</div>
                  </div>
                  <div class="ciItem_contanier" style="width:100%;height:271px;" v-if="brand == 'apple'">
                      <div class="word_cloud" id="AppleId"></div>
                      <div class="bottom_title">Apple</div>
                  </div>
                  <div class="ciItem_contanier" style="width:100%;height:271px;" v-if="brand == '小米'">
                      <div class="word_cloud" id="xiaoMiId"></div>
                      <div class="bottom_title">小米</div>
                  </div>
                  <div class="ciItem_contanier"  style="width:100%;height:271px;" v-if="brand == 'vivo'">
                      <div class="word_cloud" id="vivoId"></div>
                      <div class="bottom_title">VIVO</div>
                  </div>
              </div>
          </div> 


          <div class="pinlun_area">
              <div class="pinlun_title">评论内容</div>
              <div class="pinlun_table">
                  <!-- <Table :columns="columns1" :data="tableData"></Table> -->
                <Table :data="tableData" :columns="columns1" stripe></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="TotalNum" :page-size='PageSize' @on-change="changePage"></Page>
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  data() {
    return {
        CategoryList: [
            {
                value: '手机',
                label: '手机'
            }
        ],
        brandList:[
            {
                value:'',
                label:'所有'
            },
            {
                value: 'apple',
                label: 'apple'
            },
            {
                value: '华为',
                label: '华为'
            },
            {
                value: 'vivo',
                label: 'Vivo'
            },
            {
                value: '小米',
                label: '小米'
            }
        ],
        platformList:[
            {
                value:'',
                label:'所有'
            },
            {
                value: '国美',
                label: '国美'   
            },
            {
                value: '京东',
                label: '京东'
            },
            {
                value: '苏宁',
                label: '苏宁'
            },
        ],
        seriesList:[
            {
                value:'',
                label:'所有'
            },
            {
                value: 'Apple iPhone 11 128G',
                label: 'Apple iPhone 11 128G'
            },
            {
                value: 'Apple iPhone 8 Plus',
                label: 'Apple iPhone 8 Plus'
            },
            {
                value: 'Apple iPhone 8 Plus 64GB',
                label: 'Apple iPhone 8 Plus 64GB'
            },
            {
                value: 'Apple iPhone XR',
                label: 'Apple iPhone XR'
            },
            {
                value: 'Apple iPhone11 128G',
                label: 'Apple iPhone11 128G'
            },
            {
                value: 'vivo NEX 3 5G',
                label: 'vivo NEX 3 5G'
            },
            {
                value: 'vivo NEX3',
                label: 'vivo NEX3'
            },
            {
                value: 'vivo Y7s 移动联通电信全网通4G 6GB+128GB',
                label: 'vivo Y7s 移动联通电信全网通4G 6GB+128GB'
            },
            {
                value: '华为/HUAWEI Mate 30 Pro',
                label: '华为/HUAWEI Mate 30 Pro'
            },
            {
                value: '华为/荣耀V30 PRO双模5G',
                label: '华为/荣耀V30 PRO双模5G'
            },
            {
                value: '华为Mate 30 Pro 5G',
                label: '华为Mate 30 Pro 5G'
            },
            {
                value: '华为荣耀V30 PRO',
                label: '华为荣耀V30 PRO'
            },
            {
                value: '小米_MI_ Redmi K30 5G',
                label: '小米_MI_ Redmi K30 5G'
            },
            {
                value: '小米10',
                label: '小米10'
            },
            {
                value: '小米10 5G',
                label: '小米10 5G'
            },
            {
                value: '小米CC9Pro 8GB+128GB',
                label: '小米CC9Pro 8GB+128GB'
            },
        ],
        shopList:[
            {
                value:'',
                label:'所有'
            },
            {
                value: 'Apple产品京东自营旗舰店',
                label: 'Apple产品京东自营旗舰店'
            },
            {
                value: 'Apple产品苏宁自营旗舰店',
                label: 'Apple产品苏宁自营旗舰店'
            },
            {
                value: 'vivo京东自营官方旗舰店',
                label: 'vivo京东自营官方旗舰店'
            },
            {
                value: '国美自营',
                label: '国美自营'
            },
            {
                value: '华为京东自营官方旗舰店',
                label: '华为京东自营官方旗舰店'
            },
            {
                value: '华为苏宁自营店',
                label: '华为苏宁自营店'
            },
            {
                value: '荣耀京东自营旗舰店',
                label: '荣耀京东自营旗舰店'
            },
            {
                value: '荣耀苏宁自营旗舰店',
                label: '荣耀苏宁自营旗舰店'
            },
            {
                value: '小米京东自营旗舰店',
                label: '小米京东自营旗舰店'
            },
            {
                value: '小米苏宁自营旗舰店',
                label: '小米苏宁自营旗舰店'
            },
        ],
        columns1: [
            {
                title: '序号',
                key: 'index',
                width:90
            },
            {
                title: 'SPU名称',
                key: 'name',
                width:260
            },
            {
                title: '平台',
                key: 'platform',
                width:110
            },
            {
                title: '店铺名称',
                key: 'storeName'
            },
            {
                title:'评论内容',
                key:'comments',
                height:46,
                ellipsis:true,
                tooltip:true
            },
            {
                title:'评论时间',
                key:'commentTime'
            }
        ],
        tableData: [],
        category: '',
        brand:'',
        startDate:'',
        endDate:'',
        platform:'',
        series:'',
        shop:'',
        evaluateCategory:'',
        CategoryType:'',
        TotalNum:0,
        PageSize:10,
        index:1,
        whyIcon:require('../../assets/images/insightData/why.png'),
        ifShowClTi:false,
        ifShowEmat:false
    };
  },
  mounted(){
      this.startDate = new Date(2020,2,1);
      this.endDate = new Date(2020,2,8);
      this.updateLine();
      this.initZhutu();
      this.initWordCloud();
      this.initPlatForm();
      var dom = this.$refs.bottom_content_left.childNodes;
      dom[0].style='background-color:rgba(242,244,247,0.5);';
  },
  methods:{
    selectBrand(val){
        this.brand = val.value;
    },
    changePage (val) {
        this.index = val;
        this.search();
    },
    updateLine(){
        var custormListenChart = echarts.init(document.getElementById('bottomContentRight'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var baseUrl = window.config.url+'/insight';
        var category = this.category || '手机';
        var brand = this.brand || '';
        var startData1 = this.startDate || new Date()-7*24*60*60*1000;
        var startDate = this.formatDate(startData1);
        var endDate1 = this.endDate || new Date();
        var endDate = this.formatDate(endDate1); 
        var platform = this.platform || '';
        var series = this.series || '';
        var shop = this.shop || '';
        var evaluateCategory = this.evaluateCategory;
        var evaluateDimension = this.CategoryType || '产品';
        this.$axios({
            method: "get",
            url: baseUrl + "/product/lineChart",
            params: {
                productCategory:category,
                productBrand:brand,
                platForm:platform,
                store:shop,
                productModel:series,
                evaluateCategory:evaluateCategory,
                evaluateDimension:evaluateDimension,
                beginDate:startDate,
                endDate:endDate
            }
        }).then(res => {
            if (res.status == 200) {
                var lineData = res.data.data || [];
                var axisXArr = [];
                var axisYArr = [];
                for(var i = 0;i < lineData.length;i++){
                    axisXArr.push(lineData[i].axisX);
                    axisYArr.push(Number(lineData[i].axisY));
                }
                var option = {
                    color: colors,
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            name:'日期',
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: axisXArr
                        }
                    ],
                    yAxis: [
                        {
                            name:'评论数',
                            type: 'value',
                            nameTextStyle:{
                                align:'right',
                                verticalAlign:'bottom'
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            smooth: true,
                            data: axisYArr
                        }
                    ]
                };
                custormListenChart.setOption(option);
            }}).catch(err => {
                console.log(err);
            });
    },
    initZhutu(){
        var zhutuChart = echarts.init(document.getElementById('zhutuId'));
        var baseUrl = window.config.url+'/insight';
        var category = this.category || '手机';
        var brand = this.brand || '';
        var startData1 = this.startDate || new Date()-7*24*60*60*1000;
        var startDate = this.formatDate(startData1);
        var endDate1 = this.endDate || new Date();
        var endDate = this.formatDate(endDate1); 
        var platform = this.platform || '';
        var series = this.series || '';
        var shop = this.shop || '';
        var evaluateDimension = this.CategoryType || '产品';
        this.$axios({
            method: "get",
            url: baseUrl + "/product/evaluateAnalyse",
            params: {
                productCategory:category,
                productBrand:brand,
                platForm:platform,
                store:shop,
                productModel:series,
                evaluateDimension:evaluateDimension,
                beginDate:startDate,
                endDate:endDate
            }
        }).then(res => {
            if (res.status == 200) {
                var zhutuData = res.data.data || [];
                var xAxisArr = [];

                var feiMinArr = [];
                var zhongxinArr = [];
                var minganArr = [];
                for(var i=0;i<zhutuData.length;i++){
                    xAxisArr.push(zhutuData[i].brandName);
                    var dataMapObj = zhutuData[i].dataMap;
                    for(var attr in dataMapObj){
                        if(attr == '0'){
                            feiMinArr.push(dataMapObj[attr])
                        }
                        else if(attr == '1'){
                            zhongxinArr.push(dataMapObj[attr])
                        }
                        else if(attr == '2'){
                            minganArr.push(dataMapObj[attr])
                        }
                    }
                }
                console.log(zhutuData)
                var zhutuOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['非敏感', '中性', '敏感']
                    },
                    color:['rgba(90,216,166,0.85)','rgba(255,243,136,0.85)','rgba(255,157,77,0.85)'],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisArr
                        }
                    ],
                    yAxis: [
                        {
                            name:'评论数',
                            type: 'value',
                            nameTextStyle:{
                                align:'right',
                                verticalAlign:'bottom'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '非敏感',
                            type: 'bar',
                            stack: '评价',
                            data: feiMinArr,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        return 'rgba(90,216,166,0.85)';
                                    }
                                }
                            }
                        },
                        {
                            name: '中性',
                            type: 'bar',
                            stack: '评价',
                            data: zhongxinArr,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        return 'rgba(255,243,136,0.85)';
                                    }
                                }
                            }
                        },
                        {
                            name: '敏感',
                            type: 'bar',
                            stack: '评价',
                            data: minganArr,   
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        return 'rgba(255,157,77,0.85)';
                                    }
                                }
                            }
                        }
                    ]
                };
                zhutuChart.setOption(zhutuOption)

            }}).catch(err => {
                console.log(err);
            });

            
    },
    initWordCloud(){
        var baseUrl = window.config.url+'/insight';
        var brand = this.brand || '';
        if(!this.brand){
            var huaweiChart = echarts.init(document.getElementById('huaweiId'));
            var appleChart = echarts.init(document.getElementById('AppleId'));
            var xiaomiChart = echarts.init(document.getElementById('xiaoMiId'));
            var vivoChart = echarts.init(document.getElementById('vivoId'));
        }
        else if(this.brand == '华为'){
            var huaweiChart = echarts.init(document.getElementById('huaweiId'));
        }
        else if(this.brand == 'apple'){
            var appleChart = echarts.init(document.getElementById('AppleId'));
        }
        else if(this.brand == '小米'){
            var xiaomiChart = echarts.init(document.getElementById('xiaoMiId'));
        }
        else if(this.brand == 'vivo'){
            var vivoChart = echarts.init(document.getElementById('vivoId'));
        }
        console.log(brand,'brandbrandbrand')
        this.$axios({
            method: "get",
            url: baseUrl + "/product/wordcloud",
            params: {
                topN:50,
                productBrand:brand
            }
        }).then(res => {
            if (res.status == 200) {
                var ciyunData = res.data.data || [];
                console.log(ciyunData,'ciyunData')
                for(var i=0;i<ciyunData.length;i++){
                    if(ciyunData[i].group == '华为'){
                        var huaweiData = ciyunData[i].keywordList;
                        var optionData = [];
                        for(var j=0;j<huaweiData.length;j++){
                            optionData.push({
                                name:huaweiData[j].name,
                                value:huaweiData[j].value
                            })
                        }
                        var huaweiOption = {
                            tooltip: {
                                show: true
                            },
                            series: [{
                                type: "wordCloud",
                                gridSize:6,
                                shape:'diamond',
                                sizeRange: [12, 50],
                                width:'100%',
                                height:'100%',
                                textStyle: {
                                    normal: {
                                        color: function() {
                                            return 'rgb(' + [
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160)
                                            ].join(',') + ')';
                                        }
                                    },
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                data:optionData,
                            }]
                        };
                        huaweiChart.setOption(huaweiOption);
                    }
                    else if(ciyunData[i].group == '小米'){
                        var xiaomiData = ciyunData[i].keywordList;
                        var optionData = [];
                        for(var j=0;j<xiaomiData.length;j++){
                            optionData.push({
                                name:xiaomiData[j].name,
                                value:xiaomiData[j].value
                            })
                        }
                        var xiaomiOption = {
                            tooltip: {
                                show: true
                            },
                            series: [{
                                type: "wordCloud",
                                gridSize:6,
                                shape:'diamond',
                                sizeRange: [12, 50],
                                width:'100%',
                                height:'100%',
                                textStyle: {
                                    normal: {
                                        color: function() {
                                            return 'rgb(' + [
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160)
                                            ].join(',') + ')';
                                        }
                                    },
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                data:optionData,
                            }]
                        };
                        xiaomiChart.setOption(xiaomiOption);
                    }
                    else if(ciyunData[i].group == 'Vivo'){
                        var vivoData = ciyunData[i].keywordList;
                        var optionData = [];
                        for(var j=0;j<vivoData.length;j++){
                            optionData.push({
                                name:vivoData[j].name,
                                value:vivoData[j].value
                            })
                        }
                        var vivoOption = {
                            tooltip: {
                                show: true
                            },
                            series: [{
                                type: "wordCloud",
                                gridSize:6,
                                shape:'diamond',
                                sizeRange: [12, 50],
                                width:'100%',
                                height:'100%',
                                textStyle: {
                                    normal: {
                                        color: function() {
                                            return 'rgb(' + [
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160)
                                            ].join(',') + ')';
                                        }
                                    },
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                data:optionData,
                            }]
                        };
                        vivoChart.setOption(vivoOption);
                    }
                    else if(ciyunData[i].group == "Apple"){
                        var appleData = ciyunData[i].keywordList;
                        var optionData = [];
                        for(var j=0;j<appleData.length;j++){
                            optionData.push({
                                name:appleData[j].name,
                                value:appleData[j].value
                            })
                        }
                        var appleOption = {
                            tooltip: {
                                show: true
                            },
                            series: [{
                                type: "wordCloud",
                                gridSize:6,
                                shape:'diamond',
                                sizeRange: [12, 50],
                                width:'100%',
                                height:'100%',
                                textStyle: {
                                    normal: {
                                        color: function() {
                                            return 'rgb(' + [
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160),
                                                Math.round(Math.random() * 160)
                                            ].join(',') + ')';
                                        }
                                    },
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                data:optionData,
                            }]
                        };
                        appleChart.setOption(appleOption);
                    }
                }
            }}).catch(err => {
                console.log(err);
            });
    },
    formatDate(date) { 
            var date = new Date(date)
            var year = date.getFullYear(); 
            var month = date.getMonth() + 1; 
            var day = date.getDate(); 
            var hour = date.getHours(); 
            var minute = date.getMinutes(); 
            var second = date.getSeconds(); 
            return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)+ " " + this.formatTen(hour)+ ":" + this.formatTen(minute)+ ":" + this.formatTen(second);
    },
    formatTen(num) { 
            return num > 9 ? (num + "") : ("0" + num); 
    },
    search(){
        var echarts = require('echarts');
        var custormListenChart = echarts.init(document.getElementById('bottomContentRight'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var that = this;
        var category = this.category || '手机';
        var brand = this.brand || '';
        var startData1 = this.startDate || new Date()-7*24*60*60*1000;
        var startDate = this.formatDate(startData1);
        var endDate1 = this.endDate || new Date();
        var endDate = this.formatDate(endDate1); 
        console.log(startData1,endDate1)
        var platform = this.platform || '';
        var series = this.series || '';
        var shop = this.shop || '';
        var evaluateCategory = this.evaluateCategory;
        var evaluateDimension = this.CategoryType || '产品';
        console.log('品类'+ category,'品牌'+brand,'开始时间'+startDate,'结束时间'+endDate,'平台'+platform,'系列'+platform,'店铺'+shop);
        var baseUrl = window.config.url+'/insight';
        this.$axios({
            method: "get",
            url: baseUrl + "/product/listProductInsight",
            params: {
                productCategory:category,
                productBrand:brand,
                platForm:platform,
                store:shop,
                productModel:series,
                evaluateCategory:evaluateCategory,
                evaluateDimension:evaluateDimension,
                beginDate:startDate,
                endDate:endDate,
                pageIndex:this.index,
                pageSize:this.PageSize
            }
        }).then(res => {
            if (res.status == 200) {
                var searchResultData = res.data.data.data || [];
                var resultDataArr = [];
                console.log(res.data.totalNum + 'res.data.totalNum')
                this.TotalNum = res.data.data.totalNum;
                for(var i = 0;i < searchResultData.length;i++){
                    resultDataArr.push({
                        index:searchResultData[i].id,
                        name:searchResultData[i].productModel,
                        platform:searchResultData[i].productPlatform,
                        storeName:searchResultData[i].productStore,
                        comments:searchResultData[i].evaluateInfo,
                        cellClassName: {
                            comments:'commentsClass'
                        },
                        commentTime:searchResultData[i].evaluateTime,
                    });
                }
                that.tableData = resultDataArr;
            }}).catch(err => {
                console.log(err);
            });
        this.$axios({
            method: "get",
            url: baseUrl + "/product/lineChart",
            params: {
                productCategory:category,
                productBrand:brand,
                platForm:platform,
                store:shop,
                productModel:series,
                evaluateCategory:evaluateCategory,
                evaluateDimension:evaluateDimension,
                beginDate:startDate,
                endDate:endDate
            }
        }).then(res => {
            if (res.status == 200) {
                console.log(res+'线图')
                var lineData = res.data.data || [];
                var axisXArr = [];
                var axisYArr = [];
                for(var i = 0;i < lineData.length;i++){
                    axisXArr.push(lineData[i].axisX);
                    axisYArr.push(Number(lineData[i].axisY));
                }
                var option = {
                    color: colors,
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: axisXArr
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            smooth: true,
                            data: axisYArr
                        }
                    ]
                };
                custormListenChart.setOption(option);
            }}).catch(err => {
                console.log(err);
            });

        this.initZhutu();
        setTimeout(()=>{
            this.initWordCloud();
        },1000);
    },
    selectGoodorBad(e){
        var selectText = e.target.innerText;
        var topNavDom = this.$refs.top_nav.childNodes;
        if(selectText == '全部'){
            this.evaluateCategory = '';
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 0){
                    topNavDom[i].style='border-bottom: 2px #03A971 solid;color: #03A971;padding-bottom: 15.5px;';
                }
                else{
                    topNavDom[i].style='color: #3D4966;border-bottom:none;';
                }
            }
        }
        else if(selectText == '正面'){
            this.evaluateCategory = 0;
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 1){
                    topNavDom[i].style='border-bottom: 2px #03A971 solid;color: #03A971;padding-bottom: 15.5px;';
                }
                else{
                    topNavDom[i].style='color: #3D4966;border-bottom:none;';
                }
            }
        }
        else if(selectText == '中性'){
            this.evaluateCategory = 1;
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 2){
                    topNavDom[i].style='border-bottom: 2px #03A971 solid;color: #03A971;padding-bottom: 15.5px;';
                }
                else{
                    topNavDom[i].style='color: #3D4966;border-bottom:none;';
                }
            }
        }
        else if(selectText == '负面'){
            this.evaluateCategory = 2;
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 3){
                    topNavDom[i].style='border-bottom: 2px #03A971 solid;color: #03A971;padding-bottom: 15.5px;';
                }
                else{
                    topNavDom[i].style='color: #3D4966;border-bottom:none;';
                }
            }
        }
        this.search();
    },
    selectFnType(e){  
        var selectText = e.target.innerText;
        var topNavDom = this.$refs.bottom_content_left.childNodes;
        console.log(selectText)
        if(selectText == '产品'){
            this.CategoryType = '产品';
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 0){
                    topNavDom[i].style='background-color: rgba(242,244,247,0.5);';
                }
                else{
                    topNavDom[i].style='background-color:none;';
                }
            }
        }
        else if(selectText == '运营'){
            this.CategoryType = '运营';
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 1){
                    topNavDom[i].style='background-color: rgba(242,244,247,0.5);';
                }
                else{
                    topNavDom[i].style='background-color:none;';
                }
            }
        }
        else if(selectText == '物流'){
            this.CategoryType = '物流';
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 2){
                    topNavDom[i].style='background-color: rgba(242,244,247,0.5);';
                }
                else{
                    topNavDom[i].style='background-color:none;';
                }
            }
        }
        else if(selectText == '其他'){
            this.CategoryType = '其他';
            for(var i = 0;i < topNavDom.length;i++){
                if(i == 3){
                    topNavDom[i].style='background-color: rgba(242,244,247,0.5);';
                }
                else{
                    topNavDom[i].style='background-color:none;';
                }
            }
        }
        this.search();
    },
    initPlatForm(){
        var baseUrl = window.config.url+'/insight';
        this.$axios({
            method: "get",
            url: baseUrl + "/product/queryPlateForm",
        }).then(res=>{
            if(res.status == 200){
                var platFormData = res.data.data;
                var platformListArr = [];
                for(var i = 0; i < platFormData.length;i++){
                    platformListArr.push({
                        value:platFormData[i],
                        label:platFormData[i]
                    });
                }
                platformListArr.unshift({
                    value:'',
                    label:'所有'
                });
                this.platformList = platformListArr;
            }
        }).catch(err=>{
            console.log(err)
        });
    },
    changePlatform(pl){
        console.log(pl);
        var baseUrl = window.config.url+'/insight';
        this.$axios({
            method: "get",
            url: baseUrl + "/product/queryStore",
            params:{
                platForm:pl
            }
        }).then(res=>{
            if(res.status == 200){
                var shopList = res.data.data;
                var storList = [];
                for(var i = 0;i < shopList.length;i++){
                    storList.push({
                        value: shopList[i],
                        label: shopList[i]
                    })
                }
                this.shopList = storList;
            }
        }).catch(err=>{
            console.log(err)
        });
    },
    showWordModel(arg){
        if(arg == 'ema'){
            this.ifShowEmat = true;
        }
        else if(arg == 'wor'){
            this.ifShowClTi = true;
        }
    },
    hideWordModel(arg){
        if(arg == 'ema'){
            this.ifShowEmat = false;
        }
        else if(arg == 'wor'){
            this.ifShowClTi = false;
        }
    }
}
}
</script>

<style scoped lang='less'>
.elevation_info_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .menu_container{
        width: 100%;
        height: 80px;
        background: #FFFFFF;
        box-shadow: 0 3px 6px 0 #F2F4F7;
        display: flex;
        align-items: center;
        justify-content: center;
        .menu{
            width: 1200px;
            height: 100%;
            span:nth-child(1){
                font-size: 16px;
                color: #121C33;
                letter-spacing: 0;
                line-height: 80px;
            }
            span:nth-child(2){
                font-size: 16px;
                color: #B8BECC;
                letter-spacing: 0;
                line-height: 80px;
            }
        }
        .menu:hover{
            cursor: pointer;
        }
    }
    .content_container{
        width: 100%;
        background-color: #F5F6F7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 60px;
        box-sizing: border-box;
        .search_area{
            width: 1200px;
            height: 160px;
            background-color: #FFFFFF;
            margin-bottom: 20px;
            padding: 30px;
            box-sizing: border-box;
            .top{
                width: 100%;
                height: 40px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left,.middle{
                    width: 312px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 10px;
                    }
                }
                .right{
                    width: 428px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 10px;
                    }
                    .ivu-date-picker{
                        width: 175px !important;
                        height: 40px !important;
                        background: #FFFFFF !important;
                        display: flex;
                        align-items: center;
                    }
                }
            }
            .bottom{
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left,.middle{
                    width: 312px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 10px;
                    }
                }
                .right{
                    width: 428px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 10px;
                    }
                    .search_btn{
                        width: 88px;
                        height: 40px;
                        margin-left: 28px;
                        background: #03A971;
                        border-radius: 3px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 14px;
                        color: #FFFFFF;
                    }
                    .search_btn:hover{
                        cursor: pointer;
                    }
                }
            }
        }
        .product_show_zhexian_area{
            width: 1200px;
            height: 661px;
            background-color: #FFFFFF;
            margin-bottom: 20px;
            padding: 30px;
            box-sizing: border-box;
            .top_nav{
                padding-bottom: 13px;
                border-bottom: 1px #EBECF0 solid;
                span{
                    margin-right: 74px;
                    font-size: 16px;
                    color: #3D4966;
                    letter-spacing: 0;
                    line-height: 14px;
                }
                span:nth-child(1){
                    font-size: 16px;
                    color: #03A971;
                    letter-spacing: 0;
                    line-height: 14px;
                    border-bottom: 2px #03A971 solid;
                    padding-bottom: 15.5px;
                    box-sizing: border-box;
                }
            }
            .bottom_content{
                width: 100%;
                display: flex;
                align-items: flex-start;
                margin-top: 30px;
                .bottom_content_left{
                    width: 120px;
                    margin-right: 10px;
                    div{
                        width: 100%;
                        height: 36px;
                        text-align: center;
                        border: 1px solid #F2F4F7;
                        font-size: 16px;
                        color: #7A8499;
                        letter-spacing: 0;
                        line-height: 36px;
                        margin-bottom: 10px;
                    }
                }
                .bottom_content_right{
                    width: 1010px;
                    height: 527px;
                    // background-image: url('../../assets/images/insightData/zhexian.png');
                    // background-size: 100% 100%;
                }
            }
        }
        .emation_container{
            width: 1200px;
            height: 543px;
            background-color: #fff;
            margin-bottom: 20px;
            padding: 0 30px;
            box-sizing: border-box;
            .emation_title{
                width: 100%;
                height: 75px;
                line-height: 75px;
                font-size: 22px;
                color: #121C33;
                letter-spacing: 0;
                border-bottom: #F2F4F7 2px solid;
                margin-bottom: 71px;
                position: relative;
                .why_icon{
                    width: 16.5px;
                    height: 16.5px;
                    margin-left: 12.8px;
                }
                .emation_title_model{
                    position: absolute;
                    left: 82px;
                    top: 57px;
                    width: 259px;
                    height: auto;
                    padding: 15px 10px 10px 10px;
                    box-sizing: border-box;
                    background: #3E4B59;
                    box-shadow: 0 2px 14px 0 #B8BECC;
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    line-height: 18px;
                    text-align: justify;
                }
            }
            .zhutu_container{
                width: 100%;
                height: 388px;
            }
        }
        .word_cloud_container{
            width: 1200px;
            background-color: #fff;
            margin-bottom: 20px;
            padding: 0 30px;
            box-sizing: border-box;
            .word_cloud_title{
                width: 100%;
                height: 75px;
                line-height: 75px;
                font-size: 22px;
                color: #121C33;
                letter-spacing: 0;
                border-bottom: #F2F4F7 2px solid;
                margin-bottom: 30px;
                position: relative;
                .why_icon{
                    width: 16.5px;
                    height: 16.5px;
                    margin-left: 12.8px;
                }
                .wordClodTitle{
                    position: absolute;
                    left: 82px;
                    top: 57px;
                    width: 259px;
                    height: auto;
                    padding: 15px 10px 10px 10px;
                    box-sizing: border-box;
                    background: #3E4B59;
                    box-shadow: 0 2px 14px 0 #B8BECC;
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    line-height: 18px;
                    text-align: justify;
                    z-index: 99;
                }
            }
            .word_cloud_echarts{
                width: 100%;
                height: 271px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .ciItem_contanier{
                    width: 262px;
                    height:100%;
                    position: relative;
                    .bottom_title{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 39px;
                        background: rgba(0,0,0,0.64);
                        text-align: center;
                        font-size: 16px;
                        color: #FFFFFF;
                        letter-spacing: 0;
                        line-height: 39px;
                        z-index: 99;
                    }
                    .word_cloud{
                        width: 100%;
                        height: 100%;
                        margin-bottom: 20px;
                    }
                }
            }
        }
        .pinlun_area{
            width: 1200px;
            background-color: #FFFFFF;
            margin-bottom: 80px;
            padding: 30px;
            box-sizing: border-box;
            .pinlun_title{
                width: 100%;
                height: 30px;
                margin-bottom: 30px;
                font-size: 22px;
                color: #121C33;
                letter-spacing: 0;
            }
            .pinlun_table{
                width: 100%;
                /deep/.ivu-table-wrapper{
                    /deep/.ivu-table-stripe{
                        /deep/.ivu-table-header{
                            table{
                                border-spacing: 0px 0px !important;
                            }
                        }
                        /deep/.ivu-table-body{
                            table{
                                border-spacing: 0px 0px !important;
                            }
                        }
                        /deep/.ivu-table-tip{
                            table{
                                border-spacing: 0px 0px !important;
                            }
                        }
                    }
                }
                /deep/.commentsClass{
                    width: 90%;
                    .ivu-table-cell{
                        span{
                            display: block;
                            height:46px;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
}
</style>
