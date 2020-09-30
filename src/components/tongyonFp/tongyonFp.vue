<template>
  <div class="experience">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>识别中...</div>
    </Spin>

    <div class="total_title">通用发票识别</div>
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
              ref="upload"
              :show-upload-list="false"
              type="drag"
              :before-upload="handleBeforeUpload4"
              :max-size="10240"
              style="width:100%;height:100%"
              action=''
              multiple="true"
              :format="['jpg','jpeg','png','bmp']"
              accept="image/png, image/jpeg, image/jpg, image/bmp"
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic4" alt />
                </div>
                <div class="intro">
                  <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过10M</div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
          <div class="option">
            <div
              class="tag1"
              :class="{ tagActive1: option4 == item.value }"
              v-for="(item, index) in optionList4"
              :key="index"
              @click="changeMiniImg(item)"
            >
              <img :src="item.imgUrl" alt />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box">

            <div v-for="(fapiaoItem,index) in faPtotalData" :key="index">
                
                <div v-for="(item,index) in fapiaoItem.msg4" :key="index" v-html="item" ref="fapiaoDetailDom"></div>

                <div v-if="ifShowZengzhi">
                    <table border="1" cellpadding="20px" class="table" style="width: 100%;text-align: center;margin-top:20px" v-for="(item,index) in fapiaoItem.totalTableData" :key="index">
                        <caption>{{item.lianshu+'：'+item.lianName}}</caption>
                        <tr>
                            <th>货物服务明细</th>
                            <th>规格型号</th>
                            <th>单位</th>
                            <th>数量</th>
                            <th>单价</th>
                            <th>金额</th>
                            <th>税率</th>
                            <th>税额</th>
                        </tr>
                        <tr v-for="(item11,index) in item.tableData" :key="index">
                            <td>{{item11.huowuName}}</td>
                            <td>{{item11.xinghao}}</td>
                            <td>{{item11.danwei}}</td>
                            <td>{{item11.shuliang}}</td>
                            <td>{{item11.danjia}}</td>
                            <td>{{item11.jine}}</td>
                            <td>{{item11.shuilv}}</td>
                            <td>{{item11.shuie}}</td>
                        </tr>
                        <tr>
                            <td>合计</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{item.hejiJine}}</td>
                            <td></td>
                            <td>{{item.hejiShuie}}</td>
                        </tr>
                        <tr>
                            <td>价税合计(小写)</td>
                            <td colspan="7">{{item.jishuiTotal}}</td>
                        </tr>
                    </table>
                </div>

                <div v-if="ifShowHangban">
                    <table border="1" cellpadding="20px" class="table" style="width: 100%;text-align: center;margin-top:20px" v-for="(item,index) in fapiaoItem.totalTableData" :key="index">
                        <tr>
                            <th>出发站</th>
                            <th>到达站</th>
                            <th>航班号</th>
                            <th>乘机日期</th>
                            <th>乘机时间</th>
                            <th>座位等级</th>
                            <th>承运人</th>
                        </tr>
                        <tr v-for="(item11,index) in item.tableData" :key="index">
                            <td>{{item11.chufaZhan}}</td>
                            <td>{{item11.daodaZhan}}</td>
                            <td>{{item11.hangBanHao}}</td>
                            <td>{{item11.chengjiRiqi}}</td>
                            <td>{{item11.chengjiShijian}}</td>
                            <td>{{item11.zuoweiDengji}}</td>
                            <td>{{item11.chengYunRen}}</td>
                        </tr>
                    </table>
                </div>

                <div v-if="ifShowDidi">
                    <table border="1" cellpadding="20px" class="table" style="width: 100%;text-align: center;margin-top:20px" v-for="(item,index) in fapiaoItem.totalTableData" :key="index">
                        <tr>
                            <th>车型</th>
                            <th>上车时间</th>
                            <th>城市</th>
                            <th>起点</th>
                            <th>终点</th>
                            <th>里程（公里）</th>
                            <th>金额</th>
                        </tr>
                        <tr v-for="(item11,index) in item.tableData" :key="index">
                            <td>{{item11.huowuName}}</td>
                            <td>{{item11.xinghao}}</td>
                            <td>{{item11.danwei}}</td>
                            <td>{{item11.shuliang}}</td>
                            <td>{{item11.danjia}}</td>
                            <td>{{item11.jine}}</td>
                            <td>{{item11.shuilv}}</td>
                            <td>{{item11.shuie}}</td>
                        </tr>
                    </table>
                </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="total_title">承兑汇票识别</div>
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                :show-upload-list="false"
                type="drag"
                :before-upload="chengduiUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="chengDuiPic" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="chengduiMsg">
          </div>
        </div>
      </div>
    </div>

    <div class="total_title">银行回单识别</div>
    <div class="fn_container">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload5"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic5" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg5">
          </div>
        </div>
      </div>
    </div>  

  </div>
