import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import type { Notice } from "../types";

export const useQueryNotices = () => {
  const getNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  };

  return useQuery<Notice[], Error>({
    queryKey: ["notices"],
    queryFn: getNotices,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
