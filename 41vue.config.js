module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: true, // 生产环境下不生成 .map文件
  devServer: {
    proxy: {
      '^/action/face': {
        target: 'http://10.2.39.232:20000',
        changeOrigin: true,  //是否跨域
        pathRewrite:{
          '^/face':''
        }
      }
    }
  }
}
