import { auth } from "@/plugins/firebase";

export default function({ store, route, redirect }) {
    const user = store.state.users.user;
    const blockedRoute = /\/admin\/*/g; 
    const blockedRoute1 = /\/user\/*/g; 
    const homeRoute = "/index";
    if (!user && route.path.match(blockedRoute)) {
      redirect("/index");
    }

    if (!user && route.path.match(blockedRoute1)) {
      redirect("/index");
    }
  
    if (user && route.path === homeRoute) {
      redirect("/admin");
    }
  }

