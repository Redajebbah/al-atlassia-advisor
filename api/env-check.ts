export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const sendgridKeySet = !!process.env.SENDGRID_API_KEY;
  const senderEmailSet = !!process.env.SENDER_EMAIL;
  const receivingEmailSet = !!process.env.RECEIVING_EMAIL || !!process.env.VITE_RECEIVING_EMAIL;

  res.status(200).json({ sendgridKeySet, senderEmailSet, receivingEmailSet });
}
