
import React, { useState, useEffect } from 'react';
import { useWishlist } from "../context/WishlistContext";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Card from "../images/card.png"
import {
  Check,
  AngleDown,
  Search,
  User,
  Cart,
  Meat,
  Bakery,
  Beverages,
  Team,
} from "./icon";

function Navbar({ cart, addToCart, removeFromCart, shopCategories = [] })  {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
const totalWishlistItems = wishlist.length;
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
const [showCategories, setShowCategories] = useState(false);
  return (
    <header className="site-header position-fixed fixed-top">
      {/* Top Strip */}
      <div className="top-strip">
        <div className="container d-flex justify-content-center align-items-center">
          <span className="meta-item text-white text-center">
            Due to current circumstances, there may be slight delays in order
            processing
          </span>
        </div>
      </div>

      {/* Link Items */}
      <div className="linkItems border-bottom d-none d-lg-block">
        <div className="container d-flex justify-content-between align-items-center pt-2">
          <ul className="d-flex list-unstyled mb-0">
            <li className="px-2">
              <a className="nav-link" href="#compare">
                Compare
              </a>
            </li>
            <li className="px-2">
              <a className="nav-link" href="#wishlist">
                Wishlist
              </a>
            </li>
          </ul>
          <ul className="d-flex justify-content-between list-unstyled mb-0">
            <li className="px-2">
              <a className="nav-link" href="#">
                <Check size={21} /> 100% Secure delivery without contacting the
                courier
              </a>
            </li>
            <li className="px-2">
              <a className="nav-link border-start px-3" href="">
                Need help? <strong className="ColorBlue">+ 00210 500</strong>
              </a>
            </li>
            <li className="ps-3">
              <a className="nav-link" href="">
                English &nbsp;
                <AngleDown size={7} /> &nbsp; &nbsp;USD &nbsp;
                <AngleDown size={7} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Link Items - MOBILE */}
      <div className="linkItems-mobile border-bottom d-lg-none">
        <div className="container text-center">
          <a className="nav-link" href="#">
            <Check size={18} /> 100% Secure delivery without contacting the
            courier
          </a>
        </div>
      </div>

      {/* Main Navbar - MOBILE */}
      <div className="main-bar">
        <div className="container">
          <nav className="navbar p-0 navbar-expand-lg w-100">
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mainOffcanvas"
              aria-controls="mainOffcanvas"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo */}
            <Link to="/home" className="navbar-brand">
              <div className="logo-text">
                <img
                  src={Card}
                  width={59}
                  height={50}
                  alt="Basket Logo"
                />
                <p className="d-inline-block titleLogo">Basket</p>
                <p className="pLogo opacity-50 ps-2 d-none d-lg-block">
                  Online Grocery Shopping Center
                </p>
              </div>
            </Link>

            {/* Search for Small Screens */}
            <form className="d-none d-lg-flex flex-grow-1 mx-4 SearchForm position-relative">
              <input
                className="w-100 border-0 rounded-3 px-4"
                type="search"
                placeholder="Search for Products..."
              />
              <button
                type="submit"
                className="position-absolute end-0 py-3 pe-3 border-0 bg-transparent"
              >
                <Search size={23} />
              </button>
            </form>

            {/* Actions */}
            <div className="actions ms-auto d-flex align-items-center">
              <div className="rounded-circle border user d-flex justify-content-center align-items-center">
                <User size={16} />
              </div>

              {/* Wishlist Icon */}
<div
  className="wishlist-wrapper ms-3 d-flex align-items-center justify-content-center"
  style={{ cursor: 'pointer', position: 'relative', width: '30px', height: '30px' }}
  onClick={() => navigate("/wishlist")}
>
  <FontAwesomeIcon 
    icon={faHeart} 
    size="lg" 
    color="#e93260ff" 
    style={{ fontSize:'35px' }} 
  />
  {totalWishlistItems > 0 && (
    <span
      style={{
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        backgroundColor: '#ffeef2ff',
        color: '#e93260ff',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '10px',
        fontWeight: 'bold'
      }}
    >
      {totalWishlistItems}
    </span>
  )}
</div>

              <Link to="/cart" style={{ textDecoration: 'none' }}>
  <div className="cart-wrapper" style={{ cursor: 'pointer' }}>
    <div className="cart rounded-circle position-relative d-flex justify-content-center align-items-center">
      <div className="count rounded-circle top-0 end-0 position-absolute text-white d-flex justify-content-center align-items-center">
        {totalItems}
      </div>
      <Cart size={16} />
    </div>
    <div className="price">${totalPrice}</div>
  </div>
</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom Nav for LG */}
      <nav className="nav-bar d-none d-lg-block">
        <div className="container d-flex justify-content-between">
          <button 
  className="all-categories ms-lg-3 px-3 d-flex justify-content-between align-items-center position-relative"
  onClick={() => setShowCategories(!showCategories)}
>
  <div className="d-flex gap-3 align-items-center">
    <span className="pb-1">
      <Team />
    </span>
    <span>ALL CATEGORIES</span>
  </div>
  <span>
    <AngleDown size={10} color="#fff" />
  </span>
  <span className="position-absolute ms-4 border border-1 border-white rounded-5 TotalProduct px-1">
    TOTAL 84 PRODUCTS
  </span>
</button>
{showCategories && (
  <div className="all-categories-dropdown position-absolute bg-white shadow p-2 mt-2 rounded">
    {shopCategories.map(cat => (
      <div key={cat} className="category-item px-2 py-1 hover:bg-gray-100 cursor-pointer">
        {cat}
      </div>
    ))}
  </div>
)}
          {/* Nav links moved inside collapse for mobile */}
          <ul className="navbar-nav flex-row gap-2">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                HOME <AngleDown className="angle" size={10} />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                SHOP
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/bakery"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                <Bakery /> BISCUITS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/beverages"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                <Beverages /> BEVERAGES
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                BLOG
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                CONTACT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                ABOUT US
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="border-bottom pt-3"></div>
      </nav>

      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex="-1"
        id="mainOffcanvas"
        aria-labelledby="mainOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mainOffcanvasLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="d-flex mb-4 SearchForm-mobile position-relative">
            <input
              className="w-100 border-0 rounded-3 px-4"
              type="search"
              placeholder="Search for Products..."
            />
            <button
              type="submit"
              className="position-absolute end-0 py-3 pe-3 border-0 bg-transparent"
            >
              <Search size={20} />
            </button>
          </form>
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                SHOP
              </NavLink>
            </li>
          
            <li className="nav-item">
              <NavLink
                to="/bakery"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <Bakery /> BISCUITS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/beverages"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <Beverages /> BEVERAGES
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                BLOG
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                CONTACT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link px-3 rounded-5 ${isActive ? "active-link" : ""}`
                }
              >
                ABOUT US
              </NavLink>
            </li>
          </ul>
          <hr />
          <ul className="list-unstyled mobile-secondary-links">
            <li>
              <a className="nav-link" href="#compare">
                Compare
              </a>
            </li>
            <li>
              <a className="nav-link" href="#wishlist">
                Wishlist
              </a>
            </li>
          </ul>
          <hr />
          <div className="mobile-help-link">
            <a className="nav-link" href="">
              Need help? <strong className="ColorBlue">+ 00210 500</strong>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;