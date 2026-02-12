export default async function handler(req, res) {
  try {
    const response = await fetch("https://atlas.propertyfinder.com/v1/listings", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
