<template>
  <div class="experience">
      <!-- 已完成的功能 -->
    <!-- 卡证识别 -->
    <!-- 营业执照识别 -->
     <Spin fix v-if="isloading">
          <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
      </Spin>
    <div class="fn_container" v-if="routeId=='2.1.6'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg">
          </div>
        </div>
      </div>
    </div>

    <!-- 银行卡识别 -->
    <div class="fn_container" v-if="routeId=='2.1.2'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload212"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic212" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg212">
          </div>
        </div>
      </div>
    </div>
    <!-- 名片识别 -->
    <div class="fn_container" v-if="routeId=='2.1.4'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload214"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic214" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg214">
          </div>
        </div>
      </div>
    </div>
    <!-- 户口本识别 -->
    <div class="fn_container" v-if="routeId=='2.1.5'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload215"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic215" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg215">
          </div>
        </div>
      </div>
    </div>
    <!-- 港澳通行证识别 -->
    <div class="fn_container" v-if="routeId=='2.1.7'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload217"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic217" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg217">
          </div>
        </div>
      </div>
    </div>
    <!-- 台湾往来通行证识别 -->
    <div class="fn_container" v-if="routeId=='2.1.8'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
             <!-- :on-format-error="handleFormatError" -->
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload218"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic218" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg218">
          </div>
        </div>
      </div>
    </div>
    <!-- 出生医学证明识别 -->
    <div class="fn_container" v-if="routeId=='2.1.9'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload219"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic219" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg219">
          </div>
        </div>
      </div>
    </div>

    <!-- 票据识别 -->
    <!-- 通用发票识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.1'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload1"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic1" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg1">
          </div>
        </div>
      </div>
    </div>
     <!-- 混贴票据识别 -->
    <div class="fn_container" v-if="routeId=='2.2.2'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload2"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic2" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg2">
          </div>
        </div>
      </div>
    </div>  
    <!-- 承兑汇票识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.4'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload4"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic4" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg4">
          </div>
        </div>
      </div>
    </div>  
    <!-- 银行回单识别 -->
    <div class="fn_container" v-if="routeId=='2.2.5'">
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
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
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
    <!-- 银行支票识别 -->
    <div class="fn_container" v-if="routeId=='2.2.6'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload6"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic6" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg6">
          </div>
        </div>
      </div>
    </div>
    <!-- 定额发票识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.7'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload7"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic7" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg7">
          </div>
        </div>
      </div>
    </div>
    <!-- 通用机打发票识别 -->
    <div class="fn_container" v-if="routeId=='2.2.8'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload8"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic8" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg8">
          </div>
        </div>
      </div>
    </div> 
    <!-- 火车票识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.9'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload9"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic9" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg9">
          </div>
        </div>
      </div>
    </div>  
    <!-- 出租车票识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.10'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload10"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic chuzuImg">
                       <img :src="uploadPic10" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg10">
          </div>
        </div>
      </div>
    </div> 
    <!-- 行程单识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.11'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload11"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic11" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg11">
          </div>
        </div>
      </div>
    </div> 
    <!-- 保险单识别 已完成-->
    <div class="fn_container" v-if="routeId=='2.2.12'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload12"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic12" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box">
            <p>公司名称:{{msg12.InsBilCom||''}}</p>
            <p>保险单号码:{{msg12.InsBilNo||''}}</p>
            <p>保单生效日期:{{msg12.InsBilTim||''}}</p>
            <p>投保人:{{msg12.InsCltNa1||''}}</p>
            <p>被保人:{{msg12.InsPerLst?msg12.InsPerLst[0].InsCltNa2:''}}</p>
            <p>受益人的各项信息</p>
            <p>保费{{msg12.InsTolAmt||''}}</p>
            <p>受益人姓名:{{msg12.BenPerLst?msg12.BenPerLst[0].BenCltNa:'法定'}}</p>
            <p>受益比例:{{msg12.BenPerLst?msg12.BenPerLst[0].BenPerPro:''}}</p>
            <p>受益人类型:{{msg12.BenPerLst?msg12.BenPerLst[0].BenPerTyp:''}}</p>
          </div>
        </div>
      </div>
    </div> 
    <!-- 彩票识别 -->
    <div class="fn_container" v-if="routeId=='2.2.13'">
      <div class="content">
        <div class="left">
          <div class="title">上传图片：</div>
          <div class="left_box">
            <Upload
                ref="upload"
                 :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload13"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg','jpeg','png','bmp']" 
                accept="image/png,image/jpeg,image/jpg,image/bmp"
                >
                <div class="left_up">
                   <div class="pic" :class="{ whFlag: !whFlag }">
                       <img :src="uploadPic13" alt="">
                    </div>
                    <div class="intro">
                      <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M</div>
                      <i-button type="success">上传图片</i-button>
                    </div>
                </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="title">识别结果：</div>
          <div class="right_box" v-html="msg13">
          </div>
        </div>
      </div>
    </div> 
  </div>
  
