//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss_promised");//

////fetchMyIP((error, ip) => {
////  if (error) return console.log("It didn't work!", error);
////  console.log("It worked! Returned IP:", ip);
////});//

//fetchMyIP()
//  .then(fetchCoordsByIP)
//  .then(fetchISSFlyOverTimes)
//  .then(body => console.log(body));

const { nextISSTimesForMyLocation } = require("./iss_promised");

//nextISSTimesForMyLocation(body => console.log(body));   // this way works.

//const { printPassTimes } = require("./index");    // this way will print 10 pass times instead of 5!!!
const printPassTimes = function(passTimes) {        // this way only prints 5.
  for (const p of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(p.risetime);
    const duration = p.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });