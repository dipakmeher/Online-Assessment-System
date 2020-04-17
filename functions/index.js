const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();
 var Sentiment = require('sentiment');
var sentiment = new Sentiment();

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
      var frLanguage = {
        labels: { 
          'soul': 2,
          'spirit':2,
          'body':-2,
          'not':1
        }
      };
      sentiment.registerLanguage('fr', frLanguage);
      var text = sgb
      var result = sentiment.analyze(text , { language: 'fr' });
      var result1 = sentiment.analyze(text);
      var finalscore = result.score + result1.score;
      if(finalscore>=2){
        nature = "Goodness";
      }else if(finalscore<2 && finalscore >-2){
        nature = "Passion"; 
      }
      else{
        nature = "Ignorance";
        }
        ans[key]=nature;
      }
      }
      ans["score"]=score;
      ans["nature"]=nature;
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