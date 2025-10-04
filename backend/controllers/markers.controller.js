function getMarkers(req, res) {}

//req is an array of markers?
function saveMarkers(req, res) {
  console.log("Received: ", req.body);
  res.status(200).send("Markers saved");
}
