import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"

export function Workspaces() {
  const hypr = Hyprland.get_default()

  return <box className="Workspaces">
    {bind(hypr, "workspaces").as(wss => wss.sort((a, b) => a.id - b.id)
      .map(ws => (
        <button
          className={bind(hypr, "focusedWorkspace").as(fw => {
            const classes = []
            if (ws === fw) classes.push("focused")
            if (ws.clients.length > 0) classes.push("occupied")
            console.log(ws.id + ":" + classes)
            return classes.join(" ")
          })}
          onClicked={() => ws.focus()}>
          {ws.id}
        </button>
      ))
    )}
  </box>
}
