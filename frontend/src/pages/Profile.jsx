import React from 'react';

const Profile = () => {
  // Placeholder user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0002', padding: '2.5rem 2rem', textAlign: 'center' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#e0e7ff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: '#4f46e5', marginBottom: 12 }}>
          {user.name[0]}
        </div>
        <h2 style={{ margin: 0 }}>{user.name}</h2>
        <p style={{ color: '#555', margin: '8px 0 0 0' }}>{user.email}</p>
      </div>
      <button style={{ padding: '10px 28px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
