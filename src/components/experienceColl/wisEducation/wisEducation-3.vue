<template>
  <div class="wisEducation_container">
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>

    <!--通用文字识别-->
    <div class="wisEducation" v-if="routeId == '2.6.1'">
      <!--v-if="routeId=='2.6.1'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="tong_container">
        <div class="content">
          <div class="left">
            <div class="title" style="margin-top:auto;">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload61"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic61" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title" style="margin-top:auto;">识别结果：</div>
            <div class="right_box" v-html="msg61"></div>
          </div>
        </div>
      </div>
    </div>

    <!--手写文字识别-->
    <div class="wisEducation" v-if="routeId == '2.4.1'">
      <!--v-if="routeId=='2.4.1'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="tong_container">
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
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic13" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box" v-html="msg13"></div>
          </div>
        </div>
      </div>
    </div>

    <!--公式识别-->
    <div class="wisEducation" v-if="routeId == '2.4.2'">
      <!--v-if="routeId=='2.4.2'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="tong_container">
        <div class="content">
          <div class="left">
            <div class="title" style="margin-top:auto;">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload14"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic14" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title" style="margin-top:auto;">识别结果：</div>
            <div class="right_box" v-html="msg14"></div>
          </div>
        </div>
      </div>
    </div>

    <!--数字识别-->
    <div class="wisEducation" v-if="routeId == '2.5.2'">
      <!-- v-if="routeId=='2.5.2'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="tong_container">
        <div class="content">
          <div class="left">
            <div class="title">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                :show-upload-list="false"
                type="drag"
                :before-upload="handleBeforeUpload52"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic52" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box" v-html="msg52"></div>
          </div>
        </div>
      </div>
    </div>

    <!--人脸识别-->
    <div class="wisEducation" v-if="routeId == '6.1.1'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
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
                    <img :src="uploadPic" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
                  :class="{ active: face_token == item.face_token }"
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
                  <p v-if="resultContent.emotion.type == 'happy'">
                    情绪---高兴
                  </p>
                  <p v-if="resultContent.emotion.type == 'angry'">
                    情绪---愤怒
                  </p>
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
                  <p v-if="resultContent.emotion.type == 'pouty'">
                    情绪---撅嘴
                  </p>
                  <p v-if="resultContent.emotion.type == 'grimace'">
                    情绪---鬼脸
                  </p>

                  <!-- <p v-if="resultContent.face_shape.type == 'square'">
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
                  </p> -->

                  <p v-if="resultContent.expression.type == 'none'">
                    表情---不笑
                  </p>
                  <p v-if="resultContent.expression.type == 'smile'">
                    表情---微笑
                  </p>
                  <p v-if="resultContent.expression.type == 'laugh'">
                    表情---大笑
                  </p>

                  <!-- <p>年龄---{{ resultContent.age }}</p>
                  <p>人种---{{ resultContent.race.type }}</p> -->
                </div>
                <div style="margin-left:120px">
                  <!-- <p>颜值---{{ resultContent.beauty }}</p> -->

                  <p v-if="resultContent.gender.type == 'male'">性别---男</p>
                  <p v-if="resultContent.gender.type == 'female'">性别---女</p>

                  <!-- <p v-if="resultContent.glasses.type == 'none'">眼镜---无</p>
                  <p v-if="resultContent.glasses.type == 'common'">
                    眼镜---普通眼镜
                  </p>
                  <p v-if="resultContent.glasses.type == 'sun'">眼镜---墨镜</p>

                  <p v-if="resultContent.mask.type == '0'">是否戴口罩---无</p>
                  <p v-if="resultContent.mask.type == '1'">是否戴口罩---是</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--情绪识别-->
    <div class="wisEducation" v-if="routeId == '6.1.30'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
        <div class="content">
          <div class="left">
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload30"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic30" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
                  :class="{ active: face_token == item.face_token }"
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
                  <p v-if="resultContent.emotion.type == 'happy'">
                    情绪---高兴
                  </p>
                  <p v-if="resultContent.emotion.type == 'angry'">
                    情绪---愤怒
                  </p>
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
                  <p v-if="resultContent.emotion.type == 'pouty'">
                    情绪---撅嘴
                  </p>
                  <p v-if="resultContent.emotion.type == 'grimace'">
                    情绪---鬼脸
                  </p>

                  <!-- <p v-if="resultContent.face_shape.type == 'square'">
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
                  </p> -->

                  <p v-if="resultContent.expression.type == 'none'">
                    表情---不笑
                  </p>
                  <p v-if="resultContent.expression.type == 'smile'">
                    表情---微笑
                  </p>
                  <p v-if="resultContent.expression.type == 'laugh'">
                    表情---大笑
                  </p>

                  <!-- <p>年龄---{{ resultContent.age }}</p>
                  <p>人种---{{ resultContent.race.type }}</p> -->
                </div>
                <div style="margin-left:120px">
                  <!-- <p>颜值---{{ resultContent.beauty }}</p> -->

                  <!-- <p v-if="resultContent.gender.type == 'male'">性别---男</p>
                  <p v-if="resultContent.gender.type == 'female'">性别---女</p> -->

                  <!-- <p v-if="resultContent.glasses.type == 'none'">眼镜---无</p>
                  <p v-if="resultContent.glasses.type == 'common'">
                    眼镜---普通眼镜
                  </p>
                  <p v-if="resultContent.glasses.type == 'sun'">眼镜---墨镜</p>

                  <p v-if="resultContent.mask.type == '0'">是否戴口罩---无</p>
                  <p v-if="resultContent.mask.type == '1'">是否戴口罩---是</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--人脸支付-->
    <div class="wisEducation" v-if="routeId == '6.1.20'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
        <div class="content">
          <div class="left">
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload620"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic620" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="right_box" v-if="picList.length>0">
              <div class="header_box">
                <img
                  :src="picList[0].base64"
                />
              </div>
              <div v-if="resultContent" class="succ_sex">
                <p v-if="resultContent.gender.type == 'male'">学生---蔡小弟</p>
                <p v-if="resultContent.gender.type == 'female'">学生---蔡小妹</p>
              </div>
              <div class="succ_box">
                <img
                  src="../../../assets/images/new_index/succ.png"
                  alt=""
                  style="width:100%;display:block"
                />
              </div>
              <div class="succ_res">
                支付成功
              </div>
              <div class="succ_money">
                ¥15.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--菜品识别-->
    <div class="wisEducation" v-if="routeId == '3.1.8'">
      <!--v-if="routeId == '3.1.8'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="caip_container">
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
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic7" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
              <div class="right_content">
                <div style="display:flex">
                  <span style="flex:1">名称</span>
                  <span style="flex:1">置信度</span>
                  <span style="flex:1">热量</span>
                </div>
                <div
                  v-for="(item, index) in result7"
                  :key="index"
                  style="display:flex"
                >
                  <span style="flex:1">{{ item.name }}</span>
                  <span style="flex:1">{{ item.probability }}</span>
                  <span style="flex:1">{{ item.calorie }}大卡/100g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--增值税发票识别-->
    <div class="wisEducation" v-if="routeId == '2.2.3'">
      <!--v-if="routeId=='2.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
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
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic4" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box" v-html="msg4"></div>
          </div>
        </div>
      </div>
    </div>

    <!--通用翻译-->
    <div class="wisEducation" v-if="routeId == '5.4.1'">
      <!--v-if="routeId == '5.4.1'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="function_experice_container">
        <div class="function_experice">
          <div class="choice_container">
            <div class="choice1">
              <Select v-model="source" placeholder="中文">
                <Option
                  v-for="item in langList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}
                </Option
                >
              </Select>
            </div>
            <div class="img_container">
              <img :src="arrowImg"/>
            </div>
            <div class="choice2">
              <Select v-model="target" placeholder="英文">
                <Option
                  v-for="item in langList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}
                </Option
                >
              </Select>
            </div>
          </div>
          <div class="shuru_title">请输入一段想分析的文本：</div>
          <div class="component">
            <textarea
              name=""
              id=""
              v-model="tongyongText"
              maxlength="1000"
            ></textarea>
            <div class="experice_text">体验版本最多输入1000个字</div>
          </div>
          <div class="kaishi_fenxi" @click="fanyiAnaly">开始分析</div>
          <div class="shuru_title">分析结果：</div>
          <div class="analy_result">
            <div class="result">{{ tongyongResult }}</div>
          </div>
        </div>
      </div>
    </div>

    <!--视频处理-->
    <div class="wisEducation" v-if="routeId == '4.4'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="experience_container">
        <div class="shangchuan_text">请上传一段想分析的视频：</div>
        <div class="video_container">
          <div class="RecDetail_left">
            <div class="RecDetail_left_bottom">
              <div class="Img_container" @click="bofangShipin">
                <img :src="chuliImg"/>
                <img :src="bofangImg" class="bofang" ref="bofang"/>
                <video ref="video" :src="chuliVideoUrl" controls></video>
              </div>
              <Row v-show="ifShowChuLoading">
                <Col class="demo-spin-col" span="8">
                  <Spin fix>
                    <Icon
                      type="ios-loading"
                      size="90"
                      class="demo-spin-icon-load"
                    ></Icon>
                    <div>正在处理中，请稍后...</div>
                  </Spin>
                </Col>
              </Row>
              <div class="info_btn">
                <div class="text">体验版本视频片大小不超过20M</div>
                <div class="ivbutton">
                  <Upload
                    action=""
                    :max-size="1024"
                    :before-upload="chuliUpload"
                  >
                    <Button>上传视频</Button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="analy_result_text">分析结果：</div>
        <div class="result_container chuliResult">
          <div class="title_container" ref="chuliTitle">
            <div @click="chgTitleStyle(0)">视频GIF</div>
            <div @click="chgTitleStyle(2)">视频首图</div>
          </div>
          <div class="chuliResult_container">
            <div
              class="img_container"
              v-for="(item, index) in chuliResult"
              :key="index"
            >
              <img :src="item.src" alt="" srcset=""/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 人体检测与属性 -->
    <div class="wisEducation" v-if="routeId == '6.2.3'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
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
                    <img :src="uploadPic23" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
                  :class="{ active: currentIndex == index }"
                  style="cursor:pointer;width:120px;margin-bottom:10px;margin-right:20px"
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
                  <!-- <p>性别：{{ resultContent2.attributes.gender.name }}</p> -->
                  <!-- <p>年龄阶段：{{ resultContent2.attributes.age.name }}</p> -->
                  <!-- <p>
                    服饰：正常
                  </p> -->
                  <!-- <p>
                    上身服饰：{{ resultContent2.attributes.upper_wear.name }}
                  </p>
                  <p>
                    下身服饰：{{ resultContent2.attributes.lower_wear.name }}
                  </p>
                  <p>
                    上身服饰颜色：{{
                      resultContent2.attributes.upper_color.name
                    }}
                  </p>
                  <p>
                    下身服饰颜色：{{
                      resultContent2.attributes.lower_color.name
                    }}
                  </p> -->
                  <!-- <p>
                    是否戴帽子：{{ resultContent2.attributes.headwear.name }}
                  </p> -->
                </div>
                <div style="margin-left:120px">
                  <!-- <p>
                    是否戴帽子：{{ resultContent2.attributes.headwear.name }}
                  </p> -->
                  <!-- <p>
                    是否戴口罩：{{ resultContent2.attributes.face_mask.name }}
                  </p> -->
                  <!-- <p>是否吸烟：{{ resultContent2.attributes.smoke.name }}</p> -->
                  <p>
                    是否使用手机：{{ resultContent2.attributes.cellphone.name }}
                  </p>
                  <!-- <p>是否背包：{{ resultContent2.attributes.bag.name }}</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 人脸搜索 -->
    <div class="wisEducation" v-if="routeId == 'search'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
        <div class="content" style="height:368px;margin-bottom:40px">
          <div class="left" style="background:#000;">
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
              <img :src="videoResult" alt="" srcset=""/>
            </div>
            <div class="personInfo">{{ personInfo }}</div>
          </div>
        </div>
        <div id="snap">识别</div>
      </div>
    </div>
    <!-- 口罩 -->
    <div class="wisEducation" v-if="routeId == '6.4.6'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
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
                    <img :src="uploadPic6" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
                  :class="{ itemActive: currentIndex == index }"
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
                <span v-if="resultContent1.confidence == 1">
                  是否戴口罩:是</span
                >
                <span v-else> 是否戴口罩:否</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 车牌 -->
    <div class="wisEducation" v-if="routeId == '2.3.3'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
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
                :before-upload="handleBeforeUpload3"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic3" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box" v-html="msg3"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 语音 -->
    <div class="wisEducation" v-if="routeId == '1.1.2'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="duanyuyin_experience_container">
        <div class="top">
          <div class="icon" style="">
            <div class="luzhi" style="width:15px;">
              <img
                src="../../../assets/images/aiSmartAppDetail/luzhi.png"
                alt=""
              />
            </div>
            <div
              v-if="isWork"
              class="timeline"
              style="width:293px; margin:0 10px"
            >
              <img
                src="../../../assets/images/aiSmartAppDetail/timeLine.gif"
                alt=""
              />
            </div>
            <span class="time" v-if="isWork" style="color:#fff;"
            >00:{{ upTime }} / 00:10</span
            >
          </div>
          <div class="times">
            <i-button type="success" @click="startRecord1">{{
              buttonMsg
              }}
            </i-button>
          </div>
        </div>
        <div class="bottom">
          {{ transMsg }}
        </div>
      </div>
    </div>

    <!-- 智慧路灯车牌 -->
    <div class="wisEducation" v-if="routeId == '2.3.3_1'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
        <div class="content">
          <div class="left">
            <div class="title">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="ludengChePaiUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
                :format="['jpg', 'jpeg', 'png', 'bmp']"
                accept="image/png,image/jpeg,image/jpg,image/bmp"
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="ludengChepai" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box" v-html="msg3"></div>
          </div>
        </div>
      </div>
    </div>

    <!--智慧路灯车流统计-->
    <div class="wisEducation" v-if="routeId == '3.5.3'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="caip_container">
        <div class="content cheliuContent">
          <div class="left">
            <div class="left_box cheliu" style="width:80%;margin:auto;">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="cheliuUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="chiliuPic" alt/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="cheliu_result_container" v-if="vehicle_numObj && vehicle_countObj">
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
      </div>
    </div>

    <!-- 智慧路灯车型识别 -->
    <div class="wisEducation" v-if="routeId == '3.5.1'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
        <div class="content">
          <div class="left">
            <div class="title">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="chexingHandleBeforeUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="chexingUploadPic" alt/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box">
              <div
                v-for="(item, index) in cheliuResult"
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

    </div>

    <!-- 智慧路灯车人流监测 -->
    <div class="wisEducation" v-if="routeId == '6.2.2'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
        <div class="renliuContainer">
          <div class="left  left_box1">
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="renliuHandleUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic22" alt="">
                  </div>
                  <div class="intro">
                    <div class="text">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M</div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right right1" :class="{ whFlag: !whFlag }">
            <img :src="uploadPic22" alt="">
            <div class="intro">
              <div class="text">人数：<span style="font-size:24px">{{result22}}</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 智慧路灯驾驶行为分析-->
    <div class="wisEducation" v-if="routeId == '6.4.1'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
        <div class="content">
          <div class="left">
            <div class="title">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="jiashixingweiUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="jiashiUploadPic" alt="">
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
            <div class="right_box">
              <div v-if="jiashiResult">
                <div style="display:flex">
                  <span style="width:100px">抽烟	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.smoke.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.smoke.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">使用手机	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.cellphone.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.cellphone.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">未系安全带	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.not_buckling_up.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.not_buckling_up.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">双手离开方向盘	</span>
                  <span style="flex:1"><Progress
                    :percent="Number((jiashiResult.both_hands_leaving_wheel.score*100).toFixed(2))"
                    status="active"> <span>{{Number((jiashiResult.both_hands_leaving_wheel.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">视角未看前方	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.not_facing_front.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.not_facing_front.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">未正确佩戴口罩	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.no_face_mask.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.no_face_mask.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">打哈欠	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.yawning.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.yawning.score)).toFixed(2)}}</span></Progress></span>
                </div>
                <div style="display:flex">
                  <span style="width:100px">闭眼	</span>
                  <span style="flex:1"><Progress :percent="Number((jiashiResult.eyes_closed.score*100).toFixed(2))"
                                                 status="active"> <span>{{Number((jiashiResult.eyes_closed.score)).toFixed(2)}}</span></Progress></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 智慧路灯行为监测 -->
    <div class="wisEducation" v-if="routeId == '3.2.2'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fP_container">
        <div class="content">
          <div class="left">
            <div class="title">上传图片：</div>
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload20"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadPic20" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="title">识别结果：</div>
            <div class="right_box">
              <div style="font-size: 14px;color: #3D4966;margin-bottom:20px">
                <div
                  style="display:flex;margin-bottom:10px"
                  v-for="(item, index) in result20"
                  :key="index"
                >
                  <div>{{ item.name }}</div>
                  ：
                  <div>{{ item.msg }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 危险识别 -->
    <div class="wisEducation" v-if="routeId == '3.2'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
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
                  <div class="pic" :class="{ whFlag1: !whFlag1 }">
                    <img :src="uploadPic21" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
              <div style="font-size: 14px;color: #3D4966;margin-bottom:20px;padding:10px">
                <div
                  style="display:flex;margin-bottom:10px"
                  v-for="(item, index) in result21"
                  :key="index"
                >
                  <div>{{ item.name }}</div>
                  ：
                  <div>{{ item.msg }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--语音识别-->
    <div class="wisEducation" v-if="routeId == '1.1.3'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="duanyuyin_experience_container" style="display: flex;flex-direction: row;">
        <div class="top" style="height: 273px;width:45%">
          <div class="icon" style="padding-top: 70px;flex-direction:column">
            <div class="luzhi" style="width:15px;margin-bottom:10px">
              <img
                src="../../../assets/images/aiSmartAppDetail/luzhi.png"/>
            </div>
            <div
              v-if="isWork1"
              class="timeline"
              style="width:293px; margin:0 10px"
            >
              <img
                src="../../../assets/images/aiSmartAppDetail/timeLine.gif"
                alt=""
              />
            </div>
          </div>
          <div class="times">
            <i-button type="success" @click="startRecord2">{{
              buttonMsg1
              }}
            </i-button>
            <p style="margin-top:20px;font-size:14px;text-align:center;color:#fff;">提示信息：请对我说: “关闭窗帘”，“打开音乐”，“打开空调”</p>
          </div>
        </div>
        <div class="bottom" style="height: 273px;padding: 0;width:55%">
          <img :src="ImageUrl" alt="" style="width:100%;display:block">
        </div>
      </div>
    </div>
    <!--皮肤分析-->
    <div class="wisEducation" v-if="routeId == '6.1.8'">
      <!--v-if="routeId=='6.2.3'"-->
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <renwushibie :routeId="routeId"/>
    </div>
    <!-- 病例分析 -->
    <div class="wisEducation" v-if="routeId == 'bingli'">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
        <div class="content">
          <div class="left">
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="bingliUpload"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="bingliImg" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
                    </div>
                    <i-button type="success">上传图片</i-button>
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="right">
            <div class="right_box">
              <div class="title">病历识别：</div>
              <div style="font-size: 14px;color: #3D4966;margin-bottom:20px;padding:10px">
                <div
                  style="display:flex;margin-bottom:10px"
                  v-for="(item, index) in bingliData"
                  :key="index"
                >
                  <div style="width: 100px">{{ item.name }}</div>
                  <template>
                    <div v-if="typeof item.msg === 'string'" >{{ item.msg }}</div>
                    <div v-else style="display:flex;flex: 1 1" >
                      <span style="display:flex; width: 33%;justify-content: center" v-for="el in item.msg" :key="el">{{el}}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 骨骼分析/舌苔分析 -->
    <div class="wisEducation" v-if="showsModal.includes(routeId)">
      <div class="title">{{ title }}</div>
      <img :src="closeIcon" class="closeIcon" @click="closeModel"/>
      <div class="fn_container">
        <div class="content">
          <div class="left">
            <div class="left_box">
              <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :before-upload="uploadImgFun"
                :max-size="5120"
                style="width:100%;height:100%"
                action=""
              >
                <div class="left_up">
                  <div class="pic" :class="{ whFlag: !whFlag }">
                    <img :src="uploadImg" alt=""/>
                  </div>
                  <div class="intro">
                    <div class="text">
                      图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过1M
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
              <div style="font-size: 14px;color: #3D4966;margin-bottom:20px;padding:10px">
                <div
                  style="display:flex;margin-bottom:10px"
                  v-for="(item, index) in diagnosisData"
                  :key="index"
                >
                  <template v-if="item.name">
                    <div>{{ item.name }}</div>
                    ：
                  </template>
                  <div>{{ item.msg }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {imgPreviewBase64, getImgSize} from "@/assets/js/imgPreviewBase64";
    import renwushibie from "@/components/experienceColl/renlian/experice2";
    const _uploadImg = {
      shetai: require("@/assets/images/medical/shetai.png"),
      guge: require("@/assets/images/ai/guge.jpg"),
      gugeAfter: require("@/assets/images/medical/guge2.png"),
      wenzi: require("@/assets/images/medical/wenzi1.png"),
      wenziAfter: require("@/assets/images/medical/wenzi2.png"),
    }
    export default {
        props: ["routeId", "title"],
        components: { renwushibie },
        data() {
          return {
                transMsg1:"",
                transMsg:'',
                ImageUrl: require("../../../assets/images/VideoUrl/chuanglian.jpg"),
                whFlag1: true,
              /*  result20: [],
                uploadPic20: require("@/assets/images/shibie/32.png"),*/
                msg3: "",
                upTime: 10,
                upTime1: 10,
                buttonMsg: "开始录音",
                buttonMsg1: "语音控制",
                isWork: false,
                isWork1: false,
               /* msg3: "",
                upTime: 10,
                buttonMsg: "开始录音",
                isWork: false,*/
                faceScore: 0,
                manyou: false,
                videoFlag: true,
                personInfo: "",
                videoResult: "",
                videoImgUrl: "",
                picList1: [],
                currentIndex: 0,
                resultContent1: null,
                uploadPic3: window.config.iconUrl + "/static/images/cheliang/5.png",
                ludengChepai: require("@/assets/images/carSence/3.png"),
                chiliuPic: window.config.iconUrl + "/static/images/cheliang/5.png",
                closeIcon: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
                uploadPic: require("@/assets/images/renlian/renliana.png"),
                uploadPic30: require("@/assets/images/renlian/renlian.jpg"),
                chexingUploadPic: window.config.iconUrl + "/static/images/cheliang/1.png",
                uploadPic620: require("@/assets/images/new_index/faceZhifu.png"),
                whFlag: true,
                picList: [],
                msg61: "",
                uploadPic6: require("@/assets/images/renlian/xingwei/p127462.png"),
                uploadPic61: require("@/assets/images/commonText/tongY.png"),
                uploadPic13: require("@/assets/images/education/1.png"),
                //uploadPic13:'https://sophia-portal-files.yzsmart.top/static/images/shibie/6.png',
                //uploadPic13:'https://sophia-portal-files.yzsmart.top/static/img/1.fefa29e.png',
                msg13: "",
                uploadPic14: require("@/assets/images/education/2.png"),
                msg14: "",
                uploadPic52: require("@/assets/images/other/2.png"),
                msg52: `<table><tr><td>序号</td><td>内容</td></tr><tr><td>1</td><td><p>543543777555638</p><p>宽度：242 高度：23</p><p>左间距：409 上间距：255</p></td></tr><tr><td>2</td><td><p>17600987577</p><p>宽度：201 高度：35</p><p>左间距：714 上间距：348</p></td></tr><tr><td>3</td><td><p>15798448856</p><p>宽度：192 高度：28</p><p>左间距：721 上间距：536</p></td></tr></table>`,
                uploadPic7: window.config.iconUrl + "/static/images/shibie/6.png",
                result7: [],
                uploadPic4: require("@/assets/images/carSence/fapiao.png"),
                msg4: "",
                source: "zh",
                langList: [
                    {
                        label: "中文",
                        value: "zh"
                    },
                    {
                        label: "英文",
                        value: "en"
                    }
                ],
                arrowImg: require("../../../assets/images/icon/arrowImg.png"),
                target: "en",
                tongyongText:
                    '中新社华盛顿7月9日电墨西哥总统洛佩斯8日到访白宫，与美国总统特朗普会晤。美墨两国领导人此次会晤的重点，是共同庆祝于近日正式生效的美墨加协定。',
                tongyongResult: "What Technology News Is There Recently?",
                isInter: false,
                chuliImg: require("../../../assets/images/shipin/shipinChu.png"),
                bofangImg: require("../../../assets/images/aiSmartAppDetail/bofang.png"),
                ifShowChuLoading: false,
                chuliResult: [
                    {
                        src: ""
                    },
                    {
                        src: ""
                    },
                    {
                        src: ""
                    }
                ],
                covertTimer: null,
                chuliResultType: "gif",
                uploadPic23: require("@/assets/images/renlian/renti/huoxing.png"),
                resultContent2: null,
                picList2: [],
                resultContent: null,
                isloading: false,
                cheliuResult: null,
                uploadPic22: require("@/assets/images/renlian/renti/3.png"),
                jiashiUploadPic: require("@/assets/images/renlian/xingwei/1.png"),
                jiashiResult: null,
                uploadPic20: require("@/assets/images/renlian/xingwei/daJia.jpg"),
               // uploadPic21: require("@/assets/images/shibie/32.png"),
                uploadPic21: require("@/assets/images/shibie/32.jpg"),
                result20: null,
                result21: null,
                result22: 45,
                timer:null,
                msgList:[],
                dialogList:[],
                resetStart:false,
                timeScroll:null,
                talk:false,
                bingliImg: require("@/assets/images/ai/bingli.png"),
                bingliData: [],
                uploadImg: _uploadImg[this.routeId],
                showsModal: ['guge', 'shetai', 'wenzi'], // 打开弹窗的类型
                diagnosisData: [] // 诊断结果
            };
        },
        mounted() {
            this.select();
            this.initResultTypeStyle();
            if (this.routeId == "search") {
                this.liveVideo();
            }
        },
        created() {
        },
        watch: {
            routeId(newVal, oldVal) {
                this.select();
            }
        },
        methods: {
            ludengChePaiUpload(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.ludengChepai = base64;
                    getImgSize(_this.ludengChepai).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData(); //创建form对象
                formData.append("files", file); //
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: window.config.url + "/ai/text/licensePlate",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                //this.uploadPic2="data:image/png;base64,"+res.data.data.base64;
                                let result = res.data.data.words_result;
                                let html = ``;
                                let imgSrc = require('../../../assets/images/smartLight/map.png');
                                let styleObj = 'width:306px;height:296px;';
                                html += `<p>车牌号：${result.number}</p>`;
                                html += `<p>车牌颜色：${result.color}</p>`;
                                html += `<img src='${imgSrc}' style=${styleObj}></img>`;
                                this.msg3 = html;
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
            cheliuUpload(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.chiliuPic = base64;
                    getImgSize(_this.chiliuPic).then(res => {
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
                    url: window.config.url + "/ai/image/trafficFlowSti?img_type=FILES",
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
            cheliuInit(base) {
                this.isloading = false;
                this.chiliuPic = require('../../../../static/images/cheliang/cheliu1.jpg');
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
            },
            chexingHandleBeforeUpload(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.chexingUploadPic = base64;
                    getImgSize(_this.chexingUploadPic).then(res => {
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
                    url: window.config.url + "/ai/image/carIdentify?img_type=FILES",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            this.cheliuResult = res.data.data.result;
                        } else {
                            this.$Message.error("请求失败");
                        }
                    })
                    .catch(err => {
                        this.isloading = false;
                        console.log(err);
                    });
            },
            chexingUpload(base) {
                this.cheliuResult = [
                    {score: 0.9486455321311951, year: "2018", name: "丰田坦途"},
                    {score: 0.03138638287782669, year: "2017", name: "丰田Tacoma"},
                    {score: 0.008211802691221237, year: "2016", name: "本田Ridgeline"},
                    {score: 0.005508309230208397, year: "无年份信息", name: "日产Titan"},
                    {score: 0.002496341476216912, year: "2018", name: "GMCSierra"}
                ];
            },
            renliuHandleUpload(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic22 = base64;
                    getImgSize(_this.uploadPic22).then(res => {
                        _this.whFlag = res.flag;
                    });
                })

                let formData = new FormData(); //创建form对象
                formData.append('files', file);//
                this.isloading = true;
                this.$axios({
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'multipart/form-data'
                    },
                    method: "post",
                    url: window.config.url + "/ai/body/num?img_type=FILES",
                    data: formData,
                }).then(res => {
                    this.isloading = false;
                    if (res.data.code == 200000) {
                        if (!res.data.data) {
                            this.$Message.error('返回数据为空');
                            return;
                        }
                        this.result22 = res.data.data.person_num;
                    } else {
                        this.$Message.error('请求失败');
                    }
                }).catch(err => {
                    this.isloading = false;
                    console.log(err);
                });
            },
            jiashixingweiUpload(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.jiashiUploadPic = base64;
                    _this.result = null;
                    getImgSize(_this.jiashiUploadPic).then(res => {
                        _this.whFlag = res.flag;
                    });
                })
                let formData = new FormData(); //创建form对象
                formData.append('files', file);//
                this.$axios({
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'multipart/form-data'
                    },
                    method: "post",
                    url: window.config.url + "/ai/body/driverbehavior?img_type=FILES",
                    data: formData,
                }).then(res => {
                    this.isloading = false;
                    if (res.data.code == 200000) {
                        if (!res.data.data) {
                            this.$Message.error('返回数据为空');
                            return;
                        }
                        this.jiashiResult = res.data.data.person_info[0].attributes;
                    } else {
                        this.$Message.error('请求失败');
                    }
                }).catch(err => {
                    this.isloading = false;
                    console.log(err);
                });
            },
            initjiashiUpload(base) {
                this.isloading = false;
                this.jiashiResult = {
                    "both_hands_leaving_wheel": {"score": 0.96977990865707, "threshold": 0.75},
                    "eyes_closed": {"score": 0.070456352084875, "threshold": 0.55},
                    "no_face_mask": {"score": 0.95753675699234, "threshold": 0.75},
                    "not_buckling_up": {"score": 0.76434111595154, "threshold": 0.44},
                    "smoke": {"score": 0.013546190224588, "threshold": 0.48},
                    "cellphone": {"score": 0.10960840433836, "threshold": 0.69},
                    "not_facing_front": {"score": 0.89651507139206, "threshold": 0.5},
                    "yawning": {"score": 0.018306172336452, "threshold": 0.5},
                    "head_lowered": {"score": 0.35811890289187, "threshold": 0.55}
                };
            },
            handleBeforeUpload20(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic20 = base64;
                    getImgSize(_this.uploadPic20).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                this.result20 = [];
                let formData = new FormData(); //创建form对象
                formData.append("files", file); //
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    method: "post",
                    url: window.config.url + "/ai/image/censor?img_type=FILES&type=0",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            let resultArr = [];
                            let _result = res.data.data.data;
                            if (_result.filter(item => item.type == 1).length > 0) {
                                _result.forEach(item => {
                                    if (item.type == 1) {
                                        resultArr.push({
                                            name: "色情识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "色情识别",
                                    msg: "通过"
                                });
                            }
                            if (_result.filter(item => item.type == 2).length > 0) {
                                _result.forEach(item => {
                                    if (item.type == 2) {
                                        resultArr.push({
                                            name: "暴恐识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "暴恐识别",
                                    msg: "不通过"
                                });
                            }
                            if (_result.filter(item => item.type == 3).length > 0) {
                                _result.forEach(item => {
                                    if (item.type == 3) {
                                        resultArr.push({
                                            name: "恶心识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "恶心识别",
                                    msg: "通过"
                                });
                            }

                            if (
                                _result.filter(item => item.type == 4 && item.subType == 0)
                                    .length > 0
                            ) {
                                _result.forEach(item => {
                                    if (item.type == 4 && item.subType == 0) {
                                        resultArr.push({
                                            name: "水印码识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "水印码识别",
                                    msg: "通过"
                                });
                            }

                            if (
                                _result.filter(item => item.type == 4 && item.subType == 1)
                                    .length > 0
                            ) {
                                _result.forEach(item => {
                                    if (item.type == 4 && item.subType == 1) {
                                        resultArr.push({
                                            name: "二维码识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "二维码识别",
                                    msg: "通过"
                                });
                            }

                            if (
                                _result.filter(item => item.type == 4 && item.subType == 2)
                                    .length > 0
                            ) {
                                _result.forEach(item => {
                                    if (item.type == 4 && item.subType == 2) {
                                        resultArr.push({
                                            name: "条形码识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "条形码识别",
                                    msg: "通过"
                                });
                            }

                            if (
                                _result.filter(item => item.type == 5 && item.subType == 0)
                                    .length > 0
                            ) {
                                _result.forEach(item => {
                                    if (item.type == 5 && item.subType == 0) {
                                        resultArr.push({
                                            name: "政治人物识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "政治人物识别",
                                    msg: "不通过"
                                });
                            }

                            if (
                                _result.filter(item => item.type == 5 && item.subType == 1)
                                    .length > 0
                            ) {
                                _result.forEach(item => {
                                    if (item.type == 5 && item.subType == 1) {
                                        resultArr.push({
                                            name: "公众人物识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "公众人物识别",
                                    msg: "通过"
                                });
                            }

                            if (
                                _result.filter(item => item.type == 5 && item.subType == 2)
                                    .length > 0
                            ) {
                                _result.forEach(item => {
                                    if (item.type == 5 && item.subType == 2) {
                                        resultArr.push({
                                            name: "敏感词识别",
                                            msg: item.msg
                                        });
                                    }
                                });
                            } else {
                                resultArr.push({
                                    name: "敏感词识别",
                                    msg: "通过"
                                });
                            }
                            this.result20 = resultArr;
                        } else {
                            this.$Message.error("请求失败");
                        }
                    })
                    .catch(err => {
                        this.isloading = false;
                        console.log(err);
                    });
            },
            handleBeforeUpload21(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic21 = base64;
                    getImgSize(_this.uploadPic21).then(res => {
                        _this.whFlag1 = res.flag;
                    });
                });
                this.result21 = [];
                let formData = new FormData(); //创建form对象
                formData.append("files", file); //
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    method: "post",
                    url: window.config.url + "/ai/image/censor?img_type=FILES&type=0",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                            this.$Message.error("返回数据为空");
                            return;
                            }
                            let resultArr = [];
                            let _result = res.data.data.data;
                            console.log(JSON.stringify(_result))
                            if (_result.filter(item => item.type == 1).length > 0) {
                            _result.forEach(item => {
                                if (item.type == 1) {
                                resultArr.push({
                                    name: "色情识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "色情识别",
                                msg: "通过"
                            });
                            }
                            if (_result.filter(item => item.type == 2).length > 0) {
                            _result.forEach(item => {
                                if (item.type == 2) {
                                resultArr.push({
                                    name: "暴恐识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "暴恐识别",
                                msg: "通过"
                            });
                            }
                            if (_result.filter(item => item.type == 3).length > 0) {
                            _result.forEach(item => {
                                if (item.type == 3) {
                                resultArr.push({
                                    name: "恶心识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "恶心识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 4 && item.subType == 0)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 4 && item.subType == 0) {
                                resultArr.push({
                                    name: "水印码识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "水印码识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 4 && item.subType == 1)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 4 && item.subType == 1) {
                                resultArr.push({
                                    name: "二维码识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "二维码识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 4 && item.subType == 2)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 4 && item.subType == 2) {
                                resultArr.push({
                                    name: "条形码识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "条形码识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 5 && item.subType == 0)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 5 && item.subType == 0) {
                                resultArr.push({
                                    name: "政治人物识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "政治人物识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 5 && item.subType == 1)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 5 && item.subType == 1) {
                                resultArr.push({
                                    name: "公众人物识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "公众人物识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 5 && item.subType == 2)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 5 && item.subType == 2) {
                                resultArr.push({
                                    name: "敏感词识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                                resultArr.push({
                                    name: "敏感词识别",
                                    msg: "通过"
                                });
                            }
                            this.result21 = resultArr;
                        } else {
                            this.$Message.error("请求失败");
                        }
                        })
                        .catch(err => {
                        this.isloading = false;
                        console.log(err);
                        });
            },
            upload20(base) {
                this.isloading = false;
                this.result20 = [
                    {
                        msg: "通过",
                        name: "色情识别"
                    },
                    {
                        msg: "打架斗殴",
                        name: "暴恐识别"
                    },
                    {
                        msg: "通过",
                        name: "恶心识别"
                    },
                    {
                        msg: "通过",
                        name: "水印码识别"
                    },
                    {
                        msg: "通过",
                        name: "二维码识别"
                    },
                    {
                        msg: "通过",
                        name: "条形码识别"
                    },
                    {
                        msg: "通过",
                        name: "政治人物识别"
                    },
                    {
                        msg: "通过",
                        name: "公众人物识别"
                    },
                    {
                        msg: "通过",
                        name: "敏感词识别"
                    }
                ];
            },
            upload21(base) {
                // this.isloading = true;
                // this.result20 = [];
                // this.$axios({
                //   headers: {
                //     Accept: "*/*",
                //     "Content-Type": "multipart/form-data"
                //   },
                //   method: "post",
                //   url: window.config.url+"/ai/image/censor",
                //   params: {
                //     img_type: "URL",
                //     type: 0,
                //     image_param: base
                //   }
                // })
                //   .then(res => {
                this.isloading = false;
                let resultArr = [];
                            let _result = [{"msg":"存在公众人物不合规","conclusion":"不合规","subType":1,"conclusionType":2,"stars":[{"probability":0.89980850219727,"name":"孙子涵"},{"probability":0.79117057800293,"name":"孙子涵"},{"probability":0.83046829223633,"name":"艾玛·罗伯茨"}],"type":5}];
                            if (_result.filter(item => item.type == 1).length > 0) {
                            _result.forEach(item => {
                                if (item.type == 1) {
                                resultArr.push({
                                    name: "色情识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "色情识别",
                                msg: "通过"
                            });
                            }
                            if (_result.filter(item => item.type == 2).length > 0) {
                            _result.forEach(item => {
                                if (item.type == 2) {
                                resultArr.push({
                                    name: "暴恐识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "暴恐识别",
                                msg: "通过"
                            });
                            }
                            if (_result.filter(item => item.type == 3).length > 0) {
                            _result.forEach(item => {
                                if (item.type == 3) {
                                resultArr.push({
                                    name: "恶心识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "恶心识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 4 && item.subType == 0)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 4 && item.subType == 0) {
                                resultArr.push({
                                    name: "水印码识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "水印码识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 4 && item.subType == 1)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 4 && item.subType == 1) {
                                resultArr.push({
                                    name: "二维码识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "二维码识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 4 && item.subType == 2)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 4 && item.subType == 2) {
                                resultArr.push({
                                    name: "条形码识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "条形码识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 5 && item.subType == 0)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 5 && item.subType == 0) {
                                resultArr.push({
                                    name: "政治人物识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "政治人物识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 5 && item.subType == 1)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 5 && item.subType == 1) {
                                resultArr.push({
                                    name: "公众人物识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                            resultArr.push({
                                name: "公众人物识别",
                                msg: "通过"
                            });
                            }

                            if (
                            _result.filter(item => item.type == 5 && item.subType == 2)
                                .length > 0
                            ) {
                            _result.forEach(item => {
                                if (item.type == 5 && item.subType == 2) {
                                resultArr.push({
                                    name: "敏感词识别",
                                    msg: item.msg
                                });
                                }
                            });
                            } else {
                                resultArr.push({
                                    name: "敏感词识别",
                                    msg: "通过"
                                });
                            }
                            this.result21 = resultArr;
                //     console.log(resultArr,'resultArr')
                //   } else {
                //     this.$Message.error("请求失败");
                //   }
                // })
                // .catch(err => {
                //   this.isloading = false;
                //   console.log(err);
                // });
            },
            // initScroll(){
            //     this.timeScroll = setInterval(()=>{
            //         var top=$(".fn_container .right")[0].scrollHeight-$(".fn_container .right")[0].clientHeight;
            //         $(".fn_container .right").animate({ scrollTop: top}, 500);
            //     },500)
            // },
            startRecord2() {
                let _this = this;
                var canRecording = ZCRecorder.canRecording;
                if (!canRecording) {
                    alert("不支持录音");
                    return;
                }
                ZCRecorder.get(
                    function (res) {
                        _this.recorder1 = res;
                        _this.flag1 = !_this.flag1;
                        //当为true，暂停状态
                        _this.timer = null;
                        if (_this.flag1) {
                            _this.isWork1 = true;
                            _this.msgList = [];
                            _this.recorder1.start();
                            _this.buttonMsg1 = "重置对话";
                            //音频采集
                            let _data = null;
                            let isFirst = true;
                            let islu = false;
                            _this.timer = setInterval(() => {
                                if (res.isTalkFlag == '') return;
                                if (res.isTalkFlag == 'notTalk') {
                                    if (isFirst) return;
                                    _this.talk = 'notTalk';
                                    //_this.isWork1 = false;
                                    if (_this.transMsg) {
                                        _this.dialogList.push({
                                            type: 1,
                                            msg: _this.transMsg
                                        });

                                        _this.sendRecord2(_this.transMsg);
                                        _this.transMsg = '';
                                    } else {}
                                    _data = null;

                                } else {
                                    _this.talk = res.isTalkFlag;
                                    isFirst = false;
                                    //_this.isWork1 = true;
                                    //if(!islu){
                                    _data = _this.recorder1.getBlobSegmentAndSize();
                                    //islu=true;
                                    _this.sendRecord2(_data);
                                    //}
                                    /*if (_this.timeScroll == null) {
                                        _this.initScroll();
                                    }*/
                                    if (_this.flag1) {
                                        // _this.buttonMsg4="结束识别";
                                    } else {
                                        //_this.isWork = false;
                                        if (_this.timer) {
                                            clearInterval(_this.timer);
                                            _this.timer = null
                                        }
                                        /*if (_this.timeScroll) {
                                            clearInterval(_this.timeScroll);
                                            _this.timeScroll = null;
                                        }*/
                                        _data = null;
                                        _this.dialogList = [];
                                        _this.recorder1.stop()
                                    }
                                }
                            }, 800)
                        } else {
                            _this.isWork1 = false;
                            _this.buttonMsg1 = "开始对话";
                            _this.recorder1.stop()
                            if (_this.timer) {
                                clearInterval(_this.timer);
                                _this.timer = null
                            }
                          /*  if (_this.timeScroll) {
                                clearInterval(_this.timeScroll);
                                _this.timeScroll = null;
                            }*/
                            _this.dialogList = [];
                        }
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            },
            sendRecord2(val) {
                let formData = new FormData(); //创建form对象
                formData.append("files", val); //
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    method: "post",
                    url: window.config.url + "/ai/voice/asr?audioFormat=pcm16k16bit",
                    data: formData
                })
                    .then(res => {
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("没听清，请重复一遍");
                                return;
                            }
                            this.transMsg1 = res.data.data.ResponseInfo.Result.Text;
                            console.log(this.transMsg1)
                            if (this.transMsg1.includes("空调")) {
                                this.ImageUrl = require("../../../assets/images/VideoUrl/kongtiao.gif")
                            } else if (this.transMsg1.includes("窗帘")) {
                                this.ImageUrl = require("../../../assets/images/VideoUrl/chuanglian.gif")
                            } else if (this.transMsg1.includes("音乐")) {
                                this.ImageUrl = require("../../../assets/images/VideoUrl/yinyue.gif")
                            } else {
                                this.ImageUrl = "";
                            }
                            //console.log(this.transMsg1)
                        } else {
                            this.$Message.error("请求失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            startRecord1() {
                let _this = this;
                var canRecording = ZCRecorder.canRecording;
                if (!canRecording) {
                    alert("不支持录音");
                    return;
                }
                ZCRecorder.get(
                    function (res) {
                        _this.recorder1 = res;
                        console.log(_this.recorder1);
                        _this.flag = !_this.flag;
                        //当为true，暂停状态
                        var timer = null;
                        if (_this.flag) {
                            _this.recorder1.start();
                            _this.upTime = 10;
                            _this.numTime = 0;
                            _this.isWork = true;
                            _this.buttonMsg = "结束识别";
                            let _data = null;
                            timer = setInterval(() => {
                                if (_this.upTime == 0) {
                                    _this.buttonMsg = "开始录音";
                                    _this.flag = false;
                                    clearInterval(timer);
                                    _data = _this.recorder1.getBlob();
                                    _this.sendRecord1(_data);
                                    _this.isWork = false;
                                } else {
                                    _this.numTime++;
                                    _this.upTime--;
                                    _this.upTime = "0" + _this.upTime;
                                    _data = _this.recorder1.getBlob();
                                    _this.sendRecord1(_data);
                                    if (_this.flag) {
                                        _this.buttonMsg = "结束识别";
                                    } else {
                                        _this.isWork = false;
                                        clearInterval(timer);
                                        _data = _this.recorder1.getBlob();
                                        _this.recorder1.stop();
                                        _this.sendRecord1(_data);
                                        _this.buttonMsg = "开始录音";
                                    }
                                }
                            }, 2000);
                        } else {
                            _this.buttonMsg = "开始录音";
                            if (timer) {
                                clearInterval(timer);
                            }
                        }
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            },
            sendRecord1(val) {
                let formData = new FormData(); //创建form对象
                formData.append("files", val); //
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    method: "post",
                    url: window.config.url + "/ai/voice/asr?audioFormat=pcm16k16bit",
                    data: formData
                })
                    .then(res => {
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            this.transMsg = res.data.data.ResponseInfo.Result.Text;
                            //console.log(this.transMsg)
                        } else {
                            this.$Message.error("请求失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleBeforeUpload3(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic3 = base64;
                    getImgSize(_this.uploadPic3).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData(); //创建form对象
                formData.append("files", file); //
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: window.config.url + "/ai/text/licensePlate",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                //this.uploadPic2="data:image/png;base64,"+res.data.data.base64;
                                let result = res.data.data.words_result;
                                let html = ``;
                                html += `<p>车牌号：${result.number}</p>`;
                                html += `<p>车牌颜色：${result.color}</p>`;
                                this.msg3 = html;
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
            showMenu1(val) {
                this.currentIndex = val;
                this.picList1.forEach((item, index) => {
                    if (index == val) {
                        this.resultContent1 = item;
                    }
                });
            },
            handleBeforeUpload6(file) {
                this.isloading = true;
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
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
                this.isloading = false;
                this.picList1 = [];
                //let result = res.data.data.result.resultData;
                let result = [
                    {
                        confidence: 1,
                        location: {
                            heigth: 221.33511352539062,
                            x: 224.58717346191406,
                            width: 179.65940856933594,
                            y: 89.51277923583984
                        }
                    }
                ];
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
                    function (stream) {
                        try {
                            video.srcObject = stream;
                        } catch (error) {
                            video.src = window.URL.createObjectURL(stream);
                        }
                        video.play(); // 播放 //点击截图
                        document.getElementById("snap").addEventListener("click", function () {
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
                    function (error) {
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
            upload620(base) {
                let _this = this;
                // this.$axios({
                //     headers: {
                //         'Accept': '*/*',
                //         'Content-Type': 'multipart/form-data'
                //     },
                //     method: "post",
                //     url: window.config.url+"/ai/bdface/bddetect",
                //     params:{
                //     img_type:'BASE64',
                //     image_param:base,
                //     }
                // }).then(res => {
                this.isloading = false;
                //     if(res.data.code == 200000){
                // if(!res.data.data){
                //     this.$Message.error('返回数据为空');
                //     return;
                // }
                this.picList = [];
                let result = [
                    {
                        expression: {
                            probability: 1,
                            type: "none"
                        },
                        face_shape: {
                            probability: 0.43,
                            type: "heart"
                        },
                        beauty: 46.13,
                        gender: {
                            probability: 1,
                            type: "female"
                        },
                        race: {
                            probability: 0.99,
                            type: "yellow"
                        },
                        landmark150: {
                            eye_right_eyeball_right: {
                                x: 203.34,
                                y: 191.77
                            },
                            mouth_corner_right_inner: {
                                x: 231.41,
                                y: 263.7
                            },
                            cheek_right_1: {
                                x: 123.83,
                                y: 190.06
                            },
                            cheek_right_2: {
                                x: 128.45,
                                y: 204.92
                            },
                            cheek_right_3: {
                                x: 132.74,
                                y: 220.5
                            },
                            cheek_right_8: {
                                x: 179.31,
                                y: 286.21
                            },
                            cheek_right_9: {
                                x: 195.21,
                                y: 293.55
                            },
                            cheek_right_4: {
                                x: 137.95,
                                y: 235.62
                            },
                            cheek_right_5: {
                                x: 144.76,
                                y: 250.48
                            },
                            cheek_right_6: {
                                x: 153.9,
                                y: 264.5
                            },
                            cheek_right_7: {
                                x: 165.48,
                                y: 276.44
                            },
                            mouth_lip_lower_outer_1: {
                                x: 234.55,
                                y: 266.23
                            },
                            mouth_lip_lower_outer_2: {
                                x: 239.67,
                                y: 267.83
                            },
                            mouth_lip_lower_outer_3: {
                                x: 245.23,
                                y: 268.83
                            },
                            mouth_lip_lower_outer_4: {
                                x: 250.42,
                                y: 269.35
                            },
                            eye_right_corner_left: {
                                x: 222.6,
                                y: 192.24
                            },
                            mouth_lip_lower_outer_5: {
                                x: 255.35,
                                y: 269
                            },
                            mouth_corner_left_outer: {
                                x: 271.92,
                                y: 255.12
                            },
                            eyebrow_left_corner_left: {
                                x: 278.34,
                                y: 158.5
                            },
                            nose_left_contour_7: {
                                x: 266.12,
                                y: 227.85
                            },
                            cheek_right_11: {
                                x: 227.84,
                                y: 300.58
                            },
                            nose_left_contour_6: {
                                x: 265.61,
                                y: 231.15
                            },
                            eye_right_eyeball_center: {
                                x: 209.77,
                                y: 190.85
                            },
                            nose_left_contour_5: {
                                x: 266.66,
                                y: 232.82
                            },
                            nose_left_contour_4: {
                                x: 268.23,
                                y: 227.65
                            },
                            cheek_left_8: {
                                x: 278.06,
                                y: 248.84
                            },
                            cheek_left_7: {
                                x: 279.77,
                                y: 238.93
                            },
                            nose_left_contour_3: {
                                x: 262.82,
                                y: 212.27
                            },
                            cheek_right_10: {
                                x: 211.13,
                                y: 298.17
                            },
                            nose_left_contour_2: {
                                x: 256.57,
                                y: 200.25
                            },
                            cheek_left_9: {
                                x: 275.69,
                                y: 259.05
                            },
                            nose_left_contour_1: {
                                x: 250.52,
                                y: 187.84
                            },
                            mouth_lip_lower_outer_6: {
                                x: 260.42,
                                y: 267.98
                            },
                            cheek_left_4: {
                                x: 282.54,
                                y: 208.59
                            },
                            cheek_left_3: {
                                x: 281.35,
                                y: 198.85
                            },
                            mouth_lip_lower_outer_7: {
                                x: 263.49,
                                y: 266.74
                            },
                            cheek_left_6: {
                                x: 281.56,
                                y: 228.55
                            },
                            mouth_lip_lower_outer_8: {
                                x: 265.92,
                                y: 265.18
                            },
                            cheek_left_5: {
                                x: 282.58,
                                y: 218.8
                            },
                            mouth_lip_lower_outer_9: {
                                x: 268.28,
                                y: 263.06
                            },
                            cheek_left_2: {
                                x: 279.93,
                                y: 188.94
                            },
                            cheek_left_1: {
                                x: 278.5,
                                y: 178.81
                            },
                            mouth_lip_upper_inner_2: {
                                x: 239.45,
                                y: 261.47
                            },
                            mouth_lip_upper_inner_3: {
                                x: 244.36,
                                y: 260.37
                            },
                            mouth_lip_upper_inner_4: {
                                x: 248.99,
                                y: 259.43
                            },
                            mouth_lip_upper_inner_5: {
                                x: 253.49,
                                y: 258.78
                            },
                            mouth_corner_right_outer: {
                                x: 229.69,
                                y: 263.92
                            },
                            mouth_lip_upper_inner_6: {
                                x: 258.24,
                                y: 258.36
                            },
                            mouth_lip_upper_inner_7: {
                                x: 260.63,
                                y: 257.01
                            },
                            mouth_lip_upper_inner_8: {
                                x: 263.08,
                                y: 256.27
                            },
                            mouth_lip_upper_inner_9: {
                                x: 265.61,
                                y: 255.84
                            },
                            eyebrow_left_upper_1: {
                                x: 255.43,
                                y: 164.12
                            },
                            eyebrow_left_upper_2: {
                                x: 260.03,
                                y: 159.65
                            },
                            eyebrow_left_upper_5: {
                                x: 277.28,
                                y: 154.29
                            },
                            eyebrow_left_upper_3: {
                                x: 265.63,
                                y: 155.95
                            },
                            eye_left_eyeball_right: {
                                x: 260.07,
                                y: 183.56
                            },
                            eyebrow_left_upper_4: {
                                x: 271.74,
                                y: 153.86
                            },
                            mouth_lip_upper_inner_1: {
                                x: 234.77,
                                y: 262.67
                            },
                            mouth_lip_upper_outer_11: {
                                x: 270.89,
                                y: 253.19
                            },
                            mouth_lip_lower_inner_7: {
                                x: 262.01,
                                y: 258.86
                            },
                            mouth_lip_upper_outer_10: {
                                x: 269.33,
                                y: 251.69
                            },
                            mouth_lip_lower_inner_8: {
                                x: 264.06,
                                y: 258.17
                            },
                            mouth_lip_lower_inner_9: {
                                x: 266.28,
                                y: 257.47
                            },
                            mouth_lip_lower_inner_3: {
                                x: 245.61,
                                y: 261.8
                            },
                            mouth_lip_lower_inner_4: {
                                x: 250.47,
                                y: 260.93
                            },
                            mouth_lip_lower_inner_5: {
                                x: 255.01,
                                y: 260.07
                            },
                            mouth_lip_lower_inner_6: {
                                x: 259.62,
                                y: 259.34
                            },
                            eye_left_eyeball_center: {
                                x: 264.72,
                                y: 181.94
                            },
                            mouth_lip_lower_inner_1: {
                                x: 235.25,
                                y: 263.49
                            },
                            mouth_lip_lower_inner_2: {
                                x: 240.31,
                                y: 262.65
                            },
                            eye_right_corner_right: {
                                x: 193.54,
                                y: 192.63
                            },
                            mouth_lip_lower_outer_11: {
                                x: 271.1,
                                y: 257.96
                            },
                            mouth_lip_lower_outer_10: {
                                x: 269.93,
                                y: 260.54
                            },
                            eye_right_eyeball_left: {
                                x: 215.2,
                                y: 190.65
                            },
                            eyebrow_right_lower_2: {
                                x: 203.25,
                                y: 170.34
                            },
                            eyebrow_right_lower_1: {
                                x: 190.62,
                                y: 172.13
                            },
                            eyebrow_right_lower_3: {
                                x: 215.91,
                                y: 170.43
                            },
                            mouth_lip_upper_outer_9: {
                                x: 267,
                                y: 250.48
                            },
                            eye_left_corner_right: {
                                x: 256.03,
                                y: 186.22
                            },
                            mouth_lip_upper_outer_5: {
                                x: 253.5,
                                y: 251.45
                            },
                            mouth_lip_upper_outer_6: {
                                x: 258.5,
                                y: 252.02
                            },
                            mouth_lip_upper_outer_7: {
                                x: 261.6,
                                y: 250.01
                            },
                            mouth_lip_upper_outer_8: {
                                x: 264.47,
                                y: 249.87
                            },
                            eye_left_eyelid_lower_4: {
                                x: 267.11,
                                y: 186.44
                            },
                            nose_right_contour_6: {
                                x: 247.83,
                                y: 233.58
                            },
                            eye_left_eyelid_upper_5: {
                                x: 267.3,
                                y: 176.2
                            },
                            eye_left_eyelid_upper_4: {
                                x: 264.25,
                                y: 177.01
                            },
                            eye_left_eyelid_lower_3: {
                                x: 264.32,
                                y: 187.08
                            },
                            nose_right_contour_7: {
                                x: 246.48,
                                y: 230.04
                            },
                            eye_left_eyelid_lower_2: {
                                x: 261.31,
                                y: 187.14
                            },
                            nose_right_contour_4: {
                                x: 236.58,
                                y: 236.99
                            },
                            eye_left_eyelid_upper_7: {
                                x: 272.95,
                                y: 177.41
                            },
                            eye_left_eyelid_upper_6: {
                                x: 270.1,
                                y: 176.15
                            },
                            eye_left_eyelid_lower_1: {
                                x: 258.49,
                                y: 186.99
                            },
                            nose_right_contour_5: {
                                x: 242.92,
                                y: 238.51
                            },
                            eye_left_eyelid_upper_1: {
                                x: 256.97,
                                y: 182.92
                            },
                            mouth_lip_upper_outer_1: {
                                x: 233.91,
                                y: 260.89
                            },
                            eye_left_eyelid_lower_7: {
                                x: 273.67,
                                y: 181.87
                            },
                            mouth_lip_upper_outer_2: {
                                x: 238.64,
                                y: 258.3
                            },
                            eyebrow_right_corner_left: {
                                x: 228.28,
                                y: 170.74
                            },
                            eye_left_eyelid_lower_6: {
                                x: 271.92,
                                y: 183.86
                            },
                            mouth_lip_upper_outer_3: {
                                x: 243.7,
                                y: 255.78
                            },
                            eye_left_eyelid_upper_3: {
                                x: 261.46,
                                y: 178.33
                            },
                            eye_left_eyeball_left: {
                                x: 269.44,
                                y: 180.84
                            },
                            eye_left_eyelid_upper_2: {
                                x: 259.07,
                                y: 180.31
                            },
                            eye_left_eyelid_lower_5: {
                                x: 269.75,
                                y: 185.41
                            },
                            mouth_lip_upper_outer_4: {
                                x: 248.46,
                                y: 253.49
                            },
                            nose_tip: {
                                x: 261.99,
                                y: 222.68
                            },
                            chin_3: {
                                x: 266.38,
                                y: 288.46
                            },
                            chin_1: {
                                x: 244.11,
                                y: 300.52
                            },
                            chin_2: {
                                x: 259.35,
                                y: 296.34
                            },
                            eyebrow_right_upper_1: {
                                x: 177.2,
                                y: 171.02
                            },
                            eye_right_eyelid_lower_7: {
                                x: 219.66,
                                y: 193.98
                            },
                            eye_right_eyelid_lower_6: {
                                x: 216.36,
                                y: 195.37
                            },
                            eyebrow_right_upper_5: {
                                x: 228.22,
                                y: 165.54
                            },
                            eyebrow_right_upper_4: {
                                x: 215.68,
                                y: 161.89
                            },
                            eyebrow_right_upper_3: {
                                x: 202.45,
                                y: 160.76
                            },
                            eyebrow_right_upper_2: {
                                x: 189.36,
                                y: 163.82
                            },
                            mouth_corner_left_inner: {
                                x: 270.86,
                                y: 255.34
                            },
                            eye_right_eyelid_upper_2: {
                                x: 200.56,
                                y: 188.16
                            },
                            eye_right_eyelid_upper_1: {
                                x: 196.72,
                                y: 189.95
                            },
                            eye_right_eyelid_upper_4: {
                                x: 208.35,
                                y: 185.85
                            },
                            eye_right_eyelid_upper_3: {
                                x: 204.31,
                                y: 186.62
                            },
                            eye_right_eyelid_lower_1: {
                                x: 197,
                                y: 194.42
                            },
                            eye_left_corner_left: {
                                x: 274.63,
                                y: 179.63
                            },
                            eyebrow_left_corner_right: {
                                x: 256.95,
                                y: 167.97
                            },
                            eye_right_eyelid_lower_5: {
                                x: 212.73,
                                y: 196.36
                            },
                            mouth_lip_upper_inner_11: {
                                x: 269.56,
                                y: 255.26
                            },
                            eye_right_eyelid_lower_4: {
                                x: 208.9,
                                y: 196.76
                            },
                            eye_right_eyelid_lower_3: {
                                x: 204.81,
                                y: 196.6
                            },
                            eye_right_eyelid_lower_2: {
                                x: 200.84,
                                y: 195.71
                            },
                            mouth_lip_upper_inner_10: {
                                x: 267.56,
                                y: 255.53
                            },
                            mouth_lip_lower_inner_10: {
                                x: 268.11,
                                y: 256.73
                            },
                            mouth_lip_lower_inner_11: {
                                x: 269.87,
                                y: 256.13
                            },
                            eyebrow_left_lower_3: {
                                x: 273.69,
                                y: 160.64
                            },
                            cheek_left_10: {
                                x: 272.63,
                                y: 268.66
                            },
                            cheek_left_11: {
                                x: 269.55,
                                y: 278.31
                            },
                            eyebrow_left_lower_2: {
                                x: 268.19,
                                y: 162.83
                            },
                            eyebrow_left_lower_1: {
                                x: 262.6,
                                y: 165.44
                            },
                            nose_bridge_1: {
                                x: 245.94,
                                y: 188.33
                            },
                            nose_right_contour_2: {
                                x: 235.97,
                                y: 204.19
                            },
                            nose_right_contour_3: {
                                x: 236.89,
                                y: 217.91
                            },
                            nose_right_contour_1: {
                                x: 234.39,
                                y: 190.65
                            },
                            nose_bridge_2: {
                                x: 251.68,
                                y: 201.05
                            },
                            nose_bridge_3: {
                                x: 257.64,
                                y: 213.79
                            },
                            eyebrow_right_corner_right: {
                                x: 177.41,
                                y: 174.79
                            },
                            nose_middle_contour: {
                                x: 257.13,
                                y: 236.94
                            },
                            eye_right_eyelid_upper_6: {
                                x: 216.47,
                                y: 186.43
                            },
                            eye_right_eyelid_upper_5: {
                                x: 212.46,
                                y: 185.59
                            },
                            eye_right_eyelid_upper_7: {
                                x: 220.04,
                                y: 188.7
                            }
                        },
                        eye_status: {
                            right_eye: 1,
                            left_eye: 0.9940312505
                        },
                        face_probability: 1,
                        quality: {
                            illumination: 112,
                            occlusion: {
                                right_eye: 0.02,
                                nose: 0,
                                mouth: 0,
                                left_eye: 0,
                                left_cheek: 0.02,
                                chin_contour: 0.19,
                                right_cheek: 0.19
                            },
                            blur: 0,
                            completeness: 1
                        },
                        glasses: {
                            probability: 0.99,
                            type: "common"
                        },
                        emotion: {
                            probability: 0.02,
                            type: "grimace"
                        },
                        landmark72: [
                            {
                                x: 121.39,
                                y: 190.06
                            },
                            {
                                x: 129.76,
                                y: 218.38
                            },
                            {
                                x: 142.03,
                                y: 247.21
                            },
                            {
                                x: 163.24,
                                y: 273.98
                            },
                            {
                                x: 195.16,
                                y: 293.09
                            },
                            {
                                x: 226.13,
                                y: 301.33
                            },
                            {
                                x: 255.71,
                                y: 298.89
                            },
                            {
                                x: 269.12,
                                y: 276.87
                            },
                            {
                                x: 275.15,
                                y: 254.97
                            },
                            {
                                x: 279.02,
                                y: 233.95
                            },
                            {
                                x: 280.96,
                                y: 212.93
                            },
                            {
                                x: 279.3,
                                y: 192.51
                            },
                            {
                                x: 276.94,
                                y: 172.37
                            },
                            {
                                x: 191.35,
                                y: 192.53
                            },
                            {
                                x: 199.42,
                                y: 186.81
                            },
                            {
                                x: 207.67,
                                y: 183.73
                            },
                            {
                                x: 216.21,
                                y: 184.36
                            },
                            {
                                x: 223.12,
                                y: 190.86
                            },
                            {
                                x: 216.39,
                                y: 194.43
                            },
                            {
                                x: 208.59,
                                y: 196.51
                            },
                            {
                                x: 199.55,
                                y: 195.35
                            },
                            {
                                x: 209.38,
                                y: 189.7
                            },
                            {
                                x: 176.8,
                                y: 177.25
                            },
                            {
                                x: 189.7,
                                y: 165.5
                            },
                            {
                                x: 204.59,
                                y: 161.06
                            },
                            {
                                x: 219.38,
                                y: 161.66
                            },
                            {
                                x: 232.8,
                                y: 169.3
                            },
                            {
                                x: 219.52,
                                y: 169.91
                            },
                            {
                                x: 205.43,
                                y: 170.08
                            },
                            {
                                x: 191.13,
                                y: 172.49
                            },
                            {
                                x: 255.68,
                                y: 184.74
                            },
                            {
                                x: 259.54,
                                y: 177.57
                            },
                            {
                                x: 265.47,
                                y: 174.13
                            },
                            {
                                x: 271.05,
                                y: 173.98
                            },
                            {
                                x: 275.19,
                                y: 178.73
                            },
                            {
                                x: 272.76,
                                y: 183.14
                            },
                            {
                                x: 267.58,
                                y: 185.38
                            },
                            {
                                x: 261.63,
                                y: 185.78
                            },
                            {
                                x: 264.55,
                                y: 180.15
                            },
                            {
                                x: 254.98,
                                y: 167.85
                            },
                            {
                                x: 259.22,
                                y: 159.53
                            },
                            {
                                x: 265.33,
                                y: 154.53
                            },
                            {
                                x: 272.24,
                                y: 152.04
                            },
                            {
                                x: 277.6,
                                y: 156.17
                            },
                            {
                                x: 273.21,
                                y: 158.45
                            },
                            {
                                x: 267.29,
                                y: 161.81
                            },
                            {
                                x: 261.18,
                                y: 164.65
                            },
                            {
                                x: 234.62,
                                y: 189.83
                            },
                            {
                                x: 235.99,
                                y: 204.22
                            },
                            {
                                x: 236.88,
                                y: 219.08
                            },
                            {
                                x: 234.65,
                                y: 234.83
                            },
                            {
                                x: 250.3,
                                y: 235.02
                            },
                            {
                                x: 265.27,
                                y: 232.03
                            },
                            {
                                x: 271.17,
                                y: 224.87
                            },
                            {
                                x: 265.39,
                                y: 212.08
                            },
                            {
                                x: 258.66,
                                y: 198.99
                            },
                            {
                                x: 252.17,
                                y: 185.94
                            },
                            {
                                x: 261.29,
                                y: 221.56
                            },
                            {
                                x: 229.41,
                                y: 263.64
                            },
                            {
                                x: 243.65,
                                y: 256.68
                            },
                            {
                                x: 257.3,
                                y: 252.58
                            },
                            {
                                x: 263.71,
                                y: 251.4
                            },
                            {
                                x: 269.35,
                                y: 255.43
                            },
                            {
                                x: 264.59,
                                y: 264.24
                            },
                            {
                                x: 256.5,
                                y: 268.7
                            },
                            {
                                x: 243.51,
                                y: 268.38
                            },
                            {
                                x: 244.35,
                                y: 261.54
                            },
                            {
                                x: 256.63,
                                y: 259.53
                            },
                            {
                                x: 262.66,
                                y: 257.42
                            },
                            {
                                x: 261.74,
                                y: 257.39
                            },
                            {
                                x: 255.15,
                                y: 258.86
                            },
                            {
                                x: 243.83,
                                y: 260.91
                            }
                        ],
                        face_type: {
                            probability: 1,
                            type: "human"
                        },
                        angle: {
                            roll: -1.9,
                            pitch: 16.62,
                            yaw: -37.19
                        },
                        face_token: "dfffa180375a952e653d8cae3d573f91",
                        location: {
                            top: 175.26,
                            left: 119.28,
                            rotation: -9,
                            width: 159,
                            height: 144
                        },
                        landmark: [
                            {
                                x: 209.38,
                                y: 189.7
                            },
                            {
                                x: 264.55,
                                y: 180.15
                            },
                            {
                                x: 261.29,
                                y: 221.56
                            },
                            {
                                x: 253.74,
                                y: 259.76
                            }
                        ],
                        age: 23,
                        mask: {
                            probability: 1,
                            type: 0
                        }
                    },
                    {
                        expression: {
                            probability: 0.99,
                            type: "none"
                        },
                        face_shape: {
                            probability: 0.47,
                            type: "oval"
                        },
                        beauty: 31.14,
                        gender: {
                            probability: 0.95,
                            type: "female"
                        },
                        race: {
                            probability: 0.67,
                            type: "white"
                        },
                        landmark150: {
                            eye_right_eyeball_right: {
                                x: 55.03,
                                y: 75.79
                            },
                            mouth_corner_right_inner: {
                                x: 50.34,
                                y: 124
                            },
                            cheek_right_1: {
                                x: 20.84,
                                y: 63.59
                            },
                            cheek_right_2: {
                                x: 19.31,
                                y: 71.43
                            },
                            cheek_right_3: {
                                x: 18.59,
                                y: 79.29
                            },
                            cheek_right_8: {
                                x: 22.72,
                                y: 121.32
                            },
                            cheek_right_9: {
                                x: 26.47,
                                y: 128.18
                            },
                            cheek_right_4: {
                                x: 18.17,
                                y: 87.62
                            },
                            cheek_right_5: {
                                x: 18.19,
                                y: 95.72
                            },
                            cheek_right_6: {
                                x: 18.79,
                                y: 104.99
                            },
                            cheek_right_7: {
                                x: 20.54,
                                y: 112.81
                            },
                            mouth_lip_lower_outer_1: {
                                x: 50.65,
                                y: 125.9
                            },
                            mouth_lip_lower_outer_2: {
                                x: 52.2,
                                y: 127.82
                            },
                            mouth_lip_lower_outer_3: {
                                x: 54.25,
                                y: 129.22
                            },
                            mouth_lip_lower_outer_4: {
                                x: 56.34,
                                y: 130.63
                            },
                            eye_right_corner_left: {
                                x: 63.93,
                                y: 77.58
                            },
                            mouth_lip_lower_outer_5: {
                                x: 58.43,
                                y: 131.62
                            },
                            mouth_corner_left_outer: {
                                x: 73.32,
                                y: 126.57
                            },
                            eyebrow_left_corner_left: {
                                x: 105.58,
                                y: 70.6
                            },
                            nose_left_contour_7: {
                                x: 72.86,
                                y: 110.07
                            },
                            cheek_right_11: {
                                x: 38.18,
                                y: 142.27
                            },
                            nose_left_contour_6: {
                                x: 73.13,
                                y: 111.21
                            },
                            eye_right_eyeball_center: {
                                x: 58.02,
                                y: 76.5
                            },
                            nose_left_contour_5: {
                                x: 73.87,
                                y: 112.12
                            },
                            nose_left_contour_4: {
                                x: 78.12,
                                y: 109.35
                            },
                            cheek_left_8: {
                                x: 90.89,
                                y: 130.9
                            },
                            cheek_left_7: {
                                x: 95,
                                y: 123.48
                            },
                            nose_left_contour_3: {
                                x: 77.9,
                                y: 99.8
                            },
                            cheek_right_10: {
                                x: 31.75,
                                y: 136.16
                            },
                            nose_left_contour_2: {
                                x: 77.38,
                                y: 89.82
                            },
                            cheek_left_9: {
                                x: 85.13,
                                y: 137.06
                            },
                            nose_left_contour_1: {
                                x: 76.91,
                                y: 79.94
                            },
                            mouth_lip_lower_outer_6: {
                                x: 60.59,
                                y: 131.41
                            },
                            cheek_left_4: {
                                x: 104.71,
                                y: 101.55
                            },
                            cheek_left_3: {
                                x: 107.31,
                                y: 94.22
                            },
                            mouth_lip_lower_outer_7: {
                                x: 64.07,
                                y: 132.03
                            },
                            cheek_left_6: {
                                x: 98.49,
                                y: 116.72
                            },
                            mouth_lip_lower_outer_8: {
                                x: 65.78,
                                y: 131.75
                            },
                            cheek_left_5: {
                                x: 101.46,
                                y: 109.14
                            },
                            mouth_lip_lower_outer_9: {
                                x: 67.52,
                                y: 130.56
                            },
                            cheek_left_2: {
                                x: 110.65,
                                y: 86.54
                            },
                            cheek_left_1: {
                                x: 112.66,
                                y: 79.02
                            },
                            mouth_lip_upper_inner_2: {
                                x: 53.87,
                                y: 124.28
                            },
                            mouth_lip_upper_inner_3: {
                                x: 55.83,
                                y: 124.03
                            },
                            mouth_lip_upper_inner_4: {
                                x: 58.13,
                                y: 124.59
                            },
                            mouth_lip_upper_inner_5: {
                                x: 60.02,
                                y: 125
                            },
                            mouth_corner_right_outer: {
                                x: 49.17,
                                y: 123.69
                            },
                            mouth_lip_upper_inner_6: {
                                x: 62.53,
                                y: 125.2
                            },
                            mouth_lip_upper_inner_7: {
                                x: 65.67,
                                y: 125.9
                            },
                            mouth_lip_upper_inner_8: {
                                x: 67.34,
                                y: 125.75
                            },
                            mouth_lip_upper_inner_9: {
                                x: 69.34,
                                y: 125.5
                            },
                            eyebrow_left_upper_1: {
                                x: 82.86,
                                y: 70.19
                            },
                            eyebrow_left_upper_2: {
                                x: 88.86,
                                y: 68.03
                            },
                            eyebrow_left_upper_5: {
                                x: 105.17,
                                y: 68.58
                            },
                            eyebrow_left_upper_3: {
                                x: 94.85,
                                y: 67.34
                            },
                            eye_left_eyeball_right: {
                                x: 86.41,
                                y: 80.31
                            },
                            eyebrow_left_upper_4: {
                                x: 100.48,
                                y: 67.3
                            },
                            mouth_lip_upper_inner_1: {
                                x: 51.93,
                                y: 124.23
                            },
                            mouth_lip_upper_outer_11: {
                                x: 72.91,
                                y: 125.55
                            },
                            mouth_lip_lower_inner_7: {
                                x: 64.34,
                                y: 127.61
                            },
                            mouth_lip_upper_outer_10: {
                                x: 71.67,
                                y: 124.43
                            },
                            mouth_lip_lower_inner_8: {
                                x: 65.69,
                                y: 127.62
                            },
                            mouth_lip_lower_inner_9: {
                                x: 67.21,
                                y: 127.38
                            },
                            mouth_lip_lower_inner_3: {
                                x: 55.93,
                                y: 126.81
                            },
                            mouth_lip_lower_inner_4: {
                                x: 58.17,
                                y: 127.8
                            },
                            mouth_lip_lower_inner_5: {
                                x: 59.86,
                                y: 128.23
                            },
                            mouth_lip_lower_inner_6: {
                                x: 61.7,
                                y: 127.71
                            },
                            eye_left_eyeball_center: {
                                x: 89.39,
                                y: 81.12
                            },
                            mouth_lip_lower_inner_1: {
                                x: 51.98,
                                y: 125.28
                            },
                            mouth_lip_lower_inner_2: {
                                x: 53.78,
                                y: 126.24
                            },
                            eye_right_corner_right: {
                                x: 49.33,
                                y: 74.66
                            },
                            mouth_lip_lower_outer_11: {
                                x: 71.39,
                                y: 128.36
                            },
                            mouth_lip_lower_outer_10: {
                                x: 69.63,
                                y: 129.79
                            },
                            eye_right_eyeball_left: {
                                x: 60.56,
                                y: 76.79
                            },
                            eyebrow_right_lower_2: {
                                x: 60.88,
                                y: 64.38
                            },
                            eyebrow_right_lower_1: {
                                x: 53.3,
                                y: 63.44
                            },
                            eyebrow_right_lower_3: {
                                x: 67.39,
                                y: 66.72
                            },
                            mouth_lip_upper_outer_9: {
                                x: 70.11,
                                y: 123.33
                            },
                            eye_left_corner_right: {
                                x: 82.54,
                                y: 80.62
                            },
                            mouth_lip_upper_outer_5: {
                                x: 60.89,
                                y: 122.27
                            },
                            mouth_lip_upper_outer_6: {
                                x: 63.56,
                                y: 122.65
                            },
                            mouth_lip_upper_outer_7: {
                                x: 66.21,
                                y: 122.95
                            },
                            mouth_lip_upper_outer_8: {
                                x: 68.02,
                                y: 123.12
                            },
                            eye_left_eyelid_lower_4: {
                                x: 89.48,
                                y: 83.89
                            },
                            nose_right_contour_6: {
                                x: 62.68,
                                y: 109.37
                            },
                            eye_left_eyelid_upper_5: {
                                x: 91.68,
                                y: 78.73
                            },
                            eye_left_eyelid_upper_4: {
                                x: 89.59,
                                y: 78.74
                            },
                            eye_left_eyelid_lower_3: {
                                x: 87.5,
                                y: 83.28
                            },
                            nose_right_contour_7: {
                                x: 64.31,
                                y: 108.48
                            },
                            eye_left_eyelid_lower_2: {
                                x: 85.62,
                                y: 82.74
                            },
                            nose_right_contour_4: {
                                x: 55.93,
                                y: 107.23
                            },
                            eye_left_eyelid_upper_7: {
                                x: 95.28,
                                y: 80.04
                            },
                            eye_left_eyelid_upper_6: {
                                x: 93.28,
                                y: 79.41
                            },
                            eye_left_eyelid_lower_1: {
                                x: 83.77,
                                y: 81.41
                            },
                            nose_right_contour_5: {
                                x: 60.61,
                                y: 110.89
                            },
                            eye_left_eyelid_upper_1: {
                                x: 83.88,
                                y: 78.99
                            },
                            mouth_lip_upper_outer_1: {
                                x: 51.41,
                                y: 123.16
                            },
                            eye_left_eyelid_lower_7: {
                                x: 95.2,
                                y: 82.16
                            },
                            mouth_lip_upper_outer_2: {
                                x: 53.63,
                                y: 122.82
                            },
                            eyebrow_right_corner_left: {
                                x: 72.5,
                                y: 69.03
                            },
                            eye_left_eyelid_lower_6: {
                                x: 93.31,
                                y: 83.26
                            },
                            mouth_lip_upper_outer_3: {
                                x: 55.73,
                                y: 122.18
                            },
                            eye_left_eyelid_upper_3: {
                                x: 87.7,
                                y: 78.44
                            },
                            eye_left_eyeball_left: {
                                x: 92.23,
                                y: 81.13
                            },
                            eye_left_eyelid_upper_2: {
                                x: 85.93,
                                y: 78.72
                            },
                            eye_left_eyelid_lower_5: {
                                x: 91.6,
                                y: 83.42
                            },
                            mouth_lip_upper_outer_4: {
                                x: 58.51,
                                y: 122.24
                            },
                            nose_tip: {
                                x: 70.44,
                                y: 105.92
                            },
                            chin_3: {
                                x: 64.43,
                                y: 150.65
                            },
                            chin_1: {
                                x: 45.63,
                                y: 149.32
                            },
                            chin_2: {
                                x: 54.53,
                                y: 153.17
                            },
                            eyebrow_right_upper_1: {
                                x: 47.07,
                                y: 62.19
                            },
                            eye_right_eyelid_lower_7: {
                                x: 61.94,
                                y: 78.28
                            },
                            eye_right_eyelid_lower_6: {
                                x: 60.18,
                                y: 78.94
                            },
                            eyebrow_right_upper_5: {
                                x: 74.44,
                                y: 67.48
                            },
                            eyebrow_right_upper_4: {
                                x: 69.59,
                                y: 63.13
                            },
                            eyebrow_right_upper_3: {
                                x: 62.68,
                                y: 60.18
                            },
                            eyebrow_right_upper_2: {
                                x: 54.6,
                                y: 59.67
                            },
                            mouth_corner_left_inner: {
                                x: 72.74,
                                y: 126.73
                            },
                            eye_right_eyelid_upper_2: {
                                x: 53.48,
                                y: 73.2
                            },
                            eye_right_eyelid_upper_1: {
                                x: 51.06,
                                y: 73.77
                            },
                            eye_right_eyelid_upper_4: {
                                x: 57.73,
                                y: 73.54
                            },
                            eye_right_eyelid_upper_3: {
                                x: 55.4,
                                y: 73.26
                            },
                            eye_right_eyelid_lower_1: {
                                x: 50.57,
                                y: 75.97
                            },
                            eye_left_corner_left: {
                                x: 96.38,
                                y: 81.43
                            },
                            eyebrow_left_corner_right: {
                                x: 82.92,
                                y: 72.24
                            },
                            eye_right_eyelid_lower_5: {
                                x: 57.95,
                                y: 79.12
                            },
                            mouth_lip_upper_inner_11: {
                                x: 72.1,
                                y: 126.44
                            },
                            eye_right_eyelid_lower_4: {
                                x: 56.05,
                                y: 79.02
                            },
                            eye_right_eyelid_lower_3: {
                                x: 53.8,
                                y: 78.26
                            },
                            eye_right_eyelid_lower_2: {
                                x: 52.22,
                                y: 77.26
                            },
                            mouth_lip_upper_inner_10: {
                                x: 70.95,
                                y: 126.1
                            },
                            mouth_lip_lower_inner_10: {
                                x: 69.16,
                                y: 127.44
                            },
                            mouth_lip_lower_inner_11: {
                                x: 70.82,
                                y: 127.14
                            },
                            eyebrow_left_lower_3: {
                                x: 100.63,
                                y: 70.8
                            },
                            cheek_left_10: {
                                x: 79.9,
                                y: 142.42
                            },
                            cheek_left_11: {
                                x: 71.45,
                                y: 147.02
                            },
                            eyebrow_left_lower_2: {
                                x: 95.02,
                                y: 71.3
                            },
                            eyebrow_left_lower_1: {
                                x: 88.9,
                                y: 72.22
                            },
                            nose_bridge_1: {
                                x: 73.04,
                                y: 79.28
                            },
                            nose_right_contour_2: {
                                x: 64.05,
                                y: 88.69
                            },
                            nose_right_contour_3: {
                                x: 59.85,
                                y: 98.43
                            },
                            nose_right_contour_1: {
                                x: 68.32,
                                y: 79.21
                            },
                            nose_bridge_2: {
                                x: 71.93,
                                y: 89.51
                            },
                            nose_bridge_3: {
                                x: 71.08,
                                y: 99.34
                            },
                            eyebrow_right_corner_right: {
                                x: 45.9,
                                y: 63.68
                            },
                            nose_middle_contour: {
                                x: 65.89,
                                y: 113.14
                            },
                            eye_right_eyelid_upper_6: {
                                x: 61.35,
                                y: 74.88
                            },
                            eye_right_eyelid_upper_5: {
                                x: 59.49,
                                y: 74.18
                            },
                            eye_right_eyelid_upper_7: {
                                x: 62.73,
                                y: 75.94
                            }
                        },
                        eye_status: {
                            right_eye: 0.8,
                            left_eye: 0.9787838459
                        },
                        face_probability: 0.99,
                        quality: {
                            illumination: 95,
                            occlusion: {
                                right_eye: 1,
                                nose: 0.95,
                                mouth: 0.01,
                                left_eye: 0.04,
                                left_cheek: 0.41,
                                chin_contour: 0.16,
                                right_cheek: 0.42
                            },
                            blur: 1,
                            completeness: 1
                        },
                        glasses: {
                            probability: 0.98,
                            type: "none"
                        },
                        emotion: {
                            probability: 0.43,
                            type: "fear"
                        },
                        landmark72: [
                            {
                                x: 4.96,
                                y: 67.14
                            },
                            {
                                x: 4.06,
                                y: 87.63
                            },
                            {
                                x: 5.01,
                                y: 107.84
                            },
                            {
                                x: 11.63,
                                y: 127.83
                            },
                            {
                                x: 25.95,
                                y: 145
                            },
                            {
                                x: 43.17,
                                y: 155.78
                            },
                            {
                                x: 61.39,
                                y: 161.02
                            },
                            {
                                x: 76.31,
                                y: 153.69
                            },
                            {
                                x: 89.16,
                                y: 141.72
                            },
                            {
                                x: 100.64,
                                y: 126.33
                            },
                            {
                                x: 109.6,
                                y: 109.47
                            },
                            {
                                x: 114.57,
                                y: 92.09
                            },
                            {
                                x: 118.02,
                                y: 74.32
                            },
                            {
                                x: 50.84,
                                y: 74.29
                            },
                            {
                                x: 55.37,
                                y: 73.19
                            },
                            {
                                x: 59.62,
                                y: 72.76
                            },
                            {
                                x: 63.83,
                                y: 72.83
                            },
                            {
                                x: 67.7,
                                y: 73.66
                            },
                            {
                                x: 63.86,
                                y: 75.63
                            },
                            {
                                x: 59.21,
                                y: 76.18
                            },
                            {
                                x: 54.95,
                                y: 75.56
                            },
                            {
                                x: 61.21,
                                y: 74.43
                            },
                            {
                                x: 45.94,
                                y: 62.02
                            },
                            {
                                x: 53.52,
                                y: 56.84
                            },
                            {
                                x: 61.55,
                                y: 56.4
                            },
                            {
                                x: 69.34,
                                y: 57.17
                            },
                            {
                                x: 75.88,
                                y: 61.92
                            },
                            {
                                x: 68.45,
                                y: 61.96
                            },
                            {
                                x: 61.07,
                                y: 61.53
                            },
                            {
                                x: 53.41,
                                y: 61.53
                            },
                            {
                                x: 88.5,
                                y: 72.12
                            },
                            {
                                x: 92.58,
                                y: 69.76
                            },
                            {
                                x: 96.28,
                                y: 69.64
                            },
                            {
                                x: 100.24,
                                y: 70.41
                            },
                            {
                                x: 103.44,
                                y: 71.78
                            },
                            {
                                x: 99.8,
                                y: 73.56
                            },
                            {
                                x: 95.98,
                                y: 74.21
                            },
                            {
                                x: 91.77,
                                y: 73.65
                            },
                            {
                                x: 95.95,
                                y: 71.98
                            },
                            {
                                x: 86.93,
                                y: 61.57
                            },
                            {
                                x: 93.05,
                                y: 55.47
                            },
                            {
                                x: 99.52,
                                y: 53.32
                            },
                            {
                                x: 106.14,
                                y: 53.5
                            },
                            {
                                x: 110.92,
                                y: 58.26
                            },
                            {
                                x: 106.14,
                                y: 57.91
                            },
                            {
                                x: 99.78,
                                y: 59
                            },
                            {
                                x: 93.6,
                                y: 60.62
                            },
                            {
                                x: 73.37,
                                y: 73.06
                            },
                            {
                                x: 70.72,
                                y: 81.36
                            },
                            {
                                x: 67.09,
                                y: 89.79
                            },
                            {
                                x: 62.09,
                                y: 99.07
                            },
                            {
                                x: 71.88,
                                y: 102.34
                            },
                            {
                                x: 82.62,
                                y: 102.97
                            },
                            {
                                x: 89.26,
                                y: 100.73
                            },
                            {
                                x: 87.7,
                                y: 90.52
                            },
                            {
                                x: 86.19,
                                y: 81.36
                            },
                            {
                                x: 84.48,
                                y: 72.48
                            },
                            {
                                x: 80.14,
                                y: 93.63
                            },
                            {
                                x: 48.47,
                                y: 120.39
                            },
                            {
                                x: 60.23,
                                y: 114.71
                            },
                            {
                                x: 71.35,
                                y: 113.99
                            },
                            {
                                x: 77.33,
                                y: 116.18
                            },
                            {
                                x: 80.05,
                                y: 122.96
                            },
                            {
                                x: 72.91,
                                y: 130.76
                            },
                            {
                                x: 65.06,
                                y: 132.12
                            },
                            {
                                x: 55.19,
                                y: 128.45
                            },
                            {
                                x: 60.04,
                                y: 118.59
                            },
                            {
                                x: 70.2,
                                y: 119.06
                            },
                            {
                                x: 75.61,
                                y: 120.32
                            },
                            {
                                x: 71.85,
                                y: 125.29
                            },
                            {
                                x: 65.44,
                                y: 125.93
                            },
                            {
                                x: 56.6,
                                y: 124.24
                            }
                        ],
                        face_type: {
                            probability: 1,
                            type: "human"
                        },
                        angle: {
                            roll: 5.57,
                            pitch: 15.17,
                            yaw: -34.26
                        },
                        face_token: "f8787c2d74ae077d621db5b37abba3fb",
                        location: {
                            top: 58.3,
                            left: 2.89,
                            rotation: -2,
                            width: 114,
                            height: 105
                        },
                        landmark: [
                            {
                                x: 61.21,
                                y: 74.43
                            },
                            {
                                x: 95.95,
                                y: 71.98
                            },
                            {
                                x: 80.14,
                                y: 93.63
                            },
                            {
                                x: 66.45,
                                y: 122.36
                            }
                        ],
                        age: 31,
                        mask: {
                            probability: 1,
                            type: 0
                        }
                    }
                ];
                this.resultList = result;
                this.resultContent = result[0];
                this.face_token = result[0].face_token;
                result.forEach(item => {
                    let location = item.location;
                    _this.jcrop(
                        base,
                        location.left,
                        location.top,
                        location.width,
                        location.height,
                        100,
                        res => {
                            this.picList.push({face_token: item.face_token, base64: res});
                        }
                    );
                });
                //     }else{
                //         this.$Message.error('请求失败');
                //     }
                // }).catch(err=>{
                //     this.isloading=false;
                // });
            },
            upload(base) {
                let _this = this;
                // this.$axios({
                //     headers: {
                //         'Accept': '*/*',
                //         'Content-Type': 'multipart/form-data'
                //     },
                //     method: "post",
                //     url: window.config.url+"/ai/bdface/bddetect",
                //     params:{
                //     img_type:'BASE64',
                //     image_param:base,
                //     }
                // }).then(res => {
                this.isloading = false;
                //     if(res.data.code == 200000){
                // if(!res.data.data){
                //     this.$Message.error('返回数据为空');
                //     return;
                // }
                this.picList = [];
                let result = [
                    {
                        expression: {
                            probability: 0.58,
                            type: "smile"
                        },
                        face_shape: {
                            probability: 0.62,
                            type: "round"
                        },
                        beauty: 43.01,
                        gender: {
                            probability: 1,
                            type: "female"
                        },
                        race: {
                            probability: 1,
                            type: "yellow"
                        },
                        landmark150: {
                            eye_right_eyeball_right: {
                                x: 162.9,
                                y: 255.15
                            },
                            mouth_corner_right_inner: {
                                x: 188.52,
                                y: 317.38
                            },
                            cheek_right_1: {
                                x: 123.27,
                                y: 262.42
                            },
                            cheek_right_2: {
                                x: 126.03,
                                y: 273.28
                            },
                            cheek_right_3: {
                                x: 128.94,
                                y: 284.14
                            },
                            cheek_right_8: {
                                x: 157.54,
                                y: 336.97
                            },
                            cheek_right_9: {
                                x: 169.65,
                                y: 343.98
                            },
                            cheek_right_4: {
                                x: 132.65,
                                y: 295.05
                            },
                            cheek_right_5: {
                                x: 136.61,
                                y: 305.73
                            },
                            cheek_right_6: {
                                x: 141.44,
                                y: 316.96
                            },
                            cheek_right_7: {
                                x: 147.66,
                                y: 326.93
                            },
                            mouth_lip_lower_outer_1: {
                                x: 190.42,
                                y: 320.26
                            },
                            mouth_lip_lower_outer_2: {
                                x: 194.12,
                                y: 322.2
                            },
                            mouth_lip_lower_outer_3: {
                                x: 198.36,
                                y: 323.05
                            },
                            mouth_lip_lower_outer_4: {
                                x: 202.77,
                                y: 324.52
                            },
                            eye_right_corner_left: {
                                x: 182.28,
                                y: 256.4
                            },
                            mouth_lip_lower_outer_5: {
                                x: 207.15,
                                y: 324.69
                            },
                            mouth_corner_left_outer: {
                                x: 230.05,
                                y: 311.25
                            },
                            eyebrow_left_corner_left: {
                                x: 251.32,
                                y: 229.3
                            },
                            nose_left_contour_7: {
                                x: 216.82,
                                y: 286.67
                            },
                            cheek_right_11: {
                                x: 193.37,
                                y: 350.81
                            },
                            nose_left_contour_6: {
                                x: 216.44,
                                y: 290.26
                            },
                            eye_right_eyeball_center: {
                                x: 169.98,
                                y: 254.03
                            },
                            nose_left_contour_5: {
                                x: 219.96,
                                y: 293.36
                            },
                            nose_left_contour_4: {
                                x: 224.59,
                                y: 288.08
                            },
                            cheek_left_8: {
                                x: 261.03,
                                y: 317.04
                            },
                            cheek_left_7: {
                                x: 265.55,
                                y: 305.7
                            },
                            nose_left_contour_3: {
                                x: 218.42,
                                y: 276.11
                            },
                            cheek_right_10: {
                                x: 181.21,
                                y: 348.27
                            },
                            nose_left_contour_2: {
                                x: 214.2,
                                y: 265.04
                            },
                            cheek_left_9: {
                                x: 254.11,
                                y: 327.01
                            },
                            nose_left_contour_1: {
                                x: 209.93,
                                y: 253.92
                            },
                            mouth_lip_lower_outer_6: {
                                x: 211.53,
                                y: 323.6
                            },
                            cheek_left_4: {
                                x: 268.29,
                                y: 274.71
                            },
                            cheek_left_3: {
                                x: 268.46,
                                y: 264.53
                            },
                            mouth_lip_lower_outer_7: {
                                x: 215.95,
                                y: 323.17
                            },
                            cheek_left_6: {
                                x: 267.22,
                                y: 295.54
                            },
                            mouth_lip_lower_outer_8: {
                                x: 219.64,
                                y: 321.68
                            },
                            cheek_left_5: {
                                x: 267.96,
                                y: 285
                            },
                            mouth_lip_lower_outer_9: {
                                x: 222.79,
                                y: 319.22
                            },
                            cheek_left_2: {
                                x: 268.39,
                                y: 254.26
                            },
                            cheek_left_1: {
                                x: 268.03,
                                y: 244.05
                            },
                            mouth_lip_upper_inner_2: {
                                x: 194.45,
                                y: 314.84
                            },
                            mouth_lip_upper_inner_3: {
                                x: 198.53,
                                y: 313.79
                            },
                            mouth_lip_upper_inner_4: {
                                x: 202.28,
                                y: 312.73
                            },
                            mouth_lip_upper_inner_5: {
                                x: 205.9,
                                y: 312.19
                            },
                            mouth_corner_right_outer: {
                                x: 186.86,
                                y: 317.82
                            },
                            mouth_lip_upper_inner_6: {
                                x: 209.88,
                                y: 312.16
                            },
                            mouth_lip_upper_inner_7: {
                                x: 213.35,
                                y: 311.01
                            },
                            mouth_lip_upper_inner_8: {
                                x: 216.63,
                                y: 310.48
                            },
                            mouth_lip_upper_inner_9: {
                                x: 220.13,
                                y: 310.52
                            },
                            eyebrow_left_upper_1: {
                                x: 211.61,
                                y: 226.85
                            },
                            eyebrow_left_upper_2: {
                                x: 220.57,
                                y: 222.61
                            },
                            eyebrow_left_upper_5: {
                                x: 251.09,
                                y: 227.1
                            },
                            eyebrow_left_upper_3: {
                                x: 230.56,
                                y: 220.13
                            },
                            eye_left_eyeball_right: {
                                x: 223.48,
                                y: 248.9
                            },
                            eyebrow_left_upper_4: {
                                x: 241.51,
                                y: 221.09
                            },
                            mouth_lip_upper_inner_1: {
                                x: 190.72,
                                y: 316.12
                            },
                            mouth_lip_upper_outer_11: {
                                x: 227.42,
                                y: 308.88
                            },
                            mouth_lip_lower_inner_7: {
                                x: 213.72,
                                y: 315.09
                            },
                            mouth_lip_upper_outer_10: {
                                x: 224.24,
                                y: 307.11
                            },
                            mouth_lip_lower_inner_8: {
                                x: 216.84,
                                y: 314.46
                            },
                            mouth_lip_lower_inner_9: {
                                x: 220.03,
                                y: 313.66
                            },
                            mouth_lip_lower_inner_3: {
                                x: 199.17,
                                y: 317
                            },
                            mouth_lip_lower_inner_4: {
                                x: 203.02,
                                y: 316.67
                            },
                            mouth_lip_lower_inner_5: {
                                x: 206.53,
                                y: 316.23
                            },
                            mouth_lip_lower_inner_6: {
                                x: 210.24,
                                y: 315.8
                            },
                            eye_left_eyeball_center: {
                                x: 229.86,
                                y: 247.49
                            },
                            mouth_lip_lower_inner_1: {
                                x: 191.1,
                                y: 317.68
                            },
                            mouth_lip_lower_inner_2: {
                                x: 194.99,
                                y: 317.4
                            },
                            eye_right_corner_right: {
                                x: 154.22,
                                y: 256.9
                            },
                            mouth_lip_lower_outer_11: {
                                x: 228.12,
                                y: 314.32
                            },
                            mouth_lip_lower_outer_10: {
                                x: 225.93,
                                y: 317.05
                            },
                            eye_right_eyeball_left: {
                                x: 176.41,
                                y: 254
                            },
                            eyebrow_right_lower_2: {
                                x: 161.51,
                                y: 233.95
                            },
                            eyebrow_right_lower_1: {
                                x: 150.85,
                                y: 236.55
                            },
                            eyebrow_right_lower_3: {
                                x: 172.25,
                                y: 233.2
                            },
                            mouth_lip_upper_outer_9: {
                                x: 220.43,
                                y: 306.13
                            },
                            eye_left_corner_right: {
                                x: 218.41,
                                y: 252.44
                            },
                            mouth_lip_upper_outer_5: {
                                x: 204.84,
                                y: 306.66
                            },
                            mouth_lip_upper_outer_6: {
                                x: 209.26,
                                y: 306.76
                            },
                            mouth_lip_upper_outer_7: {
                                x: 212.99,
                                y: 305.39
                            },
                            mouth_lip_upper_outer_8: {
                                x: 216.74,
                                y: 305.06
                            },
                            eye_left_eyelid_lower_4: {
                                x: 232.81,
                                y: 252.92
                            },
                            nose_right_contour_6: {
                                x: 197.9,
                                y: 292.62
                            },
                            eye_left_eyelid_upper_5: {
                                x: 234.03,
                                y: 241.42
                            },
                            eye_left_eyelid_upper_4: {
                                x: 230.17,
                                y: 241.77
                            },
                            eye_left_eyelid_lower_3: {
                                x: 229.03,
                                y: 253.56
                            },
                            nose_right_contour_7: {
                                x: 196.67,
                                y: 289.31
                            },
                            eye_left_eyelid_lower_2: {
                                x: 225.12,
                                y: 253.36
                            },
                            nose_right_contour_4: {
                                x: 188.35,
                                y: 292.85
                            },
                            eye_left_eyelid_upper_7: {
                                x: 241.3,
                                y: 243.99
                            },
                            eye_left_eyelid_upper_6: {
                                x: 237.53,
                                y: 242.21
                            },
                            eye_left_eyelid_lower_1: {
                                x: 221.75,
                                y: 253.04
                            },
                            nose_right_contour_5: {
                                x: 194.64,
                                y: 296.73
                            },
                            eye_left_eyelid_upper_1: {
                                x: 220.1,
                                y: 248.06
                            },
                            mouth_lip_upper_outer_1: {
                                x: 189.76,
                                y: 314.61
                            },
                            eye_left_eyelid_lower_7: {
                                x: 241.87,
                                y: 248.61
                            },
                            mouth_lip_upper_outer_2: {
                                x: 193.16,
                                y: 311.93
                            },
                            eyebrow_right_corner_left: {
                                x: 183.1,
                                y: 232.12
                            },
                            eye_left_eyelid_lower_6: {
                                x: 239.55,
                                y: 250.34
                            },
                            mouth_lip_upper_outer_3: {
                                x: 197.16,
                                y: 309.83
                            },
                            eye_left_eyelid_upper_3: {
                                x: 226.42,
                                y: 242.73
                            },
                            eye_left_eyeball_left: {
                                x: 236.49,
                                y: 247.02
                            },
                            eye_left_eyelid_upper_2: {
                                x: 223.24,
                                y: 244.74
                            },
                            eye_left_eyelid_lower_5: {
                                x: 236.43,
                                y: 252.08
                            },
                            mouth_lip_upper_outer_4: {
                                x: 200.82,
                                y: 307.66
                            },
                            nose_tip: {
                                x: 207.44,
                                y: 283.43
                            },
                            chin_3: {
                                x: 225.91,
                                y: 347.86
                            },
                            chin_1: {
                                x: 204.37,
                                y: 351.98
                            },
                            chin_2: {
                                x: 215.44,
                                y: 351.01
                            },
                            eyebrow_right_upper_1: {
                                x: 140.3,
                                y: 239.62
                            },
                            eye_right_eyelid_lower_7: {
                                x: 179.16,
                                y: 257.65
                            },
                            eye_right_eyelid_lower_6: {
                                x: 176.05,
                                y: 258.75
                            },
                            eyebrow_right_upper_5: {
                                x: 182.79,
                                y: 228.73
                            },
                            eyebrow_right_upper_4: {
                                x: 171.91,
                                y: 226.47
                            },
                            eyebrow_right_upper_3: {
                                x: 160.42,
                                y: 226.53
                            },
                            eyebrow_right_upper_2: {
                                x: 148.9,
                                y: 230.58
                            },
                            mouth_corner_left_inner: {
                                x: 228.72,
                                y: 311.15
                            },
                            eye_right_eyelid_upper_2: {
                                x: 160.66,
                                y: 250.91
                            },
                            eye_right_eyelid_upper_1: {
                                x: 157.04,
                                y: 253.46
                            },
                            eye_right_eyelid_upper_4: {
                                x: 168.05,
                                y: 248.56
                            },
                            eye_right_eyelid_upper_3: {
                                x: 164.13,
                                y: 249.17
                            },
                            eye_right_eyelid_lower_1: {
                                x: 157.51,
                                y: 258.13
                            },
                            eye_left_corner_left: {
                                x: 244.18,
                                y: 246.69
                            },
                            eyebrow_left_corner_right: {
                                x: 212.02,
                                y: 230.33
                            },
                            eye_right_eyelid_lower_5: {
                                x: 172.38,
                                y: 259.81
                            },
                            mouth_lip_upper_inner_11: {
                                x: 226.75,
                                y: 310.63
                            },
                            eye_right_eyelid_lower_4: {
                                x: 168.5,
                                y: 260.12
                            },
                            eye_right_eyelid_lower_3: {
                                x: 164.52,
                                y: 260.16
                            },
                            eye_right_eyelid_lower_2: {
                                x: 160.63,
                                y: 259.22
                            },
                            mouth_lip_upper_inner_10: {
                                x: 223.69,
                                y: 310.44
                            },
                            mouth_lip_lower_inner_10: {
                                x: 223.63,
                                y: 312.86
                            },
                            mouth_lip_lower_inner_11: {
                                x: 226.71,
                                y: 312.19
                            },
                            eyebrow_left_lower_3: {
                                x: 241.41,
                                y: 227.49
                            },
                            cheek_left_10: {
                                x: 245.3,
                                y: 335.26
                            },
                            cheek_left_11: {
                                x: 235.2,
                                y: 342.56
                            },
                            eyebrow_left_lower_2: {
                                x: 231.56,
                                y: 227.72
                            },
                            eyebrow_left_lower_1: {
                                x: 221.83,
                                y: 229.22
                            },
                            nose_bridge_1: {
                                x: 201.74,
                                y: 254.61
                            },
                            nose_right_contour_2: {
                                x: 191.8,
                                y: 267.98
                            },
                            nose_right_contour_3: {
                                x: 191.49,
                                y: 279.88
                            },
                            nose_right_contour_1: {
                                x: 192.14,
                                y: 256.04
                            },
                            nose_bridge_2: {
                                x: 204.03,
                                y: 266.15
                            },
                            nose_bridge_3: {
                                x: 206.35,
                                y: 277.76
                            },
                            eyebrow_right_corner_right: {
                                x: 140.59,
                                y: 241.78
                            },
                            nose_middle_contour: {
                                x: 208,
                                y: 296.15
                            },
                            eye_right_eyelid_upper_6: {
                                x: 175.7,
                                y: 249.91
                            },
                            eye_right_eyelid_upper_5: {
                                x: 172.12,
                                y: 248.58
                            },
                            eye_right_eyelid_upper_7: {
                                x: 179.51,
                                y: 252.56
                            }
                        },
                        eye_status: {
                            right_eye: 1,
                            left_eye: 0.9999983311
                        },
                        face_probability: 1,
                        quality: {
                            illumination: 133,
                            occlusion: {
                                right_eye: 0,
                                nose: 0,
                                mouth: 0,
                                left_eye: 0,
                                left_cheek: 0,
                                chin_contour: 0.04,
                                right_cheek: 0.01
                            },
                            blur: 0,
                            completeness: 1
                        },
                        glasses: {
                            probability: 1,
                            type: "none"
                        },
                        emotion: {
                            probability: 0.98,
                            type: "happy"
                        },
                        landmark72: [
                            {
                                x: 125.44,
                                y: 258.95
                            },
                            {
                                x: 130.67,
                                y: 279.9
                            },
                            {
                                x: 137.6,
                                y: 300.88
                            },
                            {
                                x: 147.91,
                                y: 321.18
                            },
                            {
                                x: 168.2,
                                y: 338.35
                            },
                            {
                                x: 191.92,
                                y: 347.59
                            },
                            {
                                x: 214.06,
                                y: 348.42
                            },
                            {
                                x: 233.92,
                                y: 339.67
                            },
                            {
                                x: 252.24,
                                y: 322.96
                            },
                            {
                                x: 263.96,
                                y: 301.88
                            },
                            {
                                x: 267.67,
                                y: 281.04
                            },
                            {
                                x: 268.18,
                                y: 260.3
                            },
                            {
                                x: 266.84,
                                y: 240.15
                            },
                            {
                                x: 154.5,
                                y: 256.63
                            },
                            {
                                x: 161.02,
                                y: 251.07
                            },
                            {
                                x: 168.21,
                                y: 248.75
                            },
                            {
                                x: 175.66,
                                y: 249.9
                            },
                            {
                                x: 182.34,
                                y: 256.23
                            },
                            {
                                x: 176.06,
                                y: 258.44
                            },
                            {
                                x: 168.63,
                                y: 260.07
                            },
                            {
                                x: 160.94,
                                y: 259.33
                            },
                            {
                                x: 169.73,
                                y: 253.98
                            },
                            {
                                x: 140.95,
                                y: 240.21
                            },
                            {
                                x: 149.5,
                                y: 229.4
                            },
                            {
                                x: 161.15,
                                y: 226.04
                            },
                            {
                                x: 172.41,
                                y: 226.33
                            },
                            {
                                x: 183.03,
                                y: 232.39
                            },
                            {
                                x: 172.58,
                                y: 233.25
                            },
                            {
                                x: 161.84,
                                y: 233.66
                            },
                            {
                                x: 151.31,
                                y: 235.81
                            },
                            {
                                x: 219.11,
                                y: 252.21
                            },
                            {
                                x: 224.06,
                                y: 244.54
                            },
                            {
                                x: 230.91,
                                y: 241.74
                            },
                            {
                                x: 238.3,
                                y: 242.18
                            },
                            {
                                x: 245.05,
                                y: 246.31
                            },
                            {
                                x: 240.25,
                                y: 250.25
                            },
                            {
                                x: 233.51,
                                y: 252.68
                            },
                            {
                                x: 225.81,
                                y: 252.94
                            },
                            {
                                x: 229.78,
                                y: 247.17
                            },
                            {
                                x: 213.17,
                                y: 229.25
                            },
                            {
                                x: 221.55,
                                y: 220.88
                            },
                            {
                                x: 231.61,
                                y: 218.54
                            },
                            {
                                x: 242.49,
                                y: 219.16
                            },
                            {
                                x: 252.3,
                                y: 227.19
                            },
                            {
                                x: 242.59,
                                y: 225.55
                            },
                            {
                                x: 232.73,
                                y: 226.07
                            },
                            {
                                x: 222.9,
                                y: 227.66
                            },
                            {
                                x: 192.79,
                                y: 255.65
                            },
                            {
                                x: 192.42,
                                y: 267.64
                            },
                            {
                                x: 191.95,
                                y: 279.74
                            },
                            {
                                x: 189.65,
                                y: 293.34
                            },
                            {
                                x: 199.09,
                                y: 291.89
                            },
                            {
                                x: 215.39,
                                y: 289.9
                            },
                            {
                                x: 223.43,
                                y: 289.2
                            },
                            {
                                x: 217.99,
                                y: 276.44
                            },
                            {
                                x: 213.8,
                                y: 265
                            },
                            {
                                x: 210,
                                y: 253.63
                            },
                            {
                                x: 206.91,
                                y: 282.46
                            },
                            {
                                x: 188.7,
                                y: 316.95
                            },
                            {
                                x: 198.75,
                                y: 309.55
                            },
                            {
                                x: 209.96,
                                y: 307.14
                            },
                            {
                                x: 220.68,
                                y: 307.16
                            },
                            {
                                x: 229.63,
                                y: 312.18
                            },
                            {
                                x: 221.84,
                                y: 318.96
                            },
                            {
                                x: 211.29,
                                y: 322.57
                            },
                            {
                                x: 199.38,
                                y: 321.92
                            },
                            {
                                x: 200.01,
                                y: 314.06
                            },
                            {
                                x: 210.53,
                                y: 312.92
                            },
                            {
                                x: 220.14,
                                y: 311.93
                            },
                            {
                                x: 219.6,
                                y: 313.29
                            },
                            {
                                x: 210.09,
                                y: 314.22
                            },
                            {
                                x: 200.17,
                                y: 315.73
                            }
                        ],
                        face_type: {
                            probability: 1,
                            type: "human"
                        },
                        angle: {
                            roll: -7.88,
                            pitch: 7.19,
                            yaw: -4.98
                        },
                        face_token: "bc4eebacc7788c534e21fc353543b1c2",
                        location: {
                            top: 230.73,
                            left: 122.54,
                            rotation: -6,
                            width: 142,
                            height: 127
                        },
                        landmark: [
                            {
                                x: 169.73,
                                y: 253.98
                            },
                            {
                                x: 229.78,
                                y: 247.17
                            },
                            {
                                x: 206.91,
                                y: 282.46
                            },
                            {
                                x: 210.06,
                                y: 314.18
                            }
                        ],
                        age: 7,
                        mask: {
                            probability: 0.98,
                            type: 0
                        }
                    },
                    {
                        expression: {
                            probability: 1,
                            type: "none"
                        },
                        face_shape: {
                            probability: 0.38,
                            type: "square"
                        },
                        beauty: 41.65,
                        gender: {
                            probability: 1,
                            type: "female"
                        },
                        race: {
                            probability: 1,
                            type: "yellow"
                        },
                        landmark150: {
                            eye_right_eyeball_right: {
                                x: 721.01,
                                y: 163.93
                            },
                            mouth_corner_right_inner: {
                                x: 728.57,
                                y: 218.55
                            },
                            cheek_right_1: {
                                x: 692.83,
                                y: 168.16
                            },
                            cheek_right_2: {
                                x: 692.52,
                                y: 176.88
                            },
                            cheek_right_3: {
                                x: 691.97,
                                y: 185.52
                            },
                            cheek_right_8: {
                                x: 701.32,
                                y: 230.67
                            },
                            cheek_right_9: {
                                x: 708.51,
                                y: 238.89
                            },
                            cheek_right_4: {
                                x: 692.26,
                                y: 194.48
                            },
                            cheek_right_5: {
                                x: 692.6,
                                y: 203.12
                            },
                            cheek_right_6: {
                                x: 693.85,
                                y: 212.45
                            },
                            cheek_right_7: {
                                x: 696.26,
                                y: 220.97
                            },
                            mouth_lip_lower_outer_1: {
                                x: 729.54,
                                y: 221.15
                            },
                            mouth_lip_lower_outer_2: {
                                x: 731.89,
                                y: 223.19
                            },
                            mouth_lip_lower_outer_3: {
                                x: 734.86,
                                y: 224.62
                            },
                            mouth_lip_lower_outer_4: {
                                x: 738.02,
                                y: 226.34
                            },
                            eye_right_corner_left: {
                                x: 736.79,
                                y: 167.31
                            },
                            mouth_lip_lower_outer_5: {
                                x: 741.34,
                                y: 227.32
                            },
                            mouth_corner_left_outer: {
                                x: 764.94,
                                y: 223.75
                            },
                            eyebrow_left_corner_left: {
                                x: 798.89,
                                y: 158.26
                            },
                            nose_left_contour_7: {
                                x: 757.81,
                                y: 193.62
                            },
                            cheek_right_11: {
                                x: 724.7,
                                y: 250.8
                            },
                            nose_left_contour_6: {
                                x: 756.48,
                                y: 197.03
                            },
                            eye_right_eyeball_center: {
                                x: 726.64,
                                y: 164.13
                            },
                            nose_left_contour_5: {
                                x: 758.88,
                                y: 202.41
                            },
                            nose_left_contour_4: {
                                x: 764.6,
                                y: 199.25
                            },
                            cheek_left_8: {
                                x: 786.36,
                                y: 240.26
                            },
                            cheek_left_7: {
                                x: 793.09,
                                y: 232
                            },
                            nose_left_contour_3: {
                                x: 761.78,
                                y: 187.13
                            },
                            cheek_right_10: {
                                x: 716.01,
                                y: 245.48
                            },
                            nose_left_contour_2: {
                                x: 760.28,
                                y: 178.55
                            },
                            cheek_left_9: {
                                x: 777.94,
                                y: 247.02
                            },
                            nose_left_contour_1: {
                                x: 758.83,
                                y: 169.94
                            },
                            mouth_lip_lower_outer_6: {
                                x: 745.11,
                                y: 227.51
                            },
                            cheek_left_4: {
                                x: 803.65,
                                y: 206.86
                            },
                            cheek_left_3: {
                                x: 805.66,
                                y: 198.38
                            },
                            mouth_lip_lower_outer_7: {
                                x: 748.77,
                                y: 228.29
                            },
                            cheek_left_6: {
                                x: 797.72,
                                y: 224.03
                            },
                            mouth_lip_lower_outer_8: {
                                x: 752.29,
                                y: 228.4
                            },
                            cheek_left_5: {
                                x: 801.05,
                                y: 215.32
                            },
                            mouth_lip_lower_outer_9: {
                                x: 755.97,
                                y: 227.56
                            },
                            cheek_left_2: {
                                x: 807.19,
                                y: 189.82
                            },
                            cheek_left_1: {
                                x: 808.43,
                                y: 181.29
                            },
                            mouth_lip_upper_inner_2: {
                                x: 733.31,
                                y: 216.95
                            },
                            mouth_lip_upper_inner_3: {
                                x: 736.56,
                                y: 216.5
                            },
                            mouth_lip_upper_inner_4: {
                                x: 739.73,
                                y: 216.18
                            },
                            mouth_lip_upper_inner_5: {
                                x: 742.78,
                                y: 216.39
                            },
                            mouth_corner_right_outer: {
                                x: 727.41,
                                y: 218.64
                            },
                            mouth_lip_upper_inner_6: {
                                x: 746.01,
                                y: 217.22
                            },
                            mouth_lip_upper_inner_7: {
                                x: 749.44,
                                y: 217.44
                            },
                            mouth_lip_upper_inner_8: {
                                x: 752.64,
                                y: 218.11
                            },
                            mouth_lip_upper_inner_9: {
                                x: 755.79,
                                y: 219.32
                            },
                            eyebrow_left_upper_1: {
                                x: 766.98,
                                y: 148.41
                            },
                            eyebrow_left_upper_2: {
                                x: 775.05,
                                y: 146.76
                            },
                            eyebrow_left_upper_5: {
                                x: 799.04,
                                y: 156.43
                            },
                            eyebrow_left_upper_3: {
                                x: 783.95,
                                y: 146.92
                            },
                            eye_left_eyeball_right: {
                                x: 770.8,
                                y: 168.94
                            },
                            eyebrow_left_upper_4: {
                                x: 792.63,
                                y: 150.28
                            },
                            mouth_lip_upper_inner_1: {
                                x: 730.41,
                                y: 217.69
                            },
                            mouth_lip_upper_outer_11: {
                                x: 763.3,
                                y: 220.37
                            },
                            mouth_lip_lower_inner_7: {
                                x: 749.17,
                                y: 221.03
                            },
                            mouth_lip_upper_outer_10: {
                                x: 760.84,
                                y: 217.37
                            },
                            mouth_lip_lower_inner_8: {
                                x: 752.16,
                                y: 221.51
                            },
                            mouth_lip_lower_inner_9: {
                                x: 755.36,
                                y: 221.87
                            },
                            mouth_lip_lower_inner_3: {
                                x: 736.76,
                                y: 219.41
                            },
                            mouth_lip_lower_inner_4: {
                                x: 739.85,
                                y: 219.93
                            },
                            mouth_lip_lower_inner_5: {
                                x: 742.75,
                                y: 220.27
                            },
                            mouth_lip_lower_inner_6: {
                                x: 745.92,
                                y: 220.45
                            },
                            eye_left_eyeball_center: {
                                x: 776.07,
                                y: 169.01
                            },
                            mouth_lip_lower_inner_1: {
                                x: 730.59,
                                y: 219.08
                            },
                            mouth_lip_lower_inner_2: {
                                x: 733.51,
                                y: 219.28
                            },
                            eye_right_corner_right: {
                                x: 714.11,
                                y: 164.37
                            },
                            mouth_lip_lower_outer_11: {
                                x: 762.31,
                                y: 225.74
                            },
                            mouth_lip_lower_outer_10: {
                                x: 759.36,
                                y: 227.1
                            },
                            eye_right_eyeball_left: {
                                x: 732.21,
                                y: 165.09
                            },
                            eyebrow_right_lower_2: {
                                x: 722.65,
                                y: 145.86
                            },
                            eyebrow_right_lower_1: {
                                x: 714.18,
                                y: 146.61
                            },
                            eyebrow_right_lower_3: {
                                x: 731.3,
                                y: 146.85
                            },
                            mouth_lip_upper_outer_9: {
                                x: 757.63,
                                y: 214.94
                            },
                            eye_left_corner_right: {
                                x: 766.35,
                                y: 170.5
                            },
                            mouth_lip_upper_outer_5: {
                                x: 742.84,
                                y: 210.19
                            },
                            mouth_lip_upper_outer_6: {
                                x: 746.67,
                                y: 211.23
                            },
                            mouth_lip_upper_outer_7: {
                                x: 750.74,
                                y: 211.2
                            },
                            mouth_lip_upper_outer_8: {
                                x: 754.54,
                                y: 212.47
                            },
                            eye_left_eyelid_lower_4: {
                                x: 777.42,
                                y: 173.43
                            },
                            nose_right_contour_6: {
                                x: 740.95,
                                y: 195.2
                            },
                            eye_left_eyelid_upper_5: {
                                x: 781.1,
                                y: 165.04
                            },
                            eye_left_eyelid_upper_4: {
                                x: 777.79,
                                y: 164.5
                            },
                            eye_left_eyelid_lower_3: {
                                x: 774.25,
                                y: 173.29
                            },
                            nose_right_contour_7: {
                                x: 740.67,
                                y: 191.73
                            },
                            eye_left_eyelid_lower_2: {
                                x: 771.28,
                                y: 172.34
                            },
                            nose_right_contour_4: {
                                x: 733.2,
                                y: 195.03
                            },
                            eye_left_eyelid_upper_7: {
                                x: 786.93,
                                y: 168.8
                            },
                            eye_left_eyelid_upper_6: {
                                x: 783.95,
                                y: 166.58
                            },
                            eye_left_eyelid_lower_1: {
                                x: 768.66,
                                y: 171.61
                            },
                            nose_right_contour_5: {
                                x: 737.6,
                                y: 199.41
                            },
                            eye_left_eyelid_upper_1: {
                                x: 768.4,
                                y: 167.39
                            },
                            mouth_lip_upper_outer_1: {
                                x: 729.72,
                                y: 216.04
                            },
                            eye_left_eyelid_lower_7: {
                                x: 786.37,
                                y: 172.56
                            },
                            mouth_lip_upper_outer_2: {
                                x: 732.48,
                                y: 213.76
                            },
                            eyebrow_right_corner_left: {
                                x: 739.95,
                                y: 147.74
                            },
                            eye_left_eyelid_lower_6: {
                                x: 783.76,
                                y: 173.11
                            },
                            mouth_lip_upper_outer_3: {
                                x: 735.86,
                                y: 212.12
                            },
                            eye_left_eyelid_upper_3: {
                                x: 774.52,
                                y: 164.41
                            },
                            eye_left_eyeball_left: {
                                x: 782.02,
                                y: 169.89
                            },
                            eye_left_eyelid_upper_2: {
                                x: 771.58,
                                y: 165.35
                            },
                            eye_left_eyelid_lower_5: {
                                x: 780.68,
                                y: 173.74
                            },
                            mouth_lip_upper_outer_4: {
                                x: 739.15,
                                y: 210.61
                            },
                            nose_tip: {
                                x: 750.1,
                                y: 187.61
                            },
                            chin_3: {
                                x: 750.63,
                                y: 257.46
                            },
                            chin_1: {
                                x: 732.52,
                                y: 254.96
                            },
                            chin_2: {
                                x: 741.57,
                                y: 257.11
                            },
                            eyebrow_right_upper_1: {
                                x: 706.27,
                                y: 147.52
                            },
                            eye_right_eyelid_lower_7: {
                                x: 734.04,
                                y: 168.03
                            },
                            eye_right_eyelid_lower_6: {
                                x: 731.26,
                                y: 168.35
                            },
                            eyebrow_right_upper_5: {
                                x: 740.28,
                                y: 144.8
                            },
                            eyebrow_right_upper_4: {
                                x: 732.05,
                                y: 141.63
                            },
                            eyebrow_right_upper_3: {
                                x: 722.91,
                                y: 140.26
                            },
                            eyebrow_right_upper_2: {
                                x: 713.65,
                                y: 142.18
                            },
                            mouth_corner_left_inner: {
                                x: 763.8,
                                y: 223.23
                            },
                            eye_right_eyelid_upper_2: {
                                x: 719.92,
                                y: 160.37
                            },
                            eye_right_eyelid_upper_1: {
                                x: 716.7,
                                y: 162.01
                            },
                            eye_right_eyelid_upper_4: {
                                x: 726.19,
                                y: 159.53
                            },
                            eye_right_eyelid_upper_3: {
                                x: 722.91,
                                y: 159.45
                            },
                            eye_right_eyelid_lower_1: {
                                x: 716.48,
                                y: 165.67
                            },
                            eye_left_corner_left: {
                                x: 789.07,
                                y: 171.75
                            },
                            eyebrow_left_corner_right: {
                                x: 766.69,
                                y: 151.49
                            },
                            eye_right_eyelid_lower_5: {
                                x: 728.11,
                                y: 168.74
                            },
                            mouth_lip_upper_inner_11: {
                                x: 762.06,
                                y: 221.94
                            },
                            eye_right_eyelid_lower_4: {
                                x: 724.94,
                                y: 168.31
                            },
                            eye_right_eyelid_lower_3: {
                                x: 721.76,
                                y: 167.99
                            },
                            eye_right_eyelid_lower_2: {
                                x: 718.94,
                                y: 166.76
                            },
                            mouth_lip_upper_inner_10: {
                                x: 759.17,
                                y: 220.55
                            },
                            mouth_lip_lower_inner_10: {
                                x: 758.69,
                                y: 222.73
                            },
                            mouth_lip_lower_inner_11: {
                                x: 761.69,
                                y: 223.39
                            },
                            eyebrow_left_lower_3: {
                                x: 791.44,
                                y: 154.65
                            },
                            cheek_left_10: {
                                x: 769.17,
                                y: 252.29
                            },
                            cheek_left_11: {
                                x: 759.32,
                                y: 255.56
                            },
                            eyebrow_left_lower_2: {
                                x: 783.32,
                                y: 152.68
                            },
                            eyebrow_left_lower_1: {
                                x: 774.93,
                                y: 152.08
                            },
                            nose_bridge_1: {
                                x: 751.9,
                                y: 168.93
                            },
                            nose_right_contour_2: {
                                x: 741.37,
                                y: 176.28
                            },
                            nose_right_contour_3: {
                                x: 738.68,
                                y: 184.27
                            },
                            nose_right_contour_1: {
                                x: 744.12,
                                y: 168.3
                            },
                            nose_bridge_2: {
                                x: 751.17,
                                y: 177.27
                            },
                            nose_bridge_3: {
                                x: 750.48,
                                y: 185.53
                            },
                            eyebrow_right_corner_right: {
                                x: 706.21,
                                y: 149.45
                            },
                            nose_middle_contour: {
                                x: 748.23,
                                y: 200.55
                            },
                            eye_right_eyelid_upper_6: {
                                x: 732.17,
                                y: 161.53
                            },
                            eye_right_eyelid_upper_5: {
                                x: 729.44,
                                y: 160.01
                            },
                            eye_right_eyelid_upper_7: {
                                x: 735,
                                y: 163.97
                            }
                        },
                        eye_status: {
                            right_eye: 1,
                            left_eye: 0.9999998808
                        },
                        face_probability: 1,
                        quality: {
                            illumination: 145,
                            occlusion: {
                                right_eye: 0.02,
                                nose: 0,
                                mouth: 0,
                                left_eye: 0.18,
                                left_cheek: 0.04,
                                chin_contour: 0.07,
                                right_cheek: 0.04
                            },
                            blur: 0,
                            completeness: 1
                        },
                        glasses: {
                            probability: 1,
                            type: "none"
                        },
                        emotion: {
                            probability: 0.38,
                            type: "happy"
                        },
                        landmark72: [
                            {
                                x: 692.37,
                                y: 167.9
                            },
                            {
                                x: 691.92,
                                y: 185.73
                            },
                            {
                                x: 693.05,
                                y: 203.62
                            },
                            {
                                x: 696.54,
                                y: 221.45
                            },
                            {
                                x: 708.08,
                                y: 239.38
                            },
                            {
                                x: 725.4,
                                y: 251.02
                            },
                            {
                                x: 742.89,
                                y: 255.2
                            },
                            {
                                x: 760.65,
                                y: 252.33
                            },
                            {
                                x: 778.32,
                                y: 242.28
                            },
                            {
                                x: 791.43,
                                y: 227.4
                            },
                            {
                                x: 798.32,
                                y: 211.22
                            },
                            {
                                x: 802.92,
                                y: 194.68
                            },
                            {
                                x: 805.51,
                                y: 177.96
                            },
                            {
                                x: 713.23,
                                y: 164.03
                            },
                            {
                                x: 719.15,
                                y: 160.24
                            },
                            {
                                x: 725.35,
                                y: 159.52
                            },
                            {
                                x: 731.14,
                                y: 161.48
                            },
                            {
                                x: 735.84,
                                y: 167.11
                            },
                            {
                                x: 730.29,
                                y: 167.81
                            },
                            {
                                x: 724.1,
                                y: 167.74
                            },
                            {
                                x: 718.12,
                                y: 166.37
                            },
                            {
                                x: 725.58,
                                y: 163.52
                            },
                            {
                                x: 706.38,
                                y: 149.19
                            },
                            {
                                x: 714.37,
                                y: 141.7
                            },
                            {
                                x: 723.98,
                                y: 140.64
                            },
                            {
                                x: 733,
                                y: 142.5
                            },
                            {
                                x: 740.38,
                                y: 149.01
                            },
                            {
                                x: 731.86,
                                y: 147.9
                            },
                            {
                                x: 723.28,
                                y: 146.45
                            },
                            {
                                x: 714.67,
                                y: 146.79
                            },
                            {
                                x: 767.21,
                                y: 170.04
                            },
                            {
                                x: 772.92,
                                y: 165.2
                            },
                            {
                                x: 778.96,
                                y: 164.38
                            },
                            {
                                x: 784.79,
                                y: 165.99
                            },
                            {
                                x: 789.61,
                                y: 170.64
                            },
                            {
                                x: 784.7,
                                y: 172.44
                            },
                            {
                                x: 778.8,
                                y: 172.68
                            },
                            {
                                x: 772.63,
                                y: 171.58
                            },
                            {
                                x: 777.42,
                                y: 168.11
                            },
                            {
                                x: 767.04,
                                y: 151.61
                            },
                            {
                                x: 775.33,
                                y: 146.17
                            },
                            {
                                x: 783.97,
                                y: 145.99
                            },
                            {
                                x: 792.76,
                                y: 148.65
                            },
                            {
                                x: 798.72,
                                y: 157.07
                            },
                            {
                                x: 791.52,
                                y: 153.37
                            },
                            {
                                x: 783.69,
                                y: 151.95
                            },
                            {
                                x: 775.34,
                                y: 151.8
                            },
                            {
                                x: 744.24,
                                y: 168.03
                            },
                            {
                                x: 741.64,
                                y: 176.53
                            },
                            {
                                x: 738.81,
                                y: 185.22
                            },
                            {
                                x: 733.72,
                                y: 196.21
                            },
                            {
                                x: 742.48,
                                y: 195.8
                            },
                            {
                                x: 757.2,
                                y: 197.22
                            },
                            {
                                x: 764.24,
                                y: 198.98
                            },
                            {
                                x: 761.86,
                                y: 187.28
                            },
                            {
                                x: 760.53,
                                y: 178.35
                            },
                            {
                                x: 759.28,
                                y: 169.36
                            },
                            {
                                x: 751.18,
                                y: 188.5
                            },
                            {
                                x: 726.47,
                                y: 218.41
                            },
                            {
                                x: 736.85,
                                y: 212.68
                            },
                            {
                                x: 748.15,
                                y: 212.05
                            },
                            {
                                x: 758.7,
                                y: 214.77
                            },
                            {
                                x: 765.71,
                                y: 222.22
                            },
                            {
                                x: 757.14,
                                y: 226.81
                            },
                            {
                                x: 746.57,
                                y: 228.02
                            },
                            {
                                x: 735.1,
                                y: 224.99
                            },
                            {
                                x: 737.18,
                                y: 217.16
                            },
                            {
                                x: 747.59,
                                y: 217.78
                            },
                            {
                                x: 757.36,
                                y: 219.12
                            },
                            {
                                x: 756.69,
                                y: 221.56
                            },
                            {
                                x: 747.08,
                                y: 220.78
                            },
                            {
                                x: 736.88,
                                y: 219.71
                            }
                        ],
                        face_type: {
                            probability: 1,
                            type: "human"
                        },
                        angle: {
                            roll: 2.89,
                            pitch: 2.56,
                            yaw: 1.51
                        },
                        face_token: "a4102f22db6300b7e6be90441f81c909",
                        location: {
                            top: 138.4,
                            left: 695.22,
                            rotation: 4,
                            width: 113,
                            height: 112
                        },
                        landmark: [
                            {
                                x: 725.58,
                                y: 163.52
                            },
                            {
                                x: 777.42,
                                y: 168.11
                            },
                            {
                                x: 751.18,
                                y: 188.5
                            },
                            {
                                x: 746.96,
                                y: 219.72
                            }
                        ],
                        age: 19,
                        mask: {
                            probability: 0.99,
                            type: 0
                        }
                    },
                    {
                        expression: {
                            probability: 1,
                            type: "none"
                        },
                        face_shape: {
                            probability: 0.36,
                            type: "square"
                        },
                        beauty: 47.89,
                        gender: {
                            probability: 1,
                            type: "female"
                        },
                        race: {
                            probability: 1,
                            type: "yellow"
                        },
                        landmark150: {
                            eye_right_eyeball_right: {
                                x: 398.46,
                                y: 176.26
                            },
                            mouth_corner_right_inner: {
                                x: 406.15,
                                y: 210.73
                            },
                            cheek_right_1: {
                                x: 382.71,
                                y: 178.92
                            },
                            cheek_right_2: {
                                x: 383.27,
                                y: 184.49
                            },
                            cheek_right_3: {
                                x: 383.92,
                                y: 189.98
                            },
                            cheek_right_8: {
                                x: 391.84,
                                y: 218.03
                            },
                            cheek_right_9: {
                                x: 395.88,
                                y: 223.18
                            },
                            cheek_right_4: {
                                x: 384.96,
                                y: 195.51
                            },
                            cheek_right_5: {
                                x: 386.06,
                                y: 201.05
                            },
                            cheek_right_6: {
                                x: 387.37,
                                y: 206.64
                            },
                            cheek_right_7: {
                                x: 388.91,
                                y: 212.08
                            },
                            mouth_lip_lower_outer_1: {
                                x: 407.16,
                                y: 211.9
                            },
                            mouth_lip_lower_outer_2: {
                                x: 409.02,
                                y: 212.65
                            },
                            mouth_lip_lower_outer_3: {
                                x: 411.2,
                                y: 213
                            },
                            mouth_lip_lower_outer_4: {
                                x: 413.34,
                                y: 213.62
                            },
                            eye_right_corner_left: {
                                x: 408.28,
                                y: 177.74
                            },
                            mouth_lip_lower_outer_5: {
                                x: 415.39,
                                y: 213.82
                            },
                            mouth_corner_left_outer: {
                                x: 431.43,
                                y: 210.81
                            },
                            eyebrow_left_corner_left: {
                                x: 446.93,
                                y: 166.68
                            },
                            nose_left_contour_7: {
                                x: 422.46,
                                y: 194.98
                            },
                            cheek_right_11: {
                                x: 406.88,
                                y: 230.43
                            },
                            nose_left_contour_6: {
                                x: 422.07,
                                y: 197.1
                            },
                            eye_right_eyeball_center: {
                                x: 401.63,
                                y: 176.03
                            },
                            nose_left_contour_5: {
                                x: 424.21,
                                y: 199.75
                            },
                            nose_left_contour_4: {
                                x: 427.37,
                                y: 197.19
                            },
                            cheek_left_8: {
                                x: 446.94,
                                y: 220.31
                            },
                            cheek_left_7: {
                                x: 450.75,
                                y: 214.03
                            },
                            nose_left_contour_3: {
                                x: 424.74,
                                y: 190.12
                            },
                            cheek_right_10: {
                                x: 400.96,
                                y: 227.28
                            },
                            nose_left_contour_2: {
                                x: 423.55,
                                y: 184.09
                            },
                            cheek_left_9: {
                                x: 441.76,
                                y: 225.33
                            },
                            nose_left_contour_1: {
                                x: 422.39,
                                y: 178.02
                            },
                            mouth_lip_lower_outer_6: {
                                x: 417.65,
                                y: 213.62
                            },
                            cheek_left_4: {
                                x: 455.5,
                                y: 196.27
                            },
                            cheek_left_3: {
                                x: 456.47,
                                y: 190.36
                            },
                            mouth_lip_lower_outer_7: {
                                x: 419.97,
                                y: 213.8
                            },
                            cheek_left_6: {
                                x: 452.91,
                                y: 208.3
                            },
                            mouth_lip_lower_outer_8: {
                                x: 422.18,
                                y: 213.66
                            },
                            cheek_left_5: {
                                x: 454.4,
                                y: 202.16
                            },
                            mouth_lip_lower_outer_9: {
                                x: 424.54,
                                y: 213.08
                            },
                            cheek_left_2: {
                                x: 457.06,
                                y: 184.44
                            },
                            cheek_left_1: {
                                x: 457.56,
                                y: 178.51
                            },
                            mouth_lip_upper_inner_2: {
                                x: 409.07,
                                y: 209.96
                            },
                            mouth_lip_upper_inner_3: {
                                x: 411.14,
                                y: 209.7
                            },
                            mouth_lip_upper_inner_4: {
                                x: 413.31,
                                y: 209.5
                            },
                            mouth_lip_upper_inner_5: {
                                x: 415.32,
                                y: 209.49
                            },
                            mouth_corner_right_outer: {
                                x: 405.27,
                                y: 210.87
                            },
                            mouth_lip_upper_inner_6: {
                                x: 417.5,
                                y: 209.71
                            },
                            mouth_lip_upper_inner_7: {
                                x: 419.77,
                                y: 209.57
                            },
                            mouth_lip_upper_inner_8: {
                                x: 421.95,
                                y: 209.57
                            },
                            mouth_lip_upper_inner_9: {
                                x: 424.33,
                                y: 209.73
                            },
                            eyebrow_left_upper_1: {
                                x: 425.27,
                                y: 164.61
                            },
                            eyebrow_left_upper_2: {
                                x: 430.24,
                                y: 162.55
                            },
                            eyebrow_left_upper_5: {
                                x: 446.85,
                                y: 165.35
                            },
                            eyebrow_left_upper_3: {
                                x: 435.65,
                                y: 161.55
                            },
                            eye_left_eyeball_right: {
                                x: 431.14,
                                y: 176.13
                            },
                            eyebrow_left_upper_4: {
                                x: 441.68,
                                y: 162.27
                            },
                            mouth_lip_upper_inner_1: {
                                x: 407.26,
                                y: 210.3
                            },
                            mouth_lip_upper_outer_11: {
                                x: 429.34,
                                y: 209.39
                            },
                            mouth_lip_lower_inner_7: {
                                x: 419.85,
                                y: 210.53
                            },
                            mouth_lip_upper_outer_10: {
                                x: 427.08,
                                y: 208.27
                            },
                            mouth_lip_lower_inner_8: {
                                x: 421.94,
                                y: 210.58
                            },
                            mouth_lip_lower_inner_9: {
                                x: 424.19,
                                y: 210.61
                            },
                            mouth_lip_lower_inner_3: {
                                x: 411.47,
                                y: 210.65
                            },
                            mouth_lip_lower_inner_4: {
                                x: 413.56,
                                y: 210.62
                            },
                            mouth_lip_lower_inner_5: {
                                x: 415.49,
                                y: 210.6
                            },
                            mouth_lip_lower_inner_6: {
                                x: 417.62,
                                y: 210.57
                            },
                            eye_left_eyeball_center: {
                                x: 434.26,
                                y: 175.75
                            },
                            mouth_lip_lower_inner_1: {
                                x: 407.42,
                                y: 210.98
                            },
                            mouth_lip_lower_inner_2: {
                                x: 409.29,
                                y: 210.83
                            },
                            eye_right_corner_right: {
                                x: 394.34,
                                y: 176.98
                            },
                            mouth_lip_lower_outer_11: {
                                x: 429.26,
                                y: 211.95
                            },
                            mouth_lip_lower_outer_10: {
                                x: 427.01,
                                y: 212.77
                            },
                            eye_right_eyeball_left: {
                                x: 404.84,
                                y: 176.36
                            },
                            eyebrow_right_lower_2: {
                                x: 399.72,
                                y: 165.63
                            },
                            eyebrow_right_lower_1: {
                                x: 394.51,
                                y: 165.76
                            },
                            eyebrow_right_lower_3: {
                                x: 404.93,
                                y: 166.29
                            },
                            mouth_lip_upper_outer_9: {
                                x: 424.59,
                                y: 207.5
                            },
                            eye_left_corner_right: {
                                x: 427.6,
                                y: 177.65
                            },
                            mouth_lip_upper_outer_5: {
                                x: 415.06,
                                y: 206.43
                            },
                            mouth_lip_upper_outer_6: {
                                x: 417.37,
                                y: 206.89
                            },
                            mouth_lip_upper_outer_7: {
                                x: 419.84,
                                y: 206.47
                            },
                            mouth_lip_upper_outer_8: {
                                x: 422.24,
                                y: 206.64
                            },
                            eye_left_eyelid_lower_4: {
                                x: 434.9,
                                y: 178.48
                            },
                            nose_right_contour_6: {
                                x: 412.31,
                                y: 197.19
                            },
                            eye_left_eyelid_upper_5: {
                                x: 436.67,
                                y: 173.24
                            },
                            eye_left_eyelid_upper_4: {
                                x: 434.57,
                                y: 173.16
                            },
                            eye_left_eyelid_lower_3: {
                                x: 432.9,
                                y: 178.58
                            },
                            nose_right_contour_7: {
                                x: 411.85,
                                y: 195.1
                            },
                            eye_left_eyelid_lower_2: {
                                x: 431.01,
                                y: 178.26
                            },
                            nose_right_contour_4: {
                                x: 407.84,
                                y: 197.19
                            },
                            eye_left_eyelid_upper_7: {
                                x: 440.62,
                                y: 175.01
                            },
                            eye_left_eyelid_upper_6: {
                                x: 438.59,
                                y: 173.93
                            },
                            eye_left_eyelid_lower_1: {
                                x: 429.29,
                                y: 177.98
                            },
                            nose_right_contour_5: {
                                x: 410.61,
                                y: 199.61
                            },
                            eye_left_eyelid_upper_1: {
                                x: 428.88,
                                y: 175.71
                            },
                            mouth_lip_upper_outer_1: {
                                x: 406.83,
                                y: 209.45
                            },
                            eye_left_eyelid_lower_7: {
                                x: 440.56,
                                y: 177.3
                            },
                            mouth_lip_upper_outer_2: {
                                x: 408.61,
                                y: 208.3
                            },
                            eyebrow_right_corner_left: {
                                x: 410.15,
                                y: 166.62
                            },
                            eye_left_eyelid_lower_6: {
                                x: 438.91,
                                y: 177.87
                            },
                            mouth_lip_upper_outer_3: {
                                x: 410.75,
                                y: 207.48
                            },
                            eye_left_eyelid_upper_3: {
                                x: 432.49,
                                y: 173.4
                            },
                            eye_left_eyeball_left: {
                                x: 437.72,
                                y: 175.94
                            },
                            eye_left_eyelid_upper_2: {
                                x: 430.74,
                                y: 174.24
                            },
                            eye_left_eyelid_lower_5: {
                                x: 436.96,
                                y: 178.43
                            },
                            mouth_lip_upper_outer_4: {
                                x: 412.84,
                                y: 206.62
                            },
                            nose_tip: {
                                x: 416.73,
                                y: 192.28
                            },
                            chin_3: {
                                x: 423.94,
                                y: 232.81
                            },
                            chin_1: {
                                x: 412.13,
                                y: 232.25
                            },
                            chin_2: {
                                x: 417.86,
                                y: 232.96
                            },
                            eyebrow_right_upper_1: {
                                x: 389.68,
                                y: 166.05
                            },
                            eye_right_eyelid_lower_7: {
                                x: 406.46,
                                y: 178.18
                            },
                            eye_right_eyelid_lower_6: {
                                x: 404.69,
                                y: 178.54
                            },
                            eyebrow_right_upper_5: {
                                x: 410.23,
                                y: 164.69
                            },
                            eyebrow_right_upper_4: {
                                x: 405.34,
                                y: 162.79
                            },
                            eyebrow_right_upper_3: {
                                x: 399.96,
                                y: 161.76
                            },
                            eyebrow_right_upper_2: {
                                x: 394.21,
                                y: 162.52
                            },
                            mouth_corner_left_inner: {
                                x: 430.42,
                                y: 210.68
                            },
                            eye_right_eyelid_upper_2: {
                                x: 397.39,
                                y: 174.25
                            },
                            eye_right_eyelid_upper_1: {
                                x: 395.64,
                                y: 175.4
                            },
                            eye_right_eyelid_upper_4: {
                                x: 401.13,
                                y: 173.49
                            },
                            eye_right_eyelid_upper_3: {
                                x: 399.15,
                                y: 173.6
                            },
                            eye_right_eyelid_lower_1: {
                                x: 395.74,
                                y: 177.66
                            },
                            eye_left_corner_left: {
                                x: 442.27,
                                y: 176.58
                            },
                            eyebrow_left_corner_right: {
                                x: 425.43,
                                y: 166.48
                            },
                            eye_right_eyelid_lower_5: {
                                x: 402.78,
                                y: 178.89
                            },
                            mouth_lip_upper_inner_11: {
                                x: 429.01,
                                y: 210.24
                            },
                            eye_right_eyelid_lower_4: {
                                x: 400.82,
                                y: 178.83
                            },
                            eye_right_eyelid_lower_3: {
                                x: 398.93,
                                y: 178.76
                            },
                            eye_right_eyelid_lower_2: {
                                x: 397.18,
                                y: 178.23
                            },
                            mouth_lip_upper_inner_10: {
                                x: 426.76,
                                y: 209.95
                            },
                            mouth_lip_lower_inner_10: {
                                x: 426.67,
                                y: 210.8
                            },
                            mouth_lip_lower_inner_11: {
                                x: 428.94,
                                y: 210.96
                            },
                            eyebrow_left_lower_3: {
                                x: 441.45,
                                y: 165.52
                            },
                            cheek_left_10: {
                                x: 436.16,
                                y: 228.97
                            },
                            cheek_left_11: {
                                x: 429.71,
                                y: 231.37
                            },
                            eyebrow_left_lower_2: {
                                x: 435.94,
                                y: 165.46
                            },
                            eyebrow_left_lower_1: {
                                x: 430.69,
                                y: 166.12
                            },
                            nose_bridge_1: {
                                x: 417.39,
                                y: 178.06
                            },
                            nose_right_contour_2: {
                                x: 411.52,
                                y: 184.04
                            },
                            nose_right_contour_3: {
                                x: 410.2,
                                y: 190.06
                            },
                            nose_right_contour_1: {
                                x: 412.86,
                                y: 177.98
                            },
                            nose_bridge_2: {
                                x: 417.17,
                                y: 184.05
                            },
                            nose_bridge_3: {
                                x: 416.94,
                                y: 190.01
                            },
                            eyebrow_right_corner_right: {
                                x: 389.64,
                                y: 167.33
                            },
                            nose_middle_contour: {
                                x: 417.19,
                                y: 199.9
                            },
                            eye_right_eyelid_upper_6: {
                                x: 404.94,
                                y: 174.48
                            },
                            eye_right_eyelid_upper_5: {
                                x: 403.17,
                                y: 173.67
                            },
                            eye_right_eyelid_upper_7: {
                                x: 406.86,
                                y: 175.83
                            }
                        },
                        eye_status: {
                            right_eye: 1,
                            left_eye: 0.9999998808
                        },
                        face_probability: 1,
                        quality: {
                            illumination: 156,
                            occlusion: {
                                right_eye: 0,
                                nose: 0,
                                mouth: 0,
                                left_eye: 0,
                                left_cheek: 0.01,
                                chin_contour: 0,
                                right_cheek: 0.02
                            },
                            blur: 0,
                            completeness: 1
                        },
                        glasses: {
                            probability: 1,
                            type: "none"
                        },
                        emotion: {
                            probability: 0.4,
                            type: "happy"
                        },
                        landmark72: [
                            {
                                x: 382.93,
                                y: 178.34
                            },
                            {
                                x: 383.66,
                                y: 189.5
                            },
                            {
                                x: 385.43,
                                y: 200.78
                            },
                            {
                                x: 388.32,
                                y: 211.94
                            },
                            {
                                x: 395.68,
                                y: 223
                            },
                            {
                                x: 406.89,
                                y: 230.74
                            },
                            {
                                x: 418.29,
                                y: 233.17
                            },
                            {
                                x: 430.15,
                                y: 230.99
                            },
                            {
                                x: 442.18,
                                y: 224.01
                            },
                            {
                                x: 451.01,
                                y: 212.82
                            },
                            {
                                x: 454.51,
                                y: 200.97
                            },
                            {
                                x: 456.22,
                                y: 189.1
                            },
                            {
                                x: 457.07,
                                y: 177.25
                            },
                            {
                                x: 393.97,
                                y: 176.64
                            },
                            {
                                x: 397.33,
                                y: 174.05
                            },
                            {
                                x: 401.13,
                                y: 173.25
                            },
                            {
                                x: 404.94,
                                y: 174.11
                            },
                            {
                                x: 408.37,
                                y: 177.49
                            },
                            {
                                x: 404.8,
                                y: 178.19
                            },
                            {
                                x: 400.81,
                                y: 178.5
                            },
                            {
                                x: 397,
                                y: 177.99
                            },
                            {
                                x: 401.93,
                                y: 175.66
                            },
                            {
                                x: 388.63,
                                y: 167.82
                            },
                            {
                                x: 393.14,
                                y: 162.64
                            },
                            {
                                x: 399.07,
                                y: 161.68
                            },
                            {
                                x: 404.76,
                                y: 162.46
                            },
                            {
                                x: 409.88,
                                y: 166.31
                            },
                            {
                                x: 404.38,
                                y: 166.11
                            },
                            {
                                x: 398.95,
                                y: 165.68
                            },
                            {
                                x: 393.62,
                                y: 166.15
                            },
                            {
                                x: 428.03,
                                y: 177.27
                            },
                            {
                                x: 431.4,
                                y: 173.88
                            },
                            {
                                x: 435.11,
                                y: 172.93
                            },
                            {
                                x: 438.99,
                                y: 173.51
                            },
                            {
                                x: 442.59,
                                y: 176.02
                            },
                            {
                                x: 439.42,
                                y: 177.49
                            },
                            {
                                x: 435.52,
                                y: 178.15
                            },
                            {
                                x: 431.56,
                                y: 177.84
                            },
                            {
                                x: 434.99,
                                y: 175.31
                            },
                            {
                                x: 425.64,
                                y: 166.14
                            },
                            {
                                x: 430.69,
                                y: 162.11
                            },
                            {
                                x: 436.47,
                                y: 161.28
                            },
                            {
                                x: 442.66,
                                y: 162.03
                            },
                            {
                                x: 447.87,
                                y: 166.92
                            },
                            {
                                x: 442.37,
                                y: 165.41
                            },
                            {
                                x: 436.75,
                                y: 165.18
                            },
                            {
                                x: 431.2,
                                y: 165.81
                            },
                            {
                                x: 413.16,
                                y: 177.62
                            },
                            {
                                x: 411.92,
                                y: 183.67
                            },
                            {
                                x: 410.61,
                                y: 189.84
                            },
                            {
                                x: 408.44,
                                y: 197.17
                            },
                            {
                                x: 413.29,
                                y: 196.83
                            },
                            {
                                x: 422.82,
                                y: 196.54
                            },
                            {
                                x: 427.82,
                                y: 196.81
                            },
                            {
                                x: 425.38,
                                y: 189.55
                            },
                            {
                                x: 424.01,
                                y: 183.54
                            },
                            {
                                x: 422.71,
                                y: 177.5
                            },
                            {
                                x: 417.51,
                                y: 191.74
                            },
                            {
                                x: 405.81,
                                y: 210.58
                            },
                            {
                                x: 411.38,
                                y: 207.04
                            },
                            {
                                x: 417.98,
                                y: 206.44
                            },
                            {
                                x: 424.9,
                                y: 207.03
                            },
                            {
                                x: 430.95,
                                y: 210.5
                            },
                            {
                                x: 424.89,
                                y: 213.27
                            },
                            {
                                x: 418.19,
                                y: 214.41
                            },
                            {
                                x: 411.41,
                                y: 213.49
                            },
                            {
                                x: 411.79,
                                y: 209.93
                            },
                            {
                                x: 418.04,
                                y: 209.91
                            },
                            {
                                x: 424.39,
                                y: 209.92
                            },
                            {
                                x: 424.29,
                                y: 209.99
                            },
                            {
                                x: 418.09,
                                y: 209.92
                            },
                            {
                                x: 412.03,
                                y: 210.2
                            }
                        ],
                        face_type: {
                            probability: 1,
                            type: "human"
                        },
                        angle: {
                            roll: -2.73,
                            pitch: 4.58,
                            yaw: 1.19
                        },
                        face_token: "ea29c922909f002074f2a2c709f9a6d4",
                        location: {
                            top: 162.25,
                            left: 382.8,
                            rotation: 0,
                            width: 74,
                            height: 71
                        },
                        landmark: [
                            {
                                x: 401.93,
                                y: 175.66
                            },
                            {
                                x: 434.99,
                                y: 175.31
                            },
                            {
                                x: 417.51,
                                y: 191.74
                            },
                            {
                                x: 418.15,
                                y: 210.19
                            }
                        ],
                        age: 12,
                        mask: {
                            probability: 1,
                            type: 0
                        }
                    }
                ];
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
                            this.picList.push({face_token: item.face_token, base64: res});
                        }
                    );
                });
                //     }else{
                //         this.$Message.error('请求失败');
                //     }
                // }).catch(err=>{
                //     this.isloading=false;
                // });
            },
            upload30(base) {
                let _this = this;
                // this.$axios({
                //     headers: {
                //         'Accept': '*/*',
                //         'Content-Type': 'multipart/form-data'
                //     },
                //     method: "post",
                //     url: window.config.url+"/ai/bdface/bddetect",
                //     params:{
                //     img_type:'BASE64',
                //     image_param:base,
                //     }
                // }).then(res => {
                this.isloading = false;
                //     if(res.data.code == 200000){
                // if(!res.data.data){
                //     this.$Message.error('返回数据为空');
                //     return;
                // }
                this.picList = [];
                let result = [{
                    "expression": {"probability": 1, "type": "none"},
                    "face_shape": {"probability": 0.49, "type": "oval"},
                    "beauty": 46.91,
                    "gender": {"probability": 0.7, "type": "female"},
                    "race": {"probability": 0.53, "type": "yellow"},
                    "landmark150": {
                        "eye_right_eyeball_right": {"x": 155.96, "y": 158.56},
                        "mouth_corner_right_inner": {"x": 141.68, "y": 215.42},
                        "cheek_right_1": {"x": 101.39, "y": 113.27},
                        "cheek_right_2": {"x": 97.42, "y": 125.3},
                        "cheek_right_3": {"x": 93.42, "y": 137.64},
                        "cheek_right_8": {"x": 93.46, "y": 202.72},
                        "cheek_right_9": {"x": 100.26, "y": 214.93},
                        "cheek_right_4": {"x": 90.13, "y": 150.06},
                        "cheek_right_5": {"x": 87.48, "y": 163.07},
                        "cheek_right_6": {"x": 87.02, "y": 176.24},
                        "cheek_right_7": {"x": 88.78, "y": 189.74},
                        "mouth_lip_lower_outer_1": {"x": 141.94, "y": 218.66},
                        "mouth_lip_lower_outer_2": {"x": 144.02, "y": 222.55},
                        "mouth_lip_lower_outer_3": {"x": 146.65, "y": 225.98},
                        "mouth_lip_lower_outer_4": {"x": 150.06, "y": 229.05},
                        "eye_right_corner_left": {"x": 168.61, "y": 163.79},
                        "mouth_lip_lower_outer_5": {"x": 153.89, "y": 231.11},
                        "mouth_corner_left_outer": {"x": 170.35, "y": 222.23},
                        "eyebrow_left_corner_left": {"x": 219.91, "y": 159.72},
                        "nose_left_contour_7": {"x": 183.8, "y": 209.05},
                        "cheek_right_11": {"x": 118.28, "y": 235.8},
                        "nose_left_contour_6": {"x": 182.66, "y": 210.8},
                        "eye_right_eyeball_center": {"x": 160.14, "y": 159.77},
                        "nose_left_contour_5": {"x": 183.03, "y": 211.4},
                        "nose_left_contour_4": {"x": 186.5, "y": 208.33},
                        "cheek_left_8": {"x": 175.85, "y": 220.25},
                        "cheek_left_7": {"x": 181.91, "y": 214.46},
                        "nose_left_contour_3": {"x": 188.96, "y": 195.6},
                        "cheek_right_10": {"x": 108.57, "y": 225.74},
                        "nose_left_contour_2": {"x": 189.98, "y": 183.11},
                        "cheek_left_9": {"x": 169.69, "y": 226.64},
                        "nose_left_contour_1": {"x": 191.12, "y": 170.59},
                        "mouth_lip_lower_outer_6": {"x": 158.06, "y": 232.19},
                        "cheek_left_4": {"x": 198.35, "y": 194.03},
                        "cheek_left_3": {"x": 202.13, "y": 186.64},
                        "mouth_lip_lower_outer_7": {"x": 161.21, "y": 232.1},
                        "cheek_left_6": {"x": 187.55, "y": 208.35},
                        "mouth_lip_lower_outer_8": {"x": 163.69, "y": 230.9},
                        "cheek_left_5": {"x": 193.99, "y": 201.71},
                        "mouth_lip_lower_outer_9": {"x": 165.67, "y": 229.05},
                        "cheek_left_2": {"x": 205.37, "y": 179.28},
                        "cheek_left_1": {"x": 209.77, "y": 171.75},
                        "mouth_lip_upper_inner_2": {"x": 148.45, "y": 217.53},
                        "mouth_lip_upper_inner_3": {"x": 152.26, "y": 218.9},
                        "mouth_lip_upper_inner_4": {"x": 156.1, "y": 220.05},
                        "mouth_lip_upper_inner_5": {"x": 159.76, "y": 221.26},
                        "mouth_corner_right_outer": {"x": 140.42, "y": 214.6},
                        "mouth_lip_upper_inner_6": {"x": 163.29, "y": 222.54},
                        "mouth_lip_upper_inner_7": {"x": 164.56, "y": 222.43},
                        "mouth_lip_upper_inner_8": {"x": 165.8, "y": 222.39},
                        "mouth_lip_upper_inner_9": {"x": 167.03, "y": 222.51},
                        "eyebrow_left_upper_1": {"x": 203, "y": 160.43},
                        "eyebrow_left_upper_2": {"x": 207.43, "y": 159.68},
                        "eyebrow_left_upper_5": {"x": 220.47, "y": 156.77},
                        "eyebrow_left_upper_3": {"x": 211.89, "y": 158.98},
                        "eye_left_eyeball_right": {"x": 198.89, "y": 169.35},
                        "eyebrow_left_upper_4": {"x": 216.12, "y": 158.26},
                        "mouth_lip_upper_inner_1": {"x": 144.64, "y": 216.24},
                        "mouth_lip_upper_outer_11": {"x": 171, "y": 221.29},
                        "mouth_lip_lower_inner_7": {"x": 162.92, "y": 223.33},
                        "mouth_lip_upper_outer_10": {"x": 171.28, "y": 220.25},
                        "mouth_lip_lower_inner_8": {"x": 164.3, "y": 223.12},
                        "mouth_lip_lower_inner_9": {"x": 165.7, "y": 222.86},
                        "mouth_lip_lower_inner_3": {"x": 150.73, "y": 220.28},
                        "mouth_lip_lower_inner_4": {"x": 154.29, "y": 221.69},
                        "mouth_lip_lower_inner_5": {"x": 157.71, "y": 222.82},
                        "mouth_lip_lower_inner_6": {"x": 161.09, "y": 223.69},
                        "eye_left_eyeball_center": {"x": 201.37, "y": 169.48},
                        "mouth_lip_lower_inner_1": {"x": 144.11, "y": 216.96},
                        "mouth_lip_lower_inner_2": {"x": 147.41, "y": 218.6},
                        "eye_right_corner_right": {"x": 148.4, "y": 155.24},
                        "mouth_lip_lower_outer_11": {"x": 168.9, "y": 224.43},
                        "mouth_lip_lower_outer_10": {"x": 167.51, "y": 226.76},
                        "eye_right_eyeball_left": {"x": 163.57, "y": 161.08},
                        "eyebrow_right_lower_2": {"x": 165.27, "y": 145.76},
                        "eyebrow_right_lower_1": {"x": 156.14, "y": 142.54},
                        "eyebrow_right_lower_3": {"x": 174.03, "y": 150.76},
                        "mouth_lip_upper_outer_9": {"x": 171.05, "y": 219.22},
                        "eye_left_corner_right": {"x": 195.85, "y": 169.58},
                        "mouth_lip_upper_outer_5": {"x": 163.27, "y": 216.49},
                        "mouth_lip_upper_outer_6": {"x": 166.86, "y": 218.64},
                        "mouth_lip_upper_outer_7": {"x": 168.74, "y": 218.08},
                        "mouth_lip_upper_outer_8": {"x": 170.15, "y": 218.47},
                        "eye_left_eyelid_lower_4": {"x": 201.59, "y": 172.33},
                        "nose_right_contour_6": {"x": 169.26, "y": 205.76},
                        "eye_left_eyelid_upper_5": {"x": 204.07, "y": 167.79},
                        "eye_left_eyelid_upper_4": {"x": 202.39, "y": 167.41},
                        "eye_left_eyelid_lower_3": {"x": 199.95, "y": 171.91},
                        "nose_right_contour_7": {"x": 171.18, "y": 205.1},
                        "eye_left_eyelid_lower_2": {"x": 198.43, "y": 171.37},
                        "nose_right_contour_4": {"x": 159.32, "y": 201.09},
                        "eye_left_eyelid_upper_7": {"x": 206.87, "y": 169.69},
                        "eye_left_eyelid_upper_6": {"x": 205.69, "y": 168.56},
                        "eye_left_eyelid_lower_1": {"x": 197.03, "y": 170.54},
                        "nose_right_contour_5": {"x": 164.78, "y": 204.78},
                        "eye_left_eyelid_upper_1": {"x": 197.22, "y": 168.32},
                        "mouth_lip_upper_outer_1": {"x": 144.71, "y": 214.51},
                        "eye_left_eyelid_lower_7": {"x": 206.27, "y": 171.83},
                        "mouth_lip_upper_outer_2": {"x": 149.31, "y": 214.79},
                        "eyebrow_right_corner_left": {"x": 182.09, "y": 156.14},
                        "eye_left_eyelid_lower_6": {"x": 204.91, "y": 172.35},
                        "mouth_lip_upper_outer_3": {"x": 153.88, "y": 215.31},
                        "eye_left_eyelid_upper_3": {"x": 200.67, "y": 167.42},
                        "eye_left_eyeball_left": {"x": 203.9, "y": 170.04},
                        "eye_left_eyelid_upper_2": {"x": 198.95, "y": 167.57},
                        "eye_left_eyelid_lower_5": {"x": 203.19, "y": 172.4},
                        "mouth_lip_upper_outer_4": {"x": 158.47, "y": 215.84},
                        "nose_tip": {"x": 184.56, "y": 205.81},
                        "chin_3": {"x": 151.66, "y": 244.22},
                        "chin_1": {"x": 129.47, "y": 243.9},
                        "chin_2": {"x": 142.7, "y": 247.38},
                        "eyebrow_right_upper_1": {"x": 148.78, "y": 137.83},
                        "eye_right_eyelid_lower_7": {"x": 165.82, "y": 164.4},
                        "eye_right_eyelid_lower_6": {"x": 162.91, "y": 164.59},
                        "eyebrow_right_upper_5": {"x": 185.01, "y": 152.96},
                        "eyebrow_right_upper_4": {"x": 177.33, "y": 146.45},
                        "eyebrow_right_upper_3": {"x": 168.37, "y": 141.09},
                        "eyebrow_right_upper_2": {"x": 158.66, "y": 138.56},
                        "mouth_corner_left_inner": {"x": 169.38, "y": 222.12},
                        "eye_right_eyelid_upper_2": {"x": 154.29, "y": 155.11},
                        "eye_right_eyelid_upper_1": {"x": 151.36, "y": 154.93},
                        "eye_right_eyelid_upper_4": {"x": 160.08, "y": 156.08},
                        "eye_right_eyelid_upper_3": {"x": 157.2, "y": 155.47},
                        "eye_right_eyelid_lower_1": {"x": 150.21, "y": 157.71},
                        "eye_left_corner_left": {"x": 207.72, "y": 171.22},
                        "eyebrow_left_corner_right": {"x": 202.81, "y": 162.6},
                        "eye_right_eyelid_lower_5": {"x": 160.1, "y": 164.13},
                        "mouth_lip_upper_inner_11": {"x": 168.96, "y": 222.24},
                        "eye_right_eyelid_lower_4": {"x": 157.27, "y": 163.25},
                        "eye_right_eyelid_lower_3": {"x": 154.72, "y": 161.7},
                        "eye_right_eyelid_lower_2": {"x": 152.27, "y": 159.95},
                        "mouth_lip_upper_inner_10": {"x": 168.07, "y": 222.39},
                        "mouth_lip_lower_inner_10": {"x": 167.2, "y": 222.55},
                        "mouth_lip_lower_inner_11": {"x": 168.53, "y": 222.4},
                        "eyebrow_left_lower_3": {"x": 215.87, "y": 161.05},
                        "cheek_left_10": {"x": 162.89, "y": 232.21},
                        "cheek_left_11": {"x": 157.37, "y": 238.12},
                        "eyebrow_left_lower_2": {"x": 211.66, "y": 161.93},
                        "eyebrow_left_lower_1": {"x": 207.19, "y": 162.37},
                        "nose_bridge_1": {"x": 188.9, "y": 169.47},
                        "nose_right_contour_2": {"x": 172.82, "y": 178.31},
                        "nose_right_contour_3": {"x": 166.43, "y": 189.63},
                        "nose_right_contour_1": {"x": 178.54, "y": 166.9},
                        "nose_bridge_2": {"x": 187.53, "y": 182.2},
                        "nose_bridge_3": {"x": 186.25, "y": 194.89},
                        "eyebrow_right_corner_right": {"x": 146.57, "y": 140.11},
                        "nose_middle_contour": {"x": 172.81, "y": 210.3},
                        "eye_right_eyelid_upper_6": {"x": 165.83, "y": 158.45},
                        "eye_right_eyelid_upper_5": {"x": 163.01, "y": 157.1},
                        "eye_right_eyelid_upper_7": {"x": 167.74, "y": 160.92}
                    },
                    "eye_status": {"right_eye": 1, "left_eye": 0.9989867806},
                    "face_probability": 1,
                    "quality": {
                        "illumination": 181,
                        "occlusion": {
                            "right_eye": 0.29,
                            "nose": 0,
                            "mouth": 0.01,
                            "left_eye": 0,
                            "left_cheek": 0,
                            "chin_contour": 0.28,
                            "right_cheek": 0.77
                        },
                        "blur": 0,
                        "completeness": 1
                    },
                    "glasses": {"probability": 1, "type": "none"},
                    "emotion": {"probability": 0.81, "type": "neutral"},
                    "landmark72": [{"x": 97.49, "y": 116.26}, {"x": 91.29, "y": 140.04}, {
                        "x": 87.44,
                        "y": 165.21
                    }, {"x": 90.14, "y": 192.44}, {"x": 103.88, "y": 218.99}, {"x": 122.38, "y": 238.59}, {
                        "x": 144.36,
                        "y": 250.47
                    }, {"x": 161.42, "y": 241.09}, {"x": 174.2, "y": 227.87}, {"x": 186.32, "y": 214.64}, {
                        "x": 196.56,
                        "y": 200.77
                    }, {"x": 203.76, "y": 185.58}, {"x": 211.72, "y": 170.88}, {"x": 147.64, "y": 154.74}, {
                        "x": 154.2,
                        "y": 155.37
                    }, {"x": 160.08, "y": 156.8}, {"x": 165.17, "y": 159.09}, {"x": 168.19, "y": 163.72}, {
                        "x": 162.72,
                        "y": 164.03
                    }, {"x": 157.21, "y": 162.55}, {"x": 152.21, "y": 159.29}, {"x": 159.97, "y": 159.86}, {
                        "x": 143.78,
                        "y": 140.47
                    }, {"x": 156.48, "y": 138.73}, {"x": 167.34, "y": 141.35}, {"x": 176.96, "y": 146.42}, {
                        "x": 183.64,
                        "y": 155.8
                    }, {"x": 174.27, "y": 151.93}, {"x": 164.59, "y": 147.56}, {"x": 154.43, "y": 143.88}, {
                        "x": 194.4,
                        "y": 171.53
                    }, {"x": 197.84, "y": 169.95}, {"x": 201.62, "y": 170.27}, {"x": 204.69, "y": 171.99}, {
                        "x": 206.24,
                        "y": 174.89
                    }, {"x": 203.21, "y": 176.03}, {"x": 199.46, "y": 175.44}, {"x": 196.53, "y": 173.85}, {
                        "x": 199.21,
                        "y": 172.56
                    }, {"x": 198.17, "y": 163.1}, {"x": 203.67, "y": 160.2}, {"x": 209.15, "y": 158.96}, {
                        "x": 214.05,
                        "y": 159.03
                    }, {"x": 216.98, "y": 162.03}, {"x": 212.66, "y": 163.67}, {"x": 207.65, "y": 164.08}, {
                        "x": 203.02,
                        "y": 163.74
                    }, {"x": 176.23, "y": 168.01}, {"x": 171.55, "y": 179.3}, {"x": 165.95, "y": 190.15}, {
                        "x": 159.4,
                        "y": 200.38
                    }, {"x": 169.58, "y": 208.21}, {"x": 181.06, "y": 210.56}, {"x": 190.2, "y": 207.97}, {
                        "x": 190.65,
                        "y": 196.41
                    }, {"x": 190.45, "y": 183.86}, {"x": 190.24, "y": 171.07}, {"x": 183.05, "y": 201.74}, {
                        "x": 141.45,
                        "y": 214.82
                    }, {"x": 154.02, "y": 216.42}, {"x": 164.91, "y": 219.69}, {"x": 168.86, "y": 220.18}, {
                        "x": 171.59,
                        "y": 224.82
                    }, {"x": 163.9, "y": 230.78}, {"x": 157.18, "y": 230.53}, {"x": 148.2, "y": 224.88}, {
                        "x": 152,
                        "y": 219.4
                    }, {"x": 161.38, "y": 223.84}, {"x": 165.74, "y": 223.81}, {"x": 164.42, "y": 224.54}, {
                        "x": 159.7,
                        "y": 223.42
                    }, {"x": 151.18, "y": 219.89}],
                    "face_type": {"probability": 0.61, "type": "human"},
                    "angle": {"roll": 31.22, "pitch": 22.52, "yaw": -49.37},
                    "face_token": "05ee2988fb8e298c80adf50072f8feef",
                    "location": {"top": 116.73, "left": 97.79, "rotation": 18, "width": 127, "height": 111},
                    "landmark": [{"x": 159.97, "y": 159.86}, {"x": 199.21, "y": 172.56}, {
                        "x": 183.05,
                        "y": 201.74
                    }, {"x": 158.89, "y": 222.65}],
                    "age": 20,
                    "mask": {"probability": 0.99, "type": 0}
                }];
                this.resultList = result;
                this.resultContent = result[0];
                this.face_token = result[0].face_token;
                result.forEach(item => {
                    let location = item.location;
                    _this.jcrop(
                        this.uploadPic30,
                        location.left,
                        location.top,
                        location.width,
                        location.height,
                        100,
                        res => {
                            this.picList.push({face_token: item.face_token, base64: res});
                        }
                    );
                });
                //     }else{
                //         this.$Message.error('请求失败');
                //     }
                // }).catch(err=>{
                //     this.isloading=false;
                // });
            },
            uploadTongy() {
                this.isloading = false;
                // setTimeout(()=>{
                this.msg61 = `<table><tr><td>序号</td><td>内容</td></tr><tr><td>1</td><td><p>第一部分教材知识梳理</p></td></tr><tr><td>2</td><td><p>模块三中国现代史</p></td></tr><tr><td>3</td><td><p>第一单元</p></td></tr><tr><td>4</td><td><p>中华人民共和国的成立和巩固</p></td></tr></table>`;
                //},1500);
            },
            uploadShouxie() {
                this.isloading = false;
                // setTimeout(()=>{
                this.msg13 = `<p>2019.5.23会议纪要</p><p>一、项目进度汇报</p><p>二、首页改版头脑风暴</p><p>三、本周遇到的问题</p>`;
                //},1500);
            },
            uploadGongshi() {
                this.isloading = false;
                // setTimeout(()=>{
                this.msg14 = `36x79x96`;
                //},1500);
            },
            select() {
                this.isloading = true;
                if (this.routeId == "6.1.1") {
                    this.getImg(this.uploadPic, () => {
                        // this.uploadPic=base64;
                        // let base1=base64.split('data:image/png;base64,')[1];
                        //setTimeout(()=>{
                        this.upload(this.uploadPic);
                        //},1500)
                    });
                } else if (this.routeId == "6.1.30") {
                    this.getImg(this.uploadPic30, () => {
                        // this.uploadPic=base64;
                        // let base1=base64.split('data:image/png;base64,')[1];
                        //setTimeout(()=>{
                        this.upload30(this.uploadPic30);
                        //},1500)
                    });
                } else if (this.routeId == "6.1.20") {
                    this.getImg(this.uploadPic620, () => {
                        this.upload620(this.uploadPic620);
                    });
                } else if (this.routeId == "2.6.1") {
                    this.getImg(this.uploadPic61, () => {
                        // setTimeout(()=>{
                        this.uploadTongy(this.uploadPic61);
                        //},1500)
                    });
                } else if (this.routeId == "2.4.1") {
                    this.getImg(this.uploadPic13, () => {
                        //setTimeout(()=>{
                        this.uploadShouxie(this.uploadPic13);
                        //},1500)
                    });
                } else if (this.routeId == "2.4.2") {
                    this.getImg(this.uploadPic14, () => {
                        //setTimeout(()=>{
                        this.uploadGongshi(this.uploadPic14);
                        //},1500)
                    });
                } else if (this.routeId == "3.1.8") {
                    this.getImg(this.uploadPic7, () => {
                        //setTimeout(()=>{
                        this.upload7(this.uploadPic7);
                        //},1500)
                    });
                } else if (this.routeId == "4.4") {
                    this.isloading = false;
                } else if (this.routeId == "2.2.3") {
                    this.getImg(this.uploadPic4, () => {
                        this.isloading = false;
                        this.msg4 = `<p>价税合计(大写)：陆仟壹佰叁拾贰圆伍角整</p><p>开票人：焦红娟</p><p>销售方地址及电话：北京市朝阳区64377727</p><p>数量：</p><p>销售方纳税人识别号：110105057317113</p><p>销售方开户行及账号：上海浦发银行91150154740007408</p><p>备注：2016.9</p><p>税率：6%</p><p>合计税额：347.12</p><p>发票代码：1100154130</p><p>开票日期：2016年11月15日</p><p>购方纳税人识别号：110108802100433</p><p>发票名称：北京增值税专用发票</p><p>购方开户行及账号：招商银行北京分行上地支行110902160610706</p><p>价税合计(小写)：6132.50</p><p>复核：马学琦</p><p>合计金额：5785.38</p><p>金额：5785.38</p><p>购方名称：北京百度网讯科技有限公司</p><p>发票种类：专用发票</p><p>购方地址及电话：北京市海淀区上地十街10号百度大厦2层010-59928888</p><p>税额：347.12</p><p>销售方名称：北京圣紫茗管理咨询有限公司</p><p>货物名称：服务费</p><p>发票号码：00772445</p>`;
                    });
                } else if (this.routeId == "5.4.1") {
                    this.fanyiAnaly();
                } else if (this.routeId == "6.2.3") {
                    this.getImg(this.uploadPic23, () => {
                        // this.uploadPic23=base64;
                        // let base1=base64.split('data:image/png;base64,')[1];
                        //setTimeout(()=>{
                        this.upload23(this.uploadPic23);
                        //},1500)
                    });
                } else if (this.routeId == "6.4.6") {
                    this.getImg(this.uploadPic6, () => {
                        this.upload6(this.uploadPic6);
                    });
                } else if (this.routeId == "2.3.3") {
                    this.getImg(this.uploadPic3, () => {
                        this.isloading = false;
                        this.msg3 = `<p>车牌号：京KBT355</p>
            <p>车牌颜色：blue</p>`;
                    });
                } else if (this.routeId == "1.1.2") {
                    this.isloading = false;
                } else if (this.routeId == '2.3.3_1') {
                    let imgSrc = require('../../../assets/images/smartLight/map.png');
                    let styleObj = 'width:306px;height:296px;';
                    this.getImg(this.ludengChepai, () => {
                        this.isloading = false;
                        this.msg3 = `<p>车牌号：京KBT355</p>
                       <p>车牌颜色：blue</p>
                       <img src='${imgSrc}' style=${styleObj}></img>
                      `;
                    });
                } else if (this.routeId == "3.5.3") {
                    this.isloading = false;
                    this.getImg(this.chiliuPic, () => {
                        this.cheliuInit(this.chiliuPic);
                    });
                } else if (this.routeId == "3.5.1") {
                    this.isloading = false;
                    this.getImg(this.chexingUploadPic, () => {
                        this.chexingUpload(this.chexingUploadPic);
                    });
                } else if (this.routeId == '6.2.2') {
                    this.isloading = false;
                } else if (this.routeId == '6.4.1') {
                    this.isloading = false;
                    this.getImg(this.jiashiUploadPic, () => {
                        this.initjiashiUpload();
                    })
                } else if (this.routeId == "3.2.2") {
                    this.isloading = false;
                    this.getImg(this.uploadPic20, () => {
                        this.upload20(this.uploadPic20);
                    })
                } else if (this.routeId == "3.2") {
                    this.getImg(this.uploadPic21, () => {
                        this.upload21(this.uploadPic21);
                    })
                } else if (this.routeId == "1.1.3") {
                    this.isloading = false;
                } else if (this.routeId == "6.1.8") { // 皮肤分析， 内部自己实现功能
                    this.isloading = false;
                } else if (this.routeId == "bingli") { // 病例分析
                  this.isloading = false;
                  this.initbingli();
                } else if (this.routeId == "guge") { // 骨骼分析
                  this.isloading = false;
                  this.initGuge()
                } else if (this.routeId == "shetai") { // 舌苔分析
                  this.isloading = false;
                  this.initShetai()
                } else if (this.routeId == "wenzi") { // 医疗手写文字识别时
                  this.isloading = false;
                  this.initMedicalWenzi()
                }
            },
            closeModel() {
                this.$emit("closeWindow", false);
            },
            jcrop(imgSrc, left, top, width, height, desWidth, callback) {
                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = width;
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
            handleBeforeUpload620(file) {
                this.isloading = true;
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic620 = base64;
                    getImgSize(_this.uploadPic620).then(res => {
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
                                    this.uploadPic620,
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
            handleBeforeUpload(file) {
                this.isloading = true;
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
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
                            console.log(JSON.stringify(result));
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
            handleBeforeUpload30(file) {
                this.isloading = true;
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic30 = base64;
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
                            console.log(JSON.stringify(result));
                            this.resultList = result;
                            this.resultContent = result[0];
                            this.face_token = result[0].face_token;
                            result.forEach(item => {
                                let location = item.location;
                                _this.jcrop(
                                    this.uploadPic30,
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
            showMenu(val) {
                this.face_token = val.face_token;
                this.resultList.forEach(item => {
                    if (item.face_token == val.face_token) {
                        this.resultContent = item;
                    }
                });
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
                image.crossOrigin = "anonymous";
                image.onload = () => {
                    // var base64 = this.getBase64Image(image);
                    // callback(base64)
                    callback();
                };
            },

            handleBeforeUpload61(file) {
                var _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic61 = base64;
                    getImgSize(_this.uploadPic61).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData();
                formData.append("files", file);
                formData.append("languageType", "CHN_ENG");
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: window.config.url + "/ai/text/general",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                let html = `<table><tr><td>序号</td><td>内容</td></tr>`;
                                res.data.data.words_result.forEach((item, index) => {
                                    if (item.words) {
                                        html += `<tr><td>${index + 1}</td><td><p>${
                                            item.words
                                        }</p></td></tr>`;
                                    }
                                });
                                this.msg61 = html + `</table>`;
                                console.log(this.msg61);
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

            handleBeforeUpload13(file) {
                var _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic13 = base64;
                    getImgSize(_this.uploadPic13).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData();
                formData.append("files", file);
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: window.config.url + "/ai/text/handwriting",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                let result = res.data.data.words_result;
                                let html = ``;
                                result.forEach(item => {
                                    if (item.words) {
                                        html += `<p>${item.words}</p>`;
                                    }
                                });
                                this.msg13 = html;
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

            handleBeforeUpload14(file) {
                var _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic14 = base64;
                    getImgSize(_this.uploadPic14).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData();
                formData.append("files", file);
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: window.config.url + "/ai/text/formula",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                let result = res.data.data.words_result;
                                let html = ``;
                                result.forEach(item => {
                                    if (item.words) {
                                        html += `<p>${item.words}</p>`;
                                    }
                                });
                                this.msg14 = html;
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

            handleBeforeUpload52(file) {
                var _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic52 = base64;
                    getImgSize(_this.uploadPic52).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData();
                formData.append("files", file);
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: window.config.url + "/ai/text/numbers",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                let html = `<table><tr><td>序号</td><td>内容</td></tr>`;
                                res.data.data.words_result.forEach((item, index) => {
                                    if (item.words) {
                                        html += `<tr><td>${index + 1}</td><td><p>${
                                            item.words
                                        }</p><p>宽度：${item.location.width} 高度：${
                                            item.location.height
                                        }</p><p>左间距：${item.location.left} 上间距：${
                                            item.location.top
                                        }</p></td></tr>`;
                                    }
                                });
                                this.msg52 = html + `</table>`;
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

            handleBeforeUpload7(file) {
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic7 = base64;
                    getImgSize(_this.uploadPic7).then(res => {
                        _this.whFlag = res.flag;
                    });
                });

                let formData = new FormData(); //创建form对象
                formData.append("files", file); //
                this.isloading = true;
                this.result7 = [];
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    method: "post",
                    url: window.config.url + "/ai/image/varietyIdentify?img_type=FILES",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            this.result7 = res.data.data.result;
                            console.log(this.result7);
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
                // this.isloading = true;
                // this.result7 = [];
                // this.$axios({
                //     headers: {
                //     Accept: "*/*",
                //     "Content-Type": "multipart/form-data"
                //     },
                //     method: "post",
                //     url: window.config.url+"/ai/image/varietyIdentify",
                //     params: {
                //     img_type: "URL",
                //     image_param: base
                //     }
                // }).then(res => {
                this.isloading = false;
                // if (res.data.code == 200000) {
                //     if (!res.data.data) {
                //         this.$Message.error("返回数据为空");
                //         return;
                //     }
                this.result7 = [
                    {
                        calorie: "724",
                        has_calorie: true,
                        name: "沙拉",
                        probability: "0.370815"
                    },
                    {
                        calorie: "136",
                        has_calorie: true,
                        name: "水果沙拉",
                        probability: "0.259651"
                    },
                    {
                        calorie: "39",
                        has_calorie: true,
                        name: "蔬菜沙拉",
                        probability: "0.222224"
                    },
                    {
                        calorie: "97",
                        has_calorie: true,
                        name: "海鲜沙拉",
                        probability: "0.0607035"
                    },
                    {
                        calorie: "884",
                        has_calorie: true,
                        name: "牛油果沙拉",
                        probability: "0.0303073"
                    }
                ];
                //         console.log(this.result7)
                //     } else {
                //         this.$Message.error("请求失败");
                //     }
                // }).catch(err => {
                //     this.isloading = false;
                //     console.log(err);
                // });
            },

            handleBeforeUpload4(file) {
                var _this = this;
                imgPreviewBase64(_this, file, function (base64) {
                    _this.uploadPic4 = base64;
                    getImgSize(_this.uploadPic4).then(res => {
                        _this.whFlag = res.flag;
                    });
                });
                let formData = new FormData();
                formData.append("files", file);
                this.isloading = true;
                this.$axios({
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    method: "post",
                    url: window.config.url + "/ai/bdocr/vatInvoice?img_type=FILES",
                    data: formData
                })
                    .then(res => {
                        this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            if (res.data.data) {
                                let result = res.data.data.words_result;
                                let html = ``;
                                for (var key in result) {
                                    if (key == "AmountInWords") {
                                        html += `<p>价税合计(大写)：${result[key]}</p>`;
                                    } else if (key == "NoteDrawer") {
                                        html += `<p>开票人：${result[key]}</p>`;
                                    } else if (key == "SellerAddress") {
                                        html += `<p>销售方地址及电话：${result[key]}</p>`;
                                    } else if (key == "CommodityNum") {
                                        html += `<p>数量：${result[key][0].word}</p>`;
                                    } else if (key == "SellerRegisterNum") {
                                        html += `<p>销售方纳税人识别号：${result[key]}</p>`;
                                    } else if (key == "SellerBank") {
                                        html += `<p>销售方开户行及账号：${result[key]}</p>`;
                                    } else if (key == "Remarks") {
                                        html += `<p>备注：${result[key]}</p>`;
                                    } else if (key == "CommodityTaxRate") {
                                        html += `<p>税率：${result[key][0].word}</p>`;
                                    } else if (key == "TotalTax") {
                                        html += `<p>合计税额：${result[key]}</p>`;
                                    } else if (key == "InvoiceCode") {
                                        html += `<p>发票代码：${result[key]}</p>`;
                                    } else if (key == "InvoiceDate") {
                                        html += `<p>开票日期：${result[key]}</p>`;
                                    } else if (key == "PurchaserRegisterNum") {
                                        html += `<p>购方纳税人识别号：${result[key]}</p>`;
                                    } else if (key == "InvoiceTypeOrg") {
                                        html += `<p>发票名称：${result[key]}</p>`;
                                    } else if (key == "PurchaserBank") {
                                        html += `<p>购方开户行及账号：${result[key]}</p>`;
                                    } else if (key == "AmountInFiguers") {
                                        html += `<p>价税合计(小写)：${result[key]}</p>`;
                                    } else if (key == "Checker") {
                                        html += `<p>复核：${result[key]}</p>`;
                                    } else if (key == "TotalAmount") {
                                        html += `<p>合计金额：${result[key]}</p>`;
                                    } else if (key == "CommodityAmount") {
                                        html += `<p>金额：${result[key][0].word}</p>`;
                                    } else if (key == "PurchaserName") {
                                        html += `<p>购方名称：${result[key]}</p>`;
                                    } else if (key == "InvoiceType") {
                                        html += `<p>发票种类：${result[key]}</p>`;
                                    } else if (key == "PurchaserAddress") {
                                        html += `<p>购方地址及电话：${result[key]}</p>`;
                                    } else if (key == "CommodityTax") {
                                        html += `<p>税额：${result[key][0].word}</p>`;
                                    } else if (key == "SellerName") {
                                        html += `<p>销售方名称：${result[key]}</p>`;
                                    } else if (key == "CommodityName") {
                                        html += `<p>货物名称：${result[key][0].word}</p>`;
                                    } else if (key == "InvoiceNum") {
                                        html += `<p>发票号码：${result[key]}</p>`;
                                    }
                                }
                                this.msg4 = html;
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

            fanyiAnaly() {
                this.isloading = false;
                var url = window.config.url + "/ai/nlp/translateGeneral";
                var text, data, scene;
                text = this.tongyongText;
                scene = "";
                data = {
                    sourceLanguage: this.source || "zh",
                    targetLanguage: this.target || "en",
                    sourceText: text || "",
                    Scene: scene || ""
                };
                this.$axios({
                    url: url,
                    method: "post",
                    data: data
                })
                    .then(res => {
                        if (res.status == 200) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            var anfuResult = res.data.data.data.translated;
                            this.tongyongResult = anfuResult;
                        } else {
                            this.$Message.error("请求失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            bofangShipin() {
                var videoDom = this.$refs.video;
                var bofangDom = this.$refs.bofang;
                videoDom.style.opacity = "1";
                if (videoDom.paused) {
                    videoDom.play();
                    bofangDom.style.opacity = "0";
                } else {
                    bofangDom.style.opacity = "1";
                    videoDom.pause();
                }
            },

            getCoverUrl(td, type) {
                var baseUrl = window.config.url + "/ai";
                var formData = new FormData();
                var pUrl;
                if (type == "fenxi" || type == "shenhe" || type == "stic") {
                    pUrl = "/alivideo/getStaticCover";
                } else if (type == "gif") {
                    pUrl = "/alivideo/getDynamicCover";
                }
                formData.append("taskId", td);
                this.$axios({
                    url: baseUrl + pUrl,
                    method: "post",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                })
                    .then(res => {
                        if (res.data.code == 200000) {
                            this.chuliImg = "";
                            this.ifShowChuLoading = false;
                            if (!res.data.data) {
                                this.$Message.error("获取封面接口，返回数据为空");
                                return;
                            }
                            if (type == "fenxi") {
                                var coverUrl = res.data.data[0].result[0].content.url;
                                this.shipinImg = coverUrl;
                            }
                            if (type == "shenhe") {
                                var coverUrl = res.data.data[0].result[0].content.url;
                                this.shenheImg = coverUrl;
                            }
                            if (type == "stic" || type == "gif") {
                                this.ifShowChuLoading = false;
                                this.chuliResult = [];
                                var dataArr = res.data.data;
                                for (var i = 0; i < dataArr.length; i++) {
                                    var contentObj = dataArr[i].result[0].content;
                                    if (i == 0) {
                                        this.chuliImg = contentObj["url"];
                                    }
                                    for (var attr in contentObj) {
                                        this.chuliResult.push({
                                            src: contentObj[attr]
                                        });
                                    }
                                }
                            }
                        } else {
                            this.ifShowChuLoading = false;
                            this.$Message.error("获取封面接口请求失败");
                        }
                    })
                    .catch(err => {
                        this.ifShowChuLoading = false;
                        console.log(err);
                    });
            },

            getCoverStatus(tskid, type) {
                var that = this;
                var taskId1 = tskid + "";
                var baseUrl = window.config.url + "/ai";
                var formData = new FormData();
                formData.append("taskId", taskId1);
                that
                    .$axios({
                        url: baseUrl + "/alivideo/queryAnalysisStatus",
                        method: "post",
                        headers: {
                            Accept: "*/*",
                            "Content-Type": "multipart/form-data"
                        },
                        data: formData
                    })
                    .then(res => {
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.ifShowChuLoading = false;
                                this.$Message.error("创建封面状态，返回数据为空");
                                return;
                            }
                            if (res.data.data.status == 2) {
                                clearInterval(that.covertTimer);
                                that.getCoverUrl(taskId1, type);
                            }
                        } else {
                            this.ifShowChuLoading = false;
                            this.$Message.error("创建封面状态，接口请求失败");
                        }
                    })
                    .catch(err => {
                        this.ifShowChuLoading = false;
                        console.log(err);
                    });
            },

            getCover(arg, type) {
                var that = this;
                var baseUrl = window.config.url + "/ai";
                var pUrl;
                var formData = new FormData();
                formData.append("video_url", arg);
                formData.append("video_name ", "视频识别");
                if (type == "fenxi" || type == "shenhe" || type == "stic") {
                    pUrl = "/alivideo/createStaticCover";
                } else if (type == "gif") {
                    pUrl = "/alivideo/createDynamicCover";
                }
                this.$axios({
                    url: baseUrl + pUrl,
                    method: "post",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                })
                    .then(res => {
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.ifShowChuLoading = false;
                                this.$Message.error("创建封面任务，接口返回数据为空");
                                return;
                            }
                            var taskId = res.data.data.taskId;
                            this.covertTimer = setInterval(() => {
                                that.getCoverStatus(taskId, type);
                            }, 1000);
                        } else {
                            this.ifShowChuLoading = false;
                            this.$Message.error("创建封面任务失败");
                        }
                    })
                    .catch(err => {
                        this.ifShowChuLoading = false;
                        console.log(err);
                    });
            },

            initResultTypeStyle(arg) {
                setTimeout(() => {
                    var chuliTitleDom = this.$refs.chuliTitle.childNodes;
                    chuliTitleDom[0].style =
                        "background: #03A971;border: 1px solid #03A971;color: #FFFFFF;";
                }, 200);
            },

            chuliUpload(e) {
                this.ifShowChuLoading = true;
                this.chuliFile = e;
                var that = this;
                var baseUrl = window.config.url;
                var formData = new FormData();
                formData.append("files", e);
                formData.append("fileType ", "VIDEO");
                formData.append("fileSource", "ai");
                this.$axios({
                    url: baseUrl + "/backend/file/upload",
                    method: "post",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                })
                    .then(res => {
                        if (res.status == 200) {
                            if (!res.data.data) {
                                this.ifShowChuLoading = false;
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            var filePath = res.data.data.fileUrl;
                            var baseUrl = window.config.iconUrl;
                            var baseUrl1 = window.config.url;
                            var videoUrl = baseUrl + "/" + filePath;
                            that.chuliVideoUrl = videoUrl;
                            var chuliResultType = that.chuliResultType;
                            if (chuliResultType == "gif") {
                                this.getCover(videoUrl, "gif");
                            } else if (chuliResultType == "stic") {
                                this.getCover(videoUrl, "stic");
                            }
                        } else {
                            this.ifShowChuLoading = false;
                            this.$Message.error("请求失败");
                        }
                    })
                    .catch(err => {
                        this.ifShowChuLoading = false;
                        console.log(err);
                    });
            },

            chgTitleStyle(arg) {
                if (arg == 0) {
                    this.chuliResultType = "gif";
                } else if (arg == 2) {
                    this.chuliResultType = "stic";
                }
                this.chuliUpload(this.chuliFile);
                var chuliTitleDom = this.$refs.chuliTitle.childNodes;
                for (var i = 0; i < chuliTitleDom.length; i++) {
                    if (arg == i) {
                        chuliTitleDom[i].style =
                            "background: #03A971;border: 1px solid #03A971;color: #FFFFFF;";
                    } else {
                        chuliTitleDom[i].style =
                            "background: rgba(3,169,113,0.10);color: #03A971;";
                    }
                }
            },

            upload23(base) {
                let _this = this;
                this.isloading = false;
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
                let result = [
                    {
                        attributes: {
                            orientation: {score: 0.995762825012207, name: "正面"},
                            gender: {score: 0.5638905167579651, name: "男性"},
                            umbrella: {score: 0.9997417330741882, name: "未打伞"},
                            lower_color: {score: 0.8582271337509155, name: "不确定"},
                            face_mask: {score: 0.9979704022407532, name: "无口罩"},
                            smoke: {score: 0.999300479888916, name: "未吸烟"},
                            bag: {score: 0.9998264908790588, name: "无背包"},
                            upper_wear: {score: 0.6961207985877991, name: "短袖"},
                            is_human: {score: 0.8271095752716064, name: "正常人体"},
                            vehicle: {score: 0.9987816214561462, name: "无交通工具"},
                            glasses: {score: 0.9067940711975098, name: "无眼镜"},
                            headwear: {score: 0.9891334176063538, name: "无帽"},
                            upper_wear_fg: {score: 0.2655384838581085, name: "外套"},
                            upper_wear_texture: {score: 0.5820854306221008, name: "碎花"},
                            upper_cut: {score: 0.9933454990386963, name: "无上方截断"},
                            occlusion: {score: 0.9912871718406677, name: "无遮挡"},
                            lower_cut: {score: 0.9690049290657043, name: "有下方截断"},
                            cellphone: {score: 0.9987564086914062, name: "未使用手机"},
                            carrying_item: {score: 0.8032456040382385, name: "无手提物"},
                            age: {score: 0.6998332142829895, name: "幼儿"},
                            lower_wear: {score: 0.9205757975578308, name: "不确定"},
                            upper_color: {score: 0.9535874724388123, name: "红"}
                        },
                        location: {
                            score: 0.9650363326072693,
                            top: 5,
                            left: 95,
                            width: 851,
                            height: 677
                        }
                    }
                ];
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

            handleBeforeUpload23(file) {
                this.isloading = true;
                let _this = this;
                imgPreviewBase64(_this, file, function (base64) {
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
                        _this.isloading = false;
                        if (res.data.code == 200000) {
                            if (!res.data.data) {
                                this.$Message.error("返回数据为空");
                                return;
                            }
                            let result = res.data.data.person_info;
                            console.log(JSON.stringify(result));
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

            showMenu2(val) {
                this.currentIndex = val;
                this.picList2.forEach((item, index) => {
                    if (index == val) {
                        this.resultContent2 = item;
                    }
                });
            },
           // 病例上传图面
            bingliUpload(file){
              let _this = this;
              imgPreviewBase64(_this, file, function (base64) {
                _this.bingliImg = base64;
                getImgSize(_this.bingliImg).then(res => {
                  _this.whFlag = res.flag;
                });
              });
              this.isloading = false;
              _this.whFlag = true;
              // this.bingliData = [
              //   { name: '胖大舌', msg: ''},
              //   { name: '血红细胞', msg: '高'},
              //   { name: '其他', msg: '正常'}
              // ]
            },
          initbingli(){
            this.bingliData = [
              { name: '微球蛋白（血）', msg: ['B2MG', ' 2620', 'ug/L']},
              { name: '微球蛋白（尿）', msg: ['B 2-MG', '16', 'ug/L']},
              { name: '蛋白', msg: [' ALB', ' 9.94', 'ug/ml']},
              { name: '微球蛋白', msg: [' a1MG', '9.67', 'ug/L']},
            ]
          },
            // 上传图面
            uploadImgFun(file){
              let _this = this;
              this.isloading = false;
              if(this.routeId === 'guge'){
                // 显示指定图片
                this.uploadImg = _uploadImg.gugeAfter
                this.diagnosisData = [
                  { name: '骨骼矿物质密度', msg: '0.76'},
                  { name: '骨骼角度', msg: '35°'},
                  { name: '骨骼内径', msg: '1.8cm'},
                  { name: '骨骼外径', msg: '2.2cm'},
                  { name: '骨骼长度', msg: '35cm'},
                  { name: '骨骼宽度', msg: '4cm'},
                  { name: '骨骼深度', msg: '29cm'},
                ]
              }else if(this.routeId === 'shetai'){
                // 显示上传的图片
                imgPreviewBase64(_this, file, function (base64) {
                  _this.uploadImg = base64;
                  getImgSize(_this.uploadImg).then(res => {
                    _this.whFlag = res.flag;
                  });
                });
                this.initShetai()
              }else if(this.routeId === 'wenzi'){
                // 显示指定图片
                this.uploadImg = _uploadImg.wenziAfter
                this.diagnosisData = [
                  { name: '', msg: '盐酸非索非那定胶囊 2次/日'},
                  { name: '', msg: '裸花紫珠片 0.5*36片 3次 /日'},
                  { name: '', msg: ' 滴眼液 1~2滴  滴左眼'},
                ]
              }
              // _this.whFlag = true
            },
          // 初始化骨骼诊断结果
            initGuge(){
              this.diagnosisData = [
                { name: '骨骼矿物质密度', msg: '0.53'},
                { name: '骨骼角度', msg: '85°'},
                { name: '骨骼内径', msg: '1.0cm'},
                { name: '骨骼外径', msg: '1.4cm'},
                { name: '骨骼长度', msg: '18cm'},
                { name: '骨骼宽度', msg: '2cm'},
                { name: '骨骼深度', msg: '19cm'}
              ]
            },
            // 初始化舌苔诊断结果
            initShetai(){
              this.diagnosisData = [
                { name: '舌体颜色', msg: '淡红'},
                { name: '舌体胖瘦', msg: '适中'},
                { name: '舌体齿痕', msg: '适中'},
                { name: '舌体纹理', msg: '适中'},
                { name: '舌面湿润', msg: '微干'},
                { name: '舌面瘀点', msg: '稀少'},
                { name: '舌苔颜色', msg: '淡黄'},
                { name: '舌苔厚薄', msg: '微厚'}
              ]
            },
            // 医疗文字识别
            initMedicalWenzi(){
              this.diagnosisData = [
                { name: '', msg: '持续发热4天，伴咳嗽，咳痰2天'},
                { name: '', msg: '无明显诱因，未经特殊治疗'},
                { name: '', msg: '转化电解质注射液（500）<500ml/袋>   一日一次'},
                { name: '', msg: '碳酸氢钠注射液250ml        静滴      一日一次'}
              ]
            }
        }
    };
</script>
<style scoped lang="less">
  .itemActive {
    border: 3px solid #03a971;
  }

  .active {
    border: 3px solid #03a971;
  }

  .wisEducation_container {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid #979797;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    z-index: 23;

    /deep/ .ivu-spin-show-text {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .wisEducation {
      width: 1090px;
      min-height: 500px;
      max-height: 550px;
      background: #ffffff;
      box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.15);
      border-radius: 3px;
      margin-top: 94px;
      margin-bottom: 94px;
      overflow: auto;
      position: relative;

      .title {
        width: 100%;
        text-align: center;
        margin-top: 32px;
        margin-bottom: 30px;
        font-size: 22px;
        color: #121c33;
        letter-spacing: 0.1px;
      }

      .closeIcon {
        width: 14px;
        height: 14px;
        position: absolute;
        right: 14px;
        top: 14px;
      }

      .closeIcon:hover {
        cursor: pointer;
      }

      .duanyuyin_experience_container {
        width: 100%;
        padding: 0px 48px 44px 47px;

        .info_text_type {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;

          .info_text {
            flex-grow: 1;
            font-size: 18px;
            color: #121c33;
          }

          .type {
            width: 18%;
          }
        }

        .type {
          width: 18%;
          margin-bottom: 20px;
        }

        .top {
          position: relative;
          width: 100%;
          height: 180px;
          margin-bottom: 10px;
          background: url(../../../assets/images/aiSmartAppDetail/tiyan.png) no-repeat center center;

          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 50px;
            margin-bottom: 20px;
          }

          .times {
            text-align: center;
          }

          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }

        .bottom {
          width: 100%;
          height: 180px;
          background: rgba(192, 204, 218, 0.1);
          border: 1px solid #ebecf0;
          padding: 10px;
          font-size: 14px;
          color: #7a8499;
          text-align: justify;
          line-height: 22px;
        }
      }

      .fn_container {
        width: 100%;
        margin: auto;
        padding: 0px 48px 44px 47px;
        box-sizing: border-box;

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

              .header_box {
                width: 80px;
                height: 80px;
                border: 2px solid #03A971;
                margin: auto;
                margin-top: 32px;
                border-radius: 50%;
                overflow: hidden;
                margin-bottom: 10px;

                img {
                  width: 100%;
                  height: 110%;
                  display: block;
                  object-fit: cover;
                  object-position: center center;
                }
              }

              .succ_sex {
                font-size: 16px;
                color: #121C33;
                margin-bottom: 20px;

                p {
                  text-align: center;
                }
              }

              .succ_box {
                width: 40px;
                margin: auto;
                margin-bottom: 8px;
              }

              .succ_res {
                font-size: 18px;
                color: #03A971;
                text-align: center;
                margin-bottom: 4px;
              }

              .succ_money {
                font-size: 16px;
                color: #121C33;
                text-align: center;
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

      .tong_container {
        padding: 0px 48px 44px 47px;
        box-sizing: border-box;
        width: 100%;
        margin: auto;

        /deep/ .ivu-radio-default {
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
            flex: 1;

            .left_box {
              height: 290px;
              // background: rgba(192,204,218,0.10);
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

              .ivu-upload {
                /deep/ .ivu-upload-select {
                  .ivu-btn-default {
                    background: #03a971 !important;
                    border: none !important;

                    span {
                      color: #ffffff;
                    }
                  }
                }

                /deep/ .ivu-upload-list {
                  display: none;
                }

                /deep/ .ivu-upload-drag {
                  height: 100%;
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
            }

            .table {
              font-size: 14px;
              color: #121c33;
              letter-spacing: 0;
              line-height: 24px;
              padding: 10px;
              height: 290px;
              background: rgba(192, 204, 218, 0.1);
              border: 1px solid #ebecf0;

              .table_title_container {
                display: flex;
                justify-content: space-around;

                .table_title {
                  width: 32%;
                  font-size: 14px;
                  color: #121c33;
                  text-align: center;
                }
              }

              .table_result {
                display: flex;
                justify-content: space-around;

                .biaogeResult {
                  width: 32%;
                  font-size: 12px;
                  color: #121c33;
                  text-align: center;
                  margin-bottom: 5px;
                }
              }
            }

            .table {
              overflow: hidden !important;
            }

            .table:hover {
              overflow: auto !important;
            }

            .table::-webkit-scrollbar {
              width: 5px;
              height: 5px;
            }

            .table::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 5px;
              background: #999999;
              height: 40px;
            }

            .table::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 0;
              background: white;
            }
          }
        }
      }

      .caip_container {
        width: 100%;
        margin: auto;
        padding: 0px 48px 44px 47px;
        box-sizing: border-box;

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

        .option {
          margin-top: 10px;

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
            width: 80px;
            margin-right: 20px;
            position: relative;
            opacity: 0.5;
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
              opacity: 1;
            }
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
            width: 649px;
            overflow: hidden;

            &.left_box1 {
              width: 49%;
            }

            .left_box {
              height: 100%;
              border: 1px solid #ebecf0;

              .left_up {
                width: 100%;
                height: 100%;
                background: rgba(192, 204, 218, 0.1);
                position: relative;
                // display: flex;
                // justify-content: center;
                // align-items: center;

                .pic {
                  width: 100%;

                  &.streth {
                    height: 320px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                  }

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

                    canvas {
                      width: auto;
                      height: 100%;
                    }
                  }

                  canvas {
                    width: 100%;
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

            .cheliu {
              width: 100% !important;
            }
          }

          .right {
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

            .cheliu_result_container {
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
          }
        }

        .cheliuContent {
          width: 100%;
          display: flex;
          flex-direction: column;

          .left {
            width: 100%;
          }
        }
      }

      .fP_container {
        width: 100%;
        margin: auto;
        padding: 0px 48px 44px 47px;
        box-sizing: border-box;

        /deep/ .ivu-radio-default {
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
            position: relative;
            flex: 1;
            // #video3{

            // }

            .left_box {
              height: 290px;
              // background: rgba(192,204,218,0.10);
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

              .ivu-upload {
                /deep/ .ivu-upload-select {
                  .ivu-btn-default {
                    background: #03a971 !important;
                    border: none !important;

                    span {
                      color: #ffffff;
                    }
                  }
                }

                /deep/ .ivu-upload-list {
                  display: none;
                }

                /deep/ .ivu-upload-drag {
                  height: 100%;
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
            }

            .table {
              font-size: 14px;
              color: #121c33;
              letter-spacing: 0;
              line-height: 24px;
              padding: 10px;
              height: 290px;
              background: rgba(192, 204, 218, 0.1);
              border: 1px solid #ebecf0;

              .table_title_container {
                display: flex;
                justify-content: space-around;

                .table_title {
                  width: 32%;
                  font-size: 14px;
                  color: #121c33;
                  text-align: center;
                }
              }

              .table_result {
                display: flex;
                justify-content: space-around;

                .biaogeResult {
                  width: 32%;
                  font-size: 12px;
                  color: #121c33;
                  text-align: center;
                  margin-bottom: 5px;
                }
              }
            }

            .table {
              overflow: hidden !important;
            }

            .table:hover {
              overflow: auto !important;
            }

            .table::-webkit-scrollbar {
              width: 5px;
              height: 5px;
            }

            .table::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 5px;
              background: #999999;
              height: 40px;
            }

            .table::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 0;
              background: white;
            }
          }
        }

        .renliuContainer {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .title {
            font-size: 18px;
            color: #121C33;
            margin-bottom: 20px;
          }

          .left {
            width: 49%;

            .left_box {
              // background: rgba(192,204,218,0.10);
              border: 1px solid #EBECF0;

              .left_up {
                width: 100%;
                height: 100%;
                background: rgba(192, 204, 218, 0.10);
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
                  background: #121C33;
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 50px;

                  .text {
                    font-size: 12px;
                    color: #FFFFFF;
                    text-align: justify;
                  }

                }

              }
            }
          }

          .right {
            width: 49%;
            position: relative;
            background: rgba(192, 204, 218, 0.10);
            border: 1px solid #EBECF0;

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

            .tab {
              width: 80%;
              display: flex;
              align-items: center;
              background: rgba(71, 86, 105, 0.56);
              // border: 1px solid #03A971;
              position: absolute;
              top: 20px;
              left: 10%;
              box-sizing: border-box;

              .tab_li {
                border-top: 1px solid #03A971;
                border-bottom: 1px solid #03A971;
                border-right: 1px solid #03A971;
                box-sizing: border-box;
                flex: 1;
                font-size: 14px;
                height: 100%;
                color: #FFFFFF;
                text-align: center;
                padding: 8px 0;
                cursor: pointer;

                &:nth-child(1) {
                  border-left: 1px solid #03A971;
                }
              }

            }

            .intro {
              display: flex;
              justify-content: space-between;
              padding: 0 15px;
              align-items: center;
              opacity: 0.85;
              background: #121C33;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50px;

              .text {
                font-size: 12px;
                color: #FFFFFF;
                text-align: justify;
              }

            }

            .right_box {
              height: 100%;
              overflow: auto;
              font-size: 14px;
              color: #121C33;
              letter-spacing: 0;
              line-height: 24px;
              //
              background: rgba(192, 204, 218, 0.10);

              &.right_pad {
                padding: 10px;
              }

              .right_up {
                width: 100%;
                height: 100%;
                background: rgba(192, 204, 218, 0.10);
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

              }
            }
          }
        }


      }

      .function_experice_container {
        width: 100%;
        height: 600px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;

        .function_experice {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .shuru_title {
            width: 100%;
            font-size: 18px;
            color: #121c33;
            margin-bottom: 20px;
          }

          .choice_container {
            display: flex;
            align-items: center;
            height: 36px;
            width: 100%;
            margin-bottom: 25px;

            .choice1 {
              margin-right: 10px;
            }

            .img_container {
              width: 30px;
              height: 23px;
              margin-right: 10px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .choice2 {
              margin-right: 100px;
            }

            .lingyu {
              display: flex;
              align-items: center;

              span {
                width: 125px;
                margin-right: 9px;
              }
            }
          }

          .Industry_type {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 30px;

            .itemIn {
              width: 65px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              border: 1px solid #b8becc;
              font-size: 14px;
              color: #7a8499;
              margin-right: 10px;
            }
          }

          .text_container {
            width: 100%;
            height: 200px;
            background: rgba(192, 204, 218, 0.1);
            border: 1px solid #ebecf0;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            padding: 22px;
            box-sizing: border-box;

            textarea {
              width: 100%;
              height: 90%;
              border: none;
              background: rgba(192, 204, 218, 0.01);
            }

            .tishiInfo {
              width: 100%;
              height: 10%;
              font-size: 12px;
              color: #b8becc;
              text-align: justify;
              line-height: 16px;
            }
          }

          .fenxi_btn {
            background: #03a971;
            border-radius: 3px;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            padding: 10px 38px;
            box-sizing: border-box;
          }

          .fenxi_btn:hover {
            cursor: pointer;
          }

          .result_container {
            width: 100%;
            height: 93px;
            background: #f9fafc;
            border: 1px solid #ebecf0;
            padding: 30px 40px;
            box-sizing: border-box;
            font-size: 18px;
            color: #121c33;
            margin-bottom: 80px;
          }

          .component {
            width: 100%;
            height: 200px;
            background: rgba(192, 204, 218, 0.1);
            border: 1px solid #ebecf0;
            padding: 17px 22px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;

            textarea {
              width: 100%;
              height: 100%;
              border: none;
              background: rgba(192, 204, 218, 0.001);

              ::placeholder,
              :-moz-placeholder,
              :-ms-input-placeholder,
              ::-moz-placeholder,
              ::-webkit-input-placeholder {
                font-size: 14px;
                color: #7a8499;
                text-align: justify;
                line-height: 28px;
              }
            }

            .experice_text {
              width: 100%;
              font-size: 12px;
              color: #b8becc;
              text-align: justify;
              line-height: 16px;
            }
          }

          .kaishi_fenxi {
            width: 100px;
            height: 28px;
            text-align: center;
            background: #03a971;
            border-radius: 3px;
            font-size: 14px;
            color: #ffffff;
            line-height: 28px;
            margin-top: 10px;
          }

          .kaishi_fenxi:hover {
            cursor: pointer;
          }

          .analy_result {
            width: 100%;
            background: rgba(192, 204, 218, 0.1);
            border: 1px solid #ebecf0;
            padding: 40px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .result {
              font-size: 14px;
              color: #3d4966;

              .xiaoji,
              .zhongxing,
              .jiji {
                margin-bottom: 15px;
                display: flex;
                align-items: center;

                img {
                  width: 30px;
                  margin-right: 20px;
                }
              }
            }

            .anfu {
              margin-top: 20px;
              font-size: 14px;
              color: #3d4966;
              line-height: 28px;
            }

            .qingxu_result {
              display: flex;
              align-items: center;

              .fumian,
              .zhongxing,
              .zhengxiang {
                display: flex;
                align-items: center;
                margin-right: 20px;
                opacity: 0.5;

                img {
                  width: 35px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }

      .experience_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;

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
            width: 590px;
            height: 100%;

            .RecDetail_left_bottom {
              width: 100%;
              height: 100%;
              position: relative;

              .Img_container {
                width: 100%;
                height: 90%;
                // background: rgba(192,204,218,0.10);
                position: relative;

                img {
                  height: 100%;
                  position: absolute;
                  left: 50%;
                  top: 0;
                  transform: translateX(-50%);
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
                  left: 50%;
                  top: 0;
                  transform: translateX(-50%);
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
                top: 110%;

                .ivu-col-span-8 {
                  height: auto !important;
                }

                /deep/ .ivu-spin-main {
                  width: 200px;
                  height: 200px;

                  /deep/ .ivu-spin-text {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    /deep/ .ivu-icon-ios-loading {
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
                  height: 30px;
                  align-items: center;

                  .ivu-upload {
                    /deep/ .ivu-upload-select {
                      .ivu-btn-default {
                        background: #03a971 !important;
                        border: none !important;

                        span {
                          color: #ffffff;
                        }
                      }
                    }

                    /deep/ .ivu-upload-list {
                      li {
                        display: none !important;
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
          margin-bottom: 15px;
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
              border: none !important;
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

          .title_container {
            display: flex;
            align-items: center;
            margin-bottom: 29px;
            width: 100%;
            justify-content: space-between;

            div {
              width: 50%;
              padding: 11px 12px;
              background: rgba(3, 169, 113, 0.1);
              font-size: 14px;
              color: #03a971;
              letter-spacing: 0;
              text-align: center;
            }

            div:nth-child(1) {
              margin-right: 10px;
            }
          }

          .chuliResult_container {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: center;

            .img_container {
              width: 50%;
              height: 180px;
              margin-right: 30px;
              display: flex;
              justify-content: center;

              img {
                height: 100%;
              }
            }
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
  }
</style>
