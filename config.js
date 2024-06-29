const hyprland = await Service.import("hyprland");
const battery = await Service.import('battery');
const { speaker } = await Service.import("audio");
const systemtray = await Service.import("systemtray");
const powerProfiles = await Service.import('powerprofiles');

function batteryBox() {
  const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
  const icon = battery.bind("percent").as(p =>
    `battery-level-${Math.floor(p / 10) * 10}-symbolic`)
  const labelProfile = Widget.Label({
    label: powerProfiles.active_profile.substring(0, 3),
    // truncate: 'end',
    // maxWidthChars: 4,
  })
  console.log(powerProfiles.active_profile);

  const button = Widget.Button({
    class_name: "battery-btn",
    child: labelProfile,
    on_clicked: () => {
      switch (powerProfiles.active_profile) {
        case 'balanced':
          powerProfiles.active_profile = 'performance';
          break;
        default:
          powerProfiles.active_profile = 'balanced';
          break;
      };
    },
    setup: self => self.hook(powerProfiles, self => {
      self.child.label = powerProfiles.active_profile.substring(0, 3);
    }),
  })

  return Widget.Box({
    class_name: "battery",
    visible: battery.bind("available"),
    spacing: 2,
    children: [
      Widget.Icon({
        icon,
        class_name: "battery-icon"
      }),
      Widget.Label({
        class_name: "battery-title",
        label: value.emitter.percent.toString() + "%",
      }),
      button,
    ],
  })

}

function sysTray() {
  const items = systemtray.bind("items")
    .as(items => items.map(item => Widget.Button({
      child: Widget.Icon({ icon: item.bind("icon") }),
      on_primary_click: (_, event) => item.activate(event),
      on_secondary_click: (_, event) => item.openMenu(event),
      tooltip_markup: item.bind("tooltip_markup"),
    })))

  return Widget.Box({
    children: items,
    class_name: "systray-container",
    spacing: 2,
  })
}

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);
function workspaces(monitor = 0) {
  const activeId = hyprland.active.workspace.bind("id");
  return Widget.EventBox({
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    className: "workspaces",
    child: Widget.Box({
      spacing: 6,
      className: "btn-container",
      children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
        attribute: i,
        label: `${i}`,
        className: activeId.as(id => {
          if (monitor === 0) {
            return `${id === i ? "focused" : ""}`;
          } else {
            return `${id - 10 * monitor === i ? "focused" : ""}`
          }
        }),
        // className: emepheralActiveId.as(id => `${id === i ? "focused" : ""}`),
        onClicked: () => {
          if (monitor === 0) {
            dispatch(i);
          } else {
            dispatch(i + 10 * monitor);
          }
        },
      })),

      // remove this setup hook if you want fixed number of buttons
      setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
        if (monitor === 0) {
          btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
        } else {
          btn.visible = hyprland.workspaces.some(ws => ws.id - 10 * monitor === btn.attribute);
        }
      })),
    }),
  })
}

function clientTitle() {
  return Widget.Label({
    class_name: "client-title",
    truncate: 'end',
    maxWidthChars: 50,
    label: hyprland.active.client.bind('title'),
    visible: hyprland.active.client.bind('address')
      .as(addr => !!addr),
  })
}

function volumeBar() {
  const slider = Widget.Slider({
    className: "volume-slider",
    hexpand: false,
    min: 0,
    max: 100,
    drawValue: false,
    value: speaker.bind("volume").as(p => p * 100),
    onChange: ({ value }) => speaker.volume = value / 100, // be careful when changing this shit
  })
  return Widget.Box({
    class_name: "volume",
    children: [slider],
  })
}

function reveal() {
  let reveal = Widget.Revealer({
    revealChild: false,
    transitionDuration: 800,
    transition: 'slide_left',
    child: volumeBar(),
  });

  const box = Widget.Box({
    className: 'volumeBox',
    children: [
      Widget.Label("VOL"),
      reveal,
    ]
  });

  const eventBox = Widget.EventBox({
    className: 'volumeReveal',
    child: box,
    onHover: self => {
        self.child.children[1].revealChild = true;
    },
    onHoverLost: self => {
      self.child.children[1].revealChild = false;
    },
  })

  return eventBox;
}


function timeLabel() {
  const time = Variable("", {
    poll: [30000, () => {
      const monthNames = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Dec"];
      const date = new Date();
      const hour = date.getHours();
      let minutes = date.getMinutes().toString();
      if (parseInt(minutes) < 10) {
        minutes = "0" + minutes;
      }
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return `${hour}:${minutes} ${day} ${monthNames[month]} ${year}`;
    }],
  })

  return Widget.Label({
    hpack: 'center',
    class_name: "time-container",
    label: time.bind(),
  })
}

const text_demo = Widget.Label({
  hpack: 'center',
  label: "Lazy mode",
});

function leftPart(monitor = 0) {
  return Widget.Box({
    class_name: "ws-container",
    spacing: 8,
    homogeneous: false,
    children: [
      workspaces(monitor),
    ]
  })
}

function centerPart() {
  return Widget.Box({
    spacing: 8,
    children: [
      clientTitle(),
    ]
  })
}

function rightPart() {
  return Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      // volumeBar(),
      // reveal(),
      sysTray(),
      batteryBox(),
      timeLabel(),
    ]
  })
}

function Bar(monitor = 0) {
  return Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    margins: [2, 2],
    layer: "bottom",
    child: Widget.CenterBox({
      className: "main-box",
      start_widget: leftPart(monitor),
      center_widget: centerPart(),
      end_widget: rightPart(),
    }),
  })
}



App.config({
  windows: [
    Bar(0),
    Bar(1),
  ],
  style: './styles.css',
})

Utils.monitorFile(
  `${App.configDir}`,
  function() {
    const css = `${App.configDir}/styles.css`;
    App.resetCss();
    App.applyCss(css);
  },
)


export { }
