<template>
  <div class="experience experience1">
    <!-- 已完成的功能 -->
    <Spin fix v-if="isloading">
      <Icon type="ios-loading" size="76" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <!-- 通用物体和场景识别 -->
    <div class="fn_container" v-if="routeId == '3.1.1'">
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
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result"
              :key="index"
              style="display:flex"
            >
              <span style="width:100px">{{ item.keyword }}</span>
              <span style="flex:1"
                ><Progress
                  :percent="Number((item.score * 100).toFixed(2))"
                  status="active"
                >
                  <span>{{ Number(item.score).toFixed(2) }}</span></Progress
                ></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图像主体检测 -->
    <div class="fn_container" v-if="routeId == '3.1.2'">
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
              :before-upload="handleBeforeUpload1"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic1" alt="" v-show="cvaShow" />
                  <canvas id="canvas1" v-show="!cvaShow"></canvas>
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
            <div v-if="result1">
              <div style="width:100px">距上: {{ result1.top }}px</div>
              <div style="width:100px">距左: {{ result1.left }}px</div>
              <div style="width:100px">宽度: {{ result1.width }}px</div>
              <div style="width:100px">高度: {{ result1.height }}px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 通用商品识别 -->
    <div class="fn_container" v-if="routeId == '3.1.3'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload2"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
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
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result2"
              :key="index"
              style="display:flex"
            >
              <span style="width:80px">{{ item.root }}</span>
              <span style="flex:1">
                <Progress :percent="Number((item.score * 100).toFixed(2))">
                  <span>{{ Number(item.score).toFixed(2) }}</span>
                </Progress>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 品牌logo识别 -->
    <div class="fn_container" v-if="routeId == '3.1.4'">
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
        <div class="right">
          <div
            class="right_box"
            style="position:absolute;height:95%;overflow:scroll"
          >
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result3"
              :key="index"
              style="margin-bottom:20px"
            >
              <div>名称：{{ item.name }}</div>
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
    <!-- 植物识别 -->
    <div class="fn_container" v-if="routeId == '3.1.5'">
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
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result4"
              :key="index"
              style="display:flex"
            >
              <span style="width:80px">{{ item.name }}</span>
              <span style="flex:1">
                <Progress :percent="Number((item.score * 100).toFixed(2))">
                  <span>{{ Number(item.score).toFixed(2) }}</span>
                </Progress>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 动物识别 -->
    <div class="fn_container" v-if="routeId == '3.1.6'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload5"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
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
        <div class="right">
          <div class="right_box">
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result5"
              :key="index"
              style="display:flex"
            >
              <span style="width:80px">{{ item.name }}</span>
              <span style="flex:1">
                <Progress :percent="Number((item.score * 100).toFixed(2))">
                  <span>{{ Number(item.score).toFixed(2) }}</span>
                </Progress>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 地标识别 -->
    <div class="fn_container" v-if="routeId == '3.1.7'">
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
            <div class="title">识别结果：</div>
            <div>
              {{ result6 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 菜品识别 -->
    <div class="fn_container" v-if="routeId == '3.1.8'">
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
                  <img :src="uploadPic7" alt="" />
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
    <!-- 美食图片识别 -->
    <div class="fn_container" v-if="routeId == '3.1.9'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload8"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic8" alt="" />
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
            <div class="right_content" v-if="result8">
              <div v-if="result8.food">是美食</div>
              <div v-else>不是美食</div>
              <div>
                置信度：{{Number(result8.confidence * 100).toFixed(2) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 果蔬识别 -->
    <div class="fn_container" v-if="routeId == '3.1.10'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload9"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic9" alt="" />
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
              v-for="(item, index) in result9"
              :key="index"
              style="display:flex"
            >
              <span style="width:80px">{{ item.name }}</span>
              <span style="flex:1">
                <Progress :percent="Number((item.score * 100).toFixed(2))">
                  <span>{{ Number(item.score).toFixed(2) }}</span>
                </Progress>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 红酒识别 -->
    <div class="fn_container" v-if="routeId == '3.1.11'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload10"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic10" alt="" />
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
              v-if="result10"
              style="font-size: 14px;color: #3D4966;letter-spacing: 0;line-height: 28px;"
            >
              <div>名称：{{ result10.wineNameCn || result10.wineNameEn }}</div>
              <div>国家：{{ result10.countryCn }}</div>
              <div>产区：{{ result10.regionCn }}</div>
              <div>酒庄：{{ result10.wineryCn || result10.wineNameEn }}</div>
              <div>糖分：{{ result10.classifyBySugar }}</div>
              <div>色泽：{{ result10.color }}</div>
              <div>糖分：{{ result10.classifyBySugar }}</div>
              <div>品尝温度：{{ result10.tasteTemperature }}</div>
              <div>描述：{{ result10.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 货币识别 -->
    <div class="fn_container" v-if="routeId == '3.1.12'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload11"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic11" alt="" />
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
              v-if="result11"
              style="font-size: 14px;color: #3D4966;letter-spacing: 0;line-height: 28px;"
            >
              <div>名称：{{ result11.currencyName }}</div>
              <div>代码：{{ result11.currencyCode }}</div>
              <div>面值：{{ result11.currencyDenomination }}</div>
              <div>年份：{{ result11.year }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 门脸识别 -->
    <div class="fn_container" v-if="routeId == '3.1.13'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload12"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic12" alt="" />
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
          <div
            class="right_box"
            style="position:absolute;height:95%;overflow:scroll;width:334px;"
          >
            <div class="title">识别结果：</div>
            <div
              v-for="(item, index) in result12"
              :key="index"
              style="font-size: 14px;color: #3D4966;letter-spacing: 0;line-height: 28px;margin-bottom:20px"
            >
              <div>名称：{{ item.brief.txt_label }}</div>
              <div>置信度：{{ item.probability.toFixed(2) }}</div>
              <div>距上：{{ item.location.top }}</div>
              <div>距左：{{ item.location.left }}</div>
              <div>宽度：{{ item.location.width }}</div>
              <div>高度：{{ item.location.height }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 看图说话(接口有问题) -->
    <div class="fn_container" v-if="routeId == '3.1.14'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload13"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic13" alt="" />
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
              style="font-size: 14px;color: #3D4966;letter-spacing: 0;line-height: 28px;"
            >
              <div>{{ result13 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 多标签识别 -->
    <div class="fn_container" v-if="routeId == '3.1.15'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload14"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic14" alt="" />
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
              v-for="(item, index) in result14"
              :key="index"
              style="display:flex"
            >
              <span style="width:100px">{{ item.tag_name }}</span>
              <span style="flex:1">
                <Progress
                  :percent="Number(item.tag_confidence)"
                  status="active"
                >
                </Progress>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模糊图片识别 -->
    <div class="fn_container" v-if="routeId == '3.1.16'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload15"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic15" alt="" />
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
            <div v-if="result15">
              <div v-if="result15.fuzzy">模糊</div>
              <div v-else>不模糊</div>
              <div>
                置信度：{{
                  100 - Number(result15.confidence * 100).toFixed(2)
                }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 垃圾分类 -->
    <div class="fn_container" v-if="routeId == '3.1.18'">
      <div class="content">
        <div class="left">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload16"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic16" alt="" />
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
            <div v-if="result16" style="font-size: 14px;color: #3D4966;">
              <div>垃圾名称：{{ result16.garbage_name }}</div>
              <div>垃圾分类：{{ result16.cate_name }}</div>
              <!-- <div>城市名称：{{ result16.city_name }}</div> -->
              <div>
                识别置信：{{ Number(result16.confidence * 100).toFixed(2) }}%
              </div>
              <div>{{ result16.ps }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图像审核 -->
    <div class="fn_container" v-if="routeId == '3.2'">
      <div class="content">
        <div class="left">
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
                  <img :src="uploadPic20" alt="" />
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
            <div style="font-size: 14px;color: #3D4966;margin-bottom:20px">
              <!-- <div >色情识别：<span v-for="(item,index) in result20.data" :key="index" v-if="item.type==1">{{item.msg}}</span><span v-else>通过</span></div>
              <div >暴恐识别：<span v-if="result20.type==2">通过</span><span v-else>不通过</span></div>
              <div >恶心识别：<span v-if="result20.type==3">通过</span><span v-else>不通过</span></div>
              <div >水印码识别：<span v-if="result20.type==4"><span v-if="result20.type==0">通过</span><span v-else>不通过</span></span></div>
              <div >二维码识别：<span v-if="result20.type==5">通过</span><span v-else>不通过</span></div>
              <div >条形码识别：<span v-if="result20.type==6">通过</span><span v-else>不通过</span></div>
              <div >政治人物识别：<span v-if="result20.type==7">通过</span><span v-else>不通过</span></div>
              <div >敏感词识别：<span v-if="result20.type==8">通过</span><span v-else>不通过</span></div>
              <div >公众人物识别：<span v-if="result20.type==11">通过</span><span v-else>不通过</span></div> -->
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
    <!-- 图像去雾 -->
    <div class="fn_container" v-if="routeId == '3.4.1'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload41"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic41" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result41" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图像修复 -->
    <div class="fn_container" v-if="routeId == '3.4.2'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload42"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic42" alt="" />
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
        <div class="right right1">
          <img :src="result42" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图像无损放大 -->
    <div class="fn_container" v-if="routeId == '3.4.3'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload43"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic43" alt="" />
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
        <div
          class="right right1"
          style="overflow:hidden"
          :class="{ whFlag: !whFlag }"
        >
          <img :src="result43" alt="" style="transform:scale(1.5)" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 拉伸图像恢复 -->
    <div class="fn_container" v-if="routeId == '3.4.4'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload44"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic streth" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic44" alt="" />
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
        <div class="right right1">
          <img :src="result44" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 黑白图像上色 -->
    <div class="fn_container" v-if="routeId == '3.4.5'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload45"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic45" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result45" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图像风格转换 -->
    <div class="fn_container" v-if="routeId == '3.4.6'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload46"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic46" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result46" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
      <div class="option">
        <div
          class="tag"
          :class="{ tagActive: option == item.value }"
          v-for="(item, index) in optionList"
          :key="index"
          @click="queryOption(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 图像对比强度 -->
    <div class="fn_container" v-if="routeId == '3.4.7'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload47"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic47" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result47" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 滤镜 -->
    <div class="fn_container" v-if="routeId == '3.4.9'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload49"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic49" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result49" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
      <div class="option">
        <div
          class="tag1"
          :class="{ tagActive1: option1 == item.value }"
          v-for="(item, index) in optionList1"
          :key="index"
          @click="queryOption1(item)"
        >
          <img :src="item.imgUrl" alt="" />
          <div class="typeText">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- 大头贴 -->
    <div class="fn_container" v-if="routeId == '3.4.10'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload50"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic50" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result50" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
      <div class="option">
        <div
          class="tag1"
          :class="{ tagActive1: option2 == item.value }"
          v-for="(item, index) in optionList2"
          :key="index"
          @click="queryOption2(item)"
        >
          <img :src="item.imgUrl" alt="" />
          <div class="typeText">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- 人脸变妆 -->
    <div class="fn_container" v-if="routeId == '3.4.11'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload411"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic411" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result411" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
      <div class="option">
        <div
          class="tag1"
          :class="{ tagActive1: option4 == item.value }"
          v-for="(item, index) in optionList4"
          :key="index"
          @click="queryOption411(item)"
        >
          <img :src="item.imgUrl" alt="" />
          <div class="typeText">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <!-- 人脸美妆 -->
    <div class="fn_container" v-if="routeId == '3.4.12'">
      <div class="content">
        <div class="left  left_box1">
          <div class="left_box">
            <Upload
              ref="upload"
              type="drag"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload412"
              :max-size="5120"
              style="width:100%;height:100%"
              action=""
            >
              <div class="left_up">
                <div class="pic" :class="{ whFlag: !whFlag }">
                  <img :src="uploadPic412" alt="" />
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
        <div class="right right1" :class="{ whFlag: !whFlag }">
          <img :src="result412" alt="" />
          <div class="intro">
            <div class="text">优化后</div>
          </div>
        </div>
      </div>
      <div class="option">
        <div
          class="tag1"
          :class="{ tagActive1: option3 == item.value }"
          v-for="(item, index) in optionList3"
          :key="index"
          @click="queryOption3(item)"
        >
          <img :src="item.imgUrl" alt="" />
          <div class="typeText">{{ item.name }}</div>
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
      cvaShow: true,
      whFlag: true,
      isloading: true,
      formData411: "",
      result411: "",
      uploadPic411:window.config.iconUrl+"/static/images/xiaoguo/facedecoration-demo.jpg",
      option4: "1",
      optionList4: [
        {
          name: "埃及妆",
          value: "1",
           img:require('@/assets/images/tuxiang/aiji.png'),
          imgUrl: "./static/images/xiaoguo/aiji.jpg"
        },
        {
          name: "巴西土著妆",
          value: "2",
           img:require('@/assets/images/tuxiang/baxi.png'),
          imgUrl: "./static/images/xiaoguo/baxi.jpg"
        },
        {
          name: "灰姑娘妆",
          value: "3",
           img:require('@/assets/images/tuxiang/huiguniang.png'),
          imgUrl: "./static/images/xiaoguo/huiguniang.jpg"
        },
        {
          name: "恶魔妆",
          value: "4",
           img:require('@/assets/images/tuxiang/emo.png'),
          imgUrl: "./static/images/xiaoguo/emo.jpg"
        }
      ],
      formData412: "",
      result412: "",
      uploadPic412:window.config.iconUrl+"/static/images/xiaoguo/chuli.jpg",
      option3: "7",
      optionList3: [

        {
          name: "闪亮",
          value: "7",
          img:require('@/assets/images/tuxiang/shanliang.png'),
          imgUrl: "./static/images/xiaoguo/shanliang.jpg"
        },
        {
          name: "芭比",
          value: "1",
          img:require('@/assets/images/tuxiang/babi.png'),
          imgUrl: "./static/images/xiaoguo/shanliang.jpg"
        },
        {
          name: "清透",
          value: "2",
          img:require('@/assets/images/tuxiang/qingtou.png'),
          imgUrl: "./static/images/xiaoguo/shanliang.jpg"
        },
        {
          name: "烟灰",
          value: "3",
          img:require('@/assets/images/tuxiang/yanhui.png'),
          imgUrl: "./static/images/xiaoguo/shanliang.jpg"
        }
      ],

      option1: "1",
      optionList1: [
        {
          name: "黛紫",
          value: "1",
          img:require('@/assets/images/tuxiang/daizi.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/daiZi.png"
        },
        {
          name: "错觉",
          value: "4",
          img:require('@/assets/images/tuxiang/cuojue.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/cuoJue.png"
        },
        {
          name: "墨",
          value: "12",
          img:require('@/assets/images/tuxiang/mo.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/fengNen.png"
        },
        {
          name: "佛罗伦萨",
          value: "24",
          img:require('@/assets/images/tuxiang/foluo.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/jingYan.png"
        }
      ],
      formData49: "",
      result49: "",
      uploadPic49:window.config.iconUrl+"/static/images/xiaoguo/imgfilter-demo.jpg",
      option2: "1",
      optionList2: [
        {
          name: "NewDay",
          value: "1",
          img:require('@/assets/images/tuxiang/NewDay.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/d-1-0ca04dd072.jpg"
        },
        {
          name: "欢乐球吃球",
          value: "2",
          img:require('@/assets/images/tuxiang/qiu.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/d-2-3cc7cb85e1.jpg"
        },
        {
          name: "Bonvoyoge",
          value: "3",
          img:require('@/assets/images/tuxiang/bon.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/d-3-cdb03e26bc.jpg"
        },
        {
          name: "Enjoy",
          value: "4",
          img:require('@/assets/images/tuxiang/enjoy.png'),
          imgUrl:window.config.iconUrl+"/static/images/xiaoguo/d-4-d72d2393e6.jpg"
        }
      ],
      formData50: "",
      result50: "",
      uploadPic50:window.config.iconUrl+"/static/images/xiaoguo/sticker-demo.jpg",

      option: "cartoon",
      optionList: [
        {
          img:require('@/assets/images/tuxiang/katong.png'),
          name: "卡通画风格",
          value: "cartoon"
        },
        {
          img:require('@/assets/images/tuxiang/qianbi.png'),
          name: "铅笔风格",
          value: "pencil"
        },
        {
          img:require('@/assets/images/tuxiang/caiqian.png'),
          name: "彩色铅笔画风格",
          value: "color_pencil"
        },
        {
          img:require('@/assets/images/tuxiang/caitang.png'),
          name: "彩色糖块油画风格",
          value: "warm"
        },
        {
          img:require('@/assets/images/tuxiang/chonglang.png'),
          name: "神奈川冲浪里油画风格",
          value: "wave"
        },
        {
          img:require('@/assets/images/tuxiang/xuncao.png'),
          name: "薰衣草油画风格",
          value: "lavender"
        },
        {
          img:require('@/assets/images/tuxiang/qiyou.png'),
          name: "奇异油画风格",
          value: "mononoke"
        },
        {
          img:require('@/assets/images/tuxiang/nahan.png'),
          name: "呐喊油画风格",
          value: "scream"
        },
        {
           img:require('@/assets/images/tuxiang/geyou.png'),
          name: "哥特油画风格",
          value: "gothic"
        }
      ],
      result47: "",
      uploadPic47: window.config.iconUrl+"/static/images/xiaoguo/3.png",
      formData46: "",
      result46: "",
      uploadPic46:window.config.iconUrl+"/static/images/xiaoguo/11.png",
      result45: "",
      uploadPic45: window.config.iconUrl+"/static/images/xiaoguo/2.jpg",
      result44: "",
      uploadPic44: window.config.iconUrl+"/static/images/xiaoguo/9.png",
      result43: "",
      uploadPic43: window.config.iconUrl+"/static/images/xiaoguo/5.png",
      result42: "",
      uploadPic42:window.config.iconUrl+"/static/images/xiaoguo/13.png",
      result41: "",
      uploadPic41: window.config.iconUrl+"/static/images/xiaoguo/1.png",
      result20: [],
      uploadPic20: window.config.iconUrl+"/static/images/shibie/31.png",
      result16: null,
      uploadPic16: window.config.iconUrl+"/static/images/shibie/18.png",
      result15: null,
      uploadPic15: window.config.iconUrl+"/static/images/shibie/14.png",
      result14: [],
      uploadPic14: window.config.iconUrl+"/static/images/shibie/13.png",
      result13: "",
      uploadPic13: window.config.iconUrl+"/static/images/shibie/12.png",
      result12: [],
      uploadPic12: window.config.iconUrl+"/static/images/shibie/11.png",
      result11: "",
      uploadPic11: window.config.iconUrl+"/static/images/shibie/10.png",
      result10: "",
      uploadPic10: window.config.iconUrl+"/static/images/shibie/9.png",
      result9: "",
      uploadPic9: window.config.iconUrl+"/static/images/shibie/8.png",
      result8: "",
      uploadPic8:window.config.iconUrl+"/static/images/xiaoguo/food-d-2.jpg",
      result7: [],
      uploadPic7: window.config.iconUrl+"/static/images/shibie/6.png",
      result6: "",
      uploadPic6: window.config.iconUrl+"/static/images/shibie/7.png",
      result5: [],
      uploadPic5: window.config.iconUrl+"/static/images/shibie/5.png",
      result4: [],
      uploadPic4: window.config.iconUrl+"/static/images/shibie/4.png",
      result3: [],
      uploadPic3: window.config.iconUrl+"/static/images/shibie/3.png",
      result2: [],
      uploadPic2: window.config.iconUrl+"/static/images/shibie/16.png",
      result1: null,
      uploadPic1: window.config.iconUrl+"/static/images/shibie/2.png",
      result: [],
      uploadPic: window.config.iconUrl+"/static/images/shibie/1.png"
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
      this.isloading = true;
      if (this.routeId == "3.1.1") {
        this.getImg1(this.uploadPic, () => {
          this.upload(this.uploadPic);
        });
      } else if (this.routeId == "3.1.2") {
          this.getImg1(this.uploadPic1,()=>{
            this.upload1(this.uploadPic1);
          })
      } else if (this.routeId == "3.1.3") {
          this.getImg1(this.uploadPic2,()=>{
            this.upload2(this.uploadPic2);
          })
      } else if (this.routeId == "3.1.4") {
          this.getImg1(this.uploadPic3,()=>{
            this.upload3(this.uploadPic3);
          })
      } else if (this.routeId == "3.1.5") {
          this.getImg1(this.uploadPic4,()=>{
            this.upload4(this.uploadPic4);
          })
      } else if (this.routeId == "3.1.6") {
          this.getImg1(this.uploadPic5,()=>{
            this.upload5(this.uploadPic5);
          })
      } else if (this.routeId == "3.1.7") {
          this.getImg1(this.uploadPic6,()=>{
            this.upload6(this.uploadPic6);
          })
      } else if (this.routeId == "3.1.8") {
          this.getImg1(this.uploadPic7,()=>{
            this.upload7(this.uploadPic7);
          })
      } else if (this.routeId == "3.1.9") {
          this.getImg1(this.uploadPic8,()=>{
            this.upload8(this.uploadPic8);
          })
      } else if (this.routeId == "3.1.10") {
          this.getImg1(this.uploadPic9,()=>{
            this.upload9(this.uploadPic9);
          })
      } else if (this.routeId == "3.1.11") {
          this.getImg1(this.uploadPic10,()=>{
            this.upload10(this.uploadPic10);
          })
      } else if (this.routeId == "3.1.12") {
          this.getImg1(this.uploadPic11,()=>{
            this.upload11(this.uploadPic11);
          })
      } else if (this.routeId == "3.1.13") {
          this.getImg1(this.uploadPic12,()=>{
            this.upload12(this.uploadPic12);
          })
      } else if (this.routeId == "3.1.14") {
          this.getImg1(this.uploadPic13,()=>{
            this.upload13(this.uploadPic13);
          })
      } else if (this.routeId == "3.1.15") {
          this.getImg1(this.uploadPic14,()=>{
            this.upload14(this.uploadPic14);
          })
      } else if (this.routeId == "3.1.16") {
          this.getImg1(this.uploadPic15,()=>{
            this.upload15(this.uploadPic15);
          })
      } else if (this.routeId == "3.1.18") {
          this.getImg1(this.uploadPic16,()=>{
            this.upload16(this.uploadPic16);
          })
      } else if (this.routeId == "3.2") {
          this.getImg1(this.uploadPic20,()=>{
            this.upload20(this.uploadPic20);
          })
      } else if (this.routeId == "3.4.1") {
          this.getImg1(this.uploadPic41,()=>{
            this.upload41(this.uploadPic41);
          })
      } else if (this.routeId == "3.4.2") {
          this.getImg1(this.uploadPic42,()=>{
            this.upload42(this.uploadPic42);
          })
      } else if (this.routeId == "3.4.3") {
          this.getImg1(this.uploadPic43,()=>{
            this.upload43(this.uploadPic43);
          })
      } else if (this.routeId == "3.4.4") {
          this.getImg1(this.uploadPic44,()=>{
            this.upload44(this.uploadPic44);
          })
      } else if (this.routeId == "3.4.5") {
          this.getImg1(this.uploadPic45,()=>{
            this.upload45(this.uploadPic45);
          })
      } else if (this.routeId == "3.4.6") {
          this.getImg1(this.uploadPic46,()=>{
            this.upload46(this.optionList[0].img);
          })
      } else if (this.routeId == "3.4.7") {
          this.getImg1(this.uploadPic47,()=>{
            this.upload47(this.uploadPic47);
          })
      } else if (this.routeId == "3.4.9") {
          this.getImg1(this.uploadPic49,()=>{
            this.upload49(this.optionList1[0].img);
          })
      } else if (this.routeId == "3.4.10") {
          this.getImg1(this.uploadPic50,()=>{
            this.upload50(this.optionList2[0].img);
          })
      } else if (this.routeId == "3.4.11") {
          this.getImg1(this.uploadPic411,()=>{
            this.upload411(this.optionList4[0].img);
          })
      } else if (this.routeId == "3.4.12") {
          this.getImg1(this.uploadPic412,()=>{
            this.upload412(this.optionList3[0].img);
          })
      }
    },

    queryOption3(item) {
      this.option3 = item.value;
      if (this.formData412) {
        this.handleBeforeUpload412();
      } else {
        this.upload412(item.img);
      }
    },
    handleBeforeUpload412(file) {
      let _this = this;
      if (file) {
        imgPreviewBase64(_this, file, function(base64) {
          _this.uploadPic412 = base64;
          getImgSize(_this.uploadPic412).then(res => {
            _this.whFlag = res.flag;
          });
        });
        this.formData412 = new FormData(); //创建form对象
        this.formData412.append("files", file); //
      }
      this.isloading = true;
      this.result412 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:
          window.config.url+"/ai/face/facecosmetic?img_type=FILES&cosmetic=" +
          this.option3,
        data: this.formData412
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result412 =
              "data:image/png;base64," + res.data.data.data.image;
            getImgSize(this.result412).then(res => {
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
    upload412(base) {
      // this.result412 = "";
      // this.isloading = true;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/face/facecosmetic",
      //   params: {
      //     img_type: "URL",
      //     image_param: base,
      //     cosmetic: this.option3
      //   }
      // })
      //   .then(res => {
            this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result412 =base;
              //"data:image/png;base64," + res.data.data.data.image;
            getImgSize(this.result412).then(res => {
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
    queryOption411(item) {
      this.option4 = item.value;
      if (this.formData411) {
        this.handleBeforeUpload411();
      } else {
        this.upload411(item.img);
      }
    },
    handleBeforeUpload411(file) {
      let _this = this;
      if (file) {
        imgPreviewBase64(_this, file, function(base64) {
          _this.uploadPic411 = base64;
          getImgSize(_this.uploadPic411).then(res => {
            _this.whFlag = res.flag;
          });
        });
        this.formData411 = new FormData(); //创建form对象
        this.formData411.append("files", file); //
      }
      this.isloading = true;
      this.result411 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url+"/ai/face/facedecoration?img_type=FILES&decoration=" +
          this.option4,
        data: this.formData411
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result411 =
              "data:image/png;base64," + res.data.data.data.image;
            getImgSize(this.result411).then(res => {
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
    upload411(base) {
      // this.result411 = "";
      // this.isloading = true;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/face/facedecoration",
      //   params: {
      //     img_type: "URL",
      //     image_param: base,
      //     decoration: this.option4
      //   }
      // })
      //   .then(res => {
             this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result411 =base
              // "data:image/png;base64," + res.data.data.data.image;
            getImgSize(this.result411).then(res => {
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

    queryOption2(item) {
      this.option2 = item.value;
      if (this.formData50) {
        this.handleBeforeUpload50();
      } else {
        this.upload50(item.img);
      }
    },
    handleBeforeUpload50(file) {
      let _this = this;
      if (file) {
        imgPreviewBase64(_this, file, function(base64) {
          _this.uploadPic50 = base64;
          getImgSize(_this.uploadPic50).then(res => {
            _this.whFlag = res.flag;
          });
        });
        this.formData50 = new FormData(); //创建form对象
        this.formData50.append("files", file); //
      }
      this.isloading = true;
      this.result50 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:
          window.config.url+"/ai/face/facesticker?img_type=FILES&sticker=" +
          this.option2,
        data: this.formData50
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result50 = "data:image/png;base64," + res.data.data.data.image;
            getImgSize(this.result50).then(res => {
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
    upload50(base) {
      // this.isloading = true;
      // this.result50 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/face/facesticker",
      //   params: {
      //     img_type: "URL",
      //     image_param: base,
      //     sticker: this.option2
      //   }
      // })
      //   .then(res => {
            this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result50 = base;
            getImgSize(this.result50).then(res => {
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
    queryOption1(item) {
      this.option1 = item.value;
      if (this.formData49) {
        this.handleBeforeUpload49();
      } else {
        this.upload49(item.img);
      }
    },
    handleBeforeUpload49(file) {
      let _this = this;
      if (file) {
        imgPreviewBase64(_this, file, function(base64) {
          _this.uploadPic49 = base64;
          getImgSize(_this.uploadPic49).then(res => {
            _this.whFlag = res.flag;
          });
        });
        this.formData49 = new FormData(); //创建form对象
        this.formData49.append("files", file); //
      }
      this.isloading = true;
      this.result49 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url+"/ai/face/imgfilter?img_type=FILES&filter=" + this.option1,
        data: this.formData49
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result49 = "data:image/png;base64," + res.data.data.data.image;
            getImgSize(this.result49).then(res => {
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
    upload49(base) {
      // this.isloading = true;
      // this.result49 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/face/imgfilter",
      //   params: {
      //     img_type: "URL",
      //     image_param: base,
      //     filter: this.option1
      //   }
      // })
      //   .then(res => {
             this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
               this.result49 = base;
      //       getImgSize(this.result49).then(res => {
      //         this.whFlag = res.flag;
      //       });
      //     } else {
      //       this.$Message.error("请求失败");
      //     }
      //   })
      //   .catch(err => {
      //     this.isloading = false;
      //     console.log(err);
      //   });
    },
    handleBeforeUpload47(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic47 = base64;
        getImgSize(_this.uploadPic47).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result47 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/contrastenhance?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result47 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result47).then(res => {
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
    upload47(base) {
      // this.isloading = true;
      // this.result47 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/contrastenhance",
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
            this.result47 = require("@/assets/images/tuxiang/shantou.png");
            getImgSize(this.result47).then(res => {
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
    handleBeforeUpload46(file) {
      let _this = this;
      if (file) {
        if (file.size / 1024 / 1024 > 1) {
          this.$Message.error("上传图片大小不能超过5M,请重新上传");
          return false;
        }
        imgPreviewBase64(_this, file, function(base64) {
          _this.uploadPic46 = base64;
          getImgSize(_this.uploadPic46).then(res => {
            _this.whFlag = res.flag;
          });
        });

        this.formData46 = new FormData(); //创建form对象
        this.formData46.append("files", file); //
      }
      this.isloading = true;
      this.result46 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:
          window.config.url+"/ai/image/styletrans?img_type=FILES&option=" + this.option,
        data: this.formData46
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result46 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result46).then(res => {
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
    upload46(base) {
      // this.isloading = true;
      // this.result46 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/styletrans",
      //   params: {
      //     img_type: "URL",
      //     image_param: base,
      //     option: this.option
      //   }
      // })
      //   .then(res => {
             this.isloading = false;
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.result46 = base;
            getImgSize(this.result46).then(res => {
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
    queryOption(item) {
      this.option = item.value;
      if (this.formData46) {
        this.handleBeforeUpload46();
      } else {
        this.upload46(item.img);
      }
    },
    handleBeforeUpload45(file) {
      let _this = this;
      if (file.size / 1024 / 1024 > 1) {
        this.$Message.error("上传图片大小不能超过5M,请重新上传");
        return false;
      }
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic45 = base64;
        getImgSize(_this.uploadPic45).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result45 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/colourize?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result45 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result45).then(res => {
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
    upload45(base) {
      // this.isloading = true;
      // this.result45 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/colourize",
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
              this.result45 = require("@/assets/images/tuxiang/shangse.png");
              getImgSize(this.result45).then(res => {
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
    handleBeforeUpload44(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic44 = base64;
        getImgSize(_this.uploadPic44).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result44 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/stretchrestore?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result44 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result44).then(res => {
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
    upload44(base) {
      // this.isloading = true;
      // this.result44 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/stretchrestore",
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
            this.result44 =  require("@/assets/images/tuxiang/lashen.png");
            getImgSize(this.result44).then(res => {
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
    handleBeforeUpload43(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic43 = base64;
        getImgSize(_this.uploadPic43).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result43 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/qualityenhance?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result43 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result43).then(res => {
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
    upload43(base) {
      // this.isloading = true;
      // this.result43 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/qualityenhance",
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
               this.result43 = require("@/assets/images/tuxiang/wusong.png");
      //       getImgSize(this.result43).then(res => {
      //         this.whFlag = res.flag;
      //       });
      //     } else {
      //       this.$Message.error("请求失败");
      //     }
      //   })
      //   .catch(err => {
      //     this.isloading = false;
      //     console.log(err);
      //   });
    },
    handleBeforeUpload42(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic42 = base64;
        getImgSize(_this.uploadPic42).then(res => {
          _this.whFlag = res.flag;
        });
      });
      this.result42 = "";
      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/inpainting?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result42 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result42).then(res => {
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
    upload42(base) {
      this.isloading = true;
      this.result42 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/inpainting",
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
            this.result42 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result42).then(res => {
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
    handleBeforeUpload41(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic41 = base64;
        getImgSize(_this.uploadPic41).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result41 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/dehaze?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result41 = "data:image/png;base64," + res.data.data.image;
            getImgSize(this.result41).then(res => {
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
    upload41(base) {
      // this.isloading = true;
      // this.result41 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/dehaze",
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
            this.result41 = require("@/assets/images/tuxiang/quwu.png");
            getImgSize(this.result41).then(res => {
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
    handleBeforeUpload20(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
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
        url: window.config.url+"/ai/image/censor?img_type=FILES&type=0",
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
    upload20(base) {
        this.isloading=false;
            this.result20 = [
              {
                msg: "通过",
                name: "色情识别"
              },
              {
                msg: "存在暴恐旗帜不合规",
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
                msg: "存在公众人物不合规",
                name: "公众人物识别"
              },
              {
                msg: "通过",
                name: "敏感词识别"
              }
            ];
    },
    handleBeforeUpload16(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic16 = base64;
        getImgSize(_this.uploadPic16).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result16 = null;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url+"/ai/image/rubbishClassification?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            if (!res.data.data.result.garbage_info) {
              this.$Message.error(res.data.data.result.message);
              return;
            }
            let arr=res.data.data.result.garbage_info.sort((a,b)=>{ return b.confidence-a.confidence})//升序
            console.log(arr);
            this.result16 = arr[0];
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload16(base) {
      // this.isloading = true;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/rubbishClassification",
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
            this.result16 = {"city_name":"北京市","ps":"投放建议：投放至可回收物收集容器或者回收设施，也可以交予再生资源回收经营者","garbage_name":"塑料垃圾","confidence":0.3602660664419358,"cate_name":"可回收物","city_id":"110000"};
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload15(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic15 = base64;
        getImgSize(_this.uploadPic15).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result15 = null;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/imageReco/vagueImage?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result15 = res.data.data.data;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload15(base) {
      // this.isloading = true;
      // this.result15 = null;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/imageReco/vagueImage",
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
            this.result15 = {"confidence":0,"fuzzy":false};
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload14(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic14 = base64;
        getImgSize(_this.uploadPic14).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result14 = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/imageReco/tagIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result14 = res.data.data.data.tag_list;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload14(base) {
      // this.isloading = true;
      // this.result14 = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/imageReco/tagIdentify",
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
            this.result14 = [{"tag_confidence":34,"tag_name":"屏幕"},{"tag_confidence":15,"tag_name":"灯"}];
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload13(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic13 = base64;
        getImgSize(_this.uploadPic13).then(res => {
          _this.whFlag = res.flag;
        });
      });
      let formData = new FormData();
      formData.append("files", file);
      this.isloading = true;
      this.result13 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url+"/ai/imageReco/pictureDescribe?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.ifShowLoading = false;
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result13 = res.data.data.data.text;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          this.ifShowLoading = false;
          console.log(err);
        });
    },
    upload13(base) {
      // this.isloading = true;
      // this.result13 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/imageReco/pictureDescribe",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     this.ifShowLoading = false;
          this.isloading = false;
          // if (res.data.code == 200000) {
          //   if (!res.data.data) {
          //     this.$Message.error("返回数据为空");
          //     return;
          //   }
            this.result13 = '一个男人坐在桌子旁.';
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   this.ifShowLoading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload12(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic12 = base64;
        getImgSize(_this.uploadPic13).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result12 = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url+"/ai/image/shopfrontIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result12 = res.data.data.result;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload12(base) {
      // this.isloading = true;
      // this.result12 = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/shopfrontIdentify",
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
            this.result12 = [{"brief":{"txt_label":"哈根达斯"},"probability":0.98369467258453,"contsign":"2602875819,3367916260","location":{"top":199,"left":550,"width":626,"height":116},"type":0},{"brief":{"txt_label":"Haagen.Dazs"},"probability":0.96104568243027,"contsign":"4037082984,3976813077","location":{"top":218,"left":262,"width":192,"height":63},"type":0},{"brief":{"txt_label":"SE.Disen"},"probability":0.9411393404007,"contsign":"418341257,1686332609","location":{"top":398,"left":186,"width":289,"height":183},"type":0},{"brief":{"txt_label":"安奈儿"},"probability":0.934306204319,"contsign":"1614500364,1932192154","location":{"top":431,"left":668,"width":544,"height":188},"type":0},{"brief":{"txt_label":"伊伴"},"probability":0.91979175806046,"contsign":"4033250599,2522166576","location":{"top":479,"left":212,"width":260,"height":101},"type":0},{"brief":{"txt_label":"CROCODILE"},"probability":0.90811038017273,"contsign":"3992008516,3984083753","location":{"top":439,"left":626,"width":253,"height":137},"type":0},{"brief":{"txt_label":"黄记煌"},"probability":0.90243327617645,"contsign":"1511227030,3332095374","location":{"top":439,"left":694,"width":368,"height":107},"type":0}];
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload11(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic11 = base64;
        getImgSize(_this.uploadPic11).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result11 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/currencyIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result11 = res.data.data.result;
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload11(base) {
      // this.isloading = true;
      // this.result11 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/currencyIdentify",
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
            this.result11 = {"currencyName":"捷克克朗","year":"1995年","currencyDenomination":"100","currencyCode":"CZK","hasdetail":1};
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
    },
    handleBeforeUpload10(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic10 = base64;
        getImgSize(_this.uploadPic10).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result10 = "";
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/redWineIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result10 = res.data.data.result;
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
      // this.isloading = true;
      // this.result10 = "";
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/redWineIdentify",
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
            this.result10 = {"countryEn":"Italy","grapeEn":"","grapeCn":"","color":"浅石榴红色/Light Garnet","regionCn":"皮埃蒙特","regionEn":"Piedmont(Piemonte)","subRegionEn":"Barolo DOCG","description":"此酒带有木炭、烟雾和梅花的香气，口感浓郁，具有天鹅绒般的单宁和纯李子、树莓的味道。","subRegionCn":"巴罗洛优质法定产区","classifyByColor":"红葡萄酒/Red Wine","wineryEn":"Luciano Sandrone","wineryCn":"绅洛酒庄","wineNameCn":"绅洛酒庄坎博斯红葡萄酒","classifyBySugar":"干型/Dry","wineNameEn":"Luciano Sandrone Cannubi Boschis","tasteTemperature":"14-18℃","hasdetail":1,"countryCn":"意大利"};
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
        //   console.log(err);
        // });
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
        url:window.config.url+"/ai/image/gardenStuffIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result9 = res.data.data.result;
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
      //   url: window.config.url+"/ai/image/gardenStuffIdentify",
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
            this.result9 = [{"score":0.664268434047699,"name":"黄瓜"},{"score":0.328054279088974,"name":"乳瓜"},{"score":0.005129735916852951,"name":"丝瓜"},{"score":0.0005146354087628424,"name":"非果蔬食材"},{"score":0.00043593437294475734,"name":"瓠瓜"}]
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
        url: window.config.url+"/ai/imageReco/foodImage?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            if (res.data.data.ret!=0) {
              this.$Message.error(res.data.data.msg);
              return;
            }
            this.result8 = res.data.data.data;
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
      //   url: window.config.url+"/ai/imageReco/foodImage",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result8 = {
              confidence:0.999988,
              food:true
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
    handleBeforeUpload7(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
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
        url: window.config.url+"/ai/image/varietyIdentify?img_type=FILES",
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
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/varietyIdentify",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result7 = [{"probability":"0.370815","has_calorie":true,"calorie":"724","name":"沙拉"},{"probability":"0.259651","has_calorie":true,"calorie":"136","name":"水果沙拉"},{"probability":"0.222224","has_calorie":true,"calorie":"39","name":"蔬菜沙拉"},{"probability":"0.0607035","has_calorie":true,"calorie":"97","name":"海鲜沙拉"},{"probability":"0.0303073","has_calorie":true,"calorie":"884","name":"牛油果沙拉"}];
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
        url: window.config.url+"/ai/image/landmarkIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result6 = res.data.data.result.landmark;
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
      //   url: window.config.url+"/ai/image/landmarkIdentify",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result6 = "悉尼歌剧院";
        //   } else {
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
      this.result5 = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/animalIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result5 = res.data.data.result;
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
      // this.result5 = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/animalIdentify",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result5 = [{"score":"0.915497","name":"树蛙"},{"score":"0.0753532","name":"黑斑蛙"},{"score":"0.00257039","name":"雨蛙"},{"score":"0.000666314","name":"透明蛙"},{"score":"0.000613206","name":"中国树蟾"},{"score":"0.0003866","name":"叶泡蛙"}];
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
        url: window.config.url+"/ai/image/botanyIdentify?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result4 = res.data.data.result;
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
      //   url: window.config.url+"/ai/image/botanyIdentify",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result4 = [{"score":0.8589122295379639,"name":"蝴蝶兰"},{"score":0.0032923344988375902,"name":"扁竹"},{"score":0.0019315893296152353,"name":"蝴蝶花"}];
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
      this.result3 = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/brandLogo?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result3 = res.data.data.result;
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
      // this.result3 = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/brandLogo",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result3 = [{"probability":0.43226444125175,"name":"星巴克","location":{"top":511,"left":646,"width":142,"height":153},"type":1},{"probability":0.19983013788134,"name":"太阳金业","location":{"top":536,"left":930,"width":133,"height":126},"type":1}];
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
      this.result2 = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/generalProduct?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result2 = res.data.data.result.items[0].cid_list;
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
      // this.result2 = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/generalProduct",
      //   params: {
      //     img_type: "URL",
      //     image_param: base
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code == 200000) {
      //       if (!res.data.data) {
      //         this.$Message.error("返回数据为空");
      //         return;
      //       }
            this.isloading = false;
            this.result2 = [
              {"score":0.96517533,"root":"鞋靴"},
              {"score":0.95897853,"root":"鞋靴"},
              {"score":0.8034621,"root":"时尚女鞋"},
              {"score":0.98957527,"root":"高跟鞋"}
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
    handleBeforeUpload1(file) {
      let _this = this;
      imgPreviewBase64(_this, file, function(base64) {
        _this.uploadPic1 = base64;
        getImgSize(_this.uploadPic1).then(res => {
          _this.whFlag = res.flag;
        });
      });

      let formData = new FormData(); //创建form对象
      formData.append("files", file); //
      this.isloading = true;
      this.result1 = null;
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url: window.config.url+"/ai/image/imageBody?img_type=FILES",
        data: formData
      })
        .then(res => {
          this.isloading = false;
          if (res.data.code == 200000) {
            if (!res.data.data) {
              this.$Message.error("返回数据为空");
              return;
            }
            this.result1 = res.data.data.result;
            this.DrawImg1(this.result1, "canvas1", this.uploadPic1);
          } else {
            this.$Message.error("请求失败");
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    upload1(base) {
      // this.isloading = true;
      // this.result1 = null;
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/imageBody",
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
            this.result1 = {top: 136, left: 133, width: 754, height: 694};
            this.cvaShow = false;
            this.$nextTick(()=>{
              this.DrawImg1(this.result1, "canvas1", this.uploadPic1);
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
      this.result = [];
      this.$axios({
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        url:window.config.url+"/ai/image/generalSceneIdentify?img_type=FILES",
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
      // this.result = [];
      // this.$axios({
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "post",
      //   url: window.config.url+"/ai/image/generalSceneIdentify",
      //   params: {
      //     img_type: "URL",
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
            this.isloading = false;
            this.result = [{"score":0.612804,"root":"商品-电脑办公","keyword":"笔记本电脑"},{"score":0.423839,"root":"商品-电脑办公","keyword":"笔记本"},{"score":0.287246,"root":"商品-电脑办公","keyword":"电脑"},{"score":0.153652,"root":"商品-数码产品","keyword":"台式电脑"},{"score":0.008215,"root":"商品-数码产品","keyword":"平板电脑"}];
        //   } else {
        //     this.$Message.error("请求失败");
        //   }
        // })
        // .catch(err => {
        //   this.isloading = false;
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
      image.crossOrigin = "anonymous";
      image.onload = () => {
        var base64 = this.getBase64Image(image);
        callback(base64);
      };
    },
    getImg1(val, callback) {
      var img = val;
      var image = new Image();
      image.src = img;
      image.crossOrigin = "anonymous";
      image.onload = () => {
        callback();
      };
    },
    DrawImg1(list, id, url) {
      var canvas = document.getElementById(id);
      console.log(canvas);
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = url;
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = "#44D7B6";
        ctx.lineWidth = 5;
        ctx.strokeRect(list.left, list.top, list.width, list.height);
      };
    }
  }
};
</script>

<style lang="less">
.experience1 {
  position: relative;

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

  .demo-spin-col {
    position: absolute;
    left: 50%;
    top: 52%;

    /deep/.ivu-spin-main {
      width: 140px;
    }
  }
}
</style>
<style scoped lang="less">
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
      }
    }
  }
}
</style>
