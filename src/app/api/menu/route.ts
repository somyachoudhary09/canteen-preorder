import { NextResponse } from "next/server";

const menuItems = [
  {
    id: "classic-biryani",
    name: "Classic Biryani",
    description: "Aromatic rice, tender meat, and rich spice blend.",
    price: 140,
    category: "Main Course",
    badge: "Popular",
    prepTime: "12 mins",
  },
  {
    id: "veg-wrap",
    name: "Garden Wrap",
    description: "Fresh veggies, hummus, and crunchy chips in a toasted wrap.",
    price: 95,
    category: "Quick Bite",
    badge: "Healthy",
    prepTime: "6 mins",
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    description: "Crispy fries tossed in spicy masala seasoning.",
    price: 70,
    category: "Snacks",
    badge: "Crunchy",
    prepTime: "4 mins",
  },
  {
    id: "choco-milkshake",
    name: "Choco Milkshake",
    description: "Creamy chocolate shake served chilled.",
    price: 90,
    category: "Beverage",
    badge: "Best Seller",
    prepTime: "3 mins",
  },
];

export async function GET() {
  return NextResponse.json(menuItems);
}
