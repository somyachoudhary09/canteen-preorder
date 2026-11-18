"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock3,
  Sandwich,
  Coffee,
  CheckCircle2,
} from "lucide-react";

const menu = [
  {
    id: 1,
    name: "Paneer Wrap",
    price: 120,
  },
  {
    id: 2,
    name: "Veg Burger",
    price: 80,
  },
  {
    id: 3,
    name: "Cheese Sandwich",
    price: 90,
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 60,
  },

  {
    id: 5,
    name: "French Fries",
    price: 160,
  },

  {
    id: 6,
    name: "Sandwich",
    price: 60,
  },
];


export default function PhonePreview() {
  const [showPopup, setShowPopup] = useState(true);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000); // closes after 5 seconds
  
    return () => clearTimeout(timer);
  }, []);
  const [cart, setCart] = useState<
    { id: number; quantity: number }[]
  >([]);
  const increaseQty = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQty = (id: number) =>
    cart.find((item) => item.id === id)?.quantity || 0;

  const selectedItems = menu.filter((item) => getQty(item.id) > 0);
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * getQty(item.id),
    0
  );

  const handlePlaceOrder = async () => {
    if (selectedItems.length === 0) return;

    const payload = {
      customerName: "Guest",
      pickupTime: "12:30 PM",
      items: selectedItems.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        quantity: getQty(item.id),
        price: item.price,
      })),
      total,
    };

    await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => undefined);

    setCart([]);
    setShowOrderConfirmation(true);
  };

  return (
    <>
      <AnimatePresence>
        {showOrderConfirmation && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrderConfirmation(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-confirmation-title"
              className="w-full max-w-sm rounded-2xl border border-green-500/30 bg-zinc-900 p-7 text-center shadow-2xl"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <CheckCircle2 className="mx-auto mb-4 text-green-400" size={42} />
              <h2 id="order-confirmation-title" className="text-xl font-bold text-white">
                Congratulations!
              </h2>
              <p className="mt-2 text-sm text-zinc-300">Your order is placed.</p>
              <button
                type="button"
                onClick={() => setShowOrderConfirmation(false)}
                className="mt-6 w-full rounded-xl bg-green-500 px-4 py-3 font-semibold text-black transition hover:bg-green-400"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
      {/* Glow */}
      <div className="absolute inset-0 scale-110 rounded-[60px] bg-blue-500/25 blur-3xl" />

      {/* Floating Burger Card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -left-24 top-24 z-30 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <Sandwich className="text-green-400" size={22} />
          <div>
            <p className="text-sm font-semibold text-white">
              Veg Burger
            </p>
            <p className="text-xs text-zinc-500">₹80</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Coffee Card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute -right-24 bottom-28 z-30 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <Coffee className="text-yellow-400" size={22} />
          <div>
            <p className="text-sm font-semibold text-white">
              Cold Coffee
            </p>
            <p className="text-xs text-zinc-500">₹60</p>
          </div>
        </div>
      </motion.div>

      {/* Phone */}
      <div className="relative h-[640px] w-[320px] overflow-hidden overflow-y-scroll rounded-[48px] border border-white/10 bg-zinc-950 shadow-[0_40px_120px_rgba(0,0,0,.6)]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-4 h-7 w-36 -translate-x-1/2 rounded-full bg-black" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />

        <div className="relative p-7">
          <AnimatePresence>
  {showPopup && (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="absolute top-[30%] mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 backdrop-blur-md"
    >
      <p className="text-sm font-medium text-green-400">
        🎉 Welcome to CanteenHub
      </p>

      <p className="mt-1 text-sm text-zinc-300">
        Select your favorite items and place your order in seconds.
      </p>
    </motion.div>
  )}
</AnimatePresence>

          {/* Current Order */}
          {/* <div className="mt-8 rounded-3xl bg-green-500 p-6 text-black shadow-xl">
            <p className="text-sm font-semibold">
              Current Order
            </p>

            <h3 className="mt-3 text-3xl font-black">
              Paneer Wrap
            </h3>

            <div className="mt-6 flex items-center gap-2">
              <Clock3 size={18} />

              <span className="font-semibold">
                Ready in 5 min
              </span>
            </div>
          </div> */}

          {/* Menu */}
          <div className="space-y-4">
            {menu.map((item) => {
              const qty = getQty(item.id);

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${qty > 0
                    ? "border-green-500 bg-green-500/15"
                    : "border-transparent bg-zinc-900"
                    }`}
                >
                  <div className="">
                    <p className="font-medium text-white">
                      {item.name}
                    </p>

                    <p className="text-green-400">
                      ₹{item.price}
                    </p>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-black transition hover:bg-green-400"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-3 py-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white"
                      >
                        −
                      </button>

                      <span className="w-5 text-center font-bold text-white">
                        {qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-black"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 left-0 right-0 mt-6 border-t border-white/10 bg-zinc-950/95 p-5 backdrop-blur-xl">
            <h3 className="mb-3 text-sm font-semibold text-zinc-400">
              Your Order
            </h3>

            {selectedItems.length === 0 ? (
              <p className="mb-4 text-sm text-zinc-500">
                Tap items above to add them
              </p>
            ) : (
              <>
                <div className="mb-4 max-h-28 space-y-2 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm text-white"
                    >
                      <span>{item.name}</span>
                      <div className="text-right flex min-w-[70px] justify-between">
                        <p className="text-white">
                          x{getQty(item.id)}
                        </p>

                        <p className="text-green-400">
                          ₹{item.price * getQty(item.id)}
                        </p>
                      </div>          </div>
                  ))}
                </div>

                <div className="mb-4 flex items-center justify-between border-t border-zinc-700 pt-3">
                  <span className="font-semibold text-white">
                    Total
                  </span>

                  <span className="text-lg font-bold text-green-400">
                    ₹{total}
                  </span>
                </div>
              </>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={selectedItems.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 size={20} />
              {selectedItems.length === 0 ? "Select Items" : `Place Order • ₹${total}`}
            </button>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
}