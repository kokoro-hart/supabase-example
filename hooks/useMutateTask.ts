import { useQueryClient, useMutation } from "react-query";
import useStore from "../store";
import { supabase } from "../utils/supabase";
import { Task, EditedTask } from "../types";

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation(
    async (newTask: Task) => {
      const { data, error } = await supabase.from("todos").insert(newTask);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTasks) {
          queryClient.setQueryData(["todos"], [...previousTasks, res[0]]);
        }
        reset();
      },
      onError: (err: Error) => {
        alert(err.message);
        reset();
      },
    },
  );

  const updateTaskMutation = useMutation(
    async (editedTask: EditedTask) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: editedTask.title })
        .eq("id", editedTask.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTasks) {
          queryClient.setQueryData(
            ["todos"],
            previousTasks.map((task) => (task.id === variables.id ? res[0] : task)),
          );
        }
        reset();
      },
      onError: (err: Error) => {
        alert(err.message);
        reset();
      },
    },
  );

  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>(["todos"]);
        if (previousTasks) {
          queryClient.setQueryData(
            ["todos"],
            previousTasks.filter((task) => task.id !== variables),
          );
        }
        reset();
      },
      onError: (err: Error) => {
        alert(err.message);
        reset();
      },
    },
  );

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
};
