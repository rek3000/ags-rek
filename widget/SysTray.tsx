import { bind } from "astal"
import Tray from "gi://AstalTray"

export function SysTray() {
  const tray = Tray.get_default()

  return <box className="SysTray">
    {bind(tray, "items").as(items => items.map(item => (
      <menubutton
        tooltipMarkup={bind(item, "tooltipMarkup")}
        usePopover={false}
        actionGroup={bind(item, "action_group").as(ag => ["dbusmenu", ag])}
        menuModel={bind(item, "menu_model")}
        onButtonPressEvent={(self, event) => {
          // event.button values:
          // 1: Left click
          // 2: Middle click
          // 3: Right click
          const button = event.get_button()[1]
          if (button === 1) {
            item.activate(0, 0);
            return true;
          } else if (button === 3) {
            const popup = self.get_popup()
            if (popup) {
              popup.popup_at_pointer(event)
            }
            return true;
          }
          return false;
        }}
      >
        <icon gicon={bind(item, "gicon")} />
      </menubutton>
    )))}
  </box>
}
