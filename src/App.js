import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Shop from './pages/Shop'; 
import Contact from './pages/Contact';
import AboutUs from "./pages/AboutUs";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import Wishlist from "./pages/Wishlist";
import Cart from './pages/Cart';
import "./App.css"; 
import { useState, useEffect } from 'react';
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === productId);
      if (!existing) return prevCart;

      if (existing.quantity === 1) {
        return prevCart.filter(item => item.id !== productId);
      } else {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  return (
    <WishlistProvider>
      <Router>
        <div className="App">
          <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={ <Home cart={cart}addToCart={addToCart}removeFromCart={removeFromCart}/>}/>
              <Route path="/shop" element={<Shop cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
              <Route path="/meats" element={<Shop cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
              <Route path="/bakery" element={<Shop cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
              <Route path="/beverages" element={<Shop cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutUs />} /> 
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
