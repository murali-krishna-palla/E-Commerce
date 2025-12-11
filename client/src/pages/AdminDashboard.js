import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
      
      // Calculate stats
      if (response.data.length > 0) {
        const totalRevenue = response.data.reduce((sum, order) => sum + order.total, 0);
        setStats({
          totalOrders: response.data.length,
          totalRevenue: totalRevenue,
          avgOrderValue: totalRevenue / response.data.length
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="page-content admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Order Value</h3>
          <p className="stat-value">${stats.avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <h2>Recent Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerInfo.firstName} {order.customerInfo.lastName}</td>
                  <td>{order.customerInfo.email}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td><span className="status-badge">{order.status}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
