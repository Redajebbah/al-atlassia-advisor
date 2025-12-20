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

    await sgMail.send(msg);

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('SendGrid send error:', err?.response || err);
    res.status(500).json({ error: 'Failed to send email', details: err?.message || err });
  }
}
