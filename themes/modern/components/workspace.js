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
        if (id > 10) {

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
        } else {
          ws = hyprland.getWorkspace(i);
          if (id === i) {
            status = "focused";
          } else {
            status = "unfocused";
          }
          if (typeof ws !== "undefined") {
            if (ws.windows > 0) {
              status = status + " occupied";
            }
          }
          return status;
        }

      }),
        // let ws = hyprland.getWorkspace(i);

        // console.log(event);
        // let ws = hyprland.getWorkspace(i);
        // console.log(ws);
        // activeId.as(id => {
        //   let dis;
        //   if (id > 10) {
        //     if (monitor === 0) {
        //       dis = i;
        //     } else {
        //       dis = i + 10 * monitor;
        //     }
        //   } else {
        //     dis = i
        //   }
          // console.log(dis)
          // dispatch(dis)
        // });
        // console.log(curr)
    }).on('clicked', self => {
      // self.attribute
      let ws = hyprland.getWorkspace(self.attribute);
      console.log(ws);
      console.log(monitor);
      console.log(activeId);
      dispatch(i);
    })
    ),

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
