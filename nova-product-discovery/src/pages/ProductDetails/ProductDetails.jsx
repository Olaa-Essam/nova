import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaHeart,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useShop } from "../../context/ShopContext";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useShop();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  if (loading) {
    return (
      <div className="details-state">
        <div className="loader"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="details-state">
        <h2>Product not found</h2>

        <p>
          We couldn't find the product you're looking for.
        </p>

        <Link to="/" className="back-home-btn">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="product-details-page">
      <div className="details-container">
        <button
          className="details-back"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="details-layout">
          <div className="details-image-section">
            <div className="details-image">
              <img
                src={product.thumbnail}
                alt={product.title}
              />
            </div>

            <div className="details-thumbnails">
              {product.images?.slice(0, 4).map((image, index) => (
                <div
                  className="details-thumbnail"
                  key={index}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="details-info">
            <span className="details-category">
              {product.category}
            </span>

            <h1>{product.title}</h1>

            <div className="details-rating">
              <FaStar />

              <strong>{product.rating}</strong>

              <span>
                • {product.reviews?.length || 0} reviews
              </span>
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-price-row">
              <span className="details-price">
                ${product.price.toFixed(2)}
              </span>

              <span className="details-discount">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>

            <div className="details-meta">
              <div>
                <span>Brand</span>
                <strong>
                  {product.brand || "NOVA"}
                </strong>
              </div>

              <div>
                <span>Availability</span>
                <strong>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </strong>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="details-purchase">
                <div className="quantity-control">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                  >
                    <FaMinus />
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  className="add-cart-btn"
                  onClick={handleAddToCart}
                >
                  <FaShoppingBag />
                  Add to cart
                </button>

                <button
                  className={`details-favorite ${
                    isFavorite(product.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleFavorite(product.id)
                  }
                  aria-label="Toggle favorite"
                >
                  <FaHeart />
                </button>
              </div>
            )}

            {product.stock === 0 && (
              <div className="out-of-stock">
                This product is currently unavailable.
              </div>
            )}

            <div className="details-tags">
              <span>Fast delivery</span>
              <span>Secure checkout</span>
              <span>Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;