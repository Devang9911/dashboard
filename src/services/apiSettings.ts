import type { Database } from "./database.types";
import { supabase } from "./supabase";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

// GET SETTINGS
export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

// UPDATE SETTINGS
export async function updateSettings(newSettings: any) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error("UPDATE ERROR:", error);
    throw new Error(error.message);
  }

  return data;
}

