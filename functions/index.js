const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'onlineassessment-3c952',
  keyFilename: '/home/dipak/Documents/Engineering/Finalyr/Sem_2/NuxtJs/OnlineAssessment/onlineassessment-3c952-firebase-adminsdk-8tg49-01c765ff4d.json',
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//  console.log("Hello World Invoked");
// });

exports.getData = functions.https.onRequest((request, response) => {
const promise = admin.firestore().collection('Assessment').doc('Book-Distribution').get();
const p2=promise.then(snapshot=>{
    const data = snapshot.data();
    response.send(data);
    response.send("Data fetched");
    console.log("Get Data function invoked");

});
p2.catch(error=>{
    console.log(error);
    response.status(500).send(error);
})
});


// exports.onDataAdded = functions.database.ref('Assessment/Book-Distribution/message/{id}').onCreate((snap, context) =>{
//     // const data =  snap.val();
//     // const newData = {
//     //     msg:data.msg.toUpperCase()
//     // };
//     // return snap.data.ref.parent.child('copiedData').set(newData);
//     console.log("This file is referenced");
// });


exports.getScreams = functions.https.onRequest((req, res) => {
    admin.firestore().collection('Assessment').get()
    .then((data) => {
        let screams = [];
        data.forEach((doc) => {
            screams.push(doc.data())
        });
        res.send(screams);
    })
    .catch((err) => console.error(err)) })
