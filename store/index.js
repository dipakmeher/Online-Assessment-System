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
  }
}
export const actions={
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
  UpdateAnswers({commit}){

  }
}

  //  db.collection('Assessment').onSnapshot(res => {//GetPaper
//   const changes = res.docChanges();
//   console.log(changes);
//   changes.forEach(change => {
//     if(change.type === 'added') {  
//     // this.$store.commit('add', { ...change.doc.data(),id: change.doc.id })
//     //       console.log(...change.doc.data());
//       state.projects.push({
//         ...change.doc.data(),
//         id: change.doc.id
//       })
//     }  
//   })
// });