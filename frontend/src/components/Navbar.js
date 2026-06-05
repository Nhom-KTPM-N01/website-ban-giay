import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logoutUser, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => { logoutUser(); navigate('/'); };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">KICK<span>ZONE</span></Link>
      <div className="navbar-links">
        <Link to="/products">Sản phẩm</Link>
        {user ? (
          <>
            <Link to="/cart" className="cart-btn">
              🛒 Giỏ hàng
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <Link to="/orders">Đơn hàng</Link>
            {isAdmin && <Link to="/admin">⚙️ Admin</Link>}
            <span style={{ color: '#555', fontSize: 14 }}>👤 {user.name}</span>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register" style={{ background: 'var(--accent)', color: 'white', borderRadius: '8px', padding: '8px 16px' }}>
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
