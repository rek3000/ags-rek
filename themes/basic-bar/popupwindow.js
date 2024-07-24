import Popup from "../misc/popup.js";

const drawingarea = Widget.DrawingArea({
  widthRequest: 50,
  heightRequest: 50,
  className: "draw",
  drawFn: (self, cr, w, h) => {
    const center = {
      x: w,
      y: h,

    };

    cr.setSourceRGBA(1, 1, 1, 1);
    cr.setLineWidth(2);
    // cr.arc(center.x, center.y, 2, 0, Math.PI * 2)
    cr.moveTo(center.x - 16, center.y);
    cr.lineTo(center.x, center.y - 16);
    // cr.lineTo(0, center.x);
    cr.stroke();
  },
})


export default () => Popup({
  keymode: 'on-demand',
  anchor: ['right', 'top'],
  name: 'rightpop',
  layer: 'overlay',
  className: "rightPop",
  margins: [2, 2, 0, 2],
  child: Widget.Overlay({
    className: "rightoverlay",
    child: Widget.Box({
      homogeneous: false,
      className: "rightpop-content",
      vertical: true,
      children: [
        Widget.Button({
          child: Widget.Label({
            label: "main_menu",
            hpack: "end",
            justification: 'right',
          }),
        }),
        Widget.Button({
          child: Widget.Label({
            label: "Run Command",
            hpack: "end",
            justification: 'right',
          })
        }),
        Widget.Button({
          child: Widget.Label({
            label: "Open File Folders",
            hpack: "end",
            justification: 'right',
          })
        }),
        Widget.Button({
          child: Widget.Label({
            label: "About",
            hpack: "end",
            justification: 'right',
          })
        }),
      ],
    }),
    overlays: [
      drawingarea,
    ]
  })
})
