import { Layout } from "../layout/Layout";
import { SearchBar } from "../components/SearchBar";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <SearchBar />
      </Layout>
    </>
  );
};
