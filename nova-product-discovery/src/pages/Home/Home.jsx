import { useState } from "react";

import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";

import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="home-page">
      <Hero
        search={search}
        setSearch={setSearch}
      />

      <Products search={search} />
    </div>
  );
}

export default Home;