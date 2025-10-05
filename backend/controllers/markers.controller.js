import { supabase } from "../services/database-connection.service.js";
export function getMarkers(req, res) {
  
}

//req is an array of markers?
export async function saveMarkers(req, res) {
  const markers = req.body;
  console.log("Markers to save:", markers);

  try {
    const formatted = markers.map((m, index) => {
      return {
        name: m.name,
        lat: m.lat,
        lng: m.lng,
        zoom: m.zoom,
        description: m.description,
        collection_id: m.collection,
      };
    });

    const { data, error } = await supabase
      .from("markers")
      .insert(formatted)
      .select();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("Error saving collection:", err.message);
    res.status(500).json({ error: "Failed to save collection" });
  }
}

export async function getMarkersById(){

}

export async function getMarkersByName(){

}
export async function getMarkersByCollection(){

}

// controllers/markers.controller.js

export async function getMarkersByCollectionOrName(req, res) {
  const { collection, name } = req.params;
  console.log("Request params that we got:", collection, ":collection", name, ":name");

  try {
    let query = supabase.from("markers").select("*");

    // build dynamic query based on which value is present
    if (collection !== undefined && collection !== null && collection !== "null") {
      query = query.eq("collection", collection);
    }
    if (name !==undefined && name!=null && name!=="null") {
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