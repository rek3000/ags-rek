import { bar } from './components/bar.js';

const stylesheet = `${App.configDir}/styles/current.css`;
App.config({
  windows: [
    bar(0),
    bar(1),
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
