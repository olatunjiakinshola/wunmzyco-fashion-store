const https = require("https");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { reference, expectedAmount, expectedCurrency = "NGN" } = body;

    if (!reference) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: "Missing reference" }),
      };
    }

    if (expectedAmount === undefined || expectedAmount === null) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Missing expectedAmount",
        }),
      };
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Paystack secret key not configured",
        }),
      };
    }

    const result = await verifyTransaction(reference, secretKey);
    const data = result.data;

    // 1) Payment must be successful
    if (!result.status || data?.status !== "success") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Payment not successful",
          data: data || null,
        }),
      };
    }

    // Paystack returns amount in kobo
    const paidAmountKobo = Number(data.amount);
    const expectedAmountKobo = Math.round(Number(expectedAmount) * 100);
    const paidCurrency = String(data.currency || "").toUpperCase();
    const expectedCur = String(expectedCurrency || "NGN").toUpperCase();

    // 2) Currency must match
    if (paidCurrency !== expectedCur) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: `Currency mismatch. Expected ${expectedCur}, got ${paidCurrency}`,
        }),
      };
    }

    // 3) Amount must match exactly
    if (paidAmountKobo !== expectedAmountKobo) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: `Amount mismatch. Expected ₦${(
            expectedAmountKobo / 100
          ).toLocaleString()}, got ₦${(paidAmountKobo / 100).toLocaleString()}`,
        }),
      };
    }

    // All checks passed
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          reference: data.reference,
          amount: paidAmountKobo / 100,
          currency: paidCurrency,
          paid_at: data.paid_at,
          channel: data.channel,
          customer: data.customer,
        },
      }),
    };
  } catch (error) {
    console.error("Verify error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Verification failed",
      }),
    };
  }
};

function verifyTransaction(reference, secretKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.paystack.co",
      path: `/transaction/verify/${encodeURIComponent(reference)}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
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
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}