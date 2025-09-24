import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, addToCart, removeFromCart }) {
  const navigate = useNavigate();
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Your cart is empty 😢</h2>
        <p>Add some products from the shop to see them here.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        <b>Shopping Cart</b>
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={`https://react-shop-maoo.onrender.com${item.imageFront}`}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />
              <div>
                <h4 style={{ margin: 0, fontWeight: "bold" }}>{item.name}</h4>
                <p
                  style={{
                    margin: "5px 0",
                    color: "#28857aff",
                    fontWeight: "bold"
                  }}
                >
                  Price: ${item.price}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    color: "#28857aff",
                    fontWeight: "bold"
                  }}
                >
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "5px 10px",
                  width: "60px",
                  backgroundColor: "#3fb4a6ff",
                  color: "white"
                }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                style={{
                  padding: "5px 10px",
                  width: "60px",
                  backgroundColor: "#3fb4a6ff",
                  color: "white"
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "right", fontSize: "22px" }}>
        <strong>Total: ${totalPrice}</strong>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => navigate("/checkout", { state: { cart } })}
          style={{
            padding: "19px 20px",
            backgroundColor: "#28857aff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginLeft: "-20px"
          }}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
