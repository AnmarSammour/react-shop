import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faWhatsapp, faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { faShareNodes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from "../context/WishlistContext";

function PurchaseOrders({ product, onClose, addToCart }) {
  const { addToWishlist} = useWishlist();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [mainImage, setMainImage] = useState(
    (product?.images && product.images.length && product.images[0]) || product?.image || ''

  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const selectedSizeObj = product.sizes?.find(s => s.size.toLowerCase() === selectedSize.toLowerCase());
const displayPrice = selectedSizeObj ? selectedSizeObj.price.toFixed(2) : product.price.toFixed(2);

const [images, setImages] = useState([]); 
useEffect(() => {
  if (!product) return;

  const imgs = [
    product.imageFront || product.image,       
    product.imageBack                          
  ].filter(Boolean);

  setImages(imgs);          
  setMainImage(imgs[0] || ''); 
  setStartIndex(0);
  setQuantity(1);
  setSelectedSize('medium');
}, [product]);

  useEffect(() => {
    let mounted = true;
    axios.get('https://react-shop-maoo.onrender.com/api/products')
      .then(res => { if (mounted) setRelatedProducts(res.data || []); })
      .catch(err => console.error('Failed to fetch related products', err));
    return () => { mounted = false; };
  }, []);

  if (!product) return null;

const relatedByTags = relatedProducts.filter(p => 
  p.id !== product.id && 
  p.tags?.some(tag => product.tags.includes(tag))
);


const displayedRelated = relatedByTags.length > 0 ? relatedByTags : relatedProducts.filter(p => p.id !== product.id);

  const visibleCount = 5;
  const maxStart = Math.max(0, displayedRelated.length - visibleCount);

  const handlePrevRelated = () => setStartIndex(prev => Math.max(prev - visibleCount, 0));
const handleNextRelated = () => {
  setStartIndex(prev => {
    const next = prev + visibleCount;
    return next >= displayedRelated.length ? displayedRelated.length - visibleCount : next;
  });
};

  const handleThumbClick = (img) => setMainImage(img);

  const handlePrevImage = () => {
    const idx = images.indexOf(mainImage);
    const prev = (idx - 1 + images.length) % images.length;
    setMainImage(images[prev]);
  };

  const handleNextImage = () => {
    const idx = images.indexOf(mainImage);
    const next = (idx + 1) % images.length;
    setMainImage(images[next]);
  };



const handleCopyLink = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('Link copied!'))
    .catch(() => alert('Failed to copy link'));
}

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
        boxSizing: 'border-box'
      }}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '94vh',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
          padding: '20px',
          boxSizing: 'border-box'
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer'
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Top: Images + Details */}
        <div style={{ display: 'flex', gap: '210px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left: thumbnails + main image */}
          <div style={{ flex: '1 1 280px', minWidth: '240px', display: 'flex', gap: '12px' }}>
            {/* thumbnails column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '70px' }}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`https://react-shop-maoo.onrender.com${img}`}
                  alt={`${product.name}-${i}`}
                  onClick={() => handleThumbClick(img)}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'contain',
                    border: mainImage === img ? '2px solid #35AFA0' : '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                />
              ))}
            </div>

            {/* main image area */}
            <div style={{
              flex: '1',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '450px',
              minWidth: '450px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              background: '#fff'
            }}>
              <button
                onClick={handlePrevImage}
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                  background: '#fff',
                  cursor: 'pointer'
                }}
                aria-label="Previous image"
              >
                ‹
              </button>

              <img
                src={`https://react-workshop-jyvm.onrender.com${mainImage}`}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />

              <button
                onClick={handleNextImage}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                  background: '#fff',
                  cursor: 'pointer'
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>

          {/* Right: details */}
          <div style={{ flex: '1 1 380px', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ margin: 0 , fontSize:'25px' }}>{product.name}</h2>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
    <div style={{ fontSize: '20px', fontWeight: '700', color: '#D51243' }}>
  ${displayPrice}
</div>
              {product.oldPrice && (
                <div style={{ textDecoration: 'line-through', color: '#888' }}>${product.oldPrice}</div>
              )}
            </div>

            {/* Sizes */}
            <div>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Available in:</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['small', 'medium', 'large'].map(sz => (
                  <div
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      marginBottom: ' 18px',
                      border: selectedSize === sz ? '2px solid #35AFA0' : '1px solid #ddd',
                      background: selectedSize === sz ? '#35AFA0' : '#fff',
                      color: selectedSize === sz ? '#fff' : '#000',
                      cursor: 'pointer'
                    }}
                  >
                    {sz}
                  </div>
                ))}
              </div>
            </div>

                       <div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  width: '400px',          
  height: '40px',          
  backgroundColor: '#e4e3e37b', 
  fontSize: '20px', 
  borderRadius: '6px',      
  lineHeight: '48px',      
  boxSizing: 'border-box', 
  marginLeft: '40px',
}}>
  <span style={{ cursor: 'pointer' }} onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</span>
  <span>{quantity}</span>
  <span style={{ cursor: 'pointer' }} onClick={() => setQuantity(prev => prev + 1)}>+</span>
