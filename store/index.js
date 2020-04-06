import db from '../plugins/firebase'
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";

export const state = () => ({
    projects:[]
})

export const getters = {
    get (state) {
      return state.projects["0"]
    }
  }
export const mutations={
  setCategories(state, val) {
    state.projects = val; 
  },
  Update(state,payload){
    let key = payload.key;
    let ans = payload.ans;
    this.state.projects["0"][key].Answer = ans;
  }
}


export const actions={
  // Fetch Categories
  fetchCategories({ commit }) {
    db.collection("Assessment").doc("Check").get().then(querySnapshot => {
      console.log(querySnapshot.data());
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        // querySnapshot.forEach(doc => {
        //   categories.push(doc.data());
        // });
        categories.push(querySnapshot.data());
        commit("setCategories", categories);
      }
    });
  },
  //============================================================================
  UpdateAnswers({commit,state},payload){
    let categories = [];
    var check = [];
    categories = payload;
    for (const [key, value] of Object.entries(this.state.projects["0"])) {
      let ans = categories[key];
      if(ans == undefined){
        ans = "";
      }
      commit("Update",{key, ans});
      //console.log(key,categories[key]);
    }
    db.collection("Assessment").doc("Question-Paper").set(Object.assign({}, state.projects["0"]))
    .then(()=>{
      alert("Answer Submitted");
    });
    console.log("firebase Updated");
  },

  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;

    const decoded = JWTDecode(accessTokenCookie);
    console.log("nuxtserverintit invoked");
    if (decoded) {
      commit("users/SET_USER", {
        uid: decoded.user_id,
        email: decoded.email
      });
    }
  }
};  