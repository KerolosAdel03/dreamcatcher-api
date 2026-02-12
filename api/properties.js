export default async function handler(req, res) {
  try {

    const credentials = Buffer
      .from(`${process.env.PROPERTYFINDER_API_KEY}:${process.env.PROPERTYFINDER_API_SECRET}`)
      .toString("base64");

    const response = await fetch("https://atlas.propertyfinder.com/v1/listings", {
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Error fetching listings" });
  }
}
