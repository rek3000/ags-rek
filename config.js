import { bar } from './themes/current/bar.js';
import PopupWindow from './themes/basic-bar/popupwindow.js';

const stylesheet = `${App.configDir}/styles/current/current.css`;
App.config({
  windows: [
    bar(0),
    bar(1),
    PopupWindow(),
  ],
  style: stylesheet,
})

Utils.monitorFile(
  `${App.configDir}`,
  function() {
    const css = stylesheet;
    App.resetCss();
    App.applyCss(css);
  },
)

export { }
