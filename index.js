/**
 * @description Hexo 莉可丽丝「Sakana! Widget」网页组件注入
 */
/** global hexo */

const _ = require('lodash');
const logger = require('hexo-log')({
  debug: false,
  silent: false,
});

defaultConfig = {
  // 默认角色
  character: 'takina',
  // 是否启用
  enable: true,
  // 是否在移动端启用
  enable_mobile: false,
  // 组件大小，默认为 200
  size: 200,
  // 自适应容器大小 （最小 120px）
  // 另见：https://github.com/dsrkafuu/sakana-widget/blob/main/README.zh.md#%E8%87%AA%E5%8A%A8%E7%BC%A9%E6%94%BE
  autoFit: false,
  // 组件据底部距离，需填写单位或百分号
  bottom: '0px',
  // 是否启用控制栏
  controls: true,
  // 线条设置
  stroke: {
    // 颜色
    color: '#b4b4b4',
    // 粗细
    width: 10,
  },
  // 停止动画的阈值
  threshold: 0.1,
  // 旋转角度
  rotate: 0,
  // 自定义角色
  customCharacters: [],
  /*
    customCharacters 中每个元素应为下方的对象
    {
      // 基础角色，必须为 takina（即井之上泷奈）或 chisato（即锦木千束）
      base: "takina",
      // 名称，设置默认角色时可填写
      name: "takina1",
      // 自定义图片（url 或 base64）
      image: "https://raw.githubusercontent.com/dsrkafuu/sakana-widget/master/src/characters/takina.png",
      // 惯性
      i: 0.08,
      // 粘性
      s: 0.1,
      // 衰减
      d: 0.988,
      // 角度
      r: 12,
      // 高度
      y: 2,
      // 垂直速度
      t: 0,
      // 水平速度
      w: 0,
    }
  */
};

let config = _.defaultsDeep(
  {},
  hexo.config.sakana,
  hexo.theme.config.sakana,
  defaultConfig
);

if (config.enable) {
  logger.info('启用 hexo-sakana 组件注入');
  logger.info(`默认角色：${config.character}`);
  logger.info(`配置文件：${JSON.stringify(config)}`);
  hexo.extend.filter.register('after_render:html', (htmlContent) => {
    const scriptToInject = `
      function log(msg) {
        console.log("[hexo-sakana] " + msg);
      }

      function initSakanaWidget(config) {
        if (
          !config.enable_mobile &&
          window.navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
          )
        ) {
          log(
            '检测为移动端，且配置中未开启在移动端启用组件，hexo-sakana 已禁用'
          );
          return;
        }
        for (character of config.customCharacters) {
          if (!["takina", "chisato"].includes(character.base)) {
            log(\`无效基础角色 \$\{character.base\}，取消注册\`);
            continue;
          }
          if (character.name === "") {
            log("名称为空，取消注册");
            continue;
          }
          const originCharacter = SakanaWidget.getCharacter(character.base);
          originCharacter.initialState = {
            ...originCharacter.initialState,
            ...character,
          };
          if (character.image !== "") {
            originCharacter.image = character.image;
          }
          SakanaWidget.registerCharacter(character.name, originCharacter);
          log(\`注册自定义角色：\$\{character.name\}\`)
        }
        new SakanaWidget({
          character: config.character,
          size: config.size,
          autoFit: config.autoFit,
          controls: config.controls,
          stroke: config.stroke,
          threshold: config.threshold,
          rotate: config.rotate,
        }).mount("#sakana");
      }
  `;
    configJson = JSON.stringify(config);
    const contentToInject = `
      <div id="sakana" style="position:fixed;right:0;bottom:${config.bottom};"></div>
      <script async onload='initSakanaWidget(${configJson})' src="https://cdn.jsdelivr.net/npm/sakana-widget@2.3.0/lib/sakana.min.js"></script>
      <script>${scriptToInject}</script>
    `;
    let newHtmlContent = htmlContent;
    if (/([\n\r\s\t]*<\/body>)/i.test(htmlContent)) {
      const lastIndex = htmlContent.lastIndexOf('</body>');
      newHtmlContent = `${htmlContent.substring(
        0,
        lastIndex
      )}${contentToInject}${htmlContent.substring(
        lastIndex,
        htmlContent.length
      )}`; // eslint-disable-line no-magic-numbers
    }
    return newHtmlContent;
  });
  logger.info('「Sakana! Widget」组件注入成功');
} else {
  logger.info('hexo-sakana 已禁用');
}
