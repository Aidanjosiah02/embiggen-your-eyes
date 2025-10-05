// backend/controllers/collections.controller.js
import { supabase } from "../config/supabase.js";

/**
 * GET /api/collection
 * Fetch all collections
 */
export const getCollection = async (req, res) => {
  try {
    const { data, error } = await supabase.from("collections").select("*");

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching collections:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/collection
 * Body: { name: string, map: string }
 */
export const saveCollection = async (req, res) => {
  const { name } = req.body;
console.log(name)
  if (!name ) {
    return res.status(400).json({ error: "name and map are required" });
  }

  try {
    const { data, error } = await supabase
      .from("collections")
      .insert([{name}])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error("Error saving collection:", error);
    res.status(500).json({ error: "Failed to save collection" });
  }
};
