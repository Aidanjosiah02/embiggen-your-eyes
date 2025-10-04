export function getMarkers(req, res) {
  
}

//req is an array of markers?
export function saveMarkers(req, res) {
  console.log("Received: ", req.body);
  res.status(200).send("Markers saved");
}

export function getMarkersById(){

}

export function getMarkersByName(){

}
export function getMarkersByCollection(){

}

// controllers/markers.controller.js

export async function getMarkersByCollectionOrName(req, res) {
  const { collection, name } = req.params;
  console.log("Request params that we got:", collection, ":collection", name, ":name");

  try {
    let query = supabase.from("markers").select("*");

    // build dynamic query based on which value is present
    if (collection && collection !== "null") {
      query = query.eq("collection", collection);
    }
    if (name && name !== "null") {
      query = query.eq("name", name);
    }

    const { data, error } = await query;

    if (error) throw error.message;

    if (!data.length)
      return res.status(404).json({ ok: false, message: "No markers found" });

    res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error("Error fetching markers:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
