<template>
  <div>
    <!--人脸搜索，目前后端只返回相似度，没有返回图片显示相关得信息，后端说不好搞。-->
    <div class="Detail_experience_container" v-if="routeId == '6.1.3'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_top">被查人脸（图片中主体部分）</div>
        <div class="RecDetail_left_bottom">
          <div class="Img_container">
            <img :src="sousuoleftImg" />
            <div class="info_btn">
              <div class="text">
                图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
              </div>
              <div class="ivbutton">
                <Upload
                  action=""
                  :format="['jpg', 'jpeg', 'png', 'bmp']"
                  :max-size="1024"
                  :before-upload="handleBeforeUpload"
                >
                  <Button>上传图片</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="RecDetail_right">
        <div class="RecDetail_right_top">查找结果</div>
        <div class="RecDetail_right_bottom"></div>
      </div>
    </div>

    <!--五官定位-->
    <div class="Detail_experience_container" v-if="routeId == '6.1.5'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <img :src="wuguanLeftImg" />
          </div>
          <div class="info_btn">
            <div class="text">
              图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
            </div>
            <div class="ivbutton">
              <Upload
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                :max-size="1024"
                :before-upload="wuguanBeforeUpload"
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>

      <div class="RecDetail_right" :class="{ whFlag: !whFlag }">
        <canvas id="wuguanCanvasId"></canvas>
      </div>

      <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
          <Icon type="ios-loading" size="88" class="demo-spin-icon-load"></Icon>
          <div>五官定位中，请稍后...</div>
        </Spin>
      </Col>
    </div>

    <!--人脸关键点识别-->
    <div class="Detail_experience_container" v-if="routeId == '6.1.6'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <img :src="guanjianLeftImg" />
          </div>
          <div class="info_btn">
            <div class="text">
              图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
            </div>
            <div class="ivbutton">
              <Upload
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                :max-size="1024"
                :before-upload="guanjianBeforeUpload"
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>

      <div class="RecDetail_right" :class="{ whFlag: !whFlag }">
        <canvas id="guajianCanvasId"></canvas>
      </div>
      <Alert type="error" show-icon :closable="true" v-if="ifshowErrModel">{{
        errorMsg
      }}</Alert>
      <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
          <Icon type="ios-loading" size="88" class="demo-spin-icon-load"></Icon>
          <div>关键点识别中，请稍后...</div>
        </Spin>
      </Col>
    </div>

    <!--肤色检测-->
    <div class="Detail_experience_container" v-if="routeId == '6.1.7'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <img :src="fuseLeftImg" />
          </div>
          <div class="info_btn">
            <div class="text">
              图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
            </div>
            <div class="ivbutton">
              <Upload
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                :max-size="1024"
                :before-upload="fuseBeforeUpload"
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>

      <div class="RecDetail_left fuseResult">
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <canvas id="fsjcCanvasId"></canvas>
            <div class="info_btn">
              <div class="text">
                肤色等级：<span>{{ skinLevel }}</span
                ><span>肤色分级，1~6，越小肤色越浅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
          <Icon type="ios-loading" size="88" class="demo-spin-icon-load"></Icon>
          <div>肤色检测中，请稍后...</div>
        </Spin>
      </Col>
    </div>

    <!--皮肤分析-->
    <div class="Detail_experience_container" v-if="routeId == '6.1.8'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <img :src="fenxileftImg" />
          </div>
          <div class="info_btn">
            <div class="text">
              图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
            </div>
            <div class="ivbutton">
              <Upload
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                :max-size="1024"
                :before-upload="fenxiBeforeUpload"
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      <div class="RecDetail_right">
        <div class="RecDetail_right_bottom">
          <div class="reco_result">分析结果：</div>
          <div
            class="result_text"
            v-for="(item, index) in resultArr"
            :key="index"
          >
            <div class="result_text_left">{{ item.resultType }}</div>
            <div class="result_text_right">{{ item.result }}</div>
          </div>
        </div>
      </div>
      <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
          <Icon type="ios-loading" size="88" class="demo-spin-icon-load"></Icon>
          <div>皮肤分析中，请稍后...</div>
        </Spin>
      </Col>
    </div>

    <!--面部特征分析-->
    <div class="Detail_experience_container" v-if="routeId == '6.1.12'">
      <div class="RecDetail_left">
        <div class="RecDetail_left_bottom">
          <div class="Img_container" :class="{ whFlag: !whFlag }">
            <img :src="mbFenxileftImg" />
            <div class="info_btn">
              <div class="text">
                图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
              </div>
              <div class="ivbutton">
                <Upload
                  action=""
                  :format="['jpg', 'jpeg', 'png', 'bmp']"
                  :max-size="1024"
                  :before-upload="mbFenxiBeforeUpload"
                >
                  <Button>上传图片</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="RecDetail_right">
        <div class="RecDetail_right_bottom">
          <div class="reco_result">识别结果：</div>
          <div
            class="result_text mbReco_result"
            v-for="(item, index) in recoResultArr"
            :key="index"
          >
            <div class="mbReco_title">{{ item.facePart }}</div>
            <div
              class="detailPart_container"
              v-for="(item1, index) in item.detailPart"
              :key="index"
            >
              <div class="detailPart_left">{{ item1.name }}</div>
              <div class="detailPart_right">{{ item1.value }}</div>
            </div>
          </div>
        </div>
      </div>
      <Col class="demo-spin-col" v-if="ifShowLoading">
        <Spin fix>
          <Icon type="ios-loading" size="88" class="demo-spin-icon-load"></Icon>
          <div>面部特征分析中，请稍后...</div>
        </Spin>
      </Col>
    </div>
  </div>
