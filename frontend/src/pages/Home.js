import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, getBrands } from '../services/api';

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts({ limit: 8 }).then(r => setFeatured(r.data.products)).catch(() => {});
    getBrands().then(r => setBrands(r.data.brands)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="container">
          <h1>STEP INTO<br /><span>GREATNESS</span></h1>
          <p>Khám phá bộ sưu tập giày chính hãng mới nhất</p>
          <Link to="/products" className="btn btn-accent" style={{ fontSize: '16px', padding: '16px 40px' }}>
            Mua ngay →
          </Link>
        </div>
      </div>

      {/* Brands */}
     

      {/* Featured */}
      <div className="container page">
        <div className="page-header">
          <h2 className="page-title">SẢN PHẨM NỔI BẬT</h2>
          <Link to="/products" className="btn btn-outline">Xem tất cả →</Link>
        </div>
        <div className="product-grid">
          {featured.map(product => (
            <div key={product.id} className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
              <img
                src={product.image_url}
                alt={product.name}
                onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
              />
              <div className="product-card-body">
                <div className="product-card-brand">{product.brand_name}</div>
                <div className="product-card-name">{product.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <div className="product-card-price">{formatPrice(product.price)}</div>
                  <span style={{ fontSize: 12, color: '#888' }}>Còn: {product.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div style={{ background: 'var(--primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 48, marginBottom: 16 }}>MIỄN PHÍ VẬN CHUYỂN</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 24 }}>Cho đơn hàng từ 2.000.000đ trở lên</p>
          <Link to="/products" className="btn btn-accent">Mua ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
