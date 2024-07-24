const battery = await Service.import('battery');
const powerProfiles = await Service.import('powerprofiles');

export function batteryBox() {
  const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
  const icon = battery.bind("percent").as(p =>
    `battery-level-${Math.floor(p / 10) * 10}-symbolic`)
  const labelProfile = Widget.Label({
    label: powerProfiles.active_profile.substring(0, 3),
    // truncate: 'end',
    // maxWidthChars: 4,
  })
  console.log(powerProfiles.active_profile);
  console.log(battery.bind('percent'));
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
      Widget.Label({
        class_name: "battery-title",
        label: battery.bind('percent').as(p => p.toString()),
      }),
      Widget.Icon({
        icon,
        class_name: "battery-icon"
      }),
      button,
    ],
  })
}
