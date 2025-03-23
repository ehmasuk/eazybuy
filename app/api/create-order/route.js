import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const POST = async (req) => {
    const { orderMethod, id } = await req.json();

    if (!orderMethod || !id) {
        return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
    }
    try {
        if (orderMethod === "stripe") {
            const session = await stripe.checkout.sessions.retrieve(id);
            return NextResponse.json(session);
        } else {
            return NextResponse.json({ message: "Invalid order method" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }




};
