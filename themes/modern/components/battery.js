const battery = await Service.import('battery');
const powerProfiles = await Service.import('powerprofiles');
let getIconProfile = () => {
  let profile = powerProfiles.active_profile;
  let icon;
  switch (profile) {
    case 'balanced':
      icon = " ";
      break;
    case 'performance':
      icon = " "
      break;
    case 'power-saver':
      icon = " ";
      break;
    default:
      icon = " ";
      break;
  }
  return icon;
};

export function batteryBox() {
  const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
  const icon = battery.bind("percent").as(p =>
    `battery-level-${Math.floor(p / 10) * 10}-symbolic`)
  const labelProfile = Widget.Label({
    label: getIconProfile(),
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
        case 'performance':
          powerProfiles.active_profile = 'power-saver';
          break;
        case 'power-saver':
          powerProfiles.active_profile = 'balanced';
          break;
        default:
          powerProfiles.active_profile = 'balanced';
          break;
      };
      console.log(`Switched to: ${powerProfiles.active_profile}`);
    },
    setup: self => self.hook(powerProfiles, self => {
      self.child.label = getIconProfile();
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
