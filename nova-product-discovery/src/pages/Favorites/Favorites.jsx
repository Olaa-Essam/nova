import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useShop } from "../../context/ShopContext";

import "./Favorites.css";

function Favorites() {
  const {
    favorites,
    toggleFavorite,
    addToCart,
  } = useShop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const results = await Promise.all(
          favorites.map(async (id) => {
            const response = await fetch(
              `https://dummyjson.com/products/${id}`
            );

            if (!response.ok) return null;

            return response.json();
          })
        );

        setProducts(
          results.filter((product) => product !== null)
        );
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="favorites-state">
        <div className="favorites-loader"></div>

        <p>Loading your favorites...</p>
      </div>
    );
  }

  return (
    <section className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <div>
            <span className="favorites-eyebrow">
              SAVED FOR LATER
            </span>

            <h1>Your favorites</h1>
          </div>

          <span>
            {products.length}{" "}
            {products.length === 1
              ? "product"
              : "products"}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="favorites-empty">
            <div className="favorites-empty-icon">
              <FaRegHeart />
            </div>

            <h2>No favorites yet.</h2>

            <p>
              Save products you love and find them here
              anytime.
            </p>

            <Link
              to="/"
              className="browse-favorites"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {products.map((product) => (
              <article
                className="favorite-card"
                key={product.id}
              >
                <div className="favorite-image">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />

                  <button
                    onClick={() =>
                      toggleFavorite(product.id)
                    }
                    className="remove-favorite"
                    aria-label="Remove favorite"
                  >
                    <FaHeart />
                  </button>
                </div>

                <div className="favorite-info">
                  <span>{product.category}</span>

                  <h2>{product.title}</h2>

                  <div className="favorite-bottom">
                    <strong>
                      ${product.price.toFixed(2)}
                    </strong>

                    <Link
                      to={`/product/${product.id}`}
                    >
                      View details
                    </Link>
                  </div>

                  <button
                    className="favorite-cart-btn"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Favorites;