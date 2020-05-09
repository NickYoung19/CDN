# CDN

CDN 的全称是 `Content Delivery Network`，即`内容分发网络`；

CDN 是构建在现有网络基础之上的`智能虚拟网络`，依靠部署在各地的边缘服务器，通过中心平台的`负载均衡`、`内容分发`、`调度`等功能模块；

使用户就近获取所需内容，`降低`网络拥塞，`提高`用户访问`响应速度`和`命中率`。CDN 的关键技术主要有`内容存储`和`分发技术`。

<hr>

本文采用 jsDelivr + Github 搭建免费的个人 CDN 库，仅供个人学习使用，工作中一般直接购买阿里云CDN加速来实现。



### 详细搭建以及使用方法移步CSDN：

- [想拥有自己的 CDN 仓库吗？进来 Get 一下吧！](https://blog.csdn.net/PY0312/article/details/104890536)



### 使用方法：

- 将 Github CDN仓库上的静态资源转为快速访问网址，如下：

  ```
  https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@发布的版本号/文件路径
  ```

  **例如：**

  ```
  https://cdn.jsdelivr.net/gh/NickyangPeng/CDN/img/avatar.jpg
  ```

  **Re：** CDN后面如果不使用版本号，将会直接引用最新资源；


