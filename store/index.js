import db from '../plugins/firebase'

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
    db.collection("Assessment").doc("Question-Paper").get().then(querySnapshot => {
      console.log(querySnapshot.data());
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        // querySnapshot.forEach(doc => {
        //   categories.push(doc.data());
        // });
        categories.push(querySnapshot.data());

        console.log(categories);
        // console.log("=====================================================")
        commit("setCategories", categories);
        console.log(state.projects);

      }
    });
  },
  //============================================================================
  UpdateAnswers({commit,state},payload){
    let categories = [];
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
  }
}