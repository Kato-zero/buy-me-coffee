import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const referenceId = crypto.randomUUID();

  const response = await fetch(
    "https://api.lipila.dev/api/v1/collections/mobile-money",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.LIPILA_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callbackUrl: `${process.env.BASE_URL}/api/webhook`,
        referenceId,
        amount: 50,
        narration: "Buy me a coffee",
        accountNumber: "26097XXXXXXX",
        currency: "ZMW",
        redirectUrl: `${process.env.BASE_URL}/thank-you`,
        email: "buyer@example.com",
      }),
    }
  );

  const data = await response.json();
  return res.status(200).json({ referenceId, lipila: data });
}
