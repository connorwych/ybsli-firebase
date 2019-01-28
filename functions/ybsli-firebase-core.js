const firebase = require("firebase-admin");
const functions = require('firebase-functions');
const serviceAccount = require("./key.json");
const firebaseDb = require("./firebase-db.json");

const core = {

  // Attach an asynchronous callback to read the data at our posts reference
  returnData: function () {
    return new Promise (function(resolve, reject) {
      firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: firebaseDb.databaseURL
      });
      console.info("returnData: initialised connection")
      const db = firebase.database();
      const ref = db.ref(firebaseDb.collectionName);

      ref.once("value", function(snapshot) {
        // console.info("retutnData: returning JSON");
        resolve(snapshot.toJSON());
      }, function (errorObject) {
        // console.error("retutnData: could not return JSON");
        reject(errorObject.code);
      });
    });
  },

  selectFields: function (data, fields) {
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
  },

  // filterByValue: function (item) {
  //   for (var key in filter) {
  //     if (item[key] === undefined || item[key] != filter[key]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // },

  cleanUp: function() {
    firebase.app().delete();
  }
}
module.exports = core;
