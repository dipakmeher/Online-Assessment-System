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
  // add (state, { text,id}) {
  //   state.projects.push({
  //     text,
  //     id:id
  //   })
  // },
  
  setCategories(state, val) {
    state.projects = val; 
  },

  //Updating Answer
  Update(state,payload){
    // var categories = [];
    // categories = payload;
    // console.log(categories.Question1);
    // console.log(payload);
    let key = payload.key;
    let ans = payload.ans;
    var hk =  JSON.parse('this.state.projects["0"].'+key);
    console.log(typeof(hk));
    // this.state.projects["0"].key.Answer = ans;
    // console.log('this.state.projects["0"].'+key);
  }
}
export const actions={

  // Fetch Categories
  fetchCategories({ commit }) {
    db.collection("Assessment").get().then(querySnapshot => {
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        this.loading = false;
        var categories = [];
        querySnapshot.forEach(doc => {
          categories.push(doc.data());
        });
        commit("setCategories", categories);
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
    // context.commit('Update',payload);
  }
}