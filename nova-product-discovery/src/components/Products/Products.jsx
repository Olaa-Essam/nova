import { useEffect, useMemo, useState } from "react";
import { FaSlidersH } from "react-icons/fa";

import ProductCard from "../ProductCard/ProductCard";

import "./Products.css";

function Products({ search }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

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

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products.map((product) => product.category)
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Sorting
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * productsPerPage;

    const endIndex = startIndex + productsPerPage;

    return filteredProducts.slice(
      startIndex,
      endIndex
    );
  }, [filteredProducts, currentPage]);

  // Return to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className="products-section"
      id="products"
    >
      {/* Header */}
      <div className="products-header">
        <div>
          <span className="products-eyebrow">
            OUR COLLECTION
          </span>

          <h2>Explore products</h2>
        </div>

        <span className="products-count">
          {filteredProducts.length} products
        </span>
      </div>

      {/* Controls */}
      <div className="products-controls">
        <div
          className="category-filter"
          id="categories"
        >
          <FaSlidersH />

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item ? "active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item.replace("-", " ")}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="sort-select"
        >
          <option value="default">
            Sort by
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name">
            Name: A-Z
          </option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="products-state">
          <div className="loader"></div>

          <p>Discovering products...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="products-state">
          <h3>Oops!</h3>

          <p>{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <div className="products-state">
            <div className="empty-icon">
              ⌕
            </div>

            <h3>No products found</h3>

            <p>
              Try another search or choose a
              different category.
            </p>
          </div>
        )}

      {/* Products */}
      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <>
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-arrow"
                  disabled={currentPage === 1}
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "pagination-number active"
                        : "pagination-number"
                    }
                    onClick={() =>
                      handlePageChange(page)
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="pagination-arrow"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
    </section>
  );
}

export default Products;