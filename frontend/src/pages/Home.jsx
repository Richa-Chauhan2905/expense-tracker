import React from 'react';
import { Link } from 'react-router-dom';
import piggyBank from '../assets/piggy_bank.png';

const Home = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <img src={piggyBank} alt="Piggy Bank" style={{ width: 120, marginBottom: 24 }} />
      <h1 style={{ fontSize: 40, marginBottom: 12 }}>Expense Tracker</h1>
      <p style={{ fontSize: 18, color: '#555', marginBottom: 32, maxWidth: 400, textAlign: 'center' }}>
        Take control of your finances. Track your expenses, analyze your spending, and save more every month!
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link to="/login" style={{ padding: '12px 32px', background: '#4f46e5', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Login</Link>
        <Link to="/signup" style={{ padding: '12px 32px', background: '#fff', color: '#4f46e5', border: '2px solid #4f46e5', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Home; 