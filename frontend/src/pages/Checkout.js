import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, createOrder } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ shipping_address: '', phone: '', note: '' });
  const [error, setError] = useState('');
  const { refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getCart()
      .then(r => {
        if (r.data.cart.length === 0) navigate('/cart');
        setCart(r.data.cart);
      })
      .catch(() => navigate('/cart'))
      .finally(() => setLoading(false));

    if (user) {
      setForm(f => ({
        ...f,
        shipping_address: user.address || '',
        phone: user.phone || ''
      }));
    }
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.shipping_address) { setError('Vui lòng nhập địa chỉ giao hàng'); return; }
    if (!form.phone) { setError('Vui lòng nhập số điện thoại'); return; }
    setPlacing(true);
    setError('');
    try {
      const res = await createOrder(form);
      await refreshCart();
      navigate(`/orders?success=1&orderId=${res.data.orderId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container page">
      <h1 className="page-title" style={{ marginBottom: 32 }}>THANH TOÁN</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'start' }}>
        {/* Form */}
        <div style={{ background: 'white', borderRadius: 16, padding: 32, boxShadow: 'var(--shadow)' }}>
          <h2 style={{ fontSize: 24, marginBottom: 24 }}>THÔNG TIN GIAO HÀNG</h2>

          {error && (
            <div style={{ background: '#FFEBEE', color: '#c62828', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleOrder}>
            <div className="form-group">
              <label>Họ tên người nhận</label>
              <input value={user?.name || ''} disabled style={{ background: '#f5f5f5' }} />
            </div>
            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                placeholder="0xxxxxxxxx"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ giao hàng *</label>
              <textarea
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                value={form.shipping_address}
                onChange={e => setForm({ ...form, shipping_address: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="form-group">
              <label>Ghi chú</label>
              <textarea
                placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })}
                rows={2}
              />
            </div>

            <div style={{ padding: 16, background: '#f9f9f9', borderRadius: 12, marginBottom: 24, fontSize: 14 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>💳 Phương thức thanh toán</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555' }}>
                <input type="radio" checked readOnly /> Thanh toán khi nhận hàng (COD)
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-accent"
              style={{ width: '100%', padding: '16px', fontSize: 16 }}
              disabled={placing}>
              {placing ? 'Đang đặt hàng...' : `Đặt hàng - ${formatPrice(total)}`}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', position: 'sticky', top: 80 }}>
          <h2 style={{ fontSize: 24, marginBottom: 20 }}>ĐƠN HÀNG ({cart.length})</h2>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
              <img
                src={item.image_url}
                alt={item.name}
                style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, background: '#f0f0f0' }}
                onError={e => { e.target.src = 'https://via.placeholder.com/56?text=?'; }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                {item.size && <div style={{ fontSize: 12, color: '#888' }}>Size: {item.size}</div>}
                <div style={{ fontSize: 13, color: '#888' }}>x{item.quantity}</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
          <div style={{ borderTop: '2px solid var(--border)', paddingTop: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span>Tạm tính</span><span>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span>Vận chuyển</span><span style={{ color: 'green' }}>Miễn phí</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
              <span>Tổng cộng</span>
              <span style={{ color: 'var(--accent)' }}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
