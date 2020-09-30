<template>
  <div class="experience">
    <!-- 未成的功能 -->
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>{{loadingText}}</div>
    </Spin>
    <!-- 人脸检测 -->
    <div class="fn_container" v-if="routeId == '6.1.1'">
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
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic" alt="" />
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
            <div
              class="top_box"
              style="display:flex;padding:5px 20px;flex-flow: wrap;"
            >
              <div
                class="img_box"
                @click="showMenu(item)"
                v-for="item in picList"
                :class="{ 'itemActive': face_token == item.face_token }"
                style="cursor:pointer;width:120px;margin-bottom:10px;margin-right:20px"
                :key="item.face_token"
              >
                <img
                  :src="item.base64"
                  alt=""
                  style="width:100%;display:block"
                />
              </div>
            </div>
            <div
              class="face_container"
              v-if="resultContent"
              style="display:flex;padding:0 20px"
            >
              <div>
                <p v-if="resultContent.emotion.type == 'happy'">情绪---高兴</p>
                <p v-if="resultContent.emotion.type == 'angry'">情绪---愤怒</p>
                <p v-if="resultContent.emotion.type == 'disgust'">
                  情绪---厌恶
                </p>
                <p v-if="resultContent.emotion.type == 'fear'">情绪---恐惧</p>
                <p v-if="resultContent.emotion.type == 'sad'">情绪---伤心</p>
                <p v-if="resultContent.emotion.type == 'surprise'">
                  情绪---惊讶
                </p>
                <p v-if="resultContent.emotion.type == 'neutral'">
                  情绪---无表情
                </p>
                <p v-if="resultContent.emotion.type == 'pouty'">情绪---撅嘴</p>
                <p v-if="resultContent.emotion.type == 'grimace'">
                  情绪---鬼脸
                </p>

                <p v-if="resultContent.face_shape.type == 'square'">
                  脸型---正方形
                </p>
                <p v-if="resultContent.face_shape.type == 'triangle'">
                  脸型---三角形
                </p>
                <p v-if="resultContent.face_shape.type == 'heart'">
                  脸型---心形
                </p>
                <p v-if="resultContent.face_shape.type == 'oval'">
                  脸型---椭圆
                </p>
                <p v-if="resultContent.face_shape.type == 'round'">
                  脸型---圆形
                </p>

                <p v-if="resultContent.expression.type == 'none'">
                  表情---不笑
                </p>
                <p v-if="resultContent.expression.type == 'smile'">
                  表情---微笑
                </p>
                <p v-if="resultContent.expression.type == 'laugh'">
                  表情---大笑
                </p>

                <p>年龄---{{ resultContent.age }}</p>
                <p>人种---{{ resultContent.race.type }}</p>
              </div>
              <div style="margin-left:120px">
                <p>颜值---{{ resultContent.beauty }}</p>

                <p v-if="resultContent.gender.type == 'male'">性别---男</p>
                <p v-if="resultContent.gender.type == 'female'">性别---女</p>

                <p v-if="resultContent.glasses.type == 'none'">眼镜---无</p>
                <p v-if="resultContent.glasses.type == 'common'">
                  眼镜---普通眼镜
                </p>
                <p v-if="resultContent.glasses.type == 'sun'">眼镜---墨镜</p>

                <p v-if="resultContent.mask.type == '0'">是否戴口罩---无</p>
                <p v-if="resultContent.mask.type == '1'">是否戴口罩---是</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 人脸对比 -->
    <div class="fn_container" v-if="routeId == '6.1.2'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload1"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic1" alt="" />
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
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload2"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="right_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic2" alt="" />
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
      </div>
      <div class="bottom">
        <p>分析结果</p>
        <div class="bm">相似度：{{ simlar }}</div>
      </div>
    </div>
    <!-- 手部关键点识别 -->
    <div class="fn_container" v-if="routeId == '6.4.3'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload3"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic3" alt="" />
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
        <div class="right" :class="{ whFlag: !whFlag }">
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
    <!-- 人脸水印照比对 -->
    <div class="fn_container" v-if="routeId == '6.1.10'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload4"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic4" alt="" />
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
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload5"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="right_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic5" alt="" />
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
      </div>
      <div class="bottom">
        <p>分析结果</p>
        <div class="bm">相似度：{{ simlar1 }}</div>
      </div>
    </div>
    <!-- 人脸口罩 -->
    <div class="fn_container" v-if="routeId == '6.4.6'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload6"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic6" alt="" />
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
            <div
              class="top_box"
              style="display:flex;justify-content:space-between;padding:5px 20px;flex-flow: wrap;"
            >
              <div
                class="img_box"
                @click="showMenu1(index)"
                v-for="(item, index) in picList1"
                :class="{ 'itemActive': currentIndex == index }"
                style="cursor:pointer;width:120px;margin-bottom:10px"
                :key="index"
              >
                <img
                  :src="item.base64"
                  alt=""
                  style="width:100%;display:block"
                />
              </div>
            </div>
            <div
              class="face_container"
              v-if="resultContent1"
              style="display:flex;padding:0 20px"
            >
              <span v-if="resultContent1.confidence == 1"> 是否戴口罩:是</span>
              <span v-else> 是否戴口罩:否</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 人体关键点识别 -->
    <div class="fn_container" v-if="routeId == '6.2.1'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload21"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic21" alt="" />
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
        <div class="right" :class="{ whFlag: !whFlag }">
          <canvas id="canvas1"></canvas>
        </div>
      </div>
    </div>
    <!-- 人体检测与属性 -->
    <div class="fn_container" v-if="routeId == '6.2.3'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload23"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic23" alt="" />
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
            <div
              class="top_box"
              style="display:flex;justify-content:space-between;padding:5px 20px;flex-flow: wrap;"
            >
              <div
                class="img_box"
                @click="showMenu2(index)"
                v-for="(item, index) in picList2"
                :class="{ 'itemActive': currentIndex == index }"
                style="cursor:pointer;width:120px;margin-bottom:10px"
                :key="index"
              >
                <img
                  :src="item.base64"
                  alt=""
                  style="width:100%;display:block"
                />
              </div>
            </div>
            <div
              class="face_container"
              v-if="resultContent2"
              style="display:flex;padding:0 20px"
            >
              <div>
                <p>性别：{{ resultContent2.attributes.gender.name }}</p>
                <p>年龄阶段：{{ resultContent2.attributes.age.name }}</p>
                <p>上身服饰：{{ resultContent2.attributes.upper_wear.name }}</p>
                <p>下身服饰：{{ resultContent2.attributes.lower_wear.name }}</p>
                <p>
                  上身服饰颜色：{{ resultContent2.attributes.upper_color.name }}
                </p>
                <p>
                  下身服饰颜色：{{ resultContent2.attributes.lower_color.name }}
                </p>
              </div>
              <div style="margin-left:120px">
                <p>是否戴帽子：{{ resultContent2.attributes.headwear.name }}</p>
                <p>
                  是否戴口罩：{{ resultContent2.attributes.face_mask.name }}
                </p>
                <p>是否吸烟：{{ resultContent2.attributes.smoke.name }}</p>
                <p>
                  是否使用手机：{{ resultContent2.attributes.cellphone.name }}
                </p>
                <p>是否背包：{{ resultContent2.attributes.bag.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 跨年龄人脸识别 -->
    <div class="fn_container" v-if="routeId == '6.1.11'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload7"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <!--  -->
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic7" alt="" v-if="isShow8" />
                  <canvas id="canvas7" v-else></canvas>
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
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload8"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="right_up">
                <div class="pic" :class="{ whFlag: !whFlag1 }">
                  <img :src="uploadPic8" alt="" v-if="isShow8" />
                  <canvas id="canvas8" v-else></canvas>
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
      </div>
      <div class="bottom">
        <p>分析结果</p>
        <div class="bm">相似度：{{ simlar2 }}</div>
      </div>
    </div>
    <!-- 人脸搜索 -->
    <div class="fn_container" v-if="routeId == '6.1.3'">
        <div class="content" style="height:368px;margin-bottom:40px">
          <div class="left" style="">
            <video id="video3" width="487" height="368"></video>
            <canvas id="canvas3" width="487" height="368"></canvas>
            <div class="shadow" v-show="manyou">
              <img
                src="../../../assets/images/renlian/saomiao.png"
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div class="right">
            <p class="resultText">识别结果</p>
            <div
              class="imgHeader"
              :class="{ success: faceScore > 80 }"
              v-if="videoResult"
            >
              <img :src="videoResult" alt="" srcset="" />
            </div>
            <div class="personInfo">{{ personInfo }}</div>
          </div>
        </div>
        <div id="snap">识别</div>
    </div>

    <!-- 活体检测 -->
    <div class="fn_container" v-if="routeId == '6.1.4'">
        <div class="huoti_content">
          <div class="huoti_left">
            <div class="oper_info">{{operInfo}}</div>
            <div class="time_cicle" v-if="ifShowOperTime">{{operTime}}s</div>
            <video id="video4" class="huoti_video"></video>
            <div class="yanzhenM_container" v-if="ifShowYZM">
              <div class="yanzhenM">
                <div class="yanzhenM_item" v-for="(item,index) in codeArr" :key="index">{{item}}</div>
              </div>
            </div>
            <div class="kuang" v-if="false">
              <img :src="kuangImg" class="kuangImg">
            </div>
            <div class="oper_btn_container">
              <div class="btn_content" ref="btnContent">
                <div class="dianT" @click="huotijianceFn(0)">点头</div>
                <div class="zhanY" @click="huotijianceFn(1)">眨眼</div>
                <div class="duS" @click="huotijianceFn(2)">读数</div>
              </div>
            </div>
          </div>
          <div class="huoti_right">
            <div class="jiance_title">检测结果</div>
            <div class="jiance_dushu_success_Score" v-if="ifShowSuccess">
              <img :src="successImg" class="success_img">
              <div class="success_text">检测成功</div>
            </div>
            <div class="jiance_dushu_fail_Score" v-if="ifShowFail">
              <img :src="failImg" class="fail_img">
              <div class="fail_text">检测失败</div>
            </div>
            <div class="tishi_info">
              <div class="tishi_title">温馨提示</div>
              <div class="tishi_content">
                <div class="tishi_one">
                  <img :src="yanjingImg" class="img">
                  <div class="text">不要遮挡眼睛</div>
                </div>
                <div class="tishi_two">
                  <img :src="maoziImg" class="img">
                  <div class="text">不要戴帽子</div>
                </div>
                <div class="tishi_three">
                  <img :src="koubiImg" class="img">
                  <div class="text">不要遮挡口鼻</div>
                </div>
                <div class="tishi_fore">
                  <img :src="guangxianImg" class="img">
                  <div class="text">光线不要太暗</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- 步态识别 -->
    <div class="fn_container" v-if="routeId == '6.2.9'">
      <div class="step_content">
        <div class="left">
          <div class="left_box"  @mouseenter="showIntro" @mouseleave="leaveIntro">
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <video controls="controls" :src="videoSrc" v-if="isShowVideo"  :poster="posterSrc"></video>
                  <img :src="uploadPic24" alt="" v-else/>
                </div>
                <div class="intro" v-show="isShowIntro">
                    <!-- <div class="pic1">
                      <div class="img1">
                        <img src="../../../assets/images/step/vd.png" alt="" />
                      </div>
                      <div class="text">
                        实时视频
                      </div>
                    </div> -->
                    <div class="pic1">
                     <Upload
                        ref="upload"
                        :show-upload-list=false
                        :format="['mp4','avi','wmv','flv']"
                        accept="video/mp4,video/avi,video/wmv,video/flv"
                        :before-upload="handleBeforeUpload24"
                        :max-size="5120"
                        action=""
                      >
                        <div class="img1">
                          <img src="../../../assets/images/step/up.png" alt="" />
                        </div>
                        <div class="text">
                          本地视频
                        </div>
                      </Upload>
                    </div>
                </div>
              </div>
            
          </div>
        </div>
        <div class="right">
          <div class="right_box">
            <div class="title_item">
              检索结果
            </div>
              <template  v-if="showResult">
                <template  v-if="showRes">
                  <div class="list" v-for="(item,index) in msg24.AlignmentResults[0].AlignmentFeatures" :key="index" @mouseenter="showDetail(index)" @mouseleave="leaveDetail(index)">
                    <div class="left">
                      <img :src="item.PreviewImage" alt="" />
                      <div class="cover" v-show="showCover==index"  @click="showDialog(item)"><span>步态详情</span></div>
                    </div>
                    <div class="right_item">
                      <p>姓名：{{item.Name}} </p>
                      <p v-if="item.Sim">相似度：{{item.Sim?((item.Sim)*100).toFixed(2)+"%":'0'}}</p>
                      <p>时间：{{$dateUtil.formatTime(msg24.timestamp,'yy-mm-dd hh:mm:ss')}}</p>
                      <p>检索源：{{item.VideoSourceName}}</p>
                    </div>
                  </div>
                </template>
                <template  v-else>
                  <div class="error">
                    <div class="img">
                      <img :src="errorImg" alt=""/>
                    </div>
                    <div class="text">
                      抱歉！暂无结果
                    </div>
                  </div>
                </template>
              </template>
              <template  v-else>
                <div class="list"  @click="showDialog">
                  <div class="left">
                    <img src="../../../assets/images/step/ps2.png" alt="" />
                  </div>
                  <div class="right_item">
                    <p>姓名：-- </p>
                    <p>相似度：--</p>
                    <p>时间：--</p>
                    <p>检索源：--</p>
                  </div>
                </div>
              </template>
          </div>
        </div>
      </div>
    </div>

    <grecModel v-if="isShowDialog" :detailData="detailData" @closeWindow="closeWindow"></grecModel>
  </div>
</template>

<script>
import { imgPreviewBase64, getImgSize } from "@/assets/js/imgPreviewBase64";
import grecModel from "./grecModel";
export default {
  components: {
    grecModel
  },
  props: ["routeId"],
  data() {
    return {
      showRes:false,
      showResult:false,
      showCover:'-1',
      msg24:'',
      posterSrc:'',
      videoSrc:"",
      isShowIntro:true,
      isShowVideo:false,
      isShowDialog:false,
      detailData:null,
      faceScore: 0,
      manyou: false,
      videoFlag: true,
      personInfo: "",
      videoResult: "",
      videoImgUrl: "",
      whFlag: true,
      whFlag1: true,
      isloading: true,
      resultImg: "",
      isShow7: true,
      isShow8: true,
      isShow4: true,
      isShow5: true,
      isShow1: true,
      isShow2: true,
      isShow0: true,
      picList2: [],
      picList1: [],
      picList: [],
      reslut: "hello",
      currentIndex: 0,
      currentIndex1: 0,
      errorImg: require("@/assets/images/step/error.png"),
      uploadPic24: require("@/assets/images/step/banner.png"),
      uploadPic23: require("@/assets/images/renlian/renti/23.png"),
      uploadPic21: require("@/assets/images/renlian/renti/1.png"),
      uploadPic6: require("@/assets/images/renlian/xingwei/p127462.png"),
      uploadPic8: require("@/assets/images/renlian/12345.png"),
      uploadPic7: require("@/assets/images/renlian/23.png"),
      uploadPic5: require("@/assets/images/renlian/WechatIMG61.png"),
      uploadPic4: require("@/assets/images/renlian/621586307104_.pic_hd.png"),
      uploadPic2: require("@/assets/images/renlian/renliansousuo.png"),
      uploadPic3: require("@/assets/images/renlian/xingwei/2.png"),
      msg1: ``,
      uploadPic1: require("@/assets/images/renlian/9.png"),
      msg1: ``,
      resultContent: "",
      resultContent1: null,
      resultContent2: null,
      resultList: [],
      uploadPic: require("@/assets/images/renlian/1.png"),
      //uploadPic: require("@/assets/images/education/1.png"),
      msg: ``,
      formData: new FormData(),
      formData1: new FormData(),
      formData2: new FormData(),
      simlar: "",
      simlar1: "",
      simlar2: "93%",
      face_token: "",
      yanjingImg:require("@/assets/images/renlian/yanjing.png"),
      maoziImg:require("@/assets/images/renlian/maozi.png"),
      koubiImg:require("@/assets/images/renlian/koubi.png"),
      guangxianImg:require("@/assets/images/renlian/guangxian.png"),
      successImg:require("@/assets/images/renlian/success.png"),
      failImg:require("@/assets/images/renlian/fail.png"),
      kuangImg:require("@/assets/images/renlian/kuang.png"),
      operInfo:'',
      operTime:5,
      ifShowOperTime:false,
      ifShowSuccess:false,
      ifShowFail:false,
      ifShowYZM:false,
      timer:null,
      mideaStramTruck:null,
      videoRecorder:null,
      mediaStream:null,
      loadingText:'加载中...',
      codeArr:[],
      MediaUtils:{
                /**
                * 获取用户媒体设备(处理兼容的问题)
                * @param videoEnable {boolean} - 是否启用摄像头
                * @param audioEnable {boolean} - 是否启用麦克风
                * @param callback {Function} - 处理回调
                */
                getUserMedia: function (videoEnable, audioEnable, callback) {
                        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
                        || navigator.msGetUserMedia || window.getUserMedia;
                        var constraints = {video: videoEnable, audio: audioEnable};
                        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                            callback(false, stream);
                        })['catch'](function(err) {
                            callback(err);
                        });
                        } else if (navigator.getUserMedia) {
                            navigator.getUserMedia(constraints, function (stream) {
                            callback(false, stream);
                        }, function (err) {
                            callback(err);
                        });
                    } else {
                        callback(new Error('Not support userMedia'));
                    }
                },
                /**
                * 关闭媒体流
                * @param stream {MediaStream} - 需要关闭的流
                */
                closeStream: function (stream) {
                    if (typeof stream.stop === 'function') {
                        stream.stop();
                    }
                    else {
                        let trackList = [stream.getAudioTracks(), stream.getVideoTracks()];
                        for (let i = 0; i < trackList.length; i++) {
                            let tracks = trackList[i];
                            if (tracks && tracks.length > 0) {
                                for (let j = 0; j < tracks.length; j++) {
                                    let track = tracks[j];
                                    if (typeof track.stop === 'function') {
                                        track.stop();
                                    }
                                }
                            }
                        }
                    }
                }
            }
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
    //停止录制视频
    diantouHuot(data){

    },
    showDetail(index){
      console.log(index)
      this.showCover=index;
    },
    leaveDetail(index){
      this.showCover='-1';
    },
    leaveIntro(){
      if(this.isShowVideo){
        this.isShowIntro=false;
      }
    },
    showIntro(){
      if(this.isShowVideo){
        this.isShowIntro=true;
      }
      
    },
    showDialog(item){
        this.detailData={
          MonitorInfo:this.msg24.MonitorInfo,
          data:item,
          TargetFeature:this.msg24.AlignmentResults[0].TargetFeature,
          timestamp:this.msg24.timestamp
        }
        this.isShowDialog=true;
    },
    closeWindow(){
        this.isShowDialog=false;
    },
    zhayanHuot(data){

    },
    dushuHuot(file,sessioId){
      this.isloading = true;
      this.loadingText = '检测中...';
      this.ifShowSuccess = false;
      this.ifShowFail = false;
      this.ifShowYZM = false;
      let self = this;
      let url = window.config.url + "/ai/bdface/vidioVerify?img_type=FILES";
      let videoFormData = new FormData();
      videoFormData.append('files',file);
      videoFormData.append('sessionId',sessioId);
      let request = new XMLHttpRequest();
      request.open("POST", url);
      request.setRequestHeader("apikey","WKI158JGA458XTE692CZP5268537");
      request.setRequestHeader("secretkey","7da97d335fef49f089bab9a6892e9fdb"); 
      if ('responseType' in request) {
        request.responseType = 'text'
      }
      request.send(videoFormData);
      request.onreadystatechange = function(res){
        var res = request.responseText;
        if(request.readyState == 4 && request.status == 200){
          let res1 = JSON.parse(res);
          self.isloading = false;
          if(res1.code == 200000){
            if(res1.data.error_code == 0){
              let score = res1.data.result.score;
              if(score > 0.7 || score == 0.7){
                self.ifShowSuccess = true;
                self.ifShowFail = false;
              }
              else{
                self.ifShowFail = true;
                self.ifShowSuccess = false;
              }
            }
            else if(res1.data.error_code == '216431'){
              self.$Message.error('语音识别服务异常，请重试');
              self.ifShowSuccess = false;
              self.ifShowFail = false;
            }
            else if(res1.data.error_code == '216434'){
              self.$Message.error('活体检测失败，请重试');
              self.ifShowSuccess = false;
              self.ifShowFail = false;
            }
            else if(res1.data.error_code == '216501'){
              self.$Message.error('没有找到人脸，请重新录制视频');
              self.ifShowSuccess = false;
              self.ifShowFail = false;
            }
            else if(res1.data.error_code == '216507'){
              self.$Message.error('视频中有多张人脸，请重新录制视频');
              self.ifShowSuccess = false;
              self.ifShowFail = false;
            }
            else if(res1.data.error_code == '216509'){
              self.$Message.error('视频中的声音无法识别（声音过低或者有杂音导致无法识别）');
              self.ifShowSuccess = false;
              self.ifShowFail = false;
            }
            else if(res1.data.error_code == '216908'){
              self.$Message.error('视频中人脸质量过低，请重新录制视频');
              self.ifShowSuccess = false;
              self.ifShowFail = false;
            }
          }
          else{
            self.$Message.error('请求接口失败');
          }
        }
      }

      //识别成功，按钮置灰
      let btnContDom = this.$refs.btnContent.children || [];
      for(var i=0;i<btnContDom.length;i++){
        btnContDom[i].style='background:#7A8499;';
      }


    },
    stopRecord() {
      // 终止录制器
      if(this.videoRecorder){
        this.videoRecorder.stop();
      }
      // 关闭媒体流
      this.MediaUtils.closeStream(this.mediaStream);
    },
    luzhishiPApi(bol1,bol2,num,sessioId){
      var video = document.getElementById("video4");
      var URL = window.URL || window.webkitURL;
      var _this = this; 
      this.MediaUtils.getUserMedia(bol1, bol2, function (err, stream) {
        if (err) {
            throw err;
        } else {
            //打开摄像头，播放视频流
            try {
              video.srcObject = stream;
            } catch (error) {
              video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function(e){
              video.play();
              let operTime1 = 5;
              _this.operTime = operTime1;
              _this.timer = setInterval(()=>{
                if(operTime1 > 0){
                  operTime1 --
                }
                else{
                  clearInterval(_this.timer);
                  if(_this.mideaStramTruck){
                    _this.mideaStramTruck.stop();
                  }
                  _this.stopRecord(); 
                }
                _this.operTime = operTime1;
              },1000);
            }
            //获取视频控制对象，便于关闭摄像头
            _this.mideaStramTruck = stream.getTracks()[0];
            //开始录制视频，录制成功发送请求
            let chunks = [];
            let options = {
              mimeType : 'video/webm'
            }
            _this.mediaStream = stream;
            _this.videoRecorder = new MediaRecorder(stream,options);
            _this.videoRecorder.start();
            _this.videoRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };
            _this.videoRecorder.onstop = function (e) {
              var recorderFile = new Blob(chunks, { 'type' : _this.videoRecorder.mimeType});
              var file = new File([recorderFile], 'msr-' + (new Date).toISOString().replace(/:|\./g, '-') + '.webm', {
                type: "video/webm"
              });
              chunks = [];
              if(num == 0){
                _this.diantouHuot(file,sessioId)
              }
              else if(num == 1){
                _this.zhayanHuot(file,sessioId)
              }
              else if(num == 2){
                _this.dushuHuot(file,sessioId)
              }
            };
        }
      });
    },
    getVerCode(num){
      let _this = this;
      this.$axios({
        method: "post",
        url: window.config.url + "/ai/bdface/sessioncode",
      }).then(res=>{
        if(res.data.code == 200000){
          let codeObj = res.data.data.result;
          let codeArr = codeObj.code.split('');
          _this.codeArr = codeArr;
          this.luzhishiPApi(true,true,num,codeObj.session_id);
        }
        else{
          this.$Message.error('获取数据失败');
        }
      }).catch(err=>{
        this.$Message.error('获取数据失败');
      });
    },
    huotijianceFn(num){
      this.ifShowOperTime = true;
      let btnContDom = this.$refs.btnContent.children || [];
      for(var i=0;i<btnContDom.length;i++){
        if(num == i){
          btnContDom[i].style='background:#03A971;';
        }
        else{
          btnContDom[i].style='background:#7A8499;';
        }
      }
      if(num == 0){
        let _this = this;
        this.ifShowYZM = false;
        this.ifShowSuccess = false;
        this.ifShowFail = false;
        this.operInfo = '请正对镜头，点点头';
        clearInterval(this.timer);
        this.luzhishiPApi(true,false,num);
      }
      else if(num == 1){
        let _this = this;
        this.ifShowYZM = false;
        this.ifShowSuccess = false;
        this.ifShowFail = false;
        this.operInfo = '请正对镜头，眨眨眼';
        clearInterval(this.timer);
        this.luzhishiPApi(true,false,num);
      }
      else if(num == 2){
        clearInterval(this.timer);
        this.operInfo = '请正对镜头，读出屏幕上的数字';
        this.ifShowYZM = true;
        this.ifShowSuccess = false;
        this.ifShowFail = false;
        this.getVerCode(num);
      }
    },

    getDiantouData(chunks){
      console.log(chunks,'chunks')
    },


    select() {
      this.isloading = true;
      if (this.routeId == "6.1.1") {
        this.getImg(this.uploadPic, base64 => {
          this.uploadPic = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.upload(base1);
        });
      } else if (this.routeId == "6.1.2") {
        this.getImg(this.uploadPic1, base64 => {
          this.uploadPic1 = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.getImg(this.uploadPic2, res => {
            this.uploadPic2 = res;
            let base2 = res.split("data:image/png;base64,")[1];
            this.uploadSimliar(base1, base2);
          });
        });
      } else if (this.routeId == "6.4.3") {
        this.getImg(this.uploadPic3, base64 => {
          this.uploadPic3 = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.upload3(base1);
        });
      } else if (this.routeId == "6.2.1") {
        this.getImg(this.uploadPic21, base64 => {
          this.uploadPic21 = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.upload21(base1);
        });
      } else if (this.routeId == "6.2.3") {
        this.getImg(this.uploadPic23, base64 => {
          this.uploadPic23 = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.upload23(base1);
        });
      } else if (this.routeId == "6.2.9") {
        this.isloading = false;
      } else if (this.routeId == "6.1.11") {
        this.isloading = false;
        this.whFlag = false;
        // this.getImg(this.uploadPic7,(base64)=>{
        //   this.uploadPic7=base64;
        //   let base1=base64.split('data:image/png;base64,')[1];
        //   this.getImg(this.uploadPic8,(base641)=>{
        //     this.uploadPic8=base641;
        //     let base2=base641.split('data:image/png;base64,')[1];

        //     this.uploadSimliar2(base1,base2);
        //   })
        // })
      }else if (this.routeId == "6.1.3") {
        this.isloading = false;
        setTimeout(()=>{
           this.liveVideo();
        },1000)
       }else if(this.routeId == "6.1.4"){
         this.isloading = false;
       }else if (this.routeId == "6.1.10") {
        this.whFlag = false;
        this.getImg(this.uploadPic4, base64 => {
          this.uploadPic4 = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.getImg(this.uploadPic5, base64 => {
            this.uploadPic5 = base64;
            let base2 = base64.split("data:image/png;base64,")[1];
            this.uploadSimliar1(base1, base2);
          });
        });
      } else if (this.routeId == "6.4.6") {
        this.getImg(this.uploadPic6, base64 => {
          this.uploadPic6 = base64;
          let base1 = base64.split("data:image/png;base64,")[1];
          this.upload6(base1);
        });
      }
    },
    liveVideo() {
      this.isloading = false;
      var _this = this;
      var video = document.getElementById("video3");
      var canvas = document.getElementById("canvas3");
      var ctx = canvas.getContext("2d");
      var width = video.width;
      var height = video.height;
      canvas.width = width;
      canvas.height = height;
      var URL = window.URL || window.webkitURL; // 获取到window.URL对象
      navigator.getUserMedia(
        {
          video: true
        },
        function(stream) {
          try {
            video.srcObject = stream;
          } catch (error) {
            video.src = window.URL.createObjectURL(stream);
          }
          video.play(); // 播放 //点击截图
          document.getElementById("snap").addEventListener("click", function() {
            if (_this.videoFlag) {
              _this.manyou = true;
              ctx.drawImage(video, 0, 0, width, height);
              var url = canvas.toDataURL("image/png");
              _this.videoImgUrl = url;
              let base = url.split("data:image/png;base64,")[1];
              setTimeout(() => {
                _this.uploadVideo(base);
              }, 3000);
              _this.videoFlag = false;
            }
          });
        },
        function(error) {
          console.log(error.name || error);
        }
      );
    },
    uploadVideo(base) {
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
          group_id_list: "sophia",
          user_id: "admin"
        }
      })
        .then(res => {
          //this.isloading = false;
          if (res.data.code == 200000) {
            this.manyou = false;
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }

            this.faceScore = res.data.data.result.user_list[0].score;
            if (this.faceScore < 80) {
              this.videoResult = this.videoImgUrl;
              this.personInfo = "陌生人";
            } else {
              this.videoResult =
                "data:image/png;base64," + res.data.data.image_base64;
              this.personInfo = res.data.data.result.user_list[0].user_info;
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
    handleBeforeUpload24(file) {
      this.isloading = true;
      let _this = this;
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/analyze/localfile",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {//AlignmentStatus ；0：失败；1：陌生人；2：成功；
              this.showResult =true;
            if(res.data.data.AlignmentStatus == 0){
                this.showRes=false;
                this.isShowVideo =true;
                this.isShowIntro=false;
                this.videoSrc=window.config.url+"/ai/analyze/play?fileName="+res.data.data.VideoPlayUrl;
                this.posterSrc=window.config.iconUrl+res.data.data.VideoImageUrl;
            }else{
              this.showRes=true;
              this.isShowVideo =true;
              this.isShowIntro=false;
              this.msg24=res.data.data;
              this.videoSrc=window.config.url+"/ai/analyze/play?fileName="+res.data.data.VideoPlayUrl;
              this.posterSrc=window.config.iconUrl+res.data.data.VideoImageUrl;
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
    handleBeforeUpload23(file) {
      this.isloading = true;
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic23 = base64;
        getImgSize(_this.uploadPic23).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.picList2 = [];
      this.resultContent2 = null;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/body/attr?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            let result = res.data.data.person_info;
            result.forEach(item => {
              let location = item.location;
              _this.jcrop(
                this.uploadPic23,
                location.left,
                location.top,
                location.width,
                location.height,
                100,
                res => {
                  this.picList2.push({
                    attributes: item.attributes,
                    base64: res
                  });
                  this.resultContent2 = this.picList2[0];
                }
              );
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
    upload23(base) {
      let _this = this;
      this.isloading=false;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/body/attr",
      //   params: {
      //     img_type: "BASE64",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.picList2 = [];
            // let result = res.data.data.person_info;
            let result =[{"attributes":{"orientation":{"score":0.9995781779289246,"name":"背面"},"gender":{"score":0.9546617269515991,"name":"男性"},"umbrella":{"score":0.9993370175361633,"name":"未打伞"},"lower_color":{"score":0.9747453927993774,"name":"蓝"},"face_mask":{"score":0.5172855257987976,"name":"不确定"},"smoke":{"score":0.8257281184196472,"name":"不确定"},"bag":{"score":0.9968909621238708,"name":"无背包"},"upper_wear":{"score":0.9985583424568176,"name":"长袖"},"is_human":{"score":0.9994075298309326,"name":"正常人体"},"vehicle":{"score":0.9985811710357666,"name":"无交通工具"},"glasses":{"score":0.7702376246452332,"name":"不确定"},"headwear":{"score":0.8612663149833679,"name":"安全帽"},"upper_wear_fg":{"score":0.9146483540534973,"name":"夹克"},"upper_wear_texture":{"score":0.823215663433075,"name":"纯色"},"upper_cut":{"score":0.9970048069953918,"name":"无上方截断"},"occlusion":{"score":0.9996119141578674,"name":"无遮挡"},"lower_cut":{"score":0.766960084438324,"name":"无下方截断"},"cellphone":{"score":0.9999989867210388,"name":"不确定"},"carrying_item":{"score":0.4714413285255432,"name":"不确定"},"age":{"score":0.5692671537399292,"name":"青年"},"lower_wear":{"score":0.999552309513092,"name":"长裤"},"upper_color":{"score":0.4066308736801147,"name":"蓝"}},"location":{"score":0.9719125032424927,"top":384,"left":46,"width":165,"height":448}},{"attributes":{"orientation":{"score":0.9977332353591919,"name":"背面"},"gender":{"score":0.967311441898346,"name":"男性"},"umbrella":{"score":0.9999105930328369,"name":"未打伞"},"lower_color":{"score":0.9566621780395508,"name":"蓝"},"face_mask":{"score":0.9999989867210388,"name":"不确定"},"smoke":{"score":0.7010541558265686,"name":"不确定"},"bag":{"score":0.9284119606018066,"name":"无背包"},"upper_wear":{"score":0.999258816242218,"name":"长袖"},"is_human":{"score":0.9998537302017212,"name":"正常人体"},"vehicle":{"score":0.9890583157539368,"name":"无交通工具"},"glasses":{"score":0.589103639125824,"name":"不确定"},"headwear":{"score":0.9298081994056702,"name":"安全帽"},"upper_wear_fg":{"score":0.9894499182701111,"name":"夹克"},"upper_wear_texture":{"score":0.5130367875099182,"name":"纯色"},"upper_cut":{"score":0.9997978806495667,"name":"无上方截断"},"occlusion":{"score":0.9983347058296204,"name":"无遮挡"},"lower_cut":{"score":0.8693709373474121,"name":"无下方截断"},"cellphone":{"score":0.9999989867210388,"name":"不确定"},"carrying_item":{"score":0.6760967373847961,"name":"无手提物"},"age":{"score":0.8113337755203247,"name":"中年"},"lower_wear":{"score":0.9999154806137085,"name":"长裤"},"upper_color":{"score":0.9993109703063965,"name":"蓝"}},"location":{"score":0.9500302672386169,"top":414,"left":477,"width":184,"height":434}},{"attributes":{"orientation":{"score":0.4739499986171722,"name":"左侧面"},"gender":{"score":0.9947675466537476,"name":"男性"},"umbrella":{"score":0.9999315738677979,"name":"未打伞"},"lower_color":{"score":0.9915199875831604,"name":"蓝"},"face_mask":{"score":0.9954791069030762,"name":"无口罩"},"smoke":{"score":0.9203948974609375,"name":"未吸烟"},"bag":{"score":0.9739339351654053,"name":"无背包"},"upper_wear":{"score":0.9806458950042725,"name":"长袖"},"is_human":{"score":0.9805265069007874,"name":"正常人体"},"vehicle":{"score":0.9990177154541016,"name":"无交通工具"},"glasses":{"score":0.4206050634384155,"name":"戴眼镜"},"headwear":{"score":0.6411344408988953,"name":"安全帽"},"upper_wear_fg":{"score":0.9545860290527344,"name":"夹克"},"upper_wear_texture":{"score":0.6775057315826416,"name":"纯色"},"upper_cut":{"score":0.9943441152572632,"name":"无上方截断"},"occlusion":{"score":0.8431512713432312,"name":"无遮挡"},"lower_cut":{"score":0.8856618404388428,"name":"无下方截断"},"cellphone":{"score":0.9804465770721436,"name":"未使用手机"},"carrying_item":{"score":0.6196102499961853,"name":"无手提物"},"age":{"score":0.9639703631401062,"name":"青年"},"lower_wear":{"score":0.999769389629364,"name":"长裤"},"upper_color":{"score":0.7388388514518738,"name":"蓝"}},"location":{"score":0.7094576358795166,"top":438,"left":719,"width":149,"height":402}}];
            result.forEach(item => {
              let location = item.location;
              _this.jcrop(
                this.uploadPic23,
                location.left,
                location.top,
                location.width,
                location.height,
                100,
                res => {
                  this.picList2.push({
                    attributes: item.attributes,
                    base64: res
                  });
                  this.resultContent2 = this.picList2[0];
                }
              );
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
    handleBeforeUpload21(file) {
      this.isloading = true;
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic21 = base64;
        getImgSize(_this.uploadPic21).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/body/analysis?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            let obj = res.data.data.person_info[0].body_parts;
            let result = [];
            for (var i in obj) {
              result.push(obj[i]);
            }
            this.DrawImg(result, "canvas1", this.uploadPic21);
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload21(base) {
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/body/analysis",
      //   params: {
      //     img_type: "BASE64",
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
            //let obj = res.data.data.person_info[0].body_parts;
            let obj ={"nose":{"score":0.8220981359481812,"x":390.0458984375,"y":318.3076171875},"right_knee":{"score":0.07321342080831528,"x":168.1220703125,"y":629.0009765625},"left_hip":{"score":0.03186466544866562,"x":390.0458984375,"y":664.5087890625},"right_ankle":{"score":0.03929872065782547,"x":97.1064453125,"y":673.3857421875},"right_wrist":{"score":0.159176230430603,"x":52.7216796875,"y":655.6318359375},"left_eye":{"score":0.8333830237388611,"x":452.1845703125,"y":238.4150390625},"left_mouth_corner":{"score":0.8794514536857605,"x":478.8154296875,"y":362.6923828125},"right_elbow":{"score":0.2060095071792603,"x":105.9833984375,"y":646.7548828125},"left_knee":{"score":0.028031375259161,"x":523.2001953125,"y":680},"top_head":{"score":0.728543758392334,"x":398.9228515625,"y":43.1220703125},"neck":{"score":0.7256660461425781,"x":540.9541015625,"y":469.2158203125},"right_ear":{"score":0.6867744326591492,"x":319.0302734375,"y":273.9228515625},"left_ear":{"score":0.8746443390846252,"x":585.3388671875,"y":211.7841796875},"left_elbow":{"score":0.04333006590604782,"x":816.1396484375,"y":680},"right_shoulder":{"score":0.3782624900341034,"x":239.1376953125,"y":593.4931640625},"right_mouth_corner":{"score":0.8168622255325317,"x":381.1689453125,"y":353.8154296875},"right_eye":{"score":0.8921763896942139,"x":345.6611328125,"y":247.2919921875},"left_ankle":{"score":0.02835237234830856,"x":443.3076171875,"y":646.7548828125},"right_hip":{"score":0.03819017112255096,"x":212.5068359375,"y":680},"left_wrist":{"score":0.01423021405935287,"x":443.3076171875,"y":646.7548828125},"left_shoulder":{"score":0.684395432472229,"x":816.1396484375,"y":611.2470703125}};
            let result = [];
            for (var i in obj) {
              result.push(obj[i]);
            }
            this.DrawImg(result, "canvas1", this.uploadPic21);
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    },
    handleBeforeUpload6(file) {
      this.isloading = true;
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic6 = base64;
        getImgSize(_this.uploadPic6).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/image/faceMasks?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.picList1 = [];
            let result = res.data.data.result.resultData;
            result.forEach(item => {
              let location = item.location;
              _this.jcrop(
                this.uploadPic6,
                location.x.toFixed(2),
                location.y.toFixed(2),
                location.width.toFixed(2),
                location.heigth.toFixed(2),
                100,
                res => {
                  this.picList1.push({
                    confidence: item.confidence,
                    base64: res
                  });
                  this.resultContent1 = this.picList1[0];
                }
              );
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
      let _this = this;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/image/faceMasks",
      //   params: {
      //     img_type: "BASE64",
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
            this.picList1 = [];
            //let result = res.data.data.result.resultData;
            let result =[{"confidence":1,"location":{"heigth":221.33511352539062,"x":224.58717346191406,"width":179.65940856933594,"y":89.51277923583984}}];
            result.forEach(item => {
              let location = item.location;
              _this.jcrop(
                this.uploadPic6,
                location.x.toFixed(2),
                location.y.toFixed(2),
                location.width.toFixed(2),
                location.heigth.toFixed(2),
                100,
                res => {
                  this.picList1.push({
                    confidence: item.confidence,
                    base64: res
                  });
                  this.resultContent1 = this.picList1[0];
                }
              );
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

    handleBeforeUpload8(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic8 = base64;
        getImgSize(_this.uploadPic8).then(res => {
          _this.whFlag1 = res.flag;
        });
      });
      if (this.formData2.get("files1")) {
        this.formData2.set("files1", file); //
      } else {
        this.formData2.append("files1", file); //
      }
      this.compareSimliar2();
    },
    handleBeforeUpload7(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic7 = base64;
        getImgSize(_this.uploadPic7).then(res => {
          _this.whFlag = res.flag;
        });
        _this.uploadPic8 = "";
      });
      if (this.formData2.get("files")) {
        this.formData2.set("files", file); //
      } else {
        this.formData2.append("files", file); //
      }
    },
    compareSimliar2() {
      if (this.formData2.get("files") && this.formData2.get("files1")) {
        this.isloading = true;
        this.isShow7 = false;
        this.isShow8 = false;
        this.simlar2 = "";
        this.$axios({
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data"
          },
          method: "post",
          url:
            window.config.url +
            "/ai/face/detectcrossage?img_type=FILES&img_type1=FILES",
          data: this.formData2
        })
          .then(res => {
            this.isloading = false;
            if (res.data.code == 200000) {
              if (!res.data.data) {
                this.$Message.error("返回数据为空");
                return;
              }
              let result = res.data.data.data.score;
              this.simlar2 = Math.floor(result * 100) + "%";
              this.DrawImg1(
                res.data.data.data.source_face,
                "canvas7",
                this.uploadPic7
              );
              this.DrawImg1(
                res.data.data.data.target_face,
                "canvas8",
                this.uploadPic8
              );
            } else {
              this.$Message.error("请求失败");
            }
          })
          .catch(err => {
            this.isloading = false;
            console.log(err);
          });
      } else {
        alert("请上传图片");
      }
    },
    uploadSimliar2(img1, img2) {
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/face/detectcrossage",
        params: {
          img_type1: "BASE64",
          image_param1: img2,
          img_type: "BASE64",
          image_param: img1
        }
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            let result = res.data.data.data.score;
            this.simlar2 = Math.floor(result * 100) + "%";
            this.DrawImg1(
              res.data.data.data.source_face,
              "canvas7",
              this.uploadPic7
            );
            this.DrawImg1(
              res.data.data.data.target_face,
              "canvas8",
              this.uploadPic8
            );
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },

    handleBeforeUpload5(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic5 = base64;
        getImgSize(_this.uploadPic5).then(res => {
          _this.whFlag = res.flag;
        });
      });
      if (this.formData1.get("files1")) {
        this.formData1.set("files1", file); //
      } else {
        this.formData1.append("files1", file); //
      }
      this.compareSimliar1();
    },
    handleBeforeUpload4(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic4 = base64;
        _this.simlar1 = "";
        getImgSize(_this.uploadPic4).then(res => {
          _this.whFlag = res.flag;
        });
        _this.uploadPic5 = "";
      });
      if (this.formData1.get("files")) {
        this.formData1.set("files", file); //
      } else {
        this.formData1.append("files", file); //
      }
    },
    compareSimliar1() {
      if (this.formData1.get("files") && this.formData1.get("files1")) {
        this.isloading = true;
        this.$axios({
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data"
          },
          method: "post",
          url:
            window.config.url +
            "/ai/bdface/watermarkverification?img_type=FILES&img_type1=FILES",
          data: this.formData1
        })
          .then(res => {
            this.isloading = false;
            if (res.data.code == 200000) {
              if (!res.data.data) {
                this.$Message.error("返回数据为空");
                return;
              }
              let result = res.data.data;
              this.simlar1 = (result.data * 100).toFixed(2) + "%";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("请上传图片");
      }
    },
    uploadSimliar1(img1, img2) {
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/bdface/watermarkverification",
      //   params: {
      //     img_type: "BASE64",
      //     image_param: img1,
      //     img_type1: "BASE64",
      //     image_param1: img2
      //   }
      // })
      //   .then(res => {
             this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
      //       let result = res.data.data;
            this.simlar1 = '98.45%';
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
      this.isloading = true;
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic3 = base64;
        getImgSize(_this.uploadPic3).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      let result = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url + "/ai/body/handanalysis?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            let obj = res.data.data.hand_info[0].hand_parts;
            for (var i in obj) {
              result.push(obj[i]);
            }
            getImgSize(this.uploadPic3).then(res => {
              this.whFlag = res.flag;
            });
            this.DrawImg(result, "canvas", this.uploadPic3);
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
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/body/handanalysis",
      //   params: {
      //     img_type: "BASE64",
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
           // let obj = res.data.data.hand_info[0].hand_parts;
            let obj = {"0":{"score":0.8168766498565674,"x":555,"y":651},"1":{"score":0.6080468893051147,"x":591,"y":567},"2":{"score":0.6963334083557129,"x":603,"y":447},"3":{"score":0.7793335914611816,"x":543,"y":375},"4":{"score":0.8870123624801636,"x":435,"y":363},"5":{"score":0.8292683362960815,"x":567,"y":327},"6":{"score":0.8686822652816772,"x":579,"y":243},"7":{"score":0.895149827003479,"x":591,"y":171},"8":{"score":0.8744207620620728,"x":603,"y":99},"9":{"score":0.8488503098487854,"x":483,"y":339},"10":{"score":0.8434821367263794,"x":459,"y":255},"11":{"score":0.9180803894996643,"x":435,"y":171},"12":{"score":0.8905544281005859,"x":399,"y":99},"13":{"score":0.6547101140022278,"x":411,"y":387},"14":{"score":0.8638255596160889,"x":399,"y":339},"15":{"score":0.8143016695976257,"x":435,"y":399},"16":{"score":0.8583201169967651,"x":483,"y":471},"17":{"score":0.7461135387420654,"x":375,"y":459},"18":{"score":0.7831668257713318,"x":351,"y":387},"19":{"score":0.8214616179466248,"x":387,"y":411},"20":{"score":0.8701381087303162,"x":435,"y":459}};
            let result = [];
            for (var i in obj) {
              result.push(obj[i]);
            }
            this.DrawImg(result, "canvas", this.uploadPic3);
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    DrawImg(list, id, url) {
      var canvas = document.getElementById(id);
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        list.forEach(item => {
          ctx.beginPath();
          ctx.arc(item.x, item.y, 5, 0, 360, false);
          ctx.fillStyle = "#3A85F5"; //填充颜色,默认是黑色
          ctx.fill(); //画实心圆
          ctx.closePath();
        });
      };
    },
    DrawImg1(list, id, url) {
      var canvas = document.getElementById(id);
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = "#44D7B6";
        ctx.lineWidth = 3;
        ctx.strokeRect(list.x1, list.y1, list.x2 - list.x1, list.y2 - list.y1);
      };
    },
    handleBeforeUpload2(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic2 = base64;
        getImgSize(_this.uploadPic2).then(res => {
          _this.whFlag = res.flag;
        });
      });
      if (this.formData.get("files1")) {
        this.formData.set("files1", file); //
      } else {
        this.formData.append("files1", file); //
      }
      this.compareSimliar();
    },
    handleBeforeUpload1(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic1 = base64;
        _this.uploadPic2 = "";
        _this.simlar = "";
        getImgSize(_this.uploadPic1).then(res => {
          _this.whFlag = res.flag;
        });
      });
      if (this.formData.get("files")) {
        this.formData.set("files", file); //
      } else {
        this.formData.append("files", file); //
      }
    },
    compareSimliar() {
      if (this.formData.get("files") && this.formData.get("files1")) {
        this.isloading = true;
        this.$axios({
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data"
          },
          method: "post",
          url:
            window.config.url +
            "/ai/bdface/match?img_type=FILES&img_type1=FILES",
          data: this.formData
        })
          .then(res => {
            this.isloading = false;
            if (res.data.code == 200000) {
              if (!res.data.data) {
                this.$Message.error("返回数据为空");
                return;
              }
              this.simlar = res.data.data.result.score.toFixed(2) + "%";
            } else {
              this.$Message.error("请求失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("请上传图片");
      }
    },
    uploadSimliar(img1, img2) {
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/bdface/match",
      //   params: {
      //     img_type: "BASE64",
      //     image_param: img1,
      //     img_type1: "BASE64",
      //     image_param1: img2
      //   }
      // })
      //   .then(res => {
            this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
      //       let result = res.data.data;
            this.simlar ='87.29%';
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    },

    showMenu(val) {
      this.face_token = val.face_token;
      this.resultList.forEach(item => {
        if (item.face_token == val.face_token) {
          this.resultContent = item;
        }
      });
    },
    showMenu1(val) {
      this.currentIndex = val;
      this.picList1.forEach((item, index) => {
        if (index == val) {
          this.resultContent1 = item;
        }
      });
    },
    showMenu2(val) {
      this.currentIndex = val;
      this.picList2.forEach((item, index) => {
        if (index == val) {
          this.resultContent2 = item;
        }
      });
    },
    handleBeforeUpload(file) {
      this.isloading = true;
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic = base64;
        getImgSize(_this.uploadPic).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.picList = [];
      this.resultContent = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:
          window.config.url +
          "/ai/bdface/bddetect?img_type=FILES&image_param=BASE64",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            let result = res.data.data.result.face_list;
            this.resultList = result;
            this.resultContent = result[0];
            this.face_token = result[0].face_token;
            result.forEach(item => {
              let location = item.location;
              _this.jcrop(
                this.uploadPic,
                location.left,
                location.top,
                location.width,
                location.height,
                100,
                res => {
                  this.picList.push({
                    face_token: item.face_token,
                    base64: res
                  });
                }
              );
            });
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    upload(base) {
      let _this = this;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url + "/ai/bdface/bddetect",
      //   params: {
      //     img_type: "BASE64",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.picList = [];
            // let result=res.data.data.result.face_list;
            let result = [
              {
                expression: { probability: 1, type: "smile" },
                face_shape: { probability: 0.67, type: "heart" },
                beauty: 55.37,
                gender: { probability: 1, type: "female" },
                race: { probability: 1, type: "yellow" },
                landmark150: {
                  eye_right_eyeball_right: { x: 706.52, y: 732.73 },
                  mouth_corner_right_inner: { x: 724.14, y: 825.68 },
                  cheek_right_1: { x: 638.68, y: 714.06 },
                  cheek_right_2: { x: 641.14, y: 731.48 },
                  cheek_right_3: { x: 643.3, y: 748.68 },
                  cheek_right_8: { x: 677.83, y: 833.69 },
                  cheek_right_9: { x: 692.27, y: 848.65 },
                  cheek_right_4: { x: 646.93, y: 766.19 },
                  cheek_right_5: { x: 651.09, y: 783.16 },
                  cheek_right_6: { x: 657.21, y: 801.1 },
                  cheek_right_7: { x: 665.16, y: 817.16 },
                  mouth_lip_lower_outer_1: { x: 727.55, y: 831.07 },
                  mouth_lip_lower_outer_2: { x: 734.04, y: 837.2 },
                  mouth_lip_lower_outer_3: { x: 741.46, y: 841.86 },
                  mouth_lip_lower_outer_4: { x: 748.49, y: 846.23 },
                  eye_right_corner_left: { x: 738.05, y: 739.42 },
                  mouth_lip_lower_outer_5: { x: 756.59, y: 848.39 },
                  mouth_corner_left_outer: { x: 795.61, y: 821.25 },
                  eyebrow_left_corner_left: { x: 837.14, y: 702 },
                  nose_left_contour_7: { x: 785.43, y: 798.72 },
                  cheek_right_11: { x: 726.2, y: 873.78 },
                  nose_left_contour_6: { x: 785.26, y: 803.71 },
                  eye_right_eyeball_center: { x: 716.08, y: 732.16 },
                  nose_left_contour_5: { x: 789.23, y: 805.58 },
                  nose_left_contour_4: { x: 793.99, y: 796.92 },
                  cheek_left_8: { x: 822.33, y: 816.9 },
                  cheek_left_7: { x: 831.19, y: 801.04 },
                  nose_left_contour_3: { x: 787.54, y: 779.78 },
                  cheek_right_10: { x: 708.81, y: 862.13 },
                  nose_left_contour_2: { x: 782.78, y: 759.84 },
                  cheek_left_9: { x: 812.28, y: 832.13 },
                  nose_left_contour_1: { x: 777.95, y: 739.87 },
                  mouth_lip_lower_outer_6: { x: 764.9, y: 848.12 },
                  cheek_left_4: { x: 843.84, y: 754.37 },
                  cheek_left_3: { x: 844.6, y: 738.74 },
                  mouth_lip_lower_outer_7: { x: 771.94, y: 847.23 },
                  cheek_left_6: { x: 837.05, y: 785.61 },
                  mouth_lip_lower_outer_8: { x: 778.06, y: 843.94 },
                  cheek_left_5: { x: 841.38, y: 769.62 },
                  mouth_lip_lower_outer_9: { x: 783.03, y: 839.11 },
                  cheek_left_2: { x: 844.87, y: 723.65 },
                  cheek_left_1: { x: 845.04, y: 708.21 },
                  mouth_lip_upper_inner_2: { x: 736.98, y: 829.27 },
                  mouth_lip_upper_inner_3: { x: 744.94, y: 831.87 },
                  mouth_lip_upper_inner_4: { x: 751.86, y: 832.51 },
                  mouth_lip_upper_inner_5: { x: 758.44, y: 833.34 },
                  mouth_corner_right_outer: { x: 721.44, y: 824.53 },
                  mouth_lip_upper_inner_6: { x: 765.54, y: 834.39 },
                  mouth_lip_upper_inner_7: { x: 771, y: 832.71 },
                  mouth_lip_upper_inner_8: { x: 776.01, y: 831.29 },
                  mouth_lip_upper_inner_9: { x: 781.56, y: 829.93 },
                  eyebrow_left_upper_1: { x: 784.81, y: 707.25 },
                  eyebrow_left_upper_2: { x: 797.3, y: 700.75 },
                  eyebrow_left_upper_5: { x: 836.65, y: 698.58 },
                  eyebrow_left_upper_3: { x: 810.29, y: 695.72 },
                  eye_left_eyeball_right: { x: 793.18, y: 730.77 },
                  eyebrow_left_upper_4: { x: 824.51, y: 693.39 },
                  mouth_lip_upper_inner_1: { x: 729.6, y: 827.01 },
                  mouth_lip_upper_outer_11: { x: 790.48, y: 822.62 },
                  mouth_lip_lower_inner_7: { x: 770.43, y: 836.54 },
                  mouth_lip_upper_outer_10: { x: 785.76, y: 824.39 },
                  mouth_lip_lower_inner_8: { x: 775.48, y: 834.9 },
                  mouth_lip_lower_inner_9: { x: 780.49, y: 832.66 },
                  mouth_lip_lower_inner_3: { x: 744.3, y: 834.65 },
                  mouth_lip_lower_inner_4: { x: 751.02, y: 836.28 },
                  mouth_lip_lower_inner_5: { x: 757.59, y: 837.32 },
                  mouth_lip_lower_inner_6: { x: 764.73, y: 837.71 },
                  eye_left_eyeball_center: { x: 801.73, y: 728.67 },
                  mouth_lip_lower_inner_1: { x: 729.13, y: 828.69 },
                  mouth_lip_lower_inner_2: { x: 736.35, y: 831.8 },
                  eye_right_corner_right: { x: 695.85, y: 733.44 },
                  mouth_lip_lower_outer_11: { x: 791.66, y: 827.71 },
                  mouth_lip_lower_outer_10: { x: 787.77, y: 833.74 },
                  eye_right_eyeball_left: { x: 725.27, y: 733.13 },
                  eyebrow_right_lower_2: { x: 713.68, y: 710.07 },
                  eyebrow_right_lower_1: { x: 696.01, y: 709.12 },
                  eyebrow_right_lower_3: { x: 730.44, y: 712.08 },
                  mouth_lip_upper_outer_9: { x: 780.8, y: 826.08 },
                  eye_left_corner_right: { x: 787.52, y: 737.43 },
                  mouth_lip_upper_outer_5: { x: 759.08, y: 828.36 },
                  mouth_lip_upper_outer_6: { x: 765.73, y: 829.04 },
                  mouth_lip_upper_outer_7: { x: 770.88, y: 827.99 },
                  mouth_lip_upper_outer_8: { x: 775.55, y: 827.06 },
                  eye_left_eyelid_lower_4: { x: 808.11, y: 736.95 },
                  nose_right_contour_6: { x: 753.8, y: 805.45 },
                  eye_left_eyelid_upper_5: { x: 809.86, y: 719.68 },
                  eye_left_eyelid_upper_4: { x: 804.41, y: 720.34 },
                  eye_left_eyelid_lower_3: { x: 802.54, y: 737.73 },
                  nose_right_contour_7: { x: 753.02, y: 800.78 },
                  eye_left_eyelid_lower_2: { x: 797.01, y: 737.6 },
                  nose_right_contour_4: { x: 737.83, y: 801.06 },
                  eye_left_eyelid_upper_7: { x: 819.92, y: 723.17 },
                  eye_left_eyelid_upper_6: { x: 815.11, y: 720.61 },
                  eye_left_eyelid_lower_1: { x: 792.22, y: 737.18 },
                  nose_right_contour_5: { x: 746.27, y: 808.23 },
                  eye_left_eyelid_upper_1: { x: 789.68, y: 730.43 },
                  mouth_lip_upper_outer_1: { x: 729.39, y: 825.33 },
                  eye_left_eyelid_lower_7: { x: 820.39, y: 730.16 },
                  mouth_lip_upper_outer_2: { x: 737.43, y: 826.78 },
                  eyebrow_right_corner_left: { x: 747.29, y: 712.79 },
                  eye_left_eyelid_lower_6: { x: 817.65, y: 733.04 },
                  mouth_lip_upper_outer_3: { x: 745.7, y: 827.97 },
                  eye_left_eyelid_upper_3: { x: 798.72, y: 721.93 },
                  eye_left_eyeball_left: { x: 810.82, y: 728.13 },
                  eye_left_eyelid_upper_2: { x: 794.03, y: 725.1 },
                  eye_left_eyelid_lower_5: { x: 813, y: 735.42 },
                  mouth_lip_upper_outer_4: { x: 752.72, y: 828.02 },
                  nose_tip: { x: 772.86, y: 796.48 },
                  chin_3: { x: 777.35, y: 874.5 },
                  chin_1: { x: 743.22, y: 880.58 },
                  chin_2: { x: 761.02, y: 881.36 },
                  eyebrow_right_upper_1: { x: 678.74, y: 705.1 },
                  eye_right_eyelid_lower_7: { x: 732.88, y: 739.85 },
                  eye_right_eyelid_lower_6: { x: 728.24, y: 740.92 },
                  eyebrow_right_upper_5: { x: 747.55, y: 708.02 },
                  eyebrow_right_upper_4: { x: 731.74, y: 702.54 },
                  eyebrow_right_upper_3: { x: 714.96, y: 698.79 },
                  eyebrow_right_upper_2: { x: 696.35, y: 697.98 },
                  mouth_corner_left_inner: { x: 793.56, y: 822.99 },
                  eye_right_eyelid_upper_2: { x: 706.72, y: 726.08 },
                  eye_right_eyelid_upper_1: { x: 700.78, y: 729.03 },
                  eye_right_eyelid_upper_4: { x: 718.76, y: 724.39 },
                  eye_right_eyelid_upper_3: { x: 712.51, y: 724.3 },
                  eye_right_eyelid_lower_1: { x: 700.55, y: 735.91 },
                  eye_left_corner_left: { x: 823.86, y: 727.2 },
                  eyebrow_left_corner_right: { x: 785.18, y: 711.98 },
                  eye_right_eyelid_lower_5: { x: 722.52, y: 741.62 },
                  mouth_lip_upper_inner_11: { x: 790.47, y: 824.4 },
                  eye_right_eyelid_lower_4: { x: 716.77, y: 741.46 },
                  eye_right_eyelid_lower_3: { x: 710.73, y: 740.6 },
                  eye_right_eyelid_lower_2: { x: 705.05, y: 738.43 },
                  mouth_lip_upper_inner_10: { x: 786.26, y: 826.95 },
                  mouth_lip_lower_inner_10: { x: 785.93, y: 829.39 },
                  mouth_lip_lower_inner_11: { x: 790.58, y: 826.07 },
                  eyebrow_left_lower_3: { x: 825.56, y: 704.13 },
                  cheek_left_10: { x: 801.16, y: 846.61 },
                  cheek_left_11: { x: 790.44, y: 861.68 },
                  eyebrow_left_lower_2: { x: 812.23, y: 706.64 },
                  eyebrow_left_lower_1: { x: 799.19, y: 709.69 },
                  nose_bridge_1: { x: 766.27, y: 740.3 },
                  nose_right_contour_2: { x: 748.91, y: 761.63 },
                  nose_right_contour_3: { x: 745.51, y: 782.01 },
                  nose_right_contour_1: { x: 752.37, y: 741.17 },
                  nose_bridge_2: { x: 768.6, y: 760.64 },
                  nose_bridge_3: { x: 771.06, y: 781.34 },
                  eyebrow_right_corner_right: { x: 678.07, y: 708.34 },
                  nose_middle_contour: { x: 769.73, y: 812.83 },
                  eye_right_eyelid_upper_6: { x: 729.84, y: 728.2 },
                  eye_right_eyelid_upper_5: { x: 724.71, y: 725.38 },
                  eye_right_eyelid_upper_7: { x: 734.55, y: 732.94 }
                },
                eye_status: { right_eye: 1, left_eye: 1 },
                face_probability: 1,
                quality: {
                  illumination: 206,
                  occlusion: {
                    right_eye: 0,
                    nose: 0,
                    mouth: 0,
                    left_eye: 0,
                    left_cheek: 0.01,
                    chin_contour: 0,
                    right_cheek: 0
                  },
                  blur: 0,
                  completeness: 1
                },
                glasses: { probability: 1, type: "none" },
                emotion: { probability: 1, type: "happy" },
                landmark72: [
                  { x: 638.97, y: 710.57 },
                  { x: 643.53, y: 745.53 },
                  { x: 651.31, y: 780.6 },
                  { x: 663.95, y: 815.43 },
                  { x: 692.13, y: 848.57 },
                  { x: 727.6, y: 873.92 },
                  { x: 762.9, y: 880.25 },
                  { x: 791.42, y: 859.04 },
                  { x: 812.55, y: 826.5 },
                  { x: 827.98, y: 796.41 },
                  { x: 837.18, y: 766.45 },
                  { x: 841.02, y: 736.39 },
                  { x: 841.72, y: 706.85 },
                  { x: 696.07, y: 733.17 },
                  { x: 707.06, y: 726.13 },
                  { x: 719.02, y: 724.28 },
                  { x: 729.76, y: 727.67 },
                  { x: 738.17, y: 738.36 },
                  { x: 728.57, y: 740.18 },
                  { x: 717.21, y: 741.28 },
                  { x: 705.39, y: 738.12 },
                  { x: 716.59, y: 731.6 },
                  { x: 678.34, y: 710.92 },
                  { x: 695.6, y: 699.18 },
                  { x: 713.47, y: 698.69 },
                  { x: 729.96, y: 701.39 },
                  { x: 745.03, y: 711.18 },
                  { x: 728.84, y: 710.83 },
                  { x: 712.94, y: 709.49 },
                  { x: 696.23, y: 709.38 },
                  { x: 787.44, y: 736.14 },
                  { x: 794.7, y: 724.01 },
                  { x: 804.75, y: 719.72 },
                  { x: 814.76, y: 720.25 },
                  { x: 823.09, y: 726.46 },
                  { x: 817.34, y: 732.41 },
                  { x: 807.99, y: 736.07 },
                  { x: 797.01, y: 736.41 },
                  { x: 801.54, y: 727.37 },
                  { x: 788.17, y: 710.56 },
                  { x: 799.58, y: 699.6 },
                  { x: 812.24, y: 695.45 },
                  { x: 825.19, y: 694.03 },
                  { x: 835.83, y: 702.62 },
                  { x: 825.4, y: 703.51 },
                  { x: 813.61, y: 705.49 },
                  { x: 801.02, y: 708.06 },
                  { x: 752.32, y: 739.58 },
                  { x: 749.4, y: 760.12 },
                  { x: 746.42, y: 781.21 },
                  { x: 739.74, y: 799.74 },
                  { x: 755.4, y: 804.16 },
                  { x: 783.45, y: 802.91 },
                  { x: 791.86, y: 796.21 },
                  { x: 786.09, y: 779.33 },
                  { x: 781.51, y: 758.78 },
                  { x: 776.8, y: 738.35 },
                  { x: 773.54, y: 796.07 },
                  { x: 722.71, y: 825.46 },
                  { x: 747.17, y: 825.58 },
                  { x: 766.43, y: 826.51 },
                  { x: 780.51, y: 823.1 },
                  { x: 794.08, y: 820.99 },
                  { x: 783.14, y: 838.35 },
                  { x: 765.41, y: 847.25 },
                  { x: 741.89, y: 841.79 },
                  { x: 746.78, y: 829.97 },
                  { x: 766.14, y: 832.28 },
                  { x: 781.15, y: 828.07 },
                  { x: 780.04, y: 831.13 },
                  { x: 764.8, y: 835.56 },
                  { x: 744.95, y: 833.61 }
                ],
                face_type: { probability: 1, type: "human" },
                angle: { roll: 0, pitch: 21.37, yaw: -11.38 },
                face_token: "57ffd9351d0c370977d9501cc371a649",
                location: {
                  top: 702.36,
                  left: 638.87,
                  rotation: -3,
                  width: 202,
                  height: 184
                },
                landmark: [
                  { x: 716.59, y: 731.6 },
                  { x: 801.54, y: 727.37 },
                  { x: 773.54, y: 796.07 },
                  { x: 763.23, y: 831.4 }
                ],
                age: 22,
                mask: { probability: 1, type: 0 }
              },
              {
                expression: { probability: 1, type: "smile" },
                face_shape: { probability: 0.49, type: "round" },
                beauty: 43.29,
                gender: { probability: 0.99, type: "female" },
                race: { probability: 1, type: "yellow" },
                landmark150: {
                  eye_right_eyeball_right: { x: 924, y: 660.47 },
                  mouth_corner_right_inner: { x: 953.32, y: 729.74 },
                  cheek_right_1: { x: 890.2, y: 653.54 },
                  cheek_right_2: { x: 893.35, y: 667.2 },
                  cheek_right_3: { x: 896.66, y: 680.64 },
                  cheek_right_8: { x: 928.85, y: 745.95 },
                  cheek_right_9: { x: 941.77, y: 756.46 },
                  cheek_right_4: { x: 900.33, y: 694.3 },
                  cheek_right_5: { x: 904.96, y: 707.41 },
                  cheek_right_6: { x: 910.36, y: 721.34 },
                  cheek_right_7: { x: 917.69, y: 733.34 },
                  mouth_lip_lower_outer_1: { x: 955.93, y: 735.28 },
                  mouth_lip_lower_outer_2: { x: 961.58, y: 740.62 },
                  mouth_lip_lower_outer_3: { x: 967.91, y: 744.86 },
                  mouth_lip_lower_outer_4: { x: 974.75, y: 748.66 },
                  eye_right_corner_left: { x: 945.87, y: 661.02 },
                  mouth_lip_lower_outer_5: { x: 982.69, y: 750.09 },
                  mouth_corner_left_outer: { x: 1023.19, y: 713.4 },
                  eyebrow_left_corner_left: { x: 1029.72, y: 615.49 },
                  nose_left_contour_7: { x: 990.97, y: 698.48 },
                  cheek_right_11: { x: 970.92, y: 776.56 },
                  nose_left_contour_6: { x: 991.33, y: 702.6 },
                  eye_right_eyeball_center: { x: 931.27, y: 658.65 },
                  nose_left_contour_5: { x: 998, y: 703.26 },
                  nose_left_contour_4: { x: 1003.21, y: 695.84 },
                  cheek_left_8: { x: 1059.58, y: 723.06 },
                  cheek_left_7: { x: 1065.27, y: 706.01 },
                  nose_left_contour_3: { x: 992.71, y: 682.42 },
                  cheek_right_10: { x: 956.17, y: 766.84 },
                  nose_left_contour_2: { x: 985.62, y: 669.08 },
                  cheek_left_9: { x: 1051.42, y: 738.84 },
                  nose_left_contour_1: { x: 978.54, y: 655.76 },
                  mouth_lip_lower_outer_6: { x: 990.37, y: 748.74 },
                  cheek_left_4: { x: 1064.14, y: 660.79 },
                  cheek_left_3: { x: 1062.25, y: 645.81 },
                  mouth_lip_lower_outer_7: { x: 999.15, y: 746.74 },
                  cheek_left_6: { x: 1066.78, y: 691.09 },
                  mouth_lip_lower_outer_8: { x: 1006.55, y: 742.08 },
                  cheek_left_5: { x: 1066.08, y: 675.31 },
                  mouth_lip_lower_outer_9: { x: 1011.93, y: 735.72 },
                  cheek_left_2: { x: 1059.46, y: 631.5 },
                  cheek_left_1: { x: 1057.15, y: 616.7 },
                  mouth_lip_upper_inner_2: { x: 961.45, y: 728.65 },
                  mouth_lip_upper_inner_3: { x: 967.06, y: 728.92 },
                  mouth_lip_upper_inner_4: { x: 973.02, y: 728.01 },
                  mouth_lip_upper_inner_5: { x: 978.71, y: 727.55 },
                  mouth_corner_right_outer: { x: 950.64, y: 729.47 },
                  mouth_lip_upper_inner_6: { x: 984.94, y: 727.72 },
                  mouth_lip_upper_inner_7: { x: 991.17, y: 725.1 },
                  mouth_lip_upper_inner_8: { x: 997.19, y: 723.01 },
                  mouth_lip_upper_inner_9: { x: 1003.65, y: 721.12 },
                  eyebrow_left_upper_1: { x: 978.2, y: 625.87 },
                  eyebrow_left_upper_2: { x: 989.12, y: 619.27 },
                  eyebrow_left_upper_5: { x: 1028.54, y: 612.48 },
                  eyebrow_left_upper_3: { x: 1000.83, y: 613.32 },
                  eye_left_eyeball_right: { x: 998.14, y: 646.28 },
                  eyebrow_left_upper_4: { x: 1014.75, y: 609.64 },
                  mouth_lip_upper_inner_1: { x: 956.36, y: 728.82 },
                  mouth_lip_upper_outer_11: { x: 1016.31, y: 714.03 },
                  mouth_lip_lower_inner_7: { x: 995.4, y: 736.86 },
                  mouth_lip_upper_outer_10: { x: 1009.5, y: 715.81 },
                  mouth_lip_lower_inner_8: { x: 1001.76, y: 733.94 },
                  mouth_lip_lower_inner_9: { x: 1007.49, y: 729.99 },
                  mouth_lip_lower_inner_3: { x: 969.68, y: 737.95 },
                  mouth_lip_lower_inner_4: { x: 975.91, y: 739.33 },
                  mouth_lip_lower_inner_5: { x: 982.14, y: 739.71 },
                  mouth_lip_lower_inner_6: { x: 988.39, y: 738.9 },
                  eye_left_eyeball_center: { x: 1004.95, y: 643.71 },
                  mouth_lip_lower_inner_1: { x: 957.12, y: 732.6 },
                  mouth_lip_lower_inner_2: { x: 963.17, y: 735.66 },
                  eye_right_corner_right: { x: 913.03, y: 662.61 },
                  mouth_lip_lower_outer_11: { x: 1020.6, y: 721.35 },
                  mouth_lip_lower_outer_10: { x: 1017.03, y: 729.02 },
                  eye_right_eyeball_left: { x: 938.05, y: 658.36 },
                  eyebrow_right_lower_2: { x: 917.95, y: 641.29 },
                  eyebrow_right_lower_1: { x: 906.23, y: 642.85 },
                  eyebrow_right_lower_3: { x: 929.8, y: 640.84 },
                  mouth_lip_upper_outer_9: { x: 1002.42, y: 717.75 },
                  eye_left_corner_right: { x: 989.79, y: 651.95 },
                  mouth_lip_upper_outer_5: { x: 977.64, y: 723.18 },
                  mouth_lip_upper_outer_6: { x: 983.51, y: 722.92 },
                  mouth_lip_upper_outer_7: { x: 989.98, y: 720.72 },
                  mouth_lip_upper_outer_8: { x: 995.97, y: 719.05 },
                  eye_left_eyelid_lower_4: { x: 1006.4, y: 648.68 },
                  nose_right_contour_6: { x: 964.25, y: 708.39 },
                  eye_left_eyelid_upper_5: { x: 1007.19, y: 638.33 },
                  eye_left_eyelid_upper_4: { x: 1002.73, y: 639.73 },
                  eye_left_eyelid_lower_3: { x: 1002.24, y: 650.43 },
                  nose_right_contour_7: { x: 962.94, y: 704.36 },
                  eye_left_eyelid_lower_2: { x: 997.89, y: 650.76 },
                  nose_right_contour_4: { x: 952.54, y: 705.83 },
                  eye_left_eyelid_upper_7: { x: 1016.8, y: 638.47 },
                  eye_left_eyelid_upper_6: { x: 1011.72, y: 638.23 },
                  eye_left_eyelid_lower_1: { x: 993.88, y: 651.54 },
                  nose_right_contour_5: { x: 959.47, y: 711 },
                  eye_left_eyelid_upper_1: { x: 991.74, y: 647.36 },
                  mouth_lip_upper_outer_1: { x: 955.58, y: 727.07 },
                  eye_left_eyelid_lower_7: { x: 1018.14, y: 642.75 },
                  mouth_lip_upper_outer_2: { x: 960.8, y: 725.88 },
                  eyebrow_right_corner_left: { x: 942.12, y: 639.42 },
                  eye_left_eyelid_lower_6: { x: 1014.4, y: 644.85 },
                  mouth_lip_upper_outer_3: { x: 966.39, y: 725.06 },
                  eye_left_eyelid_upper_3: { x: 998.47, y: 641.16 },
                  eye_left_eyeball_left: { x: 1012.05, y: 642.45 },
                  eye_left_eyelid_upper_2: { x: 995.24, y: 643.9 },
                  eye_left_eyelid_lower_5: { x: 1010.77, y: 647.5 },
                  mouth_lip_upper_outer_4: { x: 972.15, y: 723.77 },
                  nose_tip: { x: 975.08, y: 698.92 },
                  chin_3: { x: 1015.77, y: 777.87 },
                  chin_1: { x: 985.26, y: 782.47 },
                  chin_2: { x: 1000.72, y: 783.03 },
                  eyebrow_right_upper_1: { x: 896.01, y: 642.31 },
                  eye_right_eyelid_lower_7: { x: 942.03, y: 662.12 },
                  eye_right_eyelid_lower_6: { x: 937.92, y: 662.95 },
                  eyebrow_right_upper_5: { x: 941.2, y: 634.7 },
                  eyebrow_right_upper_4: { x: 929.29, y: 633.23 },
                  eyebrow_right_upper_3: { x: 916.82, y: 632.47 },
                  eyebrow_right_upper_2: { x: 904.36, y: 634.68 },
                  mouth_corner_left_inner: { x: 1020.84, y: 714.7 },
                  eye_right_eyelid_upper_2: { x: 920.14, y: 656.89 },
                  eye_right_eyelid_upper_1: { x: 916.03, y: 659.12 },
                  eye_right_eyelid_upper_4: { x: 928.46, y: 654.64 },
                  eye_right_eyelid_upper_3: { x: 924.07, y: 655.1 },
                  eye_right_eyelid_lower_1: { x: 917.01, y: 663.87 },
                  eye_left_corner_left: { x: 1021.51, y: 639.96 },
                  eyebrow_left_corner_right: { x: 979.18, y: 630.61 },
                  eye_right_eyelid_lower_5: { x: 933.92, y: 664.36 },
                  mouth_lip_upper_inner_11: { x: 1016.21, y: 715.59 },
                  eye_right_eyelid_lower_4: { x: 929.5, y: 664.54 },
                  eye_right_eyelid_lower_3: { x: 925.2, y: 665.13 },
                  eye_right_eyelid_lower_2: { x: 920.87, y: 664.36 },
                  mouth_lip_upper_inner_10: { x: 1010.15, y: 718.08 },
                  mouth_lip_lower_inner_10: { x: 1013.5, y: 725.09 },
                  mouth_lip_lower_inner_11: { x: 1018.29, y: 719.56 },
                  eyebrow_left_lower_3: { x: 1016.79, y: 618.07 },
                  cheek_left_10: { x: 1040.52, y: 754.12 },
                  cheek_left_11: { x: 1028.43, y: 768.32 },
                  eyebrow_left_lower_2: { x: 1004.04, y: 622.25 },
                  eyebrow_left_lower_1: { x: 992.02, y: 627.2 },
                  nose_bridge_1: { x: 967.35, y: 658.2 },
                  nose_right_contour_2: { x: 956.16, y: 675.27 },
                  nose_right_contour_3: { x: 955.84, y: 690.01 },
                  nose_right_contour_1: { x: 956.56, y: 660.43 },
                  nose_bridge_2: { x: 970.13, y: 672.48 },
                  nose_bridge_3: { x: 973.02, y: 686.93 },
                  eyebrow_right_corner_right: { x: 896.43, y: 645.6 },
                  nose_middle_contour: { x: 979.33, y: 712.31 },
                  eye_right_eyelid_upper_6: { x: 937.38, y: 655.17 },
                  eye_right_eyelid_upper_5: { x: 933.16, y: 654.17 },
                  eye_right_eyelid_upper_7: { x: 942.19, y: 657.33 }
                },
                eye_status: { right_eye: 1, left_eye: 0.9999917746 },
                face_probability: 1,
                quality: {
                  illumination: 195,
                  occlusion: {
                    right_eye: 0,
                    nose: 0,
                    mouth: 0,
                    left_eye: 0,
                    left_cheek: 0.03,
                    chin_contour: 0,
                    right_cheek: 0.02
                  },
                  blur: 0,
                  completeness: 1
                },
                glasses: { probability: 1, type: "none" },
                emotion: { probability: 1, type: "happy" },
                landmark72: [
                  { x: 887.54, y: 653.31 },
                  { x: 894.4, y: 679.93 },
                  { x: 903.6, y: 706.49 },
                  { x: 916.49, y: 731.91 },
                  { x: 939.16, y: 755.62 },
                  { x: 968.61, y: 775.78 },
                  { x: 998.42, y: 782.56 },
                  { x: 1026.14, y: 768.26 },
                  { x: 1049.44, y: 739.05 },
                  { x: 1063.71, y: 705.78 },
                  { x: 1065.14, y: 675.1 },
                  { x: 1063.21, y: 645.11 },
                  { x: 1059.45, y: 615.64 },
                  { x: 913.08, y: 662.54 },
                  { x: 920.16, y: 657.06 },
                  { x: 928.41, y: 654.72 },
                  { x: 936.84, y: 655.24 },
                  { x: 945.24, y: 660.7 },
                  { x: 937.56, y: 662.89 },
                  { x: 929.07, y: 664.7 },
                  { x: 920.55, y: 664.55 },
                  { x: 931.45, y: 658.63 },
                  { x: 895.32, y: 645.07 },
                  { x: 903.22, y: 633.9 },
                  { x: 915.28, y: 631.62 },
                  { x: 927.65, y: 632.43 },
                  { x: 940.14, y: 638.79 },
                  { x: 928.04, y: 639.97 },
                  { x: 916.53, y: 640.39 },
                  { x: 905.18, y: 641.97 },
                  { x: 989.65, y: 651.34 },
                  { x: 995.37, y: 643.38 },
                  { x: 1002.82, y: 639.35 },
                  { x: 1012.01, y: 638.16 },
                  { x: 1021.57, y: 639.76 },
                  { x: 1014.72, y: 644.88 },
                  { x: 1006.26, y: 648.65 },
                  { x: 997.73, y: 650.44 },
                  { x: 1005.34, y: 643.37 },
                  { x: 980.61, y: 629.39 },
                  { x: 990.29, y: 618.17 },
                  { x: 1002.47, y: 612.35 },
                  { x: 1016.46, y: 609.33 },
                  { x: 1031.46, y: 616.02 },
                  { x: 1018.07, y: 617.39 },
                  { x: 1005.27, y: 621.11 },
                  { x: 993.23, y: 625.73 },
                  { x: 956.07, y: 660.09 },
                  { x: 955.65, y: 675.3 },
                  { x: 955.22, y: 691.19 },
                  { x: 952.37, y: 706.57 },
                  { x: 963.49, y: 709.18 },
                  { x: 989.83, y: 703.42 },
                  { x: 1001.79, y: 696.13 },
                  { x: 991.53, y: 683.26 },
                  { x: 984.67, y: 669.11 },
                  { x: 977.89, y: 655.33 },
                  { x: 973.26, y: 700.09 },
                  { x: 950.7, y: 728.86 },
                  { x: 965.35, y: 724.68 },
                  { x: 981.83, y: 723.07 },
                  { x: 1000.84, y: 717.68 },
                  { x: 1022.04, y: 714.77 },
                  { x: 1010.49, y: 736.72 },
                  { x: 989.26, y: 749.27 },
                  { x: 966.72, y: 745.13 },
                  { x: 966.12, y: 729.17 },
                  { x: 983.43, y: 728.34 },
                  { x: 1001.99, y: 722.11 },
                  { x: 1005.64, y: 730.3 },
                  { x: 986.85, y: 738.57 },
                  { x: 968.56, y: 737.58 }
                ],
                face_type: { probability: 1, type: "human" },
                angle: { roll: -14.95, pitch: 21.01, yaw: 4.76 },
                face_token: "c66151bd0578f3a15915149c853f608a",
                location: {
                  top: 637.42,
                  left: 884.7,
                  rotation: -11,
                  width: 175,
                  height: 165
                },
                landmark: [
                  { x: 931.45, y: 658.63 },
                  { x: 1005.34, y: 643.37 },
                  { x: 973.26, y: 700.09 },
                  { x: 985.7, y: 730.45 }
                ],
                age: 23,
                mask: { probability: 1, type: 0 }
              },
              {
                expression: { probability: 1, type: "smile" },
                face_shape: { probability: 0.65, type: "oval" },
                beauty: 62.97,
                gender: { probability: 1, type: "female" },
                race: { probability: 1, type: "yellow" },
                landmark150: {
                  eye_right_eyeball_right: { x: 209.05, y: 145.95 },
                  mouth_corner_right_inner: { x: 216.1, y: 211.6 },
                  cheek_right_1: { x: 173.95, y: 150.1 },
                  cheek_right_2: { x: 173.44, y: 162.21 },
                  cheek_right_3: { x: 173.01, y: 174.83 },
                  cheek_right_8: { x: 188.83, y: 238.76 },
                  cheek_right_9: { x: 198.97, y: 249.4 },
                  cheek_right_4: { x: 173.76, y: 187.39 },
                  cheek_right_5: { x: 175.09, y: 199.97 },
                  cheek_right_6: { x: 177.62, y: 213.23 },
                  cheek_right_7: { x: 181.78, y: 225.37 },
                  mouth_lip_lower_outer_1: { x: 218.12, y: 217.83 },
                  mouth_lip_lower_outer_2: { x: 223.61, y: 223.27 },
                  mouth_lip_lower_outer_3: { x: 229.99, y: 227.14 },
                  mouth_lip_lower_outer_4: { x: 236.35, y: 230.85 },
                  eye_right_corner_left: { x: 231.1, y: 152.19 },
                  mouth_lip_lower_outer_5: { x: 243.69, y: 233 },
                  mouth_corner_left_outer: { x: 277.28, y: 220.04 },
                  eyebrow_left_corner_left: { x: 303.52, y: 148.93 },
                  nose_left_contour_7: { x: 266.14, y: 190.45 },
                  cheek_right_11: { x: 221.83, y: 263.36 },
                  nose_left_contour_6: { x: 264.8, y: 194.14 },
                  eye_right_eyeball_center: { x: 215.76, y: 146.44 },
                  nose_left_contour_5: { x: 267.56, y: 197.83 },
                  nose_left_contour_4: { x: 273, y: 193.92 },
                  cheek_left_8: { x: 290.43, y: 237.91 },
                  cheek_left_7: { x: 295.68, y: 228.36 },
                  nose_left_contour_3: { x: 268.75, y: 180.74 },
                  cheek_right_10: { x: 209.32, y: 257.91 },
                  nose_left_contour_2: { x: 265.69, y: 169.67 },
                  cheek_left_9: { x: 284.28, y: 246.82 },
                  nose_left_contour_1: { x: 262.76, y: 158.61 },
                  mouth_lip_lower_outer_6: { x: 250.8, y: 233.59 },
                  cheek_left_4: { x: 303.87, y: 199.51 },
                  cheek_left_3: { x: 304.94, y: 189.52 },
                  mouth_lip_lower_outer_7: { x: 256.76, y: 234.58 },
                  cheek_left_6: { x: 299.04, y: 218.79 },
                  mouth_lip_lower_outer_8: { x: 262.64, y: 233.93 },
                  cheek_left_5: { x: 302.22, y: 208.92 },
                  mouth_lip_lower_outer_9: { x: 267.61, y: 231.79 },
                  cheek_left_2: { x: 304.74, y: 179.96 },
                  cheek_left_1: { x: 304.83, y: 169.69 },
                  mouth_lip_upper_inner_2: { x: 226.69, y: 208.88 },
                  mouth_lip_upper_inner_3: { x: 233.28, y: 208.7 },
                  mouth_lip_upper_inner_4: { x: 239.81, y: 208.9 },
                  mouth_lip_upper_inner_5: { x: 246.33, y: 209.68 },
                  mouth_corner_right_outer: { x: 214.29, y: 211.63 },
                  mouth_lip_upper_inner_6: { x: 252.82, y: 211.3 },
                  mouth_lip_upper_inner_7: { x: 257.86, y: 211.43 },
                  mouth_lip_upper_inner_8: { x: 262.74, y: 212.22 },
                  mouth_lip_upper_inner_9: { x: 267.57, y: 213.58 },
                  eyebrow_left_upper_1: { x: 270.58, y: 136.79 },
                  eyebrow_left_upper_2: { x: 279.69, y: 135.44 },
                  eyebrow_left_upper_5: { x: 303.64, y: 146.39 },
                  eyebrow_left_upper_3: { x: 289.24, y: 136.36 },
                  eye_left_eyeball_right: { x: 275.07, y: 158.76 },
                  eyebrow_left_upper_4: { x: 297.87, y: 139.87 },
                  mouth_lip_upper_inner_1: { x: 220.44, y: 209.67 },
                  mouth_lip_upper_outer_11: { x: 276.28, y: 215.13 },
                  mouth_lip_lower_inner_7: { x: 256.2, y: 225.54 },
                  mouth_lip_upper_outer_10: { x: 273.44, y: 211.28 },
                  mouth_lip_lower_inner_8: { x: 261.04, y: 225.71 },
                  mouth_lip_lower_inner_9: { x: 265.67, y: 225.39 },
                  mouth_lip_lower_inner_3: { x: 232.59, y: 221.34 },
                  mouth_lip_lower_inner_4: { x: 238.87, y: 222.93 },
                  mouth_lip_lower_inner_5: { x: 245.19, y: 224.14 },
                  mouth_lip_lower_inner_6: { x: 251.4, y: 224.99 },
                  eye_left_eyeball_center: { x: 280.99, y: 159.1 },
                  mouth_lip_lower_inner_1: { x: 219.66, y: 215.96 },
                  mouth_lip_lower_inner_2: { x: 225.8, y: 219.08 },
                  eye_right_corner_right: { x: 200.56, y: 146.31 },
                  mouth_lip_lower_outer_11: { x: 274.71, y: 224.53 },
                  mouth_lip_lower_outer_10: { x: 271.63, y: 228.68 },
                  eye_right_eyeball_left: { x: 221.86, y: 147.98 },
                  eyebrow_right_lower_2: { x: 214.68, y: 127.44 },
                  eyebrow_right_lower_1: { x: 201.83, y: 126.65 },
                  eyebrow_right_lower_3: { x: 227.17, y: 131.23 },
                  mouth_lip_upper_outer_9: { x: 269.57, y: 208.37 },
                  eye_left_corner_right: { x: 269.86, y: 160.14 },
                  mouth_lip_upper_outer_5: { x: 247.09, y: 203.07 },
                  mouth_lip_upper_outer_6: { x: 253.94, y: 204.59 },
                  mouth_lip_upper_outer_7: { x: 259.39, y: 204.94 },
                  mouth_lip_upper_outer_8: { x: 264.8, y: 206.12 },
                  eye_left_eyelid_lower_4: { x: 283.6, y: 163.05 },
                  nose_right_contour_6: { x: 244.21, y: 190.72 },
                  eye_left_eyelid_upper_5: { x: 288.03, y: 156.32 },
                  eye_left_eyelid_upper_4: { x: 284.46, y: 155.32 },
                  eye_left_eyelid_lower_3: { x: 280.04, y: 162.67 },
                  nose_right_contour_7: { x: 244.16, y: 187.01 },
                  eye_left_eyelid_lower_2: { x: 276.57, y: 161.69 },
                  nose_right_contour_4: { x: 231.41, y: 187.8 },
                  eye_left_eyelid_upper_7: { x: 293.81, y: 160.87 },
                  eye_left_eyelid_upper_6: { x: 290.82, y: 158.19 },
                  eye_left_eyelid_lower_1: { x: 273.24, y: 161.02 },
                  nose_right_contour_5: { x: 237.53, y: 193.45 },
                  eye_left_eyelid_upper_1: { x: 273.04, y: 157.14 },
                  mouth_lip_upper_outer_1: { x: 219.54, y: 207.2 },
                  eye_left_eyelid_lower_7: { x: 292.88, y: 164.17 },
                  mouth_lip_upper_outer_2: { x: 226.26, y: 204.76 },
                  eyebrow_right_corner_left: { x: 239.74, y: 133.58 },
                  eye_left_eyelid_lower_6: { x: 289.96, y: 163.99 },
                  mouth_lip_upper_outer_3: { x: 233.35, y: 203.44 },
                  eye_left_eyelid_upper_3: { x: 280.67, y: 154.89 },
                  eye_left_eyeball_left: { x: 286.96, y: 160.44 },
                  eye_left_eyelid_upper_2: { x: 277, y: 155.48 },
                  eye_left_eyelid_lower_5: { x: 286.9, y: 163.75 },
                  mouth_lip_upper_outer_4: { x: 240.16, y: 202.69 },
                  nose_tip: { x: 258.78, y: 184.65 },
                  chin_3: { x: 257.84, y: 267.91 },
                  chin_1: { x: 233.96, y: 267.47 },
                  chin_2: { x: 246.23, y: 268.79 },
                  eyebrow_right_upper_1: { x: 190.11, y: 127.56 },
                  eye_right_eyelid_lower_7: { x: 227.26, y: 151.82 },
                  eye_right_eyelid_lower_6: { x: 223.6, y: 151.42 },
                  eyebrow_right_upper_5: { x: 240.47, y: 129.96 },
                  eyebrow_right_upper_4: { x: 228.88, y: 124.06 },
                  eyebrow_right_upper_3: { x: 215.83, y: 120.68 },
                  eyebrow_right_upper_2: { x: 202, y: 121.15 },
                  mouth_corner_left_inner: { x: 275.97, y: 219.16 },
                  eye_right_eyelid_upper_2: { x: 208.93, y: 142.6 },
                  eye_right_eyelid_upper_1: { x: 204.47, y: 143.92 },
                  eye_right_eyelid_upper_4: { x: 216.98, y: 142.23 },
                  eye_right_eyelid_upper_3: { x: 212.86, y: 141.87 },
                  eye_right_eyelid_lower_1: { x: 204.34, y: 147.83 },
                  eye_left_corner_left: { x: 295.86, y: 164.29 },
                  eyebrow_left_corner_right: { x: 270.28, y: 140.63 },
                  eye_right_eyelid_lower_5: { x: 219.78, y: 151.3 },
                  mouth_lip_upper_inner_11: { x: 274.26, y: 216.93 },
                  eye_right_eyelid_lower_4: { x: 215.92, y: 150.38 },
                  eye_right_eyelid_lower_3: { x: 211.83, y: 150.01 },
                  eye_right_eyelid_lower_2: { x: 208.06, y: 148.78 },
                  mouth_lip_upper_inner_10: { x: 271.27, y: 215.01 },
                  mouth_lip_lower_inner_10: { x: 269.85, y: 224.23 },
                  mouth_lip_lower_inner_11: { x: 273.35, y: 222.22 },
                  eyebrow_left_lower_3: { x: 296.87, y: 145.26 },
                  cheek_left_10: { x: 276.11, y: 255.68 },
                  cheek_left_11: { x: 266.76, y: 263.12 },
                  eyebrow_left_lower_2: { x: 288.55, y: 143.3 },
                  eyebrow_left_lower_1: { x: 279.3, y: 142.52 },
                  nose_bridge_1: { x: 255.86, y: 157 },
                  nose_right_contour_2: { x: 241.32, y: 166.09 },
                  nose_right_contour_3: { x: 238.68, y: 176.62 },
                  nose_right_contour_1: { x: 243.81, y: 155.6 },
                  nose_bridge_2: { x: 256.96, y: 167.82 },
                  nose_bridge_3: { x: 258.2, y: 178.59 },
                  eyebrow_right_corner_right: { x: 189.88, y: 129.86 },
                  nose_middle_contour: { x: 254.48, y: 198.29 },
                  eye_right_eyelid_upper_6: { x: 224.65, y: 145.26 },
                  eye_right_eyelid_upper_5: { x: 221.15, y: 143.25 },
                  eye_right_eyelid_upper_7: { x: 228.16, y: 148.39 }
                },
                eye_status: { right_eye: 1, left_eye: 0.9999256134 },
                face_probability: 1,
                quality: {
                  illumination: 200,
                  occlusion: {
                    right_eye: 0.07,
                    nose: 0,
                    mouth: 0,
                    left_eye: 0,
                    left_cheek: 0.18,
                    chin_contour: 0,
                    right_cheek: 0.01
                  },
                  blur: 0,
                  completeness: 1
                },
                glasses: { probability: 1, type: "none" },
                emotion: { probability: 1, type: "happy" },
                landmark72: [
                  { x: 174.46, y: 152.26 },
                  { x: 174.04, y: 176.03 },
                  { x: 175.91, y: 200.23 },
                  { x: 182.1, y: 224.12 },
                  { x: 199.21, y: 247.37 },
                  { x: 221.97, y: 263.68 },
                  { x: 245.9, y: 269.84 },
                  { x: 265.94, y: 262.39 },
                  { x: 282.82, y: 245.45 },
                  { x: 294.24, y: 226.21 },
                  { x: 299.88, y: 206.94 },
                  { x: 302.58, y: 187.47 },
                  { x: 303.19, y: 167.94 },
                  { x: 201.24, y: 147.43 },
                  { x: 209.67, y: 143.58 },
                  { x: 217.88, y: 143.04 },
                  { x: 225.6, y: 146.16 },
                  { x: 232.28, y: 152.88 },
                  { x: 224.43, y: 152.4 },
                  { x: 216.58, y: 151.75 },
                  { x: 208.72, y: 150.1 },
                  { x: 216.86, y: 147.42 },
                  { x: 191.44, y: 131.63 },
                  { x: 203.08, y: 122.05 },
                  { x: 216.58, y: 121.12 },
                  { x: 229.32, y: 124.28 },
                  { x: 239.6, y: 134.04 },
                  { x: 227.65, y: 131.45 },
                  { x: 215.65, y: 128.39 },
                  { x: 203.44, y: 128.11 },
                  { x: 269.53, y: 159.32 },
                  { x: 277.06, y: 154.64 },
                  { x: 284.66, y: 154.26 },
                  { x: 291.05, y: 156.97 },
                  { x: 296.15, y: 163.05 },
                  { x: 290.03, y: 163.64 },
                  { x: 283.43, y: 162.79 },
                  { x: 276.42, y: 161.18 },
                  { x: 281.45, y: 158.21 },
                  { x: 271.19, y: 140.24 },
                  { x: 280.69, y: 134.21 },
                  { x: 290.6, y: 134.89 },
                  { x: 299.84, y: 138.77 },
                  { x: 304.79, y: 149.2 },
                  { x: 297.88, y: 144.13 },
                  { x: 289.55, y: 141.94 },
                  { x: 280.23, y: 141.31 },
                  { x: 244.12, y: 155.43 },
                  { x: 241.3, y: 165.57 },
                  { x: 238.4, y: 175.92 },
                  { x: 231, y: 188.09 },
                  { x: 243.22, y: 190.74 },
                  { x: 264.44, y: 194 },
                  { x: 272.88, y: 192.58 },
                  { x: 268.63, y: 178.82 },
                  { x: 265.9, y: 168.37 },
                  { x: 263.04, y: 157.88 },
                  { x: 257.51, y: 184.72 },
                  { x: 213.53, y: 209.33 },
                  { x: 232.56, y: 206.18 },
                  { x: 251.83, y: 208.17 },
                  { x: 267.54, y: 209.77 },
                  { x: 278.77, y: 217.01 },
                  { x: 267.52, y: 229.31 },
                  { x: 249.55, y: 232.87 },
                  { x: 228.77, y: 225.61 },
                  { x: 231.99, y: 210.91 },
                  { x: 250.68, y: 213.97 },
                  { x: 266.09, y: 214.74 },
                  { x: 265.74, y: 223.07 },
                  { x: 250.1, y: 223.97 },
                  { x: 231.44, y: 219.56 }
                ],
                face_type: { probability: 0.73, type: "human" },
                angle: { roll: 2.02, pitch: -5.2, yaw: -16.58 },
                face_token: "fd39c62623bb5b1188d0800948f7ee2f",
                location: {
                  top: 115.74,
                  left: 180.79,
                  rotation: 9,
                  width: 132,
                  height: 141
                },
                landmark: [
                  { x: 216.86, y: 147.42 },
                  { x: 281.45, y: 158.21 },
                  { x: 257.51, y: 184.72 },
                  { x: 249.01, y: 217.46 }
                ],
                age: 22,
                mask: { probability: 1, type: 0 }
              },
              {
                expression: { probability: 0.99, type: "smile" },
                face_shape: { probability: 0.34, type: "square" },
                beauty: 63.3,
                gender: { probability: 1, type: "male" },
                race: { probability: 1, type: "yellow" },
                landmark150: {
                  eye_right_eyeball_right: { x: 527.79, y: 180.73 },
                  mouth_corner_right_inner: { x: 522.42, y: 248.8 },
                  cheek_right_1: { x: 485.97, y: 177.47 },
                  cheek_right_2: { x: 484.55, y: 188.4 },
                  cheek_right_3: { x: 482.74, y: 199.52 },
                  cheek_right_8: { x: 487.82, y: 258.87 },
                  cheek_right_9: { x: 495.29, y: 270.61 },
                  cheek_right_4: { x: 481.86, y: 210.8 },
                  cheek_right_5: { x: 481.08, y: 222.1 },
                  cheek_right_6: { x: 481.26, y: 234.11 },
                  cheek_right_7: { x: 482.92, y: 245.68 },
                  mouth_lip_lower_outer_1: { x: 523.08, y: 252.64 },
                  mouth_lip_lower_outer_2: { x: 525.83, y: 256.79 },
                  mouth_lip_lower_outer_3: { x: 529.65, y: 260.26 },
                  mouth_lip_lower_outer_4: { x: 533.2, y: 263.94 },
                  eye_right_corner_left: { x: 544.62, y: 188.42 },
                  mouth_lip_lower_outer_5: { x: 537.5, y: 266.4 },
                  mouth_corner_left_outer: { x: 566.68, y: 262.98 },
                  eyebrow_left_corner_left: { x: 613.28, y: 192.87 },
                  nose_left_contour_7: { x: 565.28, y: 231.22 },
                  cheek_right_11: { x: 513.02, y: 287.69 },
                  nose_left_contour_6: { x: 562.99, y: 234.97 },
                  eye_right_eyeball_center: { x: 533.17, y: 181.81 },
                  nose_left_contour_5: { x: 564.71, y: 240.25 },
                  nose_left_contour_4: { x: 570.97, y: 237.09 },
                  cheek_left_8: { x: 583.43, y: 278.17 },
                  cheek_left_7: { x: 590.31, y: 269.5 },
                  nose_left_contour_3: { x: 569.96, y: 222.08 },
                  cheek_right_10: { x: 503.3, y: 279.95 },
                  nose_left_contour_2: { x: 570.23, y: 209.12 },
                  cheek_left_9: { x: 575.52, y: 285.48 },
                  nose_left_contour_1: { x: 570.52, y: 196.41 },
                  mouth_lip_lower_outer_6: { x: 542.73, y: 267.74 },
                  cheek_left_4: { x: 604.38, y: 242.96 },
                  cheek_left_3: { x: 608.2, y: 233.77 },
                  mouth_lip_lower_outer_7: { x: 547.07, y: 269.46 },
                  cheek_left_6: { x: 595.47, y: 260.93 },
                  mouth_lip_lower_outer_8: { x: 551.37, y: 269.63 },
                  cheek_left_5: { x: 600, y: 251.83 },
                  mouth_lip_lower_outer_9: { x: 555.83, y: 268.43 },
                  cheek_left_2: { x: 611.44, y: 224.56 },
                  cheek_left_1: { x: 613.96, y: 215.04 },
                  mouth_lip_upper_inner_2: { x: 529.25, y: 250.14 },
                  mouth_lip_upper_inner_3: { x: 533.72, y: 251.6 },
                  mouth_lip_upper_inner_4: { x: 538.11, y: 252.62 },
                  mouth_lip_upper_inner_5: { x: 542.06, y: 253.87 },
                  mouth_corner_right_outer: { x: 520.58, y: 248.18 },
                  mouth_lip_upper_inner_6: { x: 546.37, y: 255.61 },
                  mouth_lip_upper_inner_7: { x: 550.27, y: 256.46 },
                  mouth_lip_upper_inner_8: { x: 553.72, y: 257.57 },
                  mouth_lip_upper_inner_9: { x: 557.37, y: 259.12 },
                  eyebrow_left_upper_1: { x: 582.62, y: 175.06 },
                  eyebrow_left_upper_2: { x: 591.66, y: 175.08 },
                  eyebrow_left_upper_5: { x: 614.24, y: 190.35 },
                  eyebrow_left_upper_3: { x: 601.18, y: 177.11 },
                  eye_left_eyeball_right: { x: 583.55, y: 197.72 },
                  eyebrow_left_upper_4: { x: 609.52, y: 182.53 },
                  mouth_lip_upper_inner_1: { x: 525.15, y: 249.14 },
                  mouth_lip_upper_outer_11: { x: 565.2, y: 259.41 },
                  mouth_lip_lower_inner_7: { x: 549.06, y: 259.71 },
                  mouth_lip_upper_outer_10: { x: 563.04, y: 256.4 },
                  mouth_lip_lower_inner_8: { x: 552.42, y: 260.53 },
                  mouth_lip_lower_inner_9: { x: 556.17, y: 261.34 },
                  mouth_lip_lower_inner_3: { x: 533.18, y: 254.2 },
                  mouth_lip_lower_inner_4: { x: 537.28, y: 255.8 },
                  mouth_lip_lower_inner_5: { x: 541.1, y: 257.19 },
                  mouth_lip_lower_inner_6: { x: 545.34, y: 258.78 },
                  eye_left_eyeball_center: { x: 588.39, y: 198.48 },
                  mouth_lip_lower_inner_1: { x: 524.79, y: 250.6 },
                  mouth_lip_lower_inner_2: { x: 528.76, y: 252.33 },
                  eye_right_corner_right: { x: 520.91, y: 180.22 },
                  mouth_lip_lower_outer_11: { x: 563.22, y: 265.44 },
                  mouth_lip_lower_outer_10: { x: 559.76, y: 267.46 },
                  eye_right_eyeball_left: { x: 538.34, y: 183.95 },
                  eyebrow_right_lower_2: { x: 534.76, y: 163.72 },
                  eyebrow_right_lower_1: { x: 524.27, y: 162.49 },
                  eyebrow_right_lower_3: { x: 544.95, y: 166.61 },
                  mouth_lip_upper_outer_9: { x: 559.93, y: 253.83 },
                  eye_left_corner_right: { x: 578.47, y: 198.93 },
                  mouth_lip_upper_outer_5: { x: 543.99, y: 246.93 },
                  mouth_lip_upper_outer_6: { x: 548.39, y: 249.2 },
                  mouth_lip_upper_outer_7: { x: 552.77, y: 249.81 },
                  mouth_lip_upper_outer_8: { x: 556.54, y: 251.19 },
                  eye_left_eyelid_lower_4: { x: 589.26, y: 203.02 },
                  nose_right_contour_6: { x: 544.44, y: 229.19 },
                  eye_left_eyelid_upper_5: { x: 594.13, y: 196.54 },
                  eye_left_eyelid_upper_4: { x: 591.05, y: 195.26 },
                  eye_left_eyelid_lower_3: { x: 586.18, y: 202.45 },
                  nose_right_contour_7: { x: 545.02, y: 225.15 },
                  eye_left_eyelid_lower_2: { x: 583.46, y: 201.1 },
                  nose_right_contour_4: { x: 534.35, y: 226.09 },
                  eye_left_eyelid_upper_7: { x: 599.12, y: 201.25 },
                  eye_left_eyelid_upper_6: { x: 596.7, y: 198.48 },
                  eye_left_eyelid_lower_1: { x: 580.87, y: 200.09 },
                  nose_right_contour_5: { x: 538.78, y: 232.28 },
                  eye_left_eyelid_upper_1: { x: 581.14, y: 196.37 },
                  mouth_lip_upper_outer_1: { x: 525.07, y: 246.8 },
                  eye_left_eyelid_lower_7: { x: 597.78, y: 204.44 },
                  mouth_lip_upper_outer_2: { x: 529.71, y: 245.99 },
                  eyebrow_right_corner_left: { x: 554.93, y: 169.29 },
                  eye_left_eyelid_lower_6: { x: 595.14, y: 204.19 },
                  mouth_lip_upper_outer_3: { x: 534.8, y: 245.99 },
                  eye_left_eyelid_upper_3: { x: 587.73, y: 194.64 },
                  eye_left_eyeball_left: { x: 593.6, y: 200.51 },
                  eye_left_eyelid_upper_2: { x: 584.63, y: 194.93 },
                  eye_left_eyelid_lower_5: { x: 592.13, y: 204 },
                  mouth_lip_upper_outer_4: { x: 539.6, y: 245.86 },
                  nose_tip: { x: 557.83, y: 224.52 },
                  chin_3: { x: 543.44, y: 298.55 },
                  chin_1: { x: 522.38, y: 293.45 },
                  chin_2: { x: 533.01, y: 297.03 },
                  eyebrow_right_upper_1: { x: 514.48, y: 159.03 },
                  eye_right_eyelid_lower_7: { x: 541.56, y: 188.15 },
                  eye_right_eyelid_lower_6: { x: 538.75, y: 187.74 },
                  eyebrow_right_upper_5: { x: 556, y: 165.6 },
                  eyebrow_right_upper_4: { x: 547.39, y: 159.62 },
                  eyebrow_right_upper_3: { x: 536.94, y: 155.43 },
                  eyebrow_right_upper_2: { x: 525.2, y: 154.84 },
                  mouth_corner_left_inner: { x: 565.1, y: 262.36 },
                  eye_right_eyelid_upper_2: { x: 528.25, y: 177.74 },
                  eye_right_eyelid_upper_1: { x: 524.36, y: 178.57 },
                  eye_right_eyelid_upper_4: { x: 535.14, y: 178.26 },
                  eye_right_eyelid_upper_3: { x: 531.6, y: 177.53 },
                  eye_right_eyelid_lower_1: { x: 523.53, y: 182.01 },
                  eye_left_corner_left: { x: 600.63, y: 204.53 },
                  eyebrow_left_corner_right: { x: 581.39, y: 179.04 },
                  eye_right_eyelid_lower_5: { x: 535.51, y: 187.3 },
                  mouth_lip_upper_inner_11: { x: 563.56, y: 261.25 },
                  eye_right_eyelid_lower_4: { x: 532.54, y: 186.11 },
                  eye_right_eyelid_lower_3: { x: 529.22, y: 185.25 },
                  eye_right_eyelid_lower_2: { x: 526.41, y: 183.53 },
                  mouth_lip_upper_inner_10: { x: 560.71, y: 260.13 },
                  mouth_lip_lower_inner_10: { x: 559.75, y: 262.07 },
                  mouth_lip_lower_inner_11: { x: 562.9, y: 262.73 },
                  eyebrow_left_lower_3: { x: 606.4, y: 189.04 },
                  cheek_left_10: { x: 565.02, y: 292.23 },
                  cheek_left_11: { x: 553.64, y: 296.82 },
                  eyebrow_left_lower_2: { x: 598.52, y: 185.03 },
                  eyebrow_left_lower_1: { x: 589.97, y: 182.02 },
                  nose_bridge_1: { x: 563.74, y: 194.52 },
                  nose_right_contour_2: { x: 549.59, y: 203.05 },
                  nose_right_contour_3: { x: 543.95, y: 214.14 },
                  nose_right_contour_1: { x: 555.25, y: 191.88 },
                  nose_bridge_2: { x: 561.31, y: 206.57 },
                  nose_bridge_3: { x: 558.9, y: 218.78 },
                  eyebrow_right_corner_right: { x: 514.05, y: 161.63 },
                  nose_middle_contour: { x: 552.6, y: 237.07 },
                  eye_right_eyelid_upper_6: { x: 540.97, y: 181.78 },
                  eye_right_eyelid_upper_5: { x: 538.32, y: 179.62 },
                  eye_right_eyelid_upper_7: { x: 543.25, y: 184.8 }
                },
                eye_status: { right_eye: 1, left_eye: 0.9999608994 },
                face_probability: 1,
                quality: {
                  illumination: 194,
                  occlusion: {
                    right_eye: 0,
                    nose: 0,
                    mouth: 0,
                    left_eye: 0,
                    left_cheek: 0.02,
                    chin_contour: 0,
                    right_cheek: 0.01
                  },
                  blur: 0,
                  completeness: 1
                },
                glasses: { probability: 1, type: "common" },
                emotion: { probability: 0.98, type: "happy" },
                landmark72: [
                  { x: 485.87, y: 174.74 },
                  { x: 481.81, y: 197.03 },
                  { x: 479.37, y: 219.75 },
                  { x: 480.41, y: 243.39 },
                  { x: 492.75, y: 268.86 },
                  { x: 512.23, y: 287.37 },
                  { x: 533.65, y: 296.71 },
                  { x: 554.36, y: 294.49 },
                  { x: 575.15, y: 282.93 },
                  { x: 590.62, y: 266.31 },
                  { x: 600.28, y: 248.52 },
                  { x: 607.79, y: 230.1 },
                  { x: 612.97, y: 211.23 },
                  { x: 519.74, y: 178.88 },
                  { x: 527.62, y: 176.45 },
                  { x: 534.78, y: 177.12 },
                  { x: 540.56, y: 180.64 },
                  { x: 544.53, y: 187.87 },
                  { x: 538.38, y: 186.97 },
                  { x: 531.93, y: 185.54 },
                  { x: 525.26, y: 182.51 },
                  { x: 533.05, y: 180.86 },
                  { x: 513.52, y: 161.68 },
                  { x: 525.57, y: 154.68 },
                  { x: 537.37, y: 155.81 },
                  { x: 547.84, y: 160.18 },
                  { x: 555.33, y: 169.93 },
                  { x: 545.39, y: 166.89 },
                  { x: 535.13, y: 163.45 },
                  { x: 524.4, y: 161.83 },
                  { x: 576.96, y: 198.17 },
                  { x: 583.96, y: 194.16 },
                  { x: 590.64, y: 194.4 },
                  { x: 596.47, y: 197.55 },
                  { x: 600.36, y: 203.84 },
                  { x: 595.03, y: 204.29 },
                  { x: 588.72, y: 203.25 },
                  { x: 582.54, y: 200.88 },
                  { x: 588.13, y: 197.99 },
                  { x: 580.93, y: 178.54 },
                  { x: 591.2, y: 174.45 },
                  { x: 600.83, y: 176.13 },
                  { x: 609.31, y: 181.1 },
                  { x: 612.79, y: 192.16 },
                  { x: 606.2, y: 187.45 },
                  { x: 598.36, y: 183.86 },
                  { x: 589.59, y: 181.27 },
                  { x: 554.01, y: 191.51 },
                  { x: 548.89, y: 202.29 },
                  { x: 543.69, y: 213.36 },
                  { x: 534.73, y: 224.97 },
                  { x: 544.74, y: 227.97 },
                  { x: 562.63, y: 233.65 },
                  { x: 570.11, y: 235.38 },
                  { x: 569.67, y: 220.79 },
                  { x: 569.99, y: 208.65 },
                  { x: 570.19, y: 196.38 },
                  { x: 558.32, y: 223.4 },
                  { x: 520.31, y: 248.77 },
                  { x: 534.63, y: 246.11 },
                  { x: 548.1, y: 249.18 },
                  { x: 559.19, y: 253.2 },
                  { x: 565.26, y: 261.91 },
                  { x: 555.07, y: 267.39 },
                  { x: 542.24, y: 266.85 },
                  { x: 529.12, y: 260.02 },
                  { x: 533.86, y: 250.83 },
                  { x: 546.26, y: 254.65 },
                  { x: 556.92, y: 257.68 },
                  { x: 555.13, y: 261.13 },
                  { x: 544.44, y: 258.89 },
                  { x: 532.41, y: 254.69 }
                ],
                face_type: { probability: 0.97, type: "human" },
                angle: { roll: 13.84, pitch: 2.78, yaw: -10.13 },
                face_token: "e54687ccad6772da7182d46d9b19593f",
                location: {
                  top: 143.37,
                  left: 496.02,
                  rotation: 17,
                  width: 132,
                  height: 135
                },
                landmark: [
                  { x: 533.05, y: 180.86 },
                  { x: 588.13, y: 197.99 },
                  { x: 558.32, y: 223.4 },
                  { x: 544.5, y: 256.52 }
                ],
                age: 28,
                mask: { probability: 1, type: 0 }
              },
              {
                expression: { probability: 1, type: "smile" },
                face_shape: { probability: 0.45, type: "round" },
                beauty: 42.84,
                gender: { probability: 1, type: "male" },
                race: { probability: 1, type: "yellow" },
                landmark150: {
                  eye_right_eyeball_right: { x: 775.28, y: 306.85 },
                  mouth_corner_right_inner: { x: 775.67, y: 364.85 },
                  cheek_right_1: { x: 750.69, y: 310.25 },
                  cheek_right_2: { x: 749.02, y: 320.17 },
                  cheek_right_3: { x: 747.64, y: 329.94 },
                  cheek_right_8: { x: 752.28, y: 381.61 },
                  cheek_right_9: { x: 758.11, y: 391.58 },
                  cheek_right_4: { x: 746.35, y: 339.95 },
                  cheek_right_5: { x: 746.06, y: 350.02 },
                  cheek_right_6: { x: 746.33, y: 360.57 },
                  cheek_right_7: { x: 748.13, y: 370.49 },
                  mouth_lip_lower_outer_1: { x: 775.02, y: 370.83 },
                  mouth_lip_lower_outer_2: { x: 776.96, y: 376.3 },
                  mouth_lip_lower_outer_3: { x: 779.96, y: 381.17 },
                  mouth_lip_lower_outer_4: { x: 784.12, y: 385.53 },
                  eye_right_corner_left: { x: 789.93, y: 310.78 },
                  mouth_lip_lower_outer_5: { x: 789.73, y: 388.51 },
                  mouth_corner_left_outer: { x: 829.24, y: 372.21 },
                  eyebrow_left_corner_left: { x: 864.22, y: 305.54 },
                  nose_left_contour_7: { x: 814.25, y: 343.01 },
                  cheek_right_11: { x: 774.05, y: 409.43 },
                  nose_left_contour_6: { x: 813.45, y: 346.19 },
                  eye_right_eyeball_center: { x: 780.34, y: 307 },
                  nose_left_contour_5: { x: 818.14, y: 349.25 },
                  nose_left_contour_4: { x: 824.23, y: 345.58 },
                  cheek_left_8: { x: 851.33, y: 400.38 },
                  cheek_left_7: { x: 861.13, y: 390.42 },
                  nose_left_contour_3: { x: 819.35, y: 332.55 },
                  cheek_right_10: { x: 765.35, y: 401.33 },
                  nose_left_contour_2: { x: 817.91, y: 323.37 },
                  cheek_left_9: { x: 839.72, y: 408.31 },
                  nose_left_contour_1: { x: 816.5, y: 314.3 },
                  mouth_lip_lower_outer_6: { x: 796.21, y: 389.52 },
                  cheek_left_4: { x: 875.24, y: 358.9 },
                  cheek_left_3: { x: 877.87, y: 348.05 },
                  mouth_lip_lower_outer_7: { x: 803.06, y: 390.26 },
                  cheek_left_6: { x: 867.41, y: 380.49 },
                  mouth_lip_lower_outer_8: { x: 809.89, y: 388.97 },
                  cheek_left_5: { x: 872.19, y: 369.64 },
                  mouth_lip_lower_outer_9: { x: 815.92, y: 385.81 },
                  cheek_left_2: { x: 879.71, y: 337.13 },
                  cheek_left_1: { x: 881.69, y: 326.25 },
                  mouth_lip_upper_inner_2: { x: 781.25, y: 361.13 },
                  mouth_lip_upper_inner_3: { x: 785.48, y: 360.65 },
                  mouth_lip_upper_inner_4: { x: 790.41, y: 360.36 },
                  mouth_lip_upper_inner_5: { x: 795.29, y: 360.91 },
                  mouth_corner_right_outer: { x: 774.04, y: 365.14 },
                  mouth_lip_upper_inner_6: { x: 800.28, y: 362.43 },
                  mouth_lip_upper_inner_7: { x: 805.82, y: 362.29 },
                  mouth_lip_upper_inner_8: { x: 811.08, y: 363.09 },
                  mouth_lip_upper_inner_9: { x: 816.35, y: 364.69 },
                  eyebrow_left_upper_1: { x: 823.39, y: 292.98 },
                  eyebrow_left_upper_2: { x: 833.83, y: 290.68 },
                  eyebrow_left_upper_5: { x: 864.77, y: 302.53 },
                  eyebrow_left_upper_3: { x: 845.33, y: 290.34 },
                  eye_left_eyeball_right: { x: 834.95, y: 314.22 },
                  eyebrow_left_upper_4: { x: 856.76, y: 294.35 },
                  mouth_lip_upper_inner_1: { x: 777.68, y: 362.56 },
                  mouth_lip_upper_outer_11: { x: 826.8, y: 367.12 },
                  mouth_lip_lower_inner_7: { x: 803.24, y: 380.98 },
                  mouth_lip_upper_outer_10: { x: 822.67, y: 363.33 },
                  mouth_lip_lower_inner_8: { x: 808.79, y: 380.62 },
                  mouth_lip_lower_inner_9: { x: 814.31, y: 379.48 },
                  mouth_lip_lower_inner_3: { x: 783.56, y: 375.51 },
                  mouth_lip_lower_inner_4: { x: 787.82, y: 377.99 },
                  mouth_lip_lower_inner_5: { x: 792.49, y: 379.63 },
                  mouth_lip_lower_inner_6: { x: 797.57, y: 380.49 },
                  eye_left_eyeball_center: { x: 840.03, y: 314.32 },
                  mouth_lip_lower_inner_1: { x: 777.05, y: 368.91 },
                  mouth_lip_lower_inner_2: { x: 779.89, y: 372.54 },
                  eye_right_corner_right: { x: 767.01, y: 307.33 },
                  mouth_lip_lower_outer_11: { x: 825.7, y: 377.71 },
                  mouth_lip_lower_outer_10: { x: 821.2, y: 382.4 },
                  eye_right_eyeball_left: { x: 784.94, y: 308.23 },
                  eyebrow_right_lower_2: { x: 777.18, y: 291.91 },
                  eyebrow_right_lower_1: { x: 768.07, y: 291.95 },
                  eyebrow_right_lower_3: { x: 786.5, y: 293.83 },
                  mouth_lip_upper_outer_9: { x: 817.69, y: 360.48 },
                  eye_left_corner_right: { x: 827.51, y: 315.33 },
                  mouth_lip_upper_outer_5: { x: 795.75, y: 355.44 },
                  mouth_lip_upper_outer_6: { x: 801.03, y: 356.76 },
                  mouth_lip_upper_outer_7: { x: 806.94, y: 356.89 },
                  mouth_lip_upper_outer_8: { x: 812.46, y: 358.14 },
                  eye_left_eyelid_lower_4: { x: 839.65, y: 317.36 },
                  nose_right_contour_6: { x: 791.25, y: 343.36 },
                  eye_left_eyelid_upper_5: { x: 843.42, y: 311.69 },
                  eye_left_eyelid_upper_4: { x: 840.02, y: 311.18 },
                  eye_left_eyelid_lower_3: { x: 836.45, y: 317.34 },
                  nose_right_contour_7: { x: 791.21, y: 339.94 },
                  eye_left_eyelid_lower_2: { x: 833.41, y: 316.5 },
                  nose_right_contour_4: { x: 782.45, y: 340.59 },
                  eye_left_eyelid_upper_7: { x: 849.81, y: 314.96 },
                  eye_left_eyelid_upper_6: { x: 846.44, y: 313.01 },
                  eye_left_eyelid_lower_1: { x: 830.41, y: 316.06 },
                  nose_right_contour_5: { x: 786.95, y: 345.37 },
                  eye_left_eyelid_upper_1: { x: 830.29, y: 313.11 },
                  mouth_lip_upper_outer_1: { x: 776.48, y: 360.55 },
                  eye_left_eyelid_lower_7: { x: 849.25, y: 317.81 },
                  mouth_lip_upper_outer_2: { x: 780.41, y: 357.63 },
                  eyebrow_right_corner_left: { x: 795.9, y: 295.66 },
                  eye_left_eyelid_lower_6: { x: 846.02, y: 317.61 },
                  mouth_lip_upper_outer_3: { x: 785.27, y: 355.99 },
                  eye_left_eyelid_upper_3: { x: 836.73, y: 311.04 },
                  eye_left_eyeball_left: { x: 845.32, y: 315.4 },
                  eye_left_eyelid_upper_2: { x: 833.65, y: 311.84 },
                  eye_left_eyelid_lower_5: { x: 842.86, y: 317.97 },
                  mouth_lip_upper_outer_4: { x: 790.5, y: 355.09 },
                  nose_tip: { x: 802.11, y: 338.03 },
                  chin_3: { x: 804.69, y: 419.55 },
                  chin_1: { x: 782.84, y: 415.46 },
                  chin_2: { x: 793.27, y: 418.56 },
                  eyebrow_right_upper_1: { x: 760.29, y: 290.54 },
                  eye_right_eyelid_lower_7: { x: 787.02, y: 310.76 },
                  eye_right_eyelid_lower_6: { x: 783.99, y: 310.32 },
                  eyebrow_right_upper_5: { x: 796.7, y: 291.48 },
                  eyebrow_right_upper_4: { x: 788.11, y: 287.19 },
                  eyebrow_right_upper_3: { x: 778.26, y: 284.14 },
                  eyebrow_right_upper_2: { x: 767.91, y: 285.14 },
                  mouth_corner_left_inner: { x: 827.58, y: 371.6 },
                  eye_right_eyelid_upper_2: { x: 773.04, y: 304.36 },
                  eye_right_eyelid_upper_1: { x: 769.79, y: 305.41 },
                  eye_right_eyelid_upper_4: { x: 778.96, y: 303.9 },
                  eye_right_eyelid_upper_3: { x: 775.93, y: 303.73 },
                  eye_right_eyelid_lower_1: { x: 769.77, y: 308.24 },
                  eye_left_corner_left: { x: 852.55, y: 317.52 },
                  eyebrow_left_corner_right: { x: 823.03, y: 297.34 },
                  eye_right_eyelid_lower_5: { x: 781.08, y: 310.49 },
                  mouth_lip_upper_inner_11: { x: 825.35, y: 368.66 },
                  eye_right_eyelid_lower_4: { x: 778.12, y: 309.66 },
                  eye_right_eyelid_lower_3: { x: 775.25, y: 309.61 },
                  eye_right_eyelid_lower_2: { x: 772.58, y: 308.68 },
                  mouth_lip_upper_inner_10: { x: 821.22, y: 366.33 },
                  mouth_lip_lower_inner_10: { x: 819.72, y: 377.95 },
                  mouth_lip_lower_inner_11: { x: 824.55, y: 375.42 },
                  eyebrow_left_lower_3: { x: 854.7, y: 301.08 },
                  cheek_left_10: { x: 828.26, y: 413.9 },
                  cheek_left_11: { x: 816.02, y: 417.62 },
                  eyebrow_left_lower_2: { x: 844.37, y: 298.31 },
                  eyebrow_left_lower_1: { x: 833.72, y: 297.9 },
                  nose_bridge_1: { x: 806.95, y: 313.06 },
                  nose_right_contour_2: { x: 794.63, y: 320.49 },
                  nose_right_contour_3: { x: 790.14, y: 329.09 },
                  nose_right_contour_1: { x: 798.93, y: 312.04 },
                  nose_bridge_2: { x: 805.23, y: 321.92 },
                  nose_bridge_3: { x: 803.49, y: 330.99 },
                  eyebrow_right_corner_right: { x: 759.91, y: 293.55 },
                  nose_middle_contour: { x: 801.21, y: 349.52 },
                  eye_right_eyelid_upper_6: { x: 784.93, y: 305.81 },
                  eye_right_eyelid_upper_5: { x: 782.2, y: 304.49 },
                  eye_right_eyelid_upper_7: { x: 787.93, y: 307.93 }
                },
                eye_status: { right_eye: 1, left_eye: 0.9998173118 },
                face_probability: 1,
                quality: {
                  illumination: 187,
                  occlusion: {
                    right_eye: 0,
                    nose: 0,
                    mouth: 0,
                    left_eye: 0,
                    left_cheek: 0,
                    chin_contour: 0,
                    right_cheek: 0.01
                  },
                  blur: 0,
                  completeness: 1
                },
                glasses: { probability: 1, type: "common" },
                emotion: { probability: 1, type: "happy" },
                landmark72: [
                  { x: 750.44, y: 311.9 },
                  { x: 748.28, y: 331.07 },
                  { x: 747.65, y: 350.67 },
                  { x: 749.69, y: 370.32 },
                  { x: 758.93, y: 391.17 },
                  { x: 774.27, y: 408.9 },
                  { x: 793.16, y: 417.57 },
                  { x: 815.17, y: 416.21 },
                  { x: 838.61, y: 406.77 },
                  { x: 859.04, y: 389.48 },
                  { x: 869.72, y: 369.4 },
                  { x: 876.19, y: 348.6 },
                  { x: 881.3, y: 327.64 },
                  { x: 766.92, y: 308.54 },
                  { x: 773.39, y: 305.14 },
                  { x: 779.82, y: 304.41 },
                  { x: 786.2, y: 306.09 },
                  { x: 791.92, y: 311 },
                  { x: 785.68, y: 311.15 },
                  { x: 779.16, y: 310.97 },
                  { x: 772.73, y: 310.02 },
                  { x: 780.93, y: 307.79 },
                  { x: 759.65, y: 295.29 },
                  { x: 767.65, y: 286.16 },
                  { x: 778.23, y: 284.71 },
                  { x: 788.38, y: 286.84 },
                  { x: 796.48, y: 294.63 },
                  { x: 787.1, y: 293.58 },
                  { x: 777.44, y: 292.19 },
                  { x: 768.14, y: 292.68 },
                  { x: 826.04, y: 314.33 },
                  { x: 832.71, y: 310.67 },
                  { x: 839.26, y: 310.16 },
                  { x: 845.83, y: 312.2 },
                  { x: 852.13, y: 316.78 },
                  { x: 845.48, y: 317.15 },
                  { x: 838.63, y: 316.64 },
                  { x: 832.23, y: 315.65 },
                  { x: 838.88, y: 313.46 },
                  { x: 822.83, y: 296.89 },
                  { x: 833.57, y: 290.76 },
                  { x: 845.18, y: 291.08 },
                  { x: 856.4, y: 294.95 },
                  { x: 864.38, y: 306.04 },
                  { x: 854.63, y: 301.03 },
                  { x: 844.22, y: 298.6 },
                  { x: 833.37, y: 297.91 },
                  { x: 799.11, y: 312.09 },
                  { x: 794.99, y: 320.97 },
                  { x: 790.72, y: 329.9 },
                  { x: 783.89, y: 341.43 },
                  { x: 792.7, y: 343.54 },
                  { x: 812.42, y: 345.3 },
                  { x: 822.95, y: 345.47 },
                  { x: 818.49, y: 332.98 },
                  { x: 817.35, y: 323.39 },
                  { x: 816.09, y: 313.85 },
                  { x: 801.91, y: 336.86 },
                  { x: 772.99, y: 363.51 },
                  { x: 784.91, y: 356.88 },
                  { x: 800.32, y: 358.13 },
                  { x: 817.02, y: 360.91 },
                  { x: 829.35, y: 370.04 },
                  { x: 815.61, y: 383.85 },
                  { x: 796.29, y: 387.74 },
                  { x: 779.84, y: 379.59 },
                  { x: 785.28, y: 361.68 },
                  { x: 799.81, y: 363.44 },
                  { x: 815.83, y: 365.26 },
                  { x: 813.88, y: 377.57 },
                  { x: 797.54, y: 378.86 },
                  { x: 783.48, y: 374.08 }
                ],
                face_type: { probability: 1, type: "human" },
                angle: { roll: 3.81, pitch: -1.31, yaw: 10.37 },
                face_token: "b02303f6dc8e0ae4fe2cd51ef7e6d29b",
                location: {
                  top: 282.62,
                  left: 753,
                  rotation: 5,
                  width: 132,
                  height: 130
                },
                landmark: [
                  { x: 780.93, y: 307.79 },
                  { x: 838.88, y: 313.46 },
                  { x: 801.91, y: 336.86 },
                  { x: 799.44, y: 370.11 }
                ],
                age: 25,
                mask: { probability: 1, type: 0 }
              }
            ];
            this.isloading=false;
            this.resultList = result;
            this.resultContent = result[0];
            this.face_token = result[0].face_token;
            result.forEach(item => {
              let location = item.location;
              _this.jcrop(
                this.uploadPic,
                location.left,
                location.top,
                location.width,
                location.height,
                100,
                res => {
                  this.picList.push({
                    face_token: item.face_token,
                    base64: res
                  });
                }
              );
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
    jcrop(imgSrc, left, top, width, height, desWidth, callback) {
      var canvas = document.createElement("canvas");
      canvas.width=width;
      canvas.height=width;
      var context = canvas.getContext("2d");
      var imageObj = new Image();
      imageObj.src = imgSrc;
      imageObj.crossOrigin = "anonymous";
      imageObj.onload = () => {
        context.drawImage(
          imageObj,
          left,
          top,
          width,
          height,
          0,
          0,
          width,
          height
        );
        let reslut = canvas.toDataURL();
        callback(reslut);
      };
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
    }
  }
};
</script>

<style lang="less">
.itemActive {
  border: 3px solid #03a971;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.ivu-upload-drag {
  height: 100%;
  background: rgba(192, 204, 218, 0.1);
  border: 1px solid #ebecf0;
}
.ivu-upload-drag:hover {
  border: 1px solid #ebecf0;
}
</style>
<style scoped lang="less">
img{
  width:100%;
  display:block;
}
.experience {
  display: flex;
  width: 100%;
  position: relative;
  .ivu-spin-fix {
    background: none;
    // color:#03a971;
  }
  .fn_container {
    width: 100%;
    margin: auto;
    .step_content{
      width: 100%;
      height: 400px;
      display: flex;
      .left {
         width: 585px;
         position: relative;
        .left_box {
          height: 100%;
          .left_up {
            width: 100%;
            height: 100%;
            background: #000;
            position: relative;
            display: flex;
            align-items: center;
            .pic {
              width: 100%;
              height: 100%;
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

                video {
                  width: 100%;
                  height: 100%;
                }
              }
              video {
                 width: 100%;
                  height: 100%;
                }
              img {
                width: 100%;
                display: block;
              }
            }
            .intro {
              width:186px;
              display: flex;
              justify-content: center;
              position: absolute;
              bottom: 48px;
              left: 0;
              right:0;
              margin:auto;
              .pic1 {
                cursor: pointer;
                width:56px;
                .img1{
                  width:40px;
                  margin:auto;
                  margin-bottom: 8px;
                }
                .text{
                  font-size: 14px;
                  color: #FFFFFF;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .right {
        flex:1;
        background: #F2F4F7;
        .right_box {
          height: 100%;
          overflow: auto;
          font-size: 18px;
          color: #121C33;
          padding:16px 20px;
          .title_item{
            margin-bottom: 15px;
          }
          .error{
            margin-top:90px;
            .img{
              width:52px;
              margin:auto;
              margin-bottom: 14px;
            }
            .text{
              font-size: 16px;
              color: #7A8499;
              text-align: center;
            }
          }
          .list{
            padding:10px;
            display:flex;
            background:#fff;
            margin-bottom: 10px;
            .left{
              width:90px;
              height: 110px;
              margin-right: 15px;
              overflow: hidden;
              position:relative;
              .cover{
                width: 100%;
                height: 100%;
                position: absolute;
                left:0;
                top:0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #03A971;
                span{
                  border: 1px solid #FFFFFF;
                  border-radius: 3px;
                  color:#fff;
                  padding:1px 3px; 
                  font-size: 14px;  
                  cursor: pointer;
                }
              }
            }
            .right_item{
              width:246px;
              p{
                width:100%;
                margin-top:0;
                line-height: 28px;
                font-size: 14px;
                color: #121C33;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              }
              
            }
          }
        }
      }
    }
    .huoti_content{
      width: 100%;
      height: 400px;
      display: flex;
      .huoti_left{
        width: 585px;
        height: 100%;
        background: rgba(192,204,218,0.1);
        border: #EBECF0 0.5px solid;
        position: relative;
        overflow: hidden;
        .oper_info{
          width: 100%;
          font-family:'PingFangSC-Regular';
          font-size: 14px;
          color: #03A971;
          text-align: center;
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
        }
        .time_cicle{
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          opacity: 0.6;
          background: #03A971;
          border-radius: 50%;
          text-align: center;
          line-height: 32px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
        }
        .yanzhenM_container{
          position: absolute;
          left: 0;
          bottom: 50px;
          margin-bottom:10px;
          width: 100%;
          display: flex;
          justify-content: center;
          .yanzhenM{
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .yanzhenM_item{
              width: 21px;
              height: 27px;
              opacity: 0.8;
              background: black;
              color: #03A971;
              border-radius: 2px;
              text-align: center;
              line-height: 27px;
            }
          }
        }
        .huoti_video{
          width: 100%;
        }
        .kuang{
          width: 300px;
          position: absolute;
          top: 51px;
          left: 50%;
          transform: translateX(-50%);
          .kuangImg{
            width: 100%;
          }
        }
        .oper_btn_container{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 50px;
          background: rgba(18,28,51,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          .btn_content{
            width: 200px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            .dianT,.zhanY,.duS{
              width: 60px;
              height: 30px;
              background: #7A8499;
              border-radius: 3px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FFFFFF;
              text-align: center;
              line-height: 30px;
            }
          }
        }
      }
      .huoti_right{
        width: 411px;
        height: 100%;
        background-color:#F2F4F7;
        position: relative;
        .jiance_title{
          width: 100%;
          margin-top: 40px;
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #121C33;
          text-align: center;
        }
        .jiance_dushu_success_Score,.jiance_dushu_fail_Score{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 26px;
          .success_img,.fail_img{
            width: 40px;
            height: 40px;
            margin-bottom: 8px;
          }
          .success_text{
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #03A971;
            text-align: center;
          }
          .fail_text{
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #E02020;
            text-align: center;
          }
        }
        .tishi_info{
          width: 100%;
          height: 170px;
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          .tishi_title{
            width: 100%;
            height: 25px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #121C33;
            text-align: center;
            line-height: 25px;
          }
          .tishi_content{
            width: 348px;
            flex: 1;
            padding-bottom: 29px;
            padding-top: 25px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tishi_one,.tishi_two,.tishi_three,.tishi_fore{
              width: 72px;
              height: 100px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .img{
                width: 64px;
              }
              .text{
                margin-top: 10px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #7A8499;
                text-align: center;
              }
            }
          }
        }
      }
    }
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
    .bottom {
      width: 100%;
      p {
        font-size: 18px;
        color: #121c33;
        margin: 20px 0;
      }
      .bm {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ebecf0;
        background: rgba(192, 204, 218, 0.1);
        padding: 20px;
        font-size: 18px;
        color: #121c33;
        line-height: 30px;
        text-align: justify;
      }
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
          width: 49%;
         position: relative;
        canvas {
          width: 100%;
        }
         #canvas3 {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 111;
          }
          .shadow {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 113;
            width: 100%;
            animation: manyou 3s linear infinite;
            img {
              width: 100%;
              display: block;
            }
          }
          @keyframes manyou {
            0% {
              top: 0;
            }
            100% {
              top: 334px;
            }
          }
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
      .right {
        width: 49%;
        background: rgba(192, 204, 218, 0.1);
        canvas {
          width: 100%;
        }
         .resultText {
            margin-top: 39px;
            margin-bottom: 38px;
            font-size: 18px;
            color: #121c33;
            text-align: center;
          }
          .imgHeader {
            border-radius: 50%;
            overflow: hidden;
            width: 180px;
            height: 180px;
            margin: auto;
            border: 5px solid #e02020;
            &.success {
              border: 5px solid #03a971;
            }
            img {
              height: 100%;
              width: 100%;
              display: block;
              object-fit: cover;
              object-position: center center;
            }
          }
          .personInfo {
            margin-top: 20px;
            font-size: 18px;
            color: #121c33;
            text-align: center;
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
        .right_box {
          height: 100%;
          overflow: auto;
          font-size: 14px;
          color: #121c33;
          letter-spacing: 0;
          line-height: 24px;
          //
          background: rgba(192, 204, 218, 0.1);
          border: 1px solid #ebecf0;
          &.right_pad {
            padding: 10px;
          }
          .right_up {
            width: 100%;
            height: 100%;
            background: rgba(192, 204, 218, 0.1);
            position: relative;
            .pic {
              width: 100%;
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
      
    }
     #snap {
        width: 120px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #03a971;
        border-radius: 3px;
        font-size: 16px;
        color: #ffffff;
        margin: auto;
        cursor: pointer;
      }
  }
}

</style>
