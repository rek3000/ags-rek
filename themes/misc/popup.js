import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
const { Box, Window } = Widget;

export default ({
  name,
  child,
  ...props
}) => {
  return Window({
    name,
    visible: false,
    layer: 'overlay',
    ...props,

    child: Box({
      child,
    })
  }).keybind("Escape", () => App.closeWindow(name));
};
