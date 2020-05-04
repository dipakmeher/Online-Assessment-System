import { functions } from "@/plugins/firebase";
import db from '@/plugins/firebase';

export const state = () => ({
  projects:[],
  user:0,
  random:[]
});

export const getters = {
  get (state) {
    return state.projects["0"];
  },
  getUser (state) {
    return state.user;
  }
}
export const mutations = {
    setCategories(state, val) {
        state.projects = val; 
        console.log("admin set categories");
    },
    setRandom(state, val) {
      this.state.random = val; 
      console.log("set random");
     },
    removeadmin(state,payload){
        state.projects["0"][payload]=false;
        console.log("remove Executed");
    },
    addadmin(state,payload){
        state.projects["0"][payload]=true;
        console.log("add admin Executed");
    },
    setlen(state,payload){
        state.user = payload;
    }
};

export const actions = {
     async fetchCategories({ commit }) {
      var len=0;
        db.collection("Assessment").doc("Emails").get().then(querySnapshot => {
            if (querySnapshot.empty) {
            //this.$router.push('/HelloWorld')
            } else {
            var categories = [];
            categories.push(querySnapshot.data());
            commit("setCategories", categories);  
            console.log("Category:- ",categories);
            for (const [key, value] of Object.entries(categories["0"])) {
              len = len + 1;
            }
            console.log("len:- ",len)
            console.log("Fetch Category ran");
             commit("setlen",len);          
         }
        });
    },
    // async measureLen({ commit }) {
    //  var len=0;
    //   for (const [key, value] of Object.entries(this.state.projects["0"])) {
    //     len = len + 1;
    //   }
    //   commit("setlen",len);
    //   console.log("Measure Length");
    // },
    async removeAdmin({ commit },index) {
        const setFalseClaim = functions.httpsCallable('setFalseClaim');
        await setFalseClaim({ email: index}).then(result => {
          console.log("message",result);
        });
    
        console.log("account",account); 
    },
    async addAdmin({ commit },index) {
        const addAdminRole = functions.httpsCallable('addAdminRole');
        await addAdminRole({ email: index }).then(result => {
          console.log("message",result);
        },err=>{
            console.log("err:-", err);
        })
    },

     randomPicker({ commit }) {
      var len = 0;
      db.collection("Assessment").doc("Master-Bank1").get().then(querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
        var categories = [];
        var masterbank=[];
        categories.push(querySnapshot.data());
         commit("setRandom", categories);
         for (const [key, value] of Object.entries(categories["0"])) {
          masterbank.push(value);
          len = len + 1;
        }
        var masterlen = masterbank.length;
        var setque = 3;//Must be less than @Masterlen
        var a = Math.floor(Math.random() * Math.floor(masterlen));
        var b = a + setque; 
        if(b>masterlen){
          b=masterlen;
          a=b-setque;
        }
        var newmaster = masterbank.slice(a,b);

        for (const [key, value] of Object.entries(categories["0"])) {
          let ans = newmaster[value.Question];
          
        }

        db.collection('Question-Paper').doc('Question-Paper').set(Object.assign({},newmaster));

     }
    });
  },

};