import db from '../plugins/firebase'
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

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
      console.log(querySnapshot.data());
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
  //============================================================================
  UpdateAnswers({commit,state},payload){
    let categories = [];
    var check = [];
    categories = payload;
    console.log(payload);
    for (const [key, value] of Object.entries(this.state.projects["0"])) {
      let ans = categories[value.Question];
      if(ans == undefined){
        ans = "";
      }
      
      commit("Update",{key, ans});
    }
    console.log(this.state.projects);

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

// if(value.type === 'Subjective'){
//   let che = categories[value.Question];
//   var frLanguage = {
//     labels: { 
//       'soul': 2,
//       'spirit':2,
//       'body':-2,
//       'not':1
//     }
//   };
//   sentiment.registerLanguage('fr', frLanguage);
//   var ans = categories[value.Question];
//   var result = sentiment.analyze(ans , { language: 'fr' });
//   var result1 = sentiment.analyze(ans);
//   console.dir(result);
//   console.dir("===========================================================");
//   console.dir(result1);

//    var finalscore = result.score + result1.score;
//   console.log("FinalScore = ",finalscore);
//   console.log("Statement is in, ")
//   if(finalscore>=2){
//     console.log("goodness");
//   }else if(finalscore<2 && finalscore >-2){
//     console.log("Passion");
//   }
//   else{
//     console.log("Ignorance");
//   }
// }