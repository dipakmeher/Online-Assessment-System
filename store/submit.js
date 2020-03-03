import db from '../plugins/firebase'

export const state = () => ({
    CorrectAnswer:[]
})


export const getters = {
    getCorrectAns (state) {
      return state.CorrectAnswer
    }
}


export const mutations={
    add(state,title){
        state.CorrectAnswer.push(title)
      },
    // clearList(state){
    //     state.CorrectAnswer = []
    // }
}

export const actions={
    // Fetch Categories
    fetchScore({ commit }) {
        db.collection("Assessment").doc("Correct-Answers").get().then(function(doc) {
            if (doc.exists) {
                commit("add",doc.data());
                //console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },
    clearList({ commit }) {
        state.CorrectAnswer=[];
        db.collection("Assessment").doc("Correct-Answers").set({
            correct:0
        });
        // alert("clearList Invoked");
    }
  }