</template>
<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";
export default {
  props: {
    routeId: {
      type: String
    }
  },
  data() {
    return {
      whFlag: true,
      sousuoleftImg: require("../../../assets/images/renlian/renlian1.jpg"),
      fuseLeftImg: require("../../../assets/images/renlian/分组 15.png"),
      wuguanLeftImg: require("../../../assets/images/renlian/分组 15.png"),
      fenxileftImg: require("../../../assets/images/renlian/demo-pic130.png"),
      mbFenxileftImg: require("../../../assets/images/renlian/demo-pic123.png"),
      guanjianLeftImg: require("../../../assets/images/renlian/demo-pic4.png"),
      skinLevel: 3,
      resultArr: [
        {
          resultType: "",
          result: ""
        }
      ],
      recoResultArr: [
        {
          facePart: "三庭",
          detailPart: [
            {
              name: "三庭比例",
              value: "0.31:0.27:0.42"
            }
          ]
        }
      ],
      ifShowLoading: false,
      ifshowErrModel: false,
      errorMsg: ""
    };
  },
  mounted() {
    this.select();
  },
  watch: {
    routeId(newVal, oldVal) {
      this.select();
    }
  },
  methods: {
    select() {
      if (this.routeId == "6.1.3") {
        this.getImg(this.sousuoleftImg, base64 => {
          this.sousuoleftImg = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.initSousuoUpload(base1);
        });
      } else if (this.routeId == "6.1.5") {
        this.getImg(this.wuguanLeftImg, base64 => {
          this.wuguanLeftImg = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.ifShowLoading = true;
          this.initWuguanUpload(base1);
        });
      } else if (this.routeId == "6.1.6") {
        this.whFlag = false;
        this.getImg(this.guanjianLeftImg, base64 => {
          this.guanjianLeftImg = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.ifShowLoading = true;
          this.initguanjianUpload(base1);
        });
      } else if (this.routeId == "6.1.7") {
        this.getImg(this.fuseLeftImg, base64 => {
          this.fuseLeftImg = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.ifShowLoading = true;
          this.initfuseUpload(base1);
        });
      } else if (this.routeId == "6.1.8") {
        this.whFlag = false;
        this.getImg(this.fenxileftImg, base64 => {
          this.fenxileftImg = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.ifShowLoading = true;
          this.initfenxiUpload(base1);
        });
      } else if (this.routeId == "6.1.12") {
        this.whFlag = false;
        this.getImg(this.mbFenxileftImg, base64 => {
          this.mbFenxileftImg = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.ifShowLoading = true;
          this.initmbFenxiUpload(base1);
        });
      }
    },
    initSousuoUpload(base) {
      let _this = this;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/bdface/search",
        params: {
          img_type: "BASE64",
          image_param: base,
          group_id_list: 1024,
          user_id: "liujiangang"
        }
      })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    initWuguanUpload(base) {
      let _this = this;
      // this.$axios({
      //   headers: {
      //       'Accept': '*/*',
      //       'Content-Type': 'multipart/form-data'
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/face/faceshape",
      //   params:{
      //     img_type:'BASE64',
      //     image_param:base,
      //     mode:'1'
      //   }
      // }).then(res => {
      //   if(res.status == 200){
      //     if(res.data.code == 200000){
      this.ifShowLoading = false;
      //       if(!res.data.data){
      //         this.$Message.error('返回数据为空');
      //         return;
      //}
      //var resultData = res.data.data.data.face_shape_list.length > 0 ? res.data.data.data.face_shape_list[0] : [];
      var resultData = {
        right_eye: [
          { x: 593, y: 240 },
          { x: 583, y: 246 },
          { x: 572, y: 248 },
          { x: 560, y: 247 },
          { x: 548, y: 244 },
          { x: 557, y: 233 },
          { x: 570, y: 229 },
          { x: 583, y: 231 }
        ],
        nose: [
          { x: 510, y: 303 },
          { x: 509, y: 247 },
          { x: 500, y: 264 },
          { x: 491, y: 281 },
          { x: 482, y: 298 },
          { x: 471, y: 320 },
          { x: 492, y: 330 },
          { x: 510, y: 332 },
          { x: 528, y: 330 },
          { x: 549, y: 320 },
          { x: 537, y: 298 },
          { x: 528, y: 281 },
          { x: 519, y: 264 }
        ],
        face_profile: [
          { x: 369, y: 244 },
          { x: 368, y: 274 },
          { x: 370, y: 304 },
          { x: 374, y: 334 },
          { x: 381, y: 364 },
          { x: 392, y: 392 },
          { x: 408, y: 418 },
          { x: 429, y: 440 },
          { x: 454, y: 457 },
          { x: 482, y: 469 },
          { x: 512, y: 472 },
          { x: 541, y: 467 },
          { x: 566, y: 453 },
          { x: 588, y: 434 },
          { x: 605, y: 410 },
          { x: 616, y: 384 },
          { x: 623, y: 355 },
          { x: 627, y: 326 },
          { x: 629, y: 297 },
          { x: 627, y: 268 },
          { x: 624, y: 242 }
        ],
        mouth: [
          { x: 454, y: 386 },
          { x: 470, y: 399 },
          { x: 488, y: 407 },
          { x: 509, y: 410 },
          { x: 528, y: 408 },
          { x: 547, y: 400 },
          { x: 562, y: 387 },
          { x: 545, y: 375 },
          { x: 525, y: 365 },
          { x: 510, y: 370 },
          { x: 494, y: 365 },
          { x: 473, y: 374 },
          { x: 472, y: 386 },
          { x: 491, y: 387 },
          { x: 509, y: 388 },
          { x: 527, y: 387 },
          { x: 544, y: 387 },
          { x: 544, y: 385 },
          { x: 527, y: 385 },
          { x: 509, y: 386 },
          { x: 491, y: 385 },
          { x: 473, y: 385 }
        ],
        left_eye: [
          { x: 414, y: 244 },
          { x: 428, y: 249 },
          { x: 442, y: 249 },
          { x: 456, y: 248 },
          { x: 470, y: 244 },
          { x: 458, y: 233 },
          { x: 442, y: 230 },
          { x: 427, y: 234 }
        ],
        right_eyebrow: [
          { x: 616, y: 210 },
          { x: 598, y: 210 },
          { x: 581, y: 210 },
          { x: 563, y: 212 },
          { x: 545, y: 212 },
          { x: 561, y: 200 },
          { x: 581, y: 196 },
          { x: 600, y: 196 }
        ],
        left_eyebrow: [
          { x: 380, y: 216 },
          { x: 402, y: 211 },
          { x: 426, y: 208 },
          { x: 449, y: 209 },
          { x: 472, y: 209 },
          { x: 451, y: 193 },
          { x: 425, y: 192 },
          { x: 399, y: 198 }
        ]
      };
      var totalPoint = [];
      for (var attr in resultData) {
        totalPoint = totalPoint.concat(resultData[attr]);
      }
      var dotSize = 6;
      var canvas = document.getElementById("wuguanCanvasId");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = this.wuguanLeftImg;
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        totalPoint.forEach(function(item, i) {
          var x0 = item.x;
          var y0 = item.y;
          var x1 = Math.floor(x0 - dotSize / 2);
          var y1 = Math.floor(y0 - dotSize / 2);
          var x2 = Math.floor(x0 - dotSize / 2);
          var y2 = Math.floor(y0 + dotSize / 2);
          var x3 = Math.floor(x0 + dotSize / 2);
          var y3 = Math.floor(y0 - dotSize / 2);
          var x4 = Math.floor(x0 + dotSize / 2);
          var y4 = Math.floor(y0 + dotSize / 2);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x4, y4);
          ctx.lineTo(x3, y3);
          ctx.closePath();
          ctx.fillStyle = "#03A971";
          ctx.fill();
        });
      };
      //  }
      //     else{
      //       this.ifShowLoading = false;
      //       this.$Message.error('请求失败');
      //     }
      //   }
      //   else{
      //     this.ifShowLoading = false;
      //     this.$Message.error('请求失败');
      //   }
      // }).catch(err=>{
      //   this.ifShowLoading = false;
      //   console.log(err);
      // });
    },
    initguanjianUpload(base) {
      let _this = this;
      // this.$axios({
      //   headers: {
      //       'Accept': '*/*',
      //       'Content-Type': 'multipart/form-data'
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/face/keypoints",
      //   params:{
      //     type:3,
      //     image_param:base
      //   }
      // }).then(res => {
      //   if(res.status == 200){
      //     if(res.data.code == 200000){
      _this.ifShowLoading = false;
      //       if(!res.data.data){
      //         this.$Message.error('返回数据为空');
      //         return;
      //       }
      var dotSize = 4;
      var canvas = document.getElementById("guajianCanvasId");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = _this.guanjianLeftImg;
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // if (res.data.data.error_message) {
        //   _this.ifshowErrModel = true;
        //   _this.errorMsg = res.data.data.error_message;
        //   return;
        // }
        var resultData = {
          right_eye: {
            right_eye_50: {
              x: 377,
              y: 249
            },
            right_eye_51: {
              x: 379,
              y: 249
            },
            right_eye_52: {
              x: 381,
              y: 249
            },
            right_eye_53: {
              x: 382,
              y: 248
            },
            right_eye_pupil_radius: 13,
            right_eye_0: {
              x: 395,
              y: 241
            },
            right_eye_18: {
              x: 367,
              y: 233
            },
            right_eye_19: {
              x: 366,
              y: 233
            },
            right_eye_14: {
              x: 374,
              y: 232
            },
            right_eye_58: {
              x: 390,
              y: 246
            },
            right_eye_15: {
              x: 373,
              y: 232
            },
            right_eye_59: {
              x: 391,
              y: 245
            },
            right_eye_16: {
              x: 371,
              y: 232
            },
            right_eye_17: {
              x: 369,
              y: 232
            },
            right_eye_10: {
              x: 381,
              y: 232
            },
            right_eye_54: {
              x: 384,
              y: 248
            },
            right_eye_11: {
              x: 379,
              y: 232
            },
            right_eye_55: {
              x: 385,
              y: 248
            },
            right_eye_12: {
              x: 378,
              y: 232
            },
            right_eye_56: {
              x: 387,
              y: 247
            },
            right_eye_13: {
              x: 376,
              y: 232
            },
            right_eye_57: {
              x: 388,
              y: 247
            },
            right_eye_40: {
              x: 362,
              y: 249
            },
            right_eye_41: {
              x: 363,
              y: 249
            },
            right_eye_42: {
              x: 365,
              y: 250
            },
            right_eye_47: {
              x: 373,
              y: 250
            },
            right_eye_48: {
              x: 374,
              y: 250
            },
            right_eye_49: {
              x: 376,
              y: 249
            },
            right_eye_43: {
              x: 366,
              y: 250
            },
            right_eye_44: {
              x: 368,
              y: 250
            },
            right_eye_45: {
              x: 370,
              y: 250
            },
            right_eye_46: {
              x: 371,
              y: 250
            },
            right_eye_30: {
              x: 350,
              y: 243
            },
            right_eye_31: {
              x: 350,
              y: 245
            },
            right_eye_36: {
              x: 355,
              y: 249
            },
            right_eye_37: {
              x: 357,
              y: 249
            },
            right_eye_38: {
              x: 358,
              y: 249
            },
            right_eye_39: {
              x: 360,
              y: 249
            },
            right_eye_32: {
              x: 350,
              y: 247
            },
            right_eye_33: {
              x: 351,
              y: 248
            },
            right_eye_34: {
              x: 352,
              y: 249
            },
            right_eye_35: {
              x: 354,
              y: 249
            },
            right_eye_pupil_center: {
              x: 372,
              y: 239
            },
            right_eye_61: {
              x: 394,
              y: 244
            },
            right_eye_62: {
              x: 395,
              y: 242
            },
            right_eye_20: {
              x: 364,
              y: 233
            },
            right_eye_60: {
              x: 392,
              y: 244
            },
            right_eye_1: {
              x: 395,
              y: 239
            },
            right_eye_2: {
              x: 394,
              y: 238
            },
            right_eye_3: {
              x: 392,
              y: 237
            },
            right_eye_4: {
              x: 391,
              y: 236
            },
            right_eye_5: {
              x: 389,
              y: 235
            },
            right_eye_29: {
              x: 351,
              y: 242
            },
            right_eye_6: {
              x: 388,
              y: 234
            },
            right_eye_7: {
              x: 386,
              y: 233
            },
            right_eye_8: {
              x: 385,
              y: 233
            },
            right_eye_9: {
              x: 383,
              y: 233
            },
            right_eye_25: {
              x: 356,
              y: 237
            },
            right_eye_26: {
              x: 355,
              y: 238
            },
            right_eye_27: {
              x: 353,
              y: 239
            },
            right_eye_28: {
              x: 352,
              y: 241
            },
            right_eye_21: {
              x: 362,
              y: 234
            },
            right_eye_22: {
              x: 361,
              y: 235
            },
            right_eye_23: {
              x: 359,
              y: 235
            },
            right_eye_24: {
              x: 358,
              y: 236
            }
          },
          nose: {
            nose_left_49: {
              x: 277,
              y: 346
            },
            nose_midline_25: {
              x: 304,
              y: 274
            },
            nose_left_48: {
              x: 275,
              y: 345
            },
            nose_midline_26: {
              x: 304,
              y: 277
            },
            nose_midline_23: {
              x: 304,
              y: 269
            },
            nose_midline_24: {
              x: 304,
              y: 271
            },
            nose_midline_29: {
              x: 304,
              y: 285
            },
            nose_midline_27: {
              x: 304,
              y: 280
            },
            nose_midline_28: {
              x: 304,
              y: 282
            },
            nose_left_41: {
              x: 266,
              y: 334
            },
            nose_left_40: {
              x: 266,
              y: 332
            },
            nose_left_43: {
              x: 267,
              y: 338
            },
            nose_left_42: {
              x: 266,
              y: 336
            },
            nose_left_45: {
              x: 270,
              y: 342
            },
            nose_midline_21: {
              x: 304,
              y: 263
            },
            nose_left_44: {
              x: 268,
              y: 340
            },
            nose_midline_22: {
              x: 304,
              y: 266
            },
            nose_left_47: {
              x: 273,
              y: 344
            },
            nose_left_46: {
              x: 271,
              y: 343
            },
            nose_midline_20: {
              x: 304,
              y: 261
            },
            nose_midline_36: {
              x: 305,
              y: 304
            },
            nose_left_59: {
              x: 297,
              y: 351
            },
            nose_midline_37: {
              x: 305,
              y: 307
            },
            nose_midline_34: {
              x: 305,
              y: 298
            },
            nose_midline_35: {
              x: 305,
              y: 301
            },
            nose_midline_38: {
              x: 305,
              y: 309
            },
            nose_midline_39: {
              x: 305,
              y: 312
            },
            nose_left_52: {
              x: 283,
              y: 348
            },
            nose_left_51: {
              x: 281,
              y: 348
            },
            nose_left_54: {
              x: 287,
              y: 349
            },
            nose_left_53: {
              x: 285,
              y: 348
            },
            nose_left_56: {
              x: 291,
              y: 349
            },
            nose_midline_32: {
              x: 304,
              y: 293
            },
            nose_left_55: {
              x: 289,
              y: 349
            },
            nose_midline_33: {
              x: 305,
              y: 296
            },
            nose_left_58: {
              x: 295,
              y: 350
            },
            nose_midline_30: {
              x: 304,
              y: 288
            },
            nose_left_57: {
              x: 293,
              y: 350
            },
            nose_midline_31: {
              x: 304,
              y: 290
            },
            nose_left_50: {
              x: 279,
              y: 347
            },
            nose_right_57: {
              x: 315,
              y: 350
            },
            nose_right_56: {
              x: 317,
              y: 350
            },
            nose_right_59: {
              x: 311,
              y: 351
            },
            nose_right_58: {
              x: 313,
              y: 351
            },
            nose_midline_47: {
              x: 305,
              y: 334
            },
            nose_left_27: {
              x: 273,
              y: 308
            },
            nose_midline_48: {
              x: 305,
              y: 337
            },
            nose_left_26: {
              x: 273,
              y: 306
            },
            nose_midline_45: {
              x: 305,
              y: 328
            },
            nose_left_29: {
              x: 271,
              y: 312
            },
            nose_midline_46: {
              x: 305,
              y: 331
            },
            nose_left_28: {
              x: 272,
              y: 310
            },
            nose_midline_49: {
              x: 305,
              y: 339
            },
            nose_midline_40: {
              x: 305,
              y: 315
            },
            nose_left_21: {
              x: 276,
              y: 297
            },
            nose_left_20: {
              x: 276,
              y: 295
            },
            right_nostril: {
              x: 327,
              y: 338
            },
            nose_midline_43: {
              x: 305,
              y: 323
            },
            nose_left_23: {
              x: 275,
              y: 301
            },
            nose_midline_44: {
              x: 305,
              y: 325
            },
            nose_left_22: {
              x: 275,
              y: 299
            },
            nose_midline_41: {
              x: 305,
              y: 317
            },
            nose_left_25: {
              x: 274,
              y: 304
            },
            nose_midline_42: {
              x: 305,
              y: 320
            },
            nose_left_24: {
              x: 274,
              y: 302
            },
            nose_right_53: {
              x: 323,
              y: 349
            },
            left_nostril: {
              x: 283,
              y: 339
            },
            nose_right_52: {
              x: 325,
              y: 349
            },
            nose_right_55: {
              x: 319,
              y: 350
            },
            nose_right_54: {
              x: 321,
              y: 349
            },
            nose_right_51: {
              x: 327,
              y: 348
            },
            nose_right_50: {
              x: 330,
              y: 348
            },
            nose_left_38: {
              x: 266,
              y: 328
            },
            nose_midline_58: {
              x: 305,
              y: 364
            },
            nose_left_37: {
              x: 266,
              y: 327
            },
            nose_midline_59: {
              x: 305,
              y: 367
            },
            nose_midline_56: {
              x: 305,
              y: 359
            },
            nose_left_39: {
              x: 266,
              y: 330
            },
            nose_midline_57: {
              x: 305,
              y: 362
            },
            nose_left_30: {
              x: 271,
              y: 314
            },
            nose_midline_50: {
              x: 305,
              y: 342
            },
            nose_midline_51: {
              x: 305,
              y: 345
            },
            nose_left_32: {
              x: 269,
              y: 317
            },
            nose_left_31: {
              x: 270,
              y: 315
            },
            nose_left_34: {
              x: 268,
              y: 321
            },
            nose_midline_54: {
              x: 305,
              y: 353
            },
            nose_left_33: {
              x: 269,
              y: 319
            },
            nose_midline_55: {
              x: 305,
              y: 356
            },
            nose_left_36: {
              x: 267,
              y: 325
            },
            nose_midline_52: {
              x: 305,
              y: 348
            },
            nose_left_35: {
              x: 267,
              y: 323
            },
            nose_midline_53: {
              x: 305,
              y: 350
            },
            nose_right_60: {
              x: 310,
              y: 352
            },
            nose_right_62: {
              x: 305,
              y: 352
            },
            nose_right_61: {
              x: 307,
              y: 352
            },
            nose_right_39: {
              x: 345,
              y: 335
            },
            nose_right_38: {
              x: 345,
              y: 332
            },
            nose_right_35: {
              x: 344,
              y: 326
            },
            nose_right_34: {
              x: 343,
              y: 324
            },
            nose_right_37: {
              x: 345,
              y: 330
            },
            nose_right_36: {
              x: 344,
              y: 328
            },
            nose_midline_8: {
              x: 303,
              y: 225
            },
            nose_midline_7: {
              x: 303,
              y: 221
            },
            nose_midline_9: {
              x: 303,
              y: 228
            },
            nose_right_31: {
              x: 341,
              y: 319
            },
            nose_midline_0: {
              x: 303,
              y: 199
            },
            nose_right_30: {
              x: 340,
              y: 317
            },
            nose_right_33: {
              x: 342,
              y: 323
            },
            nose_midline_2: {
              x: 303,
              y: 206
            },
            nose_right_32: {
              x: 342,
              y: 321
            },
            nose_midline_1: {
              x: 303,
              y: 203
            },
            nose_midline_4: {
              x: 303,
              y: 212
            },
            nose_midline_3: {
              x: 303,
              y: 209
            },
            nose_midline_6: {
              x: 303,
              y: 218
            },
            nose_midline_5: {
              x: 303,
              y: 215
            },
            nose_right_49: {
              x: 332,
              y: 348
            },
            nose_right_46: {
              x: 337,
              y: 346
            },
            nose_right_45: {
              x: 339,
              y: 345
            },
            nose_right_48: {
              x: 334,
              y: 347
            },
            nose_right_47: {
              x: 336,
              y: 347
            },
            nose_left_16: {
              x: 278,
              y: 287
            },
            nose_left_15: {
              x: 278,
              y: 285
            },
            nose_left_18: {
              x: 277,
              y: 291
            },
            nose_left_17: {
              x: 277,
              y: 289
            },
            nose_left_19: {
              x: 277,
              y: 293
            },
            nose_left_10: {
              x: 279,
              y: 275
            },
            nose_left_12: {
              x: 279,
              y: 279
            },
            nose_left_11: {
              x: 279,
              y: 277
            },
            nose_left_14: {
              x: 278,
              y: 283
            },
            nose_left_13: {
              x: 279,
              y: 281
            },
            nose_right_42: {
              x: 344,
              y: 340
            },
            nose_right_41: {
              x: 344,
              y: 339
            },
            nose_right_44: {
              x: 341,
              y: 344
            },
            nose_right_43: {
              x: 342,
              y: 342
            },
            nose_right_40: {
              x: 345,
              y: 337
            },
            nose_left_8: {
              x: 280,
              y: 272
            },
            nose_right_17: {
              x: 333,
              y: 291
            },
            nose_left_9: {
              x: 280,
              y: 273
            },
            nose_right_16: {
              x: 333,
              y: 289
            },
            nose_right_19: {
              x: 334,
              y: 295
            },
            nose_right_18: {
              x: 334,
              y: 293
            },
            nose_left_4: {
              x: 280,
              y: 264
            },
            nose_right_13: {
              x: 332,
              y: 283
            },
            nose_left_5: {
              x: 280,
              y: 266
            },
            nose_right_12: {
              x: 332,
              y: 281
            },
            nose_left_6: {
              x: 280,
              y: 268
            },
            nose_right_15: {
              x: 332,
              y: 287
            },
            nose_left_7: {
              x: 280,
              y: 270
            },
            nose_right_14: {
              x: 332,
              y: 285
            },
            nose_left_0: {
              x: 281,
              y: 256
            },
            nose_left_1: {
              x: 281,
              y: 258
            },
            nose_left_2: {
              x: 281,
              y: 260
            },
            nose_left_3: {
              x: 281,
              y: 262
            },
            nose_left_62: {
              x: 303,
              y: 352
            },
            nose_right_11: {
              x: 331,
              y: 279
            },
            nose_right_10: {
              x: 331,
              y: 277
            },
            nose_left_61: {
              x: 301,
              y: 352
            },
            nose_left_60: {
              x: 299,
              y: 351
            },
            nose_right_28: {
              x: 339,
              y: 313
            },
            nose_right_27: {
              x: 338,
              y: 311
            },
            nose_right_29: {
              x: 339,
              y: 315
            },
            nose_right_24: {
              x: 336,
              y: 305
            },
            nose_right_23: {
              x: 336,
              y: 303
            },
            nose_right_26: {
              x: 337,
              y: 309
            },
            nose_right_25: {
              x: 337,
              y: 307
            },
            nose_midline_14: {
              x: 304,
              y: 243
            },
            nose_midline_15: {
              x: 304,
              y: 247
            },
            nose_midline_12: {
              x: 304,
              y: 237
            },
            nose_midline_13: {
              x: 304,
              y: 240
            },
            nose_midline_18: {
              x: 304,
              y: 255
            },
            nose_midline_19: {
              x: 304,
              y: 258
            },
            nose_midline_16: {
              x: 304,
              y: 250
            },
            nose_midline_17: {
              x: 304,
              y: 252
            },
            nose_right_9: {
              x: 331,
              y: 275
            },
            nose_right_8: {
              x: 331,
              y: 272
            },
            nose_right_7: {
              x: 331,
              y: 270
            },
            nose_midline_10: {
              x: 304,
              y: 231
            },
            nose_midline_11: {
              x: 304,
              y: 234
            },
            nose_right_2: {
              x: 330,
              y: 260
            },
            nose_right_20: {
              x: 334,
              y: 297
            },
            nose_right_1: {
              x: 330,
              y: 258
            },
            nose_right_0: {
              x: 330,
              y: 256
            },
            nose_right_22: {
              x: 335,
              y: 301
            },
            nose_right_21: {
              x: 335,
              y: 299
            },
            nose_right_6: {
              x: 330,
              y: 268
            },
            nose_right_5: {
              x: 330,
              y: 266
            },
            nose_right_4: {
              x: 330,
              y: 264
            },
            nose_right_3: {
              x: 330,
              y: 262
            }
          },
          left_eye_eyelid: {
            left_eye_eyelid_7: {
              x: 220,
              y: 236
            },
            left_eye_eyelid_8: {
              x: 222,
              y: 235
            },
            left_eye_eyelid_9: {
              x: 224,
              y: 234
            },
            left_eye_eyelid_3: {
              x: 212,
              y: 242
            },
            left_eye_eyelid_4: {
              x: 214,
              y: 240
            },
            left_eye_eyelid_5: {
              x: 216,
              y: 239
            },
            left_eye_eyelid_6: {
              x: 218,
              y: 237
            },
            left_eye_eyelid_60: {
              x: 212,
              y: 247
            },
            left_eye_eyelid_62: {
              x: 209,
              y: 245
            },
            left_eye_eyelid_61: {
              x: 210,
              y: 246
            },
            left_eye_eyelid_53: {
              x: 225,
              y: 253
            },
            left_eye_eyelid_52: {
              x: 227,
              y: 254
            },
            left_eye_eyelid_11: {
              x: 228,
              y: 233
            },
            left_eye_eyelid_55: {
              x: 221,
              y: 252
            },
            left_eye_eyelid_10: {
              x: 226,
              y: 234
            },
            left_eye_eyelid_54: {
              x: 223,
              y: 253
            },
            left_eye_eyelid_13: {
              x: 233,
              y: 233
            },
            left_eye_eyelid_57: {
              x: 217,
              y: 250
            },
            left_eye_eyelid_12: {
              x: 230,
              y: 233
            },
            left_eye_eyelid_56: {
              x: 219,
              y: 251
            },
            left_eye_eyelid_15: {
              x: 237,
              y: 233
            },
            left_eye_eyelid_59: {
              x: 214,
              y: 248
            },
            left_eye_eyelid_14: {
              x: 235,
              y: 233
            },
            left_eye_eyelid_58: {
              x: 215,
              y: 249
            },
            left_eye_eyelid_17: {
              x: 241,
              y: 233
            },
            left_eye_eyelid_16: {
              x: 239,
              y: 233
            },
            left_eye_eyelid_0: {
              x: 208,
              y: 245
            },
            left_eye_eyelid_19: {
              x: 246,
              y: 234
            },
            left_eye_eyelid_1: {
              x: 209,
              y: 244
            },
            left_eye_eyelid_18: {
              x: 244,
              y: 234
            },
            left_eye_eyelid_2: {
              x: 210,
              y: 243
            },
            left_eye_eyelid_20: {
              x: 248,
              y: 235
            },
            left_eye_eyelid_63: {
              x: 209,
              y: 245
            },
            left_eye_eyelid_22: {
              x: 252,
              y: 237
            },
            left_eye_eyelid_21: {
              x: 250,
              y: 236
            },
            left_eye_eyelid_24: {
              x: 256,
              y: 239
            },
            left_eye_eyelid_23: {
              x: 254,
              y: 238
            },
            left_eye_eyelid_26: {
              x: 261,
              y: 244
            },
            left_eye_eyelid_25: {
              x: 259,
              y: 241
            },
            left_eye_eyelid_28: {
              x: 265,
              y: 248
            },
            left_eye_eyelid_27: {
              x: 263,
              y: 246
            },
            left_eye_eyelid_29: {
              x: 266,
              y: 250
            },
            left_eye_eyelid_40: {
              x: 252,
              y: 254
            },
            left_eye_eyelid_31: {
              x: 268,
              y: 253
            },
            left_eye_eyelid_30: {
              x: 267,
              y: 252
            },
            left_eye_eyelid_33: {
              x: 268,
              y: 254
            },
            left_eye_eyelid_32: {
              x: 268,
              y: 253
            },
            left_eye_eyelid_35: {
              x: 264,
              y: 254
            },
            left_eye_eyelid_34: {
              x: 266,
              y: 254
            },
            left_eye_eyelid_37: {
              x: 259,
              y: 254
            },
            left_eye_eyelid_36: {
              x: 262,
              y: 254
            },
            left_eye_eyelid_39: {
              x: 255,
              y: 254
            },
            left_eye_eyelid_38: {
              x: 257,
              y: 254
            },
            left_eye_eyelid_51: {
              x: 229,
              y: 254
            },
            left_eye_eyelid_50: {
              x: 231,
              y: 254
            },
            left_eye_eyelid_42: {
              x: 248,
              y: 254
            },
            left_eye_eyelid_41: {
              x: 250,
              y: 254
            },
            left_eye_eyelid_44: {
              x: 244,
              y: 255
            },
            left_eye_eyelid_43: {
              x: 246,
              y: 255
            },
            left_eye_eyelid_46: {
              x: 239,
              y: 255
            },
            left_eye_eyelid_45: {
              x: 241,
              y: 255
            },
            left_eye_eyelid_48: {
              x: 235,
              y: 255
            },
            left_eye_eyelid_47: {
              x: 237,
              y: 255
            },
            left_eye_eyelid_49: {
              x: 233,
              y: 255
            }
          },
          face: {
            face_hairline_11: {
              x: 452,
              y: 249
            },
            face_hairline_10: {
              x: 452,
              y: 254
            },
            face_contour_left_47: {
              x: 174,
              y: 336
            },
            face_hairline_15: {
              x: 453,
              y: 232
            },
            face_contour_left_48: {
              x: 173,
              y: 332
            },
            face_hairline_14: {
              x: 453,
              y: 236
            },
            face_contour_left_49: {
              x: 172,
              y: 328
            },
            face_hairline_13: {
              x: 453,
              y: 241
            },
            face_hairline_12: {
              x: 453,
              y: 245
            },
            face_contour_left_43: {
              x: 177,
              y: 353
            },
            face_hairline_19: {
              x: 452,
              y: 215
            },
            face_contour_left_44: {
              x: 176,
              y: 349
            },
            face_hairline_18: {
              x: 453,
              y: 219
            },
            face_contour_left_45: {
              x: 175,
              y: 345
            },
            face_hairline_17: {
              x: 453,
              y: 223
            },
            face_contour_left_46: {
              x: 175,
              y: 341
            },
            face_hairline_16: {
              x: 453,
              y: 228
            },
            face_contour_left_40: {
              x: 181,
              y: 366
            },
            face_contour_left_41: {
              x: 180,
              y: 362
            },
            face_contour_left_42: {
              x: 178,
              y: 358
            },
            face_hairline_22: {
              x: 451,
              y: 202
            },
            face_hairline_21: {
              x: 452,
              y: 206
            },
            face_hairline_20: {
              x: 452,
              y: 210
            },
            face_hairline_26: {
              x: 449,
              y: 184
            },
            face_contour_left_36: {
              x: 187,
              y: 381
            },
            face_hairline_25: {
              x: 450,
              y: 189
            },
            face_contour_left_37: {
              x: 185,
              y: 377
            },
            face_hairline_24: {
              x: 450,
              y: 193
            },
            face_contour_left_38: {
              x: 184,
              y: 374
            },
            face_hairline_23: {
              x: 451,
              y: 197
            },
            face_contour_left_39: {
              x: 182,
              y: 370
            },
            face_contour_left_32: {
              x: 194,
              y: 394
            },
            face_contour_left_33: {
              x: 192,
              y: 391
            },
            face_hairline_29: {
              x: 446,
              y: 171
            },
            face_hairline_28: {
              x: 447,
              y: 176
            },
            face_contour_left_34: {
              x: 190,
              y: 387
            },
            face_hairline_27: {
              x: 448,
              y: 180
            },
            face_contour_left_35: {
              x: 189,
              y: 384
            },
            face_contour_left_30: {
              x: 198,
              y: 400
            },
            face_contour_left_31: {
              x: 196,
              y: 397
            },
            face_contour_left_29: {
              x: 200,
              y: 404
            },
            face_contour_left_25: {
              x: 209,
              y: 416
            },
            face_contour_left_26: {
              x: 207,
              y: 413
            },
            face_contour_left_27: {
              x: 205,
              y: 410
            },
            face_contour_left_28: {
              x: 202,
              y: 407
            },
            face_contour_left_21: {
              x: 220,
              y: 430
            },
            face_contour_left_22: {
              x: 217,
              y: 427
            },
            face_contour_left_23: {
              x: 214,
              y: 423
            },
            face_contour_left_24: {
              x: 211,
              y: 420
            },
            face_contour_left_20: {
              x: 223,
              y: 433
            },
            face_contour_left_18: {
              x: 229,
              y: 440
            },
            face_contour_left_19: {
              x: 226,
              y: 437
            },
            face_contour_left_14: {
              x: 242,
              y: 452
            },
            face_contour_left_15: {
              x: 238,
              y: 449
            },
            face_contour_left_16: {
              x: 235,
              y: 446
            },
            face_contour_left_17: {
              x: 232,
              y: 443
            },
            face_contour_left_10: {
              x: 256,
              y: 462
            },
            face_contour_left_11: {
              x: 252,
              y: 460
            },
            face_contour_left_12: {
              x: 249,
              y: 457
            },
            face_contour_left_13: {
              x: 245,
              y: 455
            },
            face_hairline_51: {
              x: 395,
              y: 94
            },
            face_hairline_50: {
              x: 399,
              y: 96
            },
            face_hairline_55: {
              x: 380,
              y: 86
            },
            face_hairline_108: {
              x: 184,
              y: 141
            },
            face_hairline_54: {
              x: 384,
              y: 87
            },
            face_hairline_109: {
              x: 182,
              y: 145
            },
            face_hairline_53: {
              x: 387,
              y: 89
            },
            face_hairline_106: {
              x: 187,
              y: 134
            },
            face_hairline_52: {
              x: 391,
              y: 91
            },
            face_hairline_107: {
              x: 185,
              y: 138
            },
            face_hairline_59: {
              x: 363,
              y: 80
            },
            face_contour_right_13: {
              x: 363,
              y: 458
            },
            face_hairline_58: {
              x: 367,
              y: 81
            },
            face_contour_right_14: {
              x: 366,
              y: 455
            },
            face_hairline_57: {
              x: 371,
              y: 82
            },
            face_contour_right_15: {
              x: 370,
              y: 452
            },
            face_hairline_56: {
              x: 376,
              y: 84
            },
            face_contour_right_16: {
              x: 373,
              y: 449
            },
            face_contour_right_10: {
              x: 352,
              y: 465
            },
            face_contour_right_11: {
              x: 356,
              y: 463
            },
            face_contour_right_12: {
              x: 359,
              y: 460
            },
            face_contour_right_17: {
              x: 376,
              y: 446
            },
            face_contour_right_18: {
              x: 379,
              y: 443
            },
            face_contour_right_19: {
              x: 382,
              y: 440
            },
            face_hairline_104: {
              x: 191,
              y: 126
            },
            face_hairline_105: {
              x: 189,
              y: 130
            },
            face_hairline_102: {
              x: 196,
              y: 119
            },
            face_hairline_103: {
              x: 193,
              y: 123
            },
            face_hairline_100: {
              x: 200,
              y: 112
            },
            face_hairline_101: {
              x: 198,
              y: 116
            },
            face_hairline_62: {
              x: 350,
              y: 77
            },
            face_hairline_61: {
              x: 355,
              y: 78
            },
            face_hairline_60: {
              x: 359,
              y: 79
            },
            face_hairline_66: {
              x: 333,
              y: 74
            },
            face_hairline_65: {
              x: 337,
              y: 75
            },
            face_hairline_64: {
              x: 342,
              y: 75
            },
            face_hairline_63: {
              x: 346,
              y: 76
            },
            face_contour_right_24: {
              x: 397,
              y: 424
            },
            face_contour_right_25: {
              x: 400,
              y: 421
            },
            face_hairline_69: {
              x: 320,
              y: 73
            },
            face_contour_right_26: {
              x: 402,
              y: 417
            },
            face_hairline_68: {
              x: 324,
              y: 74
            },
            face_contour_right_27: {
              x: 405,
              y: 414
            },
            face_hairline_67: {
              x: 329,
              y: 74
            },
            face_contour_right_20: {
              x: 385,
              y: 437
            },
            face_contour_right_21: {
              x: 388,
              y: 434
            },
            face_contour_right_22: {
              x: 391,
              y: 431
            },
            face_contour_right_23: {
              x: 394,
              y: 427
            },
            face_contour_right_28: {
              x: 407,
              y: 411
            },
            face_contour_right_29: {
              x: 410,
              y: 407
            },
            face_contour_right_30: {
              x: 412,
              y: 404
            },
            face_hairline_33: {
              x: 441,
              y: 155
            },
            face_hairline_32: {
              x: 443,
              y: 159
            },
            face_hairline_31: {
              x: 444,
              y: 163
            },
            face_hairline_128: {
              x: 167,
              y: 224
            },
            face_hairline_30: {
              x: 445,
              y: 167
            },
            face_hairline_129: {
              x: 166,
              y: 228
            },
            face_hairline_37: {
              x: 435,
              y: 139
            },
            face_contour_right_35: {
              x: 423,
              y: 385
            },
            face_hairline_36: {
              x: 437,
              y: 143
            },
            face_contour_right_36: {
              x: 424,
              y: 381
            },
            face_hairline_35: {
              x: 438,
              y: 147
            },
            face_contour_right_37: {
              x: 426,
              y: 377
            },
            face_hairline_34: {
              x: 440,
              y: 151
            },
            face_contour_right_38: {
              x: 428,
              y: 373
            },
            face_contour_right_31: {
              x: 414,
              y: 400
            },
            face_contour_right_32: {
              x: 417,
              y: 397
            },
            face_hairline_39: {
              x: 431,
              y: 131
            },
            face_contour_right_33: {
              x: 419,
              y: 393
            },
            face_hairline_38: {
              x: 433,
              y: 135
            },
            face_contour_right_34: {
              x: 421,
              y: 389
            },
            face_contour_left_61: {
              x: 165,
              y: 276
            },
            face_contour_left_62: {
              x: 165,
              y: 272
            },
            face_contour_left_63: {
              x: 165,
              y: 268
            },
            face_contour_right_39: {
              x: 429,
              y: 369
            },
            face_contour_left_60: {
              x: 165,
              y: 281
            },
            face_hairline_126: {
              x: 167,
              y: 216
            },
            face_hairline_127: {
              x: 167,
              y: 220
            },
            face_hairline_124: {
              x: 168,
              y: 207
            },
            face_hairline_125: {
              x: 168,
              y: 211
            },
            face_hairline_122: {
              x: 169,
              y: 199
            },
            face_hairline_123: {
              x: 169,
              y: 203
            },
            face_hairline_120: {
              x: 171,
              y: 190
            },
            face_hairline_121: {
              x: 170,
              y: 195
            },
            face_hairline_40: {
              x: 429,
              y: 127
            },
            face_contour_right_40: {
              x: 431,
              y: 365
            },
            face_contour_right_41: {
              x: 432,
              y: 360
            },
            face_hairline_119: {
              x: 171,
              y: 186
            },
            face_hairline_44: {
              x: 418,
              y: 113
            },
            face_hairline_43: {
              x: 421,
              y: 117
            },
            face_hairline_117: {
              x: 173,
              y: 178
            },
            face_hairline_42: {
              x: 424,
              y: 120
            },
            face_hairline_118: {
              x: 172,
              y: 182
            },
            face_hairline_41: {
              x: 426,
              y: 124
            },
            face_hairline_48: {
              x: 406,
              y: 101
            },
            face_contour_left_58: {
              x: 166,
              y: 289
            },
            face_contour_right_46: {
              x: 438,
              y: 339
            },
            face_hairline_47: {
              x: 409,
              y: 104
            },
            face_contour_left_59: {
              x: 166,
              y: 285
            },
            face_contour_right_47: {
              x: 439,
              y: 334
            },
            face_hairline_46: {
              x: 412,
              y: 107
            },
            face_contour_right_48: {
              x: 440,
              y: 330
            },
            face_hairline_45: {
              x: 415,
              y: 110
            },
            face_contour_right_49: {
              x: 441,
              y: 325
            },
            face_contour_left_54: {
              x: 169,
              y: 306
            },
            face_contour_right_42: {
              x: 434,
              y: 356
            },
            face_contour_left_55: {
              x: 168,
              y: 302
            },
            face_contour_right_43: {
              x: 435,
              y: 352
            },
            face_contour_left_56: {
              x: 167,
              y: 298
            },
            face_contour_right_44: {
              x: 436,
              y: 347
            },
            face_contour_left_57: {
              x: 167,
              y: 293
            },
            face_hairline_49: {
              x: 402,
              y: 98
            },
            face_contour_right_45: {
              x: 437,
              y: 343
            },
            face_contour_left_50: {
              x: 171,
              y: 323
            },
            face_contour_left_51: {
              x: 171,
              y: 319
            },
            face_contour_left_52: {
              x: 170,
              y: 315
            },
            face_contour_left_53: {
              x: 169,
              y: 311
            },
            face_hairline_115: {
              x: 175,
              y: 170
            },
            face_hairline_116: {
              x: 174,
              y: 174
            },
            face_hairline_113: {
              x: 177,
              y: 161
            },
            face_hairline_114: {
              x: 176,
              y: 165
            },
            face_hairline_111: {
              x: 179,
              y: 153
            },
            face_hairline_112: {
              x: 178,
              y: 157
            },
            face_hairline_110: {
              x: 181,
              y: 149
            },
            face_hairline_95: {
              x: 215,
              y: 97
            },
            face_contour_right_50: {
              x: 442,
              y: 321
            },
            face_hairline_94: {
              x: 218,
              y: 94
            },
            face_contour_right_51: {
              x: 443,
              y: 317
            },
            face_hairline_93: {
              x: 222,
              y: 92
            },
            face_contour_right_52: {
              x: 444,
              y: 312
            },
            face_hairline_92: {
              x: 225,
              y: 90
            },
            face_hairline_99: {
              x: 203,
              y: 109
            },
            face_hairline_98: {
              x: 206,
              y: 106
            },
            face_hairline_97: {
              x: 209,
              y: 103
            },
            face_hairline_96: {
              x: 212,
              y: 100
            },
            face_contour_right_57: {
              x: 448,
              y: 290
            },
            face_contour_right_58: {
              x: 448,
              y: 285
            },
            face_contour_right_59: {
              x: 449,
              y: 281
            },
            face_contour_right_53: {
              x: 445,
              y: 308
            },
            face_contour_right_54: {
              x: 445,
              y: 303
            },
            face_contour_right_55: {
              x: 446,
              y: 299
            },
            face_contour_right_56: {
              x: 447,
              y: 294
            },
            face_hairline_140: {
              x: 165,
              y: 275
            },
            face_hairline_141: {
              x: 166,
              y: 279
            },
            face_contour_left_9: {
              x: 260,
              y: 465
            },
            face_contour_left_6: {
              x: 272,
              y: 470
            },
            face_contour_left_5: {
              x: 277,
              y: 472
            },
            face_contour_left_8: {
              x: 264,
              y: 467
            },
            face_contour_left_7: {
              x: 268,
              y: 469
            },
            face_hairline_144: {
              x: 167,
              y: 292
            },
            face_contour_left_2: {
              x: 292,
              y: 475
            },
            face_contour_left_1: {
              x: 297,
              y: 475
            },
            face_hairline_142: {
              x: 166,
              y: 284
            },
            face_contour_left_4: {
              x: 282,
              y: 473
            },
            face_hairline_143: {
              x: 166,
              y: 288
            },
            face_contour_left_3: {
              x: 287,
              y: 474
            },
            face_contour_right_60: {
              x: 449,
              y: 277
            },
            face_contour_right_61: {
              x: 450,
              y: 272
            },
            face_contour_right_62: {
              x: 450,
              y: 268
            },
            face_contour_left_0: {
              x: 302,
              y: 475
            },
            face_contour_right_63: {
              x: 450,
              y: 263
            },
            face_hairline_139: {
              x: 165,
              y: 271
            },
            face_hairline_1: {
              x: 448,
              y: 293
            },
            face_hairline_2: {
              x: 449,
              y: 289
            },
            face_hairline_0: {
              x: 447,
              y: 297
            },
            face_hairline_5: {
              x: 451,
              y: 276
            },
            face_hairline_6: {
              x: 451,
              y: 271
            },
            face_hairline_3: {
              x: 450,
              y: 284
            },
            face_hairline_4: {
              x: 450,
              y: 280
            },
            face_hairline_9: {
              x: 452,
              y: 258
            },
            face_contour_right_8: {
              x: 344,
              y: 469
            },
            face_hairline_130: {
              x: 166,
              y: 233
            },
            face_contour_right_9: {
              x: 348,
              y: 467
            },
            face_hairline_7: {
              x: 451,
              y: 267
            },
            face_contour_right_6: {
              x: 336,
              y: 472
            },
            face_hairline_8: {
              x: 452,
              y: 263
            },
            face_contour_right_7: {
              x: 340,
              y: 470
            },
            face_contour_right_4: {
              x: 326,
              y: 474
            },
            face_contour_right_5: {
              x: 331,
              y: 473
            },
            face_contour_right_2: {
              x: 317,
              y: 475
            },
            face_contour_right_3: {
              x: 322,
              y: 475
            },
            face_hairline_137: {
              x: 165,
              y: 262
            },
            face_contour_right_0: {
              x: 307,
              y: 475
            },
            face_hairline_138: {
              x: 165,
              y: 267
            },
            face_contour_right_1: {
              x: 312,
              y: 475
            },
            face_hairline_135: {
              x: 165,
              y: 254
            },
            face_hairline_136: {
              x: 165,
              y: 258
            },
            face_hairline_133: {
              x: 165,
              y: 245
            },
            face_hairline_134: {
              x: 165,
              y: 250
            },
            face_hairline_131: {
              x: 166,
              y: 237
            },
            face_hairline_132: {
              x: 165,
              y: 241
            },
            face_hairline_73: {
              x: 303,
              y: 73
            },
            face_hairline_72: {
              x: 307,
              y: 73
            },
            face_hairline_71: {
              x: 311,
              y: 73
            },
            face_hairline_70: {
              x: 316,
              y: 73
            },
            face_hairline_77: {
              x: 286,
              y: 73
            },
            face_hairline_76: {
              x: 290,
              y: 73
            },
            face_hairline_75: {
              x: 294,
              y: 73
            },
            face_hairline_74: {
              x: 298,
              y: 73
            },
            face_hairline_79: {
              x: 277,
              y: 74
            },
            face_hairline_78: {
              x: 281,
              y: 73
            },
            face_hairline_80: {
              x: 273,
              y: 74
            },
            face_hairline_84: {
              x: 256,
              y: 77
            },
            face_hairline_83: {
              x: 261,
              y: 76
            },
            face_hairline_82: {
              x: 265,
              y: 75
            },
            face_hairline_81: {
              x: 269,
              y: 75
            },
            face_hairline_88: {
              x: 240,
              y: 82
            },
            face_hairline_87: {
              x: 244,
              y: 81
            },
            face_hairline_86: {
              x: 248,
              y: 79
            },
            face_hairline_85: {
              x: 252,
              y: 78
            },
            face_hairline_89: {
              x: 236,
              y: 84
            },
            face_hairline_91: {
              x: 229,
              y: 87
            },
            face_hairline_90: {
              x: 233,
              y: 85
            }
          },
          mouth: {
            lower_lip_29: {
              x: 359,
              y: 391
            },
            lower_lip_28: {
              x: 357,
              y: 394
            },
            upper_lip_59: {
              x: 269,
              y: 390
            },
            lower_lip_23: {
              x: 340,
              y: 407
            },
            upper_lip_58: {
              x: 273,
              y: 390
            },
            lower_lip_22: {
              x: 337,
              y: 409
            },
            lower_lip_21: {
              x: 333,
              y: 411
            },
            lower_lip_20: {
              x: 329,
              y: 412
            },
            upper_lip_55: {
              x: 284,
              y: 390
            },
            lower_lip_27: {
              x: 354,
              y: 397
            },
            upper_lip_54: {
              x: 287,
              y: 390
            },
            lower_lip_26: {
              x: 351,
              y: 400
            },
            upper_lip_57: {
              x: 277,
              y: 390
            },
            lower_lip_25: {
              x: 347,
              y: 402
            },
            upper_lip_56: {
              x: 280,
              y: 390
            },
            lower_lip_24: {
              x: 344,
              y: 405
            },
            upper_lip_51: {
              x: 298,
              y: 391
            },
            upper_lip_50: {
              x: 302,
              y: 391
            },
            upper_lip_53: {
              x: 291,
              y: 390
            },
            upper_lip_52: {
              x: 294,
              y: 391
            },
            lower_lip_19: {
              x: 325,
              y: 413
            },
            lower_lip_18: {
              x: 320,
              y: 414
            },
            lower_lip_17: {
              x: 316,
              y: 415
            },
            lower_lip_9: {
              x: 282,
              y: 411
            },
            lower_lip_12: {
              x: 294,
              y: 414
            },
            lower_lip_8: {
              x: 278,
              y: 409
            },
            lower_lip_11: {
              x: 290,
              y: 413
            },
            lower_lip_7: {
              x: 274,
              y: 407
            },
            lower_lip_10: {
              x: 286,
              y: 412
            },
            lower_lip_6: {
              x: 270,
              y: 405
            },
            lower_lip_5: {
              x: 267,
              y: 403
            },
            lower_lip_16: {
              x: 312,
              y: 415
            },
            lower_lip_4: {
              x: 264,
              y: 400
            },
            lower_lip_15: {
              x: 307,
              y: 415
            },
            lower_lip_3: {
              x: 261,
              y: 397
            },
            lower_lip_14: {
              x: 303,
              y: 415
            },
            lower_lip_2: {
              x: 258,
              y: 395
            },
            lower_lip_13: {
              x: 298,
              y: 415
            },
            lower_lip_1: {
              x: 255,
              y: 392
            },
            upper_lip_62: {
              x: 258,
              y: 388
            },
            lower_lip_0: {
              x: 252,
              y: 389
            },
            upper_lip_61: {
              x: 262,
              y: 389
            },
            upper_lip_63: {
              x: 255,
              y: 387
            },
            upper_lip_60: {
              x: 266,
              y: 389
            },
            upper_lip_9: {
              x: 281,
              y: 375
            },
            lower_lip_45: {
              x: 313,
              y: 391
            },
            upper_lip_37: {
              x: 348,
              y: 390
            },
            lower_lip_44: {
              x: 316,
              y: 391
            },
            upper_lip_36: {
              x: 352,
              y: 389
            },
            lower_lip_43: {
              x: 320,
              y: 391
            },
            upper_lip_39: {
              x: 341,
              y: 390
            },
            lower_lip_42: {
              x: 323,
              y: 391
            },
            upper_lip_0: {
              x: 250,
              y: 386
            },
            upper_lip_38: {
              x: 345,
              y: 390
            },
            lower_lip_49: {
              x: 298,
              y: 391
            },
            upper_lip_33: {
              x: 363,
              y: 386
            },
            lower_lip_48: {
              x: 302,
              y: 391
            },
            upper_lip_32: {
              x: 364,
              y: 385
            },
            lower_lip_47: {
              x: 305,
              y: 392
            },
            upper_lip_35: {
              x: 356,
              y: 388
            },
            lower_lip_46: {
              x: 309,
              y: 392
            },
            upper_lip_34: {
              x: 359,
              y: 387
            },
            upper_lip_5: {
              x: 266,
              y: 379
            },
            upper_lip_6: {
              x: 270,
              y: 378
            },
            upper_lip_7: {
              x: 274,
              y: 377
            },
            upper_lip_31: {
              x: 361,
              y: 384
            },
            upper_lip_8: {
              x: 277,
              y: 376
            },
            upper_lip_30: {
              x: 357,
              y: 384
            },
            lower_lip_41: {
              x: 327,
              y: 391
            },
            upper_lip_1: {
              x: 253,
              y: 384
            },
            lower_lip_40: {
              x: 330,
              y: 391
            },
            upper_lip_2: {
              x: 256,
              y: 382
            },
            upper_lip_3: {
              x: 259,
              y: 381
            },
            upper_lip_4: {
              x: 263,
              y: 380
            },
            lower_lip_39: {
              x: 334,
              y: 390
            },
            lower_lip_34: {
              x: 352,
              y: 389
            },
            upper_lip_48: {
              x: 309,
              y: 391
            },
            lower_lip_33: {
              x: 356,
              y: 388
            },
            upper_lip_47: {
              x: 312,
              y: 391
            },
            lower_lip_32: {
              x: 359,
              y: 387
            },
            lower_lip_31: {
              x: 363,
              y: 386
            },
            upper_lip_49: {
              x: 305,
              y: 391
            },
            lower_lip_38: {
              x: 338,
              y: 390
            },
            upper_lip_44: {
              x: 323,
              y: 391
            },
            lower_lip_37: {
              x: 341,
              y: 390
            },
            upper_lip_43: {
              x: 327,
              y: 390
            },
            lower_lip_36: {
              x: 345,
              y: 390
            },
            upper_lip_46: {
              x: 316,
              y: 391
            },
            lower_lip_35: {
              x: 348,
              y: 389
            },
            upper_lip_45: {
              x: 320,
              y: 391
            },
            upper_lip_40: {
              x: 338,
              y: 390
            },
            upper_lip_42: {
              x: 330,
              y: 390
            },
            upper_lip_41: {
              x: 334,
              y: 390
            },
            lower_lip_30: {
              x: 362,
              y: 388
            },
            upper_lip_19: {
              x: 317,
              y: 376
            },
            upper_lip_18: {
              x: 314,
              y: 376
            },
            upper_lip_15: {
              x: 303,
              y: 377
            },
            upper_lip_14: {
              x: 299,
              y: 376
            },
            upper_lip_17: {
              x: 310,
              y: 377
            },
            upper_lip_16: {
              x: 306,
              y: 377
            },
            upper_lip_11: {
              x: 288,
              y: 375
            },
            upper_lip_10: {
              x: 285,
              y: 375
            },
            upper_lip_13: {
              x: 296,
              y: 375
            },
            upper_lip_12: {
              x: 292,
              y: 375
            },
            lower_lip_63: {
              x: 251,
              y: 386
            },
            lower_lip_62: {
              x: 252,
              y: 386
            },
            lower_lip_61: {
              x: 255,
              y: 387
            },
            lower_lip_60: {
              x: 259,
              y: 388
            },
            upper_lip_29: {
              x: 354,
              y: 383
            },
            lower_lip_56: {
              x: 273,
              y: 390
            },
            upper_lip_26: {
              x: 343,
              y: 381
            },
            lower_lip_55: {
              x: 277,
              y: 390
            },
            upper_lip_25: {
              x: 339,
              y: 380
            },
            lower_lip_54: {
              x: 280,
              y: 390
            },
            upper_lip_28: {
              x: 350,
              y: 382
            },
            lower_lip_53: {
              x: 284,
              y: 390
            },
            upper_lip_27: {
              x: 346,
              y: 382
            },
            upper_lip_22: {
              x: 328,
              y: 377
            },
            lower_lip_59: {
              x: 262,
              y: 389
            },
            upper_lip_21: {
              x: 325,
              y: 376
            },
            lower_lip_58: {
              x: 266,
              y: 389
            },
            upper_lip_24: {
              x: 336,
              y: 379
            },
            lower_lip_57: {
              x: 269,
              y: 390
            },
            upper_lip_23: {
              x: 332,
              y: 378
            },
            upper_lip_20: {
              x: 321,
              y: 376
            },
            lower_lip_52: {
              x: 287,
              y: 390
            },
            lower_lip_51: {
              x: 291,
              y: 391
            },
            lower_lip_50: {
              x: 295,
              y: 391
            }
          },
          right_eye_eyelid: {
            right_eye_eyelid_43: {
              x: 364,
              y: 251
            },
            right_eye_eyelid_42: {
              x: 362,
              y: 251
            },
            right_eye_eyelid_41: {
              x: 360,
              y: 251
            },
            right_eye_eyelid_40: {
              x: 357,
              y: 251
            },
            right_eye_eyelid_47: {
              x: 373,
              y: 251
            },
            right_eye_eyelid_46: {
              x: 371,
              y: 251
            },
            right_eye_eyelid_45: {
              x: 368,
              y: 251
            },
            right_eye_eyelid_44: {
              x: 366,
              y: 251
            },
            right_eye_eyelid_49: {
              x: 377,
              y: 250
            },
            right_eye_eyelid_48: {
              x: 375,
              y: 251
            },
            right_eye_eyelid_32: {
              x: 341,
              y: 251
            },
            right_eye_eyelid_31: {
              x: 342,
              y: 251
            },
            right_eye_eyelid_30: {
              x: 343,
              y: 249
            },
            right_eye_eyelid_36: {
              x: 347,
              y: 251
            },
            right_eye_eyelid_35: {
              x: 345,
              y: 251
            },
            right_eye_eyelid_34: {
              x: 343,
              y: 251
            },
            right_eye_eyelid_33: {
              x: 342,
              y: 252
            },
            right_eye_eyelid_39: {
              x: 355,
              y: 251
            },
            right_eye_eyelid_38: {
              x: 352,
              y: 251
            },
            right_eye_eyelid_37: {
              x: 350,
              y: 251
            },
            right_eye_eyelid_7: {
              x: 392,
              y: 234
            },
            right_eye_eyelid_6: {
              x: 394,
              y: 235
            },
            right_eye_eyelid_5: {
              x: 396,
              y: 237
            },
            right_eye_eyelid_4: {
              x: 399,
              y: 239
            },
            right_eye_eyelid_3: {
              x: 401,
              y: 240
            },
            right_eye_eyelid_2: {
              x: 402,
              y: 241
            },
            right_eye_eyelid_1: {
              x: 403,
              y: 242
            },
            right_eye_eyelid_0: {
              x: 404,
              y: 243
            },
            right_eye_eyelid_61: {
              x: 401,
              y: 244
            },
            right_eye_eyelid_60: {
              x: 399,
              y: 244
            },
            right_eye_eyelid_21: {
              x: 361,
              y: 233
            },
            right_eye_eyelid_20: {
              x: 363,
              y: 233
            },
            right_eye_eyelid_63: {
              x: 403,
              y: 243
            },
            right_eye_eyelid_9: {
              x: 387,
              y: 232
            },
            right_eye_eyelid_62: {
              x: 402,
              y: 243
            },
            right_eye_eyelid_8: {
              x: 389,
              y: 233
            },
            right_eye_eyelid_25: {
              x: 353,
              y: 239
            },
            right_eye_eyelid_24: {
              x: 355,
              y: 237
            },
            right_eye_eyelid_23: {
              x: 357,
              y: 236
            },
            right_eye_eyelid_22: {
              x: 359,
              y: 234
            },
            right_eye_eyelid_29: {
              x: 344,
              y: 248
            },
            right_eye_eyelid_28: {
              x: 346,
              y: 245
            },
            right_eye_eyelid_27: {
              x: 348,
              y: 243
            },
            right_eye_eyelid_26: {
              x: 350,
              y: 241
            },
            right_eye_eyelid_19: {
              x: 365,
              y: 232
            },
            right_eye_eyelid_50: {
              x: 379,
              y: 250
            },
            right_eye_eyelid_54: {
              x: 387,
              y: 248
            },
            right_eye_eyelid_10: {
              x: 385,
              y: 232
            },
            right_eye_eyelid_53: {
              x: 385,
              y: 249
            },
            right_eye_eyelid_52: {
              x: 383,
              y: 249
            },
            right_eye_eyelid_51: {
              x: 381,
              y: 250
            },
            right_eye_eyelid_58: {
              x: 395,
              y: 246
            },
            right_eye_eyelid_14: {
              x: 377,
              y: 230
            },
            right_eye_eyelid_57: {
              x: 393,
              y: 246
            },
            right_eye_eyelid_13: {
              x: 379,
              y: 230
            },
            right_eye_eyelid_56: {
              x: 391,
              y: 247
            },
            right_eye_eyelid_12: {
              x: 381,
              y: 231
            },
            right_eye_eyelid_55: {
              x: 389,
              y: 248
            },
            right_eye_eyelid_11: {
              x: 383,
              y: 231
            },
            right_eye_eyelid_18: {
              x: 368,
              y: 231
            },
            right_eye_eyelid_17: {
              x: 370,
              y: 231
            },
            right_eye_eyelid_16: {
              x: 372,
              y: 230
            },
            right_eye_eyelid_59: {
              x: 397,
              y: 245
            },
            right_eye_eyelid_15: {
              x: 375,
              y: 230
            }
          },
          left_eye: {
            left_eye_30: {
              x: 262,
              y: 246
            },
            left_eye_0: {
              x: 215,
              y: 244
            },
            left_eye_1: {
              x: 215,
              y: 242
            },
            left_eye_34: {
              x: 260,
              y: 252
            },
            left_eye_4: {
              x: 219,
              y: 238
            },
            left_eye_33: {
              x: 261,
              y: 251
            },
            left_eye_5: {
              x: 221,
              y: 237
            },
            left_eye_32: {
              x: 262,
              y: 250
            },
            left_eye_2: {
              x: 216,
              y: 241
            },
            left_eye_31: {
              x: 262,
              y: 248
            },
            left_eye_3: {
              x: 217,
              y: 239
            },
            left_eye_38: {
              x: 253,
              y: 253
            },
            left_eye_37: {
              x: 255,
              y: 252
            },
            left_eye_36: {
              x: 256,
              y: 252
            },
            left_eye_35: {
              x: 258,
              y: 252
            },
            left_eye_39: {
              x: 251,
              y: 253
            },
            left_eye_pupil_center: {
              x: 239,
              y: 242
            },
            left_eye_8: {
              x: 226,
              y: 235
            },
            left_eye_9: {
              x: 227,
              y: 235
            },
            left_eye_6: {
              x: 222,
              y: 237
            },
            left_eye_7: {
              x: 224,
              y: 236
            },
            left_eye_62: {
              x: 215,
              y: 245
            },
            left_eye_61: {
              x: 216,
              y: 247
            },
            left_eye_60: {
              x: 217,
              y: 248
            },
            left_eye_23: {
              x: 253,
              y: 238
            },
            left_eye_22: {
              x: 251,
              y: 237
            },
            left_eye_21: {
              x: 249,
              y: 236
            },
            left_eye_20: {
              x: 248,
              y: 235
            },
            left_eye_27: {
              x: 259,
              y: 242
            },
            left_eye_26: {
              x: 257,
              y: 241
            },
            left_eye_25: {
              x: 256,
              y: 239
            },
            left_eye_24: {
              x: 254,
              y: 238
            },
            left_eye_29: {
              x: 261,
              y: 244
            },
            left_eye_28: {
              x: 260,
              y: 243
            },
            left_eye_pupil_radius: 13,
            left_eye_52: {
              x: 229,
              y: 253
            },
            left_eye_51: {
              x: 231,
              y: 254
            },
            left_eye_50: {
              x: 233,
              y: 254
            },
            left_eye_12: {
              x: 233,
              y: 234
            },
            left_eye_56: {
              x: 223,
              y: 251
            },
            left_eye_11: {
              x: 231,
              y: 234
            },
            left_eye_55: {
              x: 224,
              y: 252
            },
            left_eye_10: {
              x: 229,
              y: 235
            },
            left_eye_54: {
              x: 226,
              y: 252
            },
            left_eye_53: {
              x: 228,
              y: 253
            },
            left_eye_16: {
              x: 240,
              y: 234
            },
            left_eye_15: {
              x: 238,
              y: 234
            },
            left_eye_59: {
              x: 218,
              y: 249
            },
            left_eye_14: {
              x: 237,
              y: 234
            },
            left_eye_58: {
              x: 220,
              y: 250
            },
            left_eye_13: {
              x: 235,
              y: 234
            },
            left_eye_57: {
              x: 221,
              y: 251
            },
            left_eye_19: {
              x: 246,
              y: 235
            },
            left_eye_18: {
              x: 244,
              y: 235
            },
            left_eye_17: {
              x: 242,
              y: 234
            },
            left_eye_41: {
              x: 248,
              y: 253
            },
            left_eye_40: {
              x: 250,
              y: 253
            },
            left_eye_45: {
              x: 241,
              y: 254
            },
            left_eye_44: {
              x: 243,
              y: 254
            },
            left_eye_43: {
              x: 245,
              y: 254
            },
            left_eye_42: {
              x: 246,
              y: 254
            },
            left_eye_49: {
              x: 234,
              y: 254
            },
            left_eye_48: {
              x: 236,
              y: 254
            },
            left_eye_47: {
              x: 238,
              y: 254
            },
            left_eye_46: {
              x: 239,
              y: 254
            }
          },
          right_eyebrow: {
            right_eyebrow_29: {
              x: 342,
              y: 211
            },
            right_eyebrow_39: {
              x: 354,
              y: 220
            },
            right_eyebrow_3: {
              x: 424,
              y: 209
            },
            right_eyebrow_38: {
              x: 351,
              y: 220
            },
            right_eyebrow_4: {
              x: 422,
              y: 206
            },
            right_eyebrow_37: {
              x: 347,
              y: 221
            },
            right_eyebrow_1: {
              x: 428,
              y: 214
            },
            right_eyebrow_36: {
              x: 344,
              y: 222
            },
            right_eyebrow_2: {
              x: 427,
              y: 211
            },
            right_eyebrow_35: {
              x: 341,
              y: 222
            },
            right_eyebrow_7: {
              x: 414,
              y: 201
            },
            right_eyebrow_34: {
              x: 338,
              y: 222
            },
            right_eyebrow_8: {
              x: 411,
              y: 199
            },
            right_eyebrow_33: {
              x: 336,
              y: 221
            },
            right_eyebrow_5: {
              x: 419,
              y: 204
            },
            right_eyebrow_32: {
              x: 335,
              y: 218
            },
            right_eyebrow_6: {
              x: 417,
              y: 202
            },
            right_eyebrow_31: {
              x: 336,
              y: 215
            },
            right_eyebrow_30: {
              x: 339,
              y: 213
            },
            right_eyebrow_0: {
              x: 429,
              y: 217
            },
            right_eyebrow_19: {
              x: 374,
              y: 203
            },
            right_eyebrow_18: {
              x: 377,
              y: 202
            },
            right_eyebrow_28: {
              x: 345,
              y: 210
            },
            right_eyebrow_27: {
              x: 348,
              y: 209
            },
            right_eyebrow_26: {
              x: 351,
              y: 208
            },
            right_eyebrow_25: {
              x: 355,
              y: 207
            },
            right_eyebrow_24: {
              x: 358,
              y: 206
            },
            right_eyebrow_23: {
              x: 361,
              y: 206
            },
            right_eyebrow_22: {
              x: 364,
              y: 205
            },
            right_eyebrow_21: {
              x: 368,
              y: 204
            },
            right_eyebrow_20: {
              x: 371,
              y: 204
            },
            right_eyebrow_63: {
              x: 426,
              y: 216
            },
            right_eyebrow_62: {
              x: 424,
              y: 214
            },
            right_eyebrow_61: {
              x: 421,
              y: 212
            },
            right_eyebrow_60: {
              x: 418,
              y: 210
            },
            right_eyebrow_17: {
              x: 381,
              y: 201
            },
            right_eyebrow_16: {
              x: 384,
              y: 201
            },
            right_eyebrow_15: {
              x: 387,
              y: 200
            },
            right_eyebrow_59: {
              x: 415,
              y: 209
            },
            right_eyebrow_14: {
              x: 391,
              y: 199
            },
            right_eyebrow_58: {
              x: 412,
              y: 207
            },
            right_eyebrow_57: {
              x: 409,
              y: 207
            },
            right_eyebrow_13: {
              x: 394,
              y: 198
            },
            right_eyebrow_56: {
              x: 406,
              y: 206
            },
            right_eyebrow_12: {
              x: 397,
              y: 198
            },
            right_eyebrow_55: {
              x: 403,
              y: 206
            },
            right_eyebrow_11: {
              x: 401,
              y: 197
            },
            right_eyebrow_54: {
              x: 400,
              y: 206
            },
            right_eyebrow_10: {
              x: 404,
              y: 198
            },
            right_eyebrow_53: {
              x: 397,
              y: 207
            },
            right_eyebrow_52: {
              x: 393,
              y: 207
            },
            right_eyebrow_51: {
              x: 390,
              y: 208
            },
            right_eyebrow_50: {
              x: 387,
              y: 209
            },
            right_eyebrow_9: {
              x: 407,
              y: 198
            },
            right_eyebrow_49: {
              x: 384,
              y: 210
            },
            right_eyebrow_48: {
              x: 381,
              y: 211
            },
            right_eyebrow_47: {
              x: 378,
              y: 212
            },
            right_eyebrow_46: {
              x: 375,
              y: 213
            },
            right_eyebrow_45: {
              x: 372,
              y: 215
            },
            right_eyebrow_44: {
              x: 369,
              y: 216
            },
            right_eyebrow_43: {
              x: 366,
              y: 217
            },
            right_eyebrow_42: {
              x: 363,
              y: 217
            },
            right_eyebrow_41: {
              x: 360,
              y: 218
            },
            right_eyebrow_40: {
              x: 357,
              y: 219
            }
          },
          left_eyebrow: {
            left_eyebrow_40: {
              x: 252,
              y: 223
            },
            left_eyebrow_41: {
              x: 249,
              y: 222
            },
            left_eyebrow_44: {
              x: 240,
              y: 220
            },
            left_eyebrow_45: {
              x: 237,
              y: 220
            },
            left_eyebrow_42: {
              x: 246,
              y: 222
            },
            left_eyebrow_43: {
              x: 243,
              y: 221
            },
            left_eyebrow_48: {
              x: 228,
              y: 217
            },
            left_eyebrow_49: {
              x: 225,
              y: 216
            },
            left_eyebrow_46: {
              x: 234,
              y: 219
            },
            left_eyebrow_47: {
              x: 231,
              y: 218
            },
            left_eyebrow_51: {
              x: 219,
              y: 215
            },
            left_eyebrow_52: {
              x: 216,
              y: 214
            },
            left_eyebrow_50: {
              x: 222,
              y: 216
            },
            left_eyebrow_55: {
              x: 207,
              y: 213
            },
            left_eyebrow_11: {
              x: 210,
              y: 203
            },
            left_eyebrow_56: {
              x: 204,
              y: 213
            },
            left_eyebrow_12: {
              x: 214,
              y: 203
            },
            left_eyebrow_53: {
              x: 213,
              y: 214
            },
            left_eyebrow_54: {
              x: 210,
              y: 213
            },
            left_eyebrow_10: {
              x: 207,
              y: 203
            },
            left_eyebrow_15: {
              x: 223,
              y: 205
            },
            left_eyebrow_59: {
              x: 195,
              y: 215
            },
            left_eyebrow_16: {
              x: 226,
              y: 206
            },
            left_eyebrow_57: {
              x: 201,
              y: 213
            },
            left_eyebrow_13: {
              x: 217,
              y: 204
            },
            left_eyebrow_14: {
              x: 220,
              y: 205
            },
            left_eyebrow_58: {
              x: 198,
              y: 214
            },
            left_eyebrow_19: {
              x: 236,
              y: 208
            },
            left_eyebrow_17: {
              x: 230,
              y: 207
            },
            left_eyebrow_18: {
              x: 233,
              y: 207
            },
            left_eyebrow_3: {
              x: 187,
              y: 213
            },
            left_eyebrow_62: {
              x: 187,
              y: 219
            },
            left_eyebrow_2: {
              x: 185,
              y: 215
            },
            left_eyebrow_63: {
              x: 185,
              y: 220
            },
            left_eyebrow_5: {
              x: 192,
              y: 209
            },
            left_eyebrow_60: {
              x: 193,
              y: 216
            },
            left_eyebrow_4: {
              x: 190,
              y: 211
            },
            left_eyebrow_61: {
              x: 190,
              y: 217
            },
            left_eyebrow_22: {
              x: 245,
              y: 210
            },
            left_eyebrow_23: {
              x: 248,
              y: 211
            },
            left_eyebrow_1: {
              x: 183,
              y: 218
            },
            left_eyebrow_20: {
              x: 239,
              y: 209
            },
            left_eyebrow_0: {
              x: 182,
              y: 221
            },
            left_eyebrow_21: {
              x: 242,
              y: 209
            },
            left_eyebrow_7: {
              x: 198,
              y: 206
            },
            left_eyebrow_6: {
              x: 195,
              y: 208
            },
            left_eyebrow_9: {
              x: 204,
              y: 204
            },
            left_eyebrow_8: {
              x: 201,
              y: 205
            },
            left_eyebrow_26: {
              x: 258,
              y: 213
            },
            left_eyebrow_27: {
              x: 261,
              y: 214
            },
            left_eyebrow_24: {
              x: 252,
              y: 211
            },
            left_eyebrow_25: {
              x: 255,
              y: 212
            },
            left_eyebrow_28: {
              x: 264,
              y: 214
            },
            left_eyebrow_29: {
              x: 267,
              y: 216
            },
            left_eyebrow_30: {
              x: 270,
              y: 217
            },
            left_eyebrow_33: {
              x: 272,
              y: 225
            },
            left_eyebrow_34: {
              x: 270,
              y: 226
            },
            left_eyebrow_31: {
              x: 272,
              y: 219
            },
            left_eyebrow_32: {
              x: 273,
              y: 223
            },
            left_eyebrow_37: {
              x: 261,
              y: 225
            },
            left_eyebrow_38: {
              x: 258,
              y: 224
            },
            left_eyebrow_35: {
              x: 267,
              y: 226
            },
            left_eyebrow_36: {
              x: 264,
              y: 225
            },
            left_eyebrow_39: {
              x: 255,
              y: 224
            }
          }
        };
        var totalPoint = [];
        for (var attr in resultData) {
          var resultObj = resultData[attr];
          for (var j in resultObj) {
            totalPoint = totalPoint.concat(resultObj[j]);
          }
        }
        totalPoint.forEach(function(item, i) {
          _this.ifshowErrModel = false;
          var x0 = item.x;
          var y0 = item.y;
          var x1 = Math.floor(x0 - dotSize / 2);
          var y1 = Math.floor(y0 - dotSize / 2);
          var x2 = Math.floor(x0 - dotSize / 2);
          var y2 = Math.floor(y0 + dotSize / 2);
          var x3 = Math.floor(x0 + dotSize / 2);
          var y3 = Math.floor(y0 - dotSize / 2);
          var x4 = Math.floor(x0 + dotSize / 2);
          var y4 = Math.floor(y0 + dotSize / 2);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x4, y4);
          ctx.lineTo(x3, y3);
          ctx.closePath();
          ctx.fillStyle = "#03A971";
          ctx.fill();
        });
      };
      //}
      //   }
      //   else{
      //     this.ifShowLoading = false;
      //     this.$Message.error('请求失败');
      //   }
      // }).catch(err=>{
      //   this.ifShowLoading = false;
      //   console.log(err);
      // });
    },
    initfuseUpload(base) {
      let _this = this;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/body/skincolor",
      //   params: {
      //     img_type: "BASE64",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.status == 200) {
      //       if (res.data.code == 200000) {
                 this.ifShowLoading = false;
      //         if (!res.data.data) {
      //           this.$Message.error("返回数据为空");
      //           return;
      //         }
              //var resultData = res.data.data.result.face_list[0];
              var resultData = {"skin":{"color":3},"face_token":"2ae9cb5286408c8826d2c3eaea20efee","location":{"top":194.3,"left":362.47,"width":274,"degree":0,"height":284}};
              console.log(JSON.stringify(resultData))
              var location = resultData.location;
              var canvas = document.getElementById("fsjcCanvasId");
              var ctx = canvas.getContext("2d");
              var img = new Image();
              img.src = this.fuseLeftImg;
              img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                ctx.strokeStyle = "#44D7B6";
                ctx.lineWidth = 3;
                ctx.strokeRect(
                  location.left,
                  location.top,
                  location.width,
                  location.height
                );
              };
              this.skinLevel = resultData.skin.color;
        //     } else {
        //       this.ifShowLoading = false;
        //       this.$Message.error("请求失败");
        //     }
        //   } else {
        //     this.ifShowLoading = false;
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.ifShowLoading = false;
        //   console.log(err);
        // });
    },
    initfenxiUpload(base) {
      let _this = this;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/face/skinanalysis",
      //   params: {
      //     imgType: "BASE64",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.status == 200) {
      //       if (res.data.code == 200000) {
                 this.ifShowLoading = false;
      //         if (!res.data.data) {
      //           this.$Message.error("返回数据为空");
      //           return;
      //         }
              this.resultArr = [];
              var resultData = {"glabella_wrinkle":{"confidence":0.62106794,"value":1},"crows_feet":{"confidence":0.022812227,"value":0},"dark_circle":{"confidence":0.9757892,"value":1},"forehead_wrinkle":{"confidence":0.000798391,"value":0},"skin_color":{"confidence":0.6115388,"value":2},"mole":{"rectangle":[]},"nasolabial_fold":{"confidence":0.9998747,"value":1},"right_eyelids":{"confidence":0.9910999,"value":2},"skin_spot":{"rectangle":[]},"skin_type":{"details":{"0":{"confidence":0.6173802,"value":1},"1":{"confidence":0.000011178483,"value":0},"2":{"confidence":0.35374817,"value":0},"3":{"confidence":0.028860403,"value":0}},"skin_type":0},"blackhead":{"confidence":0.99987006,"value":0},"eye_pouch":{"confidence":0.6254145,"value":0},"acne":{"rectangle":[]},"skin_age":{"value":20},"pores_jaw":{"confidence":0.9196489,"value":0},"left_eyelids":{"confidence":0.88162136,"value":0},"pores_left_cheek":{"confidence":0.75708383,"value":0},"eye_finelines":{"confidence":0.00089462794,"value":0},"pores_right_cheek":{"confidence":0.92194,"value":0},"pores_forehead":{"confidence":0.6759987,"value":0}};
            //  console.log(JSON.stringify(resultData))
              var resultDataJson = {
                left_eyelids: {
                  name: "左眼双眼皮检测结果",
                  "0": "单眼皮",
                  "1": "平行双眼皮",
                  "2": "扇形双眼皮"
                },
                right_eyelids: {
                  name: "右眼双眼皮检测结果",
                  "0": "单眼皮",
                  "1": "平行双眼皮",
                  "2": "扇形双眼皮"
                },
                eye_pouch: {
                  name: "眼袋检测结果",
                  "0": "无眼袋",
                  "1": "有眼袋"
                },
                dark_circle: {
                  name: "黑眼圈检测结果",
                  "0": "无黑眼圈",
                  "1": "有黑眼圈"
                },
                forehead_wrinkle: {
                  name: "抬头纹检测结果",
                  "0": "无抬头纹",
                  "1": "有抬头纹"
                },
                crows_feet: {
                  name: "鱼尾纹检测结果",
                  "0": "无鱼尾纹",
                  "1": "有鱼尾纹"
                },
                eye_finelines: {
                  name: "眼部细纹检测结果",
                  "0": "无眼部细纹",
                  "1": "有眼部细纹"
                },
                glabella_wrinkle: {
                  name: "眉间纹检测结果",
                  "0": "无眉间纹",
                  "1": "有眉间纹"
                },
                nasolabial_fold: {
                  name: "法令纹检测结果",
                  "0": "无眉间纹",
                  "1": "有眉间纹"
                },
                skin_type: {
                  name: "肤质检测结果",
                  "0": "油性皮肤",
                  "1": "干性皮肤",
                  "2": "中性皮肤",
                  "3": "混合性皮肤"
                },
                pores_forehead: {
                  name: "前额毛孔检测结果",
                  "0": "前额无毛孔粗大",
                  "1": "前额有毛孔粗大"
                },
                pores_left_cheek: {
                  name: "左脸颊毛孔检测结果",
                  "0": "左脸颊无毛孔粗大",
                  "1": "左脸颊有毛孔粗大"
                },
                pores_right_cheek: {
                  name: "右脸颊毛孔检测结果",
                  "0": "右脸颊无毛孔粗大",
                  "1": "右脸颊有毛孔粗大"
                },
                pores_jaw: {
                  name: "下巴毛孔检测结果",
                  "0": "下巴无毛孔粗大",
                  "1": "下巴有毛孔粗大"
                },
                blackhead: {
                  name: "黑头检测结果",
                  "0": "无黑头",
                  "1": "有黑头"
                },
                acne: {
                  name: "痘痘检测结果",
                  "0": "无痘痘",
                  "1": "有痘痘"
                },
                mole: {
                  name: "痣检测结果",
                  "0": "无痣",
                  "1": "有痣"
                },
                skin_spot: {
                  name: "斑点检测结果",
                  "0": "无斑点",
                  "1": "有斑点"
                }
              };
              for (var i in resultDataJson) {
                for (var j in resultData) {
                  var val;
                  if (j == "skin_type") {
                    val = resultData[j].skin_type;
                  } else {
                    val = resultData[j].value;
                  }
                  if (i == j) {
                    this.resultArr.push({
                      resultType: resultDataJson[i].name,
                      result: resultDataJson[i][val]
                    });
                  }
                }
              }
        //     } else {
        //       this.ifShowLoading = false;
        //       this.$Message.error("请求失败");
        //     }
        //   } else {
        //     this.ifShowLoading = false;
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.ifShowLoading = false;
        //   console.log(err);
        // });
    },
    initmbFenxiUpload(base) {
      let _this = this;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/face/featureanalysis",
      //   params: {
      //     type: 3,
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.status == 200) {
      //       if (res.data.code == 200000) {
                 this.ifShowLoading = false;
      //         if (!res.data.data) {
      //           this.$Message.error("返回数据为空");
      //           return;
              //}
              //var resultData = res.data.data.result || {};
              var resultData = {"nose":{"nose_type":"normal_nose","nose_width":38.17},"jaw":{"jaw_angle":158.07,"jaw_type":"square_jaw","jaw_length":37.75,"jaw_width":63.2},"face":{"tempus_length":146.33,"E":143.36,"face_type":"square_face","face_length":192.56,"ABD_ratio":"0.99:1:0.82","mandible_length":120.88,"zygoma_length":147.17},"mouth":{"mouth_type":"normal_lip","angulus_oris":95.47,"mouth_width":50.47,"lip_thickness":8.48,"mouth_height":18.24},"eyebrow":{"brow_uptrend_angle":15.7,"eyebrow_type":"bushy_eyebrows","brow_camber_angle":0.9,"brow_width":39.44,"brow_thick":7.8,"brow_height":8.48},"eyes":{"eye_height":11.45,"eye_width":27.99,"eyes_type":"big_eyes","angulus_oculi_medialis":108.43},"five_eyes":{"righteye":28.84,"lefteye":27.99,"eyes_ratio":"1.03:1.03:1.3:1:0.91","three_eye":{"eyein_length":36.48,"eyein_ratio":1.3,"eyein_result":"eyein_long"},"five_eye":{"lefteye_empty_ratio":0.91,"lefteye_empty_length":25.45,"lefteye_empty_result":"lefteye_empty_long"},"one_eye":{"righteye_empty_ratio":1.03,"righteye_empty_length":28.84,"righteye_empty_result":"righteye_empty_long"}},"golden_triangle":62.14,"three_parts":{"two_part":{"facemid_length":64.89,"facemid_ratio":0.34,"facemid_result":"facemid_normal"},"one_part":{"faceup_result":"faceup_normal","faceup_length":61.07,"faceup_ratio":0.32},"three_part":{"facedown_length":66.59,"facedown_result":"facedown_normal","facedown_ratio":0.34},"parts_ratio":"0.32:0.34:0.34"}};
              var recoFaceDataJson = [
                {
                  three_parts: "三庭",
                  detailPart: [
                    {
                      parts_ratio: "三庭比例",
                      value: ""
                    },
                    {
                      one_part: {
                        name: "上庭分析结果",
                        value: {
                          faceup_length: "上庭长度",
                          faceup_ratio: "上庭占比",
                          faceup_result: {
                            name: "上庭判断结果",
                            value: {
                              faceup_normal: "上庭标准",
                              faceup_long: "上庭偏长",
                              faceup_short: "上庭偏短"
                            }
                          }
                        }
                      }
                    },
                    {
                      two_part: {
                        name: "中庭分析结果",
                        value: {
                          facemid_length: "中庭长度",
                          facemid_ratio: "中庭占比",
                          facemid_result: {
                            name: "中庭判断结果",
                            value: {
                              facemid_normal: "中庭标准",
                              facemid_long: "中庭偏长",
                              facemid_short: "中庭偏短"
                            }
                          }
                        }
                      }
                    },
                    {
                      three_part: {
                        name: "下庭分析结果",
                        value: {
                          facedown_length: "下庭长度",
                          facedown_ratio: "下庭占比",
                          facedown_result: {
                            name: "下庭判断结果",
                            value: {
                              facedown_normal: "下庭标准",
                              facedown_long: "下庭偏长",
                              facedown_short: "下庭偏短"
                            }
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  five_eyes: "五眼",
                  detailPart: [
                    {
                      eyes_ratio: "五眼比例",
                      value: ""
                    },
                    {
                      one_eye: {
                        name: "五眼右侧分析结果",
                        value: {
                          righteye_empty_length: "右外眼角颧弓留白距离",
                          righteye_empty_ratio: "右外眼角颧弓留白占比",
                          righteye_empty_result: {
                            name: "五眼右侧判断结果",
                            value: {
                              righteye_empty_normal: "右眼外侧适中",
                              righteye_empty_short: "右眼外侧偏窄",
                              righteye_empty_long: "右眼外侧偏宽"
                            }
                          }
                        }
                      }
                    },
                    {
                      three_eye: {
                        name: "内眼角间距分析结果",
                        value: {
                          eyein_length: "内眼角间距",
                          eyein_ratio: "内眼角间距占比",
                          eyein_result: {
                            name: "内眼角间距判断结果",
                            value: {
                              eyein_normal: "内眼角间距适中",
                              eyein_short: "内眼角间距偏窄",
                              eyein_long: "内眼角间距偏宽"
                            }
                          }
                        }
                      }
                    },
                    {
                      five_eye: {
                        name: "五眼左侧分析结果",
                        value: {
                          lefteye_empty_length: "左外眼角颧弓留白",
                          lefteye_empty_ratio: "左外眼角颧弓留白占比",
                          lefteye_empty_result: {
                            name: "五眼左侧距判断结果",
                            value: {
                              lefteye_empty_normal: "左眼外侧适中",
                              lefteye_empty_short: "左眼外侧偏窄",
                              lefteye_empty_long: "左眼外侧偏宽"
                            }
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  face: "脸型",
                  detailPart: [
                    {
                      tempus_length: "颞部宽度",
                      value: ""
                    },
                    {
                      zygoma_length: "颧骨宽度",
                      value: ""
                    },
                    {
                      face_length: "脸部长度",
                      value: ""
                    },
                    {
                      mandible_length: "下颌角宽度",
                      value: ""
                    },
                    {
                      E: "下颌角度数",
                      value: ""
                    },
                    {
                      ABD_ratio:
                        "颞部宽度、颧部宽度（固定颧部为1）、下颌角宽度比",
                      value: ""
                    },
                    {
                      face_type: "脸型判断结果",
                      value: {
                        pointed_face: "瓜子脸",
                        oval_face: "椭圆脸",
                        diamond_face: "菱形脸",
                        round_face: "圆形脸",
                        long_face: "长形脸",
                        square_face: "方形脸",
                        normal_face: "标准脸"
                      }
                    }
                  ]
                },
                {
                  jaw: "下巴",
                  detailPart: [
                    {
                      jaw_width: "下巴宽度",
                      value: ""
                    },
                    {
                      jaw_length: "下巴长度",
                      value: ""
                    },
                    {
                      jaw_angle: "下巴角度",
                      value: ""
                    },
                    {
                      jaw_type: "下巴判断结果",
                      value: {
                        flat_jaw: "圆下巴",
                        sharp_jaw: "尖下巴",
                        square_jaw: "方下巴"
                      }
                    }
                  ]
                },
                {
                  eyebrow: "眉型",
                  detailPart: [
                    {
                      brow_width: "眉毛宽度",
                      value: ""
                    },
                    {
                      brow_height: "眉毛高度",
                      value: ""
                    },
                    {
                      brow_uptrend_angle: "眉毛挑度",
                      value: ""
                    },
                    {
                      brow_camber_angle: "眉毛弯度",
                      value: ""
                    },
                    {
                      brow_thick: "眉毛粗细",
                      value: ""
                    },
                    {
                      eyebrow_type: "眉型判断结果",
                      value: {
                        bushy_eyebrows: "粗眉",
                        eight_eyebrows: "八字眉",
                        raise_eyebrows: "上挑眉",
                        straight_eyebrows: "一字眉",
                        round_eyebrows: "拱形眉",
                        arch_eyebrows: "柳叶眉",
                        thin_eyebrows: "细眉"
                      }
                    }
                  ]
                },
                {
                  eyes: "眼型",
                  detailPart: [
                    {
                      eye_width: "眼睛宽度",
                      value: ""
                    },
                    {
                      eye_height: "眼睛高度",
                      value: ""
                    },
                    {
                      angulus_oculi_medialis: "内眦角度数",
                      value: ""
                    },
                    {
                      eyes_type: "眼型判断结果",
                      value: {
                        round_eyes: "圆眼",
                        thin_eyes: "细长眼",
                        big_eyes: "大眼",
                        small_eyes: "小眼",
                        normal_eyes: "标准眼"
                      }
                    }
                  ]
                },
                {
                  nose: "鼻型",
                  detailPart: [
                    {
                      nose_width: "鼻翼宽度",
                      value: ""
                    },
                    {
                      nose_type: "鼻翼判断结果",
                      value: {
                        normal_nose: "标准鼻",
                        thick_nose: "宽鼻",
                        thin_nose: "窄鼻"
                      }
                    }
                  ]
                },
                {
                  mouth: "唇型",
                  detailPart: [
                    {
                      mouth_height: "嘴巴高度",
                      value: ""
                    },
                    {
                      mouth_width: "嘴巴宽度",
                      value: ""
                    },
                    {
                      lip_thickness: "嘴唇厚度",
                      value: ""
                    },
                    {
                      angulus_oris: "嘴角弯曲度",
                      value: ""
                    },
                    {
                      mouth_type: "唇型判断结果",
                      value: {
                        thin_lip: "薄唇",
                        thick_lip: "厚唇",
                        smile_lip: "微笑唇",
                        upset_lip: "态度唇",
                        normal_lip: "标准唇"
                      }
                    }
                  ]
                }
              ];
              var totalRecoFaceData = [];
              for (var i in resultData) {
                for (var j = 0; j < recoFaceDataJson.length; j++) {
                  if (i == Object.keys(recoFaceDataJson[j])[0]) {
                    if (i != "three_parts" && i != "five_eyes") {
                      var detaiPartArr = [];
                      var pArr = recoFaceDataJson[j].detailPart;
                      for (var k = 0; k < pArr.length; k++) {
                        var attr = Object.keys(pArr[k])[0];
                        var totalValue;
                        if (typeof pArr[k].value != "string") {
                          var faceType = pArr[k].value;
                          var str = resultData[i].attr;
                          for (var l in faceType) {
                            totalValue = faceType[l];
                          }
                        } else {
                          totalValue = resultData[i][attr];
                        }
                        detaiPartArr.push({
                          name: pArr[k][attr],
                          value: totalValue
                        });
                      }
                      totalRecoFaceData.push({
                        facePart: recoFaceDataJson[j][i],
                        detailPart: detaiPartArr
                      });
                    } else {
                      var detaiPartArr = [];
                      var pArr = recoFaceDataJson[j].detailPart;
                      for (var d = 0; d < pArr.length; d++) {
                        var str = Object.keys(pArr[d])[0];
                        if (typeof pArr[d][str] == "string") {
                          detaiPartArr.push({
                            name: pArr[d][str],
                            value: resultData[i][str]
                          });
                        } else {
                          var partValueObj = pArr[d][str].value;
                          for (var p in partValueObj) {
                            if (
                              typeof partValueObj[p] == "number" ||
                              typeof partValueObj[p] == "string"
                            ) {
                              detaiPartArr.push({
                                name: partValueObj[p],
                                value: resultData[i][str][p]
                              });
                            } else {
                              var tP = partValueObj[p];
                              for (var z in tP) {
                                if (typeof tP[z] != "string") {
                                  // var value1;
                                  // var tpObj = tP[z].value;
                                  // for(var zz in tpObj){
                                  //   if(zz == resultData[i][str][p]){
                                  //     value1 = tpObj[zz]
                                  //   }
                                  // }
                                  // detaiPartArr.push({
                                  //   name:tP['name'],
                                  //   value:value1
                                  // })
                                } else {
                                  var atVal = resultData[i][str][p];
                                  detaiPartArr.push({
                                    name: tP[z],
                                    value: tP["value"][atVal]
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                      totalRecoFaceData.push({
                        facePart: recoFaceDataJson[j][i],
                        detailPart: detaiPartArr
                      });
                    }
                  }
                }
              }
              this.recoResultArr = totalRecoFaceData;
        //     } else {
        //       this.ifShowLoading = false;
        //       this.$Message.error("请求失败");
        //     }
        //   } else {
        //     this.ifShowLoading = false;
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.ifShowLoading = false;
        //   console.log(err);
        // });
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
    getImg(val, callback) {
      var img = val;
      var image = new Image();
      image.src = img;
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = () => {
        var base64 = this.getBase64Image(image);
        callback(base64);
      };
    },
    fuseBeforeUpload(file) {
      let _this = this;
      this.ifShowLoading = true;
      imgPreviewBase64(_this, file, function(base64) {
        _this.fuseLeftImg = base64;
        getImgSize(_this.fuseLeftImg).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      formData.append("img_type", "FILES");
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/body/skincolor",
        data: formData
      })
        .then(res => {
          if (res.data.code == 200000) {
            this.ifShowLoading = false;
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            var resultData = res.data.data.result.face_list[0];
            var location = resultData.location;
            var canvas = document.getElementById("fsjcCanvasId");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = this.fuseLeftImg;
            img.onload = function() {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              ctx.strokeStyle = "#44D7B6";
              ctx.lineWidth = 3;
              ctx.strokeRect(
                location.left,
                location.top,
                location.width,
                location.height
              );
            };
            this.skinLevel = resultData.skin.color;
          } else {
            this.ifShowLoading = false;
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.ifShowLoading = false;
          console.log(err);
        });
    },
    wuguanBeforeUpload(file) {
      let _this = this;
      this.ifShowLoading = true;
      imgPreviewBase64(_this, file, function(base64) {
        _this.wuguanLeftImg = base64;
        getImgSize(_this.wuguanLeftImg).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      formData.append("img_type", "FILES");
      formData.append("mode", "1");
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/face/faceshape",
        data: formData
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200000) {
              this.ifShowLoading = false;
              if (!res.data.data) {
                this.$Message.error("返回数据为空");
                return;
              }
              var resultData =
                res.data.data.data.face_shape_list.length > 0
                  ? res.data.data.data.face_shape_list[0]
                  : [];
              var totalPoint = [];
              for (var attr in resultData) {
                totalPoint = totalPoint.concat(resultData[attr]);
              }
              var dotSize = 6;
              var canvas = document.getElementById("wuguanCanvasId");
              var ctx = canvas.getContext("2d");
              var img = new Image();
              img.src = this.wuguanLeftImg;
              img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                totalPoint.forEach(function(item, i) {
                  var x0 = item.x;
                  var y0 = item.y;
                  var x1 = Math.floor(x0 - dotSize / 2);
                  var y1 = Math.floor(y0 - dotSize / 2);
                  var x2 = Math.floor(x0 - dotSize / 2);
                  var y2 = Math.floor(y0 + dotSize / 2);
                  var x3 = Math.floor(x0 + dotSize / 2);
                  var y3 = Math.floor(y0 - dotSize / 2);
                  var x4 = Math.floor(x0 + dotSize / 2);
                  var y4 = Math.floor(y0 + dotSize / 2);
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x2, y2);
                  ctx.lineTo(x4, y4);
                  ctx.lineTo(x3, y3);
                  ctx.closePath();
                  ctx.fillStyle = "#03A971";
                  ctx.fill();
                });
              };
            } else {
              this.ifShowLoading = false;
              this.$Message.error("请求失败");
            }
          } else {
            this.ifShowLoading = false;
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.ifShowLoading = false;
          console.log(err);
        });
    },
    guanjianBeforeUpload(file) {
      let _this = this;
      this.ifShowLoading = true;
      imgPreviewBase64(_this, file, function(base64) {
        _this.guanjianLeftImg = base64;
        getImgSize(_this.guanjianLeftImg).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      formData.append("type", 1);
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/face/keypoints",
        data: formData
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200000) {
              this.ifShowLoading = false;
              if (!res.data.data) {
                this.$Message.error("返回数据为空");
                return;
              }
              var dotSize = 4;
              var canvas = document.getElementById("guajianCanvasId");
              var ctx = canvas.getContext("2d");
              var img = new Image();
              img.src = this.guanjianLeftImg;
              img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                if (res.data.data.error_message) {
                  _this.ifshowErrModel = true;
                  _this.errorMsg = res.data.data.error_message;
                  return;
                }
                var resultData = res.data.data.face.landmark || {};
                var totalPoint = [];
                for (var attr in resultData) {
                  var resultObj = resultData[attr];
                  for (var j in resultObj) {
                    totalPoint = totalPoint.concat(resultObj[j]);
                  }
                }
                totalPoint.forEach(function(item, i) {
                  _this.ifshowErrModel = false;
                  var x0 = item.x;
                  var y0 = item.y;
                  var x1 = Math.floor(x0 - dotSize / 2);
                  var y1 = Math.floor(y0 - dotSize / 2);
                  var x2 = Math.floor(x0 - dotSize / 2);
                  var y2 = Math.floor(y0 + dotSize / 2);
                  var x3 = Math.floor(x0 + dotSize / 2);
                  var y3 = Math.floor(y0 - dotSize / 2);
                  var x4 = Math.floor(x0 + dotSize / 2);
                  var y4 = Math.floor(y0 + dotSize / 2);
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x2, y2);
                  ctx.lineTo(x4, y4);
                  ctx.lineTo(x3, y3);
                  ctx.closePath();
                  ctx.fillStyle = "#03A971";
                  ctx.fill();
                });
              };
            } else {
              this.ifShowLoading = false;
              this.$Message.error("请求失败");
            }
          } else {
            this.ifShowLoading = false;
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fenxiBeforeUpload(file) {
      let _this = this;
      this.ifShowLoading = true;
      imgPreviewBase64(_this, file, function(base64) {
        _this.fenxileftImg = base64;
        getImgSize(_this.fenxileftImg).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      formData.append("imgType", "FILES");
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/face/skinanalysis",
        data: formData
      })
        .then(res => {
          if (res.data.code == 200000) {
            this.ifShowLoading = false;
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.resultArr = [];
            var resultData = res.data.data.result;
            var resultDataJson = {
              left_eyelids: {
                name: "左眼双眼皮检测结果",
                "0": "单眼皮",
                "1": "平行双眼皮",
                "2": "扇形双眼皮"
              },
              right_eyelids: {
                name: "右眼双眼皮检测结果",
                "0": "单眼皮",
                "1": "平行双眼皮",
                "2": "扇形双眼皮"
              },
              eye_pouch: {
                name: "眼袋检测结果",
                "0": "无眼袋",
                "1": "有眼袋"
              },
              dark_circle: {
                name: "黑眼圈检测结果",
                "0": "无黑眼圈",
                "1": "有黑眼圈"
              },
              forehead_wrinkle: {
                name: "抬头纹检测结果",
                "0": "无抬头纹",
                "1": "有抬头纹"
              },
              crows_feet: {
                name: "鱼尾纹检测结果",
                "0": "无鱼尾纹",
                "1": "有鱼尾纹"
              },
              eye_finelines: {
                name: "眼部细纹检测结果",
                "0": "无眼部细纹",
                "1": "有眼部细纹"
              },
              glabella_wrinkle: {
                name: "眉间纹检测结果",
                "0": "无眉间纹",
                "1": "有眉间纹"
              },
              nasolabial_fold: {
                name: "法令纹检测结果",
                "0": "无眉间纹",
                "1": "有眉间纹"
              },
              skin_type: {
                name: "肤质检测结果",
                "0": "油性皮肤",
                "1": "干性皮肤",
                "2": "中性皮肤",
                "3": "混合性皮肤"
              },
              pores_forehead: {
                name: "前额毛孔检测结果",
                "0": "前额无毛孔粗大",
                "1": "前额有毛孔粗大"
              },
              pores_left_cheek: {
                name: "左脸颊毛孔检测结果",
                "0": "左脸颊无毛孔粗大",
                "1": "左脸颊有毛孔粗大"
              },
              pores_right_cheek: {
                name: "右脸颊毛孔检测结果",
                "0": "右脸颊无毛孔粗大",
                "1": "右脸颊有毛孔粗大"
              },
              pores_jaw: {
                name: "下巴毛孔检测结果",
                "0": "下巴无毛孔粗大",
                "1": "下巴有毛孔粗大"
              },
              blackhead: {
                name: "黑头检测结果",
                "0": "无黑头",
                "1": "有黑头"
              },
              acne: {
                name: "痘痘检测结果",
                "0": "无痘痘",
                "1": "有痘痘"
              },
              mole: {
                name: "痣检测结果",
                "0": "无痣",
                "1": "有痣"
              },
              skin_spot: {
                name: "斑点检测结果",
                "0": "无斑点",
                "1": "有斑点"
              }
            };
            for (var i in resultDataJson) {
              for (var j in resultData) {
                var val;
                if (j == "skin_type") {
                  val = resultData[j].skin_type;
                } else {
                  val = resultData[j].value;
                }
                if (i == j) {
                  this.resultArr.push({
                    resultType: resultDataJson[i].name,
                    result: resultDataJson[i][val]
                  });
                }
              }
            }
          } else {
            this.ifShowLoading = false;
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.ifShowLoading = false;
          console.log(err);
        });
    },
    mbFenxiBeforeUpload(file) {
      let _this = this;
      this.ifShowLoading = true;
      imgPreviewBase64(_this, file, function(base64) {
        _this.mbFenxileftImg = base64;
        getImgSize(_this.mbFenxileftImg).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      formData.append("type", 1);
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/face/featureanalysis",
        data: formData
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200000) {
              this.ifShowLoading = false;
              if (!res.data.data) {
                this.$Message.error("返回数据为空");
                return;
              }
              var resultData = res.data.data.result || {};
              var recoFaceDataJson = [
                {
                  three_parts: "三庭",
                  detailPart: [
                    {
                      parts_ratio: "三庭比例",
                      value: ""
                    },
                    {
                      one_part: {
                        name: "上庭分析结果",
                        value: {
                          faceup_length: "上庭长度",
                          faceup_ratio: "上庭占比",
                          faceup_result: {
                            name: "上庭判断结果",
                            value: {
                              faceup_normal: "上庭标准",
                              faceup_long: "上庭偏长",
                              faceup_short: "上庭偏短"
                            }
                          }
                        }
                      }
                    },
                    {
                      two_part: {
                        name: "中庭分析结果",
                        value: {
                          facemid_length: "中庭长度",
                          facemid_ratio: "中庭占比",
                          facemid_result: {
                            name: "中庭判断结果",
                            value: {
                              facemid_normal: "中庭标准",
                              facemid_long: "中庭偏长",
                              facemid_short: "中庭偏短"
                            }
                          }
                        }
                      }
                    },
                    {
                      three_part: {
                        name: "下庭分析结果",
                        value: {
                          facedown_length: "下庭长度",
                          facedown_ratio: "下庭占比",
                          facedown_result: {
                            name: "下庭判断结果",
                            value: {
                              facedown_normal: "下庭标准",
                              facedown_long: "下庭偏长",
                              facedown_short: "下庭偏短"
                            }
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  five_eyes: "五眼",
                  detailPart: [
                    {
                      eyes_ratio: "五眼比例",
                      value: ""
                    },
                    {
                      one_eye: {
                        name: "五眼右侧分析结果",
                        value: {
                          righteye_empty_length: "右外眼角颧弓留白距离",
                          righteye_empty_ratio: "右外眼角颧弓留白占比",
                          righteye_empty_result: {
                            name: "五眼右侧判断结果",
                            value: {
                              righteye_empty_normal: "右眼外侧适中",
                              righteye_empty_short: "右眼外侧偏窄",
                              righteye_empty_long: "右眼外侧偏宽"
                            }
                          }
                        }
                      }
                    },
                    {
                      three_eye: {
                        name: "内眼角间距分析结果",
                        value: {
                          eyein_length: "内眼角间距",
                          eyein_ratio: "内眼角间距占比",
                          eyein_result: {
                            name: "内眼角间距判断结果",
                            value: {
                              eyein_normal: "内眼角间距适中",
                              eyein_short: "内眼角间距偏窄",
                              eyein_long: "内眼角间距偏宽"
                            }
                          }
                        }
                      }
                    },
                    {
                      five_eye: {
                        name: "五眼左侧分析结果",
                        value: {
                          lefteye_empty_length: "左外眼角颧弓留白",
                          lefteye_empty_ratio: "左外眼角颧弓留白占比",
                          lefteye_empty_result: {
                            name: "五眼左侧距判断结果",
                            value: {
                              lefteye_empty_normal: "左眼外侧适中",
                              lefteye_empty_short: "左眼外侧偏窄",
                              lefteye_empty_long: "左眼外侧偏宽"
                            }
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  face: "脸型",
                  detailPart: [
                    {
                      tempus_length: "颞部宽度",
                      value: ""
                    },
                    {
                      zygoma_length: "颧骨宽度",
                      value: ""
                    },
                    {
                      face_length: "脸部长度",
                      value: ""
                    },
                    {
                      mandible_length: "下颌角宽度",
                      value: ""
                    },
                    {
                      E: "下颌角度数",
                      value: ""
                    },
                    {
                      ABD_ratio:
                        "颞部宽度、颧部宽度（固定颧部为1）、下颌角宽度比",
                      value: ""
                    },
                    {
                      face_type: "脸型判断结果",
                      value: {
                        pointed_face: "瓜子脸",
                        oval_face: "椭圆脸",
                        diamond_face: "菱形脸",
                        round_face: "圆形脸",
                        long_face: "长形脸",
                        square_face: "方形脸",
                        normal_face: "标准脸"
                      }
                    }
                  ]
                },
                {
                  jaw: "下巴",
                  detailPart: [
                    {
                      jaw_width: "下巴宽度",
                      value: ""
                    },
                    {
                      jaw_length: "下巴长度",
                      value: ""
                    },
                    {
                      jaw_angle: "下巴角度",
                      value: ""
                    },
                    {
                      jaw_type: "下巴判断结果",
                      value: {
                        flat_jaw: "圆下巴",
                        sharp_jaw: "尖下巴",
                        square_jaw: "方下巴"
                      }
                    }
                  ]
                },
                {
                  eyebrow: "眉型",
                  detailPart: [
                    {
                      brow_width: "眉毛宽度",
                      value: ""
                    },
                    {
                      brow_height: "眉毛高度",
                      value: ""
                    },
                    {
                      brow_uptrend_angle: "眉毛挑度",
                      value: ""
                    },
                    {
                      brow_camber_angle: "眉毛弯度",
                      value: ""
                    },
                    {
                      brow_thick: "眉毛粗细",
                      value: ""
                    },
                    {
                      eyebrow_type: "眉型判断结果",
                      value: {
                        bushy_eyebrows: "粗眉",
                        eight_eyebrows: "八字眉",
                        raise_eyebrows: "上挑眉",
                        straight_eyebrows: "一字眉",
                        round_eyebrows: "拱形眉",
                        arch_eyebrows: "柳叶眉",
                        thin_eyebrows: "细眉"
                      }
                    }
                  ]
                },
                {
                  eyes: "眼型",
                  detailPart: [
                    {
                      eye_width: "眼睛宽度",
                      value: ""
                    },
                    {
                      eye_height: "眼睛高度",
                      value: ""
                    },
                    {
                      angulus_oculi_medialis: "内眦角度数",
                      value: ""
                    },
                    {
                      eyes_type: "眼型判断结果",
                      value: {
                        round_eyes: "圆眼",
                        thin_eyes: "细长眼",
                        big_eyes: "大眼",
                        small_eyes: "小眼",
                        normal_eyes: "标准眼"
                      }
                    }
                  ]
                },
                {
                  nose: "鼻型",
                  detailPart: [
                    {
                      nose_width: "鼻翼宽度",
                      value: ""
                    },
                    {
                      nose_type: "鼻翼判断结果",
                      value: {
                        normal_nose: "标准鼻",
                        thick_nose: "宽鼻",
                        thin_nose: "窄鼻"
                      }
                    }
                  ]
                },
                {
                  mouth: "唇型",
                  detailPart: [
                    {
                      mouth_height: "嘴巴高度",
                      value: ""
                    },
                    {
                      mouth_width: "嘴巴宽度",
                      value: ""
                    },
                    {
                      lip_thickness: "嘴唇厚度",
                      value: ""
                    },
                    {
                      angulus_oris: "嘴角弯曲度",
                      value: ""
                    },
                    {
                      mouth_type: "唇型判断结果",
                      value: {
                        thin_lip: "薄唇",
                        thick_lip: "厚唇",
                        smile_lip: "微笑唇",
                        upset_lip: "态度唇",
                        normal_lip: "标准唇"
                      }
                    }
                  ]
                }
              ];
              var totalRecoFaceData = [];
              for (var i in resultData) {
                for (var j = 0; j < recoFaceDataJson.length; j++) {
                  if (i == Object.keys(recoFaceDataJson[j])[0]) {
                    if (i != "three_parts" && i != "five_eyes") {
                      var detaiPartArr = [];
                      var pArr = recoFaceDataJson[j].detailPart;
                      for (var k = 0; k < pArr.length; k++) {
                        var attr = Object.keys(pArr[k])[0];
                        var totalValue;
                        if (typeof pArr[k].value != "string") {
                          var faceType = pArr[k].value;
                          var str = resultData[i].attr;
                          for (var l in faceType) {
                            totalValue = faceType[l];
                          }
                        } else {
                          totalValue = resultData[i][attr];
                        }
                        detaiPartArr.push({
                          name: pArr[k][attr],
                          value: totalValue
                        });
                      }
                      totalRecoFaceData.push({
                        facePart: recoFaceDataJson[j][i],
                        detailPart: detaiPartArr
                      });
                    } else {
                      var detaiPartArr = [];
                      var pArr = recoFaceDataJson[j].detailPart;
                      for (var d = 0; d < pArr.length; d++) {
                        var str = Object.keys(pArr[d])[0];
                        if (typeof pArr[d][str] == "string") {
                          detaiPartArr.push({
                            name: pArr[d][str],
                            value: resultData[i][str]
                          });
                        } else {
                          var partValueObj = pArr[d][str].value;
                          for (var p in partValueObj) {
                            if (
                              typeof partValueObj[p] == "number" ||
                              typeof partValueObj[p] == "string"
                            ) {
                              detaiPartArr.push({
                                name: partValueObj[p],
                                value: resultData[i][str][p]
                              });
                            } else {
                              var tP = partValueObj[p];
                              for (var z in tP) {
                                if (typeof tP[z] != "string") {
                                  // var value1;
                                  // var tpObj = tP[z].value;
                                  // for(var zz in tpObj){
                                  //   if(zz == resultData[i][str][p]){
                                  //     value1 = tpObj[zz]
                                  //   }
                                  // }
                                  // detaiPartArr.push({
                                  //   name:tP['name'],
                                  //   value:value1
                                  // })
                                } else {
                                  var atVal = resultData[i][str][p];
                                  detaiPartArr.push({
                                    name: tP[z],
                                    value: tP["value"][atVal]
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                      totalRecoFaceData.push({
                        facePart: recoFaceDataJson[j][i],
                        detailPart: detaiPartArr
                      });
                    }
                  }
                }
              }
              this.recoResultArr = totalRecoFaceData;
            } else {
              this.ifShowLoading = false;
              this.$Message.error("请求失败");
            }
          } else {
            this.ifShowLoading = false;
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.ifShowLoading = false;
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="less">
.Detail_experience_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  // align-items: flex-start;
  .RecDetail_left {
    width: 49%;
    .RecDetail_left_top {
      width: 100%;
      font-size: 18px;
      color: #121c33;
      margin-bottom: 20px;
    }
    .RecDetail_left_bottom {
      width: 100%;
      position: relative;
      border: 1px solid #ebecf0;
      .Img_container {
        width: 100%;
        background: rgba(192, 204, 218, 0.1);
        position: relative;
        &.whFlag {
          height: 400px;
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
        canvas {
          width: 100%;
          display: block;
        }
        img {
          width: 100%;
          display: block;
        }

        img[src=""],
        img:not([src]) {
          opacity: 0;
        }
      }
      .info_btn {
        width: 100%;
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        margin-top: -6px;
        background-color: rgba(18, 28, 51, 0.85);
        padding: 10px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
          width: 100%;
          font-size: 12px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          text-align: justify;
          span {
            width: 40%;
          }
          span:nth-child(1) {
            font-size: 24px;
            text-align: justify;
            line-height: 20px;
          }
          span:nth-child(2) {
            text-align: end;
          }
        }
        .ivbutton {
          width: 100px;
          height: 30px;
          align-items: center;
          .ivu-upload {
            /deep/.ivu-upload-select {
              .ivu-btn-default {
                background: #03a971 !important;
                border: none !important;
                span {
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
    }
  }
  .fuseResult {
    height: 350px;
  }
  .ivu-alert-with-icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 110%;
    left: 50%;
    width: 60%;
    height: 12%;
    transform: translateX(-50%);
    /deep/.ivu-alert-icon {
      font-size: 16px;
      top: 6px;
      left: 96% !important;
      position: absolute;
    }
  }
  .RecDetail_right {
    width: 49%;
    background: rgba(192, 204, 218, 0.1);
    border: 1px solid #ebecf0;
    box-sizing: border-box;
    position: relative;
    canvas {
      width: 100%;
      display: block;
    }
    img {
      width: 100%;
      display: block;
    }
    &.whFlag {
      height: 400px;
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
    .RecDetail_right_top {
      width: 100%;
      font-size: 18px;
      color: #121c33;
      margin-bottom: 20px;
    }
    .RecDetail_right_bottom {
      position: absolute;
      width: 100%;
      padding: 20px;
      height: 100%;
      overflow: auto;
      .reco_result {
        font-size: 18px;
        color: #121c33;
        margin-bottom: 10px;
      }
      .result_text {
        display: flex;
        font-size: 12px;
        color: #3d4966;
        letter-spacing: 0;
        line-height: 22px;
        .result_text_left {
          width: 60%;
        }
        .result_text_right {
          flex-grow: 1;
        }
      }
      .mbReco_result {
        display: flex;
        flex-direction: column;
        .mbReco_title {
          font-size: 14px;
          color: #3d4966;
          letter-spacing: 0;
        }
        .detailPart_container {
          padding-left: 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #3d4966;
          letter-spacing: 0;
          line-height: 22px;
        }
      }
      p {
        font-size: 14px;
        color: #121c33;
        letter-spacing: 0;
        line-height: 24px;
      }
      .titile_container {
        font-size: 14px;
        color: #121c33;
        letter-spacing: 0;
        line-height: 24px;
        .title_left {
          display: inline-block;
          margin-right: 35px;
          width: 41px;
          margin-bottom: 20px;
        }
      }
      .content_container {
        display: flex;
        align-items: center;
        .index {
          width: 41px;
          margin-right: 35px;
        }
      }
    }
    .RecDetail_right_bottom {
      overflow: hidden !important;
    }
    .RecDetail_right_bottom:hover {
      overflow: auto !important;
    }
    .RecDetail_right_bottom::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .RecDetail_right_bottom::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #999999;
      height: 40px;
    }
    .RecDetail_right_bottom::-webkit-scrollbar-track {
      border-radius: 0;
      background: white;
    }
  }
  .ivu-input-hide-icon {
    width: 371px;
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .demo-spin-col {
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /deep/.ivu-spin-text {
      width: 200px;
    }
  }
}
</style>
