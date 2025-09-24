import React from "react";
import { useState, useEffect } from "react";
import cart from "./Cart";
import Header from "../components/Navbar";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  return (
    <div className="checkout-page">
      <style>{`
@import '~bootstrap/dist/css/bootstrap.min.css';
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
  font-family: 'Inter', sans-serif;
  color: #333;
}

.notification-bar {
  background: #35AFA0;
  color: #FFFFFF;
  padding: 9px 0;
  text-align: center;
  font-size: 12px;
}

.checkout-section {
  margin-bottom: 25px;
}

.shipping-option {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.shipping-price {
  float: right;
  color: #35AFA0;
  font-weight: bold;
}

.order-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.item-name {
  flex: 3;
}

.item-price {
  flex: 1;
  text-align: right;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid #ddd;
}

.breakdown-row.total {
  font-weight: bold;
  font-size: 1.2em;
  border-top: 2px solid #ddd;
}

.tax-note {
  font-size: 0.9em;
  color: #6c757d;
  text-align: right;
}

.login-prompt {
  font-size: 14px;
}

.subscription-option {
  margin-top: 1rem;
}

.subscription-option .form-check-label {
  font-size: 14px;
  color: #555;
}

.user-info {
  font-size: 14px;
  padding: 5px 0;
}

.btn-link.text-decoration-underline {
  text-decoration: underline !important;
  color: #007bff;
  border: none;
  background: none;
  cursor: pointer;
}

.btn-link.text-decoration-underline:hover {
  color: #0056b3;
  text-decoration: underline !important;
}

.login-link {
  font-size: 14px;
  color: #555;
}

.login-link .btn-link {
  font-size: 14px !important;
  padding: 0 !important;
  vertical-align: baseline;
}

.checkout-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.form-control {
  font-size: 14px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.form-control:focus {
  border: 2px solid #1773B0;
  box-shadow: 0 0 0px;
}
        
.form-us{
 padding-top: 22px;
 padding-bottom: 5px;
}

.form-control:required:invalid {
  color: #6c757d;
}

.form-control option[value=""][disabled] {
  color: #6c757d;
}

.form-control option {
  color: #000;
}

.input-box {
    position: relative;
    margin: 20px 0;
  }
  .input-box label {
    position: absolute;
    top: 7px;
    left: 9px;
    /* background: #fff; */
    padding: 0 5px;
    font-size: 12px;
    color: gray;
  }
  .input-box input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }

.checkout-section {
  font-family: Arial, sans-serif;
  max-width: 550px;
  /* margin: 20px auto; */
}

h2 {
  font-size: 18px;
  margin: 20px 0 10px;
}

.secure-text {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.payment-box {
  border: 1px solid #eee;
  background: #f9f9f9;
  text-align: center;
  padding: 30px 15px;
  border-radius: 6px;
  color: #777;
  margin-bottom: 20px;
}

.payment-box .icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.pay-btn {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  background: #faf9f9;
  border: none;
  border-radius: 6px;
  cursor: not-allowed;
  color: #707070;
}


.custom-select {
  position: relative;
  width: 100%;
  font-family: Arial, sans-serif;
  margin-top: 0.8rem;
}

.selected {
  display: flex;
  justify-content: space-between;
  border: 2px solid #83B4D7;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  cursor: pointer;
  background: #F0F5FF;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 6px;
  margin-top: 5px;
  z-index: 10;
}

.option {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
}

.option:hover {
  background: #f0f0f0;
}

.selected .price {
    font-weight: bold;
}

.checkout-section h2 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.order-summary img {
  object-fit: cover;
}

/* .main-container{
    max-width: 1200px;
} */
.order-summary {
    border: 0;
    background-color: white;
    /* max-width: 500px !important; */
    /* margin-right: 20rem !important; */
    /* border-bottom: 0px ; */
    padding: 0 !important;
    margin-top: 0.8rem;
}

.order-summary .badge {
  font-size: 0.7rem;
  width: 20px;
  height: 20px;
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.ProductName {
    font-size: 0.7rem;
}

.ProductPrice {
     font-size: 0.7rem;
}
.free_ship{
  font-size: 0.7rem;
}

.total_oreder{
  font-size: 1rem;
}

.USD{
  font-size: 0.7rem;
  color: #6c757d;
}

.badge {
 border-radius: 50%;
 background-color: #686868 !important;
transform: translate(0.5rem,-0.4rem);
font-weight: 100;
font-size: 0.6rem !important;
}

.text_overline {
  width: 100%;
  height: 2px;
  margin-top: 4rem;
  margin-bottom: 1rem;
  background-color:#ebebeb;
}
       `}</style>
      {/* <Header />*/}
      <div className="container main-container mt-3">
        <div className="row gap-0">
          <div className="col-lg-8">
            <div className="checkout-form">
              <ContactSection />
              <DeliverySection />
              <ShippingSection />
              <PaymentSection />
            </div>
          </div>

          <div className="col-lg-4">
            <OrderSummary />
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
export default Checkout;

/////////////ContactSection

const ContactSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked. Email entered:", email);
  };

  return (
    <div className="checkout-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Contact</h2>

        <div className="login-link">
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-underline"
            onClick={handleLogin}
            style={{ fontSize: "inherit" }}
          >
            Log in
          </button>
        </div>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email or mobile phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="subscription-option mt-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailSubscription"
            checked={isSubscribed}
            onChange={(e) => setIsSubscribed(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="emailSubscription">
            Email me with news and offers
          </label>
        </div>
      </div>
    </div>
  );
};

/////////////DeliverySection

const DeliverySection = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [apartment, setApartment] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutData"));
    if (savedData) {
      setSelectedCountry(savedData.selectedCountry || "US");
      setFirstName(savedData.firstName || "");
      setLastName(savedData.lastName || "");
      setAddress(savedData.address || "");
      setCity(savedData.city || "");
      setPostalCode(savedData.postalCode || "");
      setApartment(savedData.apartment || "");
    }
  }, []);

  const handleSubscriptionChange = (e) => {
    const checked = e.target.checked;
    setIsSubscribed(checked);

    if (checked) {
      const checkoutData = {
        selectedCountry,
        firstName,
        lastName,
        address,
        city,
        postalCode,
        apartment
      };
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    } else {
      localStorage.removeItem("checkoutData");
    }
  };

  return (
    <div className="checkout-section">
      <h2>Delivery</h2>

      <div className="form-group mb-3">
        <div className="input-box">
          <label htmlFor="country">Country/Region</label>
        </div>
        <select
          className="form-control form-us"
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          required
        >
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="EG">Egypt</option>
          <option value="SA">Saudi Arabia</option>
          <option value="AE">United Arab Emirates</option>
        </select>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Apartment, suite, etc. (optional)"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Postal code (optional)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="subscription-option">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="saveInformation"
            checked={isSubscribed}
            onChange={handleSubscriptionChange}
          />
          <label className="form-check-label" htmlFor="saveInformation">
            Save this information for next time
          </label>
        </div>
      </div>
    </div>
  );
};

