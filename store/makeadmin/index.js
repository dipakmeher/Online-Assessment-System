import { functions } from "@/plugins/firebase";
import db from '@/plugins/firebase';
import { time } from "@tensorflow/tfjs";
const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");

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
            for (const [key, value] of Object.entries(categories["0"])) {
              len = len + 1;
            }
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
      //  db.collection("Assessment").doc("EHJK1tbIj8ZmJK9yT3jZrvmNFKz1").get().then(querySnapshot => {
      //   if (querySnapshot.empty) {
      //   //this.$router.push('/HelloWorld')
      //   } else {
      //     var categories = [];
      //     var master = [];
      //     var masterqid = [];
      //     var subans={};
      //     var Result={};
      //     categories.push(querySnapshot.data());
      //     delete categories["0"]["start-time"];
      //     delete categories["0"]["end-time"];
      //     console.log("Categories:- ",categories);
      //     db.collection("Master-Bank").doc("Master-Bank").get().then(async querySnapshot => {
      //       if (querySnapshot.empty) {
      //       //this.$router.push('/HelloWorld')
      //       } else {
      //         master.push(querySnapshot.data())
      //         for (const [key, value] of Object.entries(master["0"])) {
      //          masterqid[value.Qid] = value;  
      //         }
      //         var score = 0;
      //         var temp=[];
      //         // Main for loop
      //         for(const [key, value] of Object.entries(categories["0"])) {
      //           var type = value.type;
      //           if(type === "Subjective"){
      //             temp.push(value.Answer);
      //           }
      //           else if(type === "Objective"){
      //             //var masterans = masterqid[value.Qid].Answer;
      //             var choice = masterqid[value.Qid].Answer;
      //             var masterans = masterqid[value.Qid].Choices[choice];
      //             if(masterans === value.Answer){
      //               score++;
      //             }
      //           }
      //           }//End of Second For Loop
      //           Result["score"]=score;
      //           Result['subans']=temp;
      //           console.log("Result=> ",Result);
      //           // admin.firestore().collection("Result").doc(data.uid).set(Result)
      //           // .then(()=>{
      //           //  console.log("Evaluate Answer ran successfully.");
      //           // }).catch(error=>{
      //           //   console.log("Error:- ",error);
      //           // });
      //         }
      //     })
      //   }
      // })
    }
}