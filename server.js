const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const busLocations = {};

app.post('/update_location', (req, res) => {
  const { busId, lat, lon, busName, nextStop, distanceToNextStop, eta } = req.body;
  console.log(`Received location for ${busId}: Lat ${lat}, Lon ${lon}`);
  
  if (busId && lat && lon) {
    busLocations[busId] = { lat, lon, busName, nextStop, distanceToNextStop, eta, timestamp: Date.now() };
    res.status(200).send({ message: 'Location updated successfully!' });
  } else {
    res.status(400).send({ message: 'Invalid data' });
  }
});

app.get('/get_locations', (req, res) => {
  res.json(busLocations);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
