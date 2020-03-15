var num = 5;  // 定时器默认5秒触发一次
if (document.getElementById("time_ctrl")) {
  num = document.getElementById("time_ctrl").getAttribute("timing");
}
window.onload = function(){
  var load_count = 1;
  var reg_cdn = RegExp(/cdnimg1.com/);   // img地址域名
  var reg_raw = RegExp(/cdnimg2.com/);   // img备用地址域名，用作加载失败时替换
  var img_tag = document.getElementsByTagName("img");

  var timer = setInterval(function(){
    for (var i = 0; i<img_tag.length; i++) {
      // 监听指定的img资源
      if (img_tag[i].src.match(reg_cdn) || img_tag[i].src.match(reg_raw)) {
        var imgObj = new Image();
        imgObj.src = img_tag[i].src;
        if (imgObj.width > 0 && imgObj.height > 0) {
          console.log(i+" Loading done.");
          if (load_count >= 2 || i == img_tag.length - 1 && load_count == 1) {
            clearInterval(timer);
          }
        } else {
          if (load_count >= 2) {
            clearInterval(timer);
            // 替换后的备用链接仍加载失败，删除标签
            img_tag[i].remove();
            console.log(i+" The resource does not exist, The tag has been removed.");
            load_count++;
          } else {
            // 指定的img资源加载失败，替换备用链接
            console.log(i+" First time load fail, Begin replace the standby address.");
            img_tag[i].src=img_tag[i].src.replace(reg_cdn, reg_raw);
            load_count++;
          }
        }

      } else {
        console.log(i+" It's not Specified resource.");
        if (load_count > 2 || i == img_tag.length - 1 && load_count == 1) {
          clearInterval(timer);
        }
      }
    }
  }, num*1000);
};
