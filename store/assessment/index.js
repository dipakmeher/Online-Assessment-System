import db from '@/plugins/firebase'
const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");


export const state = () => ({
    messages:[],
    time:30,
    msgupdated:false
})
export const getters = {
  getmsgupdate (state) {
    return state.msgupdated;
  }
}
export const mutations = {
    setSubAns(state,payload){
        state.messages = payload;
    },
    setTime(state,payload){
      state.time=payload;
      state.msgupdated=true;
      console.log("SetTime Mutation invoked.",state.msgupdated)
    }
  };

export const actions={
  // Fetch Categories
  fetchSubAns({ commit }) {
    var len = 1;
    db.collection("Assessment").doc("Correct-Answers").get().then(querySnapshot => {
      if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
      } else {
        var categories = [];
        var subans = [];
        var nature = "";

        categories.push(querySnapshot.data());
        for (const [key, value] of Object.entries(categories["0"])) {
            if(key==="subans"){
                subans.push(value);
            }
        }

        // ML code
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
        
        //   const getSentiment = (score) => {
        //     if (score > 0.66) {
        //       return `Score of ${score} is Positive`;
        //     }
        //     else if (score > 0.4) {
        //       return `Score of ${score} is Neutral`;
        //     }
        //     else {
        //       return `Score of ${score} is Negative`;
        //     }
        //   }
        
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
          }
          run(subans["0"]);      
      }
    });
  } 
};  