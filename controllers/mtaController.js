const https = require('https');


exports.index = (req, res, next) => {
    https.get(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
      { headers: { "x-api-key": 'eWDoDnkWzg6Wmiu9iZ4xA6VHszKQde73a1RMCQHU'}
      },
      (resp) => {
        resp.on('data', (chunk) => {
          console.log("Receiving Data");
        });
        resp.on('end', () => {
          console.log("Finished receiving data");
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

      res.render('mta', { })

};
