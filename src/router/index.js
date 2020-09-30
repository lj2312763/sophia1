// import Vue from 'vue';
// import Router from 'vue-router';
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

// Vue.use(Router)

const Routers = [{
        path: '/',
        name: 'home',
        component: resolve => (require(["@/components/home"], resolve)),
        redirect: "/index",
        children: [{
                name: "index",
                path: "/index",
                component: resolve => (require(["@/components/index"], resolve)),
                children: []
            },
            {
                name: "techIndex",
                path: "/techIndex",
                component: resolve => (require(["@/components/techIndex"], resolve)),
                children: []
            },
            {
                path: '/grecModel',
                name: 'grecModel',
                component: resolve => (require(["@/components/experienceColl/renlian/grecModel"], resolve))
            },
            {
                name: "dataIndex",
                path: "/dataIndex",
                component: resolve => (require(["@/components/dataIndex"], resolve)),
                children: []
            },
            {
                name: "educate",
                path: "/educate",
                component: resolve => (require(["@/components/educate/index"], resolve)),
                children: []
            },
            {
                name: "liveHood",
                path: "/liveHood",
                component: resolve => (require(["@/components/educate/liveHood"], resolve)),
                children: []
            },
            {
                name: "liveMedical", // 智慧医疗
                path: "/liveMedical",
                component: resolve => (require(["@/components/medical/liveMedical"], resolve)),
                children: []
            },
            {
                name: "model",
                path: "/model",
                component: resolve => (require(["@/components/educate/model"], resolve)),
                children: []
            },
            {
                name: "liveHome",
                path: "/liveHome",
                component: resolve => (require(["@/components/educate/liveHome"], resolve)),
                children: []
            },
            {
                name: "searchIndex",
                path: "/searchIndex",
                component: resolve => (require(["@/components/searchIndex"], resolve)),
                children: []
            },
            {
                name: "searchDataIndex",
                path: "/searchDataIndex",
                component: resolve => (require(["@/components/searchDataIndex"], resolve)),
                children: []
            },
            {
                name: "downLoad",
                path: "/downLoad",
                component: resolve => (require(["@/components/common/downLoad"], resolve)),
                children: []
            },
            {
                name: "barEchartsTime",
                path: "/barEchartsTime",
                component: resolve => (require(["@/components/common/echarts/barEchartsTime"], resolve)),
                children: []
            },
            {
                name: "fenxi",
                path: "/fenxi",
                component: resolve => (require(["@/components/common/fenxi"], resolve)),
                children: []
            },
            {
                name: "404",
                path: "/404",
                component: resolve => (require(["@/components/common/404"], resolve)),
                children: []
            },
            {
                path: '/aiSmartAppList', //AI智能应用列表页
                name: 'aiSmartAppList',
                component: resolve => (require(["@/components/aismartapp/aiSmartAppList"], resolve))
            },
            {
                path: '/aiList', //AI智能应用列表页ai
                name: 'aiList',
                component: resolve => (require(["@/components/aismartapp/aiList"], resolve))
            },
            {
                path: '/aiDetail', //AI智能应用详情页ai
                name: 'aiDetail',
                component: resolve => (require(["@/components/aismartapp/aiDetail"], resolve))
            },
            {
                path: '/textReocList', //文字识别列表页
                name: 'textReocList',
                component: resolve => (require(["@/components/aismartapp/textReocList"], resolve))
            },
            {
                path: '/cardTextRecList', //卡证文字识别
                name: 'cardTextRecList',
                component: resolve => (require(["@/components/aismartapp/cardTextRec/cardTextRecList"], resolve))
            },
            {
                path: '/idCardRecDetail', //身份证识别
                name: 'idCardRecDetail',
                component: resolve => (require(["@/components/aismartapp/cardTextRec/idCardRecDetail"], resolve))
            },
            {
                path: '/passportRecDetail', //护照识别
                name: 'passportRecDetail',
                component: resolve => (require(["@/components/aismartapp/cardTextRec/passportRecDetail"], resolve))
            },
            {
                path: '/businessLiceRecDetail', //营业执照识别
                name: 'businessLiceRecDetail',
                component: resolve => (require(["@/components/aismartapp/cardTextRec/businessLiceRecDetail"], resolve))
            },
            {
                path: '/returnPerRecDetail', //港澳通行证识别
                name: 'returnPerRecDetail',
                component: resolve => (require(["@/components/aismartapp/cardTextRec/returnPerRecDetail"], resolve))
            },
            {
                path: '/carSceneRecList', //汽车场景文字识别列表页
                name: 'carSceneRecList',
                component: resolve => (require(["@/components/aismartapp/carSceneRec/carSceneRecList"], resolve))
            },
            {
                path: '/xshiLiceRecDetail', //汽车场景文字识别--行驶证识别详情页
                name: 'xshiLiceRecDetail',
                component: resolve => (require(["@/components/aismartapp/carSceneRec/xshiLiceRecDetail"], resolve))
            },
            {
                path: '/carInvoRecDetail', //汽车场景文字识别--机动车销售发票详情页
                name: 'carInvoRecDetail',
                component: resolve => (require(["@/components/aismartapp/carSceneRec/carInvoRecDetail"], resolve))
            },
            {
                path: '/jiashiLiceRecDetail', //汽车场景文字识别--驾驶证识别详情页
                name: 'jiashiLiceRecDetail',
                component: resolve => (require(["@/components/aismartapp/carSceneRec/jiashiLiceRecDetail"], resolve))
            },
            {
                path: '/ticketTextRecLiset', //票据识别列表页
                name: 'ticketTextRecLiset',
                component: resolve => (require(["@/components/aismartapp/ticketTextRec/ticketTextRecLiset"], resolve))
            },
            {
                path: '/ticketTextRecDetail', //票据识别详情页
                name: 'ticketTextRecDetail',
                component: resolve => (require(["@/components/aismartapp/ticketTextRec/ticketTextRecDetail"], resolve))
            },
            {
                path: '/otherTextRecList', //其他文字识别列表页
                name: 'otherTextRecList',
                component: resolve => (require(["@/components/aismartapp/otherTextRec/otherTextRecList"], resolve))
            },
            {
                path: '/netWorkPicRecDetail', //网络图片文字识别详情页
                name: 'netWorkPicRecDetail',
                component: resolve => (require(["@/components/aismartapp/otherTextRec/netWorkPicRecDetail"], resolve))
            },
            {
                path: '/numberRecDetail', //数字识别详情页
                name: 'numberRecDetail',
                component: resolve => (require(["@/components/aismartapp/otherTextRec/numberRecDetail"], resolve))
            },
            {
                path: '/rqCodeRecDetail', //二维码识别详情页
                name: 'rqCodeRecDetail',
                component: resolve => (require(["@/components/aismartapp/otherTextRec/rqCodeRecDetail"], resolve))
            },
            {
                path: '/sealDetectDetail', //印章检测详情页
                name: 'sealDetectDetail',
                component: resolve => (require(["@/components/aismartapp/otherTextRec/sealDetectDetail"], resolve))
            },
            {
                path: '/tableTextRecDetail', //表格文字识别详情页
                name: 'tableTextRecDetail',
                component: resolve => (require(["@/components/aismartapp/otherTextRec/tableTextRecDetail"], resolve))
            },
            {
                path: '/faceRecoList', //人脸识别列表页
                name: 'faceRecoList',
                component: resolve => (require(["@/components/aismartapp/faceRecoList"], resolve))
            },
            {
                path: '/VideoRecoList', //视频识别列表页
                name: 'VideoRecoList',
                component: resolve => (require(["@/components/aismartapp/VideoRecoList"], resolve))
            },
            {
                path: '/aiSmartAppDetail', //AI智能应用词法详情页
                name: 'aiSmartAppDetail',
                component: resolve => (require(["@/components/aismartapp/aiSmartAppDetail"], resolve))
            },
            {
                path: '/aiSentence', //AI智能应用词法详情页
                name: 'aiSentence',
                component: resolve => (require(["@/components/aismartapp/aiSentence"], resolve))
            },
            {
                path: '/aiSyntax', //AI智能应用词法详情页
                name: 'aiSyntax',
                component: resolve => (require(["@/components/aismartapp/aiSyntax"], resolve))
            },
            {
                path: '/aiKeyword', //AI智能应用词法详情页
                name: 'aiKeyword',
                component: resolve => (require(["@/components/aismartapp/aiKeyword"], resolve))
            },
            {
                path: '/aiBoundary', //AI智能应用词法详情页
                name: 'aiBoundary',
                component: resolve => (require(["@/components/aismartapp/aiBoundary"], resolve))
            },
            {
                path: '/aiDepenpars', //AI智能应用依存句法分析详情页
                name: 'aiDepenpars',
                component: resolve => (require(["@/components/aismartapp/aiDepenpars"], resolve))
            },
            {
                path: '/aiIdentity', //AI智能应用命名实体识别详情页
                name: 'aiIdentity',
                component: resolve => (require(["@/components/aismartapp/aiIdentity"], resolve))
            },
            {
                path: '/aiSemantic', //AI智能应用语义相似度详情页
                name: 'aiSemantic',
                component: resolve => (require(["@/components/aismartapp/aiSemantic"], resolve))
            },
            {
                path: '/aiDocument', //AI智能应用语义相似度详情页
                name: 'aiDocument',
                component: resolve => (require(["@/components/common/aiDocument"], resolve))
            },
            {
                path: '/guide', //AI新手指南
                name: 'guide',
                component: resolve => (require(["@/components/common/guide"], resolve))
            },
            {
                path: '/document', //技术文档
                name: 'document',
                component: resolve => (require(["@/components/common/document"], resolve))
            },
            {
                path: '/allDocument', //技术文档
                name: 'allDocument',
                component: resolve => (require(["@/components/common/allDocument"], resolve))
            },
            {
                path: '/algorithm', //AI智能应用查看更多 算法部分
                name: 'algorithm',
                component: resolve => (require(["@/components/aismartapp/algorithm"], resolve))
            },
            {
                path: '/shortSpeechRecoDetail', //段语音识别详情页    
                name: 'shortSpeechRecoDetail',
                component: resolve => (require(["@/components/aismartapp/speechTech/shortSpeechRecoDetail"], resolve))
            },
            {
                path: '/fileReco', //录音文件识别   
                name: 'fileReco',
                component: resolve => (require(["@/components/aismartapp/speechTech/fileReco"], resolve))
            },
            {
                path: '/realTimeReco', //实时语音识别
                name: 'realTimeReco',
                component: resolve => (require(["@/components/aismartapp/speechTech/realTimeReco"], resolve))
            },
            {
                path: '/speSyn', //语音合成    
                name: 'speSyn',
                component: resolve => (require(["@/components/aismartapp/speechTech/speSyn"], resolve))
            },
            {
                path: '/searchDetail', //搜索详情页
                name: 'searchDetail',
                component: resolve => (require(["@/components/aismartapp/searchDetail"], resolve))
            },
            {
                path: '/opinionAnalysisDetail', //舆情分析详情
                name: 'opinionAnalysisDetail',
                component: resolve => (require(["@/components/aismartapp/opinionAnalysisDetail"], resolve))
            },
            {
                path: '/recommendDetail', //推荐详情页
                name: 'recommendDetail',
                component: resolve => (require(["@/components/aismartapp/recommendDetail"], resolve))
            },
            {
                path: '/obserStarList', //观星台民生类详情
                name: 'obserStarList',
                component: resolve => (require(["@/components/obserStar/obserStarList"], resolve))
            },
            {
                path: '/obserStarLiveDetail', //观星台民生类详情
                name: 'obserStarLiveDetail',
                component: resolve => (require(["@/components/obserStar/obserStarLiveDetail"], resolve))
            },
            {
                path: '/obserStarPoliticDetail', //观星台政治类详情
                name: 'obserStarPoliticDetail',
                component: resolve => (require(["@/components/obserStar/obserStarPoliticDetail"], resolve))
            },
            {
                path: '/obserStarEconoDetail', //观星台经济类详情
                name: 'obserStarEconoDetail',
                component: resolve => (require(["@/components/obserStar/obserStarEconoDetail"], resolve))
            },
            {
                path: '/obserStarCulturDetail', //观星台文化类详情
                name: 'obserStarCulturDetail',
                component: resolve => (require(["@/components/obserStar/obserStarCulturDetail"], resolve))
            },
            {
                path: '/obserStarData', //观星台数据部分
                name: 'obserStarData',
                component: resolve => (require(["@/components/obserStar/obserStarData"], resolve))
            },
            {
                path: '/smartLight',
                name: 'smartLight',
                component: resolve => (require(["@/components/smartLight/smartLight"], resolve))
            },
            {
                path: '/bigDataPlat', //大数据平台部分
                name: 'bigDataPlat',
                component: resolve => (require(["@/components/bigDataPlat/bigDataPlat"], resolve))
            },
            {
                path: '/bi', //大数据服务BI平台
                name: 'bi',
                component: resolve => (require(["@/components/bigDataPlat/services/bi"], resolve))
            },
            {
                path: '/fuwu', //大数据数据服务平台
                name: 'fuwu',
                component: resolve => (require(["@/components/bigDataPlat/services/fuwu"], resolve))
            },
            {
                path: '/serviceFenxi', //大数据服务数据分析平台
                name: 'serviceFenxi',
                component: resolve => (require(["@/components/bigDataPlat/services/serviceFenxi"], resolve))
            },
            {
                path: '/insightData', //数据洞察法律部分
                name: 'insightData',
                component: resolve => (require(["@/components/insightData/insightData"], resolve))
            },
            {
                path: '/wuyeInsight', //数据洞察法律部分
                name: 'wuyeInsight',
                component: resolve => (require(["@/components/insightData/wuyeInsight"], resolve))
            },
            {
                path: '/wuyeInsightDetail', //数据洞察法律部分
                name: 'wuyeInsightDetail',
                component: resolve => (require(["@/components/insightData/wuyeInsightDetail"], resolve))
            },
            {
                path: '/lawyer', //数据洞察法律部分
                name: 'lawyer',
                component: resolve => (require(["@/components/insightData/lawyer"], resolve))
            },

            {
                path: '/houseData', //数据洞察房产部分
                name: 'houseData',
                component: resolve => (require(["@/components/insightData/houseData"], resolve))
            },
            {
                path: '/houseDetail', //数据洞察房产详情部分
                name: 'houseDetail',
                component: resolve => (require(["@/components/insightData/houseDetail"], resolve))
            },
            {
                path: '/brandSentiment', //数据洞察品牌部分
                name: 'brandSentiment',
                component: resolve => (require(["@/components/insightData/brandSentiment"], resolve))
            },
            {
                path: '/geographySearch', //数据洞察地理查询部分
                name: 'geographySearch',
                component: resolve => (require(["@/components/insightData/geographySearch"], resolve))
            },
            {
                path: '/geograpInfoQuery', //数据洞察海拔信息部分
                name: 'geograpInfoQuery',
                component: resolve => (require(["@/components/insightData/geograpInfoQuery"], resolve))
            },
            {
                path: '/brandSentConsumerListen', //品牌洞察消费者聆听
                name: 'brandSentConsumerListen',
                component: resolve => (require(["@/components/insightData/brandSentConsumerListen"], resolve))
            },
            {
                path: '/foodInsights', //餐饮数据洞察消费者聆听
                name: 'foodInsights',
                component: resolve => (require(["@/components/insightData/foodInsights"], resolve))
            },
            {
                path: '/travelInsights', //旅游数据洞察消费者聆听
                name: 'travelInsights',
                component: resolve => (require(["@/components/insightData/travelInsights"], resolve))
            },
            {
                path: '/document', //旅游数据洞察消费者聆听
                name: 'document',
                component: resolve => (require(["@/components/insightData/document"], resolve))
            },
            {
                path: '/paperPopPre', //论文流行度预测
                name: 'paperPopPre',
                component: resolve => (require(["@/components/insightData/paperPopPre"], resolve))
            },
            {
                path: '/paperIndex', //论文流行度预测
                name: 'paperIndex',
                component: resolve => (require(["@/components/insightData/paperIndex"], resolve))
            },
            {
                path: '/paperEchart', //论文流行度预测
                name: 'paperEchart',
                component: resolve => (require(["@/components/insightData/paperEchart"], resolve))
            },
            {
                path: '/standard', //论文流行度预测
                name: 'standard',
                component: resolve => (require(["@/components/jiansuo/standard"], resolve))
            },
            {
                path: '/standardStati', //论文流行度预测
                name: 'standardStati',
                component: resolve => (require(["@/components/jiansuo/standardStati"], resolve))
            },
            {
                path: '/standardCountry', //论文流行度预测
                name: 'standardCountry',
                component: resolve => (require(["@/components/jiansuo/standardCountry"], resolve))
            },
            {
                path: '/live', //直播
                name: 'live',
                component: resolve => (require(["@/components/live/live"], resolve))
            },
            // {
            //   path:'/experienceColl', //功能体验集合模板组件
            //   name:'experienceColl',
            //   component:resolve=>(require(["@/components/experienceColl/experienceColl"],resolve))  
            // },
            {
                path: '/experienceColl', //功能体验集合模板数据前端写死
                name: 'experienceColl',
                component: resolve => (require(["@/components/experienceColl/experienceColl"], resolve))
            },
            // {
            //     path: '/renlianduibi', //功能体验集合模板数据前端写死
            //     name: 'renlianduibi',
            //     component: resolve => (require(["@/components/renlianduibi/renlianduibi"], resolve))
            // },
            {
                path: '/aiTuijian',
                name: 'aiTuijian',
                component: resolve => (require(["@/components/aismartapp/aiTuijian"], resolve))
            },
            {
                path: '/aiSousuo',
                name: 'aiSousuo',
                component: resolve => (require(["@/components/aismartapp/aiSousuo"], resolve))
            },
            {
                path: '/yanshiDetail',
                name: 'yanshiDetail',
                component: resolve => (require(["@/components/aismartapp/yanshiDetail"], resolve))
            },
            {
                path: '/serviceDetail',
                name: 'serviceDetail',
                component: resolve => (require(["@/components/common/templates/serviceDetail"], resolve))
            },
            {
                path: '/serviceDetailSimple',
                name: 'serviceDetailSimple',
                component: resolve => (require(["@/components/common/templates/serviceDetailSimple"], resolve))
            },
            {
                path: '/fankui',
                name: 'fankui',
                component: resolve => (require(["@/components/common/fankuiZixun/fankui"], resolve))
            },
            {
                path: '/zixun',
                name: 'zixun',
                component: resolve => (require(["@/components/common/fankuiZixun/zixun"], resolve))
            },
            {
                path: '/resumeDetails', //个人简历详情页面
                name: 'resumeDetails',
                component: resolve => (require(["@/components/jobFile/resumeDetails"], resolve))
            },
            {
                path: '/resumeList', //简历集合列表页
                name: 'resumeList',
                component: resolve => (require(["@/components/jobFile/resumeList"], resolve))
            },
            {
                path: '/resumeList1', //简历集合列表页，改版
                name: 'resumeList1',
                component: resolve => (require(["@/components/jobFile/resumeList1"], resolve))
            },
            {
                path: '/wordStatic', //NLP
                name: 'wordStatic',
                component: resolve => (require(["@/components/nlp/wordStatic"], resolve))
            },
            {
                path: '/pubOpin',
                name: 'pubOpin',
                component: resolve => (require(["@/components/pubOpin/pubOpin"], resolve))
            },
            {
                path: '/pubOpinExper',
                name: 'pubOpinExper',
                component: resolve => (require(["@/components/pubOpin/pubOpinExper"], resolve))
            },
            {
                path: '/trialcenter',
                name: 'trialcenter',
                component: resolve => (require(["@/components/trialcenter/trialcenter"], resolve))
            },
            {
                path: '/liveSdk',
                name: 'liveSdk',
                component: resolve => (require(["@/components/trialcenter/liveSdk"], resolve))
            }
        ]
    },
    {
        path: '*',
        redirect: '/index'
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => (require(["@/components/login/login"], resolve))
    },
    {
        path: '/login1',
        name: 'login1',
        component: resolve => (require(["@/components/login/login1"], resolve))
    },
    {
        path: '/behavGraph',
        name: 'behavGraph',
        component: resolve => (require(["@/components/behavGraph/behavGraph"], resolve))
    },
    {
        path: '/fapiao',
        name: 'fapiao',
        component: resolve => (require(["@/components/fapiao/fapiao"], resolve))
    },
    {
        path: '/tongyonFp',
        name: 'tongyonFp',
        component: resolve => (require(["@/components/tongyonFp/tongyonFp"], resolve))
    },
    {
        path: '/certificate',
        name: 'certificate',
        component: resolve => (require(["@/components/tongyonFp/certificate"], resolve))
    },
    {
        path: '/busCertificat',
        name: 'busCertificat',
        component: resolve => (require(["@/components/tongyonFp/busCertificat"], resolve))
    },
    {
        path: '/renlianduibi', //功能体验集合模板数据前端写死 
        name: 'renlianduibi',
        component: resolve => (require(["@/components/renlianduibi/home"], resolve))
    }
];

const RouterConfig = {
    //mode:'history',
    routes: Routers
};

export default new VueRouter(RouterConfig);