</div>

           {/* Actions */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <button
    style={{
      padding: '12px',
      background: '#35AFA0',
      color: '#fff',
      border: 'none',
      width: '400px',
      borderRadius: '6px',
      cursor: 'pointer', 
      marginLeft: '40px'
      
    }}
  onClick={() => addToCart({ ...product, price: displayPrice }, quantity)}
>
    Add to cart
  </button>

  <div style={{ display: 'flex', gap: '10px' }}>
    {/* Wishlist Button */}
   <button
  onClick={() => addToWishlist(product)}   // ⬅ يضيف المنتج للويش ليست
  style={{
    width: '195px',
    marginLeft: '40px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  }}
>
  <FontAwesomeIcon icon={faHeart} style={{ color: '#D51243' }} />
  Wishlist
</button>

    {/* Share Button */}
    <button
      onClick={() => setShowShare(!showShare)}
      style={{
        width: '195px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        background: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}
    >
      <FontAwesomeIcon icon={faShareNodes} />
      Share
    </button>
  </div>

  {/* Share Box */}
  {showShare && (
    <div
      style={{
        marginTop: '10px',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Social icons row */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1877F2', fontSize: '24px' }}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1DA1F2', fontSize: '24px' }}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#C13584', fontSize: '24px' }}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(product.name)}%20${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#25D366', fontSize: '24px' }}
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a
          href="https://www.snapchat.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#FFFC00', fontSize: '24px' }}
        >
          <FontAwesomeIcon icon={faSnapchat} />
        </a>
      </div>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: 'none',
          background: '#35AFA0',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Copy Link
      </button>
    </div>
  )} </div>


            {/* Tags */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
  <FontAwesomeIcon icon={faTag} style={{ color: '#35AFA0', fontSize: '16px' }} />
  <div style={{ fontWeight: 700 }}>Tags:</div>
  {(product.tags && product.tags.length ? product.tags : ['Biscuits', 'Snacks']).map((t, idx) => (
    <div key={idx} style={{
      background: '#f0f0f0',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '13px'
    }}>
      {t}
    </div>
  ))}
</div>

            {/* Product Details */}
           <div style={{ marginTop: '-7px' }}>
  <div style={{ fontWeight: 700, marginBottom: '2px' }}>Product Details</div>
  <p style={{ 
      margin: 0, 
      color: '#555', 
      fontSize: '12px', 
      maxHeight: showFullDesc ? 'none' : '48px', 
      overflow: 'hidden' 
    }}>
    {product.description}
  </p>
  <button
    style={{ marginTop: '6px', background: 'none', border: 'none', color: '#35AFA0', cursor: 'pointer', fontWeight: 700 }}
    onClick={() => setShowFullDesc(prev => !prev)}
  >
    {showFullDesc ? 'Show less' : 'Read more'}
  </button>
</div>
          </div>
        </div>

       {/* Related Products (inside modal below details) */}
<div style={{ marginTop: '2px' }}>
  <h3 style={{ margin: '0 0 12px 0' }}>Related Products</h3>

  <div style={{ position: 'relative', padding: '0 40px' }}>
    {/* Left arrow */}
    <button
      onClick={handlePrevRelated}
      style={{
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        background: '#fff',
        cursor: 'pointer',
        zIndex: 10
      }}
      aria-label="Previous related"
    >
      ‹
    </button>

    {/* Grid */}
    <div style={{
      display: 'grid',
     gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
      gap: '12px',
      alignItems: 'start'
    }}>
      {displayedRelated.slice(startIndex, startIndex + visibleCount).map(rel => (
        <div key={rel.id} style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '7px',
          position: 'relative',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '160px' 
        }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={`https://react-workshop-jyvm.onrender.com${rel.imageFront || rel.image}`}
              alt={rel.name}
              style={{ width: '100%', height: '140px', objectFit: 'contain' }}
            />
            <button
              style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                background: '#28857aff',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer'
              }}
              aria-label={`Add ${rel.name}`}
            >
              +
            </button>
          </div>
          <div style={{ marginTop: '8px', fontWeight: 700, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {rel.name}
          </div>
          <div style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>
            {rel.oldPrice && <span style={{ textDecoration: 'line-through', marginRight: '6px' }}>${rel.oldPrice}</span>}
            <span style={{ color: '#D51243', fontWeight: 700 }}>${rel.price}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Right arrow */}
    <button
      onClick={handleNextRelated}
      style={{
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        background: '#fff',
        cursor: 'pointer',
        zIndex: 10
      }}
      aria-label="Next related"
    >
      ›
    </button>
  </div>
</div>
      </div>
    </div>
  );
} 

export default PurchaseOrders;