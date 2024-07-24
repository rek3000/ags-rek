const { speaker } = await Service.import("audio");

export function volumeBar() {
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
