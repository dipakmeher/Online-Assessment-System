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
  var Result={};
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
            var tempres={};
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
            subans[key] = temp; 
            tempres["score"]=score;
            Result[key] = tempres;
          }//End of Main Loop
          return admin.firestore().collection("Question-Paper").doc("Result").set(Result)
          .then(()=>{
            return admin.firestore().collection("Question-Paper").doc("Subjective-Answers").set(subans)
            .then(()=>{
              console.log("Subjective Answer Updated");
            })       
          }).catch(error=>{
            console.log("Error:- ",error);
          });
        }
      })
    }
  })
})

exports.evaluateAnswer = functions.https.onCall(async(data, context) => {
  console.log("Data.email=> ",data.uid);
  await admin.firestore().collection("Assessment").doc(data.uid).get().then(querySnapshot => {
    if (querySnapshot.empty) {
    //this.$router.push('/HelloWorld')
    } else {
      var categories = [];
      var master = [];
      var masterqid = [];
      var subans={};
      var Result={};
      categories.push(querySnapshot.data());
      admin.firestore().collection("Master-Bank").doc("Master-Bank").get().then(async querySnapshot => {
        if (querySnapshot.empty) {
        //this.$router.push('/HelloWorld')
        } else {
          master.push(querySnapshot.data())
          for (const [key, value] of Object.entries(master["0"])) {
           masterqid[value.Qid] = value;  
          }
          var score = 0;
          var temp=[];
          // Main for loop
          for(const [key, value] of Object.entries(categories["0"])) {
            var type = value.type;
            if(type === "Subjective"){
              temp.push(value.Answer);
            }
            else if(type === "Objective"){
              var masterans = masterqid[value.Qid].Answer;
              if(masterans === value.Answer){
                score++;
              }
            }
            }//End of Second For Loop
            Result["score"]=score;
            Result['subans']=temp;
            admin.firestore().collection("Result").doc(data.uid).set(Result)
            .then(()=>{
             console.log("Evaluate Answer ran successfully.");
            }).catch(error=>{
              console.log("Error:- ",error);
            });
          }
      })
    }
  })
})

    
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