const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    //let err;
    //let ip;
    //if (error) {
    //  err = error;
    //  ip = null;
    //} else {
    //  err = null;
    //  ip = JSON.parse(body).ip;
    //}
    //callback(err, ip);

    if (error) return callback(error, null);    // error can be set if invalid domain, user is offline, etc.
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);   // this 2 lines can be: return callback(Error(msg), null);
      return;
    }       // if non-200 status, assume server error.

    callback(null, JSON.parse(body).ip);     // if we get here, all's well and we got the data
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);
    
    // parse the returned body so we can check its information
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);

    fetchCoordsByIP(ip, (err1, coordinates) => {
      if (err1) return callback(err1, null);

      fetchISSFlyOverTimes(coordinates, (err2, flyOverTimes) => {
        if (err2) return callback(err2, null);

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };