import { PostgrestResponse } from "@supabase/postgrest-js";
import { useEffect, useState } from "react";
import Topic from "../models/Topic";
import { supabase } from "./supabaseClient";

export const useTopics = () => {
  const [error, setError] = useState<String | null>(null);
  const [topics, setTopics] = useState<Topic[] | null>(null);

  async function getTopics() {
    const { error: e, data } = await supabase.from("topics").select();
    setError(e?.message ?? null);
    setTopics(data);
  }

  useEffect(() => {
    getTopics();
  });

  return { error, topics };
};
