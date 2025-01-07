import { Variable, GLib } from "astal"

export function Time({ format = "%H:%M - %A %d/%m/%y" }) {
  const time = Variable<string>("").poll(1000, () =>
    GLib.DateTime.new_now_local().format(format)!)

  return <label
    className="Time"
    onDestroy={() => time.drop()}
    label={time()}
  />
}
