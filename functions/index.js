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
    .document('Assessment/{bd}')
    .onUpdate(async (change, context) => {
      // return admin.firestore().collection('Assessment').doc('Master-Bank').set({
      //   Question1:{
      //     Question:"Who is Krsna",
      //     Answer:"SPOG"
      // //   }
      // });
      const bd =  admin.firestore().collection('Assessment').doc('Book-Distribution');
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

// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
//   });
// const Firestore = require('@google-cloud/firestore');

// const firestore = new Firestore({
//   projectId: 'onlineassessment-3c952',
//   keyFilename: '/home/dipak/Documents/Engineering/Finalyr/Sem_2/NuxtJs/OnlineAssessment/onlineassessment-3c952-firebase-adminsdk-8tg49-01c765ff4d.json',
// });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//  console.log("Hello World Invoked");
// });
