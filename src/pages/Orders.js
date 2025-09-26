import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./Orders.css";

const currency = (n) => `₹${Number(n || 0).toFixed(2)}`;

export default function Orders() {
  const mail = localStorage.getItem("mail");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:6005/orders?mail=${encodeURIComponent(mail || "")}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed to load orders");
        setOrders(data.orders || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [mail]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "All") return orders;
    return orders.filter(o => (o.status || "").toLowerCase() === statusFilter.toLowerCase());
  }, [orders, statusFilter]);

  return (
    <div className="orders-page">
      <BackButton className="page-back" />
      <div className="orders-header">
        <h2>Your Orders</h2>
        <div className="filters">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {loading && <div className="card"><p>Loading orders…</p></div>}
      {error && <div className="card error"><p>{error}</p></div>}

      {!loading && !error && filteredOrders.length === 0 && (
        <div className="card empty"><p>No orders found.</p></div>
      )}

      <div className="orders-list">
        {filteredOrders.map((order) => {
          const dt = order.createdAt ? new Date(order.createdAt).toLocaleString() : "";
          const itemSummary = (order.items || []).map(i => `${i.name} x ${i.quantity}`).join(", ");
          return (
            <div className="order-card" key={order._id}>
              <div className="row">
                <div>
                  <div className="label">Order Date</div>
                  <div className="value highlight">{dt}</div>
                </div>
                <div>
                  <div className="label">Status</div>
                  <div className={`value status ${order.status?.toLowerCase()}`}>{order.status}</div>
                </div>
                <div>
                  <div className="label">Total</div>
                  <div className="value total">{currency(order.totalAmount)}</div>
                </div>
              </div>
              <div className="items-preview">
                {(order.items || []).slice(0, 3).map((it) => (
                  <div className="it" key={it.id} title={`${it.name} x ${it.quantity}`}>
                    {it.img ? <img src={it.img} alt={it.name} /> : <div className="ph" />}
                  </div>
                ))}
                {order.items && order.items.length > 3 && (
                  <span className="more">+{order.items.length - 3} more</span>
                )}
              </div>
              <div className="item-summary">{itemSummary}</div>
              <div className="actions">
                <Link to={`/order/${order._id}`} state={{ order }} className="btn primary">
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
