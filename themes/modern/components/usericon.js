const username = Utils.exec('whoami')
// const iconPath = `/var/lib/AccountsService/icons/${username}`;
const iconPath = `/home/rek/.local/share/icons/user.icon`;
const { Gtk } = imports.gi;


export function usericon() {
  return Widget.Overlay({
    child: Widget.Icon({
      className: "usericon",
      icon: iconPath,
    }),
    overlays: [
      Widget.DrawingArea({
        className: "usericon-overlay",
        widthRequest: 30,
        heightRequest: 30,
        drawFn: (self, cr, w, h) => {
          const center = {
            x: w / 2,
            y: h / 2,
          };
          const c = self.get_style_context().get_property('background-color', Gtk.StateFlags.NORMAL);
          console.log(self.get_style_context());
          cr.setSourceRGBA(c.red, c.green, c.blue, c.alpha);
          cr.setLineWidth(8)
          cr.arc(center.x, center.y, w / 2 + 4, 0, Math.PI * 2)
          cr.stroke()
        },
      })
    ]
  });
}
