import { useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaMapMarkerAlt,
  FaTruck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useShop } from "../../context/ShopContext";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    clearCart,
  } = useShop();

  const [delivery, setDelivery] = useState("standard");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = delivery === "express" ? 10 : 5;

  const finalTotal = cartTotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">
            <FaCheck />
          </div>

          <span>ORDER CONFIRMED</span>

          <h1>Thank you for your order.</h1>

          <p>
            Your order has been placed successfully.
            We'll prepare it and deliver it to your address.
          </p>

          <button
            className="back-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <div className="empty-checkout-icon">
            <FaTruck />
          </div>

          <h1>Your cart is empty.</h1>

          <p>
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/"
            className="back-shopping-btn"
          >
            Explore products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <Link to="/cart" className="checkout-back">
          <FaArrowLeft />
          Back to cart
        </Link>

        <div className="checkout-header">
          <span>SECURE CHECKOUT</span>
          <h1>Complete your order</h1>
          <p>
            Enter your delivery details and choose your
            preferred shipping option.
          </p>
        </div>

        <form
          className="checkout-layout"
          onSubmit={handleSubmit}
        >
          <div className="checkout-form">
            <div className="checkout-card">
              <div className="section-title">
                <div className="section-icon">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <span>DELIVERY DETAILS</span>
                  <h2>Where should we deliver?</h2>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="fullName">
                    Full name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+20 100 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">
                    Delivery address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Street, building, apartment..."
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="city">
                    City / Governorate
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">
                    Delivery notes
                    <span>Optional</span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special instructions?"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <div className="section-title">
                <div className="section-icon">
                  <FaTruck />
                </div>

                <div>
                  <span>DELIVERY METHOD</span>
                  <h2>Choose your delivery</h2>
                </div>
              </div>

              <div className="delivery-options">
                <label
                  className={`delivery-option ${
                    delivery === "standard"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={delivery === "standard"}
                    onChange={(e) =>
                      setDelivery(e.target.value)
                    }
                  />

                  <div className="delivery-info">
                    <strong>Standard Delivery</strong>
                    <span>
                      Delivery within 3–5 business days
                    </span>
                  </div>

                  <strong>$5.00</strong>
                </label>

                <label
                  className={`delivery-option ${
                    delivery === "express"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={delivery === "express"}
                    onChange={(e) =>
                      setDelivery(e.target.value)
                    }
                  />

                  <div className="delivery-info">
                    <strong>Express Delivery</strong>
                    <span>
                      Delivery within 1–2 business days
                    </span>
                  </div>

                  <strong>$10.00</strong>
                </label>
              </div>
            </div>

            <div className="checkout-card">
              <div className="section-title">
                <div className="section-icon">
                  <FaCheck />
                </div>

                <div>
                  <span>PAYMENT</span>
                  <h2>Payment method</h2>
                </div>
              </div>

              <div className="payment-method">
                <div className="payment-radio">
                  <input
                    type="radio"
                    checked
                    readOnly
                  />
                </div>

                <div>
                  <strong>Cash on Delivery</strong>
                  <p>
                    Pay when your order arrives at your
                    doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <span>YOUR ORDER</span>
                  <h2>Order summary</h2>
                </div>

                <span>
                  {cartCount}{" "}
                  {cartCount === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="checkout-products">
                {cart.map((item) => (
                  <div
                    className="checkout-product"
                    key={item.id}
                  >
                    <div className="checkout-product-image">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                      />

                      <span>{item.quantity}</span>
                    </div>

                    <div className="checkout-product-info">
                      <strong>{item.title}</strong>

                      <span>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <strong>
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="summary-lines">
                <div>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div>
                  <span>Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  ${finalTotal.toFixed(2)}
                </strong>
              </div>

              <button
                type="submit"
                className="place-order-btn"
              >
                Place order
              </button>

              <p className="secure-note">
                Your order details are securely processed.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