</template>

<script>
 import { imgPreviewBase64, getImgSize } from '@/assets/js/imgPreviewBase64';
  export default {
     props:['routeId'],
     data() {
      return {  
        whFlag:true, 
        isloading:false,    
        uploadPic:require("@/assets/images/card/12DA9F7A1DD38F3.png"),
        msg:``,
        uploadPic1:require("@/assets/images/piaoju/14.jpg"),
        msg1:``,
        uploadPic2:require("@/assets/images/piaoju/3.png"),
        msg2:``,
        uploadPic4:require("@/assets/images/piaoju/2.png"),
        msg4:``,
        uploadPic5:require("@/assets/images/piaoju/4.png"),
        msg5:'',
        uploadPic6:require("@/assets/images/piaoju/11.png"),
        msg6:'',
        uploadPic7:require("@/assets/images/piaoju/5.png"),
        msg7:'',
        uploadPic8:require("@/assets/images/piaoju/6.png"),
        msg8:'',
        uploadPic9:require("@/assets/images/piaoju/7.png"),
        msg9:'',
        uploadPic10:require("@/assets/images/piaoju/8.png"),
        msg10:'',
        uploadPic11:require("@/assets/images/piaoju/9.png"),
        msg11:'',
        uploadPic12:require("@/assets/images/piaoju/12.png"),
        msg12:'',
        uploadPic13:require("@/assets/images/piaoju/13.png"),
        msg13:'',
        uploadPic212:require("@/assets/images/IdCard/10.png"),
        msg212:``,
        uploadPic214:require("@/assets/images/IdCard/9.png"),
        msg214:``,
        uploadPic215:require("@/assets/images/IdCard/7.png"),
        msg215:``,
        uploadPic217:require("@/assets/images/IdCard/5.png"),
        msg217:`<p>ValidDate：20121242</p><p>Address：</p><p>NameChn：刘芷</p><p>Sex：男</p><p>NameEng：LAUTSZLAN</p><p>Birthday：198108</p><p>CardNum：</p>`,
        uploadPic218:require("@/assets/images/IdCard/6.png"),
        msg218:``,
        uploadPic219:require("@/assets/images/IdCard/8.png"),
        msg219:``
      }
    },
    created() {
    },
    mounted(){
      let _this=this;
      $(document).ready(function(){
        _this.msg=`<p>注册号：330200334928321</p>
            <p>社会信用代码：997449337210928</p>
            <p>单位名称：成都市华莲商贸有限公司</p>
            <p>住址：四川省成都市新林大路121</p>
            <p>法定代表人：李双双</p>
            <p>有效日期至：2050年08月21日</p>
            <p>成立日期：无</p>
            <p>类型：无</p>`;
        _this.msg1=`<p>深圳赛格股份有限公司通用机打发票</p>
            <p>发票联</p>
            <p>发票代码14403140</p>
            <p>2015年5月4日</p>
            <p>发票号码03543661</p>
            <p>行业分类</p>
            <p>批发业</p>
            <p>发票号码:03543661</p>
            <p>深圳市</p>
            <p>限公司</p>
            <p>刷号:4400L7930632X</p>
            <p>号:440300279253776</p>
            <p>销货方名称:深圳市福田区赛格电子市场诺口</p>
            <p>宝霖数码经营部</p>
            <p>01641341208434404232</p>
            <p>品名规格</p>
            <p>单位数量</p>
            <p>单价</p>`;
        _this.msg2=`<p>车座：(小写)￥140</p>
              <p>日期：</p>
              <p>火车号：￥13</p>
              <p>发票号码：04216023</p>
              <p>发票代码：116001466011</p>
              <p>金额：￥5000</p>`;
        _this.msg4=`<p>证件类型：承兑汇票-承兑汇票常用条目-</p>
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
        _this.msg5=`<p>标题：兴业银行汇入回单</p>
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
        _this.msg6=`<p>出票日期：92776年月日</p>
            <p>出票账号：0504067372308</p>
            <p>银行名：中国工商银行</p>
            <p>收款方：深河赤布电设备房公司</p>
            <p>金额：233960.80</p>`;
        _this.msg7=`<p>发票代码：111001676064</p>
            <p>发票号码：63809943</p>
            <p>伍拾元整-</p>`;
        _this.msg8=`<p>商品名称：</p>
            <p>发票代码：111001271011</p>
            <p>发票日期：2012-11-10</p>
            <p>发票号码：03694979</p>
            <p>发票类型：北京市国家税务局通用机打发票</p>
            <p>合计金额：44.00</p>`;
        _this.msg9=`<p>车票号：F057846</p>
            <p>始发站：北京南站</p>
            <p>车次号：C2565</p>
            <p>到达站：天津站</p>
            <p>出发日期：2019年04月03日</p>
            <p>座位号：02车03C号</p>
            <p>车票金额：￥54.5元</p>
            <p>席别：二等座</p>
            <p>乘客姓名：裴瑜丽</p>`;
        _this.msg10=`<p>发票代码：150001913910</p>
            <p>发票号码：18165477</p>
            <p>金额总计：￥17.00元</p>
            <p>发票所属地：</p>
            <p>车牌号：AT58T8</p>`;
        _this.msg11=`<p>票据类型：行程单</p>
            <p>顾客姓名：王曦</p>
            <p>有效身份证号码：王曦</p>
            <p>印刷序号：9998798029263</p>
            <p>出发城市：温州</p>
            <p>到达城市：西安咸阳</p>
            <p>航班号：CA1923</p>
            <p>日期：2019-02-07</p>
            <p>票价：970.00</p>
            <p>民航发展基金：50.00</p>
            <p>燃油附加费：50.00</p>
            <p>合计：1020.00</p>
            <p>电子客票号码：9998798029263</p>`;
        _this.msg12='';
        _this.msg13=`<p>中国福利彩票</p>
            <p>CHHwELFABE0E的</p>
            <p>玩法:双色球</p>
            <p>机号:21010046</p>
            <p>4888-6966-9358-8058-0110</p>
            <p>流水号:97</p>
            <p>销售期:201208694545百效期:2012086</p>
            <p>销售时间:12-07-2418:23:57</p>
            <p>金额:2元</p>
            <p>9.020509212829-11(1)</p>
            <p>开奖时间:12-07-24</p>
            <p>附加码:78956764</p>
            <p>地址沈阳市超级大乐透区辽沈三街7号</p>
            <p>国m</p>
            <p>:</p>
            <p>电话查面:16840058超值查面:发选8到1066909088</p>
            <p>宁</p>
            <p>网址:wwwnott000020408.1513129</p>`;
        _this.msg212=`
        <p>银行卡卡号；6222 3700 3333 6266</p>
        <p>有效期：02/12</p>
        <p>银行名：工商银行</p>
        <p>银行卡类型：借记卡</p>
        `;
        _this.msg214=`
        <p>姓名：韩梅奕</p>
        <p>职务/部门：经理</p>
        <p>手机：0315-23308**</p>
        <p>地址：唐山市路南区万达888号</p>
        <p>电话：0315-23308**</p>
        <p>电子邮箱：9514619**@qq.com</p>
        `;
        _this.msg215=`<p>姓名：王二</p>
        <p>户主关系：长子</p>
        <p>曾用名</p>
        <p>性别：男</p>
        <p>出生地址：湖北省兴山县</p>
        <p>民族：汉</p>
        <p>籍贯：湖北省兴山县</p>
        <p>出生日期：19900428</p>
        <p>身份证编号：420526199004282018</p>
        <p>文化程度：初中</p>
        <p>婚姻状况：未婚</p>
        <p>兵役状况：未服兵役</p>
        <p>宗教信仰：无宗教信仰</p>
        <p>身高：170</p>
        <p>血型：不明</p>`;
        _this.msg217=`<p>ValidDate：20121242</p><p>Address：</p><p>NameChn：刘芷</p><p>Sex：男</p><p>NameEng：LAUTSZLAN</p><p>Birthday：198108</p><p>CardNum：</p>`;
        _this.msg218=`<p>姓名：证件样本</p>
        <p>Name：ZHENGJIAN;YANGBEN</p>
        <p>出生日期：1982.08.03</p>
        <p>有效期限：201212120-20201211</p>
        <p>性别：女</p>
        <p>有效期限：2015.08.20-2025.08.19</p>
        <p>签发机关：公安部出入境管理局</p>
        <p>签发地点：福建</p>`;
        _this.msg219=`<p>新生儿姓名：徐文墨</p>
        <p>性别：男</p>
        <p>出生时间：2018年8月20日14时0分</p>
        <p>出生孕周：39</p>
        <p>出生体重：3450克</p>
        <p>出生身长：50厘米</p>
        <p>出生地点：安徽省铜陵市枞阳县</p>
        <p>母亲姓名：汪姐</p>
        <p>年龄：29</p>
        <p>国籍：中国</p>
        <p>民族：汉族</p>`
      })
    },
    methods:{
      handleBeforeUpload(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic=base64;
          getImgSize(_this.uploadPic).then(res => {
            _this.whFlag = res.flag;
          });  
        })
         let formData = new FormData(); 
         formData.append('files', file);
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/ocr/distinguish?capKey=CERTIFICATION&templateType=BL&needScore=true",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
            this.uploadPic="data:image/png;base64,"+res.data.data.base64;
            let result=res.data.data.data.form[0].page[0].cell;
            let result1=res.data.data.data.form[0];
            let html=`<p>证件类型：${result1.name}</p>`;
            result.forEach(item=>{
              if(item.result){
                html+=`<p>${item.name}：${item.result[0].result}</p>`
              }
            })
            this.msg=html;
            console.log(html)
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },
      handleBeforeUpload1(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic1=base64; 
          getImgSize(_this.uploadPic1).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'multipart/form-data'
          },
          method: "post",
          url: window.config.url+"/ai/text/receipt",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
              this.$Message.error('返回数据为空');
              return;
            }
             //this.uploadPic1="data:image/png;base64,"+res.data.data.base64;
            let result=res.data.data.words_result;

            let html=``;
            result.forEach(item=>{
              if(item.words){
                html+=`<p>${item.words}</p>`
              }
            })
            this.msg1=html;
            console.log(html)
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload2(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic2=base64; 
           getImgSize(_this.uploadPic2).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/finance?templateSign=e99e24646fe9c25596438a8c55aadecd",
          data: formData,
        }).then(res => {
           this.isloading=falsee;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              let result=res.data.data.data.ret;
              let html=``;
              result.forEach(item=>{
                  html+=`<p>${item.word_name}：${item.word}</p>`
              })
              this.msg2=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload4(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic4=base64; 
           getImgSize(_this.uploadPic4).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
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
              //this.uploadPic4="data:image/png;base64,"+res.data.data.base64;
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
              this.msg4=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
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
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
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
                if(item.word){
                  html+=`<p>${item.word_name}：${item.word}</p>`
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
          console.log(err);
        });
      },  
      handleBeforeUpload6(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic6=base64; 
          getImgSize(_this.uploadPic6).then(res => {
            _this.whFlag = res.flag;
          }); 
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/finance?templateSign=bank_check",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic6="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.data.ret;
              let html=``;
              result.forEach(item=>{
                if(item.word){
                  html+=`<p>${item.word_name}：${item.word}</p>`
                }
              })
              this.msg6=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload7(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic7=base64;
          getImgSize(_this.uploadPic7).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/quotaInvoice",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic7="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>发票代码：${result.invoice_code}</p>`;
              html += `<p>发票号码：${result.invoice_number}</p>`;
              html += `<p>${result.invoice_rate}</p>`;
              this.msg7=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload8(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic8=base64;
          getImgSize(_this.uploadPic8).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/invoice",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic8="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>商品名称：${result.CommodityName}</p>`;
              html += `<p>发票代码：${result.InvoiceCode}</p>`;
              html += `<p>发票日期：${result.InvoiceDate}</p>`;
              html += `<p>发票号码：${result.InvoiceNum}</p>`;
              html += `<p>发票类型：${result.InvoiceType}</p>`;
              html += `<p>合计金额：${result.TotalTax}</p>`;
              this.msg8=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload9(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic9=base64; 
          getImgSize(_this.uploadPic9).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/trainTicket",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic9="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>车票号：${result.ticket_num}</p>`;
              html += `<p>始发站：${result.starting_station}</p>`;
              html += `<p>车次号：${result.train_num}</p>`;
              html += `<p>到达站：${result.destination_station}</p>`;
              html += `<p>出发日期：${result.date}</p>`;
              html += `<p>座位号：${result.seat_num}</p>`;
              html += `<p>车票金额：${result.ticket_rates}</p>`;
              html += `<p>席别：${result.seat_category}</p>`;
              html += `<p>乘客姓名：${result.name}</p>`;
              this.msg9 = html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload10(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic10=base64; 
          getImgSize(_this.uploadPic10).then(res => {
            _this.whFlag = res.flag;
          });  
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/taxiReceipt",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic10="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>票据类型：出租车票</p>`;
              html += `<p>发票代码：${result.InvoiceCode}</p>`;
              html += `<p>发票号码：${result.InvoiceNum}</p>`;
              html += `<p>日期：${result.Date}</p>`;
              //html += `<p>等待时间：</p>`;
              //html += `<p>上车时间：</p>`;
              //html += `<p>下车时间：</p>`;
              //html += `<p>单价：</p>`;
              //html += `<p>里程：</p>`;
              html += `<p>金额总计：${result.TotalFare}</p>`;
              //html += `<p>发票所属地：</p>`; 
              html += `<p>车牌号：${result.TaxiNum}</p>`;            
              this.msg10=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload11(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic11=base64;
          getImgSize(_this.uploadPic11).then(res => {
            _this.whFlag = res.flag;
          });  
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/airTicket",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic11="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              //html += `<p>票据类型：${result.ticket_num}</p>`;
              html += `<p>票据类型：行程单</p>`;
              html += `<p>顾客姓名：${result.name}</p>`;
              html += `<p>有效身份证号码：${result.name}</p>`;
              html += `<p>印刷序号：${result.ticket_number}</p>`;
              html += `<p>出发城市：${result.starting_station}</p>`;
              html += `<p>到达城市：${result.destination_station}</p>`;
              html += `<p>航班号：${result.flight}</p>`;
              html += `<p>日期：${result.date}</p>`;
              html += `<p>票价：${result.fare}</p>`;
              html += `<p>民航发展基金：${result.dev_fund}</p>`;
              html += `<p>燃油附加费：${result.dev_fund}</p>`;
              html += `<p>合计：${result.ticket_rates}</p>`;
              html += `<p>电子客票号码：${result.ticket_number}</p>`;
              this.msg11=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload12(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic12=base64;  
          getImgSize(_this.uploadPic12).then(res => {
            _this.whFlag = res.flag;
          });  
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/insuranceDocuments",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
              //this.uploadPic12="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              //let html=``;
              //html += `<p>票据类型：${result.ticket_num}</p>`;
              //html = result;
              this.msg12=result;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload13(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic13=base64;
          getImgSize(_this.uploadPic13).then(res => {
            _this.whFlag = res.flag;
          });    
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/lottery",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              //this.uploadPic13="data:image/png;base64,"+res.data.data.base64;
            let result=res.data.data.words_result;

            let html=``;
            result.forEach(item=>{
              if(item.words){
                html+=`<p>${item.words}</p>`
              }
            })
            this.msg13=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },   
      handleBeforeUpload212(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic212=base64; 
           getImgSize(_this.uploadPic212).then(res => {
            _this.whFlag = res.flag;
          });  
        })        
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/bankCard",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              let result=res.data.data.result;
              if(!result){
                this.$Message.error(res.data.data.error_msg);
                this.msg212='';
                return;
              }
              let html=``;
              var cardType;
              if (result.bank_card_type=1) {
                cardType = '借记卡';
              }else if (result.bank_card_type=2) {
                cardType = '信用卡';
              }else{
                cardType = '不能识别';
              }
              html += `<p>银行卡卡号：${result.bank_card_number}</p>`;
              html += `<p>有效期：${result.valid_date}</p>`;
              html += `<p>银行名：${result.bank_name}</p>`;
              html += `<p>银行卡类型：`+cardType+`</p>`;
              this.msg212=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload214(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic214=base64; 
           getImgSize(_this.uploadPic214).then(res => {
            _this.whFlag = res.flag;
          }); 
        })        
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/businessCard",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              // this.uploadPic214="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>姓名：${result.NAME}</p>`;
              html += `<p>职务/部门：${result.COMPANY}</p>`;
              html += `<p>手机：${result.MOBILE}</p>`;
              html += `<p>地址：${result.ADDR}</p>`;
              html += `<p>电话：${result.TEL}</p>`;
              html += `<p>电子邮箱：${result.EMAIL}</p>`;
              this.msg214=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload215(file){
        let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic215=base64; 
           getImgSize(_this.uploadPic215).then(res => {
            _this.whFlag = res.flag;
          });  
        })        
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/householdRegister",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              // this.uploadPic215="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>姓名：${result.Name.words}</p>`;
              html += `<p>户主关系：${result.Relationship.words}</p>`;
              html += `<p>曾用名：</p>`;
              html += `<p>性别：${result.Sex.words}</p>`;
              html += `<p>出生地址：${result.BirthAddress.words}</p>`;
              html += `<p>民族：${result.Nation.words}</p>`;
              html += `<p>籍贯：${result.BirthAddress.words}</p>`;
              html += `<p>出生日期：${result.Birthday.words}</p>`;
              html += `<p>身份证编号：${result.CardNo.words}</p>`;
              html += `<p>文化程度：</p>`;
              html += `<p>婚姻状况：</p>`;
              html += `<p>兵役情况：</p>`;
              html += `<p>宗教信仰：</p>`;
              html += `<p>身高：</p>`;
              html += `<p>血型：</p>`;              
              this.msg215=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload217(file){
         let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic217=base64;
           getImgSize(_this.uploadPic217).then(res => {
            _this.whFlag = res.flag;
          });   
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
         this.msg217='';
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/bdocr/HKExitentrypermit?img_type=FILES",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
                let result=res.data.data.words_result;
                let html=``;
                for(var key in result){
                    html+=`<p>${key}：${result[key].words}</p>`;
                }
                this.msg217=html;
                console.log(this.msg217)
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload218(file){
       let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic218=base64; 
           getImgSize(_this.uploadPic218).then(res => {
            _this.whFlag = res.flag;
          });  
        })
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/taiwanExitentrypermit",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              // this.uploadPic218="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>证件号码：${result.CardNum.words}</p>`;
              html += `<p>姓名：${result.NameChn.words}</p>`;
              html += `<p>Name：${result.NameEng.words}</p>`;
              html += `<p>出生日期：${result.Birthday.words}</p>`;
              html += `<p>性别：${result.Sex.words}</p>`;
              html += `<p>有效期限：${result.ValidDate.words}</p>`;
              html += `<p>签发地点：${result.Address.words}</p>`;
              this.msg218=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      },  
      handleBeforeUpload219(file){
       let _this = this;
        imgPreviewBase64(_this, file, function(base64){
          _this.uploadPic219=base64; 
           getImgSize(_this.uploadPic219).then(res => {
            _this.whFlag = res.flag;
          });  
        })        
         let formData = new FormData(); //创建form对象
         formData.append('files', file);//
         this.isloading=true;
        this.$axios({
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          url: window.config.url+"/ai/text/birthCertificate",
          data: formData,
        }).then(res => {
           this.isloading=false;
          if(res.data.code == 200000){
            if(!res.data.data){
                this.$Message.error('返回数据为空');
                return;
              }
            if(res.data.data){
              // this.uploadPic219="data:image/png;base64,"+res.data.data.base64;
              let result=res.data.data.words_result;
              let html=``;
              html += `<p>新生儿姓名：${result.BabyName.words}</p>`;
              html += `<p>性别：${result.BabySex.words}</p>`;
              html += `<p>出生时间：${result.BabyBirthday.words}</p>`;
              html += `<p>出生证编号：${result.Code.words}</p>`;
              //html += `<p>出生体重：${result.NameEng.words}</p>`;
              //html += `<p>出生身长：${result.Address.words}</p>`;
              //html += `<p>出生地点：${result.Birthday.words}</p>`;
              html += `<p>父亲姓名：${result.FatherName.words}</p>`;
              html += `<p>母亲姓名：${result.MotherName.words}</p>`;
              //html += `<p>年龄：${result.ValidDate.words}</p>`;
              //html += `<p>国籍：${result.NameEng.words}</p>`;
              //html += `<p>民族：${result.Address.words}</p>`;              
              this.msg219=html;
            }
          }
          else{
            this.$Message.error('请求失败');
          }
        }).catch(err=>{
           this.isloading=false;
          console.log(err);
        });
      }    
  }
}
</script>

<style lang='less'>
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
 .ivu-upload-drag{
  height: 100%;
  background: rgba(192,204,218,0.10);
  border: 1px solid #EBECF0;
}
.ivu-upload-drag:hover {
     border: 1px solid #EBECF0;
}
</style>
<style scoped lang='less'>
 
  .experience {
    display: flex;
    width: 100%;
     position: relative;
    .ivu-spin-fix{
      background: none;
      // color:#03a971;
    }
    .fn_container{
      width: 100%;
      margin: auto;
      .radio_box{
        margin-bottom: 20px;
      }
      p{
        font-size: 14px;
        color: #7A8499;
        text-align: justify;
        line-height: 24px;
        margin-top: 10px;
      }
      .content{
         width: 100%;
         display: flex;
         justify-content: space-between;
        .title{
          font-size: 18px;
          color: #121C33;
          margin-bottom: 20px;
        }
        .left{
          flex:1;
          .left_box{
            height: 290px;
            // background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
            .left_up{
              width: 100%;
              height:100%;
              background: rgba(192,204,218,0.10);
              position: relative;
              .pic{
                width: 100%;
                &.whFlag {
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  img {
                    width: auto;
                    height: 100%;
                  }

                  canvas {
                    width: auto;
                    height: 100%;
                  }
                }
                img{
                  width: 100%;
                  display: block;
                }
              }
              .chuzuImg{
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  height: 100%;
                  width: auto;
                }
              }
              .intro{
                display: flex;
                justify-content: space-between;
                padding:0 15px;
                align-items: center;
                opacity: 0.85;
                background: #121C33;
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                height: 50px;
                .text{
                   font-size: 12px;
                  color: #FFFFFF;
                  text-align: justify;
                }
               
              }
            }
          }
        }
        .right{
           flex:1;
           margin-left:20px;
          .right_box{
            overflow: auto;
            font-size: 14px;
            color: #121C33;
            letter-spacing: 0;
            line-height: 24px;
            padding:10px;
            height: 290px;
            background: rgba(192,204,218,0.10);
            border: 1px solid #EBECF0;
          }
          .right_box{
            overflow: hidden !important;
          }
          .right_box:hover{
            overflow: auto !important;
          }
          .right_box::-webkit-scrollbar{
            width: 3px;     
            height: 3px;
          }
          .right_box::-webkit-scrollbar-thumb{
            border-radius:3px;
            background: #999999;
            height: 40px;
          }
          .right_box::-webkit-scrollbar-track
          {
            border-radius: 0;
            background: white;
          }
        }
      }
     
      
    }
  }
</style>
