import { Astal, Gtk, Gdk } from "astal/gtk3"
import { SysTray } from "./components/SysTray"
import { AudioSlider } from "./components/AudioSlider"
import { BatteryLevel } from "./components/BatteryLevel"
import { Workspaces } from "./components/Workspaces"
import { FocusedClient } from "./components/FocusedClient"
import { Time } from "./components/Time"
// import { Media } from "./components/Media"

export default function Bar(monitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return <window
    className="Bar"
    gdkmonitor={monitor}
    borderWidth={0}
    margin={2}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | LEFT | RIGHT}>
    <centerbox>
      <box className="Top" hexpand halign={Gtk.Align.START}>
        <Workspaces />
      </box>
      <box className="Center" hexpand halign={Gtk.Align.CENTER}>
        <FocusedClient truncateLength={40} />
      </box>
      <box className="Bottom" hexpand halign={Gtk.Align.END}>
        <SysTray />
        <AudioSlider />
        <BatteryLevel />
        <Time />
      </box>
    </centerbox>
  </window>
}
