const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();
 const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");

// exports.writeToFirestore = functions.https.onRequest(async (req, res) => {
  
// });

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
      
      var sgb = ""; 
    
      for (const [key, value] of Object.entries(getBddata._fieldsProto)) {
        var type =  getBddata._fieldsProto[key].mapValue.fields.type.stringValue;
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
      messages.push(sgb);
      ans[key]=sgb;
     }
   }
  //  await this.$store.commit("assessment/setSubAns",messages);
  ans["subans"] = messages;
  ans["score"] = score;

      return admin.firestore().collection('Assessment').doc('Correct-Answers').set(ans);
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