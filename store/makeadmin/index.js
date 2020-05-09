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
      // const updateUser = functions.httpsCallable('updateUser');
      //  updateUser().then(result => {
      //     console.log("Update User message",result);
      //   });
      var categories = [];
      var master = [];
      var masterqid = [];
      var subans={};
      
       db.collection("Assessment").get().then(querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
         
          querySnapshot.forEach(function(doc) {
            categories[doc.id]=doc.data();
          });
          db.collection("Master-Bank").doc("Master-Bank").get().then(async querySnapshot => {
            if (querySnapshot.empty) {
            //this.$router.push('/HelloWorld')
            } else {
              master.push(querySnapshot.data())
              for (const [key, value] of Object.entries(master["0"])) {
               masterqid[value.Qid] = value;  
              }
              // Main for loop
              for(const [key, value] of Object.entries(categories)) {
                var score = 0;
                var temp=[];
                var Result={};
                console.log("key:- ",key,"Value:- ",value);
                // Second For Loop
                for(const [key1, value1] of Object.entries(value)) {
                  var type = value1.type;
                  if(type === "Subjective"){
                    temp.push(value1.Answer);
                  }
                  else if(type === "Objective"){
                    var masterans = masterqid[value1.Qid].Answer;
                    if(masterans === value1.Answer){
                      score++;
                    }
                  }
                }//End of Second For Loop
                Result["score"]=score;
                console.log("temp length=> ",temp.length);

                if(temp.length === 0){
                  console.log("temp is zero");
                  Result["nature"] = "Cannot be determine"
                }else{
                  // ML Code
              
                  const getMetaData = async () => {
                    const metadata = await fetch("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json")
                    return metadata.json()
                  }
                
                  const padSequences = (sequences, metadata) => {
                    return sequences.map(seq => {
                      if (seq.length > metadata.max_len) {
                        seq.splice(0, seq.length - metadata.max_len);
                      }
                      if (seq.length < metadata.max_len) {
                        const pad = [];
                        for (let i = 0; i < metadata.max_len - seq.length; ++i) {
                          pad.push(0);
                        }
                        seq = pad.concat(seq);
                      }
                      return seq;
                    });
                  }
                
                  const loadModel = async () => {
                    const url = `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`;
                    const model = await tf.loadLayersModel(url);
                    return model;
                  };
                
                  const predict = (text, model, metadata) => {
                      const trimmed = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
                      const sequence = trimmed.map(word => {
                        const wordIndex = metadata.word_index[word];
                        if (typeof wordIndex === 'undefined') {
                          return 2; //oov_index
                        }
                        return wordIndex + metadata.index_from;
                      });
                      const paddedSequence = padSequences([sequence], metadata);
                      const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
                    
                      const predictOut = model.predict(input);
                      const score = predictOut.dataSync()[0];
                      predictOut.dispose();
                      return score;
                    }
                  const run = async (text) => {
                    const model = await loadModel(); 
                    const metadata = await getMetaData();
                    let sum = 0;
                    text.forEach(function (prediction) {
                      console.log(` ${prediction}`);
                      let perc = predict(prediction, model, metadata);
                      sum += parseFloat(perc, 10);
                    })
                   var finalscore = sum/text.length;
                    var nature="";
                    if (finalscore > 0.66) {
                        nature = "Goodness"
                    }
                      else if (finalscore > 0.4) {
                        nature = "Passion"
                      }
                      else {
                        nature = "Ignorance"
                      }
                      console.log("Nature:- ",nature);
                      return nature;
                  }
                 
                  await run(temp).then(result =>{
                    Result["nature"] = result;
                  });
                }//temp over
                
                 subans[key]=Result;
                 db.collection("Result").doc(key).set(Result)
                .then(()=>{
                 
                }).catch(error=>{
                  console.log("Error:- ",error);
                });
              }//End of Main Forloop
                console.log("Subans:- ",subans);
               
            }
          });
          
        }
      });
    }
};