import db from '../plugins/firebase'

export const state = () => ({
    disk:[]
})

export const getters = {
    getaddque (state) {
      return state.disk["0"]
    }
  }
export const mutations={
  setaddCategories(state, val) {
    this.state.disk = val; 
  }
//   Update(state,payload){
//     let key = payload.key;
//     let ans = payload.ans;
//     this.state.disk["0"][key].Answer = ans;
//   }
}


export const actions={
  // Fetch Categories
  Categories({ commit }) {
    db.collection("Assessment").doc("Check").get().then(querySnapshot => {
      console.log(querySnapshot.data());
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        console.log("empty");
      } else {
        var categories = [];
        categories.push(querySnapshot.data());
        commit("setaddCategories", categories);
        console.log("disk=",this.state.disk);
      }
      
    });
  },
  //============================================================================
  Answers({commit,state},payload){
    if(confirm('Are you sure? ')){
      var parent = document.getElementById('cafelist');
      var child = document.getElementById(id);
      parent.removeChild(child);
      console.log("Documents Succesfully Deleted");
      let categories = [];
      var check = [];
      categories = payload;
      check.push(this.state.disk["0"]);
      console.log(delete check["0"].Question1);
      console.log(check["0"]);
    }
  }
}