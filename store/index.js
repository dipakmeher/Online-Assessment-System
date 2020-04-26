import db from '../plugins/firebase'
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";


export const state = () => ({
    projects:[],
    projectlen:null,
    value:[]
})

export const getters = {
    get (state) {
      return state.projects["0"]
    },
    getlen (state) {
      return state.projectlen;
    },
    getValue (state) {
      return state.value;
    }

  }
export const mutations={
  setCategories(state, val) {
    state.projects = val; 
  },
  setValue(state, val) {
    state.value = val; 
  },
  Update(state,payload){
    let key = payload.key;
    let ans = payload.ans;
    this.state.projects["0"][key].Answer = ans;
  },
  setlen(state, val) {
    state.projectlen = val; 
  },
}


export const actions={
  // Fetch Categories
  fetchCategories({ commit }) {
    var len = 1;
    db.collection("Assessment").doc("Check").get().then(querySnapshot => {
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        var valueCat=[];
        categories.push(querySnapshot.data());
        commit("setCategories", categories);
        for (const [key, value] of Object.entries(this.state.projects["0"])) {
         len = len + 1;
          valueCat.push(value);
        }
        commit("setlen",len-1);
        commit("setValue", valueCat);
      }
    });
  },
  // ========================================================================
  DeleteQuestion({commit,state},index){
    if(confirm('Are you sure? ')){
      var parent = document.getElementById('cafelist');
      var child = document.getElementById(index);
      parent.removeChild(child);
      delete state.projects["0"][index];
      db.collection("Assessment").doc("Check").set(Object.assign({}, state.projects["0"]))
          .then(()=>{ 
            alert("Question is deleted successfully...");
          });
    }
  },
  //============================================================================
  UpdateAnswers({commit,state},payload){
    let categories = [];
    var check = [];
    categories = payload;
    for (const [key, value] of Object.entries(this.state.projects["0"])) {
      let ans = categories[value.Question];
      if(ans == undefined){
        ans = "";
      }
      
      commit("Update",{key, ans});
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

    if (decoded) {
      commit("users/SET_USER", {
        uid: decoded.user_id,
        email: decoded.email
      });
    }
  }
};  