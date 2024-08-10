import { bar } from './themes/current/bar.js';
import PopupWindow from './themes/basic-bar/popupwindow.js';
import Gdk from 'gi://Gdk';
import GLib from 'gi://GLib';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js'

const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);

function forMonitors(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(n, 0).map(widget).flat(1);
}

function forMonitorsAsync(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(n, 0).forEach((n) => widget(n).catch(print))
}

const stylesheet = `${App.configDir}/styles/current/current.css`;
App.config({
  windows: [
    // bar(0),
    // bar(1),
    forMonitors(bar),
    PopupWindow(),
  ].flat(1),
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

// forMonitorsAsync(bar);

export { }
