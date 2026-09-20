import { useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Categories.css";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        setError(
          "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = useMemo(() => {
    return products.reduce((groups, product) => {
      const category = product.category;

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(product);

      return groups;
    }, {});
  }, [products]);

  const categories = Object.entries(groupedProducts);

  if (loading) {
    return (
      <section className="categories-page">
        <div className="categories-state">
          <div className="categories-loader"></div>

          <p>Discovering our categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categories-page">
        <div className="categories-state">
          <div className="categories-state-icon">
            !
          </div>

          <h2>Oops!</h2>

          <p>{error}</p>

          <Link
            to="/"
            className="categories-back-btn"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-page">
      <div className="categories-container">

        {/* Hero */}
        <header className="categories-hero">
          <span className="categories-eyebrow">
            EXPLORE OUR COLLECTION
          </span>

          <h1>
            Shop by
            <span> category.</span>
          </h1>

          <p>
            Discover products curated into collections
            made to help you find exactly what you're
            looking for.
          </p>
        </header>

        {/* Category Navigation */}
        <div className="categories-nav">
          <div className="categories-nav-icon">
            <FaLayerGroup />
          </div>

          <div className="categories-nav-list">
            {categories.map(([category, categoryProducts]) => (
              <a
                key={category}
                href={`#${category}`}
                className="category-nav-item"
              >
                <span>
                  {category.replace("-", " ")}
                </span>

                <small>
                  {categoryProducts.length}
                </small>
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="category-sections">
          {categories.map(
            ([category, categoryProducts]) => (
              <section
                key={category}
                id={category}
                className="category-section"
              >
                <div className="category-section-header">
                  <div>
                    <span className="category-number">
                      {String(
                        categories.findIndex(
                          ([item]) => item === category
                        ) + 1
                      ).padStart(2, "0")}
                    </span>

                    <h2>
                      {category.replace("-", " ")}
                    </h2>
                  </div>

                  <span className="category-product-count">
                    {categoryProducts.length}{" "}
                    {categoryProducts.length === 1
                      ? "product"
                      : "products"}
                  </span>
                </div>

                <div className="category-products-grid">
                  {categoryProducts
                    .slice(0, 4)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                </div>

                {categoryProducts.length > 4 && (
                  <div className="category-view-more">
                    <Link
                      to={`/?category=${encodeURIComponent(
                        category
                      )}`}
                    >
                      View all {category.replace("-", " ")}
                      <FaArrowRight />
                    </Link>
                  </div>
                )}
              </section>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;
