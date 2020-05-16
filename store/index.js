import db from '@/plugins/firebase'
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { functions } from "@/plugins/firebase";
const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");

export const state = () => ({
    projects:[],
    projectlen:0,
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
    var len = 0;
    db.collection("Question-Paper").doc("Question-Paper").get().then(querySnapshot => {
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        var valueCat=[];
        categories.push(querySnapshot.data());
        commit("setCategories", categories);
        for (const [key, value] of Object.entries(categories["0"])) {
         len = len + 1;
          valueCat.push(value);
        }
        console.log("len:- ",len);
        commit("setlen",len);
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
      db.collection("Master-Bank").doc("Master-Bank").set(Object.assign({}, state.projects["0"]))
          .then(()=>{ 
            alert("Question is deleted successfully...");
          });
    }
  },
  //============================================================================
  UpdateAnswers({commit,state,dispatch},payload){
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
    var user = this.state.users.user;
    console.log("GetUser:- ",user);    
    return db.collection("Assessment").doc(user.uid).set(Object.assign({}, state.projects["0"]))
    .then(async()=>{      
      const evaluateAnswer = functions.httpsCallable('evaluateAnswer');
      await evaluateAnswer({ uid: user.uid }).then(result => {
        dispatch("assessment/fetchSubAns",user.uid).then(()=>{
          alert("ML code executed");
        })
      })
    }).catch(error=>{
      console.log("Error:- ",error);
    });
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
  },
  randomPicker({ commit }){
    const randomPicker = functions.httpsCallable('randomPicker');
    randomPicker().then(result => {
      console.log("Random Picker message",result);
    },err=>{
        console.log("Random Picker error:-", err);
    })
  },
  transferDoc({commit}){
    db.collection("Assessment").doc("Correct-Answers").get().then(querySnapshot => {
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        var valueCat=[];
        categories.push(querySnapshot.data());
        return db.collection("Question-Paper").doc("Correct-Answers").set(Object.assign({}, categories["0"]))
        .then(()=>{
          alert("Document Transferred.");
        }).catch(error=>{
          console.log("Error:- ",error);
        });
      }
    });
  }
}