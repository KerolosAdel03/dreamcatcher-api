export default async function handler(req, res) {
  try {

    // Step 1: Get Access Token
    const authResponse = await fetch("https://atlas.propertyfinder.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.PROPERTYFINDER_API_KEY,
        client_secret: process.env.PROPERTYFINDER_API_SECRET
      })
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    if (!accessToken) {
      return res.status(401).json(authData);
    }

    // Step 2: Fetch Listings using token
    const listingsResponse = await fetch("https://atlas.propertyfinder.com/v1/listings", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    const listingsData = await listingsResponse.json();

    res.status(200).json(listingsData);

  } catch (error) {
    res.status(500).json({ error: "Error fetching listings" });
  }
}
