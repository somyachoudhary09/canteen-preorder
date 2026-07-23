"use client";

import { useEffect, useState } from "react";

type OrderRecord = {
  _id?: string;
  id: string;
  customerName: string;
  pickupTime: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  createdAt: string;
  status: string;
  paymentStatus?: string;
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("canteen-admin-auth");
    if (stored === "true") {
      setIsLoggedIn(true);
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) throw new Error("Unable to load orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error("Invalid admin password");

      localStorage.setItem("canteen-admin-auth", "true");
      setIsLoggedIn(true);
      fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("canteen-admin-auth");
    setIsLoggedIn(false);
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Owner Access</p>
          <h1 className="mt-3 text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-zinc-400">Sign in to view canteen orders from the MongoDB database.</p>

          <label className="mt-6 block text-sm font-medium text-zinc-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none ring-0"
            placeholder="Enter owner password"
          />

          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Owner Dashboard</p>
            <h1 className="text-3xl font-bold">Canteen Orders</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
          >
            Logout
          </button>
        </div>

        {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead className="bg-zinc-800/70">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Pickup</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-sm text-zinc-400">
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-sm text-zinc-400">
                      No orders found yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-800/60">
                      <td className="px-4 py-3 text-sm font-medium text-emerald-400">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.customerName}</td>
                      <td className="px-4 py-3 text-sm">
                        {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.paymentStatus === "Paid" ? "bg-emerald-500/20 text-emerald-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                          {order.paymentStatus || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{order.status}</td>
                      <td className="px-4 py-3 text-sm">{order.pickupTime}</td>
                      <td className="px-4 py-3 text-sm">₹{order.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
