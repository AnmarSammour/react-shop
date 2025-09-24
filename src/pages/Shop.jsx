import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBarImg from '../images/ShopPage/SideBar.jpg';
import SecondImg from '../images/ShopPage/Second.jpg';
import PurchaseOrders from './PurchaseOrders';
import Navbar from '../components/Navbar';

function ProductCard({ name, price, oldPrice, discount, rating, reviews, image, onClick , cart , addToCart, removeFromCart, id}) {
  
const quantity = cart.find(item => item.id === id)?.quantity || 0;

const increase = () => addToCart({ id, name, price, image });
const decrease = () => removeFromCart(id);

  return (

    <div style={{
      width: '100%',
      maxWidth: '213.75px',
      border: '1px solid #EDEEF5',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: '72.5%', marginBottom: '10px' }}>
        <img 
          src={`https://react-workshop-jyvm.onrender.com${image}`} 
          alt={name} 
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'contain', 
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer'
          }}
          onClick={onClick}
        />
        {discount && (
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            background: '#35AFA0',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '12px',
            padding: '2px 6px',
            borderRadius: '3px'
          }}>
            {discount}%
          </div>
        )}
      </div>

      <h4 style={{ width: '100%', margin: 0, marginBottom: '8px', fontWeight: 'normal', fontSize: '14px', textAlign: 'left' }}>{name}</h4>
      <div style={{ color: '#00B853', fontWeight: 'bold', fontSize: '12px', alignSelf: 'flex-start', marginBottom: '8px' }}>IN STOCK</div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', alignSelf: 'flex-start' }}>
        <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= rating ? 'gold' : '#ddd', fontSize: '12px' }}>★</span>)}</div>
        <div style={{ color: 'gray', fontSize: '12px', marginLeft: '7px' }}>{reviews} review</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px', alignSelf: 'flex-start' }}>
        {oldPrice && <div style={{ color: 'gray', textDecoration: 'line-through', fontSize: '14px' }}>${oldPrice}</div>}
        <div style={{ color: '#D51243', fontWeight: 'bold', fontSize: '16px' }}>${price}</div>
      </div>

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={decrease} style={{ flex: 1, height: '34px', border: '1px solid #ccc', borderRight: 'none', borderRadius: '20px 0 0 20px', background: '#f0f0f0', fontSize: '18px', cursor: 'pointer' }}>-</button>
        <div style={{ flex: 2, height: '32px', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{quantity}</div>
        <button onClick={increase} style={{ flex: 1, height: '34px', border: '1px solid #ccc', borderLeft: 'none', borderRadius: '0 20px 20px 0', background: '#f3c212ff', color: '#000', fontSize: '18px', cursor: 'pointer' }}>+</button>
      </div>
    </div>
  );
}

