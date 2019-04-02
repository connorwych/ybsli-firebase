const firebase = require("firebase-admin");
const functions = require('firebase-functions');
const core = require("./ybsli-firebase-core");
const inrerpreterDataFields = require("./ybsli-interpreter-data");


exports.getInterpreterListing = functions.https.onRequest((req, res) => {
  console.info("getInterpreterListing: function invoked");
  core.returnData(inrerpreterDataFields.interpreterListingData.data, inrerpreterDataFields.interpreterListingData.fields).then(function(data) {
    console.log("getInterpreterListing: returning data");
    res.send(data);
  }).catch(function(error) {
    console.log(error);
    res.status(500).send();
  })
});

exports.getInterpreterBio = functions.https.onRequest((req, res) => {
  console.info("getInterpreterBio: function invoked");
  core.returnData(inrerpreterDataFields.interpreterBioData.data, inrerpreterDataFields.interpreterBioData.fields).then(function(data) {
    console.log("getInterpreterBio: returning data");
    res.send(data);
  }).catch(function(error) {
    console.log(error);
    res.status(500).send();
  })});

exports.getInterpreterEmail = functions.https.onRequest((req, res) => {
  console.info("getInterpreterEmail: function invoked");
  core.returnData(inrerpreterDataFields.interpreterEmailData.data, inrerpreterDataFields.interpreterEmailData.fields).then(function(data) {
    console.log("getInterpreterEmail: returning data");
    res.send(data);
  }).catch(function(error) {
    console.log(error);
    res.status(500).send();
  })});
