import { App } from "astal/gtk3"
import barStyle from "./scss/bar.scss"
import notifStyle from "./scss/notification.scss"
import Bar from "./widget/bar/Bar"
import NotificationPopups from "./widget/notification/NotificationPopups"

App.start({
  css: barStyle,
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
