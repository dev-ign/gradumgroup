import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, phone, country, inquiryType, message } =
    (req.body as Record<string, string>) ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await resend.emails.send({
      // Requires gradumgroup.com domain verified in Resend dashboard.
      // Until then, swap with: 'Gradum Group <onboarding@resend.dev>'
      from: 'Gradum Group <noreply@gradumgroup.com>',
      to: ['info@gradumgroup.com'],
      replyTo: email,
      subject: `[Gradum Inquiry] ${inquiryType || 'General'} — ${name}`,
      html: buildHtml({ name, company, email, phone, country, inquiryType, message }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}

// ─── Email template ───────────────────────────────────────────────────────────

interface Fields {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: string;
  message: string;
}

function row(label: string, value: string) {
  if (!value?.trim()) return '';
  return `
    <tr>
      <td style="padding:7px 0;color:#777;font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;width:130px;vertical-align:top">${label}</td>
      <td style="padding:7px 0;color:#111;font-size:13px;vertical-align:top">${value}</td>
    </tr>`;
}

function buildHtml(f: Fields) {
  const safe = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f2f2f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0e0e0">

  <!-- Header -->
  <tr>
    <td style="background:#0A2924;padding:28px 36px 24px">
      <p style="margin:0 0 6px;color:#AEE37B;font-size:10px;font-weight:700;letter-spacing:0.35em;text-transform:uppercase">Gradum Group</p>
      <p style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.02em;line-height:1.2">New Consultation Request</p>
    </td>
  </tr>

  ${f.inquiryType ? `
  <!-- Inquiry type badge -->
  <tr>
    <td style="padding:20px 36px 0">
      <span style="display:inline-block;background:rgba(174,227,123,0.12);border:1px solid rgba(174,227,123,0.4);color:#0A2924;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:5px 12px">${safe(f.inquiryType)}</span>
    </td>
  </tr>` : ''}

  <!-- Contact details -->
  <tr>
    <td style="padding:24px 36px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee">
        ${row('Name', f.name)}
        ${row('Email', f.email)}
        ${row('Company', f.company)}
        ${row('Phone', f.phone)}
        ${row('Country', f.country)}
      </table>
    </td>
  </tr>

  <!-- Message -->
  <tr>
    <td style="padding:0 36px 32px">
      <p style="margin:0 0 10px;color:#999;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase">Message</p>
      <div style="background:#f8f8f6;border-left:3px solid #AEE37B;padding:16px 20px">
        <p style="margin:0;color:#333;font-size:14px;line-height:1.65;white-space:pre-wrap">${safe(f.message)}</p>
      </div>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f8f8f6;border-top:1px solid #eee;padding:14px 36px">
      <p style="margin:0;color:#aaa;font-size:11px;line-height:1.5">
        Reply directly to this email to respond to <strong>${safe(f.name)}</strong>.
        Sent via <a href="https://gradumgroup.com" style="color:#0A2924;text-decoration:none">gradumgroup.com</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
