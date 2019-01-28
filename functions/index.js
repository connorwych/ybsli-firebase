const firebase = require("firebase-admin");
const functions = require('firebase-functions');
const core = require("./ybsli-firebase-core");
const inrerpreterDataFields = require("./ybsli-interpreter-data");


exports.getInterpreterListing = functions.https.onRequest((req, res) => {
  const interpreterListingData = inrerpreterDataFields.interpreterListingData;
  core.returnData()
  .then(function(data) {
    // console.info("retrived data");
    data = core.selectFields(data, interpreterListingData);
    res.send(data);
  }, function(error) {
    // console.info("could not retrieve data");
    console.info(error);
    res.status(500).send();
  })
  .then(function(){
    // console.info("cleaning up connection");
    core.cleanUp()
  })
});
