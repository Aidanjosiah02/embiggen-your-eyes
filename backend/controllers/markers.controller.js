export function getMarkers(req, res) {}

//req is an array of markers?
export function saveMarkers(req, res) {
  console.log("Received: ", req.body);
  res.status(200).send("Markers saved");
}
