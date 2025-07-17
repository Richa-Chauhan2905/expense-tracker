import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import piggyBank from '../assets/piggy_bank.png';
import { useAuth } from '../App';

const Navbar = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('spendwise_logged_in');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: '#4f46e5',
      boxShadow: '0 2px 8px #0001',
      marginBottom: 32
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={piggyBank} alt="Logo" style={{ width: 40, height: 40 }} />
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Expense Tracker</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
        <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Profile</Link>
        <button onClick={handleLogout} style={{ marginLeft: 16, padding: '8px 20px', background: '#fff', color: '#4f46e5', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
