export function timeLabel() {
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
      const fulltime = `${hour}:${minutes} ${day} ${monthNames[month]} ${year}`;
      const shorttime = `${hour}:${minutes}`;
      return { fulltime, shorttime };
    }],
  })

  return Widget.Label({
    hpack: 'center',
    class_name: "time-container",
    label: time.bind().as(short => `${short.shorttime}`),
    tooltip_text: time.bind().as(full => `${full.fulltime}`),
  })
}
