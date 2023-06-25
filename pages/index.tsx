import type { NextPage } from "next";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="home">
      <h1 className="text-4xl">Welcome to Next.js!</h1>
    </Layout>
  );
};

export default Home;
