import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"

export function FocusedClient({ truncateLength = 50 }) {
  const hypr = Hyprland.get_default()
  const focused = bind(hypr, "focusedClient")

  const truncateText = (text: string) => {
    if (text.length <= truncateLength) return text
    return text.substring(0, truncateLength) + "..."
  }

  return <box
    className="Focused"
    visible={focused.as(Boolean)}>
    {focused.as(client => (
      client && <label label={bind(client, "title").as(title => truncateText(String(title)))} />
    ))}
  </box>
}
