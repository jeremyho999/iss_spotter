//const { fetchMyIP } = require("./iss");
//fetchMyIP((error, ip) => {
//  if (error) {
//    console.log("It didn't work!", error);
//    return;
//  //}

//  console.log("It worked! Returned IP:", ip);
//});


//const { fetchCoordsByIP } = require("./iss");
////fetchCoordsByIP(ip, (error, data) => {
//fetchCoordsByIP("50.93.103.222", (error, coordinates) => {
////fetchCoordsByIP("42", (error, coordinates) => {
//  if (error) {
//    console.log("It didn't work!", error);
//    return;
//  }//

//  //const coordinates = {};
//  //coordinates.latitude = data.latitude;
//  //coordinates.longitude = data.longitude;
//  console.log("It worked! Returned coordinates:", coordinates);
//});

//const { fetchISSFlyOverTimes } = require("./iss");
//fetchISSFlyOverTimes({latitude: 53.6304753, longitude: -113.625642}, (error, flyOverTimes) => {
////fetchISSFlyOverTimes({}, (error, flyOverTimes) => {
//  if (error) {
//    console.log("It didn't work!", error);
//    return;
//  }
//  console.log("It worked! Returned ISS flyovers:", flyOverTimes);
//});

const { nextISSTimesForMyLocation } = require("./iss");

const printPassTimes = function(passTimes) {
  for (const p of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(p.risetime);
    const duration = p.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log("It didn't work!", error);

  //console.log(passTimes);
  printPassTimes(passTimes);
});