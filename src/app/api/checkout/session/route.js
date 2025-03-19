import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
