import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";

export const state = () => ({
  user: null
});

export const getters = {
  get (state) {
    return state.user;
  }
}
export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  }
};

export const actions = {
  async login({ commit }, account) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;
      // Set JWT to the cookie
      Cookie.set("access_token", token);

      // Set the user locally
      commit("SET_USER", { email, uid });

      // auth.onAuthStateChanged(user => {
      //   if (user) {
      //       user.getIdTokenResult().then(idTokenResult => {
      //       user.admin = idTokenResult.claims.admin;
      //       if(user.admin){
      //         this.$router.push("/admin");
      //       }else{
      //         this.$router.push("/user");
      //       }
      //       //   setupUI(user);
      //       });
      //     console.log('signed in==>insidelogin')
      //   } else {
      //     console.log('signed out==>insidelogin')
      //   }
      // })
    } catch (error) {
      throw error;
    }
  },
  async signup({ commit }, account) {
      await auth.createUserWithEmailAndPassword(account.email, account.password);
       //Get JWT from Firebase
       const token = await auth.currentUser.getIdToken();
       const { email, uid } = auth.currentUser;
       // Set JWT to the cookie
       Cookie.set("access_token", token);
 
       // Set the user locally
       commit("SET_USER", { email, uid });

      //  this.$router.push('/admin');
      console.log("User Signed In");
  }
};