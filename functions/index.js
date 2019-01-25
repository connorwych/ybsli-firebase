const firebase = require("firebase-admin");
const functions = require('firebase-functions');
const serviceAccount = require("./key.json");
const firebaseDb = require("./firebase-db.json");

// const interpreterListingData = ["FIRST_NAME","LAST_NAME"];
const interpreterListingData = ["FIRST_NAME","LAST_NAME","GENDER","MENTAL_HEALTH_WORK","LEGAL_WORK","IMG_URL"];


exports.getInterpreterListing = functions.https.onRequest((req, res) => {
  returnData()
  .then(function(data) {
    data = selectFields(data, interpreterListingData);
    res.send(data);
  }, function(error){
    res.status(error).send();
  })
  .then(function(){cleanUp()})
});

// Attach an asynchronous callback to read the data at our posts reference
function returnData() {
    console.info("Getting data")
    return new Promise (function(resolve, reject) {
      firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: firebaseDb.databaseURL
    });
    console.info("Initialising database")
    const db = firebase.database();
    const ref = db.ref("firebaseDb.collectionName");

    ref.once("value", function(snapshot) {
      resolve(snapshot.toJSON());
    }, function (errorObject) {
      reject(errorObject.code);
    });
  });
}

function selectFields(data, fields) {
  var arr = [];
  const keys = Object.keys(data);
  for (obj in data) {
    const localObj = data[obj]
    var tempObj = {};
    tempObj.KEY = keys[obj];
    for (field in fields) {
      const localField = fields[field];
      tempObj[localField] = localObj[localField];
    }
    arr.push(tempObj);
  }
  return arr;
}

function filterByValue(item) {
  for (var key in filter) {
    if (item[key] === undefined || item[key] != filter[key]) {
      return false;
    }
  }
  return true;
}

function cleanUp() {
  firebase.app().delete();
}
