const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();
 const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");

// exports.writeToFirestore = functions.https.onRequest(async (req, res) => {
//  });

exports.updateUser = functions.firestore
    .document('Assessment/Question-Paper')
    .onUpdate(async (change, context) => {
      const bd =  admin.firestore().collection('Assessment').doc('Question-Paper');
      const mb =  admin.firestore().collection('Assessment').doc('Master-Bank1');
      const getBddata = await bd.get();
      const getMbdata = await mb.get();
      var categoriesgb = [];
      var categoriesmb = [];
      var messages=[];
      var ansgb = {};
      var ansmb = {};
      var ans = {};
      var score = 0;
      var nature="";
      var sgb = ""; 
    
      for (const [key, value] of Object.entries(getBddata._fieldsProto)) {
        var type =  getBddata._fieldsProto[key].mapValue.fields.type.stringValue;
        console.log(type);
        // This for-loop is for getting answers of user at one place
      
        for (const [key1, value1] of Object.entries(getBddata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
          categoriesgb.push(value1);
        }
        sgb = categoriesgb.join(""); 
        ansgb[key] = sgb;
        categoriesgb = [];
        //=============================================================================================
        if(type === "Objective"){
        for (const [key2, value2] of Object.entries(getMbdata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
          categoriesmb.push(value2);
        }
        var smb = categoriesmb.join("");

        ansmb[key] = smb;
        categoriesmb=[];
        
        if(sgb == smb){
          ans[key]=sgb;
          score++;
        }
      }
      else if(type === "Subjective"){
      // ML Code
      messages.push({"body":sgb})
      ans[key]=sgb;
     }
   }

   const setup = async () => {
     console.log("Setup function exectued");
    return messages.map(m => m.body);
  }

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

  // const getSentiment = (score) => {
  //   if (score > 0.66) {
  //     return `Score of ${score} is Positive`;
  //   }
  //   else if (score > 0.4) {
  //     return `Score of ${score} is Neutral`;
  //   }
  //   else {
  //     return `Score of ${score} is Negative`;
  //   }
  // }

  const run = async (text) => {
    const model = await loadModel(); 
    const metadata = await getMetaData();
    let sum = 0;
    text.forEach(function (prediction) {
      console.log(` ${prediction}`);
      perc = predict(prediction, model, metadata);
      sum += parseFloat(perc, 10);
    })
    var finalscore = sum/text.length;
    if (finalscore > 0.66) {
      nature = "Goodness";
    }
    else if (finalscore > 0.4) {
      nature = "Passion";
    }
    else {
      nature = "Ignorance";
    }
  }

  setup().then(function(result) {
    run(result); 
  });
  ans["nature"] = nature;
  ans["score"] = score;

      return admin.firestore().collection('Assessment').doc('Correct-Answers').set(ans).then(()=>{
        console.log("CorrectAnswer got executed");
      });
    });
    
exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if ( context.auth.token.admin !== true ) {
    return { error: 'Only admins can add other admins' }
  }
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});