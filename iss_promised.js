const request = require("request-promise-native");

const fetchMyIP = function() {
  //request("https://api.ipify.org/?format=json", (error, response, promise) => {
  //  callback(null, promise);
  //});
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  //const data = JSON.parse(body);
  //return request(`https://iss-flyover.herokuapp.com/json/?lat=${data.latitude}&lon=${data.longitude}`);
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

//const nextISSTimesForMyLocation = function(callback) {  //this way works.
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };