import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Welcome to Your Dashboard</h1>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, background: '#f5f5f5', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px #0001' }}>
          <h2>Total Expenses</h2>
          <p style={{ fontSize: 24, fontWeight: 'bold' }}>$0.00</p>
        </div>
        <div style={{ flex: 1, minWidth: 200, background: '#f5f5f5', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px #0001' }}>
          <h2>Categories</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Food</li>
            <li>Transport</li>
            <li>Shopping</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: 200, background: '#f5f5f5', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px #0001' }}>
          <h2>Recent Activity</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>No recent expenses</li>
          </ul>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px #0001' }}>
        <h2>Expense Chart (Coming Soon)</h2>
        <div style={{ height: 200, background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
          Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
