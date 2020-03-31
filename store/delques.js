import db from '../plugins/firebase'

export const state = () => ({
    disk:[]
})

export const getters = {
    get (state) {
      return state.disk["0"]
    }
  }
export const mutations={
  setCategories(state, val) {
    state.disk = val; 
  },
  Update(state,payload){
    let key = payload.key;
    let ans = payload.ans;
    this.state.disk["0"][key].Answer = ans;
  }
}


export const actions={
  // Fetch Categories
  fetchCategories({ commit }) {
    db.collection("Assessment").doc("Check").get().then(querySnapshot => {
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        categories.push(querySnapshot.data());
        commit("setCategories", categories);
      }
    });
    // db.collection("Assessment").doc("Check").onSnapshot(res => {
    //   const changes = res.docChanges();
      
    //   changes.forEach(change => {
    //     if (change.type === 'added') {
    //       this.projects.push({
    //         ...change.doc.data(),
    //         id: change.doc.id
    //       })
    //     }  
    //     console.log(change.doc.id);
    //   })
    // });
  },
  //=========================================================================
  DeleteQuestion({commit,state},index){
    if(confirm('Are you sure? ')){
      var parent = document.getElementById('cafelist');
      var child = document.getElementById(index);
      parent.removeChild(child);
      delete state.disk["0"][index];
      db.collection("Assessment").doc("Check").set(Object.assign({}, state.disk["0"]))
          .then(()=>{ 
            alert("Question is deleted successfully...");
          });
    }
    
  }
}