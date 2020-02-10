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
  add (state, { text,id}) {
    state.projects.push({
      text,
      id:id
    })
  },
  setCategories(state, val) {
    state.projects = val; 
  },
  //Updating Answer
  Update(state,payload){
    // var categories = [];
    // categories = payload;
    // console.log(categories.Question1);

    // this.state.projects["0"].Question1.Answer = "Dipak"
    // console.log(this.state.projects["0"].Question1.Answer);
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
  UpdateAnswers(context,payload){
    let categories = [];
    categories = payload;
    // console.log(categories.Question1);
    // context.commit('Update',payload);
    // let arr = [];
    this.categories.forEach((value, index) => {
        // arr.push(value);
        console.log(value);
        console.log(index);
    });
  }
}