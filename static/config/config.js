//地图额外配置项添加
window.defaultMapOption = {
    center: [116.4792250000, 39.8939740000],
    zoom: 13, // 默认：比例尺显示100m
    resizeEnable: true, //是否监控地图容器尺寸变化
    rotateEnable: true,
    scrollWheel: false, // 禁止鼠标滚轮缩放
    //zoomEnable:false,
    //mapStyle: "amap://styles/3312a5b0f7d3e828edc4b2f523ba76d8"
}
window.mapKey = "08006bb86dc8a970b75c80d68413711b";
window.config = {
    urlText: 'https://121.42.242.214/kyfysm/',
    shipinUrl: 'https://www.yzsophia.com',
    iconUrl: 'https://sophia-portal-files.yzsmart.top',
    facetesturl: 'http://test.yzsmart.top:38088',
    dataUrl:'https://www.yzsophia.com'
    // urls: 'http://www.yzsophia.com', //正式
}
if(location.host=="www.yzsophia.com"){
    window.config.url="https://www.yzsophia.com"; //正式
}else{
    window.config.url="https://test.yzsophia.com:38443"; //测式
    //window.config.url="https://www.yzsophia.com"; //正式
}