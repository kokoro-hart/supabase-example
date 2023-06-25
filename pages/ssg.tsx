import type { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { Task, Notice } from "../types";
import { supabase } from "../utils/supabase";

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps//ssg invoked");

  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });

  return {
    props: {
      tasks,
      notices,
    },
  };
};

type Props = {
  tasks: Task[];
  notices: Notice[];
};

const Ssg: NextPage<Props> = ({ tasks, notices }) => {
  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">SG</p>
      <ul className="mb-3">
        {tasks.map(({ id, title }) => {
          return (
            <li key={id}>
              <p className="text-lg font-extrabold">{title}</p>
            </li>
          );
        })}
      </ul>
      <ul className="mb-3">
        {notices.map(({ id, content }) => {
          return (
            <li key={id}>
              <p className="text-lg font-extrabold">{content}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Ssg;
