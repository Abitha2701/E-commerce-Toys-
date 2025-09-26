import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import "./OrderSummary.css";
import BackButton from "../components/BackButton";

const currency = (n) => `₹${Number(n || 0).toFixed(2)}`;

export default function OrderSummary() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!order && orderId) {
      (async () => {
        try {
          const res = await fetch(`http://localhost:6005/orders/${orderId}`);
          const data = await res.json();
          if (!res.ok || !data.success) throw new Error(data.message || "Failed to load order");
          setOrder(data.order);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [order, orderId]);

  const orderDate = useMemo(() => {
    if (!order?.createdAt) return "";
    return new Date(order.createdAt).toLocaleString();
  }, [order]);

  if (loading) {
    return (
      <div className="order-summary-page">
        <BackButton className="page-back" />
        <div className="order-summary card"><p>Loading order…</p></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-summary-page">
        <BackButton className="page-back" />
        <div className="order-summary card error">
          <p>{error || "Order not found"}</p>
          <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-page">
      <BackButton className="page-back" />

      <div className="order-summary card">
        <div className="order-summary-header">
          <h2>Order Summary</h2>
          <div className={`status ${order.status?.toLowerCase()}`}>{order.status}</div>
        </div>

        <div className="meta">
          <div>
            <div className="label">Order ID</div>
            <div className="value mono">{order._id}</div>
          </div>
          <div>
            <div className="label">Order Date</div>
            <div className="value highlight">{orderDate}</div>
          </div>
          <div>
            <div className="label">Payment</div>
            <div className="value">{order.paymentMethod}</div>
          </div>
        </div>

        <div className="customer">
          <div>
            <div className="label">Customer</div>
            <div className="value">{order.customerName}</div>
            <div className="sub">{order.mail}</div>
          </div>
          <div>
            <div className="label">Shipping Address</div>
            <div className="value pre-wrap">{order.shippingAddress}</div>
          </div>
        </div>

        <div className="items">
          <div className="items-header">
            <div>Product</div>
            <div className="qty">Qty</div>
            <div className="price">Price</div>
            <div className="amount">Amount</div>
          </div>
          {order.items?.map((it) => (
            <div className="item" key={it.id}>
              <div className="prod">
                {it.img ? <img src={it.img} alt={it.name} /> : <div className="ph" />}
                <span>{it.name}</span>
              </div>
              <div className="qty">{it.quantity}</div>
              <div className="price">{currency(it.price)}</div>
              <div className="amount">{currency(it.price * it.quantity)}</div>
            </div>
          ))}
          <div className="total-row">
            <span>Total</span>
            <span className="total">{currency(order.totalAmount)}</span>
          </div>
        </div>

        <div className="actions">
          <Link to="/" className="btn ghost">Back to Home</Link>
          <Link to="/orders" className="btn secondary">View Your Orders</Link>
          <button
            className="btn primary"
            onClick={() => window.print()}
            title="Print or Save as PDF"
          >
            Download Invoice (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
