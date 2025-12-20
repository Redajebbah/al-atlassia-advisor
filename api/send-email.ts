import sgMail from '@sendgrid/mail';

// Serverless endpoint for sending demande emails via SendGrid
// Expects POST JSON: { subject?: string, html: string, text?: string, to?: string }

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { subject, html, text, to } = req.body || {};

    if (!html && !text) {
      res.status(400).json({ error: 'Missing email content' });
      return;
    }

    const toEmail = to || process.env.RECEIVING_EMAIL;
    const fromEmail = process.env.SENDER_EMAIL || process.env.RECEIVING_EMAIL;

    if (!process.env.SENDGRID_API_KEY) {
      res.status(500).json({ error: 'SendGrid API key not configured on server' });
      return;
    }

    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: subject || 'Nouvelle demande d\'assurance - Chatbot Al Atlassia',
      text: text || undefined,
      html,
    } as any;

    const response = await sgMail.send(msg);

    // SendGrid returns an array of responses; include status for debugging
    res.status(200).json({ ok: true, sgStatus: response?.[0]?.statusCode || null });
  } catch (err: any) {
    // Log detailed error server-side
    console.error('SendGrid send error:', err);

    // Try to extract structured SendGrid error info if present
    const sgDetails = err?.response?.body || err?.message || err;

    // Return non-sensitive diagnostic info to client for debugging
    res.status(500).json({ error: 'Failed to send email', details: sgDetails });
  }
}
