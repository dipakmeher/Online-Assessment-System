import { auth } from "@/plugins/firebase";

export default function ({store, router,redirect}) {
    auth.onAuthStateChanged(user => {
        if (user) {
            user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            if(user.admin === undefined){
                user.admin = false;
            }
            store.commit('users/claim',user.admin);
            console.log("onauthfunction invoked");
            // if(user.admin){
            //     redirect("/admin");
            // }else{
            //     redirect("/");
            // }
            //   setupUI(user);
            });
          console.log('signed in')
        } else {
          console.log('signed out')
        }
      })
}