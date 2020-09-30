<template>
  <div class="ciyun_fenlei_result_container">
    <div class="ciyun_fenlei_result_left" ref="ciyunBtn">
      <div class="ciyun_fenlei_result_tubiao" @click="ciyunResultBtn(0)">样式1</div>
      <div class="ciyun_fenlei_result_wenben" @click="ciyunResultBtn(1)">样式2</div>
    </div>
    <div class="ciyun_fenlei_result_right">
      <div class="ciyun_fenlei_result_right_tubiao" v-if="ifShowCyun1">
        <div class="biaoge">
          <div class="biaoge_content">
        <vxe-table
            border
            align="center"
            max-height="335"
            highlight-hover-row
            show-overflow
            ref="xTable"
            @checkbox-all="selectAllEvent"
            @checkbox-change="zuanshiTableCheck"
            :data="zuanshiTableData">  
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column field="keyWord" title="关键词"></vxe-table-column>
            <vxe-table-column field="ciXing" title="词性"  :filters="[{ data: '' }]" :filter-method="filterCateMethod">
               <template v-slot:filter="{ $panel, column }">
                    <vxe-checkbox-group class="my-checkbox" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                      <vxe-checkbox class="checkbox_item" v-for="(item, cIndex) in filterList1" :key="cIndex" :label="item.label" :content="item.label"></vxe-checkbox>
                    </vxe-checkbox-group>
                </template>
            </vxe-table-column>
            <vxe-table-column field="ciPin" title="词频"  :filters="[{ data: '' }]" :filter-method="cipinfilterCateMethod">
               <template v-slot:filter="{ $panel, column }">
                    <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                        <option v-for="(item, cIndex) in cipinfilterList" :key="cIndex" :value="item.label">{{ item.label }}</option>
                    </select>
                </template>
            </vxe-table-column>
        </vxe-table>


          </div>
          <div class="biaoge_footer">
            已选择
            <span>{{zuanshiNum}}</span>个关键词
          </div>
          <div class="shengc_btn" @click="createZuanshiWoCloud">生成词云</div>
        </div>
        <div class="ciyun" id="zuanshiCiyunId"></div>
        <div class="setting" @click="settingFn">
          <img :src="setingImg" class="settingIMG">
          设置
        </div>
      </div>
      <div class="ciyun_fenlei_result_right_wenben" v-if="ifShowCyun2">
        <div class="biaoge">
          <div class="biaoge_content">
        <vxe-table
            border
            align="center"
            max-height="335"
            highlight-hover-row
            show-overflow
            ref="xTable1"
            @checkbox-all="selectAllEvent1"
            @checkbox-change="zuanshiTableCheck1"
            :data="chinaTableData">  
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column field="keyWord" title="关键词"></vxe-table-column>
            <vxe-table-column field="ciXing" title="词性"  :filters="[{ data: '' }]" :filter-method="filterCateMethod1">
               <template v-slot:filter="{ $panel, column }">
                    <vxe-checkbox-group class="my-checkbox" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                      <vxe-checkbox class="checkbox_item" v-for="(item, cIndex) in filterList2" :key="cIndex" :label="item.label" :content="item.label"></vxe-checkbox>
                    </vxe-checkbox-group>
                </template>
            </vxe-table-column>
            <vxe-table-column field="ciPin" title="词频"  :filters="[{ data: '' }]" :filter-method="cipinfilterCateMethod1">
               <template v-slot:filter="{ $panel, column }">
                    <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                        <option v-for="(item, cIndex) in cipinfilterList" :key="cIndex" :value="item.label">{{ item.label }}</option>
                    </select>
                </template>
            </vxe-table-column>
        </vxe-table>


          </div>
          <div class="biaoge_footer">
            已选择
            <span>{{chinaWordNum}}</span>个关键词
          </div>
          <div class="shengc_btn" @click="createChinaWoCloud">生成词云</div>
        </div>
        <div class="ciyun" id="dituCiyunId"></div>
        <div class="setting" @click="settingFn">
          <img :src="setingImg" class="settingIMG">
          设置
        </div>
      </div>
      <div class="fenci_result_daochu_btn_container">
        <div class="fenci_result_daochu_btn" @click="exportResult">
          <img :src="daochuImg" class="daochuImg" />
          分词结果导出
        </div>
      </div>
    </div>

    <div class="filter_model" v-if="ifShowModel">
      <Spin fix v-if="isloading">
        <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
        <div>{{loadingText}}</div>
      </Spin>
      <div class="filter_content_container">
        <div class="fenci_title">
          数据分词
          <span class="close_model" @click="closeModel">x</span>
        </div>
        <div class="filter_content">
          <div class="filter_content_left">
            <div class="cixing_filter_title">根据词性过滤</div>
            <div class="cixing_item_container">
              <div class="cixing_item_left" ref="cixingTitleDom">
                  <CheckboxGroup @on-change='chioiceCixing' v-model='choiceArr'>
                      <Checkbox v-for="(item,index) in cixingArr" :key="index" :label="item"></Checkbox>
                  </CheckboxGroup>
              </div>
              <div class="cixing_item_right">
                <CheckboxGroup v-model="checkCixingArr">
                    <Checkbox v-for="(item,index) in wordArr" :key="index" :label="item.name+item.value" disabled></Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          <div class="filter_content_right">
            <div class="cixing_filter_title">根据词频过滤（只显示数量大于1的词语）</div>
            <div class="cipin_item_container">
                <CheckboxGroup v-model="checkCiPinArr">
                    <Checkbox v-for="(item,index) in wordArr" :key="index" :label="item.name+item.value" disabled></Checkbox>
                </CheckboxGroup>
            </div>
          </div>
        </div>
        <div class="filter_btn_container">
          <div class="filter_btn_left">
            <span class="filter_label">过滤</span>
            <CheckboxGroup v-model="filterValue" @on-change="checkGroupChange">
                <Checkbox label="忽略数量为1的词语"></Checkbox>
                <Checkbox label="去除停用词"></Checkbox>
                <!-- <Checkbox label="删除数字"></Checkbox> -->
            </CheckboxGroup>
          </div>
          <!-- <div class="filter_btn_right">
            <span class="filter_label">重复设置</span>
            <RadioGroup v-model="repeatSet">
                <Radio label="自动识别"></Radio>
                <Radio label="全部重复"></Radio>
                <Radio label="不重复"></Radio>
            </RadioGroup>
          </div> -->
        </div>
        <!-- <div class="down_load_container">下载内容到本地</div> -->
        <div class="oper_btn_container">
          <div class="oper_btn_content">
            <div class="oper_btn_content_left"  @click="closeModel">取消</div>
            <div class="oper_btn_content_right" @click="createWordCloud">生成词云</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      ifShowCyun1: false,
      ifShowCyun2: false,
      daochuImg: require("../../assets/images/nlp/daochu.png"),
      setingImg: require("../../assets/images/nlp/setting.png"),
      showBorder: true,
      showStripe: false,
      showHeader: true,
      fixedHeader: true,
      tableSize: "default",
      chinaTableData: [],
      zuanshiTableData:[],
      filterValue:['忽略数量为1的词语','去除停用词'],
      repeatSet:'',
      ifShowModel:false,
      cixingArr:[],
      checkCixingArr:[],
      checkCiPinArr:[],
      wordArr:[],
      ciyunData:null,
      choiceArr:[],
      chinaWordNum:'0',
      zuanshiNum:'0',
      zuanshiBgToCloud:[],
      chinaBgToCloud:[],
      loadingText:'数据筛选中...',
      isloading:true,
      filterList1:[],
      filterList2:[],
      cipinfilterList:[
        {label: 'top20', value: 20}, 
        {label: 'top30', value: 30},
        {label: 'top50', value: 50},
        {label: 'top100', value: 100}
      ],
      count:0
    };
  },
  props: ["ciyunChildData",'sceneText'],
  created(){
    this.initModelData(undefined);
    this.ifShowModel = true;
  },  
  mounted() {
    this.setCixingTitle();
  },
  methods: {
    filterCateMethod({ option, row }){
        if(this.$refs.xTable){
          this.$refs.xTable.setAllCheckboxRow(false);
          let selectRecords = this.$refs.xTable.getCheckboxRecords();
          this.zuanshiNum = selectRecords.length;
          if(option.data.length == 0){
            return row.ciXing
          }
          else{
            return option.data.includes(row.ciXing);
          }
        }
        else{
            option.checked=false;
            option.data=[];
            return row.ciXing
        }
    },
    filterCateMethod1({ option, row }){
      if(this.$refs.xTable1){
        this.$refs.xTable1.setAllCheckboxRow(false);
        let selectRecords = this.$refs.xTable1.getCheckboxRecords();
        this.chinaWordNum = selectRecords.length;
        if(option.data.length == 0){
          return row.ciXing
        }
        else{
          return option.data.includes(row.ciXing);
        }
      }
      else{
            option.checked=false;
            option.data=[];
            return row.ciXing
      }
    },
    cipinfilterCateMethod({ option, row }){
      if(this.$refs.xTable){
        this.count ++ ;
        row.id = this.count;
        this.$refs.xTable.setAllCheckboxRow(false);
        let selectRecords = this.$refs.xTable.getCheckboxRecords();
        this.zuanshiNum = selectRecords.length;
        setTimeout(()=>{
          this.count=0;
        },1400);
        if(option.data == 'top20'){
          return row.id <= 20
        }
        else if(option.data == 'top30'){
          return row.id <= 30
        }
        else if(option.data == 'top50'){
          return row.id <= 50
        }
        else if(option.data == 'top100'){
          return row.id <= 100
        }
      }
      else{
            option.checked=false;
            option.data=[];
            return row;
      }
    },
    cipinfilterCateMethod1({ option, row }) {
      if(this.$refs.xTable1){
        this.count ++ ;
        row.id = this.count
        this.$refs.xTable1.setAllCheckboxRow(false);
        let selectRecords = this.$refs.xTable1.getCheckboxRecords();
        this.chinaWordNum = selectRecords.length;
        setTimeout(()=>{
          this.count=0;
        },1400);
        if(option.data == 'top20'){
          return row.id <= 20
        }
        else if(option.data == 'top30'){
          return row.id <= 30
        }
        else if(option.data == 'top50'){
          return row.id <= 50
        }
        else if(option.data == 'top100'){
          return row.id <= 100
        }
      }
      else{
            option.checked=false;
            option.data=[];
            return row; 
      }
    },
    zuanshiTableCheck(){
      let selectRecords = this.$refs.xTable.getCheckboxRecords();
      this.zuanshiNum = selectRecords.length;
    },
    zuanshiTableCheck1(){
      let selectRecords = this.$refs.xTable1.getCheckboxRecords();
      this.chinaWordNum = selectRecords.length;
    },
    selectAllEvent(){
      let selectRecords = this.$refs.xTable.getCheckboxRecords();
      this.zuanshiNum = selectRecords.length;
    },
    selectAllEvent1(){
      let selectRecords = this.$refs.xTable1.getCheckboxRecords();
      this.chinaWordNum = selectRecords.length;
    },
    createZuanshiWoCloud(){
      let selectRecords = this.$refs.xTable.getTableData().tableData;
      let removeRecords = this.$refs.xTable.getCheckboxRecords();
      let dimonData;
      if(removeRecords.length > 0){
        dimonData = removeRecords;
      }
      else{
        dimonData = selectRecords;
      }
      console.log(dimonData,'dimonData')
      let totalData = [];
      dimonData.forEach((item,index)=>{
        if(item.name){
          totalData.push({
            name:item.name,
            value:item.value
          })
        }
        else{
          totalData.push({
            name:item.keyWord,
            value:item.ciPin
          })
        }
      });
      console.log(totalData,'totalData')
      this.initWordCloud(totalData);
    },
    createChinaWoCloud(){
      let selectRecords = this.$refs.xTable1.getTableData().tableData;
      let removeRecords = this.$refs.xTable1.getCheckboxRecords();
      let dimonData;
      if(removeRecords.length > 0){
        dimonData = removeRecords;
      }
      else{
        dimonData = selectRecords;
      }
      console.log(dimonData,'中国')
      let totalData = [];
      dimonData.forEach((item,index)=>{
        totalData.push({
          name:item.keyWord,
          value:item.ciPin
        })
      });
      this.initChinaWordCloud(totalData);
    },
    ciyunResultBtn(arg) {
      var that = this;
      let ciyunBtnDom = this.$refs.ciyunBtn.children || [];
      for (var i = 0; i < ciyunBtnDom.length; i++) {
        if (arg == i) {
          ciyunBtnDom[i].style =
            "color: #03A971;background:rgba(3,169,113,0.1);border:none;";
        } else {
          ciyunBtnDom[i].style =
            "color: #7A8499;background: none !important;border: 1px solid #F2F4F7;";
        }
      }
      if (arg == 0) {
        this.ifShowCyun1 = true;
        this.ifShowCyun2 = false;
        this.$nextTick(()=>{
          that.$refs.xTable.setAllCheckboxRow(true);
          let selectRecords = that.$refs.xTable.getCheckboxRecords();
          that.zuanshiNum = selectRecords.length;
          that.initWordCloud(that.wordArr);
        });
      } else {
        this.ifShowCyun1 = false;
        this.ifShowCyun2 = true;
        this.$nextTick(()=>{
          that.$refs.xTable1.setAllCheckboxRow(true);
          let selectRecords = that.$refs.xTable1.getCheckboxRecords();
          that.chinaWordNum = selectRecords.length;
          that.initChinaWordCloud(that.wordArr);
        });
      }
    },
    initWordCloud(diData) {
      //钻石类型词云
      function unique(arr1) {
        const res = new Map();
        return arr1.filter((a) => !res.has(a.name) && res.set(a.name, 1))
      }
      var echarts = require("echarts");
      let data = unique(diData).slice(0,100) || [];
      var ciyunChart = echarts.init(document.getElementById("zuanshiCiyunId"));
      var ciyunOption = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 1,
            shape: "diamond",
            sizeRange: [12, 40],
            width: "150%",
            height: "150%",
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };
      ciyunChart.setOption(ciyunOption);  
    },
    initChinaWordCloud(chinaData){
     //中国地图类型词云
      function unique(arr1) {
        const res = new Map();
        return arr1.filter((a) => !res.has(a.name) && res.set(a.name, 1))
      }
      var echarts = require("echarts");
      var data = unique(chinaData).slice(0,100) || [];
      var maskImage = new Image();
      var myChart = echarts.init(document.getElementById("dituCiyunId"));
      var option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            sizeRange: [10, 100],
            rotationRange: [-90, 90],
            gridSize: 1,
            // // sizeRange: [10, 90],
            // rotationRange: [-90, 90],
            // rotationStep: 45,
            left: 'center',
            top: 'center',
            width: '90%',
            height: '140%',
            right: 0,
            shape: "pentagon",
            maskImage: maskImage,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                color: "red",
              },
            },
            data: data,
          },
        ],
      };
      console.log(option)
      maskImage.src = require("../../assets/images/nlp/china.png");
      maskImage.width='100%';
      maskImage.height='100%';
      maskImage.onload = function () {
        myChart.setOption(option);
      };
    },
    closeModel(){
      this.ifShowModel = false;
    },
    exportResult(){
      var fenxiText = this.sceneText || "";
      var finalText = fenxiText.replace(/[\r\n]/g, "").replace(/\s*/g, "");
      var baseUrl = 'https://test.yzsmart.top:38443';
      var self = this;
      this.$axios({
        method: "post",
        url: baseUrl + "/ai/jnlp/export",
        responseType: 'blob',
        data: {
          sentence: finalText
        }
      })
        .then((res) => {
            var eleLink = document.createElement('a');
            eleLink.download = "分词结果.xls"; 
            eleLink.style.display = 'none'
            var blob = new Blob([res.data],{type: 'application/vnd.ms-excel'}); 
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink); 
            eleLink.click(); 
            document.body.removeChild(eleLink); 
            console.log(res,'res')
        })
        .catch((err) => {
          this.$Message.error("导出失败!");
        });
    },
    initModelData(arg){
      var fenxiText = this.sceneText || "";
      var finalText = fenxiText.replace(/[\r\n]/g, "").replace(/\s*/g, "");
      var ceshiBaseUrl = window.config.url;
      var stopWord,number;
      var filterArr;
      var self = this;
      if(arg == undefined){
        filterArr = this.filterValue;
      }
      else{
        filterArr = arg;
      }
      if(filterArr.includes('忽略数量为1的词语')){
        number = 1;
      }
      else{
        number = 0;
      }

      if(filterArr.includes('去除停用词')){
        stopWord = 1;
      }
      else{
        stopWord = 0;
      }
      this.$axios({
        method: "post",
        url: ceshiBaseUrl + "/ai/jnlp/participleByWordCount",
        data: {
          sentence: finalText,
          stopWord:stopWord,
          number:number
        },
      }).then(res=>{
          let resultData = res.data;
          if (resultData.code == 200000) {
            self.choiceArr = [];
            let totalData = resultData.data;
            this.ciyunData = totalData;
            let initChoiceArr = [];
            totalData.forEach((item)=>{  
              if(['名词','形容词','人名','地名'].includes(item.word)){
                initChoiceArr.push(item.word)
              }
            });
            self.choiceArr = initChoiceArr.length > 0 ? initChoiceArr : [];
            let operArr = totalData || [];
            let cixingArr1 = [];
            for(var i=0;i<operArr.length;i++){
              cixingArr1.push(operArr[i].word)
            }
            this.cixingArr = cixingArr1;
            setTimeout(()=>{
              this.chioiceCixing();
            },500);
          } else {
            self.$Message.error("计算失败!");
          }
      }).catch(err=>{
        self.$Message.error("计算失败!");
      });
    },
    checkGroupChange(e){
      this.initModelData(e)
    },
    setCixingTitle(){
      let setCixingTitleDom = this.$refs.cixingTitleDom.children[0].children || [];
      for(var i=0;i<setCixingTitleDom.length;i++){
        setCixingTitleDom[i].setAttribute('title',setCixingTitleDom[i].children[1].innerText);
      }
    },
    chioiceCixing(arg){
      this.isloading = true;
      let ciyunData = this.ciyunData || [];
      let choiceArr = !arg ? this.choiceArr : arg;
      let filters1 = [];
      let filters2 = [];
      choiceArr.forEach((item,index)=>{
        filters1.push({
          label:item,
          value:item
        });
      });
      filters2 = JSON.parse(JSON.stringify(filters1));
      this.filterList1 = filters1;
      this.filterList2 = filters2;
      this.wordArr = [];
      var WordArr1 = [];
      var sortWordArr = [];
      var compare = (property) => {
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value2 - value1;
          }
      }
      if(choiceArr.length == 0){
        this.wordArr = [];
        this.isloading = false;
        return;
      }
      let filterDataArr = [];
      for(var i=0;i<choiceArr.length;i++){
        for(var j=0;j<ciyunData.length;j++){
          if(choiceArr[i] == ciyunData[j].word){
            filterDataArr.push({
              cixing:ciyunData[j].word,
              wordDetail:ciyunData[j].wordMap
            })
          }
        }
      }

      for(var k=0;k<filterDataArr.length;k++){
        for(var attr in filterDataArr[k]){
          for(var attr1 in filterDataArr[k]['wordDetail']){
            WordArr1.push({
              name:attr1,
              value:filterDataArr[k]['wordDetail'][attr1],
              cixing:filterDataArr[k]['cixing']
            });
          }
        }
      }
      sortWordArr = WordArr1.sort(compare('value'));
      this.wordArr = sortWordArr;
      let operDataArr = this.wordArr;
      operDataArr.forEach((item,index)=>{
        this.checkCixingArr.push(item.name + item.value);
        this.checkCiPinArr.push(item.name + item.value);
      })

      setTimeout(()=>{
        this.isloading = false;
      },800);

    },
    createWordCloud(){
      let operDataArr = this.wordArr;
      this.ciyunResultBtn(0)
      var tableData = [];
      operDataArr.forEach((item,index)=>{
        tableData.push({
          keyWord:item.name,
          ciXing:item.cixing,
          ciPin:Number(item.value)
        });
      });
      function unique(arr1) {
        const res = new Map();
        return arr1.filter((a) => !res.has(a.keyWord) && res.set(a.keyWord, 1))
      }
      function unique1(arr1) {
        const res = new Map();
        return arr1.filter((a) => !res.has(a.label) && res.set(a.label, 1))
      }
      if(tableData.length >= 100){
        this.chinaTableData = unique(tableData).slice(0,100);
        this.zuanshiTableData = JSON.parse(JSON.stringify(this.chinaTableData))
        this.chinaWordNum = 100;
      }
      else{
        this.chinaTableData = unique(tableData);
        this.zuanshiTableData = JSON.parse(JSON.stringify(this.chinaTableData))
        this.chinaWordNum = this.zuanshiTableData.length; 
      }
      this.$nextTick(()=>{
        this.$refs.xTable.setAllCheckboxRow(true);
        let selectRecords = this.$refs.xTable.getCheckboxRecords();
        this.zuanshiNum = selectRecords.length;
      });
      setTimeout(()=>{
        this.ifShowModel = false;
      },800);
    },
    settingFn(){
      this.ifShowModel = true;
    }
  },
};
</script>
<style lang="less">
.ciyun_fenlei_result_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  .ciyun_fenlei_result_left {
    width: 120px;
    .ciyun_fenlei_result_tubiao {
      width: 100%;
      height: 36px;
      background: rgba(3, 169, 113, 0.1);
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #03a971;
      letter-spacing: 0;
      text-align: center;
      line-height: 36px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .ciyun_fenlei_result_wenben {
      width: 100%;
      height: 36px;
      border: 1px solid #f2f4f7;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7a8499;
      letter-spacing: 0;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }
  }
  .ciyun_fenlei_result_right {
    width: 1070px;
    .ciyun_fenlei_result_right_tubiao {
      width: 100%;
      height: 496px;
      background: rgba(242, 244, 247, 0.5);
      display: flex;
      align-items: center;
      padding: 40px;
      box-sizing: border-box;
      position: relative;
      .biaoge {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .biaoge_content {
          width: 100%;
          height: 336px;
          .my-checkbox{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 10px;
              .checkbox_item{
                width: 100%;
                height: 22px;
                display: block; 
                margin: 0;
              }
          }
          .my-select {
              margin: 10px;
              width: 100px;
              height: 32px;
              border:1px solid #000;
          }
        }
        .biaoge_footer {
          width: 100%;
          height: 50px;
          background: #f2f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Semibold;
          font-size: 12px;
          color: #3d4966;
          line-height: 22px;
          span {
            font-size: 16px;
            color: #03a971;
          }
        }
        .shengc_btn {
          width: 88px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
          background: #03a971;
          border-radius: 3px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .ciyun {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .setting{
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #03A971;
        text-align: center;
        &:hover{
          cursor: pointer;
        }
        .settingIMG{
          width: 18px;
        }
      }
    }
    .ciyun_fenlei_result_right_wenben {
      width: 100%;
      height: 496px;
      background: rgba(242, 244, 247, 0.5);
      display: flex;
      align-items: center;
      padding: 40px;
      box-sizing: border-box;
      position: relative;
      .biaoge {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .biaoge_content {
          width: 100%;
          height: 336px;
          .my-checkbox{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 10px;
              .checkbox_item{
                width: 100%;
                height: 22px;
                display: block; 
                margin: 0;
              }
          }
          .my-select {
              margin: 10px;
              width: 100px;
              height: 32px;
              border:1px solid #000;
          }
        }
        .biaoge_footer {
          width: 100%;
          height: 50px;
          background: #f2f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Semibold;
          font-size: 12px;
          color: #3d4966;
          line-height: 22px;
          span {
            font-size: 16px;
            color: #03a971;
          }
        }
        .shengc_btn {
          width: 88px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
          background: #03a971;
          border-radius: 3px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .ciyun {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .setting{
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #03A971;
        text-align: center;
        &:hover{
          cursor: pointer;
        }
        .settingIMG{
          width: 18px;
        }
      }
    }
    .fenci_result_daochu_btn_container {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      cursor: pointer;
      .fenci_result_daochu_btn {
        width: 153px;
        height: 42px;
        background: #03a971;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        &:hover{
          cursor: pointer;
        }
        .daochuImg {
          width: 13.2px;
          height: 12.2px;
          margin-right: 3px;
        }
      }
    }
  }

  .filter_model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 22;
    background-color: rgba(32,32,32,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .filter_content_container{
      width: 800px;
      height: 80.5%;
      padding-bottom: 30px;
      box-sizing: border-box;
      overflow: scroll;
      background-color: #ffffff;
      border: 1px solid #F2F4F7;
      border-radius: 4px;
      .fenci_title{
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #F2F4F7;
        position: relative;
        padding-left: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #121C33;
        font-weight: 550;
        .close_model{
          position: absolute;
          top: 1%;
          right: 1%;
          font-size: 16px;
          color: #7A8499;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .filter_content{
        width: 100%;
        margin-top: 30px;
        height: 66.5%;
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        box-sizing: border-box;
        .filter_content_left{
          width: 295px;
          height: 100%;
          background: #FFFFFF;
          border: 1px solid #B8BECC;
          border-radius: 4px;
          padding: 14px 20px;
          box-sizing: border-box;
          .cixing_filter_title{
            width: 100%;
            margin-bottom: 20px;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #121C33;
            text-align: center;
            line-height: 18px;
            font-weight: 550;
          }
          .cixing_item_container{
            width: 100%;
            height: 94%;
            display: flex;
            .cixing_item_left{
              width: 100px;
              height: 94%;
              overflow: scroll;
              margin-right: 20px;
              /deep/.ivu-checkbox-group{
                /deep/.ivu-checkbox-wrapper{
                  width: 100%;
                  height: 30px;
                  background: #F2F4F7;
                  display: flex;
                  align-items: center;
                  padding-left: 10px;
                  box-sizing: border-box;
                  span:nth-child(2){
                    width: 45px;
                    height: 22px;
                    overflow: hidden;
                  }
                  border-bottom: rgba(0,0,0,0.06) 1px solid;
                  /deep/.ivu-checkbox-checked{
                    /deep/.ivu-checkbox-inner{
                      border-color: #03A971;
                      background-color:#03A971;
                    }
                  }
                  .ivu-checkbox{
                    margin-right: 6.5px;
                  }
                }
              }
            }
            .cixing_item_right{
              flex: 1;
              height: 94%;
              overflow: scroll;
              /deep/.ivu-checkbox-group{
                /deep/.ivu-checkbox-wrapper{
                  width: 100%;
                  height: 30px;
                  overflow: hidden;
                  display: flex;
                  align-items: center;
                  padding-left: 10px;
                  box-sizing: border-box;
                  span:nth-child(2){
                    width: 64px;
                    word-break: keep-all;
                    overflow: hidden;
                  }
                  /deep/.ivu-checkbox-checked{
                    /deep/.ivu-checkbox-inner{
                      border-color: #03A971;
                      background-color:#03A971;
                    }
                  }
                  .ivu-checkbox{
                    margin-right: 6.5px;
                  }
                }
              }
            }
          }
        }
        .filter_content_right{
          width: 425px;
          height: 100%;
          background: #FFFFFF;
          border: 1px solid #B8BECC;
          border-radius: 4px;
          padding: 14px 20px;
          box-sizing: border-box;
          .cixing_filter_title{
            width: 100%;
            margin-bottom: 20px;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #121C33;
            text-align: center;
            line-height: 18px;
            font-weight: 550;
          }
          .cipin_item_container{
            width: 100%;
            height: 91%;
            overflow: scroll;
            /deep/.ivu-checkbox-group{
              display: flex;
              flex-wrap: wrap;
              /deep/.ivu-checkbox-wrapper{
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                /deep/.ivu-checkbox-checked{
                  /deep/.ivu-checkbox-inner{
                    border-color: #03A971;
                    background-color:#03A971;
                  }
                }
                .ivu-checkbox{
                  margin-right: 6.5px;
                }
              }
            }
          }
        }
      }
      .filter_btn_container{
        width: 100%;
        margin-top: 20px;
        padding: 0 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .filter_btn_left{
          width: 54%;
          display: flex;
          .filter_label{
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #121C33;
            line-height: 18px;
            margin-right: 21px;
            font-weight: 550;
          }
          /deep/.ivu-checkbox-group{
              /deep/.ivu-checkbox-wrapper{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #3D4966;
                line-height: 16px;
                /deep/.ivu-checkbox-checked{
                  /deep/.ivu-checkbox-inner{
                    border-color: #03A971;
                    background-color:#03A971;
                  }
                }
              }
          }

        }
        .filter_btn_right{
          width: 44%;
          display: flex;
          .filter_label{
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #121C33;
            line-height: 18px;
            margin-right: 21px;
            font-weight: 550;
          }
          /deep/.ivu-radio-group{
              /deep/.ivu-radio-wrapper{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #3D4966;
                line-height: 16px;
                /deep/.ivu-radio-checked{
                  /deep/.ivu-radio-inner{
                    border-color: #03A971;
                  }
                  /deep/.ivu-radio-inner:after {
                    background-color: #03A971;
                  }
                }
              }
          }
        }
      }
      .down_load_container{
        width: 100%;
        margin-top: 18px;
        padding-left: 30px;
        box-sizing: border-box;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #03A971;
        line-height: 18px;
      }
      .oper_btn_container{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 40px;
        .oper_btn_content{
          width: 197px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .oper_btn_content_left{
            width: 65px;
            height: 100%;
            border: 1px solid #B8BECC;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.65);
            &:hover{
              cursor: pointer;
            }
          }
          .oper_btn_content_right{
            width: 124px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #03A971;
            border-radius: 2px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
  }


}
</style>