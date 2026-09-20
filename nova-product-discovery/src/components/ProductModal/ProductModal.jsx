import { FaStar, FaTimes } from "react-icons/fa";
import "./ProductModal.css";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="modal-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="modal-content">
          <span className="modal-category">
            {product.category}
          </span>

          <h2>{product.title}</h2>

          <div className="modal-rating">
            <FaStar />
            <span>{product.rating}</span>
            <span>•</span>
            <span>{product.stock} available</span>
          </div>

          <p className="modal-description">
            {product.description}
          </p>

          <div className="modal-meta">
            <div>
              <span>Brand</span>
              <strong>{product.brand || "NOVA"}</strong>
            </div>

            <div>
              <span>Discount</span>
              <strong>{product.discountPercentage}%</strong>
            </div>
          </div>

          <div className="modal-footer">
            <strong className="modal-price">
              ${product.price.toFixed(2)}
            </strong>

            <button className="modal-action">
              Add to collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;