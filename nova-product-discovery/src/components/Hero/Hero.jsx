import { FaSearch } from "react-icons/fa";
import "./Hero.css";

function Hero({ search, setSearch }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-eyebrow">
          DISCOVER SOMETHING NEW
        </span>

        <h1>
          Find products
          <br />
          you'll <span>love.</span>
        </h1>

        <p>
          Explore our collection and discover products made
          for your everyday life.
        </p>

        <div className="hero-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;