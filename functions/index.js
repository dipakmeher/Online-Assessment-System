const functions = require('firebase-functions');
const admin = require('firebase-admin');
const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");
admin.initializeApp();

// exports.writeToFirestore = functions.https.onRequest(async (req, res) => {
  
// });

exports.randomPicker = functions.https.onCall((data, context) => {
   admin.firestore().collection('Master-Bank').doc('Master-Bank').get().then(querySnapshot => {
    if (querySnapshot.empty) {
      console.log("QuerySnapshot is empty");
    } else {
    var categories = [];
    var masterbank=[];
    categories.push(querySnapshot.data());
    console.log("Categories:- ",categories);
     for (const [key, value] of Object.entries(categories["0"])) {
      masterbank.push(value);
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
    return admin.firestore().collection('Question-Paper').doc('Question-Paper').set(Object.assign({},newmaster));

    }
  });
});

exports.updateUser = functions.https.onCall((data, context) => {
  var categories = [];
      var master = [];
      var masterqid = [];
      var subans={};
      
      admin.firestore().collection("Assessment").get().then(querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
         
          querySnapshot.forEach(function(doc) {
            categories[doc.id]=doc.data();
          });
          admin.firestore().collection("Master-Bank").doc("Master-Bank").get().then(async querySnapshot => {
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
                 admin.firestore().collection("Result").doc(key).set(Result)
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
})
// exports.updateUser = functions.firestore.document('Assessment/Question-Paper')
//   .onUpdate(async (change, context) => {
//       const bd =  admin.firestore().collection('Question-Paper').doc('Question-Paper');
//       const mb =  admin.firestore().collection('Master-Bank').doc('Master-Bank');
//       const getBddata = await bd.get();
//       const getMbdata = await mb.get();
//       var categoriesgb = [];
//       var categoriesmb = [];
//       var messages=[];
//       var ansgb = {};
//       var ansmb = {};
//       var ans = {};
//       var score = 0;
      
//       var sgb = ""; 
    
//       for (const [key, value] of Object.entries(getBddata._fieldsProto)) {
//         var type =  getBddata._fieldsProto[key].mapValue.fields.type.stringValue;
//         // This for-loop is for getting answers of user at one place
      
//         for (const [key1, value1] of Object.entries(getBddata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
//           categoriesgb.push(value1);
//         }
//         sgb = categoriesgb.join(""); 
//         ansgb[key] = sgb;
//         categoriesgb = [];
//         //=============================================================================================
//         if(type === "Objective"){
//         for (const [key2, value2] of Object.entries(getMbdata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
//           categoriesmb.push(value2);
//         }
//         var smb = categoriesmb.join("");

//         ansmb[key] = smb;
//         categoriesmb=[];
        
//         if(sgb == smb){
//           ans[key]=sgb;
//           score++;
//         }
//       }
//       else if(type === "Subjective"){
//       messages.push(sgb);
//       ans[key]=sgb;
//     }
//   }
//   //  await this.$store.commit("assessment/setSubAns",messages);
//   ans["subans"] = messages;
//   ans["score"] = score;

//     return admin.firestore().collection('Question-Paper').doc('Correct-Answers').set(ans);
// });
    
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
    var emails=[];
    return admin.auth().listUsers(1000)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
         var email = userRecord.toJSON().email;
         var adminclaim = userRecord.toJSON().customClaims.admin;
         emails[email] = adminclaim;
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
      // console.log("listUser of add admin role");
       return admin.firestore().collection('Question-Paper').doc('Emails').set(Object.assign({},emails));
      })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
  }).catch(err => {
    return err;
  });
});


exports.setFalseClaim = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false
    })
  }).then(() => {
    var emails=[];
    return admin.auth().listUsers(1000)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        var email = userRecord.toJSON().email;
        var adminclaim = userRecord.toJSON().customClaims.admin;
        emails[email] = adminclaim;
        // console.log(userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
        console.log("listUser of setFalseClaim");
       return admin.firestore().collection('Question-Paper').doc('Emails').set(Object.assign({},emails));
      })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
  }).catch(err => {
    return err;
  });
});