const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();

exports.writeToFirestore = functions.https.onRequest(async (req, res) => {
  const bd =  admin.firestore().collection('Assessment').doc('Question-Paper');
  const mb =  admin.firestore().collection('Assessment').doc('Master-Bank1');
  const getBddata = await bd.get();
  const getMbdata = await mb.get();
  const ansUser =  getBddata._fieldsProto.Question2.mapValue.fields.Answer.stringValue;
  const type =  getBddata._fieldsProto.Question2.mapValue.fields.type.stringValue;
  res.json(type);
//   var categoriesgb = [];
//   var categoriesmb = [];
//   var ansgb = {};
//   var ansmb = {};
//   var ans = {};
//   var score = 0;
//   for (const [key, value] of Object.entries(getBddata._fieldsProto)) {
//     // This for-loop is for getting answers of user at one place
//     if(getBddata._fieldsProto[key].mapValue.fields.type.stringValue === "Objective"){
//     for (const [key1, value1] of Object.entries(getBddata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
//       categoriesgb.push(value1);
//     }
//     var sgb = categoriesgb.join(""); 
//     console.log("key", key); 
//     console.log("categoriesgb: ",sgb);
//     ansgb[key] = sgb;
//     categoriesgb = [];
//     //=============================================================================================

//     for (const [key2, value2] of Object.entries(getMbdata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
//       categoriesmb.push(value2);
//     }
//     var smb = categoriesmb.join("");

//     ansmb[key] = smb;
//     console.log("key2", key2); 
//     console.log("categoriesmb: ",smb);
//     categoriesmb=[];
    
//     if(sgb == smb){
//       ans[key]=sgb;
//       score++;
//     }
//     console.log("Objective function ran");
//   }
//   else{
//     console.log("Subjective Function Ran");
//   }
//   }
//   res.json({message:" Function Ran successfully"});
 });

exports.updateUser = functions.firestore
    .document('Assessment/Question-Paper')
    .onUpdate(async (change, context) => {
      const bd =  admin.firestore().collection('Assessment').doc('Question-Paper');
      const mb =  admin.firestore().collection('Assessment').doc('Master-Bank1');

      const getBddata = await bd.get();
      const getMbdata = await mb.get();

      console.log("getBddata: ",getBddata);
      console.log("getMbdata: ",getMbdata);

      const ansUser =  getBddata._fieldsProto.Question1.mapValue.fields.Answer.stringValue;
      const ansMaster = getMbdata._fieldsProto.Question1.mapValue.fields.Answer.stringValue;
      var categoriesgb = [];
      var categoriesmb = [];
      var ansgb = {};
      var ansmb = {};
      var ans = {};
      var score = 0;  
      for (const [key, value] of Object.entries(getBddata._fieldsProto)) {
        for (const [key1, value1] of Object.entries(getBddata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
          categoriesgb.push(value1);
        }
        var sgb = categoriesgb.join(""); 
        console.log("key", key); 
        console.log("categoriesgb: ",sgb);
        ansgb[key] = sgb;
        categoriesgb = [];
        //=============================================================================================

        for (const [key2, value2] of Object.entries(getMbdata._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
          categoriesmb.push(value2);
        }
        var smb = categoriesmb.join("");

        ansmb[key] = smb;
        console.log("key2", key2); 
        console.log("categoriesmb: ",smb);
        categoriesmb=[];
        
        if(sgb == smb){
          ans[key]=sgb;
          score++;
        }
      }
      ans["correct"] = score;
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