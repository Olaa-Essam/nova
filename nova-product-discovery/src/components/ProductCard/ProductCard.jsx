import {
  FaHeart,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useShop } from "../../context/ShopContext";

import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useShop();

  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <span className="product-category">
          {product.category}
        </span>

        <button
          className={`favorite-btn ${
            favorite ? "active" : ""
          }`}
          onClick={handleFavorite}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <FaHeart />
        </button>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          <span className="product-rating">
            <FaStar /> {product.rating}
          </span>
        </div>

        <div className="product-actions">
          <Link
            to={`/product/${product.id}`}
            className="details-btn"
          >
            View details
          </Link>

          <button
            className="add-cart-card-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <FaShoppingBag />

            {product.stock === 0
              ? "Out of stock"
              : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;