function imgPreviewBase64(obj, file, callback){
    let fileName = file.name;
    let regex = /(.png)$/;
    // if (!regex.test(fileName.toLowerCase())) {
    //     obj.$message({
    //         type: 'error',
    //         duration: '1500',
    //         message: "请选择png的图片文件",
    //         showClose: true
    //     });
    //     return false;
    // }

    // const isLt2M = file.size / 1024 / 1024 <= 1;
    // if (!isLt2M) {
    //     obj.$Message.error("上传图片大小不能超过1M");
    //     return false;
    // }
    
    // if(window.URL.createObjectURL) {
    //     let src = window.URL.createObjectURL(file);
    //     if(callback && typeof callback == "function") callback(src);
    // } else { // 降级处理
    //     if(callback && typeof callback == "function") callback(file.value);
    // }
    if (window.FileReader) { // html5方案
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function(e) {
            var src = e.target.result;
            // 模拟数据-------------------------------------------------
            // src = "http://jjcm2018.com/upload/15406317593.png";
            if(callback && typeof callback == "function") callback(src);
        }
    } else { // 降级处理
        if(callback && typeof callback == "function") callback(file.value);
    }
}

function getImgSize(url) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = function () {
          let width=img.width;
          let height=img.height;
          if(width>height){
            resolve({flag:true})
          }else{
            resolve({flag:false})
          }
          //   height: img.height
          // resolve({
          //   width: img.width,
          //   height: img.height
          // });
        };
      });
    }
export {
    imgPreviewBase64,
    getImgSize
};