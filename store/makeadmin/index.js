import { functions } from "@/plugins/firebase";
import db from '@/plugins/firebase';
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
      
      const updateUser = functions.httpsCallable('updateUser');
       updateUser().then(result => {
         var master=[];
          db.collection("Question-Paper").doc("Subjective-Answers").get().then(async querySnapshot => {
            if (querySnapshot.empty) {
            //this.$router.push('/HelloWorld')
            } else {
              master.push(querySnapshot.data())
              // Main for loop
              for(const [key, value] of Object.entries(master["0"])) {
                // var score = 0;
                // var temp=[];
                // var tempres={};
                console.log("key:- ",key,"Value:- ",value);
                // Second For Loop
                // for(const [key1, value1] of Object.entries(value)) {
                //   var type = value1.type;
                //   if(type === "Subjective"){
                //     temp.push(value1.Answer);
                //   }
                //   else if(type === "Objective"){
                //     var masterans = masterqid[value1.Qid].Answer;
                //     if(masterans === value1.Answer){
                //       score++;
                //     }
                //   }
                // }//End of Second For Loop
                // subans[key] = temp; 
                // tempres["score"]=score;
                // Result[key] = tempres;
              }//End of Main Loop
             
            }
          })
        });
      // var categories = [];
      // var master = [];
      // var masterqid = [];
      // var subans={};
      // var Result={};
      //  db.collection("Assessment").get().then(querySnapshot => {
      //   if (querySnapshot.empty) {
      //   //this.$router.push('/HelloWorld')
      //   } else {
         
      //     querySnapshot.forEach(function(doc) {
      //       categories[doc.id]=doc.data();
      //     });
      //     db.collection("Master-Bank").doc("Master-Bank").get().then(async querySnapshot => {
      //       if (querySnapshot.empty) {
      //       //this.$router.push('/HelloWorld')
      //       } else {
      //         master.push(querySnapshot.data())
      //         for (const [key, value] of Object.entries(master["0"])) {
      //          masterqid[value.Qid] = value;  
      //         }
      //         // Main for loop
      //         for(const [key, value] of Object.entries(categories)) {
      //           var score = 0;
      //           var temp=[];
      //           var tempres={};
      //           console.log("key:- ",key,"Value:- ",value);
      //           // Second For Loop
      //           for(const [key1, value1] of Object.entries(value)) {
      //             var type = value1.type;
      //             if(type === "Subjective"){
      //               temp.push(value1.Answer);
      //             }
      //             else if(type === "Objective"){
      //               var masterans = masterqid[value1.Qid].Answer;
      //               if(masterans === value1.Answer){
      //                 score++;
      //               }
      //             }
      //           }//End of Second For Loop
      //           subans[key] = temp; 
      //           tempres["score"]=score;
      //           Result[key] = tempres;
      //         }//End of Main Loop
      //         console.log("Subans:- ", subans);
      //         console.log("Result:- ", Result);
      //         return db.collection("Question-Paper").doc("Result").set(Result)
      //         .then(()=>{
      //           return db.collection("Question-Paper").doc("Subjective-Answers").set(subans)
      //           .then(()=>{
      //             alert("Subjective-Answer Submitted.");
      //           })          
      //         }).catch(error=>{
      //           console.log("Error:- ",error);
      //         });
      //       }
      //     })
      //   }
      // })          
    }
}