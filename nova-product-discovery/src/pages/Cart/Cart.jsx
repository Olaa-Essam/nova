import {
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useShop } from "../../context/ShopContext";

import "./Cart.css";

function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useShop();

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <FaShoppingBag />
          </div>

          <span>YOUR BAG</span>

          <h1>Your cart is empty.</h1>

          <p>
            Looks like you haven't added anything to your
            collection yet.
          </p>

          <Link to="/" className="continue-shopping">
            Discover products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <span className="cart-eyebrow">YOUR BAG</span>

            <h1>Shopping cart</h1>
          </div>

          <span className="cart-count">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <div className="cart-item-image">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>

                <div className="cart-item-info">
                  <span>{item.category}</span>

                  <h2>{item.title}</h2>

                  <p>
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity === 1}
                        type="button"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        disabled={
                          item.quantity >= item.stock
                        }
                        type="button"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      type="button"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="cart-item-total">
                  $
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </strong>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <div className="summary-heading">
              <h2>Order summary</h2>

              <button
                className="clear-cart-btn"
                onClick={clearCart}
                type="button"
              >
                Clear cart
              </button>
            </div>

            <div className="summary-row">
              <span>Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to checkout
            </Link>

            <Link
              to="/"
              className="continue-link"
            >
              <FaArrowLeft />
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
