import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getUserOrders } from '../services/api';

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const statusLabels = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isSuccess = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    getUserOrders()
      .then(r => setOrders(r.data.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container page">
      {isSuccess && (
        <div style={{ background: '#E8F5E9', border: '2px solid #4CAF50', borderRadius: 16, padding: '24px 32px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 40 }}>🎉</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Đặt hàng thành công!</div>
            <div style={{ color: '#555' }}>Mã đơn hàng: #{orderId} — Chúng tôi sẽ liên hệ xác nhận sớm nhất.</div>
          </div>
        </div>
      )}

      <h1 className="page-title" style={{ marginBottom: 32 }}>ĐƠN HÀNG CỦA TÔI</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>📦</h2>
          <p>Bạn chưa có đơn hàng nào</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>Mua sắm ngay</button>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Đơn #{order.id}</span>
                  <span style={{ color: '#888', fontSize: 13, marginLeft: 12 }}>{formatDate(order.created_at)}</span>
                </div>
                <span className={`badge badge-${order.status}`}>{statusLabels[order.status]}</span>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                {(order.items || []).map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f9f9f9', borderRadius: 10, padding: '8px 12px' }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                      onError={e => { e.target.src = 'https://via.placeholder.com/48?text=?'; }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>x{item.quantity} {item.size && `· Size ${item.size}`}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontSize: 13, color: '#666' }}>
                  📍 {order.shipping_address}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--accent)' }}>
                  {formatPrice(order.total_amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
