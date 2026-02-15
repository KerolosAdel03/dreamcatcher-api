export default async function handler(req, res) {
  try {
    const tokenResponse = await fetch("https://atlas.propertyfinder.com/v1/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        apiKey: process.env.PF_API_KEY,
        apiSecret: process.env.PF_API_SECRET
      })
    });

    const tokenData = await tokenResponse.json();

    return res.status(200).json({
      envKeyExists: !!process.env.PF_API_KEY,
      envSecretExists: !!process.env.PF_API_SECRET,
      tokenResponse: tokenData
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
