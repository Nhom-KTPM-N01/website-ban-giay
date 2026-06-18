import React, { useEffect, useState } from 'react';
import { AdminLayout } from './AdminDashboard';
import { getRevenueByDay, getRevenueByMonth, getTopProducts } from '../services/api';

const formatPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p || 0);

const StatCard = ({ title, value, sub, color }) => (
  <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', flex: 1 }}>
    <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>{title}</div>
    <div style={{ fontSize: 32, fontWeight: 800, color: color || 'var(--primary)', marginBottom: 4 }}>{value}</div>
    {sub && <div style={{ fontSize: 13, color: '#aaa' }}>{sub}</div>}
  </div>
);

const AdminReports = () => {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [dayData, setDayData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [d, m, t] = await Promise.all([
        getRevenueByDay(selectedDate),
        getRevenueByMonth(selectedMonth, selectedYear),
        getTopProducts()
      ]);
      setDayData(d.data);
      setMonthData(m.data);
      setTopProducts(t.data.topProducts || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, [selectedDate, selectedMonth, selectedYear]);

  const maxQty = topProducts.length > 0 ? Math.max(...topProducts.map(p => p.total_quantity)) : 1;

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = [2024, 2025, 2026, 2027];

  return (
    <AdminLayout>
      <h1 className="page-title" style={{ marginBottom: 32 }}>BÁO CÁO / THỐNG KÊ</h1>

      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : (
        <>
          {/* Doanh thu theo ngày */}
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontWeight: 700, fontSize: 18 }}> DOANH THU THEO NGÀY</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="form-input"s
                style={{ width: 'auto' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <StatCard title="Doanh thu" value={formatPrice(dayData?.revenue)} color="var(--accent)" />
              <StatCard title="Số đơn hàng" value={dayData?.totalOrders ?? 0} sub="đơn (không tính đã hủy)" />
            </div>
          </div>

          {/* Doanh thu theo tháng */}
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontWeight: 700, fontSize: 18 }}> DOANH THU THEO THÁNG</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className="form-input"
                  style={{ width: 'auto' }}
                >
                  {months.map(m => <option key={m} value={m}>Tháng {m}</option>)}
                </select>
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  className="form-input"
                  style={{ width: 'auto' }}
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <StatCard title="Doanh thu" value={formatPrice(monthData?.revenue)} color="var(--accent)" />
              <StatCard title="Số đơn hàng" value={monthData?.totalOrders ?? 0} sub="đơn (không tính đã hủy)" />
            </div>
          </div>

          {/* Top 5 sản phẩm bán chạy */}
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}> TOP 5 SẢN PHẨM BÁN CHẠY</h2>
            {topProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>Chưa có dữ liệu đơn hàng</div>
            ) : (
              <div>
                {topProducts.map((p, i) => (
                  <div key={p.product_id} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    {/* Rank */}
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 14, flexShrink: 0,
                      background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#f0f0f0',
                      color: i < 3 ? 'white' : '#666'
                    }}>{i + 1}</div>

                    {/* Ảnh */}
                    <img
                      src={p.product_image}
                      alt={p.product_name}
                      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                      onError={e => { e.target.src = 'https://via.placeholder.com/48?text=?'; }}
                    />

                    {/* Tên + bar */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{p.product_name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ flex: 1, background: '#f0f0f0', borderRadius: 20, height: 10, overflow: 'hidden' }}>
                          <div style={{
                            width: `${(p.total_quantity / maxQty) * 100}%`,
                            height: '100%',
                            background: i === 0 ? '#FF6B35' : i === 1 ? '#FF9A5C' : '#FFB380',
                            borderRadius: 20,
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)', flexShrink: 0 }}>
                          {p.total_quantity} đôi
                        </div>
                      </div>
                    </div>

                    {/* Doanh thu */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>{formatPrice(p.total_revenue)}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>doanh thu</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminReports;
