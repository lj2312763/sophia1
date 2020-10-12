// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
import App from './App';
import router from './router';
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
// import axios from 'axios';
// import 'echarts/map/js/china.js';
axios.defaults.baseURL = window.config.url + '/action';
import TDate from '@/assets/js/module/date.js';
import 'vue-orgchart/dist/style.min.css';
import animated from 'animate.css';
require('echarts-wordcloud');
import $ from 'jquery';
import '../static/js/jquery.arctext.js'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 正则匹配
import FormValidate from '@/assets/js/module/formValidate.js'
Vue.prototype.$formValidate = FormValidate;
// import waterfall from 'vue-waterfall2';
import store from './vuex/store'
// Vue.use(waterfall);
import subHeader from './components/common/subHeader' //导入组件
Vue.use(animated);
Vue.component('subHeader', subHeader)
    //var nodejieba = require("nodejieba");
    // var result = nodejieba.cut("南京市长江大桥");
    // console.log(nodejieba);
Vue.prototype.$dateUtil = TDate;
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable);

// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// Vue.use(vueSwiper)
// axios.defaults.withCredentials=true
//     axios.defaults.crossDomain=true
axios.interceptors.request.use(function(config) {
    if (!config.url.includes('restapi.amap.com')) {
        config.headers = {
            "apikey": "WKI158JGA458XTE692CZP5268537",
            "secretkey": "7da97d335fef49f089bab9a6892e9fdb",
            "accessToken": localStorage.getItem('yk-token')?localStorage.getItem('yk-token'):'',
        };
    }
    return config;
}, function(err) {
    return Promise.reject(err);
})
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.use(ViewUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
    document.documentElement.scrollTop = 0;
});