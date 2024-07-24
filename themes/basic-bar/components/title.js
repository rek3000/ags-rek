const hyprland = await Service.import("hyprland");

export function clientTitle() {
  return Widget.Label({
    class_name: "client-title",
    truncate: 'end',
    maxWidthChars: 50,
    label: hyprland.active.client.bind('title'),
    visible: hyprland.active.client.bind('address')
      .as(addr => !!addr),
  })
}

