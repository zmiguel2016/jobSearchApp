const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserToDB = functions.auth.user().onCreate((user) => {
    admin.firestore().collection('users').doc(user.uid).set({
       // uid: user.uid,
        email: user.email
      });
  });

