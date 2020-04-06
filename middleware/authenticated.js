import { auth } from "@/plugins/firebase";

export default function({ store, route, redirect }) {
    const user = store.state.users.user;
    const blockedRoute = /\/admin\/*/g; 
    const blockedRoute1 = /\/user\/*/g; 
    const homeRoute = "/bulogin";
    console.log("authentication method invoked");
    if (!user && route.path.match(blockedRoute)) {
      redirect("/bulogin");
    }

    if (!user && route.path.match(blockedRoute1)) {
      redirect("/bulogin");
    }
  
    if (user && route.path === homeRoute) {
      redirect("/admin");
    }
  }

