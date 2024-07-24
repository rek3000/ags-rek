import { workspaces } from './components/workspace.js';
import { clientTitle } from './components/title.js';
import { sysTray } from './components/systray.js';
import { batteryBox } from './components/battery.js';
import { timeLabel } from './components/time.js';

function leftPart(monitor = 0) {
  return Widget.Box({
    class_name: "ws-container", vpack: "center",
    spacing: 8,
    children: [
      workspaces(monitor),
    ]
  })
}

function centerPart() {
  return Widget.Box({
    class_name: "cenber-box",
    homogeneous: false,
    vpack: "center",
    spacing: 8,
    children: [
      clientTitle(),
    ]
  })
}

function rightPart() {
  return Widget.Box({
    hpack: "end",
    vpack: "center",
    spacing: 8,
    children: [
      sysTray(),
      batteryBox(),
      timeLabel(),
    ]
  })
}

export function bar(monitor = 0) {
  return Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    margins: [2, 2, 0, 2],
    layer: "bottom",
    child: Widget.CenterBox({
      className: "main-box",
      start_widget: leftPart(monitor),
      center_widget: centerPart(),
      end_widget: rightPart(),
    }),
  })
}
