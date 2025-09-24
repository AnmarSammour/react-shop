import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import {
  FiArrowRight,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import "../App.css";
import heroBackground from "../images/home/hero-background.png";
import banner1 from "../images/home/banner-1.png";
import banner2 from "../images/home/banner-2.png";
import smallbanners1 from "../images/home/smallbanners1.png";
import smallbanners2 from "../images/home/smallbanners2.png";
import smallbanners3 from "../images/home/smallbanners3.png";
import news1 from "../images/home/news1.png";
import news2 from "../images/home/news2.png";
import news3 from "../images/home/news3.png";

// ====================================================================
// ProductCard Component
// ====================================================================
const ProductCard = ({ product }) => {
  const { imageFront, name, price, oldPrice, rating, discount, reviews } =
    product || {};

  return (
    <Col className="p-0 h-100">
      <Card
        as={Link}
        to="/shop"
        className="product-card rounded-0 border-end-0 border-bottom-0 text-decoration-none h-100"
      >
        <Card.Body className="d-flex flex-column text-start p-4">
          <div
            className="position-relative w-100 mb-4"
            style={{ height: "160px" }}
          >
            {discount && (
              <Badge
                pill
                className="position-absolute top-0 start-0 m-2 z-1 product-discount-badge"
              >
                {discount}%
              </Badge>
            )}
            <div className="card-img-container rounded">
              {imageFront && (
                <img
                  src={`https://react-shop-maoo.onrender.com${imageFront}`}
                  alt={name}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              )}
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <p className="small text-green-stock fw-semibold mb-1">IN STOCK</p>
            <Card.Title as="h3" className="h6 fw-semibold product-card-title">
              {name}
            </Card.Title>
            <div className="d-flex align-items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  fill={i < (rating || 0) ? "currentColor" : "none"}
                  className={
                    i < (rating || 0) ? "text-yellow-star" : "text-light"
                  }
                />
              ))}
              <span className="text-muted-light small ms-1">
                ({reviews || 0} review)
              </span>
            </div>
            <div className="d-flex align-items-baseline gap-2 mt-auto">
              {oldPrice && price < oldPrice && (
                <span className="small text-muted-light text-decoration-line-through">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
              <span className="h5 fw-bold text-accent-deal">
                ${(price || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

// ====================================================================
// BestSellerCard Component (unchanged logic)
// ====================================================================
const BestSellerCard = ({ product, addToCart }) => {
  if (!product) return null;
  const { id, imageFront, name, price, oldPrice, rating, reviews, discount } =
    product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, name, price, image: imageFront });
  };

  return (
    <div className="best-seller-slide">
      <Card
        as={Link}
        to="/shop"
        className="product-card best-seller-card rounded-0 border-0 text-decoration-none h-100"
      >
        <div className="p-4">
          <div
            className="position-relative w-100 mb-4"
            style={{ height: "160px" }}
          >
            {discount && (
              <Badge
                pill
                className="position-absolute top-0 start-0 m-2 z-1 product-discount-badge"
              >
                {discount}%
              </Badge>
            )}
            <div className="card-img-container rounded">
              {imageFront && (
                <img
                  src={`https://react-shop-maoo.onrender.com${imageFront}`}
                  alt={name}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              )}
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <p className="small text-green-stock fw-semibold mb-1">IN STOCK</p>
            <Card.Title as="h3" className="h6 fw-semibold product-card-title">
              {name}
            </Card.Title>
            <div className="d-flex align-items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  fill={i < (rating || 0) ? "currentColor" : "none"}
                  className={
                    i < (rating || 0) ? "text-yellow-star" : "text-light"
                  }
                />
              ))}
              <span className="text-muted-light small ms-1">
                ({reviews || 0} review)
              </span>
            </div>
            <div className="d-flex align-items-baseline gap-2 mt-2">
              {oldPrice && (
                <span className="text-muted text-decoration-line-through">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
              <span className="h5 fw-bold text-accent-deal">
                ${(price || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 mt-auto">
          <Button className="add-to-cart-btn w-100" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

// ====================================================================
// Other smaller components (Hero, Categories, Deals, etc.)
// Only minor structural changes were made here to keep responsive behavior.
// ====================================================================

const HeroSection = () => (
  <section
    className="hero-section rounded-3 p-5 mb-5"
    style={{ backgroundImage: `url(${heroBackground})` }}
  >
    <Container fluid="xxl" className="px-4 px-sm-5">
      <Row>
        <Col md={8} lg={6}>
          <div className="py-md-5">
            <div className="d-flex align-items-center mb-4">
              <span className="me-3 small fw-semibold hero-text-main text-dark">
                EXCLUSIVE OFFER
              </span>
              <span
                className="rounded-pill px-3 py-1 small fw-bold"
                style={{
                  color: "#038E42",
                  backgroundImage:
                    "linear-gradient(to right, rgba(0, 184, 83, 0.2), rgba(32, 55, 88, 0))",
                }}
              >
                -20% OFF
              </span>
            </div>
            <h1 className="display-5 fw-bold mb-3 hero-text-main">
              Specialist in the grocery store
            </h1>
            <p className="text-muted-light mb-5">
              Only this week. Don't miss...
            </p>
            <div className="d-flex flex-column align-items-start gap-4">
              <p className="h5 hero-text-muted">
                from <span className="h3 fw-bold text-brand-red">$7.99</span>
              </p>
              <Button
                as={Link}
                to="/shop"
                variant="primary"
                className="rounded-pill px-4 py-3 d-flex align-items-center gap-2 hero-shop-now-btn"
              >
                <span>Shop Now</span>
                <FiArrowRight />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

const CategoryCard = ({ name, count, imageUrl, isLarge = false }) => (
  <div
    className={`category-card  flex-column justify-content-center text-center d-flex align-items-center p-3 border-top border-start ${
      isLarge ? "large" : ""
    }`}
  >
    <div className="category-card-image d-flex align-items-center justify-content-center rounded-2 me-0 mb-3">
      {imageUrl && (
        <img
          src={`https://react-shop-maoo.onrender.com${imageUrl}`}
          alt={name}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      )}
    </div>
    <div>
      <h3 className="h6 fw-bold">{name}</h3>
      <p className="small text-muted-light mb-0">{count} Items</p>
    </div>
  </div>
);

const CategoriesSection = ({ categories }) => {
  return (
    <section className="my-5">
      <Link to="/shop" className="text-decoration-none">
        <div className="border border-2 rounded-3 overflow-hidden">
          <div className="d-grid category-grid-container d-grid">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.name + index}
                {...cat}
                isLarge={index === 0}
              />
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
};

const FeaturedDeal = ({ product }) => {
  if (!product) return null;
  const {
    imageFront,
    name,
    price,
    oldPrice,
    discount,
    stockCount = 79,
    reviewCount,
    rating,
  } = product;
  return (
    <Card className="featured-deal-card h-100 p-4 h-100">
      <Card.Body className="d-flex flex-column">
        <h2 className="h4 fw-bold">Deals of the week!</h2>
        <div className="d-flex align-items-center gap-2 my-4">
          {["70", "14", "41", "11"].map((time, i) => (
            <React.Fragment key={i}>
              <div className="countdown-box text-white d-flex flex-column justify-content-center align-items-center">
                <span className="fw-bold h5 mb-0">{time}</span>
                <span className="small">
                  {"Days,Hrs,Mins,Secs".split(",")[i]}
                </span>
              </div>
              {i < 3 && <span className="h4 fw-bold text-accent-deal">:</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="small text-muted-light mb-4">
          Remains until the end of the offer
        </p>
        <div className="position-relative">
          <div className="position-absolute top-0 start-0 m-2 discount-circle rounded-circle text-white fw-bold d-flex align-items-center justify-content-center z-1">
            {discount}%
          </div>
          <div
            className="w-100 rounded bg-light d-flex align-items-center justify-content-center"
            style={{ height: "256px" }}
          >
            <img
              src={`https://react-shop-maoo.onrender.com${imageFront}`}
              alt={name}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
        <div className="d-flex align-items-baseline gap-2 mt-4">
          <span className="h5 text-muted-light text-decoration-line-through">
            ${oldPrice.toFixed(2)}
          </span>
          <span className="display-6 fw-bold text-accent-deal">
            ${price.toFixed(2)}
          </span>
        </div>
        <h3 className="h5 fw-semibold my-2">{name}</h3>
        <p className="small fw-semibold text-green-stock mb-2">
          {stockCount} IN STOCK
        </p>
        <div className="d-flex align-items-center gap-1 text-yellow-star mb-4">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={16}
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
          <span className="text-muted-light small ms-1">
            ({reviewCount} review)
          </span>
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between small fw-semibold">
            <span className="text-muted-light">
              AVAILABLE:{" "}
              <span className="text-primary-dark fw-bold">{stockCount}</span>
            </span>
          </div>
          <ProgressBar
            now={(stockCount / 100) * 100}
            className="mt-1"
            style={{ height: "8px" }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

const DealsSection = ({ products, featuredProduct }) => {
  const processedProducts = products.map((p, i) => {
    if (i === 3 || i === 4) {
      return { ...p, discount: null, oldPrice: null };
    }
    return p;
  });

  return (
    <section className="my-5 deals-section flex-column d-flex">
      <Row className="g-3 align-items-stretch">
        <Col lg={4}>
          <FeaturedDeal product={featuredProduct} />
        </Col>
        <Col lg={8}>
          <Row
            xs={1}
            sm={2}
            md={3}
            className="g-0 border-end border-bottom h-100"
          >
            {processedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

const DiscountBanner = ({ title, subtitle, imageUrl, buttonClass }) => (
  <div
    className="discount-banner p-5 d-flex align-items-center"
    style={{ backgroundImage: `url(${imageUrl})`, height: "256px" }}
  >
    <div className="w-50">
      <p className="small fw-bold mb-2 text-accent-deal">
        WEEKEND DISCOUNT 40%
      </p>
      <h2 className="h3 fw-bold mb-2 text-dark">{title}</h2>
      <p className="small mb-4 text-muted-light">{subtitle}</p>
      <Button
        as={Link}
        to="/shop"
        className={`banner-shop-now-btn ${buttonClass}`}
      >
        Shop Now
      </Button>
    </div>
  </div>
);

const BannersSection = () => (
  <section className="my-5">
    <Row className="g-4">
      <Col md={6}>
        <DiscountBanner
          title="Cookie and Ice Cream"
          subtitle="Bacola Weekend Discount"
          imageUrl={banner1}
          buttonClass="banner-btn-dark"
        />
      </Col>
      <Col md={6}>
        <DiscountBanner
          title="Cookie and Ice Cream"
          subtitle="Bacola Weekend Discount"
          imageUrl={banner2}
          buttonClass="banner-btn-red"
        />
      </Col>
    </Row>
  </section>
);

const BestSellersSection = ({ products, addToCart }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const slide =
        scrollContainerRef.current.querySelector(".best-seller-slide");
      const scrollAmount = slide
        ? slide.clientWidth + 16
        : scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (window.innerWidth <= 576) return;
    };
    el.addEventListener("wheel", onWheel);
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollbarHideStyle = {
    scrollBehavior: "smooth",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <section className="my-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h2 fw-bold">BEST SELLERS</h2>
          <p className="small text-muted-light">
            Do not miss the current offers until the end of March.
          </p>
        </div>
        <Button
          as={Link}
          to="/shop"
          variant="outline-secondary"
          className="view-all-btn"
        >
          View All <FiArrowRight />
        </Button>
      </div>
      <div
        className="d-flex pb-3 mx-n3 overflow-x-auto"
        style={scrollbarHideStyle}
        ref={scrollContainerRef}
      >
        <style>
          {`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {products.map((product) => (
          <div className="flex-shrink-0 px-3" key={product.id}>
            <BestSellerCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>

      <div className="slider-arrows">
        <Button
          onClick={() => scroll("left")}
          className="slider-arrow-btn prev-arrow"
        >
          <FiChevronLeft size={20} />
        </Button>
        <Button
          onClick={() => scroll("right")}
          className="slider-arrow-btn next-arrow"
        >
          <FiChevronRight size={20} />
        </Button>
      </div>
    </section>
  );
};

const SuperDiscountSection = ({ products }) => (
  <section className="my-5">
    <Link to="/shop" className="text-decoration-none">
      <div className="super-discount-banner text-center py-3 mb-4 rounded">
        <p className="fw-bold small m-0" style={{ letterSpacing: "0.05em" }}>
          SUPER DISCOUNT FOR YOUR FIRST PURCHASE.
        </p>
      </div>
    </Link>
    <Row xs={2} sm={3} md={4} lg={5} className="g-0 border-end border-bottom">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Row>
  </section>
);

const SmallBanner = ({ title, subtitle, imageUrl, discountText }) => (
  <div
    className="small-banner rounded p-4 d-flex flex-column justify-content-center"
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <p className="small fw-bold mb-2" style={{ color: "#00B853" }}>
      {discountText}
    </p>

    <h3 className="h4 fw-bold mb-2" style={{ maxWidth: "150px" }}>
      {title}
    </h3>
    <p className="small text-muted-light mb-4">{subtitle}</p>
    <Button
      as={Link}
      to="/shop"
      className="btn-custom rounded-pill px-4 py-2 align-self-start"
    >
      Shop Now
    </Button>
  </div>
);

const SmallBannersSection = () => {
  const banners = [
    {
      title: "Natural Eggs",
      subtitle: "Eat one every day",
      imageUrl: smallbanners1,
      discountText: "WEEKEND DISCOUNT 40%",
    },
    {
      title: "Taste the Best",
      subtitle: "Shine the morning",
      imageUrl: smallbanners2,
      discountText: "WEEKEND DISCOUNT 40%",
    },
    {
      title: "Ditch the Junk",
      subtitle: "Breakfast",
      imageUrl: smallbanners3,
      discountText: "WEEKEND DISCOUNT 40%",
    },
  ];
  return (
    <section className="my-5">
      <Row className="g-4">
        {banners.map((banner, i) => (
          <Col key={i} md={4}>
            <SmallBanner {...banner} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

const NewsCard = ({ category, title, date, imageUrl }) => (
  <Card className="border-0 news-card">
    <div className="overflow-hidden rounded-3 mb-3">
      <Card.Img variant="top" src={imageUrl} alt={title} />
    </div>
    <Card.Body className="p-0">
      <p className="small text-muted-light fw-semibold text-uppercase mb-1">
        {category}
      </p>
      <Card.Title as="h3" className="h5 fw-bold">
        <a href="#" className="text-decoration-none text-inherit">
          {title}
        </a>
      </Card.Title>
      <Card.Text className="small text-muted-light">{date}</Card.Text>
    </Card.Body>
  </Card>
);

const LatestNewsSection = () => {
  const news = [
    {
      category: "GROCERY",
      title: "But I must explain to you how all this mistaken idea",
      date: "Jan 13 2025",
      imageUrl: news1,
    },
    {
      category: "GROCERY",
      title: "The Problem With Typefaces on the Web",
      date: "Jan 13 2025",
      imageUrl: news2,
    },
    {
      category: "GROCERY",
      title: "English Breakfast Tea With Tasty Donut Desserts",
      date: "Jan 13 2025",
      imageUrl: news3,
    },
  ];
  return (
    <section className="my-5">
      <Row className="g-4">
        {news.map((item, i) => (
          <Col key={i} md={4}>
            <NewsCard {...item} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

// ====================================================================
// HomePage Component (Main)
// ====================================================================
const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://react-shop-maoo.onrender.com/api/products")
      .then((res) => {
        const allProducts = res.data || [];
        setProducts(allProducts);

        const categoryMap = {};
        const usedImages = new Set();

        allProducts.forEach((product) => {
          if (!product.category || usedImages.has(product.imageFront)) return;
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = {
              count: 0,
              imageUrl: product.imageFront,
            };
            usedImages.add(product.imageFront);
          }
          categoryMap[product.category].count++;
        });

        const categoriesData = Object.keys(categoryMap).map((name) => ({
          name,
          count: categoryMap[name].count,
          imageUrl: categoryMap[name].imageUrl,
        }));

        const orderedNames = [
          "Beverages",
          "Biscuits & Snacks",
          "Breads & Bakery",
          "Breakfast & Dairy",
          "Frozen Foods",
          "Fruits & Vegetables",
          "Grocery & Staples",
          "Household Needs",
          "Meats & Seafood",
        ];
        const placeholderProducts = allProducts.filter(
          (p) => !usedImages.has(p.imageFront)
        );
        let placeholderIndex = 0;

        const finalCategories = orderedNames
          .map((name) => {
            const found = categoriesData.find((cat) => cat.name === name);
            if (found) return found;
            const placeholder =
              placeholderProducts[
                placeholderIndex % Math.max(1, placeholderProducts.length)
              ];
            if (placeholder) {
              placeholderIndex++;
              usedImages.add(placeholder.imageFront);
              return { name, count: 0, imageUrl: placeholder.imageFront };
            }
            return { name, count: 0, imageUrl: null };
          })
          .slice(0, 9);

        setCategories(finalCategories);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const dealsProducts = products.slice(0, 6);
  const featuredProduct = products.find((p) => p.id === 66);
  const bestSellersProducts = products.slice(6, 14);
  const discountProducts = products.slice(14, 24);

  return (
    <>
      <HeroSection />
      <Container fluid="xxl" className="px-4 px-sm-5">
        <CategoriesSection categories={categories} />
        <DealsSection
          products={dealsProducts}
          featuredProduct={featuredProduct}
        />
        <BannersSection />
        <BestSellersSection
          products={bestSellersProducts}
          addToCart={addToCart}
        />
        <SuperDiscountSection products={discountProducts} />
        <SmallBannersSection />
        <LatestNewsSection />
      </Container>
    </>
  );
};

export default HomePage;
