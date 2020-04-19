import { auth } from "@/plugins/firebase";

export default function ({store,redirect}) {
  auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        store.commit("users/claim",user.admin);
        if(user.admin){
          redirect("/admin");
        }else{
          redirect("/user");
        }
        //   setupUI(user);
        });
      console.log('signed in==>insidelogin')
    } else {
      console.log('signed out==>insidelogin')
    }
  })
}