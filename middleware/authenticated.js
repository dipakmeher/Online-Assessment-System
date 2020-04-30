import { auth } from "@/plugins/firebase";

export default function({ store, route, redirect }) {
    const user = store.state.users.user;
    const blockedRoute = /\/admin\/*/g; 
    const blockedRoute1 = /\/user\/*/g; 
    const homeRoute = "/";
    const homeRoute1 = "/signup";
    if (!user && route.path.match(blockedRoute)) {
      redirect("/");
    }

    if (!user && route.path.match(blockedRoute1)) {
      redirect("/");
    }
  
    if (user && route.path === homeRoute) {
      redirect("/admin");
    }

    if (user && route.path === homeRoute1) {
      redirect("/user");
    }
  }

