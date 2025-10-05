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

export async function getMarkersById(req, res) {
  const { id } = req.params; 
  try {
    const { data, error } = await supabase
      .from("markers")
      .select("*")
      .eq("id", id)
      .single(); 

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: "Marker not found" });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error fetching marker:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function getMarkersByName(){
const { name } = req.params; 
  try {
    const { data, error } = await supabase
      .from("markers")
      .select("*")
      .eq("name", name)
      .single(); 

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: "Marker not found" });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error fetching marker:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
}


export async function getMarkersByCollection(){
const { collection_id } = req.params; 
  try {
    const { data, error } = await supabase
      .from("markers")
      .select("*")
      .eq("collection_id", collection_id)
      .single(); 

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: "Marker not found" });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error fetching marker:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
}

// controllers/markers.controller.js



export async function getMarkersByCollectionOrName(req, res) {
  const { collectionId, name } = req.params;
  console.log("Request params:", { collectionId, name });

  try {
    let query = supabase.from("markers").select("*");

    
    if (collectionId && collectionId !== "null") {
      query = query.eq("collection_id", collectionId);
    }

    if (name && name !== "null") {
      query = query.eq("name", name);
    }

    const { data, error } = await query;

    if (error) throw error; 

    if (!data || data.length === 0) {
      return res.status(404).json({ ok: false, message: "No markers found" });
    }

    res.status(200).json({ ok: true, count: data.length, data });
  } catch (err) {
    console.error("Error fetching markers:", err.message || err);
    res.status(500).json({ ok: false, error: err.message || String(err) });
  }
}
