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
      <div style={{ background: 'white', padding: '40px 0', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {brands.map(b => (
              <div key={b.id} style={{ opacity: 0.5, filter: 'grayscale(1)', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = 'grayscale(0)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.filter = 'grayscale(1)'; }}
                onClick={() => navigate(`/products?brand=${b.id}`)}>
                <img src={b.logo_url} alt={b.name} style={{ height: '36px', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

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
      {/* Footer */}
      <footer style={{ background: '#111', color: 'white', padding: '60px 0 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>

            {/* Logo & Mô tả */}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 2, marginBottom: 8 }}>
                KICK<span style={{ color: 'var(--accent)' }}>ZONE</span>
              </div>
              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                KickZone là nền tảng mua sắm giày chính hãng hàng đầu với hàng nghìn sản phẩm từ các thương hiệu nổi tiếng thế giới.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {['Facebook', 'Instagram', 'Zalo'].map(s => (
                  <div key={s} style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer', color: '#ccc' }}>{s}</div>
                ))}
              </div>
            </div>

            {/* Chính sách */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, color: 'var(--accent)' }}>Chính sách</div>
              {['Thanh toán & giao hàng', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'Chính sách đổi trả'].map(item => (
                <div key={item} style={{ color: '#888', fontSize: 14, marginBottom: 10, cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = '#888'}>{item}</div>
              ))}
            </div>

            {/* Về KickZone */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, color: 'var(--accent)' }}>Về KickZone</div>
              {['Giới thiệu', 'Tuyển dụng', 'Tin tức', 'Liên hệ'].map(item => (
                <div key={item} style={{ color: '#888', fontSize: 14, marginBottom: 10, cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = '#888'}>{item}</div>
              ))}
            </div>

            {/* Hotline */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, color: 'var(--accent)' }}>Người hỗ trợ</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Mua hàng (9:00 - 21:00)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>📞 0353950356</div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>CSKH (9:00 - 21:00)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>📞 0353950356</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, color: '#ccc' }}>Thanh toán an toàn</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                 
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ color: '#555', fontSize: 13 }}>© 2024 KickZone. All rights reserved.</div>
            <div style={{ color: '#555', fontSize: 13 }}>Được xây dựng với Team CNTT tại Việt Nam</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
