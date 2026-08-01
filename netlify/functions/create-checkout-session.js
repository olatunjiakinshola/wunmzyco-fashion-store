const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { cart } = JSON.parse(event.body);

    // Convert cart items into Stripe format
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "ngn", // Nigerian Naira
        product_data: {
          name: `${item.name}${item.selectedSize ? ` (Size: ${item.selectedSize})` : ""}`,
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses the smallest currency unit
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://majestic-pegasus-996c32.netlify.app/",
      cancel_url: "https://majestic-pegasus-996c32.netlify.app/",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};