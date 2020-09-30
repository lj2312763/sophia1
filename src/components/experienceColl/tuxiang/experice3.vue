<template>
  <div class="experience experience1">
    <!-- 已完成的功能 -->
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <!-- 车型识别 -->
    <div class="fn_container" v-if="routeId == '3.5.1'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result"
              :key="index"
              style="display:flex"
            >
              <span style="width:150px">{{ item.name }} {{ item.year }}</span>
              <span style="flex:1">
                <Progress
                  :percent="Number((item.score * 100).toFixed(2))"
                  status="active"
                >
                  <span>{{ Number(item.score).toFixed(2) }}</span>
                </Progress>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 车辆检测 -->
    <div class="fn_container" v-if="routeId == '3.5.2'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload2"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic2" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result2"
              :key="index"
              style="margin-bottom:20px"
            >
              <div>名称：{{ item.type }}</div>
              <div>置信度：{{ item.probability }}</div>
              <div>距上：{{ item.location.top }}</div>
              <div>距左：{{ item.location.left }}</div>
              <div>宽度：{{ item.location.width }}</div>
              <div>高度：{{ item.location.height }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 车流统计 -->
    <div class="experience_container" v-if="routeId == '3.5.3'">
      <div class="content">
        <div class="left" style="background:#000">
          <div class="left_box" style="width:80%;margin:auto;">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload3"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic3" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>

        <div class="analy_result_text">分析结果：</div>
        <div class="result_container" v-if="vehicle_numObj && vehicle_countObj">
          <div class="title">
            <div>车辆类型</div>
            <div>当前画面车辆数</div>
            <div>驶入区域累计车辆数</div>
            <div>驶出区域累计车辆数</div>
          </div>
          <div class="baokongCon">
            <div>小汽车</div>
            <div>{{ vehicle_numObj.car }}</div>
            <div>{{ vehicle_countObj.car.in }}</div>
            <div>{{ vehicle_countObj.car.out }}</div>
          </div>
          <div class="seQin">
            <div>卡&nbsp;&nbsp;车</div>
            <div>{{ vehicle_numObj.truck }}</div>
            <div>{{ vehicle_countObj.truck.in }}</div>
            <div>{{ vehicle_countObj.truck.out }}</div>
          </div>
          <div class="zhengZhi">
            <div>摩托车</div>
            <div>{{ vehicle_numObj.motorbike }}</div>
            <div>{{ vehicle_countObj.motorbike.in }}</div>
            <div>{{ vehicle_countObj.motorbike.out }}</div>
          </div>
          <div class="weijin">
            <div>巴&nbsp;&nbsp;士</div>
            <div>{{ vehicle_numObj.bus }}</div>
            <div>{{ vehicle_countObj.bus.in }}</div>
            <div>{{ vehicle_countObj.bus.out }}</div>
          </div>
          <div class="guanggao">
            <div>三轮车</div>
            <div>{{ vehicle_numObj.tricycle }}</div>
            <div>{{ vehicle_countObj.tricycle.in }}</div>
            <div>{{ vehicle_countObj.tricycle.out }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 车辆属性识别 -->
    <div class="fn_container" v-if="routeId == '3.5.4'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload4"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic4" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result4"
              :key="index"
              style="margin-bottom:20px"
            >
              <div>{{ item.attributes.vehicle_type.name }}</div>
              <!-- <div>置信度：{{item.probability}}</div> -->
              <div>{{ item.attributes.window_rain_eyebrow.score }}</div>
              <div>{{ item.attributes.roof_rack.score }}</div>
              <div>{{ item.attributes.skylight.score }}</div>
              <div>{{ item.attributes.in_car_item.score }}</div>
              <div>{{ item.attributes.rearview_item.score }}</div>
              <div>{{ item.attributes.copilot.score }}</div>
              <div>{{ item.attributes.driver_belt.score }}</div>
              <div>{{ item.attributes.copilot_belt.score }}</div>
              <div>{{ item.attributes.driver_visor.score }}</div>
              <div>{{ item.attributes.copilot_visor.score }}</div>
              <div>{{ item.attributes.direction.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 车辆损伤识别 -->
    <div class="fn_container" v-if="routeId == '3.5.5'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload5"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic5" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result5"
              :key="index"
              style="margin-bottom:20px"
            >
              <div>置信度：{{ item.probability }}</div>
              <div>位置：{{ item.parts }}</div>
              <div>类型：{{ item.type }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 车辆分割 -->
    <div class="fn_container" v-if="routeId == '3.5.6'">
      <div class="content">
        <div class="leftn left_box1">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload6"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic6" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="rightn right1" :class="{ whFlag: !whFlag }">
          <div class="right_box">
            <img :src="result6" alt style="display:block;width:100%" />
            <div class="intro">
              <div class="text">分割图</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 颜龄检测 （暂不维护）-->
    <div class="fn_container" v-if="routeId == '3.4.13'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload7"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic7" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <!-- <div v-for="(item,index) in result7" :key=index style="margin-bottom:20px">
              <div>年龄：{{item.age}}</div>
              <div>颜值：{{item.type}}</div>
              
            </div>-->
            系统繁忙请稍后重试
          </div>
        </div>
      </div>
    </div>

    <!-- 图像清晰度增强 -->
    <div class="fn_container" v-if="routeId == '3.4.8'">
      <div class="content">
        <div class="leftn left_box1">
          <div class="left_box">
            <!-- :format="['pcm','mp3','wav']" -->
            <!-- :on-success="handleSuccess" -->
            <!-- :on-format-error="handleFormatError" -->
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload8"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic8" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>

        <div class="rightn right1" :class="{ whFlag: !whFlag }">
          <img :src="result8" alt />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 天空分割 -->
    <div class="fn_container" v-if="routeId == '3.4.14'">
      <div class="content">
        <div class="leftn left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload9"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic9" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="rightn right1" :class="{ whFlag: !whFlag }">
          <img :src="result9" alt />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 动漫化 -->
    <div class="fn_container" v-if="routeId == '3.4.20'">
      <div class="content">
        <div class="leftn left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload10"
              :max-size="5120"
              style="width:100%;height:100%"
              action
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic10" alt />
                </div>
                <div class="intro">
                  <div class="text">
                    图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过5M
                  </div>
                  <i-button type="success">上传图片</i-button>
                </div>
              </div>
            </Upload>
          </div>
        </div>
        <div class="rightn right1" :class="{ whFlag: !whFlag }">
          <img :src="result10" alt />
          <div class="intro">
            <div class="text">处理后</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";
export default {
  props: ["routeId"],
  data() {
    return {
      whFlag: true,
      isloading: true,
      result: "",
      uploadPic: window.config.iconUrl+"/static/images/cheliang/1.png",
      result2: "",
      uploadPic2: window.config.iconUrl+"/static/images/cheliang/2.png",
      result3: "",
      uploadPic3: window.config.iconUrl+"/static/images/cheliang/5.png",
      result4: [],
      uploadPic4: window.config.iconUrl+"/static/images/cheliang/6.png",
      result5: "",
      uploadPic5: window.config.iconUrl+"/static/images/cheliang/7.png",
      result6: "",
      uploadPic6: window.config.iconUrl+"/static/images/cheliang/8.png",
      result7: "",
      uploadPic7:window.config.iconUrl+"/static/images/xiaoguo/woman-wearing-pink-collared-half-sleeved-top-1036623.jpg",
      result8: "",
      uploadPic8: window.config.iconUrl+"/static/images/xiaoguo/15.png",
      result9: "",
      uploadPic9: window.config.iconUrl+"/static/images/xiaoguo/19.png",
      result10: "",
      uploadPic10:require("@/assets/images/renlian/renxiang-xiaoguo/7.png"),
      uploadPic11:window.config.iconUrl+"/static/images/xiaoguo/26.png",
      vehicle_countObj: null,
      vehicle_numObj: null
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
    getImg1(val, callback) {
      var img = val;
      var image = new Image();
      image.src = img;
      image.crossOrigin = "anonymous";
      console.log(1111111)
      image.onload = () => {
        console.log(2222222)
        //var base64 = this.getBase64Image(image);
        callback();
      };
    },
    select() {
      if (this.routeId == "3.5.1") {
        this.getImg1(this.uploadPic, () => {
          this.upload(this.uploadPic);
        });
      } else if (this.routeId == "3.5.2") {
        this.getImg1(this.uploadPic2, () => {
          this.upload2(this.uploadPic2);
        });
      } else if (this.routeId == "3.5.3") {
        this.getImg1(this.uploadPic3, () => {
          this.upload3(this.uploadPic3);
        });
      } else if (this.routeId == "3.5.4") {
        this.getImg1(this.uploadPic4, () => {
          this.upload4(this.uploadPic4);
        });
      } else if (this.routeId == "3.5.5") {
        this.getImg1(this.uploadPic5, () => {
          this.upload5(this.uploadPic5);
        });
      } else if (this.routeId == "3.5.6") {
        this.getImg1(this.uploadPic6, () => {
          this.upload6(this.uploadPic6);
        });
      } else if (this.routeId == "3.4.13") {
        this.getImg1(this.uploadPic7, () => {
          this.upload7(this.uploadPic7);
        });
      } else if (this.routeId == "3.4.8") {
        this.upload8(this.uploadPic8);
        this.getImg1(this.uploadPic8, () => {
          this.upload8(this.uploadPic8);
        });
      } else if (this.routeId == "3.4.14") {
        this.getImg1(this.uploadPic9, () => {
          this.upload9(this.uploadPic9);
        });
      } else if (this.routeId == "3.4.20") {
        this.getImg1(this.uploadPic10, () => {
          this.upload10(this.uploadPic10);
        });
      }
    },
    handleBeforeUpload(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic = base64;
        getImgSize(_this.uploadPic).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/carIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result = res.data.data.result;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload(base) {
      // this.isloading = true;
      // this.result = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/carIdentify",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
          this.isloading = false;
          // if (res.data.code == 200000) {
          //   if (!res.data.data) {
          //     this.$Message.error("返回数据为空");
          //     return;
          //   }
            this.result = [
              {score: 0.9486455321311951, year: "2018", name: "丰田坦途"},
              {score: 0.03138638287782669, year: "2017", name: "丰田Tacoma"},
              {score: 0.008211802691221237, year: "2016", name: "本田Ridgeline"},
              {score: 0.005508309230208397, year: "无年份信息", name: "日产Titan"},
              {score: 0.002496341476216912, year: "2018", name: "GMCSierra"}
            ];
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload2(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic2 = base64;
        getImgSize(_this.uploadPic2).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result2 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/carTestIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            var result = res.data.data.vehicle_info;
            if (result.length > 0) {
              for (var i = 0; i < result.length; i++) {
                var retAtt = result[i];
                if (retAtt.type == "car") {
                  retAtt.type = "小汽车";
                }
                if (retAtt.type == "truck") {
                  retAtt.type = "卡车";
                }
                if (retAtt.type == "bus") {
                  retAtt.type = "巴士";
                }

                if (retAtt.type == "tricycle") {
                  retAtt.type = "三轮车";
                }
                if (retAtt.type == "motorbike") {
                  retAtt.type = "摩托车";
                }
                if (retAtt.type == "carplate") {
                  retAtt.type = "车牌";
                }
              }
            } else {
              this.$Message.error("返回数据为空");
            }
            this.result2 = result;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload2(base) {
      // this.isloading = true;
      // this.result2 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/carTestIdentify",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
          this.isloading = false;
          // if (res.data.code == 200000) {
          //   if (!res.data.data) {
          //     this.$Message.error("返回数据为空");
          //     return;
          //   }
            // this.result2=res.data.data.vehicle_info;
            var result = [{"probability":0.9648990631103516,"location":{"top":620,"left":654,"width":465,"height":330},"type":"car"},{"probability":0.9546805620193481,"location":{"top":363,"left":342,"width":460,"height":389},"type":"car"}];
            if (result.length > 0) {
              for (var i = 0; i < result.length; i++) {
                var retAtt = result[i];
                if (retAtt.type == "car") {
                  retAtt.type = "小汽车";
                }
                if (retAtt.type == "truck") {
                  retAtt.type = "卡车";
                }
                if (retAtt.type == "bus") {
                  retAtt.type = "巴士";
                }

                if (retAtt.type == "tricycle") {
                  retAtt.type = "三轮车";
                }
                if (retAtt.type == "motorbike") {
                  retAtt.type = "摩托车";
                }
                if (retAtt.type == "carplate") {
                  retAtt.type = "车牌";
                }
              }
            } else {
              this.$Message.error("返回数据为空");
            }
            this.result2 = result;
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload3(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic3 = base64;
        getImgSize(_this.uploadPic3).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.vehicle_countObj = null;
      this.vehicle_numObj = null;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/trafficFlowSti?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            // this.uploadPic3="data:image/png;base64,"+res.data.data.image;
            // this.result3=res.data.data;
            this.vehicle_countObj = res.data.data.vehicle_count
              ? res.data.data.vehicle_count
              : null;
            this.vehicle_numObj = res.data.data.vehicle_num
              ? res.data.data.vehicle_num
              : null;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload3(base) {
      // this.isloading = true;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/trafficFlowSti",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
            this.isloading = false;
      //     if (res.data.code == 200000) {
            this.uploadPic3 = window.config.iconUrl+"/static/images/cheliang/cheLiu.png",
            this.vehicle_countObj = {
              bus: {in: 0, out: 0},
              car: {in: 0, out: 0},
              motorbike: {in: 0, out: 0},
              tricycle: {in: 0, out: 0},
              truck: {in: 0, out: 0}
            };
            this.vehicle_numObj = {
              bus: 0,
              car: 6,
              motorbike: 0,
              tricycle: 0,
              truck: 2
            };
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload4(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic4 = base64;
        getImgSize(_this.uploadPic4).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result4 = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/carAttribute?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result4 = [];
            // this.result4=res.data.data.vehicle_info;
            var result = res.data.data.vehicle_info;
            if (result.length > 0) {
              for (var i = 0; i < result.length; i++) {
                var retAtt = result[i];
                if (retAtt.attributes.copilot_visor.score > 0.2) {
                  retAtt.attributes.copilot_visor.score =
                    "副驾驶位遮阳板有放下";
                } else {
                  retAtt.attributes.copilot_visor.score =
                    "副驾驶位遮阳板没有放下";
                }
                if (retAtt.attributes.window_rain_eyebrow.score > 0.02) {
                  retAtt.attributes.window_rain_eyebrow.score = "有车窗雨眉";
                } else {
                  retAtt.attributes.window_rain_eyebrow.score = "无车窗雨眉";
                }
                if (retAtt.attributes.roof_rack.score > 0.01) {
                  retAtt.attributes.roof_rack.score = "有车顶架";
                } else {
                  retAtt.attributes.roof_rack.score = "无车顶架";
                }
                if (retAtt.attributes.skylight.score > 0.5) {
                  retAtt.attributes.skylight.score = "有天窗";
                } else {
                  retAtt.attributes.skylight.score = "无天窗";
                }
                if (retAtt.attributes.in_car_item.score > 0.35) {
                  retAtt.attributes.in_car_item.score = "有车内摆放物";
                } else {
                  retAtt.attributes.in_car_item.score = "有车内摆放物";
                }
                if (retAtt.attributes.rearview_item.score > 0.4) {
                  retAtt.attributes.rearview_item.score = "有后视镜悬挂物";
                } else {
                  retAtt.attributes.rearview_item.score = "无后视镜悬挂物";
                }
                if (retAtt.attributes.copilot.score > 0.55) {
                  retAtt.attributes.copilot.score = "副驾驶有人";
                } else {
                  retAtt.attributes.copilot.score = "副驾驶没有人";
                }
                if (retAtt.attributes.driver_belt.score > 0.75) {
                  retAtt.attributes.driver_belt.score = "驾驶位系安全带";
                } else {
                  retAtt.attributes.driver_belt.score = "驾驶位没系安全带";
                }
                if (retAtt.attributes.copilot_belt.score > 0.85) {
                  retAtt.attributes.copilot_belt.score = "副驾驶位系安全带";
                } else {
                  retAtt.attributes.copilot_belt.score = "副驾驶位未系安全带";
                }
                if (retAtt.attributes.driver_visor.score > 0.2) {
                  retAtt.attributes.driver_visor.score = "驾驶位遮阳板放下";
                } else {
                  retAtt.attributes.driver_visor.score = "驾驶位遮阳板未放下";
                }
              }
            } else {
              this.$Message.error("返回数据为空");
            }
            this.result4 = result;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload4(base) {
      // this.isloading = true;
      // this.result4 = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/carAttribute",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
          this.isloading = false;


          // if (res.data.code == 200000) {
            var result = [{"attributes":{"copilot_visor":{"score":0.001563847064971924},"copilot":{"score":0.04126524925231934},"copilot_belt":{"score":0.8113394379615784},"vehicle_type":{"score":0.9940126538276672,"name":"小汽车"},"skylight":{"score":0.9454227089881897},"driver_visor":{"score":0.002699553966522217},"rearview_item":{"score":0.0812792181968689},"in_car_item":{"score":0.7918907403945923},"window_rain_eyebrow":{"score":0.0006749629974365234},"direction":{"score":0.3317675292491913,"name":"左后方"},"roof_rack":{"score":0.03020203113555908},"driver_belt":{"score":0.9443045854568481}},"location":{"top":247,"left":217,"width":704,"height":544}}];
            if (result.length > 0) {
              for (var i = 0; i < result.length; i++) {
                var retAtt = result[i];
                if (retAtt.attributes.copilot_visor.score > 0.2) {
                  retAtt.attributes.copilot_visor.score =
                    "副驾驶位遮阳板有放下";
                } else {
                  retAtt.attributes.copilot_visor.score =
                    "副驾驶位遮阳板没有放下";
                }
                if (retAtt.attributes.window_rain_eyebrow.score > 0.02) {
                  retAtt.attributes.window_rain_eyebrow.score = "有车窗雨眉";
                } else {
                  retAtt.attributes.window_rain_eyebrow.score = "无车窗雨眉";
                }
                if (retAtt.attributes.roof_rack.score > 0.01) {
                  retAtt.attributes.roof_rack.score = "有车顶架";
                } else {
                  retAtt.attributes.roof_rack.score = "无车顶架";
                }
                if (retAtt.attributes.skylight.score > 0.5) {
                  retAtt.attributes.skylight.score = "有天窗";
                } else {
                  retAtt.attributes.skylight.score = "无天窗";
                }
                if (retAtt.attributes.in_car_item.score > 0.35) {
                  retAtt.attributes.in_car_item.score = "有车内摆放物";
                } else {
                  retAtt.attributes.in_car_item.score = "有车内摆放物";
                }
                if (retAtt.attributes.rearview_item.score > 0.4) {
                  retAtt.attributes.rearview_item.score = "有后视镜悬挂物";
                } else {
                  retAtt.attributes.rearview_item.score = "无后视镜悬挂物";
                }
                if (retAtt.attributes.copilot.score > 0.55) {
                  retAtt.attributes.copilot.score = "副驾驶有人";
                } else {
                  retAtt.attributes.copilot.score = "副驾驶没有人";
                }
                if (retAtt.attributes.driver_belt.score > 0.75) {
                  retAtt.attributes.driver_belt.score = "驾驶位系安全带";
                } else {
                  retAtt.attributes.driver_belt.score = "驾驶位没系安全带";
                }
                if (retAtt.attributes.copilot_belt.score > 0.85) {
                  retAtt.attributes.copilot_belt.score = "副驾驶位系安全带";
                } else {
                  retAtt.attributes.copilot_belt.score = "副驾驶位未系安全带";
                }
                if (retAtt.attributes.driver_visor.score > 0.2) {
                  retAtt.attributes.driver_visor.score = "驾驶位遮阳板放下";
                } else {
                  retAtt.attributes.driver_visor.score = "驾驶位遮阳板未放下";
                }
              }
            } 
            
            else {
              this.$Message.error("返回数据为空");
            }
            this.result4 = result;
          // } 
          
        //   else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload5(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic5 = base64;
        getImgSize(_this.uploadPic5).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result5 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/carDamage?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            if(res.data.data.result.damage_info){
              this.result5 = res.data.data.result.damage_info
            }else{
              this.$Message.error("图片不符合要求");
            }
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload5(base) {
      // this.isloading = true;
      // this.result5 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/carDamage",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
          this.isloading = false;
          // if (res.data.code == 200000) {
          //   if (!res.data.data) {
          //     this.$Message.error("返回数据为空");
          //     return;
          //   }
            this.result5 = [{
              parts: "右后门",
              probability: 76,
              type: "褶皱或波浪"
            }];
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload6(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic6 = base64;
        getImgSize(_this.uploadPic6).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result6 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/carSegmentation?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result6 = "data:image/png;base64," + res.data.data.foreground;
            getImgSize(this.result6).then(res => {
              this.whFlag = res.flag;
            });
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload6(base) {
      // this.isloading = true;
      // this.result6 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/carSegmentation",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
          this.isloading = false;
          // if (res.data.code == 200000) {
          //   if (!res.data.data) {
          //     this.$Message.error("返回数据为空");
          //     return;
          //   }
            this.result6 = window.config.iconUrl+ "/static/images/cheliang/cheLiangFg.png";
            getImgSize(this.result6).then(res => {
              this.whFlag = res.flag;
            });
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },

    handleBeforeUpload7(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic7 = base64;
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result7 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/face/faceage?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result7 = res.data.data;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload7(base) {
      this.isloading = true;
      this.result7 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/face/faceage?img_type=FILES",
        params: {
          img_type: "URL",
          image_param: base
        }
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result7 = res.data.data;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    handleBeforeUpload8(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic8 = base64;
        getImgSize(_this.uploadPic8).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result8 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:
          window.config.url+"/ai/image/definitionenhance?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result8 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result8).then(res => {
              this.whFlag = res.flag;
            });
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload8(base) {
      // this.isloading = true;
      // this.result8 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/definitionenhance",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
          this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result8 =require('@/assets/images/tuxiang/zengqiang.png'),
            getImgSize(this.result8).then(res => {
              this.whFlag = res.flag;
            });
      //     } else {
      //       this.$Message.error("请求失败");
      //     }
      //   })
      //   .catch(err => {
      //     this.isloading = false;
      //     console.log(err);
      //   });
    },
    handleBeforeUpload9(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic9 = base64;
        getImgSize(_this.uploadPic9).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result9 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/skyseg?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result9 = "data:image/png;base64," + res.data.data.scoremap;
            getImgSize(this.result9).then(res => {
              this.whFlag = res.flag;
            });
            // this.result6=res.data.data;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload9(base) {
      // this.isloading = true;
      // this.result9 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/skyseg",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
             this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result9 = require('@/assets/images/tuxiang/fenge.png');
            getImgSize(this.result9).then(res => {
              this.whFlag = res.flag;
            });
      //       // this.result6=res.data.data;
      //     } else {
      //       this.$Message.error("请求失败");
      //     }
      //   })
      //   .catch(err => {
      //     this.isloading = false;
      //     console.log(err);
      //   });
    },
    handleBeforeUpload10(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic10 = base64;
        getImgSize(_this.uploadPic10).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData();
      formData.append("files", file);
      this.isloading = true;
      this.result10 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/bdface/selfieanime?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result10 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result10).then(res => {
              this.whFlag = res.flag;
            });
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload10(base) {
      this.isloading = true;
      this.result10 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/bdface/selfieanime",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
            this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result10 = require('@/assets/images/tuxiang/dongman.png');
            getImgSize(this.result10).then(res => {
              this.whFlag = res.flag;
            });
      //     } else {
      //       this.$Message.error("请求失败");
      //     }
      //   })
      //   .catch(err => {
      //     this.isloading = false;
      //     console.log(err);
      //   });
    }
  }
};
</script>
<style lang="less">
.experience1 {
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  .ivu-progress-outer {
    width: 85%;
  }
  .ivu-upload-drag {
    height: 100%;
    background: rgba(192, 204, 218, 0.1);
    border: 1px solid #ebecf0;
  }
  .ivu-upload-drag:hover {
    border: 1px solid #ebecf0;
  }
}
</style>
<style scoped lang="less">
.experience {
  display: flex;
  width: 100%;
  .fn_container {
    width: 100%;
    margin: auto;
    .radio_box {
      margin-bottom: 20px;
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
      .leftn {
        width: 649px;
        &.left_box1 {
          width: 49%;
        }
        .left_box {
          // background: rgba(192,204,218,0.10);
          border: 1px solid #ebecf0;
          .left_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .pic {
              width: 100%;
              &.whFlag {
                height: 420px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                img {
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
        }
      }
      .left {
        width: 649px;
        &.left1 {
          width: 50% !important;
        }
        .left_box {
          // background: rgba(192,204,218,0.10);
          border: 1px solid #ebecf0;
          .left_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .pic {
              width: 100%;
              &.whFlag {
                height: 420px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                img {
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
        }
      }
      .rightn {
        flex: 1;
        overflow: auto;
        font-size: 14px;
        color: #121c33;
        letter-spacing: 0;
        line-height: 24px;
        padding: 10px;
        background: rgba(192, 204, 218, 0.1);
        border: 1px solid #ebecf0;
        position: relative;
        &.right1 {
          width: 49%;
          padding: 0;
          flex: none;
          img {
            width: 100%;
            display: block;
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
        &.whFlag {
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          img {
            width: auto;
            height: 100%;
          }
        }
        .right_content {
          font-size: 14px;
          color: #3d4966;
          letter-spacing: 0;
          line-height: 28px;
        }
      }
      .right {
        position: relative;
        flex: 1;
        overflow: auto;
        font-size: 14px;
        color: #121c33;
        letter-spacing: 0;
        line-height: 24px;
        padding: 10px;
        background: rgba(192, 204, 218, 0.1);
        border: 1px solid #ebecf0;
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
        .right_content {
          font-size: 14px;
          color: #3d4966;
          letter-spacing: 0;
          line-height: 28px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
.experience {
  width: 100%;
  position: relative;
  .ivu-spin-fix {
    background: none;
    // color:#03a971;
  }
  .experience_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    .content {
      width: 100%;
      .left_box {
        // background: rgba(192,204,218,0.10);
        border: 1px solid #ebecf0;
        height: 100%;
        .left_up {
          width: 100%;
          height: 100%;
          background: rgba(192, 204, 218, 0.1);
          position: relative;
          .pic {
            width: 100%;
            // margin-left:10%;
            &.whFlag {
              height: 420px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              img {
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
      }
    }
    .shangchuan_text {
      width: 100%;
      margin-bottom: 20px;
      font-size: 18px;
      color: #121c33;
    }
    .video_container {
      width: 100%;
      height: 420px;
      background-color: rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      .RecDetail_left {
        width: 650px;
        height: 100%;
        .RecDetail_left_bottom {
          width: 100%;
          height: 100%;
          position: relative;
          .Img_container {
            width: 100%;
            height: 90%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .bofang {
              width: 40px;
              height: 40px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 999;
            }
            .bofang:hover {
              cursor: pointer;
            }
            video {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              object-fit: fill;
            }
            img[src=""],
            img:not([src]) {
              opacity: 0;
            }
          }
          .ivu-row {
            position: absolute;
            left: 50%;
            top: 50%;
            /deep/.ivu-spin-main {
              width: 200px;
              height: 200px;
              /deep/.ivu-spin-text {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                /deep/.ivu-icon-ios-loading {
                  font-size: 95px;
                  z-index: 1000000000010;
                  margin-bottom: 10px;
                }
              }
            }
            transform: translate(-50%, -50%);
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
              height: 100px;
              position: relative;
              border: 1px solid #eee;
            }
          }
          .info_btn {
            width: 100%;
            height: 10%;
            background-color: rgba(18, 28, 51, 0.85);
            padding: 10px 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
              font-size: 12px;
              color: #ffffff;
              text-align: justify;
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
    }
    .analy_result_text {
      width: 100%;
      font-size: 18px;
      color: #121c33;
      margin: 15px 0;
    }
    .result_container {
      width: 100%;
      overflow: scroll;
      background: #f2f4f7;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 50px;
      .tag_container {
        width: 50%;
        display: flex;
        margin-top: 20px;
        margin-bottom: 30px;
        .result_type {
          width: 80px;
          height: 36px;
          background: rgba(3, 169, 113, 0.1);
          font-size: 14px;
          color: #03a971;
          letter-spacing: 0;
          text-align: center;
          line-height: 36px;
          margin-right: 10px;
        }
      }
      .result_text {
        width: 100%;
        font-size: 14px;
        color: #7a8499;
        letter-spacing: 0;
        line-height: 24px;
        .time_content_container {
          display: flex;
          margin-bottom: 15px;
          .time {
            min-width: 110px;
            font-size: 14px;
            white-space: nowrap;
            color: #121c33;
            letter-spacing: 0;
            line-height: 24px;
            margin-right: 30px;
          }
          .content_container {
            margin-left: 40px;
          }
        }
        .target_container {
          width: 100%;
          .renwuContainer,
          .renwujuese,
          .wuti,
          .biaoshi {
            display: flex;
            .left {
              width: 100px;
            }
            .right {
              display: flex;
            }
          }
        }
      }
      .shenheTongg {
        width: 100%;
        font-size: 18px;
        color: #03a971;
        margin-top: 30px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        img {
          width: 30px;
          margin-right: 10px;
        }
      }
      .shenheBut {
        width: 100%;
        font-size: 18px;
        color: #ff5400;
        margin-top: 30px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        img {
          width: 30px;
          margin-right: 10px;
        }
      }
      .title,
      .baokongCon,
      .seQin,
      .zhengZhi,
      .weijin,
      .logo,
      .guanggao {
        width: 100%;
        display: flex;
        align-items: center;
        div {
          min-width: 100px;
          margin-right: 140px;
          margin-bottom: 10px;
          text-align: center;
          white-space: nowrap;
        }
      }
      .baokongCon,
      .seQin,
      .zhengZhi,
      .weijin,
      .logo,
      .guanggao {
        div:nth-child(1) {
          font-size: 14px;
          color: #121c33;
        }
      }
      .title {
        font-size: 14px;
        color: #7a8499;
      }
    }
    .result_container {
      overflow: hidden !important;
    }
    .result_container:hover {
      overflow: auto !important;
    }
    .result_container::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    .result_container::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: #999999;
      height: 40px;
    }
    .result_container::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 0;
      background: white;
    }
  }
}
</style>
