import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const ordersCollection = await getOrdersCollection();
    const orders = await ordersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database unavailable" },
      { status: 500 }
    );
  }
}