function Shop({cart, addToCart, removeFromCart}) {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // <-- جديد
  const productsPerPage = 12;
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    axios.get('https://react-workshop-jyvm.onrender.com/api/products')
      .then(res => {
        const productsWithBrandCategory = res.data.map(p => {
          let brand = 'Other';
          let category = '';
          const name = p.name.toLowerCase();
          if (name.includes('nestlé') || name.includes('nestle')) brand = 'Nestlé';
          else if (name.includes('oreo')) brand = 'Oreo';
          else if (name.includes('quaker')) brand = 'Quaker';
          else if (name.includes('coca-cola')) brand = 'Cola';
          else if (name.includes('frito') || name.includes('cheetos') || name.includes('lay’s') || name.includes("lay's")) brand = 'Frito Lay';
          else if (name.includes('welch')) brand = 'Welch’s';
          else if (name.includes('betty')) brand = 'Betty Crocker';
          if (['ice cream','frozen'].some(n => name.includes(n))) category = 'Frozen Foods';
          else if (['kitkat','aero','quality street'].some(n => name.includes(n))) category = 'Confectionery & Chocolate';
          else if (['coca-cola','sprite','fanta','diet coke','welch'].some(n => name.includes(n))) category = 'Beverages';
          else if (['doritos','cool ranch','fritos','sunchips','lay','cheetos','oreo','biscuits'].some(n => name.includes(n))) category = 'Biscuits & Snacks';
          else if (['quaker','life cereal'].some(n => name.includes(n))) category = 'Breakfast & Dairy';
          else category = 'Grocery & Staples';
          return { ...p, brand, category };
        });
        setAllProducts(productsWithBrandCategory);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    setCurrentPage(1);
  };

  const openPurchaseOrders = (product) => {
    setSelectedProduct(product);
  };

  const closePurchaseOrders = () => {
    setSelectedProduct(null);
  };

  let filteredProducts = allProducts.filter(product => {
    if (availabilityFilter === 'out') return false; 
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    const min = priceRange.min ? parseFloat(priceRange.min) : 0;
    const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    if (product.price < min || product.price > max) return false;
    return true;
  });

  if (priceRange.min || priceRange.max) {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (

    <>
    <Navbar 
      cart={cart} 
      addToCart={addToCart} 
      removeFromCart={removeFromCart} 
      shopCategories={['Confectionery & Chocolate','Beverages','Biscuits & Snacks','Breakfast & Dairy','Grocery & Staples','Frozen Foods']}
    />

  
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px', gap: '20px', justifyContent: 'center' }}>
      {/* Side Bar */}
      <div style={{ flex: '1 1 250px', minWidth: '250px', maxWidth: '300px' }}>
        {/* Categories */}
        <div style={{display:'flex', flexDirection:'column', gap:'6px', marginBottom:'15px'}}>
          <h5><b>PRODUCTS CATEGORIES</b></h5>
          {['Confectionery & Chocolate','Beverages','Biscuits & Snacks','Breakfast & Dairy','Grocery & Staples','Frozen Foods'].map(c => (
            <div key={c}>
              <label>
                <input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggleCategory(c)} /> {c}
              </label>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div style={{display:'flex', flexDirection:'column', gap:'6px', marginBottom:'15px'}}>
          <h5><b>BRANDS</b></h5>
          {[
            { name: 'Quaker', count: 36 },
            { name: 'Oreo', count: 17 },
            { name: 'Betty Crocker', count: 12 },
            { name: 'Frito Lay', count: 8 },
            { name: 'Nestlé', count: 8 },
            { name: 'Cola', count: 4 },
            { name: 'Welch’s', count: 1 },
          ].map(b => (
            <div key={b.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={selectedBrands.includes(b.name)} onChange={() => toggleBrand(b.name)} />
                <span>{b.name}</span>
              </label>
              <span>({b.count})</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{display:'flex', flexDirection:'column'}}>
          <h5><b>PRICE</b></h5>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', marginBottom: '8px', gap:'65px' }}>
              <label>From</label>
              <label>To</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="number" placeholder="0" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} style={{ width: '70px', padding: '5px', background: '#e0dcdc42', border: '1px solid #ccc', borderRadius: '4px' }} />
              <span>-</span>
              <input type="number" placeholder="65.00" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} style={{ width: '70px', padding: '5px', background: '#e0dcdc42', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div style={{display:'flex', flexDirection:'column', gap:'6px', marginBottom:'15px'}}>
          <h5><b>AVAILABILITY</b></h5>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="checkbox" checked={availabilityFilter === 'in'} onChange={() => setAvailabilityFilter('in')} />
              <span>In stock</span>
            </label>
            <span>(84)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="checkbox" checked={availabilityFilter === 'out'} onChange={() => setAvailabilityFilter('out')} />
              <span>Out of stock</span>
            </label>
            <span>(0)</span>
          </div>
        </div>

        <img src={SideBarImg} alt="sidebar pic" style={{ width: '100%', marginTop: '20px' }} />
      </div>

      {/* Products + Banner */}
      <div style={{ flex: '3 1 600px', minWidth: '300px', maxWidth: '900px' }}>
        <div style={{ width: '100%', height: '240px', borderRadius: '7px', overflow: 'hidden', marginBottom: '30px', position:'relative', marginLeft:'20px' }}>
          <img src={SecondImg} alt="Shop Banner" style={{ width: '95.30%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '30%', left: '20%', transform: 'translate(-50%, -50%)', color:'gray', fontSize: '24px', textAlign: 'center' }}>Delicious Snacks & Beverages</div>
          <div style={{ position: 'absolute', top: '48%', left: '18%', transform: 'translate(-50%, -50%)', fontSize: '24px', textAlign: 'center'}}> 
            <span style={{ color: '#000000a3', fontWeight: 'bold' }}>Delivered to </span>
            <span style={{ color: '#28857aff', fontWeight: 'bold' }}>your Home</span>
          </div>
          <div style={{ position: 'absolute', top: '65%', left: '18%', transform: 'translate(-50%, -50%)', color:'black', fontSize: '14px', textAlign: 'center' }}>Fresh & Ready to Enjoy Nationwide</div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 213.75px)', 
          gridAutoFlow: 'dense',
          gap: '0px',
          justifyContent: 'center'
        }}>
          {currentProducts.map(product => (
            <ProductCard
  
  key={product.id}
  id={product.id}                      
  name={product.name}
  price={product.price}
  oldPrice={product.oldPrice}
  discount={product.discount}
  rating={product.rating}
  reviews={product.reviews}
  image={product.imageFront || product.image }
  onClick={() => openPurchaseOrders(product)}
  cart={cart}                           
  addToCart={addToCart}                
  removeFromCart={removeFromCart}      
/>
          ))}
        </div>
{/* Pagination */}
<div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(page => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
    .map((page, idx, arr) => {
      const prev = arr[idx - 1];
      return (
        <React.Fragment key={page}>
          {prev && page - prev > 1 && <span>...</span>}
          <button
            onClick={() => setCurrentPage(page)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: currentPage === page ? '2px solid #35AFA0' : '1px solid #ccc',
              background: currentPage === page ? '#35AFA0' : '#fff',
              color: currentPage === page ? '#fff' : '#000',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        </React.Fragment>
      );
    })}
  <button
    onClick={() => setCurrentPage(totalPages)}
    style={{
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: '1px solid #ccc',
      background: '#fff',
      cursor: 'pointer'
    }}
  >
    ›
  </button>
</div>
      </div>

      {/* Purchase Orders Modal */}
      {selectedProduct && (
        <PurchaseOrders product={selectedProduct} onClose={closePurchaseOrders} addToCart={addToCart} />
      )}
    </div>
    </>
  );
}

export default Shop;