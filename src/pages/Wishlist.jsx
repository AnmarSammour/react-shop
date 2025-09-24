import React from "react";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <div style={{ padding: "20px", fontSize:'20px', textAlign:'center' }}>Your wishlist is empty 😢</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Wishlist</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {wishlist.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              width: "200px",
              textAlign: "center",
              position: "relative",
              background: "#fff",
            }}
          >
            <img
              src={`https://react-shop-maoo.onrender.com${product.image || product.imageFront}`}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <div style={{ fontWeight: "700", margin: "8px 0" }}>{product.name}</div>
            <div style={{ color: "#D51243", fontWeight: "700" }}>${product.price}</div>

            <button
              onClick={() => removeFromWishlist(product.id)}
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                background: "#D51243",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;