const hyprland = await Service.import("hyprland");

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

export function workspaces(monitor = 0) {
  const activeId = hyprland.active.workspace.bind("id");
  // return Widget.EventBox({
  //   onScrollUp: () => dispatch('+1'),
  //   onScrollDown: () => dispatch('-1'),
  //   className: "workspaces",
    // child: Widget.Box({
    return Widget.Box({
      spacing: 6,
      className: "workspaces-btn-container",
      // homogeneous: true,
      children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
        attribute: i,
        label: `${i}`,
        className: activeId.as(id => {
          let status = "";
          let ws;
          if (monitor === 0) {
            ws = hyprland.getWorkspace(i);
          } else {
            ws = hyprland.getWorkspace(i + 10 * monitor);
          }
          if (monitor === 0) {
            if (id === i) {
              status = "focused";
            } else {
              status = "unfocused";
            }
          } else {
            if (id - 10 * monitor === i) {
              status = "focused";
            } else {
              status = "unfocused";
            }
          }

          if (typeof ws !== "undefined") {
            if (ws.windows > 0) {
              status = status + " occupied";
            }
          }
          return status;
        }),
        onClicked: () => {
          if (monitor === 0) {
            dispatch(i);
          } else {
            dispatch(i + 10 * monitor);
          }
        },
      })),

      // remove this setup hook if you want fixed number of buttons
      // setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
      //   if (monitor === 0) {
      //     btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
      //   } else {
      //     btn.visible = hyprland.workspaces.some(ws => ws.id - 10 * monitor === btn.attribute);
      //   }
      // })),
    })
  // })
}
