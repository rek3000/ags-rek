import { App } from "astal/gtk3"
import style from "./style.scss"
import notifStyle from "./notif-style.scss"
import Bar from "./widget/Bar"
import NotificationPopups from "./widget/NotificationPopups"

App.start({
  css: style,
  instanceName: "bar",
  requestHandler(request, res) {
    print(request)
    res("ok")
  },
  main: () => App.get_monitors().map(Bar),
})

App.start({
  css: notifStyle,
  instanceName: "notifications",
  requestHandler(request, res) {
    print(request)
    res("ok")
  },
  main: () => App.get_monitors().map(NotificationPopups),
})
