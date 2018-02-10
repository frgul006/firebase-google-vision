import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

// Cloud Vision
import * as vision from '@google-cloud/vision';
const visionClient = new vision.ImageAnnotatorClient();

// bucket
const bucketName = 'frgul006-test.appspot.com';

export const imageTagger = functions.storage.bucket(bucketName).object().onChange(async event => {
  const object = event.data;
  const filePath = object.name;

  // location of saved file in bucket
  const imageUri = `gs://${bucketName}/${filePath}`;

  // firebase doc id
  const docId = filePath.split('.jpg')[0];

  const docRef = admin.firestore().collection('photos').doc(docId);

  const results = await visionClient.labelDetection(imageUri);

  const labels = results[0].labelAnnotations.map(obj => obj.description);
  const hotdog = labels.includes('hot dog');

  return docRef.set({ hotdog, labels });
})