/////////////ShippingSection
const ShippingSection = () => {
  const [selected, setSelected] = useState({ name: "Standard", price: "FREE" });
  const [open, setOpen] = useState(false);

  const options = [
    { name: "Standard", price: "FREE" },
    { name: "Express", price: "$10" },
    { name: "Next-Day", price: "$20" }
  ];

  return (
    <div className="checkout-section">
      <h2>Shipping method</h2>
      <div className="custom-select">
        <div className="selected" onClick={() => setOpen(!open)}>
          <span>{selected.name}</span>
          <span className="price">{selected.price}</span>
        </div>

        {open && (
          <div className="options">
            {options.map((opt, i) => (
              <div
                key={i}
                className="option"
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
              >
                <span>{opt.name}</span>
                <span className="price">{opt.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/////////////PaymentSection

const PaymentSection = () => {
  return (
    <div className="checkout-section">
      <h2>Payment</h2>
      <p className="secure-text">All transactions are secure and encrypted.</p>
      <div className="payment-box">
        <div className="icon">
          <i className="fa-regular fa-credit-card"></i>
        </div>
        <p>This store can’t accept payments right now.</p>
      </div>
      <button className="pay-btn btn-pay-now" disabled>
        Pay now
      </button>
      <div className="text_overline"></div>
      <a href="">Privacy policy</a>
    </div>
  );
};

/////////////OrderSummary

const OrderSummary = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = 2.46;

  return (
    <div className="card p-3 mb-4 order-summary">
      <div className="order-items">
        {cart.map((item) => (
          <div
            key={item.id}
            className="d-flex align-items-center justify-content-between py-2"
          >
            <div className="d-flex align-items-center gap-2">
              <div
                className="position-relative rounded border"
                style={{ width: "55px", height: "55px" }}
              >
                <img
                  src={`https://react-workshop-jyvm.onrender.com${item.image}`}
                  alt={item.name}
                  className="w-100 h-100 object-fit-cover"
                />
                <span className="badge position-absolute top-0 end-0">
                  {item.quantity}
                </span>
              </div>
              <span
                className="ProductName text-truncate"
                style={{ maxWidth: "240px" }}
              >
                {item.name}
              </span>
            </div>
            <div className="ProductPrice">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="order-breakdown mt-3 small">
        <div className="d-flex justify-content-between">
          <span>Subtotal: {cart.length} items</span>
          <span className="ProductPrice">${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping</span>
          <span className="free_ship">FREE</span>
        </div>
        <div className="d-flex justify-content-between fw-bold pt-3 total_oreder">
          <span>Total</span>
          <span>
            <span className="USD">USD</span>&nbsp;${subtotal.toFixed(2)}
          </span>
        </div>
        <p className="text-muted mt-1">Including ${tax.toFixed(2)} in taxes</p>
      </div>
    </div>
  );
};
