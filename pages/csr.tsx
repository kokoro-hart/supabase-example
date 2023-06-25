import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types";
import Link from "next/link";

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      setTasks(tasks as Task[]);
    };
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });
      setNotices(notices as Notice[]);
    };
    getTasks();
    getNotices();
  }, []);
  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
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
      <Link className="mb-3 text-xs" href="/isr" prefetch={false}>
        Link to ISR
      </Link>
    </Layout>
  );
};

export default Csr;
