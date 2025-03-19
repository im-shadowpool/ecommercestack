import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cart } = await req.json();

    console.log("Received Cart:", cart); // Debugging log

    if (!cart || cart.length === 0) {
      console.error("❌ Cart is empty");
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: cart.map((item) => {
        console.log("Processing Item:", item); // Debugging log

        if (!item.productTitle || !item.selectedSize.price || !item.quantity || !item.selectedSize) {
          console.error("❌ Missing item details", item);
          return null;
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${item.productTitle} - ${item.selectedSize.size}`,
              images: item.selectedSize.images ? item.selectedSize.images : [], 
            },
            unit_amount: Math.round(item.selectedSize.price * 100),
          },
          quantity: item.quantity,
        };
      }).filter(Boolean),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
