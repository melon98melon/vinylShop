import React, { useState } from "react";
// replace react-router with 'react-router-dom' after its install
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  // check whether the user has confirmed payment submission or not
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  // initialize the form field data object
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    zipCode: "",
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
  });
  //#region invoice calculation
  //   compute the cart total for the invoice calc
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //   add taxes and compute total
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

  //event listener to handle form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //#endregion
  //#region form even handlers
  //   event listener to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateDataInput(formData);
    console.log("errors: " + validationErrors);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    setIsSubmitted(true);
    onClearCart();
  };

  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully</h2>
        <p>
          Thank you, {formData.fullName}. A confirmation email is sent to{" "}
          {formData.email}.
        </p>
        <Link className="btn btn-primary" to="/">
          Return to Home Page
        </Link>
      </div>
    );
  }
  //#endregion
  //#region data validation
  //input form validation:
  function validateDataInput(data) {
    const validationErrors = [];

    // Full Name
    if (!data.fullName.trim()) {
      validationErrors.push("Full name is required");
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      validationErrors.push("Invalid email address");
    }

    // Shipping Address
    if (data.shippingAddress.trim().length < 5) {
      validationErrors.push("Address is too short");
    }

    // ZIP Code
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(data.zipCode)) {
      validationErrors.push("Invalid ZIP code");
    }

    // Cardholder Name
    if (!data.cardholderName.trim()) {
      validationErrors.push("Cardholder name is required");
    }

    // Card Number
    const cardNumber = data.cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(cardNumber)) {
      validationErrors.push("Invalid card number");
    }

    // Expiration Date
    const expRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!expRegex.test(data.expirationDate)) {
      validationErrors.push("Invalid expiration date");
    } else {
      const [month, year] = data.expirationDate.split("/");
      const expiryDate = new Date(2000 + Number(year), Number(month));

      if (expiryDate <= new Date()) {
        validationErrors.push("Card has expired");
      }
    }

    // CVV
    if (!/^\d{3,4}$/.test(data.securityCode)) {
      validationErrors.push("Invalid security code");
    }

    return validationErrors;
  }

  //#endregion

  // edge cases
  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2> Your cart is empty.</h2>
        <Link className="btn btn-secondary" to="/">
          Shop for some item please.
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout and Order Confirmation</h1>

      <div className="checkout-grid">
        {/* FORM element */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          {errors.length > 0 && (
            <div className="error-banner">
              <p>Please correct the following:</p>

              <ul>
                {errors.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="fullName"> Full Name *</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email *</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress"> Shipping Address *</label>
            <input
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode"> Zip Code*</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              required
              pattern="[0-9]{5}"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardholderName"> Cardholder Name *</label>
            <input
              type="text"
              name="cardholderName"
              id="cardholderName"
              required
              value={formData.cardholderName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber"> Card Number *</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={19}
              name="cardNumber"
              id="cardNumber"
              required
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate"> Expiration Date (MM/YY) *</label>
            <input
              type="text"
              placeholder="MM/YY"
              pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
              name="expirationDate"
              id="expirationDate"
              required
              value={formData.expirationDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="securityCode"> Security Code (CVC/CVV) *</label>
            <input
              title="3-digit number on the back of the card."
              type="text"
              name="securityCode"
              id="securityCode"
              required
              inputMode="numeric"
              pattern="^\d{3,4}$"
              maxLength={4}
              value={formData.securityCode}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order (${total.toFixed(2)})
          </button>
        </form>

        {/* INVOICE or SUMMARY section */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="summary-row">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (6%):</span> <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
