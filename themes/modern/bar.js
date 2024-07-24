import { workspaces } from './components/workspace.js';
import { clientTitle } from './components/title.js';
import { sysTray } from './components/systray.js';
import { batteryBox } from './components/battery.js';
import { timeLabel } from './components/time.js';
import { usericon } from './components/usericon.js';

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
      usericon(),
    ]
  })
}

export function bar(monitor = 0) {
  return Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    margins: [4, 20, 0, 20],
    layer: "bottom",
    child: Widget.CenterBox({
      className: "main-box",
      start_widget: leftPart(monitor),
      center_widget: centerPart(),
      end_widget: rightPart(),
    }),
  })
}
