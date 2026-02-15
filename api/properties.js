export default async function handler(req, res) {
  return res.status(200).json({
    keyExists: !!process.env.PF_API_KEY,
    secretExists: !!process.env.PF_API_SECRET,
    keyLength: process.env.PF_API_KEY ? process.env.PF_API_KEY.length : 0,
    secretLength: process.env.PF_API_SECRET ? process.env.PF_API_SECRET.length : 0
  });
}
