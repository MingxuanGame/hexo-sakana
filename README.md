<div align="center">
<img src="https://raw.githubusercontent.com/dsrkafuu/sakana-widget/main/src/characters/chisato.png" height="160px">
<img src="https://raw.githubusercontent.com/dsrkafuu/sakana-widget/main/src/characters/takina.png" height="160px">

# hexo-sakana

🐟Hexo[「Sakana! Widget」](https://github.com/dsrkafuu/sakana-widget)网页组件注入🐟

[![NPM](https://img.shields.io/npm/v/hexo-sakana)](https://www.npmjs.com/package/hexo-sakana)
[![License](https://img.shields.io/github/license/MingxuanGame/hexo-sakana)](https://github.com/MingxuanGame/hexo-sakana/blob/master/LICENSE)

</div>

---

## 概述

此 Hexo 插件用于在渲染 HTML 时将 Sakana! Widget 组件注入进 body 内，以非侵入式方式加载石蒜组件。

注入代码参考 [EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d/blob/master/index.js#L234-L240)。

## 安装

```bash
npm install hexo-sakana --save
```

## 配置

在 `_config.yml` 或 `_config.[theme].yml` 中添加配置。

默认配置如下：

```yaml
sakana:
  # 默认角色
  character: takina
  # 是否启用
  enable: true
  # 是否在移动端启用
  enable_mobile: false
  #  组件大小，默认为 200
  size: 200
  # 自适应容器大小 （最小 120px）
  # 另见：https://github.com/dsrkafuu/sakana-widget/blob/main/README.zh.md#%E8%87%AA%E5%8A%A8%E7%BC%A9%E6%94%BE
  autoFit: false
  # 组件据底部距离，需填写单位或百分号
  bottom: 0px
  # 是否启用控制栏
  controls: true
  # 线条设置
  stroke:
    # 颜色
    color: "#b4b4b4"
    # 粗细
    width: 10
  # 停止动画的阈值
  threshold: 0.1
  # 旋转角度
  rotate: 0
  # 自定义角色
  # customCharacters:
  #   - base: takina
  #     name: takina1
  #     ...
```

`customCharacters` 为一个列表，每个元素如下：

```yaml
# 基础角色，必须为 takina（即井之上泷奈）或 chisato（即锦木千束）
base: takina
# 名称，设置默认角色时可填写
name: takina1
# 自定义图片（url 或 base64）
image: >-
  https://raw.githubusercontent.com/dsrkafuu/sakana-widget/master/src/characters/takina.png
# 惯性
i: 0.08
# 粘性
s: 0.1
# 衰减
d: 0.988
# 角度
r: 12
# 高度
"y": 2
# 垂直速度
t: 0
# 水平速度
w: 0
```

其中 `base` 和 `name` 为必填，未填写的则会使用 `base` 对应角色的默认值，见 https://github.com/dsrkafuu/sakana-widget/blob/main/src/characters/index.ts#L40-L64 。

## 许可

本项目代码基于 MIT 协议授权，**不可用于任何商业活动**。

本项目基于 https://github.com/dsrkafuu/sakana-widget 开发。

许可证文件：[LICENSE](https://github.com/MingxuanGame/hexo-sakana/blob/master/LICENSE)
