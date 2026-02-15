export default async function handler(req, res) {
  try {
    // 1. Request Access Token
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

    if (!tokenData.accessToken) {
      return res.status(401).json({
        step: "token",
        error: tokenData
      });
    }

    // 2. Use Token to Fetch Listings
    const listingsResponse = await fetch(
      "https://atlas.propertyfinder.com/v1/listings?page=1&perPage=5",
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${tokenData.accessToken}`
        }
      }
    );

    const listingsData = await listingsResponse.json();

    return res.status(200).json({
      step: "listings",
      data: listingsData
    });

  } catch (error) {
    return res.status(500).json({
      step: "catch",
      error: error.message
    });
  }
}
