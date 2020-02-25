const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();

exports.writeToFirestore = functions.https.onRequest(async (req, res) => {
  const pathDir =  await admin.firestore().collection('Assessment').doc('Book-Distribution');
  const eventDoc = await pathDir.get();
  if (!eventDoc.exists) {
    res.json({result: 'failure', message: "Invalid Event ID"});
  } else {
    return admin.firestore().collection('Assessment').doc('Master-Bank').set({
      Question1:"message"
    });
    res.json({message:"Function got executed"}); 
    }
});

exports.updateUser = functions.firestore
    .document('Assessment/{bd}')
    .onUpdate((change, context) => {
      return admin.firestore().collection('Assessment').doc('Master-Bank').set({
        Question1:"dipak"
      });
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
