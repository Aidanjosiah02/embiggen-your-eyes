function getMarkers(req, res) {
  db.collection("markers").find();
}

//req is an array of markers?
function saveMarkers(req, res) {}
