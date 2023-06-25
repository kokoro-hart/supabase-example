import type { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { Task, Notice } from "../types";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps//ISR invoked");

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
    revalidate: 5,
  };
};

type Props = {
  tasks: Task[];
  notices: Notice[];
};

const Isr: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter();
  return (
    <Layout title="ISR">
      <p className="mb-3 text-blue-500">ISR</p>
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
      <Link className="my-3 text-xs" href="/ssr" prefetch={false}>
        Link to SSR
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push("/ssr")}>
        Route to SSR
      </button>
    </Layout>
  );
};

export default Isr;
