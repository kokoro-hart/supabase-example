import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import type { Task } from "../types";

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useQuery<Task[], Error>({
    queryKey: ["todos"],
    queryFn: getTasks,
    staleTime: Infinity,
  });
};
