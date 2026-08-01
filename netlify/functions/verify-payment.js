const https = require("https");

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { reference } = JSON.parse(event.body);

    if (!reference) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Payment reference is required" }),
      };
    }

    // Verify payment with Paystack
    const response = await verifyWithPaystack(reference);

    if (response.status && response.data.status === "success") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Payment verified successfully",
          data: {
            reference: response.data.reference,
            amount: response.data.amount / 100, // convert from kobo
            email: response.data.customer.email,
            paid_at: response.data.paid_at,
            channel: response.data.channel,
            metadata: response.data.metadata,
          },
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Payment verification failed",
          data: response.data,
        }),
      };
    }
  } catch (error) {
    console.error("Verification error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
    };
  }
};

// Helper function to call Paystack API
function verifyWithPaystack(reference) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}