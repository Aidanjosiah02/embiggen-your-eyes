import { supabase } from "../services/database-connection.service.js";
export function getMarkers(req, res) {
  
}

//req is an array of markers?
export async function saveMarkers(req, res) {
  const {lat, lng, name, zoom, description, collection} = req.body

  try{
    const{data, error } = await supabase.from("markers")
    .insert([{name: name,
      lat: lat,
      lng: lng,
      zoom: zoom,
      description: description,
      collection_id: collection
    }])
    .select()
    .single();
    if (error) throw error;
    res.status(200).json(data)
  }catch(err){
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
    const { collectionId, name } = req.params;
    console.log("Request params that we got:", collectionId, ":collection", name, ":name");

    try {
      let query = supabase.from("markers").select("*");

      // build dynamic query based on which value is present
      if (collectionId !== undefined && collectionId !== null && collectionId !== "null") {
        query = query.eq("collection_id", collectionId);
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
      res.status(500).send({ ok: false, error: err.message });
    }
  }
