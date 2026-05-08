import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDashboardStats } from '../services/api';

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ padding: '16px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 8 }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'white', letterSpacing: 2 }}>
            KICK<span style={{ color: 'var(--accent)' }}>ZONE</span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>ADMIN PANEL</div>
        </div>

        <div className="admin-nav-title">Tổng quan</div>
        <Link to="/admin" className={isActive('/admin')}> Dashboard</Link>

        <div className="admin-nav-title">Quản lý</div>
        <Link to="/admin/products" className={isActive('/admin/products')}> Sản phẩm</Link>
        <Link to="/admin/orders" className={isActive('/admin/orders')}> Đơn hàng</Link>
        <Link to="/admin/users" className={isActive('/admin/users')}> Người dùng</Link>

        <div className="admin-nav-title">Hệ thống</div>
        <Link to="/"> Về trang chủ</Link>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(r => setStats(r.data.stats)).catch(() => {});
  }, []);

  return (
    <AdminLayout>
      <h1 className="page-title" style={{ marginBottom: 32 }}>DASHBOARD</h1>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Tổng sản phẩm</h3>
            <div className="stat-value">{stats.totalProducts}</div>
          </div>
          <div className="stat-card" style={{ borderLeftColor: '#2196F3' }}>
            <h3>Tổng đơn hàng</h3>
            <div className="stat-value">{stats.totalOrders}</div>
          </div>
          <div className="stat-card" style={{ borderLeftColor: '#9C27B0' }}>
            <h3>Người dùng</h3>
            <div className="stat-value">{stats.totalUsers}</div>
          </div>
          <div className="stat-card" style={{ borderLeftColor: '#4CAF50' }}>
            <h3>Doanh thu</h3>
            <div className="stat-value" style={{ fontSize: 28 }}>{formatPrice(stats.totalRevenue)}</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Link to="/admin/products" style={{
          background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)',
          display: 'block', transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: 40, marginBottom: 12 }}></div>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 24, marginBottom: 8 }}>QUẢN LÝ SẢN PHẨM</h3>
          <p style={{ color: '#888', fontSize: 14 }}>Thêm, sửa, xóa sản phẩm trong cửa hàng</p>
        </Link>
        <Link to="/admin/orders" style={{
          background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)',
          display: 'block', transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: 40, marginBottom: 12 }}></div>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 24, marginBottom: 8 }}>QUẢN LÝ ĐƠN HÀNG</h3>
          <p style={{ color: '#888', fontSize: 14 }}>Xem và cập nhật trạng thái đơn hàng</p>
        </Link>
        <Link to="/admin/users" style={{
          background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)',
          display: 'block', transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: 40, marginBottom: 12 }}></div>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 24, marginBottom: 8 }}>QUẢN LÝ NGƯỜI DÙNG</h3>
          <p style={{ color: '#888', fontSize: 14 }}>Xem danh sách và quản lý tài khoản</p>
        </Link>
      </div>
    </AdminLayout>
  );
};

export { AdminLayout };
export default AdminDashboard;
