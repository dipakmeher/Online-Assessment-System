import { auth } from "@/plugins/firebase";
import Cookie from "js-cookie";

export const state = () => ({
  user: null,
  claim:null,
  signupalert:false
});

export const getters = {
  get (state) {
    return state.user;
  },
  getClaim (state) {
    return state.claim;
  },
  getSnackbar(state){
    return state.signupalert;
  }
}
export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  },
  claim(state,payload){
    state.claim = payload;
  },
  signupalert(state,payload){
    state.signupalert = payload;
    console.log("Signupalert invoked",payload);
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
    } catch (error) {
      throw error;
    }
  },
  async signup({ commit }, account) {
      await auth.createUserWithEmailAndPassword(account.email, account.password);
      //  //Get JWT from Firebase
      //  const token = await auth.currentUser.getIdToken();
      //  const { email, uid } = auth.currentUser;
      //  // Set JWT to the cookie
      //  Cookie.set("access_token", token);
 
      //  // Set the user locally
      //  commit("SET_USER", { email, uid });
       await auth.signOut();
      //  await Cookie.remove("access_token");
      commit("signupalert",true);
      //  location.href = "/";
      //  this.$router.push('/admin');
  }
};