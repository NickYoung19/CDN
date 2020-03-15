/*
* HTML在引入JS时，通过timing属性给JS设置参数，然后再JS中通过获取标签属性的值来进行传参；
* 如果没有进行传参，默认定时时间为 5 秒触发一次；
* ===Demo===
* <!DOCTYPE HTML>
* <html>
* <head>
*   <meta charset="utf-8">
*   <title>非第三方静态资源加载中断优化Demo</title>
*   <!-- 引入js文件，并新增属性timing来指定js参数 -->
*   <script id="time_ctrl" src="js/demo1.js" timing="3"></script>
* </head>
* <body>
*   <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0A/00/ChMlWl5V3O6IWBoeAAuH50uG1RoAANdqAGPBNEAC4f_616.jpg">
*   <img src="https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0A/00/ChMlWl5V3O6IWBoeAAuH50uG1RoAANdqAGPBNEAC4f_6161.jpg">
*   <script type="text/javascript">
*   </script>
* </body>
* </html>
*/

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
