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
  admin.firestore().collection("Assessment").get().then(querySnapshot => {
    if (querySnapshot.empty) {
    //this.$router.push('/HelloWorld')
    } else {
      querySnapshot.forEach(function(doc) {
        categories[doc.id]=doc.data();
      });
    }
  });
  console.log("Categories:- ",categories);
  // admin.firestore().collection("Master-Bank").doc("Master-Bank").get().then(querySnapshot => {
  //   if (querySnapshot.empty) {
  //   //this.$router.push('/HelloWorld')
  //   } else {
  //     master.push(querySnapshot.data())
  //     for (const [key, value] of Object.entries(master["0"])) {
  //      masterqid[value.Qid] = value;  
  //     }
  //   }
  // });

  // console.log("categories", categories);
  // console.log("Master-Bank",masterqid);

  for(const [key, value] of Object.entries(categories)) {
    console.log("key:- ",key,"value:- ",value);
    // for(const [key1, value1] of Object.entries(value)) {
    //   var type = value1.type;
    //   if(type === "Subjective"){
        
    //   }
    //   else if(type === "Objective"){
    //     var mqid = masterqid[value1.Qid].Qid;
    //     if(mqid === value1.Qid){
    //       console.log("Master:- ",masterqid["Question"]," Question:- ", value.Question);
    //     }
    //   }
    // }
  }
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