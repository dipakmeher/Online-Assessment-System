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
        db.collection("Question-Paper").doc("Emails").get().then(querySnapshot => {
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
    evaluation({commit}){
      var categories = [];
      var master = [];
      var masterqid = [];
       db.collection("Assessment").get().then(querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
         
          querySnapshot.forEach(function(doc) {
            categories[doc.id]=doc.data();
          });
        }
      });

      db.collection("Master-Bank").doc("Master-Bank").get().then(querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
          master.push(querySnapshot.data())
          for (const [key, value] of Object.entries(master["0"])) {
           masterqid[value.Qid] = value;  
          }
        }
      });

      console.log("categories", categories);
      console.log("Master-Bank",masterqid);

      // for(const [key, value] of Object.entries(masterqid)) {
      //   console.log("key:- ",key,"value:- ",value);
      //   console.log("categories:- ",categories);
      //   // for(const [key1, value1] of Object.entries(value)) {
      //   //   var type = value1.type;
      //   //   if(type === "Subjective"){
            
      //   //   }
      //   //   else if(type === "Objective"){
      //   //     var mqid = masterqid[value1.Qid].Qid;
      //   //     if(mqid === value1.Qid){
      //   //       console.log("Master:- ",masterqid["Question"]," Question:- ", value.Question);
      //   //     }
      //   //   }
      //   // }
      // }
    }
};