</template>

<script>
import { imgPreviewBase64, getImgSize} from "@/assets/js/imgPreviewBase64";
export default {
  data() {
    return {
      uploadPic4: require("@/assets/images/carSence/fapiao.png"),
      chengDuiPic:require("@/assets/images/piaoju/2.png"),
      uploadPic5:require("@/assets/images/piaoju/4.png"),
      faPtotalData:[
        {
            msg4:[],
            totalTableData:[
                {
                    tableData:[
                        {
                            huowuName:'服务费',
                            jine:'5785.38',
                            shuliang:'',
                            danjia:'',
                            shuie:'347.12',
                            shuilv:'6%',
                            xinghao:'',
                            danwei:''
                        }
                    ],
                    hejiJine:'5785.38',
                    hejiShuie:'347.12',
                    jishuiTotal:'6132.50',
                    lianshu:'第三联',
                    lianName:'发票联'
                }
            ],
        }
      ],
      msg5:``,
      chengduiMsg:``,
      isloading: false,
      whFlag: true,
      option4: "1",
      optionList4: [
        {
          value: "1",
          imgUrl: require("@/assets/images/carSence/fapiao.png")
        }
      ],
      fileList:[],
      currentIndex:0,
      ifShowZengzhi:true,
      ifShowHangban:false,
      ifShowDidi:false,
      hasZengzhi:'',
      hasHangban:'',
      hasDidi:''
    };
  },
  mounted() {
    let _this = this;
    $(document).ready(function () {
        _this.faPtotalData[0].msg4 = [`
                    <p>发票类型：增值税专用发票</p>
                    <p>发票代码：1100154130</p>
                    <p>发票号码：00772445</p>
                    <p>开票日期：2016年11月15日</p>
                    <p>销售方名称：北京圣紫茗管理咨询有限公司</p>
                    <p>销售方纳税人识别号：110105057317113</p>
                    <p>购方名称：北京百度网讯科技有限公司</p>
                    <p>购方纳税人识别号：110108802100433</p>
                    <p>收款人：</p>
                    <p>复核：马学琦</p>
                    <p>开票人：焦红娟</p>
                    <p>销售方地址及电话：北京市朝阳区64377727</p>
                    <p>销售方开户行及账号：上海浦发银行91150154740007408</p>
                    <p>购方地址及电话：北京市海淀区上地十街10号百度大厦2层010-59928888</p>
                    <p>购方开户行及账号：招商银行北京分行上地支行110902160610706</p>
                    <p>发票种类：专用发票</p>
                    <p>数量：</p>
                    <p>发票名称：北京增值税专用发票</p>
                    <p>货物名称：服务费</p>
                    <p>价税合计(大写)：陆仟壹佰叁拾贰圆伍角整</p>
                    <p>备注：2016.9</p>
                    `];
        _this.chengduiMsg=`
                    <p>证件类型：承兑汇票-承兑汇票常用条目-</p>
                    <p>序号：12</p>
                    <p>出票日期：贰年月壹日</p>
                    <p>付款人全称：而河有北</p>
                    <p>付款人账号：1</p>
                    <p>付款人开户行：上年:便</p>
                    <p>收款人全称：连圳市工业三料斗技黄飞</p>
                    <p>收款人账号：7</p>
                    <p>收款人开户行：乏月</p>
                    <p>出票金额大写：陆壹壹壹壹壹壹</p>
                    <p>出票金额小写：￥0.00</p>
                    <p>汇票到期日：贰月壹壹贰贰日</p>
                    <p>承兑协议编号|交易合同号码：发G京中lild</p>
                    <p>行号：6</p>`;
        _this.msg5=`
                    <p>标题：兴业银行汇入回单</p>
                    <p>金额（大写）：伍角贰分</p>
                    <p>金额：0.52</p>
                    <p>付款人户名：北京小度网络科技有限公司</p>
                    <p>付款人开户银行：兴业银行</p>
                    <p>付款人账号：1001804482810010088</p>
                    <p>摘要：汇款汇入</p>
                    <p>记账日期：2017年11月02日</p>
                    <p>收款人开户银行：兴业银行</p>
                    <p>收款人户名：上海小度网络科技有限公司</p>
                    <p>收款人账号：84880180108844828</p>`;
    });
  },
  updated(){
      let fapiaoDetailDom = this.$refs.fapiaoDetailDom || [];
      for(var i=0;i<fapiaoDetailDom.length;i++){
          if(i==0){
              let childDom = fapiaoDetailDom[i].children || [];
              for(var j=0;j < childDom.length;j++){
                  if(childDom[j].tagName.toLowerCase() == 'hr' || childDom[j].tagName.toLowerCase() == 'br'){
                      childDom[j].style='display: none;';
                  }
              }
          }
      }
  },
  methods: {
    converData(data) {
        var data = data.replace(/[\n\r]/g, '').replace(/-/g, "+").replace(/_/g, "/");
        var raw = window.atob(data);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        for (var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i)
        }
        return array
    },
    showPdfFile(data) {
        var _this = this;
        var fileContent = this.converData(data);
        $('#container').show();
        $('#pop').empty();
        pdfjsLib.getDocument(fileContent).promise.then((pdf)=>{
            for (var i = 0; i < pdf.numPages; i++) {
                var id = 'page-id' + i;
                $('#pop').append('<canvas id="' + id + '"></canvas>');
                _this.showAll(fileContent, i, id)
            }
        })
    },
    showAll(url, i, id) {
        pdfjsLib.getDocument(url).promise.then((pdf)=>{
            pdf.getPage(pdf.numPages).then(function getPageHelloWorld(page) {
                var scale = [1.0],
                viewport = page.getViewport(scale),
                canvas = document.getElementById(id),
                context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                }
                page.render(renderContext)
            })
        })
    },
    handleBeforeUpload4(file) {
      this.optionList4 = [];
      this.fileList = [];
      var _this = this;
      _this.isloading = true;
      imgPreviewBase64(_this, file, function (base64) {
        _this.uploadPic4 = base64;
        let formData = new FormData();
        formData.append("files", file);
        _this.isloading = true;
        $.ajax({
            type : "POST", 
            async: false, 
            url : window.config.url + "/ai/inv/multiple",
            contentType:false,
            processData:false,
            data : formData,
            headers:{
                "apikey":"WKI158JGA458XTE692CZP5268537",
                "secretkey":"7da97d335fef49f089bab9a6892e9fdb"
            },
            success : function(res) {
                _this.currentIndex++;
                if (res.code == 200000) {
                    if (!res.data) {
                        _this.$Message.error("返回数据为空");
                        return;
                    }
                    if (res.data) {
                    _this.fileList.push({
                        result:res.data.response.data.identify_results,
                        current:_this.currentIndex,
                        imgUrl:base64,
                    })
                    _this.optionList4.push({
                        value:_this.currentIndex + '',
                        imgUrl:base64,
                    });
                    _this.changeMiniImg({
                        value:_this.currentIndex + '',
                        imgUrl:base64,
                    });
                    }
                } else {
                    _this.$Message.error("请求失败");
                }
            },
            error : function(e){  //请求失败，包含具体的错误信息
                _this.$Message.error("请求失败");
            }
        });
        getImgSize(_this.uploadPic4).then((res) => {
          _this.whFlag = res.flag;
        });
      });
    },
    changeMiniImg(item) {
      this.option4 = item.value;
      let resultData = this.fileList;
      let totalData = null;
      this.uploadPic4 = item.imgUrl;
      for(var i=0;i<resultData.length;i++){
        if(resultData[i].current == item.value){
          totalData = resultData[i].result;
          break 
        }
      }
      console.log(totalData,'resultData_Zjj')
      this.formResultData(totalData)
    },
    formResultData(totalData){
        var _this = this;
        var totalDataArr = totalData || [{
          type:''
        }];
        _this.faPtotalData = [];
        _this.ifShowZengzhi = false;
        _this.ifShowHangban = false;
        _this.ifShowDidi = false;
        _this.hasZengzhi='';
        _this.hasHangban = '';
        _this.hasDidi = '';
        totalDataArr.forEach((dataItem,index)=>{
            if(dataItem.type == '10100' || dataItem.type == '10101' || dataItem.type == '10102'){
                var html = ``;  
                var commodityObj = {};
                var msg4 = [];
                var totalTableData = [];
                var fpType = '';
                if(dataItem.type == '10100'){
                    fpType = '增值税专用发票';
                }
                else if(dataItem.type == '10101'){
                    fpType = '增值税普通发票';
                }
                else if(dataItem.type == '10102'){
                    fpType = '增值税电子普通发票';
                }
                this.hasZengzhi = 'hasZengzhi';
                this.ifShowZengzhi = true;
                if(this.hasHangban == 'hasHangban'){  
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                commodityObj.tableData = [];
                commodityObj.hejiJine = '';
                commodityObj.jishuiTotal = '';
                commodityObj.hejiShuie = '';
                commodityObj.lianshu = '';
                commodityObj.lianName = '';
                var totalResult = dataItem.details;
                html += `<br>`;
                html += `<hr style="border-top:3px solid #ddd;margin:15px 0;">`;
                html += `<br>`;
                html += `<p>发票类型：${fpType}</p>`;
                for(var attr in totalResult){
                    if(attr == 'items'){
                        var itemsArr = totalResult.items || [];
                        for(var i=0;i < itemsArr.length;i++){
                            commodityObj.tableData.push({
                                huowuName:itemsArr[i].name,
                                jine:itemsArr[i].total,   
                                shuliang:itemsArr[i].quantity,
                                danjia:itemsArr[i].price,
                                shuie:itemsArr[i].tax,
                                shuilv:itemsArr[i].tax_rate,
                                xinghao:itemsArr[i].specification,   
                                danwei:itemsArr[i].unit
                            });
                        }
                    }
                    else if (attr == "code") {
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>开票日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "pretax_amount"){
                        commodityObj.hejiJine = totalResult[attr];
                    }
                    else if(attr == "total"){
                        commodityObj.jishuiTotal = totalResult[attr];
                    }
                    else if(attr == "tax"){
                        commodityObj.hejiShuie = totalResult[attr];
                    }
                    else if(attr == "check_code"){
                        html += `<p>校验码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller"){
                        html += `<p>销售方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller_tax_id"){
                        html += `<p>销售方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer"){
                        html += `<p>购买方方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer_tax_id"){
                        html += `<p>购买方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "company_seal"){
                        html += `<p>是否有公司印章：${totalResult[attr] == 0 ? '没有' : '有'}</p>`;
                    }
                    else if(attr == "form_type"){
                        // html += `<p>发票是第几联：${totalResult[attr]}</p>`;
                        commodityObj.lianshu = totalResult[attr];
                    }
                    else if(attr == "form_name"){
                        // html += `<p>发票联次：${totalResult[attr]}</p>`;
                        commodityObj.lianName = totalResult[attr];
                    }
                    else if(attr == "kind"){
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "ciphertext"){
                        html += `<p>密码区：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "transit_mark"){
                        html += `<p>通行费标志：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "oil_mark"){
                        html += `<p>成品油标志：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "machine_code"){
                        html += `<p>机器编号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "travel_tax"){
                        html += `<p>车船税：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "receiptor"){
                        html += `<p>收款人：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "reviewer"){
                        html += `<p>复核：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "issuer"){
                        html += `<p>开票人：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "service_name"){
                        html += `<p>服务类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "remark"){
                        html += `<p>备注：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "item_names"){
                        html += `<p>品名，每个以逗号隔开：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "agent_mark"){
                        html += `<p>是否代开：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "acquisition_mark"){
                        html += `<p>是否收购：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "block_chain"){
                        html += `<p>区块链标记：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "code_confirm"){
                        html += `<p>机打发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number_confirm"){
                        html += `<p>机打发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'seller_bank_account'){
                        html += `<p>销售方银行账户：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'buyer_bank_account'){
                        html += `<p>购买方银行账户：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'buyer_addr_tel'){
                        html += `<p>购买方地址电话：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'seller_addr_tel'){
                        html += `<p>销售方地址电话：${totalResult[attr]}</p>`;
                    }
                }
                totalTableData.push(commodityObj);
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });  
            }
            else if(dataItem.type == '10500'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '出租车发票';
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<br>`;
                html += `<hr style="border-top:3px solid #ddd;margin:15px 0;">`;
                html += `<br>`;
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if (attr == "code") {
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>乘车日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "time_geton"){
                        html += `<p>上车时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "time_getoff"){
                        html += `<p>下车时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "mileage"){
                        html += `<p>里程：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "place"){   
                        html += `<p>发票所在地：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){   
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){   
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "license_plate"){   
                        html += `<p>车牌号：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });     
            }
            else if(dataItem.type == '10503'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '火车票';    
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == "number"){
                        html += `<p>号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>乘车日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "time"){
                        html += `<p>乘车时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "name"){
                        html += `<p>乘车人姓名：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "station_geton"){
                        html += `<p>上车车站：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "station_getoff"){   
                        html += `<p>下车车站：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "train_number"){   
                        html += `<p>车次：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seat"){   
                        html += `<p>座位类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "serial_number"){   
                        html += `<p>序列号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "user_id"){   
                        html += `<p>身份证号：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });    
            }
            else if(dataItem.type == '10400'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '机打发票';    
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "time"){
                        html += `<p>时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "check_code"){
                        html += `<p>校验码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "category"){
                        html += `<p>种类，oil 表示是加油票：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller"){   
                        html += `<p>销售方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller_tax_id"){   
                        html += `<p>销售方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer"){   
                        html += `<p>购买方方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer_tax_id"){   
                        html += `<p>购买方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){   
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){   
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "company_seal"){   
                        html += `<p>是否有公司印章（0：没有； 1： 有）：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });   
            }
            else if(dataItem.type == '10103'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '增值税普通发票(卷票)';     
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "check_code"){
                        html += `<p>校验码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller"){   
                        html += `<p>销售方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller_tax_id"){   
                        html += `<p>销售方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer"){   
                        html += `<p>购买方方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer_tax_id"){   
                        html += `<p>购买方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "category"){   
                        html += `<p>种类，oil 表示是加油票：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){   
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){   
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "company_seal"){   
                        html += `<p>是否有公司印章（0：没有； 1： 有）：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "service_name"){   
                        html += `<p>服务类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "item_names"){   
                        html += `<p>品名，每个以逗号隔开：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });  
            }
            else if(dataItem.type == '10200'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '定额发票';      
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                var totalResult = dataItem.details;
                html += `<br>`;
                html += `<hr style="border-top:3px solid #ddd;margin:15px 0;">`;
                html += `<br>`;
                html += `<p>发票类型：${fpType}</p>`;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){   
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){   
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "company_seal"){   
                        html += `<p>是否有公司印章（0：没有； 1： 有）：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                }); 
            }
            else if(dataItem.type == '10507'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '过路费发票';    
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }  
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'date'){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'time'){
                        html += `<p>时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "entrance"){   
                        html += `<p>入口：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "exit"){   
                        html += `<p>出口：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "highway_flag"){   
                        html += `<p>高速标志（0：没有； 1： 有）：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                }); 
            }
            else if(dataItem.type == '10505'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '客运汽车';    
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'date'){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'time'){
                        html += `<p>时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "station_geton"){   
                        html += `<p>出发车站：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "station_getoff"){   
                        html += `<p>达到车站：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'name'){
                        html += `<p>姓名：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "user_id"){   
                        html += `<p>身份证号：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                }); 
            }
            else if(dataItem.type == '10506'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];  
                var commodityObj = {};
                var fpType = '航空运输电子客票行程单'; 
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }  
                this.ifShowHangban = true;
                this.hasHangban = 'hasHangban';
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                commodityObj.tableData = [];
                commodityObj.hejiJine = '';
                commodityObj.jishuiTotal = '';
                commodityObj.hejiShuie = '';
                for(var attr in totalResult){
                    if(attr == 'user_name'){
                        html += `<p>乘机人姓名：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "user_id"){
                        html += `<p>身份证号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'number'){
                        html += `<p>电子客票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'check_code'){
                        html += `<p>验证码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){   
                        html += `<p>填开日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "agentcode"){   
                        html += `<p>销售单位代号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "issue_by"){   
                        html += `<p>填开单位：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "fare"){   
                        html += `<p>票价：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tax"){   
                        html += `<p>税费：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "fuel_surcharge"){   
                        html += `<p>燃油附加费：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "caac_development_fund"){   
                        html += `<p>民航发展基金：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "insurance"){   
                        html += `<p>保险费：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "international_flag"){   
                        html += `<p>国内国际标签：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "print_number"){   
                        html += `<p>印刷序号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "flights"){
                        let flightArr = totalResult[attr] || [];
                        for(var i=0;i < flightArr.length;i++){
                            commodityObj.tableData.push({
                                chufaZhan:flightArr[i].from || '',
                                daodaZhan:flightArr[i].to|| '',   
                                hangBanHao:flightArr[i].flight_number|| '',
                                chengjiRiqi:flightArr[i].date|| '',
                                chengjiShijian:flightArr[i].time|| '',
                                zuoweiDengji:flightArr[i].seat|| '',
                                chengYunRen:flightArr[i].carrier
                            });
                        }
                    }
                }
                msg4.push(html);
                totalTableData.push(commodityObj);  
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                }); 
            }
            else if(dataItem.type == '10105'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '二手车销售统一发票';   
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>开票日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller"){   
                        html += `<p>卖方单位/个人：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller_id"){   
                        html += `<p>卖方单位代码/个人身份证号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer"){   
                        html += `<p>买方单位/个人：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer_id"){   
                        html += `<p>买方单位代码/个人身份证号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'company_name'){
                        html += `<p>二手车市场：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "company_tax_id"){
                        html += `<p>二手车市场纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "license_plate"){   
                        html += `<p>车牌号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "registration_number"){   
                        html += `<p>登记证号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "car_code"){   
                        html += `<p>车架号/车辆识别代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "car_model"){   
                        html += `<p>厂牌型号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){   
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){   
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html); 
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });  
            }
            else if(dataItem.type == '10104'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '机动车销售统一发票';    
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "machine_code"){
                        html += `<p>机打代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "machine_number"){
                        html += `<p>机打号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>开票日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "pretax_amount"){
                        html += `<p>税前金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller"){   
                        html += `<p>销售单位：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "seller_tax_id"){   
                        html += `<p>销售单位纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer"){   
                        html += `<p>买方单位/个人：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer_id"){   
                        html += `<p>买方单位代码/个人身份证号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tax_authorities"){   
                        html += `<p>主管税务机关：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tax_authorities_code"){   
                        html += `<p>主管税务机关代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "car_code"){   
                        html += `<p>车架号/车辆识别代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'car_engine_code'){
                        html += `<p>发动机号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "car_model"){
                        html += `<p>厂牌型号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "certificate_number"){   
                        html += `<p>合格证号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){   
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){   
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){   
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tax"){   
                        html += `<p>税额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tax_rate"){   
                        html += `<p>税率：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html); 
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });
            }
            else if(dataItem.type == '20100'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '国际小票'; 
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'store_name'){
                        html += `<p>店名：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "time"){
                        html += `<p>时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "subtotal"){
                        html += `<p>税前金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tax"){
                        html += `<p>税费：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "discount"){
                        html += `<p>折扣：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "tips"){
                        html += `<p>小费：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){   
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "currency_code"){   
                        html += `<p>币种：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "type"){   
                        html += `<p>消费类型：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html); 
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });
            }
            else if(dataItem.type == '20105'){
                var html = ``;
                var msg4 = [];
                var totalTableData = []; 
                var commodityObj = {};
                var fpType = '滴滴出行行程单'; 
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                this.ifShowDidi = true;
                this.hasDidi = 'hasDidi';
                var totalResult = dataItem.details;
                commodityObj.tableData = [];
                commodityObj.hejiJine = '';
                commodityObj.jishuiTotal = '';
                commodityObj.hejiShuie = '';
                for(var attr in totalResult){
                    if(attr == 'date'){
                        html += `<p>申请日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date_start"){
                        html += `<p>行程开始时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date_end"){
                        html += `<p>行程结束时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "phone"){
                        html += `<p>行程人手机号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){
                        html += `<p>总计：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "items"){
                        var itemsArr = totalResult.items || [];
                        for(var i=0;i < itemsArr.length;i++){
                            commodityObj.tableData.push({
                                huowuName:itemsArr[i].car_type,
                                jine:itemsArr[i].time_geton,   
                                shuliang:itemsArr[i].city,
                                danjia:itemsArr[i].station_geton,
                                shuie:itemsArr[i].station_getoff,
                                shuilv:itemsArr[i].mileage,
                                xinghao:itemsArr[i].total
                            });
                        }
                    }
                }
                msg4.push(html);
                totalTableData.push(commodityObj);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });  
            }
            else if(dataItem.type == '10900'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '可报销其他发票';  
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if (attr == "code") {
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == 'number'){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                } 
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });   
            }
            else if(dataItem.type == '10902'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '完税证明';   
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'number'){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer"){
                        html += `<p>购买方名称：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "buyer_tax_id"){
                        html += `<p>购买方纳税人识别号：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });  
            }
            else if(dataItem.type == '10505a'){
                var html = ``;
                var msg4 = [];
                var totalTableData = [];
                var fpType = '船票';  
                if(this.hasZengzhi == 'hasZengzhi'){
                    this.ifShowZengzhi = true;
                }else{
                    this.ifShowZengzhi = false;
                }
                if(this.hasHangban == 'hasHangban'){
                    this.ifShowHangban = true;
                }
                else{
                    this.ifShowHangban = false;
                }
                if(this.hasDidi == 'hasDidi'){
                    this.ifShowDidi = true;
                }
                else{
                    this.ifShowDidi = false;
                }
                html += `<p>发票类型：${fpType}</p>`;
                var totalResult = dataItem.details;
                for(var attr in totalResult){
                    if(attr == 'code'){
                        html += `<p>发票代码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "number"){
                        html += `<p>发票号码：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "date"){
                        html += `<p>日期：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "time"){
                        html += `<p>时间：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "station_geton"){
                        html += `<p>出发车站：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "station_getoff"){
                        html += `<p>达到车站：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "total"){
                        html += `<p>总金额：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "name"){
                        html += `<p>姓名：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "kind"){
                        html += `<p>发票消费类型：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "province"){
                        html += `<p>省：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "city"){
                        html += `<p>市：${totalResult[attr]}</p>`;
                    }
                    else if(attr == "currency_code"){
                        html += `<p>币种：${totalResult[attr]}</p>`;
                    }
                }
                msg4.push(html);
                _this.faPtotalData.push({
                    msg4:msg4,
                    totalTableData:totalTableData
                });  
            }


        });
        setTimeout(()=>{
            _this.isloading = false;
        },1000);
    },
    chengduiUpload(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.chengDuiPic=base64; 
           getImgSize(_this.chengDuiPic).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); 
         formData.append('files', file);
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType=AB&needScore=true",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
            }
            if(res.data.data){
              let result=res.data.data.data.form[0].page[0].cell;
              let result1=res.data.data.data.form[0];
              let result2=res.data.data.data.form[0].page[0];
              let html=`<p>证件类型：${result1.name}-${result2.name}</p>`;
              result.forEach(item=>{
                if(item.result){
                  if(item.result[0].result){
                    html+=`<p>${item.name}：${item.result[0].result}</p>`
                  }
                }
              })
              this.chengduiMsg=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
        });
      },
    handleBeforeUpload5(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic5=base64;
           getImgSize(_this.uploadPic5).then(res => {
            _this.whFlag = res.flag;
          });    
        })
        let formData = new FormData(); 
        formData.append('files', file);
        this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/finance?templateSign=bank_receipt",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic5="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.data.ret;
              let html=``;
              result.forEach(item=>{
                if(item.word_name != 'others'){
                    if(item.word){
                        html+=`<p>${item.word_name}：${item.word}</p>`
                    }
                }
              })
              this.msg5=html;

            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
        });
    }
  },
};
</script>
<style scoped lang="less">
.experience {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: relative;
  .total_title {
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .fn_container {
    width: 90%;
    margin: auto;
    margin-bottom: 60px;
    /deep/.ivu-radio-default {
      font-size: 14px;
      color: #121c33;
      margin-bottom: 10px;
      label {
        margin-right: 20px;
        .ivu-radio-inner::after {
          border-color: #03a971;
        }
        .ivu-radio-checked .ivu-radio-inner {
          border-color: #03a971;
        }
        .ivu-radio-inner::after {
          background-color: #03a971;
        }
      }
    }
    p {
      font-size: 14px;
      color: #7a8499;
      text-align: justify;
      line-height: 24px;
      margin-top: 10px;
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        color: #121c33;
        margin-bottom: 20px;
      }
      .left {
        width: 50%;
        .left_box {
          height: 290px;
          border: 1px solid #ebecf0;
          .left_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .imgBox {
              display: inline-block;
              margin: 20px 50px;
              .imgPic {
                width: 60px;
                margin: auto;
                position: relative;
                img {
                  width: 100%;
                  display: block;
                }
                .del {
                  position: absolute;
                  right: -8px;
                  top: -3px;
                  width: 15px;
                  cursor: pointer;
                }
              }

              p {
                text-align: center;
              }
            }
            .pic {
              width: 100%;
              &.whFlag {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                img {
                  width: -webkit-fill-available;
                  height: 100%;
                }

                canvas {
                  width: auto;
                  height: 100%;
                }
              }
              img {
                width: 100%;
                display: block;
              }
            }
            .intro {
              display: flex;
              justify-content: space-between;
              padding: 0 15px;
              align-items: center;
              opacity: 0.85;
              background: #121c33;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50px;
              .text {
                font-size: 12px;
                color: #ffffff;
                text-align: justify;
              }
            }
          }
          .ivu-upload {
            /deep/.ivu-upload-drag {
              height: 100%;
            }
            /deep/.ivu-upload-select {
              .ivu-btn-default {
                background: #03a971 !important;
                border: none !important;
                span {
                  color: #ffffff;
                }
              }
            }
            /deep/.ivu-upload-list {
              display: none;
            }
          }
        }
        .option {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          .tag {
            padding: 5px 10px;
            font-size: 14px;
            background: rgba(0, 0, 0, 0.6);
            float: left;
            color: #fff;
            margin-right: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            border-radius: 3px;

            &.tagActive {
              background: #03a971;
            }
          }

          .tag1 {
            width: 150px;
            margin-right: 20px;
            position: relative;
            border:grey 1px solid;
            margin-bottom: 20px;
            max-height: 70px;
            overflow: hidden;
            cursor: pointer;
            float: left;
            img {
              width: 100%;
              display: block;
            }
            .typeText {
              width: 100%;
              height: 25px;
              line-height: 25px;
              text-align: center;
              position: absolute;
              left: 0;
              bottom: 0;
              opacity: 0.85;
              background: #121c33;
              font-size: 14px;
              color: #ffffff;
            }
            &.tagActive1 {
              border: #03a971 2px solid;
            }
          }
        }
      }
      .right {
        flex: 1;
        margin-left: 20px;
        .right_box {
          overflow: auto;
          font-size: 14px;
          color: #121c33;
          letter-spacing: 0;
          line-height: 24px;
          padding: 10px;
          height: 290px;
          background: rgba(192, 204, 218, 0.1);
          border: 1px solid #ebecf0;
          .table{
            border-collapse: collapse;
            tr{
              th,td{
                border: grey 1px solid;
              }
            }
          }
        }
      }
    }
  }
}
</style>

