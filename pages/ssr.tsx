import type { NextPage, GetServerSideProps } from "next";
import { Layout } from "../components/Layout";
import { Task, Notice } from "../types";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("getServerSideProps//ssr invoked");

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

const Ssr: NextPage<Props> = ({ tasks, notices }) => {
  const router = useRouter();
  return (
    <Layout title="SSR">
      <p className="mb-3 text-blue-500">SSR</p>
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
      <Link className="my-3 text-xs" href="/ssg" prefetch={false}>
        Link to SG
      </Link>
      <Link className="mb-3 text-xs" href="/isr" prefetch={false}>
        Link to ISR
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push("/ssg")}>
        Route to SG
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push("/isr")}>
        Route to ISR
      </button>
    </Layout>
  );
};

export default Ssr;
