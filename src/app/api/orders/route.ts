import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const ordersCollection = await getOrdersCollection();
    const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).limit(8).toArray();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database unavailable" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const ordersCollection = await getOrdersCollection();

    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Queued",
      paymentStatus: "Pending",
      ...payload,
    };

    await ordersCollection.insertOne(order);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create order" },
      { status: 500 }
    );
  }
}
