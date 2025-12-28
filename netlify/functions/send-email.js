const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || 'iwacu27@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Just AFC <notifications@resend.dev>';

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const { type, data } = JSON.parse(event.body);

    if (!type || !data) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing type or data' })
      };
    }

    let subject, body;

    switch (type) {
      case 'contact':
        subject = `New Contact Message: ${data.subject || 'No Subject'}`;
        body = `
New Contact Message Received

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject || 'No Subject'}

Message:
${data.message}
        `.trim();
        break;

      case 'referral':
        subject = `New Patient Referral from ${data.referrer_name}`;
        body = `
New Patient Referral Received

REFERRER INFORMATION
Name: ${data.referrer_name}
Email: ${data.referrer_email}
Phone: ${data.referrer_phone || 'Not provided'}

PATIENT INFORMATION
Name: ${data.patient_name}
Age: ${data.patient_age || 'Not provided'}

CARE NEEDS:
${data.care_needs}
        `.trim();
        break;

      case 'career':
        subject = `New Career Inquiry from ${data.full_name}`;
        body = `
New Career Inquiry Received

Name: ${data.full_name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Message:
${data.message}
        `.trim();
        break;

      default:
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Invalid email type' })
        };
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: subject,
      text: body
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to send email' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
