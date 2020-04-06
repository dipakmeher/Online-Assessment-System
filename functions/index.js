const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();

exports.writeToFirestore = functions.https.onRequest(async (req, res) => {
  const pathDir =  admin.firestore().collection('Assessment').doc('Master-Bank1');
  const eventDoc = await pathDir.get(); 
  if (!eventDoc.exists) {
    res.json({result: 'failure', message: "Invalid Event ID"});
  } else {
    var categories = [];
    var ans = {};
    for (const [key, value] of Object.entries(eventDoc._fieldsProto)) {
      for (const [key1, value1] of Object.entries(eventDoc._fieldsProto[key].mapValue.fields.Answer.stringValue)) {
        categories.push(value1);
      }
      var s = categories.join("");  
      ans[key] = s;
      categories = [];
    }
    res.json(ans);
    }
});

exports.updateUser = functions.firestore
    .document('Assessment/Question-Paper')
    .onUpdate(async (change, context) => {
      const bd =  admin.firestore().collection('Assessment').doc('Question-Paper');
      const mb =  admin.firestore().collection('Assessment').doc('Master-Bank1');

      const getBddata = await bd.get();
      const getMbdata = await mb.get();

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
        ansgb[key] = sgb;
        categoriesgb = [];
        //=============================================================================================

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