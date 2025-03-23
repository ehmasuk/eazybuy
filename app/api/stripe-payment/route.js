import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const POST = async (req) => {
    const { products, userId } = await req.json();

    if (!products || !userId) {
        return NextResponse.json({ message: "products,userId required" }, { status: 404 });
    }

    

    try {
        const line_items = products.map((product) => {
            return {
                price_data: {
                    currency: "usd",
                    unit_amount: +product.newPrice * 100,
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                },
                quantity: +product.quantity,
            };
        });

        const productsId = products.map((product) => {
            return product.id;
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/payment-success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
            customer_email: "ehmasuk@gmail.com",
            line_items,
            metadata: {
                userId,
                products: JSON.stringify(productsId),
            },
        });

        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }
};
