import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faShareNodes, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from "../context/WishlistContext";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

function PurchaseOrders({ product, onClose, addToCart }) {
  const { addToWishlist } = useWishlist();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  useEffect(() => {
    if (product) {
      const availableImages = [
        product.image,
        product.imageFront,
        product.imageBack,
        ...(product.images || [])
      ].filter(Boolean);
      const uniqueImages = [...new Set(availableImages)];
      setImages(uniqueImages);
      setMainImage(uniqueImages[0] || '');
      setQuantity(0);
      setSelectedSize('medium');
      setShowFullDesc(false);
    }
  }, [product]);

  useEffect(() => {
    axios.get('https://react-shop-maoo.onrender.com/api/products')
      .then(res => setRelatedProducts(res.data || []))
      .catch(err => {});
  }, []);

  if (!product) return null;

  const selectedSizeObj = product.sizes?.find(s => s.size.toLowerCase() === selectedSize.toLowerCase());
  const displayPrice = selectedSizeObj ? selectedSizeObj.price.toFixed(2) : (product.price || 0).toFixed(2);

  const relatedByTags = relatedProducts.filter(p =>
    p.id !== product.id && p.tags?.some(tag => product.tags?.includes(tag))
  );
  const displayedRelated = relatedByTags.length > 0 ? relatedByTags : relatedProducts.filter(p => p.id !== product.id);

  const visibleCount = isMobile ? 2 : 5;

  const handleQuantityMinus = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      addToCart({ ...product, price: displayPrice }, newQty);
    }
  };

  const handleQuantityPlus = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    addToCart({ ...product, price: displayPrice }, newQty);
  };

  const handleThumbClick = (img) => setMainImage(img);

  const handlePrevImage = () => {
    const currentIndex = images.indexOf(mainImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setMainImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = images.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
  };

  const handlePrevRelated = () => setStartIndex(prev => Math.max(0, prev - 1));
  const handleNextRelated = () => setStartIndex(prev => Math.min(prev + 1, displayedRelated.length - visibleCount));

  const getImageUrl = (path) => {
    if (!path) return '';
    const API_BASE_URL = 'https://react-shop-maoo.onrender.com';
    return `${API_BASE_URL}${path}`;
  };

  const styles = {
    overlay: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6 )', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 9999, padding: isMobile ? '10px' : '20px', boxSizing: 'border-box'
    },
    modal: {
      background: '#fff', borderRadius: '8px', width: '100%', maxWidth: '900px',
      maxHeight: '95vh', overflowY: 'auto', display: 'flex', flexDirection: 'column',
      position: 'relative', padding: isMobile ? '15px' : '25px', boxSizing: 'border-box'
    },
    closeButton: {
      position: 'absolute', top: '10px', right: '10px', background: 'transparent',
      border: 'none', fontSize: '22px', cursor: 'pointer', zIndex: 10, color: '#777'
    },
    mainContent: {
      display: 'flex', gap: '20px',
      flexDirection: isMobile ? 'column' : 'row'
    },
    imageSection: {
      flex: isMobile ? '1 1 100%' : '0 1 45%', display: 'flex',
      gap: '10px', flexDirection: isMobile ? 'column' : 'row'
    },
    thumbnails: {
      display: 'flex', gap: '8px',
      flexDirection: isMobile ? 'row' : 'column',
      justifyContent: isMobile ? 'center' : 'flex-start',
      flexWrap: 'wrap',
      order: isMobile ? 2 : 1
    },
    thumbnailImage: (img) => ({
      width: isMobile ? '50px' : '60px', height: isMobile ? '50px' : '60px', objectFit: 'contain', cursor: 'pointer',
      border: mainImage === img ? '2px solid #35AFA0' : '1px solid #ddd',
      borderRadius: '6px', background: '#fff', padding: '4px'
    }),
    mainImageContainer: {
      flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1px solid #eee', borderRadius: '8px', padding: '10px',
      height: isMobile ? 'auto' : '350px',
      width: isMobile ? '100%' : '350px',
      aspectRatio: isMobile ? 'auto' : '1 / 1',
      order: isMobile ? 1 : 2,
      marginBottom: isMobile ? '15px' : 0
    },
    mainImage: {
      maxWidth: '100%', maxHeight: isMobile ? '180px' : '100%', objectFit: 'contain'
    },
    navButton: {
      position: 'absolute', top: '50%', transform: 'translateY(-50%)',
      width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd',
      background: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '18px', zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555'
    },
    detailsSection: {
      flex: '1 1 55%', display: 'flex', flexDirection: 'column', gap: '12px'
    },
    productName: { margin: 0, fontSize: '20px', fontWeight: '600' },
    price: { fontSize: '17px', fontWeight: '700', color: '#222' },
    sizeButton: (sz) => ({
      padding: '7px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px',
      border: selectedSize === sz ? '1px solid #35AFA0' : '1px solid #ddd',
      background: selectedSize === sz ? '#35AFA0' : '#fff',
      color: selectedSize === sz ? '#fff' : '#333',
    }),
    counterBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e3e6f5',
      borderRadius: '8px',
      fontSize: '20px',
      margin: '17px auto 9px auto',
      height: '42px',
      width: '100%',
      maxWidth: '385px'
    },
    counterBtn: {
      border: 'none',
      background: 'transparent',
      fontSize: '20px',
      fontWeight: '700',
      color: '#555',
      cursor: 'pointer',
      minWidth: '35px'
    },
    counterValue: {
      fontSize: '19px',
      fontWeight: 600,
      minWidth: '28px',
      textAlign: 'center'
    },
    actionButton: {
      padding: '11px', background: '#35AFA0', color: '#fff', border: 'none',
      borderRadius: '6px', cursor: 'pointer', fontSize: '14px', width: '100%', fontWeight: '600', maxWidth: '385px', margin: '0 auto 9px auto', display: 'block'
    },
    secondaryActions: {
      display: 'flex', gap: '10px', width: '100%', maxWidth: '385px', margin: '0 auto'
    },
    secondaryButton: {
      flex: 1, padding: '9px', border: '1px solid #ddd', borderRadius: '6px',
      background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '8px', fontSize: '13px'
    },
    relatedSection: {
      marginTop: '25px'
    },
    relatedGrid: {
      display: 'grid', gap: '12px',
      gridTemplateColumns: `repeat(${visibleCount}, 1fr)`
    },
    relatedCard: {
      border: '1px solid #eee', borderRadius: '8px', padding: '8px', background: '#fff',
      display: 'flex', flexDirection: 'column'
    },
    relatedImageContainer: {
      position: 'relative',
      width: '100%',
      height: '90px',
      marginBottom: '8px'
    },
    relatedImage: {
      width: '100%', height: '100%', objectFit: 'contain'
    },
    relatedAddBtn: {
      position: 'absolute', bottom: '0px', right: '0px', background: '#35AFA0',
      color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: 'translate(25%, 25%)'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeButton} aria-label="Close">×</button>
        <div style={styles.mainContent}>
          <div style={styles.imageSection}>
            <div style={styles.thumbnails}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`thumbnail-${i}`}
                  onClick={() => handleThumbClick(img)}
                  style={styles.thumbnailImage(img)}
                />
              ))}
            </div>
            <div style={styles.mainImageContainer}>
              {images.length > 1 && (
                <button onClick={handlePrevImage} style={{ ...styles.navButton, left: '10px' }} aria-label="Previous">‹</button>
              )}
              <img src={getImageUrl(mainImage)} alt={product.name} style={styles.mainImage} />
              {images.length > 1 && (
                <button onClick={handleNextImage} style={{ ...styles.navButton, right: '10px' }} aria-label="Next">›</button>
              )}
            </div>
          </div>
          <div style={styles.detailsSection}>
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={{ ...styles.price, margin: 0 }}>${displayPrice}</p>
            <div>
              <div style={{ fontWeight: 500, marginBottom: '8px', fontSize: '13px' }}>Available in:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['small', 'medium', 'large'].map(sz => (
                  <div key={sz} onClick={() => setSelectedSize(sz)} style={styles.sizeButton(sz)}>
                    {sz.charAt(0).toUpperCase() + sz.slice(1)}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: '100%', maxWidth: '385px', margin: '0 auto' }}>
              <div style={styles.counterBox}>
                <button type="button"
                  style={styles.counterBtn}
                  onClick={handleQuantityMinus}
                  aria-label="decrease"
                >-</button>
                <span style={styles.counterValue}>{quantity}</span>
                <button type="button"
                  style={styles.counterBtn}
                  onClick={handleQuantityPlus}
                  aria-label="increase"
                >+</button>
              </div>
              <button style={styles.actionButton} onClick={() => addToCart({ ...product, price: displayPrice }, quantity)}>
                Add to Cart
              </button>
              <div style={styles.secondaryActions}>
                <button onClick={() => addToWishlist(product)} style={styles.secondaryButton}>
                  <FontAwesomeIcon icon={faHeart} style={{ color: '#D51243' }} /> Wishlist
                </button>
                <button style={styles.secondaryButton}>
                  <FontAwesomeIcon icon={faShareNodes} /> Share
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <FontAwesomeIcon icon={faTag} style={{ color: '#999', fontSize: '14px' }} />
              <b style={{ fontSize: '13px', fontWeight: '600' }}>Tags:</b>
              {(product.tags || []).map((t, i) => <span key={i} style={{ background: '#f0f0f0', padding: '4px 9px', borderRadius: '15px', fontSize: '12px' }}>{t}</span>)}
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '13px' }}>Product Details</div>
              <p style={{ margin: 0, color: '#666', fontSize: '12px', lineHeight: '1.6', maxHeight: showFullDesc ? 'none' : '36px', overflow: 'hidden' }}>
                {product.description}
              </p>
              <button style={{ background: 'none', border: 'none', color: '#35AFA0', cursor: 'pointer', padding: '5px 0', fontWeight: '600', fontSize: '12px' }} onClick={() => setShowFullDesc(!showFullDesc)}>
                {showFullDesc ? 'Show less' : 'Read more'}
              </button>
            </div>
          </div>
        </div>
        {displayedRelated.length > 0 && (
          <div style={styles.relatedSection}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Related Products</h3>
            <div style={{ position: 'relative' }}>
              {startIndex > 0 && (
                <button onClick={handlePrevRelated} style={{ ...styles.navButton, left: '-15px', zIndex: 20 }} aria-label="Previous">‹</button>
              )}
              <div style={styles.relatedGrid}>
                {displayedRelated.slice(startIndex, startIndex + visibleCount).map(rel => (
                  <div key={rel.id} style={styles.relatedCard}>
                    <div style={styles.relatedImageContainer}>
                      <img src={getImageUrl(rel.imageFront || rel.image)} alt={rel.name} style={styles.relatedImage} />
                      <button
                        style={styles.relatedAddBtn}
                        aria-label={`Add ${rel.name} to cart`}
                        onClick={() => addToCart(rel, 1)}
                      >
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                      </button>
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontWeight: 500, fontSize: '13px', marginBottom: '4px' }}>{rel.name}</div>
                      <div>
                        {rel.oldPrice && <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '6px', fontSize: '12px' }}>${rel.oldPrice.toFixed(2)}</span>}
                        <span style={{ color: '#222', fontWeight: 700, fontSize: '13px' }}>${rel.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {startIndex < displayedRelated.length - visibleCount && (
                <button onClick={handleNextRelated} style={{ ...styles.navButton, right: '-15px', zIndex: 20 }} aria-label="Next">›</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseOrders;
